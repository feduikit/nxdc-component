/**
**@constructor {Page} Create
** represent the whole page
**/
define(['./pieces/global-piece-header',
		'./pieces/global-piece-main'],function(header,main){
	extend(Create,Page);//继承 保持和 class-instance 分离语言的继承感觉。 放在最上面，因为
	function Create(){
		var _this = this;
		var _super = arguments.callee.parent;
		/**
		** 初始化页面配置
		**/
		this.init = function(){
			_this._DOM = document;//当前这个类 hold住的前端引用
			_this.children = [header,main];//获得 piece 实例的引用
			$(document).on("com_li_click btn_dl_click",function(e){
				_this.children.forEach(function(child){
					child.update(e.originalEvent||e);
				});					
			});
			//监听来自网络层的消息
			document.addEventListener("NEW_MSG",function(e){
				_this.notify(e.data);//这个地方会去调用父类的 notify方法 ，Page  
			});
		};
	}
	return new Create();
});