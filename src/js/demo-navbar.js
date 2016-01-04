require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/navbar'],function(){
			$("div.navbar[name=plain]").navbar({});
        });
    });
});