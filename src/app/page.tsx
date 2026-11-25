

import Features from "@/components/homepage/feature";
import GallerySection from "@/components/homepage/gallerySection";
import Hero from "@/components/homepage/hero";
import Newsletter from "@/components/homepage/newsletter";
import RecentEvents from "@/components/homepage/RecentEvents";



export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      

      <main className="flex-1">
      <Hero></Hero>
      <Features></Features>
      <RecentEvents></RecentEvents>
      <GallerySection></GallerySection>
      <Newsletter></Newsletter>
      </main>
    </div>
  );
}
