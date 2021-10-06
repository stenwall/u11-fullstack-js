import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import StartLayout from '../../components/layout/StartLayout';
import Link from 'next/link';

const Register: NextPageWithLayout = () => {
  return (
    <>
      <h1>Register</h1>

      <ul>
        <li>
          <Link href="/feed">
            <a>Register (will take you to feed)</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

Register.getLayout = (page: ReactNode) => {
  return (
    <StartLayout>{page}</StartLayout>
  )
}

export default Register;
