;(function ($,win) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	var defaults = {
		holdon:30,//默认30秒后消失
		type:"info",//success,warning,danger
		through:true,// true 通栏
		close:false,
		bind:null, //jquery对象 DOM 句柄，   默认DOM弹出的tip 吸附在body上，如果没设置就是全局的为body，有设置根据设置走
		closeCallback:function(){},//关闭tip回调函数
		clickCallback:function(){},//点击除关闭按钮之外的其他部分，触发回调
		content:"这里填写你想要展示的提示内容！~~"// 可以使文字，也可以是html
	};
	
	$(document).ready(function(){
//		var pa = $(document.body);
		var elem = null;
		var tim = null;
//		if(pa.find("div[class*='tip']").length==0){
//			var elem = $("<div class='tip'><span class='icon-hold'></span><span class='content-hold'></span><span class='close-hold' aria-hidden='true'></span></div>");
//			pa.prepend(elem);
//		}
		
		win.showTip = function(options){
			var cfg = $.extend(true,{},defaults,options);
			if(tim) clearTimeout(tim);
			
			var pa = (cfg.bind)?cfg.bind:$(document.body);
			var the = pa.children("div[class*='"+(cfg.bind?'tip-bind':'tip')+"']");
			if(the.length==0){
				elem = $("<div class='tip' ><span class='icon-hold'></span><span class='content-hold'></span><span class='close-hold' aria-hidden='true'></span></div>");
				pa.prepend(elem);
			}else{
				elem = the.first();
			}	
		
			elem.removeAttr("style").removeAttr("class").addClass("tip");
			elem.find("span.close-hold").empty();
			elem.find("span.icon-hold").empty();
			elem.find("span.content-hold").html(cfg.content);
			if(cfg.close){
				elem.find("span.close-hold").html("&times;");
			}
			if(cfg.icon){
				elem.find("span.icon-hold").html(cfg.icon).css("margin-right","5px");
			}
			
			if(!cfg.through){
				elem.addClass("tip-spec");
				var rw = window.innerWidth;
				if(rw<=960){
					elem.css({"width":"100%","margin-left":0});	
				}else{
					if(cfg.content.length<100){
						elem.css({"width":"50%","margin-left":"25%"});	
					}
				}				
			}
			if(cfg.bind){
				elem.addClass("tip-bind");
			}
			
			elem.addClass("alert alert-"+cfg.type);
			if(cfg.holdon && /^[\-\.]?(\d+)?\.?(\d+)?$/.test(cfg.holdon)){
				tim = setTimeout(function(){
					elem.css("opacity",0).removeClass("alert");
					cfg.closeCallback(elem);
				},cfg.holdon*1000);				
			}
			
			elem.find("span.close-hold").unbind("click").click(function(e){
				e.stopImmediatePropagation();
				elem.css("opacity",0).removeClass("alert");
				if(tim) clearTimeout(tim);
				cfg.closeCallback();
			});			
			
			/***
			** 点击 tip 除close按钮之外的其他地方，抛出事件
			***/
			elem.unbind("click").click(function(e){
				cfg.clickCallback(e.target,elem);
			});
			
			return elem;
		}
		
	});
}(jQuery,window));
