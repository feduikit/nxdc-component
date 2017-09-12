/***
** ajax的请求封装
** @constructor {Class} Http
** singleton 单例
**/
define(['parser'],function(parser){
    var pre = "";
    function Http(){
	   var _this = this;
	   /***
	   **@param {String} url
	   **@param {Object} body
	   **@return {Promise}
	   **/
       this.post = function(url,body){
            return $.ajax({
              type: "POST",
              url: url,
              data: body,
              dataType:'json'//返回数据类型    
            });              
        };
        
		/**
		**@param {String} url
		**@return {Promise}
		**/
        this.get = function(url){
            return $.ajax({
              type: "GET",
              url: url
//              dataType:'json'//返回数据类型   default: Intelligent Guess (xml, json, script, or html)  
            });         
        };
        
        /**
        *@param {String} url 请求地址
        *@param {Object} bd 请求body
		*@param {String} type (optional)
		*@return {Promise}
        */
        this.do = function(url,bd,type){
            if(typeof(bd) == "funciton") bd = new db();
            url = pre + url;
            return $.ajax({
              type: type || (bd ?"POST":"GET"),
              url: url,
              data: bd,
              xhrFields: {
                    withCredentials: true
                }                
            });            
        };
        /**
         *@param {String} url 请求地址
         *@param {Object} bd 请求body
		 *@param {String} type (optional)
         */
        this.doAsync = function(url,bd,type){
            if(typeof(bd) == "funciton") bd = new db();
            url = pre + url;
            return $.ajax({
                type: type || (bd ?"POST":"GET"),
                url: url,
                data: bd,
                async: false,
                xhrFields: {
                    withCredentials: true
                }
            });
        };
		
		/***
		**请求，返回处理
		**/
		this.exec = function(url,body){
			this.do(url,body).then(function(result){
				parser.result(result);
			},function(err){
				parser.err(err);
			});
		}
	};
	
	return new Http;
});