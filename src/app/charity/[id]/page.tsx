import { Header } from "@/components/ui/navbar";
import { getCharityById } from "@/lib/charity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Sparkles, Users, Clock } from "lucide-react";

interface CharityPageProps {
  params: {
    id: string;
  };
}

export default async function CharityPage({ params }: CharityPageProps) {
  const charity = await getCharityById(params.id);

  if (!charity) {
    return <div>Charity not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column with charity info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              {charity.profilePicture ? (
                <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                  <Image
                    src={charity.profilePicture}
                    alt={charity.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 bg-sky-500/10 rounded-lg flex items-center justify-center">
                  <Heart className="w-8 h-8 text-sky-400" />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
                  {charity.name}
                </h1>
                <p className="text-gray-400">{charity.category}</p>
              </div>
            </div>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="impact">Impact</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4">
                <Card className="p-6 bg-black/50 border border-sky-500/20">
                  <h2 className="text-xl font-semibold mb-3">Mission</h2>
                  <p className="text-gray-300">{charity.description}</p>
                </Card>

                {/* Additional about info can go here */}
              </TabsContent>

              <TabsContent value="impact" className="space-y-4">
                <Card className="p-6 bg-black/50 border border-sky-500/20">
                  <h2 className="text-xl font-semibold mb-3">Your Impact</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    {charity.impact?.map((impact, index) => (
                      <div
                        key={index}
                        className="p-4 bg-black/30 rounded-lg flex flex-col items-center text-center"
                      >
                        <Sparkles className="w-10 h-10 text-sky-400 mb-2" />
                        <p className="text-gray-300">{impact}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                <Card className="p-6 bg-black/50 border border-sky-500/20">
                  <h2 className="text-xl font-semibold mb-3">
                    Recent Transactions
                  </h2>
                  <p className="text-gray-300">
                    All blockchain transactions are publicly visible
                  </p>
                  {/* Transaction list would go here */}
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column with donation card */}
          <div>
            <Card className="p-6 bg-black/50 border border-sky-500/20 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Make a Donation</h2>

              {charity.donationEffectText && (
                <div className="mb-4 p-3 bg-sky-500/10 rounded-lg">
                  <p className="text-sky-400">{charity.donationEffectText}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Amount</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["$5", "$10", "$25", "$50"].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        className="border-sky-500/30 hover:border-sky-500"
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Currency</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="border-sky-500/30 hover:border-sky-500"
                    >
                      BTC
                    </Button>
                    <Button
                      variant="outline"
                      className="border-sky-500/30 hover:border-sky-500"
                    >
                      ETH
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
                  Donate Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
