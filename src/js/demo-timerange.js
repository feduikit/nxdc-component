require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','timerange'],function(){
            var  sj = [{day:0,timeStart:1,timeEnd:2},{day:1,timeStart:2,timeEnd:3},{day:1,timeStart:4,timeEnd:5}] ;
            
            
			var the = $(".ndp-timerange-wrapper").timerange({
				lan:"en",
                timezone:2
			});
			
            
            $("#info2").click(function(){
                the.fill(sj);     
            });
            
			$("#info").click(function(){
				console.log(the.getVal());//[{},{}]  {timeStart:"开始时间"，timeEnd:结束时间,day:星期几,zone:{text:描述 value:-9}} 
			});
            
        });
    });
});