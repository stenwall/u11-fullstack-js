import type { NextPageWithLayout } from 'next';
import { ReactNode, SyntheticEvent, useState } from 'react';
import MainLayout from 'components/layout/MainLayout';
import { createPost } from 'services/post.service';
import { Alert, Box, Snackbar, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import styles from './new-post.module.scss';
import type Post from 'types/post.type';

const NewPost: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false),
        [message, setMessage] = useState(''),
        [open, setOpen] = useState(false);
  const router = useRouter();

  const validationSchema = () => {
    return Yup.object().shape({
      body: Yup.string().required('This field is required.'),
    });
  };

  const handleCreatePost = (data: Post) => {
    setLoading(true);
    createPost(data)
      .then((response) => {
        router.push('/feed');
      })
      .catch((error) => {
        setLoading(false);
        const errorMsg =
          error.res.data.message || error.message || error.toString();
        setMessage(errorMsg);
        setOpen(true);
      });
  };

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleCreatePost,
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
        <Typography className={styles.h2} variant="h4" component="h2">
          Write new post
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="body"
            name="body"
            placeholder="What's on your mind?"
            rows={5}
            multiline
            value={formik.values.body}
            onChange={formik.handleChange}
            error={formik.touched.body && Boolean(formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
            inputProps={{
              'aria-label': 'new-post',
            }}
            required
          />
          <LoadingButton
            variant="contained"
            type="submit"
            disableElevation
            loading={loading}
          >
            Publish post
          </LoadingButton>
        </Box>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

NewPost.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default NewPost;
