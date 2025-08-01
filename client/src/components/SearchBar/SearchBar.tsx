import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import fetchInstance from '../../url-fetch.js';
import {
  SearchContainer,
  SearchBox,
  SearchInput,
  SearchButton,
  SuggestionList,
  SuggestionItem
} from './styles.jsx';

export default function SearchBar({ postSearchHandler, query, width }) {
  const [q, setQ] = useState(() => query || '');
  const [suggestions, setSuggestions] = useState([]);

  const search = (value) => {
    postSearchHandler(value);
  };

  useEffect(() => {
    if (q) {
      const body = { q, top: 5, suggester: 'sg' };

      fetchInstance('/api/suggest', { body, method: 'POST' })
      .then(response => {
        setSuggestions(response.suggestions.map(s => s.text));
      })
      .catch(error => {
        console.log(error);
        setSuggestions([]);
      });
    } else {
      setSuggestions([]);
    }
  }, [q]);

  // Handle enter key in the search field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search(q);
    }
  };

  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  
  // Handle selecting suggestion
  const handleSuggestionClick = (suggestion) => {
    setQ(suggestion);
    search(suggestion);
    setShowSuggestions(false);
  };

  return (
    <Box className="mui-searchbar-isolation-wrapper" sx={{ width: width || 'auto' }}>
      <SearchContainer>
        <SearchBox>
          <div style={{ position: 'relative', width: '100%' }}>
            <SearchInput
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                // Delay to allow click on suggestion
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              onKeyPress={handleKeyPress}
              id="search-box"
              placeholder="What are you looking for?"
              style={{ width: '100%' }}
            />
            {showSuggestions && suggestions.length > 0 && (
              <SuggestionList>
                {suggestions.map((suggestion, index) => (
                  <SuggestionItem 
                    key={`suggestion-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </SuggestionItem>
                ))}
              </SuggestionList>
            )}
          </div>
          <SearchButton onClick={() => search(q)}>
            Search
          </SearchButton>
        </SearchBox>
      </SearchContainer>
    </Box>
  );
}