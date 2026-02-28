// Stripe Payment Link Generator
// Creates dynamic Stripe checkout links for website packages

// Note: In production, use actual Stripe SDK with secret key
// This module creates mock payment links for demonstration

const STRIPE_PRICE_ID = 'price_basic_website_199'; // Would be real Stripe price ID
const WEBSITE_PRICE_GBP = 199;

/**
 * Creates a Stripe payment link for a website package
 * @param {Object} params
 * @param {string} params.businessName - Name of the business
 * @param {string} params.businessEmail - Email for receipt
 * @param {string} params.previewUrl - URL to preview the website
 * @returns {Object} Payment link details
 */
function createPaymentLink({ businessName, businessEmail, previewUrl }) {
  // In production, use Stripe API:
  // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  // const session = await stripe.checkout.sessions.create({...});
  
  // Generate unique reference
  const ref = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  
  // Mock payment link (in production, this would be a real Stripe URL)
  // Format: https://buy.stripe.com/test_[unique_ref]
  const paymentLink = `https://buy.stripe.com/test_${ref}`;
  
  // Build payment link with metadata
  const fullPaymentLink = new URL(paymentLink);
  fullPaymentLink.searchParams.append('business', businessName);
  fullPaymentLink.searchParams.append('email', businessEmail);
  fullPaymentLink.searchParams.append('preview', previewUrl);
  fullPaymentLink.searchParams.append('price', WEBSITE_PRICE_GBP);
  
  return {
    id: `plink_${ref}`,
    url: fullPaymentLink.toString(),
    amount: WEBSITE_PRICE_GBP,
    currency: 'GBP',
    description: `Professional website for ${businessName}`,
    metadata: {
      businessName,
      businessEmail,
      previewUrl,
      package: 'basic_website'
    },
    created: new Date().toISOString()
  };
}

/**
 * Creates a Stripe checkout session (alternative to payment links)
 * @param {Object} params
 * @param {string} params.businessName
 * @param {string} params.businessEmail
 * @param {string} params.previewUrl
 * @returns {Object} Checkout session details
 */
function createCheckoutSession({ businessName, businessEmail, previewUrl }) {
  const ref = Date.now().toString(36);
  
  // In production:
  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   line_items: [{
  //     price_data: {
  //       currency: 'gbp',
  //       product_data: { name: 'Professional Website Package' },
  //       unit_amount: 19900,
  //     },
  //     quantity: 1,
  //   }],
  //   mode: 'payment',
  //   success_url: `${previewUrl}?payment=success`,
  //   cancel_url: `${previewUrl}?payment=cancelled`,
  //   metadata: { businessName, businessEmail }
  // });
  
  return {
    id: `cs_${ref}`,
    url: `https://checkout.stripe.com/c/pay/cs_${ref}`,
    amount_total: WEBSITE_PRICE_GBP * 100, // in pence
    currency: 'gbp',
    status: 'open',
    metadata: {
      businessName,
      businessEmail,
      previewUrl
    }
  };
}

/**
 * Validates a Stripe price ID exists
 * @param {string} priceId 
 * @returns {boolean}
 */
async function validatePrice(priceId) {
  // In production:
  // const price = await stripe.prices.retrieve(priceId);
  // return !!price;
  
  console.log(`Validating price: ${priceId}`);
  return true;
}

module.exports = {
  createPaymentLink,
  createCheckoutSession,
  validatePrice,
  WEBSITE_PRICE_GBP
};
