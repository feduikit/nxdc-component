/***
** sutable  plugin
**@author ericever
***/
;(function ($) { 
    var self = this;
    
    function Sutable(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.sutable.defaults,element.data(),options);
		this.init();	
    };
	
	/***
	** 处理树桩菜单
	**/
	function recursive(fa,arr,cfg,deep,scp){
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
			var row = $('<div class="sutable-row" deep='+deep+'></div>');
			cols.splice.apply(this,scp).forEach(function(col,idx){
				var switcher = '<span class="switcher">\
				<label class = "active" ><input type = "checkbox" class = "scheckbox"> </label></span>';

				var column = $('<span class="sutable-col" />');
				if(scp[0]==0 && idx==0) {
					column.addClass("sutable-col-status");
					column.html(switcher);
				}else if(scp[0]==0&&idx==1){
					column.addClass("sutable-col-name");
				}
				if((scp[0]==0 && idx>0)||scp[0]>0) column.html(col.label||col.text||col.name);
				row.append(column);
			});
			if(array && array instanceof Array){
				var html = '<span class="btn-plus-minus">\
  					    	<i class="line-hor"></i><i class="line-ver"></i>\
  					    </span>';
					if(scp[0]==0){
						li.append(html).append(row).addClass("open");
					}else{
						li.append(row).addClass("open");
					}
				rec(li,array,cfg,deep,scp);
			}else{
				li.append(row);
			}
			ul.append(li);
		}
		fa.append(ul);
	}
	/**
	**列表组件的初始化
	**/
    Sutable.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
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
		
		
		/***
		**状态的打开/关闭
		***/
		_this.elem.find(".sutable-col-status>.switcher>label>input").click(function(e){
			e.stopImmediatePropagation();
			var the = $(this).parent();
			the.toggleClass("active");
			if(!the.hasClass("active")){
				var fa = $(this).parent().parent().parent().parent().parent();
				fa.find("ul .switcher>label").removeClass("active");
			}
			fireEvent(_this.elem.get(0),"STATUS_CHANGE",{status:the.hasClass("active")});
		});
    };
	
	/**
	** 构建下来菜单样子
	**/
	Sutable.prototype.concrate = function(){
		var _this = this;
		this.part1 = $("<div class='sutable-part-freeze' />");
		this.part2 = $("<div class='sutable-part-flex' />");
		this.elem.append(this.part1).append(this.part2);
	};

    Sutable.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		function buildHead(container,start,end){
			if(cfg.head){
				var head = $("<ul class='sutable-header'/>").html('<li class=" sutable-row"></li>');
				var hep = (end)?cfg.head.splice(start,end):cfg.head.splice(start);
				hep.forEach(function(item,index){
					var col = $("<span class='sutable-col' />");
					if(start==0 && index==0) {
						col.addClass("sutable-col-status");
					}else if(start==0 && index==1){
						col.addClass("sutable-col-name");
					}
					if(typeof(item)=="object"){
						col.text(item.label||item.text||item.name);
					}else{
						col.text(item);
					}
					head.find(".sutable-row").append(col);
				});
				container.append(head);
			}			
		}
		
		buildHead(_this.part1,0,2);
		buildHead(_this.part2,2);
		if(cfg.body){
			recursive(_this.part1,cfg.body,cfg,0,[0,2]);
			recursive(_this.part2,cfg.body,cfg,0,[2]);
		}		
    }
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
		data:null
	};
}(jQuery));
