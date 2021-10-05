import { useRouter } from 'next/router';
import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AccountCircle, Search } from '@mui/icons-material';
import Link from 'next/link';

interface Props {
  onClick: any;
}

const TopNavbar = (props: Props) => {
  const router = useRouter();
  const { memberId } = router.query;

  return (
    <>
      <AppBar
        position="fixed"
        onClick={props.onClick}
      >
        <Toolbar>
          <Link href="/info">
            <Button
              value="info"
              sx={{ flexGrow: 1 }}
              size="large"
            >
              <h1>Name of house</h1>
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
          <Link href="/profile">
            <IconButton
              value="profile"
              size="large"
              aria-label="profile"
            >
              <AccountCircle />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopNavbar;
