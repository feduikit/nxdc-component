;(function ($) {
    var g = {
        mousePos : {x:0, y:0}
    }; //全局定义
    var help = {
        getSelectionStart:function() {
            var node = document.getSelection().anchorNode;
            return (node.nodeType == 3 ? node.parentNode : node);
        }    
    }; //帮助类

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
        
        _this.elem.keydown(function(e){
            var targetNode = help.getSelectionStart();
            if(targetNode != undefined && targetNode.nodeType === 1 && targetNode.nodeName == 'SPAN') {
              var nodeHtmlString = targetNode.outerHTML;
              if(nodeHtmlString.indexOf("deco-tag")!=-1||
                 ~nodeHtmlString.indexOf("deco-close")||~nodeHtmlString.indexOf("deco-space"))
              {  
                e.stopImmediatePropagation();
                e.preventDefault();
                  if(e.keyCode == 8){//删除
                      console.log(nodeHtmlString);
                      if($(targetNode).hasClass("deco-close")) targetNode = targetNode.parentNode;
                      var range = document.createRange();
                      range.selectNode(targetNode);
                      var sel = window.getSelection();
                      sel.removeAllRanges();
                      sel.addRange(range);
                      document.execCommand("delete", false, null); 
                  }
              }
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
            var tag = "<span class='deco-space'> </span><span class='deco-tag' spell-check='false' data-val="+o.val+" ><span class='deco-close'>&times;</span>"+o.text+"</span>&nbsp;";
            document.execCommand("insertHTML",false,tag);
            //mousedown event on your div because it steals the focus:  点击其他div 可能失去焦点
            field.tagListen();
            field.elem.contents().focus();//pa
            return field.elem;
        };
        
        /****
        ***
        ****/
        this.setContent = function(str){
               
        }
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
            return clone.text();
        };
        
        /***
        ** 用户把数据回填到这里，显示相应的格式
        **@param {String} str 字符串数据
        ***/
        this.fill = function(strs){
            var arr = strs.split("#b#n");
            var pre = String(field.elem.html()).trim();
            var cont = pre;
            var x = "<span class='deco-close'>&times;</span>";
            for(var i=0;i<arr.length;i++){
                var str = arr[i];
                var nstr = str.replace(/\{\{(.+?)\|(.+?)\}\}/ig,function(all,p1,p2){
                   var space = "<span class='deco-space'></span>"; 
                   var ctx = "<span class='deco-tag' data-val="+p1+">"+p2.trim() + x +"</span>";
                   return space + ctx + "&nbsp;";
                });
                nstr=nstr.replace(/\s/,"");
                if((i==0 && pre.length)||i>0){
                    nstr = "<div>" +nstr + "</div>";
                }
                cont +=nstr;
            }
            field.elem.html(cont);
            field.tagListen();
            return field.elem;
        };
        
        /****
        ** 删除 tag
        ****/
        this.removeTag = function(){
            
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
