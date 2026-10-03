"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { doctors, locations, serviceTypes, specialties } from "@/lib/directory";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

type Filters = { specialty?: string; location?: string; service?: string };

export default function Directory({ initialFilters }: { initialFilters: Filters }) {
  const [specialty, setSpecialty] = useState(initialFilters.specialty ?? "");
  const [location, setLocation] = useState(initialFilters.location ?? "");
  const [service, setService] = useState(initialFilters.service ?? "");
  const [minimumRating, setMinimumRating] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [sort, setSort] = useState("recommended");

  const results = useMemo(() => {
    const matches = doctors.filter((doctor) =>
      (!specialty || doctor.specialty.toLowerCase() === specialty.toLowerCase()) &&
      (!location || doctor.location.toLowerCase() === location.toLowerCase()) &&
      (!service || doctor.services.some((item) => item.toLowerCase() === service.toLowerCase())) &&
      (!minimumRating || doctor.rating >= 4.9),
    );
    return [...matches].sort((first, second) => sort === "rating" ? second.rating - first.rating : sort === "reviews" ? second.reviews - first.reviews : 0);
  }, [location, minimumRating, service, sort, specialty]);

  const activeFilters = [specialty, location, service].filter(Boolean);
  return (
    <>
      <SiteHeader />
      <main className="directory-page">
        <div className="directory-intro"><div className="content-width"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Find a doctor</span></div><span className="eyebrow">YOUR CARE, YOUR CHOICE</span><h1>Find someone who<br />gets <em>you.</em></h1><p>Search verified specialists, read real patient experiences and find care that fits your life.</p><form className="directory-search" action="/find-a-doctor" method="get"><label><span>Specialty</span><select name="specialty" value={specialty} onChange={(event) => setSpecialty(event.target.value)}><option value="">Any specialty</option>{specialties.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Location</span><select name="location" value={location} onChange={(event) => setLocation(event.target.value)}><option value="">Anywhere in the UK</option>{locations.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Care setting</span><select name="service" value={service} onChange={(event) => setService(event.target.value)}><option value="">Any setting</option>{serviceTypes.map((item) => <option key={item}>{item}</option>)}</select></label><button className="button button-blue" type="submit">Update search <span aria-hidden="true">↗</span></button></form></div></div>
        <div className="content-width directory-body"><aside className="filter-sidebar"><div className="filter-heading"><strong>Refine your search</strong><button onClick={() => { setSpecialty(""); setLocation(""); setService(""); setMinimumRating(false); setOnlineOnly(false); }}>Clear all</button></div><fieldset><legend>Specialty</legend>{specialties.map((item) => <label className="filter-option" key={item}><input type="radio" name="filter-specialty" checked={specialty === item} onChange={() => setSpecialty(specialty === item ? "" : item)} />{item}</label>)}</fieldset><fieldset><legend>Location</legend>{locations.map((item) => <label className="filter-option" key={item}><input type="radio" name="filter-location" checked={location === item} onChange={() => setLocation(location === item ? "" : item)} />{item}</label>)}</fieldset><fieldset><legend>Preferences</legend><label className="filter-option"><input type="checkbox" checked={minimumRating} onChange={(event) => setMinimumRating(event.target.checked)} />Rated 4.9 or higher</label><label className="filter-option"><input type="checkbox" checked={onlineOnly} onChange={(event) => setOnlineOnly(event.target.checked)} />Online consultations</label></fieldset><div className="filter-note"><span>✓</span><p>Every professional is checked for identity and credentials before joining.</p></div></aside>
          <section className="directory-results" aria-live="polite"><div className="results-heading"><div><span className="eyebrow">VERIFIED SPECIALISTS</span><h2>{results.length} professionals to explore</h2><p>{activeFilters.length ? `Showing matches for ${activeFilters.join(" · ")}` : "Care that feels right, from professionals patients trust."}</p></div><label className="sort-control"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="rating">Highest rated</option><option value="reviews">Most reviewed</option></select></label></div>{onlineOnly && <div className="inline-notice">Online availability is shown on individual profiles. Use the booking options to request a remote appointment.</div>}{results.length ? <div className="result-list">{results.map((doctor) => <article className="result-card" key={doctor.slug}><div className="result-photo" style={{ background: doctor.color }}><img src={`https://images.unsplash.com/${doctor.image}?auto=format&fit=crop&w=240&q=80`} alt={`Portrait of ${doctor.name}`} /><span aria-label="Verified professional">✓</span></div><div className="result-main"><span className="eyebrow">{doctor.specialty}</span><h3><Link href={`/doctors/${doctor.slug}`}>{doctor.name}</Link></h3><p>{doctor.focus}</p><div className="result-meta"><span>⌖ &nbsp;{doctor.location}</span><span>◉ &nbsp;In-person & online</span><span><b>★ {doctor.rating.toFixed(2)}</b> ({doctor.reviews} reviews)</span></div><span className="result-verified">✓ &nbsp;Identity and credentials verified</span></div><div className="result-side"><span className="availability"><span /> Available soon</span><strong>£{doctor.fee}</strong><small>Initial consultation</small><span className="next-slot">Next: {doctor.next}</span><Link className="button button-blue button-small" href={`/doctors/${doctor.slug}`}>View profile <span aria-hidden="true">↗</span></Link></div></article>)}</div> : <div className="empty-results"><span>⌕</span><h3>No exact matches just yet</h3><p>Try broadening your search or clearing a filter to see more professionals.</p><button className="button button-outline" onClick={() => { setSpecialty(""); setLocation(""); setService(""); setMinimumRating(false); }}>Clear filters</button></div>}</section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}