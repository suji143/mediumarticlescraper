import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [topic, setTopic] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!topic.trim()) {
            setError('Topic is required');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/scraper', { topic });
            setArticles(response.data);
        } catch (err) {
            setError('Failed to fetch articles');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Medium Article Scraper</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic"
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            <h2>{article.title}</h2>
                            <p>{article.author}</p>
                            <p>{new Date(article.date).toLocaleDateString()}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
