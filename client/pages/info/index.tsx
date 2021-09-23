import type { NextPage } from 'next';
import Link from 'next/link';

const Info: NextPage = () => {
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

export default Info;
