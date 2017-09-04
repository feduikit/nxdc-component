require(['./config'], function() {
    require(['jquery', 'utils'], function($) {
        require(['bootstrap', 'progressbar'], function() {
            $('[name="progressbar-page"]').progressbar({css: 'progressbar-test-style'});
        });
    });
});
