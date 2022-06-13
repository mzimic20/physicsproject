// Creating variables for dynamic sliders
var electricFieldSlider = document.getElementById('electric_field_slider');
var magneticFieldSlider = document.getElementById('magnetic_field_slider');
var chargeSlider = document.getElementById('charge_slider');
var velocitySlider = document.getElementById('velocity_slider');

// Output variables to display to user on frontend
// These are not the values of the variables themselves
var electricField = document.getElementById('efo');
var magneticField = document.getElementById('mfo');
var charge = document.getElementById('co');
var velocity = document.getElementById('vo');

// Display values on sliders on frontend
electricField.innerHTML = electricFieldSlider.value;
magneticField.innerHTML = magneticFieldSlider.value;
charge.innerHTML = chargeSlider.value;
velocity.innerHTML = velocitySlider.value;

document.getElementById('next').disabled = true;

// initializes score variable in sessionStorage and displays it to test
if (sessionStorage.getItem('score') == null) {
    var score = 0;
    sessionStorage.setItem('score', score);
} else {
    score = sessionStorage.getItem('score');
    document.getElementById('score').innerHTML = "Score: " + score;
}

function randomSign() {
    return Math.random() < 0.5 ? -1 : 1
}

// randomly generates one of three questions
function generateQuestion() {
    var questionType = Math.floor(Math.random() * 3);
    // given e, b, find v 
    if (questionType == 0) {
        var v = Math.floor(Math.random() * 20 + 1);
        var e = Math.floor(Math.random() * 100) * randomSign();
        var b = -e / v;
        var q = randomSign();
        var answer = v;
        var question = `Given E = ${e.toFixed(2)} N/C, B = ${b.toFixed(2)} T, and q = ${q} C. The particle is to be shot in a straight line. What initial velocity should it have?`;
        electricFieldSlider.value = e;
        magneticFieldSlider.value = b;
        chargeSlider.value = q;
        electricField.innerHTML = e.toFixed(2);
        magneticField.innerHTML = b.toFixed(2);
        charge.innerHTML = q;
        electricFieldSlider.disabled = true;
        magneticFieldSlider.disabled = true;
        chargeSlider.disabled = true;
    }
    // given e, v, find b works sometimes
    if (questionType == 1) {
        var b = Math.floor(Math.random() * 25) * randomSign();
        var v = Math.floor(Math.random() * 20 + 1);
        var e = v * -b;
        var q = randomSign();
        var answer = b;
        var question = `Given E = ${e.toFixed(2)} N/C, v = ${v.toFixed(2)} m/s, and q = ${q} C. The particle is to be shot in a straight line. What should the magnetic field be?`;
        electricFieldSlider.value = e;
        velocitySlider.value = v;
        chargeSlider.value = q;
        electricField.innerHTML = e.toFixed(2);
        velocity.innerHTML = v.toFixed(2);
        charge.innerHTML = q;
        electricFieldSlider.disabled = true;
        velocitySlider.disabled = true;
        chargeSlider.disabled = true;
    }
    // given b, v, find e 
    if (questionType == 2) {
        var e = Math.floor(Math.random() * 100) * randomSign();
        var v = Math.floor(Math.random() * 20 + 1);
        var b = -e / v;
        var q = randomSign();
        var answer = e;
        var question = `Given B = ${b.toFixed(2)} T, v = ${v.toFixed(2)} m/s, and q = ${q} C. The particle is to be shot in a straight line. What should the electric field be?`;
        magneticFieldSlider.value = b;
        velocitySlider.value = v;
        chargeSlider.value = q;
        magneticField.innerHTML = b.toFixed(2);
        velocity.innerHTML = v.toFixed(2);
        charge.innerHTML = q;
        magneticFieldSlider.disabled = true;
        velocitySlider.disabled = true;
        chargeSlider.disabled = true;
    }
    return [question, answer, questionType]  
}

function checkApprox(num1, num2, epsilon) {
    if (Math.abs(num1 - num2) <= epsilon) {
        return true
    }
}

questionInfo = generateQuestion();
var question = questionInfo[0];
var answer = questionInfo[1];
var questionType = questionInfo[2];
document.getElementById('question').innerHTML = question;

function submit() {
    if (questionType == 0) {
        if (checkApprox(velocitySlider.value, answer, 1)) {
            sessionStorage.setItem('score', ++score);
            document.getElementById('result').innerHTML = 'Correct!';
            document.getElementById('next').disabled = false;
        } else {
            document.getElementById('result').innerHTML = 'Incorrect :(';
        }
    }
    if (questionType == 1) {
        if (checkApprox(magneticFieldSlider.value, answer, 1)) {
            sessionStorage.setItem('score', ++score);
            document.getElementById('result').innerHTML = 'Correct!';
            document.getElementById('next').disabled = false;
        } else {
            document.getElementById('result').innerHTML = 'Incorrect :(';
    }
}
    if (questionType == 2) {
        if (checkApprox(electricFieldSlider.value, answer, 1)) {
            sessionStorage.setItem('score', ++score);
            document.getElementById('result').innerHTML = 'Correct!';
            document.getElementById('next').disabled = false;
        } else {
            document.getElementById('result').innerHTML = 'Incorrect :(';
        }
    } 
}



function run() {

//	fetch slider values
	let E = electricFieldSlider.value;
	let B = magneticFieldSlider.value;
	let q = chargeSlider.value;
	let v = velocitySlider.value;

//	calculate forces
	let Fe = E * q;
	let Fb = q * v * B;

//	prep animation
	let id = null;
	const elem = document.getElementById("animation");
	let posx = 25;
	let posy = 300;
	let t = 0;

//	animate
	clearInterval(id);
	id = setInterval(frame, 5);
	function frame() {
//		stop animation
		if (posx >= 900 || posy <= 120 || posy >= 500) {
			clearInterval(id);
		}
		else {
//			move
			t++;
            if (Math.abs(Fe + Fb) < .5) {
                posx += v / 3;
                elem.style.left = posx + "px";
                elem.style.top = "300px";
            }
            else {
                posx += v / 3;
                posy += (Fe + Fb) * t / 7500;
                elem.style.top = posy + "px";
                elem.style.left = posx + "px";
            }
		}
	}
}

// function for Show Trajectory checkbox
const c = document.getElementById("animationCanvas");
const ctx = c.getContext("2d");
ctx.canvas.width = 800;
ctx.canvas.height = 400;

function generateTrajectory() {
    if (document.getElementById("show_trajectory").checked == true) {

        // fetch slider values
        let E = electricFieldSlider.value;
	    let B = magneticFieldSlider.value;
	    let q = chargeSlider.value;
	    let v = velocitySlider.value;

        //calculate forces
        let Fe = E * q;
        let Fb = q * v * B;

        // find endpoint
        let t = 0;
        let posx = 20;
        let posy = 300;
        while ((posx <= 900) && (posy >= 120 && posy <= 500)) {
            t++;
            posx += v / 3;
            posy += (Fe + Fb) * t / 7500;
        }
        console.log("posx: " + posx + ", posy: " + posy);

        // find Bezier control point
        // calculate slope of tangent at endpoint
        let m = (Fe + Fb) / (1250 * v) * t;
        console.log("m: " + m);

        // find x-coordinate of control point
        let xi = (300 - posy) / m + posx;
        console.log("xi: " + xi);

        // draw line or parabola
        ctx.beginPath();
        ctx.moveTo(20, 187);
        if (xi == null) {
            ctx.lineTo(posx, posy);
        }
        else {
            ctx.quadraticCurveTo(xi, 187, posx, posy - 87);
        }
        ctx.stroke();
    }
    else {
        ctx.clearRect(0, 0, c.width, c.height);
    }
}


// Positive B is out of page, Negative B is into page
// Positive E is down, Negative E is up (conventional current)

function electricFieldLines() {
    if (document.getElementById("electric_field_box").checked == true) {
        ctx.beginPath();
        if (electricFieldSlider.value > 0) {
            // draw down arrow
            for (let i = 1; i < 4; i++) {
                ctx.moveTo(70 + i * 182, 175);
                ctx.lineTo(80 + i * 182, 175);
                ctx.lineTo(75 + i * 182, 225);
                ctx.fillStyle = "#2bcc2e";
                ctx.fill();
            }
        } 
        if (electricFieldSlider.value < 0) {
            // draw up arrow
            for (let i = 1; i < 4; i++) {
                ctx.moveTo(70 + i * 182, 225);
                ctx.lineTo(80 + i * 182, 225);
                ctx.lineTo(75 + i * 182, 175);
                ctx.fillStyle = "#2bcc2e";
                ctx.fill();
            }
        }
    }
    else {
        ctx.clearRect(0, 0, c.width, c.height);
    }
}

function magneticFieldLines() {
    if (document.getElementById("magnetic_field_box").checked == true) {
        if (magneticFieldSlider.value < 0) {
            // draw .'s
            for (let i = 1; i < 5; i++) {
                ctx.beginPath();
                ctx.arc(75 + i * 145, 100, 3, 0, Math.PI * 2, true);
                ctx.fillStyle = "#264aed";
                ctx.fill();
            }
            for (let i = 1; i < 5; i++) {
                ctx.beginPath();
                ctx.arc(75 + i * 145, 300, 3, 0, Math.PI * 2, true);
                ctx.fillStyle = "#264aed";
                ctx.fill();
            }
        } 
        if (magneticFieldSlider.value > 0) {
            // draw x's
            ctx.beginPath();
            for (let i = 1; i < 5; i++) {
                let x = 75 + i * 145;
                ctx.moveTo(x - 3, 97);
                ctx.lineTo(x + 3, 103);
                ctx.strokeStyle = "#264aed";
                ctx.stroke();
                ctx.moveTo(x - 3, 103);
                ctx.lineTo(x + 3, 97);
                ctx.strokeStyle = "#264aed";
                ctx.stroke();
            }
            for (let i = 1; i < 5; i++) {
                let x = 75 + i * 145;
                ctx.moveTo(x - 3, 297);
                ctx.lineTo(x + 3, 303);
                ctx.strokeStyle = "#264aed";
                ctx.stroke();
                ctx.moveTo(x - 3, 303);
                ctx.lineTo(x + 3, 297);
                ctx.strokeStyle = "#264aed";
                ctx.stroke();
            }
        }
    }
    else {
        ctx.clearRect(0, 0, c.width, c.height);
    }
}

// Change displayed values when sliders are moved
// Updates projected trajectory and field lines (if boxes are checked) when sliders are moved
electricFieldSlider.oninput = function() {
    electricField.innerHTML = this.value;
    ctx.clearRect(0, 0, c.width, c.height);
    generateTrajectory();
    magneticFieldLines();
    electricFieldLines();
}
magneticFieldSlider.oninput = function() {
    magneticField.innerHTML = this.value;
    ctx.clearRect(0, 0, c.width, c.height);
    generateTrajectory();
    magneticFieldLines();
    electricFieldLines();
}
chargeSlider.oninput = function() {
    charge.innerHTML = this.value;
    ctx.clearRect(0, 0, c.width, c.height);
    generateTrajectory();
    magneticFieldLines();
    electricFieldLines();
}
velocitySlider.oninput = function() {
    velocity.innerHTML = this.value;
    ctx.clearRect(0, 0, c.width, c.height);
    generateTrajectory();
    magneticFieldLines();
    electricFieldLines();
}


// toggle between the main game and a free simulation mode
// this is a brute force method but it works alright here
function toggleGame() {
    if (document.getElementById('toggle_game').innerHTML == ' Free Simulation Mode ') {
        electricFieldSlider.disabled = false;
        magneticFieldSlider.disabled = false;
        chargeSlider.disabled = false;
        velocitySlider.disabled = false;
        document.getElementById('question').innerHTML = ''; // if .remove() is used here, the whole page shifts up
        document.getElementById('score').remove();
        document.getElementById('result').remove();
        document.getElementById('submit').remove();
        document.getElementById('next').remove();
        document.getElementById('toggle_game').innerHTML = 'Question Mode';
    }
    else {
        document.location.reload(true);
    }    
}

