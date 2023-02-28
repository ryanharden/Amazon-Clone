import "./ProductImages.css";

import { useRef, useState, useEffect } from "react";

const ProductImages = ({ product }) => {
    const [imageUrl, setImageUrl] = useState(product?.images[0]?.url);
    const imageRef = useRef();
    const [image, setImage] = useState();
    const [shouldScaleDown, setShouldScaleDown] = useState(true);
    const [isTallImage, setIsTallImage] = useState(false);
    // console.log("product-images: ", product);

    const mouseHover = (i, e) => {
        setImageUrl(product.images[i]?.url);
        imageRef.current.classList.remove("image-hover");
        if (image) image.classList.remove("image-hover");
        e.target.classList.add("image-hover");
        setImage(e.target)
    };

    const getDimensions = (url, cb) => {
        const img = new Image();
        img.onload = () => cb(img);
        img.src = url;
    };

    useEffect(() => {
        setImageUrl(product?.images[0]?.url);
    }, [product]);

    useEffect(() => {
        getDimensions(imageUrl, (img) => {
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            setShouldScaleDown(aspectRatio >= 1.2);
            setIsTallImage(aspectRatio <= 0.5);
        });
    }, [imageUrl]);

    if (!product || !product.images || !product.images.length) return null;

    return (
        <div className="product-images-container">
            <div className="small-images-container">
                {product?.images.map((image, i) => {
                    if (i === 0) {
                        return <img ref={imageRef} className="small-image" src={image.url} alt="small-img" onMouseEnter={(e) => mouseHover(i, e)} key={i} />
                    } else {
                        return <img className="small-image" src={image.url} alt="small-image" onMouseEnter={(e) => mouseHover(i, e)} key={i} />
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
