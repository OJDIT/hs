
import fs from 'fs'
import path from 'path'

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

export default function handler(req, res) {
  if (req.method === 'GET') {
    const bookings = readBookings()
    return res.status(200).json({ bookings })
  }
  if (req.method === 'POST') {
    const { id, action } = req.body
    const bookings = readBookings()
    const idx = bookings.findIndex(b => b.id === id)
    if (idx === -1) return res.status(404).json({ error: 'Not found' })
    if (action === 'mark_paid') bookings[idx].status = 'paid'
    if (action === 'cancel') bookings[idx].status = 'canceled'
    writeBookings(bookings)
    return res.status(200).json({ success: true, booking: bookings[idx] })
  }
  res.status(405).end()
}
