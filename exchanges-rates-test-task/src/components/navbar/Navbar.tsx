import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import s from './Navbar.module.css';

export const Navbar = () => {

    return (
        <nav className={s.nav} >
            <div className={s.navItem}> 
                <Link  to="/">Exchange rates</Link>
            </div>
            <div className={s.navItem}>
                <Link to="/converter">Converter</Link>
            </div>
        </nav>
    )
}

