require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','blend'],function(){	
			var rec = [{name:"FATHER ONE",audienceSize:"67881111",id:1,type:"s1",value:"a",
					   sub:[
					  	{name:"1-1",audienceSize:"876567111",id:2,type:"s1",value:"a1",
						 sub:[
							{name:"1-1-1ewrewrewrewrwe",audienceSize:"111",id:3,type:"s1",value:"a2"},
							{name:"1-1-2",audienceSize:"11111",id:4,type:"s1",value:"a3",},
							{name:"1-1-3",audienceSize:"3111",id:5,type:"s1",value:"a4"}
						]},
						{name:"1-2",audienceSize:"11111",id:6,type:"s2",value:"b1",
						 sub:[
							{name:"1-2-1",audienceSize:"34111",id:7,type:"s2",value:"b2",
							 sub:[{name:"1-2-1-1",audienceSize:"11111",id:8,type:"s2",value:"b3"}]},
							{name:"1-2-2",audienceSize:"11111",id:9,type:"s2",value:"b1"},
							{name:"1-2-3",audienceSize:"11111",id:10,type:"s2",value:"b1"}							
						]},
						{name:"学校",audienceSize:"11111",id:11,search:true,type:"s2",value:"b3"}
					 ]},
					  {name:"father two",audienceSize:"1611",id:12,type:"s2",value:"b1",
					   sub:[
							{name:"3-1-1",audienceSize:"11111",id:13,type:"s2",value:"b1"},
							{name:"3-1-2",audienceSize:"11111",id:14,type:"s2",value:"b1"},
							{name:"3-1-3",audienceSize:"11111",id:15,type:"s2",value:"b1"}							  
					  ]},
					  {name:"hello 1",audienceSize:"811111",id:16,type:"s2",value:"b1"},
					  {name:"hello3",audienceSize:"11111",id:17,type:"s2",value:"b1",
					   sub:[
							{name:"5-2-1",audienceSize:"7811111",id:12,type:"s2",value:"b1"},
							{name:"5-2-2",audienceSize:"3211111",id:12,type:"s2",value:"b1"},
							{name:"5-2-3",audienceSize:"11111",id:12,type:"s2",value:"b1"}							  
					  ]
					  }
				];
			
			
			$(".ndp-blend-wrapper").blend({
				ajaxOptions: {
					type: "GET",
					url: "../data/blend.json",
					xhrFields: { withCredentials: true}
				},				
				recdata:rec,//推荐下拉菜单数据，点击手型
				seldata:[
						{bread:["个人情况","学历","教育程度"],
						 type:1,
						  tags:[{name:"硕士学位",id:11},{name:"本科学历",id:22},{name:"教育学硕士",id:33}]
						 },
						 {bread:["兴趣", "健身养生"],
						  type:2,
						  tags:[{text:"健身房",id:1},{text:"跑步",id:2},{text:"登山",id:3},
								{text:"马拉松",id:4},{text:"铅球",id:5},{text:"羽毛球",id:6},
								{text:"素食主义者",id:7},{text:"环保主义者",id:8}]
						 },
						 {bread:["个人情况", "学历","大学就读年份"],
					      type:3,// 时间范围选择
						  start:2016,
						  end:2020
						 }
						]
			}).on("TAG_RESIGN",function(e){// 点击tag前面的x 删除一个tag
				console.log(e.originalEvent.data); //删除的数据
			}).on("SERIAL_RESIGN",function(e){//删除一行
				console.log(e.originalEvent.data); //删除的数据
			}).on("ITEM_CLICK",function(e){//下拉列表里 点击一行的数据
				console.log(e.originalEvent.data);
			});
        });
    });
});