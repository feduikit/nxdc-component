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
			
				$("button.btn-danger").click(function(){
					showAlert({
						type:2,
						content:function(ctx){
							var desc = $("<div style='text-align:center;margin:20px 0;'>...注意同步中...</div>");
							var progress = '<div class="progress">\
  <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">60%</div></div>';
							ctx.append(desc).append(progress).css("height","100px");
						}
					});
				});
        });
    });
});