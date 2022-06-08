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
// there's a problem here, before one answer is answered correctly, Score: null is displayed
if (typeof sessionStorage.getItem('score') == null) {
    var score = 0;
    sessionStorage.setItem('score', score);
    document.getElementById('testing').innerHTML = "Score: 0";
} else {
    score = sessionStorage.getItem('score');
    document.getElementById('testing').innerHTML = "Score: " + score;
}

// randomly generates one of three questions
function generateQuestion() {
    var questionType = Math.floor(Math.random() * 3);
    // given e, b, find v
    if (questionType == 0) {
        var answer = Math.floor(Math.random() * 100 + 5); // v
        var b = Math.floor(Math.random() * (200/answer) + 1);
        var e = b * answer;
        var question = `Electric Field is ${e} N/C. Magnetic Field is ${b} T. The particle is to be shot in a straight line. What initial velocity should it have? Answer is ${answer} m/s`;
        electricFieldSlider.value = e;
        magneticFieldSlider.value = b;
        electricField.innerHTML = e;
        magneticField.innerHTML = b;
        document.getElementById('electric_field_slider').disabled = true;
        document.getElementById('magnetic_field_slider').disabled = true;
    }
    // given e, v, find b
    if (questionType == 1) {
        var answer = Math.floor(Math.random() * 50 + 1); // b 
        var e = Math.floor(Math.random() * 200 + 1); 
        var v = (e / answer).toFixed(2);
        var question = `Electric Field is ${e} N/C. Velocity is ${v} m/s. The particle is to be shot in a straight line. What should the magnetic field be? Answer is ${answer} T`;
        electricFieldSlider.value = e;
        velocitySlider.value = v;
        electricField.innerHTML = e;
        velocity.innerHTML = v;
        document.getElementById('electric_field_slider').disabled = true;
        document.getElementById('velocity_slider').disabled = true;
    }
    // given b, v, find e
    if (questionType == 2) {
        var answer = Math.floor(Math.random() * 50 + 1);
        var b = Math.floor(Math.random() * 40 + 1);
        var v = (answer / b).toFixed(2);
        var question = `Magnetic Field is ${b} T. Velocity is ${v} m/s. The particle is to be shot in a straight line. What should the electric field be? Answer is ${answer} N/C`;
        magneticFieldSlider.value = b;
        velocitySlider.value = v;
        magneticField.innerHTML = b;
        velocity.innerHTML = v;
        document.getElementById('magnetic_field_slider').disabled = true;
        document.getElementById('velocity_slider').disabled = true;
    }
    return [question, answer, questionType]  
}

function checkApprox(num1, num2, epsilon) {
    if (Math.abs(num1 - num2) <= epsilon) {
        return true
    }
}

// generates straight line question with lower score, generates variable height question with higher score
if (score < 5) {
    questionInfo = generateQuestion()
    var question = questionInfo[0]
    var answer = questionInfo[1]
    var questionType = questionInfo[2]
    document.getElementById('question').innerHTML = question;
}   else {
    // insert variable height question
    document.getElementById('question').innerHTML = 'your mom';
}

// this is kind of ugly but it works
function submit() {
    if (questionType == 0) {
        if (checkApprox(velocitySlider.value, answer, 2)) {
            sessionStorage.setItem('score', ++score);
            document.getElementById('result').innerHTML = 'Correct!';
            document.getElementById('next').disabled = false;
        } else {
            document.getElementById('result').innerHTML = 'Incorrect :(';
        }
    }
    if (questionType == 1) {
        if (checkApprox(magneticFieldSlider.value, answer, 2)) {
            sessionStorage.setItem('score', ++score);
            document.getElementById('result').innerHTML = 'Correct!';
            document.getElementById('next').disabled = false;
        } else {
            document.getElementById('result').innerHTML = 'Incorrect :(';
    }
}
    if (questionType == 2) {
        if (checkApprox(electricFieldSlider.value, answer, 2)) {
            sessionStorage.setItem('score', ++score);
            document.getElementById('result').innerHTML = 'Correct!';
            document.getElementById('next').disabled = false;
        } else {
            document.getElementById('result').innerHTML = 'Incorrect :(';
        }
    } 
}

// need to deal with direction of electric and magnetic field lines

function run() {

//	fetch slider values
	let E = document.getElementById("electric_field_slider").value;
	let B = document.getElementById("magnetic_field_slider").value;
	let q = document.getElementById("charge_slider").value;
	let v = document.getElementById("velocity_slider").value;

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
			posx += v / 5;
			posy += (Fe + Fb) * t / 7500;
			elem.style.top = posy + "px";
			elem.style.left = posx + "px";
		}
	}
}
