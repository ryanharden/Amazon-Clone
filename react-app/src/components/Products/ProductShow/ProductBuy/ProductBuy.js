import "./ProductBuy.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import OpenModalButton from "../../../OpenModalButton";

import Quantity from "../../../Cart/CartItem/Quantity/Quantity";

const ProductBuy = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);

    const [quantity, setQuantity] = useState(1);
    
}
export default ProductBuy;
