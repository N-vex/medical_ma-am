"use client";

import { useRouter } from "next/navigation";

export default function CookieSettingsButton() {
  const router = useRouter();
  return <button className="button button-outline" onClick={() => { window.localStorage.removeItem("mediwell-cookie-choice"); router.push("/"); }}>Review cookie choice ↗</button>;
}