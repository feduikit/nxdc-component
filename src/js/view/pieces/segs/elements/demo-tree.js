define(function(){
	function Demo(){
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
			}).on("LEAF_CLICK",function(e){
				//叶子节点被点击
				console.log(e.originalEvent.data);//{val:叶子节点的值 string}
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
			}).on("LEAF_CLICK",function(e){
				//叶子节点被点击
				console.log(e.originalEvent.data);//{val:叶子节点的值 string}
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
			}).on("LEAF_CHECK",function(e){
				//被check
				console.log(e.originalEvent.data);//{val:叶子节点的值 string,check:true|false  boolean 是否选中}
			});		
	};
	return Demo;
});