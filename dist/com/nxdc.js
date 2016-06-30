/***
**兼容Object.keys 不支持情况iang
**/
if (!Object.keys) Object.keys = function(o) {
	if (o !== Object(o))
		throw new TypeError('Object.keys called on a non-object');
	var k=[],p;
	for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
	return k;
}
;(function(win){
    /**
    ** 派发自定义事件
    ** 使用 es6 的 发送事件方法
    **/
    win.fireEvent = function(ta,type,data,bub){
		ta = ta || document;
		var evt = new Event(type,{bubbles:bub||true});
		evt.data = data || {name:"unknow"};
		ta.dispatchEvent(evt);
    }
	
}(window));
;(function ($,win) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
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

;(function ($) { //start with a [;] 
    var self = this;
	var Tool = {
		//创建一个tag
		tag:function (item,idx){
			var txt = item.label||item.name||item.text||item.value||item;
			var val = item.val||item.value||txt;
			var tag = $('<span class="tag-wrapper" data-text="'+txt+'" data-val="'+val+'" data-serial="'+idx+'" >\
			<button type="button" class="close close2" aria-label="Close"><span class="x2" aria-hidden="true">&times;</span></button>\
			<span class="tag-txt-wrapper" >'+txt+'</span>\
			</span>');
			if(item.id) tag.attr("data-id",item.id);//加入id
			return tag;
		},
		/***
		** 构建类目，并加入tag
		***/
		addClassify:function (o,idx,dropup, _drop1, _drop2){
			dropup.removeClass("hidden");
			var idx = idx || 0;
			var li = $("<li class='blend-sel-item' data-serial="+idx+" />");
			var liclose = '<button type="button" class="close close1" aria-label="Close"><span class="x1"aria-hidden="true">&times;</span></button>';
			var bread = $('<div class="ndp-bread-wrapper"></div>');
			//生成面包屑
			if(o.path) bread.bread({
				list:o.path,
				spliter:">"					
			}).attr("data-path",o.path.join("#").replace(/\s/g,""));
			li.attr("data-path",o.path.join("#").replace(/\s/g,""));
			var tagbox = $('<div class="tag-box"  />');
			if(o.start && o.end){//如果是日期
				var arr = [];
				for(var i=0;i<=40;i++){
					arr.push({text:(1980+i),val:(1980+i)});
				}
				var start = $("<div class='ndp-drop3-wrapper year' name='year-start' />").drop3({
					data:arr,
					allowInput:false,
					bind:dropup.parent(),
					caret:"glyphicon-menu-right"
				}).val(o.start).on("ITEM_CLICK",function(e){
					o.start = e.originalEvent.data.val;
				});
				var end = $("<div class='ndp-drop3-wrapper year' name='year-end' />").drop3({
					data:arr,
					allowInput:false,
					bind:dropup.parent(),
					caret:"glyphicon-menu-right"
				}).val(o.end).on("ITEM_CLICK",function(e){
					o.end = e.originalEvent.data.val;
				}); 
				tagbox.append(start).append("<hr />").append(end);
				Tool.select(_drop1, _drop2, o.type)
			}else if(o.tags && o.tags.length) {
				o.tags.forEach(function(item,index){
					tagbox.append(Tool.tag(item,idx));
					Tool.select(_drop1, _drop2, item.type, item.id);
				});
			}
			li.append(bread).append(tagbox).append(liclose);
			dropup.append(li);
		},
		select : function(_drop1, _drop2, _type, _id){
			//外部搜索框
			_drop1.find('a[data-type="' + _type +'"]' + (_id ? '[data-id="' + _id + '"]' : ''))
				.addClass("selected");
			//树状
			_drop2.find('li[data-type="' + _type +'"]' + (_id ? '[data-id="' + _id + '"]' : ''))
				.addClass("selected");
	    }
	};

	function Blend(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.blend.defaults,element.data(),options);
		self.config = this.config;
		this.init();
		element.data('blend', this);
    };
	/**
	**列表组件的初始化
	**/
    Blend.prototype.init = function () {
        var _this = this;
		if (this.config.containerClass){
			var _container = $('<div></div>')
			this.elem.parent().append(_container);
			_container.addClass(this.config.containerClass);
			_container.append(this.elem);
			self.pClass = this.config.containerClass;
		} else {
			self.pClass = "ndp-blend-wrapper";
		}
		//this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
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

		// mac 系统下，keyup 监听不到 metaKey 事件
		//监听 粘帖事件，处理请求
		_this.input.keydown(function(e){
			if((e.metaKey ||e.ctrlKey) && e.keyCode==86){
				e.stopImmediatePropagation();
				_this.paste = true;
			}
		});
		
		//注册事件：
		_this.input.on("input",function(e){
			e.stopImmediatePropagation();
			var key = $(this).val();
			if(_this.paste){//标记，表示当前处在 粘帖状态
				_this.paste = false;// 取消标注
				if(_this.config.pastecallback){
					_this.config.pastecallback(key,_this.dropup,_this.config.seldata,Tool);
					return false;// 不进行下面的请求了
				}
			}
			var opt = $.extend({}, _this.config.ajaxOptions);
			if (!opt.data){
				opt.data = {key:key};
			} else if (typeof opt.data === 'function') {
				opt.data = opt.data(key);
			}
			//opt.processResults = null;
			if (_this.xhr != null) {
				//终止上一次的请求
				_this.xhr.abort();

				_this.xhr = null;
			}
			_this.xhr = $.ajax(opt);
			_this.xhr.then(function(result){
				if (_this.config.ajaxOptions.processResults){
					result = _this.config.ajaxOptions.processResults(result)
				}
				if(typeof(result)=="string") result = JSON.parse(result);
				_this.drop1.empty();
				_this.drop2.addClass("hidden");
				_this.insdata = result.data;//保留数据
				if (_this.insdata && _this.insdata.length){
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
						var li = $('<li val="'+val+'"  tabIndex='+index+' >\
					<a class="txt-mark" href="#" data-type="'+(item.type)+'" data-id="'+(item.id)+'" data-val="'+val+'" index="'+index+'" data-name="'+txt+'" data-path="'+item.path.join("#").replace(/\s/g,"") +'" data-size="'+asize+'" >'+(val1||txt)+'<span class="aud-class">'+asize+'</span></a></li>');
						item.path = item.path.join("#").replace(/\s/g,"");
						li.find(".txt-mark").data("info", item);
						_this.drop1.append(li);
					});
				} else {
					_this.drop1.append('<li class="no-result">' + _this.config.formatNoMatches+ '</li>');
				}
				_this.drop1.removeClass("hidden");
			},function(err){
					console.log(err);
			});
		});
		
		/****
		** 点击其中一项后，不消失
		***/
		_this.drop1.click(function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			var the = $(e.target);
			if(e.target.tagName=="A" && the.hasClass("txt-mark")){
				if(the.hasClass("selected")) return false;//如果是已经selected  就不要加了
				//modify by sisi 为了保证数据尽可能完整的返回 故修改成 .data("info")
				_this.selectDAT([the.data("info")]);
				var index = the.attr("index");
				the.addClass("selected");
				fireEvent(_this.elem.get(0),"ITEM_CLICK",the.data("info"));
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
				//var serial = ta.data("serial");
				var serial = row.index();
				//var idx = parseInt(ta.data("index"));
				var idx = ta.index();
				ta.remove();//删除 这个tag  DOM
				//从数据中删除
				var parent = _this.config.seldata[serial];
				var arr = parent.tags;
				var dat = arr.splice(idx,1);//删除的数据
			    if (dat && dat[0]){
					//下拉列表中selected恢复让其可选
					_this.unSelect(parent.type, dat[0].id);
				}
				if(!box.children().length){
					row.remove();
					_this.config.seldata.splice(serial,1);
				}
				$(_this.elem.get(0)).data("seldata", _this.config.seldata);
				//发出事件,用户点击了
				fireEvent(_this.elem.get(0),"TAG_RESIGN",dat);
			}// 一行 x 被点击
			else if((e.target.tagName=="BUTTON" && $(e.target).hasClass("close1"))||
			    e.target.tagName=="SPAN" && $(e.target).hasClass("x1")){
				var tali = $(e.target).parents(".blend-sel-item:first");
				//var serial = parseInt(tali.data("serial"));
				var serial = tali.index();
				tali.find(".ndp-drop3-wrapper").trigger("BEEN_REMOVED");
				tali.remove();//删除一行
				var data = _this.config.seldata.splice(serial,1);//删除这一行的数据
				if (data && data[0]){
					if (data[0].tags && data[0].tags.length > 0){
						//有子项，无子项
						//下拉列表中selected恢复让其可选
						var parent = data[0];
						var tags = parent.tags;
						$.each(tags, function(_i, _tag){
							_this.unSelect(parent.type, _tag.id);
						})
					} else {
						_this.unSelect(data[0].type);
					}

				}
				$(_this.elem.get(0)).data("seldata", _this.config.seldata);
				fireEvent(_this.elem.get(0),"SERIAL_RESIGN",data);
			}

			if (!_this.dropup.find("li").length){
				_this.dropup.addClass("hidden");
			}
		});

		Blend.prototype.unSelect = function(_type, _id){
			var _this = this;
			//外部搜索框
			_this.drop1.find('a[data-type="' + _type +'"]' + (_id ? '[data-id="' + _id + '"]' : ''))
				.removeClass("selected");
			//树状
			_this.drop2.find('li[data-type="' + _type +'"]' + (_id ? '[data-id="' + _id + '"]' : ''))
					.removeClass("selected");
		}

		Blend.prototype.select = function(_type, _id){
			var _this = this;
			//外部搜索框
			_this.drop1.find('a[data-type="' + _type +'"]' + (_id ? '[data-id="' + _id + '"]' : ''))
				.addClass("selected");
			//树状
			_this.drop2.find('li[data-type="' + _type +'"]' + (_id ? '[data-id="' + _id + '"]' : ''))
				.addClass("selected");
		}

		//点击返回按钮
		this.vlist.on("RETURN_BACK",function(){
			_this.vlist.hspanel();
		});
		
		/****
		** vlist3 里面的 searchx 第三方抛出的事件
		****/
		this.vlist.on("ITEM_SELECT",function(e){
			var dat = e.originalEvent.data;
			_this.selectDAT([dat]);
			fireEvent(_this.elem.get(0),"ITEM_CLICK",dat);
		});
		
		/***
		** 推荐里面的下拉菜单, 加入数据
		**/
		this.vlist.on("ITEM_CLICK",function(e){
			e.preventDefault();
			var dat = e.originalEvent.data;
			if(!dat.search){
				_this.selectDAT([dat]);
			}
		});


		/****
		** 点击域外区域，收起下拉菜单
		***/
		var _s = 'mouseup.' + self.pClass;
		$(document.body).off(_s)
			.on(_s, function (e) {
			var $target = $(e.target);
			var $blend = $target.closest('.' + self.pClass);
			if ($target.parents(".drop3-list-wrapper").length){
				$($blend[0]).addClass("ndp-blend-wrapper-open");
				return;
			}
			$($blend[0]).addClass("ndp-blend-wrapper-open");
			var $all = $('.'+ self.pClass + '.ndp-blend-wrapper-open');

			$all.each(function () {
				var $this = $(this);
				if (this == $blend[0]) {
					if (!$target.parents(".drop3-list-wrapper").length){
						var $element = getCurrentElement($this);
						//取消 年份下拉菜单的focus 信息和 下拉菜单
						$.each($element.dropup.find(".ndp-drop3-wrapper"), function(i, _drop3){
							$(_drop3).drop3("close");
						});
					}
					return;
				}
				//如果点击区域不在当前blend区域内，则恢复其他blend为初始状态
				$this.removeClass("ndp-blend-wrapper-open");
				var $element = getCurrentElement($this);
				_this.close($element)
			});

			//获取当前元素
			function getCurrentElement($this){
				var $element;
				if (self.pClass == 'ndp-blend-wrapper'){
					$element = $this.data('blend');
				} else {
					$element = $this.find(".ndp-blend-wrapper").data('blend');
				}
				return $element;
			}
		})

		_this.listenScroll();
    };

	Blend.prototype.close = function($element){
		var _this = this;
		if (!$element){
			$element = _this;
		}
		console.log($element)
		$element.input.val("");
		$element.drop1.addClass("hidden").empty();
		$element.drop2.addClass("hidden");
		$element.vlist.fold();
		$element.vlist.hspanel();
		//取消 年份下拉菜单的focus 信息和 下拉菜单
		$.each($element.dropup.find(".ndp-drop3-wrapper"), function(i, _drop3){
			console.log("关闭drop3")
			$(_drop3).drop3("close");
		});
		fireEvent($element.elem.get(0),"close");
	}

	/***
	**
	***/
	Blend.prototype.selectDAT = function(dats){
		var _this = this;
		_this.dropup.removeClass("hidden");
		$.each(dats, function(i, dat){
			var li = _this.dropup.find("li[data-path='"+dat.path+"']");
			if(li.length){//已经存在分类了
				var box = li.find(".tag-box");
				//tag以id作为唯一标识
				if (box.find('span[data-id="' + dat.id + '"]').length == 0){
					var serial = parseInt(li.data("serial"));
					box.append(Tool.tag(dat,serial));// 放到 DOM树里面去
					//加到数据里面去
					var arr = _this.config.seldata;
					for(var i=0;i<arr.length;i++){
						var dt = arr[i];
						if(dt.path.join("#").replace(/\s/g,"") ==dat.path ){
							dt.tags.push({name:dat.name,id:dat.id,audience_size:dat.size,type:dat.type});
							$(_this.elem.get(0)).data("seldata", _this.config.seldata);
							break;//跳出循环
						}
					}
				}
			}else{
				var _newData = {};
				_newData = $.extend(_newData, dat);
				_newData.path = dat.path.split("#");
				_newData.tags = [{name:dat.name,id:dat.id,audience_size:dat.size,type:dat.type}];
				Tool.addClassify(_newData,0,_this.dropup, _this.drop1, _this.drop2);//加到DOM 树，
				//加到数据里面去
				if(!_this.config.seldata) _this.config.seldata = [];
				_this.config.seldata.push(_newData);
				$(_this.elem.get(0)).data("seldata", _this.config.seldata);
			}
		})
	}
	
	
	/****
	** 重新设置，向上弹出部分的位置信息，top  
	***/
	Blend.prototype.resizeDropup = function(){
//		var h = this.dropup.height();
//		this.dropup.css("top",(-h-4)+"px");
	}
	
	Blend.prototype.listenScroll = function(){
		var _this = this;
		_this.elem.find(".blend-dropup").scroll(function(e){
			$.each(_this.elem.find(".ndp-drop3-wrapper"), function(i, _drop3){
				$(_drop3).trigger("WRAPPER_SCROLL",e.target);
			});

			fireEvent(_this.elem.get(0),"BLEND_DROPUP_SCROLL");
		});
	}
	/**
	** 构建基础结构
	**/
	Blend.prototype.concrate = function(data){
		var _this = this;
		this.input = $("<input class='form-input blend-input' />");
		this.downwrapper = $("<div class='down-wrapper' />");
		this.icon = $("<span class='icon-wrapper'></span>");
		if (_this.config.icon){
			this.icon.append(_this.config.icon);
		} else {
			this.icon.append("<i class='glyphicon glyphicon-thumbs-up'></i>");
		}
		this.drop1 = $('<ul class="dropdown-menu blend-search-drop hidden"  />');//搜索的下拉菜单
		this.drop2 = $('<div class="ndp-vList3-wrapper blend-classify-drop hidden" name="blend-rec" />');//分类下拉菜单
		this.dropup = $('<ul class="dropdown-menu blend-dropup hidden" >');
		this.vlist = this.drop2.vList3({
			data:_this.config.recdata,
			ajaxOption:_this.config.reajaxOptions,
			returnList : _this.config.returnList,
			formatNoMatches : _this.config.formatNoMatches
		});//实例化推荐下拉菜单

		this.vlist.updateTip(_this.config.tip);//更新搜索提示文字
		this.elem.css("visibility", "hidden");
		this.elem.css("position", "absolute");
		this.downwrapper.append(this.input).append(this.icon).append(this.drop1).append(this.drop2);
		this.elem.append(this.dropup).append(this.downwrapper);
		//临时解决树状菜单图标自定义过宽引起的问题（推荐英文版 recommendation 很长）
		var _lw = this.icon.width();
		var _w = this.elem.width() -  _lw - 50;
		this.input.css('width',_w);
		this.drop1.css('width',_w);
		this.drop2.css('width',_w);
		this.dropup.css('width',_w);
		this.elem.css("position", "relative");
		this.elem.css("visibility", "visible");
	};

	/****
	** 初始化，用户设置的配置项
	****/
    Blend.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		if(cfg.seldata && cfg.seldata.length){
			cfg.seldata.forEach(function(o,idx){
				Tool.addClassify(o,idx,_this.dropup, _this.drop1, _this.drop2);
			});
			$(_this.elem.get(0)).data("seldata", _this.config.seldata);
		}
	}
    /**
	  ** prototype
     */
    $.fn.blend = function (options) {
		var the = this.first();
		if (typeof options === 'object'){
			var blend = new Blend(the, options);
			the = $.extend(true,{},the,new exchange(blend));
			return the;
		} else if (typeof options === 'string'){
			var instance = the.data('blend');
			var args = Array.prototype.slice.call(arguments, 1);
			var ret;
			if (options == 'close'){
				ret = instance[options]();
			} else if (options == 'selectDAT'){
				ret = instance[options](args[0]);
			}
			else {
				ret = instance[options](args);
			}
			return ret;
		}

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
		};
		
		// 更新 内部搜索，底部显示的提示内容
		this.updateTip = function(txt){
			blend.vlist.updateTip(txt);
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
		tip:"搜索国家地理信息，请输入关键字",
        ajaxOptions: {//输入文字，走的ajax
            type: "GET",
            url: "../data/blend.json",
			xhrFields: { withCredentials: true}
        },
		formatNoMatches : "查无结果",//无查询结果提示
		pastecallback:null,//粘帖进行的回调
		reajaxOptions:null,//点击手型，出现下拉菜单里面的搜索
		recdata:null,//推荐下拉菜单数据
		seldata:[],// 选中上拉菜单数据
		containerClass:null
	};
}(jQuery));

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
;(function ($) { //start with a [;] 
    var self = this;    
    
	function ellipsis(_this){
		var w = _this.elem.width();
		if(_this.config.wis>=(w-40)){
			var perw = (w-40)/_this.config.list.length;
			_this.breadwrapper.find("li").css({"maxWidth":perw+"px"}).addClass("cus");
		}else{
			_this.breadwrapper.find("li").removeAttr("style").removeClass("cus");
		}		
	}
	
	function Bread(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.bread.defaults,element.data(),options);
		this.config.w = this.elem.width();
		this.init();
    };
	/**
	**列表组件的初始化
	**/
    Bread.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
      
		//监听事件
		_this.breadwrapper.find("li:has(a)").click(function(e){
			e.stopImmediatePropagation();
			var index = parseInt($(this).attr("deep"));
			var value =  $(this).text();
			if(_this.config.home && index==0){
				$(this).addClass("active").empty().text(_this.config.list[index]).prepend(_this.config.home);
			}else{
				$(this).addClass("active").empty().text(_this.config.list[index]);
			}
			_this.breadwrapper.find("li:gt("+index+")").remove();
			//面包屑的层级发生改变
			fireEvent(_this.elem.get(0),"LAYER_CHANGE",{index:index,text:value});
		});
		
		$(window).resize(function(){
			ellipsis(_this);
		});
    };
	
	/**
	** 构建下来菜单样子
	**/
	Bread.prototype.concrate = function(data){
		var _this = this;
		var w = 0;
		this.breadwrapper = $("<ol class='breadcrumb'/>");
		var thespan = document.createElement("span");
		thespan.style.opacity = "0";
		thespan.style.visibility="hidden";
		thespan.style.position="absolute";
		document.body.appendChild(thespan);
		_this.config.list.forEach(function(item,index){
			if(typeof(item)=="string"||typeof(item)=="number"){
				var str= item;
			}else{
				str = item.name||item.text||item.label;
			}
			thespan.innerHTML = str;
			var thew = thespan.getBoundingClientRect().width;
			w+= thew;
			if(index !=_this.config.list.length-1){
				_this.breadwrapper.append("<li deep="+index+" w="+thew+" title="+str+" ><a href='#'><span>"+str+"</span></a></li>");
			}else{
				_this.breadwrapper.append("<li class='active' deep="+index+" w="+thew+" title="+str+" ><span>"+str+"</span></li>");
			}
			
			// 最后一个数组元素处理完毕
			if(index == _this.config.list.length-1){
				document.body.removeChild(thespan);
				_this.config.wis = w;
			}
		});
		
		//如果文字超出长度		
		ellipsis(_this);
		_this.elem.append(_this.breadwrapper);
	};

    Bread.prototype.initConfig = function(){
        var _this = this;
		_this.breadwrapper.find("li:gt(0)").addClass("change").attr("data-content",_this.config.spliter);
 		if(_this.config.home){
			_this.breadwrapper.find("li:first>a").prepend(_this.config.home).addClass("bread-home-decorate");
		}
	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.bread = function (options) {
		var the = this.first();
        var bread = new Bread(the, options);
       the = $.extend(true,{},the,new exchange(bread));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(drop){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){
            
        }
    }
	
	
	  var old = $.fn.bread;
	  $.fn.bread.Constructor = Bread;
	  // table NO CONFLICT
	  // ===============
	  $.fn.bread.noConflict = function () {
		$.fn.bread = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.bread.defaults = {
		home:"",//图标 只能使用 bootstrap 里面的图标
		spliter:"/",
		list:[]
	};
}(jQuery));

;(function ($) {
    var self = this;    
    function Bubble(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.bubble.defaults,element.data(),options);
		this.init();
    };
	/**
	**列表组件的初始化
	**/
    Bubble.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
		//$('[data-toggle="popover"]').popover();	
		
		//处理事件	
		//图标被点击之后
		this.elem.popover(_this.config);
		this.elem.click(function(e){
			var id = _this.elem.attr("aria-describedby");
			setTimeout(function(){
				if(!id) { _this.elem.popover('show'); }
				if(id){
						var pop = $("#"+id);
						//点击关闭按钮
						pop.find("button.close").click(function(e){
							e.stopImmediatePropagation();
							_this.elem.popover('hide');
						});

						//点击cancel 按钮
						pop.find("button[name=cancel]").click(function(e){
							e.stopImmediatePropagation();
							fireEvent(pop.get(0),"bubble_cancel");
							_this.elem.popover('hide');
						});

						//点击ok 按钮
						pop.find("button[name=ok]").click(function(e){
							e.stopImmediatePropagation();
							fireEvent(pop.get(0),"bubble_ok");
							_this.elem.popover('hide');
						});				
				};				
				
			},150);			
		});
    };
	
	/***
	**
	***/
	Bubble.prototype.concrate = function(data){
		var _this = this;		
	};

    Bubble.prototype.initConfig = function(){
		var _this = this;
		var cfg = this.config;
		if(cfg.icon){
			var reg = /\.(jpg|jpeg|gif|png|bmp)(\?)?.?/i;
			if(reg.test(cfg.icon)){
				_this.img =  $("<img width='100%' height='100%' />").attr("src",cfg.icon);
			}else{
				_this.img = $(cfg.icon);
			}
			this.elem.append(_this.img);
		}
		
		var html = $("<div />").append(cfg.template);
			html.find("button.close").toggleClass("close2",cfg.title?true:false);
		    html.find("button.close").toggleClass("hidden",cfg.close);
			html.children().attr("type",cfg.type);
			cfg.template = html.html();
	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.bubble = function (options) {
		var the = this.first();
        var bubble = new Bubble(the, options);
        the = $.extend(true,{},the,new exchange(bubble));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(bubble){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){
            
        }
    }
	
	
	  var old = $.fn.bubble;
	  $.fn.bubble.Constructor = Bubble;
	  // table NO CONFLICT
	  // ===============
	  $.fn.bubble.noConflict = function () {
		$.fn.bubble = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.bubble.defaults = {
		type:1,//1 普通模板， 2 有footer 按钮的模板
		icon:"<i class='glyphicon glyphicon-user'></i>",
		placement:"bottom",
		content:"",//文字或者内容
		close:false,//是否显示 x  关闭按钮
		template:'<div class="popover" role="tooltip">\
						<div class="arrow"></div>\
						 <button type="button" class="close" aria-label="Close">\
							<span aria-hidden="true">&times;</span>\
						 </button>\
						<div class="popover-title"></div>\
						<div class="popover-content"></div>\
						<div class="popover-footer">\
							<button class="btn btn-default" name="cancel" >取消</button>\
							<button class="btn btn-default" name="ok" >确定</button>\
						</div>\
					</div>'
	};
}(jQuery));

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

/**
* @version: 2.1.18
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2015 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: https://www.improvely.com/
*/

(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['moment', 'jquery', 'exports'], function(momentjs, $, exports) {
      root.daterangepicker = factory(root, exports, momentjs, $);
    });

  } else if (typeof exports !== 'undefined') {
      var momentjs = require('moment');
      var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;  //isomorphic issue
      if (!jQuery) {
          try {
              jQuery = require('jquery');
              if (!jQuery.fn) jQuery.fn = {}; //isomorphic issue
          } catch (err) {
              if (!jQuery) throw new Error('jQuery dependency not found');
          }
      }

    factory(root, exports, momentjs, jQuery);

  // Finally, as a browser global.
  } else {
    root.daterangepicker = factory(root, {}, root.moment || moment, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this || {}, function(root, daterangepicker, moment, $) { // 'this' doesn't exist on a server

    var DateRangePicker = function(element, options, cb) {

        //default settings for options
        this.parentEl = 'body';
        this.element = $(element);
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.minDate = false;
        this.maxDate = false;
        this.dateLimit = false;
        this.autoApply = false;
        this.singleDatePicker = false;
        this.showDropdowns = false;
        this.showWeekNumbers = false;
        this.showISOWeekNumbers = false;
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        this.linkedCalendars = true;
        this.autoUpdateInput = true;
        this.alwaysShowCalendars = false;
        this.ranges = {};

        this.opens = 'right';
        if (this.element.hasClass('pull-right'))
            this.opens = 'left';

        this.drops = 'down';
        if (this.element.hasClass('dropup'))
            this.drops = 'up';

        this.buttonClasses = 'btn btn-sm';
        this.applyClass = 'btn-success';
        this.cancelClass = 'btn-default';

        this.locale = {
            format: 'MM/DD/YYYY',
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        };

        this.callback = function() { };

        //some state information
        this.isShowing = false;
        this.leftCalendar = {};
        this.rightCalendar = {};

        //custom options from user
        if (typeof options !== 'object' || options === null)
            options = {};

        //allow setting options with data attributes
        //data-api options will be overwritten with custom javascript options
        options = $.extend(this.element.data(), options);

        //html template for the picker UI
        if (typeof options.template !== 'string' && !(options.template instanceof jQuery))
            options.template = '<div class="daterangepicker dropdown-menu">' +
                '<div class="calendar left">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini" type="text" name="daterangepicker_start" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' +
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="calendar right">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini" type="text" name="daterangepicker_end" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' +
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="ranges">' +
                    '<div class="range_inputs">' +
                        '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
                        '<button class="cancelBtn" type="button"></button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(options.template).appendTo(this.parentEl);

        //
        // handle all the possible options overriding defaults
        //

        if (typeof options.locale === 'object') {

            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;

            if (typeof options.locale.separator === 'string')
                this.locale.separator = options.locale.separator;

            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

            if (typeof options.locale.monthNames === 'object')
              this.locale.monthNames = options.locale.monthNames.slice();

            if (typeof options.locale.firstDay === 'number')
              this.locale.firstDay = options.locale.firstDay;

            if (typeof options.locale.applyLabel === 'string')
              this.locale.applyLabel = options.locale.applyLabel;

            if (typeof options.locale.cancelLabel === 'string')
              this.locale.cancelLabel = options.locale.cancelLabel;

            if (typeof options.locale.weekLabel === 'string')
              this.locale.weekLabel = options.locale.weekLabel;

            if (typeof options.locale.customRangeLabel === 'string')
              this.locale.customRangeLabel = options.locale.customRangeLabel;

        }

        if (typeof options.startDate === 'string')
            this.startDate = moment(options.startDate, this.locale.format);

        if (typeof options.endDate === 'string')
            this.endDate = moment(options.endDate, this.locale.format);

        if (typeof options.minDate === 'string')
            this.minDate = moment(options.minDate, this.locale.format);

        if (typeof options.maxDate === 'string')
            this.maxDate = moment(options.maxDate, this.locale.format);

        if (typeof options.startDate === 'object')
            this.startDate = moment(options.startDate);

        if (typeof options.endDate === 'object')
            this.endDate = moment(options.endDate);

        if (typeof options.minDate === 'object')
            this.minDate = moment(options.minDate);

        if (typeof options.maxDate === 'object')
            this.maxDate = moment(options.maxDate);

        // sanity check for bad options
        if (this.minDate && this.startDate.isBefore(this.minDate))
            this.startDate = this.minDate.clone();

        // sanity check for bad options
        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();

        if (typeof options.applyClass === 'string')
            this.applyClass = options.applyClass;

        if (typeof options.cancelClass === 'string')
            this.cancelClass = options.cancelClass;

        if (typeof options.dateLimit === 'object')
            this.dateLimit = options.dateLimit;

        if (typeof options.opens === 'string')
            this.opens = options.opens;

        if (typeof options.drops === 'string')
            this.drops = options.drops;

        if (typeof options.showWeekNumbers === 'boolean')
            this.showWeekNumbers = options.showWeekNumbers;

        if (typeof options.showISOWeekNumbers === 'boolean')
            this.showISOWeekNumbers = options.showISOWeekNumbers;

        if (typeof options.buttonClasses === 'string')
            this.buttonClasses = options.buttonClasses;

        if (typeof options.buttonClasses === 'object')
            this.buttonClasses = options.buttonClasses.join(' ');

        if (typeof options.showDropdowns === 'boolean')
            this.showDropdowns = options.showDropdowns;

        if (typeof options.singleDatePicker === 'boolean') {
            this.singleDatePicker = options.singleDatePicker;
            if (this.singleDatePicker)
                this.endDate = this.startDate.clone();
        }

        if (typeof options.timePicker === 'boolean')
            this.timePicker = options.timePicker;

        if (typeof options.timePickerSeconds === 'boolean')
            this.timePickerSeconds = options.timePickerSeconds;

        if (typeof options.timePickerIncrement === 'number')
            this.timePickerIncrement = options.timePickerIncrement;

        if (typeof options.timePicker24Hour === 'boolean')
            this.timePicker24Hour = options.timePicker24Hour;

        if (typeof options.autoApply === 'boolean')
            this.autoApply = options.autoApply;

        if (typeof options.autoUpdateInput === 'boolean')
            this.autoUpdateInput = options.autoUpdateInput;

        if (typeof options.linkedCalendars === 'boolean')
            this.linkedCalendars = options.linkedCalendars;

        if (typeof options.isInvalidDate === 'function')
            this.isInvalidDate = options.isInvalidDate;

        if (typeof options.alwaysShowCalendars === 'boolean')
            this.alwaysShowCalendars = options.alwaysShowCalendars;

        // update day names order to firstDay
        if (this.locale.firstDay != 0) {
            var iterator = this.locale.firstDay;
            while (iterator > 0) {
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                iterator--;
            }
        }

        var start, end, range;

        //if no start/end dates set, check if an input element contains initial values
        if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
            if ($(this.element).is('input[type=text]')) {
                var val = $(this.element).val(),
                    split = val.split(this.locale.separator);

                start = end = null;

                if (split.length == 2) {
                    start = moment(split[0], this.locale.format);
                    end = moment(split[1], this.locale.format);
                } else if (this.singleDatePicker && val !== "") {
                    start = moment(val, this.locale.format);
                    end = moment(val, this.locale.format);
                }
                if (start !== null && end !== null) {
                    this.setStartDate(start);
                    this.setEndDate(end);
                }
            }
        }

        if (typeof options.ranges === 'object') {
            for (range in options.ranges) {

                if (typeof options.ranges[range][0] === 'string')
                    start = moment(options.ranges[range][0], this.locale.format);
                else
                    start = moment(options.ranges[range][0]);

                if (typeof options.ranges[range][1] === 'string')
                    end = moment(options.ranges[range][1], this.locale.format);
                else
                    end = moment(options.ranges[range][1]);

                // If the start or end date exceed those allowed by the minDate or dateLimit
                // options, shorten the range to the allowable period.
                if (this.minDate && start.isBefore(this.minDate))
                    start = this.minDate.clone();

                var maxDate = this.maxDate;
                if (this.dateLimit && start.clone().add(this.dateLimit).isAfter(maxDate))
                    maxDate = start.clone().add(this.dateLimit);
                if (maxDate && end.isAfter(maxDate))
                    end = maxDate.clone();

                // If the end of the range is before the minimum or the start of the range is
                // after the maximum, don't display this range option at all.
                if ((this.minDate && end.isBefore(this.minDate)) || (maxDate && start.isAfter(maxDate)))
                    continue;
                
                //Support unicode chars in the range names.
                var elem = document.createElement('textarea');
                elem.innerHTML = range;
                var rangeHtml = elem.value;

                this.ranges[rangeHtml] = [start, end];
            }

            var list = '<ul>';
            for (range in this.ranges) {
                list += '<li>' + range + '</li>';
            }
            list += '<li>' + this.locale.customRangeLabel + '</li>';
            list += '</ul>';
            this.container.find('.ranges').prepend(list);
        }

        if (typeof cb === 'function') {
            this.callback = cb;
        }

        if (!this.timePicker) {
            this.startDate = this.startDate.startOf('day');
            this.endDate = this.endDate.endOf('day');
            this.container.find('.calendar-time').hide();
        }

        //can't be used together for now
        if (this.timePicker && this.autoApply)
            this.autoApply = false;

        if (this.autoApply && typeof options.ranges !== 'object') {
            this.container.find('.ranges').hide();
        } else if (this.autoApply) {
            this.container.find('.applyBtn, .cancelBtn').addClass('hide');
        }

        if (this.singleDatePicker) {
            this.container.addClass('single');
            this.container.find('.calendar.left').addClass('single');
            this.container.find('.calendar.left').show();
            this.container.find('.calendar.right').hide();
            this.container.find('.daterangepicker_input input, .daterangepicker_input i').hide();
            if (!this.timePicker) {
                this.container.find('.ranges').hide();
            }
        }

        if ((typeof options.ranges === 'undefined' && !this.singleDatePicker) || this.alwaysShowCalendars) {
            this.container.addClass('show-calendar');
        }

        this.container.addClass('opens' + this.opens);

        //swap the position of the predefined ranges if opens right
        if (typeof options.ranges !== 'undefined' && this.opens == 'right') {
            var ranges = this.container.find('.ranges');
            var html = ranges.clone();
            ranges.remove();
            this.container.find('.calendar.left').parent().prepend(html);
        }

        //apply CSS classes and labels to buttons
        this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        //
        // event listeners
        //

        this.container.find('.calendar')
            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
            .on('click.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
            .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
            .on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))
            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this))
            .on('click.daterangepicker', '.daterangepicker_input input', $.proxy(this.showCalendars, this))
            //.on('keyup.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this))
            .on('change.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this));

        this.container.find('.ranges')
            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
            .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
            .on('mouseenter.daterangepicker', 'li', $.proxy(this.hoverRange, this))
            .on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));

        if (this.element.is('input')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.elementChanged, this),
                'keydown.daterangepicker': $.proxy(this.keydown, this)
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
        }

        //
        // if attached to a text input, set the initial value
        //

        if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.element.trigger('change');
        } else if (this.element.is('input') && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format));
            this.element.trigger('change');
        }

    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.locale.format);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);

            if (!this.timePicker)
                this.startDate = this.startDate.startOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.minDate && this.startDate.isBefore(this.minDate))
                this.startDate = this.minDate;

            if (this.maxDate && this.startDate.isAfter(this.maxDate))
                this.startDate = this.maxDate;

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.locale.format);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (!this.timePicker)
                this.endDate = this.endDate.endOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.endDate.isBefore(this.startDate))
                this.endDate = this.startDate.clone();

            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate;

            if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
                this.endDate = this.startDate.clone().add(this.dateLimit);

            this.previousRightTime = this.endDate.clone();

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        isInvalidDate: function() {
            return false;
        },

        updateView: function() {
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
                if (!this.endDate) {
                    this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');
                } else {
                    this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');
                }
            }
            if (this.endDate) {
                this.container.find('input[name="daterangepicker_end"]').removeClass('active');
                this.container.find('input[name="daterangepicker_start"]').addClass('active');
            } else {
                this.container.find('input[name="daterangepicker_end"]').addClass('active');
                this.container.find('input[name="daterangepicker_start"]').removeClass('active');
            }
            this.updateMonthsInView();
            this.updateCalendars();
            this.updateFormInputs();
        },

        updateMonthsInView: function() {
            if (this.endDate) {

                //if both dates are visible already, do nothing
                if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                    (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    &&
                    (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    ) {
                    return;
                }

                this.leftCalendar.month = this.startDate.clone().date(2);
                if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                    this.rightCalendar.month = this.endDate.clone().date(2);
                } else {
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
                
            } else {
                if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                    this.leftCalendar.month = this.startDate.clone().date(2);
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
            }
        },

        updateCalendars: function() {

            if (this.timePicker) {
                var hour, minute, second;
                if (this.endDate) {
                    hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                } else {
                    hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                }
                this.leftCalendar.month.hour(hour).minute(minute).second(second);
                this.rightCalendar.month.hour(hour).minute(minute).second(second);
            }

            this.renderCalendar('left');
            this.renderCalendar('right');

            //highlight any predefined range matching the current start and end dates
            this.container.find('.ranges li').removeClass('active');
            if (this.endDate == null) return;

            this.calculateChosenLabel();
        },

        renderCalendar: function(side) {

            //
            // Build the matrix of dates that will populate the calendar
            //

            var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
            var month = calendar.month.month();
            var year = calendar.month.year();
            var hour = calendar.month.hour();
            var minute = calendar.month.minute();
            var second = calendar.month.second();
            var daysInMonth = moment([year, month]).daysInMonth();
            var firstDay = moment([year, month, 1]);
            var lastDay = moment([year, month, daysInMonth]);
            var lastMonth = moment(firstDay).subtract(1, 'month').month();
            var lastYear = moment(firstDay).subtract(1, 'month').year();
            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
            var dayOfWeek = firstDay.day();

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            calendar.firstDay = firstDay;
            calendar.lastDay = lastDay;

            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

            var col, row;
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);

                if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                    calendar[row][col] = this.minDate.clone();
                }

                if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                    calendar[row][col] = this.maxDate.clone();
                }

            }

            //make the calendar object available to hoverDate/clickDate
            if (side == 'left') {
                this.leftCalendar.calendar = calendar;
            } else {
                this.rightCalendar.calendar = calendar;
            }

            //
            // Display the calendar
            //

            var minDate = side == 'left' ? this.minDate : this.startDate;
            var maxDate = this.maxDate;
            var selected = side == 'left' ? this.startDate : this.endDate;

            var html = '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers || this.showISOWeekNumbers)
                html += '<th></th>';

            if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
                html += '<th class="prev available"><i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

            if (this.showDropdowns) {
                var currentMonth = calendar[1][1].month();
                var currentYear = calendar[1][1].year();
                var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
                var minYear = (minDate && minDate.year()) || (currentYear - 50);
                var inMinYear = currentYear == minYear;
                var inMaxYear = currentYear == maxYear;

                var monthHtml = '<select class="monthselect">';
                for (var m = 0; m < 12; m++) {
                    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            ">" + this.locale.monthNames[m] + "</option>";
                    } else {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                    }
                }
                monthHtml += "</select>";

                var yearHtml = '<select class="yearselect">';
                for (var y = minYear; y <= maxYear; y++) {
                    yearHtml += '<option value="' + y + '"' +
                        (y === currentYear ? ' selected="selected"' : '') +
                        '>' + y + '</option>';
                }
                yearHtml += '</select>';

                dateHtml = monthHtml + yearHtml;
            }

            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
                html += '<th class="next available"><i class="fa fa-chevron-right glyphicon glyphicon-chevron-right"></i></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers || this.showISOWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //adjust maxDate to reflect the dateLimit setting in order to
            //grey out end dates beyond the dateLimit
            if (this.endDate == null && this.dateLimit) {
                var maxLimit = this.startDate.clone().add(this.dateLimit).endOf('day');
                if (!maxDate || maxLimit.isBefore(maxDate)) {
                    maxDate = maxLimit;
                }
            }

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';
                else if (this.showISOWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].isoWeek() + '</td>';

                for (var col = 0; col < 7; col++) {

                    var classes = [];

                    //highlight today's date
                    if (calendar[row][col].isSame(new Date(), "day"))
                        classes.push('today');

                    //highlight weekends
                    if (calendar[row][col].isoWeekday() > 5)
                        classes.push('weekend');

                    //grey out the dates in other months displayed at beginning and end of this calendar
                    if (calendar[row][col].month() != calendar[1][1].month())
                        classes.push('off');

                    //don't allow selection of dates before the minimum date
                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of dates after the maximum date
                    if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of date if a custom function decides it's invalid
                    if (this.isInvalidDate(calendar[row][col]))
                        classes.push('off', 'disabled');

                    //highlight the currently selected start date
                    if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                        classes.push('active', 'start-date');

                    //highlight the currently selected end date
                    if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                        classes.push('active', 'end-date');

                    //highlight dates in-between the selected dates
                    if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                        classes.push('in-range');

                    var cname = '', disabled = false;
                    for (var i = 0; i < classes.length; i++) {
                        cname += classes[i] + ' ';
                        if (classes[i] == 'disabled')
                            disabled = true;
                    }
                    if (!disabled)
                        cname += 'available';

                    html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';

            this.container.find('.calendar.' + side + ' .calendar-table').html(html);

        },

        renderTimePicker: function(side) {

            var html, selected, minDate, maxDate = this.maxDate;

            if (this.dateLimit && (!this.maxDate || this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)))
                maxDate = this.startDate.clone().add(this.dateLimit);

            if (side == 'left') {
                selected = this.startDate.clone();
                minDate = this.minDate;
            } else if (side == 'right') {
                selected = this.endDate ? this.endDate.clone() : this.previousRightTime.clone();
                minDate = this.startDate;

                //Preserve the time already selected
                var timeSelector = this.container.find('.calendar.right .calendar-time div');
                if (timeSelector.html() != '') {

                    selected.hour(timeSelector.find('.hourselect option:selected').val() || selected.hour());
                    selected.minute(timeSelector.find('.minuteselect option:selected').val() || selected.minute());
                    selected.second(timeSelector.find('.secondselect option:selected').val() || selected.second());

                    if (!this.timePicker24Hour) {
                        var ampm = timeSelector.find('.ampmselect option:selected').val();
                        if (ampm === 'PM' && selected.hour() < 12)
                            selected.hour(selected.hour() + 12);
                        if (ampm === 'AM' && selected.hour() === 12)
                            selected.hour(0);
                    }

                    if (selected.isBefore(this.startDate))
                        selected = this.startDate.clone();

                    if (selected.isAfter(maxDate))
                        selected = maxDate.clone();

                }
            }

            //
            // hours
            //

            html = '<select class="hourselect">';

            var start = this.timePicker24Hour ? 0 : 1;
            var end = this.timePicker24Hour ? 23 : 12;

            for (var i = start; i <= end; i++) {
                var i_in_24 = i;
                if (!this.timePicker24Hour)
                    i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

                var time = selected.clone().hour(i_in_24);
                var disabled = false;
                if (minDate && time.minute(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.minute(0).isAfter(maxDate))
                    disabled = true;

                if (i_in_24 == selected.hour() && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
                } else {
                    html += '<option value="' + i + '">' + i + '</option>';
                }
            }

            html += '</select> ';

            //
            // minutes
            //

            html += ': <select class="minuteselect">';

            for (var i = 0; i < 60; i += this.timePickerIncrement) {
                var padded = i < 10 ? '0' + i : i;
                var time = selected.clone().minute(i);

                var disabled = false;
                if (minDate && time.second(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.second(0).isAfter(maxDate))
                    disabled = true;

                if (selected.minute() == i && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                } else {
                    html += '<option value="' + i + '">' + padded + '</option>';
                }
            }

            html += '</select> ';

            //
            // seconds
            //

            if (this.timePickerSeconds) {
                html += ': <select class="secondselect">';

                for (var i = 0; i < 60; i++) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().second(i);

                    var disabled = false;
                    if (minDate && time.isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.isAfter(maxDate))
                        disabled = true;

                    if (selected.second() == i && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + padded + '</option>';
                    }
                }

                html += '</select> ';
            }

            //
            // AM/PM
            //

            if (!this.timePicker24Hour) {
                html += '<select class="ampmselect">';

                var am_html = '';
                var pm_html = '';

                if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                    am_html = ' disabled="disabled" class="disabled"';

                if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                    pm_html = ' disabled="disabled" class="disabled"';

                if (selected.hour() >= 12) {
                    html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
                } else {
                    html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
                }

                html += '</select>';
            }

            this.container.find('.calendar.' + side + ' .calendar-time div').html(html);

        },

        updateFormInputs: function() {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.locale.format));
            if (this.endDate)
                this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.locale.format));

            if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }

        },

        move: function() {
            var parentOffset = { top: 0, left: 0 },
                containerTop;
            var parentRightEdge = $(window).width();
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
                parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
            }

            if (this.drops == 'up')
                containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
            else
                containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
            this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');

            if (this.opens == 'left') {
                this.container.css({
                    top: containerTop,
                    right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else if (this.opens == 'center') {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                            - this.container.outerWidth() / 2,
                    right: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        show: function(e) {
            if (this.isShowing) return;

            // Create a click proxy that is private to this instance of datepicker, for unbinding
            this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);

            // Bind global datepicker mousedown for hiding and
            $(document)
              .on('mousedown.daterangepicker', this._outsideClickProxy)
              // also support mobile devices
              .on('touchend.daterangepicker', this._outsideClickProxy)
              // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
              .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
              // and also close when focus changes to outside the picker (eg. tabbing between controls)
              .on('focusin.daterangepicker', this._outsideClickProxy);

            // Reposition the picker if the window is resized while it's open
            $(window).on('resize.daterangepicker', $.proxy(function(e) { this.move(e); }, this));

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();
            this.previousRightTime = this.endDate.clone();

            this.updateView();
            this.container.show();
            this.move();
            this.element.trigger('show.daterangepicker', this);
            this.isShowing = true;
        },

        hide: function(e) {
            if (!this.isShowing) return;

            //incomplete date selection, revert to last values
            if (!this.endDate) {
                this.startDate = this.oldStartDate.clone();
                this.endDate = this.oldEndDate.clone();
            }

            //if a new date range was selected, invoke the user callback function
            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.callback(this.startDate, this.endDate, this.chosenLabel);

            //if picker is attached to a text input, update it
            this.updateElement();

            $(document).off('.daterangepicker');
            $(window).off('.daterangepicker');
            this.container.hide();
            this.element.trigger('hide.daterangepicker', this);
            this.isShowing = false;
        },

        toggle: function(e) {
            if (this.isShowing) {
                this.hide();
            } else {
                this.show();
            }
        },

        outsideClick: function(e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (
                // ie modal dialog fix
                e.type == "focusin" ||
                target.closest(this.element).length ||
                target.closest(this.container).length ||
                target.closest('.calendar-table').length
                ) return;
            this.hide();
        },

        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
            this.element.trigger('showCalendar.daterangepicker', this);
        },

        hideCalendars: function() {
            this.container.removeClass('show-calendar');
            this.element.trigger('hideCalendar.daterangepicker', this);
        },

        hoverRange: function(e) {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            var label = e.target.innerHTML;
            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
                this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.locale.format));
                this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.locale.format));
            }
            
        },

        clickRange: function(e) {
            var label = e.target.innerHTML;
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];
                this.startDate = dates[0];
                this.endDate = dates[1];

                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }

                if (!this.alwaysShowCalendars)
                    this.hideCalendars();
                this.clickApply();
            }
        },

        clickPrev: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract(1, 'month');
                if (this.linkedCalendars)
                    this.rightCalendar.month.subtract(1, 'month');
            } else {
                this.rightCalendar.month.subtract(1, 'month');
            }
            this.updateCalendars();
        },

        clickNext: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add(1, 'month');
            } else {
                this.rightCalendar.month.add(1, 'month');
                if (this.linkedCalendars)
                    this.leftCalendar.month.add(1, 'month');
            }
            this.updateCalendars();
        },

        hoverDate: function(e) {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            //ignore dates that can't be selected
            if (!$(e.target).hasClass('available')) return;

            //have the text inputs above calendars reflect the date being hovered over
            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            if (this.endDate) {
                this.container.find('input[name=daterangepicker_start]').val(date.format(this.locale.format));
            } else {
                this.container.find('input[name=daterangepicker_end]').val(date.format(this.locale.format));
            }

            //highlight the dates between the start date and the date being hovered as a potential end date
            var leftCalendar = this.leftCalendar;
            var rightCalendar = this.rightCalendar;
            var startDate = this.startDate;
            if (!this.endDate) {
                this.container.find('.calendar td').each(function(index, el) {

                    //skip week numbers, only look at dates
                    if ($(el).hasClass('week')) return;

                    var title = $(el).attr('data-title');
                    var row = title.substr(1, 1);
                    var col = title.substr(3, 1);
                    var cal = $(el).parents('.calendar');
                    var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

                    if (dt.isAfter(startDate) && dt.isBefore(date)) {
                        $(el).addClass('in-range');
                    } else {
                        $(el).removeClass('in-range');
                    }

                });
            }

        },

        clickDate: function(e) {

            if (!$(e.target).hasClass('available')) return;

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            //
            // this function needs to do a few things:
            // * alternate between selecting a start and end date for the range,
            // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
            // * if autoapply is enabled, and an end date was chosen, apply the selection
            // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
            //

            if (this.endDate || date.isBefore(this.startDate, 'day')) {
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.endDate = null;
                this.setStartDate(date.clone());
            } else if (!this.endDate && date.isBefore(this.startDate)) {
                //special case: clicking the same date for start/end, 
                //but the time of the end date is before the start date
                this.setEndDate(this.startDate.clone());
            } else {
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.setEndDate(date.clone());
                if (this.autoApply) {
                  this.calculateChosenLabel();
                  this.clickApply();
                }
            }

            if (this.singleDatePicker) {
                this.setEndDate(this.startDate);
                if (!this.timePicker)
                    this.clickApply();
            }

            this.updateView();

        },

        calculateChosenLabel: function() {
          var customRange = true;
          var i = 0;
          for (var range in this.ranges) {
              if (this.timePicker) {
                  if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
                      customRange = false;
                      this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                      break;
                  }
              } else {
                  //ignore times when comparing dates if time picker is not enabled
                  if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                      customRange = false;
                      this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                      break;
                  }
              }
              i++;
          }
          if (customRange) {
              this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
              this.showCalendars();
          }
        },

        clickApply: function(e) {
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function(e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },

        monthOrYearChanged: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.'+leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            if (!isLeft) {
                if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                    month = this.startDate.month();
                    year = this.startDate.year();
                }
            }

            if (this.minDate) {
                if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                    month = this.minDate.month();
                    year = this.minDate.year();
                }
            }

            if (this.maxDate) {
                if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                    month = this.maxDate.month();
                    year = this.maxDate.year();
                }
            }

            if (isLeft) {
                this.leftCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
            } else {
                this.rightCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
            }
            this.updateCalendars();
        },

        timeChanged: function(e) {

            var cal = $(e.target).closest('.calendar'),
                isLeft = cal.hasClass('left');

            var hour = parseInt(cal.find('.hourselect').val(), 10);
            var minute = parseInt(cal.find('.minuteselect').val(), 10);
            var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

            if (!this.timePicker24Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm === 'PM' && hour < 12)
                    hour += 12;
                if (ampm === 'AM' && hour === 12)
                    hour = 0;
            }

            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                start.second(second);
                this.setStartDate(start);
                if (this.singleDatePicker) {
                    this.endDate = this.startDate.clone();
                } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                    this.setEndDate(start.clone());
                }
            } else if (this.endDate) {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                end.second(second);
                this.setEndDate(end);
            }

            //update the calendars so all clickable dates reflect the new time component
            this.updateCalendars();

            //update the form inputs above the calendars with the new time
            this.updateFormInputs();

            //re-render the time pickers because changing one selection can affect what's enabled in another
            this.renderTimePicker('left');
            this.renderTimePicker('right');

        },

        formInputsChanged: function(e) {
            var isRight = $(e.target).closest('.calendar').hasClass('right');
            var start = moment(this.container.find('input[name="daterangepicker_start"]').val(), this.locale.format);
            var end = moment(this.container.find('input[name="daterangepicker_end"]').val(), this.locale.format);

            if (start.isValid() && end.isValid()) {

                if (isRight && end.isBefore(start))
                    start = end.clone();

                this.setStartDate(start);
                this.setEndDate(end);

                if (isRight) {
                    this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format));
                } else {
                    this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format));
                }

            }

            this.updateCalendars();
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
            }
        },

        elementChanged: function() {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;
            if (this.element.val().length < this.locale.format.length) return;

            var dateString = this.element.val().split(this.locale.separator),
                start = null,
                end = null;

            if (dateString.length === 2) {
                start = moment(dateString[0], this.locale.format);
                end = moment(dateString[1], this.locale.format);
            }

            if (this.singleDatePicker || start === null || end === null) {
                start = moment(this.element.val(), this.locale.format);
                end = start;
            }

            if (!start.isValid() || !end.isValid()) return;

            this.setStartDate(start);
            this.setEndDate(end);
            this.updateView();
        },

        keydown: function(e) {
            //hide on tab or enter
            if ((e.keyCode === 9) || (e.keyCode === 13)) {
                this.hide();
            }
        },

        updateElement: function() {
            if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.element.trigger('change');
            } else if (this.element.is('input') && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format));
                this.element.trigger('change');
            }
        },

        remove: function() {
            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData();
        }

    };

    $.fn.daterangepicker = function(options, callback) {
        this.each(function() {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, options, callback));
        });
        return this;
    };
    
    return DateRangePicker;

}));

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;

    function Drop(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.drop.defaults,element.data(),options);
		var id = (new Date()).valueOf();
		this.config.width = this.elem.width();
		this.config.id = id;
		this.elem.attr("id",id);
		this.init();
		element.data('drop', this);
    };

    /**
    **下拉菜单展示的方向问题
    **/
    function setDirect(ta){
        var peal = ta.peal;
        var dp = ta.list;
        var ls = dp.get(0).getBoundingClientRect();
		var p = peal.get(0).getBoundingClientRect();
		if((window.innerHeight-p.bottom)>ls.height){//下面容得下 下拉菜单的展示，正常
			dp.removeAttr("style");
			ta.elem.find("span.caret-wrapper").removeClass("turnback");
		}else if(p.top>ls.height){//向上展示
			dp.css({"top":-(ls.height)+"px","box-shadow":"0 0 1px #ccc"});
			ta.elem.find("span.caret-wrapper").addClass("turnback");
		}
    };

	/***
	** 处理树桩菜单
	**/
	function recursive(fa,arr,cfg){
		var deep = arguments[3]||0;
		var gap = arguments[4]||5;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='sub-drop-list'/>");
		if(cfg.type!=3){
			ul.addClass("hidden");
		}
		//ul.css({width:(cfg.width+gap+5)+"px",left:-(gap)+"px"});
		ul.css({left:-(gap)+"px"});
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group;
			var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
			var val = o.val||o.value||text;
			var li = $("<li class='drop-one-item' text='"+text+"' value='"+val+"' deep="+deep+" title='"+text+"' />");
			li.data("info", o);
			var pad = (deep+2)*5 + 2;
			li.css({"padding-left":pad+"px"});
			if(array && array instanceof Array){
				li.addClass("drop-recursive");
				var ca = $("<i/>",{class:"glyphicon"});
				ca.addClass(cfg.caret);
				li.append(ca).append(text);
				rec(li,array,cfg,deep,pad);
			}else{
				li.append(text);
			}
			ul.append(li);
		}
		fa.append(ul);
	}
	/**
	**列表组件的初始化
	**/
    Drop.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

		/***** 注册监听事件 *****/

        _this.peal.click(function(e){
            e.stopImmediatePropagation();
			$(".ndp-drop-wrapper[id!="+_this.config.id+"]").removeClass("focus");
			$(".ndp-drop-wrapper[id!="+_this.config.id+"] ul.drop-list").addClass("hidden");
			_this.elem.toggleClass("focus");
            _this.list.toggleClass("hidden");
            setDirect(_this);
        });


		/****
		** 下拉选项被点击
		***/
        _this.list.find("li[class='drop-one-item'],li[class='drop-one-item split-line']").click(function(e){
            e.stopImmediatePropagation();
            _this.list.addClass("hidden");
			var itemIndex = $(this).index();
//			var deep = parseInt($(this).attr("deep"));
            var value = $(this).attr("value");
			//deep 表示树桩菜单第几层 base from 0。index:表示这一层的第几个， base from 1
			$(_this.elem.get(0)).data('val', value);
			$(_this.elem.get(0)).data('data', $(this).data("info"));

			if(_this.config.type==3){
				var oldV = _this.peal.find("input").val();
				var newV = $(this).attr("title");
                var gp = $(this).parents(".drop-one-item[deep='0']:first");
				if (oldV !== newV){
					fireEvent(_this.elem.get(0),"ITEM_CHANGE",{val:value,text:newV,group:gp.index(),gpname:gp.attr("title")});
				}
				_this.peal.find("input").attr('data-val',value).val(newV);
				fireEvent(_this.elem.get(0),"ITEM_CLICK",{val:value,text:newV,group:gp.index(),gpname:gp.attr("title")});
			}else {
				var oldV = _this.peal.find("input").val();
				var newV = $(this).attr("title");
				if (oldV != newV){
					fireEvent(_this.elem.get(0),"ITEM_CHANGE",{val:value,text:newV});
				}

				_this.peal.find("input").attr('data-val',value).val(newV);
				fireEvent(_this.elem.get(0),"ITEM_CLICK",{val:value,text:newV});
			}
        });


		/***
		** input 输入框里面 点击键盘
		***/
		_this.peal.keyup(function(e){
			if(e.keyCode == 13){//回车
				if(!_this.list.hasClass("hidden") && _this.list.find("li.em").length){
					var item = _this.list.find("li.em");
					var txt = item.attr("title");
					var val = item.attr("value");
					var deep = item.attr("deep");
					$(this).find("input").val(txt).attr("data-val",val);
					if(_this.config.type==3){
						var gp = item.parents(".drop-one-item[deep='0']:first");
						fireEvent(_this.elem.get(0),"ITEM_CLICK",{val:val,text:txt,group:gp.index(),gpname:gp.attr("title")});
					}else{
						fireEvent(_this.elem.get(0),"ITEM_CLICK",{val:val,text:txt});
					}
					_this.list.addClass("hidden");
				}
			}

			var items = _this.list.find("li[class='drop-one-item'],li[class='drop-one-item split-line'],li[class='drop-one-item em'],li[class='drop-one-item split-line em']");
			var arr = [].slice.call(items,0);
			if(e.keyCode == 40){//下
				//默认选中下拉的 第一个
				//_this.list.focus();
				if(_this.list.find("li.em").length){//存在
					//这个em 处在 items数组中的第几个
					var now = _this.list.data("now")||(function(){
						for(var i=0;i<arr.length;i++){
							if($(arr[i]).hasClass("em")) return i;
						};
					}());
					var the = items.filter(".em").first();
					var next = $(items[parseInt(now)+1]);
					if(next.get(0)){
						next.addClass("em");
					}else{
						items.first().addClass("em");
					}
					the.removeClass("em");
				}else{//不存在
					items.first().addClass("em");
				}
			}else if(e.keyCode == 38){//上
				//默认选中下拉的最后一个
				the = items.filter(".em").first();
				if(_this.list.find("li.em").length){
					now = _this.list.data("now")||(function(){
						for(var i=0;i<arr.length;i++){
							if($(arr[i]).hasClass("em")) return i;
						};
					}());
					var prev = $(items[parseInt(now)-1]);
					if(prev.get(0)){
						prev.addClass("em");
					}else{
						items.last().addClass("em");
					}
					the.removeClass("em");
				}else{
					items.last().addClass("em");
				}
				//新增，类似原生select 的功能
			}else if((e.keyCode>=65 && e.keyCode<=90)||(e.keyCode>=48 && e.keyCode<=57)){//输入的是字母
				var char = String.fromCharCode(e.keyCode);
				var RE = new RegExp("^"+char,'i');
				var domList = _this.list.get(0);
				var lis = _this.list.find("li[text]");
				for(var i=0;i<lis.length;i++){
					var li = $(lis.get(i));
					var txt = li.attr("text");
					var val = li.attr("value");
					 if(RE.test(txt)){
						if(!_this.list.hasClass("hidden")){
							 li.siblings().removeClass("em");
							 li.addClass("em");

						     if(domList.scrollHeight>domList.clientHeight || 		domList.offsetHeight>domList.clientHeight){//存在滚动条
								 var ch = li.get(0).offsetTop - domList.clientHeight;
								 if(ch>0){
									 _this.list.scrollTop(ch+30);
								 }
							 }
						}else{
							_this.elem.find("input").val(txt).attr("data-val",val);
							fireEvent(_this.elem.get(0),"ITEM_CLICK",{val:val,text:txt});
						}
						break;
					 }
				}
			}
		});

		/***
		** 如果是树桩菜单，加监听
		**/
		if(_this.config.type!=3) _this.list.find("li.drop-recursive").click(function(e){
			e.stopImmediatePropagation();
			$(this).children("ul.sub-drop-list").toggleClass("hidden");
			$(this).children("i.glyphicon").toggleClass("turndown");
			setDirect(_this);
		});

		/***
		** 处理 有checkbox 的 列表
		**/
		if(_this.config.type == 4){
			var apply = $("<li class='drop-one-item apply-item'><button class='btn btn-default'>Apply</button></li>")
			_this.list.append(apply);
			/**
			**点击 全选
			**/
//2016-3-18 取消all
//			_this.list.find("li.all-banner>input[type=checkbox]").change(function(){
//				_this.list.find("li.checkbox-item>").prop("checked",this.checked);
//			});

			/**
			** 点击单个 item 行
			**/
			_this.list.find("li.checkbox-item:not(.all-banner)>input[type=checkbox]").change(function(){
				if(!this.checked){
					_this.list.find("li.all-banner>input[type=checkbox]").prop("checked",this.checked);
				}else{

				}
			});

			/***
			**点击应用按钮
			**/
			_this.list.find("li.apply-item").click(function(e){
				e.stopImmediatePropagation();
				_this.list.addClass("hidden");
				//派发事件
				var chks = _this.list.find("li.checkbox-item:not(.all-banner):has(input[type]:checked)");
				var cksArr = [];
				var vals = [];
				chks.each(function(index,item){
					var val = $(item).attr('value');
					var text = $(item).text();
					cksArr.push({index:$(item).index(),value:val,text:text});
					vals.push(text);
				});
				_this.peal.find("input").attr("checkedArr",JSON.stringify(cksArr)).val(vals.join(","));
				fireEvent(_this.elem.get(0),"APPLY_CLICK",{checkedArr:cksArr});
			});
		}

		$(document,document.body).click(function(e){
			if(!(e.target.tagName == "INPUT" && e.target.type == "checkbox")){
				//$(".ndp-drop-wrapper ul.drop-list:has(li.drop-one-item)").addClass("hidden");
				$(".ndp-drop-wrapper ul.drop-list").addClass("hidden");
			}
			$(".ndp-drop-wrapper").removeClass("focus");
		});
    };

	/**
	** 构建下来菜单样子
	**/
	Drop.prototype.concrate = function(data){
		var _this = this;
        this.peal = $("<div class='drop-peal' tabIndex='-1' />");//外观包装
        if(this.config.type==2) this.peal.addClass("drop-split-peal");
        this.list = $("<ul class='drop-list hidden' tabIndex='-1' tabIndex='-1' />");
        this.peal.html('<input type="text" readonly="true"><span class="caret-wrapper" tabIndex=-1><span class="caret glyphicon '+_this.config.caret+'"></span></span>');
        this.elem.append(_this.peal).append(_this.list);
// 2016-3-18 去掉 all 按钮
//		if(_this.config.type == 4){
//			var all = $("<li class='drop-one-item checkbox-item all-banner'><span>All</span><input type='checkbox'/></li>");
//			this.list.append(all);
//		}
	};

	/***
	** 设置用户配置选项
	***/
    Drop.prototype.initConfig = function(){
        var _this = this;
        if(_this.config.placeholder){
            _this.peal.find("input").attr("placeholder",_this.config.placeholder);
        }

        if(_this.config.val){
            _this.peal.find("input").val(_this.config.val);
			$(_this.elem.get(0)).data('val', _this.config.val);
        } else {
			$(_this.elem.get(0)).data('val', '');
		}

		//ser 需要设置名字
        if(_this.config.name){
            _this.peal.find("input").attr("name",_this.config.name);
        }

		//输入框默认是 不允许输入的，设置true 允许输入
		if(_this.config.allowInput){
			_this.elem.find("input").removeAttr("readonly");
		}
		/**
		**构建下拉列表
		**/
        _this.config.data.forEach(function(item,index){
			if(item && typeof(item)=="object"){
				var key2 = _this.config.subKey;
				var key1 = _this.config.textKey;
				var sub = item[key2]||item.sub||item.son||item.next||item.group;
				var text = item[key1]||item.text||item.label||item.title||item.name;
				var val = item.val|| item.value || item.id ||  text;
				var other = item.other;
				if(sub && sub instanceof Array){//存在下一层数组，说明这是一个
					var li = $("<li class='drop-one-item drop-recursive' deep='0' />");
					if(_this.config.type!=3){
						var ca = $("<i/>",{class:"glyphicon"});
						ca.addClass(_this.config.caret);
						li.append(ca);
					}else{
						li.addClass("group-hilight");
					}
					li.append(text).attr({"title":text,"value":text,"text":text});
					li.data("info", item);
					recursive(li,sub,_this.config,0);
					_this.list.append(li);
				}else{
					li = $("<li class='drop-one-item' text='"+text+"' value='"+val+"' deep='0' title='"+text+"' >"+"<span title='"+text+"' >"+text+"</span>"+"</li>");
					if(item.disable) li.addClass("disabled");
					if(item.split) li.addClass("split-line");
					if(_this.config.type==4){
						var check = $("<input type='checkbox' value='" + val + "' />");
						li.addClass("checkbox-item").append(check);
					}
					if (other) {
                        li.attr('data-other', other);
                    }
					li.data("info", item);
					_this.list.append(li);
				}
			}else if(typeof(item)=="number"||typeof(item)=="string"){
				li = $("<li class='drop-one-item' />");
				li.attr({"value":item,"text":item,"title":item}).append("<span title='"+item+"' >"+item+"</span>");
				if(_this.config.type==4){
					li.addClass("checkbox-item");
					var check = $("<input type='checkbox' value='" + val + "' />");
					li.append(check);
				}
				li.data("info", item);
				_this.list.append(li);
			}
        });
    }
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.drop = function (options) {
		var the = this.first();
		if (typeof options === 'object'){
			var drop = new Drop(the, options);
			the = $.extend(true,{},the,new exchange(drop));
			return the;
		} else if (typeof options === 'string'){
			var instance = the.data('drop');
			if (!instance){
				console.log("还未初始化")
				return;
			}
			var args = Array.prototype.slice.call(arguments, 1);
			var ret = instance[options](args);
			return ret;
		}
    };

	Drop.prototype.val = function(o){
		var _this = this;
		var o = o[0];
		if(typeof(o)=="object"){
			var txt = o[_this.config.textKey]||o.label||o.text||o.value||o.name;
			var val = o.value || o.val || o.id || txt;
			_this.elem.find("input").val(txt).attr("data-val",val);
			$(_this.elem.get(0)).data('val', val);
		}else{
			_this.elem.find("input").val(o).attr("data-val",o);
			$(_this.elem.get(0)).data('val', o);
		}
		$(_this.elem.get(0)).data('data', o);
	}

	Drop.prototype.data = function(o){
		var _this = this;
		var _data = {
			'val': _this.elem.find("input").attr("data-val"),
			'txt' : _this.elem.find("input").val()
		}
		return $.extend(_data, $(_this.elem.get(0)).data('data'));
	}

    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(drop){
		/***
		** 设置显示的值
		***/
		this.val = function(o){
			if(typeof(o)=="object"){
				var txt = o[drop.config.textKey]||o.label||o.text||o.value||o.name;
				var val = o.value || o.val || o.id || txt;
				drop.elem.find("input").val(txt).attr("data-val",val);
				$(drop.elem.get(0)).data('val', val);
			}else{
				drop.elem.find("input").val(o).attr("data-val",o);
				$(drop.elem.get(0)).data('val', o);
			}
			$(drop.elem.get(0)).data('data', o);
			return drop.elem;
		};
    }
	/***
	** outside accessible default setting
	**/
	$.fn.drop.defaults = {
        type:1,//1，inline; 2 split dropdown下拉,3 分组显示菜单，组名高亮，不能被点击,4 checkbox,多选
		name:"drop",//为了便于serialize 设置name属性
        placeholder:null,//提示文字
		allowInput:false,//是否允许输入 默认情况下不允许输入
		textKey:"",//默认猜测，text,label,title,name
		subKey:"",//默认猜测，sub, son, next
        val:null,//默认值
		caret:"glyphicon-triangle-right",//只是箭头的样式，仅支持bootstrap 里面列出的 glyphicon
        data:[]//下拉菜单列表
	};
}(jQuery));

;(function ($) {
	var self = this;

	function recursive(arr,cfg,fa,deep){
		if(arr.length<=0) return;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='list-root' deep="+deep+"  />");
		if(deep==1) {
			ul.addClass("list-deepest dropdown-menu").attr("aria-labelledby",cfg.id);
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var li = $("<li class='drop-list-item' data-index="+i+"/>");
			var ctx = $("<a  href='javascript:void(0);' class='content-part' data-index="+i+" data-deep="+deep+"/>");
			li.append(ctx);
			if(o.icon){
				var icon = $("<span class='icon-part' />");
				ctx.append(icon);
			}
//			var txt = $("<span class='txt-part' />");
//			ctx.append(txt);
			if(typeof(o)=="object"){				
				var array = o.sub||o.son||o.next||o.group||o.children;
				var text = o.text||o.label||o.title||o.name;
				var val = o.val||o.value||text;
//				if(o.href){
//					text = '<a href="'+o.href+'">'+text+'</a>';
//				}
				if(o.class){
					li.addClass(o.class);
				}
				//txt.html(text).attr("title",text); ctx.data("val",text);
				ctx.append(text).attr("title",text); ctx.attr({"data-val":val,"data-text":text});
				li.attr({"value":text,"deep":deep});
				if(array && array instanceof Array){
					ctx.addClass("title-layer");
					rec(array,cfg,li,deep);
				}else{
					li.addClass("list-leaf");
				}

				if(o.split) ctx.addClass("drop2-split-line");
			}else{
				//txt.html(o);ctx.data("val",o);
				ctx.append(o).attr({"data-val":o,"data-text":o});
				li.attr({"value":o,"deep":deep}).addClass("list-leaf");
			}
			ul.append(li);
		}
		fa.append(ul);
	};

	function Drop2(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.drop2.defaults,element.data(),options);
		this.config.width = this.elem.width();
		this.init();
	};

	/**
	 **列表组件的初始化
	 **/
	Drop2.prototype.init = function () {
		var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
		this.concrate();//构建下来菜单的样子
		this.initConfig();
		/*******/
		this.elem.find(".content-part.title-layer").click(function(e){
			e.stopImmediatePropagation();
		});

		this.elem.find(".content-part:not(:has(.title-layer))").click(function(e){
			var val = $(this).text();
			if(_this.config.type==2) {//如果是 第二种类型的 下拉菜单
				if(_this.hold.data("val")!=val) {
					fireEvent($(this).get(0),"SELECT_CHANGE",{value:$(this).data("val"),text:$(this).data("text")});
				}
				_this.hold.html(val).data("val",val);
			}else{	
				fireEvent($(this).get(0),"ITEM_CLICK",{value:$(this).data("val"),text:$(this).data("text")});
			}	
		});		
		
    };
	/**
	 ** 构建下来菜单样子
	 **/
	Drop2.prototype.concrate = function(data){
		var _this = this;
		_this.button = $("<button type='button' data-toggle='dropdown' />");
		_this.hold = $("<span />");
		_this.button.append(_this.hold);
	};

	Drop2.prototype.initConfig = function(){
		var _this = this;
		var cfg = this.config;
		_this.button.attr("id",cfg.id);
		if(cfg.showcaret)_this.button.append(cfg.caret);
		_this.hold.html(typeof(cfg.label)=="string"?cfg.label:cfg.label.text||cfg.label.label||cfg.label.name);
		this.elem.append(_this.button);
		recursive(cfg.data,cfg,_this.elem,0);
	}
	/**
	 * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
	 * or you can call it jquery plugin shell  == fn
	 */
	$.fn.drop2 = function (options) {
		var the = this.first();
		var drop2 = new Drop2(the, options);
		the = $.extend(true,{},the,new exchange(drop2));
		return the;
	};

	/***
	 **和其他插件的交互
	 ** factory Class
	 **@param {Drop} drop :  instacne of the plugin builder
	 **/
	function exchange(drop2){
		this.val = function(o){
			if(drop2.config.type==2){
				var txt = o.text||o.label||o.name||o.value||o;
				drop2.hold.html(txt).data("val",txt);
			}
			return drop2.elem;
		}
	}


	var old = $.fn.drop2;
	$.fn.drop2.Constructor = Drop2;
	// table NO CONFLICT
	// ===============
	$.fn.drop2.noConflict = function () {
		$.fn.drop = old;
		return this;
	}
	/***
	 ** outside accessible default setting
	 **/
	$.fn.drop2.defaults = {
		type:1,//1 普通，2 选择之后更新的 文字下拉菜单，3 图标提示类popover  气泡
		id:"drop"+(new Date().valueOf()),
		showcaret:true,//默认显示caret
		caret:"<i class='glyphicon glyphicon-menu-down'></i>",
		label:"undefined",
		data:[]
	};
}(jQuery));

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	//全局辅助类
	var Help = {
		fixPageXY: function(the){
			var html = document.documentElement;
			var body = document.body;
		
			var the = ((the.get&&the.get(0))||the).getBoundingClientRect();
			var a = {};
			a.pageX = parseFloat(the.left) + (html.scrollLeft || body && body.scrollLeft || 0);
			a.pageX -= html.clientLeft || 0;

			a.pageY = parseFloat(the.top) + (html.scrollTop || body && body.scrollTop || 0);
			a.pageY -= html.clientTop || 0;
			return a;
		},
		/***
		** 处理树桩菜单
		**/
		recursive :function(fa,arr,cfg){
			var deep = arguments[3]||0;
			var gap = arguments[4]||5;
			deep++;
			var rec = arguments.callee;
			var ul = $("<ul class='drop-list' />");
			if(cfg.type!=3 && deep>1){
				ul.addClass("hidden");
			}
			//ul.css({width:(cfg.width+gap+5)+"px",left:-(gap)+"px"});
			//ul.css({left:-(gap)+"px"});
			for(var i=0;i<arr.length;i++){
				var o = arr[i];
				var array = o.sub||o.son||o.next||o.group;
				var text = o.text||o.label||o.title||o.name;
				var val = o.val||o.value||text;
				var li = $("<li class='drop-one-item' data-txt="+text+" data-val="+val+" deep="+deep+" title='"+text+"' data-id="+o.id+" />");
				//var pad = (deep+2)*5 + 2;
				//li.css({"padding-left":pad+"px"});
				if(array && array instanceof Array){
					li.addClass("drop-recursive");
					var ca = $("<i/>",{class:"glyphicon"});
					ca.addClass(cfg.caret);
					li.append(ca).append(text);
					rec(li,array,cfg,deep);
				}else{
					li.append(text).addClass("list-leaf");
				}
				ul.append(li);
			}
			fa.append(ul);
		}		
		
	} 

    function Drop3(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.drop3.defaults,element.data(),options);
		this.config.id = "drop" + (new Date()).valueOf();
		this.config.wi = this.elem.width();
		this.init();
		element.data('drop3', this);
    };

	/**
	**列表组件的初始化
	**/
    Drop3.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

		/***** 注册监听事件 *****/

        _this.elem.click(function(e){
            e.stopImmediatePropagation();
			_this.elem.toggleClass("focus");
			_this.list.toggleClass("hidden").css("width",(_this.elem.width()+2)+"px");
			_this.pos();
        });
		
		/***
		** 点击以节点
		***/		
		_this.list.find("li.list-leaf").click(function(e){
			var field = _this.elem.find("input");
			var oldData = field.data();
			var dat = $(this).data();
			field.val(dat.txt).attr({"data-val":dat.val,"data-txt":dat.txt,"data-id":dat.id});
			$(_this.elem.get(0)).data("val", dat)
			fireEvent(_this.elem.get(0),"ITEM_CLICK",dat);
			if (oldData.val != dat.val){
				fireEvent(_this.elem.get(0),"ITEM_CHANGE",dat)
			}
		});
		
		_this.list.find("li.drop-recursive").click(function(e){
			e.stopImmediatePropagation();
			$(this).children("ul").toggleClass("hidden");
		});	
		
		
		
		if(_this.config.allowInputType=="number")_this.elem.find("input").keydown(function(e){
			if((e.keyCode<48 && e.keyCode!=8) || e.keyCode>57){
				e.preventDefault();
				return false;
			}else if(e.keyCode!=8){
				if($(this).val().length>3){//超过3个数字
					e.preventDefault();
					return false;
				}
			}
		});
		
		
		
		//点击空白处
		$(document).click(function(e){
			$(".drop3-list-wrapper").addClass("hidden");
			$(".ndp-drop3-wrapper").removeClass("focus");
		});	
		
		$(window).resize(function(){
			_this.pos();	
		});
		
		$(document).scroll(function(){
			_this.pos();		
		});
		
		/****
		** 外部容器 发生了 scroll事件
		****/
		_this.elem.on("WRAPPER_SCROLL",function(e,$ta){
			_this.pos($ta);
		});

		/****
		** 包裹他的容器被删除了
		***/
		_this.elem.on("BEEN_REMOVED",function(e){
			_this.list.remove();
		});
    };

	//
	Drop3.prototype.pos = function($ta){
		var _this = this;
		if(!_this.list.hasClass("hidden")){
			var page = Help.fixPageXY(_this.elem);
			var page2 = Help.fixPageXY(_this.config.bind);
			_this.list.css({"top":(page.pageY-page2.pageY+30)+"px","left":(page.pageX-page2.pageX)+"px"});	
		}
	}
	/**
	** 构建下来菜单样子
	**/
	Drop3.prototype.concrate = function(data){
		var _this = this;
        var  html = '<input type="text" readonly="true"><span class="caret-wrapper" tabIndex=-1><span class="caret glyphicon '+_this.config.caret+'"></span></span>';
		
		this.list = $("<div class='drop3-list-wrapper hidden'  tabindex='-1' id="+_this.config.id+" />").css("width",(_this.config.wi+2)+"px");
		
		this.elem.append(html);	
		if(_this.config.bind){
			_this.config.bind.append(this.list);
		}else{
			$(document.body).append(this.list);
		}
	};
	/***
	** 设置用户配置选项
	***/
    Drop3.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
        if(cfg.placeholder){
            _this.elem.find("input").attr("placeholder",_this.placeholder);
        }
		//输入框默认是 不允许输入的，设置true 允许输入
		if(cfg.allowInput){
			_this.elem.find("input").removeAttr("readonly");
		}
		
		if(cfg.data && cfg.data.length){
			Help.recursive(_this.list,cfg.data,cfg);
		}
    }
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.drop3 = function (options) {
		var the = this.first();
		if (typeof options === 'object'){
			var drop = new Drop3(the, options);
			the = $.extend(true,{},the,new exchange(drop));
			return the;
		} else if (typeof options === 'string'){
			var instance = the.data('drop3');
			if (!instance){
				console.log("还未初始化")
				return;
			}
			var args = Array.prototype.slice.call(arguments, 1);
			var ret = instance[options](args);
			return ret;
		}
    };

	Drop3.prototype.close = function(){
		this.list.addClass("hidden");
		this.elem.removeClass("focus");
	}


	Drop3.prototype.val = function(o){
		var _this = this;
		var o = o[0];
		if(typeof(o)=="object"){
			var txt = o[_this.config.textKey]||o.label||o.text||o.value||o.name;
			var val = o.value || o.val || txt;
			var id = o.id;
			_this.elem.find("input").val(txt).attr({"data-val":val,"data-text":txt,"data-id":id});
			$(_this.elem.get(0)).data("val", {val: val, txt : txt});
		}else{
			_this.elem.find("input").val(o).attr({"data-val":o,"data-txt":o});
			$(_this.elem.get(0)).data("val", {val: o, txt : o});
		}

	}

    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(drop){
		/***
		** 设置显示的值
		***/
		this.val = function(o){
			if(typeof(o)=="object"){
				var txt = o[drop.config.textKey]||o.label||o.text||o.value||o.name;
				var val = o.value || o.val || txt;
				var id = o.id;
				
				drop.elem.find("input").val(txt).attr({"data-val":val,"data-text":txt,"data-id":id});
			}else{
				drop.elem.find("input").val(o).attr({"data-val":o,"data-txt":o});
			}
			$(drop.elem.get(0)).data("val", drop.elem.find("input").data());
			return drop.elem;
		};
		
		/***
		**设置下拉菜单位置
		***/
		this.resetPos = function($ta){
			drop.pos($ta);
			return drop.elem;
		}
    }
	/***
	** outside accessible default setting
	**/
	$.fn.drop3.defaults = {
		name:"drop3",//为了便于serialize 设置name属性
        placeholder:null,//提示文字
		allowInput:false,//是否允许输入 默认情况下不允许输入
		allowInputType:"number",
        val:null,//默认值
		bind:null,//下拉菜单绑定到那个dom上
		caret:"glyphicon-triangle-right",//只是箭头的样式，仅支持bootstrap 里面列出的 glyphicon
        data:[]//下拉菜单列表
	};
}(jQuery));

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

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this; 
	var gData;
		function build(data){
			var wrapper = $('<div class="carousel slide" data-ride="carousel" id="gallery-carousel">');
			var list = $('<div class="carousel-inner" role="listbox">');
			var wi = window.innerWidth;
			var he = window.innerHeight;
			data.forEach(function(item,index){
				var itemBox = $('<div class="item" index='+index+' w='+item.w+' h='+item.h+'>');
				if(index == 0) itemBox.addClass("active");
				var img = $('<img data-img='+item.big+' >');//class="img-responsive"
				if(index==0) img.attr("src",item.big);
				var caption = $('<div class="carousel-caption">');
				itemBox.append(img).append(caption);
				list.append(itemBox);
			});
			
			var ctlLeft = $('<a class="left carousel-control hidden" href="#gallery-carousel" role="button" 					data-slide="prev">\
    				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\
    				<span class="sr-only">Previous</span>\
  				</a>');
			var ctlRight = $('<a class="right carousel-control" href="#gallery-carousel" role="button" 					data-slide="next">\
    			<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\
    			<span class="sr-only">Next</span>\
  				</a>');
			wrapper.append(list).append(ctlLeft).append(ctlRight);
			return wrapper;
		}
		/***
		**等比例缩放
		***/
		function scale(w,h){
			var wi = window.innerWidth;//展示图片的区域宽度
			var he = window.innerHeight-240;//展示图片的区域高度
			var aspect = w/h;//((w||4)/(h||3)).toFixed(2);//宽高比
			var container = $('.modal-gallery .modal-content');
			
			if ((wi / he) > aspect){//如果 container的宽高比 高于 content的宽高比  "height":he,
				container.css({"width":Math.round(he * aspect), "margin-left":-Math.round(he * aspect)/2+"px"});
			} else {
				//,"height":Math.round(wi / aspect),
				container.css({"width":wi,"margin-left":-(wi/2)+"px"});
			}		
		}	
	
	
    function Gallery(element, options) {
		var _this = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.gallery.defaults,element.data(),options);
		this.init();
		
		function setButton(){
			//if($("#gallery-holder").hasClass("in")) 
			setTimeout(function(){
				var a = _this.list.get(0).getBoundingClientRect();
				var lfst = _this.list.find("ul>li:first");
				var b = _this.list.find("ul>li:last").get(0).getBoundingClientRect();
				var mlft = parseInt(lfst.css("margin-left"));
				lfst.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd")
					.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
				function(e){
					mlft = parseInt(lfst.css("margin-left"));
					if(mlft == 5){
						_this.lfButton.addClass("disabled");
					}else{
						_this.lfButton.removeClass("disabled");
					}
					if(a.right>=b.right){//不需要
						_this.rtButton.addClass("disabled");
					}else{
						_this.rtButton.removeClass("disabled");
					}				
					
				});
				if(mlft == 5){
					_this.lfButton.addClass("disabled");
				}else{
					_this.lfButton.removeClass("disabled");
				}
				if(a.right>=b.right){//不需要
					_this.rtButton.addClass("disabled");
				}else{
					_this.rtButton.removeClass("disabled");
				}
			},250);			
		}	
		
		function showImg(idx){
			var one = _this.body.find("div.item[index="+(idx)+"] img");
			var src = one.data("img");
			if(!one.attr("src")){
				one.attr("src",src);
			}
		}
		
		/***
		** 显示图片查看器，弹出窗口
		***/
		this.elem.click(function(e){
			var len = _this.config.data.length;
			_this.body.empty().append(build(_this.config.data));
			var ul = _this.list.find("ul").empty().attr("data-len",len); //列表里面显示小图
			
			_this.config.data.forEach(function(item,index){
				var li = $("<li class='gallery-list-cell' index="+index+"></li>");
				if(index==len-1) li.attr("lastone","true");
				if(index==0) li.addClass("active");
				var img = $("<img width='100%' height='100%'  /> ");//class='img-responsive'
				if(item.small) img.attr("src",item.small);
				li.append(img);
				ul.append(li);
			});	
			
			var theIMG = $("#gallery-carousel").find("img[data-img][index='0']");
			theIMG.attr("src",theIMG.data("img"));                
			var gData = _this.config.data[_this.config.current];
            var theDOM = $("#gallery-carousel").find("div.item.active[index='0']");
			scale(theDOM.attr("w"),theDOM.attr("h"));        
			_this.wrapper.modal();//显示图片查看器
			setButton();
		});
		
		/***
		** 点击空白处，不起作用
		***/
		_this.wrapper.unbind("click").click(function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			
		});
		
		/***
		** 点击 列表一项
		**/
		_this.list.find("ul").unbind("click").click(function(e){
			var len = $(this).data("len");
			if(e.target.tagName!="UL"){
				var the = (e.target.tagName=="IMG")?$(e.target).parent():$(e.target);
				var idx = the.attr("index");
				the.addClass("active").siblings().removeClass("active");
				var t =_this.body.find("div.carousel-inner div.item[index="+(idx)+"]");
				scale(t.attr("w"),t.attr("h"));
				t.addClass("active").siblings().removeClass("active");	
				showImg(idx);showImg(idx+1);
				var leftBtn = _this.body.find("a.left.carousel-control");
				var rightBtn = _this.body.find("a.right.carousel-control");				
				if(idx==0){
					leftBtn.addClass("hidden");
					rightBtn.removeClass("hidden");
				}else if(idx == len-1){
					rightBtn.addClass("hidden");
					leftBtn.removeClass("hidden");					
				}else{
					rightBtn.removeClass("hidden");
					leftBtn.removeClass("hidden");						
				}
			}
		});
		/***
		** dock左边的箭头
		**/
		_this.lfButton.click(function(e){
			e.stopImmediatePropagation();
			if($(this).hasClass("disabled")) return false;
			var ul = _this.list.find("ul");
			
			var lf = parseFloat(ul.find("li:first").css("marginLeft")||0);
			ul.find("li:first").css("marginLeft",(lf+100)+"px");
			setButton();
		});
		/***
		**dock 右边的箭头
		**/
		_this.rtButton.click(function(e){
			e.stopImmediatePropagation();
			if($(this).hasClass("disabled")) return false;
			var ul = _this.list.find("ul");
			var lf = parseFloat(ul.find("li:first").css("marginLeft"));
			ul.find("li:first").css("marginLeft",(lf-100)+"px");
			setButton();
		});
		
		//处理向左翻(上一张)<      还是向右翻（下一张） >
		_this.body.unbind('click').click(function(e){
			var len = _this.list.find("ul[data-len]").data("len");
			var leftBtn = _this.body.find("a.left.carousel-control");
			var rightBtn = _this.body.find("a.right.carousel-control");
			//左翻
			if((e.target.tagName=="A" && $(e.target).hasClass("left"))||
			    e.target.tagName=="SPAN" && $(e.target).attr("class").indexOf("left")!=-1){
			var the = _this.list.find("ul>li.active");
			var current = parseInt(the.attr("index"));
				if(current<1){
					var next = 0;
					return false;
				}else{
					leftBtn.removeClass("hidden");
					rightBtn.removeClass("hidden");
					next = current - 1;
				}
			var hwd = _this.list.find("ul>li[index="+(current-1)+"]");	 
				hwd.addClass("active").siblings().removeClass("active");				
			var that = _this.body.find("div.carousel-inner");
			var hwd2 = that.find("div.item[index="+(current-1)+"]");
				scale(hwd2.attr("w"),hwd2.attr("h"));
				hwd2.addClass("active").siblings().removeClass("active");
				if(parseInt(the.attr("index"))<=1){
					leftBtn.addClass("hidden");
				}
			}//右翻
			else if((e.target.tagName=="A" && $(e.target).hasClass("right"))||
					  e.target.tagName=="SPAN" && $(e.target).attr("class").indexOf("right")!=-1){
				var the = _this.list.find("ul>li.active");
				var current = parseInt(the.attr("index"));
					if(current>=len-1){
						return false;
					}else{
						rightBtn.removeClass("hidden");
						leftBtn.removeClass("hidden");
					}
				var next = (current+1>=len)?current:current+1;
					hwd = _this.list.find("ul>li[index="+(next)+"]");
					hwd.addClass("active").siblings().removeClass("active");				
				var that = _this.body.find("div.carousel-inner");
				var src = that.find("div.item[index="+(next)+"] img").data("src");
				showImg(next); showImg(next+1);
				hwd2 = 	that.find("div.item[index="+(next)+"]");
				scale(hwd2.attr("w"),hwd2.attr("h"));	
				hwd2.addClass("active").siblings().removeClass("active");
				if(next >= len-1){
				   	rightBtn.addClass("hidden");
				  }
			};			
		});
		
		
		$(window).resize(function(e){
			setButton();
			if(_this.wrapper.hasClass("in")){
				var the = _this.body.find("div.carousel-inner div.item.active");
				scale(the.attr("w"),the.attr("h"));
			}
		});
    };
	/**
	**列表组件的初始化
	**/
    Gallery.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

    };
	
	/**
	** 构建下拉菜单样子
	**/
	Gallery.prototype.concrate = function(data){
		var _this = this;
		var pa = $(document.body);//modal-lg
		if(pa.find("[id*='gallery'][class*='modal fade']").length==0){
			_this.wrapper = $('<div class="modal fade" tabindex="-1" role="dialog" id="gallery-holder">\
					  <div class="modal-dialog modal-gallery">\
						<div class="modal-content"></div>\
					  </div>\
					</div>');
			_this.body = $('<div class="modal-body"></div>');
			_this.dock = $('<div class="gallery-list-wrapper"></div>');
			_this.lfButton = $("<i class='glyphicon glyphicon-triangle-left'></i>");
			_this.rtButton = $("<i class='glyphicon glyphicon-triangle-right'></i>");
			_this.list = $("<div class='list-box'><ul></ul></div>");
			_this.dock.append(_this.lfButton).append(_this.list).append(_this.rtButton);
			_this.wrapper.find("div.modal-content").append(_this.body);
			
			_this.close = $('<button class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>\
						  </button>');
			_this.wrapper.append(_this.dock).append(_this.close);
			pa.append(_this.wrapper);
		}else{
			_this.wrapper = pa.find('#gallery-holder');
			_this.body = _this.wrapper.find("div.modal-body");
			_this.dock = _this.wrapper.find(".gallery-list-wrapper");
			_this.lfButton = _this.wrapper.find("i.glyphicon-triangle-left");
			_this.rtButton = _this.wrapper.find("i.glyphicon-triangle-right");
			_this.list = _this.dock.find("div.list-box:has(ul)");	
		}		
		
		this.cover = $('<img class="img-thumbnail" width="100%" height="100%">');
		this.mask = $('<div class="gallery-mask"><i class="glyphicon glyphicon-zoom-in"></i></div>');
					
		this.elem.append(this.cover).append(this.mask);

	};

    Gallery.prototype.initConfig = function(){
        var _this = this;
		var cfg =  this.config;
		if(cfg.cover){
			_this.cover.attr("src",cfg.cover);
		}
		
		if(cfg.data && cfg.data.length){
		}else{
			_this.lfButton.addClass("disabled");
			_this.rtButton.addClass("disabled");
		}
	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.gallery = function (options) {
		var the = this.first();
        var gallery = new Gallery(the, options);
        the = $.extend(true,{},the,new exchange(gallery));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin 
    **/
    function exchange(drop){
		
    }
	
	  var old = $.fn.gallery;
	  $.fn.gallery.Constructor = Gallery;
	  // gallery NO CONFLICT
	  // ===============
	  $.fn.gallery.noConflict = function () {
		$.fn.gallery = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.gallery.defaults = {
		current:0,//当前默认是第几个
		cover:"",//封面图片
		data:[]
	};
}(jQuery));

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    /***
	**@constructor {Class} Navbar
	**/
    function Navbar(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.navbar.defaults,element.data(),options);
		this.init();	
    };

	/**
	**导航栏初始化
	**/
    Navbar.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
		
		
		this.list.find("li:has(a)").click(function(e){
			e.stopImmediatePropagation();
			if(!$(this).hasClass("active")){
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
			}
		});
    };
	
	/**
	** 构建样子
	**/
	Navbar.prototype.concrate = function(data){
		var _this = this;
		var container = $('<div class="container-fluid" />');
		var body = $('<div class="collapse navbar-collapse" />');
		this.list = $('<ul class="nav navbar-nav" />');
		if(this.config.type ==1){
			this.elem.addClass("nav-padding");
			container.append(body.append(_this.list));
		}else if(this.config.type == 2){
			this.elem.addClass("nav-padding-multi");
			var header = $('<div class="navbar-header">');
			var logo = $('<a class="navbar-brand" href="#">Brand&Logo</a>');
			header.append(logo);
			container.append(header).append(body.append(_this.list));
			this.list.addClass("nav-list-specify");
		}
		
		this.config.data.forEach(function(item,index){
			if(typeof(item)=="string"){
				var txt = item;
				var li = $('<li><a href="#">'+txt+'</a></li>');
				_this.list.append(li);	
			}else{
				if(item.hasOwnProperty("type")){
					txt = item.label||item.text||item.name;
					switch(item.type){
						case "link":
							li = $('<li><a href="#">'+txt+'</a></li>');
							_this.list.append(li);	
							break;
						case "input":
						case "button":	
							if(!_this.hasOwnProperty("form")) {
								_this.form = $('<form class="navbar-form navbar-left navbar-form-specify" />'); 
								body.prepend(_this.form);
							}
							li = $('<div class="form-group"></div>');
							if(item.type=="input"){
								li.html('<input type="text" class="form-control" placeholder="Search">',{
									value:txt
								});
							}else if(item.type=="button"){
								li = $('<button type="text" class="btn btn-default">'+txt+'</button>');
							}
							_this.form.append(li);
							break;
					}
				}else{
					_this.list.append(li);	
				}
			}	
		});		
		this.elem.append(container);
	};

	/**
	** 、配置用户定制
	**/
    Navbar.prototype.initConfig = function(){
        var _this = this;
		
    }
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.navbar = function (options) {
		var the = this.first();
        var navbar = new Navbar(the, options);
        exchange.call(this,navbar);
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(navbar){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(navbar){
            
        }
    }
	/***
	** outside accessible default setting
	**/
	$.fn.navbar.defaults = {
		type:1,
		data:["link1","like2","like3"],//导航菜单数据
	};
}(jQuery));

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	var Static = {option:{}};
	
    /**
    **下拉菜单展示的方向问题
    **/
    function setDirect(ta){
        var peal = ta.dropwrapper||ta.find(".drop-wrapper"); // 下来菜单所在的盒子
        var dp = (ta.dropwrapper && ta.dropwrapper.find("ul.page-dropdown"))||ta.find("ul.page-dropdown"); //下来菜单本身
        var ls = dp.get(0).getBoundingClientRect();
		var p = peal.get(0).getBoundingClientRect();
		if((window.innerHeight-p.bottom)>ls.height){//下面容得下 下拉菜单的展示，正常
			dp.removeAttr("style");
			peal.find("i.glyphicon-triangle-bottom").removeClass("turnback");
		}else if(p.top>ls.height){//向上展示
			dp.css({"top":-(ls.height)+"px"});
			peal.find("i.glyphicon-triangle-bottom").addClass("turnback");
		}
    };	
	/***
	** 构建可点击页面列表 html
	**/
	function listHtml(start,_this){
		if(start<=0) start = 1;
		var html = "";
		var len = Math.min(_this.config.showPage,_this.config.totalPages);
		for(var i=start;i<=(start+len-1);i++){
			html +="<li class='page-item' value="+i+">"+i+"</li>";
		}
		return html;
	};
	/***
	** 页码被点击
	**/
	function itemClick(instance){
		var _this = instance;
		var cb = arguments.callee;
		var list = _this.list;
		var cfg = _this.config;
		var ta = list.find("li.page-item:not([role])");
		ta.unbind("click").click(function(e){
			var current = $(this).attr("value");
			e.stopImmediatePropagation();
			$(this).addClass("active").siblings("li").removeClass("active");
			var list_1 = parseInt(ta.first().text());
			var list_n = parseInt(ta.last().text());
			if($(this).text() == list_1 && list_1!=1){
				var gap = list_1 - 1;
				if(gap>=2){
					var html = listHtml((list_1-2),_this);
				}else{
					html = listHtml((list_1-1),_this);	
				}
				list.find("li.page-item:not([role])").remove();
				$(html).insertAfter(list.find("li.page-item[role=begin]"));
				list.find("li[value="+current+"]").addClass("active");
				cb(_this);
			}
			
			if($(this).text() == list_n && list_n!=cfg.totalPages){
				gap = cfg.totalPages  - list_n;
				if(gap>=2){
					 html = listHtml((list_1+2),_this);					
				}else{
					html = listHtml((list_1+1),_this);	
				}
				list.find("li.page-item:not([role])").remove();
				$(html).insertAfter(list.find("li.page-item[role=begin]"));
				list.find("li[value="+current+"]").addClass("active");
				cb(_this);
			}
			
			if(current == cfg.totalPages){
				list.find("li.page-item[role=end]").addClass("disabled");
			}else if(current == 1){
				list.find("li.page-item[role=begin]").addClass("disabled");
			}else{
				list.find("li.page-item[role]").removeClass("disabled");
			}
			//val:第几页
			fireEvent(_this.elem.get(0),"PAGE_CHANGE",{currentPage:parseInt(current)});
		});	
	};
	
	function buildPageList(_this){
		var cfg = _this.config;
		if(_this.list && _this.list.children().length){
			_this.list.empty();
		}else{
			_this.list = $("<ul class='pagination'/>");
		}
		_this.beginButton = $("<li class='page-item' role='begin' >"+cfg.begin+"</li>");
		if(cfg.currentPage==1) _this.beginButton.addClass("disabled"); 
		// 尾页
		_this.endButton = $("<li class='page-item' role='end'>"+cfg.end+"</li>");
		var len = Math.min(cfg.totalPages,cfg.showPage);	
		var html = listHtml(1,_this);
		_this.list.append(_this.beginButton).append(html).append(_this.endButton);
		_this.list.find("li.page-item:not([role]):first").addClass("active");
		_this.elem.append(_this.list);
		//注册监听事件
		itemClick(_this);
		//首页，尾页点击事件
		_this.list.find("li[role].page-item").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			if($(this).hasClass("disabled")) return false; //如果是disabled  不反应
			var fst = _this.list.find("li.page-item:not([role]):first").text();// 当前显示最小页数
			var las = _this.list.find("li.page-item:not([role]):last").text();//单签显示的最大页数
			var page = 1;
			//当前第几页
			if($(this).attr("role")=="begin"){
				if(fst!=1){
					 html = listHtml(1,_this);
					_this.list.find("li.page-item:not([role])").remove();
					$(html).insertAfter(_this.list.find("li.page-item[role=begin]"));
					itemClick(_this);				
				}
				_this.list.find("li.page-item:not([role]):first").addClass("active")												.siblings().removeClass("active");
				$(this).addClass("disabled").siblings().removeClass("disabled");;
				page = 1;
			}else{
				if(las!=_this.config.totalPages){
					 html = listHtml((cfg.totalPages-cfg.showPage + 1),_this);
					_this.list.find("li.page-item:not([role])").remove();
					$(html).insertAfter(_this.list.find("li.page-item[role=begin]"));
					itemClick(_this);				
				}
				_this.list.find("li.page-item:not([role]):last").addClass("active")
																.siblings().removeClass("active");
				$(this).addClass("disabled").siblings().removeClass("disabled");
				page = _this.config.totalPages;
			}
			fireEvent(_this.elem.get(0),"PAGE_CHANGE",{currentPage:page});
		});		
	}
	
    
    function Page(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.page.defaults,element.data(),options);
		//显示几页，比如一共有20页，但是显示可点击的按钮5个  len = 5;
		if(this.config.totalItems){
			this.config.totalPages = Math.ceil(this.config.totalItems/this.config.perPage);
		}
		this.config.showPage=5,//最大显示几页
		this.init();	
    };

	/**
	**列表组件的初始化
	**/
    Page.prototype.init = function () {
        var _this = this;
		_this.concrate();
		_this.initConfig();		

		
		//如果是 带有选择每页显示多少页的 分页组件
		if(_this.config.type ==2 || _this.config.type == 3){
			_this.dropwrapper.mouseenter(function(e){
				e.stopImmediatePropagation();
				$(this).find("ul.page-dropdown").toggleClass("hidden");
				setDirect(_this);
			});
			_this.dropwrapper.mouseleave(function(e){
				e.stopImmediatePropagation();
				$(this).find("ul.page-dropdown").addClass("hidden");
			});	
			_this.dropwrapper.find("ul.page-dropdown>li").click(function(e){
				e.stopImmediatePropagation();
                $(this).addClass("active").siblings().removeClass("active");
				$(this).parent().addClass("hidden");
				var per = parseInt($(this).text());
				if(_this.pagetext.text()!=per){
					_this.pagetext.text(per);_this.num.html(per);
					_this.config.perPage = parseInt(per);//每页显示多少条
					_this.config.totalPages = Math.ceil(_this.config.totalItems/_this.config.perPage)
					buildPageList(_this);
					//currentPage 当前页，perpage ： 没页显示多少条
					fireEvent(_this.elem.get(0),"SHOW_ITEMS_CHANGE",{currentPage:1,perpage:per});//
				}
			});
		}
		if(_this.config.type ==4){
			_this.elem.find(".drop-wrapper").click(function(e){
				e.stopImmediatePropagation();
				$(this).find("ul").toggleClass("hidden");
				setDirect(_this.elem);
			});
			
			/***
			**  页数项 被点击
			***/
			_this.elem.find(".drop-wrapper>ul>li").click(function(e){
				$(this).parents(".drop-wrapper:first").find(".text-show").text("第" + $(this).attr("val") + "页");
				$(this).addClass("active").siblings().removeClass("active");
				var p = parseInt($(this).attr("val"));
				fireEvent(_this.elem.get(0),"PAGE_CHANGE",{currentPage:p});
			});
			
			//上一页 按钮 点击
			_this.elem.find(".pre-page").click(function(e){
				e.stopImmediatePropagation();
				var the = _this.elem.find(".drop-wrapper>ul>li.active");
				var n = parseInt(the.attr("val"));
				if(n>1){
					n = n - 1;
					the.removeClass("active").prev().addClass("active");
					_this.elem.find(".text-show").text("第" + n + "页");
				}
				fireEvent(_this.elem.get(0),"PAGE_CHANGE",{currentPage:n});
			});
			
			
			//下一页 按钮 点击
			_this.elem.find(".next-page").click(function(e){
				e.stopImmediatePropagation();
				var the = _this.elem.find(".drop-wrapper>ul>li.active");
				var max = parseInt(_this.elem.find(".drop-wrapper>ul>li:last").attr("val"));
				var n = parseInt(the.attr("val"));
				if(n<max){
					n = n + 1;
					the.removeClass("active").next().addClass("active");
					_this.elem.find(".text-show").text("第" + n + "页");
				}
				fireEvent(_this.elem.get(0),"PAGE_CHANGE",{currentPage:n});
			});
		};
		
		$(document).click(function(e){
			_this.elem.find(".drop-wrapper>.page-dropdown").addClass("hidden");
		});
		
    };
	
	/**
	** 构建下来菜单样子
	**/
	Page.prototype.concrate = function(){
		var _this = this;
		var cfg = _this.config;
		if(cfg.type==2 || cfg.type == 3){
			if(cfg.defItems>=cfg.perPages.length) cfg.defItems = 0;// 默认选择下拉菜单的第一项
			_this.pagetext = $("<span class='page-choosed-text'/>").html(cfg.perPages[cfg.defItems]);//显示当前选定的 每页显示的条数
			_this.dropwrapper = $("<span class='page-drop-list'/>");
			var more = $("<i class='glyphicon glyphicon-menu-hamburger' />");
			var down = $("<i class='glyphicon glyphicon-triangle-bottom' />");
			var drop = $("<ul class='page-dropdown hidden'/>");//
			_this.num = $("<div class='page-now' />").text(cfg.perPages[cfg.defItems]);
			if(cfg.type==2){
				_this.dropwrapper.append(more).append(down);
			}else if(cfg.type==3){
				_this.dropwrapper.append(_this.num).append(down);
			}
            //每页显示多少条
			cfg.perPages.forEach(function(item,index){
				if(typeof(item)=="string"||typeof(item)=="number"){
					var str = item;
				}else{
					str = item.name||item.text||item.pages;
				}
				var li = $("<li data-val="+str+" />").text(str);
                if(cfg.perPage==parseInt(str)) li.addClass("active");
				drop.append(li);
			});
			_this.dropwrapper.append(drop);
			if(cfg.type==2){
				_this.elem.append(_this.pagetext).append(_this.dropwrapper);
			}else if(cfg.type==3){
				_this.elem.append(_this.dropwrapper);
			}
		}
		if(cfg.type<4) buildPageList(_this);
		
		if(cfg.type==4){
			var pre = $("<span class='pre-page' />").html(cfg.pre);
			var drop = $("<ul class='page-dropdown hidden' />");
			var dropbox = $("<span class='drop-wrapper' />").append("<div class='text-show'></div>").append(drop);
			var next = $("<span class='next-page' />").html(cfg.next);
			if(cfg.currentPage||1) dropbox.find(".text-show").text("第"+(cfg.currentPage||1)+"页");
			for(var i=1;i<=cfg.totalPages;i++){
				var li = $("<li index="+i+"  val="+i+" >第"+i+"页</li>");
				if(cfg.currentPage == i) li.addClass("active"); 
				drop.append(li);
			};
				
			_this.elem.append(pre).append(dropbox).append(next).addClass("special");
		}
	};

    Page.prototype.initConfig = function(){
        var _this = this;
		var cfg = _this.config;
		var cp = _this.config.currentPage||1;
		if(cfg.type!=4 && (cfg.currentPage||1)){
			_this.list.find("li.page-item[value="+cp+"]").addClass("active");			
		}
		
		if(cfg.type==2 && cfg.perPage){
			_this.pagetext.text(cfg.perPage);
		}
    }
	
	/***
	** 设置 具体的页数
	**@params {int} num
	***/
	Page.prototype.setpage = function(num){
		var total = this.config.totalPages;
		
	};
	
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.page = function (options) {
		var the = this.first();
        var page = new Page(the, options);
        the = $.extend(true,{},the,new exchange(page));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Page} page :  instacne of the plugin builder
    **/
    function exchange(page){
		/***
		** 设置 第几页
		***/
		this.val = function(num){
			var num = parseInt(num)||1; //默认第一页
			//设置 显示到第几页
			page.setpage(num);
			return page.elem;
		}
    }
	
	  var old = $.fn.page;
	  $.fn.page.Constructor = Page;
	  // page NO CONFLICT
	  // ===============
	  $.fn.page.noConflict = function () {
		$.fn.page = old;
		return this;
	  }
	/***
	** outside accessible default setting
	**/
	$.fn.page.defaults = {
		type:1,//1 普通分页，2 每页显示多少条的分页 3,页数下拉菜单，4 类似微博的翻页控件
		begin:"<i class='glyphicon glyphicon-step-backward'></i>",//第一页
		end:"<i class='glyphicon glyphicon-step-forward'></i>",//最后一页
		totalPages:1,//总共有多少页
		currentPage:1,//默认显示第一页
		perPage:10,//每页显示多少条
		defItems:0,//默认每页展示多少条，下来数组中的第几个选项，必须和perPages联用
		perPages:[10,20,30],//每页显示条数选择区间
		totalItems:0,//总共有多少条数据  如果这个数据存在，则totalPages 的数据就不用了，使用这里计算的结果	
		pre:"上一页",
		next:"下一页"
	};
}(jQuery));

;(function($) {
    var self = this;

    var tpl = '<div class="{{css}}" data-progressbar-shape="{{shape}}">\
                <div class="progress progressbar-default" style="width: {{width}}px;">\
                    <div class="progress-bar" role="progressbar" style="width: {{progress}}; height: {{size}}px;">\
                    </div>\
                </div>\
                <div class="progressbar-circle" style="width: {{width}}px; height: {{width}}px;">\
                    <div class="progressbar-pie-left" style="clip: rect(0, {{clip-width}}px, auto, 0);">\
                        <div class="progressbar-left" style="clip: rect(0, {{clip-width}}px, auto, 0);">\
                        </div>\
                    </div>\
                    <div class="progressbar-pie-right" style="clip: rect(0, auto, auto, {{clip-width}}px);">\
                        <div class="progressbar-right" style="clip: rect(0, auto, auto, {{clip-width}}px);">\
                        </div>\
                    </div>\
                    <div class="progressbar-mask" data-progress="{{progress}}" style="width: {{circle-inner}}px; height: {{circle-inner}}px; left: {{size}}px; top: {{size}}px;"></div>\
                </div>\
            </div>';


    function Progressbar(element, options) {
        var self = this;
        this.$elem = $(element);
        this.config = $.extend(true, $.fn.progressbar.defaults, {
            css: this.$elem.attr('data-progressbar-css'),
            progress: this.$elem.attr('data-progressbar-progress'),
            width: this.$elem.attr('data-progressbar-width'),
            size: this.$elem.attr('data-progressbar-size')
        }, options);
        this.init(options);
    };

    Progressbar.prototype = {
        constructor: 'Progressbar',
        /**
         * 初始化
         */
        init: function() {
            //获取进度的dom对象
            this.buildDom();
        },
        /**
         * 生成dom树
         */
        buildDom: function() {
            this.$progress = $(tpl.replace("{{css}}", this.config.css)
                .replace(/{{progress}}/ig, this.config.progress)
                .replace(/{{width}}/ig, this.config.width)
                .replace(/{{size}}/ig, this.config.size)
                .replace(/{{clip-width}}/ig, this.config.width / 2)
                .replace(/{{circle-inner}}/ig, this.config.width - this.config.size * 2)
                .replace(/{{shape}}/ig, this.config.shape));
            this.$bar = this.$progress.find('.progress-bar');
            this.$circle = this.$progress.find('.progressbar-circle');
            this.setProgress(this.config.progress);
            this.$elem.html(this.$progress);
        },
        /**
         * 设置进度
         */
        setProgress: function(p) {
            this.config.progress = p;
            //线形的
            this.$bar.css('width', p);
            //环形的
            var angle = parseInt(p) * 3.6;
            var $right = this.$circle.find('.progressbar-right');
            var $left = this.$circle.find('.progressbar-left');
            this.$circle.find('.progressbar-mask').attr('data-progress', p);
            if (angle <= 180) {
                $left.css('transform', "rotate(0deg)");
                setTimeout(function() {
                    $right.css('transform', "rotate(" + angle + "deg)");
                }, 500)
            } else {
                $right.css('transform', "rotate(180deg)");
                setTimeout(function() {
                    $left.css('transform', "rotate(" + (angle - 180) + "deg)");
                }, 500)
            };
            return this;
        },
        /**
         * 获取进度
         */
        getProgress: function() {
            return this.config.progress;
        },
        /**
         * 设置形状
         */
        setShape: function(shape) {
            this.config.shape = shape;
            this.init();
            return this;
        },
        /**
         * 获取形状
         */
        getShape: function() {
            return this.config.shape;
        },
        /**
         * 设置宽度
         */
        setWidth: function(width){
            this.config.width = width;
            this.init();
            return this;
        },
        /**
         * 获取宽度
         */
        getWidth: function(){
            return this.config.width;
        },
        /**
         * 设置进度条的尺寸
         */
        setSize: function(size){
            this.config.size = size;
            this.init();
            return this;
        },
        /**
         * 获取进度条的尺寸
         */
        getSize: function(){
            return this.config.size;
        },

    }

    $.fn.progressbar = function(options, value) {
        var returnVal = this;
        this.each(function(key, the) {
            if (!the.progressbarInstance) {
                the.progressbarInstance = new Progressbar(the, options);
            } else {
                if(['progress', 'shape', 'size', 'width'].indexOf(options) > -1) {
                    var method = options.toLowerCase().replace(/[a-zA-Z]/,function(s){return s.toUpperCase()});
                    if (value) {
                        the.progressbarInstance['set' + method](value);
                    } else {
                        returnVal = the.progressbarInstance['get' + method]();
                    }
                }
            }

        })
        return returnVal;
    };

    $.fn.progressbar.defaults = {
        css: '',
        progress: '80%',
        shape: 'default',
        width: 100,
        size: 5
    };
})(jQuery)
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

;(function ($) { 
    var self = this;  
	
    /**
    **下拉菜单展示的方向问题
    **/
    function setDirect(ta){
        var peal = ta.peal;
        var dp = ta.list; 
        var ls = dp.get(0).getBoundingClientRect();
		var p = peal.get(0).getBoundingClientRect();
		if((window.innerHeight-p.bottom)>ls.height){//下面容得下 下拉菜单的展示，正常
			dp.removeAttr("style");
			ta.elem.find("i.glyphicon-menu-down").removeClass("turnback");
		}else if(p.top>ls.height){//向上展示
			dp.css({"top":-(ls.height)+"px","box-shadow":"0 0 1px #ccc"});
			ta.elem.find("i.glyphicon-menu-down").addClass("turnback");
		}
    };
	
    function Search(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.search.defaults,element.data(),options);
		this.config.wi = this.elem.width()||30;
		this.init();	
    };
	/**
	**列表组件的初始化
	**/
    Search.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
      	
		/***
		**输入框获得焦点
		**/
		this.input.focus(function(e){
			e.stopImmediatePropagation();
			_this.elem.addClass("focus");
			fireEvent(_this.elem.get(0),"search_focus");
			if(_this.config.type==3||_this.config.type==4){
				if(_this.dropmenu.children().length>0) _this.dropmenu.removeClass("hidden");
			}
		});
		this.input.click(function(e){
			e.stopImmediatePropagation();
		});
		
		/***
		**输入框失去焦点
		**/
		this.input.blur(function(e){
			e.stopImmediatePropagation();
			_this.elem.removeClass("focus");
		});
		/***
		**点击搜索
		**/
		this.icon.click(function(){
			if(_this.elem.hasClass("disabled")) return false;//如果是 disabled  不起作用
			fireEvent(_this.elem.get(0),"do_search",{text:_this.input.val(),id:_this.input.attr("cid")});
		});
		/***
		** 回车键
		***/
		this.input.keyup(function(e){
			e.preventDefault();
			if(e.keyCode == 13){
				if(_this.config.type==3 || _this.config.type==4){
					_this.dropmenu.addClass("hidden");
					fireEvent(_this.elem.get(0),"ITEM_SELECT",{text:$(this).val()});	
				}
			}
			
			if(e.keyCode == 40){//下
				//默认选中下拉的 第一个
				if(_this.dropmenu.find("li.em").length==0){
					_this.dropmenu.find("li:first").addClass("em").siblings().removeClass("em");
				}else{
					var next = (parseInt(_this.dropmenu.find("li.em").attr("index"))+1);
					var the = _this.dropmenu.find("li[index="+next+"]");
					if(the.length>0){							
						the.addClass("em").siblings().removeClass("em");
					}else{
						_this.dropmenu.find("li:first").addClass("em").siblings().removeClass("em");
					}
				}
				var emed = _this.dropmenu.find("li.em");
				_this.input.val(emed.attr("val"));
				_this.wrapper.find(".close-cus").removeClass("hide");
			}else if(e.keyCode == 38){//上
				//默认选中下拉的最后一个
				if(_this.dropmenu.find("li.em").length==0){
					_this.dropmenu.focus().find("li:last").addClass("em").siblings().removeClass("em");
				}else{
					var pre = (parseInt(_this.dropmenu.find("li.em").attr("index"))-1);
					the = _this.dropmenu.find("li[index="+pre+"]");
					if(the.length>0){							
						the.addClass("em").siblings().removeClass("em");
					}else{
						_this.dropmenu.find("li:last").addClass("em").siblings().removeClass("em");
					}				
				}
				emed = _this.dropmenu.find("li.em");
				_this.input.val(emed.attr("val"));
				_this.wrapper.find(".close-cus").removeClass("hide");
			}
		});
		/***
		** 里面输入内容发生改变
		**/
		_this.input.on("input",function(e){
			var input = $(this).removeAttr("cid");
			e.stopImmediatePropagation();
			if(_this.config.type==3||_this.config.type==4){
				_this.wrapper.addClass("loading");
				var key = $(this).val();
				var opt = $.extend({}, _this.config.ajaxOptions);
				if (!opt.data){
					opt.data = {key:key};
				} else if (typeof opt.data === 'function') {
					opt.data = opt.data(key);
				}
				//opt.processResults = null;
				if (_this.xhr != null) {
					//终止上一次的请求
					_this.xhr.abort();

					_this.xhr = null;
				}
				_this.xhr = $.ajax(opt);

				_this.xhr.then(function(result){
					if (_this.config.ajaxOptions.processResults){
						result = _this.config.ajaxOptions.processResults(result)
					}
					if(typeof(result)=="string") result = JSON.parse(result);
					_this.dropmenu.empty();
					var _datas = result.data;
					if (_datas && _datas.length){
						_datas.forEach(function(item,index){
							var txt = (typeof(item)=="string")?item:(item.text||item.label||item.name||item.tagName);
							var val = item.val || item.value || txt;
							var id = item.id;
							var re2 = new RegExp("["+key+"]+","i");
							var re = new RegExp(key,"i");
							if(String(txt).match(re)){
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
							if(!_this.config.rowdec){
								var li = $('<li class="result-option" data-val="'+val+'" data-name="'+txt+'" data-text='+txt+' index='+index+' tabIndex='+index+'><a href="#">'+(val1||txt)+'</a></li>');
								if(id) li.attr("data-id",id);
							}else{
								var li = _this.config.rowdec(item,index,val1);
							}
							if (item.path){
								item.path = item.path.join("#").replace(/\s/g,"");
							}
							li.data("info", item);
							_this.dropmenu.append(li);
						});
					} else if (_this.config.formatNoMatches) {
						_this.dropmenu.append('<li class="no-result">' +  _this.config.formatNoMatches + '</li>');
					}
                    if(_this.dropmenu.children().length>0){
					   _this.dropmenu.removeClass("hidden");
                    }
					_this.wrapper.removeClass("loading");
					
					_this.dropmenu.find("li").unbind("click").click(function(e){
						e.preventDefault();
						e.stopImmediatePropagation();
						if ($(this).hasClass("no-result")){
							return false;
						}
						if($(this).hasClass("selected")) return false;
						if(_this.config.clickhide) _this.input.val($(this).data('text')).attr("cid",$(this).data('id'));//点击之后隐藏
						if(_this.config.clickhide)_this.dropmenu.addClass("hidden");//点击之后隐藏
						_this.wrapper.find(".close-cus").removeClass("hide");// 显示右侧的 x 删除号
						//modify by sisi 为了保证数据尽可能完整的返回 故修改成 $(this).data("info")
						fireEvent(_this.elem.get(0),"ITEM_SELECT",$(this).data("info"));
						if(!_this.config.clickhide){
							$(this).addClass("selected");
						}
					});	
		
				},function(err){
					_this.wrapper.removeClass("loading");
				});			
			}
			//发出事件
			fireEvent(_this.elem.get(0),"INPUT_CHANGE",{text:$(this).val()});			
		});
	
		/***
		**点击 展开下拉菜单
		***/
		this.elem.find("span.search-drop").click(function(e){
			e.stopImmediatePropagation();
			if(_this.elem.hasClass("disabled")) return false;//如果是 disabled  不起作用
			_this.elem.find("ul.search-drop-wrapper").toggleClass("hidden");
			if(!_this.elem.find("ul.search-drop-wrapper").hasClass("hidden")){
				setDirect(_this);
			}	
		});
		
		/***
		** 前置下拉菜单被点击
		**/
		this.elem.find("li.search-item").click(function(e){
			e.stopImmediatePropagation();
			if(_this.elem.hasClass("disabled")) return false;//如果是 disabled  不起作用
			var txt = $(this).attr("val");
			var ind = $(this).attr("index");
			_this.elem.find("ul.search-drop-wrapper").toggleClass("hidden");
			if(ind == _this.elem.find("span.selected-item").attr("index")) return false;	
			_this.elem.find("span.selected-item").text(txt).attr({"index":ind,val:txt,name:txt});
			
			fireEvent(_this.elem.get(0),"SCOPE_CHANGE",{index:ind,value:txt});
		});
		
		
		this.wrapper.find(".close-cus").click(function(e){
			e.stopImmediatePropagation();
			fireEvent(_this.wrapper.get(0),"INPUT_CLEAR",{text:_this.input.val()});
			$(this).addClass("hide");
			_this.input.val("").removeAttr("name");
		});
		
		$(document).click(function(e){
			_this.elem.find("ul.search-drop-wrapper").addClass("hidden");
			_this.elem.find(".dropdown-menu-cus").addClass("hidden");
		});
		
    };
	
	/**
	** 构建下来菜单样子
	**/
	Search.prototype.concrate = function(data){
		var _this = this;
        this.elem.attr("typecode",_this.config.type);
		this.wrapper = $("<div class='search-decoration' />");
		this.input = $("<input class='form-control search-input' type='text' />");
		
		this.wrapper.append(this.input);
		
		this.dropmenu = $('<ul class="dropdown-menu dropdown-menu-cus hidden" />');
		this.wrapper.append(this.dropmenu);
		this.elem.append(this.wrapper);
	};

    Search.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		if(cfg.type == 2 || cfg.type == 4){
			this.peal = $("<span class='search-drop'/>");
			var txtbox = $("<span class='selected-item' tabIndex='-1' />");
			this.peal.append(txtbox).append("<i class='drop-spliter'></i>");
			if(cfg.dropList && cfg.dropList.length>0){
				this.list = $("<ul  class='search-drop-wrapper hidden'/>");	
				for(var i=0;i<cfg.dropList.length;i++){
					var the = cfg.dropList[i];
					if(typeof(the) == "object"){
						var txt = the.name||the.label||the.text;
					}else{
						txt = the;
					}
					if(i==0){
						txtbox.text(txt).attr("index",0);
					}		
					var li = $("<li class='search-item' />").text(txt).attr({"index":i,"val":txt,title:txt});
					_this.list.append(li);
				}
				this.peal.append(_this.list).append("<i class='glyphicon glyphicon-menu-down' />");
			}
			this.elem.prepend(this.peal);
			this.wrapper.css({"width":"70%"});
			this.peal.css("line-height",this.elem.height()+"px");
		}else{
			this.wrapper.removeAttr("style");
		}
		
		if(cfg.type==3 || cfg.type==4){
			var dim = _this.wrapper.height();
			var spin = $('<div class="spinner">\
						  <div class="bounce1"></div>\
						  <div class="bounce2"></div>\
						  <div class="bounce3"></div>\
						</div>').css({"line-height":(dim||28)+"px","height":(dim||28)+"px"});
			var wb = parseFloat(_this.input.css("height")||30);
			var close = $('<span class="close close-cus hide">&times;</span>')
						.css("right",wb+"px");
			_this.wrapper.append(spin).append(close);
		}
		
		if(cfg.magicon){
			this.icon = $(cfg.magicon);
			this.wrapper.append(this.icon);
			var h = this.elem.height();
			this.input.css({"width":((_this.elem.wi)-(h||28)-2)+"px","height":(h||28)+"px","line-height":(h||28)+"px"});
			this.icon.css({"width":(h||28)+"px","height":(h||28)+"px","line-height":(h||28)+"px"});
		}
		
		if(cfg.placeholder){
			this.input.attr("placeholder",cfg.placeholder);
		}
		
		if(cfg.disabled){
			this.elem.removeClass("focus").addClass("disabled");
			this.input.attr("disabled",true);
			if(this.peal){
				this.peal.addClass("disabled");
			}
		}else{
			this.input.removeAttr("disabled");
			this.elem.removeClass("disabled");
			if(this.peal){
				this.peal.removeClass("disabled");
			}			
		}
		
		if(cfg.name){
			this.input.attr("name",cfg.name);
		}
		
	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.search = function (options) {
		var the = this.first();
        var search = new Search(the, options);
        the = $.extend(true,{},the,new exchange(search));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(search){
        /**
        **默认input 值
        **/
		this.val = function(o){
			var txt = (typeof(o)=="string"||typeof(o)=="number")?o:(o.label||o.text||o.name||o.value);
			search.elem.find("input").val(txt);
			return search.elem;
		};
		
		//更新 ajax Option
		this.updateOption = function(o){
			search.config.ajaxOptions = o;
			return search.elem;
		};
		//清空输入框，
		//清空，下拉菜单
		this.clear = function(){
			search.elem.find("input").val("");
			search.dropmenu.empty().addClass("hidden");
			return search.elem;
		}
    }
	
	  var old = $.fn.search;
	  $.fn.search.Constructor = Search;
	  // search NO CONFLICT
	  // ===============
	  $.fn.search.noConflict = function () {
		$.fn.search = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.search.defaults = {
		type:1,// 默认 2 带前置下拉菜单  3 instance search 即时搜索,4 前置下拉才到呢 + instance search
		name:"search",//为了serialize 方便设置 name属性
		magicon:"<i class='glyphicon glyphicon-search'></i>",
		placeholder:"",// 提示文字
		disabled:false,
		clickhide:true,//点击或者选择 下拉菜单一项，是否消失下拉菜单,true 点击消失，false 点击不消失
		dropList:[],
		rowdec:null,// 回调函数  装饰下拉菜单中的一行，数据的呈现
        formatNoMatches:null,
        ajaxOptions: {
            type: "GET",
            url: "../data/search.json",
			xhrFields: { withCredentials: true}
        }		
	};
}(jQuery));

/*
 * @Author: mikey.zhaopeng
 * @Date:   2016-02-25 18:11:32
 * @Last Modified by:   mikey.zhaopeng
 * @Last Modified time: 2016-03-19 16:28:21
 */

'use strict';;
(function($) {
    /***
     **@constructor {Class} SidePanel
     **/
    function SidePanel($element, options) {
        var self = this;
        this.$elem = $element;
        if (options === 'show') {
            this.show();
        } else if (options === 'hide') {
            this.hide();
        } else if (options === 'toggle') {
            this.toggle();
        } else {
            this.config = $.extend(true, {}, $.fn.sidepanel.defaults, $element.data(), options);
            this.init();
        }
    };

    /**
     **列表组件的初始化
     **/
    SidePanel.prototype.init = function() {
        var self = this;
        this.concrate(); //构建下来菜单的样子
        this.events(); //绑定事件
        this.initConfig();
        setTimeout(function() {
            self.show();
        }, 200);
    };

    SidePanel.prototype.hide = function() {
        this.$elem.removeClass('with-full-sidepanel-panel');
        $('body .modal-backdrop.fade.in.sidepanel-backdrop').remove();
    };

    SidePanel.prototype.show = function() {
        this.$elem.addClass('with-full-sidepanel-panel');
        if($('body .modal-backdrop.fade.in.sidepanel-backdrop').length==0){
            $('body').append('<div class="modal-backdrop fade in sidepanel-backdrop"></div>');
            $('.sidepanel-backdrop').css('z-index','1000')
        }
    };
    SidePanel.prototype.toggle = function() {
        if(this.$elem.hasClass('with-full-sidepanel-panel')){
            this.hide();
        }else{
            this.show();
        }
    };

    SidePanel.prototype.events = function(data) {
        var self = this;
        self.$elem.off('click', '.sidepanel-panel .close,.sidepanel-panel .cancel').on('click', '.sidepanel-panel .close,.sidepanel-panel .cancel', function(e) {
            self.hide();
        });
        self.$elem.off('click', '.sidepanel-panel .panel-footer .ok').on('click', '.sidepanel-panel .panel-footer .ok', function(e) {
            if (self.config.callback) {
                self.config.callback(self.$elem)
            }
        });
    };

    /**
     ** 构建下来菜单样子
     **/
    SidePanel.prototype.concrate = function(data) {
        var self = this;
        var tpl =
            '<div class="sidepanel-panel">' +
            '    <div class="panel panel-default">' +
            '        <div class="panel-heading">' +
            '            <button type="button" class="close sidepanel-close" aria-label="Close">' +
            '                <span aria-hidden="true">×</span>' +
            '            </button>' +
            '            <h3 class="panel-title">Panel title</h3>' +
            '            <div class="edit-tip"></div>' +
            '        </div>' +
            '        <div class="panel-body">' +
            '            Panel content' +
            '        </div>' +
            '        <div class="panel-footer">' +
            '            <div class="btn-toolbar pull-right" role="toolbar" aria-label="Toolbar with button groups">' +
            '                <button type="button" class="btn btn-primary ok">'+(self.config.saveBtn ? self.config.saveBtn : '确定')+'</button>' +
            '                <button type="button" class="btn btn-default cancel">'+(self.config.cancelBtn ? self.config.cancelBtn : '取消')+'</button>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>';

        self.$root = $(tpl);
        self.$root.find('.panel-title').text(self.config.title);
        self.$root.find('.panel-body').html(self.config.content);
        $('.sidepanel-panel').remove();
        this.$elem.append(self.$root);
    }

    SidePanel.prototype.initConfig = function() {
        var self = this;
        if (self.config.rm) {
            self.tabwrapper.find("li>a").append("<i class='glyphicon glyphicon-remove transparent'></i>");
        }
    }

    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.sidepanel = function(options) {
        var the = this.first();
        var sidepanel = new SidePanel(the, options);
        the = $.extend(true, {}, the, new exchange(sidepanel));
        return the;
    };

    /***
     **和其他插件的交互
     ** factory Class
     **@param {Drop} drop :  instacne of the plugin builder
     **/
    function exchange(tab) {
        /**
         **@param {Object} msg {type:"类型"}
         **/
        this.manipulate = function(msg) {

        }
    }

    var old = $.fn.sidepanel;
    $.fn.sidepanel.Constructor = SidePanel;
    // SidePanel NO CONFLICT
    // ===============
    $.fn.sidepanel.noConflict = function() {
        $.fn.sidepanel = old;
        return this;
    }

    /***
     ** outside accessible default setting
     **/
    $.fn.sidepanel.defaults = {
        title: 'title', //标题
        content: 'content', //内容
        callback: null, //点击确定后的回调
    };
}(jQuery));

;(function ($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
    
    function Sinput(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.sinput.defaults,element.data(),options);
		this._width = this.elem.width();
		this.init();	
    };
	/**
	**列表组件的初始化
	**/
    Sinput.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
      
		//事件
		this.input.on("focus",function(e){
			_this.elem.addClass("active");
		});
		this.input.on("blur",function(e){
			_this.elem.removeClass("active");
		});
		//icon 被点击
		if(_this.config.xion){
			_this.elem.find("span.xion-cus").click(function(){
				if($(this).hasClass("switcher")){
					if($(this).find("label>input[type=checkbox]").is(":checked")){
						$(this).find("label").addClass("active");
						_this.input.attr("type","text");
					}else{
						$(this).find("label").removeClass("active");
						_this.input.attr("type","password");
					}
				}
				fireEvent(_this.elem.get(0),"ICON_CLICK");
			});
		}
		
		if(_this.config.type==2){
			//加
			_this.stepup.click(function(e){
				var val = parseFloat(_this.input.val());
				val = val+_this.config.step;
				if(val>_this.config.max) val = _this.config.max;
				_this.input.val(val);
				fireEvent($(this).get(0),"STEP_CHANGE",{val:val});
			});

			//减
			_this.stepdown.click(function(e){
				var val = _this.input.val();
				val = val - _this.config.step;
				if(val<_this.config.min) val=_this.config.min
				_this.input.val(val);
				fireEvent($(this).get(0),"STEP_CHANGE",{val:val});
			});
			//是否提示用户，输入错误
			_this.input.keyup(function(e){
				if(/^[\-\.]?(\d+)?\.?(\d+)?$/.test($(this).val())){//数字
					if(_this.input.val()>_this.config.max){
						_this.input.val(_this.config.max);
					}else if(_this.input.val()<_this.config.min){
						_this.input.val(_this.config.min);
					}
					_this.elem.removeClass("warning");
				}else{//非数字
					_this.elem.addClass("warning");
				}
			});
		}
    };
	
	/**
	** 构建DOM
	**/
	Sinput.prototype.concrate = function(data){
		var _this = this;
		_this.elem.attr("tabindex","-1");//设置这个输入框可以选中，有焦点
		
		_this.input = $("<input type="+_this.config.inputType+" />");
		_this.elem.append(_this.input);
	};

    Sinput.prototype.initConfig = function(){
        var _this = this;
		var cfg = _this.config;
		if(cfg.placeholder) _this.input.attr("placeholder",cfg.placeholder);
		
		if(cfg.default) _this.input.val(cfg.default);
		if(cfg.name) _this.input.attr("name",cfg.name);
		//前缀或者后缀
		if(cfg.xion&&cfg.type!=2){
			var ru = this.elem.height();
			var xion = $(cfg.xion).addClass('xion-cus')
				.css({width:ru+"px",height:ru+"px",lineHeight:(ru+4)+"px"});
			if(cfg.pos=="left"){
				_this.elem.prepend(xion);
				_this.input.css({"left":ru+"px","paddingLeft":"0"});
			}else{
				_this.elem.append(xion);
				_this.input.css({paddingRight:"0"});
			}
			_this.input.css({"width":(this._width - ru)+"px"});
		}
		//stepper
		if(cfg.type==2){
			var defa = cfg.default||cfg.min||0;
			_this.stepwrapper = $("<span class='step-wrapper'></span>");
			_this.stepup = $("<i class='glyphicon glyphicon-triangle-top'></i>");
			_this.stepdown = $("<i class='glyphicon glyphicon-triangle-bottom'></i>");
			_this.stepwrapper.append(_this.stepup).append(_this.stepdown);
			_this.input.css("width",(_this._width-20)+"px");
			_this.elem.append(_this.stepwrapper);
			_this.input.val(defa);
		}
		
		if(cfg.title){
			_this.title = $("<em class='sinput-title'/>").text(cfg.title);
			_this.elem.append(_this.title);
		}
		
		if(cfg.disabled){
			_this.input.attr("disabled",true);
			_this.elem.attr("disabled",true);
		}
	}
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.sinput = function (options) {
		var the = this.first();
        var sinput = new Sinput(the, options);
        the = $.extend(true,{},the,new exchange(sinput));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(sinput){
		/***
		** 给 输入框设置默认值
		***/
		this.val = function(o){
			var txt = (typeof(o)=="string"||typeof(o)=="number")?o:(o.label||o.text||o.name||o.value);
			sinput.elem.find("input").val(txt);
			return sinput.elem;
		}
		/***
		** 校验告警提示
		***/
		this.warning = function(bool){
			sinput.elem.toggleClass("warning",bool?true:bool);
			return sinput.elem;
		}
		
		/***
		** 校验失败提示
		***/
		this.fail = function(bool){
			sinput.elem.toggleClass("fail",bool?true:bool);
			return sinput.elem;
		}		
    }
	
	  var old = $.fn.sinput;
	  $.fn.sinput.Constructor = Sinput;
	  // sinput NO CONFLICT
	  // ===============
	  $.fn.sinput.noConflict = function () {
		$.fn.sinput = old;
		return this;
	  }	
	/***
	** outside accessible default setting
	**/
	$.fn.sinput.defaults = {
		type:1,//类型 1,普通输入框，2 stepper
		name:"uname",//为了便于serialize  设置name
		title:"",//出现title 
		xion:"",//接受3种类型，bootstrap 里面的icon 接受小图片jpg, png，或者文字
		pos:"right",//默认图标放在最左边 left, right 两个选项
		placeholder:"请输入文字",// 占位提示文字
		inputType:"text",//password,"float"  文本，浮点数字，密码
		min:0,
		max:Infinity,
		step:1,
		default:null,
		disabled:false// 是否禁用
	};
}(jQuery));

/***
** sutable  plugin
**@author ericever
***/
;(function ($) { 
    var self = this;
	var Help = {
		recursive:function(fa,arr,cfg,deep){
		var deep = arguments[3]||0;
		var gap = arguments[4]||5;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul role='table' />");
		if(deep>1){
			ul.addClass("sub-layer");
		}else{
			ul.addClass("sutable-body");
			var root = fa;
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var cols = o.text||o.label||o.title||o.name;
			var spin = '<div class="spinner spinner2" ><div class="bounce1"></div><div class="bounce2"></div>\					  <div class="bounce3"></div></div>';
			var li = $("<li class='sutable-item'  deep="+deep+"  serial="+o.id+" />");
			var wrapper = $('<div class="sutable-row-wrapper">');
			var row = $('<div class="sutable-row" deep='+deep+' serial='+o.id+' ></div>');
			var optors = $('<i class="font-icon font-icon-edit" serial='+o.id+'></i><i class="font-icon font-icon-copy" serial='+o.id+'></i>');
			wrapper.append(row);
			//列 赋值
			var temparr = cols.concat({});
			temparr.forEach(function(col,idx){
				var switcher = $('<span class="switcher">\
				<label class = "active" ><input type = "checkbox" class = "scheckbox"></label></span>');
				var column = $('<span class="sutable-col" col='+idx+' />');
				if(cfg.colDims&&cfg.colDims.length){
					column.css("width",cfg.colDims[idx]+"px");
				}
				if(idx==0) {//广告活动
					column.addClass("sutable-col-name");
				}else if(idx==1){//状态
					column.addClass("sutable-col-status");
				}else if(idx == (temparr.length-2)){//开启/暂停
					column.addClass("sutable-col-oc");
					switcher.find("label").toggleClass("active",col.status?true:false);
					column.html(switcher);
				}else if(idx == (temparr.length-1)){//操作
					column.addClass("sutable-col-operation");
					column.html(optors);
				}
				if(idx<=(temparr.length-3)){
					var val = col.label||col.text||col.name;	
					column.html(val); if(idx!=1 && idx!=temparr.length-2) column.attr("title",val);
					if(idx==0){
						column.html("<span>"+val+"</span>");
					}else if(idx==1 && col.value==2){// 处理 状态， 审核未通过
						column.html("<span class='att-wrapper'><i class='font-icon font-icon-attention'></i>"+val+"</span>").addClass("attention");
						column.find(".att-wrapper").attr({"data-toggle":"tooltip","data-title":col.reason});
					}else if(idx == (temparr.length-2)){
						switcher.find("label").toggleClass("active",col.status?true:false);
					}
				}
				row.append(column);
			});
			if(o.hasChild && deep<3){
				var html = $('<span class="btn-plus-minus" deep='+deep+' serial='+o.id+'  />');
				if(cfg.caret){
					html.html(cfg.caret).addClass("custom-caret");
				}else{
					html.html('<i class="line-hor"></i><i class="line-ver"></i>');
				}
				li.append(html).append(wrapper.addClass("asparent"));
				//rec(li,array,cfg,deep);
			}else{
				li.append(wrapper);//row
			}
			li.append(spin);
			ul.append(li);
		}
		if(deep>1){
			ul.append("<li class='sutable-item sutable-item-spec' deep="+deep+">+"+((deep=='2')?'新增广告组':'新增广告')+"</li>");
		}	
		fa.append(ul);			
		},
		fixPageXY: function(the){
			var html = document.documentElement;
			var body = document.body;
			var the = (the.get(0)||the).getBoundingClientRect();
			var a = {};
			a.pageX = parseFloat(the.left) + (html.scrollLeft || body && body.scrollLeft || 0);
			a.pageX -= html.clientLeft || 0;

			a.pageY = parseFloat(the.top) + (html.scrollTop || body && body.scrollTop || 0);
			a.pageY -= html.clientTop || 0;
			return a;
		}

	};
	
    
    function Sutable(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.sutable.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();
    };
	/***
	**	横向滚动条
	***/
	Sutable.prototype.scrollV = function(){
		var _this = this;
		
	};
	
	/****
	** body  row,col,caret 的监听
	***/
	Sutable.prototype.listenBody = function(){
		var _this = this;
		var o = this.elem.get(0).getBoundingClientRect();
		/***
		**事件  收起/展开按钮  树桩菜单的 展开/收起
		**/
		_this.elem.find("span.btn-plus-minus").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			var deep = parseInt($(this).attr("deep"));
			var serial = $(this).attr("serial");
			var li = $(this).parent();
			var spinner = li.find("div.spinner2");
			li.toggleClass("open");
			li.children("ul>li.sutable-item").toggleClass("open");
			if(li.hasClass("open")){
				fireEvent($(this).get(0),"OPERATE_ACTION",{action:"nextlayer",deep:deep,id:serial,fa:li});//1 开，0关
				spinner.addClass("active");
				$.ajax(_this.config.ajaxOptions).then(function(result){
					if(typeof(result)=="string") result = JSON.parse(result);
					result = _this.config.dataProxy? _this.config.dataProxy(result) : result;
					li.children("ul.sub-layer").remove();
					if(result.code==0){
						Help.recursive(li,result.data,_this.config,deep); 
						_this.listenBody();
					}else{
						li.toggleClass("open");
					}
					spinner.removeClass("active");
                    _this.allocate();// 重新设置宽度
				},function(err){
					li.toggleClass("open");
					spinner.removeClass("active");
				});					
			}else{
				spinner.removeClass("active");
			}
		});
		/***
		** 点击 开启/暂停 按钮
		***/
		_this.elem.find(".sutable-col-oc>.switcher").click(function(e){
            e.stopImmediatePropagation();
			//var val = $(this).find("input[type=checkbox]:checked").length?1:0;
            var val = $(this).children("label").hasClass("active")?0:1;// 现在的状态，当前点击之后的状态
			var ser = $(this).parents(".sutable-row[serial]:first").attr("serial");
			fireEvent($(this).get(0),"OPERATE_ACTION",{action:"switch",value:val,id:ser,hwd:$(this)});//1 开，0关
		});
		/***
		**状态的打开/关闭
		***/
		_this.elem.find(".sutable-col-oc>.switcher>label>input").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			var the = $(this).parent();
			the.toggleClass("active");
        // 去掉连带关系
//			if(!the.hasClass("active")){
//				var fa = $(this).parents(".sutable-item:first");
//				fa.find("ul .switcher>label").removeClass("active");
//			}
			fireEvent(_this.elem.get(0),"STATUS_CHANGE",{status:the.hasClass("active")});
		});
		
		//点击编辑按钮
		_this.elem.find("i.font-icon-edit").unbind("click").click(function(e){
			fireEvent($(this).get(0),"OPERATE_ACTION",{action:"edit",id:$(this).attr("serial")});
		});
		
		//点击编辑拷贝
		_this.elem.find("i.font-icon-copy").unbind("click").click(function(e){
			fireEvent($(this).get(0),"OPERATE_ACTION",{action:"copy",id:$(this).attr("serial")});
		});
		
		//点击 第一列的 广告活动名称
		_this.elem.find(".sutable-body .sutable-row .sutable-col-name>span").unbind("click").click(function(e){
			fireEvent($(this).get(0),"OPERATE_ACTION",{action:"name",id:$(this).attr("serial")});
		});
		
		_this.elem.find(".sutable-item-spec").unbind("click").click(function(e){
			var deep = $(this).attr("deep");
			var preid = $(this).prev().attr("serial");
			var type = (deep=='2')?0:(deep='3')?1:2;
			fireEvent($(this).get(0),"OPERATE_ACTION",{action:"addnew",preid:preid,type:type});
		});
		
		//显示隐藏 tooltip
		_this.elem.find('[data-toggle=tooltip]').unbind("mouseenter").mouseenter(function(e){
//           e.stopImmediatePropagation(); 
			var tooltip = _this.elem.find(".tooltip-cus");
			tooltip.find(".tooltip-inner").html($(e.target).data('title'));
			
			var o1 = Help.fixPageXY($(this));
			var o2 = Help.fixPageXY(_this.elem);
			tooltip.css({"top":(o1.pageY - o2.pageY + 10)+"px","left":(o1.pageX - o2.pageX - 10)+"px"});
			tooltip.addClass("in");
			tooltip.unbind("webkitTransitionEnd oTransitionEnd otransitionend transitionend").on("webkitTransitionEnd oTransitionEnd otransitionend transitionend",function(){
				var to = $(this).get(0).getBoundingClientRect();
//				console.log(to.right + " : " + o.right);
				if(to.right>=o.right){
					$(this).css({"right":0,"left":"inherit"});
					$(this).find(".tooltip-arrow").css("left","90%");
				}else{
					$(this).css({"right":"inherit"});
					$(this).find(".tooltip-arrow").removeAttr("style");				
				}
			})
		});
		
		_this.elem.find('[data-toggle=tooltip]').unbind("mouseleave").mouseleave(function(e){
//            e.stopImmediatePropagation();
			_this.elem.find(".tooltip-cus").removeClass("in");
		});		
	
	};
	
	/**
	**列表组件的初始化
	**/
    Sutable.prototype.init = function () {
        var _this = this;
        this.concrate();//构建下来菜单的样子
		this.initConfig();
				
		_this.elem.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响
//		_this.scroll.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响
		
		/***
		** 表头 某一列的排序按钮被点击
		***/
		_this.head.find(".sort-wrapper").click(function(e){
			e.stopImmediatePropagation();
			var fa = $(this).parent();
            if($(this).hasClass("sorted")){
                $(this).children().toggleClass("hi");
            }else{
                $(this).addClass("sorted").children("i.glyphicon-triangle-bottom").addClass("hi");
                var siblings = fa.siblings().removeClass("sorted");
                siblings.find(".sort-wrapper").children("i").removeClass("hi");
//                siblings.find(".sort-wrapper").children("i.glyphicon-triangle-bottom").addClass("hi");                
            }
            var order= $(this).children("i.glyphicon-triangle-bottom").hasClass("hi")?1:0;//1 正序，0 反序
			fireEvent(_this.elem.get(0),"SORT_CLICK",{col:parseInt(fa.attr("col")),val:fa.text(),order:order});
		});	
		/***
		**鼠标按下 列缩放
		***/
		_this.elem.find("span.inspliter").mousedown(function(e){
			var column = $(this).parent();
			var c = column.attr("col");
			var theCol = $(".sutable-col[col="+c+"]");
			var minw = window.getComputedStyle(theCol.get(0)).minWidth;
			var the = $(this).get(0).getBoundingClientRect();
			var el = _this.elem.get(0).getBoundingClientRect();
			var start = (the.left-el.left + the.width);
			_this.elem.find(".split-line").css("left",start+"px").addClass("active");
			_this.elem.addClass("resize-cursor");
			_this.elem.off("mousemove").mousemove(function(e){
				e.stopImmediatePropagation();
				var end = e.clientX - el.left + 1;
				var w = e.clientX - column.get(0).getBoundingClientRect().left;
				$(this).find(".split-line").css("left",end+"px");
				if(start<end){//拉大
						theCol.css("width",(w) + "px");				
				}else{//缩小
					var d = (parseInt(c)+1);
					var next = $(".sutable-col[col="+d+"]");
					theCol.css("width",w + "px");
				}
				_this.config.colDims[c] = w;
			});
		});
		/***
		**离开这个区域了
		**/
		_this.elem.mouseleave(function(e){
			e.stopImmediatePropagation();
			$(this).unbind("mousemove");
			_this.elem.trigger("RESIZE_DONE");//鼠标拖动resize 列宽完成
		});
		/**
		**鼠标释放
		**/
		_this.elem.mouseup(function(e){
			e.stopImmediatePropagation();
			_this.elem.removeClass("resize-cursor");
			_this.elem.find(".split-line").removeClass("active");
			_this.elem.unbind("mousemove");
			//_this.scrollV();// 是否显示横向滚动条
			_this.elem.trigger("RESIZE_DONE");//鼠标拖动resize 列宽完成
		});
			
		//body 里面的监听
		_this.listenBody();
		
		
		$(window).resize(function(e){
			_this.config.wi = _this.elem.width();
			_this.allocate(_this.config.wi);
		}); 
    };

	/**
	** 构建下拉菜单样子
	**/
	Sutable.prototype.concrate = function(){
		var _this = this;
		this.head = $("<ul class='sutable-header' role='table' />").html('<li class=" sutable-row"></li>');
		this.elem.append("<span class='split-line'></span>");
		this.elem.append(this.head);
	};

    Sutable.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		//构建列表头部
		if(cfg.head){
            //默认不加 hi， 默认没有排序
			var st = "<span class='sort-wrapper'><i class='glyphicon glyphicon-triangle-top'></i><i class='glyphicon glyphicon-triangle-bottom'></i></span>";				
			cfg.head.forEach(function(item,index){
				var col = $("<span class='sutable-col' col="+index+" />");
				if(index==0) {
					col.addClass("sutable-col-name");
				}else if(index==1){
					col.addClass("sutable-col-status");
				}else if(index == (cfg.head.length-2)){
					col.addClass("sutable-col-oc");
				}else if(index == (cfg.head.length-1)){
					col.addClass("sutable-col-operation");
				}
				if(typeof(item)=="object"){
					col.text(item.label||item.text||item.name);
				}else{
					col.text(item);
				}
				
				if(cfg.sort.indexOf(index)!=-1){
					col.append(st);
				}
				
				if(index!=0 && index!=12){
					col.append("<i class='font-icon font-icon-help' data-toggle='tooltip' data-title="+item.desc+"></i>");
				} 				
 				//分割线
				//col.append("<span class='inspliter'></span>");
				_this.head.find(".sutable-row").append(col);
			});
		}
		
		
		//构建列表内容
		if(cfg.body){
			Help.recursive(_this.elem,cfg.body,cfg);
		}
        this.allocate();//分配宽度   
		//构建列表尾部
		if(cfg.tail){
			_this.tail(cfg.tail);
		}	
		
	                
        
		_this.elem.append('<div class="tooltip tooltip-cus bottom fade" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner"> Tooltip on the bottom </div> </div>');
		//_this.head.find(".sutable-col:gt(0):not(:eq(11))").append("<i class='font-icon font-icon-help'></i>");
		
		//this.scrollV();//是否显示滚动条
//        setTimeout(function(){
//             _this.allocate();//分配宽度  重新allocate列表
//        });
    }
	
	
	//构建列表尾部数据，最下面一行 总计
	Sutable.prototype.tail = function(dat){
		var _this = this;
		_this.foot = $("<ul class='sutable-footer'><li class='sutable-item sutable-row'></li></ul>");
		_this.foot.find(".sutable-item").append("<span class='sutable-col sutable-col-sum'>总计</span>");	
		this.foot.find(".sutable-item>.sutable-col:gt(0)").empty();
		var arr = this.config.colDims.slice(2);
		dat.forEach(function(item,index){
			var col = $("<span class='sutable-col' />").text(item.text||item.label||item.value||item);
			if(arr[index]) col.css("width",arr[index]+"px");
			_this.foot.find(".sutable-item").append(col);
		});
		_this.elem.append(_this.foot);
	}
	
	
	/***
	** 宽度发生变化
	***/
	Sutable.prototype.allocate = function(w){
        var _this = this;
		var w = w||this.elem.width();
		var dom = this.elem
		var cfg = this.config;
		var rw  = w - 226 - 96 - 40 - 72 - 62;//150 第一列的宽度， 第二列宽度100px ,40 : margin-left
		var ew = rw/(cfg.head.length - 4);
		cfg.colDims = [226,96];//列宽度 存储 
		dom.find(".sutable-col:gt(1):lt("+(cfg.head.length-3)+")").css("width",ew+"px").each(function(){
			cfg.colDims.push(ew);
		});
		cfg.colDims.push(72,62);
		
        if(this.elem.find(".sutable-body .sutable-col").length){
            cfg.colDims.forEach(function(val,index){
                _this.elem.find(".sutable-body .sutable-col[col='"+index+"']").css("width",val+"px");
            });
        }
        
        
//		this.foot.css("width",w+"px");//最下面的 
//		this.scroll.css("width",w+"px");//横向滚动条
	};
	
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0  
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.sutable = function (options) {
		var the = this.first();
        var sutable = new Sutable(the, options);
        the = $.extend(true,{},the,new exchange(sutable));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(sutable){				
		/***
		** 外部调用这里 resize 宽度
		***/
		this.resize = function(w){
			sutable.allocate(w);
		};
		/***
		**更新 总计
		***/
		this.sum  = function(data){
			sutable.elem.find(".sutable-footer").remove();
			sutable.tail(data);
			return sutable.elem;
		}		
		/***
		** 更新列表  
		***/
		this.update = function(data,tail){
			var _this = this;
			sutable.elem.find(".sutable-body").remove();
			Help.recursive(sutable.elem,data,sutable.config);
			if(tail){
				_this.sum(tail);
			}else{//如果tail 数据不存在 2016-6-30
                sutable.elem.find(".sutable-footer").remove();
            }
			sutable.listenBody();
			return sutable.elem;
		};
        
        /****
        ** @param {hwd} switcher 句柄
        ** @param {val} 0 关闭，1 打开
        **
        ***/
        this.switchBack = function(hwd){
            hwd.children("label").toggleClass("active");
        };
        
        /***
        **@param {Object} o  ajax 配置的json 对象
        ***/
        this.updateAjaxOption = function(o){
            sutable.config.ajaxOptions = $.extend(true,{},sutable.config.ajaxOptions,o);
        }
    }
	
	
	  var old = $.fn.sutable;
	  $.fn.sutable.Constructor = Sutable;
	  // table NO CONFLICT
	  // ===============
	  $.fn.sutable.noConflict = function () {
		$.fn.sutable = old;
		return this;
	  }		
	/***
	** outside accessible default setting
	**/
	$.fn.sutable.defaults = {
		head:null,//列表头数据
		body:null,//列表内容数据
		tail:null,//列表尾部数据
		caret:null,//展开，折叠的 图标是 默认是  +  - 号
		sort:null,
		ajaxOptions: {
            type: "GET",
            url: "../data/sutable.json",
			xhrFields: { withCredentials: true}
        },
        dataProxy: null,
		namecall:function(){},//点击 广告活动名称的回调 传入参数 数据id
		editcall:function(){},//点击编辑图标 回调函数  传入参数 数据id
		copycall:function(){}//点击拷贝图标 回调函数   传入参数 数据id
	};
}(jQuery));

;
(function($) {
    var self = this;

    function Table(element, options) {
        var self = this;
        this.elem = element;
        this.config = $.extend(true, {}, $.fn.table.defaults, element.data(), options);
        this.init();
    };

    /**
     **列表组件的初始化
     **/
    Table.prototype.init = function() {
        var _this = this;
        this.elem.addClass(this.config.containerClass); //设置 包裹容器的 dim,外观
        this.build(); //构建 列表头
        this.elem.addClass("ndp-table2-wrapper");
        this.initConfig();
        //注册监听事件
        _this.elem.on("dragstart", function() {
            return false;
        }); //消除 默认h5 拖拽产生的影响
        this.setListener();
    };


    Table.prototype.setListener = function() {
        var _this = this;
        if (!_this.elem.get(0)) return;
        _this.head.find("thead>tr>th").on("dragstart", function() {
            return false;
        }); //消除 默认h5 拖拽产生的影响

        var o = _this.elem.get(0).getBoundingClientRect();
        //点击选中一行
        _this.elem.find(".table-body tbody>tr").unbind("click").click(function(evt) {
            evt.stopImmediatePropagation();
            if (_this.config.rowNail) {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
            }
            var dat = $(this).data();
            fireEvent($(this).get(0), "ROW_CLICK", dat); //第几行被点击
        });

        //注册监听列被点击事件

        //点击 选中一列
        _this.elem.find(".table-head thead>tr>th").unbind("click").click(function(e) {
            e.stopImmediatePropagation();
            if (_this.config.colNail) {
                var idx = $(this).data("index");
                $(this).addClass("active").siblings().removeClass("active");
                var col = _this.body.find("tbody td[data-col='" + idx + "']");
                col.siblings().removeClass("active");
                col.addClass("active");
            }
            var dat = $(this).data();
            dat.col = dat.index;
            dat.name = dat.text;
            fireEvent($(this).get(0), "COL_CLICK", dat);
        });

        //点击 排序
        _this.head.find(".sort-field").unbind("click").click(function(evt) {
            evt.stopImmediatePropagation();
            $(this).find("i").toggleClass("active");
            $(this).parent().siblings().find("i.glyphicon-triangle-top").removeClass("active").siblings().addClass("active");
            var dat = $(this).parent().data();
            dat.col = dat.index;
            dat.name = dat.text;
            dat.order = $(this).find("i.glyphicon-triangle-top").hasClass("active") ? 0 : 1;
            fireEvent($(this).get(0), "SORT_CHANGE", dat);
        });

        //down  分割线
        _this.head.find(".split-field").unbind("mousedown").mousedown(function(e) {
            var the = $(this).get(0).getBoundingClientRect();
            var th = $(this).parent();
            var sl = _this.elem.find(".split-line");
            var index = th.data("index");
            var tho = th.get(0).getBoundingClientRect();
            sl.css("left", (parseFloat(the.right) - o.left - 5.5) + "px").removeClass("hidden");
            $(document).unbind("mousemove").mousemove(function(e) {
                var w = Math.abs(parseFloat(e.clientX) - tho.left);
                sl.css("left", (parseFloat(e.clientX) - o.left - 5) + "px");
                _this.elem.find("tr>th[data-index=" + index + "],tr>td[data-col=" + index + "]").css("width", w + "px");
            });

        });


        $(document).mouseup(function() {
            _this.elem.find(".split-line").addClass("hidden");
            $(document).unbind("mousemove");
        });
    };

    /***
     ** 构建列表头部
     **/
    Table.prototype.build = function() {
        var _this = this;
        var html = "";
        //如果是 对象不是数组
        if ({}.toString.call(this.config.head) == "[object Object]") {
            var arr = [];
            Object.keys(this.config.head).forEach(function(key) {
                arr.push(_this.config.head[key]);
            });
            this.config.head = arr;
        }
        this.config.head.forEach(function(item, index) {
            if (typeof(item) == "string") {
                var txt = item;
            } else {
                txt = item.text || item.label || item.name;
            }
            var val = item.value || item.val || txt;
            html += "<th data-index=" + index + " data-text=" + txt + " data-val=" + val + ">" + txt + "</th>";
        });
        this.body = $("<div class='body-wrapper'><table class='table table-body'><thead><tr></tr></thead><tbody></tbody></table></div>");
        this.body.find("thead>tr").append(html);
        this.buildBody(this.config.data);

        var head = this.body.clone();
        head.find("table").removeClass("table-body").addClass("table-head");
        //head.find("tbody>tr:first").siblings().remove();
        head.find("thead>tr>th").append("<span class='split-field'></span>");
        this.head = head.removeClass("body-wrapper").addClass("header-wrapper");
        this.elem.append(this.head).append(this.body).append("<div class='split-line hidden'></div>");
    };

    /**
     ** 构建列表体
     **/
    Table.prototype.buildBody = function(data) {
        var _this = this;
        data.forEach(function(rdata, index) {
            var rid = rdata.id || index
            var tr = $("<tr data-row=" + index + " data-id=" + rid + " />");
            var html = '';
            var keys = Object.keys(rdata);
            keys.forEach(function(key, idx) {
                if (_this.config.head.length > keys.length && idx == keys.length - 1) {
                    var val = rdata[key] || "";
                    html += "<td data-val=" + val + " data-col=" + idx + " title=" + val + " >" + val + "</td>"
                    for (var j = idx + 1; j < _this.config.head.length; j++) {
                        html += "<td data-val='' data-col=" + j + " title='' > </td>";
                    }
                } else if (idx < _this.config.head.length) {
                    var item = rdata[key] || "";
                    var txt = "";
                    var val = "";
                    var title = "";
                    if (typeof(item) == "object") {
                        txt = item.label || item.text || item.name|| item.txt;
                        title = item.title;
                        val = item.val;
                    } else {
                        txt = item;
                        val = item;
                        title = item;
                    }

                    html += "<td data-val=" + val + " data-col=" + idx + " title=" + title + " >" + txt + "</td>";
                }
            });
            tr.html(html);
            _this.body.find("tbody").append(tr);
        });

    };

    /***
     ** 根据用户设置的 设置列表拥有的能力，比如 点击行，点击列，拖动等
     **/
    Table.prototype.initConfig = function() {
        var _this = this;
        var cfg = this.config;
        //行选中
        if (cfg.rowNail) {
            this.elem.find(".table-body tbody>tr[data-row='" + cfg.activeRow + "']").addClass("active");
        }

        //列 选中
        if (cfg.colNail) {
            this.elem.find(".table-body tbody>tr>td[data-col='" + cfg.activeCol + "']").addClass("active");
            this.elem.find(".table-head thead>tr>th[data-index='" + cfg.activeCol + "']").addClass("active");
        }

        //排序 sort
        if (cfg.sort) {
            cfg.sort.forEach(function(num) {
                _this.elem.find("thead>tr>th[data-index=" + num + "]").append("<span class='sort-field'><i class='glyphicon glyphicon-triangle-top'></i><i class='glyphicon glyphicon-triangle-bottom active'></i></span>");
            });
        }
    }


    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.table = function(options) {
        var the = this.first();
        var table = new Table(the, options);
        the = $.extend(true, {}, the, new exchange(table));
        return the;
    };

    /***
     **和其他插件的交互
     ** factory Class
     **@param {Drop} drop :  instacne of the plugin builder
     **/
    function exchange(table) {
        /**
         **@param {Object} msg {type:"类型"}
         **/
        this.update = function(data, head) {
            table.elem.empty();
            if (head) table.config.head = head;
            table.config.data = data;
            table.build();
            table.initConfig();
            table.setListener();
        }
    }


    var old = $.fn.table;
    $.fn.table.Constructor = Table;
    // table NO CONFLICT
    // ===============
    $.fn.table.noConflict = function() {
        $.fn.table = old;
        return this;
    }

    /***
     ** outside accessible default setting
     **/
    $.fn.table.defaults = {
        head: ["col1", "col2", "col3", "col4"], //列表头部列表,可以是 数组，也可以是 对象{name:"col1",name:"col2"}
        data: [], //列表项数据
        fixedhead: false,
        rowNail: false, //是否允许 选中一行
        colNail: false, //是否允许 选中一列
        activeRow: NaN, //默认选中第几行
        activeCol: NaN, //默认选中第几列
        rowHeight: null, //列表每一行的高度  默认行高40px
        listHeight: null, //设置列表高度，或者修改 ndp-table-wrapper class的高度
        sort: null //“all” 所有列 都可以进行排序，【1，3，5】只有1，3，5列进行排序
    };
}(jQuery));

;(function($) {
    var self = this;
    function Table2(element, options) {
        var self = this;
        this.elem = element;
        this.config = $.extend(true, {}, $.fn.table2.defaults, element.data(), options);
        this.init();
    };

    /**
     **列表组件的初始化
     **/
    Table2.prototype.init = function() {
        var _this = this;
        this.elem.addClass(this.config.containerClass); //设置 包裹容器的 dim,外观
        this.build(); //构建
        this.initConfig();
        //注册监听事件
        _this.elem.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响
        this.setListener();
    };
    
    
    Table2.prototype.setListener = function(){
        var _this = this;
        _this.head.find("thead>tr>th").on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响
        
        var o = _this.elem.get(0).getBoundingClientRect();
        //点击选中一行 
        _this.elem.find(".table-body tbody>tr").unbind("click").click(function(){
            if(_this.config.rowNail){
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
            }
            var dat = $(this).data();
            fireEvent($(this).get(0), "ROW_CLICK", dat); //第几行被点击
        });
        
        //注册监听列被点击事件
        
        //点击 选中一列
        _this.elem.find(".table-head thead>tr>th").unbind("click").click(function(e){
            e.stopImmediatePropagation();
            if(_this.config.colNail){
                var idx = $(this).data("index"); 
                $(this).addClass("active").siblings().removeClass("active");
                var col = _this.body.find("tbody td[data-col='"+idx+"']");
                col.siblings().removeClass("active");
                col.addClass("active");       
            }
            var dat = $(this).data();
            dat.col = dat.index;
            dat.name = dat.text;
            fireEvent($(this).get(0), "COL_CLICK", dat);
        });
         
        //点击 排序
        _this.head.find(".sort-field").unbind("click").click(function(evt){
            evt.stopImmediatePropagation();
            $(this).find("i").toggleClass("active");
            $(this).parent().siblings().find("i.glyphicon-triangle-top").removeClass("active").siblings().addClass("active");
            var dat = $(this).parent().data();
            dat.col = dat.index;
            dat.name = dat.text;
            dat.order = $(this).find("i.glyphicon-triangle-top").hasClass("active")?0:1;
            fireEvent($(this).get(0), "SORT_CHANGE",dat);
        });
        
        //down  分割线
        _this.head.find(".split-field").unbind("mousedown").mousedown(function(e){
            var the = $(this).get(0).getBoundingClientRect();
            var th = $(this).parent();
            var sl =  _this.elem.find(".split-line");
            var index = th.data("index");
            var tho = th.get(0).getBoundingClientRect();
            sl.css("left",(parseFloat(the.right)-o.left-5.5)+"px").removeClass("hidden");
            $(document).unbind("mousemove").mousemove(function(e){
                var w = Math.abs(parseFloat(e.clientX) - tho.left);
                sl.css("left",(parseFloat(e.clientX)-o.left-5)+"px");
                _this.elem.find("tr>th[data-index="+index+"],tr>td[data-col="+index+"]").css("width",w+"px");
            });
            
        });
        
        
        $(document).mouseup(function(){
            _this.elem.find(".split-line").addClass("hidden");
            $(document).unbind("mousemove");
        });
    };

    /***
     ** 构建列表头部
     **/
    Table2.prototype.build = function() {
        var _this = this;
        var html = "";
        _this.config.head.forEach(function(item,index){
            if(typeof(item)=="string") {
                var txt = item; 
            }else{
                txt = item.text||item.label||item.name;
            }
            var val = item.value||item.val||txt;
            html += "<th data-index="+index+" data-text="+txt+" data-val="+val+">"+txt+"</th>";
        });
        _this.body = $("<div class='body-wrapper'><table class='table table-body'><thead><tr></tr></thead><tbody></tbody></table></div>");
        _this.body.find("thead>tr").append(html);  
        _this.buildBody(this.config.data);
        
        var head = this.body.clone();
        head.find("table").removeClass("table-body").addClass("table-head");
        //head.find("tbody>tr:first").siblings().remove();
        head.find("thead>tr>th").append("<span class='split-field'></span>");
        _this.head = head.removeClass("body-wrapper").addClass("header-wrapper");
        _this.elem.append(_this.head).append(_this.body).append("<div class='split-line hidden'></div>");
    };

    /**
     ** 构建列表体
     **/
    Table2.prototype.buildBody = function(data) {
        var _this = this;
        data.forEach(function(rdata,index){
            var rid = rdata.id||index
            var tr = $("<tr data-row="+index+" data-id="+rid+" />");
            var html = '';
            var keys = Object.keys(rdata);
            keys.forEach(function(key,idx){
                if(_this.config.head.length>keys.length && idx == keys.length-1){
                    var val = rdata[key]||"";
                    html += "<td data-val="+val+" data-col="+idx+" title="+val+" >"+val+"</td>"                    
                    for(var j=idx+1;j<_this.config.head.length;j++){
                       html += "<td data-val='' data-col="+j+" title='' > </td>";   
                    }
                }else if(idx<_this.config.head.length){
                    val = rdata[key]||"";
                    html += "<td data-val="+val+" data-col="+idx+" title="+val+" >"+val+"</td>";
                }
            });
            tr.html(html);
            _this.body.find("tbody").append(tr);
        });
    };

    /***
     ** 根据用户设置的 设置列表拥有的能力，比如 点击行，点击列，拖动等
     **/
    Table2.prototype.initConfig = function() {
        var _this = this;
        var cfg = _this.config;
        //行选中
        if(cfg.rowNail){
            _this.elem.find(".table-body tbody>tr[data-row='"+cfg.activeRow+"']").addClass("active");
        }
        
        //列 选中
        if(cfg.colNail){
            _this.elem.find(".table-body tbody>tr>td[data-col='"+cfg.activeCol+"']").addClass("active");
            _this.elem.find(".table-head thead>tr>th[data-index='"+cfg.activeCol+"']").addClass("active");
        }  
        
        //排序 sort
        if(cfg.sort){
            cfg.sort.forEach(function(num){
                _this.elem.find("thead>tr>th[data-index="+num+"]").append("<span class='sort-field'><i class='glyphicon glyphicon-triangle-top'></i><i class='glyphicon glyphicon-triangle-bottom active'></i></span>");
            });
        }
    }


    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.table2 = function(options) {
        var the = this.first();
        var table = new Table2(the, options);
        the = $.extend(true, {}, the, new exchange(table));
        return the;
    };

    /***
     **和其他插件的交互
     ** factory Class
     **@param {Drop} drop :  instacne of the plugin builder
     **/
    function exchange(table) {
        /**
         **@param {Object} msg {type:"类型"}
         **/
        this.update = function(data) {
            table.elem.empty();
            table.config.data = data;
            table.build();
            table.initConfig();
            table.setListener();
        }
    }


    var old = $.fn.table2;
    $.fn.table2.Constructor = Table2;
    // table NO CONFLICT
    // ===============
    $.fn.table2.noConflict = function() {
        $.fn.table2 = old;
        return this;
    }

    /***
     ** outside accessible default setting
     **/
    $.fn.table2.defaults = {
        head: ["col1", "col2", "col3", "col4"], //列表头部列表,可以是 数组，也可以是 对象{name:"col1",name:"col2"}
        data: [], //列表项数据
        fixedhead:false,
        rowNail: false, //是否允许 选中一行
        colNail: false, //是否允许 选中一列
        activeRow: NaN, //默认选中第几行
        activeCol: NaN, //默认选中第几列
        rowHeight: null, //列表每一行的高度  默认行高40px
        listHeight: null, //设置列表高度，或者修改 ndp-table-wrapper class的高度
        sort: null //“all” 所有列 都可以进行排序，【1，3，5】只有1，3，5列进行排序
    };
}(jQuery));

;(function ($) {
	function setAble(_this){
		//主需要  把整个 程序里面的 disabled 替换成 hidden 就可以实现，需要时再显示的效果
		setTimeout(function(){
			var tabR = _this.tabwrapper.children("li:last").get(0).getBoundingClientRect().right;
			var wrapperR = _this.elem.get(0).getBoundingClientRect().right;
			var cla = _this.config.negClass;
			if(wrapperR>tabR){
				$(_this.elem.find("span.more-tabs")).addClass(cla).attr("stop",true);
			}else{
				$(_this.elem.find("span.more-tabs")).removeClass(cla).removeAttr("stop");
			}
		},250);
	}

    /***
	**@constructor {Class} Tabs
	**/
    function Tabs(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.tabs.defaults,element.data(),options);
		this.init();
    };

	/**
	**列表组件的初始化
	**/
    Tabs.prototype.init = function () {
        var _this = this;
		var que = null;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();


		this.tabwrapper.find("li").click(function(e){
			e.stopImmediatePropagation();
			if(!$(this).hasClass("active")){
				$(this).addClass("active").siblings().removeClass("active");
				fireEvent(_this.elem.get(0),"TAB_CHANGE",$(this).data());
			}
		});

		if(_this.config.rm){
			this.tabwrapper.find("li>a>i").click(function(e){
				e.preventDefault();
				var index = parseInt($(this).parent().parent().attr("index"));//删除的数据索引
				var the = _this.tabwrapper.find("li[index="+index+"]");
				var  yon = the.hasClass("active");
				the.remove();
				if(yon){
					_this.tabwrapper.find("li:eq(0)").addClass("active");
				}
				if(_this.tabwrapper.children().length==1) {
					_this.tabwrapper.find("li>a>i").addClass("hidden");
				}
				var aindex = parseInt(_this.tabwrapper.find("li.active").attr("index"));
				fireEvent(_this.elem.get(0),"TAB_REMOVED",{rm:_this.config.list[index],active:_this.config.list[aindex],current:aindex});
			});
			this.tabwrapper.find("li").mouseenter(function(){
				$(this).find("i").removeClass("transparent");
			});
			this.tabwrapper.find("li").mouseleave(function(){
				$(this).find("i").addClass("transparent");
			});
		}

//		if(_this.config.type==2){
			//向左的按钮
			_this.preButton.unbind("click").click(function(e){
				var _self = this;
				clearTimeout(que);
				que = setTimeout(function(){
					var now = parseInt($(_self).attr("now"));
					if(now==0) return false;
					$(_self).attr("now",now);
					var w = _this.tabwrapper.find("li[data-index="+(now-1)+"]").width();
					var currW = parseInt(_this.tabwrapper.css("left"));//ul left
					_this.tabwrapper.css("left",(currW + w)+"px");
					now--;
					$(_self).attr("now",now);
					_this.moreButton.attr("now",now);
					if(now==0){ $(_self).addClass(_this.config.negClass);  }
					setAble(_this);
				},250);
			});


			//右侧的 按钮点击
			_this.moreButton.click(function(e){
				var _self = this;
				clearTimeout(que);
				que = setTimeout(function(){
                    if($(_self).attr("stop")) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        return false;
                    }
                    var now = parseInt($(_self).attr("now"));
                    $(_self).attr("now",now);
                    console.log("now:" + now);
                    var w = _this.tabwrapper.find("li[data-index="+now+"]").width();
                    console.log("w:" + w);
                    var currW = parseInt(_this.tabwrapper.css("left"));
                    _this.tabwrapper.css("left",(currW - w) + "px");
                    now++;
                    $(_self).attr("now",now);
                    _this.preButton.attr("now",now);
                    if(now>0){
                        _this.preButton.removeClass(_this.config.negClass);
                    }
                    setAble(_this);
				},250);
			});
//		}
    };

	/**
	** 构建下来菜单样子
	**/
	Tabs.prototype.concrate = function(data){
		var _this = this;
		this.tabwrapper = $("<ul class='nav nav-tabs nav-tabs-cus' style='left:0;'/>");
		_this.config.list.forEach(function(item,index){
			if(typeof(item)=="object"){
				var str = item.name||item.text||item.label||item.tab;
				var ba = item.badge;
				var id = item.id;
				var type = item.type
			}else{
				str = item;
			}
			var li = $("<li role='presentation' data-name="+str+"  data-index="+index+" title="+str+" ><a href='javascript:void(0);'>"+str+"</a></li>");
			if(id) li.attr("data-id",id);
			if(type) li.attr("data-type",type);
			if(index==_this.config.default) {li.addClass("active")};
			if(_this.config.badge && ba){//是否显示 badge
				li.find("a").append("<span class='badge'>"+ba+"</span>");
			}
			_this.tabwrapper.append(li);
		});
		this.elem.append(_this.tabwrapper);
	};

    Tabs.prototype.initConfig = function(){
        var _this = this;
		if(_this.config.rm){
			_this.tabwrapper.find("li>a").append("<i class='glyphicon glyphicon-remove transparent'></i>");
		}

//		if(_this.config.type==2){
			_this.elem.addClass("specialWrapper");
			_this.tabwrapper.addClass("one-line");
			_this.tabwrapper.find("li").addClass("carousel");
			_this.preButton = $("<span class='more-button pre-tabs disabled' now='0'><i class='glyphicon glyphicon-chevron-left'></i></span>");//向左翻
			_this.moreButton = $("<span class='more-button more-tabs' now='0'><i class='glyphicon glyphicon-chevron-right'></i></span>");//向右翻
			_this.elem.prepend(_this.preButton).append(_this.moreButton);

			//这里最好监听 window的resize 事件
			if(_this.tabwrapper.children("li:last")[0]){
				var tabR = _this.tabwrapper.children("li:last").get(0).getBoundingClientRect().right;
				var wrapperR = _this.elem.get(0).getBoundingClientRect().right;
				if(wrapperR>=tabR){
					_this.moreButton.hide();
					_this.preButton.hide();
				}
			}else{
				_this.moreButton.hide();
				_this.preButton.hide();
			}
//		}
    }
    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};0
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.tabs = function (options) {
		var the = this.first();
        var tabs = new Tabs(the, options);
		the = $.extend(true,{},the,new exchange(tabs));
		return the;
    };

    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(tabs){
		/***
		**选中 第几个tab
		**@params {int} idx  从0开始
		**/
		this.val = function(idx){
			tabs.tabwrapper.find("li[role=presentation][data-index='"+idx+"']").addClass("active")
				.siblings().removeClass("active");
			return tabs.elem;
		}
    }

	  var old = $.fn.tabs;
	  $.fn.tabs.Constructor = Tabs;
	  // Tabs NO CONFLICT
	  // ===============
	  $.fn.tabs.noConflict = function () {
		$.fn.tabs = old;
		return this;
	  }

	/***
	** outside accessible default setting
	**/
	$.fn.tabs.defaults = {
		default:0,//默认选中第几个tab
		list:[],
		badge:false,// 是否显示badge
		rm:false,//是否允许删除tab
		negClass:"disabled"// hidden 会实现 需要时再显示的效果， disabled 则会一直显示
	};
}(jQuery));

;(function ($) {
	//星期 数组  中引文
	var DAYARR = [{cn:"星期天",en:"Sun",value:0},
			   {cn:"星期一",en:"Mon",value:1},
			   {cn:"星期二",en:"Tue",value:2},
			   {cn:"星期三",en:"Wed",value:3},
			   {cn:"星期四",en:"Thu",value:4},
			   {cn:"星期五",en:"Fri",value:5},
			   {cn:"星期六",en:"Sat",value:6}];	
	//时区数组中英文
	var ZONEARR = [{en:'(GMT -12:00) Eniwetok, Kwajalein',
					cn:'(GMT -12:00) Eniwetok, Kwajalein',
					val:-12
				   },
				   {en:'(GMT -11:00) Midway Island, Samoa',
					cn:'(GMT -11:00) Midway Island, Samoa',
					val:-11
				   },
				   {en:'(GMT -10:00) Hawaii',
					cn:'(GMT -10:00) Hawaii',
					val:-10
				   },
				   {en:'(GMT -9:00) Alaska',
					cn:'(GMT -9:00) Alaska',
					val:-9
				   },
				   {en:'(GMT -8:00) Pacific Time (US &amp; Canada)',
					cn:'(GMT -8:00) Pacific Time (US &amp; Canada)',
					val:-8
				   },
				   {en:'(GMT -7:00) Mountain Time (US &amp; Canada)',
					cn:'(GMT -7:00) Mountain Time (US &amp; Canada)',
					val:-7
				   },
				   {en:'(GMT -6:00) Central Time (US &amp; Canada), Mexico City',
					cn:'(GMT -6:00) Central Time (US &amp; Canada), Mexico City',
					val:-6
				   },
				   {en:'(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima',
					cn:'(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima',
					val:-5
				   },
				   {en:'(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz',
					cn:'(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz',
					val:-4
				   },
				   {en:'(GMT -3:30) Newfoundland',
					cn:'(GMT -3:30) Newfoundland',
					val:-3.5
				   },
				   {en:'(GMT -3:00) Brazil, Buenos Aires, Georgetown',
					cn:'(GMT -3:00) Brazil, Buenos Aires, Georgetown',
					val:-3
				   },
				   {en:'(GMT -2:00) Mid-Atlantic',
					cn:'(GMT -2:00) Mid-Atlantic',
					val:-2
				   },
				   {en:'(GMT -1:00 hour) Azores, Cape Verde Islands',
					cn:'(GMT -1:00 hour) Azores, Cape Verde Islands',
					val:-1
				   },
				   {en:'(GMT) Western Europe Time, London, Lisbon, Casablanca',
					cn:'(GMT) Western Europe Time, London, Lisbon, Casablanca',
					val:0
				   },
				   {en:'(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris',
					cn:'(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris',
					val:1
				   },
				   {en:'(GMT +2:00) Kaliningrad, South Africa',
					cn:'(GMT +2:00) Kaliningrad, South Africa',
					val:2
				   },
				   {en:'(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
					cn:'(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
					val:3
				   },
				   {en:'(GMT +3:30) Tehran',
					cn:'(GMT +3:30) Tehran',
					val:3.5
				   },
				   {en:'(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
					cn:'(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
					val:4
				   },
				   {en:'(GMT +4:30) Kabul',
					cn:'(GMT +4:30) Kabul',
					val:4.5
				   },
				   {en:'(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
					cn:'(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
					val:5
				   },
				   {en:'(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
					cn:'(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
					val:5.5
				   },
				   {en:'(GMT +5:45) Kathmandu',
					cn:'(GMT +5:45) Kathmandu',
					val:5.75
				   },
				   {en:'(GMT +6:00) Almaty, Dhaka, Colombo',
					cn:'(GMT +6:00) Almaty, Dhaka, Colombo',
					val:6
				   },
				   {en:'(GMT +7:00) Bangkok, Hanoi, Jakarta',
					cn:'(GMT +7:00) Bangkok, Hanoi, Jakarta',
					val:7
				   },
				   {en:'(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
					cn:'(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
					val:8
				   },
				   {en:'(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
					cn:'(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
					val:9
				   },
				   {en:'(GMT +9:30) Adelaide, Darwin',
					cn:'(GMT +9:30) Adelaide, Darwin',
					val:9.5
				   },
				   {en:'(GMT +10:00) Eastern Australia, Guam, Vladivostok',
					cn:'(GMT +10:00) Eastern Australia, Guam, Vladivostok',
					val:10
				   },
				   {en:'(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
					cn:'(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
					val:11
				   },
				   {en:'Auckland, Wellington, Fiji, Kamchatka',
					cn:'Auckland, Wellington, Fiji, Kamchatka',
					val:12
				   }			   
				  ];
	
	
    /***
	**@constructor {Class} Timerange
	**/
    function Timerange(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.timerange.defaults,element.data(),options);
		this.init();	
    };

	
	/***
	** 获得用户选择的时间
	**/
	Timerange.prototype.selectTime = function(){
		var _this = this;
		var arr = [];
		this.elem.find(".timerange-cell.active").each(function(index,item){
			var c = parseInt($(item).attr("col"));
			var r = parseInt($(item).attr("row"));
			var input = _this.elem.find(".ndp-drop-wrapper input")
			var txt = input.val();
			var val = input.data("val")
			arr.push({timeStart:r,timeEnd:(r+1),day:(c==0)?7:c,zone:{text:txt,value:val}});
		});
		return arr;
	}	
	
	/**
	**列表组件的初始化
	**/
    Timerange.prototype.init = function () {
        var _this = this;
		var que = null;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

		
		var o = this.elem.get(0).getBoundingClientRect();
		var vLine = this.elem.find(".ver-line");
		var hLine = this.elem.find(".hor-line");
		var cell = _this.celllist.find(".timerange-cell");
		var mode = 0;// 1 拖动选择模式
		
		_this.celllist.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响
		
		_this.celllist.mouseenter(function(e){
			e.stopImmediatePropagation();
			_this.body.addClass("hover");
		});
		
		/***
		** 拖动开始
		***/
		_this.celllist.mousedown(function(e){
			e.stopImmediatePropagation();
			mode = 1;
			
			cell.unbind("mouseenter").mouseenter(function(e){
				e.stopImmediatePropagation();
				$(this).addClass("active");
			});
					
		});
		
		
		_this.celllist.on("mouseup",function(e){
			mode = 0;
			cell.unbind("mouseenter");
			_this.selectTime();
		});
		
		_this.celllist.mouseleave(function(e){
			 mode = 0;
			_this.body.removeClass("hover");
			cell.unbind("mouseenter");			
		});		
		
		_this.celllist.find(".timerange-cell").mouseover(function(e){
			var lf = $(this).position().left;
			var tp = $(this).position().top;
			vLine.css("left",(lf+44+70)+"px");
			hLine.css("top",(tp + 44)+"px");
//			var to = $(this).get(0).getBoundingClientRect();
//			vLine.css("left",(parseFloat(to.left)-parseFloat(o.left)+44)+"px");
//			hLine.css("top",(parseFloat(to.top)-parseFloat(o.top)+8 - 50)+"px");
		});
		
		_this.celllist.find(".timerange-cell").click(function(e){
			e.stopImmediatePropagation();
			$(this).toggleClass("active");
		});
		
		
		/****
		**点击重置按钮
		****/
		_this.elem.find(".timerange-reset").click(function(){
			_this.elem.find(".timerange-cell.active").removeClass("active");
		});
		
		$(document).click(function(e){
			if(!$(e.target).parents(".ndp-timerange-wrapper").length || !$(e.target).hasClass('ndp-timerange-wrapper')){
				_this.elem.find(".ndp-drop-wrapper").removeClass("focus");
				_this.elem.find(".ndp-drop-wrapper>.drop-list").addClass("hidden");
			}
		});
    };
	
	/**
	** 构建下来菜单样子
	**/
	Timerange.prototype.concrate = function(data){
		var _this = this;
		var cfg = _this.config;
		_this.head = $("<div class='timerange-head' />");
		_this.zoneList = $("<div class='ndp-drop-wrapper'  />").drop({
			caret:"glyphicon-menu-right",
			data:ZONEARR,
			textKey:cfg.lan
		}).val(ZONEARR[_this.config.timezone]);
		var txt = $("<span class='timerange-desc'  />").html("按住鼠标左键滑动，选取时间目标。");
		var reset = $("<span class='timerange-reset'>重置</span>");
		_this.head.append(_this.zoneList).append(txt).append(reset);
		_this.body = $("<div class='timerange-body' />");
		var xq  = $("<ul class='timerange-xq' >");
		DAYARR.forEach(function(item,index){
			var val = (cfg.lan=="cn")?item.cn:item.en;
			var li = "<li valcn="+item.cn+" valen="+item.en+" val="+item.value+" >"+val+"</li>";
			xq.append(li);
		});
		var field = $("<div class='time-field' />");
		_this.celllist = $("<div class='timerange-cell-list' />");
		var timelist = $("<ul class='time-list' />");
		for(var i=0;i<24;i++){
			timelist.append("<li val="+i+">"+((i.toString().length==1)?("0"+i):i)+":00</li>");
			var row = $("<li class='timerange-row' row="+i+" />");
			for(var j=0;j<7;j++){
				row.append("<span class='timerange-cell' row="+i+" col="+j+" />");
			}
			_this.celllist.append(row);
		}
		field.append(timelist).append(_this.celllist);
		this.body.append(xq).append(field).append("<div class='ver-line'></div>").append("<div class='hor-line'></div>");
		_this.elem.append(_this.head).append(_this.body);
	};

    Timerange.prototype.initConfig = function(){
        var _this = this;

    };

    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     */
    $.fn.timerange = function (options) {
		var the = this.first();
        var timerange = new Timerange(the, options);
		the = $.extend(true,{},the,new exchange(timerange));
		return the;
    };
	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} drop :  instacne of the plugin builder
    **/
    function exchange(timerange){
		/***
		**选中 第几个tab
		**@params {int} idx  从0开始
		**/
		this.getVal = function(){
			return timerange.selectTime();// {timeStart: 开始时间， timeEnd:结束时间，星期几, zone:{text:}}
		}
        
        //填充数据
        /****
        **@params {Array} // [{day:0,timeStart:1,timeEnd:2},{day:1,timeStart:2,timeEnd:3}] 
        ***/
        this.fill = function(arr){
            arr.forEach(function(item){
                var c = (item.day==7)?0:item.day;
                var r = item.timeStart;
                timerange.celllist.find("span[row="+r+"][col="+c+"]").addClass("active");
            });
            return timerange.elem;
        }
    }
	
	  var old = $.fn.timerange;
	  $.fn.timerange.Constructor = Timerange;
	  // ===============
	  $.fn.timerange.noConflict = function () {
		$.fn.timerange = old;
		return this;
	  }
	
	/***
	** outside accessible default setting
	**/
	$.fn.timerange.defaults = {
		lan:"cn",// en:英语， cn 汉语
        timezone:0//默认下拉列表里的第1个
	};
}(jQuery));

;(function ($,win) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
	var defaults = {
		time:30,//默认30秒后消失
		type:"info",//success,warning,danger
		through:true,// true 通栏
		close:false,
		bind:null, //jquery对象 DOM 句柄默认DOM弹出的tip 吸附在body上，如果没设置就是全局的为body，有设置根据设置走
		closeCallback:function(){},//关闭tip回调函数
		clickCallback:function(){},//点击除关闭按钮之外的其他部分，触发回调
		content:"这里填写你想要展示的提示内容！~~"// 可以使文字，也可以是html
	};
	
	$(document).ready(function(){
//		var pa = $(document.body);
//		var elem = null;
		var tim = null;
//		if(pa.find("div[class*='tip']").length==0){
//			var elem = $("<div class='tip'><span class='icon-hold'></span><span class='content-hold'></span><span class='close-hold' aria-hidden='true'></span></div>");
//			pa.prepend(elem);
//		}
		
		win.showTip = function(options){
			var cfg = $.extend(true,{},defaults,options);
			if(tim) clearTimeout(tim);
			
			var pa = (cfg.bind)?cfg.bind:$(document.body);
			var the = pa.find("#"+(cfg.bind?"bind2dom":"bind2body"));
			if(!the.get(0)){
				var elem = $("<div class='tip' ><span class='icon-hold'></span><span class='content-hold'></span><span class='close-hold' aria-hidden='true'></span></div>");			
				pa.prepend(elem);
			}else{
				elem = the.first();
			}	
		
			elem.removeAttr("style").removeAttr("class").addClass("tip");
			if(cfg.bind){
				elem.addClass("tip-bind").attr("id","bind2dom");
			}else{
				elem.attr("id","bind2body");
			}				
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
			elem.addClass("alert alert-"+cfg.type);
			if(cfg.time){
				tim = setTimeout(function(){
					//elem.css("opacity",0).removeClass("alert");
					elem.remove();
					cfg.closeCallback();
				},cfg.time*1000);				
			}
			
			elem.find("span.close-hold").click(function(e){
				e.stopImmediatePropagation();
				//elem.css("opacity",0).removeClass("alert");
				elem.remove();
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

/***
 ** sutable  plugin
 **@author ericever
 ***/
;(function ($) {
	var self = this;
	function newbody(fa,arr,cfg,deep){
		var deep = arguments[3]||0;
		var gap = arguments[4]||5;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul role='table' />");
		if(deep>1){
			ul.addClass("sub-layer");
		}else{
			ul.addClass("treable-body");
			var root = fa;
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group;
			var cols = o[cfg.textKey]||o.text||o.label||o.title||o.name;
			var id = o.id;
			var li = $("<li class='treable-item'  deep="+deep+" />");
			if(id){
				li.attr('data-id',id);
			}
			var wrapper = $('<div class="treable-row-wrapper">');
			var row = $('<div class="treable-row" deep='+deep+'></div>');
			if(deep==1){//对第一级加租
				row.addClass('treable-row-wrapper-parent');
			}
			//添加 弹出下拉菜单，点击money 符号的时候
			var html = $('<ul class="dropdown-menu dropdown-menu-money hidden" />');
			cfg.todata.forEach(function(item,index){
				var txt = item.name||item.label||item.text||item;
				var val = item.val||item.value||txt;
				var id = item.id;
				var li = '<li data-id='+id+' data-name='+txt+' data-val='+val+' ><a href="javascript:void(0)">'+txt+'</a></li>';
				html.append(li);
			});
			row.append(html);
			var chartWrapper = $("<div class='chart-wrapper' data-id="+id+" />");//图表层
			var chartClose = '<button type="button" class="close chart-close"><span aria-hidden="true">&times;</span></button>';//图标层关闭按钮
			var chart = $('<div class="ndp-tab-wrapper" deep='+deep+' index='+i+' role="table" />');
			chart.tabs({list:cfg.tabs});//图表层上面的 tabs 初始化
			var panels = $("<div class='tab-content tab-content-cus' />");
			cfg.tabs.forEach(function(item,index){
				var panel = $('<div role="tabpanel" class="tab-pane "  data-name='+item.name+' data-type='+item.type+' />');
				if(index==0) panel.addClass("active");
				panels.append(panel);
			});
			chartWrapper.append(chart).append(panels).append(chartClose);//显示到层上
			wrapper.append(row).append(chartWrapper);
			cols.forEach(function(col,idx){
				var switcher = '<span class="switcher">\
					<label class = "active" ><input type = "checkbox" class = "scheckbox"> </label></span>';
				var column = $('<span class="sutable-col" col='+idx+' />');
				if(cfg.colDims&&cfg.colDims.length){
					column.css("width",cfg.colDims[idx]+"px");
				}
				if(idx==0) {
					column.addClass("sutable-col-status");
					column.html(switcher);
					if(typeof(col)=="object" && col.status===false){
						column.find('[type="checkbox"]').attr("checked",false);
						column.find('label.active').removeClass('active');
						if (col.disabled){
							column.find('.switcher').addClass("disabled");
						}

					}
				}else if(idx==1){
					column.addClass("sutable-col-name");
				}
				if(idx>0){
					if(typeof(col)=="object"){
						var val = col.label||col.text||col.name;
						column.attr({"data-val":val,title:val}).html(val);
						if(idx == 1){
							column.append("<i class='font-icon font-icon-money'></i>");
						}
					}else{
						column.attr({"data-val":val,"title":val}).html(col);
					}
				}
				row.append(column);
			});

			if(array && array instanceof Array){
				var html = $('<span class="btn-plus-minus" />');
				if(cfg.caret){
					html.html(cfg.caret).addClass("custom-caret");
				}else{
					html.html('<i class="line-hor"></i><i class="line-ver"></i>');
				}
				li.append(html).append(wrapper).addClass("open");//row
				rec(li,array,cfg,deep);
			}else{
				li.append(wrapper);//row
			}
			ul.append(li);
		}
		if(ul.hasClass("treable-body")){
			return ul;
		}else{
			fa.append(ul);
		}
	};
	var Help = {
		recursive:function(fa,arr,cfg,deep){
			var ul = newbody(fa,arr,cfg,deep);
			fa.append(ul);
		},
		fixPageXY: function(the){
			var html = document.documentElement;
			var body = document.body;
			var the = (the.get(0)||the).getBoundingClientRect();
			var a = {};
			a.pageX = parseFloat(the.left) + (html.scrollLeft || body && body.scrollLeft || 0);
			a.pageX -= html.clientLeft || 0;

			a.pageY = parseFloat(the.top) + (html.scrollTop || body && body.scrollTop || 0);
			a.pageY -= html.clientTop || 0;

			a.pageYB = a.pageY + the.height;
			return a;
		}
	};


	function Treable(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.treable.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();
	};
	/***
	 **	横向滚动条
	 ***/
	Treable.prototype.scrollV = function(){
		var _this = this;
		_this.elem = $('.ndp-treable-wrapper');
		var sdim = _this.scroll.get(0).getBoundingClientRect();//上下左右
		var thumb = _this.elem.find(".horiz-thumb");
		var tdim = thumb.get(0).getBoundingClientRect();
		var w = this.elem.width(); // 不包括border的宽度
		var colW = 41;//41 margin-left:41    10 border-right
		$('.treable-header .sutable-col').each(function(index,item){
			colW += $(item).get(0).getBoundingClientRect().width;
		});
//		colW = colW + eval(_this.config.colDims.join("+"));//获得内部内容的总宽度
//		console.log(colW + ":" + w);
		if(tdim.left<sdim.left){
			thumb.css("left",sdim.left+"px");
		}else if(tdim.right>sdim.right){
			thumb.css("left",(sdim.right-sdim.width)+"px");
		}
		_this.scroll.toggleClass("show",colW>w?true:false).css("width",w+"px");
		_this.elem.find(".set-scroll").toggleClass("show-set-scroll",colW>w?true:false).css("width",w+"px");
		_this.elem.toggleClass("extend",colW>w?true:false)
		if(colW>w){
//			thumb.css("width",(w/colW)*100+"%");
			thumb.css("width",(w-colW+w)+"px");
		}else{

		}

		$(_this.config.scrollDOM).trigger("scroll");
	};
	/****
	 ** body  row,col,caret 的监听
	 ***/
	Treable.prototype.listenBody = function(){
		var _this = this;
		/***
		 ** 关闭图表层
		 ***/
		_this.elem.find("button.close.chart-close").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			$(this).parents(".chart-wrapper.open:first").removeClass("open");
			$(_this.config.scrollDOM).trigger("scroll");
		});
		/***
		 **事件  收起/展开按钮  树桩菜单的 展开/收起
		 **/
		_this.elem.find("span.btn-plus-minus").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			var the = $(this).parents("li.treable-item:first");
			the.find('.chart-wrapper.open:first').removeClass("open");//关闭图表层
			the.toggleClass("open");
			the.find("li.treable-item").toggleClass("open",the.hasClass("open"));
			$(_this.config.scrollDOM).trigger("scroll");
		});

		_this.elem.find(".sutable-col-status>.switcher").click(function(e){
			e.stopImmediatePropagation();
		});
		/***
		 **状态的打开/关闭
		 ***/
		_this.elem.find(".sutable-col-status>.switcher>label>input").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			var the = $(this).parent();
			if(the.parent().hasClass('disabled')){//如果 switcher 有 disabled,则返回
				return;
			}
			if (_this.config.switcherDisable && !$(this).attr("checked")){
				the.parent().addClass('disabled')
			}
			the.toggleClass("active");
			//只更改自己状态
			//if(!the.hasClass("active")){
			//	var fa = $(this).parents(".treable-item:first");
			//	fa.find("ul .switcher>label").removeClass("active");
			//}
			$(this).trigger('STATUS_UPDATE');
			fireEvent(_this.elem.get(0),"STATUS_CHANGE",{status:the.hasClass("active"), dataId : $(this).parents(".treable-item").attr("data-id")});
		});

		// 点击 选中一行， 显示 toolbar   2016-4-8 取消
//		_this.elem.find(".treable-row-wrapper>.treable-row").unbind("click").click(function(e){
//			e.stopImmediatePropagation();
//			if(!$(this).hasClass("focus")){
//				_this.elem.find(".treable-row-wrapper>.treable-row.focus").removeClass("focus");
//				$(this).addClass("focus");
//			}else{
//				$(this).removeClass("focus");
//			}
//			_this.toolbar.toggleClass("active",$(this).hasClass("focus"));
//		});

		/***
		 ** 鼠标离开一行
		 ****/
		_this.elem.find(".treable-row-wrapper>.treable-row").unbind("mouseleave").mouseleave(function(e){
			$(this).find(".dropdown-menu-money").addClass("hidden");
		});

		//事件不再抛出来， 图标区域内的
		_this.elem.find(".tab-content.tab-content-cus").unbind("click").click(function(e){
			e.stopImmediatePropagation();
		});

		//打开的 图表层，关闭
		_this.elem.unbind("click").click(function(e){
			console.log("关闭图表")
			$(this).find(".chart-wrapper.open").removeClass("open");
			$(_this.config.scrollDOM).trigger("scroll");

		});
		/***
		 ** 点击了，下拉菜单中的选项
		 ***/
		_this.elem.find(".treable-row>.dropdown-menu-money>li").click(function(e){
			e.stopImmediatePropagation();
			$(this).parent().addClass("hidden");
			var the = $(this);
			var id = the.data("id");
			var val = the.data("val");
			if(id=="chart"){
				_this.elem.find(".chart-wrapper.open").removeClass("open");
				$(this).parents(".treable-row:first").siblings(".chart-wrapper").addClass("open");
				$(_this.config.scrollDOM).trigger("scroll");
			}
			var dataid = $(this).parents("li.treable-item[deep]").data("id");
			var o = $(this).data();
			o.dataID = dataid;
			fireEvent(_this.elem.get(0),"TOOLBAR_CLICK",o);
			var dat = _this.config.todata[1];
			dat.dataID = dataid;
			dat.GD = _this.elem.find(".treable-item .chart-wrapper.open .tab-pane.active");//折叠后无法显示绘图区域的bug
			setTimeout(function(){
				fireEvent(_this.elem.get(0),"CHART_LAYER_INIT",dat);//展现完成，抛出数据
			},400);
		});

		/***
		 **
		 ****/
		_this.elem.on("TAB_CHANGE",function(e){
			e.stopImmediatePropagation();
			var dat = e.originalEvent.data;
			var panels = _this.elem.find(".treable-item .chart-wrapper.open .tab-pane");//无法抛出gd的bug
			panels.removeClass("active");
			$(panels[dat.index]).addClass("active");
			dat.GD = $(panels[dat.index]);
			fireEvent(_this.elem.get(0),"TAB_SHOW",dat);
		});


		/***
		 ** 点击  toolbar  看图表 button 被点击 触发
		 ***/
		_this.elem.find("button[data-id=chart]").unbind("click").click(function(e){
			_this.elem.find(".treable-row-wrapper>.treable-row.focus+.chart-wrapper").addClass("open");
			_this.elem.find(".treable-row-wrapper>.treable-row:not(.focus)+.chart-wrapper.open").removeClass("open");//关闭其他的
			$(_this.config.scrollDOM).trigger("scroll")
		});


		//点击 文字旁边的 钱 icon
		_this.elem.find("i.font-icon-money").unbind("click").click(function(e){
			e.stopImmediatePropagation();
			var dp = $(this).parents(".treable-row:first").find(".dropdown-menu-money").toggleClass("hidden");
			dp.css("opacity",0);
			var icon = Help.fixPageXY($(this));
			var offParent = Help.fixPageXY($(this).parents(".treable-row:first"));
			var x = icon.pageX - offParent.pageX;
			setTimeout(function(){
				dp.removeAttr("style");
				//
				dp.css({"top":(icon.pageY + 15) + "px","left":(icon.pageX+15)+"px"});
			});
			$(this).trigger('DROPDOWN_MENU_MONEY_SHOW', {dom:dp});
		});
	};

	/**
	 **列表组件的初始化
	 **/
	Treable.prototype.init = function () {
		var _this = this;
		this.concrate();//构建下来菜单的样子
		this.initConfig();

		_this.elem.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响
		_this.scroll.on("dragstart",function(){  return false; });//消除 默认h5 拖拽产生的影响

		/***
		 ** 表头 某一列的排序按钮被点击
		 ***/
		_this.head.find(".sort-wrapper").click(function(e){
			e.stopImmediatePropagation();
			var fa = $(this).parent();
			$(this).children().toggleClass("hi");
			var siblings = fa.siblings();
			siblings.find(".sort-wrapper").children("i").removeClass("hi");
			siblings.find(".sort-wrapper").children("i.glyphicon-triangle-bottom").addClass("hi");
			var sort = $(this).find('.hi').hasClass('glyphicon-triangle-top') ? 'up' : 'down';
			fireEvent(_this.elem.get(0), "SORT_CLICK", {col: fa.attr("col"), val: fa.text(), sort: sort});
		});
		/***
		 **鼠标按下 列缩放
		 ***/
		_this.elem.find("span.inspliter").mousedown(function(e){
			var column = $(this).parent();
			var c = parseInt(column.attr("col"));
			var theCol = $(".sutable-col[col="+c+"]");
			var minw = window.getComputedStyle(theCol.get(0)).minWidth;
			var the = $(this).get(0).getBoundingClientRect();
			var el = _this.elem.get(0).getBoundingClientRect();
			var start = (the.left-el.left + the.width);
			_this.elem.find(".split-line").css("left",(start-1)+"px").addClass("active");
			_this.elem.addClass("resize-cursor");
			_this.elem.addClass("extend");

			_this.elem.unbind("mousemove").mousemove(function(e){
				e.stopImmediatePropagation();
				var end = e.clientX - el.left - 2;
				var w = e.clientX - column.get(0).getBoundingClientRect().left-0.4;
				$(this).find(".split-line").css("left",end+"px");
				if(start<end){//拉大
					//_this.elem.css("width",(_this.elem.width()+gap)+"px");
					theCol.css("width",w + "px");
				}else{//缩小
					var d = (parseInt(c)+1);
					var next = $(".sutable-col[col="+d+"]");
					theCol.css("width",w + "px");
				}
				_this.config.colDims[c] = w;
			});
		});
		/***
		 **离开这个区域了
		 **/
		_this.elem.mouseleave(function(e){
			e.stopImmediatePropagation();
			$(this).unbind("mousemove");
			_this.elem.trigger("RESIZE_DONE");//鼠标拖动resize 列宽完成
		});
		/**
		 **鼠标释放
		 **/
		_this.elem.mouseup(function(e){
			e.stopImmediatePropagation();
			_this.elem.removeClass("resize-cursor");
			_this.elem.find(".split-line").removeClass("active");
			_this.elem.unbind("mousemove");
			_this.scrollV();// 是否显示横向滚动条
			_this.elem.trigger("RESIZE_DONE");//鼠标拖动resize 列宽完成
			var w1 = eval(_this.config.colDims.join("+"));//获得宽度
			_this.elem.find(".chart-wrapper").css("width",(w1+5)+"px");
		});


		/*****
		 ** 横向滚动条拖动  thumb 拖动
		 ****/
		_this.elem.off("mousedown", ".horiz-thumb").on("mousedown", ".horiz-thumb", function(e){
//			e.stopImmediatePropagation();
			var thumb = $(this);
			var sdim = _this.scroll.get(0).getBoundingClientRect();
			var start = e.clientX;
			_this.elem.off("mousemove", ".horiz-scroll").on("mousemove", '.horiz-scroll', function(e){
				e.stopImmediatePropagation();
				var tdim = thumb.get(0).getBoundingClientRect();
				var end  = e.clientX;
				var m = end - start;
				start = end;
				thumb.css("left",(tdim.left - sdim.left +m)+"px");
				/***
				 ** 超出边界的控制
				 ***/
				if(tdim.left<sdim.left){
					thumb.css("left",0);
				}else if(tdim.right>sdim.right){
					thumb.css("left",(sdim.right-tdim.width - sdim.left)+"px");
				}

				var w = tdim.left - sdim.left; if(w<0) w = 0;

				_this.elem.children("[role=table]").css("left",-w+"px");
			});
		});
		_this.elem.off("mouseleave", ".horiz-scroll").on("mouseleave", '.horiz-scroll', function(e){
			//_this.scroll.unbind("mousemove");
			var lf = _this.scroll.find(".horiz-thumb").css("left");
			_this.scroll.find(".horiz-thumb").css("left",lf+"px");
		});

		/****
		 ** 横向滚动条
		 ****/
		_this.elem.off("mouseup",".horiz-scroll").on("mouseup", '.horiz-scroll', function(e){
			//_this.scroll.unbind("mousemove");
			var thumb = $(this).children(":first");
			var dim1 = $(this).get(0).getBoundingClientRect();
			var dim2 = thumb.get(0).getBoundingClientRect();
			if(dim2.right>=dim1.right){
				var l = (dim1.right - dim2.width) - dim1.left;
				thumb.css("left",l+"px");
			}else if(dim2.left<=dim1.left){
				thumb.css("left",0);
			}
		});

		/***
		 ** 点击滚动条空白处
		 ***/
		_this.elem.off("click",".horiz-scroll ").on("click",'.horiz-scroll',  function(e){
			e.stopImmediatePropagation();
			var thumb = $(this).find(".horiz-thumb");
			var tdim = thumb.get(0).getBoundingClientRect();
			var sdim = $(this).get(0).getBoundingClientRect();
//			if(e.clientX>=tdim.left){
//				thumb.css("left",(tdim.left - sdim.left + 20)+"px");
//			}else{
//				thumb.css("left",(tdim.left - sdim.left - 20)+"px");
//			}
			/***
			 ** 超出边界的控制
			 ***/
			if(tdim.left<sdim.left){
				thumb.css("left",0);
			}else if(tdim.right>sdim.right){
				thumb.css("left",(sdim.right-tdim.width - sdim.left)+"px");
			}

			var w = tdim.left - sdim.left; if(w<0) w = 0;
			_this.elem.children("[role=table]").css("left",-w+"px");
		});

		/***
		 ** 点击工具栏按钮，发出事件。 2016-4-8号 不再显示toolbar
		 ***/
//		$(".sutable-toolbar").click(function(e){
//			var ta = $(e.target);
//			var id = ta.data("id");
//			var val = ta.data("name");
//			var dataID = _this.elem.find("li.treable-item:has(.treable-row.focus)").data("id");
//			if(id && val){
//				fireEvent(e.target,"TOOLBAR_CLICK",{id:id,name:id,dataID:dataID});
//			}
//		});

		//body 里面的监听
		_this.listenBody();


		$(window).resize(function(e){
			_this.config.wi = _this.elem.width();
			_this.allocate(_this.config.wi);
			$(_this.config.scrollDOM).trigger("scroll");
		});

		$(_this.config.scrollDOM).scroll(function(e){
			//横向滚动条
			if (_this.scroll.offset().top + _this.scroll.height()> $(window).height()){
				_this.elem.find(".set-scroll").length == 0 ? _this.elem.append( _this.scroll.clone(true).addClass('set-scroll' ).removeAttr("visibility") ) : '';
				_this.elem.find(".set-scroll").css("visibility", "visible");
				_this.scroll.css("visibility", "hidden");
			} else {
				_this.elem.find(".set-scroll").css("visibility", "hidden");
				_this.scroll.css("visibility", "visible");
			}

			//表底
			if (_this.foot.offset().top + _this.foot.height()> $(window).height()){
				_this.elem.find(".set-foot").length == 0 ? _this.elem.append( _this.foot.clone( false ).addClass('set-foot' ).removeAttr("visibility") ) : '';
				_this.elem.find(".set-foot").css("visibility", "visible");
				_this.foot.css("visibility", "hidden");
			} else {
				_this.elem.find(".set-foot").css("visibility", "hidden");
				_this.foot.css("visibility", "visible");
			}

		});

		$(_this.config.scrollDOM).trigger("scroll");

		_this.scrollV();//是否显示滚动条
	};

	/**
	 ** 构建下来菜单样子
	 **/
	Treable.prototype.concrate = function(){
		var _this = this;
		this.toolbar = $("<div class='sutable-toolbar' role='table' />");
		this.head = $("<ul class='treable-header' role='table' />").html('<li class=" treable-row"></li>');
		this.elem.append("<span class='split-line'></span>");
		this.elem.append(this.toolbar).append(this.head);
	};

	Treable.prototype.initConfig = function(){
		var _this = this;
		var cfg = this.config;
		if(cfg.todata){
			if(cfg.todata instanceof Array){
				var html = '';
				cfg.todata.forEach(function(item,index){
					var val = item.text||item.name||item.label;
					var className = item.class?item.class:'';
					html+="<button class='btn btn-default "+className+"' data-id="+item.id+" data-name="+val+" >"+val+"</button>";
				});
				this.toolbar.html(html);
			}else if(typeof(cfg.todata) == "function"){
				cfg.todata(_this.toolbar);
			}
		}
		//构建列表头部
		if(cfg.head){
			cfg.head.forEach(function(item,index){
				var col = $("<span class='sutable-col' col="+index+" />");
				if(index==0) {
					col.addClass("sutable-col-status");
				}else if(index==1){
					col.addClass("sutable-col-name");
				}
				if(typeof(item)=="object"){
					col.text(item.label||item.text||item.name);
				}else{
					col.text(item);
				}
				col.append("<span class='inspliter'></span>");
				_this.head.find(".treable-row").append(col);
			});
		}
		//构建列表内容
		if(cfg.body){
			Help.recursive(_this.elem,cfg.body,cfg);
		}
		//构建列表尾部
		if(cfg.tail){
			_this.foot = $("<ul class='treable-footer'  />");
			_this.elem.append(_this.foot);
		}

		_this.scroll = $("<div class='horiz-scroll' />").html("<div class='horiz-thumb' />");
		_this.elem.append(_this.scroll);


		this.allocate(cfg.wi);//分配宽度

		/***
		 ** 显示 排序图标
		 ***/
		if(cfg.sort){
			var st = "<span class='sort-wrapper'><i class='glyphicon glyphicon-triangle-top'></i><i class='glyphicon glyphicon-triangle-bottom hi'></i></span>";
			if(cfg.sort instanceof Array){
				cfg.sort.forEach(function(num,idx){
					_this.head.find(".sutable-col[col="+num+"]").append(st);
				});
			}else if(cfg.sort == ""){
				_this.head.find(".sutable-col").append(st);
			}
		};
	}

	/***
	 ** 宽度发生变化
	 ***/
	Treable.prototype.allocate = function(w){
		var w = w||1200;
		var dom = this.elem;
		var cfg = this.config;
		var rw  = w - 70 - 130 - 40 - 2;//80 第一列的宽度， 120 名称咧的宽度,40 : margin-left  2 是border
		var ew = rw/(cfg.head.length - 2);
		cfg.colDims = [70,130];//列宽度 存储
		if(ew>60){
			this.head.find(".sutable-col:gt(1)").css("width",ew+"px").each(function(){
				cfg.colDims.push(ew);
			});
			dom.find(".sutable-col:gt(1)").css("width",ew+"px");
		}else{
			dom.find(".sutable-col:gt(2)").css("width",80+"px").each(function(){
				cfg.colDims.push(ew);
			});//让他超出 ，无所谓
			dom.find(".sutable-col:gt(1)").css("width",ew+"px");
		}
		this.foot.css("width",w+"px");//最下面的
		this.scroll.css("width",w+"px");//横向滚动条
	};




	/**
	 * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
	 * or you can call it jquery plugin shell  == fn
	 *  类似于  Class.prototype.jqplugin = function(){};0
	 *  the   $.fn  [same as] Class.prototype
	 * plugin entrance
	 */
	$.fn.treable = function (options) {
		var the = this.first();
		var treable = new Treable(the, options);
		the = $.extend(true,{},the,new exchange(treable));
		return the;
	};

	/***
	 **和其他插件的交互
	 ** factory Class
	 **@param {Drop} drop :  instacne of the plugin builder
	 **/
	function exchange(treable){
		//不能使用直接 == treable.toolbar的方式，因为，传入的 this 变了
		this.toolbar = function(bool){
			treable.toolbar.toggleClass("active",bool);
		}

		/***
		 ** 外部调用这里 resize 宽度
		 ***/
		this.resize = function(w){
			treable.allocate(w);
		};

		/***
		 **外部调用，折叠展开树桩菜单
		 **@param {Boolean} bool  true:折叠，false展开
		 **/
		this.fold = function(bool){
			var rows = treable.elem.find(".treable-body>.treable-item");
			rows.toggleClass("open",bool);
			$(treable.config.scrollDOM).trigger("scroll");
			return treable.elem;
		}

		/***
		 ** 更新列表
		 ***/
		this.update = function(data){
			var body = newbody(treable.elem,data,treable.config);
			treable.elem.find(".treable-body").replaceWith(body);
			treable.listenBody();
			return treable.elem;
		}
	}


	var old = $.fn.treable;
	$.fn.treable.Constructor = Treable;
	// table NO CONFLICT
	// ===============
	$.fn.treable.noConflict = function () {
		$.fn.treable = old;
		return this;
	}
	/***
	 ** outside accessible default setting
	 **/
	$.fn.treable.defaults = {
		head:null,//列表头数据
		body:null,//列表内容数据
		tail:null,//列表尾部数据
		caret:null,//展开，折叠的 图标是 默认是  +  - 号
		sort:null,
		tabs:[],
		todata:null,// toolbar 显示的数据 [{name:'',id:''},{name:'',id:''},{}], function 或者数据
		scrollDOM : window,
		switcherDisable : false
	};
}(jQuery));

;(function ($) {
    var self = this;
	
	/***
	**加 ... 对于比较长的字符串
	***/
	function ellipsis(_this){
		var w = _this.elem.width();
		if(_this.config.wis>=(w-40)){
			var perw = (w-40)/_this.config.list.length;
			_this.breadwrapper.find("li").css({"maxWidth":perw+"px"}).addClass("cus");
		}else{
			_this.breadwrapper.find("li").removeAttr("style").removeClass("cus");
		}		
	}
	
	/***
	** 处理树桩菜单
	**/
	function recursive(arr,cfg,fa,deep){
		if(arr.length<=0) return;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='tree-root'/>");
		if(deep>1) {
			ul.addClass("hide").css("left",11+5+"px");
		}else{
			ul.addClass("tree-deepest");
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var li = $("<li class='tree-item' />");
			var txtWrapper = $("<span class='tree-txt-wrapper' />");
			li.append(txtWrapper);
			if(typeof(o)=="object"){
				var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group||o.children;
				var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
				txtWrapper.html(text).attr("title",text);
				li.attr({"value":text,"deep":deep});
				if(array && array instanceof Array){
					li.prepend($("<span class='tree-joint-wrapper' />").html(cfg.joint));
					rec(array,cfg,li,deep);
				}else{
					li.addClass("tree-leaf");
				}
			}else{
				txtWrapper.html(o);
				li.attr({"value":o,"deep":deep}).addClass("tree-leaf");
			}
			li.prepend("<span class='line-inspect' />")
			if(deep>1) {
				 li.append("<span class='line-inspect-hori' />");
			}
			ul.append(li);
		}
		fa.append(ul);
	}	
	/***
	** 构造函数
	**/
	function Tree(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.tree.defaults,element.data(),options);
		this.init();
		
    };
	/**
	**列表组件的初始化
	**/
    Tree.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();
		_this.elem.find("span.tree-joint-wrapper").click(function(e){
			var ul = $(this).siblings("ul.tree-root");
			ul.toggleClass("hide");
			$(this).toggleClass("active");
		});	
		/***
		**点击叶子
		**/	
		if(_this.config.checkbox){
			_this.elem.find("li>.tree-txt-wrapper").unbind("click").click(function(e){
				e.stopImmediatePropagation();
				$(this).parent().toggleClass("active");
				var fa = $(this).parent();
				var the = $(this).parent().find("input[type=checkbox]")
				if($(this).parent().hasClass("active")){
					the.prop("checked",true).parents("li").addClass("active");
				}else{
					the.removeAttr("checked").parents("li:not(.tree-leaf)").removeClass("active");
					var theLI = $(this).parent().parents("li:not(.tree-leaf)");
						theLI.removeClass("active").find("input[type=checkbox]:first").removeAttr("checked");
				}

				fireEvent(_this.elem.get(0),"LEAF_CHECK",{val:$(this).attr("title"),check:$(this).find("input").prop("checked")});
			});
		}else{
			_this.elem.find("li.tree-leaf").unbind("click").click(function(e){
				_this.elem.find("li.tree-leaf").removeClass("active");
				$(this).addClass("active");	
				fireEvent(_this.elem.get(0),"LEAF_CLICK",{val:$(this).attr("value")});//点击节点
			});
		}
    };
	
	/**
	** 构建下来菜单样子
	**/
	Tree.prototype.concrate = function(data){
		var _this = this;
		var cfg = _this.config;
		recursive(cfg.data,cfg,_this.elem,0);
	};

    Tree.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		if(cfg.folder){
			_this.elem.find("li:not(.tree-leaf)>.tree-txt-wrapper").prepend(cfg.folder);
		}
		if(cfg.file){
			_this.elem.find("li.tree-leaf>.tree-txt-wrapper").prepend(cfg.file);
		}
		
		if(cfg.checkbox){
			_this.elem.find("li>.tree-txt-wrapper").prepend("<input type='checkbox'>");
		}
	}
    /**
	* 入口
     */
    $.fn.tree = function (options) {
		var the = this.first();
        var tree = new Tree(the, options);
       the = $.extend(true,{},the,new exchange(tree));
		return the;
    };	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(tree){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){    
        }
    }
	
	  var old = $.fn.tree;
	  $.fn.tree.Constructor = Tree;
	  // tree NO CONFLICT
	  // ===============
	  $.fn.tree.noConflict = function () {
		$.fn.tree = old;
		return this;
	  }	
	/***
	** outside accessible default setting
	**/
	$.fn.tree.defaults = {
		joint:"<div class='hor'></div><div class='ver'></div>",//tree 关联处的 icon //<span>+</span><span>-</span>
		icon:"",// 前置的图标
		data:[],//生成树桩菜单，需要的数据
		subKey:null,//下一层数组的key
		textKey:null,//值key
		folder:null,
		file:null,
		checkbox:false
	};
}(jQuery));

;
(function($, window, undefined) {
    function FileUpload(config) {
        var self = this;
        $.extend(this, config);
        return this.init(config);
    }

    FileUpload.prototype = {
        constructor: 'FileUpload',
        init: function(config) {
            this.elem = config.container;
            this.$wrapper = $(this.html);
            this.$num = this.$wrapper.find('.upload-num');
            this.$msg = this.$wrapper.find('.upload-msg');
            this.$wrapper.appendTo($(this.container));
            this.$button = $(this.button);
            this.$form = $(this.form);
            this.setSize();
            this.bindEvent();
        },
        createFileInput: function() {
            var self = this;
            var input = document.createElement('input');
            input.type = 'file';
            input.onchange = function(e) {
                e.files = this.files;
                self.drop(e);
                input.onchange = null;
                input = null;
                console.log(e);
            };
            input.click();
        },
        /**
         * 绑定事件
         */
        bindEvent: function() {
            this.$wrapper
                .on('dragenter', this.dragEnter.bind(this))
                .on('dragleave', this.dragLeave.bind(this))
                .on('dragover', this.dragOver.bind(this))
                .on('drop', this.drop.bind(this))
                .on('click', '.upload-button', this.popFileinput.bind(this));

            this.$button.on('click', this.uploadByButton.bind(this));

            //阻止浏览器默认行。
            $(document).on({
                'dragenter': false,
                'dragover': false,
                'dragend': false,
                'drop': false
            });
        },
        /**
         * 弹出文件选择框
         */
        popFileinput: function() {
            this.beforeSelecting();
            this.createFileInput();
            this.$wrapper.find("div.upload-content").css({"width":"560px",height:"250px"});
        },
        /**
         * 通过按钮上传文件
         */
        uploadByButton: function() {
            var self = this;
            if (self.file) {
                self.upload.call(self, self.file);
            } else {
                self.error({ msg: self.text.error.none, type: 'file' });
            }
        },
        /**
         * 判断上传的文件是否符合规范
         */
        fileErrorDetect: function(files) {
            var msg = [];
            var file = files[0];
            var dtd = $.Deferred();
            var self = this;
            var url = null;
            if (files.length < 1) {
                msg.push(self.text.error.none);
            }
            if (files.length > 1) {
                msg.push(self.text.error.number);
            }
            if (this.size < file.size) {
                msg.push(self.text.error.size);
            }
            if (this.type && !new RegExp(this.type, 'ig').test(file.type)) {
                msg.push(self.text.error.type);
            }

            if (msg.length) {
                this.error({ msg: msg.join(self.text.upload.linkword), type: 'file' });
                dtd.reject(false);
            }
            //这里判断是图片，而且可允许的尺寸中有，那么就要判断了
            else {
                url = self.createObjectURL(file);
                if (self.type == 'image') {
                    self.getImgSize(url, function(w, h) {
                        if (self.allowSize.length && self.allowSize.indexOf(w + '*' + h) == -1) {
                            msg.push(self.text.error.allowSize);
                            self.error({ msg: msg.join(self.text.upload.linkword), type: 'file' });
                            dtd.reject(url);
                        } else {
                            self.setSize.call(self, w, h);
                            dtd.resolve(url);
                        }
                    });
                } else {
                    self.setSize.call(self);
                    dtd.resolve(url);
                }
            }
            return dtd;
        },
        /**
         * 上传错误处理
         */
        error: function(e) {
            this.onerror && this.onerror(e);
            this.$wrapper.attr('data-state', 'error');
            this.showMsg(e.msg);
        },
        /**
         * 正在上传
         */
        progress: function(e) {
            if (e.lengthComputable) {
                this.showNum(Math.floor(e.loaded / e.total * 100));
            }
            this.onprogress && this.onprogress(e);
        },
        /**
         * 显示进度数字信息
         */
        showNum: function(num) {
            this.$num.html(num);
        },
        /**
         * 显示提示信息
         */
        showMsg: function(msg) {
            this.$msg.html(msg);
        },
        /**
         * 拖拽进入
         */
        dragEnter: function(e) {
            this.file = null;
            this.beforeSelecting();
            this.ondragenter && this.ondragenter(e);
            e.preventDefault();
        },
        /**
         * 拖拽离开
         */
        dragLeave: function(e) {
            this.ondragleave && this.ondragleave(e);
            e.preventDefault();
        },
        /**
         * 拖拽进入
         */
        dragOver: function(e) {
            this.ondragover && this.ondragover(e);
            e.preventDefault();
        },
        /**
         * 准备上传
         */
        beforeSelecting: function() {
            this.$wrapper.attr('data-state', 'selecting');
            this.showMsg('');
        },
        /**
         * 放下文件时
         */
        drop: function(e) {
            //jquery对event做了封装，但是保留了原来的event,这个event就是e.originalEvent
            var files = Array.prototype.slice.call(e.files || e.originalEvent.dataTransfer.files, 0);
            var self = this;
            self.$wrapper.attr('data-state', 'selected');

            self.ondrop && self.ondrop(e);
            e.preventDefault();

            self.fileErrorDetect(files)
                .done(function(src) {
                    self.file = files[0];
                    self.createPreview.call(self, files[0], src);
                    self.$button.length || self.upload.call(self, files[0]);
                })
                .always(function(src) {
                    //赶紧revoke生成的url
                    src && self.revokeObjectURL(src);
                });
        },
        /**
         * 设置div尺寸
         */
        setSize: function(w, h) {
            var w0 = this.width,
                h0 = this.height;
            var ratio = Math.max(w / w0, h / h0);
            if (w && h) {
                if (ratio > 1) {
                    w0 = w / ratio;
                    h0 = h / ratio;
                } else {
                    w0 = w;
                    h0 = h;
                }
            }
            this.$wrapper.find('.upload-content').css({ width: w0 + 'px', height: h0 + 'px' });
        },
        revokeObjectURL: function(url) {
            if (window.webkitURL) {
                window.webkitURL.revokeObjectURL(url)
            } else if (window.URL) {
                window.URL.revokeObjectURL(url)
            }
        },
        /**
         * 生成url
         */
        createObjectURL: function(file) {　
            var url = null;
            if (window.webkitURL) {
                url = window.webkitURL.createObjectURL(file)
            } else if (window.URL) {
                url = window.URL.createObjectURL(file);
            }
            return url;
        },
        /**
         * 生成预览
         */
        createPreview: function(file, src) {
            var tpl = this.previewTpl;
            var self = this;
            var defaultTpl = {
                image: '<img src="{{src}}">',
                video: '<video src="{{src}}" width ="' + self.width + '" height ="' + self.height + '" controls></video>'
            }
            if (!!tpl) {
                if ($.isFunction(tpl)) {
                    tpl = tpl(file, src);
                } else if ($.type(tpl) == 'string') {
                    tpl = tpl.replace('{{src}}', src);
                }
            } else if (this.type) {
                tpl = defaultTpl[this.type].replace('{{src}}', src);
            }
            this.$wrapper.find('.upload-preview').html(tpl);

        },
        /**
         * 获取图片的宽高
         */
        getImgSize: function(src, callback) {
            var img = new Image();
            img.onreadystatechange = img.onload = function() {
                if (img.complete || img.readystate == "complete" || img.readystate == "loaded") {
                    callback(parseInt(img.naturalWidth || img.width, 10), parseInt(img.naturalHeight || img.height, 10));
                    img.onload = img.onreadystatechange = null;
                }
            }
            img.src = src;
        },
        /**
         * 文件上传
         */
        upload: function(file) {
            var self = this;
            var ajaxOption = $.extend({
                dataType: 'json',
                type: 'post',
                contentType: false,
                processData: false,
                xhr: function() {
                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = true;
                    self.$wrapper.attr('data-state', 'uploading');
                    self.showMsg(self.text.upload.uploading);
                    xhr.upload.onprogress = self.progress.bind(self);
                    return xhr;
                }
            }, self.ajax);

            //这里生成一次data
            var fd = this.$form.length ? new FormData(this.$form[0]) : new FormData();
            fd.append(self.name, file);
            $.each(ajaxOption.data || {}, function(k, v) {
                fd.append(k, v);
            });
            //将data赋值为formdata
            ajaxOption.data = fd;
            $.ajax(ajaxOption)
                .done(function(data) {
                    self.$wrapper.attr('data-state', 'uploaded');
                    self.showMsg(self.text.upload.success);
                    self.showNum('0');
                    self.onload && self.onload.call(self, data);
                })
                .fail(function(xhr, status, err) {
                    self.error.call(self, { msg: xhr.responseText, type: 'ajax', textStatus: status, xhr: xhr, error: err });
                })
                .always(function() {
                    self.file = null;
                })
        }

    }
    
    /***
    **和其他插件的交互
	** factory Class
    **@param {Class} fileupload :  instacne of the plugin builder
    **/
    function exchange(fu){
        /***
        ** 
        ***/
        this.createPreview = function(fl,src){
            fu.createPreview(fl,src);
            return fu.elem;
        }
    }  
    


    $.fn.fileupload = function(options) {
        var returnVal = this;
        //这里合并配置
        $.extend(true, $.fn.fileupload.defaults, options)
        //这里链接字符串
        //生成html属性
        $.fn.fileupload.defaults.html || tplLink();
        this.each(function(key, the) {
            new FileUpload($.extend({ container: the }, $.fn.fileupload.defaults));
        })
        return returnVal;
    };


    $.fn.fileupload.defaults = {
        text: {
            upload: {
                uploading: '正在上传',
                success: '添加成功',
                tips: '文件拖放到这里',
                linkword: '或者',
                descUploading: '上传中',
                descButton: '上传',
                agButton: '重新上传'
            },
            error: {
                type: '文件类型不正确',
                size: '文件大小超过限制',
                number: '文件数超过一个',
                none: '没有要上传的文件',
                allowSize: '宽高尺寸有问题'
            }
        },
        //这里是上传按钮
        //如果有,则给按钮绑定上传事件，当按钮点击时则上传
        //如果没有，则拖放后立即上传
        button: false,
        //这里看是否需要通过form来创建上传数据
        form: false,
        name: 'file',
        type: 'image',
        width: 560,
        height: 250,
        size: 10485760, //默认上传大小不超过10M
        allowSize: [], //这是里默认什么尺寸的，只针对图片起效
        tpl: '<div class="upload-wrapper" data-state="prepare">\
                    <div class="upload-content">\
                        <div class="upload-desc">\
                            <div class="upload-desc-inner">\
                                <p class="upload-icon"></p>\
                                <p>{{text.upload.tips}}</p>\
                                <p class="small">{{text.upload.linkword}}</p>\
                                <button class="upload-button" type="button">{{text.upload.descButton}}</button>\
                            </div>\
                        </div>\
                        <div class="upload-preview">\
                        </div>\
                        <div class="upload-mask">\
                            <div class="upload-mask-inner">\
                                <p class="upload-num">0</p>\
                                <p>{{text.upload.descUploading}}</p>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="upload-footer">\
                        <span class="upload-msg"></span>\
                        <button class="upload-button upload-button-go" type="button">{{text.upload.descButton}}</button>\
                        <button class="upload-button upload-button-other" type="button">{{text.upload.agButton}}</button>\
                    </div>\
                </div>'
    }
    
    

    //模板生成函数
    function tplLink() {
        var defaults = $.fn.fileupload.defaults;
        var textUpload = defaults.text.upload;
        defaults.html = defaults.tpl.replace(/{{text\.upload\.tips}}/ig, textUpload.tips)
            .replace(/{{text\.upload\.linkword}}/ig, textUpload.linkword)
            .replace(/{{text\.upload\.descButton}}/ig, textUpload.descButton)
            .replace(/{{text\.upload\.descUploading}}/ig, textUpload.descUploading)
            .replace(/{{text\.upload\.agButton}}/ig, textUpload.agButton);
    }
})(jQuery, window, undefined)

;(function ($) {
    var self = this;    
	/***
	** 处理树桩菜单
	**/
	function recursive(arr,cfg,fa,deep){
		if(arr.length<=0) return;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='list-root' deep="+deep+"  />");
		if(deep>1) {
			ul.addClass("hide");
		}else{
			ul.addClass("list-deepest");
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var li = $("<li class='list-item' />");
			var txtWrapper = $("<span class='list-txt-wrapper' />");
			//txtWrapper.css({"padding-left":deep*10+"px"});
			li.append(txtWrapper);
			if(typeof(o)=="object"){
				var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group||o.children;
				var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
				txtWrapper.html(text).attr("title",text);
				li.attr({"value":text,"deep":deep});
				if(array && array instanceof Array){
					if(cfg.expicon){
						li.attr("asparent",true);
						txtWrapper.append(cfg.expicon);
					}
					rec(array,cfg,li,deep);
				}else{
					li.addClass("list-leaf");
				}
			}else{
				txtWrapper.html(o);
				li.attr({"value":o,"deep":deep}).addClass("list-leaf");
			}
			ul.append(li);
		}
		fa.append(ul);
	}	
	/***
	** 构造函数
	**/
	function VList(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.vList.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();
		
    };
	/**
	**列表组件的初始化
	**/
    VList.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

		
		/**
		** 点击非叶子节点
		**/
		_this.elem.find("li[asparent]:has(ul)").click(function(e){
			e.stopImmediatePropagation();
			$(this).toggleClass("active").children("ul.list-root").toggleClass("hide");
		});
		
		/***
		**点击叶子
		**/	
		_this.elem.find("li.list-leaf").click(function(e){
			e.stopImmediatePropagation();
			_this.elem.find("li.list-leaf").removeClass("active");
			$(this).parents("li[asparent].active").addClass("focus");
			$(this).addClass("active");
			if($(this).parent().hasClass('list-deepest')){
				var the = $(this).siblings("li[asparent]").removeClass("active focus");
				the.find("li[asparent].active").removeClass("active").removeClass("focus");
				the.find("ul").addClass("hide");
			}else{
				the = $(this).parents("li[deep='1']").siblings("li");
				the.find("ul").addClass("hide");
				the.removeClass("active focus");
				the.find("li").removeClass("active").removeClass("focus");
				var deep = $(this).attr("deep");
				$(this).parent().parent().siblings("li[asparent]").removeClass(" active").removeClass("focus").children("ul").addClass("hide");
				$(this).siblings("li").removeClass("active").removeClass("focus").children("ul").addClass("hide");
			}
			fireEvent($(this).get(0),"ITEM_CLICK",{val:$(this).attr("value")});
		});
    };
	
	/**
	** 构建下来菜单样子
	**/
	VList.prototype.concrate = function(data){
		var _this = this;
		var cfg = _this.config;
		recursive(cfg.data,cfg,_this.elem,0);
	};

    VList.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		
		if(cfg.leaficon){
			_this.elem.find("li.list-leaf>.list-txt-wrapper").prepend(cfg.leaficon).addClass("leaf-icon");
		}else{
			_this.elem.find("li.list-leaf>.list-txt-wrapper").removeClass("leaf-icon");
		}
		
		if(cfg.foldicon){
			var txt = _this.elem.find("li[asparent]").attr("value");
			_this.elem.find("li[asparent]>.list-txt-wraper").prepend(cfg.foldicon);
		}
	}
    /**
	* 入口
     */
    $.fn.vList = function (options) {
		var the = this.first();
        var vList = new VList(the, options);
        the = $.extend(true,{},the,new exchange(vList));
		return the;
    };	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(vList){
        /**
        **@param {Object} msg {type:"类型"}
        **/
        this.manipulate = function(msg){    
        }
    }
	
	  var old = $.fn.vList;
	  $.fn.vList.Constructor = VList;
	  // vList NO CONFLICT
	  // ===============
	  $.fn.vList.noConflict = function () {
		$.fn.vList = old;
		return this;
	  }	
	/***
	** outside accessible default setting
	**/
	$.fn.vList.defaults = {
		data:[],
		expicon:"<i class='glyphicon glyphicon-menu-right'></i>",
		leaficon:null
	};
}(jQuery));

;(function ($) {
    var self = this;
	/***
	** 处理树桩菜单
	**/
	function recursive(arr,cfg,fa,deep){
		if(arr.length<=0) return;
		//var reg = /^<[^><]+>.+?>$/i;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='list-root' deep="+deep+"  />");
		if(deep==1) {
			ul.addClass("list-deepest");
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var li = $("<li class='list-item' data-index="+i+"/>");
			var ctx = $("<div class='content-part' />");
			li.append(ctx);
			var icon = $("<span class='icon-part' />");
			ctx.append(icon);
			var txt = $("<span class='txt-part' />");
			ctx.append(txt);
			if(typeof(o)=="object"){
				var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group||o.children;
				var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
				var _title = text;
				if(o.href){
					text = '<a href="'+o.href+'">'+text+'</a>';
				}
				txt.html(text).attr("title",_title);

				li.attr({"value":text,"deep":deep});
				if(array && array instanceof Array){
					if(cfg.foldicon){
						ctx.append(cfg.foldicon);
					}
					rec(array,cfg,li,deep);
				}else{
					li.addClass("list-leaf");
				}
				if(o.icon){
					if(typeof(o.icon) == "string"){//如果是 字体文件
						icon.append(o.icon);
					}else{
						icon.append("<img  src="+o.icon.sm+" />");
					}
				}
			}else{
				txt.html(o);
				li.attr({"value":o,"deep":deep}).addClass("list-leaf");
			}
			ul.append(li);
		}
		fa.append(ul);
	}
	/***
	** 构造函数
	**/
	function VList2(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.vList2.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();

    };
	/**
	**列表组件的初始化
	**/
    VList2.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();


		/**
		** 点击非叶子节点
		**/
		_this.elem.find("li[asparent]:has(ul)").click(function(e){
			e.stopImmediatePropagation();

		});

		/***
		**点击叶子
		**/
		_this.elem.find("li.list-leaf").click(function(e){
			e.stopImmediatePropagation();
			_this.elem.find("li.list-leaf").removeClass("active");
			var deep = $(this).attr("deep");
			var val = $(this).attr("value");
			$(this).parents("li[asparent].active");
			$(this).addClass("active");
			if($(this).parent().hasClass('list-deepest')){
				var the = $(this).siblings("li[asparent]").removeClass("active");
				the.find("li[asparent].active").removeClass("active");
			}else{
				the = $(this).parents("li[deep='1']").siblings("li");
				the.removeClass("active");
				the.find("li").removeClass("active");
				$(this).parent().parent().siblings("li[asparent]").removeClass(" active").children("ul");
				$(this).siblings("li").removeClass("active").children("ul");
			}
			//$(this).trigger("item_click",{deep:deep,value:val});
			fireEvent($(this).get(0),"item_click",{deep:deep,value:val});//点击叶子节点
		});

		/***
		** 点击 标题行  展开/折叠
		***/
		_this.elem.find(".content-part:has(i.glyphicon-menu-up)").addClass("cur").click(function(e){
			e.stopImmediatePropagation();
			var li =  $(this).parents(".list-item:first");
			li.children("ul").toggleClass("hidden");
			$(this).toggleClass("open-hide");
		});

		/****
		**收缩、展开 动画完成
		***/
		_this.elem.on("webkitTransitionEnd oTransitionEnd otransitionend transitionend",function(e){
			e.stopImmediatePropagation();
			if($(this).hasClass("mini-state")){//shrink  缩起来
				$(this).trigger("shrink_complete");//收缩事件
			}else{//expand 展开
				$(this).trigger("expand_complete");//展开事件
			}
		});
	
		// 大小 图标转换
		_this.elem.on("STATE_CHANGE",function(type,val){
			_this.config.data.forEach(function(item,index){
				if(item.icon instanceof Object  && item.icon.big){
					var img = _this.elem.find(".list-root>li[data-index="+index+"] img");
					val?img.attr("src",item.icon.big):img.attr("src",item.icon.sm);
				}
			});		
		});
    };

	/**
	** 构建菜单样子
	**/
	VList2.prototype.concrate = function(data){
		var _this = this;
		var cfg = _this.config;
		recursive(cfg.data,cfg,_this.elem,0);
		_this.elem.find("li.list-leaf:first").addClass("active");
		_this.elem.find("li[deep='1'].list-item:last").siblings("li").append("<hr />");
	};

    VList2.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;

		if(cfg.leaficon){
			_this.elem.find("li.list-leaf>.list-txt-wrapper").prepend(cfg.leaficon).addClass("leaf-icon");
		}else{
			_this.elem.find("li.list-leaf>.list-txt-wrapper").removeClass("leaf-icon");
		}

		if(cfg.foldicon){
			var txt = _this.elem.find("li[asparent]").attr("value");
			_this.elem.find("li[asparent]>.list-txt-wraper").prepend(cfg.foldicon);
		}
	}

	/***
	** 组件变形调用
	***/
	VList2.prototype.transform = function(){
		if(this.elem.children().length<=0) return;//如果不存在DOM 节点，删除
		this.elem.toggleClass("mini-state");
		var the =  this.elem.find("li>ul:has(li[deep='2'])");
		if(!the.hasClass("menu-mini-mode") && the.hasClass("hidden")) the.removeClass("hidden");
		the.toggleClass("menu-mini-mode hidden");
		this.elem.find("li:has(li.active)>.content-part");
		if(this.elem.hasClass("mini-state")){//mini模式  全部展开
			this.elem.find("li[deep='1']:has(ul)").unbind("mouseenter").mouseenter(function(){
				var wh = window.innerHeight;
				var face = $(this).find("ul:has(li[deep='2'])");
				$(this).addClass("active");
				$(this).find("ul:has(li[deep='2'])").removeClass("hidden");
				var h = face.get(0).getBoundingClientRect().bottom;
//				var h2 = this.getBoundingClientRect().bottom
				if(h+5>wh){
					face.addClass("align-bottom");
				}else{
					face.removeClass("align-bottom");
				}
			});
			this.elem.find("li[deep='1']:has(ul)").unbind("mouseleave").mouseleave(function(){
				$(this).removeClass("active");
				$(this).children("ul:has(li[deep='2'])").addClass("hidden");
			});
			this.elem.trigger("STATE_CHANGE",1);
		}else{// 大分类模式，图标变大
			this.elem.find("li[deep='1']:has(ul)").unbind("mouseenter");
			this.elem.find("li[deep='1']:has(ul)").unbind("mouseleave");
			this.elem.trigger("STATE_CHANGE",0);
		}
	}
    /**
	* 入口
     */
    $.fn.vList2 = function (options) {
		var the = this.first();
        var vList2 = new VList2(the, options);
		the = $.extend(true,{},the,new exchange(vList2));
		return the;
    };
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(vList2){
		
		/***
		*** 展开，折叠
		****/
		this.fold = function(){
			vList2.transform();
			return vList2.elem;
		}
    }

	  var old = $.fn.vList2;
	  $.fn.vList2.Constructor = VList2;
	  // vList NO CONFLICT
	  // ===============
	  $.fn.vList2.noConflict = function () {
		$.fn.vList2 = old;
		return this;
	  }
	/***
	** outside accessible default setting
	**/
	$.fn.vList2.defaults = {
		data:[],
		leaficon:null,//"<i class='glyphicon glyphicon-list-alt'></i>"
		foldicon:"<i class='glyphicon glyphicon-menu-up'></i>"
	};
}(jQuery));

;(function ($) {
    var self = this;    
	/***
	** 处理树桩菜单
	**/
	function recursive(arr,cfg,fa,deep){
		if(arr.length<=0) return;
		deep++;
		var rec = arguments.callee;
		var ul = $("<ul class='list-root' deep="+deep+"  />");
		if(deep>1) {
			ul.addClass("hide");
		}else{
			ul.addClass("list-deepest"); 
		}
		for(var i=0;i<arr.length;i++){
			var o = arr[i];
			var li = $("<li class='list-item' />");
			var txtWrapper = $("<span class='list-txt-wrapper' />");
			txtWrapper.css({"padding-left":(deep*30)+"px"});
			li.append(txtWrapper);
			if(typeof(o)=="object"){
				var array = o[cfg.subKey]||o.sub||o.son||o.next||o.group||o.children;
				var text = o[cfg.textKey]||o.text||o.label||o.title||o.name;
				var value = o.val||o.value||text;
				var did = o.id;
				var ty = o.type;
				if(o.parent) {
					var _path = o.parent.split(">").join("#").replace(/\s/g,"");
					li.attr("data-path", _path);
					o.path = _path;
				}

				txtWrapper.html(text).attr({"title":text});
				li.attr({"data-name":text,"data-text":text,"deep":deep,"data-id":did,"data-val":value,"data-type":ty,"data-size":o.audience_size});
				if(o.audience_size) txtWrapper.append("<span class='aud-size'>"+(o.audience_size)+"</span>");
				if(o.search) {
					txtWrapper.addClass("do-search");
					txtWrapper.append('<span class="glyphicon glyphicon-search v-search"></span>');
				}
				if(array && array instanceof Array){
					li.attr("asparent",true);
					txtWrapper.append(cfg.expicon);
					rec(array,cfg,li,deep);
				}else{
					li.addClass("list-leaf");
				}
			}else{
				txtWrapper.html(o);
				li.attr({"data-text":o,"data-val":o,"deep":deep}).addClass("list-leaf");
			}
			li.data("info", o)
			ul.append(li);
		}
		fa.append(ul);
	}	
	/***
	** 构造函数
	**/
	function VList3(element, options) {
		var self = this;
		this.elem = element;
		this.config = $.extend(true,{},$.fn.vList3.defaults,element.data(),options);
		this.config.wi = this.elem.width();
		this.init();
		
    };
	/**
	**列表组件的初始化
	**/
    VList3.prototype.init = function () {
        var _this = this;
		this.elem.addClass(this.config.containerClass);//设置 包裹容器的 dim,外观
        this.concrate();//构建下来菜单的样子
		this.initConfig();

		
		/**
		** 点击非叶子节点
		**/
		_this.elem.find("li[asparent]:has(ul)").click(function(e){
			e.stopImmediatePropagation();
			$(this).toggleClass("active").children("ul.list-root").toggleClass("hide");
		});
		
		/***
		**点击叶子
		**/	
		_this.elem.find("li.list-leaf:not(:has(.do-search))").click(function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			if($(this).hasClass("selected")) return false;
			$(this).addClass("active");
			var the = $(this);
			//modify by sisi 为了保证数据尽可能完整的返回 故修改成 .data("info")
			fireEvent($(this).get(0),"ITEM_CLICK",the.data("info"));
			$(this).addClass("selected");
		});
		
		/***
		** 点击需要 "搜索" 的东西
		***/
		_this.elem.find("li.list-leaf:has(.do-search)").click(function(e){
			_this.sepanel.removeClass("hidden");
			_this.elem.addClass("search-mode");
			var the = $(this);
			//modify by sisi 为了保证数据尽可能完整的返回 故修改成 .data("info")
			var _data = the.data("info");
			_data.search = true;
			fireEvent($(this).get(0),"ITEM_CLICK",_data);
		});
		
		/***
		** 点击search 部分
		***/
		_this.sepanel.click(function(e){
			e.stopImmediatePropagation();
		});
	
		_this.sepanel.find(".btn-search").click(function(e){
			_this.searchx.clear();
			fireEvent(_this.elem.get(0),"RETURN_BACK");
		});
		
    };
	
	/**
	** 构建下来菜单样子
	**/
	VList3.prototype.concrate = function(data){
		var _this = this;
		var cfg = _this.config;
		var _treeArae = $("<div class='tree-area'></div>");
		_this.elem.append(_treeArae);
		recursive(cfg.data,cfg,_treeArae,0);
		_this.sepanel = $("<div class='search-panel hidden' data-content='这里填写你想提示的内容' />");
		_this.searchx = $("<div class='ndp-search-wrapper'  />").search({
			type:3,
			clickhide:false,
			ajaxOptions: _this.config.ajaxOption,
			formatNoMatches : _this.config.formatNoMatches,//无查询结果提示
			rowdec:function(o,index,val1){
				var txt = (typeof(o)=="string")?o:(o.text||o.label||o.name);
				var val = o.val || o.value || txt;
				var id = o.id;
				var asize = o.audienceSize||o.audience_size;
				var _li =  $('<li  class="search-row-cus" data-val="'+val+'" data-type="'+ o.type +'" data-id="'+id+'" data-text="'+txt+'" data-name="'+txt+'" data-path="'+(o.path.join("#").replace(/\s/g,""))+'" data-size="'+asize+'" index="'+index+'" tabIndex="'+index+'"><a href="#">'+(val1||txt)+'</a></li>');
                if (asize){
					_li.append('<span class="aud-class">'+asize+'</span>');
				}
				return _li;
			}
		});
		_this.sepanel.append(_this.searchx).append("<button class='btn btn-default btn-search'>" + (_this.config.returnList ? _this.config.returnList : "返回列表" )+ "</button>");
		_this.elem.append(_this.sepanel);
	};

    VList3.prototype.initConfig = function(){
        var _this = this;
		var cfg = this.config;
		
		if(cfg.leaficon){
			_this.elem.find("li.list-leaf>.list-txt-wrapper").prepend(cfg.leaficon).addClass("leaf-icon");
		}else{
			_this.elem.find("li.list-leaf>.list-txt-wrapper").removeClass("leaf-icon");
		}
		
		if(cfg.foldicon){
			var txt = _this.elem.find("li[asparent]").attr("value");
			_this.elem.find("li[asparent]>.list-txt-wraper").prepend(cfg.foldicon);
		}
	}
    /**
	* 入口
     */
    $.fn.vList3 = function (options) {
		var the = this.first();
        var vList = new VList3(the, options);
        the = $.extend(true,{},the,new exchange(vList));
		return the;
    };	
    /***
    **和其他插件的交互
	** factory Class
    **@param {Drop} Bread :  instacne of the plugin builder
    **/
    function exchange(vList3){
		
		this.fold = function(){
			vList3.elem.find("li.list-item.active").removeClass("active");
			vList3.elem.find("li>ul.list-root").addClass("hide");
			return vList3.elem;
		};
		
		/***
		** hide search panel
		***/
		this.hspanel = function(){
			vList3.sepanel.addClass("hidden");
			vList3.elem.removeClass("search-mode");
			vList3.searchx.clear();
			return vList3.elem;
		};
		
		/***
		** 更新 搜索用的ajax
		***/
		this.updateOption = function(o){
			vList3.config.ajaxOption = o;
			vList3.searchx.updateOption(o);
			return vList3.elem;
		};
		
		//更新 搜索时，放大镜下面的文字
		this.updateTip = function(txt){
			vList3.sepanel.attr("data-content",txt);
			return vList3.elem;
		}
    }
	
	  var old = $.fn.vList3;
	  $.fn.vList3.Constructor = VList3;
	  // vList NO CONFLICT
	  // ===============
	  $.fn.vList3.noConflict = function () {
		$.fn.vList3 = old;
		return this;
	  }	
	/***
	** outside accessible default setting
	**/
	$.fn.vList3.defaults = {
		data:[],
		expicon:"<i class='glyphicon glyphicon-menu-right'></i>",
		returnList : "返回列表",
		ajaxOption: {
				type: "GET",
				url: "../data/search.json"
		}
	};
}(jQuery));
