var Zoombie=window.Zoombie=Zoombie.extend({
	init:function(){
		this.beginNum=0;
		this.imagename=([
			"zoombiewalk0",
			"zoombiewalk1",
			"zoombiewalk2",
			"zoombiewalk3",
			"zoombiewalk4",
			"zoombiewalk5",
			"zoombiewalk6",
			"zoombiewalk7",
			"zoombiewalk8",
			"zoombiewalk9",
			"zoombiewalk10",
			"zoombiewalk11",
			"zoombiewalk12",
			"zoombiewalk13",
			"zoombiewalk14",
			"zoombiewalk15",
			"zoombiewalk16",
			"zoombiewalk17",
			"zoombiewalk18",
			"zoombiewalk19",
			"zoombiewalk20"
		])[this.beginNum];
		this.a=0;
		this.image=game.R[this.imagename];
		this.x=game.canvas.width;
		this.y=220;
		this.A=this.y;
		this.B=this.x; 
		this.C=this.y+120;
		this.D=this.x+85;
		this.speed=1;
		this.state=0;
		this.live=10;
		this._super();

	},
changeState:function(){
	if(this.live<=0){	
	//死亡状态	
		this.state=2;	
	}else if(this.x<findfirstplant(game.plants) + 68){
		
		//攻击状态
		this.state=1;
	
	}else{
//行走方法
		this.state=0;
	}
	
		

	
},
update:function(){	 

this.changeState();
	switch(this.state) {
		case 0:
			this.walk()
			break;
		case 1:
			this.attack();
			document.getElementById("attack").play();
			break;
		case 2:
			this.die();
			if(this.a>=10){
			this.godie();
			}
			break;
	}



		
},
render:function(){
	game.ctx.drawImage(this.image,this.x,this.y);

},
walk:function(){
	this.x-=this.speed;
	this.y=this.y;
	this.A=this.y;
	this.B=this.x; 
	this.C=this.y+120;
	this.D=this.x+85;
	this.beginNum++;
	if(this.beginNum>20){
		this.beginNum=0;
	}
	this.imagename=([
			"zoombiewalk0",
			"zoombiewalk1",
			"zoombiewalk2",
			"zoombiewalk3",
			"zoombiewalk4",
			"zoombiewalk5",
			"zoombiewalk6",
			"zoombiewalk7",
			"zoombiewalk8",
			"zoombiewalk9",
			"zoombiewalk10",
			"zoombiewalk11",
			"zoombiewalk12",
			"zoombiewalk13",
			"zoombiewalk14",
			"zoombiewalk15",
			"zoombiewalk16",
			"zoombiewalk17",
			"zoombiewalk18",
			"zoombiewalk19",
			"zoombiewalk20"
		])[this.beginNum];
	this.image=game.R[this.imagename];

},
attack:function(){
	game.plants[findfirstplantindex(game.plants)].live--;
	this.x=this.x;
	this.y=this.y;
	this.A=this.y;
	this.B=this.x; 
	this.C=this.y+120;
	this.D=this.x+85;
	this.beginNum++;
	if(this.beginNum>20){
		this.beginNum=0;
	}
	this.imagename=([
		"zoombieattack0",
		"zoombieattack1",
		"zoombieattack2",
		"zoombieattack3",
		"zoombieattack4",
		"zoombieattack5",
		"zoombieattack6",
		"zoombieattack7",
		"zoombieattack8",
		"zoombieattack9",
		"zoombieattack10",
		"zoombieattack11",
		"zoombieattack12",
		"zoombieattack13",
		"zoombieattack14",
		"zoombieattack15",
		"zoombieattack16",
		"zoombieattack17",
		"zoombieattack18",
		"zoombieattack19",
		"zoombieattack20"
	])[this.beginNum];
	this.image=game.R[this.imagename];
},
die:function(){
		this.x=this.x;
		this.y=this.y;
		this.A=this.y;
		this.B=this.x; 
		this.C=this.y+120;
		this.D=this.x+85;
		this.a++;
		this.beiginNum++;
		this.imagename=([
			"zoombiedie0",
			"zoombiedie1",
			"zoombiedie2",
			"zoombiedie3",
			"zoombiedie4",
			"zoombiedie5",
			"zoombiedie6",
			"zoombiedie7",
			"zoombiedie8",
			"zoombiedie9"
		])[this.beginNum];
		if(this.beginNum>9){
				this.beginNum=9;
			}
		this.image=game.R[this.imagename];
						
}

});

			