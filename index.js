let E = document.getElementById("electric_field_slider")
let B = document.getElementById("magnetic_field_slider")
let q = document.getElementById("charge_slider")
let v = document.getElementById("velocity_slider")

function run() {
	let id = null;
	const elem = document.getElementById("animation");
	let pos = 0;
	clearInterval(id);
	id = setInterval(frame, 5);
	function frame() {
		if (pos == 350) {
			clearInterval(id);
		}
		else {
			pos++;
			elem.style.top = pos + "px";
			elem.style.left = pos + "px";
		}
	}
}