import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import MainLayout from '../../components/layout/MainLayout';

const UserProfileSettings: NextPageWithLayout = () => {
  return (
    <>
      <h1>User profile settings</h1>

      <p>Actions</p>

      <ul>
        <li>Change name</li>
        <li>Change description</li>
      </ul>
    </>
  );
};

UserProfileSettings.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default UserProfileSettings;
