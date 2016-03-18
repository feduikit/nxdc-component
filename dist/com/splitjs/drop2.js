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
				if(o.href){
					text = '<a href="'+o.href+'">'+text+'</a>';
				}
				if(o.class){
					li.addClass(o.class);
				}
				txt.html(text).attr("title",text); ctx.data("val",text);
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
		/*******/
		this.elem.find(".content-part.title-layer").click(function(e){
			e.stopImmediatePropagation();
		});
		
		this.elem.find(".content-part:not(:has(.title-layer))").click(function(e){
			var val = $(this).text();
			if(_this.config.type==2) {//如果是 第二种类型的 下拉菜单
				if(_this.hold.data("val")!=val) {
					fireEvent($(this).get(0),"SELECT_CHANGE",{value:$(this).data("val")});
				}
				_this.hold.html(val).data("val",val);
			}else{	
				fireEvent($(this).get(0),"ITEM_CLICK",{value:$(this).data("val")});
			}	
		});		
		
    };
	
	/**
	** 构建下来菜单样子
	**/
	Drop2.prototype.concrate = function(data){
		var _this = this;
		 _this.button = $("<button type='button' data-toggle='dropdown' />");
		 _this.hold = $("<span />");
		 _this.button.append(_this.hold);
	};

    Drop2.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		_this.button.attr("id",cfg.id);
		if(cfg.showcaret)_this.button.append(cfg.caret);
		_this.hold.html(typeof(cfg.label)=="string"?cfg.label:cfg.label.text||cfg.label.label||cfg.label.name);
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
		this.val = function(o){
			if(drop2.config.type==2){
				var txt = o.text||o.label||o.name||o.value||o;
				drop2.hold.html(txt).data("val",txt);
			}
			return drop2.elem;
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
		type:1,//1 普通，2 选择之后更新的 文字下拉菜单，3 图标提示类popover  气泡
		id:"drop"+(new Date().valueOf()),
		showcaret:true,//默认显示caret
		caret:"<i class='glyphicon glyphicon-menu-down'></i>",
		label:"undefined",
		data:[]
	};
}(jQuery));
