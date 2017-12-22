var Game=window.Game=Class.extend({
	init:function(id){
		this.canvas=document.getElementById(id);
		this.ctx=this.canvas.getContext("2d");
		this.RtextURL="R.txt";
		this.Robj=null;
		this.R={};
		this.f=0;
		this.sceneNum =0;
		this.sunAmount=0;
		this.plants=[];
		this.zoombies=[];
		this.bullets=[];
		this.suns=[];
		this.bindEvent();

		this.loadResouces(function(){
			this.start();
		})
	},
	loadResouces : function(callback){
		var self = this;
		//已经加载好的图片编号
		var count = 0;
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
		
		this.scene=new Scene();
		this.scene.enter(0);
		this.bg = new Background();
		this.plant=new Plant();
		this.zoombie=new Zoombie();
		this.cardslot=new Cardslot();
		this.sun=new Sun();
		
		var self = this;
		this.timer = setInterval(function(){
			//清屏
		
			self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
			self.scene.updateAndRender();

			//帧编号加1 
			self.f++;
			self.ctx.textAlign = "left";
			self.ctx.font = "14px Consolas";
			self.ctx.fillText("FNO " + self.f ,10 ,20);
			self.ctx.fillText("场景号" + self.sceneNum , 10 , 40);

		
		},40);
	},
	bindEvent : function(){
		var self=this;
	
		//实现种植植物时拖拽效果
 		var divObj=document.getElementById("cover");
    	var moveFlag=false;

        divObj.onmousedown=function(e){
        if(game.sunAmount<100) return;
        if(game.cardslot.wdpglobalAlpha>=1) divObj.className="bg";
        moveFlag=true;
        var clickEvent=window.event||e;
        var mwidth=clickEvent.clientX-divObj.offsetLeft;
        var mheight=clickEvent.clientY-divObj.offsetTop;
        document.onmousemove=function(e){
            var moveEvent=window.event||e;
            if(moveFlag){
                divObj.style.left=moveEvent.clientX-mwidth+"px";
                divObj.style.top=moveEvent.clientY-mheight+"px";
                divObj.onmouseup=function(){
                	var state=true;
                	divObj.className="";
                	//判断种植位置上面是否有植物；
                	for (var i = 0; i < game.plants.length; i++) {
                		if(game.plants[i].x==Math.ceil((moveEvent.clientX-mwidth-120)/70)*70+120||moveEvent.clientY-mheight<270||moveEvent.clientY-mheight>370){
                			state=false;
                		}
                	}
                	if(state&&game.cardslot.wdpglobalAlpha>=1){
                	game.plant=new Plant();
                	game.sunAmount=game.sunAmount-100;
                	game.plant.x=Math.ceil((moveEvent.clientX-mwidth-120)/70)*70+120;
                	game.plant.y=280;
                	document.getElementById("pea").play();
                	divObj.style.left="165px";
                	divObj.style.top="10px";
                	game.cardslot.wdpglobalAlpha=0;
					game.cardslot.wdpch=0;
                    moveFlag=false;
                	}
                }
            }
        }
    };
			
}	
		
		
	
	
});

//找出x最大的植物；
function findfirstplant(a){  
	var arr=[];
	for (var i = 0; i < a.length; i++) {
		arr.push(a[i].x);
		}
	var max = arr[0];
	for(var i = 1; i < arr.length; i++){
		if( max < arr[i] ){
		    max = arr[i];
		}
		  
	}
 return max;

	}
function findfirstplantindex(a){  
	var arr=[];
	for (var i = 0; i < a.length; i++) {
		arr.push(a[i].x);
		}
	var max = arr[0];
	for(var i = 1; i < arr.length; i++){
		if( max < arr[i] ){
		    max = arr[i];

		}
		  
	}
 return arr.indexOf(max);

	}
