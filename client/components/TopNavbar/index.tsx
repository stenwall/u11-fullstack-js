import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AccountCircle, Search } from '@mui/icons-material';

interface Props {}

const TopNavbar = (props: Props) => {
  const router = useRouter();
  const { memberId } = router.query;

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.title || 'Name of house'}
            </Typography>
            <IconButton size="large" color="inherit" aria-label="search">
              <Search />
            </IconButton>
            <IconButton size="large" color="inherit" aria-label="menu">
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
