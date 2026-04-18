import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import './App.css';
import profilePic from './harsha.jpeg';

const Portfolio = () => {
  const [logs, setLogs] = useState(["[+] Monitoring network..."]);

  // Fake logs
  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        "[+] Incoming connection detected",
        "[!] SQL Injection blocked",
        "[+] Nmap scan detected",
        "[✓] Firewall active"
      ];
      const random = messages[Math.floor(Math.random() * messages.length)];
      setLogs(prev => [...prev.slice(-4), random]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="portfolio-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <img src={profilePic} alt="profile" className="profile-image" />
          <h1 className="hero-title">K HARSHA VARDHAN CHOWDARY</h1>
          <p className="hero-subtitle">
            root@harsha:~# Cybersecurity Engineer | Ethical Hacker
          </p>
          <div className="hero-tagline">
            <Shield /> Securing Digital Frontiers
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="content-box">
          <h2 className="section-title">About Me</h2>

          <p>
            Enthusiastic Cyber Security student skilled in scripting and real-world
            cybersecurity solutions.
          </p>

          <div className="terminal-box">
            <p>$ whoami</p>
            <p>harsha - cybersecurity engineer</p>
            <p>$ skills</p>
            <p>network security | ethical hacking | SIEM | IoT security</p>
          </div>

          <h3>CGPA: 7.21</h3>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <div className="content-box">
          <h2 className="section-title">Experience</h2>

          <h3>Cyber Security Analyst Intern</h3>
          <p>SSEV SOFTSOLS | 2026</p>

          <p>
            Secured ESP32, Raspberry Pi, and Jetson systems with vulnerability
            assessment, system hardening, and network monitoring.
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="content-box">
          <h2 className="section-title">Projects</h2>

          <p>Phishing Detection System (ML)</p>
          <p>DDoS Detection System (MOTAG)</p>
          <p>Memory Forensics Investigation</p>
          <p>Automated Vulnerability Scanner</p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="content-box">
          <h2 className="section-title">Skills</h2>

          <p>Python, C, Java, SQL</p>
          <p>Wireshark, Nmap, Burp Suite, SIEM</p>
          <p>Linux, IDS/IPS, Network Security</p>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="section">
        <div className="content-box">
          <h2 className="section-title">Certifications</h2>

          <ul>
            <li>EC-Council Cloud Computing</li>
            <li>IIT Roorkee Cyber Security Program</li>
            <li>Cisco Cybersecurity</li>
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="content-box">
          <h2 className="section-title">Contact</h2>

          <p>📞 +91 8019252777</p>
          <p>📧 hvckari@gmail.com</p>
          <p>📍 Hyderabad</p>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="section">
        <div className="content-box">
          <h2 className="section-title">Cyber Threat Dashboard</h2>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Threat Level</h3>
              <p className="threat-high">HIGH</p>
            </div>

            <div className="dashboard-card">
              <h3>Active Connections</h3>
              <p>128 Devices</p>
            </div>

            <div className="dashboard-card">
              <h3>Blocked Attacks</h3>
              <p>342</p>
            </div>

            <div className="dashboard-card">
              <h3>Firewall Status</h3>
              <p className="status-active">ACTIVE</p>
            </div>
          </div>

          <div className="terminal-box">
            {logs.map((log, i) => (
              <p key={i}>{log}</p>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Portfolio;