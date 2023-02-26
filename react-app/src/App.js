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

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Routes>
          <Route path="/login" element={<LoginFormPage />}/>

          <Route path="/signup" element={<SignupFormPage />}/>

          <Route path="/users/:userId/products" element={<UserProductPage />}/>

          <Route path="/products/:productId" element={<ProductShow />}/>

          <Route path="/createproduct" element={<CreateProduct />}/>

          <Route path="/editproduct/:productId" element={<EditProduct />}/>

          <Route paht="/cart-confirmation" element={<CartConfirmation />}/>

          <Route path="/cart" element={<CartShow />}/>

          <Route path="/checkout" element={<CheckoutShow />}/>

          {/* <Route path={["/users/:userId/products", "/createproduct", "/editproduct/:productId"]}>
            <UserProductPage />
          </Route> */}
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      )}
    </>
  );
}

export default App;
