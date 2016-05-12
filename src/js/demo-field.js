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
        });
    });
});