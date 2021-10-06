import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';

const Feed: NextPageWithLayout = () => {
  const router = useRouter()
  const { memberId } = router.query;
  const placeholderList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  return (
    <>
      <h1>Feed</h1>

      <ul>
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
          Remove your own posts
        </li>
      </ul>

      <h2>Placeholder-list for scroll testing</h2>
      <ul>
        {placeholderList.map((item) => (
          <li key={item}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
        ))}
      </ul>
    </>
  );
};

Feed.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default Feed;
