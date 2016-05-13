require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','field'],function(){
            
            var hwd=$("div.ndp-field-wrapper").field();

            $("#intag").click(function(){
                hwd.addTag({val:"1130",text:'hello world'});
            });
            $("#intxt").click(function(){
                hwd.getContent();
            });   
            
            
             var hwd2=$("div.ndp-field-wrapper[name=21]").field();
            
            $("#intag2").click(function(){
                hwd2.addTag({val:"1130",text:'hli hao1'});
            }); 
            
            $("#intag3").click(function(){
                hwd2.fill("sdfdsfs{{1130|hello world}} sfsdfdsfds{{1130|hello world}} sdfsdf#b#ndsfdsf{{1130|hello world}}");
            });              
        });
    });
});