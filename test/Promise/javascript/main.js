/**
 * Created by Wangcy on 2015/12/19.
 */
!(function(w, d) {
    "use strict";

    var btn = d.getElementById("btn"),
        log = d.getElementById("log");

    var promiseCount = 0;
    function testPromise() {
        var thisPromiseCount = ++ promiseCount;

        log.insertAdjacentHTML("beforeend", thisPromiseCount + ") started (sync code start)<br>");

        var p1 = new Promise(function(resolve, reject) {
            log.insertAdjacentHTML("beforeend", thisPromiseCount + ") Promise started (async code start)<br>");

            setTimeout(function() {
                resolve(thisPromiseCount);
            }, 2000);
        });

        p1.then(function(value) {
            log.insertAdjacentHTML("beforeend", thisPromiseCount + ") Promise fulfilled (async code end)<br>");
            console.log(value);
        });
        
        setTimeout(function() {
            console.log("p1 then 4001");
            p1.then(function(value) {
                console.log(value, "setTimeout 40001");
            })
        }, 4001);

        log.insertAdjacentHTML("beforeend", thisPromiseCount + ") Promise made (sync code end)<br>");
    }

    btn.addEventListener("click", function() {
        testPromise();
    }, false);
    
    /**
     * Promise.all(iterable)
     * 返回一个 promise 对象，当 iterable 参数里面所有的 promise 都解决后，该 promise 也会被解决
     * 如果传入的 iterable 中某项不是一个 promise 该选项会被用 Promise.resolve 转换为一个 promise
     * 如果传入的任一 promise 被拒绝了，all Promise 立即带着该 promise 的拒绝原因进入了拒绝(rejected)状态，不再理会其他传入的 promise 状态 
     */
    (function() {
        var p1 = new Promise(function(resolve, reject) {
            setTimeout(resolve, 1500, "p1 fulfilled");
        });
        
        var p2 = new Promise(function(resolve, reject) {
            setTimeout(resolve, 2000, "p2 fulfilled");
        });
        
        Promise.all([p1, p2]).then(function(value) {
            console.log("all fulfilled ", value, performance.now());
        }, function(value) {
            console.log("some one rejected ", vaue, performance.now());
        });
        
        var p3 = new Promise(function(resolve, reject) {
            setTimeout(reject, 1500, "p3 rejected");
        });
        
        var p4 = new Promise(function(resolve, reject) {
            setTimeout(resolve, 1000, "p4 fulfilled");
        });
        
        Promise.all([p3, p4]).then(function(value) {
            console.log("all fulfilled ", value, performance.now());
        }, function(value) {
            console.log("some one rejected ", value, performance.now());
        });
    }());
    
    /**
     * Promise.race(iterable)
     * 返回一个 promise，这个 promise 在 iterable 中的任意一个 Promise 被解决或拒绝后，立即以相同的解决值被解决或以相同的拒绝原因被拒绝
     * 如果传入的 iterable 中某项不是一个 promise 改选项会被用 Promise.resolve 转换为一个 promise
     */
    (function() {
        var p1 = new Promise(function(resolve, reject) {
            setTimeout(reject, 1600, "p1 rejected");
        });
        
        var p2 = new Promise(function(resolve, reject) {
            setTimeout(resolve, 1500, "p2 fulfilled");
        });
        
        Promise.race([p1, p2]).then(function(value) {
            console.log("some fulfilled ", value, performance.now());
        }, function(value) {
            console.log("some rejected ", value, performance.now());
        });
        
        Promise.race([3, p2]).then(function(value) {
            console.log("some one fulfilled ", value, performance.now());
        }, function(value) {
            console.log("some one rejected ", value, performance.now());
        });
    }());
    
    /**
     * Promise.resolve(value)
     * 返回一个以给定值解析后的 Promise 对象
     * 如果这个值是一个 thenable(即带有 then 方法)，返回的 promise 会“跟随”这个 thenable 的对象，
     * 采用它的最终状态（resolved/rejected/pending/settled），否则以该值为成功状态返回 promise 对象
     */
    (function() {
        Promise.resolve("Success").then(function(value) {
            console.log(value);
        }, function(value) {
            // 不会调用
        });
        
        var p = Promise.resolve([1, 2, 3]);
        console.log(p);
        p.then(function(value) {
            console.log(value);
        });
        
        var p1 = new Promise(function(resolve, reject) {
            setTimeout(resolve, 1000, "p1 resolved");
        });
        
        var p2 = Promise.resolve(p1);
        p2.then(function(value) {
            console.log("Promise.resolve ", value);
        });
        
        var then1 = {
            then: function(onFulFill, onReject) {
                onFulFill("then1 fulfilled");
            }
        }
        
        Promise.resolve(then1).then(function(value) {
            console.log(value);
        });
        
        
        var then2 = {
            then: function(resolve) {
                throw new TypeError("Throwing");
                // resolve("Resolving");
            }
        }
        
        Promise.resolve(then2).then(function(value) {
            console.log("%c%s", "color:red;", value);
        }, function(value) {
            console.log("%c%s", "color:red;", value);
        }).catch(function(e) {
            console.info(e.message);
        });
        
        var then3 = {
            then: function(resolve) {
                resolve("resolve");
                throw new TypeError("Throwing");
            }
        }
        
        Promise.resolve(then3).then(function(value) {
            console.log("%c%s", "color:yellow;", value);
        }, function(value) {
            console.log("%c%s", "color:yellow", value);
        })
    }());
    
    /**
     * Promise.reject(reason)
     * 返回一个用 reason 拒绝的 Promise
     */
    (function() {
        Promise.reject("Testing static reject").then(function(reason) {
            // 未调用
        }, function(reason) {
            console.log(reason);
        });
        
        Promise.reject(new Error("fail")).then(function(error) {
            // 未调用
        }, function(error) {
            console.log(error);
        })
    }());
}(window, document));

!(function(root, d) {
    function PromiseTest() {
        this.doneList = [];
        this.failList = [];
        this.status = "pending";
    }

    PromiseTest.prototype = {
        construct: PromiseTest,
        resolve: function(result) {
            this.status = "resolved";
            while(this.doneList[0]) {
                this.doneList.shift().call(this, result);
            }
        },
        reject: function(result) {
            this.status = "rejected";
            while(this.failList[0]) {
                this.failList.shift().call(this, result);
            }
        },
        done: function(handler) {
            if(typeof handler === "function") {
                this.doneList.push(handler);
            }
            return this;
        },
        fail: function(handler) {
            if(typeof handler === "function") {
                this.failList.push(handler);
            }
            return this;
        },
        then: function(resolve, reject) {
            this.done(resolve).fail(reject);
            return this;
        },
        always: function(handler) {
            this.done(handler).fail(handler);
            return this;
        }
    };

    var p = new PromiseTest();

    var delay1 = function() {
        setTimeout(function() {
            p.resolve("success");
        }, Math.random() * 1000 + 1000);
        return p;
    };

    delay1();

    p.then(function(result) {
        console.log(result, Date.now());
    }).then(function(result) {
        console.log(result, Date.now());
        console.log(p.status);

        p.then(function() {
            console.log("timeout then success", Date.now());
            console.log(this);

            p.then(function() {
                console.log("timeout2 then success", Date.now());
                console.log(p.status);
            });

            console.log(p);

            setTimeout(function() {
                p.then(function() {
                    console.log("timeout3 then success", Date.now(), p.status);
                })
            }, 0);
        });
    });
    
    console.log(p);
}(window, document));