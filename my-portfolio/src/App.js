import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import About from "./About";
import Footer from "./Footer";
import Contact from "./Contact";
import { ReactTyped } from "react-typed";
import AdminPanel from "./AdminPanel";
import AdminLogin from "./AdminLogin";
import { PrivateRoute } from "./PrivateRoute";

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

// Projects Component with working demo links
const Projects = ({ projects }) => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={animations.fadeInUp}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={animations.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={animations.fadeInUp}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-600"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-4">
                  {project.demoUrl === "#" ? (
                    <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded cursor-not-allowed text-sm">
                      Demo Coming Soon
                    </button>
                  ) : (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors text-sm"
                    >
                      Live Demo
                    </a>
                  )}
                  
                  {project.githubUrl === "#" ? (
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded cursor-not-allowed text-sm">
                      Code Private
                    </button>
                  ) : (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded transition-colors text-sm"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Project Detail Component
const ProjectDetail = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) return <div className="text-center py-20">Project not found</div>;

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animations.fadeInUp}
        className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="h-64 md:h-96 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">{project.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            {project.demoUrl === "#" ? (
              <button className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg cursor-not-allowed">
                Demo Coming Soon
              </button>
            ) : (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                View Live Demo
              </a>
            )}
            
            {project.githubUrl === "#" ? (
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg cursor-not-allowed">
                Code Private
              </button>
            ) : (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg transition-colors"
              >
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Rest of your components (HeroSection, TestimonialsSection, ThemeToggle, MainApp) remain the same...

function App() {
  const [darkMode, setDarkMode] = useTheme();

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