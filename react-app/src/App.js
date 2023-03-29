import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import UserProductPage from "./components/Products/UserProducts/UserProductsPage/UserProductsPage";
import HomePage from "./components/HomePage/HomePage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateProduct from "./components/Products/CreateProduct/CreateProduct";
import EditProduct from "./components/Products/EditProduct/EditProduct";
import CartShow from "./components/Cart/CartShow/CartShow";
import CheckoutShow from "./components/Checkout/CheckoutShow/CheckoutShow";
import CartConfirmation from "./components/Cart/CartConfirmation/CartConfirmation";
import ProductShow from "./components/Products/ProductShow/ProductShow";
import { useLocation } from "react-router";
import AllProducts from "./components/Products/AllProducts/AllProducts";
import Footer from "./components/Footer/Footer";
import styles from "./App.css";
import CategoryProducts from "./components/Products/CategoryProducts/CategoryProducts";
import PlacedOrder from "./components/PlacedOrder/PlacedOrder";
import FeatureComing from "./components/FeatureComing/FeatureComing";
import "./App.css";
import SearchProducts from "./components/Products/SearchProducts/SearchProducts";
import OrderPage from "./components/Orders/OrderPage/OrderPage";
import ReviewForm from "./components/Reviews/ReviewForm/ReviewForm";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const hideNavigation = location.pathname === "/checkout" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  const hideFooter = location.pathname === "/login" || location.pathname === "/signup"

  return (
    <>
      <div className="main-body">
        {!hideNavigation && <Navigation isLoaded={isLoaded} />}
        {isLoaded && (
          <Routes>
            <Route path="/s" element={<SearchProducts />} />

            <Route path="/login" element={<LoginFormPage />} />

            <Route path="/signup" element={<SignupFormPage />} />

            <Route path="/:category" element={<CategoryProducts />} />

            <Route path="/allproducts" element={<AllProducts />} />

            <Route path="/users/:userId/products" element={<UserProductPage />} />

            <Route path="/products/:productId" element={<ProductShow />} />

            <Route path="/createproduct" element={<CreateProduct />} />

            <Route path="/editproduct/:productId" element={<EditProduct />} />

            <Route path="/cart-confirmation" element={<CartConfirmation />} />

            <Route path="/cart" element={<CartShow />} />

            <Route path="/checkout" element={<CheckoutShow />} />

            <Route path="/placedorder" element={<PlacedOrder />} />

            <Route path="/featurecoming" element={<FeatureComing />} />

            <Route path="/orders/current" element={<OrderPage />} />

            <Route path="/products/:productId/writereview" element={<ReviewForm />} />

            {/* <Route path={["/users/:userId/products", "/createproduct", "/editproduct/:productId"]}>
            <UserProductPage />
          </Route> */}
            <Route path="/" element={<HomePage />} />
          </Routes>
        )}
        {!hideFooter && <Footer />}
      </div>
    </>
  );
}

export default App;
