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
    <Card className="bg-gray-900 border-gray-800 overflow-hidden h-full w-full">
      <div className="relative">
        {/* Cover Photo */}
        <div className="relative mt-[-10%] h-48 w-full">
          <Image src={"https://www.shutterstock.com/image-photo/tropical-jungle-river-sun-beam-600nw-2434068599.jpg"} 
            alt="Cover photo" 
            fill
            className="object-cover filter blur-sm"
            style={{ filter: 'blur(0.5px)' }}  
            priority 
          />
        </div>

        {/* Profile Image - positioned to overlap with the bottom of cover photo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
          <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-gray-800 shadow-lg">
            <Image
              src={"https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"}
              alt={displayUsername}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <CardContent className="pt-20 pb-6 px-6 flex flex-col items-center">
        <h2 className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent px-2 py-1 rounded font-bold text-xl">{displayUsername}</h2>

        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full mt-3">
          <span className="text-sm font-mono text-gray-400">{shortenedAddress}</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white hover:text-black h-6 w-6 cursor-pointer"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span className="sr-only">Copy address</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-white">
                <p>Copy address</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-white hover:text-black" asChild>
                  <a href={`https://etherscan.io/address/${walletAddress}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span className="sr-only">View on Etherscan</span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-white">
                <p>View on Etherscan</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}

