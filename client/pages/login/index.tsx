import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import StartLayout from '../../components/layout/StartLayout';
import Link from 'next/link';

const Login: NextPageWithLayout = () => {
  return (
    <>
      <h1>Login</h1>

      <ul>
        <li>
          <Link href="/feed">
            <a>Login (will take you to feed)</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

Login.getLayout = (page: ReactNode) => {
  return (
    <StartLayout>{page}</StartLayout>
  )
}

export default Login;
