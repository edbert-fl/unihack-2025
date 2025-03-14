"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/ui/navbar';
import { 
  FundingStory, 
  Transaction, 
  getStoryBySlug, 
  formatCurrency, 
  calculateProgress,
  formatRelativeTime 
} from '@/lib/funding-stories';
import { Calendar, MapPin, Share2, Facebook, Instagram } from 'lucide-react';

export default function StoryPage() {
  const params = useParams();
  const [story, setStory] = useState<FundingStory | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [cryptoPrices, setCryptoPrices] = useState({
    btc: 0,
    eth: 0
  });

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=aud'
        )
        const data = await response.json()
        setCryptoPrices({
          btc: data.bitcoin.aud,
          eth: data.ethereum.aud
        })
      } catch (error) {
        console.error('Error fetching crypto prices:', error)
      }
    }

    fetchCryptoPrices()
    // Refresh prices every minute
    const interval = setInterval(fetchCryptoPrices, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!params.slug) return;
    
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const foundStory = getStoryBySlug(slug);
    
    if (foundStory) {
      setStory(foundStory);
      setSelectedImage(foundStory.gallery[0]);
    }
  }, [params.slug]);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />
      <div className="relative z-10">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold pb-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400">
                {story.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Created {formatRelativeTime(story.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{story.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Column - Story Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Image Gallery */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={selectedImage}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-4 overflow-x-auto p-2">
                    {story.gallery.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`relative w-20 h-32 rounded-lg overflow-hidden flex-shrink-0 ${
                          selectedImage === img ? 'ring-2 ring-sky-400' : ''
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Story Content */}
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-white">
                    {story.detailedStory}
                  </div>
                </div>

                {/* Updates */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white">Updates</h2>
                  {story.updates.map((update, index) => (
                    <Card key={index} className="p-4 bg-black/50 border-sky-500/20">
                      <h3 className="font-semibold text-white mb-2">{update.title}</h3>
                      <p className="text-gray-300 mb-2">{update.content}</p>
                      <time className="text-sm text-gray-400">
                        {formatRelativeTime(update.date)}
                      </time>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Right Column - Donation Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Progress Card */}
                <Card className="p-6 bg-black/50 border-sky-500/20">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">
                        {formatCurrency(story.raised)}
                      </h3>
                      <p className="text-gray-400">
                        raised of {formatCurrency(story.goal)} goal
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="p-3 rounded-lg bg-black/30">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-zinc-300">BTC</span>
                            <span className="text-sm text-zinc-400">≈ ${cryptoPrices.btc.toLocaleString()}</span>
                          </div>
                          <motion.div
                            key={story.raised + 'btc'}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-lg font-bold text-white"
                          >
                            ₿{(story.raised / cryptoPrices.btc).toFixed(2)}
                            <span className="text-sm text-zinc-400 ml-1">raised</span>
                          </motion.div>
                          <motion.div
                            key={story.goal + 'btc'}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-sm text-zinc-400"
                          >
                            of ₿{(story.goal / cryptoPrices.btc).toFixed(2)} goal
                          </motion.div>
                        </div>
                        <div className="p-3 rounded-lg bg-black/30">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-zinc-300">ETH</span>
                            <span className="text-sm text-zinc-400">≈ ${cryptoPrices.eth.toLocaleString()}</span>
                          </div>
                          <motion.div
                            key={story.raised + 'eth'}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-lg font-bold text-white"
                          >
                            Ξ{(story.raised / cryptoPrices.eth).toFixed(2)}
                            <span className="text-sm text-zinc-400 ml-1">raised</span>
                          </motion.div>
                          <motion.div
                            key={story.goal + 'eth'}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-sm text-zinc-400"
                          >
                            of Ξ{(story.goal / cryptoPrices.eth).toFixed(2)} goal
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-sky-500/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-500 rounded-full"
                        style={{ width: `${calculateProgress(story.raised, story.goal)}%` }}
                      />
                    </div>
                    <Button 
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white transition-transform hover:scale-105 cursor-pointer"
                      onClick={() => window.location.href = `/donate?story=${story.id}`}
                    >
                      Donate Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-sky-500/20 hover:border-sky-500 text-sky-400 transition-transform hover:scale-105"
                      onClick={() => {
                        navigator.share?.({
                          title: story.title,
                          text: story.story,
                          url: window.location.href,
                        }).catch(() => {
                          navigator.clipboard.writeText(window.location.href);
                        });
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </Card>

                {/* Recent Donations */}
                <Card className="p-6 bg-black/50 border-sky-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Recent Donations
                  </h3>
                  <div className="space-y-4">
                    {story.transactions.slice(0, 5).map((tx) => (
                      <div key={tx.id} className="border-b border-sky-500/20 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-white">{tx.donor}</span>
                          <div className="text-right">
                            <div className="text-sky-400">{formatCurrency(tx.amount)}</div>
                            <div className="space-y-0.5">
                              <div className="text-xs text-zinc-400">
                                ≈ ₿{(tx.amount / cryptoPrices.btc).toFixed(4)}
                              </div>
                              <div className="text-xs text-zinc-400">
                                ≈ Ξ{(tx.amount / cryptoPrices.eth).toFixed(4)}
                              </div>
                            </div>
                          </div>
                        </div>
                        {tx.message && (
                          <p className="text-sm text-gray-300">{tx.message}</p>
                        )}
                        <time className="text-xs text-gray-400">
                          {formatRelativeTime(tx.timestamp)}
                        </time>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Social Links */}
                {story.socialLinks && (
                  <Card className="p-6 bg-black/50 border-sky-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Follow {story.name}'s Journey
                    </h3>
                    <div className="flex gap-4">
                      {story.socialLinks.facebook && (
                        <a
                          href={story.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-sky-400"
                        >
                          <Facebook className="w-6 h-6" />
                        </a>
                      )}
                      {story.socialLinks.instagram && (
                        <a
                          href={story.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-sky-400"
                        >
                          <Instagram className="w-6 h-6" />
                        </a>
                      )}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 