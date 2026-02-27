# cron.md — Contractor / Trades Scheduled Tasks

## Overview
Rex keeps [Business Name]'s lead pipeline moving, prevents jobs from slipping through the cracks, and makes sure the owner starts every day knowing what's on the board.

---

## Jobs

### 1. Morning Job Board Briefing
Daily summary of scheduled jobs, open estimates, and follow-ups needed.

```bash
openclaw cron add \
  --name "contractor-morning-briefing" \
  --schedule "0 6 * * 1-6" \
  --prompt "You are Rex, the AI coordinator for [Business Name]. Generate a morning job board summary for [Owner Name]: today's scheduled jobs (address, job type, tech assigned), open/pending estimates not yet accepted, leads from the last 24h that need follow-up, and any callbacks or warranty jobs open. Keep it tight — it's early. Send via [channel]." \
  --channel [owner-channel]
```

### 2. Lead Follow-Up (Unbooked Estimates)
Follow up with leads who requested an estimate but haven't booked.

```bash
openclaw cron add \
  --name "contractor-estimate-followup" \
  --schedule "0 9 * * 1-5" \
  --prompt "Review [CRM/Spreadsheet] for [Business Name]. Find leads where an estimate was sent but no job was booked, and it's been 2–5 days since follow-up. Send each lead a brief, friendly check-in: 'Hi [Name], just checking in — did you have any questions about the estimate we sent? We're ready to get you scheduled.' Sign off as Rex from [Business Name]. Track follow-ups." \
  --channel [customer-messaging-channel]
```

### 3. Post-Job Review Request
Request a Google/Yelp review after every completed job.

```bash
openclaw cron add \
  --name "contractor-post-job-review" \
  --schedule "0 17 * * 1-6" \
  --prompt "Check [Job Management System] for [Business Name] for jobs marked complete today. For each completed job, send the customer a follow-up message: thank them for the business, ask if everything was done to their satisfaction, and invite them to leave a Google review: [Review Link]. If they express any dissatisfaction, flag immediately for [Owner Name]. Sign off as Rex." \
  --channel [customer-messaging-channel]
```

### 4. Weekly Estimate Aging Report
Flag estimates that have gone cold so the owner can decide to follow up or close.

```bash
openclaw cron add \
  --name "contractor-estimate-aging" \
  --schedule "0 7 * * 1" \
  --prompt "Monday morning: pull all open/pending estimates from [CRM] for [Business Name] that are older than 7 days and not yet booked or closed. Create a summary for [Owner Name] listing: customer name, job type, estimate amount, days since sent, and last contact date. Send via [channel] with a recommendation on which to follow up vs. close." \
  --channel [owner-channel]
```

### 5. Appointment Reminder to Customer (Day Before)
Reduce no-shows and wasted drive time.

```bash
openclaw cron add \
  --name "contractor-job-reminder" \
  --schedule "0 15 * * 1-5" \
  --prompt "Check [Scheduling System] for [Business Name] for jobs scheduled tomorrow. Send each customer a reminder: what time the tech arrives (arrival window: [e.g., 8–10am]), tech's name, what they need to prepare (e.g., 'Please ensure access to the [crawlspace/panel/water shutoff]'), and a contact number for day-of questions. Sign off as Rex." \
  --channel [customer-messaging-channel]
```

### 6. Seasonal Service Campaign
Promote seasonal services before the rush hits.

```bash
openclaw cron add \
  --name "contractor-seasonal-outreach" \
  --schedule "0 9 1 3,6,9,12 *" \
  --prompt "It's the start of a new season. Draft a seasonal service reminder message for [Business Name]'s past customers. Use context: Spring = AC tune-up/drain inspection; Summer = cooling system checkup; Fall = furnace/heating prep; Winter = pipe insulation/emergency readiness. Match the current month. Invite them to book early before the seasonal rush. Send to opted-in past customers via [channel]." \
  --channel [marketing-channel]
```

### 7. End-of-Week Billing & Receivables Reminder
Prompt owner to review outstanding invoices.

```bash
openclaw cron add \
  --name "contractor-eow-billing" \
  --schedule "0 16 * * 5" \
  --prompt "Friday wrap-up for [Business Name]: pull a list of outstanding invoices from [Billing System] that are 7+ days past due. Send [Owner Name] a summary: customer name, amount, days overdue, last payment contact. Recommend which accounts to follow up on Monday. Send via [channel]." \
  --channel [owner-channel]
```

---

## Notes
- Emergency calls should always route to a real human — don't rely on cron for emergencies
- Integrate with ServiceTitan, Jobber, Housecall Pro, or your field management system
- Seasonal cron runs on the 1st of March, June, September, December
- Adjust UTC offsets for your local timezone
