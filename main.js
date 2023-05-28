$(document).ready(function () {
	let start = new Date();
	let inc = 1*60*60*1000;
	$("#plus").click(function () { inc += 60*1000; });
	$("#minus").click(function () { inc -= 60*1000; });
	$("#timer").width($("#timer").width() + 10);
	$("#preset_1").click(function () {
		start = new Date();
		inc = 2*60*60*1000;
	});
	$("#preset_2").click(function () {
		start = new Date();
		inc = 1*60*60*1000;
	});
	$("#preset_3").click(function () {
		start = new Date();
		inc = 53*60*1000;
	});
	$("#preset_4").click(function () {
		start = new Date();
		inc = 30*60*1000;
	});
	setInterval(function () {
		let elap = new Date() - start;
		if (elap > inc) {
			inc = elap;
			$("body").addClass("done");
		}
		else {
			$("body").css('background-color', getColor(elap, inc));
			$("body").removeClass("done");
		}
		$(".preset").css('color', getColor(elap, inc));
		$("#timer").html(msToTime(inc - elap));
	}, 20);
});
function msToTime(duration) {
	let seconds = Math.floor((duration / 1000) % 60);
	let minutes = Math.floor((duration / (1000 * 60)) % 60);
	let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return hours + ":" + minutes + ":" + seconds
}
function getColor(elap, inc) {
	let start_r = 191, start_g = 233, start_b = 255;
	let end_r = 255, end_g = 110, end_b = 127;
	let x = elap / inc;
	return rgbToHex(map(x, start_r, end_r), map(x, start_g, end_g), map(x, start_b, end_b));
}
function compToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
	return "#" + compToHex(r) + compToHex(g) + compToHex(b);
}
function map(x, start, end) {
  return parseInt(x * (end - start) + start);
}