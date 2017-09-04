/**
** 入口文件
** 准备页面启动需要的环境， 并启动页面 -> 展现
**/
require(['./config','./kernel/core'],function(){
    require(['jquery','./view/page-nxdc','bootstrap','pretty','NVis'],function($,page){
        page.startup();
    });
});
