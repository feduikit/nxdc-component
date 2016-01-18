/***
**兼容Object.keys 不支持情况iang
**/
if (!Object.keys) Object.keys = function(o) {
	if (o !== Object(o))
		throw new TypeError('Object.keys called on a non-object');
	var k=[],p;
	for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
	return k;
}
;(function(win){
    /**
    ** 派发自定义事件
    ** 使用 es6 的 发送事件方法
    **/
    win.fireEvent = function(ta,type,data,bub){
		ta = ta || document;
		var evt = new Event(type,{bubbles:bub||true});
		evt.data = data || {name:"unknow"};
		ta.dispatchEvent(evt);
    }
	
}(window));
;(function ($,win) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	var defaults = {
		title:"",
		content:"这里填写你想要展示的提示内容！~~",// 可以使文字，也可以是html
		btnOK:"OK",
		icon:"",
		callback:null
	};
	
	$(document).ready(function(){
		var pa = $(document.body);
		if(pa.find("[id*='alert'][class*='modal fade']").length==0){
			var wrapper = $('<div class="modal fade" tabindex="-1" role="dialog" id="alert-holder">\
					  <div class="modal-dialog modal-md modal-dialog-ndp">\
						<div class="modal-content"></div>\
					  </div>\
					</div>');
			var header = $('<div class="modal-header">\
						  		<button class="close" data-dismiss="modal">\
						  			<span aria-hidden="true">&times;</span>\
						  		</button>\
						    </div>');
			var body = $('<div class="modal-body"></div>');
			var footer = $('<div class="modal-footer">\
								<button class="btn btn-default" data-dismiss="modal"></button>\
						    </div>');
			wrapper.find("div.modal-content").append(header).append(body).append(footer);
			pa.append(wrapper);
		}

		win.showAlert = function(options){	
			body.empty();
			var icon = $('<div id="icon-holder"></div>');
			var content = $('<div id="content-holder"><div class="content-title"></div>\
								<p class="content-itself"></p></div>');
			body.append(icon).append(content);
			var cfg = $.extend(true,{},defaults,wrapper.data(),options);
			if(cfg.icon){
				icon.html(cfg.icon).addClass("showing");
				content.addClass("showing");
			}else{
				icon.removeClass("showing");
				content.removeClass("showing");
			}
			if(cfg.title){
				body.find(".content-title").html(cfg.title);
			}
			if(cfg.content){
				content.find(".content-itself").html(cfg.content);
			}
			if(cfg.btnOK){
				footer.find("button.btn").text(cfg.btnOK).attr("value",cfg.btnOK);
			}
			wrapper.unbind("hide.bs.modal").on("hide.bs.modal",function(){
				if(cfg.callback && typeof(cfg.callback)) cfg.callback(wrapper); 
			})
			
			wrapper.modal();//显示alert
		}
		
		
	});
}(jQuery,window));

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;    
    function Bread(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.bread.defaults,element.data(),options);
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
		this.breadwrapper = $("<ol class='breadcrumb'/>");
		_this.config.list.forEach(function(item,index){
			if(typeof(item)=="string"||typeof(item)=="number"){
				var str= item;
			}else{
				str = item.name||item.text||item.label;
			}
			if(index !=_this.config.list.length-1){
				_this.breadwrapper.append("<li deep="+index+"><a href='#'>"+str+"</a></li>");
			}else{
				_this.breadwrapper.append("<li class='active' deep="+index+">"+str+"</li>");
			}
		});
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
        exchange.call(this,bread);
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

;(function ($,win) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	var wrapper,header,body,footer;
	function build(){
		if($(document.body).find("[id*='confirm'][class*='modal fade']").length==0){
			wrapper = $('<div class="modal fade" tabindex="-1" role="dialog" id="confirm-holder">\
					  <div class="modal-dialog modal-md modal-dialog-ndp">\
						<div class="modal-content"></div>\
					  </div>\
					</div>');
			header = $('<div class="modal-header">\
						  		<button class="close" data-dismiss="modal">\
						  			<span aria-hidden="true">&times;</span>\
						  		</button>\
								<span class="top-title"></span>\
						    </div>');
			body = $('<div class="modal-body"></div>');
			footer = $('<div class="modal-footer">\
								<button class="btn btn-default btn-ok" data-dismiss="modal"></button>\
								<button class="btn btn-default btn-cancel" data-dismiss="modal"></button>\
						    </div>');
			wrapper.find("div.modal-content").append(header).append(body).append(footer);
			$(document.body).append(wrapper);
		}		
	}
	
	/***
	** 立刻构建 需要的DOM 节点
	**/
	$(document).ready(function(){
		build();	
	});    
	/***
	**@constructor Confirm
	**/
    function Confirm(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.confirm.defaults,element.data(),options);
		this.init();
		
		
		//显示confirm 窗口
		this.elem.modal();
    };
	/**
	**列表组件的初始化
	**/
    Confirm.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
		
		
		this.elem.find("button.btn-ok").unbind("click").click(function(e){
			fireEvent(_this.elem.get(0),"click_ok",{value:1,desc:"ok"});
		});
		
		this.elem.find("button.btn-cancel").unbind("click").click(function(e){
			fireEvent(_this.elem.get(0),"click_cancel",{value:0,desc:"no"});
		});
    };
	
	/**
	** 构建下来菜单样子
	**/
	Confirm.prototype.concrate = function(data){
		var _this = this;
		build();//在判断一次，万一不存在
	};

    Confirm.prototype.initConfig = function(){
        var _this = this;
		var cfg = _this.config;
		if(cfg.title){
			header.find(".top-title").html(cfg.title);
		}else{
			header.find(".top-title").html("");
		}
			
		if(cfg.content){
			body.empty();
			var icon = $('<div id="icon-holder"></div>');
			var content = $('<div id="content-holder"><div class="content-title"></div>\
								<p class="content-itself">'+cfg.content+'</p></div>');
			body.append(icon).append(content);
		}else{
			body.empty();
		}
		
		if(cfg.icon){
			icon.html(cfg.icon).addClass("showing");
			content.addClass("showing");
		}else{
			icon.removeClass("showing");
			content.removeClass("showing");
		}			
		
		
		if(cfg.btnOK){
			footer.find("button.btn-ok").text(cfg.btnOK);
		}
		
		if(cfg.btnCANCEL){
			footer.find("button.btn-cancel").text(cfg.btnCANCEL);
		}
		
	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.confirm = function (options) {
		var the = this.first();
        var confirm = new Confirm(the, options);
        exchange.call(this,confirm);
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(confirm){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(confirm){
            
        }
    }
	/***
	** outside accessible default setting
	**/
	$.fn.confirm.defaults = {
		title:"确认信息",//标题
		content:"你确定留空白什么也不写吗？ 请选择",//提示文字
		icon:"",//是否显示图标 图片 80X80
		btnOK:"确定", //确定
		btnCANCEL:"取消"//取消
	};
}(jQuery,window));

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
    
    function Drop(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.drop.defaults,element.data(),options);
		this.config.width = this.elem.width();
		this.init();	
    };
    
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
			ta.elem.find("span.caret-wrapper").removeClass("turnback");
		}else if(p.top>ls.height){//向上展示
			dp.css({"top":-(ls.height)+"px","box-shadow":"0 0 1px #ccc"});
			ta.elem.find("span.caret-wrapper").addClass("turnback");
		}
    };
	
	/***
	** 处理树桩菜单
	**/
	function recursive(fa,arr,cfg){
		var deep = arguments[3]||0;
		var gap = arguments[4]||5;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='sub-drop-list'/>");
		if(cfg.type!=3) ul.addClass("hidden");
		ul.css({width:(cfg.width+gap+5)+"px",left:-(gap)+"px"});
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group;
			var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
			var li = $("<li class='drop-one-item' value="+text+" deep="+deep+"/>");
			var pad = (deep+2)*5 + 2;
			li.css({"padding-left":pad+"px"});
			if(array && array instanceof Array){
				li.addClass("drop-recursive");
				var ca = $("<i/>",{class:"glyphicon"});
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
	/**
	**列表组件的初始化
	**/
    Drop.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
        
		/***** 注册监听事件 *****/
		
        _this.peal.click(function(e){
            e.stopImmediatePropagation();
            _this.list.toggleClass("hidden");
            setDirect(_this);
        });
        
        _this.list.find("li[class='drop-one-item'],li[class='drop-one-item split-line']").click(function(e){
            e.stopImmediatePropagation();
            _this.list.addClass("hidden");
			var itemIndex = $(this).index();
			var deep = $(this).attr("deep");
            var value = $(this).attr("value");
            _this.peal.find("input").val(value);
			//deep 表示树桩菜单第几层 base from 0。index:表示这一层的第几个， base from 1
            fireEvent(_this.elem.get(0),"drop_item_click",{val:value,deep:deep,index:itemIndex});
        });
		
		/***
		** 如果是树桩菜单，加监听
		**/
		if(_this.config.type!=3) _this.list.find("li.drop-recursive").click(function(e){
			e.stopImmediatePropagation();
			$(this).children("ul.sub-drop-list").toggleClass("hidden");	
			$(this).children("i.glyphicon").toggleClass("turndown");
			setDirect(_this);
		});
		
		/***
		** 处理 有checkbox 的 列表
		**/
		if(_this.config.type == 4){
			var apply = $("<li class='drop-one-item apply-item'><button class='btn btn-default'>Apply</button></li>")
			_this.list.append(apply);
			/**
			**点击 全选
			**/
			_this.list.find("li.all-banner>input[type=checkbox]").change(function(){
				_this.list.find("li.checkbox-item>").prop("checked",this.checked);
			});
			
			/**
			** 点击单个 item 行
			**/
			_this.list.find("li.checkbox-item:not(.all-banner)>input[type=checkbox]").change(function(){
				if(!this.checked){
					_this.list.find("li.all-banner>input[type=checkbox]").prop("checked",this.checked);
				}else{
					
				}
			});
			
			/***
			**点击应用按钮
			**/
			_this.list.find("li.apply-item").click(function(e){
				e.stopImmediatePropagation();
				_this.list.addClass("hidden");
				//派发事件
				var chks = _this.list.find("li.checkbox-item:not(.all-banner):has(input[type]:checked)");
				var cksArr = [];
				var vals = [];
				chks.each(function(index,item){
					var val = $(item).find("span").text();
					cksArr.push({index:$(item).index(),value:val});
					vals.push(val);
				});
				_this.peal.find("input").val(vals.join(","))
				fireEvent(_this.elem.get(0),"item_apply_click",{checkedArr:cksArr});
			});
			
			$("body").click(function(e){
				if(!(e.target.tagName == "INPUT" && e.target.type == "checkbox")){
					$(".ndp-drop-wrapper ul.drop-list:has(li.drop-one-item)").addClass("hidden");
				}
			});
		}
    };
	
	/**
	** 构建下来菜单样子
	**/
	Drop.prototype.concrate = function(data){
		var _this = this;
        this.peal = $("<div class='drop-peal'/>");//外观包装
        if(this.config.type==2) this.peal.addClass("drop-split-peal");
        this.list = $("<ul class='drop-list hidden' />");
        this.peal.html('<input type="text" readonly="true"><span class="caret-wrapper"><span class="caret glyphicon '+_this.config.caret+'"></span></span>');
        this.elem.append(_this.peal).append(_this.list);
		if(_this.config.type == 4){
			var all = $("<li class='drop-one-item checkbox-item all-banner'><span>All</span><input type='checkbox'/></li>");
			this.list.append(all);
		}
	};

    Drop.prototype.initConfig = function(){
        var _this = this;
        if(this.placeholder){
            _this.peal.find("input").attr("placeholder",_this.placeholder);
        }
        
        if(_this.val){
            _this.peal.find("input").val(_this.val);
        }
        
		/**
		**构建下拉列表
		**/
        _this.config.data.forEach(function(item,index){
			if(item && typeof(item)=="object"){
				var key2 = _this.config.subKey;
				var key1 = _this.config.textkey;
				var sub = item[key2]||item.sub||item.son||item.next||item.group;
				var text = item[key1]||item.text||item.label||item.title||item.name;
				if(sub && sub instanceof Array){//存在下一层数组，说明这是一个
					var li = $("<li class='drop-one-item drop-recursive' deep='0'/>");
					if(_this.config.type!=3){
						var ca = $("<i/>",{class:"glyphicon"});
						ca.addClass(_this.config.caret);
						li.append(ca);
					}else{
						li.addClass("group-hilight");
					}
					li.append(text);
					recursive(li,sub,_this.config);
					_this.list.append(li);
				}else{
					li = $("<li class='drop-one-item' value="+text+" deep='0'>"+text+"</li>");
					if(item.disable) li.addClass("disabled");
					if(item.split) li.addClass("split-line");
					if(_this.config.type==4){
						var check = $("<input type='checkbox' />");
						li.addClass("checkbox-item").append(check);
					}
					_this.list.append(li);	
				}
			}else if(typeof(item)=="number"||typeof(item)=="string"){
				li = $("<li class='drop-one-item'></li>");
				li.attr("value",item).append("<span>"+item+"</span>");
				if(_this.config.type==4){
					li.addClass("checkbox-item");
					var check = $("<input type='checkbox' />");
					li.append(check);
				}
				_this.list.append(li);
			}
        });
    }
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.drop = function (options) {
		var the = this.first();
        var drop = new Drop(the, options);
        exchange.call(this,drop);
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(drop){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){
            
        }
    }
	
	
	  var old = $.fn.drop;
	  $.fn.drop.Constructor = Drop;
	  // table NO CONFLICT
	  // ===============
	  $.fn.drop.noConflict = function () {
		$.fn.drop = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.drop.defaults = {
        type:1,//1，inline; 2 split dropdown下拉,3 分组显示菜单，组名高亮，不能被点击,4 checkbox,多选
        placeholder:null,//提示文字
		textKey:"",//默认猜测，text,label,title,name
		subKey:"",//默认猜测，sub, son, next
        val:null,//默认值
		caret:"glyphicon-triangle-right",//只是箭头的样式，仅支持bootstrap 里面列出的 glyphicon 
        data:[]//下拉菜单列表
	};
}(jQuery));

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this; 
	var gData;
		function build(data){
			var wrapper = $('<div class="carousel slide" data-ride="carousel" id="gallery-carousel">');
			var list = $('<div class="carousel-inner" role="listbox">');
			var wi = window.innerWidth;
			var he = window.innerHeight;
			data.forEach(function(item,index){
				var itemBox = $('<div class="item" index='+index+' w='+item.w+' h='+item.h+'>');
				if(index == 0) itemBox.addClass("active");
				var img = $('<img data-img='+item.big+' class="img-responsive">');
				if(index==0) img.attr("src",item.big);
				var caption = $('<div class="carousel-caption">');
				itemBox.append(img).append(caption);
				list.append(itemBox);
			});
			
			var ctlLeft = $('<a class="left carousel-control hidden" href="#gallery-carousel" role="button" 					data-slide="prev">\
    				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\
    				<span class="sr-only">Previous</span>\
  				</a>');
			var ctlRight = $('<a class="right carousel-control" href="#gallery-carousel" role="button" 					data-slide="next">\
    			<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\
    			<span class="sr-only">Next</span>\
  				</a>');
			wrapper.append(list).append(ctlLeft).append(ctlRight);
			return wrapper;
		}
		/***
		**等比例缩放
		***/
		function scale(w,h){
			var wi = Math.round(window.innerWidth*0.85).toFixed(2);//展示图片的区域宽度
			var he = Math.round(window.innerHeight-210).toFixed(2);//展示图片的区域高度
			var aspect = ((w||4)/(h||3)).toFixed(2);//宽高比
			var container = $('.modal-gallery .modal-content');
			
			if (wi / he > aspect){//如果 container的宽高比 高于 content的宽高比  "height":he,
				container.css({"width":Math.round(he * aspect), "margin-left":-Math.round(he * aspect)/2+"px"});
			} else {
				//,"height":Math.round(wi / aspect),
				container.css({"width":wi,"margin-left":-(wi/2)+"px"});
			}		
		}	
	
	
    function Gallery(element, options) {
		var _this = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.gallery.defaults,element.data(),options);
		this.init();
		
		function setButton(){
			//if($("#gallery-holder").hasClass("in")) 
			setTimeout(function(){
				var a = _this.list.get(0).getBoundingClientRect();
				var lfst = _this.list.find("ul>li:first");
				var b = _this.list.find("ul>li:last").get(0).getBoundingClientRect();
				var mlft = parseInt(lfst.css("margin-left"));
				lfst.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd")
					.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
				function(e){
					mlft = parseInt(lfst.css("margin-left"));
					if(mlft == 5){
						_this.lfButton.addClass("disabled");
					}else{
						_this.lfButton.removeClass("disabled");
					}
					if(a.right>=b.right){//不需要
						_this.rtButton.addClass("disabled");
					}else{
						_this.rtButton.removeClass("disabled");
					}				
					
				});
				if(mlft == 5){
					_this.lfButton.addClass("disabled");
				}else{
					_this.lfButton.removeClass("disabled");
				}
				if(a.right>=b.right){//不需要
					_this.rtButton.addClass("disabled");
				}else{
					_this.rtButton.removeClass("disabled");
				}
			},250);			
		}	
		
		function showImg(idx){
			var one = _this.body.find("div.item[index="+(idx)+"] img");
			var src = one.data("img");
			if(!one.attr("src")){
				one.attr("src",src);
			}
		}
		
		/***
		** 显示图片查看器，弹出窗口
		***/
		this.elem.click(function(e){
			var len = _this.config.data.length;
			_this.body.empty().append(build(_this.config.data));
			var ul = _this.list.find("ul");
			ul.empty().attr("data-len",len);
			_this.config.data.forEach(function(item,index){
				var li = $("<li class='gallery-list-cell' index="+index+"></li>");
				if(index==len-1) li.attr("lastone","true");
				if(index==0) li.addClass("active");
				var img = $("<img width='100%' height='100%' class='img-responsive' /> ");
				if(item.small) img.attr("src",item.small);
				li.append(img);
				ul.append(li);
			});	
			var gData = _this.config.data[_this.config.current];
			scale(gData.w,gData.h);
			_this.wrapper.modal();//显示图片查看器
			setButton();
			var theIMG = $("#gallery-carousel").find("img[data-img][index='1']");
			theIMG.attr("src",theIMG.data("img"));
		});
		
		/***
		** 点击空白处，不起作用
		***/
		_this.wrapper.unbind("click").click(function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			
		});
		
		/***
		** 点击 列表一项
		**/
		_this.list.find("ul").unbind("click").click(function(e){
			var len = $(this).data("len");
			if(e.target.tagName!="UL"){
				var the = (e.target.tagName=="IMG")?$(e.target).parent():$(e.target);
				var idx = the.attr("index");
				the.addClass("active").siblings().removeClass("active");
				var t =_this.body.find("div.carousel-inner div.item[index="+(idx)+"]");
				scale(t.attr("w"),t.attr("h"));
				t.addClass("active").siblings().removeClass("active");	
				showImg(idx);showImg(idx+1);
				var leftBtn = _this.body.find("a.left.carousel-control");
				var rightBtn = _this.body.find("a.right.carousel-control");				
				if(idx==0){
					leftBtn.addClass("hidden");
					rightBtn.removeClass("hidden");
				}else if(idx == len-1){
					rightBtn.addClass("hidden");
					leftBtn.removeClass("hidden");					
				}else{
					rightBtn.removeClass("hidden");
					leftBtn.removeClass("hidden");						
				}
			}
		});
		/***
		** dock左边的箭头
		**/
		_this.lfButton.click(function(e){
			e.stopImmediatePropagation();
			if($(this).hasClass("disabled")) return false;
			var ul = _this.list.find("ul");
			
			var lf = parseFloat(ul.find("li:first").css("marginLeft")||0);
			ul.find("li:first").css("marginLeft",(lf+100)+"px");
			setButton();
		});
		/***
		**dock 右边的箭头
		**/
		_this.rtButton.click(function(e){
			e.stopImmediatePropagation();
			if($(this).hasClass("disabled")) return false;
			var ul = _this.list.find("ul");
			var lf = parseFloat(ul.find("li:first").css("marginLeft"));
			ul.find("li:first").css("marginLeft",(lf-100)+"px");
			setButton();
		});
		
		//处理向左翻(上一张)<      还是向右翻（下一张） >
		_this.body.unbind('click').click(function(e){
			var len = _this.list.find("ul[data-len]").data("len");
			var leftBtn = _this.body.find("a.left.carousel-control");
			var rightBtn = _this.body.find("a.right.carousel-control");
			//左翻
			if((e.target.tagName=="A" && $(e.target).hasClass("left"))||
			    e.target.tagName=="SPAN" && $(e.target).attr("class").indexOf("left")!=-1){
			var the = _this.list.find("ul>li.active");
			var current = parseInt(the.attr("index"));
				if(current<1){
					var next = 0;
					return false;
				}else{
					leftBtn.removeClass("hidden");
					rightBtn.removeClass("hidden");
					next = current - 1;
				}
			var hwd = _this.list.find("ul>li[index="+(current-1)+"]");	 
				hwd.addClass("active").siblings().removeClass("active");				
			var that = _this.body.find("div.carousel-inner");
			var hwd2 = that.find("div.item[index="+(current-1)+"]");
				scale(hwd2.attr("w"),hwd2.attr("h"));
				hwd2.addClass("active").siblings().removeClass("active");
				if(parseInt(the.attr("index"))<=1){
					leftBtn.addClass("hidden");
				}
			}//右翻
			else if((e.target.tagName=="A" && $(e.target).hasClass("right"))||
					  e.target.tagName=="SPAN" && $(e.target).attr("class").indexOf("right")!=-1){
				var the = _this.list.find("ul>li.active");
				var current = parseInt(the.attr("index"));
					if(current>=len-1){
						return false;
					}else{
						rightBtn.removeClass("hidden");
						leftBtn.removeClass("hidden");
					}
				var next = (current+1>=len)?current:current+1;
					hwd = _this.list.find("ul>li[index="+(next)+"]");
					hwd.addClass("active").siblings().removeClass("active");				
				var that = _this.body.find("div.carousel-inner");
				var src = that.find("div.item[index="+(next)+"] img").data("src");
				showImg(next); showImg(next+1);
				hwd2 = 	that.find("div.item[index="+(next)+"]");
				scale(hwd2.attr("w"),hwd2.attr("h"));	
				hwd2.addClass("active").siblings().removeClass("active");
				console.log(next+ " : " + len);
				if(next >= len-1){
				   	rightBtn.addClass("hidden");
				  }
			};			
		});
		
		
		$(window).resize(function(e){
			setButton();
			if(_this.wrapper.hasClass("in")){
				var the = _this.body.find("div.carousel-inner div.item.active");
				scale(the.attr("w"),the.attr("h"));
			}
		});
    };
	/**
	**列表组件的初始化
	**/
    Gallery.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

    };
	
	/**
	** 构建下来菜单样子
	**/
	Gallery.prototype.concrate = function(data){
		var _this = this;
		var pa = $(document.body);//modal-lg
		if(pa.find("[id*='gallery'][class*='modal fade']").length==0){
			_this.wrapper = $('<div class="modal fade" tabindex="-1" role="dialog" id="gallery-holder">\
					  <div class="modal-dialog modal-gallery">\
						<div class="modal-content"></div>\
					  </div>\
					</div>');
			_this.body = $('<div class="modal-body"></div>');
			_this.dock = $('<div class="gallery-list-wrapper"></div>');
			_this.lfButton = $("<i class='glyphicon glyphicon-triangle-left'></i>");
			_this.rtButton = $("<i class='glyphicon glyphicon-triangle-right'></i>");
			_this.list = $("<div class='list-box'><ul></ul></div>");
			_this.dock.append(_this.lfButton).append(_this.list).append(_this.rtButton);
			_this.wrapper.find("div.modal-content").append(_this.body);
			
			_this.close = $('<button class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>\
						  </button>');
			_this.wrapper.append(_this.dock).append(_this.close);
			pa.append(_this.wrapper);
		}else{
			_this.wrapper = pa.find('#gallery-holder');
			_this.body = _this.wrapper.find("div.modal-body");
			_this.dock = _this.wrapper.find(".gallery-list-wrapper");
			_this.lfButton = _this.wrapper.find("i.glyphicon-triangle-left");
			_this.rtButton = _this.wrapper.find("i.glyphicon-triangle-right");
			_this.list = _this.dock.find("div.list-box:has(ul)");	
		}		
		
		this.cover = $('<img class="img-thumbnail" width="100%" height="100%">');
		this.mask = $('<div class="gallery-mask"><i class="glyphicon glyphicon-zoom-in"></i></div>');
					
		this.elem.append(this.cover).append(this.mask);

	};

    Gallery.prototype.initConfig = function(){
        var _this = this;
		var cfg =  this.config;
		if(cfg.cover){
			_this.cover.attr("src",cfg.cover);
		}
		
		if(cfg.data && cfg.data.length){
		}else{
			_this.lfButton.addClass("disabled");
			_this.rtButton.addClass("disabled");
		}
	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.gallery = function (options) {
		var the = this.first();
        var gallery = new Gallery(the, options);
        exchange.call(this,gallery);
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
	
	  var old = $.fn.gallery;
	  $.fn.gallery.Constructor = Gallery;
	  // gallery NO CONFLICT
	  // ===============
	  $.fn.gallery.noConflict = function () {
		$.fn.gallery = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.gallery.defaults = {
		current:0,//当前默认是第几个
		cover:"",//封面图片
		data:[]
	};
}(jQuery));

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    /***
	**@constructor {Class} Navbar
	**/
    function Navbar(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.navbar.defaults,element.data(),options);
		this.init();	
    };

	/**
	**导航栏初始化
	**/
    Navbar.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
		
		
		this.list.find("li:has(a)").click(function(e){
			e.stopImmediatePropagation();
			if(!$(this).hasClass("active")){
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
			}
		});
    };
	
	/**
	** 构建样子
	**/
	Navbar.prototype.concrate = function(data){
		var _this = this;
		var container = $('<div class="container-fluid" />');
		var body = $('<div class="collapse navbar-collapse" />');
		this.list = $('<ul class="nav navbar-nav" />');
		if(this.config.type ==1){
			this.elem.addClass("nav-padding");
			container.append(body.append(_this.list));
		}else if(this.config.type == 2){
			this.elem.addClass("nav-padding-multi");
			var header = $('<div class="navbar-header">');
			var logo = $('<a class="navbar-brand" href="#">Brand&Logo</a>');
			header.append(logo);
			container.append(header).append(body.append(_this.list));
			this.list.addClass("nav-list-specify");
		}
		
		this.config.data.forEach(function(item,index){
			if(typeof(item)=="string"){
				var txt = item;
				var li = $('<li><a href="#">'+txt+'</a></li>');
				_this.list.append(li);	
			}else{
				if(item.hasOwnProperty("type")){
					txt = item.label||item.text||item.name;
					switch(item.type){
						case "link":
							li = $('<li><a href="#">'+txt+'</a></li>');
							_this.list.append(li);	
							break;
						case "input":
						case "button":	
							if(!_this.hasOwnProperty("form")) {
								_this.form = $('<form class="navbar-form navbar-left navbar-form-specify" />'); 
								body.prepend(_this.form);
							}
							li = $('<div class="form-group"></div>');
							if(item.type=="input"){
								li.html('<input type="text" class="form-control" placeholder="Search">',{
									value:txt
								});
							}else if(item.type=="button"){
								li = $('<button type="text" class="btn btn-default">'+txt+'</button>');
							}
							_this.form.append(li);
							break;
					}
				}else{
					_this.list.append(li);	
				}
			}	
		});		
		this.elem.append(container);
	};

	/**
	** 、配置用户定制
	**/
    Navbar.prototype.initConfig = function(){
        var _this = this;
		
    }
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.navbar = function (options) {
		var the = this.first();
        var navbar = new Navbar(the, options);
        exchange.call(this,navbar);
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(navbar){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(navbar){
            
        }
    }
	/***
	** outside accessible default setting
	**/
	$.fn.navbar.defaults = {
		type:1,
		data:["link1","like2","like3"],//导航菜单数据
	};
}(jQuery));

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	var Static = {option:{}};
	
    /**
    **下拉菜单展示的方向问题
    **/
    function setDirect(ta){
        var peal = ta.dropwrapper;
        var dp = ta.dropwrapper.find("ul.page-dropdown"); 
        var ls = dp.get(0).getBoundingClientRect();
		var p = peal.get(0).getBoundingClientRect();
		if((window.innerHeight-p.bottom)>ls.height){//下面容得下 下拉菜单的展示，正常
			dp.removeAttr("style");
			peal.find("i.glyphicon-triangle-bottom").removeClass("turnback");
		}else if(p.top>ls.height){//向上展示
			dp.css({"top":-(ls.height)+"px","border-top-color":"#ddd","border-bottom-color":"white"});
			peal.find("i.glyphicon-triangle-bottom").addClass("turnback");
		}
    };	
	/***
	** 构建可点击页面列表 html
	**/
	function listHtml(start,_this){
		if(start<=0) start = 1;
		var html = "";
		var len = Math.min(_this.config.showPage,_this.config.totalPages);
		for(var i=start;i<=(start+len-1);i++){
			html +="<li class='page-item' value="+i+">"+i+"</li>";
		}
		return html;
	};
	/***
	** 页码被点击
	**/
	function itemClick(instance){
		var _this = instance;
		var cb = arguments.callee;
		var list = _this.list;
		var cfg = _this.config;
		var ta = list.find("li.page-item:not([role])");
		ta.unbind("click").click(function(e){
			var current = $(this).attr("value");
			e.stopImmediatePropagation();
			$(this).addClass("active").siblings("li").removeClass("active");
			var list_1 = parseInt(ta.first().text());
			var list_n = parseInt(ta.last().text());
			if($(this).text() == list_1 && list_1!=1){
				var gap = list_1 - 1;
				if(gap>=2){
					var html = listHtml((list_1-2),_this);
				}else{
					html = listHtml((list_1-1),_this);	
				}
				list.find("li.page-item:not([role])").remove();
				$(html).insertAfter(list.find("li.page-item[role=begin]"));
				list.find("li[value="+current+"]").addClass("active");
				cb(_this);
			}
			
			if($(this).text() == list_n && list_n!=cfg.totalPages){
				gap = cfg.totalPages  - list_n;
				if(gap>=2){
					 html = listHtml((list_1+2),_this);					
				}else{
					html = listHtml((list_1+1),_this);	
				}
				list.find("li.page-item:not([role])").remove();
				$(html).insertAfter(list.find("li.page-item[role=begin]"));
				list.find("li[value="+current+"]").addClass("active");
				cb(_this);
			}
			
			if(current == cfg.totalPages){
				list.find("li.page-item[role=end]").addClass("disabled");
			}else if(current == 1){
				list.find("li.page-item[role=begin]").addClass("disabled");
			}else{
				list.find("li.page-item[role]").removeClass("disabled");
			}
			//val:第几页
			fireEvent(_this.elem.get(0),"page_change",{currentPage:current});
		});	
	};
	
	function buildPageList(_this){
		var cfg = _this.config;
		if(_this.list && _this.list.children().length){
			_this.list.empty();
		}else{
			_this.list = $("<ul class='pagination'/>");
		}
		_this.beginButton = $("<li class='page-item' role='begin' >"+cfg.begin+"</li>");
		if(cfg.currentPage==1) _this.beginButton.addClass("disabled"); 
		// 尾页
		_this.endButton = $("<li class='page-item' role='end'>"+cfg.end+"</li>");
		var len = Math.min(cfg.totalPages,cfg.showPage);	
		var html = listHtml(1,_this);
		_this.list.append(_this.beginButton).append(html).append(_this.endButton);
		_this.list.find("li.page-item:not([role]):first").addClass("active");
		_this.elem.append(_this.list);
		//注册监听事件
		itemClick(_this);
		//首页，尾页点击事件
		_this.list.find("li[role].page-item").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			if($(this).hasClass("disabled")) return false; //如果是disabled  不反应
			var fst = _this.list.find("li.page-item:not([role]):first").text();// 当前显示最小页数
			var las = _this.list.find("li.page-item:not([role]):last").text();//单签显示的最大页数
			var page = 1;
			//当前第几页
			if($(this).attr("role")=="begin"){
				if(fst!=1){
					 html = listHtml(1,_this);
					_this.list.find("li.page-item:not([role])").remove();
					$(html).insertAfter(_this.list.find("li.page-item[role=begin]"));
					itemClick(_this);				
				}
				_this.list.find("li.page-item:not([role]):first").addClass("active")												.siblings().removeClass("active");
				$(this).addClass("disabled").siblings().removeClass("disabled");;
				page = 1;
			}else{
				if(las!=_this.config.totalPages){
					 html = listHtml((cfg.totalPages-cfg.showPage + 1),_this);
					_this.list.find("li.page-item:not([role])").remove();
					$(html).insertAfter(_this.list.find("li.page-item[role=begin]"));
					itemClick(_this);				
				}
				_this.list.find("li.page-item:not([role]):last").addClass("active")
																.siblings().removeClass("active");
				$(this).addClass("disabled").siblings().removeClass("disabled");
				page = _this.config.totalPages;
			}
			fireEvent(_this.elem.get(0),"page_change",{currentPage:page});
		});		
	}
	
    
    function Page(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.page.defaults,options);
		//显示几页，比如一共有20页，但是显示可点击的按钮5个  len = 5;
		if(this.config.totalItems){
			this.config.totalPages = Math.ceil(this.config.totalItems/this.config.perPage);
		}
		this.config.showPage=5,//最大显示几页
		this.init();	
    };

	/**
	**列表组件的初始化
	**/
    Page.prototype.init = function () {
        var _this = this;
		_this.concrate();
		_this.initConfig();		

		//如果是 带有选择每页显示多少页的 分页组件
		if(_this.config.type==2){
			_this.dropwrapper.mouseenter(function(e){
				e.stopImmediatePropagation();
				$(this).find("ul.page-dropdown").toggleClass("hidden");
				setDirect(_this);
			});
			_this.dropwrapper.mouseleave(function(e){
				e.stopImmediatePropagation();
				$(this).find("ul.page-dropdown").addClass("hidden");
			});	
			_this.dropwrapper.find("ul.page-dropdown>li").click(function(e){
				e.stopImmediatePropagation();
				$(this).parent().addClass("hidden");
				var per = $(this).text();
				if(_this.pagetext.text()!=per){
					_this.pagetext.text(per);
					_this.config.perPage = parseInt(per);//每页显示多少条
					_this.config.totalPages = Math.ceil(_this.config.totalItems/_this.config.perPage)
					buildPageList(_this);
					//currentPage 当前页，perpage ： 没页显示多少条
					fireEvent(_this.elem.get(0),"per_page_change",{currentPage:1,perpage:per});//
				}
			});
		}
    };
	
	/**
	** 构建下来菜单样子
	**/
	Page.prototype.concrate = function(){
		var _this = this;
		var cfg = _this.config;	
		//var wrapper = $("<nav />");
		if(cfg.type==2){
			_this.pagetext = $("<span class=' page-choosed-text'/>").text(30);//显示当前选定的 每页显示的条数
			_this.dropwrapper = $("<span class=' page-drop-list'/>");
			var more = $("<i class='glyphicon glyphicon-menu-hamburger' />");
			var down = $("<i class='glyphicon glyphicon-triangle-bottom' />");
			var drop = $("<ul class='page-dropdown hidden'/>")
			_this.dropwrapper.append(more).append(down);
			cfg.perPages.forEach(function(item){
				if(typeof(item)=="string"||typeof(item)=="number"){
					var str = item;
				}else{
					str = item.name||item.text||item.pages;
				}
				var li = $("<li />").text(str);
				drop.append(li);
			});
			_this.dropwrapper.append(drop);
			_this.elem.append(_this.pagetext).append(_this.dropwrapper);
		}
		buildPageList(_this);
	};

    Page.prototype.initConfig = function(){
        var _this = this;
		var cfg = _this.config;
		var cp = _this.config.currentPage||1;
		if(cfg.currentPage||1){
			_this.list.find("li.page-item[value="+cp+"]").addClass("active");			
		}
		
		if(cfg.type==2 && cfg.perPage){
			_this.pagetext.text(cfg.perPage);
		}
    }
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.page = function (options) {
		var the = this.first();
        var page = new Page(the, options);
        exchange.call(this,page);
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Page} page :  instacne of the plugin builder
    **/
    function exchange(page){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){
            
        }
    }
	
	  var old = $.fn.page;
	  $.fn.page.Constructor = Page;
	  // page NO CONFLICT
	  // ===============
	  $.fn.page.noConflict = function () {
		$.fn.page = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.page.defaults = {
		type:1,//1 普通分页，2 每页显示多少条的分页 3
		begin:"<i class='glyphicon glyphicon-step-backward'></i>",//第一页
		end:"<i class='glyphicon glyphicon-step-forward'></i>",//最后一页
		totalPages:1,//总共有多少页
		currentPage:1,//默认显示第一页
		perPage:10,//每页显示多少条
		perPages:[10,20,30],//每页显示条数选择区间
		totalItems:0//总共有多少条数据  如果这个数据存在，则totalPages 的数据就不用了，使用这里计算的结果
		
	};
}(jQuery));

;(function($) {
    var self = this;

    var tpl = '<div class="{{css}}" data-progressbar-shape="{{shape}}">\
                <div class="progress progressbar-default" style="width: {{width}}px;">\
                    <div class="progress-bar" role="progressbar" style="width: {{progress}}; height: {{size}}px;">\
                    </div>\
                </div>\
                <div class="progressbar-circle" style="width: {{width}}px; height: {{width}}px;">\
                    <div class="progressbar-pie-left" style="clip: rect(0, {{clip-width}}px, auto, 0);">\
                        <div class="progressbar-left" style="clip: rect(0, {{clip-width}}px, auto, 0);">\
                        </div>\
                    </div>\
                    <div class="progressbar-pie-right" style="clip: rect(0, auto, auto, {{clip-width}}px);">\
                        <div class="progressbar-right" style="clip: rect(0, auto, auto, {{clip-width}}px);">\
                        </div>\
                    </div>\
                    <div class="progressbar-mask" data-progress="{{progress}}" style="width: {{circle-inner}}px; height: {{circle-inner}}px; left: {{size}}px; top: {{size}}px;"></div>\
                </div>\
            </div>';


    function Progressbar(element, options) {
        var self = this;
        this.$elem = $(element);
        this.config = $.extend(true, $.fn.progressbar.defaults, {
            css: this.$elem.attr('data-progressbar-css'),
            progress: this.$elem.attr('data-progressbar-progress'),
            width: this.$elem.attr('data-progressbar-width'),
            size: this.$elem.attr('data-progressbar-size')
        }, options);
        this.init(options);
    };

    Progressbar.prototype = {
        constructor: 'Progressbar',
        /**
         * 初始化
         */
        init: function() {
            //获取进度的dom对象
            this.buildDom();
        },
        /**
         * 生成dom树
         */
        buildDom: function() {
            this.$progress = $(tpl.replace("{{css}}", this.config.css)
                .replace(/{{progress}}/ig, this.config.progress)
                .replace(/{{width}}/ig, this.config.width)
                .replace(/{{size}}/ig, this.config.size)
                .replace(/{{clip-width}}/ig, this.config.width / 2)
                .replace(/{{circle-inner}}/ig, this.config.width - this.config.size * 2)
                .replace(/{{shape}}/ig, this.config.shape));
            this.$bar = this.$progress.find('.progress-bar');
            this.$circle = this.$progress.find('.progressbar-circle');
            this.setProgress(this.config.progress);
            this.$elem.html(this.$progress);
        },
        /**
         * 设置进度
         */
        setProgress: function(p) {
            this.config.progress = p;
            //线形的
            this.$bar.css('width', p);
            //环形的
            var angle = parseInt(p) * 3.6;
            var $right = this.$circle.find('.progressbar-right');
            var $left = this.$circle.find('.progressbar-left');
            this.$circle.find('.progressbar-mask').attr('data-progress', p);
            if (angle <= 180) {
                $left.css('transform', "rotate(0deg)");
                setTimeout(function() {
                    $right.css('transform', "rotate(" + angle + "deg)");
                }, 500)
            } else {
                $right.css('transform', "rotate(180deg)");
                setTimeout(function() {
                    $left.css('transform', "rotate(" + (angle - 180) + "deg)");
                }, 500)
            };
            return this;
        },
        /**
         * 获取进度
         */
        getProgress: function() {
            return this.config.progress;
        },
        /**
         * 设置形状
         */
        setShape: function(shape) {
            this.config.shape = shape;
            this.init();
            return this;
        },
        /**
         * 获取形状
         */
        getShape: function() {
            return this.config.shape;
        },
        /**
         * 设置宽度
         */
        setWidth: function(width){
            this.config.width = width;
            this.init();
            return this;
        },
        /**
         * 获取宽度
         */
        getWidth: function(){
            return this.config.width;
        },
        /**
         * 设置进度条的尺寸
         */
        setSize: function(size){
            this.config.size = size;
            this.init();
            return this;
        },
        /**
         * 获取进度条的尺寸
         */
        getSize: function(){
            return this.config.size;
        },

    }

    $.fn.progressbar = function(options, value) {
        var returnVal = this;
        this.each(function(key, the) {
            if (!the.progressbarInstance) {
                the.progressbarInstance = new Progressbar(the, options);
            } else {
                if(['progress', 'shape', 'size', 'width'].indexOf(options) > -1) {
                    var method = options.toLowerCase().replace(/[a-zA-Z]/,function(s){return s.toUpperCase()});
                    if (value) {
                        the.progressbarInstance['set' + method](value);
                    } else {
                        returnVal = the.progressbarInstance['get' + method]();
                    }
                }
            }

        })
        return returnVal;
    };

    $.fn.progressbar.defaults = {
        css: '',
        progress: '80%',
        shape: 'default',
        width: 100,
        size: 5
    };
})(jQuery)
;(function ($,win) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	var wrapper,header,body,footer;
	function build(){
		if($(document.body).find("[id*='prompt'][class*='modal fade']").length==0){
			wrapper = $('<div class="modal fade" tabindex="-1" role="dialog" id="prompt-holder">\
					  <div class="modal-dialog modal-md modal-dialog-ndp">\
						<div class="modal-content"></div>\
					  </div>\
					</div>');
			header = $('<div class="modal-header">\
						  		<button class="close" data-dismiss="modal">\
						  			<span aria-hidden="true">&times;</span>\
						  		</button>\
								<span class="top-title"></span>\
						    </div>');
			body = $('<div class="modal-body"></div>');
			footer = $('<div class="modal-footer">\
								<button class="btn btn-default btn-ok disabled" data-dismiss="modal"></button>\
								<button class="btn btn-default btn-cancel" data-dismiss="modal"></button>\
						    </div>');
			wrapper.find("div.modal-content").append(header).append(body).append(footer);
			$(document.body).append(wrapper);
		}else{
			if(body) body.removeAttr("class").addClass("modal-body");
			if(footer){
				footer.removeAttr("class").addClass("modal-footer");
				footer.find("button.btn-ok").addClass("disabled");
			}
		}		
	};
	
	
	
	function listen(){
		if(footer){
			footer.find("button.btn-ok:not(.disabled)").unbind("click").click(function(e){
				fireEvent(_this.elem.get(0),"click_ok",{value:1,desc:"ok"});
			});

			footer.find("button.btn-ok.disabled").unbind("click").click(function(e){
				e.preventDefault();
				e.stopImmediatePropagation();
			});	
		}
	}
	
	/***
	** 立刻构建 需要的DOM 节点
	**/
	$(document).ready(function(){
		build();	
	});    
	/***
	**@constructor Prompt
	**/
    function Prompt(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.prompt.defaults,options);
		this.init();
		
		
		//prompt 窗口
		this.elem.modal();
    };
	/**
	**列表组件的初始化
	**/
    Prompt.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
		
			
		listen();
		
		this.elem.find("button.btn-cancel").unbind("click").click(function(e){
			fireEvent(_this.elem.get(0),"click_no",{value:0,desc:"no"});
		});
    };
	
	/**
	** 构建下来菜单样子
	**/
	Prompt.prototype.concrate = function(data){
		var _this = this;
		build();//在判断一次，万一不存在
	};

    Prompt.prototype.initConfig = function(){
        var _this = this;
		var cfg = _this.config;
		if(cfg.title){
			if(header) header.find(".top-title").html(cfg.title);
		}else{
			header.find(".top-title").html("");
		}
		
		//用户自定义头部
		if(cfg.header){
			if(typeof(cfg.header)=="function"){
				cfg.header(header,wrapper);
			}else{
				header.html(cfg.header);
			}
		}
		
		//用户自定义	内容部分
		if(cfg.body){
			body.empty();
			if(typeof(cfg.body)=="function"){
				cfg.body(body,wrapper);
			}else{
				body.html(cfg.body);
			}
		}else{
			if(body) body.empty();
		}
			
		if(cfg.btnOK){
			if(footer) footer.find("button.btn-ok").text(cfg.btnOK);
		}
		
		if(cfg.btnCANCEL){
			if(footer) footer.find("button.btn-cancel").text(cfg.btnCANCEL);
		}
		//用户自定义 尾部
		if(cfg.footer){
			if(typeof(cfg.footer)=="function"){
				cfg.footer(footer,wrapper);
			}else{
				footer.html(cfg.footer);	
			}
		}
		
		if(cfg.validate){
			if(cfg.validate(body)){//校验合法
				footer.find("button.btn-ok").removeClass("disabled");				
			}else{//校验不合法
				footer.find("button.btn-ok").addClass("disabled");
			}
			listen();
		}
		
	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.prompt = function (options) {
		var the = this.first();
        var prompt = new Prompt(the, options);
        exchange.call(this,prompt);
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(prompt){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(prompt){
            
        }
    }
	/***
	** outside accessible default setting
	**/
	$.fn.prompt.defaults = {
		title:"认证表单",//标题
		btnOK:"保存", //确定
		btnCANCEL:"取消",//取消
		validate:null,//表单校验， 返回 true,校验成功，返回false 校验失败
		header:null,
		body:null,
		footer:null
	};
}(jQuery,window));

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
			_this.elem.addClass("focus");
			fireEvent(_this.elem.get(0),"search_focus");
		});
		
		/***
		**输入框失去焦点
		**/
		this.input.blur(function(e){
			_this.elem.removeClass("focus");
		});
		
		/***
		**点击搜索
		**/
		this.icon.click(function(){
			if(_this.elem.hasClass("disabled")) return false;//如果是 disabled  不起作用
			fireEvent(_this.elem.get(0),"do_search");
		});
		/***
		** 回车键
		***/
		this.input.keyup(function(e){
			if(e.keyCode == 13){
				fireEvent(_this.elem.get(0),"do_search");
			}
		});
		/***
		** 里面输入内容发生改变
		**/
		this.input.on("input",function(e){
			e.stopImmediatePropagation();
			fireEvent(_this.elem.get(0),"search_input_change");
		});
		
		/***
		**点击 展开下拉菜单
		***/
		this.elem.find("span.search-drop").click(function(e){
			e.stopImmediatePropagation();
			if(_this.elem.hasClass("disabled")) return false;//如果是 disabled  不起作用
			_this.elem.find("ul.search-drop-wrapper").toggleClass("in");
			if(_this.elem.find("ul.search-drop-wrapper").hasClass("in")){
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
			_this.elem.find("ul.search-drop-wrapper").toggleClass("in");
			if(ind == _this.elem.find("span.selected-item").attr("index")) return false;	
			_this.elem.find("span.selected-item").text(txt).attr({"index":ind,val:txt});
			
			fireEvent(_this.elem.get(0),"search_scope_change",{index:ind,value:txt});
		});
		
		$(document).click(function(e){
			_this.elem.find("ul.search-drop-wrapper").removeClass("in");
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
		this.elem.append(this.wrapper);
	};

    Search.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		if(cfg.type == 2){
			this.peal = $("<span class='search-drop'/>");
			var txtbox = $("<span class='selected-item' />");
			this.peal.append(txtbox).append("<i class='drop-spliter'></i>");
			if(cfg.dropList && cfg.dropList.length>0){
				this.list = $("<ul  class='search-drop-wrapper fade'/>");	
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
        exchange.call(this,search);
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
		type:1,// 默认 2 带下拉菜单的
		magicon:"<i class='glyphicon glyphicon-search'></i>",
		placeholder:"",// 提示文字
		disabled:false,
		dropList:[]
	};
}(jQuery));

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
    
    function Sinput(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.sinput.defaults,element.data(),options);
		this._width = this.elem.width();
		this.init();	
    };
	/**
	**列表组件的初始化
	**/
    Sinput.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
      
		//事件
		this.input.on("focus",function(e){
			_this.elem.addClass("active");
		});
		this.input.on("blur",function(e){
			_this.elem.removeClass("active");
		});
		//icon 被点击
		if(_this.config.xion){
			_this.elem.find("span.xion-cus").click(function(){
				if($(this).hasClass("switcher")){
					if($(this).find("label>input[type=checkbox]").is(":checked")){
						$(this).find("label").addClass("active");
						_this.input.attr("type","text");
					}else{
						$(this).find("label").removeClass("active");
						_this.input.attr("type","password");
					}
				}
				fireEvent(_this.elem.get(0),"icon_click");
			});
		}
		
		if(_this.config.type==2){
			//加
			_this.stepup.click(function(e){
				var val = parseFloat(_this.input.val());
				val = val+_this.config.step;
				if(val>_this.config.max) val = _this.config.max;
				_this.input.val(val);
			});

			//减
			_this.stepdown.click(function(e){
				var val = _this.input.val();
				val = val - _this.config.step;
				if(val<_this.config.min) val=_this.config.min
				_this.input.val(val);
			});
			//是否提示用户，输入错误
			_this.input.keyup(function(e){
				if(/^[\-\.]?(\d+)?\.?(\d+)?$/.test($(this).val())){//数字
					if(_this.input.val()>_this.config.max){
						_this.input.val(_this.config.max);
					}else if(_this.input.val()<_this.config.min){
						_this.input.val(_this.config.min);
					}
					_this.elem.removeClass("warning");
				}else{//非数字
					_this.elem.addClass("warning");
				}
			});
		}
    };
	
	/**
	** 构建DOM
	**/
	Sinput.prototype.concrate = function(data){
		var _this = this;
		_this.elem.attr("tabindex","-1");//设置这个输入框可以选中，有焦点
		
		_this.input = $("<input type="+_this.config.inputType+" />");
		_this.elem.append(_this.input);
	};

    Sinput.prototype.initConfig = function(){
        var _this = this;
		var cfg = _this.config;
		if(cfg.placeholder) _this.input.attr("placeholder",cfg.placeholder);
		
		if(cfg.default) _this.input.val(cfg.default);
		//前缀或者后缀
		if(cfg.xion&&cfg.type!=2){
			var ru = this.elem.height();
			var xion = $(cfg.xion).addClass('xion-cus')
				.css({width:(ru-2)+"px",height:ru+"px",lineHeight:ru+"px"});
			if(cfg.pos=="left"){
				_this.elem.prepend(xion);
				_this.input.css({"left":ru+"px","paddingLeft":"0"});
			}else{
				_this.elem.append(xion);
				_this.input.css({paddingRight:"0"});
			}
			_this.input.css({"width":(this._width - ru)+"px"});
		}
		//stepper
		if(cfg.type==2){
			var defa = cfg.default||cfg.min||0;
			_this.stepwrapper = $("<span class='step-wrapper'></span>");
			_this.stepup = $("<i class='glyphicon glyphicon-triangle-top'></i>");
			_this.stepdown = $("<i class='glyphicon glyphicon-triangle-bottom'></i>");
			_this.stepwrapper.append(_this.stepup).append(_this.stepdown);
			_this.input.css("width",(_this._width-20)+"px");
			_this.elem.append(_this.stepwrapper);
			_this.input.val(defa);
		}
		
		if(cfg.title){
			_this.title = $("<em class='sinput-title'/>").text(cfg.title);
			_this.elem.append(_this.title);
		}
		
		if(cfg.disabled){
			_this.input.attr("disabled",true);
			_this.elem.attr("disabled",true);
		}
	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.sinput = function (options) {
		var the = this.first();
        var sinput = new Sinput(the, options);
        exchange.call(this,sinput);
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
	
	  var old = $.fn.sinput;
	  $.fn.sinput.Constructor = Sinput;
	  // sinput NO CONFLICT
	  // ===============
	  $.fn.sinput.noConflict = function () {
		$.fn.sinput = old;
		return this;
	  }	
	/***
	** outside accessible default setting
	**/
	$.fn.sinput.defaults = {
		type:"1",//类型 1,普通输入框，2 stepper
		title:"",//出现title 
		xion:"",//接受3种类型，bootstrap 里面的icon 接受小图片jpg, png，或者文字
		pos:"right",//默认图标放在最左边
		placeholder:"请输入文字",// 占位提示文字
		inputType:"text",//password,"float"  文本，数字，密码
		min:0,
		max:Infinity,
		step:1,
		default:null,
		disabled:false// 是否禁用
	};
}(jQuery));

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
    var rats = [];
	var sortString = '<div class="sort-direct">\
						<i class="glyphicon glyphicon-triangle-top"></i>\
						<i class="glyphicon glyphicon-triangle-bottom active"></i>\
					 </div>';
    function fill(arr,row){
		var args = arguments;
        if(arr instanceof Array){
            for(var i=0;i<arr.length;i++){
                var o = arr[i];
                var text = (typeof(o)=="string"||typeof(o)=="number")?o:(o.name||o.txt);
                if(args[2]){
					var col = $('<span class="ndp-table-col"><span class="head-txt">'+text+'</span></span>');
				}else{
					col = $('<span class="ndp-table-col">'+text+'</span>');
				}
				
                row.append(col);
            }
        }else{
            Object.keys(arr).forEach(function(item){
				if(args[2]){
					col = $('<span class="ndp-table-col"><span class="head-txt">'+arr[item]+'</span></span>');
				}else{
					col = $('<span class="ndp-table-col">'+arr[item]+'</span>');
				}    
                row.append(col);               
            });
        }	
        return row;
    }
	

    function Table(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.table.defaults,element.data(),options);
		this.init();	
    };
	
	/**
	**列表组件的初始化
	**/
    Table.prototype.init = function () {
        var self = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
		this.head = $("<ul>").addClass(this.config.headClass);//列表头
		this.body = $("<ul>").addClass(this.config.bodyClass);//列表的内容部分
		this.buildHead();//构建 列表头
		this.buildBody(this.config.data);//构建列表体
		this.elem.append(this.head).append(this.body);
		this.initConfig();
    };
	
	/***
	** 构建列表头部
	**/
	Table.prototype.buildHead = function(){
		var self = this;
        var count = 0;//列表头的 字符串的总长度
		var arr = this.config.head;
		this.textLen = [];
        if(arr instanceof Array){//如果 列表头是  数组
            for(var i=0;i<arr.length;i++){
                var o = arr[i];
				var len = (typeof(o)=="string")?o.length:(o.name||o.txt).length;
				self.textLen.push(len);
                count += len;
            }
        }else{//如果列表头是 {}  对象
            Object.keys(arr).forEach(function(item){
				len = arr[item].length;
				self.textLen.push(len);
                count += len;
            });
        }
		this.textLen.forEach(function(item,i){ self.textLen[i] = ((item/count)*100).toFixed(2)});
        this.head.append(fill(arr,$('<li class="ndp-table-row">'),1));
		if(this.config.sort == "all"){
			self.head.find("li.ndp-table-row>span").append(sortString);
		}else if(this.config.sort instanceof Array){
			this.config.sort.forEach(function(item){
				self.head.find("li.ndp-table-row>span:nth-child("+(item+1)+")")
						 .append(sortString);
			});
		}
		this.head.find("span.ndp-table-col:not(:nth-last-child(1))").append('<i class="col-spliter"></i>');
		this.textLen.forEach(function(item,index){
			self.head.find("span.ndp-table-col:nth-child("+(index+1)+")").css("width",item+"%");
		});		
	};

	/**
	** 构建列表体
	**/
	Table.prototype.buildBody = function(data){
		var self = this;
        for(var n=0;n<data.length;n++){
            var row = $('<li class="ndp-table-row">');
            if(this.config.activeRow>=0 && this.config.activeRow==n){
                row.addClass("active");
            }			
            var dat = data[n];
            self.body.append(fill(dat,row));
		}
		self.head.find("span.ndp-table-col").each(function(idx,item){
			var pec = parseFloat($(item).attr("style").match(/([\d.]+?)\%/i)[1]);
			self.body.find("span.ndp-table-col:nth-child("+(idx+1)+")").css("width",pec+"%");
		});		
	};
	
	/***
	** 根据用户设置的 设置列表拥有的能力，比如 点击行，点击列，拖动等
	**/
	Table.prototype.initConfig = function(){
		var self = this;
		var cfg = this.config;
		//设置列的样式
		if(cfg.colClass){
			this.elem.find("li>span.ndp-table-col").addClass(cfg.colClass);
		}
        //表头被点击，选中一列
        if(cfg.colNail){
            this.head.find("span.ndp-table-col").unbind("click").click(function(e){
                var index = $(this).index();
                self.elem.find("span.ndp-table-col").removeClass("active");
                self.elem.find("span.ndp-table-col:nth-child("+(index+1)+")").addClass("active");
            });
        }
        //默认选中一列
        if(cfg.colNail && cfg.activeCol>=0){
            this.head.find("li>span.ndp-table-col:nth-child("+(cfg.activeCol+1)+")").addClass("active");
            this.body.find("li>span.ndp-table-col:nth-child("+(cfg.activeCol+1)+")").addClass("active");
        }
		
        if(cfg.rowNail){
            this.body.find("li.ndp-table-row").unbind("click").click(function(){
                $(this).hasClass("active")?$(this).removeClass("active"):$(this).addClass("active");
                $(this).siblings().removeClass("active");
            });
        }
		
		if(cfg.listHeight && parseFloat(cfg.listHeight)){//如果超出边界，会出现纵向滚动条
			var rh = this.head.find("li.ndp-table-row").height()+2;	
			var h = (parseFloat(cfg.listHeight)-rh)
			this.body.css("height",h+"px");
			if(this.body.children().length*40>h){
				var w = this.body.width();
				this.body.find("li.ndp-table-row").width(w-15);
			}
		}
		
		// 列表可以按照 某一列进行排序
		if(cfg.sort){
			var keys = Object.keys(cfg.data[0]);	
			this.head.find(".sort-direct").unbind("click").click(function(e){
				var span = $(this).parent();
				var idx = span.index();//第几个 span
				span.siblings().find(".sort-direct>i.glyphicon-triangle-bottom").addClass("active");
				span.siblings().find(".sort-direct>i.glyphicon-triangle-top").removeClass("active");
				var ta = $(this).find(".glyphicon.active");
				ta.removeClass("active")
						.siblings("i.glyphicon").addClass("active");
				var asc = (ta.hasClass("glyphicon-triangle-bottom"))?false:true; 
				self.body.empty();
				if(!isNaN(cfg.data[0][keys[idx]])){
					cfg.data.sort(function(a,b){
						return asc?(a[keys[idx]] - b[keys[idx]]):(b[keys[idx]] - a[keys[idx]]);
					});
				}else{
					cfg.data.sort(function(a,b){
						return asc?b[keys[idx]].localeCompare(a[keys[idx]]):a[keys[idx]].localeCompare(b[keys[idx]]);
					});				
				}
				self.buildBody(cfg.data);
			});
		}
		/***
		** 拖动spliter 缩放表格宽度
		**/
		this.head.find("i.col-spliter").unbind("mousedown").mousedown(function(e){
			e.preventDefault();
			var the = $(this).parent();
			var nextCol = the.next();
			var preCol = the.prev();
			var index = the.index();
			var liw = self.elem.find("li.ndp-table-row").width();//行宽度
			self.elem.find("span.ndp-table-col:nth-child("+(index+1)+")").addClass("highLight");
			var next = self.elem.find("span.ndp-table-col:nth-child("+(index+2)+")");
			var the = self.elem.find("span.ndp-table-col:nth-child("+(index+1)+")");
			var all = [];
			self.head.find("span.ndp-table-col").each(function(idx,item){
				all.push(parseFloat($(item).attr("style").match(/([\d.]+?)\%/i)[1]));
			});
			$(document).unbind("mousemove").mousemove(function(e){
				var o = the.get(0).getBoundingClientRect();
				var no = next.get(0).getBoundingClientRect();
				var ntw = e.pageX - o.left;
				var nxw = no.right - e.pageX;
				if(ntw>80 && nxw>80 && Math.abs(e.pageX - o.right)>=1){//最小值是80px
					var val1 = ((ntw/liw)*100).toFixed(2);
					var val2 = (eval(all.concat().splice(index,2).join("+"))-val1).toFixed(2);
					the.css("width",val1+"%");
					next.css("width", val2+"%");
				}				
			});
		});
		$(document).unbind("mouseup").on("mouseup",function(){
			$("span.ndp-table-col.highLight").removeClass("highLight");
			$(document).unbind("mousemove");
		});			
	}


    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.table = function (options) {
		var the = this.first();
        new Table(the, options);
		return the;
    };
	
	
	  var old = $.fn.table;
	  $.fn.table.Constructor = Table;
	  // table NO CONFLICT
	  // ===============
	  $.fn.table.noConflict = function () {
		$.fn.table = old;
		return this;
	  }	
	
	/***
	** outside accessible default setting
	**/
	$.fn.table.defaults = {
        head:["col1","col2","col3","col4"],//列表头部列表,可以是 数组，也可以是 对象{name:"col1",name:"col2"}
        data:[], //列表项数据
		containerClass:"",
        headClass:"ndp-table-header",
        bodyClass:"ndp-table-body",
		colClass:"",//列样式
        rowNail:false,//是否允许 选中一行
        colNail:false,//是否允许 选中一列
        activeRow:NaN,//默认选中第几行
        activeCol:NaN,//默认选中第几列
		rowHeight:null,//列表每一行的高度  默认行高40px
		listHeight:null, //设置列表高度，或者修改 ndp-table-wrapper class的高度
		sort:null//“all” 所有列 都可以进行排序，【1，3，5】只有1，3，5列进行排序
	};
}(jQuery));

;(function ($) { 
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
	
	  var old = $.fn.tabs;
	  $.fn.tabs.Constructor = Tabs;
	  // Tabs NO CONFLICT
	  // ===============
	  $.fn.tabs.noConflict = function () {
		$.fn.tabs = old;
		return this;
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

;(function ($,win) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	var defaults = {
		holdon:30,//默认30秒后消失
		type:"info",//success,warning,danger
		through:true,// true 通栏
		close:false,
		content:"这里填写你想要展示的提示内容！~~"// 可以使文字，也可以是html
	};
	
	$(document).ready(function(){
		var pa = $(document.body);
		var tim = null;
		if(pa.find("div[class*='tip']").length==0){
			var elem = $("<div class='tip'><span class='icon-hold'></span><span class='content-hold'></span><span class='close-hold' aria-hidden='true'></span></div>");
			pa.prepend(elem);
		}
		
		win.showTip = function(options){
			var cfg = $.extend(true,{},defaults,options);
			if(tim) clearTimeout(tim);
			elem.removeAttr("style").removeAttr("class").addClass("tip");
			elem.find("span.close-hold").empty();
			elem.find("span.icon-hold").empty();
			elem.find("span.content-hold").html(cfg.content);
			if(cfg.close){
				elem.find("span.close-hold").html("&times;");
			}
			if(cfg.icon){
				elem.find("span.icon-hold").html(cfg.icon).css("margin-right","5px");
			}
			if(!cfg.through){
				elem.addClass("tip-spec");
				var w = elem.width();
				elem.css("margin-left",-(w/2)+"px");			
			}
			elem.addClass("alert alert-"+cfg.type);
			if(cfg.holdon && /^[\-\.]?(\d+)?\.?(\d+)?$/.test(cfg.holdon)){
				tim = setTimeout(function(){
					elem.css("opacity",0).removeClass("alert");
				},cfg.holdon*1000);				
			}
		}
		
		elem.find("span.close-hold").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			elem.css("opacity",0).removeClass("alert");
			if(tim) clearTimeout(tim);
		});
		
	});
}(jQuery,window));

;(function ($) {
    var self = this;    
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
				txtWrapper.html(text);
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
		console.log(this.config);
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
				var the = $(this).parent().find("input[type=checkbox]")
				if($(this).parent().hasClass("active")){
					the.prop("checked",true).parents("li").addClass("active");
				}else{
					the.removeAttr("checked").parents("li:not(.tree-leaf)").removeClass("active");
					var theLI = $(this).parent().parents("li:not(.tree-leaf)");
						theLI.removeClass("active").find("input[type=checkbox]:first").removeAttr("checked");
				}
			});
		}else{
			_this.elem.find("li.tree-leaf").unbind("click").click(function(e){
				_this.elem.find("li.tree-leaf").removeClass("active");
				$(this).addClass("active");	
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
        exchange.call(this,tree);
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
		joint:"<span>+</span><span>-</span>",//tree 关联处的 icon
		icon:"",// 前置的图标
		data:[],//生成树桩菜单，需要的数据
		subKey:null,//下一层数组的key
		textKey:null,//值key
		folder:null,
		file:null,
		checkbox:false
	};
}(jQuery));

;(function ($) {
    var self = this;    
	/***
	** 处理树桩菜单
	**/
	function recursive(arr,cfg,fa,deep){
		if(arr.length<=0) return;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='list-root' deep="+deep+"  />");
		if(deep>1) {
			ul.addClass("hide");
		}else{
			ul.addClass("list-deepest");
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var li = $("<li class='list-item' />");
			var txtWrapper = $("<span class='list-txt-wrapper' />");
			//txtWrapper.css({"padding-left":deep*10+"px"});
			li.append(txtWrapper);
			if(typeof(o)=="object"){
				var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group||o.children;
				var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
				txtWrapper.html(text);
				li.attr({"value":text,"deep":deep});
				if(array && array instanceof Array){
					if(cfg.expicon){
						li.attr("asparent",true);
						txtWrapper.append(cfg.expicon);
					}
					rec(array,cfg,li,deep);
				}else{
					li.addClass("list-leaf");
				}
			}else{
				txtWrapper.html(o);
				li.attr({"value":o,"deep":deep}).addClass("list-leaf");
			}
			ul.append(li);
		}
		fa.append(ul);
	}	
	/***
	** 构造函数
	**/
	function VList(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.vList.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();
		
    };
	/**
	**列表组件的初始化
	**/
    VList.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

		
		/**
		** 点击非叶子节点
		**/
		_this.elem.find("li[asparent]:has(ul)").click(function(e){
			e.stopImmediatePropagation();
			$(this).toggleClass("active").children("ul.list-root").toggleClass("hide");
		});
		
		/***
		**点击叶子
		**/	
		_this.elem.find("li.list-leaf").click(function(e){
			e.stopImmediatePropagation();
			_this.elem.find("li.list-leaf").removeClass("active");
			$(this).parents("li[asparent].active").addClass("focus");
			$(this).addClass("active");
			if($(this).parent().hasClass('list-deepest')){
				var the = $(this).siblings("li[asparent]").removeClass("active focus");
				the.find("li[asparent].active").removeClass("active").removeClass("focus");
				the.find("ul").addClass("hide");
			}else{
				the = $(this).parents("li[deep='1']").siblings("li");
				the.find("ul").addClass("hide");
				the.removeClass("active focus");
				the.find("li").removeClass("active").removeClass("focus");
				var deep = $(this).attr("deep");
				$(this).parent().parent().siblings("li[asparent]").removeClass(" active").removeClass("focus").children("ul").addClass("hide");
				$(this).siblings("li").removeClass("active").removeClass("focus").children("ul").addClass("hide");
			}
		});
    };
	
	/**
	** 构建下来菜单样子
	**/
	VList.prototype.concrate = function(data){
		var _this = this;
		var cfg = _this.config;
		recursive(cfg.data,cfg,_this.elem,0);
	};

    VList.prototype.initConfig = function(){
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
    /**
	* 入口
     */
    $.fn.vList = function (options) {
		var the = this.first();
        var vList = new VList(the, options);
        exchange.call(this,vList);
		return the;
    };	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(vList){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){    
        }
    }
	
	  var old = $.fn.vList;
	  $.fn.vList.Constructor = VList;
	  // vList NO CONFLICT
	  // ===============
	  $.fn.vList.noConflict = function () {
		$.fn.vList = old;
		return this;
	  }	
	/***
	** outside accessible default setting
	**/
	$.fn.vList.defaults = {
		data:[],
		expicon:"<i class='glyphicon glyphicon-menu-right'></i>",
		leaficon:"<i class='glyphicon glyphicon-list-alt'></i>"
	};
}(jQuery));
