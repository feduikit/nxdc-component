/***
** sub piece
** name: support-piece
** father: support piece
**/
define(['./segs/seg-download'],function(dl){
    extend(Home,Piece);
    function Home(){
        var _this = this;
        var _super = arguments.callee.parent;
        this.init = function(){
            this._DOM = $("div[data-piece='support-piece']");//这个类 控制的DOM区域
            this.children = [dl];//初始化seg  实例
            _super.init.call(_this);
        };
        
        this.update = function(msg){
            if(msg.data.name === '下载&支持') {
                this._DOM.removeClass("hidden")
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