/*jslint evil: true */
(function(){
  if ( typeof window.CustomEvent === "function" ) return false;
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
}());

/***
**@Kernel {Class}
** 页面逻辑处理的核心基类
**/
define(['note'],function(note){
	window.inherit = Object.create||function(proto){
		function F(){ };
		F.prototype = proto;
		return new F();
	};
	window.extend = function(Child, Parent){
		Child.prototype = inherit(Parent.prototype);
		Child.prototype.constructor = Child;
		Child.parent = Parent.prototype;
	};
	Event.prototype.data = {};//默认有一个
	window.fireEvent = window.dispatch = function(ta,type,data,bub){
		ta = ta || document;
		try{
			var evt = new Event(type,{bubbles:bub||true});
		}catch(err){
			evt = new CustomEvent(type,{bubbles:bub||true})
		}
		evt.data = data || {name:"unknow"};
		ta.dispatchEvent(evt);
	}
	/***
	**@constructor {Class} Base
	**/	
	function Base(){};
	/**
	**@ 和其他同类对象之间的通信 交流 
	**/
	Base.prototype._exchange = function(){}
	/**
	**@property {DOM poniter} _DOM
	**/
	Base.prototype._DOM = null;
	/**
	**@property {Array} _child   孩子列表
	**/
	Base.prototype.children = [];	
	/**
	**@初始化
	**/
	Base.prototype.init = function(){};
	/***
	**@更新
	**/
	Base.prototype.update = function(msg){
		this.children.forEach(function(child){
			if(child && child.update) child.update(msg);
		});	
	};
	/**
	**@湮灭
	**/
	Base.prototype.destory = function(){};		
	/**
	**@重置
	**/
	Base.prototype.reset = function(){};
	/**
	**@ 发送消息
	**/
	Base.prototype.notify = function(msg){
		this.children.forEach(function(child){
			if(child && child.notify) child.notify(msg)
		});	
	}
	/**
	**@constructor {class} Page  单例  
	** represent the whole page 表示整个页面  DOM 引用整个document
	** 主要功能： 启动应用，初始化，启动所需环境
	** page 由一个或多个 piece 构成
	**/
	window.Page = function(){ arguments.callee._instance = this;};		
	extend(Page,Base);
	Page.notification  = {};
	Page.prototype.startup = function(){
		this.init();
		this.children.forEach(function(piece){
			piece.init();
		});		
	};
	
	Page.prototype.notify = function(msg){
		if(Object.observe){
			note.notification = msg;
		}else{
			Base.prototype.notify.call(this,msg);
		}
	}
	/**
	**@constructor {Class} Piece  区域
	**represent a piece of the Page, 表示页面一个大的区域，DOM 引用为这一区域
	** 例如将一个页面划分成，header,footr,aside（子区域）, article（子区域）,body区域
	** piece 由一个或多个子区域构成 或者 由一个或多个segment 片段构成 
	** 一个piece  包含一个或多个业务集群
	**/
	window.Piece = function(){};
	extend(Piece,Base);
	/**
	**Piece  初始化
	**调用 孩子的初始化方法
	**/
	Piece.prototype.init = function(){
		var _this = this;
		this.note = note;
		this.children.forEach(function(child){//child = segment
			child.init();
		});
		if(Object.observe){
			Object.observe(note,this._react);
		}
	}
	/**
	**收到通知之后的处理
	** 先看下通知，在这一层时候需要处理，然后继续广播
	*/
	Piece.prototype.notify = function(msg){
		this._react(msg);	
		Base.prototype.notify.call(this,msg);
	}
	/**
	**调整位置，大小，背景颜色
	**/
	Piece.prototype.adjust = function(){}
	/**
	**处理 XHR 消息
	**@param {Notification Object} msg
	**/
	Piece.prototype._react = function(){}
	/**
	**@constructor {Class} Segment  片段
	**represent a part of Piece, 代表区域的一部分
	** 一个segment 由一个或多个combine 或者 一个或多个component 构成
	** 一个segment 只包含一个业务集群
	**/
	window.Segment = function(){};	
	extend(Segment,Piece);	
	/**
	**@constructor {Class} Combine 组合
	**一个组合 包含 多个【组件】或【元件组合】
	**/
	window.Combine = function(){};		
  	extend(Combine,Piece);		
});
