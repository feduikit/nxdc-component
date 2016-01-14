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
	/***
	** outside accessible default setting
	**/
	$.fn.gallery.defaults = {
		current:0,//当前默认是第几个
		cover:"",//封面图片
		data:[]
	};
}(jQuery));
