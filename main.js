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

// use this button to test features, delete later
function test() {
    alert(velocitySlider.value);
}

// blocks next button until question is correctly answered
document.getElementById('next').disabled = true;


// initializes score variable in sessionStorage and displays it to test
if (typeof sessionStorage.getItem('score') == 'undefined') {
    let score = 0;
    sessionStorage.setItem('score', score);
    document.getElementById('testing').innerHTML = score;
} else {
    score = sessionStorage.getItem('score');
    document.getElementById('testing').innerHTML = score;
}

// randomly generates one of three questions
// adjust code to generate cleaner numbers
function generateQuestion() {
    var var1 = Math.floor(Math.random() * 50 + 1);
    var var2 = Math.floor(Math.random() * 10 + 1);
    var questionType = Math.floor(Math.random() * 3);
    // given ef, mf, find v
    if (questionType == 0) {
        var answer = (var1 / var2).toFixed(1);
        var question = `Electric Field is ${var1} N/C. Magnetic Field is ${var2} T. The particle is to be shot in a straight line. What initial velocity should it have? Answer is ${answer} m/s`;
    }
    // given ef, v, find mf
    if (questionType == 1) {
        var answer = (var1 / var2).toFixed(1);
        var question = `Electric Field is ${var1} N/C. Velocity is ${var2} m/s. The particle is to be shot in a straight line. What should the magnetic field be? Answer is ${answer} T`;
    }
    // given mf, v, find ef
    if (questionType == 2) {
        var answer = (var1 * var2).toFixed(1);
        var question = `Magnetic Field is ${var1} T. Velocity is ${var2} m/s. The particle is to be shot in a straight line. What should the electric field be? Answer is ${answer} N/C`;
    }
    return [question, answer, questionType]  
}

function checkApprox(num1, num2, epsilon) {
    if (Math.abs(num1 - num2) <= epsilon) {
        return true
    }
}

// generates straight line question with lower score, generates variable height question with higher score
if (score < 3) {
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
            // alert('Incorrect! ' + 'Your answer: ' + velocitySlider.value + ' Correct Answer: ' + answer);
        }
    }
    if (questionType == 1) {
        if (checkApprox(magneticFieldSlider.value, answer, 2)) {
            sessionStorage.setItem('score', ++score);
            document.getElementById('result').innerHTML = 'Correct!';
            document.getElementById('next').disabled = false;
        } else {
            document.getElementById('result').innerHTML = 'Incorrect :(';
            // alert('Incorrect! ' + 'Your answer: ' + velocitySlider.value + ' Correct Answer: ' + answer);
        }
    }
    if (questionType == 2) {
        if (checkApprox(electricFieldSlider.value, answer, 2)) {
            sessionStorage.setItem('score', ++score);
            document.getElementById('result').innerHTML = 'Correct!';
            document.getElementById('next').disabled = false;
        } else {
            document.getElementById('result').innerHTML = 'Incorrect :(';
            // alert('Incorrect! ' + 'Your answer: ' + velocitySlider.value + ' Correct Answer: ' + answer);
        }
    } 
}

// need to deal with direction of electric and magnetic field lines
// add scoreboard, new levels
