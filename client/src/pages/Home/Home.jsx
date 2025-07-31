import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from '../../components/SearchBar/SearchBar';

import "./Home.css";
import "../../pages/Search/Search.css";
import logo from '../../images/cognitive_search.jpg';

export default function Home() {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Prefetch the search page component when the home page loads
  useEffect(() => {
    // Prefetch the Search page component
    const prefetchSearch = () => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = '/src/pages/Search/Search.jsx';
      link.as = 'script';
      document.head.appendChild(link);
    };
    
    // Short delay to prioritize critical resources first
    const timer = setTimeout(() => {
      prefetchSearch();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const navigateToSearchPage = (q) => {
    if (!q || q === '') {
      q = '*'
    }
    navigate('/search?q=' + q);
  }
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="center-container">
    <main className="main main--home">
      <div className="row home-search">
        {/* Add loading="eager" to prioritize image loading and width/height for layout stability */}
        <img 
          className={`logo ${imageLoaded ? 'loaded' : 'loading'}`}
          src={logo} 
          alt="Cognitive Search"
          loading="eager"
          width="400"
          height="350"
          fetchPriority="high"
          onLoad={handleImageLoad}
        />
        
        {/* New row for poweredby and search bar that takes 80% width */}
        <div className="row search-controls-row">
          <p className="poweredby" style={{ textAlign: 'center', width: '100%', marginBottom: '1em' }}>Powered by Azure AI Search</p>
          <SearchBar className="home-search-bar" postSearchHandler={navigateToSearchPage} width="80%"></SearchBar>
        </div>
      </div>
    </main>
    </div>
  );
};
