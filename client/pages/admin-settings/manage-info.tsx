import type { NextPageWithLayout } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react'
import MainLayout from '../../components/layout/MainLayout';

const ManageInfo: NextPageWithLayout = () => {
  return (
    <>
      <h1>ManageInfo</h1>

      <h2>Actions</h2>

      <ul>
        <li>
          Change house name
        </li>
        <li>
          Change house description
        </li>
        <li>
          Generate QR code
        </li>
      </ul>
    </>
  );
};

ManageInfo.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default ManageInfo;
