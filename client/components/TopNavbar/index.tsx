import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AccountCircle, Search } from '@mui/icons-material';
import Link from 'next/link';
import { Button } from '@mui/material';

interface Props {
  onClick: any;
}

const TopNavbar = (props: Props) => {
  const router = useRouter();
  const { memberId } = router.query;

  return (
    <>
      <Box sx={{ flexGrow: 1 }} onClick={props.onClick}>
        <AppBar position="fixed">
          <Toolbar>
            <Link href="/info">
              <Button
                value="info"
                sx={{ flexGrow: 1 }}
              >
                  Name of house
              </Button>
            </Link>
            <IconButton value="search" size="large" color="inherit" aria-label="search">
              <Search />
            </IconButton>
            <IconButton value="profile" size="large" color="inherit" aria-label="menu">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      {/* <Link href="/profile">
        <a>Your profile</a>
      </Link> */}
    </>
  );
};

export default TopNavbar;
