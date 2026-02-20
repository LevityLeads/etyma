# Etyma Roadmap

## Status: MVP Live
- Site: https://etyma-weld.vercel.app
- Repo: LevityLeads/etyma
- Sheet: 1h8ThYbkRvSagZatk9H99CGkryEz9RvoistyjEabAuZM (Levity account)

## Pricing
- £25 digital PDF (A1 print-ready, 300dpi)
- £45 framed print (future, needs fulfilment partner)

## Phase 1: Payment + Delivery ✅ DONE
- [x] Stripe checkout integration
- [x] Order store (in-memory, bridges checkout → webhook)
- [x] High-res PDF generator (react-pdf, A2 300dpi)
- [x] Stripe webhook (checkout.session.completed → PDF gen → email)
- [x] Email delivery with PDF attachment (via Google API proxy, atlas@levityleads.com)
- [x] Order confirmation page (shows delivery email, print tips)

## Phase 2: Polish
- [ ] "Regenerate artwork" button in wizard (unlimited, free)
- [ ] Mobile responsive pass
- [ ] More gallery names (20+)
- [ ] Custom domain (etyma.art)
- [ ] Loading states and error handling

## Phase 3: Growth
- [ ] Instagram @etyma.art account + content
- [ ] Market research (competitors, pricing gaps)
- [ ] Reddit launch (r/namenerds, r/etymology)
- [ ] Pinterest pins
- [ ] TikTok/Reels video format

## Technical Notes
- PDF: Use SVG for all text (scales perfectly to any print size)
- Art: Generate at 3:4 via KIE FLUX, upscale to print resolution
- A1 = 594 x 841mm = 7016 x 9933px at 300dpi
- KIE cost per generation: ~$0.03
- OpenAI cost per name analysis: ~$0.01
- Total cost per order: ~$0.05-0.10
- Revenue per order: £25
- Margin: 99%+

## Key Decisions
- Eat regeneration costs (let users regenerate unlimited times)
- Delay delivery (pay → email next day, feels premium)
- Free preview (full wizard free, pay only for high-res download)
- Gallery images are pre-generated, wizard images are on-demand
