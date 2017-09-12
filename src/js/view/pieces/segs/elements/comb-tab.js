/**
**@ Combination  tab 组件
**@ constructor {Class} ComTab
**@ super class Combine
**/
define(['static','http','note',
		'./demo-table','./demo-drop',
		'./demo-page','./demo-bread',
		'./demo-tabs','./demo-sinput',
		'./demo-tip','./demo-alert',
		'./demo-confirm','./demo-prompt',
	    './demo-tree','./demo-vList',
		'./demo-search','./demo-gallery',
		'./demo-progressbar','./demo-vList2',
	    './demo-drop2', './demo-daterangepicker',
		'./demo-treable','./demo-bubble',
		'./demo-upload','./demo-sutable',
		'./demo-timerange','./demo-blend',
        './demo-field','./demo-upload2'],function(Static,http,note,dTable,
								dDrop,dPage,dBread,dTabs,
								dSinput,dTip,dAlert,dConfirm,
								dPrompt,dTree,dVL,dSearch,
								dGallery,dProgressbar,dvList2,dDrop2, 
								daterangepicker,treable,dbubble,
							    upload,sutable,timerange,blend,field,upload2){
	var dom ={
		concrate:function(hwdL,hwdC,arr){
			var lis = '';
			var ctns = '';
			var _index = 0

			arr.forEach(function(da,index){

				if(typeof da.submenu !== "undefined") {
					if(da.submenu.length === 0 ) {
						lis += '<ul><li role="presentation"><a data-part="'+da.part+'" href="#menu'+index+'" aria-controls="menu'+index+'" role="tab" data-toggle="tab"><div class="menu_icon icon_'+da.id+'">'+da.name+'</div></a></li></ul>'; 
						ctns +='<div role="tabpanel" class="tab-'+da.part+'  tab-pane '+(index==0?"active":"")+'" id="menu'+index+'">loading...</div>';
					} else {
						lis += '<ul><li><div class="menu_icon icon_'+da.id+'">'+da.name+'</div><ul>'; 
						da.submenu.forEach(function(item, subIndex){

							_index ++;
							lis += '<li role="presentation" '+(_index==0?"class=active":"")+'>\
							<a  data-part="'+item.part+'" href="#menu'+_index+'" aria-controls="menu'+_index+'" role="tab" data-toggle="tab">'+item.name+'</a></li>'; 
							ctns +='<div role="tabpanel" class="tab-'+item.part+'  tab-pane '+(_index==0?"active":"")+'" id="menu'+_index+'">loading...</div>';
						})
						lis += '</ul></li></ul>'; 
					}
				} else {
					lis += '<li role="presentation" '+(index==0?"class=active":"")+'>\
					<a  data-part="'+da.part+'"  href="#menu'+index+'" aria-controls="menu'+index+'" role="tab" data-toggle="tab">'+da.name+'</a></li>'; 
					ctns +='<div role="tabpanel" class="tab-'+da.part+' tab-pane '+(index==0?"active":"")+'" id="menu'+index+'">loading...</div>';
				}


			});
			hwdL.html(lis);// 配置部分的tab列表
			hwdC.html(ctns); //配置部分的内容  右侧
		},
		/**
		**@param {String} url 
		**@param {int} tabIndex 选中的第几个tab
		**@param {jQuery} parentDOM 
		**/
		live:function(name,tabIndex){
			var RE = new RegExp("js-.+","i");
			if(RE.test(name)){
				var plugin = name.match(/js-(.+)/i)[1];
				if(plugin=="start") plugin = "table";
				require([plugin],function(){
					switch(plugin){
						case "table":
						case "start":
							dTable();//演示用的 table 实例化
							break;
						case "drop":
							dDrop();//演示用的 drop 实例化
							break;
						case "page":
							dPage();
							break;
						case "bread":
							dBread();
							break;
						case "tabs":
							dTabs();
							break;
						case "sinput":
							dSinput();
							break;
						case "tip":
							dTip();
							break;
						case "alert":
							dAlert();
							break;
						case "confirm":
							dConfirm();
							break;
						case "prompt":
							dPrompt();
							break;
						case "tree":
							dTree();
							break;
						case "vList":
							dVL();
							dvList2();
							break;
						case "search":
							dSearch();
							break;
						case "gallery":
							dGallery();
							break;
						case "progressbar":
							dProgressbar();
							break;
						case "vList2":
							dvList2();
							break;
						case "drop2":
							dDrop2();
							break;
						case "daterangepicker":
							daterangepicker();
							break;
						case "treable":
							treable();
							break;
						case "bubble":
							dbubble();
							break;
						case "popconfirm":
							dbubble();
							break;
						case "upload":
							upload();
							break;
						case "sutable":
							sutable();	
							break;
						case "timerange":
							timerange();
							break;
						case "blend":
							  blend();	
							break;
                        case "field":
                            field();
                            break;
                        case "upload2":
                            upload2();
                            break;
					}
					prettyPrint();//渲染 代码 
				});
			};		


			$('[data-toggle="tab"]').on("click", function(e){
				$('[role="presentation"]').removeClass("active")
				$(this).addClass("active")
			})

			$(".menu_icon").off("click").on("click",function(e){
				console.log(e)
				var $ul = $(this).closest("ul") 
				$ul.toggleClass("unexpand")
			})
		}
	};
	
	extend(ComTab,Combine);// 继承
	function ComTab(){
		var _this = this;
		var _super = arguments.callee.parent;//父类
		this.itemIndex = 0;//最上面导航栏菜单第几个
		this.tabIndex  = 0;//点击 左侧tab 第几个
		this.init = function(){
			_super.init.call(this);
			_this._DOM = $("div[data-combine='tab']");
			_this._SUB_DOM1 = _this._DOM.find("#tabList");
			_this._SUB_DOM2 = _this._DOM.find("#tabContents");
			_this._DOM.on("show.bs.tab",function(e){
				_this.tabIndex = $(e.target).parent().index()||0;//tabList  点击的是第几个
				var part  = $(e.target).attr("data-part");//tabList  点击的是第几个
				_this.currentPart = part

				if(part){//如果内容为空
					var url   = "./partials/" + part+".html";
					http.exec(url);//请求 dom 模板
				}
			});
		}
		 
		this.update = function(msg){
			_this.itemIndex = msg.data.index-1;//第几个菜单
			_this.tabIndex = 0;
			_this._DOM.attr("value",msg.data.index);
			dom.concrate(_this._SUB_DOM1,_this._SUB_DOM2,Static.TABS[msg.data.index-1]);
			var url   = "./partials/" + Static.TABS[_this.itemIndex][0].part+".html";
			http.exec(url);//加载模板
		}
		
		/***	
		**网络层返回消息处理
		**/
		this._react = function(msg){
			var Note = note.constructor;
			var noti = note.notification;
			switch(msg.name||noti.name){
				case Note.STATIC_HTML:
					var na = _this.currentPart;//模板的名字
					if(na && $(_this._SUB_DOM2).find(".tab-"+na).length){
						$(_this._SUB_DOM2).find(".tab-"+na).addClass("active").html(msg.data||noti.data);//填充 返回的dom 模板

					}else{
						$(_this._SUB_DOM2).children().eq(0).addClass("active").html(msg.data||noti.data);//填充 返回的dom 模板
						$(".nav-wrapper [data-toggle=tab]:first").click()

					}
					dom.live(na,_this._tabIndex);
					break;
				case Note.PLAIN_JSON:
					break;
				case Note.PLAIN_XML:
					break;
				case Note.PLAIN_STRING:
					break;
			}
		}
		
	};
	return new ComTab;
});