require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','alert'],function(){
				$("button.btn-primary").click(function(){
					showAlert({
						callback:function(modal){
							console.log(modal.text());
						}
					});
				});	
			
				$("button.btn-warning").click(function(){
					showAlert({
						icon:"<i class='glyphicon glyphicon-globe'></i>",
						content:"这里显示的是一个地球，用来测试图片在右边，文字在左边问题！dddddddd！dsfdfbdshjfdfdhfdsfhdjfdshfdsfhjdfdsjfhdsfjdhfdjfkdhsfjdfhdsjfdshfjdsfhdsjfhdsjfdhsfjdshfdsjfdhsfjdshfjdsfhdsjfdsfhdjfdhdsjfhdsjkfdhskfdhsghdgdsjdshjhdsjhdsjgkdlsdsldhdsfdskfhdsfjdsfjdfhdjfhdfjdfhdsjfvdsjddfdsfdsfdfdsfdsfhdsfdsfdbdb db",
						btnOK:"确定"
					});
				});				
        });
    });
});