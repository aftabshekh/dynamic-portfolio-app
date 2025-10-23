import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfileCard.css'; // <-- IMPORT THE CSS

function ProfileCard({ profile, onDelete }) {
  // Use optional chaining (?) for safety, in case data is missing
  const { id, hero, about, skills } = profile;
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the portfolio for ${hero?.name || 'this profile'}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/profiles/${id}`);
        if (onDelete) {
          onDelete(id); // Notify parent component to update the list
        }
        navigate('/'); // Navigate back to professionals list
      } catch (error) {
        console.error("Error deleting profile:", error);
        alert("Failed to delete the portfolio. Please try again.");
      }
    }
  };

  return (
    <div className="profile-card">
      <img
        src={hero?.profileImage || 'https://via.placeholder.com/100'}
        alt={hero?.name}
        className="card-image"
      />
      <h3 className="card-name">{hero?.name || 'No Name'}</h3>
      <p className="card-title">{hero?.title || 'No Title'}</p>
      <p className="card-location">{about?.location || 'No Location'}</p>

      <div className="card-rating">
        ★ 4.8
      </div>

      <p className="card-bio">
        {about?.bio ? about.bio.substring(0, 100) + '...' : 'No bio available.'}
      </p>

      <div className="card-buttons">
        <Link to={`/portfolio/${id}`}>
          <button className="card-button view-button">View Profile</button>
        </Link>
        <Link to={`/edit/${id}`}>
          <button className="card-button edit-button">Edit</button>
        </Link>
        <button className="card-button delete-button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default ProfileCard;