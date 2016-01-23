;(function ($) {
    var self = this;
    
    function Drop2(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.drop2.defaults,element.data(),options);
		this.config.width = this.elem.width();
		this.init();	
    };
    
	/**
	**列表组件的初始化
	**/
    Drop2.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
        
    };
	
	/**
	** 构建下来菜单样子
	**/
	Drop2.prototype.concrate = function(data){
		var _this = this;

	};

    Drop2.prototype.initConfig = function(){
        var _this = this;

    }
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     */
    $.fn.drop2 = function (options) {
		var the = this.first();
        var drop2 = new Drop2(the, options);
        exchange.call(this,drop2);
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(drop2){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){
            
        }
    }
	
	
	  var old = $.fn.drop2;
	  $.fn.drop2.Constructor = Drop2;
	  // table NO CONFLICT
	  // ===============
	  $.fn.drop2.noConflict = function () {
		$.fn.drop = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.drop2.defaults = {

	};
}(jQuery));
