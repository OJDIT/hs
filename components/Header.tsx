'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Free Sounds', href: '/portfolio' },
  { name: 'Store', href: '/store' },
  { name: 'Book a Session', href: '/booking' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMobileMenuOpen(false), [pathname])

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-background/80 backdrop-blur-md' } border-b border-gold-500/20`}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex items-center">
            <img src="/logo.png" alt="Heavenly Soundscapes Logo" className="h-8 w-8" />
            <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-md animate-gold-pulse"></div>
          </div>
          <span className="font-playfair font-bold text-xl">Heavenly <span className="gold-text">Soundscapes</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <Link key={item.name} href={item.href} className={`text-sm font-medium transition-colors hover:text-gold-400 ${pathname === item.href ? 'text-gold-400' : ''}`}>
              {item.name}
            </Link>
          ))}
          <Link href="/booking" className="ml-4 bg-gold-500 hover:bg-gold-600 text-primary-foreground px-4 py-2 rounded">Book</Link>
        </nav>

        <button aria-label="Toggle menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gold-500/20 bg-background/95 backdrop-blur-md">
          <div className="container py-4 space-y-4">
            {navItems.map(item => (
              <Link key={item.name} href={item.href} className={`block py-2 text-base font-medium transition-colors hover:text-gold-400 ${pathname === item.href ? 'text-gold-400' : ''}`}>
                {item.name}
              </Link>
            ))}
            <Link href="/booking" className="w-full mt-4 bg-gold-500 hover:bg-gold-600 text-primary-foreground block text-center py-2 rounded">Book</Link>
          </div>
        </div>
      )}
    </header>
  )
}
