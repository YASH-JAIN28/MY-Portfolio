// src/sections/Projects.jsx
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen bg-black text-white flex items-center justify-center px-6"
    >
      <div className="max-w-5xl w-full">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-center mb-12"
        >
          Projects
        </motion.h2>

        {/* Project Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-10 overflow-hidden"
        >
          {/* Gradient glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-20 blur-[120px]" />

          <div className="relative z-10">
            {/* Project Title */}
            <h3 className="text-3xl sm:text-4xl font-semibold mb-4">
              SwiftFolio
            </h3>

            {/* Status badge */}
            <span className="inline-block mb-5 px-4 py-1 text-sm rounded-full bg-white/10 border border-white/20">
              In Progress 🚧
            </span>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
              SwiftFolio is a MERN-based application designed to automatically
              generate professional portfolios and resumes from a single user
              data source. The goal is to reduce repetitive work and help users
              create consistent, clean, and responsive personal profiles.
            </p>

            {/* Features */}
            <ul className="mt-6 space-y-2 text-gray-300">
              <li>• User authentication (Login / Signup)</li>
              <li>• Dynamic portfolio generation</li>
              <li>• Resume automation from structured data</li>
              <li>• Responsive MERN stack architecture</li>
            </ul>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                disabled
                className="px-6 py-3 rounded-lg bg-white/20 text-white cursor-not-allowed"
              >
                Live Demo — Coming Soon
              </button>

              <button
                disabled
                className="px-6 py-3 rounded-lg border border-white/30 text-white cursor-not-allowed"
              >
                Source Code — Private
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
