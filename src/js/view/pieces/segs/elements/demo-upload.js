define(function() {
    function Demo() {
        $('.upload-container').fileupload({
            ajax: {
                url: '/upload.php'
            },
            allowSize: [],
            type: 'image'
        });


        $('.upload-container1').fileupload({
            ajax: {
                url: '/upload.php'
            },
            width: 500,
            height: 150,
            type: /text\/comma-separated-values|text\/plain/,
            previewTpl: function(file, src) {
                console.log(arguments)
                return '<p><i class="glyphicon glyphicon-file-o"></i>' + file.name + '</p>' +
                    '<p class="small">文件大小：' + file.size + 'B</p>' +
                    '<p class="small">最后修改：' + new Date(file.lastModified).toLocaleString() + '</p>';
            }
        });
    }
    return Demo;
});
