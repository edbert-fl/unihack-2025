import { Metadata } from 'next'
import { ImpactCalculator } from '@/components/donation/ImpactCalculator'
import { CharityInfo } from '@/components/donation/CharityInfo'

export const metadata: Metadata = {
  title: 'Donate - Make a Difference',
  description: 'Support our cause and see the direct impact of your donation.',
}

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Make a Real Impact Today
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your donation directly supports environmental conservation efforts. 
            See exactly how your contribution makes a difference.
          </p>
        </section>

        {/* Impact Calculator Section */}
        <section className="py-8">
          <ImpactCalculator />
        </section>

        {/* Charity Information Section */}
        <section className="py-8">
          <CharityInfo />
        </section>

        {/* Trust Signals Section - Will be added */}
        <section className="py-8">
          {/* TrustSignals component will be added here */}
        </section>
      </div>
    </main>
  )
} 