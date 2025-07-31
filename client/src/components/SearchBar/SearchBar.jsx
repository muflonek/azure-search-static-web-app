import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import fetchInstance from '../../url-fetch';
import './SearchBarIsolation.css';

// Using styled HTML elements instead of MUI components to reduce bundle size
const SearchContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  width: '100%',
}));

const SearchBox = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));

// Custom lightweight autocomplete implementation
const SearchInput = styled('input')(() => ({
  width: '100%',
  padding: '10px 14px',
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  outline: 'none',
  '&:focus': {
    borderColor: '#1976d2',
    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
  }
}));

const SuggestionList = styled('ul')(() => ({
  position: 'absolute',
  zIndex: 1000,
  background: 'white',
  width: '100%',
  maxHeight: '200px',
  overflowY: 'auto',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

const SuggestionItem = styled('li')(() => ({
  padding: '8px 14px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5'
  }
}));

const SearchButton = styled('button')(() => ({
  marginLeft: '8px',
  height: '40px',
  padding: '0 16px',
  backgroundColor: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 500,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#1565c0'
  }
}));

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