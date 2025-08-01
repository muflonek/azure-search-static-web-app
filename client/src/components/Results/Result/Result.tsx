import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  ResultCard,
  ResultImage,
  TitleText
} from './styled.jsx';

export default function Result(props) {
  const title = props.document.original_title || '<NO TITLE>'; 
  
  return (
    <Box className="mui-result-isolation-wrapper">
      <ResultCard>
        <a href={`/details/${props.document.id}`} style={{ 
            textDecoration: 'none',
            display: 'block',
            height: '100%'
          }}>
          {/* Using div with inline styles instead of Box component to reduce bundle size */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Image section - fixed height */}
            <div style={{ height: '150px', marginBottom: '8px' }}>
              <ResultImage 
                src={props.document.image_url} 
                alt={props.document.original_title}
              />
            </div>
            
            {/* Text section - centered in remaining space */}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}>
              <TitleText>
                {title}
              </TitleText>
            </div>
          </div>
        </a>
      </ResultCard>
    </Box>
  );
}
