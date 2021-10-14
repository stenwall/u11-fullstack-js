import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';

const AdminFeed: NextPageWithLayout = () => {
  return (
    <>
      <h1>AdminFeed</h1>

      <ul>
        <li>
          <Link href="/admin-settings">
            <a>Admin settings</a>
          </Link>
        </li>
        <li>
          <Link href="/info">
            <a>House/hood info</a>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <a>Your profile</a>
          </Link>
        </li>
        <li>
          <Link href="/new-post">
            <a>Write new post</a>
          </Link>
        </li>
      </ul>

      <h2>Posts</h2>
      <ul>
        <li>
          <Link href="/members/[memberId]" as={'/members/1'}>
            <a>A member's profile</a>
          </Link>
        </li>
        <li>
          <Link href="/members/[memberId]" as={'/members/2'}>
            <a>Another member's profile</a>
          </Link>
        </li>
      </ul>

      <h2>Actions</h2>

      <ul>
        <li>
          Remove posts
        </li>
      </ul>
    </>
  );
};

AdminFeed.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default AdminFeed;
