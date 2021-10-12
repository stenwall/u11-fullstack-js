import type { NextPageWithLayout } from 'next';
import { ReactNode } from 'react';
import useSWR from 'swr';
import MainLayout from 'components/layout/MainLayout';
import Link from 'next/link';
import {
  Avatar,
  Button,
  Divider,
  List,
  Paper,
  Typography,
} from '@mui/material';
import { Settings } from '@mui/icons-material';
import { colorByString } from 'helpers/color-by-string';
import User from 'types/user.type';
import FeedView from 'components/FeedView';
import { useRouter } from 'next/router';
import { useUser } from 'hookes/useUser';
import Post from 'types/post.type';

const UserProfile: NextPageWithLayout = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: currentUser, error: currUserErr } = useUser();
  const { data: user, error: userError } = useSWR<User>(
    () => `/users/${userId}`
  );
  const { data: posts, error: postsError } = useSWR<Post[]>(
    () => `/users/${userId}/posts`
  );

  if (!user) return 'Loading.';

  const date = new Date(user.createdAt).toLocaleDateString();

  return (
    <div className="profile-wrapper">
      <Paper elevation={0}>
        <Avatar
          sx={{
            bgcolor: colorByString(user.firstname + user.lastname),
          }}
        >
          {user.firstname[0] + user.lastname[0]}
        </Avatar>
        <div>
          <Typography variant="h5" component="h2" gutterBottom>
            {user.firstname}
            <br />
            {user.lastname}
          </Typography>
          <Typography variant="subtitle2">member since {date}</Typography>
        </div>
      </Paper>
      {currentUser && currentUser._id === user._id && (
        <Link href="/profile/settings">
          <Button color="info" variant="contained" startIcon={<Settings />}>
            Change settings
          </Button>
        </Link>
      )}
      {user.desc && <Paper elevation={0}>{user.desc}</Paper>}
      <Paper elevation={0} className="user-posts">
        <List>
          <Divider />
          {posts &&
            posts.map(({ _id, body, user_id, createdAt }: any) => (
              <FeedView
                key={_id}
                colorString={user_id.firstname + user_id.lastname}
                initials={user_id.firstname[0] + user_id.lastname[0]}
                firstname={user_id.firstname}
                lastname={user_id.lastname}
                createdAt={createdAt}
                post={body}
              />
            ))}
        </List>
      </Paper>
    </div>
  );
};

UserProfile.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default UserProfile;