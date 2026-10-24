import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ClientStrip } from './components/ClientStrip';
import { SelectedProjects } from './components/SelectedProjects';
import { CampaignSnapshots } from './components/CampaignSnapshots';
import { ProjectModal } from './components/ProjectModal';
import { AboutSection } from './components/AboutSection';
import { ProcessSection } from './components/ProcessSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ArticlesSection } from './components/ArticlesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Project } from './types/portfolio';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F6] text-[#151515] flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* Top Navigation */}
      <Header onStartProject={scrollToContact} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section matching reference image */}
        <Hero onSelectProjectClick={scrollToContact} />

        {/* Client / Partner Logos Strip */}
        <ClientStrip />

        {/* Selected Portfolio Projects */}
        <SelectedProjects onSelectProject={(project) => setSelectedProject(project)} />

        {/* Campaign Snapshots / Casual Meta Business Suite Captures */}
        <CampaignSnapshots />

        {/* About & Philosophy */}
        <AboutSection />

        {/* 4-Step Design Methodology */}
        <ProcessSection />

        {/* Professional Experience Timeline */}
        <ExperienceSection />

        {/* Testimonials (Hidden for now as requested) */}
        {/* <TestimonialsSection /> */}

        {/* Notes & Insights / Articles */}
        <ArticlesSection />

        {/* Project Contact Inquiry */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => {
          setSelectedProject(null);
          scrollToContact();
        }}
      />
    </div>
  );
}
