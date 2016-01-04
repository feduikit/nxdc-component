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
			});	
			
			$(".ndp-search-wrapper[name=mix2]").search({
				type:2,
				dropList:[{text:"china"},{text:"USA"},{text:"德国"}],
				disabled:true
			}).on("search_input_change",function(e){
				console.log(11);
			});				
        });
    });
});