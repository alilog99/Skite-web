import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

// Credit bundle configurations
export interface CreditBundle {
  id: string
  name: string
  price: number
  credits: number
  priceId: string // Stripe Price ID
  popular?: boolean
}

export const CREDIT_BUNDLES: CreditBundle[] = [
  {
    id: 'bundle-1',
    name: 'Starter Pack',
    price: 1,
    credits: 3,
    priceId: 'price_1OqX2X2X2X2X2X2X2X2X2X2X' // Replace with your actual Stripe Price ID
  },
  {
    id: 'bundle-2',
    name: 'Popular Pack',
    price: 2,
    credits: 10,
    priceId: 'price_2OqX2X2X2X2X2X2X2X2X2X2X', // Replace with your actual Stripe Price ID
    popular: true
  },
  {
    id: 'bundle-3',
    name: 'Pro Pack',
    price: 5,
    credits: 25,
    priceId: 'price_3OqX2X2X2X2X2X2X2X2X2X2X' // Replace with your actual Stripe Price ID
  }
]

// Create Stripe Checkout session
export const createCheckoutSession = async (
  bundle: CreditBundle,
  userId: string,
  userEmail: string
): Promise<string> => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: bundle.priceId,
        userId: userId,
        userEmail: userEmail,
        bundleId: bundle.id,
        credits: bundle.credits
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const { sessionId } = await response.json()
    return sessionId
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Redirect to Stripe Checkout
export const redirectToCheckout = async (
  bundle: CreditBundle,
  userId: string,
  userEmail: string
): Promise<void> => {
  try {
    const stripe = await stripePromise
    if (!stripe) {
      throw new Error('Stripe failed to load')
    }

    const sessionId = await createCheckoutSession(bundle, userId, userEmail)
    
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    })

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error)
    throw error
  }
}

// Verify payment success
export const verifyPayment = async (sessionId: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    })

    if (!response.ok) {
      return false
    }

    const { success } = await response.json()
    return success
  } catch (error) {
    console.error('Error verifying payment:', error)
    return false
  }
} 