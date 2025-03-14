import { HeroHighlightDemo } from "@/components/ui/LandingHeroPage"
import { CharityTable } from "@/components/charity-table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero section with gradient background */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/10 via-black to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#87CEEB,#00BFFF,#1E90FF)] opacity-10" />
        <HeroHighlightDemo />
      </div>

      {/* Main content section */}
      <section className="py-10 px-4 max-w-7xl mx-auto -mt-20 relative z-10">
        {/* Search section */}
        <div className="glass-effect rounded-lg shadow-lg p-6 border border-sky-400/20 mb-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">Track Charitable Impact</h2>
            <p className="text-sky-400/80 max-w-2xl">
              Monitor real-time cryptocurrency donations and their impact on charitable organizations worldwide.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mt-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 h-4 w-4" />
            <Input
              placeholder="Search charities or wallet addresses..."
              className="pl-10 bg-black/50 border-sky-400/20 focus:border-sky-400/50 text-white placeholder:text-sky-400/50"
            />
          </div>
        </div>

        {/* Table section */}
        <div className="glass-effect rounded-lg shadow-lg p-6 border border-sky-400/20">
          <CharityTable />
        </div>
      </section>
    </main>
  )
}

