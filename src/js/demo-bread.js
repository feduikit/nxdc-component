require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/bread'],function(){
			$("div.ndp-bread-wrapper[name=plain-bread]").bread({
				home:"<i class='glyphicon glyphicon-home'></i>",
				list:["Homeqeqweqwewqeqwewqewqewqqqwewqeqweqweqeqweqweqweqweqweqw","Libraryaaaaaaaaaaaaaaaaaaaaaaaaaaaa","Dataasdsadasdsfsfsafasfsfsafsdfsdfdswqwqewqwqeqweqweqweqwewqewqewqeweqweweqeqwqweqwfwefwe"],
				spliter:">"
			});
			$("div.ndp-bread-wrapper[name=drop-bread]").bread({
				home:"<i class='glyphicon glyphicon-home'></i>",
				list:["Home","Library","Data"],
				spliter:"/"
			});			
        });
    });
});