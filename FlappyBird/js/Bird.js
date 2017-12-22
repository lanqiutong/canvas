var Bird = window.Bird = Actor.extend({
	init : function(){
		//随机一个颜色
		this.color = _.sample([0,1,2],1)[0];
		//图片队列
		this.images = [game.R["bird" + this.color + "_0"],game.R["bird" + this.color + "_1"],game.R["bird" + this.color + "_2"]];
		//翅膀状态0、1、2
		this.wing = 0;
		//位置
		this.x = 320 * (1 - 0.618);
		this.y = 200;
		//旋转
		this.rotate = 0;
		//帧编号
		this.f = 0;
		//是否上升
		this.hasEnergy = false;
		//开始下降的时候的鸟的位置
		this.startY = this.y;
		//碰撞检测盒，原理见笔记
		this.A = this.y + 7;
		this.B = this.x + 41;
		this.C = this.y + 41;
		this.D = this.x + 7;

		//调用超类的构造函数，把自己放入game的actors数组中
		this._super();
	},
	//主循环再帮我们每帧调用update函数
	update : function(){
		//翅膀动作
		this.wing = ++this.wing % 3;

		//公式s = v0t + 0.5 * g * t * t (加速度是负数)
		if(this.hasEnergy){
			this.f++;
			// 用相对来表示上升，14表示14帧上升完毕
			this.y -= (14 - this.f);
			//碰到天空之后，不能继续上升
			if(this.y < -7){
				this.y = -7;
			}
			this.rotate += 1 / 12;
			//升到14帧，就开始下坠
			if(this.f > 12){
				//开始下坠
				this.hasEnergy = false;
				this.f = 0;
				this.startY = this.y;
			}
		}else{
			//下降
			this.f++;
			//绝对来表示下降
			this.y = this.startY + 0.5 * this.f * this.f;
			this.rotate += 0.08;
		}

		//更新自己的碰撞检测盒，原理见笔记上的图图
		this.A = this.y + 7;
		this.B = this.x + 41;
		this.C = this.y + 41;
		this.D = this.x + 7;

		//碰撞大地检测
		if(this.C > 410){
			//死了就换到场景2
			game.scene.changeScene(2);
		}
		

		console.log(this.A,this.B,this.C,this.D);
	},
	//主循环再帮我们每帧调用render函数
	render : function(){
		//保存
		game.ctx.save();
		//先移动坐标系
		game.ctx.translate(this.x + 24,this.y + 24);
		//然后旋转
		game.ctx.rotate(this.rotate);
		//绘制
		game.ctx.drawImage(this.images[this.wing],-24,-24);
		//恢复
		game.ctx.restore(); 
	},
	//飞得更高，实际上这个函数没有让元素非得更改，就是改了
	//hasEnergy为ture，update函数看见这个ture就会执行上升改变。
	flyHigh : function(){
		this.hasEnergy = true;
		//复原两个量
		this.f = 0;
		this.rotate = -1;
		this.startY = game.bird.y;
	}
});
