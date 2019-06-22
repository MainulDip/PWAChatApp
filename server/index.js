const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.Server(app);


const io = socketio(server);


const messageData = fs.readFileSync(`${__dirname}/db.json`).toString();
const messages = messageData ? JSON.parse(messageData) : [];

//litsen new connection for socket
io.on('connection', (socket) => {
    console.log('New Connection Clients');
    socket.emit('all_messages', messages);
    socket.on('new_message', (message) => {
		messages.unshift(message);

		socket.broadcast.emit('new_message', message);

		fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(messages));
    })
})


// serve "app" directory

app.use(express.static(`${__dirname}/../app`));

app.use('/modules', express.static(`${__dirname}/../node_modules`));

server.listen(3333, () => console.log('Photo Message On Port 3333'))