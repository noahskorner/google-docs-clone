import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import app from './app';
import env from './config/env.config';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: '*',
  },
});

server.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}...`);
});

io.on('connection', (socket) => {
  const documentId = socket.handshake.query.documentId as string;
  socket.join(documentId);

  socket.on('send-changes', (rawDraftContentState) => {
    socket.broadcast
      .to(documentId)
      .emit('receive-changes', rawDraftContentState);
  });

  socket.on('disconnect', () => {
    socket.leave(documentId);
  });
});
