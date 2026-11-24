

import Features from "@/components/homepage/feature";
import Hero from "@/components/homepage/hero";
import Newsletter from "@/components/homepage/newsletter";



export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      

      <main className="flex-1">
      <Hero></Hero>
      <Features></Features>
      <Newsletter></Newsletter>
      </main>
    </div>
  );
}
