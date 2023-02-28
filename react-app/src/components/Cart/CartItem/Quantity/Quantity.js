import { useDispatch } from "react-redux";
import { editCartItemThunk } from "../../../../store/cartitem";

const Quantity = ({ productId, quantity, cartitem }) => {
    const dispatch = useDispatch();

    const nums = Array.from({ length: 10 }, (_, i) => i + 1);
    
    const handleQuantityChange = (event) => {
        const newQuantity = event.target.value;
        dispatch(editCartItemThunk(cartitem.id, newQuantity));
    };
    return (
        <div className="quantity-container">
            <select
                className="qty-select"
                value={quantity}
                onChange={handleQuantityChange}
            >
            Qty:
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
