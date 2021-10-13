import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import House from 'types/house.type';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import User from 'types/user.type';
import FeedView from 'components/feed-view';
import { colorByString } from 'helpers/color-by-string';
import ListUserView from 'components/user-list-view';
import ListAccordion from 'components/user-accordion';

const Info: NextPageWithLayout = () => {
  const router = useRouter();
  const { houseId } = router.query;
  const { data: house, error: houseErr } = useSWR<House>(
    () => `/house/${houseId}/members`
  );

  if (!house) return 'Loading...';

  const date = new Date(house.createdAt).getFullYear();

  return (
    <>
      <div className="house-wrapper">
        <div>
          <Typography variant="h5" component="p">
            Your house
          </Typography>
          <Typography variant="h2" component="h2">
            {house.name}
          </Typography>
          <Typography variant="h6" component="p">
            since<span>{` ${date}`}</span>
          </Typography>
        </div>
        <Paper elevation={0} className="house-desc">
          {house.desc && house.desc}
          {!house.desc && 'No description of this house yet...'}
        </Paper>
        <ListAccordion id="admin-list" header="Admins">
          {house.admins.map(({ _id, firstname, lastname, createdAt }: User) => (
            <ListUserView
              key={_id}
              firstname={firstname}
              lastname={lastname}
              createdAt={createdAt}
            />)
          )}
        </ListAccordion>
        <ListAccordion id="members-list" header="Members">
          {house.members.map(({ _id, firstname, lastname, createdAt }: User) => (
            <ListUserView
              key={_id}
              firstname={firstname}
              lastname={lastname}
              createdAt={createdAt}
            />)
          )}
        </ListAccordion>
      </div>
    </>
  );
};

Info.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Info;
