# 🤖 AI Sales Automation System

Automated outreach system for StaffFlow AI employee service.

## Quick Start

```bash
cd /root/.openclaw/workspace/ai-sales
node index.js 20
```

This processes 20 leads and generates personalized outreach messages.

## Files

- `index.js` - Main automation runner
- `leads/pending/` - CSV files with business leads
- `templates/` - Message templates
- `logs/` - Generated outreach batches

## Lead Sources

- UK: London, Manchester, Birmingham, Leeds
- USA: New York, Los Angeles

Niches: Salons, Gyms, Dental, Restaurants, Contractors, Real Estate

## Daily Workflow

1. Run `node index.js` - generates 20 personalized messages
2. Copy messages from logs/batch-{date}.md
3. Send via WhatsApp/Email
4. Move leads to contacted/ after outreach

## Automation

Set up via OpenClaw cron for daily execution:
- 9am: Generate and send outreach
- 6pm: Follow-up on unanswered

## Notes

- Always review messages before sending
- Follow up personally, not just auto-email
- Track responses and close deals manually
