import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CheckboxFacet from './CheckboxFacet/CheckboxFacet';

// Styled components using basic HTML elements to reduce bundle size
const FacetBox = styled('div')(() => ({
  height: '100%',
  boxShadow: 'none',
  backgroundColor: 'transparent',
  borderRadius: 0,
}));

const FilterList = styled('ul')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '8px 0',
  margin: 0,
  listStyle: 'none',
}));

// Custom lightweight chip component instead of MUI Chip
const StyledChip = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  height: '32px',
  margin: '4px',
  padding: '0 12px',
  fontSize: '0.8125rem',
  backgroundColor: '#e0e0e0',
  borderRadius: '16px',
  cursor: 'default',
  '&:hover': {
    backgroundColor: '#bdbdbd',
  },
}));

const ChipLabel = styled('span')(() => ({
  padding: '0 8px 0 0',
}));

const ChipDeleteButton = styled('button')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  padding: 0,
  fontSize: '14px',
  lineHeight: 1,
  color: '#666',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
}));

const FacetList = styled('nav')(() => ({
  marginTop: '32px',
  padding: 0,
}));

export default function Facets(props) {

    function mapFacetName(facetName) {
        const capitalizeFirstLetter = (string) =>
            string[0] ? `${string[0].toUpperCase()}${string.substring(1)}` : '';
        facetName = facetName.trim();
        facetName = capitalizeFirstLetter(facetName);

        facetName = facetName.replace('_', ' ');
        return facetName;
    }

    function addFilter(name, value) {
        const newFilters = props.filters.concat({ field: name, value: value });
        props.setFilters(newFilters);
    }

    function removeFilter(filter) {      
        const newFilters = props.filters.filter((item) => item.value !== filter.value);
        props.setFilters(newFilters);
    }

    var facets;
    try {
        facets = Object.keys(props.facets).map(key => {
            return <CheckboxFacet 
                key={key}
                name={key} 
                values={props.facets[key]}
                addFilter={addFilter}
                removeFilter={removeFilter}
                mapFacetName={mapFacetName}
                selectedFacets={props.filters.filter(f => f.field === key)}
            />;
        });
    } catch (error) {
        console.log(error);
    }

    const filters = props.filters.map((filter, index) => {
        return (
            <li key={index}>
                <StyledChip>
                    <ChipLabel>{`${mapFacetName(filter.field)}: ${filter.value}`}</ChipLabel>
                    <ChipDeleteButton onClick={() => removeFilter(filter)}>×</ChipDeleteButton>
                </StyledChip>
            </li>
        );
    });

    return (
        <Box className="mui-facets-isolation-wrapper" sx={{ height: '100%' }}>
            <FacetBox>
                <div id="clearFilters" style={{ padding: '8px 16px' }}>
                    <FilterList>
                        {filters}
                    </FilterList>
                </div>
                <FacetList>
                    {facets}
                </FacetList>    
            </FacetBox>
        </Box>
    );
}