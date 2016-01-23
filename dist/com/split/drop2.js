;(function ($) {
    var self = this;
    
	function recursive(arr,cfg,fa,deep){
		if(arr.length<=0) return;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='list-root' deep="+deep+"  />");
		if(deep==1) {
			ul.addClass("list-deepest dropdown-menu").attr("aria-labelledby",cfg.id);
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var li = $("<li class='drop-list-item' data-index="+i+"/>");
			var ctx = $("<div class='content-part' data-index="+i+" data-deep="+deep+"/>");
			li.append(ctx);
			var icon = $("<span class='icon-part' />");
			ctx.append(icon);
			var txt = $("<span class='txt-part' />");
			ctx.append(txt);
			if(typeof(o)=="object"){				
				var array = o.sub||o.son||o.next||o.group||o.children;
				var text = o.text||o.label||o.title||o.name;
				txt.html(text); ctx.data("val",text)
				li.attr({"value":text,"deep":deep});
				if(array && array instanceof Array){
					ctx.addClass("title-layer");
					rec(array,cfg,li,deep);
				}else{
					li.addClass("list-leaf");
				}
			}else{
				txt.html(o);ctx.data("val",o)
				li.attr({"value":o,"deep":deep}).addClass("list-leaf");
			}
			ul.append(li);
		}
		fa.append(ul);
	};	
	
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
        
		
//		this.elem.on("hide.bs.dropdown",function(e){
//			e.stopImmediatePropagation();
//			console.log(e);
//		});
		/*******/
		this.elem.find(".content-part.title-layer").click(function(e){
			e.stopImmediatePropagation();
		});
		
		this.elem.find(".content-part:not(:has(.title-layer))").click(function(e){
			var val = $(this).text();
			$(this).trigger("item_click",{value:$(this).data("val")});
		});		
		
    };
	
	/**
	** 构建下来菜单样子
	**/
	Drop2.prototype.concrate = function(data){
		var _this = this;
		 _this.button = $("<button type='button' data-toggle='dropdown' />");
		
	};

    Drop2.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		_this.button.attr("id",cfg.id);
		_this.button.html(cfg.caret);
		_this.button.prepend(cfg.label);
		this.elem.append(_this.button);
		recursive(cfg.data,cfg,_this.elem,0);
    }
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     */
    $.fn.drop2 = function (options) {
		var the = this.first();
        var drop2 = new Drop2(the, options);
		the = $.extend(true,{},the,new exchange(drop2));
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
		id:"drop"+(new Date().valueOf()),
		caret:"<i class='glyphicon glyphicon-menu-down'></i>",
		label:"undefined",
		data:[]
	};
}(jQuery));
