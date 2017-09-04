define(function(){
	extend(Spliter,Segment);
	function Spliter(){
		var _this = this;
		var _super = arguments.callee.parent;
		
		this.init = function(){
			_this._DOM = $("div[data-segment='spliter']");
			/***
			** 全选 点击之后
			**/
			_this._DOM.find("span>label").click(function(e){
				
			});
		}
		
		this.update = function(msg){
			_this._DOM.find("span.config-title").text(msg.data.name);
			if(msg.type == "btn_dl_click"){
				_this._DOM.find("span.config-check").removeClass("hidden");
			}else{
				_this._DOM.find("span.config-check").addClass("hidden");
			}
		}
	}
	return new Spliter();
});