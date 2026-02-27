# Cron Schedule - Real Estate Agent / Brokerage

## Overview
Automated tasks for keeping leads warm, following up with clients, and keeping [Agent/Owner Name] informed daily.

---

## ⏰ Daily Tasks

### Morning Briefing (9:00 AM weekdays)
Send daily summary to owner: new leads, showing requests, expiring listings, price reduction reminders.

```bash
openclaw cron add --name "realestate-morning-briefing" --schedule '{"type":"cron","expr":"0 9 * * 1-5"}' \
  --cmd "openclaw run 'Prepare a morning real estate briefing. Check memory/leads.md for new or uncontacted leads. Check memory/listings.md for listings with no activity in 14+ days or expiring soon. List any showings scheduled today. Summarize in under 200 words and message [Owner Contact] on [channel].'"
```

### Evening Wrap-Up (6:00 PM weekdays)
End-of-day notes: leads contacted today, showings completed, follow-ups needed tomorrow.

```bash
openclaw cron add --name "realestate-eod-wrapup" --schedule '{"type":"cron","expr":"0 18 * * 1-5"}' \
  --cmd "openclaw run 'Generate an end-of-day real estate summary. Note any leads that weren't followed up, tomorrow'\''s showings, and pending offers or counteroffers. Message [Owner Contact].'"
```

---

## 📋 Lead Follow-Up

### New Lead 24h Follow-Up Check (Every 2 hours, business hours)
Remind agent to follow up with any leads that haven't been contacted within 24 hours.

```bash
openclaw cron add --name "realestate-lead-followup" --schedule '{"type":"cron","expr":"0 9,11,13,15,17 * * 1-5"}' \
  --cmd "openclaw run 'Check memory/leads.md for any leads received more than 24 hours ago with no follow-up noted. Alert [Owner Contact] with their name, source, and inquiry if any are found.'"
```

### Weekly Lead Pipeline Review (Monday 8:30 AM)
Full lead pipeline review: active, stale, converted, lost.

```bash
openclaw cron add --name "realestate-pipeline-review" --schedule '{"type":"cron","expr":"30 8 * * 1"}' \
  --cmd "openclaw run 'Compile a weekly lead pipeline report from memory/leads.md. Categorize as: new this week, actively engaged, stale (no contact 7+ days), closed/won, lost. Send to [Owner Contact].'"
```

---

## 🏠 Listing Management

### Listing Staleness Check (Wednesday 10:00 AM)
Flag any active listings with no showings or price changes in 21+ days.

```bash
openclaw cron add --name "realestate-listing-check" --schedule '{"type":"cron","expr":"0 10 * * 3"}' \
  --cmd "openclaw run 'Review memory/listings.md. Flag any listings active for 21+ days with no showing activity. Suggest price reduction or marketing refresh for each. Send report to [Owner Contact].'"
```

### Open House Reminder (Friday 3:00 PM)
Remind about any weekend open houses and tasks to prepare.

```bash
openclaw cron add --name "realestate-openhouse-reminder" --schedule '{"type":"cron","expr":"0 15 * * 5"}' \
  --cmd "openclaw run 'Check memory/calendar.md for any open houses scheduled this weekend. Send [Owner Contact] a prep checklist: signage, flyers, listing sheets, lockbox check, and social media post reminder.'"
```

---

## 📈 Monthly Tasks

### Monthly Market Update Reminder (1st of month, 9:00 AM)
Prompt agent to send monthly market update newsletter to client list.

```bash
openclaw cron add --name "realestate-monthly-update" --schedule '{"type":"cron","expr":"0 9 1 * *"}' \
  --cmd "openclaw run 'Remind [Owner Contact]: It'\''s the 1st — time to send the monthly market update to your client list. Draft a market summary template covering average days on market, median price trends, and inventory for [City/Area]. Send draft to [Owner Contact] for review.'"
```

### Birthday/Anniversary Client Check (Daily 8:00 AM)
Check client list for upcoming birthdays or home purchase anniversaries to send personal notes.

```bash
openclaw cron add --name "realestate-client-anniversaries" --schedule '{"type":"cron","expr":"0 8 * * *"}' \
  --cmd "openclaw run 'Check memory/clients.md for any clients with a birthday or home purchase anniversary within the next 7 days. Draft a brief personal note for [Owner Contact] to review and send.'"
```
