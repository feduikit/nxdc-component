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
