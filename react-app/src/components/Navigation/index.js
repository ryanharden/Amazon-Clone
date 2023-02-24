import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import flag from "../../assets/american-flag.png";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation();
	const currentRoute = window.location.pathname;
	const { userId } = useParams();

	return (
		<div className="nav-bar-container">
			<div className="nav-bar">
				<div className="header-left">
					<div className="logo">
						<Link className="nav-bar-nav-link" exact to="/">
							Rainforest Retail
						</Link>
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
								<img className="flag" src={flag} alt="flag" />
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
