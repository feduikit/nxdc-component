define(function(){
	function Demo(){
        var hwd=$("div.ndp-field-wrapper").field();

        $("#intag").click(function(){
            hwd.addTag({val:"1130",text:'hello world'});
        });
        $("#intxt").click(function(){
            hwd.getContent();
        }); 
        /****
        ** 回填数据
        ****/
         $("#fill").click(function(){
             //回填的数据，字符串
           var str = "sdfdsfs{{1130|hello world}} sfsdfdsfds{{1130|hello world}} sdfsdf#b#ndsfdsf{{1130|hello world}}123234234hello"
            hwd.fill(str);
        });        
	}
	return Demo;
});