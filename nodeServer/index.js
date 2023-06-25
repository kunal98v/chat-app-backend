
const server = require("http").createServer()

const io = require("socket.io")(server, {
    cors: {
      origin: 'https://chat-app47.netlify.app',
      methods: ["GET", "POST"]
    }
  });
server.listen(process.env.PORT || 8000);

const users = {
    id:"" , 
    name:"" ,
    color:""
};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[id] = socket.id;
        users[name] = name;
        users[color] = Math.floor(Math.random()*16777215).toString(16);
        console.log(users);
        socket.broadcast.emit('user-joined',name);


         });

    socket.on('send',message=>{

      socket.broadcast.emit('receive',{message:message,name:users.name,id:users.id});
        
    });
    
    socket.on('disconnect',message=>{
      socket.broadcast.emit('left',users[socket.id])
      delete users[socket.id]
    });
    
    
});
