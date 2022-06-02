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
		if (posx >= 1100 || posy <= 100 || posy >= 500) {
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

function reset() {
	let elem = document.getElementById("animation");
	elem.style.top = "300px";
	elem.style.left = "25px";
}