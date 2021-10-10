import useSWR from 'swr';
import { getPosts } from 'services/post.service';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import type { NextPageWithLayout } from 'next';
import {
  Avatar,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { ReactNode } from 'react';
import { colorByString } from 'helpers/color-by-string';

interface Props {}

const fetcher = async () => {
  const data = await getPosts();
  return data;
};

const Feed: NextPageWithLayout = (props: Props) => {
  const { data, error } = useSWR('posts', fetcher);

  if (error) return 'An error has occured.';
  if (!data) return 'Loading.';

  return (
    <div className="feed-wrapper">
      <List>
        {data.map(({ _id, body, user_id }: any) => (
          <ListItem button key={_id} divider alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Profile Picture"
                sx={{
                  bgcolor: colorByString(user_id.firstname + user_id.lastname),
                }}
              >
                {user_id.firstname[0] + user_id.lastname[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${user_id.firstname} ${user_id.lastname}`}
              secondary={body}
            />
          </ListItem>
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
