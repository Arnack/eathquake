import React, {FC} from "react";
import "./Header.css";
import {Link} from "@reach/router";

export const Header:FC = () => {
    return <div className={"header-container"}>
        <Link to={"/"}>
            <h2 className="app-logo">EarthQuakes</h2>
        </Link>

    </div>
}