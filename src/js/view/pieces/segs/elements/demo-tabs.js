define(function(){
	function Demo(){
		$("div.ndp-tab-wrapper[name=plain-tab]").tabs({
			list:["hello","world","china"]
		}).on("TAB_CHANGE",function(e){//点击其中的一个tab发生事件
			console.log(e.originalEvent.data);//{index: 第几个tab(默认从0开始) int,name:tab名称 string}
		}).val(1);//设置选中的tab 索引，默认0

		$("div.ndp-tab-wrapper[name=badge-tab]").tabs({
			list:[{text:"China",badge:20},{text:"USA",badge:999},{text:"CANADA",badge:10}],
			badge:true//是否显示小圆点数据
		});

		$("div.ndp-tab-wrapper[name=rm-tab]").tabs({
			list:[{text:"China",badge:20},{text:"USA",badge:999},{text:"CANADA",badge:10}],
			badge:false,
			rm:true//是否在tab上显示删除X按钮
		}).on("TAB_CHANGE",function(e){//点击tab发生事件
			console.log(e.originalEvent.data);//{index: 第几个tab(默认从0开始) int,name:tab名称 string}
		}).on("TAB_REMOVED",function(e){//点击x 删除事件
			console.log(e.originalEvent.data);//{rm: 删除的数据, active: 当前选中数据, current: 选中的索引}
		});
		
		$("div.ndp-tab-wrapper[name=more-tab]").tabs({
			list:[{text:"中华人民共和国",badge:20},
				  {text:"美利坚和中国",badge:999},
				  {text:"日本",badge:10},
				 {text:"德国",badge:10},
				 {text:"韩国",badge:10},
				 {text:"泰国",badge:10}],
			type:2
		});			
	}
	return Demo;
});