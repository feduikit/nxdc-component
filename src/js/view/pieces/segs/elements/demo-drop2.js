define(function(){
	function Demo(){
			$(".dropdown[name='aa']").drop2({
				id:"meme1",
				caret:"<i class='glyphicon glyphicon-menu-down'></i>",
				label:"文字drop测试",
                showcaret:true,
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
			
		
			$(".dropdown[name='bb']").drop2({
				id:"meme2",
                showcaret:true,
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
		
		
			$(".dropdown.drop2-wrapper[name='bbc']").drop2({
				id:"meme3",
                showcaret:true,
				caret:"<i class='glyphicon glyphicon-menu-down'></i>",//下拉三角形的图标
				label:"<i class='glyphicon glyphicon-th-list'></i>",//显示的图标
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
		
		
			$(".dropdown.drop2-wrapper[name='cc']").drop2({
				type:2,
				id:"meme2",
                showcaret:true,
				caret:"<i class='glyphicon glyphicon-menu-down'></i>",
				label:{label:"用户设置"},
				data:[
					  {label:"用户设置"},
					  {label:"修改密码"},
					  {label:"接触绑定"},
					  {label:"退出"}
					 ]
			}).on("SELECT_CHANGE",function(e){
				console.log(e.originalEvent.data);
			}).val("修改密码");
        
			$(".dropdown.drop2-wrapper[name='button']").drop2({
				id:"meme4",
                showcaret:false,
				label:'<button class="btn btn-default">点击下拉</button>',
				data:[
					  {label:"用户设置"},
					  {label:"修改密码"},
					  {label:"接触绑定"},
					  {label:"退出"}
					 ]
			}).on("SELECT_CHANGE",function(e){
				console.log(e.originalEvent.data);
			});	        
	}
	return Demo;
});