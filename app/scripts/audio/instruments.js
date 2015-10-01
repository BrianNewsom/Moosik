function Instruments(){
	this.lead = T("saw", {freq:T("param")});
	this.vcf  = T("MoogFF", {freq:2400, gain:6, mul:0.1}, this.lead);
	this.env  = T("perc", {r:100});
	this.arp  = T("OscGen", {wave:"sin(15)", env:this.env, mul:0.5});
	this.bass = T("saw", {freq:100})

	this.synth = T("delay", {time:"BPM128 L4", fb:0.65, mix:0.35}, 
		T("pan", {pos:0.2}, this.vcf), 
		T("pan", {pos:T("tri", {freq:"BPM64 L1", mul:0.8}).kr()}, this.arp)
	)
}
