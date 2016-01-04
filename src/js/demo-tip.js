require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/tip'],function(){
				$("button.btn-primary").click(function(){
					showTip({
						content:"This is tip for showing people some thing!<button class='btn btn-primary btn2'>button</button>"
					});
				});
				$("button.btn-success").click(function(){
					showTip({type:"success",
							 close:true,
							 icon:"<i class='glyphicon glyphicon-home'></i>"});
				});
				$("button.btn-danger").click(function(){
					showTip({type:"danger",close:true});
				});	
				$("button.btn-warning").click(function(){
					showTip({type:"warning",close:true});
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
							 content:"警告！返回数据格式有误，请查证后修改！！<button class='btn btn-danger btn2'>返回</button>",
							 through:false,
							 close:true});
				});	
				$("button.btn2warning").click(function(){
					showTip({type:"warning",
							 through:false,
							 close:true});
				});			
        });
    });
});