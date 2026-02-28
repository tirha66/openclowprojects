// Website Generator for Local Businesses
// Generates professional single-page websites using Next.js

const fs = require('fs');
const path = require('path');

const SERVICE_TEMPLATES = {
  plumber: {
    name: "Plumber",
    services: ["Emergency Plumbing Repairs", "Boiler Installation & Repair", "Bathroom Fitting", "Leak Detection", "Central Heating"],
    tagline: "Professional Plumbing Services"
  },
  electrician: {
    name: "Electrician",
    services: ["Electrical Installations", "Rewiring", "Fuse Board Upgrades", "PAT Testing", "Emergency Electrical Repairs"],
    tagline: "Certified Electrical Solutions"
  },
  "hairdresser": {
    name: "Hairdresser",
    services: ["Hair Cutting & Styling", "Colouring & Highlights", "Treatments & Conditioning", "Bridal Hair", "Men's Grooming"],
    tagline: "Style & Beauty Experts"
  },
  restaurant: {
    name: "Restaurant",
    services: ["Fine Dining", "Private Events", "Catering", "Takeaway", "Sunday Roasts"],
    tagline: "Exquisite Cuisine"
  },
  "carpenter": {
    name: "Carpenter",
    services: ["Custom Furniture", "Kitchen Fitting", "Door & Window Frames", "Flooring", "Cabinet Making"],
    tagline: "Quality Craftsmanship"
  },
  "gardener": {
    name: "Gardener",
    services: ["Garden Design", "Lawn Maintenance", "Tree Surgery", "Patio Installation", "Hedge Trimming"],
    tagline: "Beautiful Outdoor Spaces"
  },
  "cleaner": {
    name: "Cleaner",
    services: ["Domestic Cleaning", "End of Tenancy", "Office Cleaning", "Carpet Cleaning", "Window Cleaning"],
    tagline: "Sparkling Clean Results"
  },
  "mechanic": {
    name: "Mechanic",
    services: ["MOT Testing", "Engine Repair", "Brake & Clutch", "Tyre Replacement", "Car Servicing"],
    tagline: "Reliable Vehicle Services"
  },
  "beautician": {
    name: "Beautician",
    services: ["Facials & Skincare", "Manicures & Pedicures", "Massage Therapy", "Waxing & Threading", "Makeup Artistry"],
    tagline: "Relaxation & Rejuvenation"
  },
  "taxi": {
    name: "Taxi Service",
    services: ["Airport Transfers", "Local Journeys", "Corporate Accounts", "School Runs", "24/7 Service"],
    tagline: "Safe & Reliable Transport"
  },
  default: {
    name: "Business",
    services: ["Professional Service 1", "Professional Service 2", "Professional Service 3", "Consultation", "Customer Support"],
    tagline: "Quality Service Guaranteed"
  }
};

function getBusinessTypeInfo(type) {
  const normalizedType = type.toLowerCase().trim();
  return SERVICE_TEMPLATES[normalizedType] || SERVICE_TEMPLATES.default;
}

function generateSlug(businessName) {
  return businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateWebsite(business) {
  const { name, address, phone, email, city, type } = business;
  const slug = generateSlug(name);
  const typeInfo = getBusinessTypeInfo(type);
  const outputDir = path.join(__dirname, 'demos', slug);
  
  // Create directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate Next.js website
  const websiteFiles = {
    'package.json': generatePackageJson(name, slug),
    'next.config.js': generateNextConfig(),
    'app/layout.js': generateLayout(name),
    'app/page.js': generatePage(business, typeInfo),
    'app/globals.css': generateStyles(),
    'app/components/Navbar.js': generateNavbar(name),
    'app/components/Hero.js': generateHero(name, typeInfo),
    'app/components/Services.js': generateServices(typeInfo),
    'app/components/Contact.js': generateContact(business),
    'app/components/Footer.js': generateFooter(business)
  };

  Object.entries(websiteFiles).forEach(([filePath, content]) => {
    const fullPath = path.join(outputDir, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content);
  });

  console.log(`✅ Generated website for ${name} at ${outputDir}`);
  return { slug, outputDir, previewUrl: `/demos/${slug}` };
}

function generatePackageJson(businessName, slug) {
  return JSON.stringify({
    name: slug,
    version: "0.1.0",
    private: true,
    scripts: {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    dependencies: {
      "next": "14.2.3",
      "react": "^18",
      "react-dom": "^18"
    },
    devDependencies: {
      "eslint": "^8",
      "eslint-config-next": "14.2.3"
    }
  }, null, 2);
}

function generateNextConfig() {
  return `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
`;
}

function generateLayout(businessName) {
  return `import './globals.css'

export const metadata = {
  title: '${businessName}',
  description: 'Professional services in the UK',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`;
}

function generatePage(business, typeInfo) {
  return `'use client'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero 
        businessName="${business.name}"
        tagline="${typeInfo.tagline}"
      />
      <Services 
        services={${JSON.stringify(typeInfo.services)}}
        businessType="${typeInfo.name}"
      />
      <Contact 
        phone="${business.phone}"
        email="${business.email}"
        address="${business.address}"
        city="${business.city}"
      />
      <Footer businessName="${business.name}" />
    </main>
  )
}
`;
}

function generateStyles() {
  return `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  --bg-card: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #a1a1a1;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  --border: #2a2a2a;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  display: inline-block;
  padding: 12px 28px;
  background-color: var(--accent);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  border: 2px solid var(--accent);
}

.btn-secondary:hover {
  background-color: var(--accent);
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  padding: 20px 0;
  z-index: 1000;
  border-bottom: 1px solid var(--border);
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 30px;
  list-style: none;
}

.nav-links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--accent);
}

/* Hero */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.hero-content {
  max-width: 700px;
}

.hero h1 {
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 20px;
}

.hero h1 span {
  color: var(--accent);
}

.hero p {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 30px;
}

.hero-buttons {
  display: flex;
  gap: 15px;
}

/* Services */
.services {
  padding: 100px 0;
  background-color: var(--bg-secondary);
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.section-header p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.service-card {
  background: var(--bg-card);
  padding: 40px 30px;
  border-radius: 16px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent);
}

.service-icon {
  width: 60px;
  height: 60px;
  background: var(--accent);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.service-card h3 {
  font-size: 1.25rem;
  margin-bottom: 10px;
}

.service-card p {
  color: var(--text-secondary);
}

/* Contact */
.contact {
  padding: 100px 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.contact-info h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.contact-info p {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 30px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.contact-item span {
  color: var(--accent);
  font-size: 1.25rem;
}

.cta-box {
  background: var(--bg-card);
  padding: 50px;
  border-radius: 20px;
  border: 1px solid var(--border);
  text-align: center;
}

.cta-box h3 {
  font-size: 1.75rem;
  margin-bottom: 15px;
}

.cta-box p {
  color: var(--text-secondary);
  margin-bottom: 25px;
}

.cta-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 20px;
}

/* Footer */
.footer {
  padding: 40px 0;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer p {
  color: var(--text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .nav-links {
    display: none;
  }
}
`;
}

function generateNavbar(businessName) {
  return `'use client'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <a href="#" className="logo">${businessName}</a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}
`;
}

function generateHero(businessName, typeInfo) {
  return `'use client'

export default function Hero({ businessName, tagline }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            Professional <span>${typeInfo.name}</span> Services in the UK
          </h1>
          <p>
            ${tagline}. Delivering excellence to homes and businesses across the region. 
            Quality workmanship guaranteed on every job.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn">Get a Quote</a>
            <a href="#services" className="btn btn-secondary">Our Services</a>
          </div>
        </div>
      </div>
    </section>
  )
}
`;
}

function generateServices(typeInfo) {
  return `'use client'

export default function Services({ services, businessType }) {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive ${businessType} solutions tailored to your needs</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">✓</div>
              <h3>{service}</h3>
              <p>Professional service with attention to detail and customer satisfaction.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`;
}

function generateContact(business) {
  return `'use client'

export default function Contact({ phone, email, address, city }) {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>
              Ready to start your project? Contact us today for a free, no-obligation quote. 
              We're here to help with all your needs.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span>📞</span>
                <a href="tel:${phone}">${phone}</a>
              </div>
              <div className="contact-item">
                <span>✉️</span>
                <a href="mailto:${email}">${email}</a>
              </div>
              <div className="contact-item">
                <span>📍</span>
                <span>${address}, ${city}</span>
              </div>
            </div>
          </div>
          <div className="cta-box">
            <h3>Coming Soon</h3>
            <p>Our new website is under construction. Contact us now to discuss your project!</p>
            <div className="cta-price">£199</div>
            <a href="tel:${phone}" className="btn">Call Now</a>
          </div>
        </div>
      </div>
    </section>
  )
}
`;
}

function generateFooter(businessName) {
  return `export default function Footer({ businessName }) {
  return (
    <footer className="footer">
      <div className="container">
        <p>© ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      </div>
    </footer>
  )
}
`;
}

// Export for use in other modules
module.exports = { generateWebsite, generateSlug, getBusinessTypeInfo };
