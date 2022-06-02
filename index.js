function run() {
	var E = document.getElementById("electric_field_slider").value
	var B = document.getElementById("magnetic_field_slider").value
	var q = document.getElementById("charge_slider").value
	var v = document.getElementById("velocity_slider").value

	let id = null;
	const elem = document.getElementById("animation");
	let posx = 25;
	let posy = 300;
	let t = 0;
	clearInterval(id);
	id = setInterval(frame, 5);
	function frame() {
		if (posx >= 1100 || posy <= 100 || posy >= 500) {
			clearInterval(id);
		}
		else {
			t++;
			posx += v / 5;
//			posy++;
			elem.style.top = posy + "px";
			elem.style.left = posx + "px";
		}
	}
}

function reset() {
	let elem = document.getElementById("animation");
	elem.style.top = "300px";
	elem.style.left = "25px";
}