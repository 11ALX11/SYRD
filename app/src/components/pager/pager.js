import React from "react";
import { Link } from "react-router-dom";
//Todo pager.css

const Pager = (props) => {
    const totalPages = props.totalPages;
    const currentPage = props.currentPage;

    const renderPageLink = (page) => {
        const linkTo = props.to + "/" + page;
        return (
            <li key={page} className={page === currentPage ? "active" : ""}>
                <Link to={linkTo}>{page}</Link>
            </li>
        );
    };

    const renderPager = () => {
        const pager = [];
        for (let page = 1; page <= totalPages; page++) {
            pager.push(renderPageLink(page));
        }
        return pager;
    };

    return <ul className="pager">{renderPager()}</ul>;
};

export default Pager;
