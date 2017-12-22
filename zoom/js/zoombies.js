var Zoombie=window.Zoombie=Class.extend({
	init:function(){
		game.zoombies.push(this);
	},
	update : function(){

	},
	render : function(){
		throw new Error("必须重写render方法！");
	},
	godie:function(){		
				game.zoombies.splice(0, 1);
				
				
	}
})