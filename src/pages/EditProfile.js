import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreatePortfolio.css'; // <-- RE-USE THE SAME CSS

function EditProfile() {
  const [formData, setFormData] = useState(null); // Start as null
  const [activeTab, setActiveTab] = useState('hero');
  const [skillInput, setSkillInput] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Fetch the existing data for this profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profiles/${id}`);
        setFormData(response.data);
        // Set the skillInput from the fetched skills array
        if (response.data.skills && Array.isArray(response.data.skills)) {
          setSkillInput(response.data.skills.join(', '));
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, [id]);

  // --- Generic Change Handlers ---
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
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
  const handleArrayChange = (section, index) => (e) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[section]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setFormData(prev => ({ ...prev, [section]: updatedArray }));
  };

  // 2. Handle the 'edit' submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = skillInput.split(',').map(skill => skill.trim()).filter(Boolean);
      const dataToSubmit = { ...formData, skills: skillsArray };

      // Use PUT to update the existing record
      await axios.put(`http://localhost:3001/profiles/${id}`, dataToSubmit);
      navigate(`/portfolio/${id}`); // Go back to the portfolio page
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  // 3. Render the *same* form structure as CreatePortfolio
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
      <h2 style={{textAlign: 'center', marginTop: 0}}>Edit Your Portfolio</h2>

      {/* --- Template Selection --- */}
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
            {formData.testimonials.map((testimonial, index) => (
              <div key={index} className="form-group">
                <h4>Testimonial {index + 1}</h4>
                <input type="text" name="quote" placeholder="Client Quote" value={testimonial.quote} onChange={handleArrayChange('testimonials', index)} />
                <input type="text" name="author" placeholder="Client Name" value={testimonial.author} onChange={handleArrayChange('testimonials', index)} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="form-section">
            <h3>Contact Section</h3>
            <input type="email" name="email" placeholder="Contact Email" value={formData.contact.email} onChange={handleNestedChange('contact')} />
            <input type="tel" name="phone" placeholder="Contact Phone" value={formData.contact.phone} onChange={handleNestedChange('contact')} />
            <input type="text" name="message" placeholder="Prompt Message (e.g., 'Get in touch!')" value={formData.contact.message} onChange={handleNestedChange('contact')} />
            <h4>Social Media Links</h4>
            <input type="url" name="linkedin" placeholder="LinkedIn Profile URL" value={formData.contact.socials?.linkedin || ''} onChange={(e) => {
              const { value } = e.target;
              setFormData(prev => ({
                ...prev,
                contact: {
                  ...prev.contact,
                  socials: {
                    ...prev.contact.socials,
                    linkedin: value
                  }
                }
              }));
            }} />
            <input type="url" name="github" placeholder="GitHub Profile URL" value={formData.contact.socials?.github || ''} onChange={(e) => {
              const { value } = e.target;
              setFormData(prev => ({
                ...prev,
                contact: {
                  ...prev.contact,
                  socials: {
                    ...prev.contact.socials,
                    github: value
                  }
                }
              }));
            }} />
            <input type="url" name="twitter" placeholder="Twitter Profile URL" value={formData.contact.socials?.twitter || ''} onChange={(e) => {
              const { value } = e.target;
              setFormData(prev => ({
                ...prev,
                contact: {
                  ...prev.contact,
                  socials: {
                    ...prev.contact.socials,
                    twitter: value
                  }
                }
              }));
            }} />
          </div>
        )}

        <button type="submit" className="submit-button">Update Portfolio</button>
      </form>
    </div>
  );
}

export default EditProfile;