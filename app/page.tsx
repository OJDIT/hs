import Link from 'next/link'
export default function Home() {
  return (
    <div>
      <section className="hero-gradient pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
            <source src="/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute left-0 right-0 top-0 h-px bg-gold-gradient opacity-30"></div>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gold-gradient opacity-30"></div>
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold">Touching lives through <span className="gold-text">sound</span></h1>
          <p className="mt-4 text-muted-foreground">Professional faith-inspired music production that glorifies God and elevates the gospel.</p>
          <div className="mt-6">
            <Link href="/booking" className="bg-gold-500 px-4 py-2 rounded text-primary-foreground">Book a Session</Link>
          </div>
        </div>
      </section>

      <section className="py-12 container">
        <h2 className="text-2xl font-bold">Featured Track</h2>
        <p className="text-muted-foreground">(Audio player placeholder)</p>
      </section>
    </div>
  )
}
