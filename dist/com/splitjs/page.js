;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	var Static = {option:{}};
	
    /**
    **下拉菜单展示的方向问题
    **/
    function setDirect(ta){
        var peal = ta.dropwrapper||ta.find(".drop-wrapper"); // 下来菜单所在的盒子
        var dp = (ta.dropwrapper && ta.dropwrapper.find("ul.page-dropdown"))||ta.find("ul.page-dropdown"); //下来菜单本身
        var ls = dp.get(0).getBoundingClientRect();
		var p = peal.get(0).getBoundingClientRect();
		if((window.innerHeight-p.bottom)>ls.height){//下面容得下 下拉菜单的展示，正常
			dp.removeAttr("style");
			peal.find("i.glyphicon-triangle-bottom").removeClass("turnback");
		}else if(p.top>ls.height){//向上展示
			dp.css({"top":-(ls.height)+"px"});
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
			fireEvent(_this.elem.get(0),"PAGE_CHANGE",{currentPage:parseInt(current)});
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
			fireEvent(_this.elem.get(0),"PAGE_CHANGE",{currentPage:page});
		});		
	}
	
    
    function Page(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.page.defaults,element.data(),options);
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
		if(_this.config.type ==2 || _this.config.type == 3){
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
				var per = parseInt($(this).text());
				if(_this.pagetext.text()!=per){
					_this.pagetext.text(per);_this.num.html(per);
					_this.config.perPage = parseInt(per);//每页显示多少条
					_this.config.totalPages = Math.ceil(_this.config.totalItems/_this.config.perPage)
					buildPageList(_this);
					//currentPage 当前页，perpage ： 没页显示多少条
					fireEvent(_this.elem.get(0),"SHOW_ITEMS_CHANGE",{currentPage:1,perpage:per});//
				}
			});
		}
		if(_this.config.type ==4){
			_this.elem.find(".drop-wrapper").click(function(e){
				e.stopImmediatePropagation();
				$(this).find("ul").toggleClass("hidden");
				setDirect(_this.elem);
			});
			
			/***
			**  页数项 被点击
			***/
			_this.elem.find(".drop-wrapper>ul>li").click(function(e){
				$(this).parents(".drop-wrapper:first").find(".text-show").text("第" + $(this).attr("val") + "页");
				$(this).addClass("active").siblings().removeClass("active");
				var p = parseInt($(this).attr("val"));
				fireEvent(_this.elem.get(0),"PAGE_CHANGE",{currentPage:p});
			});
			
			//上一页 按钮 点击
			_this.elem.find(".pre-page").click(function(e){
				e.stopImmediatePropagation();
				var the = _this.elem.find(".drop-wrapper>ul>li.active");
				var n = parseInt(the.attr("val"));
				if(n>1){
					n = n - 1;
					the.removeClass("active").prev().addClass("active");
					_this.elem.find(".text-show").text("第" + n + "页");
				}
				fireEvent(_this.elem.get(0),"PAGE_CHANGE",{currentPage:n});
			});
			
			
			//下一页 按钮 点击
			_this.elem.find(".next-page").click(function(e){
				e.stopImmediatePropagation();
				var the = _this.elem.find(".drop-wrapper>ul>li.active");
				var max = parseInt(_this.elem.find(".drop-wrapper>ul>li:last").attr("val"));
				var n = parseInt(the.attr("val"));
				if(n<max){
					n = n + 1;
					the.removeClass("active").next().addClass("active");
					_this.elem.find(".text-show").text("第" + n + "页");
				}
				fireEvent(_this.elem.get(0),"PAGE_CHANGE",{currentPage:n});
			});
		};
		
		$(document).click(function(e){
			_this.elem.find(".drop-wrapper>.page-dropdown").addClass("hidden");
		});
		
    };
	
	/**
	** 构建下来菜单样子
	**/
	Page.prototype.concrate = function(){
		var _this = this;
		var cfg = _this.config;
		if(cfg.type==2 || cfg.type == 3){
			if(cfg.defItems>=cfg.perPages.length) cfg.defItems = 0;// 默认选择下拉菜单的第一项
			_this.pagetext = $("<span class='page-choosed-text'/>").html(cfg.perPages[cfg.defItems]);//显示当前选定的 每页显示的条数
			_this.dropwrapper = $("<span class='page-drop-list'/>");
			var more = $("<i class='glyphicon glyphicon-menu-hamburger' />");
			var down = $("<i class='glyphicon glyphicon-triangle-bottom' />");
			var drop = $("<ul class='page-dropdown hidden'/>");//
			_this.num = $("<div class='page-now' />").text(cfg.perPages[cfg.defItems]);
			if(cfg.type==2){
				_this.dropwrapper.append(more).append(down);
			}else if(cfg.type==3){
				_this.dropwrapper.append(_this.num).append(down);
			}
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
			if(cfg.type==2){
				_this.elem.append(_this.pagetext).append(_this.dropwrapper);
			}else if(cfg.type==3){
				_this.elem.append(_this.dropwrapper);
			}
		}
		if(cfg.type<4) buildPageList(_this);
		
		if(cfg.type==4){
			var pre = $("<span class='pre-page' />").html(cfg.pre);
			var drop = $("<ul class='page-dropdown hidden' />");
			var dropbox = $("<span class='drop-wrapper' />").append("<div class='text-show'></div>").append(drop);
			var next = $("<span class='next-page' />").html(cfg.next);
			if(cfg.currentPage||1) dropbox.find(".text-show").text("第"+(cfg.currentPage||1)+"页");
			for(var i=1;i<=cfg.totalPages;i++){
				var li = $("<li index="+i+"  val="+i+" >第"+i+"页</li>");
				if(cfg.currentPage == i) li.addClass("active"); 
				drop.append(li);
			};
				
			_this.elem.append(pre).append(dropbox).append(next).addClass("special");
		}
	};

    Page.prototype.initConfig = function(){
        var _this = this;
		var cfg = _this.config;
		var cp = _this.config.currentPage||1;
		if(cfg.type!=4 && (cfg.currentPage||1)){
			_this.list.find("li.page-item[value="+cp+"]").addClass("active");			
		}
		
		if(cfg.type==2 && cfg.perPage){
			_this.pagetext.text(cfg.perPage);
		}
    }
	
	/***
	** 设置 具体的页数
	**@params {int} num
	***/
	Page.prototype.setpage = function(num){
		var total = this.config.totalPages;
		
	};
	
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
        the = $.extend(true,{},the,new exchange(page));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Page} page :  instacne of the plugin builder
    **/
    function exchange(page){
		/***
		** 设置 第几页
		***/
		this.val = function(num){
			var num = parseInt(num)||1; //默认第一页
			//设置 显示到第几页
			page.setpage(num);
			return page.elem;
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
		type:1,//1 普通分页，2 每页显示多少条的分页 3,页数下拉菜单，4 类似微博的翻页控件
		begin:"<i class='glyphicon glyphicon-step-backward'></i>",//第一页
		end:"<i class='glyphicon glyphicon-step-forward'></i>",//最后一页
		totalPages:1,//总共有多少页
		currentPage:1,//默认显示第一页
		perPage:10,//每页显示多少条
		defItems:0,//默认每页展示多少条，下来数组中的第几个选项，必须和perPages联用
		perPages:[10,20,30],//每页显示条数选择区间
		totalItems:0,//总共有多少条数据  如果这个数据存在，则totalPages 的数据就不用了，使用这里计算的结果	
		pre:"上一页",
		next:"下一页"
	};
}(jQuery));
