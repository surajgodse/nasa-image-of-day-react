import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'YhAZrbni4E0WJ0kzTJFfIRReyMLEGHtJRXYDugP1'; // Replace with your actual API key
const API_URL = 'https://api.nasa.gov/planetary/apod';

function SpaceImage() {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImageData = async (date = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          date: date,
        },
      });
      setImageData(response.data);
    } catch (err) {
      setError('Failed to fetch image data. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  const handleRandomDate = () => {
    const start = new Date(1995, 5, 16); // APOD started on June 16, 1995
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const formattedDate = randomDate.toISOString().split('T')[0];
    fetchImageData(formattedDate);
  };

  const handleShare = () => {
    if (imageData) {
      navigator.clipboard.writeText(imageData.url)
        .then(() => alert('Image URL copied to clipboard!'))
        .catch(() => alert('Failed to copy URL. Please try again.'));
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!imageData) return null;

  return (
    <div className="space-image">
    <div className="image-info">
      <h2>{imageData.title}</h2>
      <div className="date-container">
        <p>{imageData.date}</p>
      </div>
    </div>
    <div className="image-container">
      <img 
        src={imageData.url} 
        alt={imageData.title}
        onClick={() => window.open(imageData.hdurl || imageData.url, '_blank')}
      />
    </div>
    <div className="image-info">
      <div className="details-container">
        <p className="explanation">{imageData.explanation}</p>
      </div>
      <div className="button-container">
        <button onClick={handleRandomDate}>Load Random Date</button>
        <button onClick={handleShare}>Share</button>
      </div>
    </div>
  </div>
  );
}

export default SpaceImage;