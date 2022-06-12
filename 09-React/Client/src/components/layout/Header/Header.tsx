import styles from './Header.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { Routes } from '../../../routes/routes';
import { useUserContext } from '../../common/context/UserProvider';

const Header = () => {
  const history = useHistory();
  const { user, setUser } = useUserContext();

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    history.push(Routes.offers.getPath());
  }

  return (
    <div className={styles.header}>
      <ul className={styles.mainNav}>
        <li><Link to={Routes.offers.getPath()}>Offers</Link></li>
        {user !== null && (
          <>
            <li><Link to={Routes.myOffers.getPath()}>My Offers</Link></li>
            <li><Link to={Routes.createOffer.getPath()}>Create Offer</Link></li>
          </>
        )}
      </ul>

      <ul className={styles.userNav}>
        {user !== null ? (
          <>
            <li><span>Hello, {user.username}</span></li>
            <li><span className={styles.logout} onClick={handleLogout}>Logout</span></li>
          </>
        ) : (
          <>
            <li><Link to={Routes.login.getPath()}>Login</Link></li>
            <li><Link to={Routes.register.getPath()}>Register</Link></li>
          </>
        )}
      </ul>

    </div>
  );
}

export default Header;