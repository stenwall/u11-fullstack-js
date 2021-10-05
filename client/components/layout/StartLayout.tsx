import type { ReactNode } from 'react';
import styles from './layout.module.scss';

interface Props {
  children: ReactNode;
}

const StartLayout = ({ children }: Props) => {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default StartLayout;
