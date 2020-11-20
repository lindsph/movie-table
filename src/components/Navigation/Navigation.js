import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({allGenres}) => {
    return (
        <header>
            <nav className={styles.navigation}>
                <ul>
                    {allGenres ? allGenres.map((value, index) => {
                        return (
                            <li>
                                <NavLink
                                    activeClassName={styles['is-active']}
                                    to={`/${value}`}
                                    key={index}
                                >
                                    {value}
                                </NavLink>
                            </li>
                    )}) : null}
                </ul>
            </nav>
        </header>
    );
};

export default Navigation;