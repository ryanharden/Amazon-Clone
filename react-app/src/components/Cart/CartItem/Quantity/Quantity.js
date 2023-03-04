import { useDispatch } from "react-redux";
import { editCartItemThunk } from "../../../../store/cartitem";
import "./Quantity.css";

const Quantity = ({ productId, quantity, cartitem }) => {
    const dispatch = useDispatch();

    const nums = Array.from({ length: 10 }, (_, i) => i + 1);

    const handleQuantityChange = (event) => {
        const newQuantity = event.target.value;
        dispatch(editCartItemThunk(cartitem.id, newQuantity));
    };
    return (
        <div className="quantity-container">
            <div className="qty-title">
            Qty:
            </div>
            <select
                className="qty-select"
                value={quantity}
                onChange={handleQuantityChange}
            >
            {nums.map(num => (
                <option
                    key={num}
                    value={num}
                >
                {num}
                </option>
            ))}
            </select>
        </div>
    )
}

export default Quantity;
