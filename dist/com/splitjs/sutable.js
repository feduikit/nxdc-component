/***
** sutable  plugin
**@author ericever
***/
;(function ($) { 
    var self = this;
	
	var Help = {
		recursive:function(fa,arr,cfg,deep){
		var deep = arguments[3]||0;
		var gap = arguments[4]||5;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul role='table' />");
		if(deep>1){
			ul.addClass("sub-layer");
		}else{
			ul.addClass("sutable-body");
			var root = fa;
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group;
			var cols = o[cfg.textKey]||o.text||o.label||o.title||o.name;
			var li = $("<li class='sutable-item'  deep="+deep+"  serial="+o.id+" />");
			var wrapper = $('<div class="sutable-row-wrapper">');
			var row = $('<div class="sutable-row" deep='+deep+' serial='+o.id+' ></div>');
			var optors = $('<i class="font-icon font-icon-edit" serial='+o.id+'></i><i class="font-icon font-icon-copy" serial='+o.id+'></i>');
			wrapper.append(row);
			//列 赋值
			cols.forEach(function(col,idx){
				var switcher = '<span class="switcher">\
				<label class = "active" ><input type = "checkbox" class = "scheckbox"> </label></span>';
				var column = $('<span class="sutable-col" col='+idx+' />');
				if(cfg.colDims&&cfg.colDims.length){
					column.css("width",cfg.colDims[idx]+"px");
				}
				if(idx==0) {//广告活动
					column.addClass("sutable-col-name");
				}else if(idx==1){//状态
					column.addClass("sutable-col-status");
				}else if(idx == (cols.length-2)){//开启/暂停
					column.addClass("sutable-col-oc");
					column.html(switcher);
				}else if(idx == (cols.length-1)){//操作
					column.addClass("sutable-col-operation");
					column.html(optors);
				}
				if(idx<=cols.length-3){
					if(typeof(col)=="object"){
						var val = col.label||col.text||col.name;	
					}
					val = val||col;
					column.html(val); if(idx!=1) column.attr("title",val);
					if(idx==0){
						column.html("<span>"+val+"</span>");
					}else if(idx==1 && col.value==2){
						column.html("<i class='font-icon font-icon-attention'></i>"+val).addClass("attention");
					}
				}
				row.append(column);
			});
			
			if(array && array instanceof Array){// 如果下面还有数组 也就是子层
				var html = $('<span class="btn-plus-minus" />');
				if(cfg.caret){
					html.html(cfg.caret).addClass("custom-caret");
				}else{
					html.html('<i class="line-hor"></i><i class="line-ver"></i>');
				}
				li.append(html).append(wrapper).addClass("open");//row
				wrapper.addClass("asparent");
				rec(li,array,cfg,deep);
			}else{
				li.append(wrapper);//row
			}
			
			ul.append(li);
		}
		if(deep>1){
			ul.append("<li class='sutable-item sutable-item-spec' deep="+deep+">+"+((deep=='2')?'新增广告组':'新增广告')+"</li>");
		}	
		fa.append(ul);			
		}
	};
	
    
    function Sutable(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.sutable.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();	
    };
	/***
	**	横向滚动条
	***/
	Sutable.prototype.scrollV = function(){
		var _this = this;
		var sdim = _this.scroll.get(0).getBoundingClientRect();//上下左右
		var thumb = _this.scroll.find(".horiz-thumb");
		var tdim = thumb.get(0).getBoundingClientRect();
		var w = this.elem.width();
		var colW = 40 + 12;//40 margin-left:40    12 border-right
		this.head.find(".sutable-col[col]").each(function(idx,item){
			colW += $(item).width();
		});
		if(tdim.left<sdim.left){
			thumb.css("left",sdim.left+"px");
		}else if(tdim.right>sdim.right){
			thumb.css("left",(sdim.right-sdim.width)+"px");
		}
		_this.foot.toggleClass("repos",colW>w?true:false);
		_this.scroll.toggleClass("show",colW>w?true:false).css("width",w+"px");
		_this.elem.toggleClass("extend",colW>w?true:false)
		if(colW>w){
			thumb.css("width",(w/colW)*100+"%");	
		}
		
	};
	
	/****
	** body  row,col,caret 的监听
	***/
	Sutable.prototype.listenBody = function(){
		var _this = this;
		
		/***
		**事件  收起/展开按钮  树桩菜单的 展开/收起
		**/
		_this.elem.find("span.btn-plus-minus").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			var the = $(this).parents("li.sutable-item:first");
			the.toggleClass("open");
			the.find("li.sutable-item").toggleClass("open",the.hasClass("open"));
		});
		
		/***
		** 点击 开启/暂停 按钮
		***/
		_this.elem.find(".sutable-col-oc>.switcher").click(function(e){
			var val = $(this).find("input[type=checkbox]:checked").length?1:0;
			var ser = $(this).parents(".sutable-row[serial]:first").attr("serial");
			fireEvent($(this).get(0),"OPERATE_ACTION",{action:"switch",value:val,id:ser});//1 开，0关
		});
		/***
		**状态的打开/关闭
		***/
		_this.elem.find(".sutable-col-oc>.switcher>label>input").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			var the = $(this).parent();
			the.toggleClass("active");
			if(!the.hasClass("active")){
				var fa = $(this).parents(".sutable-item:first");
				fa.find("ul .switcher>label").removeClass("active");
			}
			fireEvent(_this.elem.get(0),"STATUS_CHANGE",{status:the.hasClass("active")});
		});
		
		//点击编辑按钮
		_this.elem.find("i.font-icon-edit").unbind("click").click(function(e){
			fireEvent($(this).get(0),"OPERATE_ACTION",{action:"edit",id:$(this).attr("serial")});
		});
		
		//点击编辑拷贝
		_this.elem.find("i.font-icon-copy").unbind("click").click(function(e){
			fireEvent($(this).get(0),"OPERATE_ACTION",{action:"copy",id:$(this).attr("serial")});
		});
		
		//点击 第一列的 广告活动名称
		_this.elem.find(".sutable-body .sutable-row .sutable-col-name>span").unbind("click").click(function(e){
			fireEvent($(this).get(0),"OPERATE_ACTION",{action:"name",id:$(this).attr("serial")});
		});
		
		_this.elem.find(".sutable-item-spec").unbind("click").click(function(e){
			var deep = $(this).attr("deep");
			var preid = $(this).prev().attr("serial");
			var type = (deep=='2')?0:(deep='3')?1:2;
			fireEvent($(this).get(0),"OPERATE_ACTION",{action:"addnew",preid:preid,type:type});
		});
	
	};
	
	/**
	**列表组件的初始化
	**/
    Sutable.prototype.init = function () {
        var _this = this;
        this.concrate();//构建下来菜单的样子
		this.initConfig();
				
		_this.elem.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响
//		_this.scroll.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响
		
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
			fireEvent(_this.elem.get(0),"SORT_CLICK",{col:parseInt(fa.attr("col")),val:fa.text()});
		});	
		/***
		**鼠标按下 列缩放
		***/
		_this.elem.find("span.inspliter").mousedown(function(e){
			var column = $(this).parent();
			var c = column.attr("col");
			var theCol = $(".sutable-col[col="+c+"]");
			var minw = window.getComputedStyle(theCol.get(0)).minWidth;
			var the = $(this).get(0).getBoundingClientRect();
			var el = _this.elem.get(0).getBoundingClientRect();
			var start = (the.left-el.left + the.width);
			_this.elem.find(".split-line").css("left",start+"px").addClass("active");
			_this.elem.addClass("resize-cursor");
			_this.elem.off("mousemove").mousemove(function(e){
				e.stopImmediatePropagation();
				var end = e.clientX - el.left + 1;
				var w = e.clientX - column.get(0).getBoundingClientRect().left;
				$(this).find(".split-line").css("left",end+"px");
				if(start<end){//拉大
						theCol.css("width",(w) + "px");				
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
		});
		
//		
//		/*****
//		** 横向滚动条拖动  thumb 拖动
//		****/ 		
//		_this.scroll.find(".horiz-thumb").unbind("mousedown").mousedown(function(e){
////			e.stopImmediatePropagation();
//			var thumb = $(this);
//			var sdim = _this.scroll.get(0).getBoundingClientRect();
//			var start = e.clientX;
//			_this.scroll.unbind("mousemove").mousemove(function(e){
//				e.stopImmediatePropagation();
//				var tdim = thumb.get(0).getBoundingClientRect();
//				var end  = e.clientX;
//				var m = end - start;
//				start = end;
//				thumb.css("left",(tdim.left - sdim.left +m)+"px");
//				/***
//				** 超出边界的控制
//				***/
//				if(tdim.left<sdim.left){
//					thumb.css("left",0);
//				}else if(tdim.right>sdim.right){
//					thumb.css("left",(sdim.right-tdim.width - sdim.left)+"px");
//				}				
//				
//				var w = tdim.left - sdim.left; if(w<0) w = 0;
//				
//				_this.elem.children("[role=table]").css("left",-w+"px");
//			});
//		});
		
//		_this.scroll.mouseleave(function(e){
//			_this.scroll.unbind("mousemove");
//			var lf = _this.scroll.find(".horiz-thumb").css("left");
//			_this.scroll.find(".horiz-thumb").css("left",lf+"px");
//		});
//		
//		_this.scroll.mouseup(function(e){
//			_this.scroll.unbind("mousemove");
//			var thumb = $(this).children(":first");
//			var dim1 = $(this).get(0).getBoundingClientRect();
//			var dim2 = thumb.get(0).getBoundingClientRect();
//			if(dim2.right>=dim1.right){
//				var l = (dim1.right - dim2.width) - dim1.left;
//				thumb.css("left",l+"px");
//			}else if(dim2.left<=dim1.left){
//				thumb.css("left",0);
//			}
//		});
//		
//		/***
//		** 点击滚动条空白处
//		***/
//		_this.scroll.unbind("click").click(function(e){
//			e.stopImmediatePropagation();
//			var thumb = $(this).find(".horiz-thumb");
//			var tdim = thumb.get(0).getBoundingClientRect();
//			var sdim = $(this).get(0).getBoundingClientRect();
//
//			if(e.clientX>=tdim.left){
//				thumb.css("left",(tdim.left - sdim.left + 20)+"px");
//			}else{
//				thumb.css("left",(tdim.left - sdim.left - 20)+"px");
//			}
//			/***
//			** 超出边界的控制
//			***/
//			if(tdim.left<sdim.left){
//				thumb.css("left",0);
//			}else if(tdim.right>sdim.right){
//				thumb.css("left",(sdim.right-tdim.width - sdim.left)+"px");
//			}				
//
//			var w = tdim.left - sdim.left; if(w<0) w = 0;
//			_this.elem.children("[role=table]").css("left",-w+"px");
//		});		
		
		//body 里面的监听
		_this.listenBody();
		
		
		$(window).resize(function(e){
			_this.config.wi = _this.elem.width();
			_this.allocate(_this.config.wi);
		});
    };

	/**
	** 构建下来菜单样子
	**/
	Sutable.prototype.concrate = function(){
		var _this = this;
		this.head = $("<ul class='sutable-header' role='table' />").html('<li class=" sutable-row"></li>');
		this.elem.append("<span class='split-line'></span>");
		this.elem.append(this.head);
	};

    Sutable.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		//构建列表头部
		if(cfg.head){
			cfg.head.forEach(function(item,index){
				var col = $("<span class='sutable-col' col="+index+" />");
				if(index==0) {
					col.addClass("sutable-col-name");
				}else if(index==1){
					col.addClass("sutable-col-status");
				}else if(index == (cfg.head.length-2)){
					col.addClass("sutable-col-oc");
				}else if(index == (cfg.head.length-1)){
					col.addClass("sutable-col-operation");
				}
				if(typeof(item)=="object"){
					col.text(item.label||item.text||item.name);
				}else{
					col.text(item);
				}
				//分割线
				//col.append("<span class='inspliter'></span>");
				_this.head.find(".sutable-row").append(col);
			});
		}
		
		this.allocate(cfg.wi);//分配宽度
		
		//构建列表内容
		if(cfg.body){
			Help.recursive(_this.elem,cfg.body,cfg);
		}
		//构建列表尾部
		if(cfg.tail){
			_this.foot = $("<ul class='sutable-footer '><li class='sutable-item sutable-row'></li></ul>");
			_this.foot.find(".sutable-item").append("<span class='sutable-col sutable-col-sum'>总计</span>");
			cfg.tail.forEach(function(item,index){
				var col = $("<span class='sutable-col' />").text(item.text||item.label||item.value||item);
				_this.foot.find(".sutable-item").append(col);
			});
			_this.elem.append(_this.foot);
		}
		
//		this.scroll = $("<div class='horiz-scroll' />").html("<div class='horiz-thumb' />");
//		_this.elem.append(_this.scroll);	
		
		
		
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
		
		//this.scrollV();//是否显示滚动条
		
		_this.head.find(".sutable-col:gt(0):not(:eq(11))").append("<i class='font-icon font-icon-help'></i>");
		
    }
	
	/***
	** 宽度发生变化
	***/
	Sutable.prototype.allocate = function(w){
		var w = w||this.elem.width();
		var dom = this.elem
		var cfg = this.config;
		var rw  = w - 226 - 96 - 40 - 72 - 62;//150 第一列的宽度， 第二列宽度100px ,40 : margin-left
		var ew = rw/(cfg.head.length - 4);
		cfg.colDims = [226,96];//列宽度 存储 
		dom.find(".sutable-col:gt(1):lt("+(cfg.head.length-3)+")").css("width",ew+"px").each(function(){
			cfg.colDims.push(ew);
		});
		cfg.colDims.push(72,62);
		
		
//		this.foot.css("width",w+"px");//最下面的 
//		this.scroll.css("width",w+"px");//横向滚动条
	};
	
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.sutable = function (options) {
		var the = this.first();
        var sutable = new Sutable(the, options);
        the = $.extend(true,{},the,new exchange(sutable));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(sutable){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){
            
        };
		
		//不能使用直接 == sutable.toolbar的方式，因为，传入的 this 变了
		this.toolbar = function(bool){
			sutable.toolbar.toggleClass("active",bool);
		}
		
		/***
		** 外部调用这里 resize 宽度
		***/
		this.resize = function(w){
			sutable.allocate(w);
		};
		
		/***
		**外部调用，折叠展开树桩菜单
		**@param {Boolean} bool  true:折叠，false展开
		**/
		this.fold = function(bool){
			var rows = sutable.elem.find(".sutable-body>.sutable-item");
			rows.toggleClass("open");
			return sutable.elem;
		}
		
		/***
		** 更新列表
		***/
		this.update = function(data){
			sutable.elem.find(".sutable-body").remove();
			Help.recursive(sutable.elem,data,sutable.config);
			sutable.listenBody();
			return sutable.elem;
		}
    }
	
	
	  var old = $.fn.sutable;
	  $.fn.sutable.Constructor = Sutable;
	  // table NO CONFLICT
	  // ===============
	  $.fn.sutable.noConflict = function () {
		$.fn.sutable = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.sutable.defaults = {
		head:null,//列表头数据
		body:null,//列表内容数据
		tail:null,//列表尾部数据
		caret:null,//展开，折叠的 图标是 默认是  +  - 号
		sort:null,
		namecall:function(){},//点击 广告活动名称的回调 传入参数 数据id
		editcall:function(){},//点击编辑图标 回调函数  传入参数 数据id
		copycall:function(){}//点击拷贝图标 回调函数   传入参数 数据id
	};
}(jQuery));
