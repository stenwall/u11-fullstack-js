import type { NextPageWithLayout } from 'next';
import { ReactNode, SyntheticEvent, useState } from 'react';
import StartLayout from '../../components/layout/StartLayout';
import Link from 'next/link';
import { Alert, Box, Snackbar, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from 'services/auth.service';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';

const Login: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false),
        [message, setMessage] = useState(''),
        [open, setOpen] = useState(false);
  const router = useRouter();

  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .lowercase()
        .trim()
        .email()
        .required('This field is required.'),
      password: Yup.string().required('This field is required.'),
    });
  };

  const handleLogin = (data: any) => {
    setLoading(true);
    login(data)
      .then((res) => {
        router.push('/feed');
      })
      .catch((error) => {
        setLoading(false);
        const errorMsg = error.res.data.message ||
          error.message || error.toString();
        setMessage(errorMsg);
        setOpen(true);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className="form-wrapper">
        <Typography variant="h4" component="h2">
          Login
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="email-login"
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password-login"
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <LoadingButton
            variant="contained"
            type="submit"
            disableElevation
            loading={loading}
          >
            Login
          </LoadingButton>
          <Typography variant="subtitle1" component="span" gutterBottom>
            Don't have an account?{' '}
            <Link href="/register">
              <a>Register.</a>
            </Link>
          </Typography>
        </Box>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

Login.getLayout = (page: ReactNode) => {
  return <StartLayout>{page}</StartLayout>;
};

export default Login;
