import { useDispatch } from "react-redux";
import { editCartItemThunk } from "../../../../store/cartitem";

const Quantity = ({ productId, quantity }) => {
    const dispatch = useDispatch();

    const nums = Array.from({ length: 10 }, (_, i) => i + 1);
    return (
        <div className="quantity-container">
            <select
                className="qty-select"
                value={quantity}
                onChange={(e) => dispatch(editCartItemThunk(productId, e.target.value))}
            >
            Qty:
            {nums.map(num => {
                <option
                    key={num}
                    value={num}
                >
                {num}
                </option>
            })}
            </select>
        </div>
    )
}

export default Quantity;
