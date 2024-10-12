import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "d9982e9c0b2d4515a449da8bf6dfbaa8";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
        setArticles(response.data.articles.slice(0, 5));
      } catch (err) {
        setError("Failed to fetch news. Please try again later.");
      }
    };
    fetchHeadlines();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <main className={`container ${theme}`}>
      <button className="toggle-button" onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <h1>Latest News</h1>
      {error && <p className="error">{error}</p>}
      <ul className="news-list">
        {articles.map((article, index) => (
          <li key={index} className="news-item">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="news-link"
            >
              <h2>{article.title}</h2>
              <p className="source">{article.source.name}</p>
              <p className="date">
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
