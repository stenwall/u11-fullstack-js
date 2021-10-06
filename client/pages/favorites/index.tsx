import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import MainLayout from '../../components/layout/MainLayout';

const Favorites: NextPageWithLayout = () => {

  return (
    <>
      <h1>Favorites</h1>
      <p>This page does not yet exist.</p>
    </>
  );
};

Favorites.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default Favorites;
