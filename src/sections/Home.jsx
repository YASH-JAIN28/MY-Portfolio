// src/sections/Home.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
// avatar optional – agar robot nahi chahiye to hata sakta hai
import avatar from "../assets/avator.png";

import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import ParticleBackground from "../components/ParticlesBackground";

/* ================= SOCIAL LINKS (UPDATED) ================= */
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

/* ================= ICON GLOW ================= */
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

const Home = React.forwardRef((props, ref) => {
  /* ================= ROLES (REALISTIC) ================= */
  const roles = useMemo(
    () => ["MERN Stack Developer", "AI & ML Learner", "Full Stack Student"],
    []
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  /* ================= TYPING EFFECT ================= */
  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
      else if (!deleting && subIndex === current.length)
        setTimeout(() => setDeleting(true), 1200);
      else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      ref={ref}
      id="home"
      className="h-screen w-full relative overflow-hidden bg-black"
    >
      <ParticleBackground />

      {/* ================= GRADIENT BLOBS ================= */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px]
        rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2]
        opacity-20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px]
        rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]
        opacity-25 blur-[150px] animate-pulse delay-500" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        {/* ================= LEFT ================= */}
        <motion.div
          className="flex flex-col justify-center h-full text-center lg:text-left"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* typing */}
          <div className="mb-3 text-xl sm:text-2xl md:text-3xl font-semibold text-white min-h-[1.6em]">
            <span>{roles[index].substring(0, subIndex)}</span>
            <span className="inline-block w-[2px] ml-1 bg-white animate-pulse" />
          </div>

          {/* name */}
          <h1x
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold
            text-transparent bg-clip-text bg-gradient-to-r
            from-[#1CD8D2] via-[#00bf8f] to-[#302b63]"
          >
            Hello, I&apos;m
            <br />
            <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Yash Jain
            </span>
          </h1x>

          {/* description */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl">
            I build scalable and high-performance web applications using the MERN
            stack, while exploring Artificial Intelligence and Machine Learning
            to create intelligent, real-world solutions.
          </p>

          {/* buttons */}
          <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full text-lg font-medium text-white
              bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]
              shadow-lg hover:scale-105 transition"
            >
              View My Work
            </a>
            <a
              href="/Resume.pdf"
              download
              className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white
              hover:bg-gray-200 shadow-lg hover:scale-105 transition"
            >
              My Resume
            </a>
          </div>

          {/* socials */}
          <div className="mt-10 flex gap-6 text-2xl justify-center lg:justify-start">
            {socials.map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
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
        </motion.div>

        {/* ================= RIGHT (OPTIONAL AVATAR) ================= */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <motion.img
            src={avatar}
            alt="Yash Jain avatar"
            className="absolute top-1/2 -translate-y-1/2 select-none pointer-events-none"
            style={{ right: "-30px", width: "min(45vw, 760px)" }}
          />
        </motion.div>
      </div>
    </section>
  );
});

export default Home;
