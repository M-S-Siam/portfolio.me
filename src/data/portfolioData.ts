import {
  Project,
  ClientLogo,
  Experience,
  ProcessStep,
  Capability,
  Testimonial,
  Article,
  EducationItem,
  CertificationItem,
} from '../types/portfolio';

export const portfolioConfig = {
  brandName: 'Md. Shahariar Siam',
  fullName: 'Md. Shahariar Siam',
  title: 'Digital Marketer • Founder & Creator',
  roleSubtitle: 'Digital Marketer • Founder & Creator',
  tagline: 'Performance Marketing • Social Media Growth • Content & Video Production',
  email: 'mdshahariar307@gmail.com',
  phone: '+880 1874-887309',
  location: 'Dhaka, Bangladesh · Open to Global Remote',
  availability: 'Available for Global Remote Roles & Contract Partnerships',
  github: 'https://github.com/M-S-Siam',
  linkedin: 'https://linkedin.com/in/md-shahariar-siam',
  facebook: 'https://www.facebook.com/its.siam95',
  portfolioUrl: 'https://m-s-siam.github.io/Portfolio',
  quantrexUrl: 'https://m-s-siam.github.io/Quantrex/',
  adledgerUrl: 'https://m-s-siam.github.io/Quantrex/',
  bio: 'Digital marketing professional with 2+ years of hands-on experience growing restaurant and lifestyle brands. Grew a brand’s page 15× (400 → 6,000 followers) in 2 months and launched ~20 paid campaigns across Meta & Google Ads. Rare combination of performance marketing and in-house photography & video production.',
};

export const heroStats = [
  { value: '15×', label: 'Follower growth (2 mos)' },
  { value: '20+', label: 'Paid campaigns launched' },
  { value: '2+yr', label: 'Hands-on experience' },
];

export const clientLogos: ClientLogo[] = [
  { id: 'brand-you', name: 'Brand You' },
  { id: 'ritmo', name: 'RITMO' },
  { id: 'roselle', name: 'Roselle' },
  { id: 'midtown', name: 'MidTown' },
  { id: 'meta-ads', name: 'Meta Ads' },
  { id: 'google-ads', name: 'Google Ads' },
  { id: 'quantrex', name: 'Quantrex' },
];

export const projects: Project[] = [
  {
    id: 'roselle-campaign',
    title: 'Roselle — Digital Marketing & Jewelry Brand Campaigns',
    client: 'Roselle',
    category: 'Performance Marketing',
    year: '2025',
    role: 'Digital Strategist & Media Buyer',
    summary:
      'An integrated marketing approach combining paid ads, brand photography, and digital content to showcase jewelry collections and strengthen online presence.',
    image: '/roselle_jewelry_campaign.jpg',
    gallery: [
      '/roselle_jewelry_campaign.jpg',
      '/roselle_jewelry_ring.jpg',
      '/roselle_jewelry_necklace.jpg',
    ],
    challenge:
      'Presenting intricate jewelry craftsmanship across digital channels and creating a cohesive visual aesthetic to expand online audience reach.',
    solution:
      'Coordinated multi-channel paid ad campaigns on Meta and Google paired with creative collection photography and structured social content.',
    impact:
      'Strengthened digital brand presence and established a consistent visual standard across advertising and social media channels.',
    deliverables: [
      'Paid Advertising (Meta & Google)',
      'Jewelry Collection Photography',
      'Digital Content Strategy',
      'Campaign Performance Audits',
    ],
    link: 'https://linkedin.com/in/md-shahariar-siam',
  },
  {
    id: 'brand-you-growth',
    title: 'Brand You — Audience Growth & Social Media Strategy',
    client: 'Brand You',
    category: 'Social Growth',
    year: '2026',
    role: 'Digital Marketing Head & Cinematographer',
    summary:
      'A social media growth project combining content planning, video production, and audience-focused promotion to expand the brand’s digital presence.',
    image: '/brand_you_growth_studio.jpg',
    gallery: [
      '/brand_you_growth_studio.jpg',
      '/brand_you_video_timeline.jpg',
      '/brand_you_campaign_planning.jpg',
    ],
    challenge:
      'Developing an engaging visual presence and growing an active, engaged follower community across competitive social media platforms.',
    solution:
      'Formulated an integrated content schedule combining deliberate video storytelling, editorial post design, and audience-focused campaign promotion.',
    impact:
      'Expanded social community reach and significantly strengthened audience engagement across digital touchpoints.',
    deliverables: [
      'Multi-Platform Content Strategy',
      'Video Production & Direction',
      'Audience-Focused Campaign Promotion',
      'Community Engagement Framework',
    ],
    link: 'https://linkedin.com/in/md-shahariar-siam',
  },
  {
    id: 'ritmo-lifestyle',
    title: 'RITMO — Streetwear Campaigns & Visual Storytelling',
    client: 'RITMO',
    category: 'Cinematography',
    year: '2025 – 2026',
    role: 'Lead Cinematographer & Creative Producer',
    summary:
      'Visual content and creative campaign production focused on streetwear aesthetics, brand identity, and engaging digital storytelling.',
    image: '/ritmo_streetwear_showroom.jpg',
    gallery: [
      '/ritmo_streetwear_showroom.jpg',
      '/ritmo_streetwear_display.jpg',
      '/ritmo_streetwear_rack.jpg',
    ],
    challenge:
      'Building a distinctive visual identity for a contemporary streetwear brand in a design-driven, fast-evolving fashion landscape.',
    solution:
      'Directed dynamic campaign shoots, lookbook cinematography, and short-form video edits highlighting garment silhouette, fabric texture, and urban aesthetics.',
    impact:
      'Created a cohesive, modern visual language that reinforced the brand identity across digital campaigns and lookbook drops.',
    deliverables: [
      'Streetwear Campaign Cinematography',
      'Lookbook & Editorial Photography',
      'Vertical Short-Form Video Production',
      'Creative Direction & Color Grading',
    ],
    link: 'https://linkedin.com/in/md-shahariar-siam',
  },
  {
    id: 'midtown-growth',
    title: 'MidTown Restaurant — Social Strategy & Local SEO',
    client: 'MidTown Restaurant',
    category: 'Social Growth',
    year: '2024 – 2025',
    role: 'Creative Producer & Social Media Lead',
    summary:
      'A social media and local SEO project focused on consistent brand communication, visual content, audience engagement, and local search visibility.',
    image: '/midtown_restaurant_hero.jpg',
    gallery: [
      '/midtown_restaurant_hero.jpg',
      '/assets/aistudio/unnamed_ee5546c1.webp',
      '/assets/aistudio/unnamed__1__d7f35895.webp',
      '/assets/aistudio/unnamed__2__4d390f5b.webp',
    ],
    challenge:
      'Improving online discoverability and modernizing digital profiles to maintain steady engagement from local diners.',
    solution:
      'Conducted regular photography sessions, optimized the Google Business Profile for local queries, and maintained a consistent social media publishing calendar.',
    impact:
      'Enhanced local search presence on Google Maps and created a polished, welcoming visual standard across social profiles.',
    deliverables: [
      'Local SEO & Google Business Profile',
      'Photography & Short-Form Video',
      'Social Media Strategy & Planning',
      'Community Engagement Guidelines',
    ],
    link: 'https://linkedin.com/in/md-shahariar-siam',
  },
  {
    id: 'quantrex',
    title: 'Quantrex — Agency Finance & Client-Ledger Web App',
    client: 'Agency SaaS Tool',
    category: 'Web Apps & Tools',
    year: '2026',
    role: 'Product Concept, UI Design & Full-Stack Development',
    summary:
      'A custom web app built for marketing agencies to track client ledgers, manage ad spend across currencies, and maintain clean financial records.',
    image: '/quantrex_dashboard.png',
    gallery: [
      '/quantrex_dashboard.png',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge:
      'Digital marketing agencies often encounter administrative complexity tracking ad spending across multiple currencies and diverse client payment methods.',
    solution:
      'Developed a tailored ledger dashboard using React, Vite, Tailwind CSS, Supabase, PostgreSQL, and Recharts to centralize client accounts, currency calculations, and financial histories.',
    impact:
      'Streamlined internal financial tracking, provided structured records for client advertising budgets, and simplified reporting.',
    deliverables: [
      'Live Web Application (Quantrex)',
      'Multi-Currency Ad Spend Tracker',
      'Client Deposit & Balance Ledger',
      'Interactive Financial Dashboard',
      'Statement Export Tools',
    ],
    link: 'https://m-s-siam.github.io/Quantrex/',
  },
  {
    id: 'creative-production-suite',
    title: 'Brand Films — Cinematography & Visual Production',
    client: 'Multiple Client Brands',
    category: 'Cinematography',
    year: '2024 – 2026',
    role: 'Director of Photography & Post-Production Editor',
    summary:
      'From creative concept to camera operation, lighting, and color grading, each production is crafted with a focus on visual storytelling.',
    image: '/cinematography_gimbal_shot2.jpg',
    gallery: [
      '/cinematography_gimbal_shot2.jpg',
      '/cinematography_gimbal_shot1.jpg',
      '/cinematography_gimbal_shot3.jpg',
    ],
    challenge:
      'Translating brand narratives into high-quality visual content that maintains viewer interest across mobile feeds and widescreen presentations.',
    solution:
      'Provided complete creative execution encompassing storyboarding, dynamic camera movement, directional lighting, audio recording, and color grading.',
    impact:
      'Delivered polished, multi-format visual assets suitable for digital campaigns, websites, and organic social media channels.',
    deliverables: [
      'Storyboarding & Creative Planning',
      'Camera Operation & Cinematography',
      'Lighting Design & Audio Capture',
      'Color Grading & Final Delivery',
    ],
    link: 'https://m-s-siam.github.io/Portfolio',
  },
];

export const capabilities: Capability[] = [
  {
    title: 'Meta Ads & Facebook Ads Manager',
    description: 'Precision audience targeting, lookalikes, custom conversion events, and budget optimization for maximum ROAS.',
    items: ['Meta Business Suite & Pixel Setup', 'Lookalike & Retargeting Funnels', 'A/B Creative & Hook Testing', 'Budget Scaling & ROAS Audits'],
  },
  {
    title: 'Google Ads & PPC Campaigns',
    description: 'High-intent search, performance max, and display campaigns capturing active buyers and local foot traffic.',
    items: ['Search Engine Advertising (SEA)', 'Negative Keyword Sculpting', 'Local Search & Google Business Profile', 'Conversion Rate Tracking'],
  },
  {
    title: 'Social Media Marketing & Growth',
    description: 'Content-driven organic strategies that accelerated Brand You by 15× (400 to 6,000 followers) within 60 days.',
    items: ['Instagram, Facebook & TikTok Strategy', 'Organic Algorithm Growth', 'Community Engagement & Care', 'Influencer & UGC Coordination'],
  },
  {
    title: 'Photography & Video Cinematography',
    description: 'End-to-end in-house production: concept, camera operation, directional studio lighting, and high-retention video editing.',
    items: ['4K Video & Cinematic B-Roll', 'Vertical Short-Form (Reels / TikTok)', 'Commercial Food & Lifestyle Photography', 'Color Grading & Sound Design'],
  },
  {
    title: 'Content Strategy & Planning',
    description: 'Cohesive editorial calendars across platforms with hooks that stop scrolling and guide users to conversion.',
    items: ['Multi-Platform Content Calendars', 'Copywriting & Call-to-Action Design', 'Competitor Gap & Trend Analysis', 'Brand Voice & Visual Harmony'],
  },
  {
    title: 'Marketing Web Apps & Data Tools',
    description: 'Building custom software tools like Quantrex to solve agency financial tracking and data transparency.',
    items: ['Quantrex SaaS Architecture', 'React, Vite, Supabase & Tailwind', 'BDT/USD Ad-Spend Tracking', 'Recharts Performance Dashboards'],
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Audit & Discover',
    subtitle: 'Audience & Data Analysis',
    description: 'We deconstruct your current social metrics, previous ad performance, customer acquisition costs, and competitive positioning.',
    deliverables: ['Account & Pixel Health Audit', 'Competitor Gap Analysis', 'Target Persona Mapping', 'Growth Roadmap & Goals'],
  },
  {
    number: '02',
    title: 'Produce & Storyboard',
    subtitle: 'In-House Creative Capture',
    description: 'I direct, shoot, and produce high-resolution photography and cinematic video assets specifically framed for mobile social feeds.',
    deliverables: ['Custom Photo & Video Shoots', 'Hook-Driven Ad Creatives', 'Vertical Reels & Short-Form Edits', 'Graphic Assets & Copywriting'],
  },
  {
    number: '03',
    title: 'Launch & Optimize',
    subtitle: 'Precision Paid Campaigns',
    description: 'We launch structured Meta and Google Ads campaigns, running rigorous A/B creative splits and dialling in target audiences.',
    deliverables: ['Campaign Structure Setup', 'Lookalike & Custom Audiences', 'Daily Budget & Bid Management', 'Real-Time Metric Monitoring'],
  },
  {
    number: '04',
    title: 'Analyze & Scale',
    subtitle: 'ROAS & Community Retention',
    description: 'We review conversion rates, calculate exact net ad spend with agency tools like Quantrex, and reinvest into top-performing creative.',
    deliverables: ['Comprehensive Performance Reports', 'BDT/USD Ad Spend Statements', 'Organic Retargeting Loops', 'Next-Phase Scaling Plan'],
  },
];

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    organization: 'Brand You',
    position: 'Digital Marketing Head & Cinematographer',
    period: 'MAY 2026 — SEP 2026',
    responsibilities: [
      'Promoted from freelance creative producer to Head of Digital Marketing after early campaign work delivered exceptional growth.',
      'Grew the brand’s page from 400 to 6,000 followers (~15×) in 2 months through content-led organic and paid strategy.',
      'Planned and launched ~20 paid campaigns across Meta & Google Ads — budget planning, optimization, analytics, and lead generation.',
      'Managed content strategy across 3 platforms: Facebook, Instagram, and TikTok.',
      'Produced all photography and cinematography in-house, covering the entire marketing-to-creative lifecycle.',
    ],
    achievement: 'Grew audience from 400 to 6,000 followers in 60 days; top-performing video reached 20,000+ views.',
  },
  {
    id: 'exp-2',
    organization: 'Freelance & Self-Employed',
    position: 'Freelance Digital Marketer & Creative Producer',
    period: '2024 — MAY 2026',
    responsibilities: [
      'Managed the online presence of 3+ restaurant & lifestyle brands (including RITMO, Roselle, and MidTown Restaurant) for 2+ years.',
      'Executed social media management, paid advertising, and community growth end to end.',
      'Planned and shot 10+ professional photo & video shoots, delivering content strategy and creative production in-house.',
    ],
    achievement: 'Delivered consistent double-digit revenue growth and heightened brand equity across all client partners.',
  },
  {
    id: 'exp-3',
    organization: 'Quantrex (Flagship Product)',
    position: 'Product Designer & Full-Stack Creator',
    period: '2025 — 2026',
    responsibilities: [
      'Conceived, designed, and developed an agency finance tool to track dual-currency (BDT/USD) ad spend, VAT, and client ledger balances.',
      'Built with React.js, Vite, Tailwind CSS, Supabase, PostgreSQL, and Recharts, shipped with statement export and net-profit charts.',
    ],
    achievement: 'Live production tool deployed at m-s-siam.github.io/Quantrex/.',
  },
];

export const educationList: EducationItem[] = [
  {
    degree: 'H.S.C (Science)',
    institution: 'Tongi Government College',
    year: '2026',
    score: 'Science Division',
  },
  {
    degree: 'S.S.C (Science)',
    institution: 'Safiuddin Sarker Academy & College',
    year: '2023',
    score: 'Science Division',
  },
];

export const certificationsList: CertificationItem[] = [
  {
    title: 'Digital Marketing Specialist',
    issuer: 'SR Dream IT',
    year: 'Certified',
  },
  {
    title: 'Diploma in Office & Graphics Design',
    issuer: 'World Information Technology Foundation',
    year: 'Diploma',
  },
  {
    title: 'Digital Security Essentials',
    issuer: 'National Cyber Security Agency (NCSA), Muktopaath',
    year: 'Certified',
  },
];

export const languages = [
  { name: 'Bangla', proficiency: 'Native' },
  { name: 'English', proficiency: 'Professional Working Proficiency' },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Siam brought a rare duality to Brand You: he could shoot high-end 4K video in the morning and optimize our Meta ad sets in the afternoon. Scaling from 400 to 6,000 followers in 2 months proved his ownership mindset.',
    author: 'Kazi Farhan',
    role: 'Co-Founder & Director',
    company: 'Brand You',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'test-2',
    quote: 'Our dinner bookings and weekend foot traffic increased significantly during our campaign run. Siam’s cinematic reels captured the soul of RITMO and turned social views into paying guests.',
    author: 'Tahmid Rahman',
    role: 'Managing Partner',
    company: 'RITMO Restaurant & Lounge',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'test-3',
    quote: 'Having one person handle the entire marketing-to-creative lifecycle saved us hundreds of hours and thousands in agency fees. His Quantrex system also brought complete clarity to our ad budgets.',
    author: 'Nabila Karim',
    role: 'Marketing Lead',
    company: 'Roselle Gourmet',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  },
];

export const articles: Article[] = [
  {
    id: 'art-1',
    title: 'The 15× Growth Playbook: How We Scaled Brand You from 400 to 6,000 Followers in 60 Days',
    category: 'Growth & Distribution',
    date: 'Sep 2026',
    readTime: '5 min read',
    excerpt: "How we brought content and paid promotion together to grow Brand You's audience through in-house video production and targeted campaigns.",
    image: '/brand_you_growth_proof.svg',
    content: [
      'Growing a social page takes more than posting regularly or putting money behind every post. The real challenge is creating content people want to watch, then finding ways to bring it to a wider audience.',
      'For Brand You, I focused on bringing content production and campaign execution closer together. We created short-form videos in-house, paying attention to the opening, visual presentation, and pacing to give viewers a reason to stop scrolling.',
      "Content creation was only one part of the process. Paid campaigns helped extend the content's reach and supported the page's growth. Over two months, the page grew from 400 to 6,000 followers, while the top-performing video reached more than 20,000 views.",
    ],
    takeaway:
      'This project reinforced how I approach digital marketing: creative work and paid distribution should support the same goal. Content needs to earn attention, while advertising helps bring that content to a wider audience.',
  },
  {
    id: 'art-2',
    title: 'Beyond the Frame: Where Cinematography Meets Marketing',
    category: 'Creative Production',
    date: 'Jul 2026',
    readTime: '4 min read',
    excerpt: 'Every shot has a purpose. I approach video production with an understanding of visual storytelling, audience attention, and the role each piece of content plays in a wider marketing campaign.',
    image: '/cinematography_beyond_the_frame.svg',
    content: [
      "A visually striking video is only part of the job. The real challenge is creating something that communicates the right message, holds attention, and serves a clear purpose. That's where I bring cinematography and marketing together.",
      "From planning the shots and lighting to shaping the edit, I consider how each creative decision affects the final story. I want the visuals to do more than look good—they should support the message, fit the brand, and make sense for the audience they're intended to reach.",
    ],
    takeaway:
      'For me, cinematography and marketing are not separate disciplines. Understanding both helps me approach production with a clearer purpose—from the first creative idea to the final cut.',
  },
  {
    id: 'art-3',
    title: 'Managing Cross-Currency Ad Spend: Why I Built Quantrex for Digital Agencies',
    category: 'Product & Tools',
    date: 'May 2026',
    readTime: '6 min read',
    excerpt: 'How tracking BDT deposits against USD Meta ad billing solved the silent cash-drain problem for marketing agencies.',
    image: '/quantrex_dashboard.png',
    content: [
      'In emerging digital markets, agency accounting is complicated: clients pay in local currency (BDT) via mobile banking or bank wire, while Meta and Google deduct ad spend in USD on corporate credit cards.',
      'Fluctuating bank exchange rates, card endorsement charges, VAT, and bank cash-out fees frequently eat into agency margins without anyone noticing.',
      'I built Quantrex (using React, Vite, Supabase, and PostgreSQL) to give agencies real-time visibility over multi-currency card balances, automated client ledgers, and exportable financial statements.',
    ],
    takeaway:
      'Building Quantrex reinforced a simple idea: the best tools come from understanding real problems firsthand. By bringing ad spend, currency conversion, and client accounting into one place, I wanted to make the financial side of agency work easier to understand and manage.',
  },
];
