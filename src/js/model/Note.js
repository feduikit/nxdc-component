/**
** 消息体类
**@constructor {Class} Note
** singleton  单例
**/
define(function(){
	function Note(){
		var CONST = arguments.callee;
		if(CONST._instance) return CONST._instance;	
		CONST.INIT = "init";
		CONST.STATIC_HTML    = "STATIC_HTML";//静态html 数据
		CONST.PLAIN_JSON     = "PLAIN_JSON";//普通 json数据
		CONST.PLAIN_XML      = "PLAIN_XML";//普通的 xml 数据
		CONST.PLAIN_STRING      = "PLAIN_STRING";//普通的 xml 数据
		this.notification = {
			name: CONST.INIT,
			data:{}
		}
		
		CONST._instance = this;
	}
	return new Note;
});