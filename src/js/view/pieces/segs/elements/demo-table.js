define(function(){
	function Demo() {
	var bool = false;
	var data1 = [{id:1101,name:"CHINA ROC",info:"USA AMERICA",gender:"JING DU"},
				 {id:1102,name:"日本",info:"hello - japan 34",gender:"MAN"},
				 {id:1103,name:"hello_1",info:"hello - euro 33",gender:"no sign"},
				 {id:1104,name:"hello_2",info:"hello - euro 41",gender:"sign"},
				 {id:1105,name:"hello_3",info:"hello - china 53",gender:"no sign"}];			


	var data2 = [{id:1101,name:"中国",info:"加勒比还到过",gender:"超人大战"},
				 {id:1102,name:"日本",info:"hello - japan 34",gender:"woman"},
				 {id:1103,name:"hello_34",info:"hello - euro 23",gender:"no sign"},
				 {id:1104,name:"hello_99",info:"hello - euro 11",gender:"sign"},
				 {id:1105,name:"hello_134",info:"hello - china 23",gender:"no sign"}];		

		
		
		
		$(".ndp-table-wrapper[name='plain-table']").table({
		head:{col1:"第一列",col2:"第二列",col3:"第三列",col4:"第四列"},
		data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man"},
			  {id:1102,name:"hello_23",info:"hello - japan 34",gender:"woman"},
			  {id:1103,name:"hello_34",info:"hello - euro 23",gender:"no sign"}]	
		});
		$(".ndp-table-wrapper[name='plain']").empty().table({
		head:{col1:"第一列",col2:"第二列",col3:"第三列",col4:"第四列"},
		data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man"},
			  {id:1102,name:"hello_23",info:"hello - japan 34",gender:"woman"},
			  {id:1103,name:"hello_34",info:"hello - euro 23",gender:"no sign"}]	
		});		
		
		$(".ndp-table-wrapper[name='solid-row-table']").table({
			head:["第一列","第二列","第三列","第四列"],
			data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man"},
				  {id:1102,name:"hello_23",info:"hello - japan 34",gender:"woman"},
				  {id:1103,name:"hello_34",info:"hello - euro 23",gender:"no sign"}],
			rowNail:true,//允许选中行
			activeRow:1//默认选中的行索引，base 0
		}).on("ROW_CLICK",function(e){//行被点击
				console.log(e.originalEvent.data);// {row：第几行 int}//第几行
		});
		
		$(".ndp-table-wrapper[name='solid-col-table']").table({
			head:["第一列","第二列","第三列","第四列"],
			data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man"},
				  {id:1102,name:"hello_23",info:"hello - japan 34",gender:"woman"},
				  {id:1103,name:"hello_34",info:"hello - euro 23",gender:"no sign"}],
			colNail:true,//允许选中列
			activeCol:1//默认选中的列索引，base 0
		}).on("COL_CLICK",function(e){//列被点击
			console.log(e.originalEvent.data); //{col:第几列 int ,name: 列名 string}
		});
		
		
		$(".ndp-table-wrapper[name='solid-h-table']").table({
			head:{col1:"第一列",col2:"第二列",col3:"第三列",col4:"第四列"},
			data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man"},
			{id:1102,name:"hello_23",info:"hello - japan 34",gender:"woman"},
			{id:1103,name:"hello_34",info:"hello - euro 23",gender:"no sign"},
			{id:1104,name:"hello_35",info:"hello - japn",gender:"no sign"},
			{id:1105,name:"hello_36",info:"hello - usa 23",gender:"woman"},
			{id:1106,name:"hello_37",info:"hello - usa 23",gender:"man"},
			{id:1106,name:"hello_38",info:"hello - usa 23",gender:"man"}
			],
			listHeight:"250px"
		});	
		
		$(".ndp-table-wrapper[name='solid-sort-table']").table({
			head:{col1:"第一列",col2:"第二列",col3:"第三列",col4:"第四列",col5:"第五列"},
			data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man",nation:"USA"},
			{id:1102,name:"dllo_23",info:"clo - japan 34",gender:"woman",nation:"CANADA"},
			{id:1103,name:"hello_34",info:"allo - euro 23",gender:"no sign",nation:"USA"},
			{id:1104,name:"alo_35",info:"blo - japn",gender:"no sign",nation:"Japan"},
			{id:1105,name:"bllo_36",info:"Alo - usa 23",gender:"woman",nation:"USA"},
			{id:1106,name:"clo_37",info:"Do - usa 23",gender:"man",nation:"china"},
			{id:1107,name:"hello_38",info:"dllo - usa 23",gender:"man",nation:"USA"}
			],								
			sort:[1,3,4]//按照第一列，第三列，第四列排序，这三列会出现排序按钮，全部排序 sort:"All"
		}).on("SORT_CHANGE",function(e){
				//用户点击排序
			console.log(e.originalEvent.data);//{col:第几列（from 0）int， name:列名 字符串}
		});
		
		$(".ndp-table-wrapper[name='solid-split-table']").table({
			head:{col1:"第一列",col2:"第二列",col3:"第三列",col4:"第四列",col5:"第五列"},
			data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man",nation:"USA"},
			{id:1102,name:"dllo_23",info:"clo - japan 34",gender:"woman",nation:"USA"},
			{id:1103,name:"hello_34",info:"allo - euro 23",gender:"no sign",nation:"USA"},
			{id:1104,name:"alo_35",info:"blo - japn",gender:"no sign",nation:"USA"},
			{id:1105,name:"bllo_36",info:"Alo - usa 23",gender:"woman",nation:"USA"},
			{id:1106,name:"clo_37",info:"Do - usa 23",gender:"man",nation:"USA"},
			{id:1107,name:"hello_38",info:"dllo - usa 23",gender:"man",nation:"USA"}
			],
			colClass:"ndp-table-col-split"
		}); 
		
		var tb = $(".ndp-table-wrapper[name='update']").table({
			head:{col1:"第一列",col2:"第二列",col3:"第三列",col4:"第四列"},
			data:[{id:1101,name:"hello123",info:"hello -china 123",gender:"man"},
			{id:1102,name:"dllo_23",info:"clo - japan 34",gender:"woman"},
			{id:1103,name:"hello_34",info:"allo - euro 23",gender:"no sign"},
			{id:1104,name:"alo_35",info:"blo - japn",gender:"no sign"},
			{id:1105,name:"bllo_36",info:"Alo - usa 23",gender:"woman"},
			{id:1106,name:"clo_37",info:"Do - usa 23",gender:"man"},
			{id:1107,name:"hello_38",info:"dllo - usa 23",gender:"man"}
			]
		}); 
		
		
		$("button#btn-update").click(function(){
			bool = !bool;
			tb.update(bool?data1:data2);
		});		
		
	}
	return Demo;
});