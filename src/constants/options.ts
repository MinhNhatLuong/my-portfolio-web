/**
 * Project Categories
 * Used for filtering projects in the portfolio section.
 */
export const PROJECT_CATEGORIES = [
  "All",
  "Web App",
  "Mobile",
  "AI/Bot",
  "Website",
  "Tools" 
];

/**
 * Tech Stack Definitions
 * Detailed list of technologies used, mapping titles to display values.
 */
export const TECH_STACK_DETAILS = [
  { title: "HTML/CSS", value: "HTML/CSS" },
  { title: "Java", value: "Java" },
  { title: "Javascript", value: "Javascript" },
  { title: "Python", value: "Python" },
  { title: "TypeScript", value: "TypeScript" },
  { title: "Next.js", value: "Next.js" },
  { title: "Spring Boot", value: "Spring Boot" },
  { title: "React", value: "React" },
  { title: "Tailwind CSS", value: "Tailwind CSS" },
  { title: "MySQL", value: "MySQL" },
  { title: "PostgreSQL", value: "PostgreSQL" },
  { title: "SQL Server", value: "SQL Server" },
  { title: "Supabase", value: "Supabase" },
  { title: "Cloudinary", value: "Cloudinary" },
  { title: "Node.js", value: "Node.js" },
  { title: "Firebase", value: "Firebase" },
  { title: "OpenAI", value: "OpenAI" },
  { title: "Socket.io", value: "Socket.io" },
  { title: "Redis", value: "Redis" }
];

/**
 * Simplified Tech Options
 * Extracted titles for use in Sanity Studio dropdowns or simple filters.
 */
export const TECH_OPTIONS = TECH_STACK_DETAILS.map(t => t.title);