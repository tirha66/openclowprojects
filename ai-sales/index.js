const fs = require('fs');
const path = require('path');

const leadsDir = path.join(__dirname, 'leads', 'pending');
const templatesDir = path.join(__dirname, 'templates');
const logsDir = path.join(__dirname, 'logs');

// Load leads from CSV
function loadLeads() {
  const files = fs.readdirSync(leadsDir).filter(f => f.endsWith('.csv'));
  let allLeads = [];
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(leadsDir, file), 'utf-8');
    const lines = content.trim().split('\n');
    const headers = lines[0].split(',');
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const lead = {};
      headers.forEach((h, idx) => lead[h] = values[idx] || '');
      lead.sourceFile = file;
      allLeads.push(lead);
    }
  }
  return allLeads;
}

// Get niche from filename
function getNiche(filename) {
  if (filename.includes('salon')) return 'salon';
  if (filename.includes('gym')) return 'gym';
  if (filename.includes('dental')) return 'dental';
  if (filename.includes('restaurant')) return 'restaurant';
  if (filename.includes('contractor')) return 'contractor';
  if (filename.includes('realestate')) return 'realestate';
  return 'general';
}

// Generate personalized message
function generateOutreach(lead, niche) {
  const templates = {
    salon: {
      dm: `Hi! I see ${lead.Name} in ${lead.City} — do you ever miss customer messages outside hours? We help salons capture every lead 24/7 with an AI receptionist. Quick 2-min demo? 🎯`,
      subject: `${lead.Name} + AI Receptionist — Quick Demo?`,
      body: `Hi,

I noticed ${lead.Name} in ${lead.City} might be missing leads when you're busy with clients.

We help businesses like yours handle inquiries 24/7 with an AI employee — answering questions, booking appointments, following up with leads.

Would you be open to a 2-minute demo? No pressure — just show you how it works.

Best,
Abdelhak

P.S. See how it works: https://stunnersite.vercel.app`
    },
    gym: {
      dm: `Hi! Does ${lead.Name} in ${lead.City} ever miss member inquiries overnight? We help gyms capture every lead 24/7 with an AI receptionist. Quick 2-min demo? 💪`,
      subject: `${lead.Name} + AI Staff — Free Demo?`,
      body: `Hi,

I noticed ${lead.Name} in ${lead.City} might be missing member inquiries when your team is busy.

We help gyms handle questions 24/7 with an AI employee — member inquiries, class bookings, follow-ups.

Would you be open to a 2-minute demo?

Best,
Abdelhak

https://stunnersite.vercel.app`
    },
    dental: {
      dm: `Hi! Does ${lead.Name} in ${lead.City} miss patient calls outside hours? We help dental clinics capture every inquiry 24/7. Quick demo? 🦷`,
      subject: `${lead.Name} + AI Receptionist — Quick Demo?`,
      body: `Hi,

We help dental clinics like ${lead.Name} handle patient inquiries 24/7 — appointment bookings, questions, follow-ups.

Would a 2-minute demo help?

Best,
Abdelhak

https://stunnersite.vercel.app`
    },
    restaurant: {
      dm: `Hi! Does ${lead.Name} in ${lead.City} miss reservation inquiries? We help restaurants capture every table request 24/7. Quick demo? 🍽️`,
      subject: `${lead.Name} + AI Host — Free Demo?`,
      body: `Hi,

We help restaurants like ${lead.Name} handle reservations and inquiries 24/7.

Interested in a quick demo?

Best,
Abdelhak

https://stunnersite.vercel.app`
    },
    contractor: {
      dm: `Hi! Does ${lead.Name} in ${lead.City} miss customer calls while on jobs? We help contractors capture every lead 24/7. Quick demo? 🔧`,
      subject: `${lead.Name} + AI Receptionist — Quick Demo?`,
      body: `Hi,

We help contractors like ${lead.Name} never miss a lead — even when you're on a job.

Would a 2-minute demo help?

Best,
Abdelhak

https://stunnersite.vercel.app`
    },
    realestate: {
      dm: `Hi! Does ${lead.Name} in ${lead.City} miss property inquiries? We help agents capture every lead 24/7. Quick demo? 🏠`,
      subject: `${lead.Name} + AI Assistant — Free Demo?`,
      body: `Hi,

We help real estate agents like ${lead.Name} capture every property inquiry — 24/7.

Interested in a quick demo?

Best,
Abdelhak

https://stunnersite.vercel.app`
    }
  };
  
  return templates[niche] || templates.salon;
}

// Daily runner
function runDaily(batchSize = 20) {
  console.log('🤖 AI Sales System - Daily Runner\n');
  console.log('='.repeat(50));
  
  const leads = loadLeads().filter(l => l.Email && l.Email.includes('@'));
  const batch = leads.slice(0, batchSize);
  
  console.log(`Found ${leads.length} leads with emails`);
  console.log(`Processing first ${batch.length} leads...\n`);
  
  let output = `# 📬 Today's Outreach Batch (${new Date().toLocaleDateString()})\n\n`;
  output += `Total leads ready: ${leads.length}\n`;
  output += `Processing: ${batch.length}\n\n`;
  output += `---\n\n`;
  
  for (const lead of batch) {
    const niche = getNiche(lead.sourceFile);
    const outreach = generateOutreach(lead, niche);
    
    output += `## ${lead.Name} (${lead.City}) - ${niche}\n\n`;
    output += `**Phone:** ${lead.Phone || 'N/A'}\n`;
    output += `**Email:** ${lead.Email}\n`;
    output += `**Source:** ${lead.sourceFile}\n\n`;
    
    output += `### 📱 WhatsApp/Instagram DM\n${outreach.dm}\n\n`;
    
    output += `### 📧 Email Subject\n${outreach.subject}\n\n`;
    
    output += `### 📧 Email Body\n${outreach.body}\n\n`;
    
    output += `---\n\n`;
  }
  
  // Save today's batch
  const today = new Date().toISOString().split('T')[0];
  fs.writeFileSync(path.join(logsDir, `batch-${today}.md`), output);
  
  console.log(output);
  console.log('\n✅ Batch saved to logs/batch-' + today + '.md');
  console.log('\n📋 NEXT STEPS:');
  console.log('1. Copy each message');
  console.log('2. Send via WhatsApp/Email');
  console.log('3. Track responses in leads/');
}

// Run if called directly
if (require.main === module) {
  runDaily(process.argv[2] ? parseInt(process.argv[2]) : 20);
}

module.exports = { loadLeads, generateOutreach, runDaily };
