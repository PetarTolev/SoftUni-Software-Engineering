import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; Car Market {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;