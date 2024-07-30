// src/utils/websocket.js
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4000';

export const socket = io(SOCKET_URL);

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

socket.on('connect_error', (error) => {
  console.error('Connection Error:', error);
});

socket.on('reconnect_error', (error) => {
  console.error('Reconnection Error:', error);
});

export default socket;
