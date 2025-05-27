// ProjectDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiExternalLink, FiGithub, FiCheckCircle } from "react-icons/fi";
import { SiTailwindcss, SiStorybook, SiCloudflare, SiThreedotjs, SiReact, SiPython, SiMysql, SiPostgresql, SiUnity, SiVite, SiTypescript, SiLit } from "react-icons/si";

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
    'Tailwind CSS': <SiTailwindcss className="text-cyan-500" />,
    'Three.js': <SiThreedotjs className="text-gray-800 dark:text-gray-200" />,
    'Storybook': <SiStorybook className="text-pink-500" />,
    'Cloudflare': <SiCloudflare className="text-orange-500" />,
    'React': <SiReact className="text-blue-500" />,
    'Python': <SiPython className="text-blue-600" />,
    'MySQL': <SiMysql className="text-blue-700" />,
    'postgres': <SiPostgresql className="text-blue-800" />,
    'unity3d': <SiUnity className="text-gray-800 dark:text-gray-200" />,
    'c#': <span className="text-purple-600 font-bold">C#</span>,
    'Vite': <SiVite className="text-yellow-500" />,
    'TypeScript': <SiTypescript className="text-blue-600" />,
    'Lit,': <SiLit className="text-blue-500" />,
    'arcore': <span className="text-green-500">📱</span>,
  };

  // Define project-specific features and details based on project ID
  const getProjectFeatures = (projectId) => {
    switch(projectId) {
      case 1: // T-Shirt Design Studio
        return {
          tagline: "3D customizable T-shirt design experience",
          features: [
            {
              title: "Real-Time 3D Customization",
              emoji: "🎨",
              description: "Users can modify t-shirt colors, add text, and upload images with instant visual feedback on a 3D model.",
            },
            {
              title: "Modern Tech Stack",
              emoji: "⚡",
              description: "Built with Lit web components, Vite for fast development, and TypeScript for type safety.",
            },
            {
              title: "Responsive Design",
              emoji: "📱",
              description: "Fully responsive interface that works seamlessly across desktop, tablet, and mobile devices.",
            },
            {
              title: "Interactive Preview",
              emoji: "👁️",
              description: "Live preview system that updates the 3D model in real-time as users make design changes.",
            }
          ],
          quickFacts: [
            "3D product configurator with live updates",
            "Modern web components architecture",
            "TypeScript for enhanced code quality",
            "Responsive design for all devices"
          ]
        };
      
      case 2: // PyTerminal
        return {
          tagline: "Learn Python in your browser—no setup required. Execute code securely with Docker-backed isolation.",
          demoLink: "https://pyterminal.netlify.app/",
          features: [
            {
              title: "Real Python Interpreter",
              emoji: "🐍",
              description: "Full Python 3 execution in the browser. Supports loops, functions, and user inputs (like `input()`) with real-time output.",
            },
            {
              title: "Beginner-Friendly IDE",
              emoji: "👩‍💻",
              description: "Built-in CodeMirror editor with syntax highlighting, line numbers, and smart indentation for clean coding habits.",
            },
            {
              title: "Zero-Config Learning",
              emoji: "🎯",
              description: "Includes a curated library of examples (from 'Hello World' to loops) so new coders can learn by tweaking live code.",
            },
            {
              title: "Secure Execution",
              emoji: "🛡️",
              description: "Execution sandbox protects users from harmful code. Timeouts, memory limits, and rate-limiting enforced.",
            }
          ],
          quickFacts: [
            "🚀 Run Python code instantly in your browser",
            "⚡ Code executes in <1s via lightweight containers",
            "📱 Mobile-ready and PWA-compatible",
            "🔌 Open-source backend deployable anywhere"
          ]
        };
      
      case 3: // On-Demand Service Provider App
        return {
          tagline: "Full-stack platform connecting users with local technicians",
          features: [
            {
              title: "Real-Time Tracking",
              emoji: "📍",
              description: "Track technicians in real-time as they travel to your location for service appointments.",
            },
            {
              title: "Secure Payments",
              emoji: "💳",
              description: "Integrated secure payment system for hassle-free transactions between users and service providers.",
            },
            {
              title: "Service Booking",
              emoji: "📅",
              description: "Easy-to-use booking system for scheduling various household and commercial services.",
            },
            {
              title: "Full-Stack Architecture",
              emoji: "🏗️",
              description: "Complete web and mobile application built with React frontend and Python backend.",
            }
          ],
          quickFacts: [
            "Real-time technician tracking",
            "Secure payment integration",
            "Multi-service booking platform",
            "Cross-platform compatibility"
          ]
        };
      
      case 4: // Indoor Navigation Using AR
        return {
          tagline: "Augmented Reality indoor navigation for complex environments",
          features: [
            {
              title: "AR Visual Guidance",
              emoji: "🔍",
              description: "Real-time AR overlays provide visual directions directly on your smartphone screen.",
            },
            {
              title: "Complex Environment Support",
              emoji: "🏢",
              description: "Navigate through malls, campuses, hospitals, and other complex indoor spaces with ease.",
            },
            {
              title: "Unity3D Engine",
              emoji: "🎮",
              description: "Powered by Unity3D for smooth 3D rendering and AR capabilities.",
            },
            {
              title: "ARCore Integration",
              emoji: "📱",
              description: "Utilizes Google ARCore for accurate spatial tracking and environment understanding.",
            }
          ],
          quickFacts: [
            "AR-powered visual navigation",
            "Multi-environment support",
            "Unity3D and ARCore integration",
            "Real-time spatial tracking"
          ]
        };
      
      default:
        return {
          tagline: "Innovative solution built with modern technologies",
          features: [
            {
              title: "Modern Architecture",
              emoji: "🏗️",
              description: "Built with modern development practices and cutting-edge technologies.",
            },
            {
              title: "User-Centered Design",
              emoji: "👥",
              description: "Designed with user experience as the top priority.",
            },
            {
              title: "Scalable Solution",
              emoji: "📈",
              description: "Architecture designed to scale with growing user needs.",
            }
          ],
          quickFacts: [
            "Modern technology stack",
            "User-centered design approach",
            "Scalable architecture"
          ]
        };
    }
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

  const projectDetails = getProjectFeatures(project.id);

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
                  {projectDetails.tagline}
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
                  {project.description}
                </p>
              </motion.div>
              <motion.div className="md:w-1/3" variants={staggerItem}>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Project Highlights</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    {projectDetails.quickFacts.map((fact, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheckCircle className="mt-1 mr-2 text-indigo-500 flex-shrink-0" /> 
                        {fact}
                      </li>
                    ))}
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
                {projectDetails.features.map(({ title, emoji, description }, i) => (
                  <motion.div
                    key={i}
                    className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600"
                    variants={staggerItem}
                  >
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      <span className="mr-2">{emoji}</span> {title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">{description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Demo & Code - Only show if URLs exist */}
            {(project.demo || project.github) && (
              <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeIn}>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <FiExternalLink className="text-lg" /> Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    <FiGithub className="text-lg" /> Source Code
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;