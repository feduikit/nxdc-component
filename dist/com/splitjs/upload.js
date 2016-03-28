;
(function($, window, undefined) {
    function FileUpload(config) {
        var self = this;
        $.extend(this, config);
        return this.init(config);
    }

    FileUpload.prototype = {
        constructor: 'FileUpload',
        init: function(config) {
            this.$wrapper = $(this.html);
            this.$num = this.$wrapper.find('.upload-num');
            this.$msg = this.$wrapper.find('.upload-msg');
            this.$wrapper.appendTo($(this.container));
            this.$button = $(this.button);
            this.$form = $(this.form);
            this.setSize();
            this.bindEvent();
        },
        createFileInput: function() {
            var self = this;
            var input = document.createElement('input');
            input.type = 'file';
            input.onchange = function(e) {
                e.files = this.files;
                self.drop(e);
                input.onchange = null;
                input = null;
            };
            input.click();
        },
        /**
         * 绑定事件
         */
        bindEvent: function() {
            this.$wrapper
                .on('dragenter', this.dragEnter.bind(this))
                .on('dragleave', this.dragLeave.bind(this))
                .on('dragover', this.dragOver.bind(this))
                .on('drop', this.drop.bind(this))
                .on('click', '.upload-button', this.popFileinput.bind(this));

            this.$button.on('click', this.uploadByButton.bind(this));

            //阻止浏览器默认行。
            $(document).on({
                'dragenter': false,
                'dragover': false,
                'dragend': false,
                'drop': false
            });
        },
        /**
         * 弹出文件选择框
         */
        popFileinput: function() {
            this.beforeSelecting();
            this.createFileInput();
        },
        /**
         * 通过按钮上传文件
         */
        uploadByButton: function() {
            var self = this;
            if (self.file) {
                self.upload.call(self, self.file);
            } else {
                self.error({ msg: self.text.error.none, type: 'file' });
            }
        },
        /**
         * 判断上传的文件是否符合规范
         */
        fileErrorDetect: function(files) {
            var msg = [];
            var file = files[0];
            var dtd = $.Deferred();;
            var self = this;
            var url = null;
            if (files.length < 1) {
                msg.push(self.text.error.none);
            }
            if (files.length > 1) {
                msg.push(self.text.error.number);
            }
            if (this.size < file.size) {
                msg.push(self.text.error.size);
            }
            if (this.type && !new RegExp(this.type, 'igm').test(file.type)) {
                msg.push(self.text.error.type);
            }

            if (msg.length) {
                this.error({ msg: msg.join(self.text.upload.linkword), type: 'file' });
                dtd.reject(false);
            }
            //这里判断是图片，而且可允许的尺寸中有，那么就要判断了
            else {
                url = self.createObjectURL(file);
                if (self.type == 'image') {
                    self.getImgSize(url, function(w, h) {
                        if (self.allowSize.length && self.allowSize.indexOf(w + '*' + h) == -1) {
                            msg.push(self.text.error.allowSize);
                            self.error({ msg: msg.join(self.text.upload.linkword), type: 'file' });
                            dtd.reject(url);
                        } else {
                            self.setSize.call(self, w, h);
                            dtd.resolve(url);
                        }
                    });
                } else {
                    self.setSize.call(self);
                    dtd.resolve(url);
                }
            }
            return dtd;
        },
        /**
         * 上传错误处理
         */
        error: function(e) {
            this.onerror && this.onerror(e);
            this.$wrapper.attr('data-state', 'error');
            this.showMsg(e.msg);
        },
        /**
         * 正在上传
         */
        progress: function(e) {
            if (e.lengthComputable) {
                this.showNum(Math.floor(e.loaded / e.total * 100));
            }
            this.onprogress && this.onprogress(e);
        },
        /**
         * 显示进度数字信息
         */
        showNum: function(num) {
            this.$num.html(num);
        },
        /**
         * 显示提示信息
         */
        showMsg: function(msg) {
            this.$msg.html(msg);
        },
        /**
         * 拖拽进入
         */
        dragEnter: function(e) {
            this.file = null;
            this.beforeSelecting();
            this.ondragenter && this.ondragenter(e);
            e.preventDefault();
        },
        /**
         * 拖拽离开
         */
        dragLeave: function(e) {
            this.ondragleave && this.ondragleave(e);
            e.preventDefault();
        },
        /**
         * 拖拽进入
         */
        dragOver: function(e) {
            this.ondragover && this.ondragover(e);
            e.preventDefault();
        },
        /**
         * 准备上传
         */
        beforeSelecting: function() {
            this.$wrapper.attr('data-state', 'selecting');
            this.showMsg('');

        },
        /**
         * 放下文件时
         */
        drop: function(e) {
            //jquery对event做了封装，但是保留了原来的event,这个event就是e.originalEvent
            var files = Array.prototype.slice.call(e.files || e.originalEvent.dataTransfer.files, 0);
            var self = this;
            self.$wrapper.attr('data-state', 'selected');

            self.ondrop && self.ondrop(e);
            e.preventDefault();

            self.fileErrorDetect(files)
                .done(function(src) {
                    self.file = files[0];
                    self.createPreview.call(self, files[0], src);
                    self.$button.length || self.upload.call(self, files[0]);
                })
                .always(function(src) {
                    //赶紧revoke生成的url
                    src && self.revokeObjectURL(src);
                });
        },
        /**
         * 设置div尺寸
         */
        setSize: function(w, h) {
            var w0 = this.width,
                h0 = this.height;
            var ratio = Math.max(w / w0, h / h0);
            if (w && h) {
                if (ratio > 1) {
                    w0 = w / ratio;
                    h0 = h / ratio;
                } else {
                    w0 = w;
                    h0 = h;
                }
            }
            this.$wrapper.find('.upload-content').css({ width: w0 + 'px', height: h0 + 'px' });
        },
        revokeObjectURL: function(url) {
            if (window.webkitURL) {
                window.webkitURL.revokeObjectURL(url)
            } else if (window.URL) {
                window.URL.revokeObjectURL(url)
            }
        },
        /**
         * 生成url
         */
        createObjectURL: function(file) {　
            var url = null;
            if (window.webkitURL) {
                url = window.webkitURL.createObjectURL(file)
            } else if (window.URL) {
                url = window.URL.createObjectURL(file);
            }
            return url;
        },
        /**
         * 生成预览
         */
        createPreview: function(file, src) {
            var tpl = this.previewTpl;
            var self = this;
            var defaultTpl = {
                image: '<img src="{{src}}">',
                video: '<video src="{{src}}" width ="' + self.width + '" height ="' + self.height + '" controls></video>'
            }
            if (!!tpl) {
                if ($.isFunction(tpl)) {
                    tpl = tpl(file, src);
                } else if ($.type(tpl) == 'string') {
                    tpl = tpl.replace('{{src}}', src);
                }
            } else if (this.type) {
                tpl = defaultTpl[this.type].replace('{{src}}', src);
            }
            this.$wrapper.find('.upload-preview').html(tpl);

        },
        /**
         * 获取图片的宽高
         */
        getImgSize: function(src, callback) {
            var img = new Image();
            img.onreadystatechange = img.onload = function() {
                if (img.complete || img.readystate == "complete" || img.readystate == "loaded") {
                    callback(parseInt(img.naturalWidth || img.width, 10), parseInt(img.naturalHeight || img.height, 10));
                    img.onload = img.onreadystatechange = null;
                }
            }
            img.src = src;
        },
        /**
         * 文件上传
         */
        upload: function(file) {
            var self = this;
            var ajaxOption = $.extend({
                dataType: 'json',
                type: 'post',
                contentType: false,
                processData: false,
                xhr: function() {
                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = true;
                    self.$wrapper.attr('data-state', 'uploading');
                    self.showMsg(self.text.upload.uploading);
                    xhr.upload.onprogress = self.progress.bind(self);
                    return xhr;
                }
            }, self.ajax);

            //这里生成一次data
            var fd = this.$form.length ? new FormData(this.$form) : new FormData();
            fd.append(self.name, file);
            $.each(ajaxOption.data || {}, function(k, v) {
                fd.append(k, v);
            });
            //将data赋值为formdata
            ajaxOption.data = fd;
            $.ajax(ajaxOption)
                .done(function(data) {
                    self.$wrapper.attr('data-state', 'uploaded');
                    self.showMsg(self.text.upload.success);
                    self.showNum('0');
                    self.onload && self.onload.call(self, data);
                })
                .fail(function(xhr, status, err) {
                    self.error.call(self, { msg: xhr.responseText, type: 'ajax', textStatus: status, xhr: xhr, error: err });
                })
                .always(function() {
                    self.file = null;
                })
        }

    }

    $.fn.fileupload = function(options) {
        var returnVal = this;
        //这里链接字符串
        //生成html属性
        $.fn.fileupload.defaults.html || tplLink();
        this.each(function(key, the) {
            new FileUpload($.extend({ container: the }, $.fn.fileupload.defaults, options));
        })
        return returnVal;
    };


    $.fn.fileupload.defaults = {
        text: {
            upload: {
                uploading: '正在上传',
                success: '添加成功',
                tips: '文件拖放到这里',
                linkword: '或者',
                descUploading: '上传中',
                descButton: '上传',
                agButton: '重新上传'
            },
            error: {
                type: '文件类型不正确',
                size: '文件大小超过限制',
                number: '文件数超过一个',
                none: '没有要上传的文件',
                allowSize: '宽高尺寸有问题'
            }
        },
        //这里是上传按钮
        //如果有,则给按钮绑定上传事件，当按钮点击时则上传
        //如果没有，则拖放后立即上传
        button: false,
        //这里看是否需要通过form来创建上传数据
        form: false,
        name: 'file',
        type: 'image',
        width: 560,
        height: 250,
        size: 10485760, //默认上传大小不超过10M
        allowSize: [], //这是里默认什么尺寸的，只针对图片起效
        tpl: '<div class="upload-wrapper" data-state="prepare">\
                    <div class="upload-content">\
                        <div class="upload-desc">\
                            <div class="upload-desc-inner">\
                                <p class="upload-icon"></p>\
                                <p>{{text.upload.tips}}</p>\
                                <p class="small">{{text.upload.linkword}}</p>\
                                <button class="upload-button" type="button">{{text.upload.descButton}}</button>\
                            </div>\
                        </div>\
                        <div class="upload-preview">\
                        </div>\
                        <div class="upload-mask">\
                            <div class="upload-mask-inner">\
                                <p class="upload-num">0</p>\
                                <p>{{text.upload.descUploading}}</p>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="upload-footer">\
                        <span class="upload-msg"></span>\
                        <button class="upload-button upload-button-go" type="button">{{text.upload.descButton}}</button>\
                        <button class="upload-button upload-button-other" type="button">{{text.upload.agButton}}</button>\
                    </div>\
                </div>'
    }

    //模板生成函数
    function tplLink() {
        var defaults = $.fn.fileupload.defaults;
        var textUpload = defaults.text.upload;
        defaults.html = defaults.tpl.replace(/{{text\.upload\.tips}}/ig, textUpload.tips)
            .replace(/{{text\.upload\.linkword}}/ig, textUpload.linkword)
            .replace(/{{text\.upload\.descButton}}/ig, textUpload.descButton)
            .replace(/{{text\.upload\.descUploading}}/ig, textUpload.descUploading)
            .replace(/{{text\.upload\.agButton}}/ig, textUpload.agButton);
    }
})(jQuery, window, undefined)
