require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','vList3'],function(){
			$(".ndp-vList3-wrapper[name=plain1]").vList3({
				data:[{label:"FATHER ONE",audienceSize:"67881111",id:1,
					   sub:[
					  	{label:"1-1",audienceSize:"876567111",id:2,
						 sub:[
							{label:"1-1-1ewrewrewrewrwe",audienceSize:"111",id:3},
							{label:"1-1-2",audienceSize:"11111",id:4},
							{label:"1-1-3",audienceSize:"3111",id:5}
						]},
						{label:"1-2",audienceSize:"11111",id:6,
						 sub:[
							{label:"1-2-1",audienceSize:"34111",id:7,
							 sub:[{label:"1-2-1-1",audienceSize:"11111",id:8}]},
							{label:"1-2-2",audienceSize:"11111",id:9},
							{label:"1-2-3",audienceSize:"11111",id:10}							
						]},
						{label:"学校",audienceSize:"11111",id:11,search:true}
					 ]},
					  {label:"father two",audienceSize:"1611",id:12,
					   sub:[
							{label:"搜索",audienceSize:"11111",id:13,search:true},
							{label:"3-1-2",audienceSize:"11111",id:14},
							{label:"3-1-3",audienceSize:"11111",id:15}							  
					  ]},
					  {label:"hello 1",audienceSize:"811111",id:16},
					  {label:"hello3",audienceSize:"11111",id:17,
					   sub:[
							{label:"5-2-1",audienceSize:"7811111",id:12},
							{label:"5-2-2",audienceSize:"3211111",id:12},
							{label:"5-2-3",audienceSize:"11111",id:12}							  
					  ]
					  }
				]
			}).on("ITEM_CLICK",function(e){
				console.log(e.originalEvent.data);//{val:选中的叶子节点值 string}
			});

			$(".ndp-vList3-wrapper[name=plain2]").vList3({
				expicon:"<i class='glyphicon glyphicon-triangle-right'></i>",
				data:[{label:"FATHER ONE",audienceSize:"67881111",id:1,
					   sub:[
					  	{label:"1-1",audienceSize:"876567111",id:2,
						 sub:[
							{label:"1-1-1ewrewrewrewrwe",audienceSize:"111",id:3},
							{label:"1-1-2",audienceSize:"11111",id:4},
							{label:"1-1-3",audienceSize:"3111",id:5}
						]},
						{label:"1-2",audienceSize:"11111",id:6,
						 sub:[
							{label:"1-2-1",audienceSize:"34111",id:7,
							 sub:[{label:"1-2-1-1",audienceSize:"11111",id:8}]},
							{label:"1-2-2",audienceSize:"11111",id:9},
							{label:"1-2-3",audienceSize:"11111",id:10}							
						]},
						{label:"1-3",audienceSize:"11111",id:11}
					 ]},
					  {label:"father two",audienceSize:"1611",id:12,
					   sub:[
							{label:"3-1-1",audienceSize:"11111",id:13},
							{label:"3-1-2",audienceSize:"11111",id:14},
							{label:"3-1-3",audienceSize:"11111",id:15}							  
					  ]},
					  {label:"hello 1",audienceSize:"811111",id:16},
					  {label:"hello3",audienceSize:"11111",id:17,
					   sub:[
							{label:"5-2-1",audienceSize:"7811111",id:12},
							{label:"5-2-2",audienceSize:"3211111",id:12},
							{label:"5-2-3",audienceSize:"11111",id:12}							  
					  ]
					  }
				]
			}).on("ITEM_CLICK",function(e){
				console.log(e.originalEvent.data);//{val:选中的叶子节点值 string}
			});			
			
        });		
		
    });
});