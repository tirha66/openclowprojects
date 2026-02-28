const fs = require('fs');
const path = require('path');

const ukBusinesses = require('./leads/uk-businesses.json');
const usaBusinesses = require('./leads/usa-businesses.json');
const businesses = [...ukBusinesses, ...usaBusinesses];

const template = (biz) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${biz.name} - Professional ${biz.type.charAt(0).toUpperCase() + biz.type.slice(1)} Services in ${biz.city}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #fff; line-height: 1.6; }
    .hero { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 80px 20px; text-align: center; }
    .hero h1 { font-size: 3rem; margin-bottom: 10px; background: linear-gradient(90deg, #00d4ff, #7b2cbf); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero p { color: #aaa; font-size: 1.2rem; }
    .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
    .services { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 40px 0; }
    .service-card { background: #1a1a2e; padding: 30px; border-radius: 12px; border: 1px solid #333; }
    .service-card h3 { color: #00d4ff; margin-bottom: 10px; }
    .contact { background: linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 100%); padding: 60px 20px; text-align: center; border-radius: 12px; margin: 40px 0; }
    .contact h2 { font-size: 2rem; margin-bottom: 20px; }
    .contact-info { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; }
    .contact-item { text-align: center; }
    .contact-item span { display: block; color: #00d4ff; font-size: 1.5rem; font-weight: bold; }
    .contact-item small { color: #888; }
    footer { text-align: center; padding: 40px; color: #666; border-top: 1px solid #222; }
  </style>
</head>
<body>
  <div class="hero">
    <h1>${biz.name}</h1>
    <p>Professional ${biz.services[0].toLowerCase()} services in ${biz.city}</p>
  </div>
  <div class="container">
    <h2 style="text-align:center;margin-bottom:40px;">Our Services</h2>
    <div class="services">
      ${biz.services.map(s => `
      <div class="service-card">
        <h3>${s}</h3>
        <p>Professional ${s.toLowerCase()} services. Quality guaranteed.</p>
      </div>
      `).join('')}
    </div>
  </div>
  <div class="container">
    <div class="contact">
      <h2>Contact Us</h2>
      <div class="contact-info">
        <div class="contact-item">
          <span>📍</span>
          <small>${biz.address}</small>
        </div>
        <div class="contact-item">
          <span>📞</span>
          <small>${biz.phone}</small>
        </div>
        <div class="contact-item">
          <span>✉️</span>
          <small>${biz.email}</small>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <p>&copy; ${new Date().getFullYear()} ${biz.name}. All rights reserved.</p>
  </footer>
</body>
</html>
`;

// Generate all websites
let count = 0;
businesses.forEach(biz => {
  const slug = biz.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const dir = path.join(__dirname, 'demos', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), template(biz));
  count++;
});

console.log(`\n🎉 Generated ${count} websites!`);
console.log(`📍 UK: ${ukBusinesses.length}`);
console.log(`📍 USA: ${usaBusinesses.length}`);
