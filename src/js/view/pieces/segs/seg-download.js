define(function(){
	extend(Download,Segment);
	function Download(){
		var _this = this;
		var _super = arguments.callee.parent;
		this.init = function(){
			_this._DOM = $("div[data-segment='dl-buts']");
			/**
			** 源码下载
			**/
			_this._DOM.find("button#src-dl").click(function(e){
				window.location.href = "../assets/src.zip";
			});
			/***
			** 压缩合并后代码下载
			**/
			_this._DOM.find("button#compress-dl").click(function(){
				window.location.href = "../assets/compile.zip";
			});
			/**
			**用户自定义配置下载
			**/
			_this._DOM.find("button:nth-child(3)").click(function(){
				var evt = new Event("btn_dl_click",{bubbles:true});
				evt.data.name = "自定义配置";
				evt.data.index = this.index();
				this.dispatchEvent(evt);
			});
				
		}
	}
	return new Download;
});