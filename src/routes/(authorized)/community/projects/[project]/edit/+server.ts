import { Server } from 'socket.io';

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Usuário conectado:", socket.id);

  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
    console.log(`Usuário ${socket.id} entrou no projeto ${projectId}`);
  });

  socket.on("updateCanvas", (projectId, data) => {    
    console.log(`Recebendo atualização para o projeto ${projectId}:`, data);
    socket.to(projectId).emit("updateCanvas", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

console.log("Servidor WebSocket rodando na porta 3000");