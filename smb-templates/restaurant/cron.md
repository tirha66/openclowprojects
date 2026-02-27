# cron.md — Restaurant / Café Scheduled Tasks

## Overview
Restaurant operations run on tight timelines. These cron jobs keep [Business Name] proactive — specials go out before the rush, the GM gets a briefing before service, and guest follow-ups happen automatically.

---

## Jobs

### 1. Daily Specials Announcement
Post today's specials to all channels before the lunch/dinner rush.

```bash
openclaw cron add \
  --name "restaurant-daily-specials" \
  --schedule "0 10 * * 2-7" \
  --prompt "You are Demi, the AI assistant for [Business Name]. Read today's specials from SPECIALS.md (or the daily notes). Write an engaging, mouth-watering post about today's features — soup, appetizer, entrée, dessert specials. Post to [channel]. Keep it vivid and under 150 words. End with hours and reservation link: [Link]." \
  --channel [social-or-messaging-channel]
```

### 2. Morning Briefing for Owner/GM
Daily summary before the doors open.

```bash
openclaw cron add \
  --name "restaurant-morning-briefing" \
  --schedule "0 9 * * 2-7" \
  --prompt "You are Demi, the AI assistant for [Business Name]. Generate a pre-service briefing for [Owner Name]: today's reservation count, largest party sizes, any noted dietary restrictions or allergies in reservations, any VIP or returning regulars flagged, private dining inquiries pending, and any unresolved complaints from yesterday. Send via [channel]." \
  --channel [owner-channel]
```

### 3. Reservation Reminder to Guests
Day-before reminder to confirmed reservations.

```bash
openclaw cron add \
  --name "restaurant-reservation-reminder" \
  --schedule "0 14 * * *" \
  --prompt "Check [Reservation System] for all reservations at [Business Name] tomorrow. Send each party a friendly reminder: date, time, party size, any special requests noted, and a reminder that reservations are held for [15] minutes. Include address: [Address] and parking info: [Parking]. Sign off as Demi." \
  --channel [guest-messaging-channel]
```

### 4. Wait-List / Walk-In Update (Weekend Evenings)
Alert waiting guests of real-time table availability.

```bash
openclaw cron add \
  --name "restaurant-waitlist-update" \
  --schedule "0 17 * * 5,6" \
  --prompt "It's Friday/Saturday evening at [Business Name]. Check current waitlist status from [System]. If there are open tables or short waits (under 20 min), send a quick post to [channel] letting people know we have availability tonight — include reservation link or walk-in welcome message." \
  --channel [social-channel]
```

### 5. Post-Visit Follow-Up & Review Request
Follow up with last night's diners.

```bash
openclaw cron add \
  --name "restaurant-post-visit-followup" \
  --schedule "0 11 * * 2-7" \
  --prompt "Pull yesterday's completed reservations from [Reservation System]. Send each guest a thank-you note from Demi at [Business Name]. Thank them for dining with us, invite any feedback, and include a Google review link: [Review Link]. If any reservation had a complaint noted, escalate to [Owner Name] instead of sending the review request." \
  --channel [guest-messaging-channel]
```

### 6. Weekly Event / Feature Announcement
Promote upcoming events, themed nights, or weekly specials.

```bash
openclaw cron add \
  --name "restaurant-weekly-promo" \
  --schedule "0 9 * * 4" \
  --prompt "Draft a Thursday promotion post for [Business Name] for this weekend. Include any events (live music, wine dinners, brunch specials, prix fixe nights) listed in EVENTS.md. Keep it enticing and social-media ready. Post to [channel] and suggest the owner also share to Instagram stories." \
  --channel [marketing-channel]
```

### 7. End-of-Day Wrap-Up for GM
Service summary before closing.

```bash
openclaw cron add \
  --name "restaurant-eod-summary" \
  --schedule "0 22 * * 2-7" \
  --prompt "Generate an end-of-service summary for [Business Name]. Include: covers served today, any no-shows, complaints or issues raised (and resolution status), tomorrow's reservation count, and any outstanding guest inquiries. Send to [Owner/GM Name] via [channel]." \
  --channel [owner-channel]
```

### 8. Inventory / Menu Update Reminder (Weekly)
Remind owner to update specials and 86'd items.

```bash
openclaw cron add \
  --name "restaurant-menu-update-reminder" \
  --schedule "0 8 * * 1" \
  --prompt "Send a quick Monday reminder to [Owner/Chef Name]: it's time to update SPECIALS.md with this week's features and any 86'd menu items. Also flag any recurring guest dietary requests from last week that might inform the menu. Send via [channel]." \
  --channel [owner-channel]
```

---

## Notes
- Restaurant cron runs Tue–Sun for most jobs (`2-7` in cron = Tue–Sun if 0=Sun... adjust for your close day)
- Update SPECIALS.md daily with actual specials so the AI has accurate content
- All guest-facing messages should go through an approval step if preferred — add `--draft` flag
- Reservation system integration depends on API access (OpenTable, Resy, etc.)
