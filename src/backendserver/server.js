
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server running...\n');
});

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  setInterval(() => {
    const randomData = Math.floor(Math.random() * 100);
    socket.emit('data', randomData);
  }, 1000);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});
