import { useRouter } from 'next/router';
import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { AccountCircle, HomeWork, Search } from '@mui/icons-material';
import Link from 'next/link';
import { useUser } from 'hookes/useUser';
import SearchBar from 'components/search-bar';

interface Props {
  onClick: any;
}

const TopNavbar = (props: Props) => {
  const { data: currentUser, error: userError } = useUser();

  if (!currentUser) return <p>Loading...</p>;

  return (
    <>
      <AppBar position="fixed" onClick={props.onClick}>
        <Toolbar>
          <SearchBar />
          {currentUser && (
            <div>
              <Link href="/info/[houseId]" as={`/info/${currentUser.house_id}`}>
                <IconButton
                  value="house-info"
                  size="large"
                  aria-label="house-info"
                >
                  <HomeWork />
                </IconButton>
              </Link>
              <Link href="/profile/[userId]" as={`/profile/${currentUser.id}`}>
                <IconButton value="profile" size="large" aria-label="profile">
                  <AccountCircle />
                </IconButton>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopNavbar;
