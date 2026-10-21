export type ProjectCategory =
  | 'All'
  | 'Performance Marketing'
  | 'Social Growth'
  | 'Cinematography'
  | 'Web Apps & Tools';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'Performance Marketing' | 'Social Growth' | 'Cinematography' | 'Web Apps & Tools';
  year: string;
  role: string;
  summary: string;
  image: string;
  gallery: string[];
  challenge: string;
  solution: string;
  impact: string;
  deliverables: string[];
  link?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
}

export interface Experience {
  id: string;
  organization: string;
  position: string;
  period: string;
  responsibilities: string[];
  achievement?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface Capability {
  title: string;
  description: string;
  items: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  takeaway?: string;
  image: string;
  gallery?: string[];
  galleryCaptions?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  score?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}
