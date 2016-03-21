;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	//全局辅助类
	var Help = {
		fixPageXY: function(the){
			var html = document.documentElement;
			var body = document.body;
			var the = (the.get(0)||the).getBoundingClientRect();
			var a = {};
			a.pageX = parseFloat(the.left) + (html.scrollLeft || body && body.scrollLeft || 0);
			a.pageX -= html.clientLeft || 0;

			a.pageY = parseFloat(the.top) + (html.scrollTop || body && body.scrollTop || 0);
			a.pageY -= html.clientTop || 0;
			return a;
		},
		/***
		** 处理树桩菜单
		**/
		recursive :function(fa,arr,cfg){
			var deep = arguments[3]||0;
			var gap = arguments[4]||5;
			deep++;
			var rec = arguments.callee;
			var ul = $("<ul class='drop-list'/>");
			if(cfg.type!=3 && deep>1){
				ul.addClass("hidden");
			}
			//ul.css({width:(cfg.width+gap+5)+"px",left:-(gap)+"px"});
			//ul.css({left:-(gap)+"px"});
			for(var i=0;i<arr.length;i++){
				var o = arr[i];
				var array = o.sub||o.son||o.next||o.group;
				var text = o.text||o.label||o.title||o.name;
				var val = o.val||o.value||text;
				var li = $("<li class='drop-one-item' data-txt="+text+" data-val="+val+" deep="+deep+" title='"+text+"' data-id="+o.id+" />");
				//var pad = (deep+2)*5 + 2;
				//li.css({"padding-left":pad+"px"});
				if(array && array instanceof Array){
					li.addClass("drop-recursive");
					var ca = $("<i/>",{class:"glyphicon"});
					ca.addClass(cfg.caret);
					li.append(ca).append(text);
					rec(li,array,cfg,deep);
				}else{
					li.append(text).addClass("list-leaf");
				}
				ul.append(li);
			}
			fa.append(ul);
		}		
		
	} 

    function Drop3(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.drop3.defaults,element.data(),options);
		this.config.id = "drop" + (new Date()).valueOf();
		this.config.wi = this.elem.width();
		this.init();
    };

	/**
	**列表组件的初始化
	**/
    Drop3.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

		/***** 注册监听事件 *****/

        _this.elem.click(function(e){
            e.stopImmediatePropagation();
			_this.elem.toggleClass("focus");
			_this.list.toggleClass("hidden").css("width",(_this.elem.width()+2)+"px");
			if(!_this.list.hasClass("hidden")){
				var page = Help.fixPageXY(_this.elem);
				_this.list.css({"top":(page.pageY+30)+"px","left":page.pageX+"px"});
			}
        });
		
		/***
		** 点击以节点
		***/		
		_this.list.find("li.list-leaf").click(function(e){
			var field = _this.elem.find("input");
			var dat = $(this).data();
			field.val(dat.txt).attr({"dara-val":dat.val,"data-txt":dat.txt,"data-id":dat.id});
			fireEvent(_this.elem.get(0),"ITEM_CLICK",dat);
		});
		
		_this.list.find("li.drop-recursive").click(function(e){
			e.stopImmediatePropagation();
			$(this).children("ul").toggleClass("hidden");
		});	
		
		
		
		if(_this.config.allowInputType=="number")_this.elem.find("input").keydown(function(e){
			if((e.keyCode<48 && e.keyCode!=8) || e.keyCode>57){
				e.preventDefault();
				return false;
			}else if(e.keyCode!=8){
				if($(this).val().length>3){//超过3个数字
					e.preventDefault();
					return false;
				}
			}
		});
		
		
		
		//点击空白处
		$(document).click(function(e){
			$(".drop3-list-wrapper").addClass("hidden");
			$(".ndp-drop3-wrapper").removeClass("focus");
		});	
		
		$(window).resize(function(){
			if(!_this.list.hasClass("hidden")){
				var page = Help.fixPageXY(_this.elem);
				_this.list.css({"top":(page.pageY+30)+"px","left":page.pageX+"px"});
			}		
		});
		

    };

	/**
	** 构建下来菜单样子
	**/
	Drop3.prototype.concrate = function(data){
		var _this = this;
        var  html = '<input type="text" readonly="true"><span class="caret-wrapper" tabIndex=-1><span class="caret glyphicon '+_this.config.caret+'"></span></span>';
		
		this.list = $("<div class='drop3-list-wrapper hidden'  tabindex='-1' id="+_this.config.id+" />").css("width",(_this.config.wi+2)+"px");
		
		this.elem.append(html);	
		$(document.body).append(this.list);
	};
	/***
	** 设置用户配置选项
	***/
    Drop3.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
        if(cfg.placeholder){
            _this.elem.find("input").attr("placeholder",_this.placeholder);
        }
		//输入框默认是 不允许输入的，设置true 允许输入
		if(cfg.allowInput){
			_this.elem.find("input").removeAttr("readonly");
		}
		
		if(cfg.data && cfg.data.length){
			Help.recursive(_this.list,cfg.data,cfg);
		}
    }
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.drop3 = function (options) {
		var the = this.first();
        var drop = new Drop3(the, options);
		the = $.extend(true,{},the,new exchange(drop));
		return the;
    };

    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(drop){
		/***
		** 设置显示的值
		***/
		this.val = function(o){
			if(typeof(o)=="object"){
				var txt = o[drop.config.textKey]||o.label||o.text||o.value||o.name;
				var val = o.value || o.val || txt;
				var id = o.id;
				
				drop.elem.find("input").val(txt).attr({"data-val":val,"data-text":txt,"data-id":id});
			}else{
				drop.elem.find("input").val(o).attr({"data-val":o,"data-txt":o});
			}
			return drop.elem;
		};
    }
	/***
	** outside accessible default setting
	**/
	$.fn.drop3.defaults = {
		name:"drop3",//为了便于serialize 设置name属性
        placeholder:null,//提示文字
		allowInput:false,//是否允许输入 默认情况下不允许输入
		allowInputType:"number",
        val:null,//默认值
		caret:"glyphicon-triangle-right",//只是箭头的样式，仅支持bootstrap 里面列出的 glyphicon
        data:[]//下拉菜单列表
	};
}(jQuery));
