

(function() {
    let string = "";

function BeginPath(x, y) {
    this.coordinates = [x, y];
    this.type="beginpath";
	this.time = new Date().getTime();
}

function BeginText(x, y , canvas) {
    this.type = "beginText";
    this.coordinates = [x, y];
    this.canvas = canvas;
    this.time = new Date().getTime();
}

function BeginShape(x, y, canvas) {
	this.type = "beginshape";
	this.canvas = canvas;
	this.coordinates = [x, y];
	this.time = new Date().getTime();
}

function CloseText() {
    this.type = "closetext";
	this.time = new Date().getTime();
}

function ClosePath() {
    this.type = "closepath";
	this.time = new Date().getTime();
}

function DrawPathToPoint(x, y) {
    this.type = "drawpathtopoint";
    this.coordinates = [x, y];
    this.time = new Date().getTime();
}

function Erase(x, y) {
    this.type = "erase";
    this.coordinates = [x, y];
    this.height = 5;
    this.width = 5;
    this.time = new Date().getTime();
}

function Rectangle(sx, sy, ex, ey, canvas) {
	this.type = "rectangle";
	this.coordinates = [sx, sy, ex, ey];
	this.canvas = canvas;
	this.time = new Date().getTime();
}
function Oval(x, y, w, h, canvas) {
	this.type = "oval";
	this.coordinates = [x, y, w, h];
	this.canvas = canvas;
	this.time = new Date().getTime();
}

function StrokeStyle(color) {
    this.type = "strokestyle";
    this.color = color;
    this.time = new Date().getTime();
}

function TextStyle(color) {
    this.type = "textStyle";
    this.color = color;
    this.time = new Date().getTime();
}


function Restore(canvas) {
	this.type = "restore";
	if (canvas !== undefined) {
		this.canvas = canvas;
	}
	this.time = new Date().getTime();
}


window.Whiteboard = {

    context: null,
    canvas: null,
    type: '',
    coordinates: [0,0],
    events: [],
    animationind: 0,
    socket: null,
    drawColor: '#000000',
    temp: null,

    init: function(canvasid) {
        // this.sock = sockett;
        // console.log(sockett);
	    // set the canvas width and height
	    // the offsetWidth and Height is default width and height
	    this.canvas = document.getElementById(canvasid);
	    this.canvas.width = this.canvas.offsetWidth;
	    this.canvas.height = this.canvas.offsetHeight;
	
	    //console.log(this.canvas);
	    this.context = this.canvas.getContext('2d');
	
	    //initial values for the drawing context
	    this.context.lineWidth = 5;
	    this.context.lineCap = "round";
	    var zoomFactor = 1.0;
	
	    // Initialize the selected color
	    var col = this.drawColor;
	    this.drawColor = null;
	    this.setStrokeStyle(col);
        this.setTextStyle(col);
    },

            /* zahra start*/
    change_range: function(range) {
                this.context.lineWidth = range;
    },
    
            /*zahra end */

    setSock: function(sock){
        // console.log(sock);
        Whiteboard.socket = sock;
        // console.log("thisthis r", Whiteboard.socket);
    },

    execute: function(wbevent, firstexecute) {
        // console.log("execute running")
        
        if (this.events.length > 1){
            // console.log(this.events);
            // if (this.events !== this.temp){
                this.socket.emit("whiteboard", this.events);
                // console.log("thisthis e", Whiteboard.socket);it("whiteboard", this.events);
                // console.log("im here");
                this.temp = this.events;
            // }
            
        }
        
        var type = wbevent.type;
        var wid;
        var hei;
        var tmp;
        var x = 0;
        if(firstexecute || firstexecute === undefined) {
            //console.log(wbevent);
            wbevent.time = new Date().getTime();
            this.events.push(wbevent);
        }

        if(type === "beginpath") {
            this.context.beginPath();
            this.context.moveTo(wbevent.coordinates[0],
                           wbevent.coordinates[1]);
            this.context.stroke();
        } else if(type === "beginshape") {
	        this.context.save();
            this.context.beginPath();

        }else if(type === "text"){
            //Whiteboard.context.clearRect(0,0, Whiteboard.canvas.width, Whiteboard.canvas.height);
            console.log(wbevent.tarray);
            array = wbevent.tarray;
            var i = 0;
            for (i=0; i<array.length; i++ ){

                var imgData = array[i];
                var img = new Image();

                img.src = imgData;
                img.onload = function(){
                   // Whiteboard.context.clearRect(0,0, Whiteboard.canvas.width, Whiteboard.canvas.height);
                    Whiteboard.context.drawImage(img, 0, 0, Whiteboard.canvas.width, Whiteboard.canvas.height, 0, 0, Whiteboard.canvas.width, Whiteboard.canvas.height);
                }

            }

        }else if(type === "beginText"){  // FLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG
            this.context.save();
            //this.context.beginText();
            var mouseX = 0;
            var mouseY = 0;
            var startingX = 0;

            var recentWords = [];
            var undoList = []; // use this to initialize the canvas

            /*console.log(undoList);
            console.log(recentWords);*/

            function saveState(){
                undoList.push(Whiteboard.canvas.toDataURL());
            }

            saveState();

            function undo(){
                undoList.pop();

                var imgData = undoList[undoList.length - 1];
                var img = new Image();

                img.src = imgData;
                img.onload = function(){
                    Whiteboard.context.clearRect(0,0, Whiteboard.canvas.width, Whiteboard.canvas.height);
                    Whiteboard.context.drawImage(img, 0, 0, Whiteboard.canvas.width, Whiteboard.canvas.height, 0, 0, Whiteboard.canvas.width, Whiteboard.canvas.height);
                }
            }
        
            Whiteboard.canvas.addEventListener("click" , function(e){
                mouseX = e.pageX - Whiteboard.canvas.offsetLeft;
                mouseY = e.pageY - Whiteboard.canvas.offsetTop;
                startingX = mouseX;

                recentWords = [];
                
                return false
            }, false);
        
            document.addEventListener("keydown" , function(e){
                Whiteboard.context.font = "18px Arial";
                if (e.keyCode === 8){
                    undo();
                    var recentWord = recentWords[recentWords.length - 1];

                    mouseX -= Whiteboard.context.measureText(recentWord).width;
                    recentWords.pop();
                }
                else if (e.keyCode === 13){
                    mouseX = startingX;
                    mouseY += 22 //The size of font + 4
                }
                else{
                    Whiteboard.context.fillText(e.key , mouseX , mouseY);
                    mouseX += Whiteboard.context.measureText(e.key).width;

                    saveState();
                    recentWords.push(e.key);
                }
                
            }, false);

            const Textobj = {type:"text", tarray:undoList};
            this.events.push(Textobj);
            
        }
        else if (type === "drawpathtopoint") {  
            this.context.lineTo(wbevent.coordinates[0],
                           wbevent.coordinates[1]);
            this.context.stroke();
        } else if (type === "closepath") {
            this.context.closePath();
        } else if (type === "closetext") {
            this.context.closeText();
        }
        
        else if(type === "strokestyle") {
            this.context.strokeStyle = wbevent.color;
        }
        else if(type == "textStroke"){
            this.context.textStyle = wbevent.color;

        } else if (type === "restore") {
            wid = this.canvas.width;
            hei = this.canvas.height;
	        this.context.clearRect(0, 0, wid, hei);
	        if (wbevent.canvas !== undefined) {
		        this.context.drawImage(wbevent.canvas, 0, 0);
	        }
        } else if (type === "erase") {
            this.context.clearRect(wbevent.coordinates[0],
                              wbevent.coordinates[1],
                              wbevent.width,
                              wbevent.height);
        } else if (type === "rectangle") {
	        var sx = wbevent.coordinates[0];
	        var sy = wbevent.coordinates[1];
	        var ex = wbevent.coordinates[2];
	        var ey = wbevent.coordinates[3];
	        tmp = 0;
	        if (ex < sx) {
		        tmp = sx;
		        sx = ex;
		        ex = tmp;
	        }
	        if (ey < sy) {
		        tmp = sy;
		        sy = ey;
		        ey = tmp;
	        }
	
	        if (wbevent.canvas !== undefined) {
                wid = this.canvas.width;
                hei = this.canvas.height;
		        this.context.clearRect(0, 0, wid, hei);
		        this.context.drawImage(wbevent.canvas, 0, 0);
	        }
	        this.context.beginPath();
	        this.context.rect(sx, sy, ex-sx, ey-sy);
	        this.context.closePath();
	        this.context.stroke();
        } else if (type === "oval") {
	        var x = wbevent.coordinates[0];
	        var y = wbevent.coordinates[1];
	        var w = wbevent.coordinates[2];
	        var h = wbevent.coordinates[3];
	
	        var kappa = 0.5522848;
	        var ox = (w / 2) * kappa;
	        var oy = (h / 2) * kappa;
	        var xe = x + w;
	        var ye = y + h;
	        var xm = x + w / 2;
	        var ym = y + h / 2;
	
	        if (wbevent.canvas !== undefined) {
                wid = this.canvas.width;
                hei = this.canvas.height;
		        this.context.clearRect(0, 0, wid, hei);
		        this.context.drawImage(wbevent.canvas, 0, 0);
	        }
	
	        this.context.beginPath();
	        this.context.moveTo(x, ym);
	        this.context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	        this.context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	        this.context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	        this.context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	        this.context.closePath();
	        this.context.stroke();
        }
    },

    getRelative: function() {
	    return {width: this.canvas.width/this.canvas.offsetWidth,
			    height: this.canvas.height/this.canvas.offsetHeight};
    },

    upimg: function(){ /////////////////// fix the width and height of the 
        let imgInput = document.getElementById('button_img');
        imgInput.addEventListener('change', function(e) {
          if(e.target.files) {
            let imageFile = e.target.files[0]; //here we get the image file
            var reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = function (e) {
              var myImage = new Image(); // Creates image object
              myImage.src = e.target.result; // Assigns converted image to image object
              myImage.onload = function(ev) {
                //var myCanvas = document.getElementById("myCanvas"); // Creates a canvas object
                //var myContext = myCanvas.getContext("2d"); // Creates a contect object
                //myCanvas.width = myImage.width; // Assigns image's width to canvas
                //myCanvas.height = myImage.height; // Assigns image's height to canvas
                //myImage.style.width = '800px';
                Whiteboard.context.drawImage(myImage,0,0); // Draws the image on canvas
                let imgData = Whiteboard.canvas.toDataURL("image/jpeg",0.75); // Assigns image base64 string in jpeg format to a variable
                Whiteboard.events.push(imgData);
              }
            }
          } 
        });
    },


    saveAs: function(type) {
	    if (type === undefined) {
		    type = "png";
	    }
	    type = type.toLowerCase();
	
	    var img = null;
	    if (type == 'jpg' || type == 'jpeg') {
		    img = Canvas2Image.saveAsJPEG(Whiteboard.canvas, true);
	    } else if (type == 'bmp') {
		    img = Canvas2Image.saveAsBMP(Whiteboard.canvas, true);
	    } else {
		    img = Canvas2Image.saveAsPNG(Whiteboard.canvas, true);
	    }
	    var options = 'width=' + Whiteboard.canvas.width + ',' +
		    'height=' + Whiteboard.canvas.height;
	    var win = window.open('','Save image',options);
	    win.innerHTML = "";
	    win.document.body.appendChild(img);
    },



    animate: function() {
	    Whiteboard.animationind = 0;
	    Whiteboard.context.clearRect(0,0,Whiteboard.canvas.width,Whiteboard.canvas.height);
	    Whiteboard.animatenext();
    },

    animatenext: function() {
        if(Whiteboard.animationind === 0) {
            Whiteboard.execute(Whiteboard.events[0], false);
            Whiteboard.animationind++;   
        }
        
        Whiteboard.execute(Whiteboard.events[Whiteboard.animationind], false);
        Whiteboard.animationind++;
        
        if (Whiteboard.animationind < Whiteboard.events.length - 1) {
            //var now = new Date().getTime();
	        //var dtime = Whiteboard.events[Whiteboard.animationind+1].time - Whiteboard.events[Whiteboard.animationind].time;
            //dtime = dtime / 1000;
            setTimeout(Whiteboard.animatenext,0);
        }
    },

    draw_whiteboard: function(event_list) {
        // console.log("im in draw");
        for (i=0; i<event_list.length; i++){
            // console.log("im in draw for");
            Whiteboard.execute(event_list[i], false);
        }
    },


    beginPencilDraw: function(x, y) {
        var e = new BeginPath(x, y);
        Whiteboard.execute(e);
    },

    beginText: function(x, y) {
        var e = new BeginText(x, y);
        Whiteboard.execute(e);
    },

 
    pencilDraw: function(x, y) {
        var e = new DrawPathToPoint(x, y);
        Whiteboard.execute(e);
    },

    Text: function(x, y) {
        var tmp = document.createElement("canvas");
        var tmpcnv = tmp.getContext('2d');
        tmp.width = Whiteboard.canvas.width;
        tmp.height = Whiteboard.canvas.height;
        tmpcnv.font = "30px Arial";
        tmpcnv.fillText(Whiteboard.canvas, 0, 0);
	    var e = new BeginText(x, y, tmp);
        Whiteboard.execute(e);
        
    },


    beginErasing: function(x, y) {
        var e = new BeginPath(x, y);
        Whiteboard.execute(e);
    },


    erasePoint: function(x, y) {
        var e = new Erase(x, y);
        Whiteboard.execute(e);
    },


    beginShape: function(x, y) {
        var tmp = document.createElement("canvas");
        var tmpcnv = tmp.getContext('2d');
        tmp.width = Whiteboard.canvas.width;
        tmp.height = Whiteboard.canvas.height;
        tmpcnv.drawImage(Whiteboard.canvas, 0, 0);
	    var e = new BeginShape(x, y, tmp);
	    Whiteboard.execute(e);
    },


    drawRectangle: function(x, y) {
	    var i = Whiteboard.events.length - 1;
	    while (i >= 0) {
		    var e = Whiteboard.events[i];
		    if (e.type === "beginshape") {
			    var ev = new Rectangle(e.coordinates[0], e.coordinates[1], x, y, e.canvas);
			    Whiteboard.execute(ev);
			    e = ev = undefined;
			    break;
		    }
		    i--;
	    }
    },

    drawOval: function(x, y) {
	    var i = Whiteboard.events.length - 1;
	    while (i >= 0) {
		    var e = Whiteboard.events[i];
		    if (e.type === "beginshape") {
			    var sx = e.coordinates[0];
			    var sy = e.coordinates[1];
			    var wid = x-sx;
			    var hei = y-sy;
			
			    var ev = new Oval(sx, sy, wid, hei, e.canvas);
			    Whiteboard.execute(ev);
			    e = ev = undefined;
			    break;
		    }
		    i--;
	    }
    },


    setStrokeStyle: function(color) {
	    if (color != Whiteboard.drawColor) {
		    var e = new StrokeStyle(color);
		    Whiteboard.execute(e);
	    }
    },

    setTextStyle: function(color) {
	    if (color != Whiteboard.drawColor) {
		    var e = new TextStyle(color);
		    Whiteboard.execute(e);
	    }
    },


    redraw: function() {
        //this.init();
	    Whiteboard.context.clearRect(0,0,Whiteboard.canvas.width,Whiteboard.canvas.height);
        var redrawEvents = this.events;
        this.events = [];
        
        for(var i=0;i < redrawEvents.length; i++) {
            this.execute(redrawEvents[i]);
        }
    },

    /**
     * This removes the last event from this events 
     * and redraws (it can be made more 
     * effective then to redraw but time is limited)
    */
    undo: function() {
        reverseEvent = this.events.pop();
        console.log(reverseEvent.type);
        this.redraw();
    }

    /* === END ACTIONS === */

    };
})();
