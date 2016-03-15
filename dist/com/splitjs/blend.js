;(function ($) { //start with a [;] 
    var self = this;    
    
	/***
	** 递归构建下拉菜单里面的内容
	**/
	function recursive(fa,arr,cfg){
		var deep = arguments[3]||0;
		var gap = arguments[4]||5;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='dropdown-menu '/>"); if(deep==1) ul.addClass('blend-classify-drop');
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group;
			var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
			var val = o.val||o.value||text;
			var li = $("<li class='drop-one-item' text="+text+" value="+val+" deep="+deep+" title='"+text+"' />");
			var pad = (deep+2)*5 + 2;
			li.css({"padding-left":pad+"px"});
			if(array && array instanceof Array){
				li.addClass("drop-recursive");
				var ca = $("<i />",{class:"glyphicon"});
				ca.addClass(cfg.caret);
				li.append(ca).append(text);
				rec(li,array,cfg,deep,pad);
			}else{
				li.append(text);
			}
			ul.append(li);
		}
		fa.append(ul);
	}	

	function Blend(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.blend.defaults,element.data(),options);
		this.init();
		
    };
	/**
	**列表组件的初始化
	**/
    Blend.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
 
		
		
		//注册事件：
		_this.input.on("input",function(e){
			var key = $(this).val();
		
			var opt = _this.config.ajaxOptions;
			opt.data = {key:key};
			$.ajax(opt).then(function(result){
				if(typeof(result)=="string") result = JSON.parse(result);
				_this.drop1.empty();
				result.data.forEach(function(item,index){
					var val = (typeof(item)=="string")?item:(item.text||item.label||item.name);
					var re2 = new RegExp("["+key+"]+","i");	
					var re = new RegExp(key,"i");
					if(String(val).match(re)){
						var ma = String(val).match(re)[0];
					}else if(String(val).match(re2)){
						ma = String(val).match(re2)[0];
					}else{
						ma = "";				
					}
					var len = ma.length;
					var ree = new RegExp(ma,"i");
					var start = val.search(ree);
					var arr = val.split("");
					arr.splice(start,0,"<em>");
					arr.splice((start+len+1),0,"</em>");
					var val1 = arr.join("");
					var li = '<li val="'+val+'" index='+index+' tabIndex='+index+' >\
					<a href="#" data-id='+(item.id)+' data-val='+val+' >'+(val1||val)+'<span class="aud-class">'+item.audienceSize+'</span></a></li>';
					_this.drop1.append(li).removeClass("hidden");
				});			
			});
		});
		
		/***
		** 点击input 后面的图标出现树桩下拉次菜单
		***/
		_this.icon.click(function(e){
			_this.input.val("");
			_this.drop1.addClass("hidden").empty();
			if(_this.config.recdata && _this.config.recdata.length) {
				recursive(_this.elem,_this.config.recdata,_this.config,0);
			}
		});
		
    };
	
	/**
	** 构建下来菜单样子
	**/
	Blend.prototype.concrate = function(data){
		var _this = this;
		this.input = $("<input class='form-input blend-input' />");
		this.icon = $("<span class='icon-wrapper'><i class='glyphicon glyphicon-thumbs-up'></i></span>");
		this.drop1 = $('<ul class="dropdown-menu blend-search-drop hidden"  />');//搜索的下拉菜单
		//this.drop2 = $('<ul class="dropdown-menu blend-classify-drop hidden"  />');//分类下拉菜单
		this.elem.append(this.input).append(this.icon).append(this.drop1);
	};

    Blend.prototype.initConfig = function(){
        var _this = this;

	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.blend = function (options) {
		var the = this.first();
        var blend = new Blend(the, options);
       the = $.extend(true,{},the,new exchange(blend));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(blend){
		
    }
	
	
	  var old = $.fn.blend;
	  $.fn.blend.Constructor = Blend;
	  // table NO CONFLICT
	  // ===============
	  $.fn.blend.noConflict = function () {
		$.fn.blend = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.blend.defaults = {
        ajaxOptions: {
            type: "GET",
            url: "../data/blend.json",
			xhrFields: { withCredentials: true}
        },
		recdata:null
	};
}(jQuery));
