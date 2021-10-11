import { useRouter } from 'next/router';
import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { AccountCircle, Search } from '@mui/icons-material';
import Link from 'next/link';
import { useUser } from 'hookes/useUser';

interface Props {
  onClick: any;
}

const TopNavbar = (props: Props) => {
  const { data: currentUser, error: userError } = useUser();

  if (!currentUser) return 'Loading.';

  return (
    <>
      <AppBar position="fixed" onClick={props.onClick}>
        <Toolbar>
          <Link href="/info">
            <Button value="info" sx={{ flexGrow: 1 }} size="large">
              {currentUser && (
                <Link
                  href="/info/[houseId]"
                  as={`/info/${currentUser.house_id}`}
                >
                  <h1>{currentUser.house}</h1>
                </Link>
              )}
            </Button>
          </Link>
          <IconButton
            value="search"
            size="large"
            color="inherit"
            aria-label="search"
          >
            <Search />
          </IconButton>
          {currentUser && (
            <Link href="/profile/[userId]" as={`/profile/${currentUser.id}`}>
              <IconButton value="profile" size="large" aria-label="profile">
                <AccountCircle />
              </IconButton>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopNavbar;
