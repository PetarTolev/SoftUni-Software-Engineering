import styles from './MainWrapper.module.scss';

interface MainWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const MainWrapper = ({
  children
}: MainWrapperProps) => {
  return (
    <div className={styles.mainWrapper}>
      {children}
    </div>
  );
}

export default MainWrapper;