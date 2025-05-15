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
import PrivateRoute from './PrivateRoute';

// Lazy load Navbar
const Navbar = React.lazy(() => import("./Navbar"));

function MainApp({ skills, projects, testimonials, fadeInUp, staggerContainer }) {
  // Original MainApp implementation
  return (
    <>
      {/* Hero */}
      <section id="home" className="flex items-center justify-center min-h-screen px-4 pt-16">
        {/* Hero content */}
      </section>
      
      {/* About */}
      <About skills={skills} />
      
      {/* Projects */}
      <Projects projects={projects} />
      
      {/* Contact */}
      <Contact />
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        {/* Testimonials content */}
      </section>
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  
  // Animation variants
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
  
  // Sample data
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
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with payment integration.",
      image: "/api/placeholder/150/200",
      tags: ["React", "Node.js", "MongoDB"],
    },
    // other projects...
  ];
  
  const testimonials = [
    {
      id: 1,
      text: "Amazing work! Highly recommended.",
      author: "Jane Smith",
      position: "CTO, TechCorp",
    },
    // other testimonials...
  ];
  
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white flex flex-col transition-colors duration-300">
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
          {/* Main route */}
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
          
          {/* Admin login route */}
          <Route path="/admin-login" element={<AdminLogin />} />
          
          {/* Protected admin route - FIXED */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Routes>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;