require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/upload'],function(){
			$('.upload-container').fileupload({
				ajax: {
					url: '/upload.php'
				},
				allowSize: [],
				type: 'image'
			});			
        });
    });
});