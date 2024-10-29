// src/MoodSelector.js
import React from 'react';

// AI helped me divide this into a different file

const MoodSelector = ({ tab, setTab, setCategory, category }) => {
  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (newTab === "motivation") {
      setCategory("happiness"); // Reset to default category
    }
  };

  const categories = [
    "age", "alone", "amazing", "anger", "architecture",
    "art", "attitude", "beauty", "best", "birthday",
    "business", "car", "change", "communication", "computers",
    "cool", "courage", "dad", "dating", "death",
    "design", "dreams", "education", "environmental", "equality",
    "experience", "failure", "faith", "family", "famous",
    "fear", "fitness", "food", "forgiveness", "freedom",
    "friendship", "funny", "future", "god", "good",
    "government", "graduation", "great", "happiness", "health",
    "history", "home", "hope", "humor", "imagination",
    "inspirational", "intelligence", "jealousy", "knowledge", "leadership",
    "learning", "legal", "life", "love", "marriage",
    "medical", "men", "mom", "money", "morning",
    "movies", "success"
  ];


  return (
    <div className="mood-selector">
      <button onClick={() => handleTabChange("joke")} className={tab === "joke" ? "active" : ""}>
        I need a Joke
      </button>
      <button onClick={() => handleTabChange("motivation")} className={tab === "motivation" ? "active" : ""}>
        I need Motivation
      </button>
      {/* used AI to help change to different categories */}
      {tab === "motivation" && (
        <select onChange={(e) => setCategory(e.target.value)} value={category}> 
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default MoodSelector; // export the mood selector component
