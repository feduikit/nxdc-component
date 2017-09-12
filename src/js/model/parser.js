define(function(){
	var Process = (function(){
		var Static = arguments.callee;
		/**
		** 处理 返回数据 是html格式
		**@param {Html} html
		**/
		Static.html = function(html){
			dispatch(document,"NEW_MSG",{name:"STATIC_HTML",data:html});
		};
		/**
		** 处理 返回数据 是json格式
		**@param {JSON} json
		**/
		Static.json = function(json){};
		/**
		** 处理 返回数据 是普通字符串
		**@param {String} str
		**/
		Static.plain = function(str){};
		/**
		** 处理 返回数据 是xml格式
		**@param {XML} xml
		**/		
		Static.xml = function(xml){}
		return Static;
	}());
	/**
	**@Constructor {Class} Deal
	**@
	**/
	function Deal(){
		var RE_JSON = /^\{(.+:.+,*){1,}\}$/i;
		var RE_HTML = /^<.+?>[^>]+>$/i;
		/**
		**deal response
		**
		**/
		this.result = function(dat){
			if(typeof(dat)=="string"){//判断返回的是 html或者xml
				if(RE_HTML.test(dat)||/^<.+/i.test(dat.trim())){
					Process.html(dat);
				}else if(RE_JSON.test(dat.trim())){//返回的是json字符串
					Process.json(JSON.parse(dat));
				}else{//普通字符串
					Process.plain(dat);
				}				
			}else{// Object
				Process.json(dat);
			}
		};
		
		/**
		**
		**/
		this.err = function(){
			console.log(arguments[0]);
		}
	}
	return new Deal;
});