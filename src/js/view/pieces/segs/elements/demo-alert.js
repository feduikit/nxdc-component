define(function(){
	function Demo(){
				$("button.btn-primary").click(function(){
					showAlert({
						callback:function(modal){//关闭alert 回调在这里写
							console.log("关闭alert 窗口 回调函数");
						}
					});
				});	
			
				$("button.btn-warning").click(function(){
					showAlert({
						icon:"<i class='glyphicon glyphicon-globe'></i>",
						content:"这里显示的是一个地球，用来测试图片在右边，文字在左边问题！dddddddd！dsfdfbdshjfdfdhfdsfhdjfdshfdsfhjdfdsjfhdsfjdhfdjfkdhsfjdfhdsjfdshfjdsfhdsjfhdsjfdhsfjdshfdsjfdhsfjdshfjdsfhdsjfdsfhdjfdhdsjfhdsjkfdhskfdhsghdgdsjdshjhdsjhdsjgkdlsdsldhdsfdskfhdsfjdsfjdfhdjfhdfjdfhdsjfvdsjddfdsfdsfdfdsfdsfhdsfdsfdbdb db",
						btnOK:"确定",
						callback:function(dom){//关闭alert窗口，回调函数
							console.log("hello 这里是回调显示");
						}
					});
				});	
        
				$("button.btn-info").click(function(){
					showAlert({
						icon:"<i class='glyphicon glyphicon-globe'></i>",
						content:"这里显示的是一个地球，用来测试图片在右边，文字在左边问题！dddddddd！dsfdfbdshjfdfdhfdsfhdjfdshfdsfhjdfdsjfhdsfjdhfdjfkdhsfjdfhdsjfdshfjdsfhdsjfhdsjfdhsfjdshfdsjfdhsfjdshfjdsfhdsjfdsfhdjfdhdsjfhdsjkfdhskfdhsghdgdsjdshjhdsjhdsjgkdlsdsldhdsfdskfhdsfjdsfjdfhdjfhdfjdfhdsjfvdsjddfdsfdsfdfdsfdsfhdsfdsfdbdb db",
                        backdrop:false,//不显示背景色
						btnOK:"确定",
						callback:function(dom){//关闭alert窗口，回调函数
							console.log("hello 这里是回调显示");
						}
					});
				});	        
	};
	
	return Demo;
});