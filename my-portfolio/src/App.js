import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import About from "./About";
import Projects from "./Projects";
import Footer from "./Footer";
import Contact from "./Contact";
import { ReactTyped } from "react-typed";
import AdminPanel from "./AdminPanel";
import AdminLogin from "./AdminLogin";
import { PrivateRoute } from "./PrivateRoute";
import ProjectDetail from "./ProjectDetail";

// Lazy load components for better performance
const Navbar = React.lazy(() => import("./Navbar"));

// Custom hook for theme management
const useTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

// Enhanced animation variants
const animations = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    },
  },
  
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      },
    },
  },

  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  },

  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  },

  float: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

// Enhanced Loading Component
const LoadingSpinner = () => (
  <div className="h-16 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

// Enhanced Hero Section Component
const HeroSection = ({ fadeInUp }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen px-4 pt-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 dark:bg-indigo-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeInUp}
        className="relative z-10 p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full text-center border border-gray-200/50 dark:border-gray-700/50"
      >
        <motion.div
          variants={animations.float}
          animate="animate"
          className="mb-6"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            S
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight"
          variants={animations.slideInLeft}
        >
          Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Sinan</span>
        </motion.h1>

        <motion.div 
          className="text-gray-600 dark:text-gray-300 text-xl md:text-2xl mb-8 min-h-[2em]"
          variants={animations.scaleIn}
        >
          <ReactTyped
            strings={[
              "I'm a Full-Stack Developer.",
              "I'm a UI/UX Designer.",
              "I'm a Problem Solver.",
              "I build amazing experiences."
            ]}
            typeSpeed={60}
            backSpeed={40}
            backDelay={2000}
            startDelay={1000}
            loop
            className="font-medium"
          />
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={animations.staggerContainer}
        >
          <motion.a
            href="#projects"
            className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all duration-300 font-semibold transform hover:scale-105 hover:shadow-xl"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Explore Projects
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.a>
          
          <motion.a
            href="#contact"
            className="group px-8 py-4 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Get In Touch
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Enhanced Testimonials Section
const TestimonialsSection = ({ testimonials, fadeInUp, staggerContainer }) => (
  <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          What Clients Say
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            variants={fadeInUp}
            className="group bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-600"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.14 3.51a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.049 8.937c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.14-3.51z" />
                </svg>
              ))}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
              "{testimonial.text}"
            </p>
            
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-4 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                {testimonial.author.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white text-lg">
                  {testimonial.author}
                </h4>
                <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                  {testimonial.position}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// Enhanced Theme Toggle Button
const ThemeToggle = ({ darkMode, setDarkMode }) => (
  <motion.button
    aria-label="Toggle dark mode"
    className="fixed bottom-6 right-6 p-4 rounded-full bg-white dark:bg-gray-800 shadow-xl z-50 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
    onClick={() => setDarkMode(!darkMode)}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1 }}
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={darkMode ? 'dark' : 'light'}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? (
          <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.71-.71M6.34 6.34l-.71-.71m12.72 0l-.71.71M6.34 17.66l-.71.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);

function MainApp({ skills, projects, testimonials }) {
  return (
    <>
      <HeroSection fadeInUp={animations.fadeInUp} />
      <About skills={skills} />
      <Projects projects={projects} />
      <Contact />
      <TestimonialsSection 
        testimonials={testimonials} 
        fadeInUp={animations.fadeInUp} 
        staggerContainer={animations.staggerContainer} 
      />
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useTheme();

  // Memoized data to prevent unnecessary re-renders
  const portfolioData = useMemo(() => ({
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "MongoDB", level: 75 },
      { name: "Python", level: 85 },
      { name: "TypeScript", level: 80 },
    ],

    projects: [
      {
        id: 1,
        title: "T-Shirt Design Studio",
        description: "An immersive 3D T-shirt design application offering real-time customization with graphics upload, text editing, and professional-quality rendering. Built with Three.js and React for seamless user experience.",
        image: "/Screenshot 2025-05-26 200025.png",
        tags: ["Three.js", "React", "Vite", "TypeScript", "Tailwind CSS"],
        featured: true,
        demoUrl: "https://t-shirt-store.pages.dev/",
        githubUrl: "#"
      },
      {
        id: 2,
        title: "PyTerminal: Interactive Python Learning",
        description: "A comprehensive browser-based Python coding environment designed for beginners, featuring an integrated terminal and Docker-powered backend security.",
        image: "/Screenshot 2025-05-18 185130.png",
        tags: ["JavaScript", "Python", "Docker", "Tailwind CSS"],
        featured: true,
        demoUrl: "https://pyterminal.netlify.app/",
        githubUrl: "#"
      },
      {
        id: 3,
        title: "On-Demand Service Provider",
        description: "Full-stack platform connecting users with local technicians for household and commercial services, featuring real-time tracking and secure payment processing.",
        image: "/Worker home page.png",
        tags: ["React", "Python", "PostgreSQL", "MySQL", "Tailwind CSS"],
        featured: false,
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 4,
        title: "AR Indoor Navigation",
        description: "Augmented Reality indoor navigation system for complex environments like malls and hospitals, providing real-time visual guidance through smartphone AR overlays.",
        image: "/OIP.jpg",
        tags: ["Unity3D", "ARCore", "Python", "C#"],
        featured: false,
        demoUrl: "#",
        githubUrl: "#"
      },
    ],

    testimonials: [
      {
        id: 1,
        text: "Sinan delivered exceptional work with great attention to detail. His technical skills and communication made our project a huge success.",
        author: "Jane Smith",
        position: "CTO, TechCorp",
      },
      {
        id: 2,
        text: "Outstanding developer with excellent problem-solving skills. The project was completed on time and exceeded our expectations.",
        author: "Michael Johnson",
        position: "Founder, StartupX",
      },
    ],
  }), []);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col transition-colors duration-300">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
           
        <React.Suspense fallback={<LoadingSpinner />}>
          <Navbar />
        </React.Suspense>

        <Routes>
          <Route
            path="/project/:id"
            element={<ProjectDetail projects={portfolioData.projects} />}
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          <Route
            path="/"
            element={
              <MainApp
                skills={portfolioData.skills}
                projects={portfolioData.projects}
                testimonials={portfolioData.testimonials}
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