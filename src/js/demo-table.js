require(['./config'],function(){
    require(['jquery','./Compatibility/keys','utils'],function($){
        require(['bootstrap','./components/table'],function(){
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
			
			var tb = $(".ndp-js-example1 .ndp-table-wrapper").table({
                head:["cpm","conversion","cpc","impression","cpa","cvr","bid_success_rate","click","date","cost","ctr"],//["Offer ID","col 2","COl 3","Col 4"]
                data:data3
            }).on("ROW_CLICK",function(e){//行被点击
				console.log(e.originalEvent.data);// {row：第几行 int}//第几行
			});
			
			$("button#up").click(function(){
				bool= !bool;
				tb.update(bool?data1:data2);
			});
            
            $(".ndp-js-example2 .ndp-table-wrapper").table({
                head:{col1:"产品编号",col2:"名称2",col3:"图片",col4:"目标网页",col5:"品牌"
                            ,col6:"价格",col7:"可用性",col8:"这是什么啊"},//["Offer ID","col 2","COl 3","Col 4"]
                data:[{id:1101,name:"hello123",info:"hello china 123",gender:"man"},
                      {id:1102,name:"hello_23",info:"hello - japan 34",gender:"woman"},
                      {id:1103,name:"hello_34",info:"hello - euro 23",gender:"no sign"}],
                rowNail:true,//允许选中行
                activeRow:1//默认选中的行索引，base 0
            });
            
            $(".ndp-js-example3 .ndp-table-wrapper").table({
                head:{col1:"第一列",col2:"第二列",col3:"第三列",col4:"第四列"},//["Offer ID","col 2","COl 3","Col 4"]
                data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man"},
                      {id:1102,name:"hello_23",info:"hello - japan 34",gender:"woman"},
                      {id:1103,name:"hello_34",info:"hello - euro 23",gender:"no sign"}],
                colNail:true,//允许选中行
                activeCol:1//默认选中的行索引，base 0
            }).on("COL_CLICK",function(e){//列被点击
				console.log(e.originalEvent.data); //{col:第几列 int }
			});
			
            $(".ndp-js-example4 .ndp-table-wrapper").table({
                head:{col1:"第一列",col2:"第二列",col3:"第三列",col4:"第四列"},
                data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man"},
                      {id:1102,name:"hello_23",info:"hello - japan 34",gender:"woman"},
                      {id:1103,name:"hello_34",info:"hello - euro 23",gender:"no sign"},
					 {id:1104,name:"hello_35",info:"hello - japn",gender:"no sign"},
					 {id:1105,name:"hello_36",info:"hello - usa 23",gender:"woman"},
					 {id:1106,name:"hello_37",info:"hello - usa 23",gender:"man"},
					 {id:1106,name:"hello_38",info:"hello - usa 23",gender:"man"}],
				listHeight:"250px"
            });
	
            $(".ndp-js-example5 .ndp-table-wrapper").table({
               head:{col1:"第一列是第一列啊2234999",col2:"第二列中国是个什么样的列你想过吗去请求",col3:"第三列china123999皮亚宁爱我999",col4:"第四列则么了我就是我啊你想死吗",col5:"第五列怎样我就是第五列"},
               data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man",nation:"USA"},
                      {id:1102,name:"dllo_23",info:"clo - japan 34",gender:"woman",nation:"USA"},
                      {id:1103,name:"hello_34",info:"allo - euro 23",gender:"no sign",nation:"USA"},
					 {id:1104,name:"alo_35",info:"blo - japn",gender:"no sign",nation:"USA"},
					 {id:1105,name:"bllo_36",info:"Alo - usa 23",gender:"woman",nation:"USA"},
					 {id:1106,name:"clo_37",info:"Do - usa 23",gender:"man",nation:"USA"},
					 {id:1107,name:"hello_38",info:"dllo - usa 23",gender:"man",nation:"USA"}],					sort:[1,3,4]
            }).on("SORT_CHANGE",function(e){
				//用户点击排序
				console.log(e.originalEvent.data);//{col:第几列（from 0  int）， name:列名 字符串}
			});  
			
            $(".ndp-js-example6.ndp-table-wrapper").table({
               head:{col1:"第一列",col2:"第二列",col3:"第三列",col4:"第四列",col5:"第五列"},
               data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man",nation:"USA"},
                      {id:1102,name:"dllo_23",info:"clo - japan 34",gender:"woman",nation:"USA"},
                      {id:1103,name:"hello_34",info:"allo - euro 23",gender:"no sign",nation:"USA"},
					 {id:1104,name:"alo_35",info:"blo - japn",gender:"no sign",nation:"USA"},
					 {id:1105,name:"bllo_36",info:"Alo - usa 23",gender:"woman",nation:"USA"},
					 {id:1106,name:"clo_37",info:"Do - usa 23",gender:"man",nation:"USA"},
					 {id:1107,name:"hello_38",info:"dllo - usa 23",gender:"man",nation:"USA"}],						  			colClass:"ndp-table-col-split"
            });  			
        });
    });
});
