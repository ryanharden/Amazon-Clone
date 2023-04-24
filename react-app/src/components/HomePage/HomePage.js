import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { getProductsThunk } from '../../store/products';
import { Link } from 'react-router-dom';
import splashheader1 from "../../assets/amazon-outlet-splash-header.jpg";
import splashheader2 from "../../assets/amazon-clinic-splash-header.jpg";
import splashheader3 from "../../assets/amazon-healthcare.jpg";
import splashheader4 from "../../assets/amazon-card-splash.jpg";
import splashheader5 from "../../assets/amazon-plants-splash.jpg";
import splashheader6 from "../../assets/amazon-furniture-splash.jpg";
import "./HomePage.css";
import HomeSlider from "../HomeSlider/HomeSlider";
// import Navigation from "../Navigation/index";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import chevleft from "../../assets/chevron-left.png";
import chevright from "../../assets/chevron-right.png";


function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allProducts = useSelector(state => state.Products.allProducts);
    const allProductsArr = Object.values(allProducts);
    // console.log(allProductsArr);

    const slides = [
        { url: `${splashheader1}`, title: 'splash-1' },
        { url: `${splashheader2}`, title: 'splash-2' },
        { url: `${splashheader3}`, title: 'splash-3' },
        { url: `${splashheader4}`, title: 'splash-4' },
        { url: `${splashheader5}`, title: 'splash-5' },
        { url: `${splashheader6}`, title: 'splash-6' }

    ]

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [dispatch]);

    const bookProducts = allProductsArr.filter(product => product.category === "Books")
    const phones = allProductsArr.filter(product => product.category === "Cell Phones")
    const computers = allProductsArr.filter(product => product.category === "Computers")

    const phoneComputerArr = [ ...phones, ...computers];
    const productsPerPage = 5;
    const phoneNumPages = Math.ceil(phoneComputerArr.length/ productsPerPage)
    const numPages = Math.ceil(bookProducts.length / productsPerPage);

    const pages = Array.from({ length: numPages }, (_, i) =>
        bookProducts.slice(i * productsPerPage, (i + 1) * productsPerPage)
    );

    const phonePages = Array.from({ length: phoneNumPages }, (_, i) =>
        phoneComputerArr.slice(i * productsPerPage, (i + 1) * productsPerPage)
    );

    return (
        <div className='home-page-wrapper'>
            <div className='home-page-container'>
                <div className='slider-container'>
                    <HomeSlider slides={slides} />
                </div>
                <div className="book-carousel-container">
                    <h2 className="book-carousel-title">Explore Rainforest Books</h2>
                    <Carousel showThumbs={false}>
                        {pages.map((page, i) => (
                            <div key={i}>
                                <div className="book-carousel-slide">
                                    {page.map((product) => (
                                        <div
                                            key={product.id}
                                            className="book-carousel-product"
                                            onClick={() => navigate(`/products/${product.id}`)}
                                        >
                                            <img
                                                src={product?.images[0]?.url}
                                                alt={product.name}
                                                className="book-carousel-product-image"
                                            />
                                            <div className="book-carousel-product-details">
                                                <p className="book-carousel-product-title">
                                                    {product.name.substring(0, 20)}...
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className="phone-computer-carousel-container">
                    <h2 className="phone-computer-carousel-title">Featured in Cell Phones & Computers</h2>
                    <Carousel showThumbs={false}>
                        {phonePages.map((page, i) => (
                            <div key={i}>
                                <div className="phone-computer-carousel-slide">
                                    {page.map((product) => (
                                        <div
                                            key={product.id}
                                            className="book-carousel-product"
                                            onClick={() => navigate(`/products/${product.id}`)}
                                        >
                                            <img
                                                src={product?.images[0]?.url}
                                                alt={product.name}
                                                className="phone-computer-carousel-product-image"
                                            />
                                            <div className="book-carousel-product-details">
                                                <p className="book-carousel-product-title">
                                                    {product.name.substring(0, 20)}...
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
