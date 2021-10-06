import { BaseSyntheticEvent, ReactNode, SyntheticEvent, useState } from 'react';
import BottomNavbar from '../BottomNavbar';
import TopNavbar from '../TopNavbar';
import styles from './layout.module.scss';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const [value, setValue] = useState('');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleClick = (event: BaseSyntheticEvent) => {
    console.log(event.target.value)
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
