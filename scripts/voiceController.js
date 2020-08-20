/**
 * Created by Nils on 16.03.2016.
 */
var noteIsPlaying = function (active_voices, voice) {
    for (var i = 0; i < Keys.length; i++) {
        if (active_voices[Keys[i]] !== undefined)
            if (active_voices[Keys[i]].frequency === voice.frequency)
                return true;
    }
    return false;
}

var distanceFrom440 = function (keyIn, extra) {
    return (keyIn - 9) + (12 * (octave + extra));
}

var a = Math.pow(2, (1 / 12));
var getFrequency = function (distance) {
    return 440 * Math.pow(a, distance);
}

var Voice = (function (audioCtx) {
    function Voice(frequency, osc) {
        this.frequency = frequency;
        this.oscType = osc.type;
        this.oscGain = osc.gain;
        this.detuneValue = osc.detuneValue;
        this.oscillators = [];
        this.gainNode;
        this.startTime = 0;
        this.envelopeSend = osc.envelopeSend;
        this.filterSend = osc.filterSend;
        this.biquadFilter;
        this.source;
    };

    Voice.prototype.start = function () {
        var currTime = audioCtx.currentTime;
        this.startTime = currTime.toFixed(2);
        var source = audioCtx.createOscillator();
        this.source = source;
        source.type = this.oscType;
        source.frequency.value = this.frequency;
        source.detune.value = this.detuneValue;

        var gainNode = audioCtx.createGain();

        if (this.envelopeSend > 0) {
            gainNode.gain.linearRampToValueAtTime(0, currTime);
            gainNode.gain.linearRampToValueAtTime(this.oscGain, currTime + envelopes[this.envelopeSend - 1].adsrAttack);
            gainNode.gain.linearRampToValueAtTime(this.oscGain * envelopes[this.envelopeSend - 1].adsrSustain, currTime + envelopes[this.envelopeSend - 1].adsrAttack + envelopes[this.envelopeSend - 1].adsrDecay);
        } else if (this.envelopeSend === 0) {
            gainNode.gain.value = this.oscGain;
        }

        if (this.filterSend > 0) {
            this.biquadFilter = new BiquadFilter(this.filterSend - 1);
            source.connect(this.biquadFilter.filter);
            this.biquadFilter.connect(gainNode);
        } else {
            source.connect(gainNode);
        }
        gainNode.connect(audioCtx.destination);

        source.start(0);
        this.oscillators.push(source);
        this.gainNode = gainNode;
    };

    return Voice;
})(audioCtx);

Voice.prototype.stop = function () {
    var currTime = audioCtx.currentTime;
    var timePassed = currTime - this.startTime;
    var calculatedTime = 0;
    if (this.envelopeSend > 0) {
        calculatedTime = envelopes[this.envelopeSend - 1].adsrAttack + envelopes[this.envelopeSend - 1].adsrDecay;
        if (timePassed > calculatedTime) {
            this.gainNode.gain.linearRampToValueAtTime(this.gainNode.gain.value, currTime);
            this.gainNode.gain.linearRampToValueAtTime(0, currTime + envelopes[this.envelopeSend - 1].adsrRelease);
        }
        else {
            this.gainNode.gain.linearRampToValueAtTime(this.gainNode.gain.value, currTime);
            this.gainNode.gain.linearRampToValueAtTime(0, currTime + calculatedTime + timePassed + envelopes[this.envelopeSend - 1].adsrRelease);
        }
        calculatedTime += envelopes[this.envelopeSend - 1].adsrRelease;
    } else if (this.envelopeSend === 0) {
        this.gainNode.gain.value = 0;
    }

    var that = this;
    this.oscillators.forEach(function (oscilator) {
        setTimeout(function () {
            oscilator.stop();
        }, calculatedTime*1000+100);
    });
};

Voice.prototype.setVolume = function (volume) {
    this.gainNode.gain.value = volume;
};


var stopAllVoices = function () {
    for (var i = 0; i < Keys.length; i++) {
        for (var q = 0; q < oscillators.length; q++) {
            if (oscillators[q].active_voices[Keys[i]] !== undefined)
                oscillators[q].active_voices[Keys[i]].stop();
            delete oscillators[q].active_voices[Keys[i]];

            if (oscillators[q].active_voicesOctaveUp[Keys[i]] !== undefined)
                oscillators[q].active_voicesOctaveUp[Keys[i]].stop();
            delete oscillators[q].active_voicesOctaveUp[Keys[i]];

            if (oscillators[q].active_voicesOctaveDown[Keys[i]] !== undefined)
                oscillators[q].active_voicesOctaveDown[Keys[i]].stop();
            delete oscillators[q].active_voicesOctaveDown[Keys[i]];

            changeStyleRelease(Keys[i]);
        }
    }
}
