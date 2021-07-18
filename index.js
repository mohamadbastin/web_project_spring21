const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var cors = require('cors');

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080/');
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080/public/');
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080/public');
  

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', false);

//   // Pass to next layer of middleware
//   next();
// });

app.use(cors({origin: '*'}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    // res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    // res.send('cors problem fixed:)');
  res.sendFile(__dirname + '/public/index.html');
});




io.on('connection', (socket) => {

    console.log('a user connected');
    // add user to list 
    // send new list of users

    socket.on('disconnect', () => {
        console.log('user disconnected');
        //remove user from list
        //send new list of users 
    });

    socket.on('name', msg => {
        console.log(msg)
        io.emit('added', msg)

        //add user to list
        //send new list of users
    })

    socket.on('lets_voice', msg => {
      io.emit('lets_voice', msg)
    });

  

    socket.on('chat', (msg) => {
        
        console.log('message: ' + msg);

        io.emit('new-message', msg);

        //add message to list
        //send new list of messages

    });

    socket.on('whiteboard', (msg) => {

         // broadcast new white board

    });

    
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});