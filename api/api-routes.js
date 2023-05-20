const express = require("express");
const api = express.Router();

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
