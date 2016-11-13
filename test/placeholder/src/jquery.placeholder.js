(function() {

    $.fn.extend({
        placeholder: function(options) {

            // 如果支持 placeholder 返回
            if("placeholder" in document.createElement("input")) {
                return;
            }

            var config = {

                // input外层element className
                wrap: "js-placeholder-wrap",

                // input后面element className
                placeholder: "placeholder",

                // 触发事件
                // ie9以下绑定propertychange事件
                // ie9 propertychange和input 事件存在bug，需要绑定多个事件
                triggerEvent: (function() {
                    return window.addEventListener ? "keydown.placeholder keypress.placeholder " +
                        "keyup.placeholder mousedown.placeholder mouseup.placeholder click.placeholder" :
                        "propertychange.placeholder";
                }())
            }

            if(options) {
                config = $.extend(config, options);
            }

            // 标记已经执行过 placeholder
            var markOut = {
                attr: "data-placeholder",
                val: "1"
            }

            this.each(function(_i, _t) {
                if((_t.nodeName === "INPUT" || _t.nodeName === "TEXTAREA") &&
                        _t.type != "submit" && _t.type != "reset" && _t.type != "button" && _t.type !="file" &&
                        _t.getAttribute(markOut.attr) !== markOut.val) {

                    var $t = $(_t),
                        placeholderText = $t.attr("placeholder");

                    var $inputWrap = $('<span class="' + config.wrap + '"></span>'),
                        $placeholder = $('<i class="' + config.placeholder + '"></i>');

                    // 获取 input 的大小及位置样式并赋值给 inputWrap
                    // input 的 [float|margin|vertical-align|background-color]在 stylesheet 里面重新初始化
                    var baseStyle = {
                                display: $t.css("display"),
                                  width: $t.outerWidth(),
                                 height: $t.outerHeight(),
                                 margin: $t.css("margin"),
                          verticalAlign: $t.css("vertical-align"),
                        backgroundColor: $t.css("background-color")
                    }

                    var cssFloat = $t.css("float");

                    $inputWrap.css(baseStyle).css("float", cssFloat);


                    // 获取 input 的定位样式
                    // 如果input position不等于static，位置样式赋值给inputWrap
                    var positionStyle = {
                        position: $t.css("position"),
                            left: $t.css("left"),
                             top: $t.css("top"),
                           right: $t.css("right"),
                          bottom: $t.css("bottom"),
                          zIndex: $t.css("z-index")
                    }

                    if(positionStyle.position != "static") {
                        $inputWrap.css(positionStyle);
                    }


                    var computeStyle = {
                        clientHeight: $t.height(),
                         clientWidth: $t.width(),
                            fontSize: $t.css("font-size"),
                          lineHeight: $t.css("line-height"),
                          fontFamily: $t.css("font-family")
                    }


                    if(_t.nodeName == "TEXTAREA") {

                        /**
                         * 为 textarea时
                         * placeholder高度等于textarea的内部高度
                         * line-height等于textarea行高
                         * padding-top等于textarea的padding-top加border-top-width（外部高度减内部高度值的一半）
                         */
                        $placeholder.css({
                                 "height": computeStyle.clientHeight + "px",
                            "line-height": computeStyle.lineHeight,
                            "padding-top": (baseStyle.height - computeStyle.clientHeight)/2 + "px"
                        });
                    } else {

                        /**
                         * 为 input时
                         * placeholder高度等于input的外部高度
                         * line-height等于input的外部高度
                         */
                        $placeholder.css({
                                 "height": baseStyle.height + "px",
                            "line-height": baseStyle.height + "px"
                        });
                    }

                    /**
                     * placeholder宽度等于 input内部宽度
                     * padding-left等于 input的padding-left加border-left-width（外部宽度减内部宽度值的一半）
                     * font-size等于 input的font-size
                     * font-family等于 input的font-family
                     *
                     * placeholder字段赋值input placeholder属性
                     */
                    $placeholder.css({
                               "width": computeStyle.clientWidth + "px",
                        "padding-left": (baseStyle.width - computeStyle.clientWidth)/2 + "px",
                           "font-size": computeStyle.fontSize,
                         "font-family": computeStyle.fontFamily
                    }).html(placeholderText);

                    // input外层添加inputWrap，后面添加placeholder
                    $t.wrap($inputWrap).after($placeholder);


                    // 绑定propertychange事件，input值为空时placeholder显示，否则隐藏
                    $t.on(config.triggerEvent, function(event) {
                        $placeholder.css("visibility", $t.val() == "" ? "visible" : "hidden");
                    }).attr(markOut.attr, markOut.val);

                    // ie9使用attchEvent绑定的propertychange事件才会触发
                    if(window.addEventListener) {
                        _t.attachEvent("onpropertychange", function(event) {
                            $placeholder.css("visibility", $t.val() == "" ? "visible" : "hidden");
                        });
                    }
                }
            });
            
            return this;
        }
    });
    
}(jQuery));