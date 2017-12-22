var Land = window.Land = Actor.extend({
	init : function(){
		//自己的图片
		this.image = game.R.land;
		this.x = 0;
		this.speed = 4;
		//调用超类的构造函数，把自己放入game的actors数组中
		this._super();
	},
	//主循环再帮我们每帧调用update函数
	update : function(){
		this.x -= this.speed;
		if(this.x < -336){
			this.x = 0;
		}
	},
	//主循环再帮我们每帧调用render函数
	render : function(){
		game.ctx.drawImage(this.image,this.x,520 - 112);
		game.ctx.drawImage(this.image,336 + this.x,520 - 112);
		game.ctx.drawImage(this.image,336 * 2 + this.x,520 - 112);
	}
});
