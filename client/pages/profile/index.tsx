import type { NextPage } from 'next';
import Link from 'next/link';

const UserProfile: NextPage = () => {
  return (
    <>
      <h1>User profile</h1>

      <li>
        <Link href="/profile/settings">
          <a>Change profile settings</a>
        </Link>
      </li>
    </>
  );
};

export default UserProfile;
