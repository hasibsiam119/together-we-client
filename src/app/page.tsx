

import Hero from "@/components/homepage/hero";
import Navbar from "@/components/homepage/navbar";



export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />

      <main className="flex-1">
      <Hero></Hero>
      </main>
    </div>
  );
}
