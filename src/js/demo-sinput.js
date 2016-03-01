require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/sinput'],function(){
			$("div.ndp-sinput-wrapper[name=plain-sinput]").sinput({
				placeholder:"请输入"
			});	
			
			$("div.ndp-sinput-wrapper[name=icon-sinput1]").sinput({
				xion:"<span><i class='glyphicon glyphicon-lock'></i></span>",
				placeholder:"请输入"
			});	
			
			$("div.ndp-sinput-wrapper[name=icon-sinput2]").sinput({
				xion:"<span><i class='glyphicon glyphicon-folder-open'></i></span>",
				placeholder:"请输入",
				pos:"left"
			});	
			
			$("div.ndp-sinput-wrapper[name=icon-clear]").sinput({
				xion:"<span><i class='glyphicon glyphicon-remove-circle'></i></span>",
				placeholder:"请输入",
				pos:"left"
			});
			
			$("div.ndp-sinput-wrapper[name=stepper]").sinput({
				type:2,
				max:100,
				placeholder:"请输入数字",
				step:1,
				min:1,
				default:1
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
				xion:'<span class="switcher"><label><input type="checkbox" class="scheckbox"></label></span>'
			});	
			
			
			var the =  $("div.ndp-sinput-wrapper[name=icon-sinput-validate]").sinput({
				xion:"<span><i class='glyphicon glyphicon-remove-circle'></i></span>",
				placeholder:"请输入",
				pos:"right"
			});
			the.fail(true);//默认值是true 显示校验错误提示
			
			
			var the2 =  $("div.ndp-sinput-wrapper[name=icon-sinput-validate2]").sinput({
				xion:"<span><i class='glyphicon glyphicon-warning-sign'></i></span>",
				placeholder:"请输入",
				pos:"right"
			});			
			
			the2.warning(true);//默认值是true  显示警告信息
        });
    });
});