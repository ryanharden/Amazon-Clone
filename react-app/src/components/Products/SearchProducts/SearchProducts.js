import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk, getProductsFilterThunk } from "../../../store/products";
import { Link, useSearchParams } from 'react-router-dom';
import ProductItem from '../ProductItem/ProductItem';
// import "..AllProducts/AllProducts.css";
import FilterBar from '../../Filters/FilterBar/FilterBar';

const SearchProducts = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams()[0];
    const keywordsFromUrl = searchParams.get('k');

    const searchProducts = useSelector(state => state.Products.searchProducts);
    const searchProductsArr = Object.values(searchProducts);


    // useEffect(() => {
    //     async function loadFilteredProducts() {
    //        await dispatch(getProductsFilterThunk(searchParams.get("k")));
    //     }
    //     loadFilteredProducts();
    // }, [dispatch, searchParams]);

    useEffect(() => {
        dispatch(getProductsFilterThunk(searchParams.get("k")));
    }, [dispatch, searchParams]);

    let searchProductItems;
    if (searchProductsArr.length) {
        searchProductItems = searchProductsArr.map(product => {
            return <ProductItem key={product.id} product={product} />
        });
    };

    const products = useSelector(state => state.Products.allProducts);
    const allProductsArr = Object.values(products);

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [dispatch])

    const basicsArr = allProductsArr.filter(product => product.category === 'Rainforest Basics').slice(0, 4);
    const electronicsArr = allProductsArr.filter(product => product.category === 'Electronics').slice(0, 4);
    const beautArr = allProductsArr.filter(product => product.category === 'Beauty & Personal Care').slice(0, 4);
    const appliancesArr = allProductsArr.filter(product => product.category === 'Appliances').slice(0, 4);

    if (!searchProductsArr.length)
    return (
        <div className='empty-cart-container'>
            <div className='empty-cart-header'>
                No products match that description!
            </div>
            <Link to={"/"} className="empty-cart-link">Continue Shopping</Link>
            <div className='recommended-for-you'>Recommended For You</div>
            <div className="empty-cart-cards-container">
                <div className="card-container">
                    <div className="card-title">Rainforest Basics</div>
                    <div className="card-image-container">
                        {basicsArr.map(product => (
                            <div className="card-image" key={product?.id}>
                                <Link className="card-image-link" to={`/products/${product.id}`}>
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
                    <div className="card-title">Electronics</div>
                    <div className="card-image-container">
                        {electronicsArr.map(product => (
                            <div className="card-image" key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                    <img className="card-actual-image" src={product.images[0]?.url} alt={product.name} />
                                </Link>
                                <div className="card-image-info">
                                    <div>{product.name.substring(0, 20)}...</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card-container">
                    <div className="card-title">Beauty & Personal Care</div>
                    <div className="card-image-container">
                        {beautArr.map(product => (
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
                    <div className="card-title">Appliances</div>
                    <div className="card-image-container">
                        {appliancesArr.map(product => (
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
    )


    return (
        <div className='all-products-wrapper'>
            {/* <div className='home-header'>
                <FilterBar />
            </div> */}
            <div className='filter-products-header'>
                <div className='displaying'>
                    Displaying
                </div>
                <div className='num-results'>
                    ({searchProductsArr.length})
                </div>
                <div className='display-results'>
                    results for all {keywordsFromUrl} related products
                </div>
            </div>
            <div className='filter-header-and-container'>
                <div className='filter-products-results-header'>
                    <div className='results'>
                        Results
                    </div>
                </div>
                <div className='all-products-container'>
                    {searchProductItems}
                </div>
            </div>
        </div>
    )
}
export default SearchProducts;
