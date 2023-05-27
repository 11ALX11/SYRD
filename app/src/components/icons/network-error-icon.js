import "./network-error-icon.css";

const NetworkErrorIcon = () => {
    // arcs calculated by hand
    return (
        <span className="icon-container network-error-icon-container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon network-error-icon"
                width="64"
                height="64"
                viewBox="0 0 900 900"
            >
                <path d="M 587 700 A96 96 0 0 0 413 700" fill="none" stroke="#ffffff" strokeWidth="30" />
                <path d="M 673 650 A205 205 0 0 0 327 650" fill="none" stroke="#ffffff" strokeWidth="30" />
                <circle cx="500" cy="750" r="30" fill="#ffffff" />
            </svg>
        </span>
    );
};

export default NetworkErrorIcon;
