import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DoctorProfile from "@/components/DoctorProfile";
import { doctors } from "@/lib/directory";

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doctor = doctors.find((item) => item.slug === slug);
  return doctor ? { title: `${doctor.name}, ${doctor.specialty}`, description: `Sample ${doctor.focus.toLowerCase()} profile in ${doctor.location}, with illustrative patient feedback and an appointment-request demo.` } : {};
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = doctors.find((item) => item.slug === slug);
  if (!doctor) notFound();
  return <DoctorProfile doctor={doctor} />;
}