export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  stack: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  featured: boolean;
  problem: string;
  solution: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "legal-ai-ghana",
    title: "Ghana Legal AI Assistant",
    description:
      "An AI chatbot giving ordinary Ghanaians plain-language access to legal guidance on tenancy, labour, and consumer rights.",
    tags: ["AI", "Social Impact", "Web"],
    stack: ["Next.js", "Anthropic API", "Tailwind CSS"],
    image: "/images/projects/legal-ai.png",
    liveUrl: "https://legal-ai-system-phi.vercel.app/login",
    githubUrl: "",
    featured: true,
    problem:
      "Most Ghanaians cannot afford legal counsel for everyday disputes.",
    solution:
      "Built a Claude-powered assistant trained on Ghanaian legal context, delivering plain-language answers.",
    outcome:
      "Final year project; tested with 20+ university students unfamiliar with legal processes.",
  },
  {
    slug: "nyin-gold-tracking",
    title: "NYIN Gold Tracking Platform",
    description:
      "A gold tracking platform for the mining industry, giving operators and buyers real-time visibility into custody and provenance from source to sale.",
    tags: ["Fintech", "Web"],
    stack: ["React", "Node.js", "MongoDB", "AWS S3"],
    image: "/images/projects/nyin.png",
    liveUrl: "https://www.nyinintl.com/",
    githubUrl: "",
    secondaryUrl: "https://track.nyinintl.com/admin/dashboard",
    secondaryLabel: "Admin Dashboard",
    featured: true,
    problem:
      "Gold supply chains in small-scale mining lack transparent tracking, making provenance and trust hard to verify.",
    solution:
      "Built a tracking platform with an admin dashboard for logging custody transfers and monitoring gold movement.",
    outcome: "Live platform with a public site and admin dashboard in production use.",
  },
  {
    slug: "prinpoll",
    title: "PrinPoll",
    description:
      "A live e-voting and event-ticketing platform with USSD support, making digital participation accessible without smartphones.",
    tags: ["Fintech", "Web", "Mobile"],
    stack: ["React", "Node.js", "MongoDB", "USSD API"],
    image: "/images/projects/prinpoll.png",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    problem:
      "Campus and community organizations lacked a reliable, accessible digital voting tool.",
    solution:
      "Built a full voting + ticketing platform with USSD fallback for feature phone users.",
    outcome: "Successfully deployed for campus events.",
  },
  {
    slug: "ghamsu-website",
    title: "GHAMSU Website",
    description:
      "Full organizational website for the Ghana Methodist Students' Union with CMS, news, and events.",
    tags: ["Web"],
    stack: ["React 18", "TypeScript", "Sanity CMS", "Tailwind CSS", "Vite"],
    image: "/images/projects/ghamsu.png",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    problem:
      "GHAMSU had no centralized digital presence for news, events, and publications.",
    solution:
      "Built a full website with Sanity CMS so non-technical editors can manage content.",
    outcome: "Live organizational website serving thousands of Methodist students.",
  },
  {
    slug: "prohaul",
    title: "ProHaul",
    description:
      "Corporate website for a Ghana-based haulage and logistics company with animated hero and service pages.",
    tags: ["Web"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/prohaul.png",
    liveUrl: "https://www.prohaul-logistics.com/",
    githubUrl: "",
    featured: true,
    problem:
      "A professional haulage company needed a credible web presence to attract B2B clients.",
    solution:
      "Designed and built a polished corporate site with typewriter hero, service showcase, and contact form.",
    outcome: "Delivered as a freelance project.",
  },
  {
    slug: "eventlink-ghana",
    title: "EventLink Ghana",
    description:
      "A marketplace platform connecting clients with photographers, videographers, MCs, caterers, venues, and other event professionals.",
    tags: ["Web", "Social Impact"],
    stack: ["React", "Node.js", "MongoDB"],
    image: "/images/projects/eventlink.png",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    problem:
      "Finding and booking reliable event professionals in Ghana was scattered across word-of-mouth and social media, with no central place to compare and book them.",
    solution:
      "Built a digital marketplace where clients can browse, compare, and book photographers, videographers, MCs, caterers, and venues in one place.",
    outcome: "Functional marketplace platform connecting event professionals with clients across Ghana.",
  },
  {
    slug: "ride-campus-pooling",
    title: "RIDE — Campus Ride-Sharing Platform",
    description:
      "A ride-pooling platform for University of Ghana students to share rides safely and affordably around campus.",
    tags: ["Mobile", "Social Impact", "Web"],
    stack: ["React", "Express.js", "SQLite"],
    image: "/images/projects/ride.png",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    problem:
      "UG Legon students had no dedicated, safe way to coordinate and share rides around and beyond campus.",
    solution:
      "Built an MVP ride-pooling platform with OTP-verified sign-in and an admin dashboard for managing rides and users.",
    outcome: "Working MVP built and tested for the University of Ghana, Legon campus.",
  },
  {
    slug: "smart-water-billing",
    title: "Smart Water Billing System",
    description:
      "A smart utility management system that automates water billing using mobile meter reading and USSD notifications.",
    tags: ["Fintech", "Mobile"],
    stack: ["React", "Node.js", "USSD API"],
    image: "/images/projects/water-billing.png",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    problem:
      "Manual water meter reading and billing is slow, error-prone, and leaves customers without visibility into their usage.",
    solution:
      "Designed a system for mobile meter reading with automatic bill generation and USSD notifications for customers without smartphones.",
    outcome: "Prototype system demonstrating automated billing and USSD-based customer notifications.",
  },
  {
    slug: "flyer-generator",
    title: "AI Flyer Generator",
    description:
      "A web app that generates event flyers using AI, with Supabase Edge Functions and Amazon S3 for image handling.",
    tags: ["AI", "Web"],
    stack: ["React", "Vite", "Supabase", "AWS S3"],
    image: "/images/projects/flyer-gen.png",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    problem: "Creating event flyers is time-consuming for non-designers.",
    solution:
      "Built an AI-powered flyer generator with custom font selection and cloud image storage.",
    outcome:
      "Functional app with JWT/CORS resolved via Supabase proxy-image Edge Function.",
  },
  {
    slug: "pop-aura",
    title: "Pop Aura",
    description:
      "A popcorn brand with full brand identity, website, and campus expansion roadmap targeting major Ghanaian universities.",
    tags: ["Social Impact", "Web"],
    stack: ["HTML", "CSS", "JavaScript"],
    image: "/images/projects/pop-aura.png",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    problem: "Campus snack brands in Ghana lack strong digital identity.",
    solution:
      "Developed full brand strategy, product line naming, and a single-page HTML website for UG Legon launch.",
    outcome:
      "Brand live at UG Legon with expansion planned to KNUST, UCC, Ashesi, and GIMPA.",
  },
];

export function getFeaturedProjects(count = 3) {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);
  return [...featured, ...rest].slice(0, count);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
