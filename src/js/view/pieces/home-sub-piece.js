/***
** sub piece
** name: home-piece
** father: main piece
**/
define(['./segs/seg-download'],function(dl){
	extend(Home,Piece);
	function Home(){
		var _this = this;
		var _super = arguments.callee.parent;
		this.init = function(){
			this._DOM = $("div[data-piece='home-piece']");//这个类 控制的DOM区域
			this.children = [dl];//初始化seg  实例
			_super.init.call(_this);

			this.bindEvent();
		};
		this.bindEvent = function(){
			this._DOM.find(".menu-list li").on("click", function() {
				var index = $(this).attr("index")
				$("#nxdc-menu").find("li").eq(index).trigger("click")
				$(".nxdc-header").removeClass("hidden")
			})
		};
		this.update = function(msg){
            if(msg.data.name === '首页') {
                this._DOM.removeClass("hidden")
				$(".nxdc-header").addClass("hidden")
            } else {
                this._DOM.addClass("hidden")
            }

			_this.children.forEach(function(child){
				child.update(msg);
			});
		}
		
	}
	return new Home;
});