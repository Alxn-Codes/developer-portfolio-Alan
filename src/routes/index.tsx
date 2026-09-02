import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  Linkedin,
  ArrowDown,
  Database,
  Server,
  Code2,
  Boxes,
  GraduationCap,
  Award,
  Languages,
} from "lucide-react";

const HeroScene = lazy(() =>
  import("@/components/HeroScene").then((m) => ({ default: m.HeroScene })),
);

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Alan K Santhosh — MERN Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Alan K Santhosh, MERN full stack developer building responsive React front-ends and Node/Express APIs with MongoDB.",
      },
      { property: "og:title", content: "Alan K Santhosh — MERN Full Stack Developer" },
      {
        property: "og:description",
        content:
          "React, Node.js, Express and MongoDB projects, experience and certifications by Alan K Santhosh.",
      },
    ],
  }),
  component: Portfolio,
});

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: 0.09 } } }}
      className="mx-auto w-full max-w-5xl px-5 py-20 sm:py-28"
    >
      <motion.p
        variants={fadeUp}
        className="font-display text-xs uppercase tracking-[0.35em] text-primary"
      >
        {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-bold sm:text-4xl">
        {title}
      </motion.h2>
      <div className="mt-10 space-y-5">{children}</div>
    </motion.section>
  );
}

const skills = [
  { icon: Code2, label: "React", note: "Responsive component UIs" },
  { icon: Server, label: "Node.js & Express", note: "REST APIs, CRUD, auth" },
  { icon: Database, label: "MongoDB", note: "Schema & query design" },
  { icon: Boxes, label: "HTML, CSS, Bootstrap", note: "Cross-device layouts" },
  { icon: Code2, label: "JavaScript", note: "ES6+, async patterns" },
  { icon: Code2, label: "C++", note: "Problem solving foundation" },
];

const experience = [
  "Built a full-stack MERN application enabling users to create, view, update and delete data through RESTful APIs.",
  "Designed responsive React UI components, improving user experience and cross-device compatibility.",
  "Developed and integrated Express.js REST APIs handling CRUD operations and efficient data flow.",
  "Structured MongoDB databases, optimizing schema design and query performance for scale.",
  "Implemented JWT/session-based authentication and authorization for secure access control.",
  "Debugged frontend and backend issues, reducing application errors and improving performance.",
];

const projects = [
  {
    name: "Recipe Sharing Platform",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    body: "Full-stack MERN app where users register, create, share and manage recipes through a responsive, user-friendly interface.",
  },
  {
    name: "Personal Bookmarking Website",
    stack: ["Python", "Django", "MySQL", "Bootstrap"],
    body: "Web application to store and manage personal bookmarks with secure authentication and efficient data handling.",
  },
];

const certifications = [
  "Artificial Intelligence with Python",
  "Web Development Internship — Nestsoft Technologies",
  "KrupaDecon 2024 International Conference — Future of Work, Automation & Workforce Reskilling",
];

function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] hero-glow" />

      <header className="relative flex min-h-screen flex-col justify-center">
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-background via-background/75 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-5xl px-5"
        >
          <p className="font-display text-xs uppercase tracking-[0.4em] text-primary">
            MERN Full Stack Developer
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] sm:text-7xl">
            Alan K
            <br />
            Santhosh
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            I build responsive, user-friendly web applications end to end — React interfaces,
            Express APIs and MongoDB data models — and I pick up new technologies fast.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:alanksanthosh9@gmail.com"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <Mail className="h-4 w-4" /> alanksanthosh9@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/alan-k-santhosh"
              target="_blank"
              rel="noreferrer"
              className="glass-panel inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="tel:+917736956080"
              className="glass-panel inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" /> +91 77369 56080
            </a>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="relative mx-auto mt-16 text-muted-foreground"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </header>

      <Section id="skills" eyebrow="Toolkit" title="Skills I build with">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              whileHover={{ y: -6, rotateX: 6, rotateY: -6 }}
              style={{ transformPerspective: 800 }}
              className="glass-panel rounded-xl p-5"
            >
              <s.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{s.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
            </motion.div>
          ))}
        </div>
        <motion.p variants={fadeUp} className="pt-2 text-sm text-muted-foreground">
          Teamwork · Critical thinking · Time management · Problem-solving
        </motion.p>
      </Section>

      <Section id="experience" eyebrow="2025 · Mashupstack" title="MERN Full Stack Trainee">
        <div className="relative border-l border-border pl-6">
          {experience.map((item) => (
            <motion.div key={item} variants={fadeUp} className="relative pb-6 last:pb-0">
              <span className="absolute -left-[1.72rem] top-2 h-2.5 w-2.5 rounded-full bg-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="projects" eyebrow="Selected work" title="Projects">
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <motion.article
              key={p.name}
              variants={fadeUp}
              whileHover={{ y: -8, rotateY: 5 }}
              style={{ transformPerspective: 1000 }}
              className="glass-panel rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-3 py-1 text-xs text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="background" eyebrow="Background" title="Education & credentials">
        <div className="grid gap-5 md:grid-cols-2">
          <motion.div variants={fadeUp} className="glass-panel rounded-2xl p-6">
            <GraduationCap className="h-5 w-5 text-accent" />
            <h3 className="mt-4 text-lg font-semibold">Bachelor of Computer Application</h3>
            <p className="text-sm text-muted-foreground">Krupanidhi Degree College · 2025</p>
            <h3 className="mt-6 text-lg font-semibold">Senior Secondary</h3>
            <p className="text-sm text-muted-foreground">BCHSS Mukkattukara · 2022</p>
          </motion.div>

          <motion.div variants={fadeUp} className="glass-panel rounded-2xl p-6">
            <Award className="h-5 w-5 text-accent" />
            <h3 className="mt-4 text-lg font-semibold">Certifications</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {certifications.map((c) => (
                <li key={c}>— {c}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="glass-panel rounded-2xl p-6 md:col-span-2">
            <Languages className="h-5 w-5 text-accent" />
            <p className="mt-4 text-sm text-muted-foreground">
              English — professional working proficiency · Malayalam — native · Hindi — basic
            </p>
          </motion.div>
        </div>
      </Section>

      <footer className="border-t border-border px-5 py-10 text-center text-sm text-muted-foreground">
        <p>Let's build something — alanksanthosh9@gmail.com</p>
        <p className="mt-2">© {new Date().getFullYear()} Alan K Santhosh</p>
      </footer>
    </main>
  );
}
