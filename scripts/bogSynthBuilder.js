/**
 * Created by Nils on 16.03.2016.
 */

var buildOscillators = function(osc) {
    var html = "";
    html += '<div class="bogSynthOscillator">';
    //html += '<span class="title">Osc'+osc+'</span>';
    html += '<div class="powerButton">';
    html += '   <input id="osc'+osc+'" type="checkbox" name="osc'+osc+'" onchange="setOscillatorPower('+osc+')" checked="">';
    html += '   <label for="osc'+osc+'"><span></span></label>';
    html += '</div>';
    html += buildOscillatorButtons(osc);
    html += buildOscillatorGainMeter(osc);
    html += buildOscillatorOctaveControl(osc);
    html += buildOscillatorDetuneControl(osc);
    html += buildOscillatorEnvelopeControl(osc);
    html += buildOscillatorFilterControl(osc);
    html += '<br />';
    html += '</div>';
    return html;
};

var buildOscillatorButtons = function(osc) {
    var html = "";
    html += '<div class="oscillatorButtonContainer">';
    html +=     '<button id="active'+osc+'sine" onclick="setOscillatorType('+osc+', ' + '`sine`' +',this)">	&nbsp;</button>';
    html +=     '<button id="inactive'+osc+'square" onclick="setOscillatorType('+osc+', '+'`square`'+',this)">&nbsp;</button>';
    html +=     '<button id="inactive'+osc+'sawtooth" onclick="setOscillatorType('+osc+', '+'`sawtooth`'+',this)">&nbsp;</button>';
    html +=     '<button id="inactive'+osc+'triangle" onclick="setOscillatorType('+osc+', '+'`triangle`'+',this)">&nbsp;</button>';
    html += '</div>';
    return html;
};

var buildOscillatorGainMeter = function(osc) {
    var html = "";
    html += '<div class="oscillatorGainContainer">';
    html +=     '<input class="oscillatorFader" id="osc'+osc+'Gain" type="range" min="0" max="0.3" step="0.01" oninput="setOscillatorGain('+osc+',this.value)">';
    html +=     '<input class="gainDisplayer" id="osc'+osc+'GainDisplay" type="text"  disabled>';
    html += '</div>';
    return html;
};

var buildOscillatorOctaveControl = function(osc) {
    var html = "";
    html += '<div class="oscillatorOctaveContainer">';
    html +=     '<label class="oscillatorOctaveLabel">oct</label>';
    html +=     '<button type="button" onclick="decreaseOscillatorOctave('+osc+')">-</button>';
    html +=     '<button type="button" onclick="increaseOscillatorOctave('+osc+')">+</button>';
    html +=     '<input class="octaveDisplayer" id="osc'+osc+'OctaveDisplay" type="text"  disabled>';
    //html +=     '<label class="oscillatorOctaveLabel">-1</label>';
    html += '   <div class="powerButton">';
    html += '     <input id="osc'+osc+'OctaveDown" type="checkbox" name="osc'+osc+'" onchange="setOscillatorOctaveDown('+osc+')">';
    html += '     <label for="osc'+osc+'OctaveDown"><span></span></label>';
    html += '   </div>';
    html +=     '<label class="oscillatorOctaveLabel">-Oct+</label>';
    //html += '   <label class="oscillatorOctaveLabel">+1</label>';
    html += '   <div class="powerButton">';
    html += '     <input id="osc'+osc+'OctaveUp" type="checkbox" name="osc'+osc+'" onchange="setOscillatorOctaveUp('+osc+')">';
    html += '     <label for="osc'+osc+'OctaveUp"><span></span></label>';
    html += '   </div>';
    html += '</div>';

    return html;
};

var buildOscillatorDetuneControl = function(osc) {
    var html = "";
    html += '<div id="detuneContainer">';
    html += '<input class="detuneDisplayer" id="osc'+osc+'DetuneDisplay" type="text"  disabled>';
    html += '<input title="Detune" id="osc'+osc+'DetuneFader" class="detuneFader" type="range" min="-100" max="100" step="1" ondblclick="resetOscillatorDetuneValue('+osc+')" oninput="setOscillatorDetuneValue('+osc+',this.value)" value="0">';
    html += '</div>';
    return html;
};

var buildOscillatorEnvelopeControl = function(osc) {
    var html = "";
    html += '<div id="envlopeContainer">';
    html += '   <label>env</label>';
    html += '   <div id="envelopeSendDisplay" onclick="changeEnvelopeSend('+osc+')">';
    html += '       <input class="envelopeSendDisplay" id="envelope'+osc+'SendDisplayer" type="text" disabled value="off">';
    html += '   </div>';
    html += '</div>';
    return html;
};

var buildOscillatorFilterControl = function(osc) {
    var html = "";
    html += '<div id="FilterContainer">';
    html += '   <label>Filter</label>';
    html += '   <div id="filterSendDisplay" onclick="changeFilterSend('+osc+')">';
    html += '       <input class="filterSendDisplay" id="filter'+osc+'SendDisplayer" type="text" disabled value="off">';
    html += '   </div>';
    html += '</div>';
    return html;
};

var buildADSR = function() {
    var html = "";
    html += '<div id="adsrContainer">';
    //POWER BUTTON
    html += '   <div id="adsrPowerButtons">';
    html += '       <div class="powerButton">';
    html += '          <input id="envelope1Power" type="checkbox" name="envelopePower" onchange="setActiveEnvelope(1)" checked>';
    html += '          <label for="envelope1Power"><span></span></label>';
    html += '       </div>';
    html += '       <div class="powerButton">';
    html += '          <input id="envelope2Power" type="checkbox" name="envelopePower" onchange="setActiveEnvelope(2)">';
    html += '          <label for="envelope2Power"><span></span></label>';
    html += '       </div>';
    html += '       <div class="powerButton">';
    html += '          <input id="envelope3Power" type="checkbox" name="envelopePower" onchange="setActiveEnvelope(3)">';
    html += '          <label for="envelope3Power"><span></span></label>';
    html += '          </div>';
    html += '   </div>';
    //FADERS
    html += '   <div id="adsrFaders">';
    html += '       <div class="smallGainContainer">';
    html += '           <input id="attackFader" class="gainFader" type="range" min="0" max="1" step="0.01" oninput="setAttack(this.value)" value="0">';
    html += '           <input class="gainDisplay" id="attackDisplay" type="text"  disabled>';
    html += '           <p>A</p>';
    html += '       </div>';
    html += '       <div class="smallGainContainer">';
    html += '           <input id="decayFader" class="gainFader" type="range" min="0" max="0.5" step="0.01" oninput="setDecay(this.value)" value="0">';
    html += '           <input class="gainDisplay" id="decayDisplay" type="text"  disabled>';
    html += '           <p>D</p>';
    html += '       </div>';
    html += '       <div class="smallGainContainer">';
    html += '           <input id="sustainFader" class="gainFader" type="range" min="0" max="0.5" step="0.01" oninput="setSustain(this.value)" value="0.5">';
    html += '           <input class="gainDisplay" id="sustainDisplay" type="text"  disabled>';
    html += '           <p>S</p>';
    html += '       </div>';
    html += '       <div class="smallGainContainer">';
    html += '           <input id="releaseFader" class="gainFader" type="range" min="0" max="1" step="0.01" oninput="setRelease(this.value)" value="0">';
    html += '           <input class="gainDisplay" id="releaseDisplay" type="text"  disabled>';
    html += '           <p>R</p>';
    html += '       </div>';
    html += '   </div>';
    // Canvas
    html += '   <canvas id="adsrCanvas" width="72" height="64 style="border:1px solid black;">Canvas not supported</canvas>';
    html += '</div>';
    return html;
};

var buildFilter = function() {
    var html = "";
    html += '<div id="filterContainer">';
    //POWER BUTTONS
    html += '    <div id="filterPowerButtons">';
    html += '       <div id="power1Button">';
    html += '          <input id="filter1Power" type="checkbox" name="envelopePower" onchange="setActiveFilter(1)" checked>';
    html += '          <label for="filter1Power"><span></span></label>';
    html += '       </div>';
    html += '       <div id="power2Button">';
    html += '          <input id="filter2Power" type="checkbox" name="envelopePower" onchange="setActiveFilter(2)">';
    html += '          <label for="filter2Power"><span></span></label>';
    html += '       </div>';
    html += '       <div id="power3Button">';
    html += '          <input id="filter3Power" type="checkbox" name="envelopePower" onchange="setActiveFilter(3)">';
    html += '          <label for="filter3Power"><span></span></label>';
    html += '       </div>';
    html += '    </div>';
    html += '    <select id="filtersDropdown"></select>';
    html += '    <canvas id="filterCanvas" width="100" height ="50"></canvas>';
    html += '    <div id="filterFreqSliders">';
    html += '       <label id="filterFLabel">F</label>';
    html += '       <input id="frequencySlider" title="Frequency" type="range" min="0" max="2000" value="1000" />';
    html += '       <label id="filterQLabel">Q</label>';
    html += '       <input id="qSlider" title="Q" type="range" min="1" max="100" value="10" />';
    html += '       <label id="filterGLabel">G</label>';
    html += '       <input id="gainSlider" title="Gain" disabled type="range" min="1" max="100" value="20" />';
    html += '    </div>';
    html += '</div>';
    return html;
};

var buildKeyboard = function() {
    var html = "";
    html += '<div id="keyBoard">';
    Keys.forEach( function(key) {
        html += '   <div id='+key+' class='+getKeyColor(key)+' onmousedown="playNote(this.id,true)" onmouseup="stopNote(this.id)" onmouseout="stopNote(this.id)" onmouseover="playNote(this.id,false)"></div>';
    });
    html += '</div>';
    html += '<input id="masterFader" type="range" min="0" max="1" step="0.01" oninput="setVolume(this.value)" value="0.5">';
    return html;
};

var getKeyColor = function(key) {
    if(key === 87 || key === 69 || key === 84 || key === 85 || key === 89 || key === 79 || key === 80)
        return "bUp";
    else return "wUp";
};

(function () {
    var el = document.getElementById('bogSynth');
    if(!el) {
        alert('Element with id ' + id + ' not found.');
    }
    var html = '';
    html += '<div id="logo"></div>';
    html += '<div id="oscillatorContainer">';
    for(var i = 1; i<4; i++)
        html += buildOscillators(i);
    html += '</div>';
    html += buildADSR();
    html += buildFilter();
    html += buildKeyboard();

    el.innerHTML += html;
})();

