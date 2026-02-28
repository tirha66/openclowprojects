// Main Runner - Test the Website Builder System
// Finds businesses, generates websites, creates Stripe links, and prepares email proposals

const { generateWebsite } = require('./generator');
const { createPaymentLink } = require('./stripe-integration');
const { generateEmailProposal } = require('./proposal-email');

// Sample UK businesses (in production, these would come from lead finder)
// These are realistic examples of local businesses that might not have websites
const testBusinesses = [
  {
    name: "Apex Plumbing Services",
    address: "42 High Street",
    phone: "0121 456 7890",
    email: "info@apexplumbing.co.uk",
    city: "Birmingham",
    type: "plumber"
  },
  {
    name: "Elite Hair & Beauty",
    address: "15 Queen Street",
    phone: "0113 234 5678",
    email: "enquiries@elitehairbeauty.co.uk",
    city: "Leeds",
    type: "hairdresser"
  },
  {
    name: "GreenThumb Gardens",
    address: "8 Victoria Road",
    phone: "0161 345 6789",
    email: "hello@greenthumbgardens.co.uk",
    city: "Manchester",
    type: "gardener"
  }
];

async function runPipeline() {
  console.log('🚀 Starting Website Builder Pipeline\n');
  console.log('='.repeat(60));
  
  const results = [];
  
  for (const business of testBusinesses) {
    console.log(`\n📋 Processing: ${business.name}`);
    console.log('-'.repeat(40));
    
    // Step 1: Generate Website
    console.log('1️⃣ Generating website...');
    const websiteResult = generateWebsite(business);
    console.log(`   ✅ Website generated: ${websiteResult.outputDir}`);
    
    // Step 2: Create Stripe Payment Link
    console.log('2️⃣ Creating Stripe payment link...');
    const paymentResult = createPaymentLink({
      businessName: business.name,
      businessEmail: business.email,
      previewUrl: websiteResult.previewUrl
    });
    console.log(`   ✅ Payment link: ${paymentResult.url}`);
    
    // Step 3: Generate Email Proposal
    console.log('3️⃣ Generating email proposal...');
    const emailProposal = generateEmailProposal({
      businessName: business.name,
      businessEmail: business.email,
      previewUrl: websiteResult.previewUrl,
      paymentLink: paymentResult.url
    });
    console.log(`   ✅ Email ready to: ${emailProposal.to}`);
    
    // Store results
    results.push({
      business,
      website: websiteResult,
      payment: paymentResult,
      email: emailProposal
    });
    
    console.log(`\n✅ Completed: ${business.name}\n`);
  }
  
  // Summary
  console.log('='.repeat(60));
  console.log('\n📊 PIPELINE COMPLETE - SUMMARY\n');
  
  results.forEach((r, i) => {
    console.log(`Business ${i + 1}: ${r.business.name}`);
    console.log(`  Type: ${r.business.type}`);
    console.log(`  Website Preview: ${r.website.outputDir}`);
    console.log(`  Stripe Payment Link: ${r.payment.url}`);
    console.log(`  Email Subject: ${r.email.subject}`);
    console.log();
  });
  
  return results;
}

// Run if executed directly
if (require.main === module) {
  runPipeline()
    .then(results => {
      console.log('\n✨ All businesses processed successfully!');
      console.log('\nGenerated files:');
      console.log('  - generator.js: Website generator');
      console.log('  - stripe-integration.js: Payment links');
      console.log('  - proposal-email.js: Email templates');
      console.log('  - demos/: Generated website folders');
    })
    .catch(err => {
      console.error('❌ Error:', err);
      process.exit(1);
    });
}

module.exports = { runPipeline, testBusinesses };
