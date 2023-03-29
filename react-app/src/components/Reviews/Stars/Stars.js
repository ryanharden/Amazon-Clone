import "./Stars.css";

const Stars = ({ rating }) => {

    if (isNaN(Number(rating))) return null;

    let className = "zero";

    if (rating >= 4.8) {
        className = "five";
    } else if (rating > 4.1) {
        className = "four_half";
    } else if (rating >= 3.8) {
        className = "four";
    } else if (rating > 3.1) {
        className = "three_half";
    } else if (rating >= 2.8) {
        className = "three";
    } else if (rating > 2.1) {
        className = "two_half";
    } else if (rating >= 1.8) {
        className = "two";
    } else if (rating > 1.1) {
        className = "one_half";
    } else if (rating >= 0.8) {
        className = "one";
    } else if (rating > 0.1) {
        className = "zero_half";
    } else {
        className = "zero";
    }

    return <div className={`stars ${className}`} />;
}
export default Stars;
