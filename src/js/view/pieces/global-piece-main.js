define(['./home-sub-piece',
		'./support-sub-piece',
        './config-sub-piece',
        './header-sub-piece'],function(home,cfg,footer){
	extend(Main,Piece);
	function Main(){
		var _this = this;
		var _super = arguments.callee.parent;
		this.init = function(){
			this._DOM = $("div[data-piece='main']");//这个类 控制的DOM区域
			this.children = [home,cfg,footer];//初始化seg  实例
			_super.init.call(_this);
		};
		
		this.update = function(msg){
            if(msg.type=="com_li_click" ||msg.type == "btn_dl_click"){
				if(msg.data.index>0 && msg.data.index !== 4) {
					_this._DOM.toggleClass("nxdc-main-sec", true);
				} else {
					_this._DOM.toggleClass("nxdc-main-sec", false);
				}
            }			
			_this.children.forEach(function(child){
				child.update(msg);
			});
		}
		
	}
	return new Main();
});