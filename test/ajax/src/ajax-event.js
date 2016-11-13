(function() {

    var $xhrLog = $("#xhrLog"),
        $btnGet = $("#ajaxGet"),
        $btnPost = $("#ajaxPost"),
        $btnGetJson= $("#ajaxGetJson"),
        $btnGetJsonp = $("#ajaxGetJsonp"),
        $btnGetScript = $("#ajaxGetScript"),
        $btnLoad = $("#ajaxLoad"),
        $loadItem = $("#ajaxLoadItem"),
        $btnLoadPost = $("#ajaxLoadPost"),
        $loadPostItem = $("#ajaxLoadPostItem"),
        $btnAjaxSetup = $("#setAjaxSetup"),
        $btnAjaxSetupOff = $("#setAjaxSetupOff");

    $(document).ajaxStart(function() {
        $xhrLog.append($("<p><strong>ajaxStart</strong></p>"));
    }).ajaxSend(function(event, jqxhr, setting) {
        $xhrLog.append($("<p>" + event.type + ": <code>" + setting.url + "</code></p>"));
    }).ajaxError(function(event, jqxhr, setting, errorThrow) {
        $xhrLog.append($("<p>" + event.type + ": <code>" + setting.url + "</code> " + errorThrow + "</p>"));
    }).ajaxSuccess(function(event, jqxhr, setting) {
        console.log("%o 请求成功", setting.url);
        $xhrLog.append($("<p>" + event.type + ": <code>" + setting.url + "</code></p>"));
    }).ajaxComplete(function(event, jqxhr, setting) {
        $xhrLog.append($("<p>" + event.type + ": <code>" + setting.url + "</code></p>"));
    }).ajaxStop(function() {
        $xhrLog.append($("<p><strong>ajaxStop</strong></p><hr>"));
    });


    $btnGet.click(function() {
        $.get("data/example.txt", {name: "wangcy"});
    });

    $btnPost.click(function() {
        $.post("http://10.0.0.136:8080/getPrameters",
            {
                userName: "wangcy",
                userEmail: "122132@qq.com",
                userPaw: "asdf asdfjasdf7"
            });
    });

    $btnGetJson.click(function() {
        $.getJSON("data/example.json")
    });

    $btnGetJsonp.click(function() {
        $.getJSON("http://10.0.0.136:8080/responseJSONP?callbackName=?")
    });

    $btnGetScript.click(function() {
        $.getScript("data/example.js", function() {
            showWindowSize();
        });
    });

    $btnLoad.click(function() {
        $loadItem.load("data/example.html img");
    });

    $btnLoadPost.click(function() {
        $loadPostItem.load("http://10.0.0.136:8080/getPrameters",
            {
                userName: "wangcy",
                userEmail: "null",
                userPaw: undefined
            }
        );
    });

    $btnAjaxSetup.click(function() {
        $.ajaxSetup({
            global: true
        });
    });

    $btnAjaxSetupOff.click(function() {
        $.ajaxSetup({
            global: false
        });
    });

    $.ajaxPrefilter("json", function(options, originalOptions, jqxhr) {
        options.complete = function() {
            console.log("json complete");
        }
    });

}());

function getThemes(data) {
    console.log(data.themes[0].title);
}