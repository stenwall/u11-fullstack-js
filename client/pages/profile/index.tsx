import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import MainLayout from '../../components/layout/MainLayout';
import Link from 'next/link';

const UserProfile: NextPageWithLayout = () => {

  return (
    <>
      <h1>User profile</h1>

      <li>
        <Link href="/profile/settings">
          <a>Change profile settings</a>
        </Link>
      </li>
    </>
  );
};

UserProfile.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default UserProfile;
