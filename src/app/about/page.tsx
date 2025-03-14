import { Metadata } from 'next'
import { ImpactCalculator } from '@/components/donation/ImpactCalculator'
import { CharityInfo } from '@/components/donation/CharityInfo'
import { TrustSignals } from '@/components/donation/TrustSignals'

export const metadata: Metadata = {
  title: 'Donate - Make a Difference',
  description: 'Support our cause and see the direct impact of your donation.',
}

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black relative">
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-6xl mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 pb-3">
            Make a Real Impact Today
          </h1>
          <div className="text-xl bg-clip-text bg-gradient-to-r text-sky-100">
            <p>Your donation directly supports environmental conservation efforts.</p>
            <p>Every contribution, no matter the size, helps create lasting change</p>
            <p>for our planet and communities in need.</p>
          </div>
        </section>

        {/* Impact Calculator Section */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 space-y-4">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400">See Your Impact</h2>
              <p className="text-zinc-400">
                Move the slider below to see how your donation can make a difference.
                Every dollar contributes to meaningful change.
              </p>
            </div>
            <ImpactCalculator />
          </div>
        </section>

        {/* Charity Information Section */}
        <section className="py-8">
          <div className="text-center mb-8 space-y-4">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400">Why Choose Us</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We're committed to transparency and efficiency in how we use your donations.
              Learn more about our mission and impact below.
            </p>
          </div>
          <CharityInfo />
        </section>

        {/* Trust Signals Section */}
        <section className="py-8">
          <TrustSignals />
        </section>
      </div>
    </main>
  )
} 