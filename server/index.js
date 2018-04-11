const express = require('express')
    , app = express()
    , http = require('http').Server(app)
    , io = require('socket.io')(http)
    , path = require('path')
    , PORT = 3000;

app.get('/', (req, res) => {
   res.sendFile(`${path.dirname(__dirname)}/client/index.html`);
});

app.use('/public', express.static(`${path.dirname(__dirname)}/client/public`));

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

http.listen(PORT, function () {
    console.log(`listening on *:${PORT}`);
});
