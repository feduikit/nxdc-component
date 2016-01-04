require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','confirm'],function(){
			
			$("button.btn-primary").click(function(){
				$("#confirm-holder").confirm({
					content:"您的述职报告已经完成，您确定提交吗？"
				});
			});
			
			$("button.btn-warning").click(function(){
				$("#confirm-holder").confirm({
					icon:"<i class='glyphicon glyphicon-phone'></i>"
				}).on("click_ok",function(){ 
					console.log("-----");
				});
			});
			
        });
    });
});