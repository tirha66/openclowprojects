# Cron Schedule - Gym / Fitness Studio

## Overview
Automated tasks for member retention, class reminders, trial follow-ups, and keeping [Owner/Manager Name] on top of daily operations.

---

## ⏰ Daily Tasks

### Morning Briefing (7:30 AM every day)
Send daily ops snapshot: today's class capacity, new sign-ups, expiring memberships, and staff notes.

```bash
openclaw cron add --name "gym-morning-briefing" --schedule '{"type":"cron","expr":"30 7 * * *"}' \
  --cmd "openclaw run 'Generate a morning gym briefing. Check memory/members.md for memberships expiring in the next 7 days. Check memory/classes.md for today'\''s classes and capacity. Note any new trial sign-ups from the past 24 hours. Send summary to [Owner Contact] via [channel].'"
```

### Evening Wrap-Up (8:00 PM every day)
End-of-day: attendance summary, no-shows on intro sessions, cash/front-desk notes.

```bash
openclaw cron add --name "gym-eod-wrapup" --schedule '{"type":"cron","expr":"0 20 * * *"}' \
  --cmd "openclaw run 'Generate an end-of-day gym summary. Note class attendance highs/lows, any trial members who attended or no-showed today, and any open front-desk issues. Send to [Owner Contact].'"
```

---

## 🎯 Member Retention & Follow-Up

### Trial Member Follow-Up (Daily 10:00 AM)
Flag trial members who are on day 3 or day 6 — prime time to convert to full membership.

```bash
openclaw cron add --name "gym-trial-followup" --schedule '{"type":"cron","expr":"0 10 * * *"}' \
  --cmd "openclaw run 'Check memory/trials.md for trial members on day 3 or day 6 of their trial. Generate a personalized outreach message for each: check in on their experience and invite them to discuss full membership options. Send list to [Owner/Staff Contact] to make calls or send messages.'"
```

### Expiring Membership Alert (Daily 9:00 AM)
Catch memberships expiring in 7 days before they lapse.

```bash
openclaw cron add --name "gym-membership-expiry" --schedule '{"type":"cron","expr":"0 9 * * *"}' \
  --cmd "openclaw run 'Check memory/members.md for memberships expiring within 7 days. Generate renewal outreach messages for each. Alert [Owner/Staff Contact] with the list so they can follow up personally or trigger automated emails.'"
```

### Win-Back Campaign (Every Monday 9:00 AM)
Identify members who haven't checked in within 21+ days.

```bash
openclaw cron add --name "gym-winback" --schedule '{"type":"cron","expr":"0 9 * * 1"}' \
  --cmd "openclaw run 'Check memory/checkins.md for active members with no check-in in 21+ days. Generate a friendly re-engagement message for each: acknowledge their absence without guilt, offer a free class or check-in. Send list to [Owner Contact].'"
```

---

## 📅 Class & Schedule Management

### Weekly Class Fill Rate Report (Sunday 7:00 PM)
Review next week's class schedule and flag any low-enrollment classes.

```bash
openclaw cron add --name "gym-class-fillrate" --schedule '{"type":"cron","expr":"0 19 * * 0"}' \
  --cmd "openclaw run 'Check memory/classes.md for next week'\''s scheduled classes. Flag any classes below [50%] capacity. Suggest promotional actions (social post, email blast, discount) to drive bookings. Send report to [Owner Contact].'"
```

---

## 📈 Monthly Tasks

### Monthly Member Report (1st of month, 8:00 AM)
High-level metrics: new members, cancellations, net growth, revenue.

```bash
openclaw cron add --name "gym-monthly-report" --schedule '{"type":"cron","expr":"0 8 1 * *"}' \
  --cmd "openclaw run 'Compile a monthly gym membership report from memory/members.md. Include: new members this month, cancellations, net change, active member count, and trial conversion rate. Send to [Owner Contact].'"
```

### Equipment Check Reminder (1st of month, 9:00 AM)
Remind staff to perform monthly equipment inspection.

```bash
openclaw cron add --name "gym-equipment-check" --schedule '{"type":"cron","expr":"0 9 1 * *"}' \
  --cmd "openclaw run 'Send [Owner/Manager Contact] a reminder: monthly equipment inspection is due. Checklist: cardio machines, free weights, benches, mats, cable machines, locker rooms, and safety equipment. Log any issues in memory/maintenance.md.'"
```
