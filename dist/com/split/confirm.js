;(function ($,win) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	var wrapper,header,body,footer;
	function build(){
		if($(document.body).find("[id*='confirm'][class*='modal fade']").length==0){
			wrapper = $('<div class="modal fade" tabindex="-1" role="dialog" id="confirm-holder">\
					  <div class="modal-dialog modal-md modal-dialog-ndp">\
						<div class="modal-content"></div>\
					  </div>\
					</div>');
			header = $('<div class="modal-header">\
						  		<button class="close" data-dismiss="modal">\
						  			<span aria-hidden="true">&times;</span>\
						  		</button>\
								<span class="top-title"></span>\
						    </div>');
			body = $('<div class="modal-body"></div>');
			footer = $('<div class="modal-footer">\
								<button class="btn btn-default btn-ok" data-dismiss="modal"></button>\
								<button class="btn btn-default btn-cancel" data-dismiss="modal"></button>\
						    </div>');
			wrapper.find("div.modal-content").append(header).append(body).append(footer);
			$(document.body).append(wrapper);
		}		
	}
	
	/***
	** 立刻构建 需要的DOM 节点
	**/
	$(document).ready(function(){
		build();	
	});    
	/***
	**@constructor Confirm
	**/
    function Confirm(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.confirm.defaults,element.data(),options);
		this.init();
		
		
		//显示confirm 窗口
		this.elem.modal();
    };
	/**
	**列表组件的初始化
	**/
    Confirm.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
		
		
		this.elem.find("button.btn-ok").unbind("click").click(function(e){
			fireEvent(_this.elem.get(0),"click_ok",{value:1,desc:"ok"});
		});
		
		this.elem.find("button.btn-cancel").unbind("click").click(function(e){
			fireEvent(_this.elem.get(0),"click_cancel",{value:0,desc:"no"});
		});
    };
	
	/**
	** 构建下来菜单样子
	**/
	Confirm.prototype.concrate = function(data){
		var _this = this;
		build();//在判断一次，万一不存在
	};

    Confirm.prototype.initConfig = function(){
        var _this = this;
		var cfg = _this.config;
		if(cfg.title){
			header.find(".top-title").html(cfg.title);
		}else{
			header.find(".top-title").html("");
		}
			
		if(cfg.content){
			body.empty();
			var icon = $('<div id="icon-holder"></div>');
			var content = $('<div id="content-holder"><div class="content-title"></div>\
								<p class="content-itself">'+cfg.content+'</p></div>');
			body.append(icon).append(content);
		}else{
			body.empty();
		}
		
		if(cfg.icon){
			icon.html(cfg.icon).addClass("showing");
			content.addClass("showing");
		}else{
			icon.removeClass("showing");
			content.removeClass("showing");
		}			
		
		
		if(cfg.btnOK){
			footer.find("button.btn-ok").text(cfg.btnOK);
		}
		
		if(cfg.btnCANCEL){
			footer.find("button.btn-cancel").text(cfg.btnCANCEL);
		}
		
	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.confirm = function (options) {
		var the = this.first();
        var confirm = new Confirm(the, options);
        exchange.call(this,confirm);
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(confirm){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(confirm){
            
        }
    }
	/***
	** outside accessible default setting
	**/
	$.fn.confirm.defaults = {
		title:"确认信息",//标题
		content:"你确定留空白什么也不写吗？ 请选择",//提示文字
		icon:"",//是否显示图标 图片 80X80
		btnOK:"确定", //确定
		btnCANCEL:"取消"//取消
	};
}(jQuery,window));
