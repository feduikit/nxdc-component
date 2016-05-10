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
						btnOK:"确定",
						callback:function(modal){// alert 关闭 回调这里
							console.log(111);
						}
					});
				});
			
				$("button.btn-danger").click(function(){
					var al = showAlert({
						type:2,
						content:function(ctx){
							var desc = $("<div style='text-align:center;margin:20px 0;'>...注意同步中...</div>");
							var progress = '<div class="progress">\
  <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">60%</div></div>';
							ctx.append(desc).append(progress).css("height","100px");
						}
					});
					
					
					window.setTimeout(function(){
						var the = al.find(".progress>.progress-bar");
						the.css("width","80%").text("80%");
					},2000);					
								
				});
			
                //不显示黑色背景
				$("button.btn-info").click(function(){
					showAlert({
						callback:function(modal){
							console.log(modal.text());
						},
                        backdrop:false
					});			
								
				});            
			
			
        });
    });
});