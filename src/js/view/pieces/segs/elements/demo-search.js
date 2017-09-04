define(function(){
	function Demo(){
			$(".ndp-search-wrapper[name=plain]").search({
				placeholder:"请输入字符",
				name:"username"//为了方便serialize 建议设置name 属性
			}).val("hello");//设置input 显示的值;
			
			$(".ndp-search-wrapper[name=disable]").search({
				placeholder:"请输入字符",
				disabled:true
			});
			
			
			$(".ndp-search-wrapper[name=mix]").search({
				type:2,
				dropList:[{text:"中国"},{text:"美国"},{text:"德国"}]
			}).on("SCOPE_CHANGE",function(e){//前置下来菜单，选择后
				//前置下拉菜单 更新
				console.log(e.originalEvent.data);//{index:索引，value:值}
			});	
		
			$(".ndp-search-wrapper[name=plain2]").search({
				type:3,
				ajaxOptions: {
					type: "GET",
					url: "../data/search.json"
				}				
			}).on("INPUT_CHANGE",function(e){//输入内容发生改变 触发
				console.log(e.originalEvent.data);//{text:输入内容}
			}).on("do_search",function(e){
				//用户输入内容，回车 或者点击搜索(放大镜) 触发这个事件
				console.log(e.originalEvent.data);//数据
			}).on("ITEM_SELECT",function(e){//点击下拉菜单内容，针对有ajax 请求的情况
				console.log(e.originalEvent.data);//{text:内容}
			}).on("INPUT_CLEAR",function(e){//点击x 清除内容
				console.log(e.originalEvent.data);//{text:内容}
			});
			
			$(".ndp-search-wrapper[name=mixall]").search({
				type:4,
				dropList:[{text:"china"},{text:"USA"},{text:"德国"}],
				ajaxOptions: {
					type: "GET",
					url: "../data/search.json",
					xhrFields: { withCredentials: true}
				}				
			}).on("input_change",function(e){
				console.log(e.originalEvent.data);
			}).on("do_search",function(e){
				//用户输入内容，回车 或者点击搜索(放大镜) 触发这个事件
				console.log(e.originalEvent.data);//数据
			}).on("INPUT_CHANGE",function(e){//输入内容发生改变 触发
				console.log(e.originalEvent.data);//{text:输入内容}
			}).on("ITEM_SELECT",function(e){//点击下拉菜单内容，针对有ajax 请求的情况
				console.log(e.originalEvent.data);//{text:内容}
			}).on("INPUT_CLEAR",function(e){//点击x 清除内容
				console.log(e.originalEvent.data);//{text:内容}
			});		
	}
	return Demo;
});