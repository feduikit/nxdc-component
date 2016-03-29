/**
** deal dropdown  and dropup  input, select input ,drop button 插件
**author: ericever
**create time: 2015-7-24
**/
;(function($, window, document, undefined){
    'use strict';
    var BootDrop = function (element, options) {
        var self = this;
        self.$element = $(element);
        self.config = $.extend(true,{},$.fn.bootDrop.defaults,element.data(),options);
        var type = self.config.type;
        var list = self.config.list;
        
        function addItem(da){
            if(da.checked){
                var layer = $('<div class="user-layer" id='+da.class+'>');
                layer.append('<ul class="user-title"><li>'+da.text +'</li></ul>');
                layer.append('<ul class="user-body"><li index="0"><select multiple="multiple" class="ext-cond"></li></ul>');
                layer.insertBefore($("#other"));//加入DOM
            }       
        }
        function build(){
            if(type == "input"){
                    var init = self.config.init;
                    var the = $(element);
                    var p = self.config.prop;
                    var sc = self.config.list||(the.data("list") && the.data("list").match(/[^\[\]'",]+/ig))||[];
                    var  hder = self.config.holder||the.data("hold");
                    var  index = (self.config.value>=0)?self.config.value:the.data("val"); 
                    if(the.children().length){//组件已经创建，查看列表是否变化，智能更新列表,更新placeholder
                        var ul = the.find("ul.dropdown-menu");
                        if(sc.join("") != ul.text()){
                            ul.empty();
                        }
                        the.find("input").attr("placeholder",hder);
                        if(index>=0) the.find("input").val(p?sc[index][p]:sc[index]);
                    }else{
                        var input=$('<input class="form-control" type="text" readonly="true" data-toggle="dropdown">');
                        if(hder) input.attr("placeholder",hder)
                        if(self.config.max){
                            var val = self.config.min; 
                        }else{
                            if(index>=0) val = (p&&sc[index])?sc[index][p]:sc[index];
                        }
                        if(val) input.val(val);
                        var caret = $('<span class="caret" data-toggle="dropdown"></span>');
                        var ul = $('<ul class="dropdown-menu">');
                        var len = self.config.max?(self.config.max+1):sc.length;
                        var start = self.config.min||0;
                        if(init && typeof(init)=="function") init(i,sc[index]);
                        for(var i=start;i<len;i++){
                            var da = self.config.max?i:sc[i];
                            var li = $("<li><a>"+(p?da[p]:da)+"</a></li>");
                            ul.append(li);
                            (function(the,li,da,i){
                                li.unbind("click").click(function(){
                                    var c = $(this).text().trim();
                                    if(c!=the.find(type).val()){
                                        the.find(type).val(c).attr("theValue",c);
                                        the.trigger("selectChanged",{index:i,data:da});
                                    }
                                });
                            }(the,li,da,i));
                        }
                        the.append(input).append(caret).append(ul);
                    }                             
            }else if(type=="folder"){
                        var the = $(element);
                        if(self.config.list && self.config.list.length>0){
                            var lis = self.config.list;
                        }else{
                            lis = (the.data("list") && the.data("list").match(/[^\[\]'",]+/ig))||[];
                        }
                        var  hder = self.config.holder||the.data("hold");
                        var  index = parseInt(the.data("val"))||self.config.value;                    
                        if(the.children().length){//组件已经创建，查看列表是否变化，智能更新列表
                            var ul = the.find("ul.dropdown-menu");
                            if(lis.join("") != ul.text()){
                                ul.empty();
                                for(var j=0;j<lis.length;j++){
                                    ul.append("<li><a>"+(lis[j][self.config.prop])+"</a></li>");
                                }
                            }
                            return;
                        }
                        var input = $('<input class="form-control" type="text" readonly="true" data-toggle="dropdown">');
                        if(hder) input.attr("placeholder",hder);
                        if(index!=-1) input.attr("value",lis[index][self.config.prop]);
                        var caret = $('<span class="caret" data-toggle="dropdown"></span>');
                        var ul = $('<ul class="dropdown-menu">');
                        var p = self.config.prop;
                        for(i=0;i<lis.length;i++){
                            var o = lis[i];
                            var li = $("<li>"+(o[p])+"</li>");
                            if(o.sub){
                                (function(li){
                                    li.click(function(e){
                                        e.stopPropagation();
                                        if($(this).find("ul.collapse").hasClass("in")){
                                            $(this).find("ul.collapse").removeClass("in");
                                        }else{
                                            $(this).find("ul.collapse").addClass("in");
                                        }
                                    });
                                }(li));
                                li.attr({"data-toggle":"collapse","aria-expanded":false});                                                             li.attr("data-target","#"+o.class).attr("aria-controls",o.class);
                                li.prepend('<i class="glyphicon glyphicon-triangle-right">');
                                var ull = $("<ul class='sub-list collapse fade' id="+o.class+">");
                                for(var j=0;j<o.sub.length;j++){
                                     addItem(o.sub[j]);
                                    var lii = $("<li>"+o.sub[j][p]+"<i class='glyphicon glyphicon-ok' style='opacity:"+(o.sub[j].checked?1:0)+"'></i></li>"); 
                                    ull.append(lii);
                                    (function(lii,da){
                                        lii.unbind('click').click(function(e){
                                            e.stopPropagation();
                                            var check = $(this).children("i.glyphicon-ok");
                                            var dis = check.css("opacity");
                                            (dis=="0")?check.css("opacity","1"):check.css("opacity","0");
                                            $(this).trigger("toggleItem",{show:parseInt(dis)-1,data:da});
                                        });
                                    }(lii,o.sub[j]));                                    
                                }
                                li.append(ull);
                            }else{
                                addItem(o);
                                li.append('<i class="glyphicon glyphicon-ok" style="opacity:'+(o.checked?1:0)+'"></i>');
                                (function(li,da){
                                    li.unbind('click').click(function(e){
                                        e.stopPropagation();
                                        var check = $(this).children("i.glyphicon-ok");
                                        var dis = check.css("opacity");
                                        (dis=="0")?check.css("opacity","1"):check.css("opacity","0");
                                        $(this).trigger("toggleItem",{show:parseInt(dis)-1,data:da});
                                    });
                                }(li,o));
                            }
                            ul.append(li);
                        }
                        the.append(input).append(caret).append(ul); 
            }                     
        };
        
        function destory(){
            $(element).empty();
            self.$element.children("ul.dropdown-menu>li").unbind("click");
        };
        
        function lastTime(tag){
            self.config.capacity = $(element).find(tag).text()||self.config.capacity;
        }
        
        this.startup = function(){
            build();
			this.$element.find("input[type],span.caret").click(function(e){
				e.stopImmediatePropagation();
				console.log(1111);
				$(this).parent().toggleClass("open");
			});
        }
    };
    
    /***
    ** 入口
    **/
    $.fn.bootDrop = function(options){
		var the = this.first();
        var bd = new BootDrop(the,options);
        bd.startup();
        return the;
    }
	
	/***
	** outside accessible default setting
	**/
	$.fn.bootDrop.defaults = {
        list:null,
        type:"input",//input-drop  or button-drop
        caret:'<span class="caret"></span>',
        capacity:"",//默认 input 里面或者 button 上面应该显示的值
        placeholder:"",//给 input 使用的
        buttonClass:"",
        value:-1,
        porp:null,
        holder:null,
        max:null,
        min:null,
        init:null
	};	
}(jQuery, window, document));