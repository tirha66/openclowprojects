# Cron Schedule - Retail Store

## Overview
Automated tasks for inventory awareness, customer follow-ups, promotional reminders, and daily ops summaries for [Owner/Manager Name].

---

## ⏰ Daily Tasks

### Morning Briefing (8:30 AM every day)
Daily summary before doors open: low stock alerts, pending customer inquiries, and today's promotions.

```bash
openclaw cron add --name "retail-morning-briefing" --schedule '{"type":"cron","expr":"30 8 * * *"}' \
  --cmd "openclaw run 'Prepare a morning retail briefing. Check memory/inventory.md for any low-stock items (below threshold). Check memory/inquiries.md for any unresolved customer questions. Note any active promotions running today. Send to [Owner Contact] via [channel].'"
```

### End-of-Day Summary (7:30 PM every day)
Wrap-up: unresolved inquiries, items that need restocking, customer follow-ups for tomorrow.

```bash
openclaw cron add --name "retail-eod-summary" --schedule '{"type":"cron","expr":"30 19 * * *"}' \
  --cmd "openclaw run 'Generate end-of-day retail summary. List any customer inquiries that came in after hours. Flag any inventory items that sold out today. Note any special orders pending. Send to [Owner Contact].'"
```

---

## 📦 Inventory & Restocking

### Weekly Low-Stock Review (Monday 9:00 AM)
Compile reorder list for the week.

```bash
openclaw cron add --name "retail-restock-review" --schedule '{"type":"cron","expr":"0 9 * * 1"}' \
  --cmd "openclaw run 'Review memory/inventory.md for items below reorder threshold. Group by supplier. Generate a reorder list for [Owner/Buyer Contact] to approve and submit to vendors.'"
```

### Overstock Alert Check (Wednesday 10:00 AM)
Flag items that have been in inventory too long without movement.

```bash
openclaw cron add --name "retail-overstock-check" --schedule '{"type":"cron","expr":"0 10 * * 3"}' \
  --cmd "openclaw run 'Check memory/inventory.md for items with no sales movement in 45+ days. Suggest markdown, bundle promotion, or vendor return. Send report to [Owner Contact].'"
```

---

## 📣 Promotions & Marketing

### Weekend Sale Reminder (Friday 11:00 AM)
Remind owner to post weekend promotions on social and update signage.

```bash
openclaw cron add --name "retail-weekend-promo" --schedule '{"type":"cron","expr":"0 11 * * 5"}' \
  --cmd "openclaw run 'Remind [Owner Contact]: Post this weekend'\''s promotions to [Instagram/Facebook/Google]. Draft a short post based on memory/promotions.md if one is active. Also remind to update in-store signage and front-door hours if holiday weekend.'"
```

### Monthly Promotion Planning Reminder (25th of month, 9:00 AM)
Prompt owner to plan next month's promotions.

```bash
openclaw cron add --name "retail-promo-planning" --schedule '{"type":"cron","expr":"0 9 25 * *"}' \
  --cmd "openclaw run 'Remind [Owner Contact]: Plan next month'\''s promotions. Suggest themes based on upcoming holidays or seasonal trends. Review memory/promotions.md for past performance. What deals are worth running again?'"
```

---

## 🛍️ Customer Follow-Up

### Special Order Status Check (Daily 10:00 AM)
Follow up on any pending special orders or backorders with customers.

```bash
openclaw cron add --name "retail-special-orders" --schedule '{"type":"cron","expr":"0 10 * * 1-6"}' \
  --cmd "openclaw run 'Check memory/special-orders.md for any pending customer special orders. Alert [Owner/Staff Contact] to contact customers whose orders have arrived or are overdue for an update.'"
```

### Monthly Customer Appreciation Reminder (15th of month, 9:00 AM)
Prompt a loyalty or appreciation outreach to top customers.

```bash
openclaw cron add --name "retail-customer-appreciation" --schedule '{"type":"cron","expr":"0 9 15 * *"}' \
  --cmd "openclaw run 'Remind [Owner Contact]: Mid-month is a great time for a loyalty outreach. Check memory/customers.md for top customers by purchase frequency. Draft a thank-you note or exclusive offer for [Owner Contact] to review and send.'"
```
