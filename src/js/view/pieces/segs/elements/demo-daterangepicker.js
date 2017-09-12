define(['moment'], function(moment) {
    function Demo() {
        var range = {
            'Today': [moment(), moment()],
            'Last 3 Days': [moment().subtract(2, 'days'), moment()],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        };

        //普通用法
        $('.daterangepicker-sample').daterangepicker({
            "ranges": range,
            "startDate": "01/20/2016",
            "endDate": "01/26/2016"
        }, function(start, end, label) {});

        //时间段
        $('.daterangepicker-sample1').daterangepicker({
            "ranges": range,
            "startDate": "01/20/2016",
            "endDate": "01/26/2016",
            "opens": "nxdc-mulitple",
            "alwaysShowCalendars": true,
            locale: {
                "applyLabel": "OK",
                "cancelLabel": '',
            },
            autoApply: true
        }, function(start, end, label) {});

        //单个日期
        $('.daterangepicker-sample2').daterangepicker({
                singleDatePicker: true,
                showDropdowns: true
            },
            function(start, end, label) {

            });

        //单个日期,含时分秒
        $('.daterangepicker-sample3').daterangepicker({
                "singleDatePicker": true,
                "showDropdowns": true,
                "opens": "nxdc-single",
                "timePicker": true,
                "timePicker24Hour": true,
                "locale": {
                    "format": 'MM/DD/YYYY h:mm'
                }
            },
            function(start, end, label) {

            });

    }
    return Demo;
});
