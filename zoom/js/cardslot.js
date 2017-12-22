function Cardslot(){
	//this.xrk=game.R["xrkkc"];
	//this.xrkglobalAlpha=0;
	//this.xrkch=0;
//
	this.wdp=game.R["wdpkc"];
	//豌豆炮切片透明度
	this.wdpglobalAlpha=0;
	// 豌豆炮切片高度
	this.wdpch=0;
	//豌豆炮冷却时间
	this.wdptime=5;
	this.wdpglobalAlphastep=1/(this.wdptime*1000/20);
	this.wdpchstep=60/((this.wdptime*1000/20))

}
Cardslot.prototype.update=function (){
	//this.xrkglobalAlpha+=0.002;
	//this.xrkch+=0.12;
	//if(this.xrkch>=60) this.xrkch=60;
	this.wdpglobalAlpha+=this.wdpglobalAlphastep;
	if(this.wdpglobalAlpha>1) this.wdpglobalAlpha=1;
	this.wdpch+=this.wdpchstep;
	if(this.wdpch>=60) this.wdpch=60;

};
Cardslot.prototype.render=function (){
	//game.ctx.drawImage(this.xrk,0,60,100,60,60,10,100,60);
	//game.ctx.save();
	//game.ctx.globalAlpha=this.xrkglobalAlpha;
	//game.ctx.drawImage(this.xrk,0,0,100,this.xrkch,60,10,100,this.xrkch);
	//game.ctx.restore();
	game.ctx.drawImage(this.wdp,0,60,100,60,165,10,100,60);
	game.ctx.save();
	game.ctx.globalAlpha=this.wdpglobalAlpha;
	game.ctx.drawImage(this.wdp,0,0,100,this.wdpch,165,10,100,this.wdpch);
	game.ctx.restore();
	game.ctx.drawImage(game.R["sunback"],265,30);
	game.ctx.font = "26px Consolas";
  	game.ctx.fillText(game.sunAmount, 320, 55);
	}