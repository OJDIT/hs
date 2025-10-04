import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Heavenly Soundscapes',
  description: 'Touching lives through sound — professional faith-inspired music production.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
