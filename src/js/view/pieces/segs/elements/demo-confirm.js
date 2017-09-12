define(function(){
	function Demo(){
				$("button.btn-primary").click(function(){
					showConfirm({
						content:"你的报告已经准备完毕，提交之后无法修改，你确定提交？",
						onOK:function(){// 点击 “确认” 按钮回调函数
							console.log("ok 了");
						},
						onCancel:function(){// 点击 “取消” 或者x 按钮回调函数
							console.log("取消");
						}					
					});
				});	
			
				$("button.btn-warning").click(function(){
					showConfirm({
						icon:"<i class='glyphicon glyphicon-globe'></i>",
						content:"这里显示的是一个地球，用来测试图片在?",
						btnOK:"确定",//确定按钮文字
						btnCANCEL:"取消",//关闭按钮文字
						onOK:function(){// 点击 “确认” 按钮回调函数
							console.log("ok 了");
						},
						onCancel:function(){// 点击 “取消” 或者x 按钮回调函数
							console.log("取消");
						}						
					});
				});			
	};
	
	return Demo;
});