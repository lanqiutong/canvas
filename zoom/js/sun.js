function Sun(){
	this.beginNum=0;
	this.imagename=([
		"sun0",
		"sun1",
		"sun2",
		"sun3",
		"sun4",
		"sun5",
		"sun6",
		"sun7",
		"sun8",
		"sun9",
		"sun10",
		"sun11",
		"sun12",
		"sun13",
		"sun14",
		"sun15",
		"sun16",
		"sun17",
		"sun18",
		"sun19",
		"sun20",
		"sun21"	
		])[this.beginNum];
	this.image=game.R[this.imagename];
	this.x=parseInt(Math.random()*game.canvas.width);
	this.y=-77;
	this.dx=(parseInt(Math.random()*10)-5)*0.1;
	this.dy=parseInt(Math.random()*2+1);
	game.suns.push(this);

}
Sun.prototype.update=function(){
	this.beginNum++;
	if(this.beginNum>21){
		this.beginNum=0;
	}
	this.x+=this.dx;
	this.y+=this.dy;
	if((this.x<-77)||(this.x>game.canvas.width-77)||(this.y>game.canvas.height-77)){
		this.godie(this);
	}

}
Sun.prototype.render=function(){
	game.ctx.drawImage(this.image,this.x,this.y);
}
Sun.prototype.godie=function(){
	for (var i = 0; i < game.suns.length; i++) {
			if(game.suns[i]==this){
				game.suns.splice(i, 1);
			}
		}
}