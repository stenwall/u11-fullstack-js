import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Groups, Favorite, Bookmark } from '@mui/icons-material';
import { SyntheticEvent, useState } from 'react';
import Link from 'next/link';

const BottomNavbar = () => {
  const [value, setValue] = useState('home');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const btnLinks = {
    home: (
      <Link href="/info">
        <Home />
      </Link>
    ),
  };

  return (
    <BottomNavigation
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={btnLinks.home}
      />
      <BottomNavigationAction
        color="text"
        label="Groupes"
        value="groupes"
        icon={<Groups />}
      />
      <BottomNavigationAction
        label="Friends"
        value="friends"
        icon={<Favorite />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<Bookmark />}
      />
    </BottomNavigation>
  );
};

export default BottomNavbar;
