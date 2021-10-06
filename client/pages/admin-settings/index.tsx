import type { NextPage } from 'next';
import Link from 'next/link';

const AdminSettings: NextPage = () => {
  return (
    <>
      <h1>AdminSettings</h1>

      <ul>
        <li>
          <Link href="/admin-settings/manage-info">
            <a>Manage info about house/hood</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default AdminSettings;
