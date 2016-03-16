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
		var  rec = 
   [
        {
            "audienceSize": 738077300,
            "id": "6003384248805",
            "name": "健身与养生",
            "son": [
                {
                    "audienceSize": 144493100,
                    "id": "6003012185129",
                    "name": "静坐",
                    "parentName": "健身与养生",
					"search":true //需要search
                },
                {
                    "audienceSize": 299806520,
                    "id": "6003277229371",
                    "name": "体育健身",
                    "parentName": "健身与养生",
					"parent":"健身与养生"
                },
                {
                    "audienceSize": 210209820,
                    "id": "6003306084421",
                    "name": "瑜伽",
                    "parentName": "健身与养生",
					"parent":"健身与养生"
                },
                {
                    "audienceSize": 245450140,
                    "id": "6003324917336",
                    "name": "营养品",
                    "parentName": "健身与养生",
					"parent":"健身与养生"
                },
                {
                    "audienceSize": 179399832,
                    "id": "6003327856180",
                    "name": "节食",
                    "parentName": "健身与养生",
					"parent":"健身与养生"
                },
                {
                    "audienceSize": 217007780,
                    "id": "6003355530237",
                    "name": "健身房",
                    "parentName": "健身与养生",
					"parent":"健身与养生"
                },
                {
                    "audienceSize": 120257270,
                    "id": "6003369521274",
                    "name": "尊巴",
                    "parentName": "健身与养生",
					"parent":"健身与养生"
                },
                {
                    "audienceSize": 199181471,
                    "id": "6003397496347",
                    "name": "跑步",
                    "parentName": "健身与养生",
					"parent":"健身与养生"
                },
                {
                    "audienceSize": 144426338,
                    "id": "6003473077165",
                    "name": "负重训练",
                    "parentName": "健身与养生",
					"parent":"健身与养生"
                },
                {
                    "audienceSize": 129902840,
                    "id": "6003648059946",
                    "name": "健身",
                    "parentName": "健身与养生",
					"parent":"健身与养生"
                },
                {
                    "audienceSize": 290044510,
                    "id": "6004115167424",
                    "name": "体育运动",
                    "parentName": "健身与养生",
					"parent":"健身与养生"
                }
            ]
        },
        {
            "audienceSize": 1199110730,
            "id": "6008803895164",
            "name": "运动和户外活动",
            "son": [
                {
                    "audienceSize": 1187755320,
                    "id": "6003269553527",
                    "name": "运动",
                    "parentName": "运动和户外活动",
                    "son": [
                        {
                            "audienceSize": 192132040,
                            "id": "6002929380259",
                            "name": "排球",
                            "parentName": "运动",
							"parent":"运动和户外活动>运动"
                        }
                    ]
                }
			]
		},
        {"audienceSize": 1199110731,
            "id": "6008803895166",
            "name": "个人情况",
            "son": [
                {
                    "audienceSize": 1187755321,
                    "id": "6003269553528",
                    "name": "教育程度",
                    "parentName": "个人情况",
                    "son": [
                        {
                            "audienceSize": 192132041,
                            "id": "6002929380249",
                            "name": "大学本科",
                            "parentName": "教育程度",
							"parent":"个人情况>教育程度"
                        },{
                            "audienceSize": 192132043,
                            "id": "6002929380251",
                            "name": "博士",
                            "parentName": "教育程度",
							"parent":"个人情况>教育程度"
                        },{
                            "audienceSize": 192132044,
                            "id": "6002929380252",
                            "name": "硕士",
                            "parentName": "教育程度",
							"parent":"个人情况>教育程度"
                        }
                    ]
                }
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
						{path:["个人情况","学历","教育程度"],
						 type:"education_statuses",
						 tags:[{name:"硕士学位",id:"11",audience_size: 10000},
							   {name:"本科学历",id:22,audience_size: 10032},
							   {name:"教育学硕士",id:33,audience_size: 21000}]
						 },
						 {path:["兴趣", "健身养生"],
						  type:"interests",
						  tags:[{name:"健身房",id:1,audience_size: 10000},
								{name:"跑步",id:2,audience_size: 10000},
								{name:"登山",id:3,audience_size: 10000},
								{name:"马拉松",id:4,audience_size: 10000},
								{name:"铅球",id:5,audience_size: 10000},
								{name:"羽毛球",id:6,audience_size: 10000},
								{name:"素食主义者",id:7,audience_size: 10000},
								{name:"环保主义者",id:8,audience_size: 10000}
							   ]
						 },
						 {path:["个人情况", "学历","大学就读年份"],
					      type:"education_statuses",// 时间范围选择
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