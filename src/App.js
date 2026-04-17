import React, { useState, useEffect, useRef } from 'react';
import { Shield, Code, Award, Briefcase, Mail, Phone, Linkedin, Github, ChevronDown, GraduationCap, BookOpen, Menu, X } from 'lucide-react';
import './App.css';
import ChatBot from "./ChatBot";

// Ensure harsha.jpeg is inside the 'src' folder for this import to work
import profilePic from './harsha.jpeg';
const Portfolio = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorParticles, setCursorParticles] = useState([]);
  const [triangles, setTriangles] = useState([]);
  const [visibleSections, setVisibleSections] = useState({});
  // NEW: State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef(null);
  const observerRef = useRef(null);
  const particleIdRef = useRef(0);

  // Initialize moving triangles for background
  useEffect(() => {
    const triangleCount = 15;
    const newTriangles = [];
    for (let i = 0; i < triangleCount; i++) {
      newTriangles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 100 + 40,
        rotation: Math.random() * 360,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        rotationSpeed: (Math.random() - 0.5) * 0.5
      });
    }
    setTriangles(newTriangles);
  }, []);

  // Canvas animation for triangles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and animate triangles
      triangles.forEach(t => {
        t.x += t.vx;
        t.y += t.vy;
        t.rotation += t.rotationSpeed;

        // Wrap around screen edges
        if (t.x < -t.size) t.x = canvas.width + t.size;
        if (t.x > canvas.width + t.size) t.x = -t.size;
        if (t.y < -t.size) t.y = canvas.height + t.size;
        if (t.y > canvas.height + t.size) t.y = -t.size;

        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate((t.rotation * Math.PI) / 180);
        ctx.beginPath();
        ctx.moveTo(0, -t.size / 2);
        ctx.lineTo(-t.size / 2, t.size / 2);
        ctx.lineTo(t.size / 2, t.size / 2);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.15)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [triangles]);

  // Handle cursor particles creation
  const handleMouseMove = (e) => {
    const newX = e.clientX;
    const newY = e.clientY;
    setMousePos({ x: newX, y: newY });

    // Create new particle at cursor position
    const newParticle = {
      id: particleIdRef.current++,
      x: newX,
      y: newY,
      size: Math.random() * 4 + 2,
      opacity: 1,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    };

    setCursorParticles(prev => [...prev, newParticle].slice(-50));
  };

  // Animate cursor particles
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.02,
            vy: p.vy + 0.1
          }))
          .filter(p => p.opacity > 0)
      );
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for smooth section visibility
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('.section, .hero-section');
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="portfolio-container" onMouseMove={handleMouseMove}>
      <canvas ref={canvasRef} className="particle-canvas" />
      
      {/* Cursor particles */}
      {cursorParticles.map(particle => (
        <div
          key={particle.id}
          className="cursor-particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity
          }}
        />
      ))}

      <nav className="navbar">
        <div className="nav-logo">HV</div>

        {/* UPDATED: Mobile Menu Toggle Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* UPDATED: Links with 'mobile-open' class and onClick handlers */}
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#hero" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#education" onClick={() => setMobileMenuOpen(false)}>Education</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          <a href="#certifications" onClick={() => setMobileMenuOpen(false)}>Certifications</a>
          <a href="#activities" onClick={() => setMobileMenuOpen(false)}>Activities</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      </nav>

      <section id="hero" className={`hero-section ${visibleSections.hero ? 'visible' : ''}`}>
        <div className="hero-content">
          <div className="hero-layout">
            <div className="profile-photo-container">
              <div className="profile-photo">
                <div className="photo-placeholder">
                  {/* Uses the imported image variable */}
                  <img src={profilePic} alt="K Harsha Vardhan Chowdary" className="profile-image" />
                </div>
                <div className="photo-ring"></div>
                <div className="photo-ring-2"></div>
              </div>
            </div>
            <div className="hero-text">
              <h1 className="hero-title">K HARSHA VARDHAN CHOWDARY</h1>
              <p className="hero-subtitle">Cybersecurity Engineer | Ethical Hacker | Developer</p>
              <div className="hero-tagline">
                <Shield className="inline-icon" />
                <span>Securing Digital Frontiers</span>
              </div>
            </div>
          </div>
          <a href="#about" className="cta-button">
            <span>Explore My Work</span>
            <ChevronDown className="bounce-icon" />
          </a>
        </div>
      </section>

      <section id="about" className={`section ${visibleSections.about ? 'visible' : ''}`}>
        <div className="content-box">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>Enthusiastic B.Tech Cyber Security student at VNR VJIET with a passion for scripting and developing cybersecurity solutions. Skilled in programming languages and cybersecurity tools, with the ability to quickly apply theoretical knowledge.</p>
              <p>Seeking opportunities to leverage technical skills in a dynamic environment where I can contribute to securing digital infrastructure and developing innovative security solutions.</p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">7.21</div>
                  <div className="stat-label">CGPA</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Certifications</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Projects</div>
                </div>
              </div>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={20} />
                <span>+91 8019252777</span>
              </div>
              <div className="contact-item">
                <Mail size={20} />
                <span>hvckari@gmail.com</span>
              </div>
              <div className="contact-item">
                <Linkedin size={20} />
                <a href="https://www.linkedin.com/in/harsha-vardhan-146181217/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className={`section ${visibleSections.education ? 'visible' : ''}`}>
        <div className="content-box">
          <h2 className="section-title">Education Timeline</h2>
          <div className="education-timeline">
            <div className="education-item" style={{animationDelay: '0s'}}>
              <div className="education-icon">
                <GraduationCap size={28} />
              </div>
              <div className="education-details">
                <div className="education-year">2022 - Present</div>
                <h3>Bachelor of Technology</h3>
                <p className="education-major">Computer Science and Engineering - Cyber Security</p>
                <p className="education-institution">VNR Vignana Jyothi Institute of Engineering and Technology</p>
                <p className="education-location">Hyderabad, Telangana</p>
                <div className="education-grade">CGPA: 7.07/10</div>
              </div>
            </div>
            <div className="education-item" style={{animationDelay: '0.15s'}}>
              <div className="education-icon">
                <BookOpen size={28} />
              </div>
              <div className="education-details">
                <div className="education-year">2020 - 2022</div>
                <h3>Higher Secondary School (XII)</h3>
                <p className="education-institution">Sri Chaitanya Junior College</p>
                <p className="education-location">Hyderabad, Telangana</p>
                <div className="education-grade">92.0%</div>
              </div>
            </div>
            <div className="education-item" style={{animationDelay: '0.3s'}}>
              <div className="education-icon">
                <BookOpen size={28} />
              </div>
              <div className="education-details">
                <div className="education-year">2019 - 2020</div>
                <h3>Secondary School (X)</h3>
                <p className="education-institution">Arohan The Complete School</p>
                <p className="education-location">Hyderabad, Telangana</p>
                <div className="education-grade">10/10 GPA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className={`section ${visibleSections.skills ? 'visible' : ''}`}>
        <div className="content-box">
          <h2 className="section-title">Technical Arsenal</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <Code className="category-icon" />
              <h3>Languages</h3>
              <div className="skill-tags">
                {['Python', 'C', 'SQL', 'Java', 'HTML', 'CSS', 'JavaScript'].map((skill, i) => (
                  <span key={skill} className="skill-tag" style={{animationDelay: `${i * 0.1}s`}}>{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <Shield className="category-icon" />
              <h3>Security Tools</h3>
              <div className="skill-tags">
                {['Wireshark', 'Nmap', 'OWASP', 'SIEM', 'IDS', 'Packet Analyzer'].map((skill, i) => (
                  <span key={skill} className="skill-tag" style={{animationDelay: `${i * 0.1}s`}}>{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <Briefcase className="category-icon" />
              <h3>Technologies & Others</h3>
              <div className="skill-tags">
                {['Linux', 'Network Security', 'Bash', 'Vulnerability Assessment', 'Data Structures', 'PEP 8 Style Guide'].map((skill, i) => (
                  <span key={skill} className="skill-tag" style={{animationDelay: `${i * 0.1}s`}}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className={`section ${visibleSections.projects ? 'visible' : ''}`}>
        <div className="content-box">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card" style={{animationDelay: '0s'}}>
              <div className="project-header">
                <h3>Memory Forensics</h3>
                <div className="project-icon">🔍</div>
              </div>
              <p>Analyzed volatile memory to detect and investigate cyber threats, focusing on identifying malicious activities such as malware or unauthorized access using forensic tools and memory dumps.</p>
              <div className="project-tags">
                <span>Forensics</span>
                <span>Malware Analysis</span>
                <span>Security</span>
              </div>
            </div>
            <div className="project-card" style={{animationDelay: '0.1s'}}>
              <div className="project-header">
                <h3>Automated Vulnerability Scanner</h3>
                <div className="project-icon">🛡️</div>
              </div>
              <p>Developed a web scanning tool that automatically analyzes websites as soon as they are opened, checking for vulnerabilities, errors, and security risks with detailed reports for quick fixes.</p>
              <div className="project-tags">
                <span>Web Security</span>
                <span>Automation</span>
                <span>Vulnerability Assessment</span>
              </div>
            </div>
            <div className="project-card" style={{animationDelay: '0.2s'}}>
              <div className="project-header">
                <h3>Tax Collection DBMS</h3>
                <div className="project-icon">💾</div>
              </div>
              <p>Designed a database system to efficiently manage and track tax-related records, including taxpayer information, payments, and due amounts with automated collection and real-time updates.</p>
              <div className="project-tags">
                <span>Database</span>
                <span>SQL</span>
                <span>Automation</span>
              </div>
            </div>
            <div className="project-card" style={{animationDelay: '0.3s'}}>
              <div className="project-header">
                <h3>Smart Waste Segregation</h3>
                <div className="project-icon">🤖</div>
              </div>
              <p>Created an Arduino-powered smart dustbin system using IR, inductive, and moisture sensors to automatically segregate waste into metallic, wet, and dry categories for efficient disposal.</p>
              <div className="project-tags">
                <span>IoT</span>
                <span>Arduino</span>
                <span>Hardware</span>
              </div>
            </div>
          </div>
        </div>
      </section>
<section id="experience" className={`section ${visibleSections.experience ? 'visible' : ''}`}>
  <div className="content-box">
    <h2 className="section-title">Professional Experience</h2>
    <div className="timeline">

      <div className="timeline-item" style={{animationDelay: '0s'}}>
        <div className="timeline-marker"></div>
        <div className="timeline-content">
          <h3>Data Analyst Intern</h3>
          <p className="timeline-date">UNIFIED MENTOR | June 2024 - July 2024</p>
          <p>
            Completed comprehensive data science projects and analysis tasks, 
            gaining hands-on experience in data processing and analytical methodologies.
          </p>
        </div>
      </div>

      <div className="timeline-item" style={{animationDelay: '0.15s'}}>
        <div className="timeline-marker"></div>
        <div className="timeline-content">
          <h3>Campus Ambassador</h3>
          <p className="timeline-date">Learn Flu Online | June 2024</p>
          <p>
            Organized private and public events on campus for the college community, 
            fostering engagement and learning opportunities.
          </p>
        </div>
      </div>

      <div className="timeline-item" style={{animationDelay: '0.3s'}}>
        <div className="timeline-marker"></div>
        <div className="timeline-content">
          <h3>Cyber Security & Ethical Hacking Training</h3>
          <p className="timeline-date">Microsoft by Threat-Prism | December 2022 - December 2025</p>
          <p>
            Completed extensive training and projects on exploiting server vulnerabilities, 
            gaining practical cybersecurity skills.
          </p>
        </div>
      </div>

      {/* ✅ NEW EXPERIENCE */}
      <div className="timeline-item" style={{animationDelay: '0.45s'}}>
        <div className="timeline-marker"></div>
        <div className="timeline-content">
          <h3>Cyber Security Analyst Intern</h3>
          <p className="timeline-date">SSEV SOFTSOLS | April 2026 - Present</p>
          <p>
            Worked on securing embedded and IoT-based systems including ESP32, Raspberry Pi, and NVIDIA Jetson devices. 
            Performed vulnerability assessments, implemented system hardening techniques, and enhanced device-level 
            security to mitigate potential cyber threats.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

      <section id="certifications" className={`section ${visibleSections.certifications ? 'visible' : ''}`}>
        <div className="content-box">
          <h2 className="section-title">Certifications & Training</h2>
          <div className="cert-list">
            <div className="cert-item">
              <div className="cert-icon">✓</div>
              <div className="cert-details">
                <h3>Professional Cyber Security Course</h3>
                <p>Google</p>
              </div>
            </div>
            <div className="cert-item">
              <div className="cert-icon">✓</div>
              <div className="cert-details">
                <h3>Certified Ethical Hacker (CEH)</h3>
                <p>EC-Council</p>
              </div>
            </div>
            <div className="cert-item">
              <div className="cert-icon">✓</div>
              <div className="cert-details">
                <h3>Cyber Suraksha</h3>
                <p>TATA</p>
              </div>
            </div>
            <div className="cert-item">
              <div className="cert-icon">✓</div>
              <div className="cert-details">
                <h3>Microsoft Certificate for Industrial Training in Cyber Security</h3>
                <p>Microsoft</p>
              </div>
            </div>
            <div className="cert-item">
              <div className="cert-icon">✓</div>
              <div className="cert-details">
                <h3>Smart Coder Bronze</h3>
                <p>Smart Interviews</p>
              </div>
            </div>
            <div className="cert-item">
              <div className="cert-icon">✓</div>
              <div className="cert-details">
                <h3>Web Development</h3>
                <p>VNR VJIET</p>
              </div>
            </div>
            <div className="cert-item">
              <div className="cert-icon">✓</div>
              <div className="cert-details">
                <h3>Cyber Security and Ethical Hacking</h3>
                <p>ArIES IIT Roorkee in collaboration with Coincent</p>
              </div>
            </div>
            <div className="cert-item">
              <div className="cert-icon">✓</div>
              <div className="cert-details">
                <h3>A Practical Introduction to Cloud Computing</h3>
                <p>EC-Council</p>
              </div>
            </div>
            <div className="cert-item">
              <div className="cert-icon">✓</div>
              <div className="cert-details">
                <h3>Introduction to Cybersecurity</h3>
                <p>Cisco Networking Academy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="activities" className={`section ${visibleSections.activities ? 'visible' : ''}`}>
        <div className="content-box">
          <h2 className="section-title">Leadership & Activities</h2>
          <div className="activities-grid">
            <div className="activity-card" style={{animationDelay: '0s'}}>
              <div className="activity-icon">🛡️</div>
              <h3>President - VJ Garuda Vigilance</h3>
              <p className="activity-org">VNRVJIET</p>
              <p>Leading the cybersecurity club, organizing workshops, awareness programs, and fostering a security-first culture among students.</p>
            </div>
            <div className="activity-card" style={{animationDelay: '0.1s'}}>
              <div className="activity-icon">📋</div>
              <h3>Placement Coordinator</h3>
              <p className="activity-org">2025-2026</p>
              <p>Coordinating campus placement activities, managing student-recruiter interactions, and facilitating career opportunities.</p>
            </div>
            <div className="activity-card" style={{animationDelay: '0.2s'}}>
              <div className="activity-icon">🎪</div>
              <h3>Organizing Team Member</h3>
              <p className="activity-org">TechnoVista - Technical Fest</p>
              <p>Contributed to the successful organization and execution of the technical fest, managing logistics and event coordination.</p>
            </div>
            <div className="activity-card" style={{animationDelay: '0.3s'}}>
              <div className="activity-icon">🎯</div>
              <h3>Organizing Team Member</h3>
              <p className="activity-org">ICAMADA - Technical Fest</p>
              <p>Played a key role in organizing and executing various technical events and activities for the college fest.</p>
            </div>
            <div className="activity-card" style={{animationDelay: '0.4s'}}>
              <div className="activity-icon">🎭</div>
              <h3>Content Head</h3>
              <p className="activity-org">Dramatrix Club at VNRVJIET</p>
              <p>Led content creation and creative direction for the drama club, managing scripts and theatrical productions.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={`section ${visibleSections.contact ? 'visible' : ''}`}>
        <div className="content-box">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-grid">
            <div className="contact-info-large">
              <p className="contact-lead">Let's collaborate on securing the digital world.</p>
              <div className="contact-methods">
                <a href="mailto:hvckari@gmail.com" className="contact-link">
                  <Mail size={24} />
                  <span>hvckari@gmail.com</span>
                </a>
                <a href="tel:+918019252777" className="contact-link">
                  <Phone size={24} />
                  <span>+91 8019252777</span>
                </a>
                <a href="https://www.linkedin.com/in/harsha-vardhan-146181217/" className="contact-link" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={24} />
                  <span>LinkedIn</span>
                </a>
              </div>
              <div className="location">
                <p>📍 Gangaram, Hyderabad, Telangana</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 K Harsha Vardhan Chowdary. Crafted with precision and passion.</p>
      </footer>
      <ChatBot />
    </div>
  );
};

export default Portfolio;