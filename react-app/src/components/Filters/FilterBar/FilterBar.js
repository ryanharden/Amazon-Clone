import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./FilterBar.css";

const FilterBar = () => {
    return (
        <div className='links-bar-wrapper'>
            <div className='link-bar-link-container'>
                <Link to={'/allproducts'} className='links-bar-link'>All</Link>
            </div>
            <div className='link-bar-link-container'>
                <Link to={'/Books'} className='links-bar-link'>Books</Link>
            </div>
            <div className='link-bar-link-container'>
                <Link to={'/Clothing,Shoes'} className='links-bar-link'>Clothing, Shoes</Link>
            </div>
            <div className='link-bar-link-container'>
                <Link to={'/Electronics'} className='links-bar-link'>Electronics</Link>
            </div>
            <div className='link-bar-link-container'>
                <Link to={'/Home&Kitchen'} className='links-bar-link'>Home & Kitchen</Link>
            </div>
            <div className='link-bar-link-container'>
                <Link to={'/RainforestBasics'} className='links-bar-link'>Rainforest Basics</Link>
            </div>
            <div className='link-bar-link-container'>
                <Link to={'/Sports&Outdoors'} className='links-bar-link'>Sports & Outdoors</Link>
            </div>
            <div className='link-bar-link-container'>
                <Link to={'/Toys'}className='links-bar-link'>Toys</Link>
            </div>
            <div className='link-bar-link-container'>
                <a target="_blank" rel="noreferrer" className='my-links' href="https://www.linkedin.com/in/ryan-harden-0a8b6821a/">LinkedIn</a>
            </div>
            <div className='link-bar-link-container'>
                <a target="_blank" rel="noreferrer" className='my-links' href="https://github.com/ryanharden">Github</a>
            </div>
        </div>
    )
}
export default FilterBar;
