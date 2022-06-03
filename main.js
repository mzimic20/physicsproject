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
// Generate random ef, mf and corresponding correct velocity x
// Display question on website containing these variables x
// Compare user input (via sliders) to correct answer x
// Alert if they are correct or wrong x
// After, display nicer way to show if they are correct - kind of
// Add button to go on to new question - kind of
// Add different kinds of questions
// Incorporate animation
// Fix sliders to values given in question. Also add nicer way to input and view variables.

document.getElementById('next').disabled = true;


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
        var question = `Magnetic Field is ${var1} T. Velocity is ${var2} m/s. The particle is to be shot in a straight line. What should the electric field be? Answer is ${answer} m/s`;
    }
    return [question, answer, questionType]  
}


function checkApprox(num1, num2, epsilon) {
    if (Math.abs(num1 - num2) <= epsilon) {
        return true
    }
}

questionInfo = generateQuestion()
let question = questionInfo[0]
let answer = questionInfo[1]
let questionType = questionInfo[2]
document.getElementById('question').innerHTML = question

// this is kind of ugly but it works
function submit() {
    if (questionType == 0) {
        if (checkApprox(velocitySlider.value, answer, 2)) {
            document.getElementById('result').innerHTML = 'Correct!';
            document.getElementById('next').disabled = false;
        } else {
            document.getElementById('result').innerHTML = 'Incorrect :(';
            // alert('Incorrect! ' + 'Your answer: ' + velocitySlider.value + ' Correct Answer: ' + answer);
        }
    }
    if (questionType == 1) {
        if (checkApprox(magneticFieldSlider.value, answer, 2)) {
            document.getElementById('result').innerHTML = 'Correct!';
            document.getElementById('next').disabled = false;
        } else {
            document.getElementById('result').innerHTML = 'Incorrect :(';
            // alert('Incorrect! ' + 'Your answer: ' + velocitySlider.value + ' Correct Answer: ' + answer);
        }
    }
    if (questionType == 2) {
        if (checkApprox(electricFieldSlider.value, answer, 2)) {
            document.getElementById('result').innerHTML = 'Correct!';
            document.getElementById('next').disabled = false;
        } else {
            document.getElementById('result').innerHTML = 'Incorrect :(';
            // alert('Incorrect! ' + 'Your answer: ' + velocitySlider.value + ' Correct Answer: ' + answer);
        }
    } 
}

// need to deal with direction of electric and magnetic field lines
