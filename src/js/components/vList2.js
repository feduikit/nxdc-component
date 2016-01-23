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
		var ul = $("<ul class='list-root' deep="+deep+"  />");
		if(deep==1) {
			ul.addClass("list-deepest");
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var li = $("<li class='list-item' data-index="+i+"/>");
			var ctx = $("<div class='content-part' />");
			li.append(ctx);
			var icon = $("<span class='icon-part' />");
			ctx.append(icon);
			var txt = $("<span class='txt-part' />");
			ctx.append(txt);
			if(typeof(o)=="object"){				
				var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group||o.children;
				var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
				txt.html(text);
				li.attr({"value":text,"deep":deep});
				if(array && array instanceof Array){
					if(cfg.foldicon){
						ctx.append(cfg.foldicon);
					}
					rec(array,cfg,li,deep);
				}else{
					li.addClass("list-leaf");
				}
				if(o.icon){
					if(reg.test(o.icon)){
						icon.append(o.icon);
					}else{
						icon.append("<img width='80%' height='80%' src="+o.icon+" />");
					}
				}
			}else{
				txt.html(o);
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
			$(this).trigger("item_click",{deep:deep,value:val});
		});
		
		/***
		**
		***/
		$(".content-part>i.glyphicon-menu-up").click(function(e){
			e.stopImmediatePropagation();
			var li =  $(this).parent().parent();
			li.children("ul").toggleClass("hidden");
			$(this).toggleClass("open-hide");
		});
		
		_this.elem.on("webkitTransitionEnd oTransitionEnd otransitionend transitionend",function(e){
			e.stopImmediatePropagation();
			if($(this).hasClass("mini-state")){//shrink  缩起来
				$(this).trigger("shrink_complete");//收缩事件
			}else{//expand 展开
				$(this).trigger("expand_complete");//展开事件
			}
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
		_this.elem.find("li[deep='1'].list-item:last").siblings("li").append("<hr />");
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
	
	/***
	** 组件变形调用
	***/
	VList2.prototype.transform = function(){
		if(this.elem.children().length<=0) return;//如果不存在DOM 节点，删除
		this.elem.toggleClass("mini-state");
		var the =  this.elem.find("li>ul:has(li[deep='2'])");
		if(!the.hasClass("menu-mini-mode") && the.hasClass("hidden")) the.removeClass("hidden");
		the.toggleClass("menu-mini-mode hidden");
		this.elem.find("li:has(li.active)>.content-part");
		if(this.elem.hasClass("mini-state")){//mini模式
			$("li[deep='1']:has(ul)").unbind("mouseenter").mouseenter(function(){
				var wh = window.innerHeight;
				var face = $(this).find("ul:has(li[deep='2'])");
				$(this).addClass("active");
				$(this).find("ul:has(li[deep='2'])").removeClass("hidden");
				var h = face.get(0).getBoundingClientRect().bottom;
//				var h2 = this.getBoundingClientRect().bottom
				if(h+5>wh){
					face.addClass("align-bottom");
				}else{
					face.removeClass("align-bottom");
				}
			});
			$("li[deep='1']:has(ul)").unbind("mouseleave").mouseleave(function(){
				$(this).removeClass("active");
				$(this).children("ul:has(li[deep='2'])").addClass("hidden");
			});			
		}else{
			$("li[deep='1']:has(ul)").unbind("mouseenter");
			$("li[deep='1']:has(ul)").unbind("mouseleave");
		}	
	}
    /**
	* 入口
     */
    $.fn.vList2 = function (options) {
		var the = this.first();
        var vList2 = new VList2(the, options);
		the = $.extend(true,{},the,new exchange(vList2));
		return the;
    };	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(vList2){
		this.fold = function(){
			vList2.transform();
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
		leaficon:null,//"<i class='glyphicon glyphicon-list-alt'></i>"
		foldicon:"<i class='glyphicon glyphicon-menu-up'></i>"
	};
}(jQuery));
