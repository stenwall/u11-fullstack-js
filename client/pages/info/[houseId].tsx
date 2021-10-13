import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import House from 'types/house.type';
import { Paper, Typography } from '@mui/material';
import User from 'types/user.type';
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
            <>
              <Link href="/profile/[userId]" as={`/profile/${_id}`}>
                <ListUserView
                  key={_id}
                  firstname={firstname}
                  lastname={lastname}
                  createdAt={createdAt}
                />
              </Link>
            </>
          ))}
        </ListAccordion>
        <ListAccordion id="members-list" header="Members">
          {house.members.map(
            ({ _id, firstname, lastname, createdAt }: User) => (
              <>
                <Link href="/profile/[userId]" as={`/profile/${_id}`}>
                  <ListUserView
                    key={_id}
                    firstname={firstname}
                    lastname={lastname}
                    createdAt={createdAt}
                  />
                </Link>
              </>
            )
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
