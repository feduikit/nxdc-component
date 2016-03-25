require(['./config'],function(){
    require(['jquery','utils','NVis'],function($){
        require(['com/ndpmedia/vis/ChartWidget','bootstrap','treable'],function(ChartWidget){
			var bool = false;
			
			var gdata = {
  "data": [
    {
      "fields": [
        {
          "id": "x",
          "name": "Month",
          "category": [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        },
        {
          "id": "y",
          "name": "temperature"
        },
        {
          "id": "z",
          "name": "city",
          "category": [
            "Tokyo",
            "New York",
            "Berlin",
            "London"
          ]
        }
      ],
      "rows": [
        [
          0,
          7,
          0
        ],
        [
          1,
          6.9,
          0
        ],
        [
          2,
          9.5,
          0
        ],
        [
          3,
          14.5,
          0
        ],
        [
          4,
          18.2,
          0
        ],
        [
          5,
          21.5,
          0
        ],
        [
          6,
          25.2,
          0
        ],
        [
          7,
          26.5,
          0
        ],
        [
          8,
          23.3,
          0
        ],
        [
          9,
          18.3,
          0
        ],
        [
          10,
          13.9,
          0
        ],
        [
          11,
          9.6,
          0
        ],
        [
          0,
          0.2,
          1
        ],
        [
          1,
          0.8,
          1
        ],
        [
          2,
          5.7,
          1
        ],
        [
          3,
          11.3,
          1
        ],
        [
          4,
          17,
          1
        ],
        [
          5,
          22,
          1
        ],
        [
          6,
          24.8,
          1
        ],
        [
          7,
          24.1,
          1
        ],
        [
          8,
          20.1,
          1
        ],
        [
          9,
          14.1,
          1
        ],
        [
          10,
          8.6,
          1
        ],
        [
          11,
          2.5,
          1
        ],
        [
          0,
          0.9,
          2
        ],
        [
          1,
          0.6,
          2
        ],
        [
          2,
          3.5,
          2
        ],
        [
          3,
          8.4,
          2
        ],
        [
          4,
          13.5,
          2
        ],
        [
          5,
          17,
          2
        ],
        [
          6,
          18.6,
          2
        ],
        [
          7,
          17.9,
          2
        ],
        [
          8,
          14.3,
          2
        ],
        [
          9,
          9,
          2
        ],
        [
          10,
          3.9,
          2
        ],
        [
          11,
          1,
          2
        ],
        [
          0,
          3.9,
          3
        ],
        [
          1,
          4.2,
          3
        ],
        [
          2,
          5.7,
          3
        ],
        [
          3,
          8.5,
          3
        ],
        [
          4,
          11.9,
          3
        ],
        [
          5,
          15.2,
          3
        ],
        [
          6,
          17,
          3
        ],
        [
          7,
          16.6,
          3
        ],
        [
          8,
          14.2,
          3
        ],
        [
          9,
          10.3,
          3
        ],
        [
          10,
          6.6,
          3
        ],
        [
          11,
          4.8,
          3
        ]
      ]
    }
  ],
  "grammar": {
    "graph": "basic",
    "coordinates": {
      "dimensions": [
        {
          "axis": [
            {
              "id": "yAxis",
              "title": [
                {
                  "$ref": "y"
                }
              ],
              "titleStyle": {
                "fill": "red",
                "outline": "yellow"
              }
            }
          ]
        },
        {
          "axis": [
            {
              "title": [
                {
                  "$ref": "x"
                }
              ]
            }
          ]
        }
      ]
    },
    "elements": [
      {
        "type": "spline",
        "tooltipContent": [
          {
            "$ref": "z"
          },
          ":",
          {
            "$ref": "y"
          },
          "<br>"
        ],
        "position": [
          {
            "field": {
              "$ref": "y"
            }
          },
          {
            "field": {
              "$ref": "x"
            }
          }
        ],
        "color": [
          {
            "field": {
              "$ref": "z"
            }
          }
        ]
      }
    ]
  },
  "tooltip": {
    "shared": true
  },
  "titles": [
    {
      "type": "title",
      "label": {
        "content": [
          "Monthly Average Temperature"
        ]
      }
    }
  ],
  "legend": {}
};
			var data1 = [{id:"1111",label: [{status:true},{name:"中华人民共和国"},{text:2000},{text:2},{text:20},{text:2000},
							   {text:2},{text:20},{text:2},{text:20}],
						     sub:[{id:"11110",label:[{status:true},{name:"美国"},{text:1100},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}],
								 sub:[{id:"111101",label:[{status:true},{name:"11-11-11"},{text:910},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]}]  	
								},
								{id:"11111",label:[{status:true},{name:"美国"},{text:3000},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]}]
						  },
						  {id:"1112",label:[{status:true},{name:"美国"},{text:2100},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}],
						   sub:[{id:"11120",label:[{status:true},{name:"美国1"},{text:2200},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
								{id:"11121",label:[{status:true},{name:"美国2"},{text:2300},{text:4},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
							    {id:"11122",label:[{status:true},{name:"美国3"},{text:2400},{text:5},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
							    {id:"11123",label:[{status:true},{name:"美国4"},{text:2500},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}]}
							   ]
						  },
						  {id:"1113",label:[{status:true},{name:"美国"},{text:1300},{text:2},{text:20},{text:2000},{text:2},{text:20},{text:2},{text:20}],
						   sub:[{id:"11131",label:[{status:true},{name:"美国3-2"},{text:1000},{text:2},{text:10},{text:9000},{text:2},{text:20},{text:2},{text:20}]},
								{id:"11132",label:[{status:true},{name:"美国4"},{text:1001},{text:2},{text:30.5},{text:2300},{text:2},{text:20},{text:2},{text:20}]},
							    {id:"11133",label:[{status:true},{name:"美国5-1"},{text:1002},{text:2},{text:11},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
							    {id:"11134",label:[{status:true},{name:"美国6"},{text:1003},{text:9},{text:22},{text:2000},{text:2},{text:20},{text:2},{text:30}]},
							    {id:"11135",label:[{status:true},{name:"美国7-1"},{text:1004},{text:2},{text:20},{text:1000},{text:2},{text:20},{text:2},{text:20}]},
							    {id:"11136",label:[{status:true},{name:"美国8"},{text:1005},{text:2},{text:20},{text:9000},{text:2},{text:20},{text:2},{text:22}]}]
						  }
				];
			
		var data2 = [{id:"1114",label: [{status:true},{name:"美利坚和中国"},{text:100},{text:"我是"},{text:20},{text:1000},
							   {text:902},{text:20},{text:112},{text:20}],
						     sub:[{id:"11141",label:[{status:true},{name:"china china1"},{text:1100},{text:111},{text:222},{text:2000},{text:92},{text:660},{text:72},{text:50}],
								 sub:[{id:"111410",label:[{status:true},{name:"33-22-11"},{text:900},{text:211},{text:10},{text:2000},{text:52},{text:20},{text:12},{text:40}]}]  	
								},
								{id:"11142",label:[{status:true},{name:"china22"},{text:4100},{text:233},{text:720},{text:2000},{text:12},{text:20},{text:32},{text:27}]}]
						  },
						  {id:"1115",label:[{status:true},{name:"中国ssd"},{text:2100},{text:222},{text:20},{text:200},{text:2},{text:20},{text:2},{text:20}],
						   sub:[{id:"11151",label:[{status:true},{name:"中华民国"},{text:2400},{text:21},{text:22},{text:42000},{text:2},{text:20},{text:92},{text:620}]},
								{id:"11152",label:[{status:true},{name:"美国2-1"},{text:200},{text:2222},{text:31},{text:12000},{text:12},{text:20},{text:12},{text:320}]},
							    {id:"11153",label:[{status:true},{name:"美国3"},{text:240},{text:1900},{text:19.5},{text:52000},{text:22},{text:20},{text:52},{text:120}]},
							    {id:"11154",label:[{status:true},{name:"美国4"},{text:2500},{text:200},{text:20.2},{text:62000},{text:2},{text:20},{text:72},{text:50}]}
							   ]
						  },
						  {id:"1116",label:[{status:true},{name:"大比例饿点"},{text:1300},{text:4},{text:10},{text:5000},{text:2},{text:20},{text:332},{text:20}],
						   sub:[{id:"111610",label:[{status:true},{name:"美国3-2"},{text:1000},{text:82},{text:40},{text:2000},{text:2},{text:20},{text:2},{text:20}]},
								{id:"111611",label:[{status:true},{name:"美国4"},{text:1001},{text:233},{text:50},{text:1200},{text:42},{text:20},{text:12},{text:11.2}]},
							    {id:"111612",label:[{status:true},{name:"美国5"},{text:1002},{text:112},{text:20},{text:32000},{text:72},{text:20},{text:92},{text:13.5}]},
							    {id:"111613",label:[{status:true},{name:"美国6"},{text:1003},{text:212},{text:20},{text:42000},{text:2},{text:20},{text:2},{text:40}]},
							    {id:"111614",label:[{status:true},{name:"美国7-3"},{text:1004},{text:52},{text:420},{text:52000},{text:12},{text:20},{text:2},{text:50}]},
							    {id:"111615",label:[{status:true},{name:"美国8-2"},{text:1005},{text:72},{text:40},{text:62000},{text:92},{text:20},{text:2},{text:21.2}]}]
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
				console.log(e.originalEvent.data);
			}).on("STATUS_CHANGE",function(e){
				var evt = e.originalEvent;
				
			}).on("TAB_SHOW CHART_LAYER_INIT",function(e){
				var da = e.originalEvent.data;
				if(e.type == "CHART_LAYER_INIT"){//首次打开图表层
					var chartWidget = new ChartWidget();
					chartWidget.placeAt(da.GD);
					chartWidget.setVisJson(gdata);					
				}else{//切换 tab 时，判断当下是否有图表，有图表，就不需要重绘了
					if(da.GD.children().length==0){
						var chartWidget = new ChartWidget();
						chartWidget.placeAt(da.GD);
						chartWidget.setVisJson(gdata);
					}
				}
			});
		
			//显示 隐藏 头部工具栏
			$("#danger").click(function(){
				bool = !bool;
				tre.toolbar(bool);
			});
			
			//展开收起 树状菜单 
			$("#info").click(function(){
//				bool = !bool;
				tre.fold(false);
			});	
			
			//更新列表数据
			$("#success").click(function(){
				bool = !bool;
				tre.update(bool?data2:data1);
			});
			
        });
    });
});