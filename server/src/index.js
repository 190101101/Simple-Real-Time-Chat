const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: `http://localhost:${port}`,
    origin: `*`,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('room', (data) => {
    socket.join(data);
  });

  socket.on('message', (data) => {
    console.log(data);
    socket.to(data.room).emit('messageReturn', data);
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
