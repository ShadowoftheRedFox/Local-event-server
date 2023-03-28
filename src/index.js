// setting up constants
var express = require('express');
var http = require('http');
const app = express();
/**
 * @type {http.Server}
 */
const serv = http.Server(app);

// login token
const token = "abcd";

// handle responses
// handle raw request
app.get('/', function (req, res) {
    if (req.query.token != token) {
        return res.status(404);
    }
    try {
        console.log(req.query);
        const jsonData = JSON.parse(req.query.json);
        if (jsonData.param) {
            const result = { res: parseInt(jsonData.param[0]) + parseInt(jsonData.param[1]) }
            return res.send(JSON.stringify(result));
        }
        console.log(jsonData);
        res.send(JSON.stringify(jsonData));
    } catch (e) {
        console.log(e);
        res.status(500).send("<p>Something went wrong, oops.</p>");
    }
});

app.get('/json/', function (req, res) {
    if (req.query.token != token) {
        return res.status(404);
    }
    res.sendFile(__dirname + "/client/t.json");
});

app.get('/chat/', function (req, res) {
    res.sendFile(__dirname + "/piesocket.html");
});

// start client
app.use('client', express.static(__dirname + '/client'))
app.use(express.static(__dirname + '/client'));

// will run on client IP and port 2000
serv.listen(2000, () => {
    console.clear();
    console.log(`Running on host IP on port 2000.\n`)
    console.log(serv.address());
});