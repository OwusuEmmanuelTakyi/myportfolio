export const typingSnippets = [
  `function debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}`,
  `const useToggle = (initial = false) => {\n  const [value, setValue] = useState(initial);\n  const toggle = () => setValue((v) => !v);\n  return [value, toggle];\n};`,
  `export async function getUser(id) {\n  const res = await fetch(\`/api/users/\${id}\`);\n  if (!res.ok) throw new Error("Not found");\n  return res.json();\n}`,
  `const sum = (arr) => arr.reduce((total, n) => total + n, 0);\nconsole.log(sum([1, 2, 3, 4, 5]));`,
];

export type QuizQuestion = {
  code: string;
  question: string;
  options: string[];
  answerIndex: number;
};

export const quizQuestions: QuizQuestion[] = [
  {
    code: `def greet(name):\n    return f"Hello, {name}!"`,
    question: "What language is this?",
    options: ["Python", "Ruby", "JavaScript", "Go"],
    answerIndex: 0,
  },
  {
    code: `fn main() {\n    println!("Hello, world!");\n}`,
    question: "What language is this?",
    options: ["C++", "Rust", "Swift", "Kotlin"],
    answerIndex: 1,
  },
  {
    code: `const [count, setCount] = useState(0);`,
    question: "What library/framework is this from?",
    options: ["Vue", "Angular", "React", "Svelte"],
    answerIndex: 2,
  },
  {
    code: `SELECT name FROM users WHERE age > 18;`,
    question: "What is this?",
    options: ["GraphQL", "SQL", "MongoDB Query", "NoSQL"],
    answerIndex: 1,
  },
  {
    code: `interface Props {\n  title: string;\n  count?: number;\n}`,
    question: "What language is this?",
    options: ["JavaScript", "Flow", "TypeScript", "PropTypes"],
    answerIndex: 2,
  },
  {
    code: `<template>\n  <div>{{ message }}</div>\n</template>`,
    question: "What framework is this?",
    options: ["React", "Vue", "Angular", "Svelte"],
    answerIndex: 1,
  },
  {
    code: `func add(a int, b int) int {\n    return a + b\n}`,
    question: "What language is this?",
    options: ["Go", "Java", "C#", "Kotlin"],
    answerIndex: 0,
  },
  {
    code: `.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}`,
    question: "What is this?",
    options: ["Sass", "CSS", "Tailwind", "Styled Components"],
    answerIndex: 1,
  },
  {
    code: `app.get('/api/users', (req, res) => {\n  res.json(users);\n});`,
    question: "What framework is this?",
    options: ["Django", "Express.js", "Flask", "FastAPI"],
    answerIndex: 1,
  },
  {
    code: `db.collection('users').find({ age: { $gt: 18 } });`,
    question: "What database is this?",
    options: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
    answerIndex: 2,
  },
];

export const memoryTechs = [
  "React",
  "Node.js",
  "MongoDB",
  "TypeScript",
  "Next.js",
  "Tailwind",
  "AWS",
  "Git",
];
