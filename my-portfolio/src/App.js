import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import About from "./About";
import Projects from "./Projects";
import Footer from "./Footer";
import Contact from "./Contact";
import { ReactTyped } from "react-typed";
import AdminPanel from "./AdminPanel";
import AdminLogin from "./AdminLogin";
import PrivateRoute from "./PrivateRoute"; // ✅ Import PrivateRoute

const Navbar = React.lazy(() => import("./Navbar"));

function MainApp({ skills, projects, testimonials, fadeInUp, staggerContainer }) {
  return (
    <>
      {/* Hero */}
      <section id="home" className="flex items-center justify-center min-h-screen px-4 pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="p-8 bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl max-w-2xl w-full text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            My <span className="text-indigo-600 dark:text-indigo-400">Portfolio</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-8">
            <ReactTyped
              strings={["I'm a Developer.", "I'm a Designer.", "I'm a Problem Solver."]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#projects"
              className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-lg transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Explore Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-800 shadow transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </section>

      <About skills={skills} />
      <Projects projects={projects} />
      <Contact />

      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">What Clients Say</h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg relative"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                    {testimonial.author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">{testimonial.author}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "HTML/CSS", level: 95 },
    { name: "Tailwind", level: 90 },
    { name: "MongoDB", level: 75 },
  ];

  const projects = [...]; // Your existing projects
  const testimonials = [...]; // Your existing testimonials

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white flex flex-col transition-colors duration-300">
        <button
          aria-label="Toggle dark mode"
          className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg z-50 hover:scale-110 transition-transform duration-200"
          onClick={() => setDarkMode(!darkMode)}
        >
          {/* Toggle icon */}
        </button>

        <React.Suspense fallback={<div className="h-16 bg-gray-900"></div>}>
          <Navbar />
        </React.Suspense>

        <Routes>
          <Route path="/" element={<MainApp skills={skills} projects={projects} testimonials={testimonials} fadeInUp={fadeInUp} staggerContainer={staggerContainer} />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} /> {/* ✅ Protected */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
