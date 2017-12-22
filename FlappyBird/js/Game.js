//游戏类
var Game = window.Game = Class.extend({
	//构造函数
	init : function(id){
		//得到画布
		this.canvas = document.getElementById(id);
		//上下文
		this.ctx = this.canvas.getContext("2d");
		//R那个文件的路径：
		this.RtextURL = "R.txt";
		//自己的图片资源对象，v是图片的路径
		this.RObj = null;
		this.R = {};
		//帧编号
		this.f = 0;
		//场景编号0开始画面、1游戏画面、2结束画面
		this.sceneNumber = 0;
		//所有演员
		this.actors = [];
		//加载所有资源，这个函数做完之后，调用自己的start函数。
		this.loadResouces(function(){
			this.start();
		});
	},
	//加载所有资源，这个函数的终点，就是调用自己的start函数。
	loadResouces : function(callback){
		var self = this;
		//已经加载好的图片编号
		var count = 0;
		//提示用户，我们正在加载资源呢，让丫别慌！
		self.ctx.font = "20px 微软雅黑";
		self.ctx.textAlign = "center";
		self.ctx.fillText("正在加载图片...",self.canvas.width / 2,self.canvas.height * (1 - 0.618));
		//Ajax发出请求图片资源
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)){
				//转为对象
				self.RObj = JSON.parse(xhr.responseText);
				//图片总数
				var imagesAmount = _.size(self.RObj);
				//遍历这个对象，设置一个相似的图片Image()对象的JSON
				for(var k in self.RObj){
					//创建Image对象
					self.R[k] = new Image();
					//发出src请求
					self.R[k].src = self.RObj[k];
					//监听
					self.R[k].onload = function(){
						//计数器加1
						count++;
						//清屏
						self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
						self.ctx.fillText("正在加载图片" + count + "/" + imagesAmount,self.canvas.width / 2,self.canvas.height * (1 - 0.618));
						//当加载好的数量等于图片总数的时候
						if(count == imagesAmount){
							// 所有图片已经加载完毕，做什么事情？？
							// 调用回调函数！！
							callback.call(self);
						}
					}
				}
			}
		}
		xhr.open("get",this.RtextURL,true);
		xhr.send(null);
	},
	start : function(){
		var self = this;
		//场景管理器，唯一的场景管理器
		this.scene = new Scene();
		//命令场景管理器调用场景0！
		this.scene.changeScene(this.sceneNumber);
		//游戏开始了，主循环
		this.timer = setInterval(function(){
			//清屏
			self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);

			//命令自己的场景管理器，更新所有演员、渲染所有演员
			self.scene.show();
			 

			//帧编号加1 
			self.f++;
			self.ctx.textAlign = "left";
			self.ctx.font = "14px Consolas";
			self.ctx.fillText("FNO " + self.f ,10 ,20);


			self.ctx.fillText(self.sceneNumber ,10 ,40);


		},20);
	}
});
