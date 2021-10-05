import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Groups, Favorite, Bookmark } from '@mui/icons-material';
import { SyntheticEvent, useState } from 'react';
import Link from 'next/link';

interface Props {
  value: string;
  onChange: any;
}

const BottomNavbar = (props: Props) => {

  const btnLinks = {
    home: (
      <Link href="/feed">
        <Home />
      </Link>
    ),
    groupes: (
      <Link href="/groupes">
        <Groups />
      </Link>
    ),
    friends: (
      <Link href="/friends">
        <Favorite />
      </Link>
    ),
    favorites: (
      <Link href="/favorites">
        <Bookmark />
      </Link>
    )
  };

  return (
    <BottomNavigation
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      value={props.value}
      onChange={props.onChange}
    >
      <BottomNavigationAction
        value="home"
        icon={btnLinks.home}
      />
      <BottomNavigationAction
        value="groupes"
        icon={btnLinks.groupes}
      />
      <BottomNavigationAction
        value="friends"
        icon={btnLinks.friends}
      />
      <BottomNavigationAction
        value="favorites"
        icon={btnLinks.favorites}
      />
    </BottomNavigation>
  );
};

export default BottomNavbar;
