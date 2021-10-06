import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import MainLayout from '../../components/layout/MainLayout';
import Link from 'next/link';

const NewPost: NextPageWithLayout = () => {
  return (
    <>
      <h1>NewPost</h1>

      <li>
        <Link href="/feed">
          <a>Publish post (will take you to feed)</a>
        </Link>
      </li>
    </>
  );
};

NewPost.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default NewPost;
