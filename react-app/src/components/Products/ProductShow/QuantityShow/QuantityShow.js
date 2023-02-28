import "./QuantityShow.css";

const QuantityShow = ({ setQuantity, quantity }) => {

    const nums = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="quantity-container">
            <select
                className="qty-select"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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

export default QuantityShow;
