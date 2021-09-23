import type { NextPage } from 'next';
import Link from 'next/link';

const Login: NextPage = () => {
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

export default Login;
