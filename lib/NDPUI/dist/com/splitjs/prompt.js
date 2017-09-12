;(function ($,win) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
	var self = this;
	var wrapper,header,body,footer;
	function build(){
		if($(document.body).find("[id*='prompt'][class*='modal fade']").length==0){
			wrapper = $('<div class="modal fade" tabindex="-1" role="dialog" id="prompt-holder">\
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
		}else{
			if(body) body.removeAttr("class").addClass("modal-body");
			if(footer){
				footer.removeAttr("class").addClass("modal-footer");
				//footer.find("button.btn-ok").addClass("disabled");
			}
		}
	};



	function listen(instance){
		if(footer){
			footer.find("button.btn-ok:not(.disabled)").unbind("click").click(function(e){
				instance.status = "ok";
			});

			footer.find("button.btn-ok.disabled").unbind("click").click(function(e){
				e.preventDefault();
				e.stopImmediatePropagation();
			});
		}
	}

	/***
	 ** 立刻构建 需要的DOM 节点
	 **/
	$(document).ready(function(){
		build();
	});
	/***
	 **@constructor Prompt
	 **/
	function Prompt(element, options) {
		var _this = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.prompt.defaults,options);
		this.init();
		this.status = "";

		//prompt 窗口
		this.elem.modal(this.config.modalConfig).unbind("hide.bs.modal").on("hide.bs.modal",function(e){
			e.stopImmediatePropagation();
			if(_this.status == "ok"){
				_this.config.onOk();
			}else{
				_this.config.onCancel();
			}
		});
	};
	/**
	 **列表组件的初始化
	 **/
	Prompt.prototype.init = function () {
		var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
		this.concrate();//构建下来菜单的样子
		this.initConfig();


		listen(this);

		this.elem.find("button.btn-cancel").unbind("click").click(function(e){
			this.status = "cancel";
		});
	};

	/**
	 ** 构建下来菜单样子
	 **/
	Prompt.prototype.concrate = function(data){
		var _this = this;
		build();//在判断一次，万一不存在
	};

	Prompt.prototype.initConfig = function(){
		var _this = this;
		var cfg = _this.config;
		if(cfg.title){
			if(header) header.find(".top-title").html(cfg.title);
		}else{
			header.find(".top-title").html("");
		}

		//用户自定义头部
		if(cfg.header){
			if(typeof(cfg.header)=="function"){
				cfg.header(header,wrapper);
			}else{
				header.html(cfg.header);
			}
		}

		//用户自定义	内容部分
		if(cfg.body){
			body.empty();
			if(typeof(cfg.body)=="function"){
				cfg.body(body,wrapper);
			}else{
				body.html(cfg.body);
			}
		}else{
			if(body) body.empty();
		}

		if(cfg.btnOK){
			if(footer) footer.find("button.btn-ok").text(cfg.btnOK);
		}

		if(cfg.btnCANCEL){
			if(footer) footer.find("button.btn-cancel").text(cfg.btnCANCEL);
		}
		//用户自定义 尾部
		if(cfg.footer){
			if(typeof(cfg.footer)=="function"){
				cfg.footer(footer,wrapper);
			}else{
				footer.html(cfg.footer);
			}
		}

		if(cfg.validate){
			if(cfg.validate(body)){//校验合法
				footer.find("button.btn-ok").removeClass("disabled");
			}else{//校验不合法
				footer.find("button.btn-ok").addClass("disabled");
			}
			listen(_this);
		}

	}
	/**
	 * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
	 * or you can call it jquery plugin shell  == fn
	 *  类似于  Class.prototype.jqplugin = function(){};0
	 *  the   $.fn  [same as] Class.prototype
	 * plugin entrance
	 */
	$.fn.prompt = function (options) {
		var the = this.first();
		var prompt = new Prompt(the, options);
		exchange.call(this,prompt);
		return the;
	};

	/***
	 **和其他插件的交互
	 ** factory Class
	 **@param {Drop} Bread :  instacne of the plugin builder
	 **/
	function exchange(prompt){
		/**
		 **@param {Object} msg {type:"类型"}
		 **/
		this.manipulate = function(prompt){

		}
	}
	/***
	 ** outside accessible default setting
	 **/
	$.fn.prompt.defaults = {
		title:"认证表单",//标题
		btnOK:"保存", //确定
		btnCANCEL:"取消",//取消
		validate:null,//表单校验， 返回 true,校验成功，返回false 校验失败
		header:null,
		body:null,
		footer:null,
		onOk:function(){},//点击确认按钮回调函数
		onCancel:function(){},//点击取消按钮 回调函数
		modalConfig:{}//modal初始化时的配置
	};

	/***
	 ** 全局快捷使用方式
	 ***/
	win.showPrompt = function(options){
		$("#prompt-holder").prompt(options);
	}
}(jQuery,window));
