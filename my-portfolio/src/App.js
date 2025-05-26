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
import { PrivateRoute } from "./PrivateRoute";
import ProjectDetail from "./ProjectDetail";






// Lazy load Navbar
const Navbar = React.lazy(() => import("./Navbar"));

function MainApp({ skills, projects, testimonials, fadeInUp, staggerContainer }) {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="flex items-center justify-center min-h-screen px-4 pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="p-8 bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl max-w-2xl w-full text-center"
        >
         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
  Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Sinan</span>
</h1>
<p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-4">
  A passionate <span className="text-indigo-500">Frontend Developer</span> crafting responsive interfaces with <strong>React</strong> and <strong>Tailwind CSS</strong>.
</p>

         <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-2">
  <ReactTyped
    strings={["I'm a Developer.", "I'm a Designer.", "I'm a Problem Solver."]}
    typeSpeed={50}
    backSpeed={30}
    loop
  />
</p>
<p className="text-gray-500 dark:text-gray-400 text-md md:text-lg mb-8">
  Currently open to internships and junior developer roles.
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

      {/* About */}
      <About skills={skills} />

      {/* Projects */}
      <Projects projects={projects} />

      {/* Contact */}
      <Contact />

      {/* Testimonials */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
                className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                    {testimonial.author.split(" ").map((n) => n[0]).join("")}
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

  const projects = [
    {
      id: 1,
      title: "T-Shirt Design Studio",
      description: "A 3D customizable T-shirt design app where users can upload images, add text, and preview changes in real time. Built for a seamless design experience using cutting-edge web technologies.",
      image: "/api/placeholder/150/200",
      tags: ["Lit,", "Vite", "TypeScript","Tailwind CSS"]
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A responsive portfolio website built with modern web technologies.",
      image: "/api/placeholder/150/200",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: 3,
      title: "On-Demand Service Provider App",
      description: "This project aims to develop a full-stack web and mobile application that connects users with nearby technicians for various household and commercial services (e.g., plumbing, electrical work, appliance repair). The platform enables users to easily book services, track technicians in real time, and securely manage transactions",
      image: "/api/placeholder/150/200",
      tags: ["React", "Python", "MySQL","postgres ", "Tailwind CSS"],
    },
    {
      id: 4,
      title: "Indoor Navigation Using AR",
      description: "Created an Augmented Reality-based indoor navigation app that helps users navigate complex indoor environments such as malls, campuses, and hospitals using their smartphones. The application employs AR overlays to provide real-time visual guidance to users as they find their way to their destination..",
      image: "/api/placeholder/150/200",
      tags: ["unity3d", "arcore", "python","c#"],
    },
  ];

  const testimonials = [
    {
      id: 1,
      text: "Amazing work! Highly recommended.",
      author: "Jane Smith",
      position: "CTO, TechCorp",
    },
    {
      id: 2,
      text: "Great communication and code quality.",
      author: "Michael Johnson",
      position: "Founder, StartupX",
    },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col transition-colors duration-300">
        {/* Dark mode toggle */}
        <button
          aria-label="Toggle dark mode"
          className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg z-50 hover:scale-110 transition-transform duration-200"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.71-.71M6.34 6.34l-.71-.71m12.72 0l-.71.71M6.34 17.66l-.71.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>
           
        {/* Navbar */}
        <React.Suspense fallback={<div className="h-16 bg-gray-900"></div>}>
          <Navbar />
        </React.Suspense>

        <Routes>
  {/* Route to project detail page */}
  <Route
    path="/project/:id"
    element={
      <ProjectDetail projects={projects} />
    }
  />

  {/* Admin login page */}
  <Route path="/admin-login" element={<AdminLogin />} />

  {/* Admin panel (protected) */}
  <Route element={<PrivateRoute />}>
    <Route path="/admin" element={<AdminPanel />} />
  </Route>

  {/* Home and all other routes show MainApp */}
  <Route
    path="/"
    element={
      <MainApp
        skills={skills}
        projects={projects}
        testimonials={testimonials}
        fadeInUp={fadeInUp}
        staggerContainer={staggerContainer}
      />
    }
  />
</Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
