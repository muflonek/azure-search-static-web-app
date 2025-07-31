import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Result from './Result/Result';

// Styled components for MUI isolation
const ResultsContainer = styled(Grid)(() => ({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  width: '100%',
  margin: 'auto',
  '& > *': {
    height: 'auto', // Allow natural height
    alignSelf: 'stretch' // Make each grid item stretch to fill its cell
  }
}));

const ResultsInfo = styled(Typography)(() => ({
  margin: '1em',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
}));

export default function Results(props) {

  let results = props.documents.map((result, index) => {
    return <Result 
        key={index} 
        document={result.document}
      />;
  });

  let beginDocNumber = Math.min(props.skip + 1, props.count);
  let endDocNumber = Math.min(props.skip + props.top, props.count);

  return (
    <Box className="mui-results-isolation-wrapper">
      <ResultsInfo variant="body1">
        Showing {beginDocNumber}-{endDocNumber} of {props.count.toLocaleString()} results for <strong>{props.query}</strong>
      </ResultsInfo>
      <ResultsContainer container spacing={2} justifyContent="center">
        {results}
      </ResultsContainer>
    </Box>
  );
};
