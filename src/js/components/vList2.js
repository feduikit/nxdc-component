;(function ($) {
    var self = this;    
	/***
	** 处理树桩菜单
	**/
	function recursive(arr,cfg,fa,deep){
		if(arr.length<=0) return;
		var reg = /^<[^><]+>.+?>$/i
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='list-root list-root-vlist2' deep="+deep+"  />");
		if(deep==1) {
			ul.addClass("list-deepest");
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var li = $("<li class='list-item' data-index="+i+"/>");
			if(deep == 1) {
				li.addClass("list-item-vlist2");
			}
			var ctxrow = $("<span class='list-txt-wrapper vlist2-specific' />");
			li.append(ctxrow);
			if(typeof(o)=="object"){				
				var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group||o.children;
				var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
				var txtbox = $("<span>"+text+"</span>");
				ctxrow.html(txtbox);
				li.attr({"value":text,"deep":deep});
				if(array && array instanceof Array){
					rec(array,cfg,li,deep);
				}else{
					li.addClass("list-leaf");
				}
				if(o.icon){
					if(reg.test(o.icon)){
						ctxrow.prepend(o.icon);
					}
				}
			}else{
				ctxrow.html("<span>"+o+"</span>");
				li.attr({"value":o,"deep":deep}).addClass("list-leaf");
			}
			ul.append(li);
		}
		fa.append(ul);
	}	
	/***
	** 构造函数
	**/
	function VList2(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.vList2.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();
		
    };
	/**
	**列表组件的初始化
	**/
    VList2.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

		
		/**
		** 点击非叶子节点
		**/
		_this.elem.find("li[asparent]:has(ul)").click(function(e){
			e.stopImmediatePropagation();

		});
		
		/***
		**点击叶子
		**/	
		_this.elem.find("li.list-leaf").click(function(e){
			e.stopImmediatePropagation();
			_this.elem.find("li.list-leaf").removeClass("active");
			var deep = $(this).attr("deep");
			var val = $(this).attr("value");
			$(this).parents("li[asparent].active");
			$(this).addClass("active");
			if($(this).parent().hasClass('list-deepest')){
				var the = $(this).siblings("li[asparent]").removeClass("active");
				the.find("li[asparent].active").removeClass("active");
			}else{
				the = $(this).parents("li[deep='1']").siblings("li");
				the.removeClass("active");
				the.find("li").removeClass("active");
				$(this).parent().parent().siblings("li[asparent]").removeClass(" active").children("ul");
				$(this).siblings("li").removeClass("active").children("ul");
			}
			
			$(this).trigger("leaf_item_click",{deep:deep,value:val});
		});
		
		_this.elem.trigger("mission_complete");
    };
	
	/**
	** 构建菜单样子
	**/
	VList2.prototype.concrate = function(data){
		var _this = this;
		var cfg = _this.config;
		recursive(cfg.data,cfg,_this.elem,0);
		_this.elem.find("li.list-leaf:first").addClass("active");
	};

    VList2.prototype.initConfig = function(){
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
    $.fn.vList2 = function (options) {
		var the = this.first();
        var vList2 = new VList2(the, options);
        exchange.call(this,vList2);
		return the;
    };	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(vList2){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){    
        }
    }
	
	  var old = $.fn.vList2;
	  $.fn.vList2.Constructor = VList2;
	  // vList NO CONFLICT
	  // ===============
	  $.fn.vList2.noConflict = function () {
		$.fn.vList2 = old;
		return this;
	  }	
	/***
	** outside accessible default setting
	**/
	$.fn.vList2.defaults = {
		data:[],
		leaficon:"<i class='glyphicon glyphicon-list-alt'></i>"
	};
}(jQuery));
