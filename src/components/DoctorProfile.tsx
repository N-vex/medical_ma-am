"use client";

import Link from "next/link";
import { useState } from "react";
import type { Doctor } from "@/lib/directory";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

const patientReviews = [
  { name: "Alex M.", date: "2 weeks ago", text: "I felt listened to from the first minute. Everything was explained clearly, and I left with a plan that made sense for me." },
  { name: "Priya K.", date: "1 month ago", text: "Kind, thorough and incredibly reassuring. The appointment was easy to book and the follow-up was thoughtful." },
];

export default function DoctorProfile({ doctor }: { doctor: Doctor }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [activeTab, setActiveTab] = useState("About");

  function requestBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedTime) return;
    setConfirmation(`Your appointment request for ${selectedTime} has been recorded. The practice will contact you to confirm.`);
    setBookingOpen(false);
  }

  return (
    <>
      <SiteHeader />
      <main className="profile-page">
        <div className="profile-cover"><div className="content-width"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/find-a-doctor">Find a doctor</Link><span>/</span><span>{doctor.name}</span></div></div></div>
        <div className="content-width profile-layout"><div className="profile-main"><section className="profile-identity"><div className="profile-portrait" style={{ background: doctor.color }}><img src={`https://images.unsplash.com/${doctor.image}?auto=format&fit=crop&w=480&q=85`} alt={`Portrait of ${doctor.name}`} /><span>✓ Verified</span></div><div className="profile-title"><span className="eyebrow">{doctor.specialty.toUpperCase()} · CONSULTANT</span><h1>{doctor.name}</h1><p>{doctor.focus}</p><div className="profile-trust"><span><b>★ {doctor.rating.toFixed(2)}</b> ({doctor.reviews} patient reviews)</span><span>✓ Credentials verified</span></div></div></section>
          {confirmation && <div className="booking-confirmation" role="status"><span>✓</span><div><strong>Request received</strong><p>{confirmation}</p></div><button onClick={() => setConfirmation("")} aria-label="Dismiss confirmation">×</button></div>}
          <nav className="profile-tabs" aria-label="Doctor profile sections">{["About", "Reviews", "Endorsements", "Locations"].map((tab) => <button className={activeTab === tab ? "active" : ""} key={tab} onClick={() => { setActiveTab(tab); document.getElementById(`profile-${tab.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>{tab}{tab === "Reviews" && <span>{doctor.reviews}</span>}</button>)}</nav>
          <section className="profile-section" id="profile-about"><span className="eyebrow">A LITTLE ABOUT {doctor.name.split(" ").at(-1)?.toUpperCase()}</span><h2>Care shaped around you.</h2><p>{doctor.about}</p><div className="credential-row"><span className="credential-check">✓</span><span><strong>Verified credentials</strong><small>Identity and professional registration checked by Mediwell.</small></span><Link href="/about">Our standards ↗</Link></div></section>
          <section className="profile-section"><span className="eyebrow">WHAT {doctor.name.split(" ").at(-1)?.toUpperCase()} CAN HELP WITH</span><h2>Areas of expertise</h2><div className="expertise-tags">{[doctor.specialty, "Initial assessment", "Second opinion", "Treatment planning"].map((item) => <span key={item}>{item}</span>)}</div></section>
          <section className="profile-section review-section" id="profile-reviews"><div className="profile-section-heading"><div><span className="eyebrow">PATIENT EXPERIENCES</span><h2>Thoughtful care, in their words.</h2></div><span className="profile-score"><b>★ {doctor.rating.toFixed(2)}</b><small>{doctor.reviews} verified reviews</small></span></div>{patientReviews.map((review) => <article className="patient-review" key={review.name}><div className="review-avatar">{review.name.charAt(0)}</div><div><div className="review-author"><strong>{review.name}</strong><span>✓ Verified patient · {review.date}</span></div><div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div><p>“{review.text}”</p></div></article>)}<Link className="text-link" href="/reviews">How we verify patient reviews ↗</Link></section>
          <section className="profile-section endorsement-section" id="profile-endorsements"><span className="eyebrow">PEER ENDORSEMENTS</span><h2>Respected by colleagues.</h2><blockquote>“A thoughtful, highly skilled clinician who always puts the patient first. I trust their judgement and value the way they bring clarity to complex decisions.”</blockquote><small>Consultant colleague · Verified professional endorsement</small></section>
          <section className="profile-section location-section" id="profile-locations"><span className="eyebrow">PRACTICE LOCATION</span><h2>{doctor.location} & online</h2><div className="map-placeholder"><div className="map-grid" /><span className="map-pin">⌖</span><div><strong>{doctor.location} practice</strong><small>Address and directions provided when your appointment is confirmed</small></div></div><p>Online consultations are available for suitable appointments.</p></section>
        </div><aside className="booking-card"><span className="eyebrow">BOOK AN APPOINTMENT</span><h2>Take the next step.</h2><p>Choose a time that works for you. The practice will confirm your request.</p><div className="booking-price"><span>Initial consultation</span><strong>£{doctor.fee}</strong></div><div className="booking-next"><span className="availability"><span /> Next available</span><strong>{doctor.next}</strong></div><button className="button button-blue booking-button" onClick={() => setBookingOpen(true)}>Request appointment <span aria-hidden="true">↗</span></button><div className="booking-note"><span>✓</span> No payment is taken until your appointment is confirmed.</div><div className="booking-contact">Prefer to call? <a href="tel:+442079460123">020 7946 0123</a></div></aside></div>
      </main>
      <SiteFooter />
      {bookingOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBookingOpen(false); }}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close booking dialog">×</button><span className="eyebrow">APPOINTMENT REQUEST</span><h2 id="booking-title">Meet {doctor.name.split(" ").slice(1).join(" ")}.</h2><p>Select a time to send a request. The practice will confirm your appointment directly.</p><form onSubmit={requestBooking}><fieldset><legend>Available appointments</legend>{[doctor.next, "Tomorrow, 11:00 am", "Friday, 10:30 am"].map((time, index) => <label className={`appointment-slot${selectedTime === time ? " selected" : ""}`} key={`${time}-${index}`}><input type="radio" name="appointment" value={time} checked={selectedTime === time} onChange={() => setSelectedTime(time)} /><span><strong>{time}</strong><small>{index === 1 ? "Online or in person" : "In person"}</small></span><span className="slot-radio" /></label>)}</fieldset><label className="booking-email">Email for confirmation<input type="email" placeholder="you@example.com" required /></label><button className="button button-blue booking-button" type="submit" disabled={!selectedTime}>Send appointment request <span aria-hidden="true">↗</span></button><small className="modal-disclaimer">Demo experience: requests are shown locally and are not sent to a live practice.</small></form></section></div>}
    </>
  );
}