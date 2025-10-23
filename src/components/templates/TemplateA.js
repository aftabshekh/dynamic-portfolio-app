import React, { useState } from 'react';
import axios from 'axios';
import './TemplateA.css'; // <-- IMPORT THE CSS

function TemplateA({ data }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const messageData = {
        id: Date.now().toString(),
        profileId: data.id,
        ...formData,
        timestamp: new Date().toISOString()
      };

      await axios.post('http://localhost:3001/messages', messageData);
      alert('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  // Use default empty objects/arrays to prevent errors if data is missing
  const {
    hero = {},
    about = {},
    skills = [],
    services = [],
    portfolio = [],
    testimonials = []
  } = data;

  return (
    <div className="template-a-container">

      {/* --- Hero Section --- */}
      <header className="template-a-hero">
        <img
          src={hero.profileImage || 'https://via.placeholder.com/150'}
          alt={hero.name}
          className="hero-image"
        />
        <div className="hero-text">
          <h1>{hero.name}</h1>
          <h2>{hero.title}</h2>
        </div>
        <div className="hero-contact">
          <p>📞 {about.phone}</p>
          <p>✉️ {about.email}</p>
          <p>📍 {about.location}</p>
        </div>
      </header>

      {/* --- Skills Section --- */}
      <section className="template-a-skills">
        <h3>My Skills</h3>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <h4>{skill}</h4>
              <div className="skill-bar">
                <div className="skill-level" style={{ width: '80%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Services Section --- */}
      <section className="template-a-services">
        <h3>My Services</h3>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Portfolio Section --- */}
      <section className="template-a-portfolio">
        <h3>My Portfolio</h3>
        <div className="portfolio-grid">
          {portfolio.map((project, index) => (
            <div key={index} className="portfolio-card">
              <img src={project.image || 'https://via.placeholder.com/300x200'} alt={project.title} />
              <h4>{project.title}</h4>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section className="template-a-testimonials">
        <h3>What My Clients Say</h3>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p>"{testimonial.quote}"</p>
            <h4>- {testimonial.author}</h4>
          </div>
        ))}
      </section>

      {/* --- Contact Section --- */}
      <section className="template-a-contact">
        <h3>Contact Me</h3>
        <p>{data.contact?.message || 'Get in touch!'}</p>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}

export default TemplateA;