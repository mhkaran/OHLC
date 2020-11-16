const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const worker_1 = require('./worker_1');
const worker_2 = require('./worker_2');
const Hashtable = require('jshashtable');
global.hashtable  = new Hashtable();
global.clientList = new Hashtable();

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', function(message) {
        message = JSON.parse(message);
        let clients = global.clientList.get(message.symbol)
        if (clients)
            clients.push(ws);
        else{
        clients=[];
        clients.push(ws)
        }
        global.clientList.put(message.symbol,clients)
 })
})

global.broadcast = function (symbol) {
    let clients = global.clientList.get(symbol);
    if (clients){    
    clients.forEach(client => {
             client.send(JSON.stringify(global.hashtable.get(symbol)));
    });

}
}

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});

