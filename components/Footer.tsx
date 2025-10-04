import Link from 'next/link'
import { Instagram, Youtube, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gold-500/20 bg-background py-8 mt-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-4 md:w-1/3">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex items-center">
                <img src="/logo.png" alt="Heavenly Soundscapes Logo" className="h-8 w-8" />
                <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-md"></div>
              </div>
              <span className="font-playfair font-bold text-lg">Heavenly <span className="gold-text">Soundscapes</span></span>
            </Link>
            <p className="text-sm text-muted-foreground">Touching lives through sound. Professional faith-inspired music production based in <a href="https://www.google.com/maps/place/Coventry,+UK" target="_blank" rel="noreferrer" className="hover:text-gold-400">Coventry, UK</a>.</p>
          </div>

          <div>
            <h4 className="font-semibold text-gold-500 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-gold-400">Home</Link></li>
              <li><Link href="/services" className="hover:text-gold-400">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-gold-400">Free Sounds</Link></li>
              <li><Link href="/store" className="hover:text-gold-400">Sound Store</Link></li>
              <li><Link href="/contact" className="hover:text-gold-400">Contact</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h4 className="font-semibold text-gold-500 mb-3">Connect</h4>
              <div className="flex gap-3">
                <a href="#" className="hover:text-gold-400"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="hover:text-gold-400"><Youtube className="h-5 w-5" /></a>
                <a href="#" className="hover:text-gold-400"><Mail className="h-5 w-5" /></a>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-xs text-muted-foreground mb-1">REGULATORY & COMPLIANCE</p>
              <img src="/ICO_Welsh_Logo_WhiteOnBlue.png" alt="ICO Regulatory Compliance" className="h-12 mx-auto" />
            </div>
          </div>
        </div>

        <div className="border-t border-gold-500/20 mt-8 pt-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Heavenly Soundscapes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
