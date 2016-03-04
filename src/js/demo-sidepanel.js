require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/sidepanel'],function(sidepanel){
			var me = $(".ndp-sidepanel-wrapper[name=plain]").sidepanel({
				t:'this is content!'
			})
			$("#ok").click(function(){
				me.sidepanel('toggle');
			});
        });
    });
});
