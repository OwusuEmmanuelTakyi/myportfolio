// Edit this file to update the CV/resume shown on the About page.
// The downloadable PDF itself lives at /public/cv/ — see the README there.

export const cvDownloadUrl = "/cv/owusu-emmanuel-takyi-cv.pdf";

export const cvContact = {
  website: "owusuemmanueltakyi.com",
  email: "owusuemmanueltakyi@gmail.com",
  phone: "0593636309",
  github: "github.com/OwusuEmmanuelTakyi",
  githubUrl: "https://github.com/OwusuEmmanuelTakyi",
  linkedin: "linkedin.com/in/emmanuel-takyiowusu-464bb7278",
  linkedinUrl: "https://linkedin.com/in/emmanuel-takyiowusu-464bb7278",
};

export const cvSummary =
  "Final-year Computer Science student at the University of Ghana, Legon, with hands-on experience building and shipping full-stack web applications, including an e-voting platform and organizational websites for student and community groups. Combines strong software development skills with a background in graphic design, photography, and media production, plus proven leadership experience directing editorial and communications teams.";

export const cvEducation = {
  school: "University of Ghana, Legon",
  degree: "BSc Computer Science",
  period: "Expected Graduation: Aug 2025",
  courses: [
    "Data Structures & Algorithms",
    "Web Development",
    "Database Systems",
    "Human-Computer Interaction",
    "Software Engineering",
  ],
};

export const cvSkills: { category: string; items: string[] }[] = [
  { category: "Programming Languages", items: ["Python", "Java", "JavaScript"] },
  { category: "Frontend", items: ["HTML", "CSS", "React.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express.js"] },
  { category: "Databases", items: ["MySQL", "PostgreSQL", "Firebase"] },
  { category: "Tools", items: ["Git", "GitHub", "VS Code"] },
  { category: "Design Tools", items: ["Adobe Photoshop", "Illustrator", "Canva"] },
];

export const cvInterests = [
  "Web Development",
  "Software Engineering",
  "UI/UX Design",
  "Tech Innovation",
  "Legal Tech",
  "Artificial Intelligence",
  "IT Law",
  "Consultancy",
];

export type CVExperience = {
  role: string;
  org: string;
  period: string;
  bullets: string[];
};

export const cvExperience: CVExperience[] = [
  {
    role: "Freelance Web & Software Developer",
    org: "Self-Directed Projects",
    period: "2023 – Present",
    bullets: [
      "Designed and deployed over 10 websites and digital platforms for student organizations and businesses, including GHAMSU, NYIN International, and PrinPoll.",
      "Managed projects end-to-end: requirements gathering, design, development, deployment, and ongoing client support.",
    ],
  },
  {
    role: "Team Collaboration & Leadership",
    org: "University Projects",
    period: "",
    bullets: [
      "Collaborated within teams of 4 to 6 students to successfully deliver academic software projects on schedule.",
      "Assisted in leading small project teams to achieve deliverables on time.",
    ],
  },
];

export type CVLeadership = {
  role: string;
  org: string;
  period: string;
  description: string;
};

export const cvLeadership: CVLeadership[] = [
  {
    role: "Founder, PrinPoll",
    org: "",
    period: "",
    description:
      "Built and launched a secure, scalable electronic voting and event-ticketing platform (with USSD voting support) used for awards nights, competitions, and elections.",
  },
  {
    role: "Vice Editor-in-Chief, Publications & Communications Board",
    org: "Ghana Methodist Students' Union (GHAMSU)",
    period: "2025 – Present",
    description:
      "Oversee editorial direction and content output across the union's publications, communications, and media channels, applying graphic design and photography skills to visual content.",
  },
  {
    role: "Information Management Desk Director",
    org: "Ghana Methodist Students' Union (GHAMSU)",
    period: "2024 – 2025",
    description: "Managed information systems and data flow for the union's administrative desk.",
  },
  {
    role: "Team Lead",
    org: "Five-member Agile team, University Project",
    period: "",
    description: "Coordinated tasks, drove collaboration, and ensured 100% on-time project delivery.",
  },
];
