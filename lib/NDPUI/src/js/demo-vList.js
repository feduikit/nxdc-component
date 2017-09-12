require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','vList'],function(){
			$(".ndp-vList-wrapper[name=plain]").vList({
				data:[{label:"FATHER ONE",sub:[
					  	{label:"1-1",sub:[
							{label:"1-1-1ewrewrewrewrewreerwerwerwe"},
							{label:"1-1-2"},
							{label:"1-1-3"}
						]},
						{label:"1-2",sub:[
							{label:"1-2-1",
							     sub:[{label:"1-2-1-1"}]},
							{label:"1-2-2"},
							{label:"1-2-3"}							
						]},
						{label:"1-3"}
					 ]},
					  {label:"father two",sub:[
							{label:"3-1-1"},
							{label:"3-1-2"},
							{label:"3-1-3"}							  
					  ]},
					  {label:"hello 1"},
					  "hello 2",
					  {label:"hello3",sub:[
							{label:"5-2-1"},
							{label:"5-2-2"},
							{label:"5-2-3"}							  
					  ]}
				]
			}).on("ITEM_CLICK",function(e){
				console.log(e.originalEvent.data);//{val:选中的叶子节点值 string}
			});
			$(".ndp-vList-wrapper[name=icon]").vList({
				data:[{label:"FATHER ONE",sub:[
					  	{label:"1-1",sub:[
							{label:"1-1-1ewrewrewrewrewreerwerwerwe"},
							{label:"1-1-2"},
							{label:"1-1-3"}
						]},
						{label:"1-2",sub:[
							{label:"1-2-1",
							     sub:[{label:"1-2-1-1"}]},
							{label:"1-2-2"},
							{label:"1-2-3"}							
						]},
						{label:"1-3"}
					 ]},
					  {label:"father two",sub:[
							{label:"3-1-1"},
							{label:"3-1-2"},
							{label:"3-1-3"}							  
					  ]},
					  {label:"hello 1"},
					  "hello 2",
					  {label:"hello3",sub:[
							{label:"5-2-1"},
							{label:"5-2-2"},
							{label:"5-2-3"}							  
					  ]}
				],
				leaficon:"<i class='glyphicon glyphicon-floppy-disk' ></i>"
			}).on("ITEM_CLICK",function(e){
				console.log(e.originalEvent.data);//{val:选中的叶子节点值 string}
			});			
        });
    });
});