import type { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import StartLayout from 'components/layout/StartLayout';
import { ReactNode } from 'react';

const Start: NextPageWithLayout = () => {
  const router = useRouter();
  const { memberId } = router.query;

  return (
    <>

      <h1>Start</h1>

      <ul>
        <li>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

Start.getLayout = (page: ReactNode) => {
  return (
    <StartLayout>{page}</StartLayout>
  )
}

export default Start;
