import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export default function Contact() {
  const { contact } = portfolioData;

  return (
    <section id="contact" className="content-section" aria-label="Establish Connection">
      <header className="section-hud-header">
        <span className="section-badge-code">07 // COMMUNICATIONS</span>
        <h2 className="section-main-title">Contact</h2>
        <p className="section-desc-sub">
          Initiate direct correspondence, review code repositories, or connect professionally.
        </p>
        <div className="section-glow-line" />
      </header>

      {/* Clean Text List (No circular social buttons) */}
      <div className="contact-list-container">
        <div className="contact-text-list" role="list">
          {/* Email Row */}
          <div className="contact-text-row" role="listitem">
            <div className="contact-row-type">
              <span className="contact-type-label">Email</span>
              <span className="contact-protocol-tag">DIRECT CHANNEL</span>
            </div>
            <div className="contact-row-value">
              <span className="contact-placeholder-text">{contact.email}</span>
            </div>
            <div className="contact-row-status">
              <span className="contact-status-badge">STANDBY</span>
            </div>
          </div>

          {/* GitHub Row */}
          <div className="contact-text-row" role="listitem">
            <div className="contact-row-type">
              <span className="contact-type-label">GitHub</span>
              <span className="contact-protocol-tag">VCS REPOSITORIES</span>
            </div>
            <div className="contact-row-value">
              <a
                href={contact.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-text-link"
                aria-label="View Samarth-Satoddi on GitHub"
              >
                <span>{contact.github.username}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="contact-row-status">
              <span className="contact-status-badge live">ONLINE</span>
            </div>
          </div>

          {/* LinkedIn Row */}
          <div className="contact-text-row" role="listitem">
            <div className="contact-row-type">
              <span className="contact-type-label">LinkedIn</span>
              <span className="contact-protocol-tag">PROFESSIONAL PROFILE</span>
            </div>
            <div className="contact-row-value">
              <a
                href={contact.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-text-link"
                aria-label="View Samarth Satoddi on LinkedIn"
              >
                <span>{contact.linkedin.name}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="contact-row-status">
              <span className="contact-status-badge live">CONNECTED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
