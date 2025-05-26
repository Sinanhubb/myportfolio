// ProjectDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectDetail = ({ projects }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    // Find the project by ID
    const projectId = parseInt(id);
    const foundProject = projects.find(p => p.id === projectId);
    setProject(foundProject);
  }, [id, projects]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="h-64 bg-gray-200 dark:bg-gray-700 relative">
            <img 
              src={project.image || "/api/placeholder/800/400"} 
              alt={project.title}
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                {project.description}
              </p>
              
              {/* Expanded project details - you would add more detailed content here */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Project Details</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  This is where you would add more detailed information about the project,
                  including challenges faced, solutions implemented, and outcomes achieved.
                  You can also talk about the technology stack in more detail.
                </p>
              </div>
              
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Key Features</h2>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                  <li className="mb-2">Feature one description</li>
                  <li className="mb-2">Feature two description</li>
                  <li className="mb-2">Feature three description</li>
                  <li className="mb-2">Feature four description</li>
                </ul>
              </div>
              
              {/* Project links section */}
              <div className="mt-12 flex flex-wrap gap-4">
                <a 
                  href="#" 
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
                <a 
                  href="#" 
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Code
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;

// Modify your App.js to include the route:
// Add this import:
// 

// And add this route:
// <Route path="/project/:id" element={<ProjectDetail projects={projects} />} />

// Then update your Projects.js file to link to the detail page:
// <Link to={`/project/${project.id}`} className="...">View Details</Link>