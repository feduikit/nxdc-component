define(function(){
	function Demo(){
		$("div.ndp-page-wrapper[name=plain-page]").page({
			totalPages:15
		}).on("PAGE_CHANGE",function(e){//页数点击 事件
			console.log(e.originalEvent.data);//{currentPage: 第几页 int}
		});
		
		$("div.ndp-page-wrapper[name=drop-page]").page({
			type:2,//1 普通，2 带显示条数
			totalItems:200,//总共有n条数据
			perPage:10//每页默认显示10条
		}).on("SHOW_ITEMS_CHANGE",function(e){
			console.log(e.originalEvent.data);//{currentPage:第几页，int,  perpage:每页显示多少条，int}
		}).on("PAGE_CHANGE",function(e){
			console.log(e.originalEvent.data);
		});
		
		$("div.ndp-page-wrapper[name=drop-page2]").page({
			type:3,//1 普通，2 带显示条数，3 显示条数条 + 数下拉菜单
			totalItems:200,//总共有n条数据
			perPage:10//每页默认显示10条
		}).on("PAGE_CHANGE",function(e){
				console.log(e.originalEvent.data);
		});	
		
		$("div.ndp-page-wrapper[name=drop-page3]").page({
			type:4,//4 类似微博翻页
			totalPages:100,//总共有n条数据
		});			
	}
	return Demo;
});