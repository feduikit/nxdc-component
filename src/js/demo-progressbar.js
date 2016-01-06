require(['./config'], function() {
    require(['jquery', 'utils'], function($) {
        require(['bootstrap', 'progressbar'], function() {
            var s = $('[name="progressbar-page"]');
            s.progressbar({css: 'progressbar-test-style'});
        });
    });
});
