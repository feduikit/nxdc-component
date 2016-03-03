require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/drop'],function(){
            $("div.ndp-drop-wrapper[name=inline-drop]").drop({
                data:["中国","日本",3,4,5,6],
				val:"中国"
            }).on("ITEM_CLICK",function(e){
				//下拉选择项点击事件
				//返回的数据有  data = {val:选中项的值,deep:深度(如果是多级) }
				console.log(e.originalEvent.data);
			});
			

            $("div.ndp-drop-wrapper[name=tree-drop2]").drop({
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
            }).on("ITEM_CLICK",function(e){
				console.log(e.originalEvent.data);
			}).val("新疆"); 
			
			
            $("div.ndp-drop-wrapper[name=group-drop2]").drop({
				type:3,
                data:[
					  {name:"中国区s",group:[{text:"四川省"},
									  {text:"河北省"}]},
					  {name:"东亚区",group:[{text:"日本"},
									  {text:"韩国"}]},
					  {name:"美洲区",group:[{name:"加拿大"},
									     {name:"美国"},
									     {name:"阿根廷"}]}],
				caret:"glyphicon-menu-right"
            }).on("ITEM_CLICK",function(e){
				console.log(e.originalEvent.data);
			});
			
            $("div.ndp-drop-wrapper[name=disable-drop2]").drop({
                data:[{name:"中国",disable:true},{name:"美国"},"德国","加拿大","澳大利亚"]
            }); 
            $("div.ndp-drop-wrapper[name=line-drop2]").drop({
				//所有插件只要是数组类型的，都支持，字符串或者 object {} 类型的数据，也支持二者混合
                data:["中国",{name:"美国"},
					  {name:"德国",split:true},//是否显示分割线
					  "加拿大","澳大利亚","法国","爱尔兰","以色列"]
            });
			
            $("div.ndp-drop-wrapper[name=checkbox-drop2]").drop({
				type:4,
                data:["中国","加拿大","澳大利亚","法国"]
            }).on("APPLY_CLICK",function(e){
				//多选 点击y应用按钮
				//data = {checkedArr:cksArr}
				console.log(e.originalEvent.data);
			}); 			
        });
    });
});