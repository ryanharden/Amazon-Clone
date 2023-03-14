import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from "../../../store/products";
import { Link, useLocation, useParams } from 'react-router-dom';
import ProductItem from '../ProductItem/ProductItem';
import "./AllProducts.css";
import FilterBar from '../../Filters/FilterBar/FilterBar';

const AllProductsPage = () => {
    const dispatch = useDispatch();

    const allProducts = useSelector(state => state.Products.allProducts);
    // console.log(allProducts);
    const allProductsArr = Object.values(allProducts);

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [dispatch]);

    let allProductItems;
    if (allProductsArr.length) {
        allProductItems = allProductsArr.map(product => {
            return <ProductItem key={product.id} product={product} />
        });
    };

    if (!allProductsArr.length) return null;

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
                    ({allProductsArr.length})
                </div>
                <div className='display-results'>
                    results for All Products
                </div>
            </div>
            <div className='filter-header-and-container'>
                <div className='filter-products-results-header'>
                    <div className='results'>
                        Results
                    </div>
                </div>
                <div className='all-products-container'>
                    {allProductItems}
                </div>
            </div>
        </div>
    )
}
export default AllProductsPage;
