import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import MainLayout from '../../components/layout/MainLayout';

const Groupes: NextPageWithLayout = () => {

  return (
    <>
      <h1>Groupes</h1>
      <p>This page does not yet exist.</p>
    </>
  );
};

Groupes.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default Groupes;
