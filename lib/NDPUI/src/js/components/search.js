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
		this.config.wi = this.elem.width()||30;
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
			fireEvent(_this.elem.get(0),"do_search",{text:_this.input.val(),id:_this.input.attr("cid")});
		});
		/***
		** 回车键
		***/
		this.input.keyup(function(e){
			e.preventDefault();
			if(e.keyCode == 13){
				if(_this.config.type==3 || _this.config.type==4){
					_this.dropmenu.addClass("hidden");
					fireEvent(_this.elem.get(0),"ITEM_SELECT",{text:$(this).val()});	
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
				_this.input.val(emed.attr("val"));
				_this.wrapper.find(".close-cus").removeClass("hide");
			}
		});
		/***
		** 里面输入内容发生改变
		**/
		_this.input.on("input",function(e){
			var input = $(this).removeAttr("cid");
			e.stopImmediatePropagation();
			if(_this.config.type==3||_this.config.type==4){
				_this.wrapper.addClass("loading");
				var key = $(this).val();
				var opt = $.extend({}, _this.config.ajaxOptions);
				if (!opt.data){
					opt.data = {key:key};
				} else if (typeof opt.data === 'function') {
					opt.data = opt.data(key);
				}
				//opt.processResults = null;
				if (_this.xhr != null) {
					//终止上一次的请求abort
					_this.xhr.abort();

					_this.xhr = null;
				}
				_this.xhr = $.ajax(opt);

				_this.xhr.then(function(result){
					if (_this.config.ajaxOptions.processResults){
						result = _this.config.ajaxOptions.processResults(result)
					}
					if(typeof(result)=="string") result = JSON.parse(result);
					_this.dropmenu.empty();
					var _datas = result.data;
					if (_datas && _datas.length){
						_datas.forEach(function(item,index){
							var txt = (typeof(item)=="string")?item:(item.text||item.label||item.name||item.tagName);
							var val = item.val || item.value || txt;
							var id = item.id;
							var re2 = new RegExp("["+key+"]+","i");
							var re = new RegExp(key,"i");
							if(String(txt).match(re)){
								var ma = String(txt).match(re)[0];
							}else if(String(txt).match(re2)){
								ma = String(txt).match(re2)[0];
							}else{
								ma = "";
							}
							var len = ma.length;
							var ree = new RegExp(ma,"i");
							var start = txt.search(ree);
							var arr = txt.split("");
							arr.splice(start,0,"<em>");
							arr.splice((start+len+1),0,"</em>");
							var val1 = arr.join("");
							if(!_this.config.rowdec){
								var li = $('<li class="result-option" data-val="'+val+'" data-name="'+txt+'" data-text='+txt+' index='+index+' tabIndex='+index+'><a href="#">'+(val1||txt)+'</a></li>');
								if(id) li.attr("data-id",id);
							}else{
								var li = _this.config.rowdec(item,index,val1);
							}
							if (item.path){
								item.path = item.path.join("#").replace(/\s/g,"");
							}
							li.data("info", item);
							_this.dropmenu.append(li);
						});
					} else if (_this.config.formatNoMatches) {
						_this.dropmenu.append('<li class="no-result">' +  _this.config.formatNoMatches + '</li>');
					}
                    if(_this.dropmenu.children().length>0){
					   _this.dropmenu.removeClass("hidden");
                    }
					_this.wrapper.removeClass("loading");
					
					_this.dropmenu.find("li").unbind("click").click(function(e){
						e.preventDefault();
						e.stopImmediatePropagation();
						if ($(this).hasClass("no-result")){
							return false;
						}
						if($(this).hasClass("selected")) return false;
						if(_this.config.clickhide) _this.input.val($(this).data('text')).attr("cid",$(this).data('id'));//点击之后隐藏
						if(_this.config.clickhide)_this.dropmenu.addClass("hidden");//点击之后隐藏
						_this.wrapper.find(".close-cus").removeClass("hide");// 显示右侧的 x 删除号
						//modify by sisi 为了保证数据尽可能完整的返回 故修改成 $(this).data("info")
						fireEvent(_this.elem.get(0),"ITEM_SELECT",$(this).data("info"));
						if(!_this.config.clickhide){
							$(this).addClass("selected");
						}
					});	
		
				},function(err){
					_this.wrapper.removeClass("loading");
				});			
			}
			//发出事件
			fireEvent(_this.elem.get(0),"INPUT_CHANGE",{text:$(this).val()});			
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
		** 前置下拉菜单被点击
		**/
		this.elem.find("li.search-item").click(function(e){
			e.stopImmediatePropagation();
			if(_this.elem.hasClass("disabled")) return false;//如果是 disabled  不起作用
			var txt = $(this).attr("val");
			var ind = $(this).attr("index");
			_this.elem.find("ul.search-drop-wrapper").toggleClass("hidden");
			if(ind == _this.elem.find("span.selected-item").attr("index")) return false;	
			_this.elem.find("span.selected-item").text(txt).attr({"index":ind,val:txt,name:txt});
			
			fireEvent(_this.elem.get(0),"SCOPE_CHANGE",{index:ind,value:txt});
		});
		
		
		this.wrapper.find(".close-cus").click(function(e){
			e.stopImmediatePropagation();
			fireEvent(_this.wrapper.get(0),"INPUT_CLEAR",{text:_this.input.val()});
			$(this).addClass("hide");
			_this.input.val("").removeAttr("name");
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
        this.elem.attr("typecode",_this.config.type);
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
					var li = $("<li class='search-item' />").text(txt).attr({"index":i,"val":txt,title:txt});
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
						</div>').css({"line-height":(dim||28)+"px","height":(dim||28)+"px"});
			var wb = parseFloat(_this.input.css("height")||30);
			var close = $('<span class="close close-cus hide">&times;</span>')
						.css("right",wb+"px");
			_this.wrapper.append(spin).append(close);
		}
		
		if(cfg.magicon){
			this.icon = $(cfg.magicon);
			this.wrapper.append(this.icon);
			var h = this.elem.height();
			this.input.css({"width":((_this.elem.wi)-(h||28)-2)+"px","height":(h||28)+"px","line-height":(h||28)+"px"});
			this.icon.css({"width":(h||28)+"px","height":(h||28)+"px","line-height":(h||28)+"px"});
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
		
		if(cfg.name){
			this.input.attr("name",cfg.name);
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
        **默认input 值
        **/
		this.val = function(o){
			var txt = (typeof(o)=="string"||typeof(o)=="number")?o:(o.label||o.text||o.name||o.value);
			search.elem.find("input").val(txt);
			return search.elem;
		};
		
		//更新 ajax Option
		this.updateOption = function(o){
			search.config.ajaxOptions = o;
			return search.elem;
		};
		//清空输入框，
		//清空，下拉菜单
		this.clear = function(){
			search.elem.find("input").val("");
			search.dropmenu.empty().addClass("hidden");
			return search.elem;
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
		name:"search",//为了serialize 方便设置 name属性
		magicon:"<i class='glyphicon glyphicon-search'></i>",
		placeholder:"",// 提示文字
		disabled:false,
		clickhide:true,//点击或者选择 下拉菜单一项，是否消失下拉菜单,true 点击消失，false 点击不消失
		dropList:[],
		rowdec:null,// 回调函数  装饰下拉菜单中的一行，数据的呈现
        formatNoMatches:null,
        ajaxOptions: {
            type: "GET",
            url: "../data/search.json",
			xhrFields: { withCredentials: true}
        }		
	};
}(jQuery));
