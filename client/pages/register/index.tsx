import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react';
import StartLayout from '../../components/layout/StartLayout';
import Link from 'next/link';
import { Box, Button, TextField, Typography } from '@mui/material';

const Register: NextPageWithLayout = () => {
  return (
    <>
      <div className="form-wrapper">
        <Typography variant="h4" component="h2">
          Register
        </Typography>

        <Box component="form">
          <TextField id="firstname" label="Firstname" type="text" required />
          <TextField id="lastname" label="Lastname" type="text" required />
          <TextField id="username" label="Username" type="text" required />
          <TextField
            id="desc"
            label="Description"
            placeholder="Describe yourself to your neighbours!"
            rows={4}
            multiline
          />
          <TextField id="email" label="Email" type="email" required />
          <TextField id="pwd" label="Password" type="password" required />
          <TextField
            id="pwd-confirm"
            label="Confirm password"
            type="password"
            required
          />
          {/* <Button variant="contained" type="submit" disableElevation>
          Register
        </Button> */}
          <Button
            href="/feed"
            variant="contained"
            type="submit"
            disableElevation
          >
            Register
          </Button>
          <Typography variant="subtitle1" component="span" gutterBottom>
            Already have an account?{' '}
            <Link href="/login">
              <a>Login.</a>
            </Link>
          </Typography>
        </Box>
        <span>(will take you to feed)</span>
      </div>
    </>
  );
};

Register.getLayout = (page: ReactNode) => {
  return <StartLayout>{page}</StartLayout>;
};

export default Register;
