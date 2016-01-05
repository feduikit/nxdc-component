require(['./config'], function() {
    require(['jquery', 'utils'], function($) {
        require(['bootstrap', 'progressbar'], function() {

            /**
             * 
             */
            var s = $('[name="progressbar-page"]');
            s.progressbar({css: 'haha'});
            window.ss = s[0];
            s[0].progressbarInstance.setProgress('30%');
            // s[1].progressbarInstance.setProgress('30%');
            // s[2].progressbarInstance.setProgress('40%');
            console.log(s[0].progressbarInstance.getProgress());
        });
    });
});
