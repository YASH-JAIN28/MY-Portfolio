import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import Astra from "../assets/animated yash img.png";

// EmailJS ENV
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const DELIVERY_TARGET =
  import.meta.env.VITE_CONTACT_EMAIL || "2910jainyash@gmail.com";
const EMAILJS_READY = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
const STORAGE_KEY = "portfolio-contact-messages";

const saveMessageToStorage = (messageData) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updated = [...existing, messageData];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error("Unable to save contact form data locally:", error);
    return false;
  }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.message.trim()) newErrors.message = "Required";
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submittedAt = new Date().toISOString();
    const messageData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      submittedAt,
      deliveryTarget: DELIVERY_TARGET,
      source: "portfolio-contact-form",
    };

    setStatus("sending");
    setErrorMessage("");

    try {
      if (!EMAILJS_READY) {
        saveMessageToStorage({ ...messageData, status: "saved-locally" });
        setStatus("saved");
        setFormData({ name: "", email: "", message: "" });
        return;
      }

      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        user_email: formData.email,
        sender_email: formData.email,
        message: formData.message,
        recipient_email: DELIVERY_TARGET,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      saveMessageToStorage({ ...messageData, status: "sent-via-emailjs" });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      saveMessageToStorage({ ...messageData, status: "failed-emailjs" });
      setStatus("error");
      setErrorMessage(
        err?.text ||
          err?.message ||
          "Something went wrong while sending the message.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex items-center"
    >
      <ParticlesBackground />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-12">
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <motion.img
            src={Astra}
            alt="Contact illustration"
            className="w-72 md:w-96 rounded-2xl shadow-lg"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
          <p className="text-gray-400 mb-4">
            Open to internships, collaborations, and learning opportunities.
          </p>

          <div className="mb-6 rounded-xl border border-blue-400/30 bg-blue-500/10 p-4 text-sm text-blue-100">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
              Message delivery
            </p>
            <p className="mt-2 text-gray-200">
              Your message is sent to:{" "}
              <span className="font-semibold text-white">
                {DELIVERY_TARGET}
              </span>
            </p>{" "}
            {!EMAILJS_READY && (
              <p className="mt-2 text-xs text-yellow-200">
                EmailJS is not configured yet, so the form saves the message
                locally until it is connected.
              </p>
            )}{" "}
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-white/10 border ${
                  errors.name ? "border-red-500" : "border-gray-500"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-white/10 border ${
                  errors.email ? "border-red-500" : "border-gray-500"
                }`}
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                rows={5}
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-white/10 border ${
                  errors.message ? "border-red-500" : "border-gray-500"
                }`}
              />
            </div>

            {/* STATUS */}
            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "saved"
                      ? "text-emerald-400"
                      : status === "error"
                        ? "text-red-400"
                        : "text-yellow-400"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                    ? `Message sent successfully ✅ It will be delivered to ${DELIVERY_TARGET}.`
                    : status === "saved"
                      ? `Message saved successfully ✅ It has been stored locally and will be sent once EmailJS is connected to ${DELIVERY_TARGET}.`
                      : errorMessage || "Something went wrong ❌"}
              </p>
            )}

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "sending"}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 py-3 rounded-md font-semibold transition"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
