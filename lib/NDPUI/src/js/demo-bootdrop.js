require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','bootdrop'],function(){
			$("#hello2").bootDrop({
                list:['单地区出价','多地区出价'],
                value:0//base 1				
			});
        });
    });
});