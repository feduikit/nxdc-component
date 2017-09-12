define(function(){
	function Demo(){
        
        var  arr  = [{day:1,timeStart:1,timeEnd:2},{day:2,timeStart:1,timeEnd:2},{day:7,timeStart:1,timeEnd:2}];
			var the = $(".ndp-timerange-wrapper").timerange({
				lan:"en"// 中英文 "en", "cn"
			});	
        
        
        
		$("#data").click(function(){
			console.log(the.getVal());
		});
        
		$("#data2").click(function(){
			the.fill(arr);
		});        
			
	}
	return Demo;
});