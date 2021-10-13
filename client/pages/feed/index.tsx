import useSWR from 'swr';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import type { NextPageWithLayout } from 'next';
import { Divider, Fab, List } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { ReactNode } from 'react';
import FeedView from 'components/feed-view';

const Feed: NextPageWithLayout = () => {
  const { data: posts, error } = useSWR('/posts');

  if (error) return 'An error has occured.';
  if (!posts) return 'Loading.';

  return (
    <div className="feed-wrapper">
      <List>
        {posts &&
          posts.map(({ _id, body, user, createdAt }: any) => (
            <>
              <Divider />
              <FeedView
                key={_id}
                colorString={user.firstname + user.lastname}
                initials={user.firstname[0] + user.lastname[0]}
                firstname={user.firstname}
                lastname={user.lastname}
                createdAt={createdAt}
                post={body}
              />
            </>
          ))}
      </List>
      <Fab color="secondary" aria-label="edit">
        <Link href="/new-post">
          <Edit />
        </Link>
      </Fab>
    </div>
  );
};

Feed.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Feed;
