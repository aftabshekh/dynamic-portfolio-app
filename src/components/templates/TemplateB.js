import React, { useState } from 'react';
import axios from 'axios';
import './TemplateB.css'; // <-- IMPORT THE CSS

function TemplateB({ data }) {
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
  const {
    hero = {},
    about = {},
    skills = [],
    services = []
  } = data;

  return (
    <div className="template-b-container">

      {/* --- Left Column (Info) --- */}
      <div className="template-b-left">
        <img
          src={hero.profileImage || 'https://via.placeholder.com/150'}
          alt={hero.name}
          className="hero-image-b"
        />
        <h1>{hero.name}</h1>
        <h2>{hero.title}</h2>
        <p className="hero-tagline-b">{hero.tagline}</p>

        <div className="contact-info-b">
          <p>📞 {about.phone}</p>
          <p>✉️ {about.email}</p>
          <p>📍 {about.location}</p>
        </div>
      </div>

      {/* --- Right Column (Content) --- */}
      <div className="template-b-right">
        <section className="template-b-section">
          <h3>About Me</h3>
          <p>{about.bio}</p>
        </section>

        <section className="template-b-section">
          <h3>Skills</h3>
          <div className="skills-list-b">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag-b">{skill}</span>
            ))}
          </div>
        </section>

        <section className="template-b-section">
          <h3>Services</h3>
          <div className="services-list-b">
            {services.map((service, index) => (
              <div key={index} className="service-item-b">
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="template-b-section">
          <h3>Portfolio</h3>
          <div className="portfolio-list-b">
            {data.portfolio?.map((project, index) => (
              <div key={index} className="portfolio-item-b">
                <img src={project.image || 'https://via.placeholder.com/300x200'} alt={project.title} />
                <h4>{project.title}</h4>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="template-b-section">
          <h3>Testimonials</h3>
          <div className="testimonials-list-b">
            {data.testimonials?.map((testimonial, index) => (
              <div key={index} className="testimonial-item-b">
                <p>"{testimonial.quote}"</p>
                <h4>- {testimonial.author}</h4>
              </div>
            ))}
          </div>
        </section>

        <section className="template-b-section">
          <h3>Contact</h3>
          <p>{data.contact?.message || 'Get in touch!'}</p>
          <div className="contact-form-b">
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
    </div>
  );
}

export default TemplateB;