(function() {
    
    $.ajax({
        url: "data/example.json",

        // 请求方式 get|post，默认 get
        type: "get",

        // 传递的参数，对象和数组会转换成字符串形式
        data: "time=" + new Date().getTime(),
        
        // 是否为异步请求，默认为 true
        // 如果需要发送同步请求，请将此选项设置为 false
        // 跨域请求和 dataType: "jsonp" 请求不支持同步操作
        async: true,

        // 是否缓存
        // 默认: true, dataType为"script"和"jsonp"时默认为false
        // 工作原理是在GET请求参数中附加"_={timestamp}"
        // 该参数不是其他请求所必须的，除了在IE8中，当一个POST请求一个已经用GET请求过的URL
        cache: false,

        // 请求发送前的回调函数，用来修改请求发送前jqXHR（在jQuery 1.4.x的中，XMLHttpRequest）对象，
        // 此功能用来设置自定义 HTTP 头信息，等等
        beforeSend: function(xhr) {
            console.group("beforeSend");
                console.log(xhr.readyState);
            console.groupEnd();
        },

        // 这个对象用于设置Ajax相关回调函数的 this对象
        // 默认情况下，这个 this对象 是一个ajax请求使用的参数设置对象
        context: document.body,
        
        // 预期服务器返回的数据类型
        // 如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断，比如XML MIME类型就被识别为XML
        //    xml: 返回 XML 文档，可用 jQuery 处理
        //   html: 返回纯文本 HTML 信息；包含的script标签会在插入dom时执行，脚本不会被缓存
        // script: 把响应的结果当作 JavaScript 执行
        //   json: 把响应的结果当作 JSON 执行，并返回一个JavaScript对象
        //  jsonp: 以 JSONP 的方式载入 JSON 数据块。会自动在所请求的URL最后添加 "?callback=?"
        //   text: 返回纯文本字符串
        dataType: "json",

        // 一个数据类型到数据类型转换器的对象。每个转换器的值是一个函数，返回经转换后的请求结果
        converters: {
            "* text": window.String,
            "text html": true,
            "text json": jQuery.parseJSON,
            "text xml": jQuery.parseXML
        },

        // 一个函数被用来处理XMLHttpRequest的原始响应数据
        // 这是一个预过滤功能，净化响应。您应该返回安全数据
        // 提供data和type两个参数：data是Ajax返回的原始数据，type是调用jQuery.ajax时提供的dataType参数
        dataFilter: function(data, type) {
            console.group('dataFilter');
                // console.log(data);
                console.log(type);
            console.groupEnd();
            return data;
        },
        
        // 请求失败时调用此函数，有以下3个参数
        // xhr对象: 描述发生错误类型的一个字符串 和 捕获的异常对象
        // textstatus: 如果发生了错误，除了得到null之外，还可能是"timeout", "error", "abort" ，和 "parsererror"
        // errorThrow: 接收HTTP状态的文本部分，比如： "Not Found" 或者 "Internal Server Error."
        // 注意：此处理程序在跨域脚本和JSONP形式的请求时不被调用。这是一个 Ajax Event
        error: function(xhr, textStatus, errorThrow) {
            console.group("error");
                console.log(xhr.readyState);
                console.log(textStatus);
                console.log(errorThrow);
                // console.log(this);
            console.groupEnd();
        },

        // 请求成功后的回调函数，有以下3个参数
        // data: 请求成功后的回调函数
        // textStatus: 描述状态的字符串
        // xhr: jqueryXMLHttpRequest对象
        success: function(data, textStatus, xhr) {
            console.group("success");
                console.log(data);
                console.log(textStatus);
                console.log(xhr.readyState);
                // console.log(this);
            console.groupEnd();
        },

        // 请求完成后回调函数(请求success 和 error之后均调用)，有以下2个参数
        // xhr: jqueryXMLHttpRequest对象
        // textStatus: 描述请求状态的字符串("success", "notmodified", "error", "timeout", "abort", 或者 "parsererror")
        complete: function(xhr, textStatus) {
            console.group("complete");
                console.log(xhr.readyState);
                console.log(textStatus);
                // console.log(this);
            console.groupEnd();
        }
    });

}());



(function() {

    var xhr = $.ajax({
        url: "data/example.json",
        dataType: "json",
        cache: false
    }).fail(function(xhr, textStatus, errorThrow) {
        console.log(xhr);
        console.log(xhr.readyState);
        console.log(textStatus);
        alert(errorThrow);
    }).done(function(data, textstatus, xhr) {
        var table = $("<table></table>");

        var themes = data.themes;

        for(var i = 0, length = themes.length; i < length; i++) {
            var tr = $("<tr></tr>");

            for(var j in themes[i]) {
                var td = $("<td></td>");
                td.html(themes[i][j]);
                td.appendTo(tr);
            }

            tr.appendTo(table);
        }

        $("body").append(table);
    }).always(function() {
        console.log("%o 请求结束", this.url);
    });

}());




(function() {

    $.ajax({
        url: "data/example-jsonp.json",
        dataType: "jsonp",
        // jsonp: "callbackName",
        jsonpCallback: "themes"
    }).fail(function(xhr, textStatus, errorThrow) {
        console.log(errorThrow);
    }).done(function(data, textStatus, xhr) {
        console.log(data.themes);
    }).always(function() {
        console.log("%o 请求结束", this.url);
    });

}());



// 这里实现跨域请求，js文件里面有调用这个方法 getThemes({...})
function getThemes(data) {
    console.log(data);
}

(function() {

    $.ajax({
        url: "data/example.js",
        dataType: "script",
        cache: false
    }).fail(function(xhr, textStatus, errorThrow) {
        console.log(errorThrow);
    }).done(function(data, textStatus, xhr) {
        
        // 请求到的javascript文件，里面的函数会执行
        // showWindowSize();
    }).always(function() {
        console.log("%o 请求结束", this.url);
    });

}());


(function() {

    $.ajax({
        url: "data/example.txt",
        dataType: "text",
        cache: false
    }).fail(function(xhr, textStatus, errorThrow) {

    }).done(function(data, textstatus, xhr) {
        var blockquote = $("<blockquote>");

        var split = data.split(/\s+/);

        for(var i = 0, j = split.length; i < j; i++) {
            var p = $("<p><q>");

            p.children().html(split[i]);
            blockquote.append(p);
        }

        $("body").append(blockquote);
    }).always(function() {
        console.log("%o 请求结束", this.url);
    });

}());


(function() {

    $.ajax({
        url: "data/example.html",
        dataType: "html",
        cache: true
    }).fail(function(xhr, textStatus, errorThrow) {

    }).done(function(data, textStatus, xhr) {
        var div = $("<div id=\"htmlTemplate\">");

        div.html(data);
        $("body").append(div);
    }).always(function() {
        console.log("%o 请求结束", this.url);
    });

}());


(function() {

    $.ajax({
        url: "data/example.xml",
        dataType: "xml"
    }).fail(function(xhr, textStatus, errorThrow) {
        console.log(errorThrow);
    }).done(function(data, textStatus, xhr) {
        console.log(data.getElementsByTagName("themes"));
    }).always(function() {
        console.log("%o 请求结束", this.url);
    });

}());