function FileUpload(config) {
    var self = this;
    $.extend(this, {
        name: 'file',
        type: 'image',
        width: 560,
        height: 250,
        size: 10485760, //默认上传大小不超过10M
        allowSize: [], //这是里默认什么尺寸的，只针对图片起效
        html: '<div class="upload-wrapper" data-state="prepare">\
                    <div class="upload-content">\
                        <div class="upload-desc">\
                            <div class="upload-desc-inner">\
                                <p class="upload-icon"></p>\
                                <p>图片拖放到这里</p>\
                                <p class="small">或</p>\
                                <button class="upload-button" type="button">上传</button>\
                            </div>\
                        </div>\
                        <div class="upload-preview"></div>\
                        <div class="upload-mask">\
                            <div class="upload-mask-inner">\
                                <p class="upload-num">0</p>\
                                <p>上传中</p>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="upload-footer">\
                        <span class="upload-msg"></span>\
                        <a herf="javascript:void(0);" class="upload-button btn-link" type="button">重新上传</a>\
                    </div>\
                </div>'
    }, config);
    return this.init(config);
}

FileUpload.prototype = {
    constructor: 'FileUpload',
    init: function(config) {
        var defaultTpl = {
            image: '<img src="{{src}}">',
            video: '<video src="{{src}}" width ="' + self.width + '" height ="' + self.height + '"></video>'
        }
        this.$wrapper = $(this.html);
        this.$num = this.$wrapper.find('.upload-num');
        this.$msg = this.$wrapper.find('.upload-msg');
        this.$wrapper.appendTo($(this.container));
        this.setSize();
        this.previewTpl = this.previewTpl || (this.type && defaultTpl[this.type]);
        this.bindEvent();
    },
    createFileInput: function() {
        var self = this;
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = function(e) {
            e.files = this.files;
            self.drop(e);
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
            .on('click', '.upload-button', this.popFileSelect.bind(this))
            //阻止浏览器默认行。
        $(document).on({
            'dragenter': false,
            'dragover': false,
            'dragend': false,
            'drop': false
        });
    },
    popFileSelect: function() {
        this.$wrapper.attr('data-state', 'selecting');
        this.createFileInput();
    },
    /**
     * 判断上传的文件是否符合规范
     */
    dragDetectDeferred: function(files) {
        var msg = null;
        var file = files[0];
        var dtd = $.Deferred();;
        var self = this;
        if (files.length < 1) {
            msg = '没有要上传的文件';
        } else if (files.length > 1) {
            msg = '文件数超过一个';
        } else if (this.size < file.size) {
            msg = '文件大小超过限制';
        } else if (this.type && !new RegExp(this.type, 'igm').test(file.type)) {
            msg = '文件类型错误';
        }

        if (msg) {
            this.error({ msg: msg, type: 'file' });
            dtd.reject(false);
        }
        //这里判断是图片，而且可允许的尺寸中有，那么就要判断了
        else {
            self.getURLDeferred(file).done(function(src) {
                self.getImgSize(src, function(w, h) {
                    if (self.type == 'image' && self.allowSize.length && self.allowSize.indexOf(w + '*' + h) == -1) {
                        self.error({ msg: '文件尺寸不正确', type: 'file' });
                        dtd.reject(false);
                    } else {
                        self.setSize.call(self, w, h);
                        dtd.resolve(src);
                    }
                })
            });
        }
        return dtd;
    },
    /**
     * 上传处理
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
        this.$wrapper.attr('data-state', 'selecting')
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
     * 放下文件时
     */
    drop: function(e) {
        //jquery对event做了封装，但是保留了原来的event,这个event就是e.originalEvent
        var files = Array.prototype.slice.call(e.files || e.originalEvent.dataTransfer.files, 0);
        var self = this;
        this.$wrapper.attr('data-state', 'selected')
        this.ondrop && this.ondrop(e);
        e.preventDefault();

        this.dragDetectDeferred(files).then(function(src) {
            self.createPreview.call(self, files[0], src);
            self.upload.call(self, files[0], src);
        }, function() {
            self.createPreview.call(self, false)
        });
    },
    /**
     * 设置div尺寸
     */
    setSize: function(w, h) {
        var w0 = this.width,
            h0 = this.height;
        var ratio = Math.max(w / w0, h / h0);
        if (ratio > 1) {
            w0 = w / ratio;
            h0 = h / ratio;
        }
        this.$wrapper.find('.upload-content').css({ width: w0 + 'px', height: h0 + 'px' });
    },
    /**
     * 生成url
     */
    getURLDeferred: function(file) {　
        var dtd = $.Deferred();
        var fr = new FileReader();
        if (window.webkitURL) {
            dtd.resolve(window.webkitURL.createObjectURL(file));
        } else if (window.URL) {
            dtd.resolve(window.URL.createObjectURL(file));
        } else {
            fr.onload = function(e) {
                dtd.resolve(fr.result);
            }
            fr.readAsDataURL(file);
        }
        return dtd;
    },
    /**
     * 生成预览
     */
    createPreview: function(file, src) {
        if (src) {
            this.$wrapper.find('.upload-preview').html(this.previewTpl.replace('{{src}}', src));
        }
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
                self.$wrapper.attr('data-state', 'uploading');
                self.showMsg('正在上传');
                xhr.upload.onprogress = self.progress.bind(self);
                return xhr;
            }
        }, self.ajax);

        //这里生成一次data
        var fd = new FormData();
        fd.append(self.name, file);
        $.each(ajaxOption.data || {}, function(k, v) {
            fd.append(k, v);
        });
        //将data赋值为formdata
        ajaxOption.data = fd;
        $.ajax(ajaxOption)
            .done(function(data) {
                self.$wrapper.attr('data-state', 'uploaded');
                self.showMsg('上传成功');
                self.showNum('0');
                self.onload && self.onload.call(self, data);
            })
            .fail(function(xhr, status, err) {
                self.error.call(self, { msg: xhr.responseText, type: 'ajax', textStatus: status, xhr: xhr, error: err });
            });
    }

}
