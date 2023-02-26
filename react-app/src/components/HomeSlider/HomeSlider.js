import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../../store/products';
import { Link } from 'react-router-dom';
import chevleft from "../../assets/chevron-left.png";
import chevright from "../../assets/chevron-right.png";
import './HomeSlider.css';

const HomeSlider = ({ slides }) => {
    const dispatch = useDispatch();
    // const allProducts = useSelector(state => state.Products.allProducts);
    // console.log(allProducts);
    // const allProductsArr = Object.values(allProducts);
    const [currentIndex, setCurrentIndex] = useState(0);

    // useEffect(() => {
    //     dispatch(getProductsThunk());
    // }, [dispatch]);


    useEffect(() => {
        const timer = setTimeout(() => {
            const nextIndex = (currentIndex + 1) % slides.length;
            setCurrentIndex(nextIndex);
        }, 10000);

        return () => clearTimeout(timer);
    }, [currentIndex, slides.length]);

    const handlePrevSlide = () => {
        const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
    };

    const handleNextSlide = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
    };

    // const getRandomProducts = (n, exclude) => {
    //     const result = [];
    //     const len = allProductsArr.length;
    //     let i = 0;
    //     while (i < n) {
    //         const product = allProductsArr[Math.floor(Math.random() * len)];
    //         if (exclude.indexOf(product) === -1) {
    //             result.push(product);
    //             i++;
    //         }
    //     }
    //     return result;
    // };

    const slideStyle = {
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].url})`,
        transition: "ease-in-out .5s"
    }

    // const categoryProducts = Object.values(allProducts).filter(product => product.category === 'basics').slice(0, 4);
    // const newestProducts = Object.values(allProducts).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4);
    // const trendingProducts = getRandomProducts(4, [...categoryProducts, ...newestProducts]);
    // const exploreEssentials = getRandomProducts(4, [...categoryProducts, ...newestProducts, ...trendingProducts]);

    return (
        <>
        <div className='home-header'>
            <div className='links-bar-wrapper'>
                <Link className='links-bar-link'>All</Link>
                <Link className='links-bar-link'>Books</Link>
                <Link className='links-bar-link'>Clothing, Shoes</Link>
                <Link className='links-bar-link'>Electronics</Link>
                <Link className='links-bar-link'>Home & Kitchen</Link>
                <Link className='links-bar-link'>Rainforest Basics</Link>
                <Link className='links-bar-link'>Sports & Outdoors</Link>
                <Link className='links-bar-link'>Toys</Link>
                <a rel="noreferrer" className='my-links' href="https://www.linkedin.com/in/ryan-harden-0a8b6821a/">LinkedIn</a>
                <a rel="noreferrer" className='my-links' href="https://github.com/ryanharden">Github</a>
            </div>
        </div>
        <div className='slider-image-container' style={slideStyle}>
            <div className='slide-button' onClick={handlePrevSlide}>
                <img className="chev-left" src={chevleft} alt="Previous" />
            </div>
            <div className='slide-button' onClick={handleNextSlide}>
                <img className="chev-right" src={chevright} alt="Next" />
            </div>
            <div className="product-cards-container">
                <div className="card-container">
                    <h2 className="card-title">Rainforest Basics</h2>
                    {/* <div className="card-image-container">
                        {categoryProducts.map(product => (
                            <div className="card-image" key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <img className="card-actual-image" src={product.product_images[0]?.product_image_url} alt={product.name} />
                                </Link>
                                <div className="card-image-info">
                                    <h3>{product.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
                <div className="card-container">
                    <h2 className="card-title">Newest Products</h2>
                    {/* <div className="card-image-container">
                        {newestProducts.map(product => (
                            <div className="card-image" key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <img className="card-actual-image" src={product.product_images[0]?.product_image_url} alt={product.name} />
                                </Link>
                                <div className="card-image-info">
                                    <h3>{product.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
                <div className="card-container">
                    <h2 className="card-title">Trending Products</h2>
                    {/* <div className="card-image-container">
                        {trendingProducts.map(product => (
                            <div className="card-image" key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <img className="card-actual-image" src={product.product_images[0]?.product_image_url} alt={product.name} />
                                </Link>
                                <div className="card-image-info">
                                    <h3>{product.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
                <div className="card-container">
                    <h2 className="card-title">Explore Essentials</h2>
                    {/* <div className="card-image-container">
                        {exploreEssentials.map(product => (
                            <div className="card-image" key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <img className="card-actual-image" src={product.product_images[0]?.product_image_url} alt={product.name} />
                                </Link>
                                <div className="card-image-info">
                                    <h3>{product.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
        </>
    );
};

export default HomeSlider;
