/***
**@Segment
**Segment 由一个或多个 Comnine 或 component 或两者的组合 构成
**/
define(['./elements/comp-menu'],function(menu){
	extend(Main,Segment);
	function Main(){
		var _this = this;
		var _super = arguments.callee.parent;
		this.init = function(){
			_this._DOM = $("div[data-segment=head-nev]");
			_this.children =[menu];
			_super.init.call(_this);
		}
	}
	return new Main();
});