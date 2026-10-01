import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function LeadershipTestimonials() {
  const testimonials = [
    {
      id: "temesgen-tiruneh",
      quote:
        "The AI Unipod reflects the power of collaboration and marks a key step toward transforming Ethiopia into a technology-driven nation.",
      name: "Temesgen Tiruneh",
      title: "Deputy Prime Minister of Ethiopia",
      image: "/leaders/temesgen-tiruneh.webp",
      fallbackImage: "/leaders/temesgen-tiruneh.jpg",
      institution: "Government of Ethiopia",
    },
    {
      id: "ahunna-eziakonwa",
      quote:
        "The AI Unipod brings stakeholders together to turn Africa’s technological potential into action.",
      name: "Ahunna Eziakonwa",
      title: "Special Adviser on Africa to the United Nations Secretary-General",
      image: "/leaders/ahunna-eziakonwa.webp",
      fallbackImage: "/leaders/ahunna-eziakonwa.jpg",
      institution: "United Nations",
    },
    {
      id: "worku-gachena",
      quote:
        "The AI UniPod is a seedbed for innovators working in Artificial Intelligence. This hub will bridge technology research with market opportunities, positioning Ethiopia as a continental center of gravity within Africa's AI ecosystem.",
      name: "Worku Gachena (PhD)",
      title: "Director General, Ethiopian Artificial Intelligence Institute",
      image: "/leaders/worku-gachena.webp",
      fallbackImage: "/leaders/worku-gachena.png",
      institution: "Ethiopian Artificial Intelligence Institute (EAII)",
    },
    {
      id: "samuel-kifle",
      quote:
        "The establishment of this center reflects Ethiopia's growing commitment to technological advancement. Addis Ababa University will contribute skilled human resources and academic support to help advance the goals of Digital Ethiopia 2030.",
      name: "Samuel Kifle (PhD)",
      title: "President, Addis Ababa University",
      image: "/leaders/samuel-kifle.webp",
      fallbackImage: "/leaders/samuel-kifle-ena.png",
      institution: "Addis Ababa University (AAU)",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const current = testimonials[currentIndex] ?? testimonials[0]!;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-on-ink/15 bg-on-ink/[0.03] p-8 sm:p-12 lg:p-14">
      {/* Background glow accent */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div
        className="relative z-10"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Quote & Speaker Info with Smooth Crossfade */}
          <div className="flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="min-h-[160px]">
                  <Quote className="size-8 text-brand-blue/60 mb-2" />
                  <blockquote className="font-display text-xl font-medium leading-relaxed text-on-ink sm:text-2xl lg:text-3xl">
                    "{current.quote}"
                  </blockquote>
                </div>

                <div className="mt-8 border-t border-on-ink/10 pt-6">
                  <p className="font-display text-lg font-bold text-on-ink sm:text-xl">
                    {current.name}
                  </p>
                  <p className="mt-0.5 text-xs text-brand-blue/90 sm:text-sm font-medium">
                    {current.title}
                  </p>
                  <p className="text-xs text-on-ink/50 sm:text-xs">
                    {current.institution}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Photo & Controls */}
          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border-2 border-on-ink/15 bg-on-ink/5 shadow-xl sm:max-w-[320px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.name}
                  loading="lazy"
                  decoding="async"
                  width="320"
                  height="320"
                  onError={(e) => {
                    const fallback = current.fallbackImage;
                    if (fallback && e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full w-full object-cover object-top"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
            </div>

            {/* Slideshow Controls */}
            <div className="mt-4 flex w-full max-w-[280px] items-center justify-between sm:max-w-[320px]">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 transition-all duration-300 rounded-full ${idx === currentIndex
                      ? "w-7 bg-brand-blue"
                      : "w-2 bg-on-ink/25 hover:bg-on-ink/50"
                      }`}
                  />
                ))}
              </div>

              {/* Prev / Play-Pause / Next Buttons */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous quote"
                  className="grid h-9 w-9 place-items-center rounded-full border border-on-ink/20 bg-on-ink/5 text-on-ink transition-colors hover:bg-on-ink/15"
                >
                  <ChevronLeft className="size-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                  className="grid h-9 w-9 place-items-center rounded-full border border-on-ink/20 bg-on-ink/5 text-on-ink transition-colors hover:bg-on-ink/15"
                >
                  {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5 ml-0.5" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next quote"
                  className="grid h-9 w-9 place-items-center rounded-full border border-on-ink/20 bg-on-ink/5 text-on-ink transition-colors hover:bg-on-ink/15"
                >
                  <ChevronRight className="size-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}