require(['./config'],function(){
    require(['jquery','utils','drop'],function($){
        require(['bootstrap','prompt'],function(){
			
			$("button.btn-primary").click(function(){
				$("#prompt-holder").prompt();
			});
			
			$("button.btn-warning").click(function(){
				$("#prompt-holder").prompt({
					title:"登陆",
					body:function(body,wrapper){
						//DOM构建
						var form = $("<form class='form-horizontal' />");
						var user = $('<div class="form-group">\
									<label for="inputUser" class="col-sm-2 control-label col-sm-offset-2">用户名</label>\
										<div class="col-sm-5">\
										  <input type="text" class="form-control" id="inputUser" placeholder="username">\
										</div>\
								    </div>');
						var pwd = $('<div class="form-group ">\
								<label for="inputPwd" class="col-sm-2 control-label col-sm-offset-2">密&nbsp;&nbsp;&nbsp;码</label>\
								<div class="col-sm-5">\
								  <input type="password" class="form-control" id="inputPwd" placeholder="Password">\
								</div>\
							  </div>');
						
						form.append(user).append(pwd);
						body.append(form);
					},
					footer:function(footer){
						footer.addClass("footer-login");
					},
					btnOK:"登陆",
					btnCANCAEL:"取消"
				}).on("click_ok",function(){
					console.log();
				});
			});
			
			
			//个人信息表单
			$("button.btn-success").click(function(e){
				$("#prompt-holder").prompt({
					title:"个人信息",
					body:function(body,wrapper){
						var form = $("<form class='form-horizontal' />");
						var user = $('<div class="form-group">\
									<label for="inputUser" class="col-sm-2 control-label">用户名</label>\
										<div class="col-sm-5">\
										  <input type="text" class="form-control" id="inputUser">\
										</div>\
								    </div>');
						
						var email = $('<div class="form-group">\
									<label for="inputEmail" class="col-sm-2 control-label">Email</label>\
										<div class="col-sm-8">\
										  <input type="email" class="form-control" id="inputEmail" placeholder="Email">\
										</div>\
								    </div>');
						var pwd = $('<div class="form-group">\
								<label for="inputPwd" class="col-sm-2 control-label">密&nbsp;&nbsp;&nbsp;码</label>\
								<div class="col-sm-5">\
								  <input type="password" class="form-control" id="inputPwd" placeholder="Password">\
								</div>\
									<div class="checkbox col-sm-5"><label>\
									<input type="checkbox"> Remember me\
    								</label>\
  									</div>\
							  </div>');
						var gender = $('<div class="form-group">\
							<label for="inputPwd" class="col-sm-2 control-label">性&nbsp;&nbsp;&nbsp;别</label>\
										 <div class="col-sm-6"><label class="radio-inline">\
										  <input type="radio" id="gman" value="man" name="gender"> 男\
										</label>\
										<label class="radio-inline">\
										  <input type="radio" id="gwoman" value="woman" name="gender"> 女\
										</label>\
										<label class="radio-inline">\
										  <input type="radio" id="grother" value="other" name="gender"> 其他\
										</label></div>\
										</div>');
						var desc = $('<div class="form-group">\
									<label for="inputDesc" class="col-sm-2 control-label">个人描述</label>\
										<div class="col-sm-8">\
										  <textarea class="form-control" rows="4" id="inputDesc"></textarea>\
										</div>\
								    </div>');
						
						form.append(user).append(pwd).append(email).append(gender).append(desc);
						body.append(form);
					}
				});
			});
			
			//复杂表单
			$("button.btn-danger").click(function(e){
				$("#confirm-holder").prompt({
					title:"<i class='glyphicon glyphicon-home'></i>&nbsp;复杂表单",
					body:function(body){
						body.addClass("body-fixed-height");
						var form = $("<form class='form-horizontal' />");
						var user = $('<div class="form-group">\
									<label for="inputUser" class="col-sm-2 control-label">用户名</label>\
										<div class="col-sm-5">\
										  <input type="text" class="form-control" id="inputUser">\
										</div>\
								    </div>');
						
						var email = $('<div class="form-group">\
									<label for="inputEmail" class="col-sm-2 control-label">Email</label>\
										<div class="col-sm-8">\
										  <input type="email" class="form-control" id="inputEmail" placeholder="Email">\
										</div>\
								    </div>');
						var pwd = $('<div class="form-group">\
								<label for="inputPwd" class="col-sm-2 control-label">密&nbsp;&nbsp;&nbsp;码</label>\
								<div class="col-sm-5">\
								  <input type="password" class="form-control" id="inputPwd" placeholder="Password">\
								</div>\
									<div class="checkbox col-sm-5"><label>\
									<input type="checkbox"> Remember me\
    								</label>\
  									</div>\
							  </div>');
						var gender = $('<div class="form-group">\
							<label for="inputPwd" class="col-sm-2 control-label">性&nbsp;&nbsp;&nbsp;别</label>\
										 <div class="col-sm-6"><label class="radio-inline">\
										  <input type="radio" id="gman" value="man" name="gender"> 男\
										</label>\
										<label class="radio-inline">\
										  <input type="radio" id="gwoman" value="woman" name="gender"> 女\
										</label>\
										<label class="radio-inline">\
										  <input type="radio" id="grother" value="other" name="gender"> 其他\
										</label></div>\
										</div>');
						var desc = $('<div class="form-group">\
									<label for="inputDesc" class="col-sm-2 control-label">个人描述</label>\
										<div class="col-sm-8">\
										  <textarea class="form-control" rows="3" id="inputDesc"></textarea>\
										</div>\
								    </div>');
						var advanced = $('<div class="panel-group" id="accordion">\
  <div class="panel panel-default">\
    <div class="advanced-label" id="headingOne">\
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">高级设置</a>\
    </div>\
    <div id="collapseOne" class="panel-collapse collapse"  aria-labelledby="headingOne">\
		<form class="form-horizontal">\
			<div class="form-group">\
			<label for="inputAge" class="col-sm-2 control-label">年&nbsp;&nbsp;&nbsp;龄</label>\
				<div class="col-sm-5">\
					<div class="ndp-drop-wrapper" name="age-drop"></div>\
				</div>\
			</div>\
			<div class="form-group">\
				<label for="inputAddr" class="col-sm-2 control-label">住&nbsp;&nbsp;&nbsp;址</label>\
				<div class="col-sm-8">\
				  <textarea class="form-control" rows="3" id="inputAddr"></textarea>\
				</div>\
			</div>\
			<div class="form-group">\
				<label for="inputEdu" class="col-sm-2 control-label">学&nbsp;&nbsp;&nbsp;历</label>\
				<div class="col-sm-8">\
				  <input type="text" id="inputEdu" class="form-control" name="edu">\
				</div>\
			</div>\
		</form>\
    </div>\
  </div>\
</div>');
						advanced.find("div[name=age-drop]").drop({
							data:[18,20,30,40,50,60]
						});
						
						form.append(user).append(pwd).append(email).append(gender).append(desc).append(advanced);
						
						body.append(form);
						
					},
					footer:function(footer){
						footer.addClass("footer-login");
					}
				});
			});
			
			
        });
    });
});