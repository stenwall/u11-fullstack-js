import type { NextPage } from 'next';
import Link from 'next/link';

const Register: NextPage = () => {
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

export default Register;
