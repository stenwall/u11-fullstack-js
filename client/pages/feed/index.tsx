import useSWR from 'swr';
import { getPosts } from 'services/post.service';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import type { NextPageWithLayout } from 'next';
import { Fab, List } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { ReactNode } from 'react';
import FeedView from 'components/FeedView';

const fetcher = async () => {
  const data = await getPosts();
  return data;
};

const Feed: NextPageWithLayout = () => {
  const { data, error } = useSWR('posts', fetcher);

  if (error) return 'An error has occured.';
  if (!data) return 'Loading.';

  return (
    <div className="feed-wrapper">
      <List>
        {data.map(({ _id, body, user_id }: any) => (
          <FeedView
            key={_id}
            colorString={user_id.firstname + user_id.lastname}
            initials={user_id.firstname[0] + user_id.lastname[0]}
            firstname={user_id.firstname}
            lastname={user_id.lastname}
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
