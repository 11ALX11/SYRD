const express = require("express");
const api = express.Router();

const bcrypt = require("bcrypt");

// for jwt token
const jwt = require("jsonwebtoken");
const secret_key = "dqwh124fsdafFASFdf";

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Отсутствует токен авторизации" });
    }

    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Неверный токен авторизации" });
        }

        // Добавление информации о пользователе в объект запроса для последующего использования
        req.user = decoded;

        next();
    });
};

const { Client } = require("pg");
const dbConfig = require("./config-db");

const client = new Client(dbConfig);

client
    .connect()
    .then(() => {
        console.log("Успешное подключение к PostgreSQL");
    })
    .catch((err) => {
        console.error("Ошибка подключения к PostgreSQL", err);
    });

// Подключение middleware CORS
// ToDo Для тестов с dev сервером
const cors = require("cors");
api.use(cors());

// Подключение middleware body-parser для обработки данных в формате JSON
const bodyParser = require("body-parser");
api.use(bodyParser.json());

api.post("/login", (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        let errors = [];

        // if not found add error or if passwords mismatch

        if (username.match("^(?=.{1,30}$)[a-zA-Z0-9._]+$") === null) {
            errors.push("username_mask");
        }
        if (password.match("^(?=.{4,30}$)[a-zA-Z0-9]+$") === null) {
            errors.push("password_mask");
        }

        if (errors.length !== 0) {
            return res.status(422).json({ errors: errors });
        }

        // Сравниваем хеш пароля с предоставленным паролем
        client.query("SELECT * FROM users WHERE username = $1", [username], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Внутренняя ошибка сервера" });
            }

            const user = result.rows[0];

            if (!user) {
                errors.push("username_password");
                return res.status(422).json({ errors: errors });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error("Ошибка сравнения пароля:", err);
                    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
                }

                if (!isMatch) {
                    errors.push("username_password");
                    return res.status(422).json({ errors: errors });
                }

                // Генерируем и отправляем токен аутентификации
                const token = jwt.sign(
                    { username: user.username, role: user.role, registration_date: user.registration_date },
                    secret_key,
                    { expiresIn: "24h" }
                );

                return res.json({
                    token: token,
                    user: {
                        username: user.username,
                        role: user.role,
                        registration_date: user.registration_date,
                    },
                });
            });
        });
    } catch (error) {
        console.error("Ошибка аутентификации", error);
        return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
});

api.get("/get-user", verifyToken, (req, res) => {
    res.status(200).json({ status: true, user: req.user });
});

// Маршрут /api/req1
api.get("/req1", (req, res) => {
    // Обработка запроса к /api/req1
    // Выполнение запроса к базе данных и отправка результата
});

// Маршрут /api/req2
api.get("/req2", (req, res) => {
    // Обработка запроса к /api/req2
    // Выполнение запроса к базе данных и отправка результата
});

// Маршрут /api/req3
api.post("/req3", (req, res) => {
    // Обработка POST-запроса к /api/req3
    // Выполнение запроса к базе данных и отправка результата
});

api.all("/*", (req, res) => {
    res.status(404).json({ error: "Route not found / Запрашиваемый маршрут не найден." });
});

module.exports = api;
