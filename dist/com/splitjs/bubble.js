;(function ($) {
    var self = this;    
    function Bubble(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.bubble.defaults,element.data(),options);
		this.init();
    };
	/**
	**列表组件的初始化
	**/
    Bubble.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
		//$('[data-toggle="popover"]').popover();	
		
		//处理事件	
		//图标被点击之后
		this.elem.popover(_this.config);
		this.elem.click(function(e){
			var id = _this.elem.attr("aria-describedby");
			setTimeout(function(){
				if(!id) { _this.elem.popover('show'); }
				if(id){
						var pop = $("#"+id);
						//点击关闭按钮
						pop.find("button.close").click(function(e){
							e.stopImmediatePropagation();
							_this.elem.popover('hide');
						});

						//点击cancel 按钮
						pop.find("button[name=cancel]").click(function(e){
							e.stopImmediatePropagation();
							fireEvent(pop.get(0),"bubble_cancel");
							_this.elem.popover('hide');
						});

						//点击ok 按钮
						pop.find("button[name=ok]").click(function(e){
							e.stopImmediatePropagation();
							fireEvent(pop.get(0),"bubble_ok");
							_this.elem.popover('hide');
						});				
				};				
				
			},150);			
		});
    };
	
	/***
	**
	***/
	Bubble.prototype.concrate = function(data){
		var _this = this;		
	};

    Bubble.prototype.initConfig = function(){
		var _this = this;
		var cfg = this.config;
		if(cfg.icon){
			var reg = /\.(jpg|jpeg|gif|png|bmp)(\?)?.?/i;
			if(reg.test(cfg.icon)){
				_this.img =  $("<img width='100%' height='100%' />").attr("src",cfg.icon);
			}else{
				_this.img = $(cfg.icon);
			}
			this.elem.append(_this.img);
		}
		
		var html = $("<div />").append(cfg.template);
			html.find("button.close").toggleClass("close2",cfg.title?true:false);
		    html.find("button.close").toggleClass("hidden",cfg.close);
			html.children().attr("type",cfg.type);
			cfg.template = html.html();
	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.bubble = function (options) {
		var the = this.first();
        var bubble = new Bubble(the, options);
        the = $.extend(true,{},the,new exchange(bubble));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(bubble){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){
            
        }
    }
	
	
	  var old = $.fn.bubble;
	  $.fn.bubble.Constructor = Bubble;
	  // table NO CONFLICT
	  // ===============
	  $.fn.bubble.noConflict = function () {
		$.fn.bubble = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.bubble.defaults = {
		type:1,//1 普通模板， 2 有footer 按钮的模板
		icon:"<i class='glyphicon glyphicon-user'></i>",
		placement:"bottom",
		content:"",//文字或者内容
		close:false,//是否显示 x  关闭按钮
		template:'<div class="popover" role="tooltip">\
						<div class="arrow"></div>\
						 <button type="button" class="close" aria-label="Close">\
							<span aria-hidden="true">&times;</span>\
						 </button>\
						<div class="popover-title"></div>\
						<div class="popover-content"></div>\
						<div class="popover-footer">\
							<button class="btn btn-default" name="cancel" >取消</button>\
							<button class="btn btn-default" name="ok" >确定</button>\
						</div>\
					</div>'
	};
}(jQuery));
