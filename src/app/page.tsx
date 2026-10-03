"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";

const specialties = ["Dermatology", "Cardiology", "Orthopaedics", "ENT", "Dentistry"];
const locations = ["London", "Manchester", "Birmingham", "Glasgow", "Edinburgh", "Leeds"];
const doctors = [
  { name: "Dr Amara Shah", specialty: "Dermatology", focus: "Consultant Dermatologist", location: "London", rating: "4.98", reviews: 248, fee: "£180", next: "Today, 2:30 pm", image: "photo-1559839734-2b71ea197ec2", initials: "AS", color: "#e9c9ba", verified: "Verified specialist" },
  { name: "Dr James Osei", specialty: "Cardiology", focus: "Consultant Cardiologist", location: "Manchester", rating: "4.96", reviews: 192, fee: "£220", next: "Tomorrow, 9:15 am", image: "photo-1612349317150-e413f6a5b16d", initials: "JO", color: "#d7e7ef", verified: "Verified specialist" },
  { name: "Dr Sophie Laurent", specialty: "Orthopaedics", focus: "Knee & Sports Injury Surgeon", location: "London", rating: "4.99", reviews: 316, fee: "£195", next: "Today, 4:00 pm", image: "photo-1594824476967-48c8b964273f", initials: "SL", color: "#e9d8ce", verified: "Verified specialist" },
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return <span className={`brand-mark${compact ? " brand-mark-small" : ""}`} aria-hidden="true"><span>+</span></span>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Mediwell home"><BrandMark /><span>mediwell<span className="brand-dot">.</span></span></Link>
        <button className="mobile-menu-toggle" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <Link href="/find-a-doctor">Find a doctor</Link>
          <a href="#specialties">Specialties <span className="nav-chevron">⌄</span></a>
          <a href="#how-it-works">How it works</a>
          <Link href="/about">Our pledge</Link>
        </nav>
        <div className="header-actions"><Link className="provider-link" href="/for-providers">For providers</Link><Link className="button button-small button-ink" href="/for-providers">Join Mediwell <span aria-hidden="true">↗</span></Link></div>
      </div>
    </header>
  );
}

function SearchBar() {
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  return (
    <form className="search-panel" action="/find-a-doctor" method="get">
      <label className="search-field"><span className="field-icon" aria-hidden="true">⌕</span><span className="field-copy"><span className="field-label">I&apos;m looking for</span><select aria-label="Choose a specialty" name="specialty" value={specialty} onChange={(event) => setSpecialty(event.target.value)}><option value="">Any specialty</option>{specialties.map((item) => <option key={item}>{item}</option>)}</select></span></label>
      <label className="search-field"><span className="field-icon pin-icon" aria-hidden="true">⌖</span><span className="field-copy"><span className="field-label">Where</span><select aria-label="Choose a location" name="location" value={location} onChange={(event) => setLocation(event.target.value)}><option value="">Anywhere in the UK</option>{locations.map((item) => <option key={item}>{item}</option>)}</select></span></label>
      <label className="search-field"><span className="field-icon" aria-hidden="true">◷</span><span className="field-copy"><span className="field-label">Care setting</span><select aria-label="Choose a care setting" name="service" value={service} onChange={(event) => setService(event.target.value)}><option value="">Any setting</option>{["Clinics", "Hospitals", "Dentists", "Pharmacies", "Care homes"].map((item) => <option key={item}>{item}</option>)}</select></span></label>
      <button className="button button-blue search-button" type="submit">Search <span aria-hidden="true">↗</span></button>
    </form>
  );
}

function DoctorCard({ doctor, index }: { doctor: (typeof doctors)[number]; index: number }) {
  return (
    <article className="doctor-card" style={{ animationDelay: `${index * 90}ms` }}>
      <div className="doctor-card-top"><div className="doctor-photo" style={{ backgroundColor: doctor.color }}><Image src={`https://images.unsplash.com/${doctor.image}?auto=format&fit=crop&w=240&q=80`} alt={`Portrait of ${doctor.name}`} fill sizes="96px" /><span className="verified-dot" aria-label="Sample provider profile">✓</span></div><span className="availability"><span /> Available soon</span></div>
      <div className="doctor-card-content"><span className="eyebrow doctor-specialty">{doctor.specialty}</span><h3>{doctor.name}</h3><p className="doctor-focus">{doctor.focus}</p><p className="doctor-location">⌖ &nbsp;{doctor.location} · In-person & online</p><div className="doctor-rating"><span className="star">★</span><strong>{doctor.rating}</strong><span>({doctor.reviews} reviews)</span></div><div className="doctor-card-bottom"><span><strong>{doctor.fee}</strong> <small>/ consultation</small></span><Link className="text-link" href={`/doctors/${doctor.name.toLowerCase().replaceAll(" ", "-").replace(".", "")}`}>View profile <span aria-hidden="true">↗</span></Link></div></div>
    </article>
  );
}

function CookieNotice() {
  const cookieChoice = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      window.addEventListener("mediwell-cookie-choice", callback);
      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("mediwell-cookie-choice", callback);
      };
    },
    () => window.localStorage.getItem("mediwell-cookie-choice") ?? "",
    () => "",
  );
  const visible = !cookieChoice;
  if (!visible) return null;
  function choose(value: string) {
    window.localStorage.setItem("mediwell-cookie-choice", value);
    window.dispatchEvent(new Event("mediwell-cookie-choice"));
  }
  return <aside className="cookie-notice" aria-label="Cookie preferences"><div><strong>Your privacy matters</strong><p>This demo only stores your preference in this browser. No analytics or advertising scripts are active.</p></div><div className="cookie-actions"><button className="button button-outline button-small" onClick={() => choose("essential")}>Essential only</button><button className="button button-blue button-small" onClick={() => choose("all")}>Save preference</button></div></aside>;
}

function CareAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  return (
    <div className="assistant-wrap">
      <button className="assistant-launcher" aria-label={open ? "Close care assistant" : "Open care assistant"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "×" : <><span className="assistant-spark">✳</span><span>Need a hand?</span></>}</button>
      {open && <section className="assistant-panel" aria-label="Appointment assistant">
        <div className="assistant-head"><div className="assistant-avatar">✳</div><div><strong>Mediwell guide</strong><small>Here to help you get started</small></div><button aria-label="Close" onClick={() => setOpen(false)}>×</button></div>
        <div className="assistant-message">Hello! Tell me what kind of care you&apos;re looking for and I can point you in the right direction.</div>
        {reply && <div className="assistant-message assistant-reply">{reply}</div>}
        <form onSubmit={(event) => { event.preventDefault(); if (message.trim()) { setReply("Thanks. This preview can help you browse sample profiles. Choose a specialty or location in search to get started."); setMessage(""); } }}><input aria-label="Ask for help" placeholder="Ask a question…" value={message} onChange={(event) => setMessage(event.target.value)} /><button aria-label="Send message" type="submit">↗</button></form>
        <small className="assistant-disclaimer">Demo assistant only. For urgent medical help, call 999.</small>
      </section>}
    </div>
  );
}

export default function Home() {
  const [newsletter, setNewsletter] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <>
      <Header />
      <div className="preview-banner">Preview site · Provider profiles, ratings and reviews are illustrative; booking is not connected.</div>
      <main>
        <section className="hero-section">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-inner content-width">
            <div className="hero-copy"><span className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> BETTER CARE STARTS HERE</span><h1>Good care.<br /><em>Good people.</em><br />A better way.</h1><p className="hero-description">Find the right specialist, feel confident in your choice, and book care that works for you.</p><div className="hero-proof"><div className="avatar-stack" aria-hidden="true"><span>A</span><span>M</span><span>J</span></div><span><strong>A more thoughtful way to find care</strong><small>Sample directory preview · UK-wide concept</small></span></div></div>
            <div className="hero-visual"><div className="hero-image"><Image src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85" alt="A healthcare professional in a clinic" fill priority sizes="(max-width: 680px) 70vw, 340px" /><span className="image-caption"><span className="caption-check">✓</span> Credentials, made visible</span></div><div className="hero-note"><span className="note-icon">✳</span><span><strong>Designed around patient choice</strong><small>Clear profiles. Transparent reviews.</small></span></div><div className="hero-stamp" aria-hidden="true">CARE<br />YOU CAN<br /><span>TRUST</span></div></div>
          </div>
          <div className="search-wrap content-width"><div className="search-heading"><span className="eyebrow">YOUR NEXT STEP, MADE SIMPLE</span><span className="search-helper"><span className="green-check">✓</span> Free to search. No account needed.</span></div><SearchBar /></div>
        </section>

        <section className="trust-strip" aria-label="Mediwell principles"><div className="content-width trust-inner"><span><span className="trust-icon">✓</span> Verification-first profiles</span><span><span className="trust-icon">✳</span> Review transparency</span><span><span className="trust-icon">♡</span> Patient-led choices</span><span><span className="trust-icon">⌖</span> UK-wide directory concept</span></div></section>

        <section className="section specialists-section" id="specialties"><div className="content-width"><div className="section-heading"><div><span className="eyebrow">EXPLORE CARE</span><h2>Start with what<br className="desktop-break" /> matters to you.</h2></div><Link className="text-link" href="/specialties">Browse all specialties <span aria-hidden="true">↗</span></Link></div><div className="specialty-grid">{[{ name: "Dermatology", detail: "Skin, hair & nails", icon: "◌", tone: "mint" }, { name: "Cardiology", detail: "Heart & circulation", icon: "♡", tone: "coral" }, { name: "Orthopaedics", detail: "Bones, joints & movement", icon: "⌁", tone: "blue" }, { name: "Dentistry", detail: "Confident, healthy smiles", icon: "⌣", tone: "lilac" }, { name: "ENT", detail: "Ear, nose & throat", icon: "◖", tone: "yellow" }].map((item) => <Link href={`/specialties/${item.name.toLowerCase()}`} className="specialty-tile" key={item.name}><span className={`specialty-icon ${item.tone}`}>{item.icon}</span><span className="specialty-title">{item.name}</span><span className="specialty-detail">{item.detail}</span><span className="tile-arrow" aria-hidden="true">↗</span></Link>)}</div><div className="discovery-links"><div><span className="eyebrow">CARE SETTINGS</span><div>{["Clinics", "Hospitals", "Dentists", "Pharmacies", "Care Homes"].map((item) => <Link key={item} href={`/service-types/${item.toLowerCase().replaceAll(" ", "-")}`}>{item} ↗</Link>)}</div></div><div><span className="eyebrow">POPULAR TREATMENTS</span><div>{["Orthopaedic Surgery", "Plastic Surgery", "Dermatology", "Dental Procedures"].map((item) => <Link key={item} href={`/treatments/${item.toLowerCase().replaceAll(" ", "-")}`}>{item} ↗</Link>)}</div></div></div></div></section>

        <section className="doctors-section" id="doctors"><div className="content-width"><div className="section-heading doctors-heading"><div><span className="eyebrow">SAMPLE PROFILES · DEMO CONTENT</span><h2>People who put<br className="desktop-break" /> you first.</h2><p>Illustrative provider profiles. Live credentials and booking are not connected.</p></div><Link className="button button-outline" href="/find-a-doctor">Find your specialist <span aria-hidden="true">↗</span></Link></div><div className="doctor-grid">{doctors.map((doctor, index) => <DoctorCard key={doctor.name} doctor={doctor} index={index} />)}</div><div className="center-link"><Link className="text-link" href="/find-a-doctor">See all sample profiles <span aria-hidden="true">↗</span></Link></div></div></section>

        <section className="how-section" id="how-it-works"><div className="content-width how-layout"><div className="how-intro"><span className="eyebrow">CARE, WITHOUT THE GUESSWORK</span><h2>Confidence at<br />every step.</h2><p>Finding healthcare should feel personal, not complicated. We make it easier to choose well.</p><Link className="text-link" href="/about">Our promise to you <span aria-hidden="true">↗</span></Link></div><div className="steps-list"><article className="step-item"><span className="step-number">01</span><div><h3>Find your fit</h3><p>Search by specialty, location or the kind of care you need.</p></div><span className="step-mark">⌕</span></article><article className="step-item"><span className="step-number">02</span><div><h3>Choose with confidence</h3><p>Compare verified credentials, patient reviews and availability.</p></div><span className="step-mark">✓</span></article><article className="step-item"><span className="step-number">03</span><div><h3>Book your way</h3><p>Request an appointment online or contact a practice directly.</p></div><span className="step-mark">↗</span></article></div></div></section>

        <section className="quote-section"><div className="content-width quote-layout"><div className="quote-art" aria-hidden="true"><span className="quote-art-circle">“</span><span className="quote-art-cross">+</span></div><div className="quote-copy"><span className="eyebrow">ILLUSTRATIVE PATIENT STORY</span><div className="quote-stars" aria-label="Example five-star rating">★★★★★</div><blockquote>“For the first time, I felt like I could make an informed choice about my care. I found someone who really listened.”</blockquote><div className="quote-attribution"><span className="quote-avatar">E</span><span><strong>Example patient</strong><small>Illustrative story · Dermatology</small></span></div></div><div className="quote-pagination"><span className="pagination-active" /><span /><span /></div></div></section>

        <section className="locations-section"><div className="content-width locations-layout"><div><span className="eyebrow">CARE, CLOSE TO HOME</span><h2>Good people,<br />all over the UK.</h2><p>Find trusted specialists in your city, or search online for care wherever you are.</p><Link className="text-link" href="/find-a-doctor">Explore all locations <span aria-hidden="true">↗</span></Link></div><div className="location-list">{locations.map((city, index) => <Link href={`/locations/${city.toLowerCase()}`} className="location-item" key={city}><span className="location-number">0{index + 1}</span><span>{city}</span><span className="location-arrow" aria-hidden="true">↗</span></Link>)}</div></div></section>

        <section className="provider-banner"><div className="content-width provider-inner"><div className="provider-symbol" aria-hidden="true"><BrandMark /></div><div className="provider-copy"><span className="eyebrow">FOR HEALTHCARE PROFESSIONALS</span><h2>Good care deserves<br />to be recognised.</h2><p>Build trust, share your expertise and grow your practice with Mediwell.</p></div><div className="provider-actions"><Link className="button button-cream" href="/for-providers">Join as a provider <span aria-hidden="true">↗</span></Link><Link className="provider-login" href="/for-providers">Already a member? Log in</Link></div><span className="banner-shape banner-shape-one" /><span className="banner-shape banner-shape-two" /></div></section>

        <section className="newsletter-section"><div className="content-width newsletter-inner"><div><span className="eyebrow">A LITTLE CARE IN YOUR INBOX</span><h2>Wellbeing, well considered.</h2><p>Thoughtful health notes, useful guidance, and no noise.</p></div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (newsletter.includes("@")) setSubscribed(true); }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required placeholder="Your email address" value={newsletter} onChange={(event) => setNewsletter(event.target.value)} /><button className="button button-ink" type="submit">{subscribed ? "Preview only ✓" : "Sign me up ↗"}</button><small>{subscribed ? "Thanks. Newsletter delivery is not connected in this preview." : "Newsletter delivery is not connected in this preview."}</small></form></div></section>
      </main>
      <footer className="site-footer"><div className="content-width footer-main"><div className="footer-brand"><Link className="brand" href="/"><BrandMark /><span>mediwell<span className="brand-dot">.</span></span></Link><p>Better choices for better care.</p><span className="footer-preview">Patient and provider services are not connected.</span></div><div className="footer-column"><strong>Find care</strong><Link href="/find-a-doctor">Find a doctor</Link><Link href="/specialties/dermatology">Specialties</Link><Link href="/service-types/clinics">Care settings</Link><Link href="/treatments">Treatments</Link></div><div className="footer-column"><strong>For professionals</strong><Link href="/for-providers">Join Mediwell</Link><Link href="/for-providers">Collect reviews</Link><Link href="/for-providers">Validate expertise</Link><Link href="/provider/dashboard">Provider dashboard</Link></div><div className="footer-column"><strong>About Mediwell</strong><Link href="/about">Our pledge</Link><Link href="/reviews">Reviews & endorsements</Link><Link href="/privacy">Privacy & cookies</Link></div></div><div className="content-width footer-bottom"><span>© 2026 Mediwell · Website preview.</span><span><Link href="/privacy">Privacy</Link><Link href="/privacy">Terms</Link><span>Made with care <span className="coral-heart">♥</span></span></span></div></footer>
      <CookieNotice /><CareAssistant />
    </>
  );
}
