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
  description: string
}

export const CREDIT_BUNDLES: CreditBundle[] = [
  {
    id: 'bundle-1',
    name: 'Starter Pack',
    price: 1,
    credits: 3,
    priceId: import.meta.env.STRIPE_PRICE_BUNDLE_1 || 'price_1RqckrFXWKfEvemGm5bfXri5',
    description: 'Perfect for trying out kite recommendations'
  },
  {
    id: 'bundle-2',
    name: 'Popular Pack',
    price: 2,
    credits: 10,
    priceId: import.meta.env.STRIPE_PRICE_BUNDLE_2 || 'price_1RqclZFXWKfEvemGF1iltPvj',
    popular: true,
    description: 'Most popular choice for regular users'
  },
  {
    id: 'bundle-3',
    name: 'Pro Pack',
    price: 5,
    credits: 25,
    priceId: import.meta.env.STRIPE_PRICE_BUNDLE_3 || 'price_1RqcmSFXWKfEvemG52HgrenK',
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
    const response = await fetch('/createCheckoutSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: bundle.priceId,
        userId: userId,
        userEmail: userEmail,
        bundleId: bundle.id,
        credits: bundle.credits,
        bundleName: bundle.name
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create checkout session')
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
    const response = await fetch('/verifyPayment', {
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

// Get bundle by ID
export const getBundleById = (bundleId: string): CreditBundle | undefined => {
  return CREDIT_BUNDLES.find(bundle => bundle.id === bundleId)
}

// Get bundle by Price ID
export const getBundleByPriceId = (priceId: string): CreditBundle | undefined => {
  return CREDIT_BUNDLES.find(bundle => bundle.priceId === priceId)
} 