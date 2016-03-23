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