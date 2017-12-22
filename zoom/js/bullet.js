var Bullet=window.Bullet=Bullet.extend({
	init:function(){
		this.image=game.R["zidan"];
		this.x=135;
		this.y=280;
		this.A=this.y;
		this.B=this.x;
		this.C=this.y+24;
		this.D=this.x+24;
		this._super();

		
	},
	update:function(){
		this.x+=10;
		this.A=this.y;
		this.B=this.x;
		this.C=this.y+24;
		this.D=this.x+24;
		if(game.zoombies.length>0){
		if(this.A>game.zoombies[0].A && this.C<game.zoombies[0].C && this.B>game.zoombies[0].B && this.D<game.zoombies[0].D){
			game.zoombies[0].live--;
			document.getElementById("pea").play();
			this.godie(this);
					
			};
}
	
	},
	render:function(){
		
		game.ctx.drawImage(this.image,this.x,this.y);
	
	}


})