# 🤖 OpenClaw SMB AI Employee Templates

Ready-to-use AI employee templates for 8 small business types, built for [OpenClaw](https://openclaw.ai).

Each template gives you a fully configured AI employee with a personality, role, cron jobs, and industry-specific FAQs — ready to deploy in minutes.

---

## 📦 What's Inside

Each business type includes 3 files:

| File | Purpose |
|------|---------|
| `SOUL.md` | Agent identity, role, personality, tone, escalation rules |
| `cron.md` | Scheduled tasks — morning briefings, follow-ups, reports |
| `memory/faqs.md` | 20 real customer FAQs with templated answers |

---

## 🏢 Business Types Included

| Folder | Business Type |
|--------|--------------|
| `salon/` | 💇 Salon / Spa |
| `restaurant/` | 🍕 Restaurant / Café |
| `contractor/` | 🔧 Contractor / Trades (plumber, electrician, etc.) |
| `realestate/` | 🏠 Real Estate Agent |
| `gym/` | 🏋️ Gym / Fitness Studio |
| `retail/` | 🛍️ Retail / E-commerce |
| `dental/` | 🦷 Medical / Dental Clinic |
| `logistics/` | 📦 Logistics / Delivery |

---

## 🚀 How to Use

### 1. Install OpenClaw
```bash
npm install -g openclaw
```
→ [openclaw.ai](https://openclaw.ai) for full setup guide

### 2. Pick your business type
```bash
cd smb-templates/salon   # or restaurant, gym, etc.
```

### 3. Copy files to your OpenClaw workspace
```bash
cp SOUL.md ~/path/to/your/workspace/
cp memory/faqs.md ~/path/to/your/workspace/memory/
```

### 4. Customise the placeholders
Open `SOUL.md` and replace:
- `[Business Name]` → your business name
- `[Owner Name]` → owner's name
- `[Your/Timezone]` → e.g. `Europe/London`, `America/New_York`
- Any other `[bracketed]` values

### 5. Set up cron jobs
Open `cron.md` and run the `openclaw cron add` commands listed inside.

### 6. Connect a channel
Link Telegram, WhatsApp, or webchat so customers can reach your AI employee:
```bash
openclaw configure
```

---

## 💡 What the AI Employee Can Do

- Answer customer questions 24/7
- Triage inquiries and flag urgent ones to the owner
- Send daily morning briefings and end-of-day summaries
- Follow up on leads and unanswered messages
- Handle bookings, FAQs, complaints, and more

---

## 🛠️ Customisation Tips

- **Add more FAQs** → edit `memory/faqs.md` with real questions your customers ask
- **Change the agent's name/personality** → edit `SOUL.md`
- **Add business knowledge** → create `memory/business.md` with your services, prices, and policies
- **Integrate your tools** → connect calendars, email, CRMs via OpenClaw skills

---

## 📖 Resources

- [OpenClaw Docs](https://docs.openclaw.ai)
- [OpenClaw Skills Marketplace (ClaWHub)](https://clawhub.com)
- [OpenClaw Discord Community](https://discord.com/invite/clawd)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)

---

## 📄 License

MIT — free to use, modify, and deploy for personal or commercial projects.

---

Made with 🦞 [OpenClaw](https://openclaw.ai)
