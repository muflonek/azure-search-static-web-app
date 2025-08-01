import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// App shell components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

// React Router page components
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import Details from '../pages/Details/Details';

// Styled components
import { AppContainer } from './styled';

// Types
interface AuthUser {
  clientPrincipal?: {
    userId: string;
    userRoles: string[];
    claims: Array<{typ: string, val: string}>;
    identityProvider: string;
    userDetails: string;
  };
}

export default function App(): React.ReactElement {
  // React Hook: useState with a var name, set function, & default value
  const [user, setUser] = useState<AuthUser>({});

  // Fetch authentication API & set user state
  async function fetchAuth(): Promise<void> {
    try {
      const response = await fetch("/.auth/me");
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const authData: AuthUser = await response.json();
          setUser(authData);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  }

  // React Hook: useEffect when component changes
  // Empty array ensure this only runs once on mount
  useEffect(() => {
    fetchAuth()
  }, []);

  return (
      <AppContainer className="container-fluid">
        <AppHeader />
        <BrowserRouter>
          <Routes>
            <Route path={`/`} element={<Home />} />
            <Route path={`/search`} element={<Search />} />
            <Route path={`/details/:id`} element={<Details />}/>
            <Route path={`*`} element={<Home />} />
          </Routes>
        </BrowserRouter>
        {<AppFooter />}
      </AppContainer>
  );
}
