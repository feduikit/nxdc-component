;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    /***
	**@constructor {Class} Navbar
	**/
    function Navbar(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.navbar.defaults,options);
		this.init();	
    };

	/**
	**导航栏初始化
	**/
    Navbar.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

    };
	
	/**
	** 构建样子
	**/
	Navbar.prototype.concrate = function(data){
		var _this = this;
		var container = $('<div class="container-fluid" />');
		var body = $('<div class="collapse navbar-collapse" />');
		var list = $('<ul class="nav navbar-nav" />');
		if(_this.config.type ==1){
			this.elem.addClass("nav-padding");
			container.append(body.append(list));
			_this.config.data.forEach(function(item,index){
				var li = $('<li><a href="#"></a></li>');
				if(typeof(item)=="string"){
					li.text(item);
				}else{
					li.text(item.label||item.text||item.name);
				}
				list.append(li);
			});
			this.elem.append(container);
		}
		
	};

	/**
	** 、配置用户定制
	**/
    Navbar.prototype.initConfig = function(){
        var _this = this;
		
    }
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.navbar = function (options) {
		var the = this.first();
        var navbar = new Navbar(the, options);
        exchange.call(this,navbar);
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(navbar){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(navbar){
            
        }
    }
	/***
	** outside accessible default setting
	**/
	$.fn.navbar.defaults = {
		type:1,
		data:["link1","like2","like3"],//导航菜单数据
	};
}(jQuery));
