require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','drop2'],function(){
			//$('[data-toggle="popover"]').popover();
			$(".dropdown[name='aa']").drop2({
				id:"meme",
				caret:"<i class='glyphicon glyphicon-menu-down'></i>",
				label:"文字drop测试",
				data:[
					  {label:"用户设置"},
					  {label:"修改密码"},
					  {label:"接触绑定"},
					  {label:"退出"}
					 ]
			});
			
			
			
			$(".dropdown[name='bb']").drop2({
				id:"meme",
				caret:"<i class='glyphicon glyphicon-menu-down'></i>",
				label:"多级菜单",
				data:[
					  {label:"标题1",
					   sub:[
						  {label:"中国"},
						   {label:"美国"},
						   {label:"饿国"}
					  ]},
					  {label:"标题2",
					   sub:[
						 {label:"中国1"},
						  {label:"中国2"},
						  {label:"中国3"}
					  ]}
					 ]
			}).on("item_click",function(e,data){
				console.log(data);
			});			
		});
	});
});