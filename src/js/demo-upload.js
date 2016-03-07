require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/upload'],function(){
			var fu = new FileUpload({
				container: $('.upload-container'),
				ajax: {
					url: './upload.php'
				},
				allowSize: [],
				type: 'image'
			});			
        });
    });
});