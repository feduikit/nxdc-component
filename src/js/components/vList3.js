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
			txtWrapper.css({"padding-left":(deep*30)+"px"});
			li.append(txtWrapper);
			if(typeof(o)=="object"){
				var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group||o.children;
				var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
				var did = o.id;
				txtWrapper.html(text).attr({"title":text,"data-id":did});
				li.attr({"value":text,"deep":deep});
				if(o.audienceSize) txtWrapper.append("<span class='aud-size'>"+(o.audienceSize)+"</span>");
				if(o.search) txtWrapper.addClass("do-search");
				if(array && array instanceof Array){
					li.attr("asparent",true);
					txtWrapper.append(cfg.expicon);
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
	function VList3(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.vList3.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();
		
    };
	/**
	**列表组件的初始化
	**/
    VList3.prototype.init = function () {
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
			$(this).addClass("active");
			fireEvent($(this).get(0),"ITEM_CLICK",{val:$(this).attr("value")});
		});
		
		/***
		** 点击需要 "搜索" 的东西
		***/
		_this.elem.find("li.list-leaf>.do-search").click(function(e){
			_this.sepanel.removeClass("hidden");
			_this.elem.addClass("search-mode");
		});
	
    };
	
	/**
	** 构建下来菜单样子
	**/
	VList3.prototype.concrate = function(data){
		var _this = this;
		var cfg = _this.config;
		recursive(cfg.data,cfg,_this.elem,0);
		_this.sepanel = $("<div class='search-panel hidden' />");
		_this.elem.append(_this.sepanel);
	};

    VList3.prototype.initConfig = function(){
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
    $.fn.vList3 = function (options) {
		var the = this.first();
        var vList = new VList3(the, options);
        the = $.extend(true,{},the,new exchange(vList));
		return the;
    };	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(vList3){
		
		this.fold = function(){
			vList3.elem.find("li.list-item.active").removeClass("active");
			vList3.elem.find("li>ul.list-root").addClass("hide");
			return vList3.elem;
		};
		
		/***
		** hide search panel
		***/
		this.hspanel = function(){
			vList3.sepanel.addClass("hidden");
			vList3.elem.removeClass("search-mode");
			return vList3.elem;
		}
    }
	
	  var old = $.fn.vList3;
	  $.fn.vList3.Constructor = VList3;
	  // vList NO CONFLICT
	  // ===============
	  $.fn.vList3.noConflict = function () {
		$.fn.vList3 = old;
		return this;
	  }	
	/***
	** outside accessible default setting
	**/
	$.fn.vList3.defaults = {
		data:[],
		expicon:"<i class='glyphicon glyphicon-menu-right'></i>"
	};
}(jQuery));
