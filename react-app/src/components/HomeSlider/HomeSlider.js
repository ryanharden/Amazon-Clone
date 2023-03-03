import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../../store/products';
import { Link } from 'react-router-dom';
import chevleft from "../../assets/chevron-left.png";
import chevright from "../../assets/chevron-right.png";
import './HomeSlider.css';

const HomeSlider = ({ slides }) => {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.Products.allProducts);
    // console.log(allProducts);
    const allProductsArr = Object.values(allProducts);
    // console.log("allProductsArr: ", allProductsArr);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [exploreEssentials, setExploreEssentials] = useState([]);
    const [exclude, setExclude] = useState([]);
    const [excludeYou, setExcludeYou] = useState([]);
    const [forYou, setForYou] = useState([]);

    const filterProducts = (allProducts) => {
        const allProductsArr = Object.values(allProducts);
        if (allProductsArr.length > 1) {
            const categoryProductsArr = allProductsArr.filter(product => product.category === 'Rainforest Basics').slice(0, 4);
            setCategoryProducts(categoryProductsArr);
            const trendingProductsArr = getRandomProducts(4, categoryProductsArr, allProductsArr)
            setTrendingProducts(trendingProductsArr);
            console.log("trendingProducts: ", trendingProducts)
            const excludeArr = [...categoryProductsArr, ...trendingProductsArr]
            setExclude(excludeArr);
            console.log("exclude", exclude)
            const exploreEssentialsArr = getRandomProducts(4, exclude, allProductsArr)
            setExploreEssentials(exploreEssentialsArr);
            const excludeYouArr = [...categoryProducts, ...trendingProducts, ...exploreEssentials]
            setExcludeYou(excludeYouArr)
            console.log("exploreEssentials: ", exploreEssentials);
            const forYouArr = getRandomProducts(4, excludeYou, allProductsArr);
            setForYou(forYouArr)
            return { allProductsArr, categoryProducts: categoryProductsArr, trendingProducts: trendingProductsArr, exploreEssentials: exploreEssentialsArr, forYou: forYouArr }
        }
    };

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [dispatch]);

    useEffect(() => {
        filterProducts(allProducts);
    }, [allProducts]);


    useEffect(() => {
        const timer = setTimeout(() => {
            const nextIndex = (currentIndex + 1) % slides.length;
            setCurrentIndex(nextIndex);
        }, 5000);

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

    // const getRandomProducts = (n, exclude, allProductsArr) => {
    //     console.log("allProductsArr: ", allProductsArr);
    //     const result = [];
    //     const len = allProductsArr.length;
    //     let i = 0;
    //     if (allProductsArr.length) {
    //         while (i < n) {
    //             const product = allProductsArr[Math.floor(Math.random() * len)];
    //             console.log("random-product: ", product);
    //             if (!exclude.includes(product)) {
    //                 result.push(product);
    //                 console.log("resultArr: ", result);
    //                 i++;
    //             }
    //         }
    //         console.log("endResult: ", result);
    //         return result;
    //     }

    // };
    const getRandomProducts = (n, exclude, allProductsArr) => {
        const result = [];
        const len = allProductsArr.length;
        let i = 0;
        while (i < n && result.length < len) {
            const randomIndex = Math.floor(Math.random() * len);
            const product = allProductsArr[randomIndex];
            if (!exclude.includes(product) && !result.includes(product)) {
                result.push(product);
                i++;
            }
        }
        return result;
    };

    const slideStyle = {
        width: '100%',
        height: '600px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].url})`,
        transition: "ease-in-out .5s"
    }

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
                        <div className="card-title">Rainforest Basics</div>
                        <div className="card-image-container">
                            {categoryProducts.map(product => (
                                <div className="card-image" key={product?.id}>
                                    <Link to={`/products/${product.id}`}>
                                        <img className="card-actual-image" src={product?.images[0]?.url} alt={product?.name} />
                                    </Link>
                                    <div className="card-image-info">
                                        <div>{product?.name.substring(0, 20)}...</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="card-title">Selected For You</div>
                        <div className="card-image-container">
                        {forYou.map(product => (
                            <div className="card-image" key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <img className="card-actual-image" src={product?.images[0]?.url} alt={product.name} />
                                </Link>
                                <div className="card-image-info">
                                    <div>{product.name.substring(0, 20)}...</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                    <div className="card-container">
                        <div className="card-title">Trending Products</div>
                        <div className="card-image-container">
                            {trendingProducts.map(product => (
                                <div className="card-image" key={product?.id}>
                                    <Link to={`/products/${product?.id}`}>
                                        <img className="card-actual-image" src={product?.images[0]?.url} alt={product?.name} />
                                    </Link>
                                    <div className="card-image-info">
                                        <div>{product?.name.substring(0, 20)}...</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="card-title">Explore Essentials</div>
                        <div className="card-image-container">
                            {exploreEssentials?.map(product => (
                                <div className="card-image" key={product?.id}>
                                    <Link to={`/products/${product?.id}`}>
                                        <img className="card-actual-image" src={product?.images[0]?.url} alt={product?.name} />
                                    </Link>
                                    <div className="card-image-info">
                                        <div>{product?.name.substring(0, 20)}...</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeSlider;
