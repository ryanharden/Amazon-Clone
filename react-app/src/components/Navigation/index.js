import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import flag from "../../assets/american-flag.png";
import CartButton from './CartButton/CartButton';
import OrdersButton from './OrdersButton/OrdersButton';
import vector from "../../assets/amazon-vector.png";
import SearchBar from './SearchBar/SearchBar';
import FilterBar from '../Filters/FilterBar/FilterBar';

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
							<div className='rainforest-retail-nav'>
								Rainforest Retail
							</div>
						</Link>
						<Link className="nav-bar-nav-link" exact to="/">
							<img className="vector" src={vector} alt="vector" />
						</Link>
					</div>
					{/* <div className='deliver-to-address'>
					</div> */}
				</div>
				<SearchBar />
				<div className="header-right">
					{isLoaded && (
						<div className="lang-profile-orders-cart">
							<div className='flag-lang'>
								<img className="flag" src={flag} alt="flag" />
								<div className='en'>EN</div>
							</div>
							<ProfileButton user={sessionUser} />
							<OrdersButton />
							<CartButton />
						</div>
					)}
				</div>
			</div>
			<div className='home-header'>
				<FilterBar />
			</div>
		</div>
	);
}

export default Navigation;
