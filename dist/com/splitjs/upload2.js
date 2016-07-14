;(function ($,win) {
var xhrs = [];    
var modal = '<div class="modal fade" id="modal-file-upload" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
          <div class="modal-dialog" role="document">\
            <div class="modal-content">\
              <div class="modal-header">\
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                <h4 class="modal-title"></h4>\
              </div>\
              <ul class="modal-body"></ul>\
            </div>\
          </div>\
        </div>'; 
var Help = {
    extset:function(file,icon){
        var tp = (file.type.match(/[a-zA-Z]+?\/([a-zA-Z.0-9]+)/i));
        if(!file.type) tp = file.name.match(/\.([^\.]+)$/i);
        if(tp && tp[1]){
           tp = tp[1];
           switch(tp.toLowerCase()){
               case "pdf":
                   icon.css("background-position","-60px 0");
                   break;
               case "zip":
               case "x-gzip":
                   icon.css("background-position","-40px -125px");
                   break;
                case "rar":
                    icon.css("background-position","-60px -188px");
                    break;
                case "mov":
                case "quicktime":
                    icon.css("background-position","-40px -147px");
                    break; 
               case "mp4":
               case "ogg":
               case "webm":        
                    icon.css("background-position","-40px -191px");
                    break;                        
               case "psd":
               case "vnd.adobe.photoshop":
                    icon.css("background-position","-40px -42px");
                   break;
               case "jpg":
               case "jpeg":
                    icon.css("background-position","0 -41px");
                    break;
               case "png":
                    icon.css("background-position","-20px -40px");
                    break;                       
               case "gif":
                    icon.css("background-position","-20px -190px");
                    break; 
               case "html":
               case "htm":
                    icon.css("background-position","-20px -20px");
                    break; 
               case "css":
                    icon.css("background-position","-40px -20px");           
                    break;                       
               case "js":
               case "javascript":       
                    icon.css("background-position","-80px -20px"); 
                   break;
               case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
               case "":
                   icon.css("background-position","0 -190px"); 
                   break;
               case "msword":
               case "vnd.openxmlformats-officedocument.wordprocessingml.document":
                   icon.css("background-position","0 -83px"); 
                   break;
               case "ppt":
               case "vnd.ms-powerpoint":
                   icon.css("background-position","0 -105px"); 
                   break;
               default:
                   icon.css("background-position","-80px -105px");
                    break;
           }
       }else{
           icon.css("background-position","-80px -105px");
       }        
    }
}; 
    
    function Upload2(element, options){
        var self = this;
        this.elem = element;
        this.config = $.extend(true, {}, $.fn.upload2.defaults, element.data(), options);
        this.init();
        
        //监听事件
        this.elem.find("input[type=file]").change(function(){
            if(!this.files.length) return false;
            xhrs = [];
            $("#modal-file-upload").find(".modal-body").empty();
            var files = [].slice.call(this.files,0);
            files.forEach(function(file,index){
               var li = $("<li class='file-item'></li>").attr("data-name",file.name).attr("data-index",index);
               var icon = $("<span class='icon-box'></span>");
               Help.extset(file,icon);
               var filename = $("<span class='file-name'></span>").html(file.name);
               var ope = $("<span class='file-item-opt' data-item="+index+"  data-val='cancel' >取消</span>");
               var perc = $("<span class='file-percent' data-item="+index+" >0%</span>");
               var progress = $("<div class='file-progress'  data-item="+index+" ></div>");
               var check = $("<i class='font-icon font-icon-check2 hidden' data-item="+index+"></i>");
               li.append(progress).append(icon).append(filename).append([perc,check,ope]).attr("data-id",index);
               $("#modal-file-upload").find(".modal-body").append(li);

               //点击  取消上传
               $(".file-item-opt[data-item="+index+"][data-val=cancel]").unbind("click").click(function(){
                   if(xhrs[index]) {
                       var xhr = xhrs[index];
                       xhr.abort();// abort  取消上传操作
                       xhr = null;
                       if(self.config.cancelCallback){
                           self.config.cancelCallback(file,index);
                       }
                   }
               });           
             });
            $("#modal-file-upload").modal({backdrop:false}); //弹出上传文件 进度列表窗口
            $("#modal-file-upload").find("h4.modal-title").html(self.config.title);
         
            //读取文件 和 显示文件分开进行，防止文件过多，导致弹出窗口等待时间过长
            files.forEach(function(file,index){
                var formData = new FormData();
                formData.append("fieldname",file);
                var opt = $.extend(true, {}, self.config.upAjaxSet,{"data":formData});
                opt.xhr = function(){
                    var xhr = $.ajaxSettings.xhr();// get the native XmlHttpRequest object
                    xhr.upload.onprogress = function(e){ // set the onprogress event handler
                      if(self.config.progressCallback){//进度条的回调
                          self.config.progressCallback(e,file,index);
                      }else{
                          if (e.lengthComputable) {
                            var percentage = (e.loaded / e.total) * 100;
                            $("div.file-progress[data-item="+index+"]").css("width",percentage + "%");  
                            $("span.file-percent[data-item="+index+"]").removeClass("file-status").text(Math.floor(percentage) + "%"); 
                          }else{
                              var html = "<span class='file-upload-fail'><i class='font-icon font-icon-attention'></i><span>上传失败！</span></span>";
                              $("#modal-file-upload").find(".modal-body .file-item").append(html);
                              $("span.file-percent[data-item="+index+"]").toggleClass("hide");                     
                          }                              
                      }                         
                    };
                    // set the onload event handler
                    xhr.upload.onload = function(){
                         $(".file-progress[data-item="+index+"]").unbind("webkitTransitionEnd oTransitionEnd otransitionend transitionend").on("webkitTransitionEnd oTransitionEnd otransitionend transitionend",function(){
                            $("span.file-item-opt[data-item="+index+"]").text("删除").attr("data-val","delete");
                            $("i.font-icon[data-item="+index+"]").removeClass("hidden"); 
                           //删除 操作
                           $(".file-item-opt[data-item="+index+"][data-val='delete']").unbind("click").click(function(){
                               var _this = this;
                               if(self.config.delCallback){
                                    self.config.delCallback(file,index); 
                               }else{
                                    $.ajax({
                                        type: "DELETE",
                                        url: "/api/delete/"+file.name,                                    
                                    }).then(function(result){
                                        $(_this).parents("li.file-item:first").css("height",0).
                                            on("webkitTransitionEnd oTransitionEnd otransitionend transitionend",function(e){
                                                $(this).remove();
                                            });
                                    },function(err){
                                        //删除报错处理
                                        xhr.abort();
                                    });                                    
                               }           
                           });                           
                         });                             
                    } 
                    return xhr ;// return the customized object
                };
                //发出请求
                var $xhr = $.ajax(opt); 
                xhrs.push($xhr);
                $xhr.then(function(result){
                    if(typeof(result) == "string") result = JSON.parse(result);
                    switch(result.errorCode){
                        case "30000":// 上传失败，重新上传
                              var html = "<span class='file-upload-fail'><i class='font-icon font-icon-attention'></i><span>上传失败！</span><a href='javascript:;' data-id="+index+" class='reupload'>重新上传</a></span>";
                              $("#modal-file-upload").find(".file-item[data-id="+index+"]").append(html);
                              $("span.file-percent[data-item="+index+"]").toggleClass("hide"); 
                               $("i.font-icon-check2[data-item="+index+"]").toggleClass("hide");
                              $("li a.reupload[data-id="+index+"]").unbind("click").click(function(e){
                                  if(self.config.dealResult) self.config.dealResult(result.errorCode,file,index);
                              });
                            break;
                        case "30001": //同名文件冲突，是否覆盖
                              html = "<span class='file-upload-fail'><i class='font-icon font-icon-attention'></i><span>是否覆盖已存在的元素！</span><a href='javascript:;' data-id="+index+"  data-val='true' class='yesorno' >是</a>&nbsp;&nbsp;&nbsp;<a href='javascript:;' data-id="+index+" class='yesorno'  data-val='false'>否</a></span>";
                              $("#modal-file-upload").find(".file-item[data-id="+index+"]").append(html);
                              $("span.file-percent[data-item="+index+"]").toggleClass("hide"); 
                              $("i.font-icon-check2[data-item="+index+"]").toggleClass("hide");
                              $("li a.yesorno[data-val][data-id="+index+"]").unbind("click").click(function(e){
                                  if(self.config.dealResult) self.config.dealResult(result.errorCode,file,index,$(this).data("val"));
                              });                            
                            break;
                        case "30002": //文件名问题
                              html = "<span class='file-upload-fail'><i class='font-icon font-icon-attention'></i><span>未能找到匹配的元素，请检查元素命名</span></span>";
                              $("#modal-file-upload").find(".file-item[data-id="+index+"]").append(html);
                              $("span.file-percent[data-item="+index+"]").toggleClass("hide"); 
                              $("i.font-icon-check2[data-item="+index+"]").toggleClass("hide");                        
                            break; 
                    }                 
                },function(err){
                  var html = "<span class='file-upload-fail'><i class='font-icon font-icon-attention'></i><span>上传失败！</span></span>";
                  $("#modal-file-upload").find(".modal-body .file-item").append(html);
                  $("span.file-percent[data-item="+index+"]").toggleClass("hide");    
                  xhrs[index].abort();//终止操作
                  xhrs[index] = null;                    
                }); 
            });            
        });
    }
    
    //
    Upload2.prototype.init = function(){
        var _this = this;
        this.elem.addClass(this.config.containerClass); //设置 包裹容器的 dim,外观
        this.build(); //构建
        this.initConfig();
    
    }
    
    //
    Upload2.prototype.build = function(){
        if(!document.getElementById("modal-file-upload")){
            $(document.body).append(modal);
        }
    }
    
    //
    Upload2.prototype.initConfig = function(){
        var cfg = this.config;
        //组件标题
        if(cfg.title){
            this.elem.prepend(cfg.title);
        }
        
        //单文件上传，还是多文件上传
        if(cfg.multiple){
            this.elem.find("input[type=file]").attr("multiple","true");
        }else{
             this.elem.find("input[type=file]").removeAttr("multiple");
        }
        
        //过滤上传文件的类型
        if(cfg.accept.toLowerCase() != "all"){
            this.elem.find("input[type=file]").attr("accept",cfg.accept.toLowerCase());
        }
        
    }

    /**
     * jquery 提供了一个objct 即 fn，which is a shotcut of jquery object prototype
     * or you can call it jquery plugin shell  == fn
     *  类似于  Class.prototype.jqplugin = function(){};
     *  the   $.fn  [same as] Class.prototype
     * plugin entrance
     */
    $.fn.upload2 = function(options) {
        var the = this.first();
        var up = new Upload2(the, options);
        the = $.extend(true, {}, the, new exchange(up));
        return the;
    };    
    /***
     **和其他插件的交互
     ** factory Class
     **@param {Drop} drop :  instacne of the plugin builder
     **/
    function exchange(elem) {
        /**
         **@param {Object} msg {type:"类型"}
         **/
        this.upload2 = function(data) {

        }
    }


    var old = $.fn.upload2;
    $.fn.upload2.Constructor = Upload2;
    // table NO CONFLICT
    // ===============
    $.fn.upload2.noConflict = function() {
        $.fn.upload2 = old;
        return this;
    }

    /***
     ** outside accessible default setting
     **/
    $.fn.upload2.defaults = {
        title:"文件上传",
        accept:"all",
        multiple:1,//默认是多文件上传
        upAjaxSet:{ //上传文件ajax 配置项
            async: true,    
            url:"/api/upload",
            method:"POST",
            contentType:false,
            cache:false, //cache设置为false，上传文件不需要缓存。
            processData:false //processData设置为false。因为data值是FormData对象，不需要对数据做处理  ,否则会报错            
        },
        dealResult:null,//出现上传问题的后续处理，重名问题，上传失败重新上传问题
        progressCallback:null,// 进度的回调函数
        delCallback:null,  //点击删除按钮的回调
        cancelCallback:null //点击取消按钮的回调
    };
}(jQuery,window));
