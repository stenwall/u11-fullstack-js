import type { NextPageWithLayout } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react'
import MainLayout from '../../components/layout/MainLayout';

const AdminSettings: NextPageWithLayout = () => {
  return (
    <>
      <h1>AdminSettings</h1>

      <ul>
        <li>
          <Link href="/admin-settings/manage-info">
            <a>Manage info about house/hood</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

AdminSettings.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default AdminSettings;
