require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','search'],function(){		
			$(".ndp-search-wrapper[name=plain]").search({
				placeholder:"请输入字符"
			});
			
			$(".ndp-search-wrapper[name=dis]").search({
				disabled:true
			});
			
			$(".ndp-search-wrapper[name=mix]").search({
				type:2,
				dropList:[1,2,3]
			}).on("scope_change",function(e){
				//前置下拉菜单 更新
				console.log(e.originalEvent.data);
			});	
			
			$(".ndp-search-wrapper[name=mix2]").search({
				type:2,
				dropList:[{text:"china"},{text:"USA"},{text:"德国"}],
				disabled:true
			}).on("input_change",function(e){
				console.log(11);
			});
			
			
			
			$(".ndp-search-wrapper[name=plain2]").search({
				type:3,
				dropList:[{text:"china"},{text:"USA"},{text:"德国"}],
			}).on("input_change",function(e){
				console.log(e.originalEvent.data);
			}).on("do_search",function(e){
				//用户输入内容，回车 或者点击搜索(放大镜) 触发这个事件
				console.log(e.originalEvent.data);//数据
			});
			
			$(".ndp-search-wrapper[name=mixall]").search({
				type:4,
				dropList:["china","usa","world"],
				dropList:[{text:"china"},{text:"USA"},{text:"德国"}],
			}).on("input_change",function(e){
				console.log(e.originalEvent.data);
			}).on("do_search",function(e){
				//用户输入内容，回车 或者点击搜索(放大镜) 触发这个事件
				console.log(e.originalEvent.data);//数据
			});			
			
        });
    });
});