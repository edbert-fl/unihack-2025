'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Slider } from '@radix-ui/react-slider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Impact calculation constants
const IMPACT_METRICS = {
  trees: { amount: 5, unit: 'tree', plural: 'trees' },
  meals: { amount: 2, unit: 'meal', plural: 'meals' },
  water: { amount: 10, unit: 'liter of clean water', plural: 'liters of clean water' }
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
    <Card className="p-6 relative overflow-hidden">
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-center">
            See Your Impact
          </h3>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-3xl font-bold">$</span>
            <motion.span
              key={donationAmount}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold"
            >
              {donationAmount}
            </motion.span>
          </div>
          
          <Slider
            value={[donationAmount]}
            onValueChange={(value) => setDonationAmount(value[0])}
            min={5}
            max={100}
            step={5}
            className="w-full max-w-md mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(impact).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-4 rounded-lg bg-secondary"
            >
              <motion.span
                key={value}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="block text-3xl font-bold"
              >
                {value}
              </motion.span>
              <span className="text-sm text-muted-foreground">
                {value === 1 
                  ? IMPACT_METRICS[key as keyof typeof IMPACT_METRICS].unit 
                  : IMPACT_METRICS[key as keyof typeof IMPACT_METRICS].plural}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Donate Now
          </Button>
        </div>
      </div>
    </Card>
  )
} 