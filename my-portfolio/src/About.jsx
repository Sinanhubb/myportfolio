import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "./animations";

const About = ({ skills = [] }) => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            Who I Am
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            I'm a passionate developer who enjoys building beautiful and functional web apps.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center"
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {skill.name}
              </p>
              <p className="text-blue-500 dark:text-blue-400 mt-2">
                {skill.level}%
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
