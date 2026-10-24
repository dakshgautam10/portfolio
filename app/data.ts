export const profile = {
  name: "Daksh Gautam",
  first: "Daksh",
  role: "Full-Stack Developer",
  location: "Jaipur, India",
  email: "daksh.g1012@gmail.com",
  github: "https://github.com/daksh-gautam",
  resume: "/daksh-gautam-resume.pdf",
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  status: string;
  tags: string[];
  points: string[];
  url?: string;
  host?: string;
  theme: "sand" | "ink" | "accent";
  mock: "chat" | "steps" | "chart";
};

export const projects: Project[] = [
  {
    slug: "asska",
    title: "Asska AI",
    kind: "Educational AI Chatbot",
    status: "Deployed",
    tags: ["MERN", "AI APIs", "Chatbot"],
    points: [
      "Distraction-free chatbot for topic-focused learning, built on the MERN stack.",
      "Topic-restricted conversations keep every answer academic.",
      "Instant explanations, concept clarification and study help via AI APIs.",
    ],
    url: "https://asska-ai-x9ca.vercel.app/",
    host: "asska-ai-x9ca.vercel.app",
    theme: "sand",
    mock: "chat",
  },
  {
    slug: "pragati",
    title: "Pragati AI",
    kind: "AI-Powered Student Assistance",
    status: "Top 5 · Smart India Hackathon",
    tags: ["MERN", "REST APIs", "AI Integration"],
    points: [
      "Full-stack platform guiding students through PM Internship Scheme enrollment.",
      "REST API workflows with AI that gives contextual help at each step.",
      "Selected among the Top 5 teams in the college-level SIH evaluation.",
    ],
    url: "https://www.pragatiai.co.in",
    host: "pragatiai.co.in",
    theme: "ink",
    mock: "steps",
  },
  {
    slug: "wdigai",
    title: "wDigAI",
    kind: "Personal Finance Manager",
    status: "In progress",
    tags: ["MERN", "CRUD", "Database", "AI Insights"],
    points: [
      "Expense tracking, spending limits and financial record management.",
      "CRUD workflows over structured expense data.",
      "AI-generated insights from spending behaviour for personalised analysis.",
    ],
    theme: "accent",
    mock: "chart",
  },
];

export const highlights = [
  { big: "Top 5", label: "Smart India Hackathon", note: "College-level evaluation", w: "w-[300px] sm:w-[360px]", h: "h-[400px] sm:h-[460px]" },
  { big: "3", label: "Full-stack builds", note: "MERN + AI, two live", w: "w-[300px] sm:w-[480px]", h: "h-[300px] sm:h-[340px]" },
  { big: "7.5", label: "CGPA · B.Tech CSE", note: "JECRC University, 2023–27", w: "w-[300px] sm:w-[340px]", h: "h-[400px] sm:h-[480px]" },
  { big: "4", label: "Certifications", note: "Google Cloud · NPTEL", w: "w-[300px] sm:w-[440px]", h: "h-[300px] sm:h-[320px]" },
];

export const stack = [
  "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs",
  "Python", "C++", "Java", "C", "MySQL", "OpenAI APIs", "Git", "HTML & CSS",
];

export const fundamentals = [
  "Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems",
  "Computer Networks", "LLM Apps", "MongoDB Atlas", "GitHub", "VS Code",
];

export const journey = [
  { when: "2023 — Now", title: "B.Tech, Computer Science", where: "JECRC University · CGPA 7.5", current: true },
  { when: "Experience", title: "Volunteer & Team Ops", where: "My Body Affaire" },
  { when: "Achievement", title: "Top 5 — Smart India Hackathon", where: "College-level evaluation" },
  { when: "2023", title: "Senior Secondary", where: "D.A.V. K.T.P. School, CBSE" },
  { when: "2021", title: "Secondary", where: "D.A.V. K.T.P. School, CBSE" },
];

export const certifications = [
  "Google Cloud Computing Foundations",
  "Google Cloud Career Readiness Program",
  "NPTEL — English Language for Competitive Exams",
  "NPTEL — Soft Skills",
];
