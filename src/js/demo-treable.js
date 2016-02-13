require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','treable'],function(){
			var bool = false;
			var data1 = [{label: [{status:true},{name:"中华人民共和国"},{text:2000},{text:2},{text:20},{text:2000},
							   {text:2},{text:20},{text:2},{text:20}],
						     sub:[{label:[{status:true},{name:"美国"},{text:1100},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}],
								 sub:[{label:[{status:true},{name:"11-11-11"},{text:910},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]}]  	
								},
								{label:[{status:true},{name:"美国"},{text:3000},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]}]
						  },
						  {label:[{status:true},{name:"美国"},{text:2100},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}],
						   sub:[{label:[{status:true},{name:"美国1"},{text:2200},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
								{label:[{status:true},{name:"美国2"},{text:2300},{text:4},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
							    {label:[{status:true},{name:"美国3"},{text:2400},{text:5},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
							    {label:[{status:true},{name:"美国4"},{text:2500},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]}
							   ]
						  },
						  {label:[{status:true},{name:"美国"},{text:1300},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}],
						   sub:[{label:[{status:true},{name:"美国3-2"},{text:1000},{text:2},{text:10},{text:9000},{text:2},{text:20},{text:2},{text:20}]},
								{label:[{status:true},{name:"美国4"},{text:1001},{text:2},{text:30.5},{text:2300},{text:2},{text:20},{text:2},{text:20}]},
							    {label:[{status:true},{name:"美国5-1"},{text:1002},{text:2},{text:11},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
							    {label:[{status:true},{name:"美国6"},{text:1003},{text:9},{text:22},{text:2000},{text:2},{text:20},{text:2},{text:30}]},
							    {label:[{status:true},{name:"美国7-1"},{text:1004},{text:2},{text:20},{text:1000},{text:2},{text:20},{text:2},{text:20}]},
							    {label:[{status:true},{name:"美国8"},{text:1005},{text:2},{text:20},{text:9000},{text:2},{text:20},{text:2},{text:22}]}]
						  }
				];
			
		var data2 = [{label: [{status:true},{name:"美利坚和中国"},{text:100},{text:"我是"},{text:20},{text:1000},
							   {text:902},{text:20},{text:112},{text:20}],
						     sub:[{label:[{status:true},{name:"china china1"},{text:1100},{text:111},{text:222},{text:2000},{text:92},{text:660},{text:72},{text:50}],
								 sub:[{label:[{status:true},{name:"33-22-11"},{text:900},{text:211},{text:10},{text:2000},{text:52},{text:20},{text:12},{text:40}]}]  	
								},
								{label:[{status:true},{name:"china22"},{text:4100},{text:233},{text:720},{text:2000},{text:12},{text:20},{text:32},{text:27}]}]
						  },
						  {label:[{status:true},{name:"中国ssd"},{text:2100},{text:222},{text:20},{text:200},{text:2},{text:20},{text:2},{text:20}],
						   sub:[{label:[{status:true},{name:"中华民国"},{text:2400},{text:21},{text:22},{text:42000},{text:2},{text:20},{text:92},{text:620}]},
								{label:[{status:true},{name:"美国2-1"},{text:200},{text:2222},{text:31},{text:12000},{text:12},{text:20},{text:12},{text:320}]},
							    {label:[{status:true},{name:"美国3"},{text:240},{text:1900},{text:19.5},{text:52000},{text:22},{text:20},{text:52},{text:120}]},
							    {label:[{status:true},{name:"美国4"},{text:2500},{text:200},{text:20.2},{text:62000},{text:2},{text:20},{text:72},{text:50}]}
							   ]
						  },
						  {label:[{status:true},{name:"大比例饿点"},{text:1300},{text:4},{text:10},{text:5000},{text:2},{text:20},{text:332},{text:20}],
						   sub:[{label:[{status:true},{name:"美国3-2"},{text:1000},{text:82},{text:40},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
								{label:[{status:true},{name:"美国4"},{text:1001},{text:233},{text:50},{text:1200},{text:42},{text:20},{text:12},{text:11.2}]},
							    {label:[{status:true},{name:"美国5"},{text:1002},{text:112},{text:20},{text:32000},{text:72},{text:20},{text:92},{text:13.5}]},
							    {label:[{status:true},{name:"美国6"},{text:1003},{text:212},{text:20},{text:42000},{text:2},{text:20},{text:2},{text:40}]},
							    {label:[{status:true},{name:"美国7-3"},{text:1004},{text:52},{text:420},{text:52000},{text:12},{text:20},{text:2},{text:50}]},
							    {label:[{status:true},{name:"美国8-2"},{text:1005},{text:72},{text:40},{text:62000},{text:92},{text:20},{text:2},{text:21.2}]}]
						  }
				];	
			
			var tre = $(".ndp-treable-wrapper").treable({
//				caret:"<i class='glyphicon glyphicon-triangle-bottom'></i>",
				head:[{label:"状态"},{label:"名称"},{label:"安装"},
					  {label:"花费"},{label:"成本"},{label:"点击量"},
					  {label:"点击率"},{label:"总花费"},{label:"预算"},
					  {label:"出价"},{label:"转化率"},{label:"留存率"}
					 ],				
				body:data1,
				tail:[{},{}],
				sort:[3,5,7,9],//base from 0 
				todata:[{name:"调整预算出价",id:"price"},{name:"编辑",id:"edit"},{name:"看图表",id:"chart"}]//工具条上的按钮
			}).on("MISSION_COMPLETE",function(e){
				
			}).on("SORT_CLICK",function(e){
				var evt = e.originalEvent;
				
			}).on("TOOLBAR_CLICK",function(e){
				
			}).on("STATUS_CHANGE",function(e){
				var evt = e.originalEvent;
				
			});
		
			//显示 隐藏 头部工具栏
			$("#danger").click(function(){
				bool = !bool;
				tre.toolbar(bool);
			});
			
			//展开收起 树状菜单 
			$("#info").click(function(){
//				bool = !bool;
				tre.fold();
			});	
			
			//更新列表数据
			$("#success").click(function(){
				bool = !bool;
				tre.update(bool?data2:data1);
			});
			
        });
    });
});