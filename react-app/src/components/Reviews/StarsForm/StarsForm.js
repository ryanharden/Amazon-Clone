import "./StarsForm.css";

const StarsForm = ({ rating }) => {

    if (isNaN(Number(rating))) return;

    let className = "zero";

    if (rating >= 4.8) {
        className = "form-five";
    } else if (rating > 4.1) {
        className = "form-four_half";
    } else if (rating >= 3.8) {
        className = "form-four";
    } else if (rating > 3.1) {
        className = "form-three_half";
    } else if (rating >= 2.8) {
        className = "form-three";
    } else if (rating > 2.1) {
        className = "form-two_half";
    } else if (rating >= 1.8) {
        className = "form-two";
    } else if (rating > 1.1) {
        className = "form-one_half";
    } else if (rating >= 0.8) {
        className = "form-one";
    } else if (rating > 0.1) {
        className = "form-zero_half";
    } else {
        className = "form-zero";
    }

    return <div className={`stars-form ${className}`} />;
}
export default StarsForm;
