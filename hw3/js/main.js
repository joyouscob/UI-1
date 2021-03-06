$(function () {

	$('#myModal').modal('toggle');
	$(document).keypress("h",function() {
		$('#myModal').modal('toggle');
	});
	
	$('#helpbutton').click(function() {
		$('#myModal').modal('toggle');
	});
	
	// var _h = $(window).height();
	// var _w = $(window).width();
	// $('video').css("width", $('video').width()+25+'px');

	
	var _isDown, _points, _strokeID, _r, _g, _rc, _v; // global variables

	_points = new Array(); // point array for current stroke
	_strokeID = 0;
	_r = new PDollarRecognizer();
	_v = $('video').get(0);

	var canvas = document.getElementById('myCanvas');
	_g = canvas.getContext('2d');
	_g.lineWidth = 3;
	_g.font = "1em Gentilis";
	_rc = getCanvasRect(canvas); // canvas rect on page
	// _g.fillStyle = "rgb(255,255,136)";
	// _g.fillRect(0, 0, _rc.width, 20);

	_isDown = false;
	
	_v.load();

	
	$("#myCanvas").mousedown(function(event) {
		// console.dir(event);
		mouseDownEvent(event.clientX, event.clientY, event.button);
	});

	$("#myCanvas").mousemove(function(event) {
		// console.dir(event);
		// console.dir(event.clientX);
		mouseMoveEvent(event.clientX, event.clientY, event.button);
	});

	$("#myCanvas").mouseup(function(event) {
		// console.dir(event);
		mouseUpEvent(event.clientX, event.clientY, event.button);
	});

	function getCanvasRect(canvas)
	{
		var w = canvas.width;
		var h = canvas.height;

		var cx = canvas.offsetLeft;
		var cy = canvas.offsetTop;
		while (canvas.offsetParent != null)
		{
			canvas = canvas.offsetParent;
			cx += canvas.offsetLeft;
			cy += canvas.offsetTop;
		}
		return {x: cx, y: cy, width: w, height: h};
	}
	function getScrollY()
	{
		var scrollY = 0;
		if (typeof(document.body.parentElement) != 'undefined')
		{
			scrollY = document.body.parentElement.scrollTop; // IE
		}
		else if (typeof(window.pageYOffset) != 'undefined')
		{
			scrollY = window.pageYOffset; // FF
		}
		return scrollY;
	}
	//
	// Mouse Events
	//
	function mouseDownEvent(x, y, button)
	{
		document.onselectstart = function() { return false; } // disable drag-select
		document.onmousedown = function() { return false; } // disable drag-select
		if (button <= 1)
		{
			_isDown = true;
			x -= _rc.x;
			y -= _rc.y - getScrollY();
			if (_strokeID == 0) // starting a new gesture
			{
				_points.length = 0;
				_g.clearRect(0, 0, _rc.width, _rc.height);
			}
			_points[_points.length] = new Point(x, y, ++_strokeID);
			// drawText("Recording stroke #" + _strokeID + "...");
			var clr = "rgb(" + rand(0,200) + "," + rand(0,200) + "," + rand(0,200) + ")";
			_g.strokeStyle = clr;
			_g.fillStyle = clr;
			// _g.fillRect(x - 4, y - 3, 9, 9);
		}
		else if (button == 2)
		{
			// drawText("Recognizing gesture...");
		}
	}
	function mouseMoveEvent(x, y, button)
	{
		if (_isDown)
		{
			x -= _rc.x;
			y -= _rc.y - getScrollY();
			_points[_points.length] = new Point(x, y, _strokeID); // append
			// drawConnectedPoint(_points.length - 2, _points.length - 1);
		}
	}
	function mouseUpEvent(x, y, button)
	{
		document.onselectstart = function() { return true; } // enable drag-select
		document.onmousedown = function() { return true; } // enable drag-select
		if (button <= 1)
		{
			if (_isDown)
			{
				_isDown = false;
				// drawText("Stroke #" + _strokeID + " recorded.");
			}
		}
		else if (button == 2) // segmentation with right-click
		{
			if (_points.length >= 10)
			{
				var result = _r.Recognize(_points);
				drawText(result.Name);
				control(result);
			}
			else
			{
				// drawText("Too little input made. Please try again.");
			}
			_strokeID = 0; // signal to begin new gesture on next mouse-down
		}
	}
	function drawConnectedPoint(from, to)
	{
		_g.beginPath();
		_g.moveTo(_points[from].X, _points[from].Y);
		_g.lineTo(_points[to].X, _points[to].Y);
		_g.closePath();
		_g.stroke();
	}
	function drawText(str)
	{
		switch (str) {
			case "bolt":
			str = "Play/Pause";
			break;
			case "circle":
			str = "Mute";
			break;
			case "plus":
			str = "Increase Volume";
			break;
			case "minus":
			str = "Decrease Volume";
			break;
			case "arrow-up":
			str = "Help";
			break;
			case "arrow-right":
			str = "Increase Size";
			break;
			case "arrow-left":
			str = "Decrease Size";
			break;
			case "angle-right":
			str = "Jump Ahead";
			break;
			case "angle-left":
			str = "Jump Back";
			break;
			case "angles-right":
			str = "Speed Up";
			break;
			case "angles-left":
			str = "Slow Down";
			break;
		};
		
		$('#pop').attr("data-content", str);
		$('#pop').popover('show');
		setTimeout(function() {
			$('#pop').popover('hide');
		},2000);
	}
	function rand(low, high)
	{
		return Math.floor((high - low + 1) * Math.random()) + low;
	}
	function round(n, d) // round 'n' to 'd' decimals
	{
		d = Math.pow(10, d);
		return Math.round(n * d) / d
	}
	//
	// Multistroke Adding and Clearing
	//
	function onClickAddExisting()
	{
		if (_points.length >= 10)
		{
			var pointclouds = document.getElementById('pointclouds');
			var name = pointclouds[pointclouds.selectedIndex].value;
			var num = _r.AddGesture(name, _points);
			// drawText("\"" + name + "\" added. Number of \"" + name + "\"s defined: " + num + ".");
			_strokeID = 0; // signal to begin new gesture on next mouse-down
		}
	}
	function onClickAddCustom()
	{
		var name = document.getElementById('custom').value;
		if (_points.length >= 10 && name.length > 0)
		{
			var num = _r.AddGesture(name, _points);
			// drawText("\"" + name + "\" added. Number of \"" + name + "\"s defined: " + num + ".");
			_strokeID = 0; // signal to begin new gesture on next mouse-down
		}
	}
	function onClickCustom()
	{
		document.getElementById('custom').select();
	}
	function onClickDelete()
	{
		var num = _r.DeleteUserGestures(); // deletes any user-defined templates
		alert("All user-defined gestures have been deleted. Only the 1 predefined gesture remains for each of the " + num + " types.");
		_strokeID = 0; // signal to begin new gesture on next mouse-down
	}
	function onClickClearStrokes()
	{
		_points.length = 0;
		_strokeID = 0;
		_g.clearRect(0, 0, _rc.width, _rc.height);
		// drawText("Canvas cleared.");
	}
	function control(result)
	{
		var name = result.Name;
		switch (name) {
			// case "triangle":
			// play();
			// break;
			// case "bars":
			// pause();
			// break;
			case "angle-left":
			rw();
			break;
			case "angle-right":
			ff();
			break;
			case "angles-left":
			decel();
			break;
			case "angles-right":
			accel();
			break;
			case "plus":
			incr();
			break;
			case "minus":
			decr();
			break;
			case "circle":
			mute();
			break;
			case "bolt":
			toggle();
			break;
			case "arrow-up":
			help();
			break;
			// case "arrow-down":
			// short();
			// break;
			case "arrow-left":
			small();
			break;
			case "arrow-right":
			big();
			break;
		};
	}
	
	function toggle() 
	{
		!(_v.currentTime == 0 || _v.paused || _v.ended) ? _v.pause() : _v.play();
	}
	function play() 
	{
		_v.play();
	}
	function pause() 
	{
		_v.pause();
	}
	function ff() 
	{
		_v.currentTime+=10;
	}
	function rw() 
	{
		_v.currentTime-=10;
	}
	function accel() 
	{
		_v.playbackRate++;
	}
	function decel() 
	{
		_v.playbackRate--;
	}
	function incr() 
	{
		_v.volume+=0.1;
	}
	function decr() 
	{
		_v.volume-=0.1;
	}
	function mute() 
	{
		(_v.muted == true) ? _v.muted=false : _v.muted=true;
	}
	function big() 
	{
		// var newWidth = $('video').width() + 25;
		$('video').css("width", $('video').width()+25+'px');
	}
	function small() 
	{
		$('video').css("width", $('video').width()-25+'px');
	}
	function help() 
	{
		$('#myModal').modal('toggle');
	}

	
	
	
});