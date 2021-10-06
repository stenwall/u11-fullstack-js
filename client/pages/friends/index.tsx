import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import MainLayout from '../../components/layout/MainLayout';

const Friends: NextPageWithLayout = () => {

  return (
    <>
      <h1>Friends</h1>
      <p>This page does not yet exist.</p>
    </>
  );
};

Friends.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default Friends;
