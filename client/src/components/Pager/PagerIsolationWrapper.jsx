/**
 * This component provides a CSS isolation wrapper for the Pager component
 * to prevent Bootstrap styles from affecting the Material UI components.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Pager from './Pager';
import './PagerIsolation.css';

function PagerIsolationWrapper(props) {
  return (
    <div className="mui-isolation-wrapper">
      <Pager {...props} />
    </div>
  );
}

PagerIsolationWrapper.propTypes = {
  currentPage: PropTypes.number,
  resultCount: PropTypes.number.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default PagerIsolationWrapper;
