// src/App.js
import React, { useState } from 'react';
import './App.css';
import MoodSelector from './MoodSelector';
import MoodContent from './MoodContent';

function App() {
  const [tab, setTab] = useState("joke");
  const [category, setCategory] = useState("happiness");
  const [content, setContent] = useState("");

  const fetchContent = async () => {
    setContent("Loading...");

    try {
      let response;
      if (tab === "joke") {
        // Fetch a joke
        response = await fetch("https://official-joke-api.appspot.com/random_joke");
        if (!response.ok) {
          throw new Error("Error fetching joke");
        }
        const jokeData = await response.json();
        setContent(`${jokeData.setup} - ${jokeData.punchline}`);
      } else if (tab === "motivation") {
        // Fetch a motivational quote
        const apiKey = process.env.REACT_APP_QUOTE_API_KEY; // Get API key from .env
        const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
        
        response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'X-Api-Key': apiKey
          }
        });

        if (!response.ok) {
          throw new Error("Error fetching quote");
        }

        const quoteData = await response.json();
        if (quoteData.length > 0) {
          setContent(`"${quoteData[0].quote}" - ${quoteData[0].author}`); // Use the first quote returned
        } else {
          setContent("No quotes found for this category.");
        }
      }
    } catch (error) {
      console.error(error);
      setContent("Error fetching content, please try again later.");
    }
  };

  return (
    <div className="App">
      <h1>Mood Boost</h1>
      <MoodSelector 
        tab={tab} 
        setTab={setTab} 
        setCategory={setCategory} 
        fetchContent={fetchContent} 
        category={category} // Pass category here
      />
      <button onClick={fetchContent} className="fetch-button">
        Get {tab === "joke" ? "Joke" : "Motivation"}
      </button>
      <MoodContent content={content} />
    </div>
  );
}

export default App;
