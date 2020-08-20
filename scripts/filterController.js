/**
 * Created by nils.bogen on 22.03.2016.
 */
//var biquadFilter;

var biquadFilters = [];
var activeFilter = 1;
var frequencySlider = document.getElementById("frequencySlider");
var qSlider = document.getElementById("qSlider");
var gainSlider = document.getElementById("gainSlider");

var filters = {
    "lowpass": {
        q: true,
        gain: false
    }, "highpass": {
        q: true,
        gain: false
    }, "bandpass": {
        q: true,
        gain: false
    }, "lowshelf": {
        q: false,
        gain: true
    }, "highshelf": {
        q: false,
        gain: true
    }, "peaking": {
        q: true,
        gain: true
    }, "notch": {
        q: true,
        gain: false
    }, "allpass": {
        q: true,
        gain: false
    }
};

var filtersDropdown = document.getElementById("filtersDropdown");

for (var item in filters) {
    var option = document.createElement("option");
    option.innerHTML = item;
    filtersDropdown.appendChild(option);
}
;

function filterClicked(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    var filterName = target.value;
    biquadFilters[activeFilter-1].type = filterName;
    updateFrequencyResponse();
    qSlider.disabled = !filters[filterName].q;
    gainSlider.disabled = !filters[filterName].gain;
    if(qSlider.disabled)
        qSlider.style.visibility = "hidden";
    else qSlider.style.visibility = "visible";
    if(gainSlider.disabled)
        gainSlider.style.visibility = "hidden";
    else gainSlider.style.visibility = "visible";
};
filtersDropdown.addEventListener("change", filterClicked, false);

window.addEventListener("load", function (e) {
    for (var i = 0; i < 3; i++) {
        biquadFilters[i] = audioCtx.createBiquadFilter();
        biquadFilters[i].type = "lowpass";
        biquadFilters[i].frequency.value = 1000;
        biquadFilters[i].Q.value = 10;
        biquadFilters[i].gain.value = 0.3;
    }
    if(qSlider.disabled)
        qSlider.style.visibility = "hidden";
    else qSlider.style.visibility = "visible";
    if(gainSlider.disabled)
        gainSlider.style.visibility = "hidden";
    else gainSlider.style.visibility = "visible";
    updateFrequencyResponse();
}, false);

var BiquadFilter = (function(audioCtx){
    function BiquadFilter(type) {
        this.filter = audioCtx.createBiquadFilter();
        this.filter.type = biquadFilters[type].type;
        this.filter.frequency.value = biquadFilters[type].frequency.value;
        this.filter.Q.value = biquadFilters[type].Q.value;
        this.filter.gain.value = biquadFilters[type].gain.value;
        this.input = this.filter;
        this.output = this.filter;
    };
    BiquadFilter.prototype.connect = function(node) {
        if(node.hasOwnProperty('input')) {
            this.output.connect(node.input);
        } else {
            this.output.connect(node);
        }
    };
    return BiquadFilter;
}(audioCtx));

var frequencyBars = 100;

var myFrequencyArray = new Float32Array(frequencyBars);
for (var i = 0; i < frequencyBars; ++i) {
    myFrequencyArray[i] = 2000 / frequencyBars * (i + 1);
}

var magResponseOutput = new Float32Array(frequencyBars); // magnitude
var phaseResponseOutput = new Float32Array(frequencyBars);
var canvas = document.getElementById("filterCanvas");
var canvasContext = canvas.getContext("2d");

function drawFrequencyResponse(mag, phase) {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    var barWidth = (400 / frequencyBars) / 4;

    canvasContext.lineWidth = 2;
    // Magnitude
    canvasContext.strokeStyle = "white";
    canvasContext.beginPath();
    for (var frequencyStep = 0; frequencyStep < frequencyBars; ++frequencyStep) {
        canvasContext.lineTo(
            frequencyStep * barWidth,
            canvas.height - (mag[frequencyStep] * 90) / 4);
    }
    canvasContext.stroke();

    // Phase
    canvasContext.strokeStyle = "red";
    canvasContext.beginPath();
    for (var frequencyStep = 0; frequencyStep < frequencyBars; ++frequencyStep) {
        canvasContext.lineTo(
            frequencyStep * barWidth,
            canvas.height - ((phase[frequencyStep] * 90 + 300) / Math.PI) / 4);
    }
    canvasContext.stroke();
}

function updateFrequencyResponse() {

    biquadFilters[activeFilter-1].getFrequencyResponse(
        myFrequencyArray,
        magResponseOutput,
        phaseResponseOutput);

    drawFrequencyResponse(magResponseOutput, phaseResponseOutput);
}

frequencySlider.addEventListener("input", function () {
    biquadFilters[activeFilter-1].frequency.value = this.value;
    updateFrequencyResponse();
    updateFilter(activeFilter-1, this.value,"frequency");
});

qSlider.addEventListener("input", function () {
    biquadFilters[activeFilter-1].Q.value = this.value;
    updateFrequencyResponse();
    updateFilter(activeFilter-1, this.value,"Q");
});

gainSlider.addEventListener("gain", function () {
    biquadFilters[activeFilter-1].gain.value = this.value;
    updateFrequencyResponse();
    updateFilter(activeFilter-1, this.value,"gain");
});


var setActiveFilter = function (val) {
    activeFilter = val;
    for (var i = 1; i < 4; i++) {
        if (i !== val) {
            document.getElementById('filter' + i + 'Power').checked = "";
        }
        else {
            document.getElementById('filter' + i + 'Power').checked = "on";
        }
    }

    document.getElementById('frequencySlider').value = biquadFilters[activeFilter-1].frequency.value;
    document.getElementById('qSlider').value = biquadFilters[activeFilter-1].Q.value;
    document.getElementById('gainSlider').value = biquadFilters[activeFilter-1].gain.value;

    updateFrequencyResponse();
};

