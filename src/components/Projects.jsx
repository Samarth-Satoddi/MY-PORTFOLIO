import React, { useState } from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import ProjectPreview from './ProjectPreview';

function GithubIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Projects() {
  const { projects } = portfolioData;
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  return (
    <section id="work" className="content-section" aria-label="Selected Engineering Work">
      {/* HUD Header */}
      <header className="section-hud-header">
        <span className="section-badge-code">01 // PRODUCTION WORK</span>
        <h2 className="section-main-title">Work</h2>
        <p className="section-desc-sub">
          Vertical inventory of backend systems, autonomous agent loops, and AI retrieval architectures.
        </p>
        <div className="section-glow-line" />
      </header>

      {/* Vertical Project List (Mission Control Layout) */}
      <div className="projects-vertical-list" role="list">
        {projects.map((project) => {
          const isHovered = hoveredProjectId === project.id;

          return (
            <article
              key={project.id}
              className={`project-list-row ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              role="listitem"
            >
              {/* Left Column: Number & 3D Procedural Preview Shape */}
              <div className="project-preview-cell">
                <span className="project-index-num">{project.number}</span>
                <ProjectPreview shape={project.shape} isHovered={isHovered} />
              </div>

              {/* Middle Column: Core Project Telemetry & Architecture */}
              <div className="project-body-cell">
                <div className="project-meta-top">
                  <span className="project-shape-tag">PRIMITIVE // {project.shape.toUpperCase()}</span>
                  {project.isComingSoon && (
                    <span className="project-status-pill">
                      <Clock size={12} />
                      <span>COMING SOON</span>
                    </span>
                  )}
                </div>

                <h3 className="project-title-heading">{project.title}</h3>
                <p className="project-summary-desc">{project.description}</p>

                {/* Highlights list */}
                {project.highlights && (
                  <ul className="project-highlights-list">
                    {project.highlights.map((h) => (
                      <li key={h} className="project-highlight-item">
                        <span className="highlight-bullet">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Technology Pills */}
                <div className="project-tech-pills" aria-label="Technologies used">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Repository & Action Links */}
              <div className="project-actions-cell">
                {project.isComingSoon ? (
                  <div className="coming-soon-badge" aria-label="Project Coming Soon">
                    <span>Coming Soon</span>
                  </div>
                ) : (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hud-btn hud-btn-secondary project-action-btn"
                    aria-label={`View ${project.title} repository on GitHub`}
                  >
                    <GithubIcon size={14} />
                    <span>{project.repository}</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
