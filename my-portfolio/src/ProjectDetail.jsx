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
        tagline: "3D customizable T-shirt design experience with real-time preview",
        demoLink: "https://tshirt-designer.example.com",
        features: [
          {
            title: "Real-Time 3D Customization",
            emoji: "🎨",
            description: "Interactive 3D model responds instantly to color changes, text additions, and image uploads with physics-based fabric simulation.",
            tech: "Three.js + WebGL"
          },
          {
            title: "Modern Tech Stack",
            emoji: "⚡",
            description: "Built with Lit web components for modularity, Vite for ultra-fast builds, and TypeScript for robust type safety.",
            tech: "Lit + Vite + TypeScript"
          },
          {
            title: "Cross-Device Experience",
            emoji: "📱",
            description: "Fully responsive interface with touch gestures for mobile and keyboard shortcuts for desktop users.",
            tech: "CSS Container Queries"
          },
          {
            title: "Design Preservation",
            emoji: "💾",
            description: "Auto-saves designs to local storage and offers shareable links to continue editing later.",
            tech: "IndexedDB API"
          }
        ],
        quickFacts: [
          "🔄 Real-time 3D rendering at 60fps",
          "🎨 50+ color options and 20+ fonts",
          "📸 AI-powered image placement suggestions",
          "📦 Export designs as PNG or SVG"
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
            description: "Full Python 3 execution supporting standard library, list comprehensions, and file I/O (with restrictions).",
            tech: "Docker + Flask API"
          },
          {
            title: "Smart Code Editor",
            emoji: "👩‍💻",
            description: "CodeMirror editor with autocompletion, syntax checking, and customizable themes (including dark mode).",
            tech: "React + CodeMirror"
          },
          {
            title: "Learning Pathways",
            emoji: "🎯",
            description: "Guided tutorials with 50+ exercises covering basics to algorithms, with instant feedback.",
            tech: "Markdown-based content system"
          },
          {
            title: "Enterprise-Grade Security",
            emoji: "🛡️",
            description: "Each execution runs in ephemeral containers with network isolation and CPU/memory limits.",
            tech: "Docker + Kubernetes"
          }
        ],
        quickFacts: [
          "🚀 Executes code in <800ms average",
          "📚 50+ pre-loaded code examples",
          "🔐 Zero persistent storage - fully ephemeral",
          "📱 Works on tablets with virtual keyboard"
        ],
        testingExamples: [
          "Loops: `for i in range(3): print('PyTerminal!')`",
          "Math: `[x**2 for x in range(10)]`",
          "Errors: `print('Missing paren'`"
        ]
      };
    
    case 3: // On-Demand Service Provider App
      return {
        tagline: "Uber-like platform connecting users with local home service professionals",
        demoLink: "https://home-services.example.com",
        features: [
          {
            title: "Live Technician Tracking",
            emoji: "📍",
            description: "Real-time GPS tracking with ETA predictions and route visualization on interactive maps.",
            tech: "Mapbox GL + WebSockets"
          },
          {
            title: "Frictionless Payments",
            emoji: "💳",
            description: "End-to-end encrypted payments supporting credit cards, Apple Pay, and Google Pay.",
            tech: "Stripe API"
          },
          {
            title: "Smart Scheduling",
            emoji: "📅",
            description: "AI-powered scheduling that considers travel time, technician skills, and customer preferences.",
            tech: "Python + scikit-learn"
          },
          {
            title: "Bidirectional Ratings",
            emoji: "⭐",
            description: "Transparent review system where both customers and technicians can rate each other.",
            tech: "Firebase Realtime DB"
          }
        ],
        quickFacts: [
          "🛠️ 15+ service categories",
          "⏱️ Average 45-min response time",
          "📊 Dynamic pricing algorithm",
          "🔔 SMS/email notifications"
        ]
      };
    
    case 4: // Portfolio Website
      return {
        tagline: "Interactive developer portfolio with immersive 3D elements",
        demoLink: "https://myportfolio.example.com",
        features: [
          {
            title: "3D Scene Interaction",
            emoji: "🕹️",
            description: "Interactive 3D environment with clickable project elements that respond to mouse movements.",
            tech: "Three.js + R3F"
          },
          {
            title: "Theme Engine",
            emoji: "🎨",
            description: "6 color themes with automatic OS preference detection and manual toggle with smooth transitions.",
            tech: "CSS Variables + React Context"
          },
          {
            title: "Performance Focused",
            emoji: "⚡",
            description: "Perfect Lighthouse scores achieved through code splitting, SVG animations, and optimized assets.",
            tech: "Next.js + Vercel"
          },
          {
            title: "Accessibility First",
            emoji: "♿",
            description: "WCAG AA compliant with keyboard navigation, reduced motion options, and ARIA labels.",
            tech: "axe-core integration"
          }
        ],
        quickFacts: [
          "📊 100/100 Lighthouse performance",
          "🌓 System-aware dark/light mode",
          "🖱️ Interactive 3D cursor effects",
          "📱 Fully responsive down to 320px"
        ]
      };
    
    case 5: // Indoor Navigation Using AR
      return {
        tagline: "Augmented Reality wayfinding for complex buildings with centimeter precision",
        demoLink: "https://ar-navigation.example.com",
        features: [
          {
            title: "Markerless Tracking",
            emoji: "👁️",
            description: "Uses SLAM technology to navigate without QR codes or beacons by recognizing architectural features.",
            tech: "ARKit + ARCore"
          },
          {
            title: "Multi-Floor Routing",
            emoji: "🏢",
            description: "Handles complex multi-story navigation with elevator/escalator awareness and accessibility options.",
            tech: "Custom Graph DB"
          },
          {
            title: "Offline Mode",
            emoji: "📴",
            description: "Works without internet after initial download of venue maps and navigation data.",
            tech: "IndexedDB caching"
          },
          {
            title: "Analytics Dashboard",
            emoji: "📊",
            description: "Venue administrators get heatmaps of navigation patterns and choke point analysis.",
            tech: "WebGL + D3.js"
          }
        ],
        quickFacts: [
          "📍 <1m accuracy in tested venues",
          "🔄 Auto-updating maps via CMS",
          "♿ Wheelchair-accessible routes",
          "📱 iOS/Android compatible"
        ],
        testingInstructions: [
          "1. Scan your surroundings slowly",
          "2. Tap any destination pin",
          "3. Follow the floating AR path markers"
        ]
      };
    
    default:
      return {
        tagline: "Cutting-edge digital solution tailored to user needs",
        features: [
          {
            title: "Cloud-Native Architecture",
            emoji: "☁️",
            description: "Microservices deployed with Kubernetes for maximum scalability and reliability.",
            tech: "K8s + Docker"
          },
          {
            title: "AI Enhancements",
            emoji: "🧠",
            description: "Machine learning models that personalize user experiences based on behavior patterns.",
            tech: "Python + TensorFlow"
          },
          {
            title: "Real-Time Features",
            emoji: "⚡",
            description: "WebSocket connections enable live updates without page refreshes.",
            tech: "Socket.io"
          }
        ],
        quickFacts: [
          "🚀 Deployed on edge network",
          "📈 Handles 10K+ concurrent users",
          "🔒 SOC2 compliant security",
          "🌍 Multi-region deployment"
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