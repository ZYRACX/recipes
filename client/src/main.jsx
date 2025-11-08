import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './page/Login';
import Signup from './page/Signup';
import Account from './page/Account';
import Header from './components/Header.jsx';
import { Browse } from './page/Browse.jsx';
import { Home } from './page/Home.jsx';
import { SearchProvider } from './context/SearchContext.jsx';
import './index.css';
import { AuthProvider } from "./context/AuthContext.jsx";
import Favourites from './page/favourites.jsx';
import { FavouritesProvider } from './context/FavouritesContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <FavouritesProvider>
      <SearchProvider>
        <Header isLoggedIn={!!localStorage.getItem('token')} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/account' element={<Account />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/favourites" element={<Favourites />}/>
        </Routes>
      </SearchProvider>
      </FavouritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
