'use client'
import { useState } from 'react'

export default function ServicesAccordion({ items }) {
  const [selected, setSelected] = useState({})

  const toggle = (id) => setSelected(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="space-y-4">
      {items.map(item => (
        <div key={item.id} className="border border-gold-500/10 bg-black/90 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <label className="inline-flex items-center gap-3">
                <input type="checkbox" checked={!!selected[item.id]} onChange={() => toggle(item.id)} />
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              </label>
            </div>
            <div className="text-right font-mono">£{item.price}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
