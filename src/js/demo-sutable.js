require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/sutable'],function(){
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
			
			
			
			$(".ndp-sutable-wrapper").sutable({
				caret:"<i class='glyphicon glyphicon-triangle-right'></i>",
				head:[{label:"状态"},{label:"名称"},{label:"安装"},
					  {label:"花费"},{label:"成本"},{label:"点击量"},
					  {label:"点击率"},{label:"总花费"},{label:"预算"},
					  {label:"出价"},{label:"转化率"},{label:"留存率"}
					 ],				
				body:data1,
				tail:[{},{}],
				sort:[3,5,7,9],//base from 0 
				todata:[{name:"调整预算出价",id:"price"},{name:"编辑",id:"edit"},{name:"看图表",id:"chart"}]//工具条上的按钮				
			});
        });
    });
});