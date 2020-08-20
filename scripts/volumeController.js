/**
 * Created by Nils on 16.03.2016.
 */
var setOscillatorGain = function (oscNumber, gainIn) {
        oscillators[oscNumber - 1].gain = gainIn *masterVolume;
        document.getElementById('osc'+oscNumber+'GainDisplay').value = getOscillatorGainInPercent(oscNumber);//document.getElementById('osc'+oscNumber+'Gain').value  / 0.3 * 100;

    for(var i = 0; i < Keys.length; i++) {
        if (oscillators[oscNumber-1].active_voices[Keys[i]] !== undefined) {
            oscillators[oscNumber-1].active_voices[Keys[i]].setVolume(oscillators[oscNumber - 1].gain);
        }
    }
}

var setVolume = function (volume) {
    masterVolume = volume;
    oscillators[0].gain = document.getElementById('osc1Gain').value *masterVolume;
    oscillators[1].gain = document.getElementById('osc2Gain').value  *masterVolume;
    oscillators[2].gain = document.getElementById('osc3Gain').value *masterVolume;

    oscillators.forEach( function(oscillator) {
        for(var i = 0; i < Keys.length; i++) {
            if (oscillator.active_voices[Keys[i]] !== undefined) {
                oscillator.active_voices[Keys[i]].setVolume(oscillator.gain);
            }
        }
    })

}

var getOscillatorGainInPercent = function (oscNumber) {
    return (document.getElementById('osc'+oscNumber+'Gain').value  / 0.3 * 100).toFixed(2);
}