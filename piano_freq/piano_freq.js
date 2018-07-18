<body>
    <div
        style="background:transparent; height:300px;"
        tabindex="1"
        onkeydown="setNote(event.key)"
   >
      
      
    </div>  

</body>


<script>
    //Piano Freq v1.0.2017 Sage Fremont
	
    //This makes synthesizer cross-browser compatible
      //audio_context allows us to connect to the computer's audio system
    var audio_context = window.AudioContext || window.webkitAudioContext; 
    
    //creating a sound engine, calling it 'con'
    var con = new audio_context();
    
    //asking audio_context 'con' to create an oscillator
    var osc = con.createOscillator();
    
    //connecting osc to what is in the paren
      //here we are connecting it to con.destination
      //con.destination is basically the audio output
    osc.connect(con.destination);
    
    //Optional starting oscellator frequency
    osc.frequency.value = 0;
    
    //function for notes created with key presses
    function setNote(key){
        if (key == "."){
            //play quit
            osc.frequency.value = 0;
        }
        if (key == "z"){
            //play C3
            osc.frequency.value = 130.81;
        }
        if (key == "q"){
            //play c#3
            osc.frequency.value = 138.59;
        }
        if (key == "x"){
            //play D3
            osc.frequency.value = 146.83;
        }
        if (key == "w"){
            //play d#3
            osc.frequency.value = 155.56;
        }
        if (key == "a"){
            //play E3
            osc.frequency.value = 164.81;
        }
        if (key == "s"){
            //play F3
            osc.frequency.value = 174.61;
        }
        if (key == "e"){
            //play f#3
            osc.frequency.value = 185.00;
        }
        if (key == "d"){
            //play G3
            osc.frequency.value = 196.00;
        }
        if (key == "r"){
            //play g#3
            osc.frequency.value = 207.65;
        }
        if (key == "f"){
            //play A3
            osc.frequency.value = 220.00;
        }
        if (key == "t"){
            //play a#3
            osc.frequency.value = 233.08;
        }
        if (key == "g"){
            //play B3
            osc.frequency.value = 246.94;
        }
        if (key == "h"){
            //play a C4
            osc.frequency.value = 261.63;
        }
        if (key == "u"){
            //play a c#4
            osc.frequency.value = 277.18;
        }
        if (key == "j"){
            //play a D4
            osc.frequency.value = 293.66;
        }
        if (key == "i"){
            //play a d#4
            osc.frequency.value = 311.13;
        }
        if (key == "k"){
            //play a E4
            osc.frequency.value = 329.63;
        }
        if (key == "l"){
            //play a F4
            osc.frequency.value = 349.23;
        }
        if (key == "p"){
            //play a f#4
            osc.frequency.value = 369.99;
        }
        if (key == ";"){
            //play a G4
            osc.frequency.value = 392.00;
        }
        if (key == "["){
            //play a g#4
            osc.frequency.value = 415.30;
        }
        if (key == "'"){
            //play a A4
            osc.frequency.value = 440.00;
        }
        if (key == "]"){
            //play a a#4
            osc.frequency.value = 466.16;
        }
        if (key == "/"){
            //play a B4
            osc.frequency.value = 493.88;
        }

    }
        
    
    //start oscillator for tone NOTE: add or remove // to turn on or off
    osc.start();
    
</script>
