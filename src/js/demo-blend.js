require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','blend'],function(){	
			var rec = 
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
                    "parentName": "健身与养生"
                },
                {
                    "audienceSize": 299806520,
                    "id": "6003277229371",
                    "name": "体育健身",
                    "parentName": "健身与养生"
                },
                {
                    "audienceSize": 210209820,
                    "id": "6003306084421",
                    "name": "瑜伽",
                    "parentName": "健身与养生"
                },
                {
                    "audienceSize": 245450140,
                    "id": "6003324917336",
                    "name": "营养品",
                    "parentName": "健身与养生"
                },
                {
                    "audienceSize": 179399832,
                    "id": "6003327856180",
                    "name": "节食",
                    "parentName": "健身与养生"
                },
                {
                    "audienceSize": 217007780,
                    "id": "6003355530237",
                    "name": "健身房",
                    "parentName": "健身与养生"
                },
                {
                    "audienceSize": 120257270,
                    "id": "6003369521274",
                    "name": "尊巴",
                    "parentName": "健身与养生"
                },
                {
                    "audienceSize": 199181471,
                    "id": "6003397496347",
                    "name": "跑步",
                    "parentName": "健身与养生"
                },
                {
                    "audienceSize": 144426338,
                    "id": "6003473077165",
                    "name": "负重训练",
                    "parentName": "健身与养生"
                },
                {
                    "audienceSize": 129902840,
                    "id": "6003648059946",
                    "name": "健身",
                    "parentName": "健身与养生"
                },
                {
                    "audienceSize": 290044510,
                    "id": "6004115167424",
                    "name": "体育运动",
                    "parentName": "健身与养生"
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
                            "parentName": "运动"
                        }
                    ]
                }
			]
		}
	];
			
			
			$(".ndp-blend-wrapper").blend({
				recdata:rec
			});
        });
    });
});