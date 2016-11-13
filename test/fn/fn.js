/**
 * 扩展jQuery对象命名空间，这种写法this指向jQuery对象
 */
(function($) {
    $.fn.showLog = function() {
        console.group('$.fn.showLog function');
            console.log(this);
        console.groupEnd();
    }
}(jQuery));

/**
 * 扩展jQuery对象命名空间，这种写法this指向jQuery对象
 */
(function($) {

    $.fn.extend({
        showNodeName1: function() {
            console.group('$.fn.extend object');
                console.log(this);
            console.groupEnd();
        },
        showNodeName2: function() {
            console.group('$.fn.extend object');
                console.log(this);
            console.groupEnd();
        }
    });

}(jQuery));

/**
 * 扩展jQuery类本身，为类添加新的方法，this指向jQuery类
 */
(function($) {
    $.extend({
        showThis: function() {
            console.group('$.extend function');
                console.log(this);
            console.groupEnd();
        }
    })
}(jQuery));

/**
 * 扩展jQuery类本身，为类添加新的方法，this指向当前对象
 */
(function($, w) {

    var screen = w.screen;

    $.extend({
        showScreen: {
            width: function() {
                console.group('$.extend object');
                    console.log(this);
                console.groupEnd();
            },
            availWidth: function() {
                console.group('$.extend object');
                    console.log(this);
                console.groupEnd();
            }
        }
    });

}(jQuery, window));


$(function() {
    $("body").showLog();

    $("h1").showNodeName1();
    $("h1").showNodeName2();

    $.showScreen.width();
    $.showScreen.availWidth();

    $.showThis();
})