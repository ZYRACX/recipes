import React, { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import MenuItem from './components/MenuItem.jsx';
import { initialMenuItems } from './data/MenuItems.js';

const App = () => {
  // const [cart, setCart] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <div>
      
    </div>
  );
};

export default App;
