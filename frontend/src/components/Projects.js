import React from "react";

const Projects = () => {
  const projectData = [
    {
      title: "Future FS Portfolio",
      description:
        "A full-stack portfolio website built using React, Node.js, Express, and MongoDB with responsive design and smooth animations.",
      github: "https://github.com/yourusername/future-fs-portfolio",
      live: "",
    },
    {
      title: "Government Scheme Access (ServiceNow)",
      description:
        "Developed a ServiceNow application with custom tables, REST API integration, Flow Designer automation, and dashboard management.",
      github: "https://github.com/yourusername/gov-scheme-access",
      live: "",
    },
    {
      title: "Hero Campus Challenge",
      description:
        "Participated in coding assessment focusing on DSA, problem-solving, and real-world programming challenges.",
      github: "https://github.com/yourusername/hero-campus",
      live: "",
    },
  ];

  return (
    <section className="projects" id="projects">
      <h2 className="section-title" data-aos="fade-up">My Projects</h2>
      <div className="projects-container">
        {projectData.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div className="project-links">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="project-btn">GitHub</button>
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="project-btn secondary">
                    Live Demo
                  </button>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;