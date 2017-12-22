function Scene(){
	this.bindEvent();
}
Scene.prototype.enter=function(number){
	game.sceneNum=number;
	switch(game.sceneNum) {
		//欢迎界面
		case 0:
			this.x=305;
			this.y=450;
			this.beginCutX=0;
			this.sodrollcapX=114;
			this.rotate=0;
			document.getElementById("welcome").loop="loop";
			document.getElementById("welcome").play();
			break;
			//游戏开始界面
		case 1:	
			
			break;
			//教学界面
		case 2:	
		document.getElementById("welcome").loop="";
		document.getElementById("welcome").pause();
		this.sodrowf=30;
		this.cutX=0;
		this.imageX=0
		this.cutdX=220/this.sodrowf;
		this.imagedX=725/this.sodrowf;
		this.sodrollW=72;
		this.sodrolldW=36/this.sodrowf;
		this.sodrollcapW=80;
		this.sodrollcapdW=40/this.sodrowf;
			break;
			//游戏界面
		case 3:	
		document.getElementById("baitian").loop="loop";
		document.getElementById("baitian").play();
		game.f=0;
		game.bg.x=1000;
		game.sunAmount=0;
		game.plants=[];
		game.zoombies=[];
		game.bullets=[];
		game.suns=[];
		game.plant=new Plant();
			break;
			//失败界面	
		case 4:
		document.getElementById("baitian").loop="";
		document.getElementById("baitian").pause();		
		document.getElementById("lose").play();
			break;
			//成功界面
		case 5:
		document.getElementById("baitian").loop="";
		document.getElementById("baitian").pause();	
		document.getElementById("win").play();
		this.lightW=155;
		this.lightdW=15.5
		this.sunflowerW=64;
		this.sunflowerdW=2.15;
			break; 

	}
}
Scene.prototype.updateAndRender=function(){
	switch(game.sceneNum) {
		case 0:
		this.beginCutX++;
		this.sodrollcapX-=0.26;
		this.rotate+=0.2;
		this.sodrollcapX<60 &&this.enter(1)
		game.ctx.drawImage(game.R["titlescreen"],0,0,game.canvas.width,game.canvas.height);	
		game.ctx.drawImage(game.R["down"],this.x+2,this.y+53,440,57);
		game.ctx.drawImage(game.R["begin"],0,0,this.beginCutX,31,this.x,this.y,this.beginCutX*2,62);
		game.ctx.save();
		game.ctx.translate(this.x+this.sodrollcapX/2+this.beginCutX*2-40,this.y+62-this.sodrollcapX/2);
		game.ctx.rotate(this.rotate);
		game.ctx.drawImage(game.R["sodrollcap"],-this.sodrollcapX/2,-this.sodrollcapX/2,this.sodrollcapX,this.sodrollcapX);
		game.ctx.restore();
			break;
		case 1:
		game.ctx.drawImage(game.R["titlescreen"],0,0,game.canvas.width,game.canvas.height);	
		game.ctx.drawImage(game.R["down"],this.x+2,this.y+53,440,57);
		game.ctx.drawImage(game.R["begin"],0,0,220,31,this.x,this.y,440,62);
		game.ctx.font = "24px 微软雅黑";
		game.ctx.fillStyle="red";
		game.ctx.fillText("点击开始",460,533);
			break;
		case 2:
		this.cutX+=this.cutdX;
	
		this.imageX+=this.imagedX;
	
		this.sodrollW-=this.sodrolldW;
		this.sodrollcapW-=this.sodrollcapdW;
	
		if(this.imageX>725) {
		game.ctx.drawImage(game.R["bg0"],0,0,450,248,0,0,game.canvas.width,game.canvas.height);	
		game.ctx.drawImage(game.R["sod1row"],0,0,220,34,240,270,725,102);
		game.ctx.drawImage(game.R["zoombienote1"],game.canvas.width/2-170,game.canvas.height/2-111,340,222);
		}else{
		game.ctx.drawImage(game.R["bg0"],0,0,450,248,0,0,game.canvas.width,game.canvas.height);	
		game.ctx.drawImage(game.R["sod1row"],0,0,this.cutX,34,240,270,this.imageX,102);	
		game.ctx.drawImage(game.R["sodroll"],240+this.imageX-this.sodrollW,270-72+55,this.sodrollW,100);
		game.ctx.drawImage(game.R["sodrollcap"],240-5+this.imageX-this.sodrollcapW+8,270+50+5,this.sodrollcapW,this.sodrollcapW);
		}
			break;
		
		case 3:
		game.bg.update();
		game.bg.render();
		game.cardslot.update();
		game.cardslot.render();	
		for (var i = 0; i < game.plants.length; i++) {
			game.plants[i].update();
			game.plants[i].render();
		}
		for (var i = 0; i < game.bullets.length; i++) {
			game.bullets[i].update();
			game.bullets[i].render();
		}
		for (var i = 0; i < game.zoombies.length; i++) {
			game.zoombies[i].update();
			if(game.zoombies[i]) game.zoombies[i].render();
			if(game.zoombies[i].D<0){
				game.scene.enter(4);
			}	

		}
		if(game.zoombies.length==0&&game.f>3000) game.scene.enter(5);
		
		for (var i = 0; i < game.suns.length; i++) {
			game.suns[i].update();
			if(game.suns[i])game.suns[i].render();
		}
		var a=100+parseInt(Math.random()*50);
		if(game.f<3000){
			if(game.f % a == 0){
			new Zoombie();
			}
		}
		if(game.f%200==0){
			new Sun();
		}
			break;
		case 4:
		game.ctx.fillStyle="black";
		game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
		game.ctx.drawImage(game.R["gameover"],game.canvas.width/2-498/2,game.canvas.height/2-439/2);
			break;
		case 5:
		game.bg.update();
		game.bg.render();	
		game.plants.length!=0&&_.each(game.plants,function(plant){
			if(plant){
				plant.update();
				plant.render();
			}
		});
		game.cardslot.update();
		game.cardslot.render();
		this.lightW+=this.lightdW;
		(this.lightW > 620) && (this.lightW = 620);
		this.sunflowerW+=this.sunflowerdW;
		(this.sunflowerW> 128)  && (this.sunflowerW = 128);
		game.ctx.drawImage(game.R["light"],game.canvas.width/2-this.lightW/2,game.canvas.height/2-this.lightW/2,this.lightW,this.lightW)
		game.ctx.drawImage(game.R["sunflower"],game.canvas.width/2-this.sunflowerW/2,game.canvas.height/2-this.sunflowerW/2,this.sunflowerW,this.sunflowerW)
			break;
		
	}
}
Scene.prototype.bindEvent=function(){
	var self = this;
	game.canvas.onclick = function(e){
			var x = e.offsetX;
			var y = e.offsetY;

			switch(game.sceneNum){
				case 0:
					
					break;
				case 1:
					if(x>self.x&&x<self.x+440&&y>self.y&&y<self.y+114){
						self.enter(2);
						
					}
					break;
				case 2:
					(self.imageX>725) && self.enter(3);
					break;
				case 3:
				for (var i = 0; i <game.suns.length; i++) {
					//收集阳光
				if(x>game.suns[i].x&&x<game.suns[i].x+77&&y>game.suns[i].y&&y<game.suns[i].y+77){
					game.sunAmount+=25;
					game.suns[i].godie(this);
					}
				}
					break;
				case 4:
					self.enter(1);
					break;
				case 5:
					(this.lightW = 620)&& self.enter(1);
					break;
			}

	}
	

	
}