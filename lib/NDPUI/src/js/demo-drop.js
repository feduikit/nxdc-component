require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/drop'],function(){
            var the = $("div.ndp-drop-wrapper[name=inline-drop]").drop({
                data:[{text:"中国",value:12},{text:"日本",value:100},
					  {name:3,val:121},
					  {text:4,id:777},
					  {text:"asas",id:7771},
					  {text:"Dewe",id:7772},
					  {text:"Fewwev",id:7773},
					  {text:"Cdsfsf",id:7774},
					  {text:"J的身份为",id:7775},
					  {text:"Ferwer",id:7776},
					  {text:"ydsfsdf",id:7777},
					  {text:"Tfsdff",id:7778},
					 ],
				name:"country"// 为了便于 serialize  最好定义一个名字
            }).on("ITEM_CLICK",function(e){
				//下拉选择项点击事件
				//返回的数据有  data = {val:选中项的值,deep:深度(如果是多级) }
				console.log(e.originalEvent.data);
			}).val({text:"日本",value:100});
			

            $("div.ndp-drop-wrapper[name=tree-drop2]").drop({
                data:[{text:"新疆",val:'xj'},
					  {text:"陕西",val:'sx',sub:[{text:"西安",val:'xa'},
									  {text:"咸阳",val:'xy'}]},
					  {text:"四川",val:'sc',sub:[{text:"成都",val:'cd'},
									  {text:"宜宾",val:'yb'}]},
					  {text:"浙江",val:'zj',sub:[{name:"杭州",val:'hz',
									   sub:[{name:"西溪",val:'xx'},
											{name:"武林",val:'wl'}]}]},
					  {text:"湖北",val:'hb'},
					  {text:"湖南",val:'hn'}],
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
			
            $("div.ndp-drop-wrapper[name=checkbox-drop]").drop({
				type:4,
                data:["中国sdfdfdsf","加拿大sdfdsfsdfds哇哇哇全文","澳大利亚人玩儿完任务二","法去尾王企鹅我去额外全额国"]
            }).on("APPLY_CLICK",function(e){
				//多选 点击y应用按钮
				//data = {checkedArr:cksArr}
				console.log(e.originalEvent.data);
			}); 			
        });
    });
});