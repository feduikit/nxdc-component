require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','timerange'],function(){
			var the = $(".ndp-timerange-wrapper").timerange({
				lan:"en"
			});
			
			
			$("#info").click(function(){
				console.log(the.getVal());//[{},{}]  {timeStart:"开始时间"，timeEnd:结束时间,day:星期几,zone:{text:描述 value:-9}} 
			});
			
        });
    });
});