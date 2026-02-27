# Cron Schedule - Dental Practice

## Overview
Automated tasks for patient recall, new patient follow-up, daily huddle prep, and practice operations for [Owner/Practice Manager Name].

---

## ⏰ Daily Tasks

### Morning Huddle Brief (7:45 AM weekdays)
Pre-open summary: today's patient schedule, new patients, overdue recalls, and any open treatment plans.

```bash
openclaw cron add --name "dental-morning-huddle" --schedule '{"type":"cron","expr":"45 7 * * 1-5"}' \
  --cmd "openclaw run 'Prepare morning dental practice briefing. Check memory/schedule.md for today'\''s appointments and flag any new patients. Note any patients with incomplete treatment plans scheduled today. Check memory/recalls.md for overdue recall contacts. Send to [Owner/Manager Contact] via [channel].'"
```

### End-of-Day Wrap-Up (5:30 PM weekdays)
EOD: no-shows, reschedules needed, new patient follow-ups, treatment plan discussions pending.

```bash
openclaw cron add --name "dental-eod-wrapup" --schedule '{"type":"cron","expr":"30 17 * * 1-5"}' \
  --cmd "openclaw run 'Generate end-of-day dental practice summary. Note any no-shows or same-day cancellations that need rescheduling. Flag new patient inquiries received after hours. List any treatment plan follow-ups to make tomorrow. Send to [Owner/Manager Contact].'"
```

---

## 📞 Patient Recall & Follow-Up

### Recall Outreach — 6-Month Check (Daily 9:00 AM)
Contact patients who are 6 months overdue for their cleaning/exam.

```bash
openclaw cron add --name "dental-recall-6mo" --schedule '{"type":"cron","expr":"0 9 * * 1-5"}' \
  --cmd "openclaw run 'Check memory/recalls.md for patients whose last cleaning was 6+ months ago with no scheduled appointment. Generate friendly recall outreach messages for up to [10] patients per day. Send list to [Front Desk Contact] to call or send via patient portal.'"
```

### New Patient Inquiry Follow-Up (Daily 10:00 AM)
Ensure new patient inquiries from the past 24–48 hours are being converted.

```bash
openclaw cron add --name "dental-newpatient-followup" --schedule '{"type":"cron","expr":"0 10 * * 1-5"}' \
  --cmd "openclaw run 'Check memory/leads.md for new patient inquiries in the last 48 hours that haven'\''t been converted to a booked appointment. Alert [Front Desk/Owner Contact] with patient name, inquiry source, and contact info. Goal: book within 24 hours of inquiry.'"
```

### Post-Appointment Follow-Up (Daily 2:00 PM)
Check in with patients who had significant procedures the prior day.

```bash
openclaw cron add --name "dental-post-appointment" --schedule '{"type":"cron","expr":"0 14 * * 1-5"}' \
  --cmd "openclaw run 'Check memory/schedule.md for patients who had [extractions, root canals, implant procedures, or other major work] yesterday. Generate brief post-procedure check-in messages. Send to [Front Desk Contact] to reach out by phone or patient portal.'"
```

---

## 📋 Scheduling & Openings

### Same-Day Opening Alert (8:15 AM weekdays)
If there are last-minute openings, alert the waitlist.

```bash
openclaw cron add --name "dental-sameday-openings" --schedule '{"type":"cron","expr":"15 8 * * 1-5"}' \
  --cmd "openclaw run 'Check memory/schedule.md for any cancellations or open slots for today. If openings exist, generate a short outreach message for waitlist patients in memory/waitlist.md. Alert [Front Desk Contact] to call them immediately.'"
```

---

## 📈 Monthly Tasks

### Monthly Production & Recall Report (1st of month, 8:00 AM)
High-level practice metrics: new patients, recall rate, no-shows, production vs. goal.

```bash
openclaw cron add --name "dental-monthly-report" --schedule '{"type":"cron","expr":"0 8 1 * *"}' \
  --cmd "openclaw run 'Compile a monthly dental practice report from memory/schedule.md and memory/recalls.md. Include: new patients this month, recall success rate, no-show rate, and any notable trends. Send to [Owner Contact].'"
```

### Monthly Review Request Reminder (5th of month, 9:00 AM)
Prompt the team to request Google/Yelp reviews from satisfied patients.

```bash
openclaw cron add --name "dental-review-reminder" --schedule '{"type":"cron","expr":"0 9 5 * *"}' \
  --cmd "openclaw run 'Remind [Owner/Front Desk Contact]: Send Google Review requests to patients who had positive appointments last month. Check memory/schedule.md for candidates. Draft a short, friendly review request template for [Owner Contact] to approve and send via patient portal or email.'"
```
