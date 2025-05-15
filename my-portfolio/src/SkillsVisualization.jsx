// SkillsVisualization.js
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SkillsVisualization = ({ skills }) => {
  const chartRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Chart visualization (to replace the existing skills bars)
  useEffect(() => {
    if (!chartRef.current) return;
    
    // You can integrate d3.js or Chart.js here for more advanced visualizations
    // This is a simple implementation
    const ctx = chartRef.current.getContext('2d');
    const chartHeight = chartRef.current.height;
    const chartWidth = chartRef.current.width;
    const barWidth = chartWidth / skills.length;
    const maxBarHeight = chartHeight - 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, chartWidth, chartHeight);
    
    // Draw bars
    skills.forEach((skill, index) => {
      const barHeight = (skill.level / 100) * maxBarHeight;
      const x = index * barWidth;
      const y = chartHeight - barHeight - 20;
      
      // Draw bar
      ctx.fillStyle = `hsl(${210 + index * 30}, 70%, 60%)`;
      ctx.fillRect(x + 10, y, barWidth - 20, barHeight);
      
      // Draw label
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(skill.name, x + barWidth / 2, chartHeight - 5);
      
      // Draw percentage
      ctx.fillText(`${skill.level}%`, x + barWidth / 2, y - 5);
    });
  }, [skills]);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">My Skills</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I've worked with a variety of technologies and frameworks to build modern web applications.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Chart visualization */}
          <div className="w-full lg:w-1/2">
            <canvas ref={chartRef} width="500" height="300" className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 w-full"></canvas>
          </div>

          {/* Skills cards */}
          <motion.div 
            variants={containerVariants}
            className="w-full lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* You could add skill icons here */}
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <span className="text-indigo-600 dark:text-indigo-300 font-bold text-lg">
                    {skill.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{skill.name}</h3>
                <div className="text-indigo-600 dark:text-indigo-400 font-bold">{skill.level}%</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsVisualization;

// Replace your existing skills section in About.js with this component
// import SkillsVisualization from './SkillsVisualization';
// <SkillsVisualization skills={skills} />