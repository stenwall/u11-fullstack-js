import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Feed: NextPage = () => {
  const router = useRouter()
  const { memberId } = router.query;

  return (
    <>
      <h1>Feed</h1>

      <ul>
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
          Remove your own posts
        </li>
      </ul>
    </>
  );
};

export default Feed;
