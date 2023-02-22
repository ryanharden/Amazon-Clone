import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import flag from "../../assets/american-flag.png";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="nav-bar-container">
			<div className="nav-bar">
				<div className="header-left">
					<div className="logo">
						<NavLink className="nav-bar-nav-link" exact to="/">
							Rainforest Retail
						</NavLink>
					</div>
					{/* <div className='deliver-to-address'>
					</div> */}
				</div>
				{/* <div className='search-bar-container'>

				</div> */}
				<div className="header-right">
					{isLoaded && (
						<div className="lang-profile-orders-cart">
							<div className='flag-lang'>
								<img src={flag} alt="flag"/>
								<div className='en'>EN</div>
							</div>
							<div className="profile-button-container">
								<ProfileButton user={sessionUser} />
							</div>
							{/* <div className='orders-button-container'>
							</div> */}
							{/* <div className='cart-button-container'>
							</div> */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navigation;
