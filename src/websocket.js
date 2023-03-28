// for online
// <script src="https://unpkg.com/piesocket-js@4"></script>

// package: npm i piesocket-js@4

const PieSocket = require("piesocket-js")

/*
// ! Can be paired with the http server so we get token when we want to connect:
Set Authentication Endpoint
Set an Authentication URL which generates and responds with JWT tokens. Channels SDK makes a POST request to this URL with Channel information, everytime an user tries to connect to a private room.

var pieSocket = new PieSocket({
    ...
    authEndpoint: "https://mywebsite.com/generate-jwt"
});
Copy
Optional, add headers to the authEndpoint request

var pieSocket = new PieSocket({
    ...
    authHeaders: {
        "Accept": "application/json",
        "Content-type" => "application/json"
    }
});
Copy
The URL should respond with following JSON on successful authentications.

{"auth":"*************"}

Set JWT Token
To skip the authEndpoint call, and set the JWT yourself, use following method.

var pieSocket = new PieSocket({
    ...
    jwt: "https://mywebsite.com/generate-jwt"
});
*/

// create the socket
var pieSocket = new PieSocket({
    clusterId: "demo",
    apiKey: "VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV",
    notifySelf: true,
    presence: true
});

// create a channel
pieSocket.subscribe("chat-room").then((channel) => {
    console.log("Channel is ready")

    // listening to an event in this specific channel
    channel.listen("new_message", (data, meta) => {
        console.log("New message: ", data);
    });

    // sending an event in this specific channel
    channel.publish("new_message", {
        from: "Anand",
        message: "Hello PieSocket!"
    })

    // list all members
    var members = channel.members;

    // get current member
    var thisMember = channel.getCurrentMember();
})

// leave the channel
pieSocket.unsubscribe("chat-room");