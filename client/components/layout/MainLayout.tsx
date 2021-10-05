import type { ReactNode } from 'react';
import BottomNavbar from '../BottomNavbar';
import TopNavbar from '../TopNavbar';
import styles from './layout.module.scss';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <TopNavbar />
      <main className={styles.main}>{children}</main>
      <BottomNavbar />
    </>
  );
};

export default MainLayout;
