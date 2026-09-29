"use client";

const FLAGS = "/media/flags";

/** Countries our clients operate in, one entry each. */
const countries = [
  { name: "United Kingdom", flag: `${FLAGS}/gb.svg` },
  { name: "Tanzania", flag: `${FLAGS}/tz.svg` },
  { name: "Ireland", flag: `${FLAGS}/ie.svg` },
  { name: "Cameroon", flag: `${FLAGS}/cm.svg` },
  { name: "Mexico", flag: `${FLAGS}/mx.png` },
  { name: "UAE", flag: `${FLAGS}/ae.svg` },
  { name: "Qatar", flag: `${FLAGS}/qa.svg` },
  { name: "Ukraine", flag: `${FLAGS}/ua.svg` },
  { name: "Estonia", flag: `${FLAGS}/ee.svg` },
  { name: "Nigeria", flag: `${FLAGS}/ng.svg` },
  { name: "Somaliland", flag: `${FLAGS}/somaliland.svg` },
  { name: "Belize", flag: `${FLAGS}/bz.png` },
  { name: "Botswana", flag: `${FLAGS}/bw.svg` },
  { name: "Finland", flag: `${FLAGS}/fi.svg` },
  { name: "Zambia", flag: `${FLAGS}/zm.svg` },
  { name: "Ethiopia", flag: `${FLAGS}/et.svg` },
  { name: "Nepal", flag: `${FLAGS}/np.svg` },
  { name: "Bangladesh", flag: `${FLAGS}/bd.svg` },
];

export default function CountryMarquee({ className = "" }: { className?: string }) {
  // Two identical copies side by side; the track slides exactly one copy's
  // width (-50%) and restarts, so the loop is seamless. Spacing uses a
  // trailing margin on every chip (not `gap`) so both halves are equal width.
  const track = [...countries, ...countries];

  return (
    <div
      data-gsap
      className={`group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className}`}
    >
      <ul
        className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ "--marquee-duration": "45s" } as React.CSSProperties}
      >
        {track.map((c, i) => (
          <li
            key={`${c.name}-${i}`}
            aria-hidden={i >= countries.length}
            className="mr-3 flex shrink-0 items-center gap-2.5 rounded-full border border-gray-200 bg-white py-2 pl-2 pr-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:mr-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.flag}
              alt=""
              loading="lazy"
              className="h-5 w-7 shrink-0 rounded-[3px] object-cover ring-1 ring-black/5"
            />
            <span className="whitespace-nowrap text-[13px] font-medium text-text-body sm:text-[14px]">
              {c.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
