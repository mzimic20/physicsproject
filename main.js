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

// Change displayed values when sliders are moved
electricFieldSlider.oninput = function() {
    electricField.innerHTML = this.value;
}
magneticFieldSlider.oninput = function() {
    magneticField.innerHTML = this.value;
}
chargeSlider.oninput = function() {
    charge.innerHTML = this.value;
}
velocitySlider.oninput = function() {
    velocity.innerHTML = this.value;
}

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
    // given e, b, find v everything works good
    if (questionType == 0) {
        var v = Math.floor(Math.random() * 20 + 1);
        var e = Math.floor(Math.random() * 100) * randomSign();
        var b = -e / v;
        var q = randomSign();
        var answer = v;
        var question = `Given E = ${e.toFixed(2)} N/C, B = ${b.toFixed(2)} T, and q = ${q} C. The particle is to be shot in a straight line. What initial velocity should it have? Answer is ${answer} m/s`;
        electricFieldSlider.value = e;
        magneticFieldSlider.value = b;
        chargeSlider.value = q;
        electricField.innerHTML = e.toFixed(2);
        magneticField.innerHTML = b.toFixed(2);
        charge.innerHTML = q;
        document.getElementById('electric_field_slider').disabled = true;
        document.getElementById('magnetic_field_slider').disabled = true;
        document.getElementById('charge_slider').disabled = true;
    }
    // given e, v, find b works sometimes (problem seems to be when velocity is too low)
    if (questionType == 1) {
        var b = Math.floor(Math.random() * 25) * randomSign();
        var v = Math.floor(Math.random() * 20 + 1);
        var e = v * -b;
        var q = randomSign();
        var answer = b;
        var question = `Given E = ${e.toFixed(2)} N/C, v = ${v.toFixed(2)} m/s, and q = ${q} C. The particle is to be shot in a straight line. What should the magnetic field be? Answer is ${answer} T`;
        electricFieldSlider.value = e;
        velocitySlider.value = v;
        chargeSlider.value = q;
        electricField.innerHTML = e.toFixed(2);
        velocity.innerHTML = v.toFixed(2);
        charge.innerHTML = q;
        document.getElementById('electric_field_slider').disabled = true;
        document.getElementById('velocity_slider').disabled = true;
        document.getElementById('charge_slider').disabled = true;
    }
    // given b, v, find e works sometimes
    if (questionType == 2) {
        var e = Math.floor(Math.random() * 100) * randomSign();
        var v = Math.floor(Math.random() * 20 + 1);
        var b = -e / v;
        var q = randomSign();
        var answer = e;
        var question = `Given B = ${b.toFixed(2)} T, v = ${v.toFixed(2)} m/s, and q = ${q} C. The particle is to be shot in a straight line. What should the electric field be? Answer is ${answer} N/C`;
        magneticFieldSlider.value = b;
        velocitySlider.value = v;
        chargeSlider.value = q;
        magneticField.innerHTML = b.toFixed(2);
        velocity.innerHTML = v.toFixed(2);
        charge.innerHTML = q;
        document.getElementById('magnetic_field_slider').disabled = true;
        document.getElementById('velocity_slider').disabled = true;
        document.getElementById('charge_slider').disabled = true;
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

// this is kind of ugly but it works
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