import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ssLogo from '../assets/ss-logo.png';
import { portfolioData } from '../data/portfolio';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EXPERIENCE', href: '#journey' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className={`site-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <a
        href="#hero"
        onClick={(e) => handleNavClick(e, '#hero')}
        className="navbar-brand"
        aria-label="Samarth Home"
      >
        <img src={ssLogo} alt="SS" className="navbar-brand-logo" />
        <span className="navbar-brand-text">SAMARTH</span>
      </a>

      <nav aria-label="Main navigation">
        <ul className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`nav-link-item ${activeSection === item.href.slice(1) ? 'active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}
