// ProjectDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiExternalLink, FiGithub, FiCheckCircle } from "react-icons/fi";
import { SiTailwindcss, SiStorybook, SiCloudflare, SiThreedotjs } from "react-icons/si";

const ProjectDetail = ({ projects }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const projectId = parseInt(id);
    const foundProject = projects.find(p => p.id === projectId);
    setProject(foundProject);
  }, [id, projects]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const techIcons = {
    'Tailwind': <SiTailwindcss className="text-cyan-500" />,
    'Three.js': <SiThreedotjs className="text-gray-800 dark:text-gray-200" />,
    'Storybook': <SiStorybook className="text-pink-500" />,
    'Cloudflare': <SiCloudflare className="text-orange-500" />
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-md"
        >
          <div className="text-5xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Project Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link 
            to="/" 
            className="inline-flex items-center group text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* Hero Section */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-80 md:h-96 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-center px-6"
            >
              <div>
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.title}
                </motion.h1>
                <motion.p 
                  className="text-xl opacity-90 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ delay: 0.4 }}
                >
                  {project.tagline || "Modern e-commerce experience for custom apparel"}
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            {/* Overview and Quick Facts */}
            <motion.div 
              className="flex flex-col md:flex-row gap-8 mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="md:w-2/3" variants={staggerItem}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Overview</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  A cutting-edge print-on-demand t-shirt store built with Lit Web Components, featuring a fully interactive 3D product customizer with real-time previews. The application delivers a seamless single-page experience with sophisticated state management and pixel-perfect animations.
                </p>
              </motion.div>
              <motion.div className="md:w-1/3" variants={staggerItem}>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Project Details</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start"><FiCheckCircle className="mt-1 mr-2 text-indigo-500" />SPA with state-managed routing</li>
                    <li className="flex items-start"><FiCheckCircle className="mt-1 mr-2 text-indigo-500" />3D product visualization</li>
                    <li className="flex items-start"><FiCheckCircle className="mt-1 mr-2 text-indigo-500" />Fully responsive design</li>
                    <li className="flex items-start"><FiCheckCircle className="mt-1 mr-2 text-indigo-500" />No backend required</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div className="mb-12" initial="hidden" animate="visible" variants={fadeIn}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technology Stack</h2>
              <div className="flex flex-wrap gap-4">
                {project.tags.map((tag, i) => (
                  <div key={i} className="flex items-center px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                    {techIcons[tag] && <span className="mr-2 text-xl">{techIcons[tag]}</span>}
                    <span className="text-gray-800 dark:text-gray-200">{tag}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Key Features */}
            <motion.div className="mb-12" variants={staggerContainer} initial="hidden" animate="visible">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Interactive 3D Customizer",
                    emoji: "✨",
                    description: "Three.js powered 3D t-shirt model with real-time updates as users add designs, text, or change colors.",
                  },
                  {
                    title: "Real-Time Preview",
                    emoji: "🖌️",
                    description: "Live rendering of user customizations for immediate feedback and enhanced UX.",
                  },
                  {
                    title: "Theme Switching",
                    emoji: "🎨",
                    description: "Switch between multiple themes dynamically using Tailwind and CSS modules.",
                  },
                  {
                    title: "Cloudflare Hosting",
                    emoji: "☁️",
                    description: "Deployed using Cloudflare Pages for ultra-fast global delivery.",
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
                    variants={staggerItem}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="text-indigo-600 dark:text-indigo-400 text-3xl mb-4">{feature.emoji}</div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">External Links</h2>
              <div className="flex flex-wrap gap-4">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="https://t-shirt-store.pages.dev/"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Live Demo <FiExternalLink className="ml-2" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                  >
                    GitHub Repo <FiGithub className="ml-2" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
