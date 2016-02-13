require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','treable'],function(){
			var bool = false;
			var tre = $(".ndp-treable-wrapper").treable({
//				caret:"<i class='glyphicon glyphicon-triangle-bottom'></i>",
				data:{
					head:[{label:"状态"},{label:"名称"},{label:"安装"},
						  {label:"花费"},{label:"成本"},{label:"点击量"},
						  {label:"点击率"},{label:"总花费"},{label:"预算"},
						  {label:"出价"},{label:"转化率"},{label:"留存率"}],
					body:[{label:    [{status:true},{name:"中华人民共和国"},{text:2000},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}],
						     sub:    [{label:[{status:true},{name:"美国"},{text:1100},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}],
								 sub:[{label:[{status:true},{name:"11-11-11"},{text:900},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]}]  	
								},
								{label:[{status:true},{name:"美国"},{text:3000},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]}]
						  },
						  {label:[{status:true},{name:"美国"},{text:2100},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}],
						   sub:[{label:[{status:true},{name:"美国1"},{text:2200},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
								{label:[{status:true},{name:"美国2"},{text:2300},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
							    {label:[{status:true},{name:"美国3"},{text:2400},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
							    {label:[{status:true},{name:"美国4"},{text:2500},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]}
							   ]
						  },
						  {label:[{status:true},{name:"美国"},{text:1300},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}],
						   sub:[{label:[{status:true},{name:"美国3"},{text:1000},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
								{label:[{status:true},{name:"美国4"},{text:1001},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
							    {label:[{status:true},{name:"美国5"},{text:1002},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
							    {label:[{status:true},{name:"美国6"},{text:1003},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
							    {label:[{status:true},{name:"美国7"},{text:1004},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
							    {label:[{status:true},{name:"美国8"},{text:1005},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]}]
						  }
						 ],
					tail:[{},{}]
				},
				sort:[3,5,7,9],//base from 0 
				todata:[{name:"调整预算出价",id:"price"},{name:"编辑",id:"edit"},{name:"看图表",id:"chart"}]//工具条上的按钮
			}).on("MISSION_COMPLETE",function(e){
				console.log("hello world");	
			}).on("SORT_CLICK",function(e){
				var evt = e.originalEvent;
				console.log(evt.data);
			}).on("TOOLBAR_CLICK",function(e){
				console.log(e.originalEvent.data);
			}).on("STATUS_CHANGE",function(e){
				var evt = e.originalEvent;
				console.log(evt.data);
			});
		
			$("#danger").click(function(){
				bool = !bool;
				tre.toolbar(bool);
			});
			
			$("#info").click(function(){
//				bool = !bool;
				tre.fold();
			});			
        });
    });
});