import React, {
} from 'react';
import {
	NavLink
} from 'react-router-dom'
import sty from './sidebar.module.css'
export default function SideBar() {
	return (
        <nav className={sty.nav}>
		<div className={sty.logoGroup}>
			<img src="https://discord.com/assets/559c3311dcdb3f23b7fb745559207db9.svg" className={sty.logo} alt="" />
			<h2 className={sty.logoText}>GenericPlayer</h2>
		</div>
		<NavLink to="/search" className={sty.link + ' ' + sty.padbottom} activeClassName={sty.active}><i className='bx bx-search' />Search</NavLink>
		<NavLink exact to="/" className={sty.link} activeClassName={sty.active}><i className='bx bxs-home' />Home</NavLink>
		<NavLink to="/trending" className={sty.link + ' ' + sty.padbottom} activeClassName={sty.active}><i className='bx bxs-bar-chart-alt-2' />Trending</NavLink>
		<NavLink to="/favorites" className={sty.link} activeClassName={sty.active}><i className='bx bxs-star' />Favorites</NavLink>
		<NavLink to="/playlists" className={sty.link} activeClassName={sty.active}><i className='bx bxs-playlist' />My Playlists</NavLink>
		<NavLink to="/stations" className={sty.link} activeClassName={sty.active}><i className='bx bx-station' />My Stations</NavLink>
        </nav>
    );
}