require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/tree'],function(){
		$("div[name='plain-tree']").tree({
				data:[{label:"FATHER ONE",sub:[
					  	{label:"1-1",sub:[
							{label:"1-1-1"},
							{label:"1-1-2"},
							{label:"1-1-3"}
						]},
						{label:"1-2",sub:[
							{label:"1-2-1",sub:[{label:"hello123"}]},
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
			});		
		
			
			$("div[name='icon-tree']").tree({
				data:[{label:"FATHER ONE",sub:[
					  	{label:"1-1",sub:[
							{label:"1-1-1"},
							{label:"1-1-2"},
							{label:"1-1-3"}
						]},
						{label:"1-2",sub:[
							{label:"1-2-1",sub:[{label:"hello123"}]},
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
				folder:"<i class='glyphicon glyphicon-folder-open'></i>",
				file:"<i class='glyphicon glyphicon-file'></i>"
			});			
			
			
			$("div[name='check-tree']").tree({
				data:[{label:"FATHER ONE",sub:[
					  	{label:"1-1",sub:[
							{label:"1-1-1"},
							{label:"1-1-2"},
							{label:"1-1-3"}
						]},
						{label:"1-2",sub:[
							{label:"1-2-1",sub:[{label:"hello123"}]},
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
				folder:"<i class='glyphicon glyphicon-folder-open'></i>",
				file:"<i class='glyphicon glyphicon-file'></i>",				
				checkbox:true
			});
        });
    });
});