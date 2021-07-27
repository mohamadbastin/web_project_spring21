const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var cors = require("cors");

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

app.use(cors({ origin: "*" }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  // res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  // res.send('cors problem fixed:)');
  res.sendFile(__dirname + "/public/index.html");
});

var channels = {};
var sockets = {};

var attendees = {};
// var roles = {}

io.on("connection", (socket) => {
  socket.channels = {};
  sockets[socket.id] = socket;

  console.log("[" + socket.id + "] connection accepted");

  // emit the new user

  socket.on("disconnect", () => {
    for (var channel in socket.channels) {
      part(channel);
    }
    console.log("[" + socket.id + "] disconnected");
    delete sockets[socket.id];
    //remove user from list
    //send new list of users
  });

  socket.on("name", (msg) => {
    console.log(msg);
    io.emit("added", msg);

    //add user to list
    //send new list of users
  });

  socket.on("lets voice", (msg) => {
    io.emit("lets voice", msg);
  });

  socket.on("join voice", function (config) {
    console.log("[" + socket.id + "] join ", config);
    var channel = config.channel;
    var userdata = config.userdata;

    if (channel in socket.channels) {
      console.log("[" + socket.id + "] ERROR: already joined ", channel);
      return;
    }

    if (!(channel in channels)) {
      channels[channel] = {};
    }

    for (id in channels[channel]) {
      channels[channel][id].emit("addPeer", {
        peer_id: socket.id,
        should_create_offer: false,
      });
      socket.emit("addPeer", { peer_id: id, should_create_offer: true });
    }

    channels[channel][socket.id] = socket;
    socket.channels[channel] = channel;
  });

  function part(channel) {
    console.log("[" + socket.id + "] part ");

    if (!(channel in socket.channels)) {
      console.log("[" + socket.id + "] ERROR: not in ", channel);
      return;
    }

    delete socket.channels[channel];
    delete channels[channel][socket.id];

    for (id in channels[channel]) {
      channels[channel][id].emit("removePeer", { peer_id: socket.id });
      socket.emit("removePeer", { peer_id: id });
    }
  }
  socket.on("part", part);

  socket.on("relayICECandidate", function (config) {
    var peer_id = config.peer_id;
    var ice_candidate = config.ice_candidate;
    console.log(
      "[" + socket.id + "] relaying ICE candidate to [" + peer_id + "] ",
      ice_candidate
    );

    if (peer_id in sockets) {
      sockets[peer_id].emit("iceCandidate", {
        peer_id: socket.id,
        ice_candidate: ice_candidate,
      });
    }
  });

  socket.on("relaySessionDescription", function (config) {
    var peer_id = config.peer_id;
    var session_description = config.session_description;
    console.log(
      "[" + socket.id + "] relaying session description to [" + peer_id + "] ",
      session_description
    );

    if (peer_id in sockets) {
      sockets[peer_id].emit("sessionDescription", {
        peer_id: socket.id,
        session_description: session_description,
      });
    }
  });

  socket.on("chat", (msg) => {
    // console.log('message: ' + msg);

    // io.emit('new-message', msg);

    var n = attendees[msg.user][1];

    console.log("message: " + n, msg.text);

    var d = { user: n, text: msg.text };

    io.emit("new-message", d);

    //add message to list
    //send new list of messages
  });

  socket.on("whiteboard", (msg) => {
    // broadcast new white board
    //  console.log('boz');
    socket.broadcast.emit("whiteboard", msg);
  });

  socket.on("im new", (msg) => {
    // names.push(msg);
    // roles.push("host");
    console.log("the name is ", msg);
    // console.log(socket.id);
    attendees[msg[0]] = ["host", msg[1]];

    // console.log(attendees);

    io.emit("new user", msg);
  });

  socket.on("whats my name", (msg) => {

    var n = attendees[msg][1];
    console.log(n);
    socket.emit("your name", n);
  });

  socket.on("get initial att", (msg) => {
    console.log("init");
    socket.emit("get inistial att", attendees);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
