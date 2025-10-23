import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreatePortfolio.css'; // Reuse the same CSS

function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profiles');
        setProfiles(response.data);
        if (response.data.length > 0) {
          setSelectedProfileId(response.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (selectedProfileId) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get('http://localhost:3001/messages');
          const filteredMessages = response.data.filter(msg => msg.profileId === selectedProfileId);
          setMessages(filteredMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedProfileId]);

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`http://localhost:3001/messages/${messageId}`);
        setMessages(messages.filter(msg => msg.id !== messageId));
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("Failed to delete message. Please try again.");
      }
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="create-portfolio-container">
      <h2 style={{textAlign: 'center', marginTop: 0}}>Dashboard - Messages</h2>

      <div className="form-section">
        <h3>Select Portfolio</h3>
        <select
          value={selectedProfileId}
          onChange={(e) => setSelectedProfileId(e.target.value)}
          style={{width: '100%', padding: '0.5rem', marginBottom: '1rem'}}
        >
          {profiles.map(profile => (
            <option key={profile.id} value={profile.id}>
              {profile.hero?.name || 'Unnamed'} - {profile.hero?.title || 'No Title'}
            </option>
          ))}
        </select>
      </div>

      <div className="form-section">
        <h3>Received Messages ({messages.length})</h3>
        {messages.length === 0 ? (
          <p>No messages received yet.</p>
        ) : (
          messages.map(message => (
            <div key={message.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#f9f9f9'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                <h4>{message.name} ({message.email})</h4>
                <button
                  onClick={() => handleDeleteMessage(message.id)}
                  style={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
              <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem'}}>
                Received: {formatDate(message.timestamp)}
              </p>
              <p>{message.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
