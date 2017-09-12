define(['./elements/comb-tab'],function(tab){
	extend(ShowCase,Segment);
	function ShowCase(){
		var _this = this;
		var _super = arguments.callee.parent;
		this.init = function(){
			_this._DOM = $("div[data-segment='showcase']");//这个类 控制的DOM 区域
			_this.children = [tab];
			_super.init.call(_this);
		};
		
		this.update = function(msg){
			tab.update(msg);
		};
		
	};
	return new ShowCase();
});