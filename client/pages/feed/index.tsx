import useSWR from 'swr';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import type { NextPageWithLayout } from 'next';
import { Fab, List } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { ReactNode } from 'react';
import FeedView from 'components/FeedView';

const Feed: NextPageWithLayout = () => {
  const { data: posts, error } = useSWR('/posts');

  if (error) return 'An error has occured.';
  if (!posts) return 'Loading.';

  return (
    <div className="feed-wrapper">
      <List>
        {posts && posts.map(({ _id, body, user_id, createdAt }: any) => (
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
