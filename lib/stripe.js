import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-11-15' })

export async function createCheckout({ amountPence, name, email, metadata }) {
  const isDeposit = amountPence >= 20000
  const payAmount = isDeposit ? Math.round(amountPence / 2) : amountPence
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{ price_data: { currency: 'gbp', product_data: { name: 'Heavenly Soundscapes Booking' }, unit_amount: payAmount }, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/cancel`,
    customer_email: email,
    metadata: { ...metadata, is_deposit: String(isDeposit) }
  })
  return session
}
