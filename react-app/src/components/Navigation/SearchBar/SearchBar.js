import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getProductsFilterThunk } from "../../../store/products";
import "./SearchBar.css";

const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const searchParams = useSearchParams()[0];
    const keywordsFromUrl = searchParams.get('k');
    // console.log("keywordsFromUrl: ", keywordsFromUrl);
    const [keywords, setKeywords] = useState(keywordsFromUrl ? keywordsFromUrl : "");

    useEffect(() => {
        setKeywords(keywordsFromUrl ? keywordsFromUrl : "");
    }, [location, keywordsFromUrl]);


    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (keywords) {
            const res = await fetch(`/api/products?k=${keywords.replace(" ", "+")}`);
            if (res.ok) {
                const products = await res.json();
                dispatch(getProductsFilterThunk(products));
                navigate(`/s?k=${keywords.replace(" ", "+")}`);
            } else {
                console.error("Unable to get search products from server");
            }
        } else {
            navigate("/");
        }
    };

    // const handleSearch = async (e) => {
    //     e.preventDefault();

    //     if (keywords) {
    //         dispatch(getProductsFilterThunk(keywords));
    //     }
    // };

    return (
        <div className="search-bar-wrapper">
            <form onSubmit={handleSearch} className="search-bar-form">
                <input
                    type="text"
                    placeholder="Search Rainforest Retail"
                    spellCheck="false"
                    className="search-bar"
                    value={keywords}
                    onChange={e => setKeywords(e.target.value)}
                />
                <div onClick={handleSearch} className="search-bar-icon-container">
                    <i className="fa-solid fa-magnifying-glass" />
                </div>
            </form>
        </div>
    )
}
export default SearchBar;
