require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/tabs'],function(){
			$("div.ndp-tab-wrapper[name=plain-tab]").tabs({
				list:["hello","world","china"]
			});
			
			$("div.ndp-tab-wrapper[name=badge-tab]").tabs({
				list:[{text:"China",badge:20},{text:"USA",badge:999},{text:"CANADA",badge:10}],
				badge:true
			});	
			
			$("div.ndp-tab-wrapper[name=rm-tab]").tabs({
				list:[{text:"China",badge:20},{text:"USA",badge:999},{text:"CANADA",badge:10}],
				badge:false,
				rm:true
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
				type:2
			});					
        });
    });
});