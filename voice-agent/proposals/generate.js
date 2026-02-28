const fs = require('fs');
const prospects = require('../leads/smb-prospects.json');

const proposals = prospects.map(p => ({
  ...p,
  subject: `AI Voice Agent for ${p.name}?`,
  body: `Hi,

I visited ${p.name}'s website (${p.website}) and noticed you don't have a voice AI agent yet.

Here's what an AI Voice Agent can do for ${p.name}:

✓ Greets visitors 24/7 with a professional voice
✓ Answers questions about your services instantly
✓ Books appointments hands-free
✓ Transfers tricky calls to you directly
✓ Works in multiple languages

It's like having a receptionist that never sleeps!

Starting from just £299/month.

Would you be open to a quick demo? I'd love to show you how it works.

Best,
Abdelhak
tigha66@gmail.com

See it in action: https://voiceagent-ten.vercel.app`
}));

fs.writeFileSync(__dirname + '/proposals.json', JSON.stringify(proposals, null, 2));

console.log('📧 AI VOICE AGENT PROPOSALS READY\n');
proposals.forEach((p, i) => {
  console.log(`${i+1}. ${p.name} (${p.city})`);
  console.log(`   📧 ${p.email}`);
  console.log(`   🌐 ${p.website}`);
});
console.log(`\n✅ ${proposals.length} businesses ready for outreach`);
