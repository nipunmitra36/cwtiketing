"use client";

interface ClientLogo {
  name: string;
  src?: string;
  country?: string;
}

interface LogoMarqueeProps {
  logos: ClientLogo[];
  className?: string;
}

function MarqueeRow({
  logos,
  direction,
  speed = 45,
}: {
  logos: ClientLogo[];
  direction: "left" | "right";
  speed?: number;
}) {
  const track = [...logos, ...logos];

  return (
    <div className="group/row relative overflow-hidden">
      <div
        className={`flex w-max items-center ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
          } [animation-duration:var(--marquee-duration)] group-hover/row:[animation-play-state:paused]`}
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            title={logo.country ? `${logo.name} — ${logo.country}` : logo.name}
            className="mr-4 flex shrink-0 items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white px-6 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(16,24,40,0.08)]"
          >
            {logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                className="h-9 w-auto object-contain"
              />
            ) : (
              <span className="text-[15px] font-semibold text-text-body">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoMarquee({ logos, className = "" }: LogoMarqueeProps) {
  if (logos.length === 0) return null;

  const third = Math.ceil(logos.length / 3);
  const rows = [
    logos.slice(0, third),
    logos.slice(third, third * 2),
    logos.slice(third * 2),
  ];

  return (
    <div data-gsap className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />

      <div className="flex flex-col gap-6">
        <MarqueeRow logos={rows[0]} direction="left" speed={60} />
        <MarqueeRow logos={rows[1]} direction="right" speed={70} />
        <MarqueeRow logos={rows[2]} direction="left" speed={60} />
      </div>
    </div>
  );
}