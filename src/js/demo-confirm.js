require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','confirm'],function(){
			
			$("button.btn-primary").click(function(){
				showConfirm({
					content:"您的述职报告已经完成，您确定提交吗？"
				});
			});
			
			$("button.btn-warning").click(function(){
				showConfirm({
					icon:"<i class='glyphicon glyphicon-phone'></i>",
					onOK:function(){// 点击 “确认” 按钮回调函数
						console.log("ok 了");
					},
					onCancel:function(){// 点击 “取消” 按钮回调函数
						console.log("取消le");
					}
				});
			});
			
        });
    });
});