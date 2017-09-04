require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','upload2'],function(){
	       $("label.btn-file[name=all]").upload2({
               title:"文件上传",
               delCallback:function(file,index){
                   //用户点击了，删除按钮的处理
                   console.log("删除文件:");
                   console.log(file);
               },
               dealResult:function(code,file,index,yon){
                   if(code=="30000"){//出现上传问题的后续处理，重名问题，上传失败重新上传问题
                       
                   }else if(code=="30001"){//重名，是否覆盖，yon ： true:false
                       console.log
                   }
               },
               progressCallback:function(file,index){
                   //进度条的处理问题
               },
               cancelCallback:function(file,index){
                   //用户点击了 取消按钮的文件处理
               }
           });
            
	       $("label.btn-file[name=justpic]").upload2({
               title:"图片上传",
               accept:".jpeg,.jpg,.bmp,.png,.gif"
           });            
            
        });
    });
});