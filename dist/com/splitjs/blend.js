;(function ($) { //start with a [;] 
    var self = this;    	
	//邮件tag
	function tag(item,index,idx){
		var index = index||0;
		var txt = item.label||item.name||item.text||item.value||item;
		var val = item.val||item.value||txt;
		var tag = $('<span class="tag-wrapper" data-text='+txt+' data-val='+val+' data-index='+index+' data-serial='+idx+' >\
		<button type="button" class="close close2" aria-label="Close"><span class="x2" aria-hidden="true">&times;</span></button>\
		<span class="tag-txt-wrapper" >'+txt+'</span>\
		</span>');
		if(item.id) tag.attr("data-id",item.id);//加入id
		return tag;
	}
	/***
	** 构建类目，并加入tag
	***/
	function addClassify(o,idx,dropup){
		var idx = idx || 0;
		var li = $("<li class='blend-sel-item' data-serial="+idx+" />");
		var liclose = '<button type="button" class="close close1" aria-label="Close"><span class="x1"aria-hidden="true">&times;</span></button>';
		var bread = $('<div class="ndp-bread-wrapper"></div>');
		//生成面包屑
		if(o.path) bread.bread({
			list:o.path,
			spliter:">"					
		}).attr("data-path",o.path.join("#"));
		li.attr("data-path",o.path.join("#"));
		var tagbox = $('<div class="tag-box"  />');
		if(o.tags && o.tags.length) o.tags.forEach(function(item,index){
			tagbox.append(tag(item,index,idx));
		});
		li.append(bread).append(tagbox).append(liclose);
		dropup.append(li);
	}

	function Blend(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.blend.defaults,element.data(),options);
		this.init();
		
    };
	/**
	**列表组件的初始化
	**/
    Blend.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
 
		/***
		**
		***/
		_this.input.click(function(e){
			e.stopImmediatePropagation();
			if($(this).val() && _this.drop1.children.length){
				_this.drop1.removeClass("hidden");
			}
		});
		
		//注册事件：
		_this.input.on("input",function(e){
			e.stopImmediatePropagation();
			var key = $(this).val();
		
			var opt = _this.config.ajaxOptions;
			opt.data = {key:key};
			$.ajax(opt).then(function(result){
				if(typeof(result)=="string") result = JSON.parse(result);
				_this.drop1.empty();
				_this.drop2.addClass("hidden");
				_this.insdata = result.data;//保留数据 
				result.data.forEach(function(item,index){
					var txt = (typeof(item)=="string")?item:(item.text||item.label||item.name||item.value);
					var val = item.value||item.val||txt;
					var re2 = new RegExp("["+key+"]+","i");	
					var re = new RegExp(key,"i");
					if(String(val).match(re)){
						var ma = String(txt).match(re)[0];
					}else if(String(txt).match(re2)){
						ma = String(txt).match(re2)[0];
					}else{
						ma = "";				
					}
					var len = ma.length;
					var ree = new RegExp(ma,"i");
					var start = txt.search(ree);
					var arr = txt.split("");
					arr.splice(start,0,"<em>");
					arr.splice((start+len+1),0,"</em>");
					var val1 = arr.join("");
					var asize = item.audienceSize||item.audience_size;
					var li = '<li val="'+val+'"  tabIndex='+index+' >\
					<a class="txt-mark" href="#" data-id='+(item.id)+' data-val='+val+' index='+index+' data-name='+txt+' data-path='+item.path.join("#")+' data-size='+asize+' >'+(val1||txt)+'<span class="aud-class">'+asize+'</span></a></li>';
					_this.drop1.append(li);
				});	
				_this.drop1.removeClass("hidden");
			},function(err){
					console.log(err);
			});
		});
		
		/****
		** 点击其中一项后，不消失
		***/
		_this.drop1.click(function(e){
			e.stopImmediatePropagation();
			var the = $(e.target);
			if(e.target.tagName=="A" && the.hasClass("txt-mark")){
				if(the.hasClass("selected")) return false;//如果是已经selected  就不要加了
				var index = the.attr("index");
				var path = the.data("path");
				var li = _this.dropup.find("li[data-path="+path+"]");
				var box = li.find(".tag-box");
				var dat = the.data();
				if(li.length){//已经存在分类了，
					var serial = parseInt(li.data("serial"));			
					box.append(tag(dat,box.children().length,serial));
					//加到数据里面去
					var arr = _this.config.seldata;
					for(var i=0;i<arr.length;i++){
						var dt = arr[i];
						if(dt.path.join("#")==dat.path){
							dt.tags.push({name:dat.name,id:dat.id,audience_size:dat.size});
							break;//跳出循环
						}
					}					
				}else {
					dat.path = dat.path.split("#");
					dat.tags = [dat.name];
					addClassify(dat,0,_this.dropup);// 出现在DOM上
					_this.config.seldata.push(dat);	//加入数据中			
				}
				the.addClass("selected");
				fireEvent(_this.elem.get(0),"ITEM_CLICK",_this.insdata[index]);
			}
		});
		/***
		** 点击input 后面的图标出现树桩下拉次菜单
		***/
		_this.icon.click(function(e){
			e.stopImmediatePropagation();
			_this.input.val("");
			_this.drop1.addClass("hidden").empty();
			_this.drop2.removeClass("hidden");
		});
		
		/*****
		***  选中按钮 点击x 之后
		****/
		_this.dropup.click(function(e){
			e.stopImmediatePropagation();
			//标签x 被点击
			if((e.target.tagName=="BUTTON" && $(e.target).hasClass("close2"))||
			    e.target.tagName=="SPAN" && $(e.target).hasClass("x2")){
				var ta = $(e.target).parents("span.tag-wrapper:first");
				var box = ta.parent();
				var row = ta.parents("li.blend-sel-item:first");
				var serial = ta.data("serial");
				var idx = parseInt(ta.data("index"));
				ta.remove();//删除 这个tag  DOM 
				//从数据中删除
				var arr = _this.config.seldata[serial].tags;
				var dat = arr.splice(idx,1);//删除的数据
				if(!box.children().length) row.remove();
				//发出事件,用户点击了
				fireEvent(_this.elem.get(0),"TAG_RESIGN",dat);
			}// 一行 x 被点击
			else if((e.target.tagName=="BUTTON" && $(e.target).hasClass("close1"))||
			    e.target.tagName=="SPAN" && $(e.target).hasClass("x1")){
				var tali = $(e.target).parents(".blend-sel-item:first");
				var serial = parseInt(tali.data("serial"));
				tali.remove();//删除一行
				var data = _this.config.seldata.splice(serial,1);//删除这一行的数据
				fireEvent(_this.elem.get(0),"SERIAL_RESIGN",data);
			}
		});
		
		//点击返回按钮
		this.vlist.on("RETURN_BACK",function(){
			_this.vlist.hspanel();
		});
		
		/***
		** 推荐里面的下拉菜单, 加入数据
		**/
		this.vlist.on("ITEM_CLICK",function(e){
			var dat = e.originalEvent.data;
			if(!dat.search){
				var li = _this.dropup.find("li[data-path="+dat.path+"]");
				var box = li.find(".tag-box");
				if(li.length){//已经存在分类了，
					var serial = parseInt(li.data("serial"));			
					box.append(tag(dat,box.children().length,serial));// 放到 DOM树里面去
					//加到数据里面去
					var arr = _this.config.seldata;
					for(var i=0;i<arr.length;i++){
						var dt = arr[i];
						if(dt.path.join("#")==dat.path){
							dt.tags.push({name:dat.name,id:dat.id,audience_size:dat.size});
							break;//跳出循环
						}
					}
				}else{
					dat.path = dat.path.split(">");
					dat.tags = [{name:dat.name,id:dat.id,audience_size:dat.size}];
					addClassify(dat,0,_this.dropup);//加到DOM 树，
					//加到数据里面去
					_this.config.seldata.push(dat);
				}				
			}
		});
		
		
		/****
		** 点击域外区域，收起下拉菜单
		***/
		$(document).click(function(){
			_this.drop1.addClass("hidden");
			_this.drop2.addClass("hidden");
			_this.vlist.fold();
			_this.vlist.hspanel();
		});
    };
	
	/****
	** 重新设置，向上弹出部分的位置信息，top  
	***/
	Blend.prototype.resizeDropup = function(){
//		var h = this.dropup.height();
//		this.dropup.css("top",(-h-4)+"px");
	}
	
	/**
	** 构建基础结构
	**/
	Blend.prototype.concrate = function(data){
		var _this = this;
		this.input = $("<input class='form-input blend-input' />");
		this.downwrapper = $("<div class='down-wrapper' />");
		this.icon = $("<span class='icon-wrapper'><i class='glyphicon glyphicon-thumbs-up'></i></span>");
		this.drop1 = $('<ul class="dropdown-menu blend-search-drop hidden"  />');//搜索的下拉菜单
		this.drop2 = $('<div class="ndp-vList3-wrapper blend-classify-drop hidden" name="blend-rec" />');//分类下拉菜单
		this.dropup = $('<ul class="dropdown-menu blend-dropup" >');
		this.vlist = this.drop2.vList3({
			data:_this.config.recdata,
			ajaxOption:_this.config.reajaxOption
		});//实例化推荐下拉菜单
		
		this.downwrapper.append(this.input).append(this.icon).append(this.drop1).append(this.drop2);
		this.elem.append(this.dropup).append(this.downwrapper);
	};

	/****
	** 初始化，用户设置的配置项
	****/
    Blend.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		if(cfg.seldata && cfg.seldata.length){
			cfg.seldata.forEach(function(o,idx){
				addClassify(o,idx,_this.dropup);
			});	
			this.resizeDropup();
		}
	}
    /**
	  ** prototype
     */
    $.fn.blend = function (options) {
		var the = this.first();
        var blend = new Blend(the, options);
        the = $.extend(true,{},the,new exchange(blend));
		return the;
    };
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(blend){
		
		// 选择的数据
		this.seldata = function(){
			return blend.config.seldata;
		};
			
		/***
		**更新 搜索的ajax 请求配置
		***/
		this.updateOption = function(o){
			blend.config.reajaxOption = o;
			blend.vlist.updateOption(o);
			return blend.elem;
		}	
    }
	
	
	  var old = $.fn.blend;
	  $.fn.blend.Constructor = Blend;
	  // table NO CONFLICT
	  // ===============
	  $.fn.blend.noConflict = function () {
		$.fn.blend = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.blend.defaults = {
        ajaxOptions: {
            type: "GET",
            url: "../data/blend.json",
			xhrFields: { withCredentials: true}
        },
		reajaxOption:{//点击手型，出现下拉菜单里面的搜索
            type: "GET",
            url: "../data/blend.json",
			xhrFields: { withCredentials: true}				
		},
		recdata:null,//推荐下拉菜单数据
		seldata:null// 选中上拉菜单数据
	};
}(jQuery));
