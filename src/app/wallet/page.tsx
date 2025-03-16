"use client"

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WalletAddressInfo } from "@/components/wallet/wallet-address-info";

function WalletComponent() {
    const searchParams = useSearchParams();
    const [walletAddress, setWalletAddress] = useState<string>("");

    useEffect(() => {
        const id = searchParams.get("address");
        if (id) {
            setWalletAddress(id);
        }
    }, [searchParams]);

    return <WalletAddressInfo walletAddress={walletAddress} />;
}

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white p-4 md:p-6 lg:p-8">
            <Suspense fallback={<div>Loading...</div>}>
                <WalletComponent />
            </Suspense>
        </main>
    );
}