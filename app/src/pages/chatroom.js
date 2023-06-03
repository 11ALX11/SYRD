import React, { useState, useEffect, useRef } from "react";
import { openModalById } from "../components/modal/modal";
import { Navigate } from "react-router-dom";

const HOST = process.env.NODE_ENV === "development" ? "http://localhost:80" : "";

function ChatRoom(props) {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        const fetchMessages = () => {
            fetch(HOST + "/api/get-messages", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: props.token,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    const sortedData = data.sort((a, b) => b.created_at - a.created_at);
                    setMessages(sortedData);
                })
                .catch((error) => {
                    console.error("Error retrieving messages:", error);
                    openModalById("networkError");
                });
        };

        if (props.logged_in) {
            fetchMessages();

            const timer = setInterval(fetchMessages, 2000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [props]);

    const handleInputChange = (event) => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight + 1000;
        }
        setInputText(event.target.value);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();

        if (inputText.trim() !== "") {
            const newMessage = {
                text: inputText,
            };

            fetch(HOST + "/api/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: props.token, // Добавление токена в заголовок Authorization
                },
                body: JSON.stringify(newMessage),
            })
                .then((response) => response.json())
                .then((data) => {
                    setInputText("");
                })
                .catch((error) => {
                    console.error("Error adding message:", error);
                    openModalById("networkError");
                });
        }

        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight + 1000;
        }
    };

    if (props.logged_in) {
        return (
            <>
                <h1 className="mb-4">Chat room</h1>

                <div
                    className="alert alert-light overflow-auto"
                    ref={messagesContainerRef}
                    style={{ height: "50vh" }}
                >
                    {messages.map((message) => (
                        <div className="message" key={message.id}>
                            <div>
                                <strong>{message.username}</strong>
                                <span className="text-muted">
                                    {" "}
                                    {new Date(message.created_at).toLocaleTimeString()}
                                </span>
                            </div>
                            <div>{message.text}</div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSendMessage}>
                    <div className="input-group mb-2">
                        <input
                            className="form-control"
                            type="text"
                            value={inputText}
                            onChange={handleInputChange}
                            placeholder="Enter message..."
                        />
                        <button className="btn btn-outline-primary" type="submit">
                            Send
                        </button>
                    </div>
                </form>
            </>
        );
    } else {
        return <Navigate to="/login" />;
    }
}

export default ChatRoom;
