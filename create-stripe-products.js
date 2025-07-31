const Stripe = require('stripe');

// Load environment variables
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const products = [
  {
    name: 'Starter Pack',
    description: '3 kite recommendations for $1',
    price: 100, // $1.00 in cents
    credits: 3
  },
  {
    name: 'Popular Pack',
    description: '10 kite recommendations for $2',
    price: 200, // $2.00 in cents
    credits: 10
  },
  {
    name: 'Pro Pack',
    description: '25 kite recommendations for $5',
    price: 500, // $5.00 in cents
    credits: 25
  }
];

async function createProducts() {
  console.log('🚀 Creating Stripe products for credit system...\n');

  const createdProducts = [];

  for (const product of products) {
    try {
      console.log(`📦 Creating product: ${product.name}`);
      
      // Create the product
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description,
        metadata: {
          credits: product.credits.toString()
        }
      });

      // Create the price for the product
      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.price,
        currency: 'usd',
        metadata: {
          credits: product.credits.toString()
        }
      });

      createdProducts.push({
        name: product.name,
        productId: stripeProduct.id,
        priceId: stripePrice.id,
        price: `$${(product.price / 100).toFixed(2)}`,
        credits: product.credits
      });

      console.log(`✅ Created: ${product.name} - Price ID: ${stripePrice.id}\n`);
    } catch (error) {
      console.error(`❌ Error creating ${product.name}:`, error.message);
    }
  }

  console.log('🎉 Product creation complete!\n');
  console.log('📋 Copy these Price IDs to src/services/stripe.ts:\n');
  
  createdProducts.forEach((product, index) => {
    console.log(`Bundle ${index + 1} (${product.name}):`);
    console.log(`  priceId: '${product.priceId}'`);
    console.log('');
  });

  console.log('🔧 Next steps:');
  console.log('1. Update src/services/stripe.ts with the Price IDs above');
  console.log('2. Add your Stripe publishable key to .env file');
  console.log('3. Run "npm run dev" to test the credit system');
}

// Run the script
createProducts().catch(console.error); 