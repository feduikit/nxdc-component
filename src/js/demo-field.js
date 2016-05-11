require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','field'],function(){
            
            var hwd=$("div.ndp-field-wrapper").field();
            
            
            function cmdInHtml(){
                var tag = "&nbsp<span class='deco-tag' readonly='true' >hello world</span>&nbsp";
                document.execCommand("insertHTML",false,tag);
            }

            function cmdInTxt(){
                document.execCommand("insertText",false,"");
            } 

            $("#intag").click(function(){
                hwd.addTag({val:"1130",text:'hello world'});
            });
            $("#intxt").click(function(){
                hwd.getContent();
            });    			
        });
    });
});