var Pipe = window.Pipe = Actor.extend({
	init : function(){
		//自己的图片
		this.image1 = game.R.pipe_down;
		this.image2 = game.R.pipe_up;
		//上管子的高度
		this.height = _.random(0,250);
		//开口
		this.kaikou = 150;
		//速度
		this.speed = 4;
		//初始位置
		this.x = 360;
		//碰撞盒
		this.A1 = 0;
		this.B1 = this.x + 52;
		this.C1 = this.height;
		this.D1 = this.x;
		this.A2 = this.height + this.kaikou;
		this.B2 = this.x + 52;
		this.C2 = 410;
		this.D2 = this.x;
		//调用超类的构造函数，把自己放入game的actors数组中
		this._super();
	},
	//主循环再帮我们每帧调用update函数
	update : function(){
		this.x -= this.speed;
		//如果已经出了屏幕，自杀
		if(this.x < -52){
			this.die();
		}

		//更新碰撞盒 
		this.A1 = 0;
		this.B1 = this.x + 52;
		this.C1 = this.height;
		this.D1 = this.x;
		this.A2 = this.height + this.kaikou;
		this.B2 = this.x + 52;
		this.C2 = 410;
		this.D2 = this.x;

		//碰撞检测！
		if(
			game.bird.A < this.C1 && game.bird.B > this.D1 && game.bird.D < this.B1
					||
			game.bird.C > this.A2 && game.bird.B > this.D2 && game.bird.D < this.B2
		){
			//死了就换到场景2
			game.scene.changeScene(2);
		}
	},
	//主循环再帮我们每帧调用render函数
	render : function(){
		game.ctx.drawImage(this.image1,0,320 - this.height,52,this.height,this.x,0,52,this.height);
		game.ctx.drawImage(this.image2,0,0,52,408-this.height-this.kaikou,this.x,this.height+this.kaikou,52,408-this.height-this.kaikou);
		

		// game.ctx.font = "30px consolas";
		// game.ctx.fillText(this.A1,this.x,0)
		// game.ctx.fillText(this.B1,this.B1,30)
		// game.ctx.fillText(this.C1,this.x,this.C1)
		// game.ctx.fillText(this.D1,this.D1,30)

		// game.ctx.fillText(this.A2,this.x,this.A2)
		// game.ctx.fillText(this.B2,this.B2,this.height+this.kaikou + 30)
		// game.ctx.fillText(this.C2,this.x,this.C2)
		// game.ctx.fillText(this.D2,this.D2,this.height+this.kaikou + 30)
	},
	die : function(){
		game.actors = _.without(game.actors,this);
	}
});
