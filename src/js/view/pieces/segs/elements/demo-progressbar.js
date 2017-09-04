define(function() {
    function Demo() {
        //选中指定的dom元素进行初始化
        $('.progressbar-sample').progressbar({
            //给进度条最外层指定样式
            css: 'progressbar-test-style',
            //需要设置的初始化的进度的百分比
            progress: '40%',
            //可选default 条形和 circle环形
            shape: 'circle'
        });
		
        //选中指定的dom元素进行初始化
        $('.progressbar-sample1').progressbar({
            //给进度条最外层指定样式
            css: 'progressbar-test-style',
            //需要设置的初始化的进度的百分比
            progress: '40%',
            //可选default 条形和 circle环形
            shape: 'default'
        });		
    }
    return Demo;
});
