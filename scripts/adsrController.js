/**
 * Created by nils.bogen on 17.03.2016.
 */


var envelopes = [
    {
        adsrAttack : 0,
        adsrDecay : 0,
        adsrSustain : 0.5,
        adsrRelease : 0
    },
    {
        adsrAttack : 0,
        adsrDecay : 0,
        adsrSustain : 0.5,
        adsrRelease : 0
    },
    {
        adsrAttack : 0,
        adsrDecay : 0,
        adsrSustain : 0.5,
        adsrRelease : 0
    }

];

var activeEnvelope = 1;

var setActiveEnvelope = function(val) {
    activeEnvelope = val;
    for(var i = 1; i < 4; i++) {
        if(i !== val) {
            document.getElementById('envelope' + i + 'Power').checked = "";
        }
        else {
            document.getElementById('envelope' + i + 'Power').checked = "on";
        }
    }
    updateADSRDisplay(val);
}

var updateADSRDisplay = function(val) {
    setAttack(envelopes[activeEnvelope-1].adsrAttack);
    setDecay(envelopes[activeEnvelope-1].adsrDecay);
    setSustain(envelopes[activeEnvelope-1].adsrSustain);
    setRelease(envelopes[activeEnvelope-1].adsrRelease);
    document.getElementById('attackFader').value = envelopes[activeEnvelope-1].adsrAttack;
    document.getElementById('decayFader').value = envelopes[activeEnvelope-1].adsrDecay;
    document.getElementById('sustainFader').value = envelopes[activeEnvelope-1].adsrSustain;
    document.getElementById('releaseFader').value = envelopes[activeEnvelope-1].adsrRelease;
    renderAdsr();
}

var setAttack = function(val) {
    document.getElementById('attackDisplay').value = val;
    envelopes[activeEnvelope-1].adsrAttack = parseFloat(val);
    renderAdsr();
}

var setDecay = function(val) {
    document.getElementById('decayDisplay').value = val;
    envelopes[activeEnvelope-1].adsrDecay = parseFloat(val);
    renderAdsr();
}

var setSustain = function(val) {
    document.getElementById('sustainDisplay').value = val;
    envelopes[activeEnvelope-1].adsrSustain = parseFloat(val);
    renderAdsr();
}

var setRelease = function(val) {
    document.getElementById('releaseDisplay').value = val;
    envelopes[activeEnvelope-1].adsrRelease = parseFloat(val);
    renderAdsr();
}