/**
 * Created by Nils on 16.03.2016.
 */
var setOctave = function (octaveIn) {
    var out;
    if (octaveIn === 9)
        out = -3;
    else out = octaveIn - 2;
    return out;
}

var increaseOscillatorOctave = function (oscNumber) {
    oscillators[oscNumber-1].extraOctave++;
    updateOscillatorOctaveDom();
}

var decreaseOscillatorOctave = function (oscNumber) {
    oscillators[oscNumber-1].extraOctave--;
    updateOscillatorOctaveDom();
}

var getOscillatorOctave = function(oscNumber) {
    return  oscillators[oscNumber-1].extraOctave;
}

var updateOscillatorOctaveDom = function() {

    stopAllVoices();
    document.getElementById('osc1OctaveDisplay').value = getOscillatorOctave(1);
    document.getElementById('osc2OctaveDisplay').value = getOscillatorOctave(2);
    document.getElementById('osc3OctaveDisplay').value = getOscillatorOctave(3);
}