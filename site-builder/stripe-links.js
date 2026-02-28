const fs = require('fs');
const businesses = require('./leads/businesses.json');

// Website pricing packages
const packages = [
  { name: "Starter Website", price: 199, desc: "Professional single-page website with all your details" },
  { name: "Business Website", price: 399, desc: "Multi-page website with contact form" },
  { name: "Premium Package", price: 699, desc: "Full website + SEO + 1 year hosting" }
];

// Generate proposal emails
const proposals = businesses.map(biz => {
  const slug = biz.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return {
    business: biz,
    demoUrl: `https://stunnersite.vercel.app/demo/${slug}`, // Will show their preview
    proposals: [
      {
        package: packages[0],
        email: generateEmail(biz, packages[0])
      }
    ]
  };
});

function generateEmail(biz, pkg) {
  return {
    to: biz.email,
    subject: `We built a website for ${biz.name}!`,
    body: `Hi,

We noticed that ${biz.name} in ${biz.city} doesn't have a professional website yet — so we built one for you!

Preview your website here:
[demo-link]

It includes:
✓ All your services: ${biz.services.join(', ')}
✓ Your contact details: ${biz.phone}
✓ Professional design that works on mobile
✓ Ready for customers to find you online

Claim your website for just £${pkg.price}:
[payment-link]

This is a special offer — we'd love to help you get online!

Best,
Abdelhak
tigha66@gmail.com`
  };
}

// Output proposals
console.log('📧 PROPOSAL EMAILS READY TO SEND\n');
console.log('='.repeat(60));

proposals.forEach((p, i) => {
  console.log(`\n${i+1}. ${p.business.name}`);
  console.log(`   Email: ${p.proposals[0].email.to}`);
  console.log(`   Subject: ${p.proposals[0].email.subject}`);
  console.log(`   Price: £${p.proposals[0].email.body.match(/£(\d+)/)[1]}`);
  console.log('   ---');
});

fs.writeFileSync(path.join(__dirname, 'output', 'proposals.json'), JSON.stringify(proposals, null, 2));
console.log('\n✅ Proposals saved to output/proposals.json');
