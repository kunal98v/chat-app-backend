
const server = require("http").createServer()

const io = require("socket.io")(server, {
    cors: {
      origin: 'https://chat-app-backend-p71m.onrender.com',
      methods: ["GET", "POST"]
    }
  });
server.listen(process.env.PORT);

const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id] = name;
        console.log(users);
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    
    socket.on('disconnect',message=>{
      socket.broadcast.emit('left',users[socket.id])
      delete users[socket.id]
    })
    
    
});
