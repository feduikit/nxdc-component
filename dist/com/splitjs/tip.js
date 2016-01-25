;(function ($,win) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	var defaults = {
		holdon:30,//默认30秒后消失
		type:"info",//success,warning,danger
		through:true,// true 通栏
		close:false,
		content:"这里填写你想要展示的提示内容！~~"// 可以使文字，也可以是html
	};
	
	$(document).ready(function(){
		var pa = $(document.body);
		var tim = null;
		if(pa.find("div[class*='tip']").length==0){
			var elem = $("<div class='tip'><span class='icon-hold'></span><span class='content-hold'></span><span class='close-hold' aria-hidden='true'></span></div>");
			pa.prepend(elem);
		}
		
		win.showTip = function(options){
			var cfg = $.extend(true,{},defaults,options);
			if(tim) clearTimeout(tim);
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
				var w = elem.width();
				elem.css("margin-left",-(w/2)+"px");			
			}
			elem.addClass("alert alert-"+cfg.type);
			if(cfg.holdon && /^[\-\.]?(\d+)?\.?(\d+)?$/.test(cfg.holdon)){
				tim = setTimeout(function(){
					elem.css("opacity",0).removeClass("alert");
				},cfg.holdon*1000);				
			}
		}
		
		elem.find("span.close-hold").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			elem.css("opacity",0).removeClass("alert");
			if(tim) clearTimeout(tim);
		});
		
	});
}(jQuery,window));
