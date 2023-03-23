import "./Footer.css"
import githubMark from "../../assets/github-mark-white.png";
import githubLogo from "../../assets/GitHub_Logo_White.png";
import linkedIn from "../../assets/linked-in.png";

import { useLocation } from "react-router"

export default function Footer() {
    // const location = useLocation();
    // const excludedPaths = ["login", "signup"];
    // if (excludedPaths.some(path => location.pathname.includes(path)))
    //     return;
    return (
        <div className="footer-wrapper">
            <div className="footer-container">
                <div className="footer-body">
                    <a rel="noreferrer" target="_blank" href="https://github.com/ryanharden" className="footer-link">
                        <img className="github-mark" src={githubMark} alt="github mark" />
                        <img className="github-logo" src={githubLogo} alt="github logo" />
                    </a>
                    <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/ryanharden-dev" className="footer-link">
                        <img className="linked-in-logo" src={linkedIn} alt="linkedin logo" />
                    </a>
                </div>
            </div>
        </div>
    );
}
