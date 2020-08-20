//INIT
(function () {
	setTimeout(function(){
	document.getElementById('osc1GainDisplay').value = getOscillatorGainInPercent(1);
	document.getElementById('osc2GainDisplay').value = getOscillatorGainInPercent(2);
	document.getElementById('osc3GainDisplay').value = getOscillatorGainInPercent(3);
		document.getElementById('osc1OctaveDisplay').value = getOscillatorOctave(1);
		document.getElementById('osc2OctaveDisplay').value = getOscillatorOctave(2);
		document.getElementById('osc3OctaveDisplay').value = getOscillatorOctave(3);
		document.getElementById('attackDisplay').value = 0;
		document.getElementById('decayDisplay').value = 0;
		document.getElementById('sustainDisplay').value = 0.5;
		document.getElementById('releaseDisplay').value = 0;
		document.getElementById('osc1DetuneDisplay').value = 0;
		document.getElementById('osc2DetuneDisplay').value = 0;
		document.getElementById('osc3DetuneDisplay').value = 0;
		renderAdsr();

	}, 1000);
})();
var Keys = [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74, 75, 79, 76, 80, 192, 222];

// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator and gain node
var masterVolume = 0.5;
var octave = 0;

var changeStylePress = function (keyIn) {
	if(isMobile) return;
	var key = document.getElementById(keyIn);
	if (key.className === "wUp")
		key.className = "wDown";
	else if (key.className === "bUp")
		key.className = "bDown";
}

var changeStyleRelease = function (keyIn) {
	if(isMobile) return;

	var key = document.getElementById(keyIn);
	if (key.className === "wDown")
		key.className = "wUp";
	else if (key.className === "bDown")
		key.className = "bUp";
}
