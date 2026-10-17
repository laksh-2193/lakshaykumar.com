// Single source of truth for profile content. Everything here is rendered
// into static HTML at build time — nothing is hydrated client-side.

export const site = {
  url: 'https://lakshaykumar.com',
  name: 'Lakshay Kumar',
  handle: '@alphic',
  role: 'Generative AI Engineer',
  location: 'Bangalore, India',
  timezone: 'UTC+5:30',
  email: 'connect@lakshaykumar.com',
  linkedin: 'https://www.linkedin.com/in/lakshaykumar-tech/',
  github: 'https://github.com/laksh-2193',
  description:
    'Lakshay Kumar, generative AI engineer in Bangalore. Building AI products and agents, plus public experiments on how language models like Claude and GPT behave.',
  // Web3Forms public access key (safe to expose; it only allows submissions).
  formKey: '4271950e-c989-4736-968c-83da470a868b',
  // Cloudflare Web Analytics token. Paste it here to enable the beacon.
  cfAnalyticsToken: '',
  // Last meaningful change to the non-article pages; feeds sitemap lastmod.
  updated: '2026-10-17',
};

export const projects = [
  {
    name: 'DocIQ',
    url: 'https://www.dociq.space/',
    status: 'Shipping',
    summary:
      'Turns static PDFs into interactive, chat-ready documents. Built for teams who read more than they write.',
    stack: 'RAG, document parsing, LLM chat',
  },
  {
    name: 'Hyd/Rent',
    url: 'https://hyd-rent.vercel.app/',
    status: 'Live',
    summary:
      "One place for Hyderabad rentals — homes, roommates, deposits, and listings that don't waste your evening.",
    stack: 'Full-stack web, listings aggregation',
  },
  {
    name: 'Liri',
    url: '/writing/liri-memory-companion/',
    status: 'Private beta',
    summary:
      'A memory companion inside Telegram. Voice notes, reminders, and "where did I put that" — it listens and brings things back when you need them.',
    stack: 'Agentic AI, voice + text memory',
  },
];

export const experience = [
  { role: 'Generative AI Engineer', org: 'Fintech startup', period: '2025 — now', note: 'AI infrastructure and product features, full-time.' },
  { role: 'Data Scientist', org: 'GAIT Global', period: '2024 — 2025', note: 'Internship.' },
  { role: 'Technical Project Lead', org: 'Atria Foundation', period: '2023 — 2024', note: '' },
  { role: 'Data Science Intern', org: 'HealthArk Insights', period: '2023 — 2024', note: '' },
  { role: 'Research Assistant', org: 'Atria University', period: '2021 — 2022', note: '' },
  { role: 'Web & App Developer', org: 'Hex Business Innovations', period: '2021', note: '' },
];

export const lessons = [
  { name: 'Techuro', lesson: "Strong vision isn't enough. Without early product-market fit and clear distribution, momentum dies in the demo." },
  { name: 'Eve-Link', lesson: 'Changing live networking behaviour is brutally hard. Tech can assist the moment, not replace it.' },
  { name: 'NFC Smart Cards', lesson: 'Cool hardware means nothing without a must-have use case — and it is easy to copy.' },
  { name: 'Linky', lesson: 'Job-application automation for early-career engineers. Speed without signal hurts more than it helps.' },
];

export const toolkit = [
  { group: 'Models', items: ['Claude', 'GPT', 'Gemini / Gemma', 'DeepSeek', 'Llama', 'Mistral'] },
  { group: 'Orchestration', items: ['LangChain', 'LlamaIndex', 'Tool use / function calling', 'MCP', 'RAG pipelines'] },
  { group: 'Application', items: ['Python', 'FastAPI', 'TypeScript', 'React', 'Next.js', 'PostgreSQL'] },
  { group: 'Data & infra', items: ['Pinecone', 'Weaviate', 'PyTorch', 'AWS', 'Vercel', 'Cloudflare'] },
];

export const topics = [
  { value: 'Idea feedback', label: 'Feedback on an AI idea' },
  { value: 'Architecture', label: 'LLM architecture / model choice' },
  { value: 'Experiment', label: 'One of your experiments' },
  { value: 'Workshop', label: 'A workshop for my org' },
  { value: 'Just saying hi', label: 'Just saying hi' },
];

export const stages = ['Exploring an idea', 'Building a prototype', 'Live with users', 'Scaling'];

export const faqs = [
  {
    q: 'What does Lakshay Kumar work on?',
    a: 'Generative AI products end to end — LLM integrations, agentic workflows, RAG pipelines, and the full-stack surface around them. By day he is a Generative AI engineer at a fintech startup; on the side he builds DocIQ, Hyd/Rent and Liri, and publishes experiments comparing how models like Claude, GPT, Gemini and DeepSeek behave on the same task.',
  },
  {
    q: 'Can I talk to you about what I am building?',
    a: 'Yes. Founders and engineers building with AI reach out about early ideas, model choice, prompt evaluation, and the messy middle of going from zero to one. There is no pitch and nothing to buy — just a conversation. Use the form and include what stage you are at.',
  },
  {
    q: 'Do you run workshops?',
    a: 'Yes — six hands-on AI agent sessions, from a first agent to multi-agent systems, memory and RAG, MCP tool servers, and modular skills. Colleges, communities and teams invite me to run them. See the workshops page for the curriculum.',
  },
  {
    q: 'Which models and stacks do you use?',
    a: 'Claude, GPT, Gemini, DeepSeek and open models like Llama and Mistral, orchestrated with LangChain, LlamaIndex, tool calling and MCP. Applications are usually Python and FastAPI on the back end and TypeScript, React or Next.js on the front, with PostgreSQL and a vector database such as Pinecone or Weaviate.',
  },
  {
    q: 'Where are you based?',
    a: 'Bangalore, India (UTC+5:30). Happy to talk async — email, a Loom, or a voice note — or overlap a few hours for a call.',
  },
  {
    q: 'How fast do you reply?',
    a: 'Within a couple of days, usually sooner. Messages that say what you are building and where you are stuck get the most useful replies.',
  },
];
