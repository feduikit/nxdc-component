;(function ($) { //start with a [;] 
    var self = this;    
    function Bread(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.bread.defaults,element.data(),options);
		this.config.w = this.elem.width();
		this.init();
    };
	/**
	**列表组件的初始化
	**/
    Bread.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
      
		//监听事件
		_this.breadwrapper.find("li:has(a)").click(function(e){
			e.stopImmediatePropagation();
			var index = $(this).attr("deep");
			var value =  $(this).text();
			if(_this.config.home && index==0){
				$(this).addClass("active").empty().text(_this.config.list[index]).prepend(_this.config.home);
			}else{
				$(this).addClass("active").empty().text(_this.config.list[index]);
			}
			_this.breadwrapper.find("li:gt("+index+")").remove();
			fireEvent(_this.elem.get(0),"layer_click",{deep:index,text:value});
		});
    };
	
	/**
	** 构建下来菜单样子
	**/
	Bread.prototype.concrate = function(data){
		var _this = this;
		var w = 0;
		this.breadwrapper = $("<ol class='breadcrumb'/>");
		var thespan = document.createElement("span");
		thespan.style.opacity = "0";
		thespan.style.visibility="hidden";
		thespan.style.position="absolute";
		document.body.appendChild(thespan);
		_this.config.list.forEach(function(item,index){
			if(typeof(item)=="string"||typeof(item)=="number"){
				var str= item;
			}else{
				str = item.name||item.text||item.label;
			}
			thespan.innerHTML = str;
			var thew = thespan.getBoundingClientRect().width;
			w+= thew;
			if(index !=_this.config.list.length-1){
				_this.breadwrapper.append("<li deep="+index+" w="+thew+" title="+str+" ><a href='#'><span>"+str+"</span></a></li>");
			}else{
				_this.breadwrapper.append("<li class='active' deep="+index+" w="+thew+" title="+str+" ><span>"+str+"</span></li>");
			}
			
			// 最后一个数组元素处理完毕
			if(index == _this.config.list.length-1){
				document.body.removeChild(thespan);
			}
		});
		
		//如果超出长度
		if(w>=(_this.config.w-50)){
			var perw = (_this.config.w-50)/_this.config.list.length;
			_this.breadwrapper.find("li").css({"maxWidth":perw+"px"}).addClass("cus");
		}else{
			_this.breadwrapper.find("li").removeAttr("style").removeClass("cus");
		}
		
		_this.elem.append(_this.breadwrapper);
	};

    Bread.prototype.initConfig = function(){
        var _this = this;
		_this.breadwrapper.find("li:gt(0)").addClass("change").attr("data-content",_this.config.spliter);
 		if(_this.config.home){
			_this.breadwrapper.find("li:first>a").prepend(_this.config.home).addClass("bread-home-decorate");
		}
	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.bread = function (options) {
		var the = this.first();
        var bread = new Bread(the, options);
       the = $.extend(true,{},the,new exchange(bread));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(drop){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){
            
        }
    }
	
	
	  var old = $.fn.bread;
	  $.fn.bread.Constructor = Bread;
	  // table NO CONFLICT
	  // ===============
	  $.fn.bread.noConflict = function () {
		$.fn.bread = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.bread.defaults = {
		home:"",//图标 只能使用 bootstrap 里面的图标
		spliter:"/",
		list:[]
	};
}(jQuery));
