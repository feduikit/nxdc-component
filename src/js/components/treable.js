/***
 ** sutable  plugin
 **@author ericever
 ***/
;(function ($) {
	var self = this;
	function newbody(fa,arr,cfg,deep){
		var deep = arguments[3]||0;
		var gap = arguments[4]||5;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul role='table' />");
		if(deep>1){
			ul.addClass("sub-layer");
		}else{
			ul.addClass("treable-body");
			var root = fa;
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group;
			var cols = o[cfg.textKey]||o.text||o.label||o.title||o.name;
			var id = o.id;
			var li = $("<li class='treable-item'  deep="+deep+" />");
			if(id){
				li.attr('data-id',id);
			}
			var wrapper = $('<div class="treable-row-wrapper">');
			var row = $('<div class="treable-row" deep='+deep+'></div>');
			if(deep==1){//对第一级加租
				row.addClass('treable-row-wrapper-parent');
			}
			//添加 弹出下拉菜单，点击money 符号的时候
			var html = $('<ul class="dropdown-menu dropdown-menu-money hidden" />');
			cfg.todata.forEach(function(item,index){
				var txt = item.name||item.label||item.text||item;
				var val = item.val||item.value||txt;
				var id = item.id;
				var li = '<li data-id='+id+' data-name='+txt+' data-val='+val+' ><a href="javascript:void(0)">'+txt+'</a></li>';
				html.append(li);
			});
			row.append(html);
			var chartWrapper = $("<div class='chart-wrapper' data-id="+id+" />");//图表层
			var chartClose = '<button type="button" class="close chart-close"><span aria-hidden="true">&times;</span></button>';//图标层关闭按钮
			var chart = $('<div class="ndp-tab-wrapper" deep='+deep+' index='+i+' role="table" />');
			chart.tabs({list:cfg.tabs});//图表层上面的 tabs 初始化
			var panels = $("<div class='tab-content tab-content-cus' />");
			cfg.tabs.forEach(function(item,index){
				var panel = $('<div role="tabpanel" class="tab-pane "  data-name='+item.name+' data-type='+item.type+' />');
				if(index==0) panel.addClass("active");
				panels.append(panel);
			});
			chartWrapper.append(chart).append(panels).append(chartClose);//显示到层上
			wrapper.append(row).append(chartWrapper);
			cols.forEach(function(col,idx){
				var switcher = '<span class="switcher">\
					<label class = "active" ><input type = "checkbox" class = "scheckbox"> </label></span>';
				var column = $('<span class="sutable-col" col='+idx+' />');
				if(cfg.colDims&&cfg.colDims.length){
					column.css("width",cfg.colDims[idx]+"px");
				}
				if(idx==0) {
					column.addClass("sutable-col-status");
					column.html(switcher);
					if(typeof(col)=="object" && col.status===false){
						column.find('[type="checkbox"]').attr("checked",false);
						column.find('label.active').removeClass('active');
						if (col.disabled){
							column.find('.switcher').addClass("disabled");
						}

					}
				}else if(idx==1){
					column.addClass("sutable-col-name");
				}
				if(idx>0){
					if(typeof(col)=="object"){
						var val = col.label||col.text||col.name;
						column.attr({"data-val":val,title:val}).html(val);
						if(idx == 1){
							column.append("<i class='font-icon font-icon-money'></i>");
						}
					}else{
						column.attr({"data-val":val,"title":val}).html(col);
					}
				}
				row.append(column);
			});

			if(array && array instanceof Array){
				var html = $('<span class="btn-plus-minus" />');
				if(cfg.caret){
					html.html(cfg.caret).addClass("custom-caret");
				}else{
					html.html('<i class="line-hor"></i><i class="line-ver"></i>');
				}
				li.append(html).append(wrapper).addClass("open");//row
				rec(li,array,cfg,deep);
			}else{
				li.append(wrapper);//row
			}
			ul.append(li);
		}
		if(ul.hasClass("treable-body")){
			return ul;
		}else{
			fa.append(ul);
		}
	};
	var Help = {
		recursive:function(fa,arr,cfg,deep){
			var ul = newbody(fa,arr,cfg,deep);
			fa.append(ul);
		},
		fixPageXY: function(the){
			var html = document.documentElement;
			var body = document.body;
			var the = (the.get(0)||the).getBoundingClientRect();
			var a = {};
			a.pageX = parseFloat(the.left) + (html.scrollLeft || body && body.scrollLeft || 0);
			a.pageX -= html.clientLeft || 0;

			a.pageY = parseFloat(the.top) + (html.scrollTop || body && body.scrollTop || 0);
			a.pageY -= html.clientTop || 0;

			a.pageYB = a.pageY + the.height;
			return a;
		}
	};


	function Treable(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.treable.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();
	};
	/***
	 **	横向滚动条
	 ***/
	Treable.prototype.scrollV = function(){
		var _this = this;
		_this.elem = $('.ndp-treable-wrapper');
		var sdim = _this.scroll.get(0).getBoundingClientRect();//上下左右
		var thumb = _this.elem.find(".horiz-thumb");
		var tdim = thumb.get(0).getBoundingClientRect();
		var w = this.elem.width(); // 不包括border的宽度
		var colW = 41;//41 margin-left:41    10 border-right
		$('.treable-header .sutable-col').each(function(index,item){
			colW += $(item).get(0).getBoundingClientRect().width;
		});
//		colW = colW + eval(_this.config.colDims.join("+"));//获得内部内容的总宽度
//		console.log(colW + ":" + w);
		if(tdim.left<sdim.left){
			thumb.css("left",sdim.left+"px");
		}else if(tdim.right>sdim.right){
			thumb.css("left",(sdim.right-sdim.width)+"px");
		}
		_this.scroll.toggleClass("show",colW>w?true:false).css("width",w+"px");
		_this.elem.find(".set-scroll").toggleClass("show-set-scroll",colW>w?true:false).css("width",w+"px");
		_this.elem.toggleClass("extend",colW>w?true:false)
		if(colW>w){
//			thumb.css("width",(w/colW)*100+"%");
			thumb.css("width",(w-colW+w)+"px");
		}else{

		}

		$(_this.config.scrollDOM).trigger("scroll");
	};
	/****
	 ** body  row,col,caret 的监听
	 ***/
	Treable.prototype.listenBody = function(){
		var _this = this;
		/***
		 ** 关闭图表层
		 ***/
		_this.elem.find("button.close.chart-close").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			$(this).parents(".chart-wrapper.open:first").removeClass("open");
		});
		/***
		 **事件  收起/展开按钮  树桩菜单的 展开/收起
		 **/
		_this.elem.find("span.btn-plus-minus").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			var the = $(this).parents("li.treable-item:first");
			the.find('.chart-wrapper.open:first').removeClass("open");//关闭图表层
			the.toggleClass("open");
			the.find("li.treable-item").toggleClass("open",the.hasClass("open"));
			$(_this.config.scrollDOM).trigger("scroll");
		});

		_this.elem.find(".sutable-col-status>.switcher").click(function(e){
			e.stopImmediatePropagation();
		});
		/***
		 **状态的打开/关闭
		 ***/
		_this.elem.find(".sutable-col-status>.switcher>label>input").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			var the = $(this).parent();
			if(the.parent().hasClass('disabled')){//如果 switcher 有 disabled,则返回
				return;
			}
			if (_this.config.switcherDisable && !$(this).attr("checked")){
				the.parent().addClass('disabled')
			}
			the.toggleClass("active");
			//只更改自己状态
			//if(!the.hasClass("active")){
			//	var fa = $(this).parents(".treable-item:first");
			//	fa.find("ul .switcher>label").removeClass("active");
			//}
			$(this).trigger('STATUS_UPDATE');
			fireEvent(_this.elem.get(0),"STATUS_CHANGE",{status:the.hasClass("active"), dataId : $(this).parents(".treable-item").attr("data-id")});
		});

		// 点击 选中一行， 显示 toolbar   2016-4-8 取消
//		_this.elem.find(".treable-row-wrapper>.treable-row").unbind("click").click(function(e){
//			e.stopImmediatePropagation();
//			if(!$(this).hasClass("focus")){
//				_this.elem.find(".treable-row-wrapper>.treable-row.focus").removeClass("focus");
//				$(this).addClass("focus");
//			}else{
//				$(this).removeClass("focus");
//			}
//			_this.toolbar.toggleClass("active",$(this).hasClass("focus"));
//		});

		/***
		 ** 鼠标离开一行
		 ****/
		_this.elem.find(".treable-row-wrapper>.treable-row").unbind("mouseleave").mouseleave(function(e){
			$(this).find(".dropdown-menu-money").addClass("hidden");
		});

		//事件不再抛出来， 图标区域内的
		_this.elem.find(".tab-content.tab-content-cus").unbind("click").click(function(e){
			e.stopImmediatePropagation();
		});

		//打开的 图表层，关闭
		_this.elem.unbind("click").click(function(e){
			$(this).find(".chart-wrapper.open").removeClass("open");
		});
		/***
		 ** 点击了，下拉菜单中的选项
		 ***/
		_this.elem.find(".treable-row>.dropdown-menu-money>li").click(function(e){
			e.stopImmediatePropagation();
			$(this).parent().addClass("hidden");
			var the = $(this);
			var id = the.data("id");
			var val = the.data("val");
			if(id=="chart"){
				_this.elem.find(".chart-wrapper.open").removeClass("open");
				$(this).parents(".treable-row:first").siblings(".chart-wrapper").addClass("open");
			}
			var dataid = $(this).parents("li.treable-item[deep]").data("id");
			var o = $(this).data();
			o.dataID = dataid;
			fireEvent(_this.elem.get(0),"TOOLBAR_CLICK",o);
			var dat = _this.config.todata[1];
			dat.dataID = dataid;
			dat.GD = _this.elem.find(".treable-item .chart-wrapper.open .tab-pane.active");//折叠后无法显示绘图区域的bug
			setTimeout(function(){
				fireEvent(_this.elem.get(0),"CHART_LAYER_INIT",dat);//展现完成，抛出数据
			},400);
		});

		/***
		 **
		 ****/
		_this.elem.on("TAB_CHANGE",function(e){
			e.stopImmediatePropagation();
			var dat = e.originalEvent.data;
			var panels = _this.elem.find(".treable-item .chart-wrapper.open .tab-pane");//无法抛出gd的bug
			panels.removeClass("active");
			$(panels[dat.index]).addClass("active");
			dat.GD = $(panels[dat.index]);
			fireEvent(_this.elem.get(0),"TAB_SHOW",dat);
		});


		/***
		 ** 点击  toolbar  看图表 button 被点击 触发
		 ***/
		_this.elem.find("button[data-id=chart]").unbind("click").click(function(e){
			_this.elem.find(".treable-row-wrapper>.treable-row.focus+.chart-wrapper").addClass("open");
			_this.elem.find(".treable-row-wrapper>.treable-row:not(.focus)+.chart-wrapper.open").removeClass("open");//关闭其他的
		});


		//点击 文字旁边的 钱 icon
		_this.elem.find("i.font-icon-money").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			var dp = $(this).parents(".treable-row:first").find(".dropdown-menu-money").toggleClass("hidden");
			dp.css("opacity",0);
			var icon = Help.fixPageXY($(this));
			var offParent = Help.fixPageXY($(this).parents(".treable-row:first"));
			var x = icon.pageX - offParent.pageX;
			setTimeout(function(){
				dp.removeAttr("style");
				//
				dp.css({"top":(icon.pageY + 15) + "px","left":(icon.pageX+15)+"px"});
			});
			$(this).trigger('DROPDOWN_MENU_MONEY_SHOW', {dom:dp});
		});
	};

	/**
	 **列表组件的初始化
	 **/
	Treable.prototype.init = function () {
		var _this = this;
		this.concrate();//构建下来菜单的样子
		this.initConfig();

		_this.elem.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响
		_this.scroll.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响

		/***
		 ** 表头 某一列的排序按钮被点击
		 ***/
		_this.head.find(".sort-wrapper").click(function(e){
			e.stopImmediatePropagation();
			var fa = $(this).parent();
			$(this).children().toggleClass("hi");
			var siblings = fa.siblings();
			siblings.find(".sort-wrapper").children("i").removeClass("hi");
			siblings.find(".sort-wrapper").children("i.glyphicon-triangle-bottom").addClass("hi");
			var sort = $(this).find('.hi').hasClass('glyphicon-triangle-top') ? 'up' : 'down';
			fireEvent(_this.elem.get(0), "SORT_CLICK", {col: fa.attr("col"), val: fa.text(), sort: sort});
		});
		/***
		 **鼠标按下 列缩放
		 ***/
		_this.elem.find("span.inspliter").mousedown(function(e){
			var column = $(this).parent();
			var c = parseInt(column.attr("col"));
			var theCol = $(".sutable-col[col="+c+"]");
			var minw = window.getComputedStyle(theCol.get(0)).minWidth;
			var the = $(this).get(0).getBoundingClientRect();
			var el = _this.elem.get(0).getBoundingClientRect();
			var start = (the.left-el.left + the.width);
			_this.elem.find(".split-line").css("left",(start-1)+"px").addClass("active");
			_this.elem.addClass("resize-cursor");
			_this.elem.unbind("mousemove").mousemove(function(e){
				e.stopImmediatePropagation();
				var end = e.clientX - el.left - 2;
				var w = e.clientX - column.get(0).getBoundingClientRect().left-0.4;
				$(this).find(".split-line").css("left",end+"px");
				if(start<end){//拉大
					//_this.elem.css("width",(_this.elem.width()+gap)+"px");
					theCol.css("width",w + "px");
				}else{//缩小
					var d = (parseInt(c)+1);
					var next = $(".sutable-col[col="+d+"]");
					theCol.css("width",w + "px");
				}
				_this.config.colDims[c] = w;
			});
		});
		/***
		 **离开这个区域了
		 **/
		_this.elem.mouseleave(function(e){
			e.stopImmediatePropagation();
			$(this).unbind("mousemove");
			_this.elem.trigger("RESIZE_DONE");//鼠标拖动resize 列宽完成
		});
		/**
		 **鼠标释放
		 **/
		_this.elem.mouseup(function(e){
			e.stopImmediatePropagation();
			_this.elem.removeClass("resize-cursor");
			_this.elem.find(".split-line").removeClass("active");
			_this.elem.unbind("mousemove");
			_this.scrollV();// 是否显示横向滚动条
			_this.elem.trigger("RESIZE_DONE");//鼠标拖动resize 列宽完成
			var w1 = eval(_this.config.colDims.join("+"));//获得宽度
			_this.elem.find(".chart-wrapper").css("width",(w1+5)+"px");
		});


		/*****
		 ** 横向滚动条拖动  thumb 拖动
		 ****/
		_this.elem.off("mousedown", ".horiz-thumb").on("mousedown", ".horiz-thumb", function(e){
//			e.stopImmediatePropagation();
			var thumb = $(this);
			var sdim = _this.scroll.get(0).getBoundingClientRect();
			var start = e.clientX;
			_this.elem.off("mousemove", ".horiz-scroll").on("mousemove", '.horiz-scroll', function(e){
				e.stopImmediatePropagation();
				var tdim = thumb.get(0).getBoundingClientRect();
				var end  = e.clientX;
				var m = end - start;
				start = end;
				thumb.css("left",(tdim.left - sdim.left +m)+"px");
				/***
				 ** 超出边界的控制
				 ***/
				if(tdim.left<sdim.left){
					thumb.css("left",0);
				}else if(tdim.right>sdim.right){
					thumb.css("left",(sdim.right-tdim.width - sdim.left)+"px");
				}

				var w = tdim.left - sdim.left; if(w<0) w = 0;

				_this.elem.children("[role=table]").css("left",-w+"px");
			});
		});
		_this.elem.off("mouseleave", ".horiz-scroll").on("mouseleave", '.horiz-scroll', function(e){
			//_this.scroll.unbind("mousemove");
			var lf = _this.scroll.find(".horiz-thumb").css("left");
			_this.scroll.find(".horiz-thumb").css("left",lf+"px");
		});

		/****
		 ** 横向滚动条
		 ****/
		_this.elem.off("mouseup",".horiz-scroll").on("mouseup", '.horiz-scroll', function(e){
			//_this.scroll.unbind("mousemove");
			var thumb = $(this).children(":first");
			var dim1 = $(this).get(0).getBoundingClientRect();
			var dim2 = thumb.get(0).getBoundingClientRect();
			if(dim2.right>=dim1.right){
				var l = (dim1.right - dim2.width) - dim1.left;
				thumb.css("left",l+"px");
			}else if(dim2.left<=dim1.left){
				thumb.css("left",0);
			}
		});

		/***
		 ** 点击滚动条空白处
		 ***/
		_this.elem.off("click",".horiz-scroll ").on("click",'.horiz-scroll',  function(e){
			e.stopImmediatePropagation();
			var thumb = $(this).find(".horiz-thumb");
			var tdim = thumb.get(0).getBoundingClientRect();
			var sdim = $(this).get(0).getBoundingClientRect();
//			if(e.clientX>=tdim.left){
//				thumb.css("left",(tdim.left - sdim.left + 20)+"px");
//			}else{
//				thumb.css("left",(tdim.left - sdim.left - 20)+"px");
//			}
			/***
			 ** 超出边界的控制
			 ***/
			if(tdim.left<sdim.left){
				thumb.css("left",0);
			}else if(tdim.right>sdim.right){
				thumb.css("left",(sdim.right-tdim.width - sdim.left)+"px");
			}

			var w = tdim.left - sdim.left; if(w<0) w = 0;
			_this.elem.children("[role=table]").css("left",-w+"px");
		});

		/***
		 ** 点击工具栏按钮，发出事件。 2016-4-8号 不再显示toolbar
		 ***/
//		$(".sutable-toolbar").click(function(e){
//			var ta = $(e.target);
//			var id = ta.data("id");
//			var val = ta.data("name");
//			var dataID = _this.elem.find("li.treable-item:has(.treable-row.focus)").data("id");
//			if(id && val){
//				fireEvent(e.target,"TOOLBAR_CLICK",{id:id,name:id,dataID:dataID});
//			}
//		});

		//body 里面的监听
		_this.listenBody();


		$(window).resize(function(e){
			_this.config.wi = _this.elem.width();
			_this.allocate(_this.config.wi);
			$(_this.config.scrollDOM).trigger("scroll");
		});

		$(_this.config.scrollDOM).scroll(function(e){
			//横向滚动条
			if (_this.scroll.offset().top + _this.scroll.height()> $(window).height()){
				_this.elem.find(".set-scroll").length == 0 ? _this.elem.append( _this.scroll.clone(true).addClass('set-scroll' ).removeAttr("visibility") ) : '';
				_this.elem.find(".set-scroll").show();
				_this.scroll.css("visibility", "hidden");
			} else {
				_this.elem.find(".set-scroll").hide();
				_this.scroll.css("visibility", "visible");
			}

			//表底
			if (_this.foot.offset().top + _this.foot.height()> $(window).height()){
				_this.elem.find(".set-foot").length == 0 ? _this.elem.append( _this.foot.clone( false ).addClass('set-foot' ).removeAttr("visibility") ) : '';
				_this.elem.find(".set-foot").show();
				_this.foot.css("visibility", "hidden");
			} else {
				_this.elem.find(".set-foot").hide();
				_this.foot.css("visibility", "visible");
			}

		});

		$(_this.config.scrollDOM).trigger("scroll");
	};

	/**
	 ** 构建下来菜单样子
	 **/
	Treable.prototype.concrate = function(){
		var _this = this;
		this.toolbar = $("<div class='sutable-toolbar' role='table' />");
		this.head = $("<ul class='treable-header' role='table' />").html('<li class=" treable-row"></li>');
		this.elem.append("<span class='split-line'></span>");
		this.elem.append(this.toolbar).append(this.head);
	};

	Treable.prototype.initConfig = function(){
		var _this = this;
		var cfg = this.config;
		if(cfg.todata){
			if(cfg.todata instanceof Array){
				var html = '';
				cfg.todata.forEach(function(item,index){
					var val = item.text||item.name||item.label;
					var className = item.class?item.class:'';
					html+="<button class='btn btn-default "+className+"' data-id="+item.id+" data-name="+val+" >"+val+"</button>";
				});
				this.toolbar.html(html);
			}else if(typeof(cfg.todata) == "function"){
				cfg.todata(_this.toolbar);
			}
		}
		//构建列表头部
		if(cfg.head){
			cfg.head.forEach(function(item,index){
				var col = $("<span class='sutable-col' col="+index+" />");
				if(index==0) {
					col.addClass("sutable-col-status");
				}else if(index==1){
					col.addClass("sutable-col-name");
				}
				if(typeof(item)=="object"){
					col.text(item.label||item.text||item.name);
				}else{
					col.text(item);
				}
				col.append("<span class='inspliter'></span>");
				_this.head.find(".treable-row").append(col);
			});
		}
		//构建列表内容
		if(cfg.body){
			Help.recursive(_this.elem,cfg.body,cfg);
		}
		//构建列表尾部
		if(cfg.tail){
			_this.foot = $("<ul class='treable-footer'  />");
			_this.elem.append(_this.foot);
		}

		_this.scroll = $("<div class='horiz-scroll' />").html("<div class='horiz-thumb' />");
		_this.elem.append(_this.scroll);


		this.allocate(cfg.wi);//分配宽度

		/***
		 ** 显示 排序图标
		 ***/
		if(cfg.sort){
			var st = "<span class='sort-wrapper'><i class='glyphicon glyphicon-triangle-top'></i><i class='glyphicon glyphicon-triangle-bottom hi'></i></span>";
			if(cfg.sort instanceof Array){
				cfg.sort.forEach(function(num,idx){
					_this.head.find(".sutable-col[col="+num+"]").append(st);
				});
			}else if(cfg.sort == ""){
				_this.head.find(".sutable-col").append(st);
			}
		};

		this.scrollV();//是否显示滚动条
	}

	/***
	 ** 宽度发生变化
	 ***/
	Treable.prototype.allocate = function(w){
		var w = w||1200;
		var dom = this.elem;
		var cfg = this.config;
		var rw  = w - 70 - 130 - 40 - 2;//80 第一列的宽度， 120 名称咧的宽度,40 : margin-left  2 是border
		var ew = rw/(cfg.head.length - 2);
		cfg.colDims = [70,130];//列宽度 存储
		if(ew>60){
			this.head.find(".sutable-col:gt(1)").css("width",ew+"px").each(function(){
				cfg.colDims.push(ew);
			});
			dom.find(".sutable-col:gt(1)").css("width",ew+"px");
		}else{
			dom.find(".sutable-col:gt(2)").css("width",80+"px").each(function(){
				cfg.colDims.push(ew);
			});//让他超出 ，无所谓
			dom.find(".sutable-col:gt(1)").css("width",ew+"px");
		}
		this.foot.css("width",w+"px");//最下面的
		this.scroll.css("width",w+"px");//横向滚动条
	};




	/**
	 * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
	 * or you can call it jquery plugin shell  == fn
	 *  类似于  Class.prototype.jqplugin = function(){};0
	 *  the   $.fn  [same as] Class.prototype
	 * plugin entrance
	 */
	$.fn.treable = function (options) {
		var the = this.first();
		var treable = new Treable(the, options);
		the = $.extend(true,{},the,new exchange(treable));
		return the;
	};

	/***
	 **和其他插件的交互
	 ** factory Class
	 **@param {Drop} drop :  instacne of the plugin builder
	 **/
	function exchange(treable){
		//不能使用直接 == treable.toolbar的方式，因为，传入的 this 变了
		this.toolbar = function(bool){
			treable.toolbar.toggleClass("active",bool);
		}

		/***
		 ** 外部调用这里 resize 宽度
		 ***/
		this.resize = function(w){
			treable.allocate(w);
		};

		/***
		 **外部调用，折叠展开树桩菜单
		 **@param {Boolean} bool  true:折叠，false展开
		 **/
		this.fold = function(bool){
			var rows = treable.elem.find(".treable-body>.treable-item");
			rows.toggleClass("open",bool);
			$(treable.config.scrollDOM).trigger("scroll");
			return treable.elem;
		}

		/***
		 ** 更新列表
		 ***/
		this.update = function(data){
			var body = newbody(treable.elem,data,treable.config);
			treable.elem.find(".treable-body").replaceWith(body);
			treable.listenBody();
			return treable.elem;
		}
	}


	var old = $.fn.treable;
	$.fn.treable.Constructor = Treable;
	// table NO CONFLICT
	// ===============
	$.fn.treable.noConflict = function () {
		$.fn.treable = old;
		return this;
	}
	/***
	 ** outside accessible default setting
	 **/
	$.fn.treable.defaults = {
		head:null,//列表头数据
		body:null,//列表内容数据
		tail:null,//列表尾部数据
		caret:null,//展开，折叠的 图标是 默认是  +  - 号
		sort:null,
		tabs:[],
		todata:null,// toolbar 显示的数据 [{name:'',id:''},{name:'',id:''},{}], function 或者数据
		scrollDOM : window,
		switcherDisable : false
	};
}(jQuery));
