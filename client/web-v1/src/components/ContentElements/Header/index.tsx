import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Fulfillment } from './type';
import Button from '../../ReusableElements/Button';
import useStores from '../../../hooks/useStores';
import styles from './index.module.scss';

/* TODO : should we use enum type for text or not? */
const routes = [
  { path: '/', text: 'Gravimetric' },
  { path: '/picking', text: Fulfillment.Picking },
  { path: '/packing', text: Fulfillment.Packing },
  { path: '/delivery', text: Fulfillment.Delivery },
];

const Header: React.FunctionComponent = (): JSX.Element => {
  const { authStore } = useStores();

  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div>
          <p className={styles.logo}>
            <Link to={routes[0].path}>{routes[0].text}</Link>
          </p>
        </div>
        <div>
          <nav>
            <ul>
              {routes.slice(1).map((route) => {
                return (
                  <li key={route.path}>
                    <NavLink to={route.path} className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
                      {route.text}
                    </NavLink>
                  </li>
                );
              })}
              <li>
                <Button className={styles.signOutBtn} type={'button'} clickHandler={authStore.signOut}>
                  Sign Out
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
