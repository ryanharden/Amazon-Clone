import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from "../../../store/products";
import { Link, useLocation, useParams } from 'react-router-dom';
import ProductItem from '../ProductItem/ProductItem';
// import "..AllProducts/AllProducts.css";
import FilterBar from '../../Filters/FilterBar/FilterBar';

const CategoryProducts = () => {
    const dispatch = useDispatch();
    const {category} = useParams();

    const allProducts = useSelector(state => state.Products.allProducts);
    // console.log(allProducts);
    const allProductsArr = Object.values(allProducts);

    const categoryProducts = allProductsArr.filter(product => product.category.replace(/\s+/g, '') === category)


    useEffect(() => {
        dispatch(getProductsThunk());
    }, [dispatch]);

    let allProductItems;
    if (categoryProducts.length) {
        allProductItems = categoryProducts.map(product => {
            return <ProductItem key={product.id} product={product} />
        });
    };

    if (!allProductsArr.length) return null;

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
                    ({categoryProducts.length})
                </div>
                <div className='display-results'>
                    results for All {category} Products
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
export default CategoryProducts;
