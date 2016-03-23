;(function(win){
    /**
    ** 派发自定义事件
    ** 使用 es6 的 发送事件方法
    **/
    win.fireEvent = function(ta,type,data,bub){
		ta = ta || document;
		var evt = new Event(type,{bubbles:bub||true});
		evt.data = data || {name:"unknow"};
		ta.dispatchEvent(evt);
    }
	
}(window));