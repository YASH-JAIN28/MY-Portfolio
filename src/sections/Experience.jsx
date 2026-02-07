// Importing React for building UI components
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ================= REAL & HONEST EXPERIENCE ================= */
const experiences = [
  {
    role: "MERN Stack Developer (Academic Projects)",
    company: "Self / College Projects",
    duration: "2024 – Present",
    description:
      "Built full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Focused on REST APIs, authentication, and responsive UI development.",
  },
  {
    role: "AI & ML Learner",
    company: "MCA (AI & ML)",
    duration: "2025 – Present",
    description:
      "Learning core AI and Machine Learning concepts using Python, including data preprocessing, model fundamentals, and real-world problem understanding.",
  },
  {
    role: "Software Development Student",
    company: "IMS Ghaziabad",
    duration: "BCA → MCA",
    description:
      "Strong foundation in programming, problem-solving, and computer science fundamentals. Actively improving skills through hands-on projects and continuous learning.",
  },
];

/* ================= EXPERIENCE ITEM ================= */
function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const isAbove = idx % 2 === 0;
  const cardY = useTransform(
    scrollYProgress,
    [start, end],
    [isAbove ? 30 : -30, 0]
  );
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  /* ===== DESKTOP ===== */
  if (layout === "desktop") {
    return (
      <div className="relative flex-1 flex justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        <motion.div
          className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
          style={{ height: 40, opacity: cardOpacity }}
        />
        <motion.article
          className={`absolute ${
            isAbove ? "bottom-12" : "top-12"
          } bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity: cardOpacity, y: cardY }}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-md text-gray-300">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  /* ===== MOBILE ===== */
  return (
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity: cardOpacity, x: cardX }}
      >
        <h3 className="text-lg font-semibold">{exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300">{exp.description}</p>
      </motion.article>
    </div>
  );
}

/* ================= MAIN EXPERIENCE ================= */
const Experience = () => {
  const sceneRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? 100 * experiences.length * 1.6
    : 100 * experiences.length * 1.2;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = React.useMemo(
    () =>
      Array.from(
        { length: experiences.length },
        (_, i) => (i + 1) / experiences.length
      ),
    []
  );

  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <div className="px-6 pt-8">
            <h2 className="text-4xl sm:text-5xl font-semibold text-center">
              Experience
            </h2>
          </div>

          <div className="flex-1 flex items-center justify-center px-6 pb-10">
            {/* Desktop */}
            <div className="relative w-full max-w-7xl hidden md:block">
              <div className="relative h-[6px] bg-white/15 rounded">
                <motion.div
                  className="absolute left-0 top-0 h-[6px] bg-white rounded"
                  style={{ width: lineWidth }}
                />
              </div>

              <div className="relative flex justify-between">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>

            {/* Mobile */}
            <div className="relative w-full max-w-md md:hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                <motion.div
                  className="absolute top-0 left-0 w-[6px] bg-white rounded"
                  style={{ height: lineHeight }}
                />
              </div>

              <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
