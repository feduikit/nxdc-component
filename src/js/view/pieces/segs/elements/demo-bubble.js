define(function(){
	function Demo(){
			$(".ndp-bubble-wrapper[name='pic']").bubble({
				type:1,//默认1 普通的气泡
				title:"hello world 123",//标题，内容决定 标题是否显示
				icon:'../imgs/cover1.jpg',//触发 显示气泡的dom 内容，图片或者 字体都行
				//气泡内显示的内容
				content:'How to position the popover For example, if placement is "auto left", the popover will display to the left when possible, otherwise it will display right.'
			});
			
			
			$(".ndp-bubble-wrapper[name='gra']").bubble({
				type:2,//气泡 包含尾部两个 确定，取消按钮 
				icon:'<i class="glyphicon glyphicon-home"></i>',
				content:'How to position the popover For example, if placement is "auto left", the popover will display to the left when possible, otherwise it will display right.'
			});
			
			$(".ndp-bubble-wrapper[name='gra1']").bubble({
				type:1,
				placement:"top",//气泡显示的位置
				icon:'<i class="glyphicon glyphicon-home"></i>',
				content:'How to position the popover For example, if placement is "auto left", the popover will display to the left when possible, otherwise it will display right.'
			});				
			
			$(".ndp-bubble-wrapper[name='gra2']").bubble({
				type:2,
				title:"hello world 123",
				icon:'<i class="glyphicon glyphicon-home"></i>',
				content:'How to position the popover For example, if placement is "auto left", the popover will display to the left when possible, otherwise it will display right.'
			});		
	}
	return Demo;
});