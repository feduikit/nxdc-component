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
			var cols = o.text||o.label||o.title||o.name;
			var spin = '<div class="spinner spinner2" ><div class="bounce1"></div><div class="bounce2"></div>\					  <div class="bounce3"></div></div>';
			var li = $("<li class='sutable-item'  deep="+deep+"  serial="+o.id+" />");
			var wrapper = $('<div class="sutable-row-wrapper">');
			var row = $('<div class="sutable-row" deep='+deep+' serial='+o.id+' ></div>');
			var optors = $('<i class="font-icon font-icon-edit" serial='+o.id+'></i><i class="font-icon font-icon-copy" serial='+o.id+'></i>');
			wrapper.append(row);
			//列 赋值
			var temparr = cols.concat({});
			temparr.forEach(function(col,idx){
				var switcher = $('<span class="switcher">\
				<label class = "active" ><input type = "checkbox" class = "scheckbox"></label></span>');
				var column = $('<span class="sutable-col" col='+idx+' />');
				if(cfg.colDims&&cfg.colDims.length){
					column.css("width",cfg.colDims[idx]+"px");
				}
				if(idx==0) {//广告活动
					column.addClass("sutable-col-name");
				}else if(idx==1){//状态
					column.addClass("sutable-col-status");
				}else if(idx == (temparr.length-2)){//开启/暂停
					column.addClass("sutable-col-oc");
					switcher.find("label").toggleClass("active",col.status?true:false);
					column.html(switcher);
				}else if(idx == (temparr.length-1)){//操作
					column.addClass("sutable-col-operation");
					column.html(optors);
				}
				if(idx<=(temparr.length-3)){
					var val = col.label||col.text||col.name;	
					column.html(val); if(idx!=temparr.length-2) column.attr("title",val);
					if(idx==0){
						column.html("<span>"+val+"</span>");
					}else if(idx==1 && col.value==2){// 处理 状态， 审核未通过
						column.html("<span class='att-wrapper'><i class='font-icon font-icon-attention'></i>"+val+"</span>").addClass("attention");
						column.find(".att-wrapper").attr({"data-toggle":"tooltip","data-title":col.reason});
					}else if(idx == (temparr.length-2)){
						switcher.find("label").toggleClass("active",col.status?true:false);
					}
				}
				row.append(column);
			});
			if(o.hasChild && deep<3){
				var html = $('<span class="btn-plus-minus" deep='+deep+' serial='+o.id+'  />');
				if(cfg.caret){
					html.html(cfg.caret).addClass("custom-caret");
				}else{
					html.html('<i class="line-hor"></i><i class="line-ver"></i>');
				}
				li.append(html).append(wrapper.addClass("asparent"));
				//rec(li,array,cfg,deep);
			}else{
				li.append(wrapper);//row
			}
			li.append(spin);
			ul.append(li);
		}
		if(deep>1){
			ul.append("<li class='sutable-item sutable-item-spec' deep="+deep+">+"+((deep=='2')?'新增广告组':'新增广告')+"</li>");
		}	
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
			return a;
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
		
	};
	
	/****
	** body  row,col,caret 的监听
	***/
	Sutable.prototype.listenBody = function(){
		var _this = this;
		var o = this.elem.get(0).getBoundingClientRect();
		/***
		**事件  收起/展开按钮  树桩菜单的 展开/收起
		**/
		_this.elem.find("span.btn-plus-minus").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			var deep = parseInt($(this).attr("deep"));
			var serial = $(this).attr("serial");
			var li = $(this).parent();
			var spinner = li.find("div.spinner2");
			li.toggleClass("open");
			li.children("ul>li.sutable-item").toggleClass("open");
			if(li.hasClass("open")){
				fireEvent($(this).get(0),"OPERATE_ACTION",{action:"nextlayer",deep:deep,id:serial,fa:li});//1 开，0关
				spinner.addClass("active");
				$.ajax(_this.config.ajaxOptions).then(function(result){
					if(typeof(result)=="string") result = JSON.parse(result);
					result = _this.config.dataProxy? _this.config.dataProxy(result) : result;
					li.children("ul.sub-layer").remove();
					if(result.code==0){
						Help.recursive(li,result.data,_this.config,deep); 
						_this.listenBody();
					}else{
						li.toggleClass("open");
					}
					spinner.removeClass("active");
                    _this.allocate();// 重新设置宽度
				},function(err){
					li.toggleClass("open");
					spinner.removeClass("active");
				});					
			}else{
				spinner.removeClass("active");
			}
		});
		/***
		** 点击 开启/暂停 按钮
		***/
		_this.elem.find(".sutable-col-oc>.switcher").click(function(e){
            e.stopImmediatePropagation();
			//var val = $(this).find("input[type=checkbox]:checked").length?1:0;
            var val = $(this).children("label").hasClass("active")?0:1;// 现在的状态，当前点击之后的状态
			var ser = $(this).parents(".sutable-row[serial]:first").attr("serial");
			fireEvent($(this).get(0),"OPERATE_ACTION",{action:"switch",value:val,id:ser,hwd:$(this)});//1 开，0关
		});
		/***
		**状态的打开/关闭
		***/
		_this.elem.find(".sutable-col-oc>.switcher>label>input").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			var the = $(this).parent();
			the.toggleClass("active");
        // 去掉连带关系
//			if(!the.hasClass("active")){
//				var fa = $(this).parents(".sutable-item:first");
//				fa.find("ul .switcher>label").removeClass("active");
//			}
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
		
		//显示隐藏 tooltip
		_this.elem.find('[data-toggle=tooltip]').unbind("mouseenter").mouseenter(function(e){
//           e.stopImmediatePropagation(); 
            if(!$(e.target).data('title')) return false;
			var tooltip = _this.elem.find(".tooltip-cus");
			tooltip.find(".tooltip-inner").html($(e.target).data('title'));
			
			var o1 = Help.fixPageXY($(this));
			var o2 = Help.fixPageXY(_this.elem);
			tooltip.css({"top":(o1.pageY - o2.pageY + 10)+"px","left":(o1.pageX - o2.pageX - 10)+"px"});
			tooltip.addClass("in");
			tooltip.unbind("webkitTransitionEnd oTransitionEnd otransitionend transitionend").on("webkitTransitionEnd oTransitionEnd otransitionend transitionend",function(){
				var to = $(this).get(0).getBoundingClientRect();
//				console.log(to.right + " : " + o.right);
				if(to.right>=o.right){
					$(this).css({"right":0,"left":"inherit"});
					$(this).find(".tooltip-arrow").css("left","90%");
				}else{
					$(this).css({"right":"inherit"});
					$(this).find(".tooltip-arrow").removeAttr("style");				
				}
			})
		});
		
		_this.elem.find('[data-toggle=tooltip]').unbind("mouseleave").mouseleave(function(e){
//            e.stopImmediatePropagation();
			_this.elem.find(".tooltip-cus").removeClass("in");
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
		
        
        // 点击 列表头部 进行排序
        _this.head.find("span.sutable-col:has(span.sort-wrapper)").click(function(e){
            console.log("col:" + $(this).attr("col"));
			e.stopImmediatePropagation();
            var  arrow =  $(this).find("span.sort-wrapper");
            if(arrow.hasClass("sorted")){
                arrow.children().toggleClass("hi");
            }else{
                arrow.addClass("sorted").children("i.glyphicon-triangle-bottom").addClass("hi");
                var siblings = $(this).siblings().removeClass("sorted");
                siblings.find(".sort-wrapper").children("i").removeClass("hi");
//                siblings.find(".sort-wrapper").children("i.glyphicon-triangle-bottom").addClass("hi");                
            }
            var order= arrow.children("i.glyphicon-triangle-bottom").hasClass("hi")?1:0;//1 正序，0 反序
			fireEvent(_this.elem.get(0),"SORT_CLICK",{col:parseInt($(this).attr("col")),val:$(this).text(),order:order});            
        });
		/***
		** 表头 某一列的排序按钮被点击
		***/
//		_this.head.find(".sort-wrapper").click(function(e){
//			e.stopImmediatePropagation();
//			var fa = $(this).parent();
//            if($(this).hasClass("sorted")){
//                $(this).children().toggleClass("hi");
//            }else{
//                $(this).addClass("sorted").children("i.glyphicon-triangle-bottom").addClass("hi");
//                var siblings = fa.siblings().removeClass("sorted");
//                siblings.find(".sort-wrapper").children("i").removeClass("hi");
////                siblings.find(".sort-wrapper").children("i.glyphicon-triangle-bottom").addClass("hi");                
//            }
//            var order= $(this).children("i.glyphicon-triangle-bottom").hasClass("hi")?1:0;//1 正序，0 反序
//			fireEvent(_this.elem.get(0),"SORT_CLICK",{col:parseInt(fa.attr("col")),val:fa.text(),order:order});
//		});	
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
			//_this.scrollV();// 是否显示横向滚动条
			_this.elem.trigger("RESIZE_DONE");//鼠标拖动resize 列宽完成
		});
			
		//body 里面的监听
		_this.listenBody();
		
		
		$(window).resize(function(e){
			_this.config.wi = _this.elem.width();
			_this.allocate(_this.config.wi);
		}); 
    };

	/**
	** 构建下拉菜单样子
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
            //默认不加 hi， 默认没有排序
			var st = "<span class='sort-wrapper'><i class='glyphicon glyphicon-triangle-top'></i><i class='glyphicon glyphicon-triangle-bottom'></i></span>";				
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
				
				if(cfg.sort.indexOf(index)!=-1){
					col.append(st);
				}
				
				if(index!=0 && index!=12 && item.desc){
					col.append("<i class='font-icon font-icon-help' data-toggle='tooltip' data-title="+item.desc+"></i>");
				} 				
 				//分割线
				//col.append("<span class='inspliter'></span>");
				_this.head.find(".sutable-row").append(col);
			});
		}
		
		
		//构建列表内容
		if(cfg.body){
			Help.recursive(_this.elem,cfg.body,cfg);
		}
        this.allocate();//分配宽度   
		//构建列表尾部
		if(cfg.tail){
			_this.tail(cfg.tail);
		}	
		
	                
        
		_this.elem.append('<div class="tooltip tooltip-cus bottom fade" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner"> Tooltip on the bottom </div> </div>');
		//_this.head.find(".sutable-col:gt(0):not(:eq(11))").append("<i class='font-icon font-icon-help'></i>");
		
		//this.scrollV();//是否显示滚动条
//        setTimeout(function(){
//             _this.allocate();//分配宽度  重新allocate列表
//        });
    }
	
	
	//构建列表尾部数据，最下面一行 总计
	Sutable.prototype.tail = function(dat){
		var _this = this;
		_this.foot = $("<ul class='sutable-footer'><li class='sutable-item sutable-row'></li></ul>");
		_this.foot.find(".sutable-item").append("<span class='sutable-col sutable-col-sum'>总计</span>");	
		this.foot.find(".sutable-item>.sutable-col:gt(0)").empty();
		var arr = this.config.colDims.slice(2);
		dat.forEach(function(item,index){
			var col = $("<span class='sutable-col' />").text(item.text||item.label||item.value||item);
			if(arr[index]) col.css("width",arr[index]+"px");
			_this.foot.find(".sutable-item").append(col);
		});
		_this.elem.append(_this.foot);
	}
	
	
	/***
	** 宽度发生变化
	***/
	Sutable.prototype.allocate = function(w){
        var _this = this;
		var w = w||this.elem.width();
		var dom = this.elem
		var cfg = this.config;
		var rw  = w - 212 - 110 - 40 - 72 - 62;//150 第一列的宽度， 第二列宽度100px ,40 : margin-left
		var ew = rw/(cfg.head.length - 4);
		cfg.colDims = [212,110];//列宽度 存储 
		dom.find(".sutable-col:gt(1):lt("+(cfg.head.length-3)+")").css("width",ew+"px").each(function(){
			cfg.colDims.push(ew);
		});
		cfg.colDims.push(72,62);
		
        if(this.elem.find(".sutable-body .sutable-col").length){
            cfg.colDims.forEach(function(val,index){
                _this.elem.find(".sutable-body .sutable-col[col='"+index+"']").css("width",val+"px");
            });
        }
        
        
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
		/***
		** 外部调用这里 resize 宽度
		***/
		this.resize = function(w){
			sutable.allocate(w);
		};
		/***
		**更新 总计
		***/
		this.sum  = function(data){
			sutable.elem.find(".sutable-footer").remove();
			sutable.tail(data);
			return sutable.elem;
		}		
		/***
		** 更新列表  
		***/
		this.update = function(data,tail){
			var _this = this;
			sutable.elem.find(".sutable-body").remove();
			Help.recursive(sutable.elem,data,sutable.config);
			if(tail){
				_this.sum(tail);
			}else{//如果tail 数据不存在 2016-6-30
                sutable.elem.find(".sutable-footer").remove();
            }
			sutable.listenBody();
			return sutable.elem;
		};
        
        /****
        ** @param {hwd} switcher 句柄
        ** @param {val} 0 关闭，1 打开
        **
        ***/
        this.switchBack = function(hwd){
            hwd.children("label").toggleClass("active");
        };
        
        /***
        **@param {Object} o  ajax 配置的json 对象
        ***/
        this.updateAjaxOption = function(o){
            sutable.config.ajaxOptions = $.extend(true,{},sutable.config.ajaxOptions,o);
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
		ajaxOptions: {
            type: "GET",
            url: "../data/sutable.json",
			xhrFields: { withCredentials: true}
        },
        dataProxy: null,
		namecall:function(){},//点击 广告活动名称的回调 传入参数 数据id
		editcall:function(){},//点击编辑图标 回调函数  传入参数 数据id
		copycall:function(){}//点击拷贝图标 回调函数   传入参数 数据id
	};
}(jQuery));
