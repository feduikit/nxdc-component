require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/upload'],function(){
			$('.upload-container').fileupload({
				ajax: {
					url: '/php/upload.php'
				},
				allowSize: [],
				type: 'image'
			});			
        });
    });
});