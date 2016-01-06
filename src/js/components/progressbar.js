;(function($) {
    var self = this;

    var tpl = '<div class="{{css}}" data-progressbar-shape="{{shape}}">\
    			<div class="progress progressbar-auto">\
					<div class="progress-bar" role="progressbar" style="width: {{progress}}">\
					</div>\
				</div>\
				<div class="progressbar-circle">\
					<div class="progressbar-pie-left">\
						<div class="progressbar-left">\
						</div>\
					</div>\
					<div class="progressbar-pie-right">\
						<div class="progressbar-right">\
						</div>\
					</div>\
					<div class="progressbar-mask"></div>\
				</div>\
			</div>';


    function Progressbar(element, options) {
        var self = this;
        this.$elem = $(element);
        this.config = $.extend(true, $.fn.progressbar.defaults, {
            css: this.$elem.attr('data-progressbar-css'),
            progress: this.$elem.attr('data-progressbar-progress')
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
            this.$progress = $(tpl.replace("{{css}}", this.config.css)
                .replace("{{progress}}", this.config.progress)
                .replace("{{shape}}", this.config.shape));
            this.$bar = this.$progress.find('.progress-bar');
            this.$circle = this.$progress.find('.progressbar-circle');
            this.setShape(this.config.shape);
            this.buildDom();
            this.bindEvent();
        },
        /**
         * 绑定事件
         */
        bindEvent: function() {
            this.listenProgress();
        },
        /**
         * 生成dom树
         */
        buildDom: function() {
            this.$elem.append(this.$progress);

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
        },
        /**
         * 获取进度
         */
        getProgress: function() {
            return this.config.progress;
        },
        /**
         * 监听进度
         */
        listenProgress: function() {
            var _this = this;
            var MutationObserver = window.MutationObserver ||
                window.WebKitMutationObserver ||
                window.MozMutationObserver;

            var mutationObserverSupport = !!MutationObserver;
            if (mutationObserverSupport) {
                var mo = new MutationObserver(function(records) {
                    mo.disconnect();
                    records.map(function(record) {
                        var $target = record.target;
                        var progress = 0;
                        progress = $(this).hasClass('progressbar-mask') ? $target.dataset.progress : $target.style.width;
                        progress && _this.setProgress(progress);
                    });
                    _this.listenProgress();
                });
                mo.observe(this.$bar.get(0), {
                    attributeFilter: ['style']
                });
                mo.observe(this.$progress.find('.progressbar-mask').get(0), {
                    attributeFilter: ['data-progress']
                })
            }
        },
        /**
         * 设置形状
         */
        setShape: function(shape) {
            var attrShape = 'data-progressbar-shape';
            this.config.shape = shape;
            this.$progress.attr(attrShape, shape).parents('[' + attrShape + ']').attr(attrShape, shape);
        },
        /**
         * 获取形状
         */
        getShape: function() {
            return this.config.shape;
        }
    }
    $.fn.progressbar = function(options, value) {
        var returnVal = this;
        this.each(function(key, the) {
            if (!the.progressbarInstance) {
                the.progressbarInstance = new Progressbar(the, options);
            } else {
                if (options == 'progress') {
                    if (value) {
                        the.progressbarInstance.setProgress(value);
                    } else {
                        returnVal = the.progressbarInstance.getProgress();
                    }
                } else if (options == 'shape') {
                    if (value) {
                        the.progressbarInstance.setShape(value);
                    } else {
                        returnVal = the.progressbarInstance.getShape();
                    }
                }
            }

        })
        return returnVal;
    };

    $.fn.progressbar.defaults = {
        css: '',
        progress: 0,
        shape: 'circle'
    };
})(jQuery)
