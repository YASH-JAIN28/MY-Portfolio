// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";

/* ================= SOCIAL LINKS (YASH) ================= */
const socials = [
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yash-jain-0a9577306",
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/YASH-JAIN28",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/jainyashhh2806_",
  },
];

/* ================= ICON GLOW EFFECT ================= */
const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,204,0.35),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
      >
        {/* NAME */}
        <div className="w-full">
          <h1
            className="font-bangers font-semibold text-white select-none"
            style={{
              fontSize: "clamp(3rem, 5vw, 10rem)",
              letterSpacing: "0.02em",
              lineHeight: 0.9,
              whiteSpace: "nowrap",
              textShadow: "0 2px 18px rgba(0,0,0,0.45)",
            }}
          >
            Yash Jain
          </h1>
        </div>

        {/* Accent line */}
        <div className="h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0D58CC] via-cyan-300 to-emerald-400" />

        {/* SOCIAL ICONS */}
        <div className="flex gap-6 text-2xl md:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-gray-300"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        {/* TAGLINE */}
        <p className="text-gray-300 italic max-w-xl">
          “Building today to create smarter solutions for tomorrow.”
        </p>

        {/* COPYRIGHT */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Yash Jain. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
