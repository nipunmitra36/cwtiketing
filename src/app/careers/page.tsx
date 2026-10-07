import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers | CWTicketing",
  description:
    "Join CWTicketing. Explore career opportunities at Codeware Ltd. building modern transport technology.",
  canonical: "/careers",
});

import {
  HiOutlineBriefcase,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup,
  HiOutlineHome,
  HiOutlineCheck,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCake,
  HiOutlineArrowRight,
} from "react-icons/hi";

const APPLY_EMAIL = "jobs@codewareltd.com";
const PHONE = "+8801672691228";
const WHATSAPP = "8801614000401";

const ROLE = {
  title: "Mid-level & Intern PHP Developer",
  intro:
    "We are currently hiring for the Back-end Web Developer (PHP) position. Applicants should possess expertise in the following technologies: PHP, MySQL, HTML, CSS, Bootstrap, and jQuery.",
  responsibilities: [
    "Strong programming skills & highly proficient in PHP & Laravel-based applications. Experience in Raw PHP will be given priority.",
    "Must have strong knowledge of working in different database systems (MySQL/PostgreSQL/MongoDB).",
    "Review the functional requirements thoroughly and gain a clear understanding of the technical implementations necessary to meet the client's objectives.",
    "Document and demonstrate solutions by developing documentation, flowcharts, layouts, diagrams, charts, code comments, and clear, readable code.",
    "Communicate and provide technical support to local and international clients - Maintain a version-control system (Git) and project management tool.",
    "Experience in working with different modern REST APIs.",
  ],
  details: [
    {
      icon: HiOutlineBriefcase,
      label: "Educational Requirements",
      value: "Diploma Degree in Computer Technology / Bachelor of Computer Science & Engineering or any similar field.",
    },
    {
      icon: HiOutlineClock,
      label: "Experience Requirements",
      value:
        "Minimum experience 1-2 years (Mid-level). Freshers are encouraged to apply as interns.",
    },
    { icon: HiOutlineUserGroup, label: "Vacancies", value: "05" },
    { icon: HiOutlineLocationMarker, label: "Job Location", value: "Adabor, Dhaka, Bangladesh" },
    { icon: HiOutlineBriefcase, label: "Employment Status", value: "Full-time" },
    { icon: HiOutlineHome, label: "Workplace", value: "On-Site" },
    { icon: HiOutlineClock, label: "Office Time", value: "9:00 am to 6:00 pm" },
    { icon: HiOutlineCurrencyDollar, label: "Salary", value: "Negotiable" },
  ],
  benefits: [
    { icon: HiOutlineHome, label: "Lunch", value: "Fully Subsidized" },
    { icon: HiOutlineCurrencyDollar, label: "Salary Review", value: "Annually" },
    { icon: HiOutlineCake, label: "Festival Bonus", value: "2" },
  ],
};

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 py-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
          {label}
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-text-body">{value}</p>
      </div>
    </div>
  );
}

export default function CareersPage() {
  return (
    <main className="bg-white">
      {/* ─── Header ─── */}
      <section className="border-b border-gray-200 bg-gray-50/60 pb-14 pt-32 sm:pt-40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-brand shadow-sm">
            <HiOutlineBriefcase className="h-4 w-4" />
            Careers
          </span>
          <h1 className="mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-text-dark sm:text-[2.4rem]">
            {ROLE.title}
          </h1>
          <p className="mt-6 max-w-3xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
            {ROLE.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent("Application: Mid-level & Intern PHP Developer")}`}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-brand-hover"
            >
              <HiOutlineMail className="h-4 w-4" />
              Send your CV
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-[14px] font-semibold text-text-dark transition hover:border-brand/40 hover:text-brand"
            >
              <HiOutlinePhone className="h-4 w-4" />
              {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Body ─── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Responsibilities */}
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight text-text-dark sm:text-[19px]">
              Job Responsibilities
            </h2>
            <ul className="mt-5 space-y-3">
              {ROLE.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                    <HiOutlineCheck className="h-3 w-3" />
                  </span>
                  <span className="text-[14px] leading-relaxed text-text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Job details */}
          <div className="mt-14">
            <h2 className="text-[17px] font-semibold tracking-tight text-text-dark sm:text-[19px]">
              Job Details
            </h2>
            <div className="mt-4 divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white px-6 shadow-sm sm:px-8">
              {ROLE.details.map((d) => (
                <DetailRow key={d.label} {...d} />
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-14">
            <h2 className="text-[17px] font-semibold tracking-tight text-text-dark sm:text-[19px]">
              Compensation &amp; Other Benefits
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {ROLE.benefits.map((b) => (
                <div
                  key={b.label}
                  className="rounded-2xl border border-brand/15 bg-gradient-to-br from-brand-light/40 to-white p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-[14px] font-semibold text-text-dark">{b.label}</p>
                  <p className="mt-1 text-[13px] font-medium text-brand">{b.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Apply */}
          <div className="mt-14 overflow-hidden rounded-2xl border border-brand/20 bg-gradient-to-br from-brand-light to-white p-8 sm:p-10">
            <h2 className="text-[19px] font-semibold tracking-tight text-text-dark sm:text-[21px]">
              How to apply
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-text-muted">
              Send your updated CV to{" "}
              <a href={`mailto:${APPLY_EMAIL}`} className="font-semibold text-brand hover:underline">
                {APPLY_EMAIL}
              </a>
              . Mention the position &ldquo;{ROLE.title}&rdquo; in the subject line.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent("Application: Mid-level & Intern PHP Developer")}&body=${encodeURIComponent("Please find my CV attached.")}`}
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-brand-hover"
              >
                <HiOutlineMail className="h-4 w-4" />
                Email your CV
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-[14px] font-semibold text-text-dark transition hover:border-brand/40 hover:text-brand"
              >
                WhatsApp
                <HiOutlineArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
