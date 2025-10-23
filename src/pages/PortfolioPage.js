import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Import your two template designs
import TemplateA from '../components/templates/TemplateA';
import TemplateB from '../components/templates/TemplateB';

function PortfolioPage() {
  const [profileData, setProfileData] = useState(null);
  const { id } = useParams(); // Gets the ':id' from the URL

  useEffect(() => {
    // Fetch the specific profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profiles/${id}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    
    if (id) {
      fetchProfile();
    }
  }, [id]); // Re-run this effect if the ID in the URL changes

  if (!profileData) {
    return <div>Loading...</div>;
  }

  // Render the selected template with the fetched data
  if (profileData.template === 'templateA') {
    return <TemplateA data={profileData} />;
  }
  
  if (profileData.template === 'templateB') {
    return <TemplateB data={profileData} />;
  }

  return <TemplateA data={profileData} />; // Default to TemplateA
}

export default PortfolioPage;