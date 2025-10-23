import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard';
import './ProfessionalsList.css'; // <-- IMPORT THE CSS

function ProfessionalsList() {
  const [profiles, setProfiles] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/profiles');
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleDelete = (deletedId) => {
    setProfiles(profiles.filter(profile => profile.id !== deletedId));
  };

  const filteredProfiles = profiles.filter(profile => {
    // Check if hero exists before trying to access title
    const titleMatch = profile.hero?.title?.toLowerCase().includes(filter.toLowerCase()) || false;
    // Check if hero exists before trying to access name
    const nameMatch = profile.hero?.name?.toLowerCase().includes(filter.toLowerCase()) || false;
    // Check if skills exists and is an array
    const skillMatch = Array.isArray(profile.skills) && profile.skills.some(skill =>
      skill.toLowerCase().includes(filter.toLowerCase())
    );
    return titleMatch || nameMatch || skillMatch;
  });

  return (
    <div>
      <header className="professionals-header">
        <h1>Meet Our Professionals</h1>
        <p>Meet the experts shaping the future of tech</p>
      </header>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Search professionals by title or skill..."
          className="search-bar"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="profile-list-container">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} onDelete={handleDelete} />
          ))
        ) : (
          <p>No profiles found.</p>
        )}
      </div>
    </div>
  );
}

export default ProfessionalsList;