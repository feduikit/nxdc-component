require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','bubble'],function(){
			$(".ndp-bubble-wrapper[name='pic']").bubble({
				title:"hello world 123",
				icon:'../assets/cover1.jpg',
				content:'How to position the popover For example, if placement is "auto left", the popover will display to the left when possible, otherwise it will display right.'
			});
			
			
			$(".ndp-bubble-wrapper[name='gra']").bubble({
				type:2,
				icon:'<i class="glyphicon glyphicon-home"></i>',
				content:'How to position the popover For example, if placement is "auto left", the popover will display to the left when possible, otherwise it will display right.'
			});
			
			$(".ndp-bubble-wrapper[name='gra2']").bubble({
				type:1,
				placement:"top",
				icon:'<i class="glyphicon glyphicon-home"></i>',
				content:'How to position the popover For example, if placement is "auto left", the popover will display to the left when possible, otherwise it will display right.'
			});				
			
			$(".ndp-bubble-wrapper[name='gra3']").bubble({
				type:2,
				title:"hello world 123",
				icon:'<i class="glyphicon glyphicon-home"></i>',
				content:'How to position the popover For example, if placement is "auto left", the popover will display to the left when possible, otherwise it will display right.'
			});				
			
        });
    });
});