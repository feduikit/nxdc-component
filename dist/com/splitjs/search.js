;(function ($) { 
    var self = this;  
	
    /**
    **下拉菜单展示的方向问题
    **/
    function setDirect(ta){
        var peal = ta.peal;
        var dp = ta.list; 
        var ls = dp.get(0).getBoundingClientRect();
		var p = peal.get(0).getBoundingClientRect();
		if((window.innerHeight-p.bottom)>ls.height){//下面容得下 下拉菜单的展示，正常
			dp.removeAttr("style");
			ta.elem.find("i.glyphicon-menu-down").removeClass("turnback");
		}else if(p.top>ls.height){//向上展示
			dp.css({"top":-(ls.height)+"px","box-shadow":"0 0 1px #ccc"});
			ta.elem.find("i.glyphicon-menu-down").addClass("turnback");
		}
    };
	
    function Search(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.search.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();	
    };
	/**
	**列表组件的初始化
	**/
    Search.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
      	
		/***
		**输入框获得焦点
		**/
		this.input.focus(function(e){
			e.stopImmediatePropagation();
			_this.elem.addClass("focus");
			fireEvent(_this.elem.get(0),"search_focus");
			if(_this.config.type==3||_this.config.type==4){
				if(_this.dropmenu.children().length>0) _this.dropmenu.removeClass("hidden");
			}
		});
		this.input.click(function(e){
			e.stopImmediatePropagation();
		});
		
		/***
		**输入框失去焦点
		**/
		this.input.blur(function(e){
			e.stopImmediatePropagation();
			_this.elem.removeClass("focus");
		});
		/***
		**点击搜索
		**/
		this.icon.click(function(){
			if(_this.elem.hasClass("disabled")) return false;//如果是 disabled  不起作用
			fireEvent(_this.elem.get(0),"do_search",{text:_this.input.val()});
		});
		/***
		** 回车键
		***/
		this.input.keyup(function(e){
			if(e.keyCode == 13){
				fireEvent(_this.elem.get(0),"do_search",{text:$(this).val()});
				
				if(_this.config.type==3 || _this.config.type==4){
					_this.dropmenu.addClass("hidden");
				}
			}
			
			if(e.keyCode == 40){//下
				//默认选中下拉的 第一个
				if(_this.dropmenu.find("li.em").length==0){
					_this.dropmenu.find("li:first").addClass("em").siblings().removeClass("em");
				}else{
					var next = (parseInt(_this.dropmenu.find("li.em").attr("index"))+1);
					var the = _this.dropmenu.find("li[index="+next+"]");
					if(the.length>0){							
						the.addClass("em").siblings().removeClass("em");
					}else{
						_this.dropmenu.find("li:first").addClass("em").siblings().removeClass("em");
					}
				}
				var emed = _this.dropmenu.find("li.em");
				_this.input.val(emed.attr("val"));
				_this.wrapper.find(".close-cus").removeClass("hide");
			}else if(e.keyCode == 38){//上
				//默认选中下拉的最后一个
				if(_this.dropmenu.find("li.em").length==0){
					_this.dropmenu.focus().find("li:last").addClass("em").siblings().removeClass("em");
				}else{
					var pre = (parseInt(_this.dropmenu.find("li.em").attr("index"))-1);
					the = _this.dropmenu.find("li[index="+pre+"]");
					if(the.length>0){							
						the.addClass("em").siblings().removeClass("em");
					}else{
						_this.dropmenu.find("li:last").addClass("em").siblings().removeClass("em");
					}				
				}
				emed = _this.dropmenu.find("li.em");
				_this.input.val(emed.attr("val")).attr("name",emed.attr("val"));
				_this.wrapper.find(".close-cus").removeClass("hide");
			}
		});
		/***
		** 里面输入内容发生改变
		**/
		this.input.on("input",function(e){
			e.stopImmediatePropagation();
			if(_this.config.type==3||_this.config.type==4){
				_this.wrapper.addClass("loading");
				var opt = _this.config.ajaxOptions;
				var key = $(this).val();
				opt.data = {key:key};
				$.ajax(opt).then(function(result){
					if(typeof(result)=="string") result = JSON.parse(result);
					_this.dropmenu.empty();
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
						var li = '<li val="'+val+'" index='+index+' tabIndex='+index+'><a href="#">'+(val1||val)+'</a></li>';
						_this.dropmenu.append(li);
					});
					_this.dropmenu.removeClass("hidden");
					_this.wrapper.removeClass("loading");
					
					_this.dropmenu.find("li").unbind("click").click(function(e){
						e.stopImmediatePropagation();
						var val = $(this).attr('val'); 
						_this.input.val(val).attr("name",val);
						_this.dropmenu.addClass("hidden");
						_this.wrapper.find(".close-cus").removeClass("hide");
					});					
					
				},function(err){
					console.log(err);
					_this.wrapper.removeClass("loading");
				});			
			}
			//发出事件
			fireEvent(_this.elem.get(0),"input_change",{text:$(this).val()});			
		});
		
		/***
		**点击 展开下拉菜单
		***/
		this.elem.find("span.search-drop").click(function(e){
			e.stopImmediatePropagation();
			if(_this.elem.hasClass("disabled")) return false;//如果是 disabled  不起作用
			_this.elem.find("ul.search-drop-wrapper").toggleClass("hidden");
			if(!_this.elem.find("ul.search-drop-wrapper").hasClass("hidden")){
				setDirect(_this);
			}	
		});
		
		/***
		** 下拉菜单被点击
		**/
		this.elem.find("li.search-item").click(function(e){
			e.stopImmediatePropagation();
			if(_this.elem.hasClass("disabled")) return false;//如果是 disabled  不起作用
			var txt = $(this).attr("val");
			var ind = $(this).attr("index");
			_this.elem.find("ul.search-drop-wrapper").toggleClass("hidden");
			if(ind == _this.elem.find("span.selected-item").attr("index")) return false;	
			_this.elem.find("span.selected-item").text(txt).attr({"index":ind,val:txt,name:txt});
			
			fireEvent(_this.elem.get(0),"scope_change",{index:ind,value:txt});
		});
		
		
		this.wrapper.find(".close-cus").click(function(e){
			e.stopImmediatePropagation();
			_this.input.val("").removeAttr("name");
			$(this).addClass("hide");
		});
		
		$(document).click(function(e){
			_this.elem.find("ul.search-drop-wrapper").addClass("hidden");
			_this.elem.find(".dropdown-menu-cus").addClass("hidden");
		});
		
    };
	
	/**
	** 构建下来菜单样子
	**/
	Search.prototype.concrate = function(data){
		var _this = this;
		this.wrapper = $("<div class='search-decoration' />");
		this.input = $("<input class='form-control search-input' type='text' />");
		
		this.wrapper.append(this.input);
		
		this.dropmenu = $('<ul class="dropdown-menu dropdown-menu-cus hidden" />');
		this.wrapper.append(this.dropmenu);
		this.elem.append(this.wrapper);
	};

    Search.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		if(cfg.type == 2 || cfg.type == 4){
			this.peal = $("<span class='search-drop'/>");
			var txtbox = $("<span class='selected-item' tabIndex='-1' />");
			this.peal.append(txtbox).append("<i class='drop-spliter'></i>");
			if(cfg.dropList && cfg.dropList.length>0){
				this.list = $("<ul  class='search-drop-wrapper hidden'/>");	
				for(var i=0;i<cfg.dropList.length;i++){
					var the = cfg.dropList[i];
					if(typeof(the) == "object"){
						var txt = the.name||the.label||the.text;
					}else{
						txt = the;
					}
					if(i==0){
						txtbox.text(txt).attr("index",0);
					}		
					var li = $("<li class='search-item' />").text(txt).attr({"index":i,"val":txt});
					_this.list.append(li);
				}
				this.peal.append(_this.list).append("<i class='glyphicon glyphicon-menu-down' />");
			}
			this.elem.prepend(this.peal);
			this.wrapper.css({"width":"70%"});
			this.peal.css("line-height",this.elem.height()+"px");
		}else{
			this.wrapper.removeAttr("style");
		}
		
		if(cfg.type==3 || cfg.type==4){
			var dim = _this.wrapper.height();
			var spin = $('<div class="spinner">\
						  <div class="bounce1"></div>\
						  <div class="bounce2"></div>\
						  <div class="bounce3"></div>\
						</div>').css({"line-height":dim+"px","height":dim+"px"});
			var wb = parseFloat(_this.input.css("height"));
			var close = $('<span class="close close-cus hide">&times;</span>')
						.css("right",wb+"px");
			_this.wrapper.append(spin).append(close);
		}
		
		if(cfg.magicon){
			this.icon = $(cfg.magicon);
			this.wrapper.append(this.icon);
			var h = this.elem.height();
			this.input.css({"width":(_this.wrapper.width()-h-2)+"px","height":h+"px"});
			this.icon.css({"width":h+"px","height":h+"px","line-height":h+"px"});
		}
		
		if(cfg.placeholder){
			this.input.attr("placeholder",cfg.placeholder);
		}
		
		if(cfg.disabled){
			this.elem.removeClass("focus").addClass("disabled");
			this.input.attr("disabled",true);
			if(this.peal){
				this.peal.addClass("disabled");
			}
		}else{
			this.input.removeAttr("disabled");
			this.elem.removeClass("disabled");
			if(this.peal){
				this.peal.removeClass("disabled");
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
    $.fn.search = function (options) {
		var the = this.first();
        var search = new Search(the, options);
        the = $.extend(true,{},the,new exchange(search));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(search){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){
            
        }
    }
	
	  var old = $.fn.search;
	  $.fn.search.Constructor = Search;
	  // search NO CONFLICT
	  // ===============
	  $.fn.search.noConflict = function () {
		$.fn.search = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.search.defaults = {
		type:1,// 默认 2 带前置下拉菜单  3 instance search 即时搜索,4 前置下拉才到呢 + instance search
		magicon:"<i class='glyphicon glyphicon-search'></i>",
		placeholder:"",// 提示文字
		disabled:false,
		dropList:[],
        ajaxOptions: {
            type: "GET",
            url: "../data/search.json",
			xhrFields: { withCredentials: true}
        }		
	};
}(jQuery));
