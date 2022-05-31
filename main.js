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
    alert(electricFieldSlider.value);
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