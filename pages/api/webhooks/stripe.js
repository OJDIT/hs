
import { buffer } from 'micro'
import fs from 'fs'
import path from 'path'
import Stripe from 'stripe'
import { sendEmail } from '../../../lib/email'

export const config = { api: { bodyParser: false } }

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

async function createCalendarEvent(booking) {
  // Placeholder: integrate with Google Calendar API with OAuth2 in production.
  console.log('Create calendar event (placeholder) for booking', booking.id)
  return true
}

export default async function handler(req, res) {
  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET || '')
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    console.log('Webhook: checkout.session.completed for', session.id)
    const bookingId = session.metadata?.bookingId
    // find booking and mark paid
    const bookings = readBookings()
    const idx = bookings.findIndex(b => b.id === bookingId)
    if (idx !== -1) {
      bookings[idx].status = 'paid'
      bookings[idx].paidAt = new Date().toISOString()
      bookings[idx].payment = { sessionId: session.id, amount_total: session.amount_total, currency: session.currency }
      writeBookings(bookings)

      // send confirmation email (if SMTP configured)
      try {
        await sendEmail({ to: bookings[idx].email, subject: `✅ Your HSP booking is confirmed – ${bookings[idx].id}`, html: `<p>Hi ${bookings[idx].name},</p><p>Thank you — your booking is confirmed.</p>` })
      } catch (e) {
        console.error('Failed to send confirmation email', e.message)
      }

      // create calendar event (placeholder)
      try {
        await createCalendarEvent(bookings[idx])
      } catch (e) {
        console.error('Failed to create calendar event', e.message)
      }
    } else {
      console.warn('Booking not found for bookingId', bookingId)
    }
  }

  res.status(200).json({ received: true })
}
