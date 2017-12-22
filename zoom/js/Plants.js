var Plant=window.Plant=Class.extend({
	init:function(){
		game.plants.push(this);
	},
	update : function(){

	},
	render : function(){
		throw new Error("必须重写render方法！");
	},
	godie:function(self){
		for (var i = 0; i < game.plants.length; i++) {
			if(game.plants[i]==self){
				game.plants.splice(i, 1);
				
			}
		}
	}
})