import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

const galleryImages = [
  {
    src: "/gallery/food-donation.jpg",
    alt: "Volunteers packing and sharing food with families in need",
    category: "Food Donation",
    layout: "sm:col-span-2 lg:row-span-2",
    sizes: "(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw",
  },
  {
    src: "/gallery/tree-plantation.jpg",
    alt: "Volunteers planting young trees during a community tree plantation drive",
    category: "Tree Plantation",
    layout: "",
    sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    src: "/gallery/community-cleanup.jpg",
    alt: "Local volunteers cleaning up a neighbourhood together",
    category: "Community Cleanup",
    layout: "",
    sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    src: "/gallery/education.jpg",
    alt: "Children learning together in a community education program",
    category: "Educational Programs",
    layout: "",
    sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    src: "/gallery/volunteer-team.jpg",
    alt: "A team of volunteers smiling together after a community event",
    category: "Volunteer Activities",
    layout: "",
    sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    src: "/gallery/community-sports.jpg",
    alt: "Young people playing sports at a community gathering",
    category: "Community Support",
    layout: "lg:col-span-2",
    sizes: "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    src: "/gallery/animal-welfare.jpg",
    alt: "A volunteer caring for a rescued animal",
    category: "Animal Welfare",
    layout: "lg:col-span-2",
    sizes: "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw",
  },
];

const GallerySection = () => {
  return (
    <section
      aria-labelledby="gallery-heading"
      className={`${manrope.className} relative isolate overflow-hidden bg-background`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_10%_0%,var(--secondary),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 -z-10 size-72 rounded-full bg-secondary/50 blur-3xl dark:bg-primary/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-0 -z-10 hidden size-48 opacity-25 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:16px_16px] lg:block"
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
          <div>
            <p className="flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary dark:text-emerald-400">
              <span
                aria-hidden
                className="h-px w-7 bg-primary/40 dark:bg-emerald-400/40"
              />
              Our Memories
            </p>

            <h2
              id="gallery-heading"
              className="mt-4 max-w-3xl text-[clamp(1.9rem,3.5vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.035em] text-balance text-foreground"
            >
              Moments That Make a{" "}
              <span className="relative inline-block text-primary dark:text-emerald-400">
                Difference
                <svg
                  aria-hidden
                  viewBox="0 0 220 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-accent/70"
                >
                  <path
                    d="M2 9C52 3 156 2 218 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7 lg:pb-1 lg:text-right">
            A look back at the days we shared, the hands we lent, and the smiles
            we created together through volunteering and community service.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:auto-rows-[14rem] lg:grid-cols-4 lg:gap-5">
          {galleryImages.map((image) => (
            <figure
              key={image.src}
              className={`group relative h-64 overflow-hidden rounded-[24px] border border-black/5 bg-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-72 lg:h-full dark:border-white/10 ${image.layout}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={image.sizes}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />

              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#0b1f16]/90 via-[#0b1f16]/25 to-transparent"
              />

              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7]/95 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#166534] shadow-sm backdrop-blur">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {image.category}
              </span>

              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <div>
                  <p className="text-base font-bold leading-snug tracking-tight text-white sm:text-lg">
                    {image.category}
                  </p>
                  <p className="mt-0.5 text-xs text-emerald-50/70">
                    TogetherWe Community
                  </p>
                </div>
                <span
                  aria-hidden
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-[#dcfce7] group-hover:text-[#166534]"
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <Link
            href="/upcomingEvents"
            className="group inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14532d] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:hover:bg-emerald-600"
          >
            Explore More
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
