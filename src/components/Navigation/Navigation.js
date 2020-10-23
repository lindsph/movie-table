import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {

    return (
        <header>
            <nav className={styles.navigation}>
                <ul>
                    <li>
                        {/* dynamically */}
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
        </header>
    );
};

export default Navigation;