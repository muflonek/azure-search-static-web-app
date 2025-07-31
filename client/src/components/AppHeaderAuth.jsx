import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

// React Context for Auth
import { useAuth } from '../AuthContext';


const AuthWrapper = styled(Box)(({ theme }) => ({
  padding: '4px 8px',
  display: 'flex',
  alignItems: 'center',
  fontFamily: theme.typography.fontFamily,
}));

const UserText = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '0.875rem',
  fontFamily: theme.typography.fontFamily,
}));

const AuthButton = styled(Button)(({ theme }) => ({
  color: 'white',
  textTransform: 'none',
  marginLeft: theme.spacing(1),
  fontFamily: theme.typography.fontFamily,
  '&:hover': {
    cursor: 'pointer',
    textDecoration: 'underline',
    backgroundColor: 'transparent',
  },
}));

export default function AppHeaderAuth() {
  // React Context: User Authentication
  const user = useAuth();
  
  // Extract user details
  const clientPrincipal = (user && user.clientPrincipal) || null;
  const userDetails = (clientPrincipal && clientPrincipal.userDetails) || null;

  return (
    <div className="mui-auth-isolation-wrapper">
      <AuthWrapper>
        {userDetails ? (
          <>
            <UserText>{userDetails}</UserText>
            <AuthButton href="/logout">
              Sign out
            </AuthButton>
          </>
        ) : (
          <AuthButton href="/login">
            Sign in
          </AuthButton>
        )}
      </AuthWrapper>
    </div>
  );
};
