import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProjectDetail = ({ projects }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = parseInt(id, 10);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <button
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
          onClick={() => navigate("/")}
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg my-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold"
      >
        &larr; Back to Projects
      </button>

      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{project.title}</h1>

      <img
        src={project.image}
        alt={project.title}
        className="w-full h-auto rounded-lg mb-6 object-cover"
      />

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{project.description}</p>

      <div>
        <h3 className="text-xl font-semibold mb-3">Technologies Used:</h3>
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
