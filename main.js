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

function test() {
    alert(velocitySlider.value);
}

// Bare Bones Outline
// Generate random ef, mf and corresponding correct velocity
// Display question on website containing these variables.
// Compare user input (via sliders) to correct answer
// Alert if they are correct or wrong
// After, display nicer way to show if they are correct
// Add button to go on to new question
// Add different kinds of questions
// Incorporate animation
// Fix sliders to values given in question. Also add nicer way to input and view variables.

// Maybe make a number generator to only generate numbers with integer answers
var ef = Math.floor(Math.random() * 100 + 1);
var mf = Math.floor(Math.random() * 10 + 1);
var answer = (ef / mf).toFixed(1);
var question = `Electric Field is ${ef} N/C. Magnetic Field is ${mf} T. The particle is to be shot in a straight line. What initial velocity should it have? Answer is ${answer} m/s`;
document.getElementById('question').innerHTML = question


function checkApprox(num1, num2, epsilon) {
    if (Math.abs(num1 - num2) <= epsilon) {
        return true
    }
}

function submit() {
    if (checkApprox(velocitySlider.value, answer, 2)) {
        alert('Correct! Refresh the page to try again!');
    } else {
        alert('Incorrect! ' + 'Your answer: ' + velocitySlider.value + ' Correct Answer: ' + answer);
    }
}


// var electricField = electricFieldSlider.value;
// var magneticField = magneticFieldSlider.value;
// var charge = chargeSlider.value;
// var velocity = velocitySlider.value;

// electricFieldSlider.oninput = function() {
//     electricField = this.value;
// }
// magneticFieldSlider.oninput = function() {
//     magneticField = this.value;
// }
// chargeSlider.oninput = function() {
//     charge = this.value;
// }
// velocitySlider.oninput = function() {
//     velocity = this.value;
// }