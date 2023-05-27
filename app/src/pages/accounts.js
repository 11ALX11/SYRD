import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../components/loader/loader";

const HOST = process.env.NODE_ENV === "development" ? "http://localhost:80" : "";

function Accounts(props) {
    const [state, setState] = useState({ loading: true, data: [] });
    const { page } = useParams();

    useEffect(() => {
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
                    setState({ loading: false, data: data }); // Обновляем состояние data с полученными данными
                }
            })
            .catch((error) => {
                console.error("Error recieving accounts data:", error);
            });
    }, []);

    if (props.logged_in && props.account_role === "ADMIN" && !state.loading) {
        return (
            <>
                <h1>Accounts page</h1>
                <table className="table table-hover mt-4 mb-4">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Username</td>
                            <td>Role</td>
                            <td>Registration date</td>
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
                                <td>{row.registration_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    } else if (state.loading) {
        return (
            <>
                <h1>Accounts page</h1>
                <Loader text="Fetching accounts data"></Loader>
            </>
        );
    } else if (!props.logged_in) {
        return (
            <>
                <Navigate to="/login" />
            </>
        );
    } else {
        return (
            <>
                <Navigate to="/account" />
            </>
        );
    }
}

export default Accounts;
