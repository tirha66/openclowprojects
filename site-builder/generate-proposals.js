const fs = require('fs');
const path = require('path');

const ukBusinesses = require('./leads/uk-businesses.json');
const usaBusinesses = require('./leads/usa-businesses.json');
const businesses = [...ukBusinesses, ...usaBusinesses];

const proposals = businesses.map(biz => {
  const slug = biz.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return {
    name: biz.name,
    city: biz.city,
    country: biz.city === 'New York' || biz.city === 'Los Angeles' || biz.city === 'Chicago' || biz.city === 'Miami' || biz.city === 'Houston' || biz.city === 'Phoenix' || biz.city === 'Denver' || biz.city === 'Seattle' || biz.city === 'Atlanta' || biz.city === 'Boston' || biz.city === 'Dallas' ? 'USA' : 'UK',
    email: biz.email,
    phone: biz.phone,
    type: biz.type,
    services: biz.services,
    subject: `We built a website for ${biz.name}!`,
    body: `Hi,

We noticed that ${biz.name} in ${biz.city} doesn't have a professional website yet — so we built one for you!

Your website preview:
https://stunnersite.vercel.app/demo/${slug}

It includes:
✓ All your services: ${biz.services.join(', ')}
✓ Your contact details: ${biz.phone}
✓ Professional design that works on mobile
✓ Ready for customers to find you online

Claim your website for just £199:
https://buy.stripe.com/test

This is a special offer — we'd love to help you get online!

Best,
Abdelhak
tigha66@gmail.com`
  };
});

// Save all proposals
fs.writeFileSync(path.join(__dirname, 'output', 'all-proposals.json'), JSON.stringify(proposals, null, 2));

// Output summary
console.log('📧 ALL PROPOSAL EMAILS READY\n');
console.log('='.repeat(60));

proposals.forEach((p, i) => {
  console.log(`${i+1}. ${p.name} (${p.city}, ${p.country})`);
  console.log(`   📧 ${p.email}`);
  console.log(`   📞 ${p.phone}`);
  console.log(`   💷 £199 - ${p.subject}`);
  console.log('');
});

console.log('='.repeat(60));
console.log(`\n✅ Total: ${proposals.length} businesses ready`);
console.log(`🇬🇧 UK: ${proposals.filter(p => p.country === 'UK').length}`);
console.log(`🇺🇸 USA: ${proposals.filter(p => p.country === 'USA').length}`);
