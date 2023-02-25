import "./ProductImages.css";

import { useRef, useState } from "react";

const ProductImages = ({ product }) =>  {
    const [imageUrl, setImageUrl] = useState(product.product_images[0]?.product_image_url);
    const imageRef = useRef();
    const [image, setImage] = useState();

    const mouseHover = (i, e) => {
        setImageUrl(product.product_images[i]?.product_image_url);
        imageRef.current.classList.remove("image-hover");
        if (image) image.classList.remove("image-hover");
        e.target.classList.add("image-hover");
        setImage(e.target)
    };

    return (
        <div className="product-images-container">
            <div className="small-images-container">
                {product.product_images.map((image, i) => {
                    if (i === 0) {
                        return <img ref={imageRef} className="small-image" src={image.product_image_url} alt="small-img" onMouseEnter={(e) => mouseHover(i, e)} key={i} />
                    } else {
                        return <img className="small-image" src={image.product_image_url} alt="small-image" onMouseEnter={(e) => mouseHover(i, e)} key={i} />
                    }
                })}
            </div>
            <div className="main-image-container">
                <img className="main-image" src={imageUrl} />
            </div>
        </div>
    )
}
export default ProductImages;
