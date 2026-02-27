# cron.md — Salon / Spa Scheduled Tasks

## Overview
These cron jobs keep [Business Name] running proactively — appointment reminders go out automatically, the owner gets a daily briefing, and follow-ups happen without anyone lifting a finger.

---

## Jobs

### 1. Morning Briefing (Daily)
Sends the owner a summary of today's appointments, any pending inquiries, and low-inventory alerts.

```bash
openclaw cron add \
  --name "salon-morning-briefing" \
  --schedule "0 8 * * 1-6" \
  --prompt "You are Aria, the AI assistant for [Business Name]. Pull today's appointment list from [Booking System] and send [Owner Name] a morning briefing via [channel]. Include: total appointments, any gaps/openings, new client inquiries from the last 24h, and any cancellations. Keep it scannable — use bullet points." \
  --channel [owner-channel]
```

### 2. Appointment Reminders (24-Hour)
Remind clients of their appointment the day before.

```bash
openclaw cron add \
  --name "salon-appt-reminder-24h" \
  --schedule "0 10 * * *" \
  --prompt "Check [Booking System] for appointments scheduled tomorrow at [Business Name]. For each client, send a friendly reminder: their appointment time, stylist name, service booked, and cancellation policy ([X]-hour notice). Include parking info: [Parking Details]. Sign off as Aria." \
  --channel [client-messaging-channel]
```

### 3. Appointment Reminders (2-Hour Day-Of)
Same-day nudge so clients don't forget.

```bash
openclaw cron add \
  --name "salon-appt-reminder-2h" \
  --schedule "0 8 * * 1-6" \
  --prompt "Check [Booking System] for appointments at [Business Name] happening between 10am and 2pm today. Send a quick 'See you soon!' reminder to each client with their appointment time and stylist. Keep it brief and warm." \
  --channel [client-messaging-channel]
```

### 4. Post-Appointment Follow-Up
Check in after service and request a review.

```bash
openclaw cron add \
  --name "salon-post-visit-followup" \
  --schedule "0 18 * * 1-6" \
  --prompt "Check [Booking System] for appointments that were completed today at [Business Name]. For each client, send a follow-up message: thank them for visiting, ask how they're loving their new look, and invite them to leave a Google review: [Review Link]. If they reply with any dissatisfaction, flag it for [Owner Name] immediately. Sign off as Aria." \
  --channel [client-messaging-channel]
```

### 5. Rebook Reminder (Regulars)
Ping clients who are due for their next appointment (based on service cycle).

```bash
openclaw cron add \
  --name "salon-rebook-reminder" \
  --schedule "0 11 * * 2" \
  --prompt "Review [Business Name]'s client list in [Booking System]. Identify clients who had an appointment 4–6 weeks ago and haven't rebooked yet (for haircuts) or 8–10 weeks ago (for color). Send them a friendly nudge to book their next appointment with a link: [Booking Link]. Keep it personal — mention their last service if possible." \
  --channel [client-messaging-channel]
```

### 6. End-of-Day Wrap-Up
Summarize the day for the owner.

```bash
openclaw cron add \
  --name "salon-eod-summary" \
  --schedule "0 20 * * 1-6" \
  --prompt "Generate an end-of-day summary for [Business Name]. Include: appointments completed today, no-shows or cancellations, any client complaints or issues raised, new bookings made today, and tomorrow's first appointments. Send to [Owner Name] via [channel]." \
  --channel [owner-channel]
```

### 7. Weekly Promotion Blast (Optional)
Send a weekly deal or feature to opted-in clients.

```bash
openclaw cron add \
  --name "salon-weekly-promo" \
  --schedule "0 9 * * 3" \
  --prompt "Draft and send a weekly promotion message for [Business Name] to opted-in clients via [channel]. This week's promo: [Weekly Special — update manually or pull from PROMO.md]. Include a booking link: [Booking Link]. Keep it punchy — 3 sentences max." \
  --channel [marketing-channel]
```

---

## Notes
- Update `[Booking System]` to reflect your actual platform (Vagaro, Mindbody, Booksy, etc.)
- Adjust schedule times based on actual business hours
- Cron uses UTC — convert your local timezone accordingly
- `1-6` = Monday–Saturday; `0` = Sunday
