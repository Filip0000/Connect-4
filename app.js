var express = require("express");
var http = require("http");
var WebSocket = require('ws');
var messages = require("./public/javascripts/game");

var port = process.argv[2];
var app = express();
var indexRouter = require("./routes/index");

app.use(express.static(__dirname + "/public"));
app.get("/game", indexRouter);
app.get("/splash", indexRouter);

http.createServer(app).listen(port);
app.get('/', function (req, res) {
   res.sendFile("splash.html", { root: "./public" });
})


const wss = new WebSocket.Server({
   port: 3001
});

wss.on("error", (error) => {
   console.log("Error has occured on socket:" + error);
})

function serializeSocketMessage(type, payload) {
   return JSON.stringify({ type: type, payload: payload });
}

wss.broadcast = function (data, sender) {
   wss.clients.forEach(function (client) {
      if (client !== sender) {
         client.send(data)
      }
   })
}

var connectedPlayerCount = 0;

wss.on("connection", (socket, request) => {

   connectedPlayerCount++;

   if (connectedPlayerCount == 2) {
      var die = Math.random()
      var color = die < 0.5 ? true : false;

      socket.send(serializeSocketMessage('startGame', { color: color }))
      wss.broadcast(serializeSocketMessage('startGame', { color: !color }), socket)
   }

   console.log("Client connected; Total player count: " + connectedPlayerCount);
   socket.onmessage = (message) => {

      var messageObject = JSON.parse(message.data);

      let type = messageObject.type;
      let payload = messageObject.payload;

      switch (type) {
         case "playerMove":
            wss.broadcast(serializeSocketMessage("opponentMoved", payload), socket)
            console.log(payload)
            break;
         default:
            console.log("Got message with unknown type: " + messageObject)

      }
   }

   socket.onclose = (ev) => {
      console.log("Client disconnected!");
      connectedPlayerCount--;

   }
})

