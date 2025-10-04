
import fs from 'fs'
import path from 'path'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-11-15' })
const BOOKINGS_FILE = path.join(process.cwd(), 'data', 'bookings.json')

function readBookings() {
  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

function writeBookings(bookings) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  try {
    const { name, email, phone, notes, items, amountPence } = req.body
    if (!name || !email || !amountPence) return res.status(400).json({ error: 'Missing required fields' })

    const bookingId = 'bk_' + Date.now().toString(36)

    const booking = {
      id: bookingId,
      name,
      email,
      phone: phone || null,
      notes: notes || null,
      items: items || [],
      amountPence,
      status: 'pending', // pending -> paid / canceled
      createdAt: new Date().toISOString()
    }

    // persist booking locally
    const bookings = readBookings()
    bookings.push(booking)
    writeBookings(bookings)

    // determine deposit logic
    const isDeposit = amountPence >= 20000
    const paymentAmount = isDeposit ? Math.round(amountPence / 2) : amountPence

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price_data: { currency: 'gbp', product_data: { name: `Booking ${bookingId}` }, unit_amount: paymentAmount }, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/cancel`,
      metadata: { bookingId, is_deposit: String(isDeposit) },
      customer_email: email
    })

    // return checkout url to frontend
    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
