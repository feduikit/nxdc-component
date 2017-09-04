define(function() {
    function Static() {};
    /**菜单列表**/
    Static.MENU_LIST = [{ name: "首页", id: "home" },
        { name: "导引", id: "brief" },
        { name: "控件", id: "com" },
        { name: "CSS", id: "css" },
        { name: "下载&支持", id: "support" }
    ];

    Static.TABS = [
        [
            { name: "简介", part: "ack" },
            { name: "项目结构", part: "dl" },
            { name: "基本模板", part: "temp" },
            { name: "浏览器支持", part: "browser" }
        ],
        [

            { name: "如何使用", part: "js-start", id:"start", submenu:[] },
            {
                name: "导航类",
                id:"nav",
                submenu: [
                    { name: "面包屑", part: "js-bread" },
                    { name: "Tabs", part: "js-tabs" },
                    { name: "搜素输入框", part: "js-search" },
                    { name: "分页", part: "js-page" },
                    { name: "树状菜单", part: "js-tree" },
                    { name: "导航菜单", part: "js-vList" },

                ]
            }, {
                name: "视图类",
                id:"view",
                submenu: [
                    { name: "表格", part: "table" },
                    { name: "树状二维表1", part: "js-treable" },
                    { name: "树状二维表2", part: "js-sutable" },
                    { name: "进度条", part: "js-progressbar" },
                    { name: "Popover", part: "js-bubble" },
                    { name: "Gallery", part: "js-gallery" },
                ]
            }, {
                name: "表格类",
                id:"table",
                submenu: [
                    { name: "下拉菜单", part: "js-drop" },
                    { name: "文字下拉菜单", part: "js-drop2" },
                    { name: "日期范围选择器", part: "js-daterangepicker" },
                    { name: "时间范围选择器", part: "js-timerange" },
                    { name: "文件上传", part: "js-upload" },
                    { name: "组合选择器", part: "js-blend" },
                    { name: "Prompt", part: "js-prompt" },

                ]
            }, {
                name: "反馈类",
                id:"feedback",
                submenu: [
                    { name: "Tip", part: "js-tip" },
                    { name: "Alert", part: "js-alert" },
                    { name: "Confirm", part: "js-confirm" },
                    { name: "Popconfirm", part: "js-popconfirm" },
                ]
            }
        ],
        [
            { name: "概览", part: "overview" },
            { name: "栅格系统", part: "grid" },
            { name: "按钮", part: "button" },
            { name: "tabs", part: "tabs" },
            { name: "分页", part: "page" },
            { name: "单选/多选", part: "check-radio" },
            { name: "静态表单", part: "form" }
        ],
        [
            { name: "示例网站1", part: "site1" },
            { name: "示例网站2", part: "site2" }
        ]

    ];
    return Static;

});