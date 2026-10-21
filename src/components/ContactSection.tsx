import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Phone, Linkedin, Github, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactFormData } from '../types/portfolio';
import { portfolioConfig } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: 'Meta & Google Ads Campaign',
    budget: '$1k – $3k / month',
    message: '',
  });
  const [customService, setCustomService] = useState('');

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (formData.projectType === 'Other / Custom Service' && !customService.trim()) {
      newErrors.projectType = 'Please specify your required service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide brief details about your brand or role';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please share at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real brief dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      projectType: 'Meta & Google Ads Campaign',
      budget: '$1k – $3k / month',
      message: '',
    });
    setCustomService('');
    setErrors({});
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-16 sm:py-24 bg-[#ECEDEF]/40 border-t border-zinc-200/80 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline & Direct Contact Info from CV with scroll transition */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 block mb-2">
              Let's Connect
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-zinc-950 tracking-tight leading-[1.06] mb-5">
              Have a brand to grow?
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed mb-8">
              Whether you need performance marketing, cinematic video production, or are hiring for a global remote growth role, I'm ready to talk.
            </p>

            <div className="space-y-4 pt-6 border-t border-zinc-300/60 mb-8">
              {/* Email */}
              <motion.a
                whileHover={{ x: 4 }}
                href={`mailto:${portfolioConfig.email}`}
                className="flex items-center gap-3 text-zinc-800 hover:text-black transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 group-hover:text-black group-hover:scale-105 transition-all shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block">Direct Email</span>
                  <span className="text-sm font-semibold text-zinc-900 group-hover:underline">
                    {portfolioConfig.email}
                  </span>
                </div>
              </motion.a>

              {/* Phone & WhatsApp */}
              <motion.a
                whileHover={{ x: 4 }}
                href={`https://wa.me/${portfolioConfig.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  'Hi Md. Shahariar Siam, I came across your portfolio and would like to discuss a project.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-800 hover:text-black transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 group-hover:text-black group-hover:scale-105 transition-all shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block">Direct Phone</span>
                  <span className="text-sm font-semibold text-zinc-900 group-hover:underline block">
                    {portfolioConfig.phone}
                  </span>
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-zinc-600 bg-zinc-100 border border-zinc-200/80 px-2 py-0.5 rounded mt-1 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-300 transition-colors">
                    Open WhatsApp
                  </span>
                </div>
              </motion.a>

              {/* Location */}
              <div className="flex items-center gap-3 text-zinc-800">
                <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block">Location</span>
                  <span className="text-sm font-medium text-zinc-800">
                    {portfolioConfig.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href={portfolioConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-medium text-zinc-800 hover:border-zinc-400 hover:text-black transition-colors shadow-2xs"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={portfolioConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-medium text-zinc-800 hover:border-zinc-400 hover:text-black transition-colors shadow-2xs"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
              <a
                href={portfolioConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-medium text-zinc-800 hover:border-zinc-400 hover:text-black transition-colors shadow-2xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                  Current Status
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Open to full-time remote marketing roles, agency partnerships, and high-impact freelance campaigns.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form with scroll transition */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[28px] border border-zinc-200/90 p-6 sm:p-10 shadow-sm">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center flex flex-col items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                      className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-5"
                    >
                      <CheckCircle2 className="w-8 h-8" />
                    </motion.div>
                    <h3 className="font-editorial text-3xl sm:text-4xl text-zinc-950 mb-2">
                      Message Received
                    </h3>
                    <p className="text-zinc-600 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
                      Thank you, {formData.name}. Your inquiry has been received. I will reply directly to {formData.email} within 24 hours.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={resetForm}
                      className="bg-[#18181B] hover:bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-xs"
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-2">
                          Your Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="Kazi Farhan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-[#F7F7F6] border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all ${
                            errors.name ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                          }`}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-2">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="founder@brandyou.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-[#F7F7F6] border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all ${
                            errors.email ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                          }`}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Engagement Type & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="project-type" className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-2">
                          Engagement Type
                        </label>
                        <select
                          id="project-type"
                          value={formData.projectType}
                          onChange={(e) => {
                            setFormData({ ...formData, projectType: e.target.value });
                            if (errors.projectType) {
                              setErrors({ ...errors, projectType: undefined });
                            }
                          }}
                          className="w-full px-4 py-3 rounded-xl bg-[#F7F7F6] border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all cursor-pointer"
                        >
                          <option value="Meta & Google Ads Campaign">Meta & Google Ads Campaign</option>
                          <option value="Social Media & Organic Growth">Social Media & Organic Growth</option>
                          <option value="Full-Time Remote Position">Full-Time Remote Role</option>
                          <option value="Quantrex Tool Integration">Quantrex Tool Consultation</option>
                          <option value="Other / Custom Service">Other / Custom Service</option>
                        </select>

                        {formData.projectType === 'Other / Custom Service' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="overflow-hidden"
                          >
                            <input
                              type="text"
                              placeholder="Write your custom service or requirement..."
                              value={customService}
                              onChange={(e) => {
                                setCustomService(e.target.value);
                                if (errors.projectType) {
                                  setErrors({ ...errors, projectType: undefined });
                                }
                              }}
                              className={`w-full px-4 py-2.5 rounded-xl bg-[#F7F7F6] border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all ${
                                errors.projectType ? 'border-red-400 bg-red-50/20' : 'border-zinc-300'
                              }`}
                              autoFocus
                            />
                            {errors.projectType && (
                              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>{errors.projectType}</span>
                              </p>
                            )}
                          </motion.div>
                        )}
                      </div>

                      <div>
                        <label htmlFor="budget-range" className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-2">
                          Monthly Budget / Compensation
                        </label>
                        <select
                          id="budget-range"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#F7F7F6] border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all cursor-pointer"
                        >
                          <option value="$500 – $1,500 / month">$500 – $1,500 / month</option>
                          <option value="$1,500 – $3,000 / month">$1,500 – $3,000 / month</option>
                          <option value="$3,000+ / month">$3,000+ / month</option>
                          <option value="Fixed Project Fee">Fixed Project Fee</option>
                          <option value="Negotiable / Salary">Negotiable / Salary</option>
                        </select>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-2">
                        Details & Objectives *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Tell me about your brand, current follower/ad goals, timeline, and where you'd like support..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-[#F7F7F6] border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all ${
                          errors.message ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                        }`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Form Submission Button */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs text-zinc-400">
                        * Required fields
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#18181B] hover:bg-black text-white text-sm font-medium px-7 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Inquiry</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
