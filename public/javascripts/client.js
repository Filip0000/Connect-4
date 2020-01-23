var server = new WebSocket('ws://localhost:3001');

function serializeSocketMessage(type, payload) {
    return JSON.stringify({ type: type, payload: payload });
}

server.onerror = (error) => {
    console.log("An error has occured: " + error)
}


var messageObject = {
    type: "handshake"
}
server.onopen = (ev) => {
    console.log("Server connection opened")

    const game = new Game('#game');

    server.onmessage = (message) => {
        var messageObject = JSON.parse(message.data);
        let type = messageObject.type;
        let payload = messageObject.payload;
    
        switch (type) {
            case "opponentMoved":
                game.onOpponentMove(payload)
                break;
            case "startGame":
                game.setPlayerColor(payload.color)
                break;

            default:
                console.log("Got message with unknown type: " + messageObject)
        }

    }

    game.onPlayerMove = (moveObject) => {
        server.send(serializeSocketMessage("playerMove", moveObject))
    }


}