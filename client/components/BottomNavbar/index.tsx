import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Groups, Favorite, Bookmark } from '@mui/icons-material';
import { SyntheticEvent, useState } from 'react';
import Link from 'next/link';

interface Props {
  value: string;
  onChange: any;
}

const BottomNavbar = (props: Props) => {
  return (
    <BottomNavigation
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      value={props.value}
      onChange={props.onChange}
    >
      <Link href="/feed">
        <BottomNavigationAction value="home" icon={<Home />} />
      </Link>
      <Link href="/groupes">
        <BottomNavigationAction value="groupes" icon={<Groups />} />
      </Link>
      <Link href="/friends">
        <BottomNavigationAction value="friends" icon={<Favorite />} />
      </Link>
      <Link href="/favorites">
        <BottomNavigationAction value="favorites" icon={<Bookmark />} />
      </Link>
    </BottomNavigation>
  );
};

export default BottomNavbar;
