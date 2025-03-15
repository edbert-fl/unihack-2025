import { Header } from "@/components/ui/navbar";
import { getAllCharities } from "@/lib/charity";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Charity {
  _id: string;
  name: string;
  description: string;
  category: string;
  profilePicture?: string;
  donationEffectCostPer?: number;
  donationEffectText?: string;
  impact?: string[];
}

export default async function CharitiesPage() {
  const charities = await getAllCharities();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
              Explore Charities
            </h1>
            <p className="text-gray-300 mt-2">
              Discover and support causes that matter to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {charities.map((charity) => (
              <Link href={`/charity/${charity._id}`} key={charity._id}>
                <Card className="h-full p-6 cursor-pointer bg-black/50 border border-sky-500/20 hover:border-sky-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                  <div className="space-y-4">
                    {charity.profilePicture ? (
                      <div className="w-full aspect-square relative rounded-lg overflow-hidden">
                        <Image
                          src={charity.profilePicture ?? ""}
                          alt={charity.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-sky-500/10 rounded-lg flex items-center justify-center">
                        <Heart className="w-16 h-16 text-sky-400" />
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl font-semibold text-white">{charity.name}</h2>
                      <p className="text-gray-400 mt-2 line-clamp-2">{charity.description}</p>
                      {charity.donationEffectText && (
                        <p className="mt-4 text-sm text-sky-400">
                          {charity.donationEffectText}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
