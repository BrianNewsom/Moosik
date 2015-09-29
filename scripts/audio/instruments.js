var lead = T("saw", {freq:T("param")});
var vcf  = T("MoogFF", {freq:2400, gain:6, mul:0.1}, lead);
var env  = T("perc", {r:100});
var arp  = T("OscGen", {wave:"sin(15)", env:env, mul:0.5});
var bass = T("saw", {freq:100})

var synth = T("delay", {time:"BPM128 L4", fb:0.65, mix:0.35}, 
	T("pan", {pos:0.2}, vcf), 
	T("pan", {pos:T("tri", {freq:"BPM64 L1", mul:0.8}).kr()}, arp)
)
