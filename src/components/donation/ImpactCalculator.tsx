'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Impact calculation constants
const IMPACT_METRICS = {
  trees: { 
    amount: 5, 
    unit: 'tree', 
    plural: 'trees',
    description: 'Trees planted in deforested areas',
    icon: '🌳'
  },
  meals: { 
    amount: 2, 
    unit: 'meal', 
    plural: 'meals',
    description: 'Nutritious meals provided to communities',
    icon: '🍱'
  },
  water: { 
    amount: 10, 
    unit: 'liter of clean water', 
    plural: 'liters of clean water',
    description: 'Clean water provided to families',
    icon: '💧'
  }
}

export function ImpactCalculator() {
  const [donationAmount, setDonationAmount] = useState(25)

  const calculateImpact = (amount: number) => ({
    trees: Math.floor(amount / IMPACT_METRICS.trees.amount),
    meals: Math.floor(amount / IMPACT_METRICS.meals.amount),
    water: Math.floor(amount / IMPACT_METRICS.water.amount)
  })

  const impact = calculateImpact(donationAmount)

  return (
    <Card className="p-6 relative overflow-hidden bg-zinc-800/50 border-zinc-700">
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-3xl font-bold text-white">$</span>
            <motion.span
              key={donationAmount}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-white"
            >
              {donationAmount}
            </motion.span>
          </div>
          
          <div className="relative max-w-md mx-auto px-4">
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              value={donationAmount}
              onChange={(e) => setDonationAmount(parseInt(e.target.value))}
              className="w-full h-2 appearance-none bg-zinc-700 rounded-full outline-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500
                [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:hover:bg-emerald-400 [&::-webkit-slider-thumb]:hover:scale-110
                
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-500 [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all
                [&::-moz-range-thumb]:hover:bg-emerald-400 [&::-moz-range-thumb]:hover:scale-110
                
                [&::-moz-range-progress]:bg-emerald-500 [&::-moz-range-progress]:rounded-full
                [&::-webkit-slider-runnable-track]:rounded-full"
            />
            <div className="flex justify-between mt-2 text-sm text-zinc-400">
              <span>$5</span>
              <span>$100</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(impact).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-6 rounded-lg bg-zinc-700/50 hover:bg-zinc-700/70 transition-colors"
            >
              <span className="text-4xl mb-2 block">
                {IMPACT_METRICS[key as keyof typeof IMPACT_METRICS].icon}
              </span>
              <motion.span
                key={value}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="block text-3xl font-bold text-white mb-1"
              >
                {value}
              </motion.span>
              <span className="block text-lg text-zinc-300 mb-2">
                {value === 1 
                  ? IMPACT_METRICS[key as keyof typeof IMPACT_METRICS].unit 
                  : IMPACT_METRICS[key as keyof typeof IMPACT_METRICS].plural}
              </span>
              <span className="text-sm text-zinc-400">
                {IMPACT_METRICS[key as keyof typeof IMPACT_METRICS].description}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-6 text-lg"
          >
            Make Your Impact Now
          </Button>
          <p className="text-sm text-zinc-400">
            100% of your donation goes directly to our projects
          </p>
        </div>
      </div>
    </Card>
  )
} 