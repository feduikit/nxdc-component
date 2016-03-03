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
			}).on("ITEM_CLICK",function(e){
				//下拉选项被点击
				console.log(e.originalEvent.data);//{value:选中的值 string}
			});
			
			
			
			$(".dropdown.drop2-wrapper[name='bb']").drop2({
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
			}).on("ITEM_CLICK",function(e){
				console.log(e.originalEvent.data); //{value:选中的值 string}
			});	

			
			$(".dropdown.drop2-wrapper[name='cc']").drop2({
				type:2,
				id:"meme2",
				caret:"<i class='glyphicon glyphicon-menu-down'></i>",
				label:{label:"用户设置"},
				data:[
					  {label:"用户设置"},
					  {label:"修改密码"},
					  {label:"接触绑定"},
					  {label:"退出"},
					  {label:"退出1"},
					  {label:"退出2"},
					  {label:"退出3"},
					  {label:"退出4"},
					  {label:"退出5"},
					  {label:"退出6"},
					  {label:"退出7"}
					 ]
			}).on("SELECT_CHANGE",function(e){
				console.log(e.originalEvent.data);
			}).val("修改密码");	
			
			
			//glyphicon glyphicon-tag
			$(".dropdown[name='tag']").drop2({
				id:"meme3",
				caret:"<i class='glyphicon glyphicon-menu-down'></i>",
				label:"<i class='glyphicon glyphicon-th-list'></i>",
				data:[
					  {label:"用户设置"},
					  {label:"修改密码"},
					  {label:"接触绑定"},
					  {label:"退出"}
					 ]
			}).on("ITEM_CLICK",function(e){
				//下拉选项被点击
				console.log(e.originalEvent.data);//{value:选中的值 string}
			});		
			
			
		});
	});
});