require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/bread'],function(){
			$("div.ndp-bread-wrapper[name=plain-bread]").bread({
				home:"<i class='glyphicon glyphicon-home'></i>",
				list:["Homeqeqweqwewqeqwewqewqewqqqwewqeqweqweqeqweqweqweqweqweqw","Libraryaaaaaaaaaaaaaaaaaaaaaaaaaaaa","Dataasdsadasdsfsfsafasfsfsafsdfsdfdswqwqewqwqeqweqweqweqwewqewqewqeweqweweqeqwqweqwfwefwe"],
				spliter:">"
			}).on("LAYER_CHANGE",function(e){//层级发生改变
				console.log(e.originalEvent.data);//{index:当前位于第几层，int,  text:层级的名称 string}
			});
			
			$("div.ndp-bread-wrapper[name=drop-bread]").bread({
				home:"<i class='glyphicon glyphicon-home'></i>",
				list:["Home","Library","Data"],
				spliter:"/"
			}).on("LAYER_CHANGE",function(e){//层级发生改变
				console.log(e.originalEvent.data);//{index:当前位于第几层，int,  text:层级的名称 string}
			});;			
        });
    });
});