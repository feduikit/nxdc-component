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
		var _this = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.confirm.defaults,element.data(),options);
		this.init();
		this.status = "";
		
		//显示confirm 窗口
		this.elem.modal().unbind("hide.bs.modal").on("hide.bs.modal",function(e){
			e.stopImmediatePropagation();
			if(_this.status=="ok"){
				_this.config.onOK();
			}else{
				_this.config.onCancel();
			}
		});
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
			_this.status = "ok";
		});
		
		this.elem.find("button.btn-cancel,button.close").unbind("click").click(function(e){
			_this.status = "cancel";
		});
    };
	
	/**
	** 构建下来菜单样子
	**/
	Confirm.prototype.concrate = function(data){
		var _this = this;
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
		return the;
    };
	
	/***
	** outside accessible default setting
	**/
	$.fn.confirm.defaults = {
		title:"确认信息",//标题
		content:"你确定留空白什么也不写吗？ 请选择",//提示文字
		icon:"",//是否显示图标 图片 80X80
		btnOK:"确定", //确定
		btnCANCEL:"取消",//取消
		onOK:function(){},//确定的处理回调函数
		onCancel:function(){}//取消的处理 回调函数
	};
	
	win.showConfirm = function(options){
		return $("#confirm-holder").confirm(options);	
	}
	
}(jQuery,window));
