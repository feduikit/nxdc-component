define(function(){
	function Demo(){
		$("div.ndp-gallery-wrapper[name=plain]").gallery({
			cover:'../imgs/cover1.jpg',
			data:[{small:"../imgs/list1.jpg",big:"../imgs/show1.jpg",w:1920,h:1283},
				  {small:"../imgs/list2.jpg",big:"../imgs/show10.jpg",w:1920,h:1283},
				  {small:"../imgs/list3.jpg",big:"../imgs/show3.jpg",w:1920,h:1280},
				  {small:"../imgs/list4.jpg",big:"../imgs/show4.jpg",w:1920,h:1280},
				  {small:"../imgs/list5.jpg",big:"../imgs/show5.jpg",w:1024,h:567},
				  {small:"../imgs/list2.jpg",big:"../imgs/show6.jpg",w:355,h:501},
				  {small:"../imgs/list1.jpg",big:"../imgs/show7.jpg",w:400,h:600},
				  {small:"../imgs/list3.jpg",big:"../imgs/show8.jpg",w:533,h:798},
				  {small:"../imgs/list4.jpg",big:"../imgs/show9.jpg",w:500,h:750}
				 ]
		});
	}
	return Demo;
});