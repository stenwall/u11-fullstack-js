import type { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import StartLayout from 'components/layout/StartLayout';
import { ReactNode } from 'react';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';

const Start: NextPageWithLayout = () => {
  const router = useRouter();
  const { memberId } = router.query;

  return (
    <div className="index-wrapper">
      <Typography variant="h1">My neck of the woods</Typography>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography color="text.secondary">
            What is this?
          </Typography>
          <Typography variant="body2">
            Explanation goes here.
          </Typography>
        </CardContent>
        {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
      <Stack spacing={3} direction="row">
        <Link href="/register">
          <Button variant="contained" fullWidth>Register</Button>
        </Link>
        <Link href="/login">
          <Button variant="outlined" fullWidth>Login</Button>
        </Link>
      </Stack>
    </div>
  );
};

Start.getLayout = (page: ReactNode) => {
  return <StartLayout>{page}</StartLayout>;
};

export default Start;
