import { WalletAddressInfo } from "@/components/wallet-address-info"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white p-4 md:p-6 lg:p-8">
      <WalletAddressInfo walletAddress="0x1234567890abcdef1234567890abcdef12345678" />
    </main>
  )
}

