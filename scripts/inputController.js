/**
 * Created by Nils on 16.03.2016.
 */
//kayboard controls
var body = document.querySelector('body');

body.onkeydown = function (e) {
    playVoice(e.keyCode)
    if (e.keyCode >= 49 && e.keyCode <= 57) {
        octave = setOctave(e.keyCode % 10);
    };
    if (e.keyCode == 32) {
        for(var i = 0; i < Keys.length; i++) {
            console.log(oscillators[0].active_voices[Keys[i]]);
        }
    };
}

body.onkeyup = function (e) {
    stopNote(e.keyCode);
}

var mouseDown = 0;
body.onmousedown = function() {
    ++mouseDown;
}
body.onmouseup = function() {
    --mouseDown;
}

var playNote = function(input, clicked) {
    if(isMobile) {
        playVoice(input);
    } else {
        if(mouseDown || clicked)
        playVoice(input);
    }

}

var stopNote = function(input) {
    for (var i = 0; i < Keys.length; i++) {
        if (input == Keys[i])
            for (var q = 0; q < oscillators.length; q++) {
                if(oscillators[q].active_voices[Keys[i]] !== undefined)
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

var playVoice = function(input) {
        for (var i = 0; i < Keys.length; i++) {
            if (input == Keys[i]) {
                for (var j = 0; j < oscillators.length; j++) {
                    if (oscillators[j].power === "on") {
                        var frequencyToPlay = getFrequency(distanceFrom440(i,oscillators[j].extraOctave));

                        var voice = new Voice(frequencyToPlay, oscillators[j]);
                        if (!noteIsPlaying(oscillators[j].active_voices, voice)) {
                            oscillators[j].active_voices[Keys[i]] = voice;
                            voice.start();
                            changeStylePress(Keys[i]);
                        }

                        if(oscillators[j].octaveUp === 1) {
                            frequencyToPlay = getFrequency(distanceFrom440(i, oscillators[j].extraOctave + 1));
                            voice = new Voice(frequencyToPlay, oscillators[j]);
                            if (!noteIsPlaying(oscillators[j].active_voicesOctaveUp, voice)) {
                                oscillators[j].active_voicesOctaveUp[Keys[i]] = voice;
                                voice.start();
                            }
                        }

                        if(oscillators[j].octaveDown === 1) {
                            frequencyToPlay = getFrequency(distanceFrom440(i, oscillators[j].extraOctave - 1));
                            voice = new Voice(frequencyToPlay, oscillators[j]);
                            if (!noteIsPlaying(oscillators[j].active_voicesOctaveDown, voice)) {
                                oscillators[j].active_voicesOctaveDown[Keys[i]] = voice;
                                voice.start();
                            }
                        }
                    }
                }
            };
        }
}