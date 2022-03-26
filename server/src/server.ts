import dotenv from 'dotenv';
import { Server } from 'socket.io';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import http from 'http';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import app from './app';
import env from './config/env.config';
import documentService from './services/document.service';

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
  const accessToken = socket.handshake.query.accessToken as string | undefined;
  const documentId = socket.handshake.query.documentId as string | undefined;

  if (accessToken === undefined || documentId === undefined)
    return socket.disconnect();
  else {
    jwt.verify(
      accessToken,
      env.ACCESS_TOKEN_SECRET,
      (err: VerifyErrors | null, decoded: unknown) => {
        const { id, email } = decoded as RequestUser;
        (socket as any).username = email;

        documentService
          .findDocumentById(parseInt(documentId), parseInt(id))
          .then(async (document) => {
            if (document === null) return socket.disconnect();

            socket.join(documentId);
            io.in(documentId)
              .fetchSockets()
              .then((clients) => {
                io.sockets.in(documentId).emit(
                  'participant-update',
                  clients.map((client) => (client as any).username)
                );
              });

            socket.on('send-changes', (rawDraftContentState) => {
              socket.broadcast
                .to(documentId)
                .emit('receive-changes', rawDraftContentState);
            });

            socket.on('disconnect', async () => {
              socket.leave(documentId);
              socket.disconnect();
              io.in(documentId)
                .fetchSockets()
                .then((clients) => {
                  io.sockets.in(documentId).emit(
                    'participant-update',
                    clients.map((client) => (client as any).username)
                  );
                });
            });
          });
      }
    );
  }
});
