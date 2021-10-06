import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import MainLayout from '../../components/layout/MainLayout';

const Members: NextPageWithLayout = () => {
  return (
    <>
      <h1>Members</h1>
    </>
  );
};

Members.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default Members;
