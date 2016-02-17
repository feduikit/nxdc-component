require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/page'],function(){
			
			console.log($(".ndp-page-wrapper[name='plain-page']").get(0));
			$(".ndp-page-wrapper[name='plain-page']").page({
				totalPages:15//总共有多少页
			});
			
			$(".ndp-page-wrapper[name=drop-page]").page({
				type:2,
				totalItems:200,
				perPage:10
			});
			
			$(".ndp-page-wrapper[name=drop-page2]").page({
				type:3,
				totalItems:200,
				perPage:10
			});			
			
        });
    });
});