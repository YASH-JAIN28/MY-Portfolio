import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const achievements = [
  {
    title: "Project Expo 2026",
    event: "Chandigarh University | Offline",
    period: "1st Place Winner",
    description:
      "Secured 1st place by presenting and demonstrating an innovative technology-based solution. Developed and showcased the project in a competitive hackathon/expo environment.",
    tag: "Winner",
  },
  {
    title: "Devfolio JavaScript Hackathon 2025",
    event: "Devfolio | Online",
    period: "1st Place Winner",
    description:
      "Won 1st place in a JavaScript-focused hackathon hosted on Devfolio by applying development and problem-solving skills to build and present the solution.",
    tag: "Winner",
  },
  {
    title: "HackOcto Hackathon 2025",
    event: "Google Developer Groups × Chandigarh University",
    period: "Participant",
    description:
      "Participated in a collaborative hackathon environment focused on building technology-driven solutions and presenting a complete project concept.",
    tag: "Participant",
  },
  {
    title: "RealityX AR/VR Hackathon 2026",
    event: "Chandigarh University",
    period: "Participant",
    description:
      "Built a VR Coding Escape Room where players solve programming puzzles to escape, combining immersive VR gameplay with coding challenges.",
    tag: "Participant",
  },
  {
    title: "Overall Achievement",
    event: "10+ Hackathons Participated",
    period: "Milestone",
    description:
      "Actively participated in 10+ hackathons, gaining experience across web development, AR/VR, and open-source domains.",
    tag: "Impact",
  },
];

function AchievementItem({ item, idx, start, end, scrollYProgress, layout }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const isAbove = idx % 2 === 0;
  const cardY = useTransform(
    scrollYProgress,
    [start, end],
    [isAbove ? 30 : -30, 0],
  );
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (layout === "desktop") {
    return (
      <div className="relative flex-1 flex justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 shadow-[0_0_0_8px_rgba(96,165,250,0.15)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        <motion.div
          className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
          style={{ height: 40, opacity: cardOpacity }}
        />
        <motion.article
          className={`absolute ${
            isAbove ? "bottom-12" : "top-12"
          } bg-white/5 backdrop-blur border border-cyan-400/30 rounded-xl p-7 w-[320px] shadow-lg shadow-cyan-500/10`}
          style={{ opacity: cardOpacity, y: cardY }}
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
              {item.tag}
            </span>
          </div>
          <p className="text-lg font-medium text-cyan-300 mb-2">{item.event}</p>
          <p className="text-sm text-gray-400 mb-3">{item.period}</p>
          <p className="text-md text-gray-300">{item.description}</p>
        </motion.article>
      </div>
    );
  }

  return (
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_0_8px_rgba(34,211,238,0.15)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      <motion.article
        className="bg-white/5 backdrop-blur border border-cyan-400/30 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg shadow-cyan-500/10"
        style={{ opacity: cardOpacity, x: cardX }}
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
            {item.tag}
          </span>
        </div>
        <p className="text-base font-medium text-cyan-300 mb-2">{item.event}</p>
        <p className="text-sm text-gray-400 mb-2">{item.period}</p>
        <p className="text-sm text-gray-300">{item.description}</p>
      </motion.article>
    </div>
  );
}

const Achievements = () => {
  const sceneRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? 100 * achievements.length * 1.6
    : 100 * achievements.length * 1.2;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = React.useMemo(
    () =>
      Array.from(
        { length: achievements.length },
        (_, i) => (i + 1) / achievements.length,
      ),
    [],
  );

  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="achievements" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <div className="px-6 pt-8">
            <h2 className="text-4xl sm:text-5xl font-semibold text-center">
              Achievements
            </h2>
          </div>

          <div className="flex-1 flex items-center justify-center px-6 pb-10">
            <div className="relative w-full max-w-7xl hidden md:block">
              <div className="relative h-[6px] bg-white/15 rounded">
                <motion.div
                  className="absolute left-0 top-0 h-[6px] bg-gradient-to-r from-sky-400 to-blue-600 rounded"
                  style={{ width: lineWidth }}
                />
              </div>

              <div className="relative flex justify-between">
                {achievements.map((item, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <AchievementItem
                      key={idx}
                      item={item}
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

            <div className="relative w-full max-w-md md:hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                <motion.div
                  className="absolute top-0 left-0 w-[6px] bg-gradient-to-r from-sky-400 to-blue-600 rounded"
                  style={{ height: lineHeight }}
                />
              </div>

              <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                {achievements.map((item, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <AchievementItem
                      key={idx}
                      item={item}
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

export default Achievements;
