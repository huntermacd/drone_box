context = new (window.AudioContext || window.webkitAudioContext)();

var gainNode1 = context.createGain();
gainNode1.gain.value = 2;

var note = {};
note.c = 16.35;
note.cs = 17.32;
note.d = 18.35;
note.ds = 19.45;
note.e = 20.60;
note.f = 21.83;
note.fs = 23.12;
note.g = 24.50;
note.gs = 25.96;
note.a = 27.50;
note.as = 29.14;
note.b = 30.87;

var low = 0;
var mid = 0;
var high = 0;

var play = document.getElementById("play");
play.addEventListener("click", function(){playDrone(low, mid, high)}, true);

var stop = document.getElementById("stop");
stop.addEventListener("click", stopDrone, true);

var select = document.getElementById("select");

var options = select.getElementsByTagName('option');

function playDrone(low, mid, high) {
    play.disabled = true;
    osc = context.createOscillator();
    osc2 = context.createOscillator();
    osc3 = context.createOscillator();

    osc.frequency.value = low;
    osc.type = 'sine';
    osc.connect(gainNode1);
    gainNode1.connect(context.destination);
    osc.start();

    osc2.frequency.value = mid;
    osc2.connect(context.destination);
    osc2.start();

    osc3.frequency.value = high;
    osc3.connect(context.destination);
    osc3.start();
}

function stopDrone() {
    play.disabled = false;
    osc.stop();
    osc.disconnect();

    osc2.stop();
    osc2.disconnect();

    osc3.stop();
    osc3.disconnect();
}

function selectNote() {
    for (i = 0; i < options.length; ++i) {
        option = options[i];
        if (option.selected) {
            low = note[option.id] * 8;
            mid = note[option.id] * 16;
            high = note[option.id] * 32;
            console.log(low, mid, high);
            return low, mid, high;
        }
    }
}