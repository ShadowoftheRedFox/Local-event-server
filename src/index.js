// setting up constants
const express = require('express');
const http = require('http');
const app = express();
const { WebSocketServer } = require('ws')
const sockserver = new WebSocketServer({ port: 443, host: "192.168.1.36" })

// start the websocket server
sockserver.on('connection', ws => {
    console.log('New client connected!')
    ws.send('connection established')
    ws.on('close', () => console.log('Client has disconnected!'))
    ws.on('message', data => {
        sockserver.clients.forEach(client => {
            console.log(`distributing message: ${data}`)
            client.send(`${data}`)
        })
    })
    ws.onerror = function () {
        console.log('websocket error')
    }
})

// start the http server
/**
 * @type {http.Server}
 */
const serv = http.Server(app);

// login token
const token = "";
const port = process.env.port || 80;
const hostname = "192.168.1.36";

// handle responses
app.get('/', function (req, res) {
    res.sendFile(__dirname + `/client.html?host:${encodeURI(host)}`);
});

app.get('/ip/', function (req, res) {
    res.end("Your IP Addresss is: " + req.socket.localAddress);
});


// make the base return directory in client folder
app.use('client', express.static(__dirname + '/client'))
app.use(express.static(__dirname + '/client'));

// will run on client IP and port 2000
serv.listen(port, hostname, () => {
    console.clear();
    console.log(`Running on host ${hostname} on port ${port}`);
});