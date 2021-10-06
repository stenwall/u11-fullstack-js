import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react';
import StartLayout from '../../components/layout/StartLayout';
import Link from 'next/link';
import { Box, Button, TextField, Typography } from '@mui/material';

const Login: NextPageWithLayout = () => {
  return (
    <>
      <div className="form-wrapper">
        <Typography variant="h4" component="h2">
          Login
        </Typography>

        <Box component="form">
          <TextField id="email-login" label="Email" type="email" />
          <TextField id="pwd-login" label="Password" type="password" />
          {/* <Button variant="contained" type="submit" disableElevation>
          Login
        </Button> */}
          <Button
            href="/feed"
            variant="contained"
            type="submit"
            disableElevation
          >
            Login
          </Button>
          <Typography variant="subtitle1" component="span" gutterBottom>
            Don't have an account?{' '}
            <Link href="/login">
              <a>Register.</a>
            </Link>
          </Typography>
        </Box>
        <span>(will take you to feed)</span>
      </div>
    </>
  );
};

Login.getLayout = (page: ReactNode) => {
  return <StartLayout>{page}</StartLayout>;
};

export default Login;
