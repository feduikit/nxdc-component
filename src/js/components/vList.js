;(function ($) {
    var self = this;    
	/***
	** 处理树桩菜单
	**/
	function recursive(arr,cfg,fa,deep){
		if(arr.length<=0) return;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='list-root' deep="+deep+"  />");
		if(deep>1) {
			ul.addClass("hide");
		}else{
			ul.addClass("list-deepest");
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var li = $("<li class='list-item' />");
			var txtWrapper = $("<span class='list-txt-wrapper' />");
			//txtWrapper.css({"padding-left":deep*10+"px"});
			li.append(txtWrapper);
			if(typeof(o)=="object"){
				var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group||o.children;
				var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
				txtWrapper.html(text);
				li.attr({"value":text,"deep":deep});
				if(array && array instanceof Array){
					if(cfg.expicon){
						li.attr("asparent",true);
						txtWrapper.append(cfg.expicon);
					}
					rec(array,cfg,li,deep);
				}else{
					li.addClass("list-leaf");
				}
			}else{
				txtWrapper.html(o);
				li.attr({"value":o,"deep":deep}).addClass("list-leaf");
			}
			ul.append(li);
		}
		fa.append(ul);
	}	
	/***
	** 构造函数
	**/
	function VList(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.vList.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();
		
    };
	/**
	**列表组件的初始化
	**/
    VList.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

		
		/**
		** 点击非叶子节点
		**/
		_this.elem.find("li[asparent]:has(ul)").click(function(e){
			e.stopImmediatePropagation();
			$(this).toggleClass("active").children("ul.list-root").toggleClass("hide");
		});
		
		/***
		**点击叶子
		**/	
		_this.elem.find("li.list-leaf").click(function(e){
			e.stopImmediatePropagation();
			_this.elem.find("li.list-leaf").removeClass("active");
			$(this).parents("li[asparent].active").addClass("focus");
			$(this).addClass("active");
			if($(this).parent().hasClass('list-deepest')){
				var the = $(this).siblings("li[asparent]").removeClass("active focus");
				the.find("li[asparent].active").removeClass("active").removeClass("focus");
				the.find("ul").addClass("hide");
			}else{
				the = $(this).parents("li[deep='1']").siblings("li");
				the.find("ul").addClass("hide");
				the.removeClass("active focus");
				the.find("li").removeClass("active").removeClass("focus");
				var deep = $(this).attr("deep");
				$(this).parent().parent().siblings("li[asparent]").removeClass(" active").removeClass("focus").children("ul").addClass("hide");
				$(this).siblings("li").removeClass("active").removeClass("focus").children("ul").addClass("hide");
			}
		});
    };
	
	/**
	** 构建下来菜单样子
	**/
	VList.prototype.concrate = function(data){
		var _this = this;
		var cfg = _this.config;
		recursive(cfg.data,cfg,_this.elem,0);
	};

    VList.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		
		if(cfg.leaficon){
			_this.elem.find("li.list-leaf>.list-txt-wrapper").prepend(cfg.leaficon).addClass("leaf-icon");
		}else{
			_this.elem.find("li.list-leaf>.list-txt-wrapper").removeClass("leaf-icon");
		}
		
		if(cfg.foldicon){
			var txt = _this.elem.find("li[asparent]").attr("value");
			_this.elem.find("li[asparent]>.list-txt-wraper").prepend(cfg.foldicon);
		}
	}
    /**
	* 入口
     */
    $.fn.vList = function (options) {
		var the = this.first();
        var vList = new VList(the, options);
        exchange.call(this,vList);
		return the;
    };	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(vList){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){    
        }
    }
	
	  var old = $.fn.vList;
	  $.fn.vList.Constructor = VList;
	  // vList NO CONFLICT
	  // ===============
	  $.fn.vList.noConflict = function () {
		$.fn.vList = old;
		return this;
	  }	
	/***
	** outside accessible default setting
	**/
	$.fn.vList.defaults = {
		data:[],
		expicon:"<i class='glyphicon glyphicon-menu-right'></i>",
		leaficon:"<i class='glyphicon glyphicon-list-alt'></i>"
	};
}(jQuery));
