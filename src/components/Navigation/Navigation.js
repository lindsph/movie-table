import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import styles from './Navigation.module.css';

const Navigation = () => {

    return (
        <Header>
            <nav className={styles.navigation}>
                <ul>
                    <li>
                        <NavLink 
                            activeClassName={styles['is-active']}
                            to="/action"
                        >
                        Action
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={styles['is-active']}
                            to="/comedy"
                        >
                            Comedy
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={styles['is-active']}
                            to="/drama"
                        >
                            Drama
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={styles['is-active']}
                            to="/thriller"
                        >
                            Thriller
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </Header>
    );
};

export default Navigation;