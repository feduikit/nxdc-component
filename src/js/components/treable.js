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
		var ul = $("<ul />");
		if(deep>1){
			ul.addClass("sub-layer");
		}else{
			ul.addClass("sutable-body");
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group;
			var cols = o[cfg.textKey]||o.text||o.label||o.title||o.name;
			var li = $("<li class='sutable-item'  deep="+deep+" />");
			var wrapper = $('<div class="sutable-row-wrapper">');
			var row = $('<div class="sutable-row" deep='+deep+'></div>');
//			var chart = '<ul class="nav nav-tabs nav-tabs-cus">\
//			<li role="presentation" value="hello" index="0" class="active"><a href="#">图表1</a></li>\
//			<li role="presentation" value="world" index="1"><a href="#">图表2</a></li>\
//			<li role="presentation" value="china" index="2"><a href="#">图表3</a></li></ul>';	
			var chart = $('<div class="ndp-tab-wrapper" deep='+deep+' index='+i+'></div>');
			chart.tabs({list:["堆积图","趋势图","线状图"]});
			wrapper.append(row).append(chart);
			cols.forEach(function(col,idx){
				var switcher = '<span class="switcher">\
				<label class = "active" ><input type = "checkbox" class = "scheckbox"> </label></span>';

				var column = $('<span class="sutable-col" col='+idx+' />');
				if(idx==0) {
					column.addClass("sutable-col-status");
					column.html(switcher);
				}else if(idx==1){
					column.addClass("sutable-col-name");
				}
				if(idx>0){
					if(typeof(col)=="object"){
						var val = col.label||col.text||col.name;
						column.attr("data-val",val).html(val);
					}else{
						column.attr("data-val",val).html(col);
					}
				}		
				row.append(column);
			});
			
			if(array && array instanceof Array){
				var html = '<span class="btn-plus-minus">\
  					    	<i class="line-hor"></i><i class="line-ver"></i>\
  					    </span>';
					li.append(html).append(wrapper).addClass("open");//row
				rec(li,array,cfg,deep);
			}else{
				li.append(wrapper);//row
			}
			ul.append(li);
		}
		fa.append(ul);			
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
		var w = this.elem.width();
		var colW = 40 + 12;//40 margin-left:40    12 border-right
		this.head.find(".sutable-col[col]").each(function(idx,item){
			colW += $(item).width();
		});
		_this.foot.toggleClass("repos",colW>w?true:false);
		_this.scroll.toggleClass("show",colW>w?true:false).css("width",w+"px");
		if(colW>w){
			_this.scroll.find(".vertical-thumb").css("width",(w/colW)*100+"%");	
		}
		
	};
	/**
	**列表组件的初始化
	**/
    Treable.prototype.init = function () {
        var _this = this;
        this.concrate();//构建下来菜单的样子
		this.initConfig();
		
		
		/***
		**事件  收起/展开按钮
		**/
		_this.elem.find("span.btn-plus-minus").click(function(e){
			e.stopImmediatePropagation();
			var the = $(this).parents("li.sutable-item:first");
			the.toggleClass("open");
			the.find("li.sutable-item").toggleClass("open",the.hasClass("open"));
		});
		
		_this.elem.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响
		_this.scroll.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响
		
		_this.elem.find(".sutable-col-status>.switcher").click(function(e){
			e.stopImmediatePropagation();
		});
		/***
		**状态的打开/关闭
		***/
		_this.elem.find(".sutable-col-status>.switcher>label>input").click(function(e){
			e.stopImmediatePropagation();
			var the = $(this).parent();
			the.toggleClass("active");
			if(!the.hasClass("active")){
				var fa = $(this).parents(".sutable-item:first");
				fa.find("ul .switcher>label").removeClass("active");
			}
			fireEvent(_this.elem.get(0),"STATUS_CHANGE",{status:the.hasClass("active")});
		});
		
		_this.head.find(".sort-wrapper").click(function(e){
			var fa = $(this).parent();
			fireEvent(_this.elem.get(0),"SORT_CLICK",{col:fa.attr("col"),val:fa.text()});
		});
		
		
		/***
		**鼠标按下
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
		
		
		/*****
		** 横向滚动条拖动
		****/ 
		_this.scroll.find(".vertical-thumb").unbind("mousedown").mousedown(function(e){
			e.stopImmediatePropagation();
			var  $this = $(this);
			var nlf = $this.get(0).getBoundingClientRect().left;
			console.log(nlf);
			var el = _this.elem.get(0).getBoundingClientRect();
			var begin = e.clientX;
			_this.scroll.unbind("mousemove").mousemove(function(e){
				e.stopImmediatePropagation();
				var x = e.clientX - begin;
				var dim = $this.get(0).getBoundingClientRect();
				if(x>=0 && dim.right<=el.right){
					_this.scroll.find(".vertical-thumb").css("left",x+"px");
				}else if(x<0 && dim.left>=el.left){
					
					var lf = nlf + x;
					console.log(x + " :" + lf);
					_this.scroll.find(".vertical-thumb").css("left",lf+"px");
				}
			});
		});
		
		_this.scroll.mouseleave(function(e){
			_this.scroll.unbind("mousemove");
		});
		
		_this.scroll.mouseup(function(e){
			_this.scroll.unbind("mousemove");
			
		});
		
		
		//测试用  tabs 图表层 展开/隐藏
		_this.elem.find(".sutable-row-wrapper>.sutable-row").click(function(e){
			e.stopImmediatePropagation();
			if(!$(this).hasClass("focus")){
				_this.elem.find(".sutable-row-wrapper>.sutable-row.focus").removeClass("focus");
				$(this).addClass("focus");
			}
			
			//$(this).siblings(".ndp-tab-wrapper").toggleClass("open");
		});
		
		_this.elem.find("#chart").click(function(e){
			_this.elem.find(".sutable-row-wrapper>.sutable-row.focus+.ndp-tab-wrapper").addClass("open");
		});
		
		
		$(window).resize(function(e){
			_this.config.wi = _this.elem.width();
			_this.allocate(_this.config.wi);
		});
		
	
		//组件构建完成
		_this.elem.trigger("MISSION_COMPLETE");
    };

	
	/***
	** 控制 chart 层的展现和隐藏
	***/
	Treable.prototype.chart = function(bool){
		
	}
	/**
	** 构建下来菜单样子
	**/
	Treable.prototype.concrate = function(){
		var _this = this;
		this.toolbar = $("<div class='sutable-toolbar' />");
		var html = "<button class='btn btn-default' id='price'>调整预算出价<button>";
		html+="<button class='btn btn-default' id='edit'>编辑</button>";
		html+="<button class='btn btn-default' id='chart'>看图表</button>";
		this.toolbar.html(html);
		
		this.head = $("<ul class='sutable-header'/>").html('<li class=" sutable-row"></li>');
		this.elem.append("<span class='split-line'></span>");
		this.elem.append(this.toolbar).append(this.head);
	};

    Treable.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		if(cfg.data){
			if(cfg.data.head){
				cfg.data.head.forEach(function(item,index){
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
					_this.head.find(".sutable-row").append(col);
				});
			} 
			if(cfg.data.body){
				Help.recursive(_this.elem,cfg.data.body,cfg);
			}			
			if(cfg.data.tail){
				_this.foot = $("<ul class='sutable-footer'  />");
				_this.elem.append(_this.foot);
			}
		}
		
		_this.scroll = $("<div class='vertical-scroll' />").html("<div class='vertical-thumb' />");
		_this.elem.append(_this.scroll);	
		
		
		this.allocate(cfg.wi);//分配宽度
		
		/***
		** 显示 排序图标
		***/
		if(cfg.sort){
			var st = "<span class='sort-wrapper'><i class='glyphicon glyphicon-triangle-top'></i><i class='glyphicon glyphicon-triangle-bottom'></i></span>";			
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
		var dom = this.elem
		var cfg = this.config;
		var rw  = w - 100 - 100 - 40;//100 第一列的宽度， 100 名称咧的宽度,40 : margin-left
		var ew = rw/(cfg.data.head.length - 2);
		if(ew>50){
			dom.find(".sutable-col:gt(1)").css("width",ew+"px");//让他刚好
		}else{
			dom.find(".sutable-col:gt(2)").css("width",80+"px");//让他超出 ，无所谓
		}
		this.foot.css("width",w+"px");//最下面的 
		this.scroll.css("width",w+"px");//横向滚动条
	};
	/***
	** 数据发生变化
	***/
	Treable.prototype.update = function(){
		
	}
	
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
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){
            
        };
		
		this.toolbar = function(bool){
			treable.toolbar.toggleClass("active",bool);
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
		data:null,
		sort:null
	};
}(jQuery));
