/*
 * @Author: mikey.zhaopeng
 * @Date:   2016-02-25 18:11:32
 * @Last Modified by:   mikey.zhaopeng
 * @Last Modified time: 2016-03-04 12:47:54
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
    };

    SidePanel.prototype.show = function() {
        this.$elem.addClass('with-full-sidepanel-panel');
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
        self.$elem.off('click', '.sidepanel-panel .close,.sidepanel-panel .btn-default').on('click', '.sidepanel-panel .close,.sidepanel-panel .btn-default', function(e) {
            self.hide();
        });
        self.$elem.off('click', '.sidepanel-panel .btn-primary').on('click', '.sidepanel-panel .btn-primary', function(e) {
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
            '        </div>' +
            '        <div class="panel-body">' +
            '            Panel content' +
            '        </div>' +
            '        <div class="panel-footer">' +
            '            <div class="btn-toolbar pull-right" role="toolbar" aria-label="Toolbar with button groups">' +
            '                <button type="button" class="btn btn-primary">确定</button>' +
            '                <button type="button" class="btn btn-default">取消</button>' +
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
