const express = require("express");
const app = express();

const http = require("http");

const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

const path = require("path");
app.use(express.urlencoded({extended : true}));

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.set(express.static(path.join(__dirname,"public")));

io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{id: socket.id, ...data});
    })
    console.log("New user connected");
    socket.on("disconnect",()=>{
        console.log("user-disconnected",socket.id);
    })
});



app.use(express.static('public', {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));

app.get('/',(req,res)=>{
    res.render("index.ejs");
});

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
