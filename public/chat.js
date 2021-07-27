// import { socket } from './socket.js';

var groupChat = {

  mesgs : [
    { user: "reza", text: "asfjhdjkfasaasfasfkadskfhadshfjkasl", inchat: false },
    { user: "ali", text: "hello", inchat: false },
    { user: "reza", text: "asffaf", inchat: false },
    { user: "mmd", text: "asfjhdjkfkadskfhadshfjkasl", inchat: false },
    { user: "reza", text: "asfjhdjkfkadskfhadshfjkasl", inchat: false },
  ],

  chat_box : "",
  username : "",
  user_id: 0,

  init : function(user_id, socket){
    this.user_id = user_id;
      this.chat_box = document.getElementById("chatbox");
      this.username = attendees.user_name;
      for (var i in this.mesgs) {
          var node = document.createElement("p");
          var textnode = document.createTextNode(`${this.mesgs[i].user}: ${this.mesgs[i].text}`); 
          node.appendChild(textnode);
          this.chat_box.appendChild(node);
      }
      document.getElementById("submsg").addEventListener("click", this.send);
      document.getElementById("msg").addEventListener("keypress",function(e){
          if (e.keyCode == 13) {
              e.preventDefault();
              groupChat.send(socket);
          }
      })
  },

  send : function(socket){
    //var msg = document.getElementById("msg");
    if (msg.value.length > 0) {
      var newmsg = { user: this.user_id , text: msg.value };
      //this.mesgs.push(newmsg); // get a newmsg and push it
      // groupChat.pushMssg(newmsg);
      // import { socket } from './socket.js';
      // Tarp.require({main: "./socket.js"});
      // import './socket';
      // console.log(socket);
      socket.emit('chat', newmsg);
    }

  },

  pushMssg : function(name, msssg){
    var newMssg = {user: name, text: msssg};
      this.mesgs.push(newMssg);
      var msg = document.getElementById("msg");
      msg.value = "";
      this.chat_box.value = "";
      var node = document.createElement("p");
      var textnode = document.createTextNode(`${newMssg.user}: ${newMssg.text}`);
      node.appendChild(textnode);
      this.chat_box.appendChild(node);
      
  }

}