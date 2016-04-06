;(function ($) {
    var self = this;
	
	/***
	**加 ... 对于比较长的字符串
	***/
	function ellipsis(_this){
		var w = _this.elem.width();
		if(_this.config.wis>=(w-40)){
			var perw = (w-40)/_this.config.list.length;
			_this.breadwrapper.find("li").css({"maxWidth":perw+"px"}).addClass("cus");
		}else{
			_this.breadwrapper.find("li").removeAttr("style").removeClass("cus");
		}		
	}
	
	/***
	** 处理树桩菜单
	**/
	function recursive(arr,cfg,fa,deep){
		if(arr.length<=0) return;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='tree-root'/>");
		if(deep>1) {
			ul.addClass("hide").css("left",11+5+"px");
		}else{
			ul.addClass("tree-deepest");
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var li = $("<li class='tree-item' />");
			var txtWrapper = $("<span class='tree-txt-wrapper' />");
			li.append(txtWrapper);
			if(typeof(o)=="object"){
				var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group||o.children;
				var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
				txtWrapper.html(text).attr("title",text);
				li.attr({"value":text,"deep":deep});
				if(array && array instanceof Array){
					li.prepend($("<span class='tree-joint-wrapper' />").html(cfg.joint));
					rec(array,cfg,li,deep);
				}else{
					li.addClass("tree-leaf");
				}
			}else{
				txtWrapper.html(o);
				li.attr({"value":o,"deep":deep}).addClass("tree-leaf");
			}
			li.prepend("<span class='line-inspect' />")
			if(deep>1) {
				 li.append("<span class='line-inspect-hori' />");
			}
			ul.append(li);
		}
		fa.append(ul);
	}	
	/***
	** 构造函数
	**/
	function Tree(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.tree.defaults,element.data(),options);
		this.init();
		
    };
	/**
	**列表组件的初始化
	**/
    Tree.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
		_this.elem.find("span.tree-joint-wrapper").click(function(e){
			var ul = $(this).siblings("ul.tree-root");
			ul.toggleClass("hide");
			$(this).toggleClass("active");
		});	
		/***
		**点击叶子
		**/	
		if(_this.config.checkbox){
			_this.elem.find("li>.tree-txt-wrapper").unbind("click").click(function(e){
				e.stopImmediatePropagation();
				$(this).parent().toggleClass("active");
				var fa = $(this).parent();
				var the = $(this).parent().find("input[type=checkbox]")
				if($(this).parent().hasClass("active")){
					the.prop("checked",true).parents("li").addClass("active");
				}else{
					the.removeAttr("checked").parents("li:not(.tree-leaf)").removeClass("active");
					var theLI = $(this).parent().parents("li:not(.tree-leaf)");
						theLI.removeClass("active").find("input[type=checkbox]:first").removeAttr("checked");
				}

				fireEvent(_this.elem.get(0),"LEAF_CHECK",{val:$(this).attr("title"),check:$(this).find("input").prop("checked")});
			});
		}else{
			_this.elem.find("li.tree-leaf").unbind("click").click(function(e){
				_this.elem.find("li.tree-leaf").removeClass("active");
				$(this).addClass("active");	
				fireEvent(_this.elem.get(0),"LEAF_CLICK",{val:$(this).attr("value")});//点击节点
			});
		}
    };
	
	/**
	** 构建下来菜单样子
	**/
	Tree.prototype.concrate = function(data){
		var _this = this;
		var cfg = _this.config;
		recursive(cfg.data,cfg,_this.elem,0);
	};

    Tree.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		if(cfg.folder){
			_this.elem.find("li:not(.tree-leaf)>.tree-txt-wrapper").prepend(cfg.folder);
		}
		if(cfg.file){
			_this.elem.find("li.tree-leaf>.tree-txt-wrapper").prepend(cfg.file);
		}
		
		if(cfg.checkbox){
			_this.elem.find("li>.tree-txt-wrapper").prepend("<input type='checkbox'>");
		}
	}
    /**
	* 入口
     */
    $.fn.tree = function (options) {
		var the = this.first();
        var tree = new Tree(the, options);
       the = $.extend(true,{},the,new exchange(tree));
		return the;
    };	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(tree){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){    
        }
    }
	
	  var old = $.fn.tree;
	  $.fn.tree.Constructor = Tree;
	  // tree NO CONFLICT
	  // ===============
	  $.fn.tree.noConflict = function () {
		$.fn.tree = old;
		return this;
	  }	
	/***
	** outside accessible default setting
	**/
	$.fn.tree.defaults = {
		joint:"<div class='hor'></div><div class='ver'></div>",//tree 关联处的 icon //<span>+</span><span>-</span>
		icon:"",// 前置的图标
		data:[],//生成树桩菜单，需要的数据
		subKey:null,//下一层数组的key
		textKey:null,//值key
		folder:null,
		file:null,
		checkbox:false
	};
}(jQuery));
