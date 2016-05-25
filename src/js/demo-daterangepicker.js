require(['./config'],function(){
    require(['jquery','moment','utils'],function($,moment){
        require(['bootstrap','datepicker'],function(){
			
	$('.daterangepicker-sample').daterangepicker({
		"ranges": {
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		},
		"startDate": "01/20/2016",
		"endDate": "01/26/2016"
	}, function(start, end, label) {
	});	
            
            
            
        $('.daterangepicker-sample2').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true
        },
        function(start, end, label) {

        });   
            
            
$('.daterangepicker-sample2[name="hello1"]').daterangepicker({
        "singleDatePicker": true,
        "showDropdowns": true,
        "opens": "nxdc-single",
        "timePicker": true,
        "timePicker24Hour": true,
        "timePickerSeconds": true,
        locale: {
            format: 'MM/DD/YYYY h:mm A'
        }
    },
    function(start, end, label) {

    });
                    
			
        });
    });
});