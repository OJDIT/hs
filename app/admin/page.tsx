
'use client'
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/bookings')
    const data = await res.json()
    setBookings(data.bookings || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function updateBooking(id, action) {
    await fetch('/api/admin/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, action }) })
    await load()
  }

  if (loading) return <div className="container py-8">Loading...</div>

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-playfair font-bold mb-4">Admin — Bookings</h1>
      <div className="space-y-4">
        {bookings.map(b => (
          <div key={b.id} className="border rounded p-4 flex justify-between items-start">
            <div>
              <div className="font-semibold">{b.name} — <span className="font-mono">{b.id}</span></div>
              <div className="text-sm text-muted-foreground">Email: {b.email} • Amount: £{(b.amountPence/100).toFixed(2)}</div>
              <div className="mt-2 text-sm">{b.items ? b.items.join(', ') : ''}</div>
              <div className="text-xs text-muted-foreground mt-2">Status: {b.status}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => updateBooking(b.id, 'mark_paid')} className="bg-gold-500 px-3 py-1 rounded text-primary-foreground">Mark Paid</button>
              <button onClick={() => updateBooking(b.id, 'cancel')} className="bg-transparent border border-gold-500 px-3 py-1 rounded">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
