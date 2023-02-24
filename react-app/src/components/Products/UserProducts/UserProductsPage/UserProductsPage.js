import React, {useEffect} from 'react';
import { Link, useParams, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AllUserProducts from '../AllUserProducts/AllUserProducts';
import { getUserProductsThunk } from '../../../../store/products';
// import AllUserProducts from '../AllUserProducts/AllUserProducts';
// import CreateProduct from '../../CreateProduct/CreateProduct';
// import EditProduct from '../Product/EditProduct';


const UserProductPage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const currentUser = useSelector(state => state.session.user);
    const userProducts = useSelector(state => state.Products.userProducts);

    useEffect(() => {
        dispatch(getUserProductsThunk(userProducts))
    }, [dispatch, ])
    return (
        <div className='user-product-page-container'>
            {/* <div className='user-product-page-nav-bar'>
                <div className='left-nav-bar'>
                    <Link to={'/'} >
                        Rainforest Retail
                    </Link>
                    <div className='product-management'>
                        Seller Central
                    </div>
                </div>
                <div className='right-nav-bar'>
                    <Link to={'/'}>
                        <i className="fa-solid fa-house"></i>
                        <div className='back-home'>
                            Back to Home
                        </div>
                    </Link>
                </div>
            </div> */}
            <div className='user-product-page-header'>
                <div className='manage-products'>
                    Manage Your Products
                </div>
                <Link to={"/createproduct"} className="user-product-page-link">
                    <div className='create-product'>
                        List Your Product
                    </div>
                </Link>
            </div>
            {/* <Switch>
                <Route exact path={"/createproduct"}>
                    <CreateProduct />
                </Route>
                <Route path={"/editproduct/:productId"}>
                    <EditProduct/>
                </Route>
                <Route exact path ={"/users/:userId/products"}>
                    <AllUserProducts />
                </Route>
            </Switch> */}
            <div className='all-user-products'>
                <AllUserProducts />
            </div>
        </div>
    )
}

export default UserProductPage;
