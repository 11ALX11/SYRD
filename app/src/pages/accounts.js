import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../components/loader/loader";
import Pager from "../components/pager/pager";
import Error403 from "./error403";
import { openModalById } from "../components/modal/modal";

const HOST = process.env.NODE_ENV === "development" ? "http://localhost:80" : "";

function Accounts(props) {
    const [state, setState] = useState({ loading: true, pages: 0, data: [] });
    const { page } = useParams();

    useEffect(() => {
        setState({ loading: true });
        if (props.logged_in && props.account_role === "ADMIN") {
            fetch(HOST + "/api/get-accounts-data/" + page, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: props.token, // Добавление токена в заголовок Authorization
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (!data.error) {
                        // Обновляем состояние data с полученными данными
                        setState({ loading: false, pages: data.pages, data: data.data });
                    }
                })
                .catch((error) => {
                    console.error("Error recieving accounts data.", error);
                    openModalById("networkError");
                });
        }
    }, [page, props]);

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
                    <thead className="">
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Registration date</th>
                        </tr>
                        <tr>
                            <td>[search]</td>
                            <td>[search]</td>
                            <td>[search]</td>
                            <td>[search]</td>
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
