;(function ($) {
    var g = {
        mousePos : {x:0, y:0}
    }; //全局定义
    var help = {}; //帮助类
    function Field(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.field.defaults,element.data(),options);
		this.init();	
    };

	/**
	**列表组件的初始化
	**/
    Field.prototype.init = function () {
        var _this = this;
		_this.concrate();
		_this.initConfig();	
		
        
        //注册事件；
        $(document).bind('mousemove',function(evt){
            g.mousePos.x = evt.pageX;
            g.mousePos.y = evt.pageY;
        });
        
        _this.elem.click(function(e){
            g.mousePos.x = e.pageX;
            g.mousePos.y = e.pageY;            
        });
        
        _this.elem.keyup(function(e){
            //console.log(e.keyCode);
            if(e.keyCode == 8){//删除
                console.log(g.mousePos.x,g.mousePos.y);
                var ele = document.elementFromPoint(e.clientX,e.clientY);  
                console.log(ele);
            }else {//输入数字和字符
               
            }
              
        });
    };
    
    Field.prototype.tagListen = function(){
        _this = this;
        _this.elem.find(".deco-tag>.deco-close").unbind("click").click(function(){
            $(this).parent().remove();
        });
    }
	/**
	** 构建
	**/
	Field.prototype.concrate = function(){
        _this = this;
        _this.elem.attr({tabindex:"-1",contenteditable:"true",spellcheck:"false"});
	};

    /***
    ** 处理用户设置配置
    ***/
    Field.prototype.initConfig = function(){

    }
	
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.field = function (options) {
		var the = this.first();
        var field = new Field(the, options);
        the = $.extend(true,{},the,new exchange(field));
		return the;
    };
    /***
    **和其他插件的交互
	** factory Class
    **@param {Page} page :  instacne of the plugin builder
    **/
    function exchange(field){
        
        /***
        **@param {Object} o={val:值,text:显示的内容}
        ***/
        this.addTag = function(o){
            var tag = "<span class='deco-space'> </span><span class='deco-tag' spell-check='false' data-val="+o.val+" >"+o.text+"<span class='deco-close'>&times;</span></span>&nbsp;";
            document.execCommand("insertHTML",false,tag);
            field.tagListen();
            return field.elem;
        };
        
        /***
        **  获得输入的数据
        ***/
        this.getContent = function(){
            var clone = field.elem.clone();
            clone.find("span.deco-space").remove();
            clone.find("span.deco-close").remove();
            clone.find("span.deco-tag").each(function(index,item){
                var the = $(item);
                var val = the.data("val");
                var txt = the.text().trim();
                the.replaceWith("{{"+val+"|"+txt+"}}");
            });
            clone.children("div").prepend("#b#n");
            console.log(clone.text());
        };
    }
	
	  var old = $.fn.field;
	  $.fn.field.Constructor = Field;
	  // page NO CONFLICT
	  // ===============
	  $.fn.field.noConflict = function () {
		$.fn.field = old;
		return this;
	  }
	/***
	** outside accessible default setting
	**/
	$.fn.field.defaults = {
        
	};
}(jQuery));
