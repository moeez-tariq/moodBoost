// src/App.js
// import all the necessary dependencies
import React, { useState } from 'react';
import './App.css';
import MoodSelector from './MoodSelector';
import MoodContent from './MoodContent';

function App() { // App component
  // define state variables and initialize them
  const [tab, setTab] = useState("joke");
  const [category, setCategory] = useState("happiness");
  const [content, setContent] = useState("");

  const fetchContent = async () => {
    setContent("Loading..."); // show loading message

    try {
      let response;
      // if tab is joke, fetch a joke
      if (tab === "joke") {
        // Fetch a joke
        response = await fetch("https://official-joke-api.appspot.com/random_joke");
        if (!response.ok) {
          throw new Error("Error fetching joke");
        }
        const jokeData = await response.json();
        setContent(`${jokeData.setup} - ${jokeData.punchline}`); // set the joke content
      } else if (tab === "motivation") { // if tab is motivation, fetch a motivational quote
        // Fetch a motivational quote
        const apiKey = process.env.REACT_APP_QUOTE_API_KEY; // get API key from .env
        const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`; // category is set by user
        
        response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'X-Api-Key': apiKey  // set the API key in the header
          }
        });

        if (!response.ok) {
          throw new Error("Error fetching quote");
        }

        const quoteData = await response.json();
        if (quoteData.length > 0) {
          setContent(`"${quoteData[0].quote}" - ${quoteData[0].author}`); // use the first quote returned
        } else {
          setContent("No quotes found for this category.");
        }
      }
    } catch (error) {
      console.error(error);
      setContent("Error fetching content, please try again later.");
    }
  };

  return ( // render the App component
    <div className="App">
      <h1>Mood Boost</h1>
      <MoodSelector 
        tab={tab} 
        setTab={setTab} 
        setCategory={setCategory}  
        fetchContent={fetchContent} 
        category={category} // pass category here
      />
      <button onClick={fetchContent} className="fetch-button">
        Get {tab === "joke" ? "Joke" : "Motivation"}
      </button>
      <MoodContent content={content} />
    </div>
  );
}

export default App; // export the App component
