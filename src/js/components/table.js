;
(function($) { //start with a [;] because if our code is combine or minification  with other code,AND other code not terminated with [;] then it will not infect ours.
    var self = this;
    var rats = [];
    var sortString = '<div class="sort-direct">\
						<i class="glyphicon glyphicon-triangle-top"></i>\
						<i class="glyphicon glyphicon-triangle-bottom active"></i>\
					 </div>';

    function fill(arr, row) {
        var args = arguments;
        if (arr instanceof Array) {
            for (var i = 0; i < arr.length; i++) {
                var o = arr[i];
                var text = (typeof(o) == "string" || typeof(o) == "number") ? o : (o.name || o.txt);
                if (args[2]) {
                    var col = $('<span class="ndp-table-col" title="' + text + '" col=' + i + ' ><span class="head-txt">' + text + '</span></span>');
                } else {
                    col = $('<span class="ndp-table-col" title="' + text + '" col=' + i + ' >' + text + '</span>');
                }
				if(/^<img/i.test(text)){
					col.removeAttr("title");
				}
                row.append(col);
            }
        } else {
            Object.keys(arr).forEach(function(item, index) {
                if (args[2]) {
                    col = $('<span class="ndp-table-col" title="' +arr[item]+ '" col=' +index+ ' ><span class="head-txt">' + arr[item] + '</span></span>');
                } else {
                    col = $('<span class="ndp-table-col" title="' +arr[item]+ '" col=' +index+ '>' + arr[item] + '</span>');
                }
				if(/^<img/i.test(arr[item])){
					col.removeAttr("title");
				}				
                row.append(col);
            });
        }
        return row;
    }


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
        var self = this;
        this.elem.addClass(this.config.containerClass); //设置 包裹容器的 dim,外观
        this.head = $("<ul>").addClass(this.config.headClass); //列表头
        this.body = $("<ul>").addClass(this.config.bodyClass); //列表的内容部分
        this.buildHead(); //构建 列表头
        this.buildBody(this.config.data); //构建列表体
        this.elem.append(this.head).append(this.body);
        this.initConfig();


        //监听用户交互

        /***
         **  用户点击排序
         ***/
        this.head.find(".sort-direct").click(function(e) {
            e.stopPropagation();
            var fa = $(this).parent();
            fireEvent($(this).get(0), "SORT_CHANGE", { col: parseInt(fa.attr("col")), name: fa.attr("title") });
        });

        /***
         ** 用户点击 一行
         ***/
        this.body.find(".ndp-table-row").click(function(e) {
            //e.stopPropagation();
            var row = $(this).index(); //第几行
            fireEvent($(this).get(0), "ROW_CLICK", { row: row }); //第几行被点击
        });

        /***
         ** 允许选中列的，一列被点击
         ***/
        this.head.find(".ndp-table-col").click(function(e) {
            fireEvent($(this).get(0), "COL_CLICK", { col: parseInt($(this).attr("col")), name: $(this).attr("title") }); //第几行被点击
        });
    };

    /***
     ** 构建列表头部
     **/
    Table.prototype.buildHead = function() {
        var self = this;
        var count = 0; //列表头的 字符串的总长度
        var arr = this.config.head;
        this.textLen = [];
        if (arr instanceof Array) { //如果 列表头是  数组
            for (var i = 0; i < arr.length; i++) {
                var o = arr[i];
                var len = (typeof(o) == "string") ? o.length : (o.name || o.txt).length;
                self.textLen.push(len);
                count += len;
            }
        } else { //如果列表头是 {}  对象
            Object.keys(arr).forEach(function(item) {
                len = arr[item].length;
                self.textLen.push(len);
                count += len;
            });
        }
        this.textLen.forEach(function(item, i) { self.textLen[i] = ((item / count) * 100).toFixed(1) });
        this.head.append(fill(arr, $('<li class="ndp-table-row">'), 1));
        if (this.config.sort == "all") {
            self.head.find("li.ndp-table-row>span").append(sortString);
        } else if (this.config.sort instanceof Array) {
            this.config.sort.forEach(function(item) {
                self.head.find("li.ndp-table-row>span:nth-child(" + (item + 1) + ")")
                    .append(sortString);
            });
        }
        this.head.find("span.ndp-table-col:not(:nth-last-child(1))").append('<i class="col-spliter"></i>');
        this.textLen.forEach(function(item, index) {
            self.head.find("span.ndp-table-col:nth-child(" + (index + 1) + ")").css("width", item + "%");
        });
    };

    /**
     ** 构建列表体
     **/
    Table.prototype.buildBody = function(data) {
        var self = this;
        for (var n = 0; n < data.length; n++) {
            var row = $('<li class="ndp-table-row">');
            if (this.config.activeRow >= 0 && this.config.activeRow == n) {
                row.addClass("active");
            }
            var dat = data[n];
            self.body.append(fill(dat, row));
        }
        self.head.find("span.ndp-table-col").each(function(idx, item) {
            var pec = parseFloat($(item).attr("style").match(/([\d.]+?)\%/i)[1]);
            self.body.find("span.ndp-table-col:nth-child(" + (idx + 1) + ")").css("width", pec + "%");
        });
    };

    /***
     ** 根据用户设置的 设置列表拥有的能力，比如 点击行，点击列，拖动等
     **/
    Table.prototype.initConfig = function() {
        var self = this;
        var cfg = this.config;
        //设置列的样式
        if (cfg.colClass) {
            this.elem.find("li>span.ndp-table-col").addClass(cfg.colClass);
        }
        //表头被点击，选中一列
        if (cfg.colNail) {
            //列的click、hover效果
            this.head.find("span.ndp-table-col").unbind("click").click(function(e) {
                    var index = $(this).index();
                    self.elem.find("span.ndp-table-col").removeClass("active");
                    self.elem.find("span.ndp-table-col:nth-child(" + (index + 1) + ")").addClass("active");
                })
                .unbind("mouseenter").mouseenter(function(e) {
                    var index = $(this).index();
                    self.elem.find("span.ndp-table-col:nth-child(" + (index + 1) + ")").addClass("ndp-table-col-hover");
                }).unbind("mouseleave").mouseleave(function(e) {
                    var index = $(this).index();
                    self.elem.find("span.ndp-table-col:nth-child(" + (index + 1) + ")").removeClass("ndp-table-col-hover");
                });
        }

        //默认选中一列
        if (cfg.colNail && cfg.activeCol >= 0) {
            this.head.find("li>span.ndp-table-col:nth-child(" + (cfg.activeCol + 1) + ")").addClass("active");
            this.body.find("li>span.ndp-table-col:nth-child(" + (cfg.activeCol + 1) + ")").addClass("active");
        }
		// 允许选中一行
        if (cfg.rowNail) {
            this.body.find("li.ndp-table-row").unbind("click").click(function() {
                    $(this).hasClass("ndp-table-row-hover") ? $(this).removeClass("ndp-table-row-hover") : $(this).addClass("ndp-table-row-hover");
                    $(this).siblings().removeClass("ndp-table-row-hover");
					self.body.find("li.active").removeClass("active");
					$(this).addClass("active");
			})
			.unbind("mouseenter").mouseenter(function() {
				$(this).addClass("ndp-table-row-hover");
			})
			.unbind("mouseleave").mouseleave(function() {
				$(this).removeClass("ndp-table-row-hover")
			});
        }
		
        this.body.find("li.ndp-table-row").unbind("mouseenter").mouseenter(function() {
                $(this).addClass("ndp-table-row-hover");
            })
            .unbind("mouseleave").mouseleave(function() {
                $(this).removeClass("ndp-table-row-hover")
            });

        if (cfg.listHeight && parseFloat(cfg.listHeight)) { //如果超出边界，会出现纵向滚动条
            var rh = this.head.find("li.ndp-table-row").height() + 2;
            var h = (parseFloat(cfg.listHeight) - rh)
            this.body.css("height", h + "px");
            if (this.body.children().length * 40 > h) {
                var w = this.body.width();
                this.body.find("li.ndp-table-row").width(w - 15);
            }
        }

        // 列表可以按照 某一列进行排序
        if (cfg.sort) {
            var keys = Object.keys(cfg.data[0]);
            this.head.find(".sort-direct").unbind("click").click(function(e) {
                var span = $(this).parent();
                var idx = span.index(); //第几个 span
                span.siblings().find(".sort-direct>i.glyphicon-triangle-bottom").addClass("active");
                span.siblings().find(".sort-direct>i.glyphicon-triangle-top").removeClass("active");
                var ta = $(this).find(".glyphicon.active");
                ta.removeClass("active")
                    .siblings("i.glyphicon").addClass("active");
                var asc = (ta.hasClass("glyphicon-triangle-bottom")) ? false : true;
                self.body.empty();
                if (!isNaN(cfg.data[0][keys[idx]])) {
                    cfg.data.sort(function(a, b) {
                        return asc ? (a[keys[idx]] - b[keys[idx]]) : (b[keys[idx]] - a[keys[idx]]);
                    });
                } else {
                    cfg.data.sort(function(a, b) {
                        return asc ? b[keys[idx]].localeCompare(a[keys[idx]]) : a[keys[idx]].localeCompare(b[keys[idx]]);
                    });
                }
                self.buildBody(cfg.data);
            });
        }
        /***
         ** 拖动spliter 缩放表格宽度
         **/
        this.head.find("i.col-spliter").unbind("mousedown").mousedown(function(e) {
            e.preventDefault();
            var the = $(this).parent();
            var nextCol = the.next();
            var preCol = the.prev();
            var index = the.index();
            var liw = self.elem.find("li.ndp-table-row").width(); //行宽度
            self.elem.find("span.ndp-table-col:nth-child(" + (index + 1) + ")").addClass("highLight");
            var next = self.elem.find("span.ndp-table-col:nth-child(" + (index + 2) + ")");
            var the = self.elem.find("span.ndp-table-col:nth-child(" + (index + 1) + ")");
            var all = [];
            self.head.find("span.ndp-table-col").each(function(idx, item) {
                all.push(parseFloat($(item).attr("style").match(/([\d.]+?)\%/i)[1]));
            });
            $(document).unbind("mousemove").mousemove(function(e) {
                var o = the.get(0).getBoundingClientRect();
                var no = next.get(0).getBoundingClientRect();
                var ntw = e.pageX - o.left;
                var nxw = no.right - e.pageX;
                if (ntw > 80 && nxw > 80 && Math.abs(e.pageX - o.right) >= 1) { //最小值是80px
                    var val1 = ((ntw / liw) * 100).toFixed(2);
                    var val2 = (eval(all.concat().splice(index, 2).join("+")) - val1).toFixed(2);
                    the.css("width", val1 + "%");
                    next.css("width", val2 + "%");
                }
            });
        });
        $(document).unbind("mouseup").on("mouseup", function() {
            $("span.ndp-table-col.highLight").removeClass("highLight");
            $(document).unbind("mousemove");
        });
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
        this.update = function(data) {
            table.body.empty();
            table.buildBody(data);
            return table.elem;
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
        containerClass: "",
        headClass: "ndp-table-header",
        bodyClass: "ndp-table-body",
        colClass: "", //列样式
        rowNail: false, //是否允许 选中一行
        colNail: false, //是否允许 选中一列
        activeRow: NaN, //默认选中第几行
        activeCol: NaN, //默认选中第几列
        rowHeight: null, //列表每一行的高度  默认行高40px
        listHeight: null, //设置列表高度，或者修改 ndp-table-wrapper class的高度
        sort: null //“all” 所有列 都可以进行排序，【1，3，5】只有1，3，5列进行排序
    };
}(jQuery));
