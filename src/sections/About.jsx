import { motion } from "framer-motion";
// ✅ STEP 1: import your photo
import myPhoto from "../assets/yash.jpg";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
      aria-label="About me"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#0f172a] via-[#1d4ed8] to-[#38bdf8] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#38bdf8] via-[#2563eb] to-[#0f172a] opacity-15 blur-[140px] animate-pulse delay-300" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        {/* Profile header */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* ✅ PHOTO (replaced YJ) */}
          <motion.div
            className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px]
            rounded-2xl overflow-hidden shadow-2xl
            border border-[#38bdf8]/25"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <img
              src={myPhoto}
              alt="Yash Jain"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Name + Role + Bio */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#2563eb]">
              Yash Jain
            </h2>

            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              MERN Stack Developer | Student
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              I&apos;m Yash Jain, a Computer Applications student and full-stack
              developer passionate about building modern, interactive, and
              practical digital experiences. I work primarily with React.js,
              JavaScript, Node.js, Express.js, and MongoDB, while continuously
              exploring new technologies and AI-assisted development. I enjoy
              turning ideas into functional products, participating in
              hackathons, and solving problems through code. With experience
              across web development, AR/VR projects, and competitive
              hackathons, I&apos;m always looking for opportunities to learn,
              build, and create meaningful technology.
            </p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {[
                { label: "Education", value: "BCA + MCA (AI/ML)" },
                { label: "Tech Stack", value: "MERN" },
                { label: "Focus", value: "Full Stack & AI/ML" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold text-white">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-lg border border-white/20 bg-white/10 text-white px-5 py-3 hover:bg-white/20 transition"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>

        {/* About text */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            About Me
          </h3>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            I enjoy building modern, interactive, and practical digital
            experiences by combining frontend design, backend logic, and
            thoughtful product thinking.
          </p>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            I&apos;m always looking for opportunities to learn, build, and
            create meaningful technology through full-stack development,
            hackathons, and real-world problem-solving.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
