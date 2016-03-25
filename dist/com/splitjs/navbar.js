;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    /***
	**@constructor {Class} Navbar
	**/
    function Navbar(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.navbar.defaults,element.data(),options);
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
		
		
		this.list.find("li:has(a)").click(function(e){
			e.stopImmediatePropagation();
			if(!$(this).hasClass("active")){
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
			}
		});
    };
	
	/**
	** 构建样子
	**/
	Navbar.prototype.concrate = function(data){
		var _this = this;
		var container = $('<div class="container-fluid" />');
		var body = $('<div class="collapse navbar-collapse" />');
		this.list = $('<ul class="nav navbar-nav" />');
		if(this.config.type ==1){
			this.elem.addClass("nav-padding");
			container.append(body.append(_this.list));
		}else if(this.config.type == 2){
			this.elem.addClass("nav-padding-multi");
			var header = $('<div class="navbar-header">');
			var logo = $('<a class="navbar-brand" href="#">Brand&Logo</a>');
			header.append(logo);
			container.append(header).append(body.append(_this.list));
			this.list.addClass("nav-list-specify");
		}
		
		this.config.data.forEach(function(item,index){
			if(typeof(item)=="string"){
				var txt = item;
				var li = $('<li><a href="#">'+txt+'</a></li>');
				_this.list.append(li);	
			}else{
				if(item.hasOwnProperty("type")){
					txt = item.label||item.text||item.name;
					switch(item.type){
						case "link":
							li = $('<li><a href="#">'+txt+'</a></li>');
							_this.list.append(li);	
							break;
						case "input":
						case "button":	
							if(!_this.hasOwnProperty("form")) {
								_this.form = $('<form class="navbar-form navbar-left navbar-form-specify" />'); 
								body.prepend(_this.form);
							}
							li = $('<div class="form-group"></div>');
							if(item.type=="input"){
								li.html('<input type="text" class="form-control" placeholder="Search">',{
									value:txt
								});
							}else if(item.type=="button"){
								li = $('<button type="text" class="btn btn-default">'+txt+'</button>');
							}
							_this.form.append(li);
							break;
					}
				}else{
					_this.list.append(li);	
				}
			}	
		});		
		this.elem.append(container);
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
