const express = require("express");
const app = express();
const port = 80;

setTimeout(() => {
    const apiRoutes = require("./api-routes");

    app.use("/api", apiRoutes);

    app.use(express.static("public"));

    app.get("/*", (req, res) => {
        res.sendFile("/api/public/index.html");
    });

    app.listen(port, () => {
        console.log(`Api listening on port ${port}`);
    });
}, 1000);