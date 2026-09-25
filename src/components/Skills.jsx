import React from 'react';
import { portfolioData } from '../data/portfolio';
import SkillsSphere from './SkillsSphere';

export default function Skills() {
  const { skillCategories } = portfolioData;

  return (
    <section id="skills" className="content-section" aria-label="System Capabilities">
      {/* HUD Header */}
      <header className="section-hud-header">
        <span className="section-badge-code">02 // CAPABILITIES MATRIX</span>
        <h2 className="section-main-title">Skills</h2>
        <p className="section-desc-sub">
          Fibonacci sphere projection of core technologies, backed by disciplined backend & AI inventory.
        </p>
        <div className="section-glow-line" />
      </header>

      {/* Main 3D Fibonacci Sphere Presentation */}
      <div className="skills-main-layout">
        <div className="skills-3d-wrapper">
          <SkillsSphere />
        </div>

        {/* Secondary Clean Technical Categorized List */}
        <div className="skills-categories-panel">
          <div className="categories-header-tag">SECONDARY TECHNICAL INVENTORY</div>
          <div className="categories-grid">
            {skillCategories.map((cat) => (
              <div key={cat.name} className="cat-column">
                <h3 className="cat-title">{cat.name}</h3>
                <ul className="cat-items-list">
                  {cat.items.map((item) => (
                    <li key={item} className="cat-item-entry">
                      <span className="cat-bullet">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
