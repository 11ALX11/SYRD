import React from "react";
import "./loader.css";

const Loader = (props) => {
    return (
        <div className="loader-container">
            {props.text && <span className="loader-text">{props.text}</span>}
            <div className="loader"></div>
        </div>
    );
};

export default Loader;
