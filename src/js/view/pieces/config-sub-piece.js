/***
** sub piece
** name: config-piece
** father: main piece
**/
define(['./segs/seg-split','./segs/seg-showcase'],function(sp,sc){
	extend(Main,Piece);
	function Main(){
		var _this = this;
		var _super = arguments.callee.parent;
		this.init = function(){
			this._DOM = $("div[data-piece='config-piece']");//这个类 控制的DOM区域
			this.children = [sp,sc];//初始化seg  实例
			_super.init.call(_this);
		};
		
		this.update = function(msg){
            if(msg.type=="com_li_click" || msg.type=="btn_dl_click"){
                if(msg.data.index > 0 && msg.data.index !== 4) {
                    this._DOM.removeClass("hidden");
					_this.children.forEach(function(child){
						child.update(msg);
					});					
                }else{
                    this._DOM.addClass("hidden");                
                }
            }      
		}
		
	}
	return new Main();
});