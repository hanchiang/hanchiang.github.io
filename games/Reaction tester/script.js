function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var createdTime;
var clickedTime;
var reactionTime;

function makeBox() {
	// create box after 0-5 sec
	var time=Math.random();
	time=time*5000;

	setTimeout(function() {
		// Set box to be circle half of the time
		if (Math.random() > 0.5) 
			document.getElementById("box").style.borderRadius="100px";
		else
			document.getElementById("box").style.borderRadius="0";

		// Getting random position across the screen
		var top=Math.random();
		var left=Math.random();
		top=top*250;
		left=left*1000;

		document.getElementById("box").style.top=top+"px";
		document.getElementById("box").style.left=left+"px";

		document.getElementById("box").style.backgroundColor=getRandomColor();

		var randomColor = getRandomColor();
		document.getElementById("box").style.border="2px solid "+randomColor;

		document.getElementById("box").style.display="block";

		createdTime=Date.now();
	}, time);
}

document.getElementById("box").onclick=function() {
	clickedTime=Date.now();
	reactionTime=(clickedTime-createdTime)/1000;

	document.getElementById("time").innerHTML=reactionTime+"s";

	document.getElementById("box").style.display="none";
	//this.style.display="none"; // Same as above
	makeBox();
}

makeBox();	// Create the box for the first time