import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { doctors, locations, serviceTypes, slugify, specialties, treatments } from "@/lib/directory";

const collections = {
  specialties: { label: "Specialties", items: specialties, description: "Meet clinicians with experience in the area of care you need." },
  "service-types": { label: "Care settings", items: serviceTypes, description: "Explore different places and ways to access care." },
  locations: { label: "Locations", items: locations, description: "Find care near home, or connect online from wherever you are." },
  treatments: { label: "Treatments", items: treatments, description: "Learn about common treatments and find a specialist to discuss your options." },
};

const staticPages = ["about", "reviews", "privacy"];
const routeParams = [
  ...Object.entries(collections).flatMap(([key, collection]) => [
    { slug: [key] },
    ...collection.items.map((item) => ({ slug: [key, slugify(item)] })),
  ]),
  ...staticPages.map((slug) => ({ slug: [slug] })),
];

function titleFromSlug(slug: string) {
  return slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export function generateStaticParams() {
  return routeParams;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const current = slug.at(-1) ?? "";
  const category = slug[0];
  const label = collections[category as keyof typeof collections]?.label;
  if (label) {
    const subject = slug.length > 1 ? titleFromSlug(current) : label;
    return { title: subject, description: `${subject}: explore care options and discover professionals on Mediwell.` };
  }
  const descriptions: Record<string, string> = {
    about: "Our pledge to make finding healthcare more transparent, thoughtful and human.",
    reviews: "How patient reviews and professional endorsements are collected and presented on Mediwell.",
    privacy: "Read about privacy, data use and cookie preferences for the Mediwell directory demo.",
  };
  return staticPages.includes(current) ? { title: titleFromSlug(current), description: descriptions[current] } : {};
}

export default async function DirectoryLandingPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const category = slug[0];
  if (staticPages.includes(category) && slug.length === 1) return <InfoPage page={category} />;
  const collection = collections[category as keyof typeof collections];
  if (!collection || slug.length > 2) notFound();
  const activeItem = slug.length === 2 ? collection.items.find((item) => slugify(item) === slug[1]) : undefined;
  if (slug.length === 2 && !activeItem) notFound();
  const matches = activeItem ? doctors.filter((doctor) =>
    (category === "specialties" && doctor.specialty.toLowerCase() === activeItem.toLowerCase()) ||
    (category === "locations" && doctor.location.toLowerCase() === activeItem.toLowerCase()) ||
    (category === "service-types" && doctor.services.some((service) => service.toLowerCase() === activeItem.toLowerCase())),
  ) : [];

  return <><SiteHeader /><main className="landing-page"><div className="landing-hero"><div className="content-width"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{collection.label}</span>{activeItem && <><span>/</span><span>{activeItem}</span></>}</div><span className="eyebrow">EXPLORE MEDIWELL</span><h1>{activeItem ?? collection.label}<em>{activeItem ? "." : ""}</em></h1><p>{collection.description}</p><div className="landing-demo-note">Demo directory · listings and reviews are illustrative, and booking is not connected.</div></div></div><div className="content-width landing-content">{!activeItem ? <><div className="landing-section-heading"><div><span className="eyebrow">FIND YOUR WAY</span><h2>Choose what feels right.</h2></div><Link className="text-link" href="/find-a-doctor">Search all professionals ↗</Link></div><div className="landing-links">{collection.items.map((item, index) => <Link href={`/${category}/${slugify(item)}`} className="landing-link-card" key={item}><span>0{index + 1}</span><strong>{item}</strong><small>{category === "locations" ? `Explore care in ${item}` : category === "treatments" ? `Understand ${item.toLowerCase()}` : `Find ${item.toLowerCase()} care`}</small><span className="tile-arrow" aria-hidden="true">↗</span></Link>)}</div></> : <><div className="landing-section-heading"><div><span className="eyebrow">{category === "locations" ? "LOCAL CARE" : category === "treatments" ? "TREATMENT GUIDE" : "A GOOD PLACE TO BEGIN"}</span><h2>{category === "treatments" ? `Explore ${activeItem.toLowerCase()}.` : `Care that meets you ${category === "locations" ? "here." : "where you are."}`}</h2><p>{category === "treatments" ? "Treatment choices are personal. A qualified professional can talk you through suitability, benefits and risks." : collection.description}</p></div><Link className="button button-blue" href={`/find-a-doctor?${category === "specialties" ? "specialty" : category === "locations" ? "location" : category === "service-types" ? "service" : "specialty"}=${encodeURIComponent(category === "treatments" ? "" : activeItem)}`}>Search Mediwell <span aria-hidden="true">↗</span></Link></div>{matches.length > 0 ? <div className="landing-professionals"><span className="eyebrow">SAMPLE DIRECTORY PROFILES</span><div className="landing-professional-grid">{matches.map((doctor) => <Link className="landing-doctor" href={`/doctors/${doctor.slug}`} key={doctor.slug}><span className="landing-doctor-avatar" style={{ background: doctor.color }}><img src={`https://images.unsplash.com/${doctor.image}?auto=format&fit=crop&w=180&q=75`} alt="" /></span><span className="landing-doctor-info"><strong>{doctor.name}</strong><small>{doctor.focus} · {doctor.location}</small><span>★ {doctor.rating.toFixed(2)} · {doctor.reviews} sample reviews</span></span><span className="landing-doctor-arrow">↗</span></Link>)}</div></div> : <div className="treatment-note"><span>✳</span><div><strong>Start with a conversation.</strong><p>Use a consultation to understand your options, ask questions and decide what is appropriate for you. This demo does not provide clinical advice.</p></div></div>}<div className="landing-related"><span className="eyebrow">KEEP EXPLORING</span><div>{(category === "specialties" ? ["service-types", "locations", "treatments"] : ["specialties", "locations", "treatments"]).map((key) => <Link key={key} href={`/${key}`}>{collections[key as keyof typeof collections].label} ↗</Link>)}</div></div></>}</div></main><SiteFooter /></>;
}

function InfoPage({ page }: { page: string }) {
  const isAbout = page === "about";
  const isReviews = page === "reviews";
  const title = isAbout ? "Care should feel clearer." : isReviews ? "Trust, earned one experience at a time." : "Your information, treated with care.";
  return <><SiteHeader /><main className="info-page"><div className="landing-hero"><div className="content-width"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{titleFromSlug(page)}</span></div><span className="eyebrow">{isAbout ? "OUR PLEDGE" : isReviews ? "REVIEWS & ENDORSEMENTS" : "PRIVACY & COOKIES"}</span><h1>{title}</h1><p>{isAbout ? "We believe the right information helps people make better decisions about their health." : isReviews ? "Honest experiences help patients make informed choices and help great care be recognised." : "This demonstration site keeps information local to your browser and does not connect to a live health service."}</p><div className="landing-demo-note">Preview site · Content below explains the intended Mediwell approach, not an active regulated service.</div></div></div><div className="content-width info-content">{isAbout ? <><section><span className="eyebrow">WHAT WE BELIEVE</span><h2>Better choices start with transparency.</h2><p>Healthcare is personal. Finding the right professional should feel considered and clear. Mediwell is a directory concept designed to bring verified credentials, real patient experiences and practical booking information together in one place.</p></section><div className="pledge-grid">{[{ icon: "✓", title: "Show the full picture", text: "Present professional credentials, areas of expertise and care options clearly." }, { icon: "♡", title: "Put people first", text: "Make space for patient experiences while respecting privacy and dignity." }, { icon: "✳", title: "Earn trust, not assume it", text: "Explain how verification, reviews and endorsements work." }].map((item) => <article key={item.title}><span>{item.icon}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><section><span className="eyebrow">A CLEAR DISTINCTION</span><h2>A directory, not medical advice.</h2><p>Mediwell helps people discover professionals. It does not diagnose, recommend treatment or replace advice from a qualified healthcare professional. In an emergency, contact your local emergency service.</p><Link className="text-link" href="/find-a-doctor">Explore the sample directory ↗</Link></section></> : isReviews ? <><section><span className="eyebrow">HOW REVIEWS SHOULD WORK</span><h2>Useful, fair and clearly labelled.</h2><p>In a live service, patient feedback should be tied to a confirmed care experience, moderated for safety and displayed with context. Professional endorsements should come from colleagues whose identity and credentials have been checked.</p></section><div className="review-principles">{[{ number: "01", title: "Verified experience", text: "Only publish feedback connected to a genuine appointment or care interaction." }, { number: "02", title: "Respectful moderation", text: "Remove personal health details and content that risks patient privacy." }, { number: "03", title: "Right of reply", text: "Give professionals a fair, accountable way to respond to feedback." }].map((item) => <article key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div><section className="review-demo-disclosure"><span className="eyebrow">ABOUT THIS PREVIEW</span><h2>All sample reviews are illustrative.</h2><p>No testimonials on this demo represent a real patient experience. A production review service needs identity checks, consent, moderation and secure data handling.</p></section></> : <><section><span className="eyebrow">PRIVACY OVERVIEW</span><h2>What this demo does.</h2><p>This front-end preview uses local example data. The cookie preference control stores a choice in your browser&apos;s local storage. Search, booking requests and provider form submissions are demonstrations only; no information is sent to a live service.</p></section><section><span className="eyebrow">A PRODUCTION SERVICE WOULD</span><h2>Explain data use before collection.</h2><p>A live healthcare directory must publish a reviewed privacy notice, define lawful processing, protect sensitive personal data, document retention periods, support data-subject rights and assess any tracking technologies before launch. This page is not legal advice or a substitute for a formal privacy review.</p><Link className="text-link" href="/about">Read our pledge ↗</Link></section><section><span className="eyebrow">COOKIE PREFERENCES</span><h2>Choice should be easy to revisit.</h2><p>This demo lets you accept all cookies or keep only essential storage. No analytics or advertising scripts are configured. A production deployment should connect a consent-management platform before adding optional tracking.</p><CookieSettingsButton /></section></>}</div></main><SiteFooter /></>;
}