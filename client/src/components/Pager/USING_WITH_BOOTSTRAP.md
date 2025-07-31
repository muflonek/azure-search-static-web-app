# Material UI Pager in Bootstrap Environment

This document explains how to use the Material UI-based Pager component in an application that also uses Bootstrap, without styling conflicts.

## Usage Options

You have three main options to ensure the Material UI Pager component isn't affected by Bootstrap styles:

### Option 1: Use the StyledPagination Component (Current Implementation)

The current implementation uses Material UI's `styled` API and `sx` prop for style isolation:

```jsx
import Pager from '../components/Pager/Pager';

function MyComponent() {
  return (
    <Pager 
      currentPage={1}
      resultCount={100}
      resultsPerPage={10}
      onPageChange={(newPage) => console.log(newPage)}
    />
  );
}
```

This approach provides good isolation through Material UI's styling system.

### Option 2: Use the PagerIsolationWrapper

For stronger isolation, you can use the provided PagerIsolationWrapper:

```jsx
import PagerIsolation from '../components/Pager/PagerIsolationWrapper';

function MyComponent() {
  return (
    <PagerIsolation
      currentPage={1}
      resultCount={100}
      resultsPerPage={10}
      onPageChange={(newPage) => console.log(newPage)}
    />
  );
}
```

The isolation wrapper creates a CSS reset boundary that prevents Bootstrap styles from affecting the pagination component.

### Option 3: Use CSS Classes with High Specificity

You can use the custom CSS classes with high specificity:

```jsx
import Pager from '../components/Pager/Pager';

function MyComponent() {
  return (
    <div className="bootstrap-isolation-container">
      <Pager
        currentPage={1}
        resultCount={100}
        resultsPerPage={10}
        onPageChange={(newPage) => console.log(newPage)}
      />
    </div>
  );
}
```

Add this CSS to your application:

```css
/* High-specificity selectors to override Bootstrap */
.bootstrap-isolation-container .mui-only-pager .MuiPagination-ul,
.bootstrap-isolation-container .mui-only-pager .MuiPaginationItem-root {
  /* Reset Bootstrap styles */
}
```

## How These Solutions Work

1. **Styled Components**: Material UI's styling system uses CSS-in-JS which keeps styles scoped to components
2. **CSS Reset**: The isolation wrapper resets inherited styles from Bootstrap
3. **Selector Specificity**: Using specific class names and selectors to override Bootstrap styles

## Best Practices for Mixed UI Libraries

1. Use a consistent component library when possible
2. Use CSS isolation techniques for mixed library components
3. Consider namespacing your CSS classes
4. Use CSS modules or styled-components for better encapsulation
5. Consistently apply one styling approach throughout the application
