var Background=window.Background=Class.extend({
	init:function(){
		this.image=game.R["bg1"];
		this.x=1000;
	
		
	},
	update:function(){
	
		this.x-=0.05;
		this.dx=0.05;
		if(this.x<850) this.x=850;

	},
	render:function(){
		game.ctx.drawImage(this.image,150,0,game.canvas.width,game.canvas.height,0,0,game.canvas.width,game.canvas.height);
		game.ctx.drawImage(game.R["progressbar"],850,550,156,20);
		game.ctx.drawImage(game.R["zoombiehead"],this.x,550,21,22);
		game.ctx.drawImage(game.R["flag"],855,542);
		
	}
});