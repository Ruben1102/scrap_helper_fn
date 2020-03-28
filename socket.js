const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send("<h1>It's me Socket.io</h1>");
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('draw', (data) => {
      // io.emit('draw', data);
      socket.broadcast.emit('draw', data);
      console.log('emited');
    });
});

http.listen(4444, ()=> console.log('running in port 4444'));
