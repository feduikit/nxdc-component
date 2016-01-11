;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
	
	function setAble(_this){
		//主需要  把整个 程序里面的 disabled 替换成 hidden 就可以实现，需要时再显示的效果
		setTimeout(function(){
			var tabR = _this.tabwrapper.children("li:last").get(0).getBoundingClientRect().right;
			var wrapperR = _this.elem.get(0).getBoundingClientRect().right;
			var cla = _this.config.negClass;
			if(wrapperR>tabR){
				$(_this.elem.find("span.more-tabs")).addClass(cla).attr("stop",true);
			}else{
				$(_this.elem.find("span.more-tabs")).removeClass(cla).removeAttr("stop");
			}
		},250);			
	}
	
    /***
	**@constructor {Class} Tabs
	**/
    function Tabs(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.tabs.defaults,element.data(),options);
		this.init();	
    };

	/**
	**列表组件的初始化
	**/
    Tabs.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

		
		this.tabwrapper.find("li").click(function(e){
			if(!$(this).hasClass("active")){
				$(this).addClass("active").siblings().removeClass("active");
				var idx = $(this).attr("index");
				fireEvent(_this.elem.get(0),"tab_change",{index:idx,activeData:_this.config.list[idx]});
			}
		});
		
		if(_this.config.rm){
			this.tabwrapper.find("li>a>i").click(function(e){
				e.preventDefault();			
				var index = $(this).parent().parent().attr("index");//删除的数据索引
				var the = _this.tabwrapper.find("li[index="+index+"]");					
				var  yon = the.hasClass("active");
				the.remove();
				if(yon){
					_this.tabwrapper.find("li:eq(0)").addClass("active");	
				}
				if(_this.tabwrapper.children().length==1) {
					_this.tabwrapper.find("li>a>i").addClass("hidden");
				}
				var aindex = _this.tabwrapper.find("li.active").attr("index");
				fireEvent(_this.elem.get(0),"tab_removed",{rmData:_this.config.list[index],activeData:_this.config.list[aindex]});
			});
			this.tabwrapper.find("li").mouseenter(function(){
				$(this).find("i").removeClass("transparent");
			});
			this.tabwrapper.find("li").mouseleave(function(){
				$(this).find("i").addClass("transparent");
			});			
		}
		
		if(_this.config.type==2){
			_this.preButton.click(function(e){
				var now = parseInt($(this).attr("now"));
				if(now==0) return false;
				$(this).attr("now",now);
				var w = _this.tabwrapper.find("li[index="+(now-1)+"]").width();
				var currW = parseInt(_this.tabwrapper.css("left"));//ul left
				_this.tabwrapper.css("left",(currW + w)+"px");
				now--;
				$(this).attr("now",now);
				_this.moreButton.attr("now",now);
				if(now==0){ $(this).addClass(_this.config.negClass);  }
				setAble(_this);				
			});
			//右侧的 按钮点击
			_this.moreButton.click(function(e){
				var _self = this;
				if($(this).attr("stop")) {
					e.preventDefault();
					e.stopImmediatePropagation();
					return false;
				}
				var now = parseInt($(this).attr("now"));
				$(this).attr("now",now);
				var w = _this.tabwrapper.find("li[index="+now+"]").width();
				var currW = parseInt(_this.tabwrapper.css("left"));
				_this.tabwrapper.css("left",(currW - w) + "px");
				now++;
				$(this).attr("now",now);
				_this.preButton.attr("now",now);
				if(now>0){ _this.preButton.removeClass(_this.config.negClass);  }	
				setAble(_this);
			});			
		}
    };
	
	/**
	** 构建下来菜单样子
	**/
	Tabs.prototype.concrate = function(data){
		var _this = this;
		this.tabwrapper = $("<ul class='nav nav-tabs nav-tabs-cus' style='left:0;'/>");
		_this.config.list.forEach(function(item,index){
			if(typeof(item)=="object"){
				var str = item.name||item.text||item.label||item.tab;
				var ba = item.badge;
			}else{
				str = item;
			}
			var li = $("<li role='presentation' value="+str+"  index="+index+"><a href='#'>"+str+"</a></li>");
			if(index==0) {li.addClass("active")};
			if(_this.config.badge && ba){//是否显示 badge 
				li.find("a").append("<span class='badge'>"+ba+"</span>");
			}
			_this.tabwrapper.append(li);
		});
		this.elem.append(_this.tabwrapper);
	};

    Tabs.prototype.initConfig = function(){
        var _this = this;
		if(_this.config.rm){
			_this.tabwrapper.find("li>a").append("<i class='glyphicon glyphicon-remove transparent'></i>");
		}
		
		if(_this.config.type==2){
			_this.elem.addClass("specialWrapper");
			_this.tabwrapper.addClass("one-line");
			_this.tabwrapper.find("li").addClass("carousel");
			_this.preButton = $("<span class='more-button pre-tabs disabled' now='0'><i class='glyphicon glyphicon-chevron-left'></i></span>");//向左翻
			_this.moreButton = $("<span class='more-button more-tabs' now='0'><i class='glyphicon glyphicon-chevron-right'></i></span>");//向右翻
			_this.elem.prepend(_this.preButton).append(_this.moreButton);			
			
			//这里最好监听 window的resize 事件
			var tabR = _this.tabwrapper.children("li:last").get(0).getBoundingClientRect().right;
			var wrapperR = _this.elem.get(0).getBoundingClientRect().right;	
			if(wrapperR>=tabR){
				_this.moreButton.hide();
				_this.preButton.hide();
			}
			
			
		}
    }
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.tabs = function (options) {
		var the = this.first();
        var tabs = new Tabs(the, options);
        exchange.call(this,tabs);
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(tab){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){
            
        }
    }
	/***
	** outside accessible default setting
	**/
	$.fn.tabs.defaults = {
		type:1,//2 特殊类型
		list:[],
		badge:false,// 是否显示badge
		rm:false,//是否允许删除tab
		negClass:"disabled"// hidden 会实现 需要时再显示的效果， disabled 则会一直显示
	};
}(jQuery));
