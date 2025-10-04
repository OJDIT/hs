'use client'
import { useEffect, useState } from 'react'

export default function PriceCalculator({ items }) {
  const [selected, setSelected] = useState({})
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const sum = items.reduce((acc, it) => acc + (selected[it.id] ? it.price : 0), 0)
    setTotal(sum)
  }, [selected])

  return (
    <div>
      <div className="space-y-2">
        {items.map(it => (
          <label key={it.id} className="flex items-center justify-between">
            <div className="inline-flex items-center gap-3">
              <input type="checkbox" onChange={e => setSelected(prev => ({ ...prev, [it.id]: e.target.checked }))} />
              <span>{it.id}</span>
            </div>
            <div>£{it.price}</div>
          </label>
        ))}
      </div>

      <div className="mt-4 font-bold">Total: £{total}</div>
    </div>
  )
}
