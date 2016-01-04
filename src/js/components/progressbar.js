;
(function($) {
    var self = this;

    var tpl = '<div class="progress">\
		  <div class="progress-bar" role="progressbar">\
		    <span class="sr-only">40% Complete (success)</span>\
		  </div>\
		</div>';


    function Progressbar(element, options) {
        var self = this;
        this.elem = element;
        this.config = $.extend(true, {}, $.fn.page.defaults, options);
        this.init(options);
    };

    Progressbar.prototype = {
    	constructor: 'Progressbar',
    	/**
    	 * 初始化
    	 */
    	init: function () {
    		bindEvent: function(){

    		}
    	},
    	/**
    	 * 绑定事件
    	 */
    	bindEvent: function() {
    		
    	}


    }

    $.fn.progressbar.default = {
        css: '',

    };
})(jQuery)
