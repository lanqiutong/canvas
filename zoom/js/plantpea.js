var Plant=window.Plant=Plant.extend({
	init:function(){
		this.beginNum=0;
		this.imagename=([
			"wdp0",
			"wdp1",
			"wdp2",
			"wdp3",
			"wdp4",
			"wdp5",
			"wdp6",
			"wdp7",
			"wdp8",
			"wdp9",
			"wdp10",
			"wdp11",
			"wdp12",
			"wdp13",
			"wdp14"	
		])[this.beginNum];
		this.image=game.R[this.imagename];
		this.f=0;
		this.x=120;
		this.y=280;
		this.A=this.y;
		this.B=this.x; 
		this.C=this.y+64;
		this.D=this.x+68;
		this.live=40;
		this._super();
		 
		
	},
	update:function(){
		this.beginNum++;
	if(this.beginNum>14){
		this.beginNum=0;
	}
	this.imagename=([
			"wdp0",
			"wdp1",
			"wdp2",
			"wdp3",
			"wdp4",
			"wdp5",
			"wdp6",
			"wdp7",
			"wdp8",
			"wdp9",
			"wdp10",
			"wdp11",
			"wdp12",
			"wdp13",
			"wdp14"	
		])[this.beginNum];
	this.image=game.R[this.imagename];
		this.f++;
		if(this.live<=0){
			this.godie(this);
			game.zoombie.state=0;
			return;
		}else if(game.zoombies.length!=0&&this.f%20==0&&game.plants.length!=0){
			game.bullet=new Bullet();
			game.bullet.x=this.x+15;
			game.bullet.y=this.y;
		}
	},
	render:function(){
		
		game.ctx.drawImage(game.R["plantshadow"],0,0,83,35,this.x,this.y+45,83,35);
		game.ctx.drawImage(this.image,0,0,64,68,this.x,this.y,64,68);
		
	},

});