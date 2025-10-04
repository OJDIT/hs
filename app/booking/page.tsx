'use client'
import { useState } from 'react'

export default function BookingPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [amount, setAmount] = useState('250.00')
  const [items, setItems] = useState('Half-Day Plus')

  async function handleSubmit(e) {
    e.preventDefault()
    const amountPence = Math.round(parseFloat(amount || '0') * 100)
    const payload = { name, email, phone, notes, items: [items], amountPence }
    const res = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    if (data && data.url) {
      window.location.href = data.url
    } else {
      alert('Failed to create booking')
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-playfair font-bold mb-4">Book a Session</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <input required value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full p-3 rounded border" />
        <input required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full p-3 rounded border" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone (optional)" className="w-full p-3 rounded border" />
        <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Total amount (GBP)" className="w-full p-3 rounded border" />
        <input value={items} onChange={e => setItems(e.target.value)} placeholder="Items (comma separated)" className="w-full p-3 rounded border" />
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes / preferred times / instruments" className="w-full p-3 rounded border" />
        <button type="submit" className="bg-gold-500 px-4 py-2 rounded text-primary-foreground">Continue to Payment</button>
      </form>
    </div>
  )
}
