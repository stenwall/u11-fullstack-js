import type { NextPage } from 'next';
import Link from 'next/link';

const ManageInfo: NextPage = () => {
  return (
    <>
      <h1>ManageInfo</h1>

      <h2>Actions</h2>

      <ul>
        <li>
          Change house name
        </li>
        <li>
          Change house description
        </li>
        <li>
          Generate QR code
        </li>
      </ul>
    </>
  );
};

export default ManageInfo;
