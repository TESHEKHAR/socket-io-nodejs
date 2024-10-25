const http = require("http");

const express = require("express");

const path = require("path");
const { Server } = require("socket.io");
const { connect } = require("tls");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//socketio

io.on("connection", (socket) => {
    //console.log("A new user has connected" , socket.id)

    socket.on("user-message", (message) => {
        // console.log("A new Message", message);
        io.emit("message", message);
    });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
});

server.listen(8000, () => console.log(`Server Started at PORT:8000`));