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
    // console.log("searchParams: ", searchParams);

    const searchProducts = useSelector(state => state.Products.searchProducts);
    // console.log("searchProducts: ", searchProducts);
    const searchProductsArr = Object.values(searchProducts);



    useEffect(() => {
        async function loadFilteredProducts() {
           await dispatch(getProductsFilterThunk(searchParams.get("k")));
        }
        loadFilteredProducts();
    }, [dispatch, searchParams]);

    let searchProductItems;
    if (searchProductsArr.length) {
        searchProductItems = searchProductsArr.map(product => {
            return <ProductItem key={product.id} product={product} />
        });
    };

    if (!searchProductsArr.length) return <div>No search results found</div>
    ;

    return (
        <div className='all-products-wrapper'>
            <div className='home-header'>
                <FilterBar />
            </div>
            <div className='filter-products-header'>
                <div className='displaying'>
                    Displaying
                </div>
                <div className='num-results'>
                    ({searchProductsArr.length})
                </div>
                <div className='display-results'>
                    results for All {searchParams} Products
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
