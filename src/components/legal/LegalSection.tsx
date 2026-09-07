export interface LegalSectionData {
  heading: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: string[];
  body?: React.ReactNode;
  outro?: string;
}

export default function LegalSection({ heading, intro, paragraphs, bullets, body, outro }: LegalSectionData) {
  return (
    <div className="py-8 first:pt-0">
      <h2 className="text-[17px] font-semibold tracking-tight text-text-dark sm:text-[19px]">
        {heading}
      </h2>

      {paragraphs?.map((p) => (
        <p key={p} className="mt-3 text-[14px] leading-relaxed text-text-muted">
          {p}
        </p>
      ))}

      {body && <p className="mt-3 text-[14px] leading-relaxed text-text-muted">{body}</p>}

      {intro && <p className="mt-3 text-[14px] leading-relaxed text-text-muted">{intro}</p>}

      {bullets && (
        <ul className="mt-3 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span className="text-[14px] leading-relaxed text-text-muted">{b}</span>
            </li>
          ))}
        </ul>
      )}

      {outro && <p className="mt-3 text-[14px] leading-relaxed text-text-muted">{outro}</p>}
    </div>
  );
}
