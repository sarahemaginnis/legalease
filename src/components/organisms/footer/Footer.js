import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"

const Footer = () => {
    return (
        <ul className="footer__no-bullets">
            <li className="footer__item-active">© 2022 All Rights Reserved</li>
            <li className="footer__item-active">
                <Link className="footer__link" to="/contact">Contact</Link>
            </li>
            <li className="footer__item-active">
                <Link className="footer__link" to="/about">About</Link>
            </li>
            <li className="footer__item-active">
                <Link className="footer__link" to="/help">Help</Link>
            </li>
            <li className="footer__item-active">
                <Link className="footer__link" to="/terms">Privacy</Link>
            </li>
            <li className="footer__item-active">
                <Link className="footer__link" to="/terms">Terms</Link>
            </li>
        </ul>
    )
}

export default Footer