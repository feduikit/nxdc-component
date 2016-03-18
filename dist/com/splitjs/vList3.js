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
			txtWrapper.css({"padding-left":(deep*30)+"px"});
			li.append(txtWrapper);
			if(typeof(o)=="object"){
				var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group||o.children;
				var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
				var value = o.val||o.value||text;
				var did = o.id;
				var ty = o.type;
				if(o.parent) li.attr("data-path",o.parent.split(">").join("#"));
				txtWrapper.html(text).attr({"title":text});
				li.attr({"data-name":text,"data-text":text,"deep":deep,"data-id":did,"data-val":value,"data-type":ty,"data-size":o.audienceSize});
				if(o.audienceSize) txtWrapper.append("<span class='aud-size'>"+(o.audienceSize)+"</span>");
				if(o.search) {
					txtWrapper.addClass("do-search");
					txtWrapper.append('<span class="glyphicon glyphicon-search v-search"></span>');
				}
				if(array && array instanceof Array){
					li.attr("asparent",true);
					txtWrapper.append(cfg.expicon);
					rec(array,cfg,li,deep);
				}else{
					li.addClass("list-leaf");
				}
			}else{
				txtWrapper.html(o);
				li.attr({"data-text":o,"data-val":o,"deep":deep}).addClass("list-leaf");
			}
			ul.append(li);
		}
		fa.append(ul);
	}	
	/***
	** 构造函数
	**/
	function VList3(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.vList3.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();
		
    };
	/**
	**列表组件的初始化
	**/
    VList3.prototype.init = function () {
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
		_this.elem.find("li.list-leaf:not(:has(.do-search))").click(function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			if($(this).hasClass("selected")) return false;
			$(this).addClass("active");
			var the = $(this);
			fireEvent($(this).get(0),"ITEM_CLICK",the.data());
			$(this).addClass("selected");
		});
		
		/***
		** 点击需要 "搜索" 的东西
		***/
		_this.elem.find("li.list-leaf:has(.do-search)").click(function(e){
			_this.sepanel.removeClass("hidden");
			_this.elem.addClass("search-mode");
			var the = $(this);
			var _data = the.data();
			_data.search = true;
			fireEvent($(this).get(0),"ITEM_CLICK",_data);
		});
		
		/***
		** 点击search 部分
		***/
		_this.sepanel.click(function(e){
			e.stopImmediatePropagation();
		});
	
		_this.sepanel.find(".btn-search").click(function(e){
			_this.searchx.clear();
			fireEvent(_this.elem.get(0),"RETURN_BACK");
		});
		
    };
	
	/**
	** 构建下来菜单样子
	**/
	VList3.prototype.concrate = function(data){
		var _this = this;
		var cfg = _this.config;
		recursive(cfg.data,cfg,_this.elem,0);
		_this.sepanel = $("<div class='search-panel hidden' data-content='这里填写你想提示的内容' />");
		_this.searchx = $("<div class='ndp-search-wrapper'  />").search({
			type:3,
			clickhide:false,
			ajaxOptions: _this.config.ajaxOption,
			rowdec:function(o,index,val1){
				var txt = (typeof(o)=="string")?o:(o.text||o.label||o.name);
				var val = o.val || o.value || txt;
				var id = o.id;
				var asize = o.audienceSize||o.audience_size;
				return  '<li  class="search-row-cus" data-val="'+val+'" data-type="'+ o.type +'" data-id="'+id+'" data-text="'+txt+'" data-name="'+txt+'" data-path="'+(o.path.join("#").replace(/\s/g,""))+'" data-size="'+asize+'" index="'+index+'" tabIndex="'+index+'"><a href="#">'+(val1||txt)+'</a><span class="aud-class">'+asize+'</span></li>';
			}
		});
		_this.sepanel.append(_this.searchx).append("<button class='btn btn-default btn-search'>返回列表</button>");
		_this.elem.append(_this.sepanel);
	};

    VList3.prototype.initConfig = function(){
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
    $.fn.vList3 = function (options) {
		var the = this.first();
        var vList = new VList3(the, options);
        the = $.extend(true,{},the,new exchange(vList));
		return the;
    };	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(vList3){
		
		this.fold = function(){
			vList3.elem.find("li.list-item.active").removeClass("active");
			vList3.elem.find("li>ul.list-root").addClass("hide");
			return vList3.elem;
		};
		
		/***
		** hide search panel
		***/
		this.hspanel = function(){
			vList3.sepanel.addClass("hidden");
			vList3.elem.removeClass("search-mode");
			vList3.searchx.clear();
			return vList3.elem;
		};
		
		/***
		** 更新 搜索用的ajax
		***/
		this.updateOption = function(o){
			vList3.config.ajaxOption = o;
			vList3.searchx.updateOption(o);
			return vList3.elem;
		};
		
		//更新 搜索时，放大镜下面的文字
		this.updateTip = function(txt){
			vList3.sepanel.attr("data-content",txt);
			return vList3.elem;
		}
    }
	
	  var old = $.fn.vList3;
	  $.fn.vList3.Constructor = VList3;
	  // vList NO CONFLICT
	  // ===============
	  $.fn.vList3.noConflict = function () {
		$.fn.vList3 = old;
		return this;
	  }	
	/***
	** outside accessible default setting
	**/
	$.fn.vList3.defaults = {
		data:[],
		expicon:"<i class='glyphicon glyphicon-menu-right'></i>",
		ajaxOption: {
				type: "GET",
				url: "../data/search.json"
		}
	};
}(jQuery));
