require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/vList2'],function(){
			$(".ndp-vList-wrapper[name=plain]").vList2({
				data:[{label:"中国",
					   icon:"<i class='glyphicon glyphicon-home'></i>",
					   sub:[
					  	{label:"河北"},
						{label:"河南"},
						{label:"陕西"},
						{label:"北京"}
					 ]},
					 {label:"欧洲",icon:"<i class='glyphicon glyphicon-book'></i>",
					  sub:[
							{label:"法国"},
							{label:"意大利"},
							{label:"德国"}							  
					 ]}
				]
			});
        });
    });
});