var mKeys = [
  65, // C
  87, // C#
  83, // D
  69, // D#
  68, // E
  70, // F
  84, // F#
  71, // G
  89, // G#
  72, // A
  85, // A#
  74, // H
  75, // C
  79, // C#
  76, // D
  80, // D#
  192, // E
  222, // F
];

var scales = [
  {
    key: "C major",
    notes: [65, 83, 68, 70, 71, 72, 74, 75, 76, 192, 222],
  },
  {
    key: "C minor",
    notes: [65, 83, 69, 70, 71, 89, 85, 75, 76, 80, 222],
  },
  {
    key: "Penta",
    notes: [87, 69, 84, 89, 85, 79, 80],
  },
  {
    key: "Sakura",
    notes: [65, 87, 70, 71, 89, 75,79,22],
  },
];

var activeScale = null;

function setScale(key) {
  scales.forEach((s) => {
    let e = document.getElementById("scale" + s.key);
    if(!e) return;
    e.classList.remove("scaleActive");
  });

  if (activeScale && activeScale.key == key) {
    activeScale = null;
    mKeys.forEach((k) => {
      let e = document.getElementById("m" + k);
      if (!e) return;
      e.classList.remove("off");
    });
    return;
  }

  let scale = scales.filter((s) => s.key == key)[0];
  if (!scale) return;
  activeScale = scale;
  let e = document.getElementById("scale" + scale.key);
  e.classList.add("scaleActive");
  // Reset classlist
  mKeys.forEach((k) => {
    let e = document.getElementById("m" + k);
    if (!e) return;
    e.classList.remove("off");
  });

  let keysToDisable = mKeys.filter((k) => scale.notes.indexOf(k) == -1);
  //console.log(keysToDisable);
  keysToDisable.forEach((k) => {
    let id = "m" + k;
    let e = document.getElementById(id);
    //console.log(e, id);
    if (!e) return;
    e.classList.add("off");
  });
}

if (isMobile) {
  /*
    console.log("Rendering mobile");
  let root = document.getElementById("mobileKeyboardScales");
  let html = "";
  for (let i = 0; i < scales.length; i++) {
    //html += new ScaleBTN(scales[i].key).render();
    html += "<div id='scale"+ scales[i].key+ "' class='mobileKeyboardScalesBtn' ontouchend='setScale(\"" + scales[i].key+  "\")'><label class='scaleTitle'>" + scales[i].key + "</label></div>"
  }
  console.log(html);
  root.innerHTML = html;
  */
  let a = new app();
  a.render();
} else {
  // Disable keyboard
  let keyboard = document.getElementById("mobileKeyboard");
  keyboard.style.display = "none";
}

function app() {
    this.root = document.getElementById("mobileKeyboardScales");

    this.elements = [
//        new ScaleBTN('Sakura'),

    ];
    scales.forEach(s => this.elements.push(new ScaleBTN(s.key)));

    this.render = function() {
        this.root.innerHTML = '';

        this.elements.forEach(e =>  this.root.innerHTML += e.render());
        this.elements.forEach(e =>  e.mounted());

    }
}

function ScaleBTN(key) {
  this.key = key;
  this.id = 'scale'+this.key;

  this.handle = function(e) {
      setScale(this.key);
  }

  this.mounted = function() {
    let data = this.render();
    var regex = /@[\w]+=['\w)]+/g
    let m = data.match(regex);
    let event = m.toString().split('=')[0].replace('@','');
    let action = m.toString().split('=')[1].replace(/\'/g,'');


    document.getElementById(this.id).addEventListener(event, this[action].bind(this))
  }

  this.render = function () {
    return /* html */ `
        <div id='${this.id}' class='mobileKeyboardScalesBtn' @touchend='handle'    >
            <label class='scaleTitle'>${this.key}</label>
        </div>
   `
  };
}
