//游戏类
var Scene = window.Scene = Class.extend({
	//构造函数
	init : function(id){
		this.bindEvent();
	},
	//更改场景
	changeScene : function(number){
		//改变信号量
		game.sceneNumber = number;

		if(number == 0){
			game.background = new Background();
			game.land = new Land();

			//标题
			this.titleImage = game.R["title"];
			this.titleX = (360 - 178) / 2;;
			this.titleY = 0;

			this.buttonPlay = game.R["button_play"];
			this.buttonPlayX = (360 - 116) / 2;
			this.buttonPlayY = 520;

		}else if(number == 1){
			//场景管理器要负责new出元素，什么时候new出元素？
			//当场景管理器切换到这个场景的时候，要重新new出元素！
			//清空所有演员
			game.actors = [];
			game.background = new Background();
			game.land = new Land();
			game.bird = new Bird();
		}else if(number == 2){
			//记录进入这个场景时候的帧编号
			this.ff = game.f;

			//进入场景2的时候让界面白一下
			game.ctx.globalAlpha = 0;

			//GAMEOVER字样
			this.go = game.R["game_over"];
			this.gox = (360 - 204) / 2;
			this.goy = -100;

			//计分板
			this.score_panel = game.R["score_panel"];
			this.score_panelx = (360 - 238) / 2;
			this.score_panely = 600;
		}
	},
	show : function(){
		if(game.sceneNumber == 0){
			//开始场景，大地、背景不动！仅仅渲染
			game.background.render();
			game.land.render();

			//更新title
			this.titleY+=10;
			if(this.titleY > 120){
				this.titleY = 120;
			}
			game.ctx.drawImage(this.titleImage,this.titleX,this.titleY);

			//更新按钮
			this.buttonPlayY-=20;
			if(this.buttonPlayY < 260){
				this.buttonPlayY = 260;
			}
			game.ctx.drawImage(this.buttonPlay,this.buttonPlayX,this.buttonPlayY);

		}else if(game.sceneNumber == 1){
			//管子
			if(game.f % 120 == 0){
				new Pipe();
			}
			//场景1中的所有演员都是在game的actor中保存的
			//换句话说全是接口的实例，而接口中要求game.actors.push(this);
			_.each(game.actors,function(actor){
				actor.update();
				actor.render();
			},0);
		}else if(game.sceneNumber == 2){
			//让屏幕慢慢恢复正常
			game.ctx.globalAlpha+=0.06;
			if(game.ctx.globalAlpha > 1){
				game.ctx.globalAlpha = 1;
			}

			//鸟下落在地上
			game.bird.y+=20;
			if(game.bird.y > 410 - 32){
				game.bird.y = 410 - 32;
			}

		
			//渲染演员，不要更新演员了
			_.each(game.actors,function(actor){
				actor.render();
			},0);

			//GMAEOVER
			this.goy += 10;
			if(this.goy > 120){
				this.goy = 120;
			}
			game.ctx.drawImage(this.go,this.gox,this.goy);

			//计分板
			this.score_panely -= 10;
			if(this.score_panely < 220){
				this.score_panely = 220;
			}
			game.ctx.drawImage(this.score_panel,this.score_panelx,this.score_panely);


			game.bird.render();
		}
	},
	bindEvent : function(){
		var self = this;
		game.canvas.onmousedown = function(event){
			var x = event.offsetX;
			var y = event.offsetY;

			console.log(x,y)
			if(game.sceneNumber == 0){
				//范围
				if(x > self.buttonPlayX && x < self.buttonPlayX + 116 && y >  self.buttonPlayY && y < self.buttonPlayY + 70){
					self.changeScene(1);
				}
			}else if(game.sceneNumber == 1){
			 	game.bird.flyHigh();
			}else if(game.sceneNumber == 2){
				if(game.f > self.ff + 140){
					self.changeScene(0);
				}
			}
		}
			
	}
});
