import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProductsThunk } from '../../store/products';
import { Link } from 'react-router-dom';
import splashheader1 from "../../assets/amazon-outlet-splash-header.jpg";
import splashheader2 from "../../assets/amazon-clinic-splash-header.jpg";
import splashheader3 from "../../assets/amazon-healthcare.jpg";
import "./HomePage.css";
import HomeSlider from "../HomeSlider/HomeSlider";
// import Navigation from "../Navigation/index";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allProducts = useSelector(state => state.Products.allProducts);
    const allProductsArr = Object.values(allProducts);
    console.log(allProductsArr);

    const slides = [
        { url: `${splashheader1}`, title: 'splash-1' },
        { url: `${splashheader2}`, title: 'splash-2' },
        { url: `${splashheader3}`, title: 'splash-3' },
        // { url: `${splashheader4}`, title: 'splash-4' }
    ]

    useEffect(() => {
        dispatch(getProductsThunk(allProducts));
    }, [dispatch]);

    const bookProducts = allProductsArr.filter(product => product.category === "book")
    const productsPerPage = 7;
    const numPages = Math.ceil(bookProducts.length / productsPerPage);

    const pages = Array.from({ length: numPages }, (_, i) =>
        bookProducts.slice(i * productsPerPage, (i + 1) * productsPerPage)
    );

    return (
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
                                        onClick={() => history.push(`/products/${product.id}`)}
                                    >
                                        <img
                                            src={product.product_images[0].product_image_url}
                                            alt={product.name}
                                            className="book-carousel-product-image"
                                        />
                                        <div className="book-carousel-product-details">
                                            <p className="book-carousel-product-title">
                                                {product.name}
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
    )
}

export default HomePage;
