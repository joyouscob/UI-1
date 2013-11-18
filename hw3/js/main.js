$(function () {

	$('video').get(0).load();

	var _isDown, _points, _strokeID, _r, _g, _rc; // global variables

	_points = new Array(); // point array for current stroke
	_strokeID = 0;
	_r = new PDollarRecognizer();

	var canvas = document.getElementById('myCanvas');
	_g = canvas.getContext('2d');
	_g.lineWidth = 3;
	_g.font = "1em Gentilis";
	_rc = getCanvasRect(canvas); // canvas rect on page
	_g.fillStyle = "rgb(255,255,136)";
	_g.fillRect(0, 0, _rc.width, 20);

	_isDown = false;
	
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
			drawText("Recording stroke #" + _strokeID + "...");
			var clr = "rgb(" + rand(0,200) + "," + rand(0,200) + "," + rand(0,200) + ")";
			_g.strokeStyle = clr;
			_g.fillStyle = clr;
			_g.fillRect(x - 4, y - 3, 9, 9);
		}
		else if (button == 2)
		{
			drawText("Recognizing gesture...");
		}
	}
	function mouseMoveEvent(x, y, button)
	{
		if (_isDown)
		{
			x -= _rc.x;
			y -= _rc.y - getScrollY();
			_points[_points.length] = new Point(x, y, _strokeID); // append
			drawConnectedPoint(_points.length - 2, _points.length - 1);
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
				drawText("Stroke #" + _strokeID + " recorded.");
			}
		}
		else if (button == 2) // segmentation with right-click
		{
			if (_points.length >= 10)
			{
				var result = _r.Recognize(_points);
				drawText("Result: " + result.Name + " (" + round(result.Score,2) + ").");
				control(result);
			}
			else
			{
				drawText("Too little input made. Please try again.");
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
		_g.fillStyle = "rgb(255,255,136)";
		_g.fillRect(0, 0, _rc.width, 20);
		_g.fillStyle = "rgb(0,0,255)";
		_g.fillText(str, 1, 10);
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
			drawText("\"" + name + "\" added. Number of \"" + name + "\"s defined: " + num + ".");
			_strokeID = 0; // signal to begin new gesture on next mouse-down
		}
	}
	function onClickAddCustom()
	{
		var name = document.getElementById('custom').value;
		if (_points.length >= 10 && name.length > 0)
		{
			var num = _r.AddGesture(name, _points);
			drawText("\"" + name + "\" added. Number of \"" + name + "\"s defined: " + num + ".");
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
		drawText("Canvas cleared.");
	}
	function control(result)
	{
		var name = result.Name;
		switch (name) {
			case "triangle":
			play();
			break;
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
			pause();
			break;
			case "arrow-up":
			tall();
			break;
			case "arrow-down":
			short();
			break;
			case "arrow-left":
			thin();
			break;
			case "arrow-right":
			wide();
			break;
		};
	}
	
	function play() 
	{
		$('video').get(0).play();
	}
	function pause() 
	{
		$('video').get(0).pause();
	}
	function ff() 
	{
		$('video').get(0).currentTime+=10;
	}
	function rw() 
	{
		$('video').get(0).currentTime-=10;
	}
	function accel() 
	{
		$('video').get(0).playbackRate++;
	}
	function decel() 
	{
		$('video').get(0).playbackRate--;
	}
	function incr() 
	{
		$('video').get(0).volume+=0.1;
	}
	function decr() 
	{
		$('video').get(0).volume-=0.1;
	}
	function mute() 
	{
		($('video').get(0).muted == true) ? $('video').get(0).muted=false : $('video').get(0).muted=true;
	}
	// function expand() 
	// {
	// 	();
	// }
	function wide() 
	{
		$('video').get(0).width+=50px;
	}
	function thin() 
	{
		$('video').get(0).width-=50px;
	}
	function tall() 
	{
		$('video').get(0).height+=50px;
	}
	function short() 
	{
		$('video').get(0).height-=50px;
	}
	
	
	
	
});