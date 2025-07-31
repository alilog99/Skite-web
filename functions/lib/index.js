"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.stripeWebhook = exports.createCheckoutSession = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe_1 = require("stripe");
const cors = require("cors");
// Initialize Firebase Admin
admin.initializeApp();
// Initialize Stripe
const stripe = new stripe_1.default(functions.config().stripe.secret_key, {
    apiVersion: '2022-11-15',
});
// Initialize CORS
const corsHandler = cors({ origin: true });
// Credit bundle configurations
const CREDIT_BUNDLES = {
    'price_1RqckrFXWKfEvemGm5bfXri5': { credits: 3, name: 'Starter Pack' },
    'price_1RqclZFXWKfEvemGF1iltPvj': { credits: 10, name: 'Popular Pack' },
    'price_1RqcmSFXWKfEvemG52HgrenK': { credits: 25, name: 'Pro Pack' },
};
// Create checkout session
exports.createCheckoutSession = functions.https.onRequest((req, res) => {
    return corsHandler(req, res, async () => {
        try {
            if (req.method !== 'POST') {
                res.status(405).json({ error: 'Method not allowed' });
                return;
            }
            const { priceId, userId, userEmail, bundleId, credits, bundleName } = req.body;
            if (!priceId || !userId || !userEmail) {
                res.status(400).json({ error: 'Missing required parameters' });
                return;
            }
            // Verify the price ID exists in our bundles
            if (!(priceId in CREDIT_BUNDLES)) {
                res.status(400).json({ error: 'Invalid price ID' });
                return;
            }
            // Create Stripe checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${functions.config().app.url}/credits?success=true&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${functions.config().app.url}/credits?canceled=true`,
                metadata: {
                    userId: userId,
                    userEmail: userEmail,
                    bundleId: bundleId,
                    credits: credits.toString(),
                    bundleName: bundleName,
                },
                customer_email: userEmail,
            });
            res.status(200).json({ sessionId: session.id });
        }
        catch (error) {
            console.error('Error creating checkout session:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});
// Webhook to handle successful payments
exports.stripeWebhook = functions.https.onRequest((req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = functions.config().stripe.webhook_secret;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    }
    catch (err) {
        console.error('Webhook signature verification failed:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        res.status(400).send(`Webhook Error: ${errorMessage}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            handleCheckoutSessionCompleted(session);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
});
// Handle successful checkout session
async function handleCheckoutSessionCompleted(session) {
    try {
        const { userId, credits, bundleName } = session.metadata || {};
        if (!userId || !credits) {
            console.error('Missing metadata in checkout session:', session.id);
            return;
        }
        const creditsToAdd = parseInt(credits, 10);
        // Update user's credits in Firestore
        const userRef = admin.firestore().collection('users').doc(userId);
        await admin.firestore().runTransaction(async (transaction) => {
            var _a;
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) {
                throw new Error(`User document not found: ${userId}`);
            }
            const currentCredits = ((_a = userDoc.data()) === null || _a === void 0 ? void 0 : _a.credits) || 0;
            const newCredits = currentCredits + creditsToAdd;
            transaction.update(userRef, {
                credits: newCredits,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            });
            // Log the transaction
            transaction.create(admin.firestore().collection('credit_transactions').doc(), {
                userId: userId,
                sessionId: session.id,
                bundleName: bundleName,
                creditsAdded: creditsToAdd,
                amount: session.amount_total,
                currency: session.currency,
                status: 'completed',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });
        });
        console.log(`Successfully added ${creditsToAdd} credits to user ${userId}`);
    }
    catch (error) {
        console.error('Error handling checkout session completed:', error);
    }
}
// Verify payment (optional endpoint for frontend verification)
exports.verifyPayment = functions.https.onRequest((req, res) => {
    return corsHandler(req, res, async () => {
        try {
            if (req.method !== 'POST') {
                res.status(405).json({ error: 'Method not allowed' });
                return;
            }
            const { sessionId } = req.body;
            if (!sessionId) {
                res.status(400).json({ error: 'Session ID is required' });
                return;
            }
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            if (session.payment_status === 'paid') {
                res.status(200).json({ success: true, session });
            }
            else {
                res.status(200).json({ success: false, session });
            }
        }
        catch (error) {
            console.error('Error verifying payment:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});
//# sourceMappingURL=index.js.map