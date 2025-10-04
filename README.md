# Heavenly Soundscapes — Local Setup

## Environment variables

Create a `.env.local` with:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
# optional
DATABASE_URL=sqlite:./dev.db
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## Install & run

```bash
npm install
npm run dev
```

## Add assets

- Place your `logo.png` in `public/logo.png` (already included if uploaded).
- Place your hero video at `public/hero-video.mp4` (already included if uploaded).

## Stripe Webhooks

- Expose your local dev server with `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Set `STRIPE_WEBHOOK_SECRET` from the stripe CLI output
