import { loadStripe } from "@stripe/stripe-js";

// Validate that required environment variables are set
const validateEnvironment = () => {
  const mode = import.meta.env.VITE_STRIPE_MODE || 'test'
  
  if (mode === 'live') {
    if (!import.meta.env.VITE_STRIPE_LIVE_PUBLISHABLE_KEY) {
      throw new Error('VITE_STRIPE_LIVE_PUBLISHABLE_KEY is required for live mode. Please check your .env file.')
    }
  } else {
    if (!import.meta.env.VITE_STRIPE_TEST_PUBLISHABLE_KEY) {
      throw new Error('VITE_STRIPE_TEST_PUBLISHABLE_KEY is required for test mode. Please check your .env file.')
    }
  }
}

// Dynamic Stripe key loading based on environment
const getStripeKey = () => {
  const mode = import.meta.env.VITE_STRIPE_MODE || 'test'
  if (mode === 'live') {
    return import.meta.env.VITE_STRIPE_LIVE_PUBLISHABLE_KEY || ''
  } else {
    return import.meta.env.VITE_STRIPE_TEST_PUBLISHABLE_KEY || ''
  }
}

// Initialize Stripe with validation
try {
  validateEnvironment()
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'
  console.error('Environment validation failed:', errorMessage)
  console.error('Please run: ./switch-env.sh test or ./switch-env.sh live')
  console.error('Then fill in your actual keys in the .env file')
}

const stripePromise = loadStripe(getStripeKey())

// Credit bundle configurations
export interface CreditBundle {
  id: string
  name: string
  price: number
  credits: number
  priceId: string // Stripe Price ID
  popular?: boolean
  description: string
}

// Dynamic price ID loading based on environment
const getPriceId = (bundleNumber: number) => {
  const mode = import.meta.env.VITE_STRIPE_MODE || 'test'
  const prefix = mode === 'live' ? 'VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_' : 'VITE_STRIPE_TEST_PRICE_ID_BUNDLE_'
  return import.meta.env[`${prefix}${bundleNumber}`] || ''
}

// Helper function to get price ID based on environment
const getPriceId = (bundleId: string): string => {
  const mode = import.meta.env.VITE_STRIPE_MODE || "test";
  const envKey = `VITE_STRIPE_${mode.toUpperCase()}_PRICE_ID_${bundleId.toUpperCase()}`;
  const priceId = import.meta.env[envKey];

  console.log("🔍 Price ID Debug Info:", {
    bundleId,
    mode,
    envKey,
    priceId,
    allEnvVars: {
      VITE_STRIPE_MODE: import.meta.env.VITE_STRIPE_MODE,
      VITE_STRIPE_TEST_PRICE_ID_BUNDLE_1: import.meta.env
        .VITE_STRIPE_TEST_PRICE_ID_BUNDLE_1,
      VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_1: import.meta.env
        .VITE_STRIPE_LIVE_PRICE_ID_BUNDLE_1,
      VITE_STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
    },
  });

  return priceId || "";
};

export const CREDIT_BUNDLES: CreditBundle[] = [
  {
    id: "bundle-1",
    name: "Starter Pack",
    price: 1,
    credits: 3,
    priceId: getPriceId(1),
    description: 'Perfect for trying out kite recommendations'
  },
  {
    id: 'bundle-2',
    name: 'Popular Pack',
    price: 3,
    credits: 10,
    priceId: getPriceId(2),
    popular: true,
    description: 'Most popular choice for regular users'
  },
  {
    id: "bundle-3",
    name: "Pro Pack",
    price: 5,
    credits: 25,
    priceId: getPriceId(3),
    description: 'Best value for power users'
  }
]

// Create Stripe Checkout session
export const createCheckoutSession = async (
  bundle: CreditBundle,
  userId: string,
  userEmail: string
): Promise<string> => {
  try {
    // Use Firebase Functions endpoint
    const response = await fetch('https://us-central1-skite-app.cloudfunctions.net/createCheckoutSession', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: bundle.priceId,
        userId: userId,
        userEmail: userEmail,
        bundleId: bundle.id,
        credits: bundle.credits,
        bundleName: bundle.name
      }),
    });

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create checkout session')
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};

// Redirect to Stripe Checkout
export const redirectToCheckout = async (
  bundle: CreditBundle,
  userId: string,
  userEmail: string
): Promise<void> => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe failed to load");
    }

    const sessionId = await createCheckoutSession(bundle, userId, userEmail);

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error redirecting to checkout:", error);
    throw error;
  }
};

// Verify payment success
export const verifyPayment = async (sessionId: string): Promise<boolean> => {
  try {
    const response = await fetch('https://us-central1-skite-app.cloudfunctions.net/verifyPayment', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      return false;
    }

    const { success } = await response.json();
    return success;
  } catch (error) {
    console.error("Error verifying payment:", error);
    return false;
  }
}

// Get bundle by ID
export const getBundleById = (bundleId: string): CreditBundle | undefined => {
  return CREDIT_BUNDLES.find(bundle => bundle.id === bundleId)
}

// Get bundle by Price ID
export const getBundleByPriceId = (priceId: string): CreditBundle | undefined => {
  return CREDIT_BUNDLES.find(bundle => bundle.priceId === priceId)
} 
