var Bullet=window.Bullet=Class.extend({
	init:function(){
		game.bullets.push(this);
	},
	update : function(){

	},
	render : function(){
		throw new Error("必须重写render方法！");
	},
	godie:function(self){
		for (var i = 0; i < game.bullets.length; i++) {
			if(game.bullets[i]==self){
				game.bullets.splice(i, 1);
			}
		}
	}
})