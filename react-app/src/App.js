import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import UserProductPage from "./components/Products/UserProducts/UserProductsPage/UserProductsPage";
import HomePage from "./components/HomePage/HomePage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateProduct from "./components/Products/CreateProduct/CreateProduct";
import EditProduct from "./components/Products/EditProduct/EditProduct";
import CartShow from "./components/Cart/CartShow/CartShow";

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
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/users/:userId/products">
            <UserProductPage />
          </Route>
          <Route path="/createproduct">
            <CreateProduct />
          </Route>
          <Route path="/editproduct/:productId">
            <EditProduct />
          </Route>
          <Route path="/cart">
            <CartShow />
          </Route>
          {/* <Route path={["/users/:userId/products", "/createproduct", "/editproduct/:productId"]}>
            <UserProductPage />
          </Route> */}
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
