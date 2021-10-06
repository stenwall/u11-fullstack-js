import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const Member: NextPage = () => {
  const router = useRouter();
  const { memberId } = router.query;

  return (
    <>
      <h1>Member: {memberId}</h1>
    </>
  );
};

export default Member;
