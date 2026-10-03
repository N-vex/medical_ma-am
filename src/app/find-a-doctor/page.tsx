import type { Metadata } from "next";
import Directory from "@/components/Directory";

export const metadata: Metadata = {
  title: "Find a Doctor",
  description: "Explore sample healthcare provider profiles by specialty, location and care setting across the UK.",
};

export default async function FindDoctorPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  return <Directory initialFilters={{ specialty: String(query.specialty ?? ""), location: String(query.location ?? ""), service: String(query.service ?? "") }} />;
}