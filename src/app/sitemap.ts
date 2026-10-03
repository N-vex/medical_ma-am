import type { MetadataRoute } from "next";
import { doctors, locations, serviceTypes, slugify, specialties, treatments } from "@/lib/directory";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const routes = ["", "/find-a-doctor", "/for-providers", "/about", "/reviews", "/privacy", "/specialties", "/service-types", "/locations", "/treatments"];
  const categories = [
    ...specialties.map((item) => `/specialties/${slugify(item)}`),
    ...serviceTypes.map((item) => `/service-types/${slugify(item)}`),
    ...locations.map((item) => `/locations/${slugify(item)}`),
    ...treatments.map((item) => `/treatments/${slugify(item)}`),
  ];
  const profiles = doctors.map((doctor) => `/doctors/${doctor.slug}`);
  return [...routes, ...categories, ...profiles].map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: "weekly", priority: route === "" ? 1 : 0.7 }));
}