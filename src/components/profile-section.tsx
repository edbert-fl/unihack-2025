"use client"

import Image from "next/image"
import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProfileSectionProps {
  profileImage?: string
  username?: string
  walletAddress: string
}

export function ProfileSection({ profileImage, username, walletAddress }: ProfileSectionProps) {
  const displayUsername = username || "Unknown"
  const shortenedAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-gray-800 shadow-md">
            <Image
              src={profileImage || "/placeholder.svg?height=128&width=128"}
              alt={displayUsername}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <h2 className="text-2xl font-bold text-white">{displayUsername}</h2>

            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full mt-1">
              <span className="text-sm font-mono text-gray-400">{shortenedAddress}</span>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-white hover:text-black h-6 w-6 cursor-pointer" onClick={copyToClipboard}>
                      <Copy className="h-3.5 w-3.5" />
                      <span className="sr-only">Copy address</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy address</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-white hover:text-black" asChild>
                      <a
                        href={`https://etherscan.io/address/${walletAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span className="sr-only">View on Etherscan</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View on Etherscan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

