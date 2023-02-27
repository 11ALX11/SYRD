import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home.js";
import Account from "./account.js";
import Error404 from "./error404.js";

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </>
        );
    }
}
export default Pages;
