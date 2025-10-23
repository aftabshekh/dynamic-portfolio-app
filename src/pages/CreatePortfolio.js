import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreatePortfolio.css'; // <-- IMPORT THE CSS

const initialFormData = {
  template: 'templateA',
  hero: { name: '', title: '', tagline: '', profileImage: '' },
  about: { bio: '', email: '', phone: '', location: '', socials: {} },
  skills: [], 
  services: [
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' }
  ],
  portfolio: [
    { title: '', image: '', description: '' },
    { title: '', image: '', description: '' },
    { title: '', image: '', description: '' }
  ],
  testimonials: [{ quote: '', author: '' }],
  blog: { title: '', summary: '' },
  contact: { message: 'Get in touch!', email: '', phone: '' }
};

function CreatePortfolio() {
  const [formData, setFormData] = useState(initialFormData);
  const [activeTab, setActiveTab] = useState('hero');
  const [skillInput, setSkillInput] = useState(''); // Temp state for skills
  const navigate = useNavigate();

  // Handles top-level changes (e.g., template)
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handles nested changes (e.g., formData.hero.name)
  const handleNestedChange = (section) => (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };

  // Handles array of objects (e.g., services, portfolio)
  const handleArrayChange = (section, index) => (e) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[section]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setFormData(prev => ({ ...prev, [section]: updatedArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = skillInput.split(',').map(skill => skill.trim()).filter(Boolean);
      const dataToSubmit = { ...formData, skills: skillsArray };
      
      await axios.post('http://localhost:3001/profiles', dataToSubmit);
      navigate('/');
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const tabs = [
    { id: 'hero', label: 'Header & Hero' },
    { id: 'about', label: 'About Section' },
    { id: 'skills', label: 'Skills' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Clients & Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="create-portfolio-container">
      
      <div className="template-selection">
        <h3>Choose Your Template</h3>
        <div className="template-cards">
          <div 
            className={`template-card ${formData.template === 'templateA' ? 'active' : ''}`}
            onClick={() => handleChange({ target: { name: 'template', value: 'templateA' } })}
          >
            <h4>Template 1</h4>
            <p>Modern & clean design.</p>
          </div>
          <div 
            className={`template-card ${formData.template === 'templateB' ? 'active' : ''}`}
            onClick={() => handleChange({ target: { name: 'template', value: 'templateB' } })}
          >
            <h4>Template 2</h4>
            <p>Dark split-screen layout.</p>
          </div>
        </div>
      </div>

      <div className="tab-navigation">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        
        {activeTab === 'hero' && (
          <div className="form-section">
            <h3>Hero Section</h3>
            <input type="text" name="name" placeholder="Your Name" value={formData.hero.name} onChange={handleNestedChange('hero')} />
            <input type="text" name="title" placeholder="Your Title (e.g., MERN Developer)" value={formData.hero.title} onChange={handleNestedChange('hero')} />
            <input type="text" name="tagline" placeholder="Short Tagline" value={formData.hero.tagline} onChange={handleNestedChange('hero')} />
            <input type="text" name="profileImage" placeholder="Profile Image URL" value={formData.hero.profileImage} onChange={handleNestedChange('hero')} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="form-section">
            <h3>About Me</h3>
            <textarea name="bio" placeholder="Your Bio" value={formData.about.bio} onChange={handleNestedChange('about')}></textarea>
            <input type="email" name="email" placeholder="Email" value={formData.about.email} onChange={handleNestedChange('about')} />
            <input type="tel" name="phone" placeholder="Phone" value={formData.about.phone} onChange={handleNestedChange('about')} />
            <input type="text" name="location" placeholder="Location (e.g., Seattle, WA)" value={formData.about.location} onChange={handleNestedChange('about')} />
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="form-section">
            <h3>Skills</h3>
            <p>Enter skills separated by a comma (e.g., React, Node.js, CSS)</p>
            <input 
              type="text" 
              name="skills" 
              placeholder="React, Node.js, CSS" 
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="form-section">
            <h3>Services (Top 3)</h3>
            {formData.services.map((service, index) => (
              <div key={index} className="form-group">
                <h4>Service {index + 1}</h4>
                <input type="text" name="title" placeholder="Service Title" value={service.title} onChange={handleArrayChange('services', index)} />
                <textarea name="description" placeholder="Service Description" value={service.description} onChange={handleArrayChange('services', index)}></textarea>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'portfolio' && (
          <div className="form-section">
            <h3>Portfolio Projects (Top 3)</h3>
            {formData.portfolio.map((project, index) => (
              <div key={index} className="form-group">
                <h4>Project {index + 1}</h4>
                <input type="text" name="title" placeholder="Project Title" value={project.title} onChange={handleArrayChange('portfolio', index)} />
                <input type="text" name="image" placeholder="Project Image URL" value={project.image} onChange={handleArrayChange('portfolio', index)} />
                <textarea name="description" placeholder="Project Description" value={project.description} onChange={handleArrayChange('portfolio', index)}></textarea>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="form-section">
            <h3>Testimonials (Up to 3)</h3>
             {/* This only supports one for simplicity. You can map this like services. */}
            <div className="form-group">
              <h4>Testimonial 1</h4>
              <input type="text" name="quote" placeholder="Client Quote" value={formData.testimonials[0].quote} onChange={handleArrayChange('testimonials', 0)} />
              <input type="text" name="author" placeholder="Client Name" value={formData.testimonials[0].author} onChange={handleArrayChange('testimonials', 0)} />
            </div>
          </div>
        )}
        
        {activeTab === 'contact' && (
          <div className="form-section">
            <h3>Contact Section</h3>
            <input type="email" name="email" placeholder="Contact Email" value={formData.contact.email} onChange={handleNestedChange('contact')} />
            <input type="tel" name="phone" placeholder="Contact Phone" value={formData.contact.phone} onChange={handleNestedChange('contact')} />
            <input type="text" name="message" placeholder="Prompt Message (e.g., 'Get in touch!')" value={formData.contact.message} onChange={handleNestedChange('contact')} />
          </div>
        )}

        <button type="submit" className="submit-button">Save Portfolio</button>
      </form>
    </div>
  );
}

export default CreatePortfolio;