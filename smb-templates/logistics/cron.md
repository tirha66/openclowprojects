# cron.md - Logistics / Delivery Cron Jobs

## Overview
These cron jobs keep the delivery operation running proactively — morning briefings, delay alerts, end-of-day wrap-ups, and customer follow-ups.

---

## 1. Morning Operations Briefing (7:00 AM daily)
Summarize the day's scheduled deliveries, any pending issues from yesterday, and driver assignments.

```bash
openclaw cron add \
  --name "Morning Ops Briefing" \
  --schedule '{"kind":"cron","expr":"0 7 * * *","tz":"[Your/Timezone]"}' \
  --payload '{"kind":"agentTurn","message":"Generate a morning operations briefing for [Owner/Manager Name]. Include: todays scheduled deliveries summary, any unresolved issues from yesterday, driver availability, and any weather or traffic alerts that may affect deliveries. Send via Telegram."}' \
  --session isolated
```

---

## 2. Midday Delivery Status Check (12:00 PM daily)
Check on morning deliveries — flag anything that looks delayed or unconfirmed.

```bash
openclaw cron add \
  --name "Midday Delivery Check" \
  --schedule '{"kind":"cron","expr":"0 12 * * 1-6","tz":"[Your/Timezone]"}' \
  --payload '{"kind":"agentTurn","message":"Check status of all morning deliveries. Flag any that are delayed more than 1 hour or have had no driver update. Alert [Manager Name] with a summary and any urgent issues."}' \
  --session isolated
```

---

## 3. Unresolved Issues Follow-up (Every 2 hours during business hours)
Ping manager if any open delivery complaints haven't been resolved.

```bash
openclaw cron add \
  --name "Unresolved Issues Check" \
  --schedule '{"kind":"cron","expr":"0 9,11,13,15,17 * * 1-6","tz":"[Your/Timezone]"}' \
  --payload '{"kind":"agentTurn","message":"Check memory for any open customer complaints or delivery issues that havent been resolved. If any are older than 2 hours without update, alert [Manager Name] via Telegram with details."}' \
  --session isolated
```

---

## 4. End of Day Summary (7:00 PM daily)
Wrap-up report: deliveries completed, failed, pending, and customer issues.

```bash
openclaw cron add \
  --name "End of Day Summary" \
  --schedule '{"kind":"cron","expr":"0 19 * * 1-6","tz":"[Your/Timezone]"}' \
  --payload '{"kind":"agentTurn","message":"Generate an end-of-day summary for [Manager Name]. Include: total deliveries completed, failed deliveries and reasons, unresolved customer issues, and anything needing attention tomorrow morning. Send via Telegram."}' \
  --session isolated
```

---

## 5. Customer Follow-up on Failed Deliveries (6:00 PM daily)
Proactively message customers whose deliveries failed or were missed today.

```bash
openclaw cron add \
  --name "Failed Delivery Follow-up" \
  --schedule '{"kind":"cron","expr":"0 18 * * 1-6","tz":"[Your/Timezone]"}' \
  --payload '{"kind":"agentTurn","message":"Check for any failed or missed deliveries today. Draft follow-up messages for affected customers apologising and offering a rescheduled delivery slot. Flag to [Manager Name] for approval before sending."}' \
  --session isolated
```

---

## 6. Weekly Performance Report (Monday 8:00 AM)
Weekly summary of delivery performance, on-time rate, and issues.

```bash
openclaw cron add \
  --name "Weekly Performance Report" \
  --schedule '{"kind":"cron","expr":"0 8 * * 1","tz":"[Your/Timezone]"}' \
  --payload '{"kind":"agentTurn","message":"Generate a weekly performance report for [Manager Name]. Include: total deliveries, on-time delivery rate, failed deliveries, top customer complaints, and recommendations for improvement. Send via Telegram."}' \
  --session isolated
```

---

## Notes
- Replace `[Your/Timezone]` with e.g. `Europe/London`, `America/New_York`
- Replace `[Manager Name]` and `[Owner Name]` with actual names
- Adjust times to match actual business operating hours
- Connect to your delivery management system (e.g. Onfleet, Routific) via custom skills for real tracking data
