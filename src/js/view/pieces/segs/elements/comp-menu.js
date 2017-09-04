/***
**@ component
**@ constructor {Class} Menu
**@ super class Combine
**/
define(['static'],function(Static){
	var dom = (function(){
		this.init = function(hwd,arr){
			var lis = "";
			arr.forEach(function(item,index){
				lis +='<li class="btn btn-default '+((index==0)?"active":'')+'">'+item.name+'</li>';
			});
			hwd.html(lis);
		}	
		return this;
	}());
	
	extend(Menu,Combine);//继承自Combine 类
	function Menu(){
		var _this = this;
		var _super = arguments.callee.parent;
		this.init = function(){
			_this._DOM = $("#nxdc-menu");
			dom.init(_this._DOM,Static.MENU_LIST);
			_this._DOM.find("li.btn").click(function(e){
				e.stopImmediatePropagation();
				if(_this._DOM.find("li.active").index()==$(this).index()){
					return false;
				}
				$(this).addClass("active").siblings().removeClass("active");
				dispatch($(this).get(0),"com_li_click",{name:$(this).text(),index:$(this).index()});
			});
		};
	}
	return new Menu();
});