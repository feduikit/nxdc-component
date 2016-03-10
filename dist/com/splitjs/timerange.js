;(function ($) {
	//星期 数组  中引文
	var DAYARR = [{cn:"星期天",en:"Sun",value:0},
			   {cn:"星期一",en:"Mon",value:1},
			   {cn:"星期二",en:"Tue",value:2},
			   {cn:"星期三",en:"Wed",value:3},
			   {cn:"星期四",en:"Thu",value:4},
			   {cn:"星期五",en:"Fri",value:5},
			   {cn:"星期六",en:"Sat",value:6}];	
	//时区数组中英文
	var ZONEARR = [{en:'(GMT -12:00) Eniwetok, Kwajalein',
					cn:'(GMT -12:00) Eniwetok, Kwajalein',
					val:-12
				   },
				   {en:'(GMT -11:00) Midway Island, Samoa',
					cn:'(GMT -11:00) Midway Island, Samoa',
					val:-11
				   },
				   {en:'(GMT -10:00) Hawaii',
					cn:'(GMT -10:00) Hawaii',
					val:-10
				   },
				   {en:'(GMT -9:00) Alaska',
					cn:'(GMT -9:00) Alaska',
					val:-9
				   },
				   {en:'(GMT -8:00) Pacific Time (US &amp; Canada)',
					cn:'(GMT -8:00) Pacific Time (US &amp; Canada)',
					val:-8
				   },
				   {en:'(GMT -7:00) Mountain Time (US &amp; Canada)',
					cn:'(GMT -7:00) Mountain Time (US &amp; Canada)',
					val:-7
				   },
				   {en:'(GMT -6:00) Central Time (US &amp; Canada), Mexico City',
					cn:'(GMT -6:00) Central Time (US &amp; Canada), Mexico City',
					val:-6
				   },
				   {en:'(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima',
					cn:'(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima',
					val:-5
				   },
				   {en:'(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz',
					cn:'(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz',
					val:-4
				   },
				   {en:'(GMT -3:30) Newfoundland',
					cn:'(GMT -3:30) Newfoundland',
					val:-3.5
				   },
				   {en:'(GMT -3:00) Brazil, Buenos Aires, Georgetown',
					cn:'(GMT -3:00) Brazil, Buenos Aires, Georgetown',
					val:-3
				   },
				   {en:'(GMT -2:00) Mid-Atlantic',
					cn:'(GMT -2:00) Mid-Atlantic',
					val:-2
				   },
				   {en:'(GMT -1:00 hour) Azores, Cape Verde Islands',
					cn:'(GMT -1:00 hour) Azores, Cape Verde Islands',
					val:-1
				   },
				   {en:'(GMT) Western Europe Time, London, Lisbon, Casablanca',
					cn:'(GMT) Western Europe Time, London, Lisbon, Casablanca',
					val:0
				   },
				   {en:'(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris',
					cn:'(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris',
					val:1
				   },
				   {en:'(GMT +2:00) Kaliningrad, South Africa',
					cn:'(GMT +2:00) Kaliningrad, South Africa',
					val:2
				   },
				   {en:'(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
					cn:'(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
					val:3
				   },
				   {en:'(GMT +3:30) Tehran',
					cn:'(GMT +3:30) Tehran',
					val:3.5
				   },
				   {en:'(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
					cn:'(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
					val:4
				   },
				   {en:'(GMT +4:30) Kabul',
					cn:'(GMT +4:30) Kabul',
					val:4.5
				   },
				   {en:'(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
					cn:'(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
					val:5
				   },
				   {en:'(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
					cn:'(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
					val:5.5
				   },
				   {en:'(GMT +5:45) Kathmandu',
					cn:'(GMT +5:45) Kathmandu',
					val:5.75
				   },
				   {en:'(GMT +6:00) Almaty, Dhaka, Colombo',
					cn:'(GMT +6:00) Almaty, Dhaka, Colombo',
					val:6
				   },
				   {en:'(GMT +7:00) Bangkok, Hanoi, Jakarta',
					cn:'(GMT +7:00) Bangkok, Hanoi, Jakarta',
					val:7
				   },
				   {en:'(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
					cn:'(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
					val:8
				   },
				   {en:'(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
					cn:'(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
					val:9
				   },
				   {en:'(GMT +9:30) Adelaide, Darwin',
					cn:'(GMT +9:30) Adelaide, Darwin',
					val:9.5
				   },
				   {en:'(GMT +10:00) Eastern Australia, Guam, Vladivostok',
					cn:'(GMT +10:00) Eastern Australia, Guam, Vladivostok',
					val:10
				   },
				   {en:'(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
					cn:'(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
					val:11
				   },
				   {en:'Auckland, Wellington, Fiji, Kamchatka',
					cn:'Auckland, Wellington, Fiji, Kamchatka',
					val:12
				   }			   
				  ];
	
	
    /***
	**@constructor {Class} Timerange
	**/
    function Timerange(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.timerange.defaults,element.data(),options);
		this.init();	
    };

	
	/***
	** 获得用户选择的时间
	**/
	Timerange.prototype.selectTime = function(){
		var _this = this;
		var arr = [];
		this.elem.find(".timerange-cell.active").each(function(index,item){
			var c = parseInt($(item).attr("col"));
			var r = parseInt($(item).attr("row"));
			var input = _this.elem.find(".ndp-drop-wrapper input")
			var txt = input.val();
			var val = input.data("val")
			arr.push({timeStart:r,timeEnd:(r+1),day:(c==0)?7:c,zone:{text:txt,value:val}});
		});
		return arr;
	}	
	
	/**
	**列表组件的初始化
	**/
    Timerange.prototype.init = function () {
        var _this = this;
		var que = null;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

		
		var o = this.elem.get(0).getBoundingClientRect();
		var vLine = this.elem.find(".ver-line");
		var hLine = this.elem.find(".hor-line");
		var cell = _this.celllist.find(".timerange-cell");
		var mode = 0;// 1 拖动选择模式
		
		_this.celllist.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响
		
		_this.celllist.mouseenter(function(e){
			e.stopImmediatePropagation();
			_this.body.addClass("hover");
		});
		
		/***
		** 
		***/
		_this.celllist.mousedown(function(e){
			e.stopImmediatePropagation();
			mode = 1;
			
			cell.unbind("mouseenter").mouseenter(function(e){
				e.stopImmediatePropagation();
				$(this).addClass("active");
			});
					
		});
		
		
		_this.celllist.on("mouseup",function(e){
			mode = 0;
			cell.unbind("mouseenter");
			_this.selectTime();
		});
		
		_this.celllist.mouseleave(function(e){
			 mode = 0;
			_this.body.removeClass("hover");
			cell.unbind("mouseenter");			
		});		
		
		_this.celllist.find(".timerange-cell").mouseover(function(e){
			var lf = $(this).position().left;
			var tp = $(this).position().top;
			vLine.css("left",(lf+44+70)+"px");
			hLine.css("top",(tp + 44)+"px");
//			var to = $(this).get(0).getBoundingClientRect();
//			vLine.css("left",(parseFloat(to.left)-parseFloat(o.left)+44)+"px");
//			hLine.css("top",(parseFloat(to.top)-parseFloat(o.top)+8 - 50)+"px");
		});
		
		_this.celllist.find(".timerange-cell").click(function(e){
			e.stopImmediatePropagation();
			$(this).toggleClass("active");
		});
		
		
		$(document).click(function(e){
			if(!$(e.target).parents(".ndp-timerange-wrapper").length || !$(e.target).hasClass('ndp-timerange-wrapper')){
				_this.elem.find(".ndp-drop-wrapper").removeClass("focus");
				_this.elem.find(".ndp-drop-wrapper>.drop-list").addClass("hidden");
			}
		});
    };
	
	/**
	** 构建下来菜单样子
	**/
	Timerange.prototype.concrate = function(data){
		var _this = this;
		var cfg = _this.config;
		_this.head = $("<div class='timerange-head' />");
		var droplist = $("<div class='ndp-drop-wrapper'  />").drop({
			caret:"glyphicon-menu-right",
			data:ZONEARR,
			textKey:cfg.lan
		}).val(ZONEARR[3]);
		var txt = $("<span class='timerange-desc'  />").html("按住鼠标左键滑动，选取时间目标");
		_this.head.append(droplist).append(txt);
		_this.body = $("<div class='timerange-body' />");
		var xq  = $("<ul class='timerange-xq' >");
		DAYARR.forEach(function(item,index){
			var val = (cfg.lan=="cn")?item.cn:item.en;
			var li = "<li valcn="+item.cn+" valen="+item.en+" val="+item.value+" >"+val+"</li>";
			xq.append(li);
		});
		var field = $("<div class='time-field' />");
		_this.celllist = $("<div class='timerange-cell-list' />");
		var timelist = $("<ul class='time-list' />");
		for(var i=0;i<24;i++){
			timelist.append("<li val="+i+">"+((i.toString().length==1)?("0"+i):i)+":00</li>");
			var row = $("<li class='timerange-row' row="+i+" />");
			for(var j=0;j<7;j++){
				row.append("<span class='timerange-cell' row="+i+" col="+j+" />");
			}
			_this.celllist.append(row);
		}
		field.append(timelist).append(_this.celllist);
		this.body.append(xq).append(field).append("<div class='ver-line'></div>").append("<div class='hor-line'></div>");
		_this.elem.append(_this.head).append(_this.body);
	};

    Timerange.prototype.initConfig = function(){
        var _this = this;

    };

    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     */
    $.fn.timerange = function (options) {
		var the = this.first();
        var timerange = new Timerange(the, options);
		the = $.extend(true,{},the,new exchange(timerange));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(timerange){
		/***
		**选中 第几个tab
		**@params {int} idx  从0开始
		**/
		this.getVal = function(){
			return timerange.selectTime();// {timeStart: 开始时间， timeEnd:结束时间，星期几, zone:{text:}}
		}
    }
	
	  var old = $.fn.timerange;
	  $.fn.timerange.Constructor = Timerange;
	  // ===============
	  $.fn.timerange.noConflict = function () {
		$.fn.timerange = old;
		return this;
	  }
	
	/***
	** outside accessible default setting
	**/
	$.fn.timerange.defaults = {
		lan:"cn"// en:英语， cn 汉语
	};
}(jQuery));
