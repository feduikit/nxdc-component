require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/tabs'],function(){
			$("div.ndp-tab-wrapper[name=plain-tab]").tabs({
				list:["hello","world","china","hello11111"]
			}).on("TAB_CHANGE",function(e){
				console.log(e.originalEvent.data);//{index: 第几个tab(默认从0开始) int,name:tab名称 string}
			}).val(2);
			
			$("div.ndp-tab-wrapper[name=badge-tab]").tabs({
				default:1,
				list:[{text:"China",badge:20},{text:"USA",badge:999},{text:"CANADA",badge:10}],
				badge:true
			}).on("TAB_CHANGE",function(e){
				console.log(e.originalEvent.data);//
			});	
			
			$("div.ndp-tab-wrapper[name=rm-tab]").tabs({
				list:[{text:"China",badge:20},{text:"USA",badge:999},{text:"CANADA",badge:10}],
				badge:false,
				rm:true
			}).on("TAB_CHANGE",function(e){
				console.log(e.originalEvent.data);//
			}).on("TAB_REMOVED",function(e){
				console.log(e.originalEvent.data);//{rm: 删除的数据, active: 当前选中数据, current: 选中的索引}
			});	
			
			$("div.ndp-tab-wrapper[name=hide-tab]").tabs({
				list:[{text:"中华人民共和国",badge:20},
					  {text:"美利坚和中国",badge:999},
					  {text:"日本",badge:10},
					 {text:"德国",badge:10},
					 {text:"韩国",badge:10},
					 {text:"泰国",badge:10}],
				badge:false,
				rm:true,
			});					
        });
    });
});