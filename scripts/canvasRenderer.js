/**
 * Created by nils.bogen on 21.03.2016.
 */

var adsrCanvas = {
    width: 72,
    height: 64,
}

var calculateAttackSize = function() {
    var attackSize = envelopes[activeEnvelope-1].adsrAttack;
    var attackInPercent = attackSize/1;
    return (adsrCanvas.width * attackInPercent)/3;
};

var calculateDecaySize = function() {
    var decaySize = envelopes[activeEnvelope-1].adsrDecay;
    var decayInPercent = decaySize/1;
    return (adsrCanvas.width* decayInPercent)/3;
};

var calculateReleaseSize = function() {
    var releaseSize = envelopes[activeEnvelope-1].adsrRelease;
    var releaseInPercent = releaseSize/1;
    return (adsrCanvas.width * releaseInPercent)/3;
};

var calculateSustainLevel = function() {
    var sustainLevel = envelopes[activeEnvelope-1].adsrSustain;
    var sustainInPercent = sustainLevel/0.5;
    return adsrCanvas.height-(adsrCanvas.height * sustainInPercent);
};

var calculateSustainSize = function() {
    var sustainSize = 24 - calculateAttackSize();
    sustainSize += 12- calculateDecaySize();
    sustainSize += 24-calculateReleaseSize();
    console.log(sustainSize);
    var sustainInPercent = sustainSize/60;
    return adsrCanvas.width * sustainInPercent;
};



var renderAdsr = function() {
    var adsrCanv = document.getElementById("adsrCanvas");
    var ctx = adsrCanv.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,adsrCanvas.width,adsrCanvas.height);

    var xGrid = adsrCanvas.width*0.33;


    var drawLine = function(ctx, corIn) {
        ctx.beginPath();
        ctx.moveTo(corIn.x, corIn.y);
        ctx.lineTo(corIn.x2, corIn.y2);
        ctx.stroke();
    };

    /*
    ctx.fillStyle = "#444444";
    for(var i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(xGrid*i, 0);
        ctx.lineTo(xGrid*i, adsrCanv.height);
        ctx.stroke();
    }
    */
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 2;
    var cor = {
        x:0,
        y:adsrCanvas.height,
        x2:calculateAttackSize(),
        y2:0
    };

    //draw Attack
    drawLine(ctx, cor);

    //draw decay
    cor.x = cor.x+cor.x2;
    cor.y = cor.y2;
    cor.x2 = cor.x + calculateDecaySize();
    cor.y2 = calculateSustainLevel();
    var sustainStart = {
        x : cor.x2,
        y : cor.y2
    };
    drawLine(ctx, cor);

    //draw Release
    cor.x = adsrCanvas.width-calculateReleaseSize();
    cor.x2 = adsrCanvas.width;
    cor.y = cor.y2;
    cor.y2 = adsrCanvas.height;
    var sustainEnd = {
        x : cor.x,
        y : cor.y
    };
    drawLine(ctx, cor);



    // draw sustain
    cor.x = sustainStart.x;
    cor.y = sustainStart.y;
    cor.x2 = sustainEnd.x;
    cor.y2 = sustainEnd.y;
    ctx.fillStyle = "#00FF00";
    drawLine(ctx, cor);

};

