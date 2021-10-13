import { BaseSyntheticEvent, ReactNode, SyntheticEvent, useState } from 'react';
import BottomNavbar from '../bottom-navbar';
import TopNavbar from '../top-navbar';
import styles from './layout.module.scss';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const [value, setValue] = useState('');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClick = (event: BaseSyntheticEvent) => {
    setValue(event.target.value);
  };

  return (
    <>
      <TopNavbar onClick={handleClick} />
      <main className={styles.main}>{children}</main>
      <BottomNavbar value={value} onChange={handleChange} />
    </>
  );
};

export default MainLayout;
