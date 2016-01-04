require(['./config'],function(){
    require(['jquery','./Compatibility/keys','utils'],function($){
        require(['bootstrap','./components/table'],function(){
            $(".ndp-js-example1 .ndp-table-wrapper").table({
                head:{col1:"第一列",col2:"第二列",col3:"第三列",col4:"第四列"},//["Offer ID","col 2","COl 3","Col 4"]
                data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man"},
                      {id:1102,name:"hello_23",info:"hello - japan 34",gender:"woman"},
                      {id:1103,name:"hello_34",info:"hello - euro 23",gender:"no sign"}]
            });
            
            $(".ndp-js-example2 .ndp-table-wrapper").table({
                head:{col1:"第一列",col2:"第二列",col3:"第三列",col4:"第四列"},//["Offer ID","col 2","COl 3","Col 4"]
                data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man"},
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
