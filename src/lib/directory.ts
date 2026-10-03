export const specialties = ["Dermatology", "Cardiology", "Orthopaedics", "ENT", "Dentistry"] as const;
export const locations = ["London", "Manchester", "Birmingham", "Glasgow", "Edinburgh", "Leeds"] as const;
export const serviceTypes = ["Clinics", "Hospitals", "Dentists", "Pharmacies", "Care Homes"] as const;
export const treatments = ["Orthopaedic Surgery", "Plastic Surgery", "Dermatology", "Dental Procedures"] as const;

export type Doctor = {
  slug: string;
  name: string;
  specialty: string;
  focus: string;
  location: string;
  rating: number;
  reviews: number;
  fee: number;
  next: string;
  image: string;
  initials: string;
  color: string;
  about: string;
  services: string[];
};

export const doctors: Doctor[] = [
  {
    slug: "dr-amara-shah",
    name: "Dr Amara Shah",
    specialty: "Dermatology",
    focus: "Consultant Dermatologist",
    location: "London",
    rating: 4.98,
    reviews: 248,
    fee: 180,
    next: "Today, 2:30 pm",
    image: "photo-1559839734-2b71ea197ec2",
    initials: "AS",
    color: "#e9c9ba",
    about: "Dr Shah is a consultant dermatologist with a special interest in long-term skin health, acne and complex inflammatory skin conditions. She believes great care starts with listening and making a plan together.",
    services: ["Clinics", "Hospitals"],
  },
  {
    slug: "dr-james-osei",
    name: "Dr James Osei",
    specialty: "Cardiology",
    focus: "Consultant Cardiologist",
    location: "Manchester",
    rating: 4.96,
    reviews: 192,
    fee: 220,
    next: "Tomorrow, 9:15 am",
    image: "photo-1612349317150-e413f6a5b16d",
    initials: "JO",
    color: "#d7e7ef",
    about: "Dr Osei is a consultant cardiologist who helps people understand their heart health and make confident decisions about their care. His practice combines evidence-led medicine with a thoughtful, unhurried approach.",
    services: ["Clinics", "Hospitals"],
  },
  {
    slug: "dr-sophie-laurent",
    name: "Dr Sophie Laurent",
    specialty: "Orthopaedics",
    focus: "Knee & Sports Injury Surgeon",
    location: "London",
    rating: 4.99,
    reviews: 316,
    fee: 195,
    next: "Today, 4:00 pm",
    image: "photo-1594824476967-48c8b964273f",
    initials: "SL",
    color: "#e9d8ce",
    about: "Dr Laurent specialises in knee and sports injuries, helping patients return to everyday movement with a clear diagnosis and a treatment plan tailored to their goals.",
    services: ["Clinics", "Hospitals"],
  },
  {
    slug: "dr-nadia-rahman",
    name: "Dr Nadia Rahman",
    specialty: "Dentistry",
    focus: "Restorative & Cosmetic Dentist",
    location: "Birmingham",
    rating: 4.95,
    reviews: 174,
    fee: 95,
    next: "Wednesday, 11:00 am",
    image: "photo-1591604021695-0c69b7c05981",
    initials: "NR",
    color: "#dce9da",
    about: "Dr Rahman provides restorative and cosmetic dental care in a calm, welcoming setting. She takes time to explain each option and helps patients feel comfortable throughout treatment.",
    services: ["Dentists", "Clinics"],
  },
  {
    slug: "dr-oliver-maclean",
    name: "Dr Oliver Maclean",
    specialty: "ENT",
    focus: "Consultant ENT Surgeon",
    location: "Edinburgh",
    rating: 4.97,
    reviews: 131,
    fee: 165,
    next: "Thursday, 10:45 am",
    image: "photo-1622253692010-333f2da6031d",
    initials: "OM",
    color: "#dfe4f1",
    about: "Dr Maclean is a consultant ENT surgeon with expertise in sinus, hearing and voice concerns. He supports patients with practical explanations and shared decisions at every stage.",
    services: ["Clinics", "Hospitals"],
  },
  {
    slug: "dr-morgan-campbell",
    name: "Dr Morgan Campbell",
    specialty: "Cardiology",
    focus: "Consultant Cardiologist",
    location: "Glasgow",
    rating: 4.93,
    reviews: 86,
    fee: 170,
    next: "Wednesday, 2:00 pm",
    image: "photo-1537368910025-700350fe46c7",
    initials: "MC",
    color: "#dce9e1",
    about: "Dr Campbell helps patients understand their cardiovascular health with a practical, compassionate approach and clear explanations at each step.",
    services: ["Clinics", "Hospitals"],
  },
  {
    slug: "dr-priya-patel",
    name: "Dr Priya Patel",
    specialty: "Dermatology",
    focus: "Consultant Dermatologist",
    location: "Leeds",
    rating: 4.94,
    reviews: 109,
    fee: 155,
    next: "Friday, 1:30 pm",
    image: "photo-1582750433449-648ed127bb54",
    initials: "PP",
    color: "#f1dfcf",
    about: "Dr Patel focuses on helping patients manage skin conditions with an individual care plan, clear information and evidence-based treatment.",
    services: ["Clinics", "Hospitals"],
  },
];

export function slugify(value: string) {
  return value.toLowerCase().trim().replaceAll("&", "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}