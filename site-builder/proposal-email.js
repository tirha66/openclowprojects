// Email Proposal Generator
// Creates personalized email proposals for businesses

/**
 * Generates a ready-to-send email proposal
 * @param {Object} params
 * @param {string} params.businessName - Name of the business
 * @param {string} params.businessEmail - Email to send to
 * @param {string} params.previewUrl - URL to preview the website
 * @param {string} params.paymentLink - Stripe payment link
 * @param {string} params.paymentLinkText - Text for the payment button
 * @returns {string} HTML email content
 */
function generateEmailProposal({
  businessName,
  businessEmail,
  previewUrl,
  paymentLink,
  paymentLinkText = 'Claim Your Website for £199'
}) {
  const subject = `We Built a Website for ${businessName} 🏗️`;
  
  const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #141414; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                🏗️ We Built a Website for ${businessName}
              </h1>
            </td>
          </tr>
          
          <!-- Preview Section -->
          <tr>
            <td style="padding: 40px; text-align: center;">
              <p style="color: #a1a1a1; font-size: 16px; margin: 0 0 20px 0;">
                Check out your new website preview:
              </p>
              <a href="${previewUrl}" style="display: inline-block; background-color: #1a1a1a; color: #3b82f6; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; border: 1px solid #3b82f6;">
                👁️ View Website Preview
              </a>
            </td>
          </tr>
          
          <!-- What's Included -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; padding: 30px;">
                <tr>
                  <td>
                    <h3 style="color: #ffffff; margin: 0 0 20px 0; font-size: 20px;">✨ What's Included:</h3>
                    <ul style="color: #a1a1a1; margin: 0; padding-left: 20px; line-height: 2;">
                      <li>Professional, mobile-friendly design</li>
                      <li>Your business services showcased</li>
                      <li>Contact details prominently displayed</li>
                      <li>Domain name setup (.co.uk, .com)</li>
                      <li>1 year free hosting</li>
                      <li>SEO optimization for local search</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA Section -->
          <tr>
            <td style="padding: 0 40px 40px 40px; text-align: center;">
              <p style="color: #a1a1a1; font-size: 16px; margin: 0 0 20px 0;">
                Claim your website today and stand out from the competition!
              </p>
              <div style="font-size: 36px; font-weight: 700; color: #3b82f6; margin-bottom: 20px;">
                £199 <span style="font-size: 16px; color: #a1a1a1; font-weight: 400;">one-time</span>
              </div>
              <a href="${paymentLink}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 18px 48px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 18px;">
                🚀 ${paymentLinkText}
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 30px 40px; text-align: center; border-top: 1px solid #2a2a2a;">
              <p style="color: #666666; font-size: 14px; margin: 0;">
                Questions? Reply to this email or call us.
              </p>
              <p style="color: #666666; font-size: 12px; margin: 10px 0 0 0;">
                © ${new Date().getFullYear()} WebBuilder Pro
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  const textEmail = `
We Built a Website for ${businessName} 🏗️

Hi there,

We've created a professional website for ${businessName}! 

Preview your website here: ${previewUrl}

What's included:
- Professional, mobile-friendly design
- Your business services showcased
- Contact details prominently displayed
- Domain name setup (.co.uk, .com)
- 1 year free hosting
- SEO optimization for local search

Claim your website for just £199 (one-time):
${paymentLink}

Questions? Just reply to this email.

Best regards,
The WebBuilder Pro Team
`.trim();

  return {
    subject,
    html: htmlEmail,
    text: textEmail,
    to: businessEmail,
    from: 'hello@webbuilderpro.co.uk'
  };
}

/**
 * Generates a plain text version of the proposal
 */
function generateTextProposal({ businessName, businessEmail, previewUrl, paymentLink }) {
  return {
    subject: `We Built a Website for ${businessName}`,
    body: generateEmailProposal({ businessName, businessEmail, previewUrl, paymentLink }).text,
    to: businessEmail
  };
}

module.exports = {
  generateEmailProposal,
  generateTextProposal
};
