import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';

const Info: NextPageWithLayout = () => {
  return (
    <>
      <h1>Info</h1>

      <ul>
        <li>
          <Link href="/members">
            <a>Members of house/hood</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

Info.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default Info;
