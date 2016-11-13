var cusbox = {
    _pageX: 0,
    _pageY: 0,
    _left: 0,
    _top: 0,
    _showTime: 300,
    _hideTime: 300,

    showMes: function(event, dom, callback) {
        var callback = callback || function() {};
        if($(".overlay").size() === 0) {
            $("<div class='overlay'></div>").appendTo($("body"));
        }

        $(".overlay").fadeIn(200).fadeTo(0, 0.8);

        cusbox._pageX = $(event.target).offset().left + $(event.target).outerWidth() / 2;
        cusbox._pageY = $(event.target).offset().top + $(event.target).outerHeight() / 2;

        dom.css({"display": "block;", "visibilily": "hidden", "position": "absolute", "left": "-9999px", "top": "-9999px"});
        var domWidth = dom.outerWidth(),
            domHeight = dom.outerHeight();
        dom.css({"display": "none", "visibilily": "visible", "left": cusbox._pageX, "top": cusbox._pageY, "z-index": 99999});

        cusbox._left = ($(window).width() - domWidth) / 2 + $(window).scrollLeft() > 0 ? ($(window).width() - domWidth) / 2 + $(window).scrollLeft() : 0,
        cusbox._top = ($(window).height() - domHeight) / 2 + $(window).scrollTop() > 0 ? ($(window).height() - domHeight) / 2 + $(window).scrollTop() : 0;


        dom.animate({
            left: cusbox._left,
            top: cusbox._top
        }, cusbox._showTime).dequeue();

        dom.show(cusbox._showTime, function() {
            dom.css({"left": "50%", "margin-left": - domWidth / 2});
            callback();
        });

        $(window).bind("resize", function() {
            cusbox._pageX = $(event.target).offset().left + $(event.target).outerWidth / 2;
            cusbox._pageY = $(event.target).offset().top + $(event.target).outerHeight / 2;
            cusbox._left = ($(window).width() - domWidth) / 2 + $(window).scrollLeft() > 0 ? ($(window).width() - domWidth) / 2 + $(window).scrollLeft() : 0,
            cusbox._top = ($(window).height() - domHeight) / 2 + $(window).scrollTop() > 0 ? ($(window).height() - domHeight) / 2 + $(window).scrollTop() : 0;
        });
    },

    hideMes: function(dom, callback) {
        dom.css({"left": cusbox._left, "top": cusbox._top, "margin-left": "0"});
        dom.animate({
            left: cusbox._pageX,
            top: cusbox._pageY
        }, cusbox._hideTime).dequeue();
        dom.hide(cusbox._hideTime, function() {
            $(".overlay").fadeOut(100);
        });
    }
};

$(function() {
    $(".fenxiang_a, .list02").bind("click", function(event) {
        alert(1);
        cusbox.showMes(event, $(".pop_box1"));
    });
    // $(".pop_close").bind("click", function() {
    //     cusbox.hideMes($(".pop_box1"));
    // });
});