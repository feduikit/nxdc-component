define(function(){
	function Demo(){
            $("div.ndp-drop-wrapper[name=inline-drop]").drop({
                data:["亚洲","欧洲","美洲","大洋洲","南极洲"],
				name:"country"//为了方便serialize 建议设置name 属性
            }).on("ITEM_CLICK",function(e){
				//下拉选择项点击事件
				//返回的数据有  data = {val:选中项的值,deep:深度(如果是多级) }
				console.log(e.originalEvent.data);
			});
		
            $("div.ndp-drop-wrapper[name=tree-drop]").drop({
                data:[{text:"新疆"},
					  {text:"陕西",sub:[{text:"西安"},
									  {text:"咸阳"}]},
					  {text:"四川",sub:[{text:"成都"},
									  {text:"宜宾"}]},
					  {text:"浙江",sub:[{name:"杭州",
									   sub:[{name:"西溪"},
											{name:"武林"}]}]},
					  {text:"湖北"},
					  {text:"湖南"}],
				caret:"glyphicon-menu-right"
            }).on("ITEM_CLICK",function(e){//下拉菜单一个选项被点击了
				console.log(e.originalEvent.data);
			}).val("新疆"); //设置 显示在input 里面的值
		
		
            $("div.ndp-drop-wrapper[name=group-drop]").drop({
				type:3,
                data:[
					  {name:"中国区",group:[{text:"四川省"},
									  {text:"河北省"}]},
					  {name:"东亚区",group:[{text:"日本"},
									  {text:"韩国"}]},
					  {name:"美洲区",group:[{name:"加拿大"},
									     {name:"美国"},
									     {name:"阿根廷"}]}],
				caret:"glyphicon-menu-right"
            });
			
            $("div.ndp-drop-wrapper[name=disable-drop]").drop({
                data:[{name:"中国",disable:true},{name:"美国"},"德国","加拿大","澳大利亚"]
            }); 
            $("div.ndp-drop-wrapper[name=line-drop]").drop({
                data:["中国",{name:"美国"},{name:"德国",split:true},
					  "加拿大","澳大利亚","法国","爱尔兰","以色列"]
            }); 
            $("div.ndp-drop-wrapper[name=checkbox-drop]").drop({
				type:4,
                data:["中国","加拿大","澳大利亚","法国"]
            }); 		
	}
	return Demo;
});