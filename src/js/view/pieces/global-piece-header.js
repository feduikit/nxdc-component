/***
**@Piece
**Piece 由 一个或多个 Segment  构成
**represent a piece of the Page
**页面框架级别的划分，head,footer,aside,article
**/
define(['./segs/seg-head'],function(menu){
	extend(Header,Piece);
	function Header(){
		var _this = this;
		var _super = arguments.callee.parent;
		this.init = function(){
			this._DOM = $("div.nxdc-header[data-piece=header]");
			this.children = [menu];//初始化seg  实例
			_super.init.call(_this);
		}
        
        this.update = function(msg){}
	};
	return new Header();
});