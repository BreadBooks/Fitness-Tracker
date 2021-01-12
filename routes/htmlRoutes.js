const path = require("path");

module.exports = (app) => {
    app.get("/exercise", (request, response) => {
        response.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    app.get("/stats", (request, response) => {
        response.sendFile(path.join(__dirname, "../public/stats.html"));
    });

    app.get("*", (request, response) => {
        response.sendFile(path.join(__dirname, "../public/index.html"));
    });
};