require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/page'],function(){
			
			console.log($(".ndp-page-wrapper[name='plain-page']").get(0));
			$(".ndp-page-wrapper[name='plain-page']").page({
				totalPages:15//总共有多少页
			});
			
			$(".ndp-page-wrapper[name=drop-page]").page({
				type:2,//每页展示多少条，和 条目下拉菜单分开显示
				totalItems:200,//总共200页
				perPage:10//每页10条
			});
			
			$(".ndp-page-wrapper[name=drop-page2]").page({
				type:3,//条目下拉菜单和选择的展示条目数合并展示
				totalItems:200,
				perPage:10
			});	
			
			//微博翻页
			$(".ndp-page-wrapper[name=drop-page3]").page({
				type:4,
				totalPages:1000
			});			
        });
    });
});