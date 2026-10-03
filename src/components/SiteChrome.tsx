import Link from "next/link";

export function SiteHeader() {
  return (
    <><header className="subpage-header">
      <div className="subpage-header-inner">
        <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true"><span>+</span></span><span>mediwell<span className="brand-dot">.</span></span></Link>
        <nav aria-label="Main navigation"><Link href="/find-a-doctor">Find a doctor</Link><Link href="/specialties">Specialties</Link><Link href="/about">Our pledge</Link></nav>
        <Link className="button button-small button-ink" href="/for-providers">For providers <span aria-hidden="true">↗</span></Link>
      </div>
    </header><div className="preview-banner">Preview site · Provider profiles, ratings and reviews are illustrative; booking is not connected.</div></>
  );
}

export function SiteFooter() {
  return (
    <footer className="subpage-footer">
      <div className="content-width subpage-footer-inner"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true"><span>+</span></span><span>mediwell<span className="brand-dot">.</span></span></Link><p>Better choices for better care.</p><div><Link href="/about">Our pledge</Link><Link href="/reviews">Reviews</Link><Link href="/privacy">Privacy</Link><Link href="/for-providers">For providers</Link></div><span>© 2025 Mediwell Health Ltd.</span></div>
    </footer>
  );
}