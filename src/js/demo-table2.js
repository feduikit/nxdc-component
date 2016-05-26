require(['./config'],function(){
    require(['jquery','./Compatibility/keys','utils'],function($){
        require(['bootstrap','./components/table2'],function(){
            var bool = false;
			var data1 = [{id:1101,name:"CHINA ROC",info:"USA AMERICA",gender:"JING DU"},
                         {id:1102,name:"日本",info:"hello - japan 34",gender:"MAN"},
                         {id:1103,name:"hello 1",info:"hello - euro 33",gender:"no sign"},
						 {id:1104,name:"hello 2",info:"hello - euro 41",gender:"sign"},
						 {id:1105,name:"hello world",info:"hello - china 53",gender:"no sign"}];			
			
			
            var data2 = [{id:1101,name:"中国",info:"加勒比还到过",gender:"超人大战"},
                         {id:1102,name:"日本",info:"hello - japan 34",gender:"woman"},
                         {id:1103,name:"hello_34",info:"hello - euro 23",gender:"no sign"},
						 {id:1104,name:"hello_99",info:"hello - euro 11",gender:"sign"},
						 {id:1105,name:"hello_134",info:"hello - china 23",gender:"no sign"}];
            var  data3 = [
                          {
                            "cpm": 0.9009,
                            "conversion": 333,
                            "cpc": 0.00045045,
                            "impression": 111,
                            "cpa": 0.0003003,
                            "cvr": 1.5,
                            "bid_success_rate": 0.3333,
                            "click": 222,
                            "date": "2016-04-20",
                            "cost": 0.1,
                            "ctr": 2
                          },
                          {
                            "cpm": 0.9009,
                            "conversion": 333,
                            "cpc": 0.00045045,
                            "impression": 111,
                            "cpa": 0.0003003,
                            "cvr": 1.5,
                            "bid_success_rate": 0.3333,
                            "click": 222,
                            "date": "2016-04-20",
                            "cost": 0.1,
                            "ctr": 2
                          },
                          {
                            "cpm": 0.9009,
                            "conversion": 333,
                            "cpc": 0.00045045,
                            "impression": 111,
                            "cpa": 0.0003003,
                            "cvr": 1.5,
                            "bid_success_rate": 0.3333,
                            "click": 222,
                            "date": "2016-04-20",
                            "cost": 0.1,
                            "ctr": 2
                          },
                          {
                            "cpm": 0.9009,
                            "conversion": 333,
                            "cpc": 0.00045045,
                            "impression": 111,
                            "cpa": 0.0003003,
                            "cvr": 1.5,
                            "bid_success_rate": 0.3333,
                            "click": 222,
                            "date": "2016-04-20",
                            "cost": 0.1,
                            "ctr": 2
                          }
                ];
            
            $(".ndp-table2-wrapper").table2({
                head:["cpm","conversion","cpc","impression","cpa","cvr","bid_success_rate","click","date","cost","ctr"],
                data:data3,
                rowNail:true,
                activeRow:0,
                colNail:true,
                activeCol:1,
                sort:[1,3,5]
            });
			 			
        });
    });
});
