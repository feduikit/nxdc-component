;(function ($,win) { //start with
    var self = this;
    var pa, wrapper,header,footer;
	var defaults = {
		type:1,//2, 1 正常alert 2 异形alert, 不包含头和尾部，点击空白处，无法消失
		title:"",
		content:"这里填写你想要展示的提示内容！~~",// 可以使文字，也可以是html
		btnOK:"OK",
		icon:"",
		callback:null,
        backdrop:true
	};
    
    function build(){
  		pa = $(document.body);
        var htmlstring = '<div class="modal fade" tabindex="-1" role="dialog" id="alert-holder">\
					  <div class="modal-dialog modal-md modal-dialog-ndp">\
						<div class="modal-content"></div>\
					  </div>\
					</div>';
        
		//if(pa.find("[id*='alert'][class*='modal fade']").length==0){
			wrapper = $(htmlstring);
			header = $('<div class="modal-header">\
						  		<button class="close" data-dismiss="modal">\
						  			<span aria-hidden="true">&times;</span>\
						  		</button>\
						    </div>');
			body = $('<div class="modal-body"></div>');
			footer = $('<div class="modal-footer">\
								<button class="btn btn-default" data-dismiss="modal"></button>\
						    </div>');
			wrapper.find("div.modal-content").append(header).append(body).append(footer);
			pa.append(wrapper);
//		} else{
//            wrapper =$("[id*='alert'][class*='modal fade']");            
//            body =$("[id*='alert'][class*='modal fade'] .modal-body").empty();
//            footer =$("[id*='alert'][class*='modal fade'] .modal-footer");            
//        }
    };

	$(document).ready(function(){
        build();
	});
    
    win.showAlert = function(options){
        var cfg = $.extend(true,{},defaults,wrapper.data(),options);
        console.log(cfg.backdrop);
        build();
        var icon = $('<div id="icon-holder"></div>');
        var content = $('<div id="content-holder"><div class="content-title"></div>\
                            <p class="content-itself"></p></div>');
        body.append(icon).append(content);
        if(cfg.icon){
            icon.html(cfg.icon).addClass("showing");
            content.addClass("showing");
        }else{
            icon.removeClass("showing");
            content.removeClass("showing");
        }
        if(cfg.title){
            body.find(".content-title").html(cfg.title);
        }
        if(cfg.content){
            if(typeof(cfg.content)=="function"){
                cfg.content(content.find(".content-itself"));
            }else{
                content.find(".content-itself").html(cfg.content);
            }
        }
        if(cfg.btnOK){
            footer.find("button.btn").text(cfg.btnOK).attr("value",cfg.btnOK);
        }
        /***
        ** 用户自定义内容
        ***/
        wrapper.unbind("hide.bs.modal").on("hide.bs.modal",function(e){
            if(cfg.callback && typeof(cfg.callback)=="function") cfg.callback(wrapper);
        });

        if(cfg.type==2){
            header.remove();
            footer.remove();
            /****
            ** 点击空白处 无反应
            ***/
            wrapper.unbind("click").click(function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
            });
        }else{
            wrapper.unbind("click");
        }

        var the = $.extend(true,{},wrapper,wrapper.modal({
            backdrop:cfg.backdrop, //是否显示黑色背景
            keyboard:false
        }));

        return the;//显示alert
    };    
}(jQuery,window));
