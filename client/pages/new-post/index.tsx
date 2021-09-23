import type { NextPage } from 'next';
import Link from 'next/link';

const NewPost: NextPage = () => {
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

export default NewPost;
