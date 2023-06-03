import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../components/loader/loader";
import Pager from "../components/pager/pager";
import Error403 from "./error403";
import { openModalById } from "../components/modal/modal";

const HOST = process.env.NODE_ENV === "development" ? "http://localhost:80" : "";

function Accounts(props) {
    const [state, setState] = useState({
        loading: true,
        pages: 0,
        data: [],
    });
    const { page } = useParams();

    const [idFilter, setIdFilter] = useState("");
    const [usernameFilter, setUsernameFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const [sort, setSort] = useState({
        field: "",
        direction: "",
    });

    const handleSort = (field) => {
        if (sort.field === field) {
            setSort({
                ...sort,
                direction: sort.direction === "asc" ? "desc" : "asc",
            });
        } else {
            setSort({
                field: field,
                direction: "asc",
            });
        }
    };

    useEffect(() => {
        setState({ loading: true });
    }, [page, props]);

    useEffect(() => {
        if (props.logged_in && props.account_role === "ADMIN") {
            let query_str = "";
            if (idFilter !== "" || usernameFilter !== "" || roleFilter !== "" || sort.field !== "") {
                query_str += "?";
            }
            if (idFilter !== "") {
                query_str += `id=${idFilter}`;
                if (usernameFilter !== "" || roleFilter !== "") {
                    query_str += "&";
                }
            }
            if (usernameFilter !== "") {
                query_str += `username=${usernameFilter}`;
                if (roleFilter !== "") {
                    query_str += "&";
                }
            }
            if (roleFilter !== "") {
                query_str += `role=${roleFilter}`;
            }
            if (sort.field) {
                if (idFilter !== "" || usernameFilter !== "" || roleFilter !== "") {
                    query_str += "&";
                }
                query_str += `sort_field=${sort.field}`;
                if (sort.direction === "desc") {
                    query_str += `&sort_dir=desc`;
                }
            }

            fetch(HOST + "/api/get-accounts-data/" + page + query_str, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: props.token, // Добавление токена в заголовок Authorization
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (!data.message) {
                        // Обновляем состояние data с полученными данными
                        setState({
                            loading: false,
                            pages: data.pages,
                            data: data.data,
                        });
                    }
                    //Todo check get-user + setAppState
                })
                .catch((error) => {
                    console.error("Error recieving accounts data.", error);
                    openModalById("networkError");
                });
        }
    }, [page, props, idFilter, usernameFilter, roleFilter, sort]);

    if (!props.logged_in) {
        return (
            <>
                <Navigate to="/login" />
            </>
        );
    } else if (props.account_role !== "ADMIN") {
        return (
            <>
                <Error403 />
            </>
        );
    } else if (state.loading) {
        return (
            <>
                <h1>Accounts page</h1>
                <Loader text="Fetching accounts data" />
            </>
        );
    } else if (page > state.pages) {
        return <Navigate to={"/accounts/" + state.pages} />;
    } else {
        return (
            <>
                <h1>Accounts page</h1>
                <table className="table table-hover mt-4 mb-4">
                    <thead>
                        <tr>
                            <th className="col-sm-1">
                                <a href="#" className="link-primary" onClick={() => handleSort("id")}>
                                    Id
                                </a>
                            </th>
                            <th>
                                <a href="#" className="link-primary" onClick={() => handleSort("username")}>
                                    Username
                                </a>
                            </th>
                            <th>
                                <a href="#" className="link-primary" onClick={() => handleSort("role")}>
                                    Role
                                </a>
                            </th>
                            <th>
                                <a
                                    href="#"
                                    className="link-primary"
                                    onClick={() => handleSort("registration_date")}
                                >
                                    Registration date
                                </a>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <input
                                        className="form-control"
                                        type="numeric"
                                        onChange={(e) => {
                                            setIdFilter(e.target.value);
                                        }}
                                    ></input>
                                </form>
                            </td>
                            <td>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={(e) => {
                                            if (e.target.value.length === 0 || e.target.value.length > 2) {
                                                setUsernameFilter(e.target.value);
                                            }
                                        }}
                                    ></input>
                                </form>
                            </td>
                            <td>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <select
                                        className="form-control"
                                        onChange={(e) => {
                                            setRoleFilter(e.target.value);
                                        }}
                                    >
                                        <option value="">All</option>
                                        <option value="USER">USER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                </form>
                            </td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {state.data.map((row) => (
                            <tr>
                                <td>{row.id}</td>
                                <td>{row.username}</td>
                                <td>{row.role}</td>
                                <td>{new Date(row.registration_date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pager to="/accounts" currentPage={page} totalPages={state.pages} />
            </>
        );
    }
}

export default Accounts;
