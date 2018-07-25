<body>
    <div 
        tabindex="0"
        style="background:black; height:100%;"
    >
    <input style="background:black; color:white; font-size:25pt" type="text" value="" id="freq_box">
    <br>
    <input style="background:black; color:white; font-size:25pt" type="text" value="" id="freq_box2">

    </div>
    
</body>

<script>
//author Sage Fremont

//Frequency 1
var start_freq = 200;
var current_freq = start_freq;
var freq_changes = [200];
var step = 0;

//Speed of Frequency
var interval = 1;

//Frequency 2
var start_freq2 = 1000;
var current_freq2 = start_freq2;
var freq_changes2 = [250];
var step2 = 0;

function changeNote(when){
    // get the next frequency change from the 
    // freq_change array
    var freq_change = freq_changes[step % freq_changes.length];
    var freq_change2 = freq_changes2[step2 % freq_changes2.length];
    // move along the step, ready for the next time we get called
    step ++;
    step2 ++;

    // update the frequency 
    current_freq = current_freq + freq_change;
    current_freq2 = current_freq2 - freq_change2;
    
    // check if it went too high or too low
    if (current_freq > 800 || current_freq < 200){
        current_freq = start_freq;
    }
    // print the chosen frequncy into the input tag so we can see it
    document.getElementById('freq_box').value = current_freq;
    // finally, change the frequency of the oscillator
    osc.frequency.setValueAtTime(current_freq, when);
    
    if (current_freq2 < 100 || current_freq2 > 1000){
        current_freq2 = start_freq2;
    }
    document.getElementById('freq_box2').value = current_freq2;
    osc2.frequency.setValueAtTime(current_freq2, when);
}


var audio_context = window.AudioContext || window.webkitAudioContext;
var con = new audio_context();


var osc = con.createOscillator();
osc.type = 'triangle';
osc.frequency.value = start_freq;
var osc_amp = con.createGain();
osc_amp.gain.value = 0.32;
osc.connect(osc_amp);

var osc2 = con.createOscillator();
osc2.type = 'wave';
osc2.frequency.value = start_freq2;
var osc2_amp = con.createGain();
osc2_amp.gain.value = 0.42;
osc2.connect(osc2_amp);



var del = con.createDelay();
osc_amp.connect(del);

var del2 = con.createDelay();
osc2_amp.connect(del2);

var fb = con.createGain();
del.connect(fb);
fb.connect(del);
del.delayTime.value = 0.25;
fb.gain.value = 0.75;

var fb2 = con.createGain();
del2.connect(fb2);
fb2.connect(del2);
del2.delayTime.value = 0.25;
fb2.gain.value = 0.75;


del.connect(con.destination);
del2.connect(con.destination);

//osc_amp.connect(con.destination);
//osc2_amp.connect(con.destination);

osc.start();
osc2.start();




// this code will wake up every (wait_time) ms 
// and schedule a load of drum triggers on the clock
// each time, remembering where it scheduled to in the future
// so it does not repeat anything
var wait_time = 0.5;
var got_up_to;

setInterval(function(){
    var now = con.currentTime;
    // SCHEDULING
    var max_future_time = now + (wait_time  * 1.5);
    if (got_up_to > now) {// already scheduled up to this point
        now = got_up_to;
    }
    
    while (now <= max_future_time){
        changeNote(now);
        now += interval;
    }
    got_up_to = now;
    
}, wait_time*1000);


</script>