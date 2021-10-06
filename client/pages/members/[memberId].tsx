import { useRouter } from 'next/router';
import type { NextPageWithLayout } from 'next';
import type { ReactNode } from 'react'
import MainLayout from '../../components/layout/MainLayout';

const Member: NextPageWithLayout = () => {
  const router = useRouter();
  const { memberId } = router.query;

  return (
    <>
      <h1>Member: {memberId}</h1>
    </>
  );
};

Member.getLayout = (page: ReactNode) => {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default Member;
