define(function(){
	function Demo(){
			$("div.ndp-sinput-wrapper[name=plain-sinput]").sinput({
				placeholder:"请输入",
				name:"password",//为了方便serialize 建议设置name 属性
				default:"hello world"// 默认显示在 input 中字符串
			});	
			
			$("div.ndp-sinput-wrapper[name=icon-sinput1]").sinput({
				xion:"<span><i class='glyphicon glyphicon-lock'></i></span>",
				placeholder:"请输入"
			}).on("ICON_CLICK",function(e){ //点击图标时 触发
				console.log("点击了图标");
			});		
			
			$("div.ndp-sinput-wrapper[name=icon-sinput2]").sinput({
				xion:"<span><i class='glyphicon glyphicon-folder-open'></i></span>",
				placeholder:"请输入",
				pos:"left"//图标显示在左边  “left”, "right"
			});	
			
			$("div.ndp-sinput-wrapper[name=stepper]").sinput({
				type:2,
				max:100,//最大值
				placeholder:"请输入数字",
				step:1,//每次加1 或者 减1
				min:1,//最小值 1
				default:1
			}).on("STEP_CHANGE",function(e){//点击step 按钮
				console.log(e.originalEvent.data);//{val:当前值 float}
			});		
			
			$("div.ndp-sinput-wrapper[name=plain-title]").sinput({
				title:"user name"
			});		
			
			$("div.ndp-sinput-wrapper[name=disabled-title]").sinput({
				title:"user name",
				disabled:true
			});
			
			$("div.ndp-sinput-wrapper[name=plain-pwd]").sinput({	
				inputType:"password",
				name:"pwd",//为了方便serialize 建议设置name 属性
				xion:'<span class="switcher"><label><input type="checkbox" class="scheckbox"></label></span>',
				default:"1we232ertt"
			});	
			$("div.ndp-sinput-wrapper[name=plain-disabled]").sinput({	
				xion:"<span><i class='glyphicon glyphicon-folder-open'></i></span>",
				placeholder:"请输入",
				pos:"left",
				disabled:true
			});
		
		
		   //val-fail
		  var the1 = $("div.ndp-sinput-wrapper[name=val-fail]").sinput({
				xion:"<span><i class='glyphicon glyphicon-remove-circle'></i></span>",
				placeholder:"请输入",
				pos:"right"
		  });
		  the1.fail(true);//默认值是true 显示校验错误提示
		
		  var the2 = $("div.ndp-sinput-wrapper[name=val-warning]").sinput({
				xion:"<span><i class='glyphicon glyphicon-warning-sign'></i></span>",
				placeholder:"请输入",
				pos:"right"
		  });
		  the2.warning(true);//默认值是true    显示校验错误提示		
		
			
	}
	
	return Demo;
});