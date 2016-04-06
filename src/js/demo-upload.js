require(['./config'],function(){
    require(['jquery','utils'],function($){
        require(['bootstrap','./components/upload'],function(){
			$('.upload-container').fileupload({
				ajax: {
					url: '/upload.php'
				},
			//	button: '#upload-button',
				allowSize: [],
				type: 'image',
				text: {
					upload: {
						linkword: '呵呵哒'
					}
				}
			});			
        });
    });
});