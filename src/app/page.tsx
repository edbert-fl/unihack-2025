import Image from "next/image";
import { HeroHighlight } from "@/components/ui/hero-highlight";
export default function Home() {
  return (
    <div>
      <HeroHighlight
        children={
          <h1 className="text-4xl font-bold">
            Unihack <span className="text-primary">2025</span>
          </h1>
        }
      />
    </div>
  );
}
