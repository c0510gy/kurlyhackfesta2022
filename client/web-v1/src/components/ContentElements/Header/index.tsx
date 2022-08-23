import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../../ReusableElements/Button';
import useStores from '../../../hooks/useStores';
import styles from './index.module.scss';
import { Fulfillment } from '../../../stores/event/type';
import { RoutesType } from './type';

/* TODO : should we use enum type for text or not? */
const routes: RoutesType[] = [
  { path: '/', text: 'Gravimetric' },
  { path: '/picking', text: Fulfillment.picking },
  { path: '/packing', text: Fulfillment.packing },
  { path: '/delivery', text: Fulfillment.delivery },
];

const Header: React.FunctionComponent = (): JSX.Element => {
  const { authStore, eventStore } = useStores();

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
                    <NavLink
                      to={route.path}
                      className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                      onClick={() => {
                        eventStore.updateFulfilmentStep(route.text as Fulfillment);
                      }}
                    >
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
