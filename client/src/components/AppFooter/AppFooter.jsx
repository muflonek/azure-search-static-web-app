import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import './AppFooter.css';
import './FooterIsolation.css';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box className="mui-footer-isolation-wrapper">
      {/* Top border separator */}
      <Box 
        sx={{ 
          width: '100%', 
          height: '2px', 
          bgcolor: '#e0e0e0',
          mt: 0
        }}
      />
      
      {/* Spacer */}
      <Box sx={{ height: '40px' }} />
      
      {/* Footer content */}
      <Container maxWidth="lg" sx={{ width: '100%', pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Typography variant="body2" sx={{ color: '#666666', fontSize: '0.85em' }}>
            &copy; {currentYear} Microsoft
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
