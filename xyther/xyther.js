<div
  style="height:350; background:transparent"
  onmousedown="osc.start(); osc2.start()"
  onmousemove="osc.frequency.value = event.clientY;this.innerText=event.clientY; osc2.frequency.value = event.clientX;this.innerText=event.clientX"
  >XY Theremin Sage Fremont.  CLICK ANYWHERE TO START.</div>
<script>
    var AC = window.AudioContext || window.webkitAudioContext;
    var actx = new AC();
    var osc = actx.createOscillator(); osc.connect(actx.destination);
    var actx2 = new AC();
    var osc2 = actx2.createOscillator(); osc2.connect(actx2.destination);
</script>
