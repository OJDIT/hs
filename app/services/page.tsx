import ServicesAccordion from '@/components/ServicesAccordion'
import PriceCalculator from '@/components/PriceCalculator'

const serviceItems = [
  { id: 'Hourly – £40/hr (1–3 hrs)', title: 'Studio Sessions – Hourly', price: 40, description: 'Full studio backline. Lounge access.' },
  { id: 'Half-Day Basic – £250', title: 'Half-Day Basic', price: 250 },
  { id: 'Half-Day Plus – £320', title: 'Half-Day Plus', price: 320 },
  { id: 'Full-Day Basic – £450', title: 'Full-Day Basic', price: 450 },
  { id: 'Full-Day Plus – £550', title: 'Full-Day Plus', price: 550 },
]

export default function Services() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-playfair font-bold mb-6">Services — Master Rate Card</h1>
      <p className="text-muted-foreground mb-6">All prices shown in GBP. Select packages to calculate totals and book.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ServicesAccordion items={serviceItems.map((s, i) => ({ id: String(i), title: s.title, price: s.price, description: s.id }))} />
        </div>
        <aside className="p-4 border border-gold-500/10 rounded-lg">
          <h3 className="font-semibold mb-4">Your Selection</h3>
          <PriceCalculator items={serviceItems.map((s, i) => ({ id: String(i), price: s.price }))} />
          <div className="mt-6">
            <a href="/booking" className="bg-gold-500 px-4 py-2 rounded text-primary-foreground">Proceed to Booking</a>
          </div>
        </aside>
      </div>

    </div>
  )
}
