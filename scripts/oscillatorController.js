/**
 * Created by Nils on 16.03.2016.
 */
var getOscillatorPwer = function (osc) {
    return document.getElementById('osc' + osc).value;
};

var oscillators = [
    {
        power: getOscillatorPwer(1),
        type: "sine",
        gain: 0.15 * masterVolume,
        extraOctave: 0,
        octaveUp: 0,
        octaveDown: 0,
        active_voices: {},
        active_voicesOctaveUp: {},
        active_voicesOctaveDown: {},
        detuneValue: 0,
        filterSend: 0,
        envelopeSend: 0
    }, {
        power: getOscillatorPwer(2),
        type: "sine",
        gain: 0.15 * masterVolume,
        extraOctave: 0,
        octaveUp: 0,
        octaveDown: 0,
        active_voices: {},
        active_voicesOctaveUp: {},
        active_voicesOctaveDown: {},
        detuneValue: 0,
        filterSend: 0,
        envelopeSend: 0
    }, {
        power: getOscillatorPwer(3),
        type: "sine",
        gain: 0.15 * masterVolume,
        extraOctave: 0,
        octaveUp: 0,
        octaveDown: 0,
        active_voices: {},
        active_voicesOctaveUp: {},
        active_voicesOctaveDown: {},
        detuneValue: 0,
        filterSend: 0,
        envelopeSend: 0
    }
];

var setOscillatorPower = function (osc) {
    if (oscillators[osc - 1].power === "on") {
        oscillators[osc - 1].power = "off";
    }
    else oscillators[osc - 1].power = "on";
    console.log(oscillators[osc - 1].power);
};

var setOscillatorOctaveDown = function (osc) {
    var i = oscillators[osc - 1].octaveDown;
    if (i === 1) {
        oscillators[osc - 1].octaveDown = 0;
    } else oscillators[osc - 1].octaveDown = 1;
    console.log(osc + " : " + oscillators[osc - 1].octaveDown);
};

var setOscillatorOctaveUp = function (osc) {
    var i = oscillators[osc - 1].octaveUp;
    if (i === 1) {
        oscillators[osc - 1].octaveUp = 0;
    } else oscillators[osc - 1].octaveUp = 1;
};


var setOscillatorType = function (oscNumber, typeIn, el) {
    oscillators[oscNumber - 1].type = typeIn;
    changeOscillatorButtonStyle(oscNumber, el, typeIn);
};

var setOscillatorDetuneValue = function (oscNumber, val) {
    oscillators[oscNumber - 1].detuneValue = val;
    document.getElementById('osc' + oscNumber + 'DetuneDisplay').value = val;

    for(var i = 0; i < Keys.length; i++) {
        oscillators.forEach(function (oscillator) {
            if (oscillator.active_voices[Keys[i]] !== undefined) {
                oscillator.active_voices[Keys[i]].source.detune.value = val;
            }
        });
    }
};

var resetOscillatorDetuneValue = function (oscNumber) {
    oscillators[oscNumber - 1].detuneValue = 0;
    document.getElementById('osc' + oscNumber + 'DetuneDisplay').value = 0;
    document.getElementById('osc' + oscNumber + 'DetuneFader').value = 0;
    console.log(oscillators[oscNumber - 1].detuneValue);
    for(var i = 0; i < Keys.length; i++) {
        oscillators.forEach(function (oscillator) {
            if (oscillator.active_voices[Keys[i]] !== undefined) {
                oscillator.active_voices[Keys[i]].source.detune.value = 0;
            }
        });
    }
};

var changeOscillatorButtonStyle = function (oscNumber, el, typeIn) {
    var types = ["sine", "square", "sawtooth", "triangle"];
    var index = types.indexOf(typeIn);
    types.splice(index, 1);

    if (el.id === "active" + oscNumber + typeIn) {
        types.forEach(function (type) {
            if (document.getElementById("active" + oscNumber + type) !== null)
                document.getElementById("active" + oscNumber + type).id = "inactive" + oscNumber + type;
            else if (document.getElementById("inactive" + oscNumber + type) !== null)
                document.getElementById("inactive" + oscNumber + type).id = "inactive" + oscNumber + type;
        });
    }
    else if (el.id === "inactive" + oscNumber + typeIn) {
        document.getElementById("inactive" + oscNumber + typeIn).id = "active" + oscNumber + typeIn;
        types.forEach(function (type) {
            if (document.getElementById("inactive" + oscNumber + type) !== null)
                document.getElementById("inactive" + oscNumber + type).id = "inactive" + oscNumber + type;
            else if (document.getElementById("active" + oscNumber + type) !== null)
                document.getElementById("active" + oscNumber + type).id = "inactive" + oscNumber + type;
        });
    }
};

var changeEnvelopeSend = function (oscNumber) {
    oscillators[oscNumber - 1].envelopeSend++;
    if (oscillators[oscNumber - 1].envelopeSend >= 4)
        oscillators[oscNumber - 1].envelopeSend = 0;
    console.log(oscNumber);
    if (oscillators[oscNumber - 1].envelopeSend === 0)
        document.getElementById('envelope' + oscNumber + 'SendDisplayer').value = "off";
    else
        document.getElementById('envelope' + oscNumber + 'SendDisplayer').value = oscillators[oscNumber - 1].envelopeSend;
};

var changeFilterSend = function (oscNumber) {
    oscillators[oscNumber - 1].filterSend++;
    if (oscillators[oscNumber - 1].filterSend >= 4)
        oscillators[oscNumber - 1].filterSend = 0;
    if (oscillators[oscNumber - 1].filterSend === 0)
        document.getElementById('filter' + oscNumber + 'SendDisplayer').value = "off";
    else
        document.getElementById('filter' + oscNumber + 'SendDisplayer').value = oscillators[oscNumber - 1].filterSend;
};

var updateFilter = function (filterIn, val, type) {
    for(var i = 0; i < Keys.length; i++) {
        oscillators.forEach(function (oscillator) {
            if (oscillator.active_voices[Keys[i]] !== undefined) {
                if(oscillator.active_voices[Keys[i]].filterSend > 0) {
                    if (oscillator.active_voices[Keys[i]].filterSend-1 === filterIn) {
                        switch(type){
                            case "frequency":
                                oscillator.active_voices[Keys[i]].biquadFilter.filter.frequency.value = val;
                                if(oscillator.octaveUp)
                                    oscillator.active_voicesOctaveUp[Keys[i]].biquadFilter.filter.frequency.value = val;
                                if(oscillator.octaveDown)
                                oscillator.active_voicesOctaveDown[Keys[i]].biquadFilter.filter.frequency.value = val;
                                break;
                            case "Q":
                                oscillator.active_voices[Keys[i]].biquadFilter.filter.Q.value = val;
                                if(oscillator.octaveUp)
                                    oscillator.active_voicesOctaveUp[Keys[i]].biquadFilter.filter.Q.value = val;
                                if(oscillator.octaveDown)
                                    oscillator.active_voicesOctaveDown[Keys[i]].biquadFilter.filter.Q.value = val;
                                break;
                            case "gain":
                                oscillator.active_voices[Keys[i]].biquadFilter.filter.gain.value = val;
                                if(oscillator.octaveUp)
                                    oscillator.active_voicesOctaveUp[Keys[i]].biquadFilter.filter.gain.value = val;
                                if(oscillator.octaveDown)
                                    oscillator.active_voicesOctaveDown[Keys[i]].biquadFilter.filter.gain.value = val;
                                break;
                        }
                    }
                }
            }
        });
    }
};
