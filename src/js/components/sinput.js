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
				.css({width:(ru-2)+"px",height:ru+"px",lineHeight:(ru+4)+"px"});
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
        the = $.extend(true,{},the,new exchange(sinput));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(sinput){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){
            
        }
		
		/***
		** 校验告警提示
		***/
		this.warning = function(bool){
			sinput.elem.toggleClass("warning",bool?true:bool);
		}
		
		/***
		** 校验失败提示
		***/
		this.fail = function(bool){
			sinput.elem.toggleClass("fail",bool?true:bool);
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
		pos:"right",//默认图标放在最左边 left, right 两个选项
		placeholder:"请输入文字",// 占位提示文字
		inputType:"text",//password,"float"  文本，浮点数字，密码
		min:0,
		max:Infinity,
		step:1,
		default:null,
		disabled:false// 是否禁用
	};
}(jQuery));
