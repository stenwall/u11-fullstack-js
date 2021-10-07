import type { NextPageWithLayout } from 'next';
import { ReactNode, SyntheticEvent, useState } from 'react';
import StartLayout from '../../components/layout/StartLayout';
import Link from 'next/link';
import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from 'services/auth.service';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';

const Register: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false),
        [message, setMessage] = useState(''),
        [open, setOpen] = useState(false);
  const router = useRouter();

  const validationSchema = () => {
    return Yup.object().shape({
      firstname: Yup.string()
        .trim()
        .min(2, 'Too short.')
        .max(50, 'Too long.')
        .required('This field is required.'),
      username: Yup.string()
        .trim()
        .min(3, 'Too short.')
        .max(20, 'Too long.')
        .required('This field is required.'),
      lastname: Yup.string()
        .trim()
        .min(2, 'Too short.')
        .max(50, 'Too long.')
        .required('This field is required.'),
      description: Yup.string().notRequired(),
      email: Yup.string()
        .lowercase()
        .trim()
        .email()
        .required('This field is required.'),
      password: Yup.string().required('This field is required.'),
      passwordConfirm: Yup.string()
        .test('equal',
          'Passwords do not match.',
          function(value: any) {
            const ref = Yup.ref('password');
            const res = this.resolve(ref);
            if (value == res) return true
            else return false
          })
        .required('This field is required.'),
    });
  };

  const handleRegister = (data: any) => {
    setLoading(true);
    register(data)
      .then((response) => {
        const resMsg = response.message;
        console.log(resMsg);
        router.push('/login');
      })
      .catch((error) => {
        setLoading(false);
        const errorMsg =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        setMessage(errorMsg);
        setOpen(true);
      });
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      description: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
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
          Register
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="firstname"
            label="Firstname"
            type="text"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
            required
          />
          <TextField
            id="lastname"
            label="Lastname"
            type="text"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
            required
          />
          <TextField
            id="username"
            label="Username"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            required
          />
          <TextField
            id="description"
            label="Description"
            name="description"
            placeholder="Describe yourself to your neighbours!"
            rows={4}
            multiline
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            required
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            required
          />
          <TextField
            id="passwordConfirm"
            label="Confirm password"
            type="password"
            name="passwordConfirm"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
            helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            required
          />
          <LoadingButton variant="contained" type="submit" disableElevation loading={loading}>
            Register
            </LoadingButton>
          <Typography variant="subtitle1" component="span" gutterBottom>
            Already have an account?{' '}
            <Link href="/login">
              <a>Login.</a>
            </Link>
          </Typography>
        </Box>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={message}
      >
        <Alert onClose={handleClose} severity="error">{message}</Alert>
      </Snackbar>
    </>
  );
};

Register.getLayout = (page: ReactNode) => {
  return <StartLayout>{page}</StartLayout>;
};

export default Register;
