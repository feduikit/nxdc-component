require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/sutable'],function(){
			var bool = false;
			var sum = [{text:2001},{text:2002},{text:2003},{text:2001},{text:2001},{text:2001},{text:2001},{text:2001},{text:2001},{text:2001}];
var data1 = [{
		id:1001,
		label: [{
				name: "中华人民共和国",
			}, {
				text: "运行中",
				value:0//0 y运行中，1暂停，2审核未通过
			}, {
				text:"9000"
			}, {
				text: "10-1"
			}, {
				text: "2000-1"
			},
			{
				text: "1100"
			}, {
				text: "4000"
			}, {
				text: "987"
			}, {
				text: "601"
			},{
				text:"107",
			},{
				text:"222",
			},{
				text:1100,
			},{
				status: false
			}],
			hasChild:true
		  },
	{
		id:1002,
		label: [{
			name: "美国",
		}, {
			text: "审核未通过",
			value:2,//0 y运行中，1暂停，2审核未通过
			reason:"活动已经被对方暂停"
		}, {
			text: 2
		}, {
			text: 20
		}, {
			text: 2000
		}, {
			text: 2
		}, {
			text: 20
		}, {
			text: 2
		}, {
			text: 20
		},{
			text:100,
		},{
			text:200,
		},{
			text:1100,
		},{
			status: true
		}],
		hasChild:true
	},
	{
		id:1003,
		label: [{
			name: "美国",
		}, {
			text: "运行中",
			value:0//0 y运行中，1暂停，2审核未通过
		}, {
			text: 2
		}, {
			text: 20
		}, {
			text: 2000
		}, {
			text: 2
		}, {
			text: 20
		}, {
			text: 2
		}, {
			text: 20
		},{
			text:100,
		},{
			text:200,
		},{
			text:1100,
		},{
			status: true
		}],
		hasChild:true
	}
];	
			
var data2 = [{
		id:2001,
		label: [{
				name: "好23 中国网站 在看法",
			}, {
				text: "运行中",
				value:0//0 y运行中，1暂停，2审核未通过
			}, {
				text:"9000"
			}, {
				text: "2101"
			}, {
				text: "2000"
			},
			{
				text: "21100"
			}, {
				text: "34000"
			}, {
				text: "4987"
			}, {
				text: "601"
			},{
				text:"107",
			},{
				text:"222",
			},{
				text:1100,
			},{
				status: false
			}],
			hasChild:true
		  },
	{
		id:2002,
		label: [{
			name: "1 好23 中国网站 在看法",
		}, {
			text: "审核未通过",
			value:2,//0 y运行中，1暂停，2审核未通过
			reason:"活动已经被对方暂停"
		}, {
			text: 62
		}, {
			text: 620
		}, {
			text: 62000
		}, {
			text: 62
		}, {
			text: 620
		}, {
			text: 2
		}, {
			text: 20
		},{
			text:100,
		},{
			text:6200,
		},{
			text:6100,
		},{
			status: true
		}],
		hasChild:true
	},
	{
		id:2003,
		label: [{
			name: "2好23 中国网站 在看法",
		}, {
			text: "运行中",
			value:0//0 y运行中，1暂停，2审核未通过
		}, {
			text: 3
		}, {
			text: 120
		}, {
			text: 22000
		}, {
			text: 12
		}, {
			text: 120
		}, {
			text: 12
		}, {
			text: 20
		},{
			text:100,
		},{
			text:200,
		},{
			text:1100,
		},{
			status: true
		}],
		hasChild:true
	}
];			
			
			
			var hwd = $(".ndp-sutable-wrapper").sutable({
				head:[{label:"广告活动"},{label:"状态",desc:"这一列用来说明处于什么状态"},
					  {label:"展示数",desc:"这一列用来说明展示的数目"},
					  {label:"点击数",desc:"这一列用来说明展示的数目"},
					  {label:"点击率",desc:"这一列用来说明展示的数目"},
					  {label:"转化数",desc:"这一列用来说明展示的数目"},
					  {label:"转化率",desc:"这一列用来说明展示的数目"},
					  {label:"CPC",desc:"这一列用来说明展示的数目"},
					  {label:"CPM",desc:"这一列用来说明展示的数目"},
					  {label:"CPA",desc:"这一列用来说明展示的数目"},
					  {label:"花费",desc:"这一列用来说明展示的数目"}
					  ,{label:"赢价率",desc:"这一列用来说明展示的赢价率"},
					  {label:"开启/暂停",desc:"这一列用来说明展示的赢价率"},
					  {label:"操作",desc:"这一列是用户用来操作的项目"}
					 ],				
				body:data1,
				tail:[{text:1000},{text:1000},{text:1000},{text:1000},{text:1000},{text:1000},{text:1000},{text:1000},{text:1000},{text:1000}],
				sort:[3,5,7,9]// 第4列，6列，8页  10页显示 排序按钮  默认从0开始
			}).on("SORT_CLICK",function(e){//用户点击排序按钮
				//返回数据，包含，第几列，默认0； 列名
				console.log(e.originalEvent.data);//{col: 3, val: "点击数"}
			}).on("OPERATE_ACTION",function(e){//点击，编辑按钮，拷贝按钮，点击广告活动名称，点击新增
				var dat = e.originalEvent.data;
				switch(dat.action){
					case "edit"://用户点击编辑按钮 	 
						console.log(dat.id);//dat.id所在行的 数据id
						break;
					case "copy"://用户点击copy按钮  
						console.log(dat.id);//所在行的 数据id					
						break;
					case "name"://用户点击广告活动名称 按钮 
						console.log(dat.id);//所在行的 数据id	
						break;
					case "addnew":
						console.log(dat.preid+" : " + dat.type);//preid上一行数据的id, type: 0(新增广告组)1(新增广告) >2(未知)
						break;
					case "switch":// 点击 "开启/暂停" 列的 switch 按钮
						console.log("状态:" + dat.value + " : id:" + dat.id);// value 0 关闭，1开启， id：所在行的数据id
//                        setTimeout(function(){
//                            console.log("发现错误，状态回到上一步");
//                            hwd.switchBack(dat.hwd);
//                        },2000);
						break;
					case "nextlayer"://点击加好 + 按钮，加载下一级数据
						console.log("deep(深度层次):" + dat.deep + " : 上一级数据id" + dat.id + " : DOM fa(上一级DOM 节点) "+  dat.fa);// value 0 关闭，1开启， id：所在行的数据id
						break;
				}
			});
			
			
			$("#update").click(function(){
				bool = !bool;
				hwd.update((bool?data2:data1));
			});
			
			
			$("#updatesum").click(function(){
				//[{text:2001},{text:2002},{text:2003}]
				hwd.sum(sum);
			});	
            
            $("#ajax").click(function(){   
                hwd.updateAjaxOption({
                     url: "../data/sutable2.json"
                });
			});	        
            
			
        });
    });
});