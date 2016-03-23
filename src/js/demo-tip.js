require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/tip'],function(){
				$("button.btn-primary").click(function(){
					showTip({
						time:10,//默认 10秒消失
						content:"This is tip for showing people some thing!<button class='btn btn-primary btn2'>button</button>",
						closeCallback:function(){//tip被人为关闭
							console.log("关闭了 tip");	
						},
						clickCallback:function(ta,tip){
							if(ta.tagName && $(ta).hasClass("btn2")){
								console.log("hello world");
							}
						}
					});
				});
			
			
				$("button.btn-success").click(function(){
					showTip({type:"success",
							 close:true,
							 icon:"<i class='glyphicon glyphicon-home'></i>",
							 closeCallback:function(){
								console.log("关闭了 tip");	
							}
					});
				});
			
			
				$("button.btn-danger").click(function(){
					showTip({
						type:"danger",
						close:true,
						closeCallback:function(){
							console.log("关闭了 tip");	
						}						
					});
				});	
			
			
				$("button.btn-warning").click(function(){
					showTip({type:"warning",close:true})
							.on("TIP_CLOSE",function(e){
							console.log("tip 关闭 WARNING");
						 });
				});	
			
			
				$("button.btn2primary").click(function(){
					showTip({
						through:false
					});
				});
				$("button.btn2success").click(function(){
					showTip({type:"success",
							 close:true,
							 through:false,
							 icon:"<i class='glyphicon glyphicon-home'></i>"});
				});
				$("button.btn2danger").click(function(){
					showTip({type:"danger",
							 icon:"<i class='glyphicon glyphicon-alert'></i>",
							 content:"警告！返回数据格式有误，请查证后修改！！SD敢达时光隧道根深蒂固发水电费的所发生的多个s阿萨斯的上发的说法是范德萨发斯蒂芬水电费水电费是范德萨发上非师范生的房顶上大师的撒打算打打杀杀答案是打算打算打算<button class='btn btn-danger btn2'>返回</button>",
							 through:false,
							 close:true});
				});	
				$("button.btn2warning").click(function(){
					showTip({type:"warning",
							 through:false,
							 close:true});
				});	
			
				$("#inl").click(function(){
					showTip({type:"warning", //显示何种类型的tip  warning, danger, success,primary
							 close:true,//是否显示 x 关闭按钮
							 bind:$(".hello") //依附的对象是，默认是document.body , 传入一个jquery DOM对象
							});					
				});
        });
    });
});