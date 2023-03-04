import "./QuantityShow.css";

const QuantityShow = ({ setQuantity, quantity }) => {

    const nums = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="quantity-show-container">
            <div className="qty-show-title">
                Qty:
            </div>
            <select
                className="qty-select"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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

export default QuantityShow;
