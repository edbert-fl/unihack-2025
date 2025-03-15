"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WalletAddressInfo } from "@/components/wallet/wallet-address-info"

export default function Home() {
    const searchParams = useSearchParams();
    const [walletAddress, setWalletAddress] = useState<string>("")
    useEffect(() => {
        const id = searchParams.get("address");
        if (id) {
            setWalletAddress(id);
        }
    }, [searchParams])
    return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white p-4 md:p-6 lg:p-8">
        <WalletAddressInfo walletAddress={walletAddress} />
    </main>
    )
}