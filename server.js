const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;

app.use(express.static('public'));

let rooms = {};

io.on('connection', socket => {
  console.log('Nuevo jugador conectado: ' + socket.id);

  socket.on('joinRoom', room => {
    socket.join(room);
    if (!rooms[room]) rooms[room] = {};
    rooms[room][socket.id] = { clicks: 0 };
    io.to(room).emit('updatePlayers', rooms[room]);
  });

  socket.on('clickPotion', (room) => {
    if (rooms[room] && rooms[room][socket.id]) {
      rooms[room][socket.id].clicks += 1;
      io.to(room).emit('updatePlayers', rooms[room]);
    }
  });

  socket.on('disconnect', () => {
    for (let room in rooms) {
      if (rooms[room][socket.id]) {
        delete rooms[room][socket.id];
        io.to(room).emit('updatePlayers', rooms[room]);
      }
    }
    console.log('Jugador desconectado: ' + socket.id);
  });
});


