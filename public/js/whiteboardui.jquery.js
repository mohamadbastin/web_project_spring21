

(function() {
	
window.WhiteboardUi = {
	
	zoomrel: 1,
	canvasElement: null, // jQuery element for canvas

	elementConf: {
		// Classes
		pencil_active:		null,
		text_active:		null,
		eraser_active:		null,
		rectangle_active:	null,
		oval_active:		null,
		
		// Element ids
		button_pencil:		null,
		button_text:		null,
		button_img:			null,
		button_color:		null,
		button_eraser:		null,
		button_zoomin:		null,
		button_zoomout:		null,
		button_zoom:		null,
		button_rotate:		null,
		button_animate:		null,
		button_undo:		null,
		button_shape:		null,
		button_rectangle:	null,
		button_oval:		null,
		button_saveas:		null,
		button_savepng:		null,
		button_savejpeg:	null,
		button_savebmp:		null,
		input_color:		null,
		input_rotation:		null,
		shape_menu:			null,
		saveas_menu:		null,
		zoom_element:		null,
		zoom_section:		null,
		zoom_amount:		null,
		zoom_slider:		null,
		zoom_bar:			null
	},

	activeElems: {
		shape_menu:		false,
		saveas_menu:	false,
		zoom:			false
	},
	

	init: function(canvasElement, elemconf) {
		this.canvasElement = canvasElement;
		Whiteboard.init(canvasElement.attr("id"));
		if (elemconf !== undefined) {
			for (var i in this.elementConf) {
				if (elemconf.i !== undefined) {
					this.elementConf.i = elemconf.i;
				}
			}
		}
		this.addListeners();
	},
	

	getElementName: function(ind) {
		if (WhiteboardUi.elementConf[ind] === undefined || 
				WhiteboardUi.elementConf[ind] === null) {
			return ind;
		}
		return WhiteboardUi.elementConf[ind];
	},
	

	getElement: function(ind) {
		return $('#' + WhiteboardUi.getElementName(ind));
	},
	

	addListeners: function() {
		WhiteboardUi.getElement('button_pencil').mousedown(function() {
			Whiteboard.setStrokeStyle(WhiteboardUi.getElement('input_color').attr("value"));
			WhiteboardUi.activatePencil();
		});

		WhiteboardUi.getElement('button_text').mousedown(function(){ // not okay!!!
			Whiteboard.setTextStyle(WhiteboardUi.getElement('input_color').attr("value"));
			WhiteboardUi.activateText();
		});


		WhiteboardUi.getElement('button_color').mousedown(function() {
			Whiteboard.setStrokeStyle(WhiteboardUi.getElement('input_color').attr("value"));
		});

            /* zahra start*/
            WhiteboardUi.getElement('green').mousedown(function() {
                Whiteboard.setStrokeStyle(WhiteboardUi.getElement('green').attr("value"));
                WhiteboardUi.shapeMenu();
                WhiteboardUi.activatePencil();
                $(".toggle-button").parent().find("ul").slideToggle(function() {
                    // Animation complete.
                });
            });

            WhiteboardUi.getElement('red').mousedown(function() {
                Whiteboard.setStrokeStyle(WhiteboardUi.getElement('red').attr("value"));
				Whiteboard.setTextStyle(WhiteboardUi.getElement('red').attr("value"));
                WhiteboardUi.activatePencil();
                WhiteboardUi.shapeMenu();
                $(".toggle-button").parent().find("ul").slideToggle(function() {
                    // Animation complete.
                });
            });

            WhiteboardUi.getElement('blue').mousedown(function() {
                Whiteboard.setStrokeStyle(WhiteboardUi.getElement('blue').attr("value"));
                WhiteboardUi.activatePencil();
                WhiteboardUi.shapeMenu();
                $(".toggle-button").parent().find("ul").slideToggle(function() {
                    // Animation complete.
                });
            });

            WhiteboardUi.getElement('yellow').mousedown(function() {
                Whiteboard.setStrokeStyle(WhiteboardUi.getElement('yellow').attr("value"));
                WhiteboardUi.activatePencil();
                WhiteboardUi.shapeMenu();
                $(".toggle-button").parent().find("ul").slideToggle(function() {
                    // Animation complete.
                });
            });

            WhiteboardUi.getElement('aqua').mousedown(function() {
                Whiteboard.setStrokeStyle(WhiteboardUi.getElement('aqua').attr("value"));
                WhiteboardUi.activatePencil();
                WhiteboardUi.shapeMenu();
                $(".toggle-button").parent().find("ul").slideToggle(function() {
                    // Animation complete.
                });
            });

            WhiteboardUi.getElement('black').mousedown(function() {
                Whiteboard.setStrokeStyle(WhiteboardUi.getElement('black').attr("value"));
                WhiteboardUi.activatePencil();
                WhiteboardUi.shapeMenu();
                $(".toggle-button").parent().find("ul").slideToggle(function() {
                    // Animation complete.
                });
            });

            WhiteboardUi.getElement('orange').mousedown(function() {
                Whiteboard.setStrokeStyle(WhiteboardUi.getElement('orange').attr("value"));
                WhiteboardUi.activatePencil();
                WhiteboardUi.shapeMenu();
                $(".toggle-button").parent().find("ul").slideToggle(function() {
                    // Animation complete.
                });
            });

            WhiteboardUi.getElement('purple').mousedown(function() {
                Whiteboard.setStrokeStyle(WhiteboardUi.getElement('purple').attr("value"));
                WhiteboardUi.activatePencil();
                WhiteboardUi.shapeMenu();
                $(".toggle-button").parent().find("ul").slideToggle(function() {
                    // Animation complete.
                });
            });

            WhiteboardUi.getElement('white').mousedown(function() {
                Whiteboard.setStrokeStyle(WhiteboardUi.getElement('white').attr("value"));
                WhiteboardUi.activatePencil();
                WhiteboardUi.shapeMenu();
                $(".toggle-button").parent().find("ul").slideToggle(function() {
                    // Animation complete.
                });
            });

			WhiteboardUi.getElement('dark-green').mousedown(function() {
                Whiteboard.setStrokeStyle(WhiteboardUi.getElement('dark-green').attr("value"));
                WhiteboardUi.activatePencil();
                WhiteboardUi.shapeMenu();
                $(".toggle-button").parent().find("ul").slideToggle(function() {
                    // Animation complete.
                });
            });


            WhiteboardUi.getElement('pencil_width_id').mouseup(function() {
                this.setAttribute('value', this.value);
                //alert(WhiteboardUi.getElement('pencil_width_id').attr("value"));
                Whiteboard.change_range(WhiteboardUi.getElement('pencil_width_id').attr("value"));
                WhiteboardUi.activatePencil();
            });



            /* zahra end*/


		WhiteboardUi.getElement('button_eraser').mousedown(WhiteboardUi.activateEraser);

		WhiteboardUi.getElement('button_animate').mousedown(Whiteboard.animate);
		//remove onmousedown from html and make this work
		//WhiteboardUi.getElement('button_undo').mousedown(Whiteboard.undo);
		WhiteboardUi.getElement('button_shape').mouseup(WhiteboardUi.shapeMenu);
		WhiteboardUi.getElement('button_rectangle').mousedown(function() {
			Whiteboard.setStrokeStyle(WhiteboardUi.getElement('input_color').attr("value"));
			WhiteboardUi.shapeMenu();
			WhiteboardUi.activateRectangle();
		});
		WhiteboardUi.getElement('button_oval').mousedown(function() {
			Whiteboard.setStrokeStyle(WhiteboardUi.getElement('input_color').attr("value"));
			WhiteboardUi.shapeMenu();
			WhiteboardUi.activateOval();
		});
		WhiteboardUi.getElement('button_saveas').mouseup(WhiteboardUi.saveasMenu);
		WhiteboardUi.getElement('button_savepng').mouseup(function() {
			WhiteboardUi.saveasMenu();
			Whiteboard.saveAs('png');
		});

		WhiteboardUi.getElement('button_img').mouseup(function() {
			WhiteboardUi.saveimg();
			Whiteboard.upimg();
		});

		WhiteboardUi.getElement('button_savejpeg').mouseup(function() {
			WhiteboardUi.saveasMenu();
			Whiteboard.saveAs('jpeg');
		});
		WhiteboardUi.getElement('button_savebmp').mouseup(function() {
			WhiteboardUi.saveasMenu();
			Whiteboard.saveAs('bmp');
		});
	},
	

	getX: function(event) {
		var cssx = (event.clientX - this.canvasElement.offset().left);
	    var xrel = Whiteboard.getRelative().width;
	    var canvasx = cssx * xrel;
	    return canvasx;
	},

	getY: function(event) {
	    var cssy = (event.clientY - this.canvasElement.offset().top);
	    var yrel = Whiteboard.getRelative().height;
	    var canvasy = cssy * yrel;
	    return canvasy;
	},
	

	changeTool: function() {
		WhiteboardUi.canvasElement.unbind();
		WhiteboardUi.canvasElement.removeClass(WhiteboardUi.getElementName('pencil_active'));

		WhiteboardUi.canvasElement.removeClass(WhiteboardUi.getElementName('text_active'));

		WhiteboardUi.canvasElement.removeClass(WhiteboardUi.getElementName('eraser_active'));
		WhiteboardUi.canvasElement.removeClass(WhiteboardUi.getElementName('rectangle_active'));
		WhiteboardUi.canvasElement.removeClass(WhiteboardUi.getElementName('oval_active'));
	},
	
	activatePencil: function(event) {
		WhiteboardUi.changeTool();
		WhiteboardUi.canvasElement.bind("mousedown", WhiteboardUi.beginPencilDraw);
		WhiteboardUi.canvasElement.addClass(WhiteboardUi.getElementName('pencil_active'));
	},

	activateText: function(event) {
		WhiteboardUi.changeTool();
		WhiteboardUi.canvasElement.bind("mousedown", WhiteboardUi.beginText);
		WhiteboardUi.canvasElement.addClass(WhiteboardUi.getElementName('text_active'));
	},


	beginPencilDraw: function(event) {
	    Whiteboard.beginPencilDraw(WhiteboardUi.getX(event), WhiteboardUi.getY(event));
	    WhiteboardUi.canvasElement.bind("mousemove", function(event) {
	        Whiteboard.pencilDraw(WhiteboardUi.getX(event), WhiteboardUi.getY(event));
	    });
	    WhiteboardUi.canvasElement.bind("mouseup", WhiteboardUi.endPencilDraw);
	    WhiteboardUi.canvasElement.bind("mouseout", WhiteboardUi.endPencilDraw);
	},


	beginText: function(event) {
	    Whiteboard.beginText(WhiteboardUi.getX(event), WhiteboardUi.getY(event));
	    WhiteboardUi.canvasElement.bind("mousemove", function(event) {
	        Whiteboard.Text(WhiteboardUi.getX(event), WhiteboardUi.getY(event));
		});
		
	    WhiteboardUi.canvasElement.bind("mouseup", WhiteboardUi.endText);
	    WhiteboardUi.canvasElement.bind("mouseout", WhiteboardUi.endText);
	},
	
	endPencilDraw: function (event) {
		WhiteboardUi.canvasElement.unbind("mousemove");
		WhiteboardUi.canvasElement.unbind("mouseup");
		WhiteboardUi.canvasElement.unbind("mouseout");
	},

	endText: function (event) {
		WhiteboardUi.canvasElement.unbind("mousemove");
		WhiteboardUi.canvasElement.unbind("mouseup");
		WhiteboardUi.canvasElement.unbind("mouseout");
		Whiteboard.string = "";
	},

	activateEraser: function(event) {
		WhiteboardUi.changeTool();
		WhiteboardUi.canvasElement.bind("mousedown", WhiteboardUi.beginErasing);
		WhiteboardUi.canvasElement.addClass(WhiteboardUi.getElementName('eraser_active'));
	},

	beginErasing: function(event) {
	    Whiteboard.beginErasing(WhiteboardUi.getX(event), WhiteboardUi.getY(event));
	    WhiteboardUi.canvasElement.bind("mousemove", function(event) {
	        Whiteboard.erasePoint(WhiteboardUi.getX(event), WhiteboardUi.getY(event));
	    });
	    WhiteboardUi.canvasElement.bind("mouseup", WhiteboardUi.endErasing);
	    WhiteboardUi.canvasElement.bind("mouseout", WhiteboardUi.endErasing);
	},
	
	endErasing: function(event) {
		WhiteboardUi.canvasElement.unbind("mousemove");
		WhiteboardUi.canvasElement.unbind("mouseup");
		WhiteboardUi.canvasElement.unbind("mouseout");
	},
		

	
	shapeMenu: function(event) {
		var menu = WhiteboardUi.getElement('shape_menu');
		if (WhiteboardUi.activeElems.shape_menu === false) {
			WhiteboardUi.activeElems.shape_menu = true;
			var wid = menu.css('width');
			var hei = menu.css('height');
			menu.css('width', '0');
			menu.css('height', '0');
			menu.css('display', 'block');
			menu.animate({ 
			    width: wid,
			    height: hei
			}, 150);
		} else {
			WhiteboardUi.activeElems.shape_menu = false;
			menu.animate({ 
			    opacity: 0
			}, 150, function() {
				menu.css('display', 'none');
				menu.css('opacity', '1');
			});
		}
	},
	

	activateRectangle: function(event) {
		WhiteboardUi.changeTool();
		WhiteboardUi.canvasElement.bind("mousedown", WhiteboardUi.beginRectangle);
		WhiteboardUi.canvasElement.addClass(WhiteboardUi.getElementName('rectangle_active'));
	},

	beginRectangle: function(event) {
		Whiteboard.beginShape(WhiteboardUi.getX(event), WhiteboardUi.getY(event));
	    WhiteboardUi.canvasElement.bind("mousemove", function(event) {
	        Whiteboard.drawRectangle(WhiteboardUi.getX(event), WhiteboardUi.getY(event));
	    });
		WhiteboardUi.canvasElement.bind("mouseup", WhiteboardUi.endRectangle);
	},
	

	endRectangle: function(event) {
		Whiteboard.drawRectangle(WhiteboardUi.getX(event), WhiteboardUi.getY(event));
		WhiteboardUi.canvasElement.unbind("mousemove");
		WhiteboardUi.canvasElement.unbind("mouseup");
	},
	

	activateOval: function(event) {
		WhiteboardUi.changeTool();
		WhiteboardUi.canvasElement.bind("mousedown", WhiteboardUi.beginOval);
		WhiteboardUi.canvasElement.addClass(WhiteboardUi.getElementName('oval_active'));
	},
	

	beginOval: function(event) {
		Whiteboard.beginShape(WhiteboardUi.getX(event), WhiteboardUi.getY(event));
	    WhiteboardUi.canvasElement.bind("mousemove", function(event) {
	        Whiteboard.drawOval(WhiteboardUi.getX(event), WhiteboardUi.getY(event));
	    });
	    WhiteboardUi.canvasElement.bind("mouseup", WhiteboardUi.endOval);
	},

	endOval: function(event) {
		Whiteboard.drawOval(WhiteboardUi.getX(event), WhiteboardUi.getY(event));
		WhiteboardUi.canvasElement.unbind("mousemove");
		WhiteboardUi.canvasElement.unbind("mouseup");
	},
	

	saveasMenu: function(event) {
		var menu = WhiteboardUi.getElement('saveas_menu');
		if (WhiteboardUi.activeElems.saveas_menu === false) {
			WhiteboardUi.activeElems.saveas_menu = true;
			var wid = menu.css('width');
			var hei = menu.css('height');
			menu.css('width', '0');
			menu.css('height', '0');
			menu.css('display', 'block');
			menu.animate({ 
			    width: wid,
			    height: hei
			}, 150);
		} else {
			WhiteboardUi.activeElems.saveas_menu = false;
			menu.animate({ 
			    opacity: 0
			}, 150, function() {
				menu.css('display', 'none');
				menu.css('opacity', '1');
			});
		}
	},

	saveimg: function(event){
		//fix this later
	}
	
};



jQuery.fn.funktio = function(value) {
	// TODO
};

})();
