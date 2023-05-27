import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const HOST = process.env.NODE_ENV === "development" ? "http://localhost:80" : "";

function Accounts(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(HOST + "/api/get-accounts-data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: this.props.token, // Добавление токена в заголовок Authorization
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data); // Обновляем состояние data с полученными данными
            })
            .catch((error) => {
                console.error("Ошибка при получении данных из базы данных:", error);
            });
    }, []);

    if (this.props.logged_in && this.props.account_role === "ADMIN") {
        return (
            <>
                <h1>Accounts page</h1>
                <table className="table table-hover mt-4 mb-4">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Username</td>
                            <td>Role</td>
                            <td>Registration_date</td>
                        </tr>
                        <tr>
                            <td>[search]</td>
                            <td>[search]</td>
                            <td>[search]</td>
                            <td>[search]</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr>
                                <td>{row.column1}</td>
                                <td>{row.column2}</td>
                                <td>{row.column3}</td>
                                <td>{row.column4}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    } else {
        return (
            <>
                <Navigate to="/login" />
            </>
        );
    }
}

export default Accounts;
