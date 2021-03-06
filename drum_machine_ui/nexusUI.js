! function t(i, e, s) {
    function h(n, r) {
        if (!e[n]) {
            if (!i[n]) {
                var l = "function" == typeof require && require;
                if (!r && l) return l(n, !0);
                if (o) return o(n, !0);
                var a = new Error("Cannot find module '" + n + "'");
                throw a.code = "MODULE_NOT_FOUND", a
            }
            var c = e[n] = {
                exports: {}
            };
            i[n][0].call(c.exports, function(t) {
                var e = i[n][1][t];
                return h(e ? e : t)
            }, c, c.exports, t, i, e, s)
        }
        return e[n].exports
    }
    for (var o = "function" == typeof require && require, n = 0; n < s.length; n++) h(s[n]);
    return h
}({
    1: [function(t, e, s) {
        var h = t("./lib/core/manager"),
            o = t("./lib/utils/dom"),
            n = t("./lib/utils/drawing"),
            r = t("./lib/utils/math"),
            l = t("extend"),
            a = t("webfontloader");
        window.nx = new h, window.nx.onload = function() {}, window.nx = l(window.nx, o), window.nx = l(window.nx, n), window.nx = l(window.nx, r), window.initNexus = function() {
            try {
                a.load({
                    google: {
                        families: ["Open Sans"]
                    }
                })
            } catch (t) {
                console.log("font not loaded")
            }
            nx.addStylesheet();
            var e = document.getElementsByTagName("canvas");
            for (i = 0; i < e.length; i++) nx.transform(e[i]);
            nx.isTouchDevice && (document.addEventListener("touchmove", nx.blockMove, !0), document.addEventListener("touchstart", nx.blockMove, !0)), nx.onload(), nx.startPulse()
        }, setTimeout(function() {
            initNexus()
        }, 0)
    }, {
        "./lib/core/manager": 2,
        "./lib/utils/dom": 4,
        "./lib/utils/drawing": 5,
        "./lib/utils/math": 6,
        extend: 48,
        webfontloader: 53
    }],
    2: [function(t, e, s) {
        var h = (t("../utils/timing"), t("../utils/drawing")),
            o = t("events").EventEmitter,
            n = t("util"),
            r = t("../utils/transmit"),
            l = e.exports = function() {
                o.apply(this), this.widgets = new Object, this.elemTypeArr = new Array, this.aniItems = new Array, this.showLabels = !1, this.starttime = (new Date).getTime(), r && (this.sendsTo = r.setGlobalTransmit, this.setAjaxPath = r.setAjaxPath, this.destination = "js", this.ajaxPath = "lib/nexusOSCRelay.php"), this.isTouchDevice = "ontouchstart" in document.documentElement ? !0 : !1, this.metas = document.getElementsByTagName("meta"), this.globalWidgets = !0, this.font = "'open sans'", this.fontSize = 14, this.fontWeight = "normal", this.context = new(window.AudioContext || window.webkitAudioContext), this.sys = navigator.userAgent.toLowerCase(), this.isAndroid = this.sys.indexOf("android") > -1, this.isMobile = this.sys.indexOf("mobile") > -1, this.throttlePeriod = 20, this.colors.borderhl = h.shadeBlendConvert(-.5, this.colors.border), this.colors.accenthl = h.shadeBlendConvert(.15, this.colors.accent)
            };
        n.inherits(l, o), l.prototype.add = function(t, i) {
            if (t) {
                var e = document.createElement("canvas");
                if (e.setAttribute("nx", t), i) {
                    if ((i.x || i.y) && (e.style.position = "absolute"), i.x && (e.style.left = i.x + "px"), i.y && (e.style.top = i.y + "px"), i.w && (e.style.width = i.w, "string" != typeof i.w && (e.width = i.w)), i.h && (e.style.height = i.h, "string" != typeof i.h && (e.height = i.h)), i.parent) {
                        var s;
                        "string" == typeof i.parent ? s = document.getElementById(i.parent) : i.parent instanceof HTMLElement ? s = i.parent : i.parent instanceof jQuery && (s = i.parent[0])
                    }
                    i.name && (e.id = i.name)
                }
                if (!s) var s = document.body;
                return s.appendChild(e), this.transform(e)
            }
        }, l.prototype.transform = function(i, e) {
            for (var s in nx.widgets)
                if (nx.widgets[s].canvasID == i.id) return;
            if (e) var h = e;
            else var h = i.getAttribute("nx");
            if (h) {
                var o, n = 0;
                for (j = 0; j < this.elemTypeArr.length; j++) this.elemTypeArr[j] === h && n++;
                if (this.elemTypeArr.push(h), !i.id) {
                    var r = n + 1;
                    i.id = h + r
                }
                if (h) try {
                    var o = new(t("../widgets")[h])(i.id)
                } catch (l) {
                    return void console.log("creation of " + h + " failed")
                }
                return o.type = h, this.widgets[o.canvasID] = o, this.globalWidgets && (window[o.canvasID] = this.widgets[o.canvasID]), o.init(), o
            }
        }, l.prototype.transmit = function(t, i) {
            this.makeOSC(this.emit, t, i), this.emit("*", t, i)
        }, l.prototype.colorize = function(t, i) {
            i || (i = t, t = "accent"), this.colors[t] = i, this.colors.borderhl = h.shadeBlendConvert(.1, this.colors.border, this.colors.black), this.colors.accenthl = h.shadeBlendConvert(.3, this.colors.accent);
            for (var e in this.widgets) this.widgets[e].colors[t] = i, this.widgets[e].colors.borderhl = this.colors.borderhl, this.widgets[e].colors.accenthl = this.colors.accenthl, this.widgets[e].draw()
        }, l.prototype.setThrottlePeriod = function(t) {
            this.throttlePeriod = t;
            for (var i in this.widgets) this.widgets[i].throttlePeriod = this.throttlePeriod
        }, l.prototype.colors = {
            accent: "#ff5500",
            fill: "#eeeeee",
            border: "#e3e3e3",
            mid: "#1af",
            black: "#000000",
            white: "#FFFFFF"
        }, l.prototype.startPulse = function() {
            this.pulseInt = setInterval("nx.pulse()", 30)
        }, l.prototype.stopPulse = function() {
            clearInterval(this.pulseInt)
        }, l.prototype.pulse = function() {
            for (var t = 0; t < this.aniItems.length; t++) this.aniItems[t]()
        }, l.prototype.addAni = function(t) {}, l.prototype.removeAni = function(t) {
            this.aniItems.splice(this.aniItems.indexOf(t))
        }, l.prototype.addStylesheet = function() {
            var t = '<style>select {width: 150px;padding: 5px 5px;font-size: 16px;color:#666666;border: solid 2px #e4e4e4;border-radius: 0;-webkit-appearance: none;outline: none;background-color:#EEE;font-family:"open sans";}input[type=text]::-moz-selection { background: transparent; }input[type=text]::selection { background: transparent; }input[type=text]::-webkit-selection { background: transparent; }canvas { border-radius:0px;moz-border-radius:0px;webkit-border-radius:0px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}input[type=text] { border-radius:5px;moz-border-radius:5px;webkit-border-radius:5px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}</style>';
            document.head.innerHTML = document.head.innerHTML + t
        }, l.prototype.setViewport = function(t) {
            for (i = 0; i < this.metas.length; i++) "viewport" == this.metas[i].name && (this.metas[i].content = "minimum-scale=" + t + ", maximum-scale=" + t)
        }, l.prototype.setLabels = function(t) {
            "on" == t ? this.showLabels = !0 : this.showLabels = !1;
            for (var i in this.widgets) this.widgets[i].draw()
        }, l.prototype.setProp = function(t, i) {
            if (t && i) {
                nx[t] = i;
                for (var e in this.widgets) this.widgets[e][t] = i, this.widgets[e].draw()
            }
        }, l.prototype.blockMove = function(t) {
            t.target.attributes.nx && (t.preventDefault(), this.isAndroid && (t.stopPropagation ? t.stopPropagation() : !1))
        }, l.prototype.calculateDigits = function(t) {
            var i = this.max ? Math.floor(this.max).toString().length : 1;
            if (i < this.maxdigits) var e = 3 - i;
            else var e = 0;
            return {
                wholes: i,
                decimals: e,
                total: i + e
            }
        }, l.prototype.themes = {
            light: {
                fill: "#DDDDDD",
                border: "#DADADA",
                black: "#000000",
                white: "#FFFFFF",
                body: "#F3F3F3"
            },
            dark: {
                fill: "#222",
                border: "#292929",
                black: "#FFFFFF",
                white: "#000000",
                body: "#111"
            },
            red: "#f24",
            orange: "#f50",
            yellow: "#ec1",
            green: "#1c9",
            blue: "#09d",
            purple: "#40a"
        }, l.prototype.skin = function(t) {
            var i = t.split("-");
            nx.colorize("fill", nx.themes[i[0]].fill), nx.colorize("border", nx.themes[i[0]].border), nx.colorize("black", nx.themes[i[0]].black), nx.colorize("white", nx.themes[i[0]].white), nx.colorize("accent", nx.themes[i[1]]), document.body.style.backgroundColor = nx.themes[i[0]].body
        }, l.prototype.labelSize = function(t) {
            for (var i in this.widgets) {
                var e = this.widgets[i];
                if (e.label) {
                    var s = e.GUI.h + t;
                    e.labelSize = t, ["select", "number", "text"].indexOf(e.type) < 0 && e.resize(!1, s)
                }
            }
            var h = document.querySelectorAll(".nxlabel");
            console.log(h);
            for (var o = 0; o < h.length; o++) console.log(h[o]), h[o].style.fontSize = t / 2.8 + "px", console.log(h[o].style.fontSize)
        }
    }, {
        "../utils/drawing": 5,
        "../utils/timing": 7,
        "../utils/transmit": 8,
        "../widgets": 18,
        events: 47,
        util: 52
    }],
    3: [function(require, module, exports) {
        var EventEmitter = require("events").EventEmitter,
            util = require("util"),
            domUtils = require("../utils/dom"),
            drawingUtils = require("../utils/drawing"),
            timingUtils = require("../utils/timing"),
            transmit = require("../utils/transmit"),
            widget = module.exports = function(t) {
                if (EventEmitter.apply(this), this.preClick = this.preClick.bind(this), this.preMove = this.preMove.bind(this), this.preRelease = this.preRelease.bind(this), this.preTouch = this.preTouch.bind(this), this.preTouchMove = this.preTouchMove.bind(this), this.preTouchRelease = this.preTouchRelease.bind(this), this.canvasID = t, this.oscPath = "/" + t, !document.getElementById(t)) {
                    var i = document.createElement("canvas");
                    i.id = t, document.body.appendChild(i)
                }
                if (this.type = void 0, this.canvas = document.getElementById(t), this.context = this.canvas.getContext("2d"), this.checkPercentage(), this.canvas.className = this.canvas.className ? this.canvas.className += " nx" : "nx", this.canvas.height = window.getComputedStyle(document.getElementById(t), null).getPropertyValue("height").replace("px", ""), this.canvas.width = window.getComputedStyle(document.getElementById(t), null).getPropertyValue("width").replace("px", ""), this.height = parseInt(window.getComputedStyle(document.getElementById(t), null).getPropertyValue("height").replace("px", "")), this.width = parseInt(window.getComputedStyle(document.getElementById(t), null).getPropertyValue("width").replace("px", "")), this.defaultSize || (this.defaultSize = {
                        width: 100,
                        height: 100
                    }), this.label = !1, this.labelSize = 30, this.labelAlign = "center", this.labelFont = "'Open Sans'", null != this.canvas.getAttribute("label") && (this.label = this.canvas.getAttribute("label"), this.origDefaultHeight = this.defaultSize.height), this.label && (this.defaultSize.height += this.labelSize), 300 == this.width && 150 == this.height) this.canvas.width = 2 * this.defaultSize.width, this.canvas.height = 2 * this.defaultSize.height, this.width = this.defaultSize.width, this.height = this.defaultSize.height;
                else {
                    var e = this.width,
                        s = this.height;
                    this.canvas.width = 2 * e, this.canvas.height = 2 * s, this.width = e, this.height = s
                }
                this.canvas.style.width = this.canvas.width / 2 + "px", this.canvas.style.height = this.canvas.height / 2 + "px", this.context.scale(2, 2), this.makeRoomForLabel(), this.offset = domUtils.findPosition(this.canvas), this.center = {
                    x: this.GUI.w / 2,
                    y: this.GUI.h / 2
                }, this.lineWidth = 2, this.context.lineWidth = this.lineWidth, this.colors = new Object;
                for (var h in nx.colors) this.colors[h] = nx.colors[h];
                this.clickPos = {
                    x: 0,
                    y: 0
                }, this.clickPos.touches = new Array, this.clicked = !1, this.value = 0, this.val = new Object, this.pval = new Object, this.nodePos = new Array, this.deltaMove = new Object, this.throttlePeriod = nx.throttlePeriod, this.throttle = timingUtils.throttle, this.hasMoved = !1, this.isRecording = !1, this.tapeNum = 0, this.recorder = null, transmit && (this.sendsTo = transmit.setWidgetTransmit, this.destination = "js"), this.events = new Object, nx.isTouchDevice ? (this.canvas.ontouchstart = this.preTouch, this.canvas.ontouchmove = this.preTouchMove, this.canvas.ontouchend = this.preTouchRelease) : this.canvas.addEventListener("mousedown", this.preClick, !1), this.fontSize = nx.fontSize, this.fontWeight = nx.fontWeight, this.font = nx.font, this.clickCB = !1, this.releaseCB = !1, this.actuated = !0
            };
        util.inherits(widget, EventEmitter), widget.prototype.transmit = nx.transmit, widget.prototype.makeOSC = function(t, i) {
            if (this.action = t, "object" == typeof i && null !== i)
                for (var e in i)
                    if ("object" == typeof i[e] && null !== i[e])
                        for (var s in i[e]) this.action(e + "/" + s, i[e][s]);
                    else this.action(e, i[e]);
            else("number" == typeof i || "string" == typeof i) && this.action("value", i)
        }, widget.prototype.getOffset = function() {
            this.offset = domUtils.findPosition(this.canvas)
        }, widget.prototype.preClick = function(t) {
            this.actuated = !0, this.offset = domUtils.findPosition(this.canvas), this.clickPos = domUtils.getCursorPosition(t, this.offset), document.addEventListener("mousemove", this.preMove, !1), document.addEventListener("mouseup", this.preRelease, !1), this.clicked = !0, this.deltaMove.x = 0, this.deltaMove.y = 0, this.hasMoved = !1, this.clickCB ? this.clickCB() : null, this.click(t), document.body.style.userSelect = "none", document.body.style.mozUserSelect = "none", document.body.style.webkitUserSelect = "none", document.body.style.cursor = "none"
        }, widget.prototype.preMove = function(t) {
            this.actuated = !0;
            var i = domUtils.getCursorPosition(t, this.offset);
            this.deltaMove.y = i.y - this.clickPos.y, this.deltaMove.x = i.x - this.clickPos.x, this.clickPos = i, this.hasMoved = !0, this.move(t)
        }, widget.prototype.preRelease = function(t) {
            this.actuated = !0, document.removeEventListener("mousemove", this.preMove, !1), document.removeEventListener("mouseup", this.preRelease, !1), this.clicked = !1, this.releaseCB ? this.releaseCB() : null, this.release(), document.body.style.userSelect = "text", document.body.style.mozUserSelect = "text", document.body.style.webkitUserSelect = "text", document.body.style.cursor = "pointer"
        }, widget.prototype.preTouch = function(t) {
            this.actuated = !0, this.clickPos = domUtils.getTouchPosition(t, this.offset), this.clicked = !0, this.deltaMove.x = 0, this.deltaMove.y = 0, this.hasMoved = !1, this.touch(t)
        }, widget.prototype.preTouchMove = function(t) {
            if (this.clicked) {
                this.actuated = !0;
                var i = domUtils.getTouchPosition(t, this.offset);
                this.deltaMove.y = i.y - this.clickPos.y, this.deltaMove.x = i.x - this.clickPos.x, this.clickPos = i, this.hasMoved = !0, this.touchMove(t)
            }
        }, widget.prototype.preTouchRelease = function(t) {
            if (this.actuated = !0, t.targetTouches.length >= 1) {
                var i = domUtils.getTouchPosition(t, this.offset);
                this.clickPos = i
            } else this.clicked = !1;
            this.touchRelease()
        }, widget.prototype.draw = function() {}, widget.prototype.click = function() {}, widget.prototype.move = function() {}, widget.prototype.release = function() {}, widget.prototype.touch = function() {
            this.click()
        }, widget.prototype.touchMove = function() {
            this.move()
        }, widget.prototype.touchRelease = function() {
            this.release()
        }, widget.prototype.adjustSizeIfDefault = function() {
            300 == this.width && 150 == this.height && (this.canvas.width = this.defaultSize.width, this.canvas.height = this.defaultSize.height, this.width = this.defaultSize.width, this.height = this.defaultSize.height)
        }, widget.prototype.makeRoundedBG = function() {
            this.bgLeft = this.lineWidth, this.bgRight = this.width - this.lineWidth, this.bgTop = this.lineWidth, this.bgBottom = this.height - this.lineWidth, this.bgHeight = this.bgBottom - this.lineWidth, this.bgWidth = this.bgRight - this.lineWidth, drawingUtils.makeRoundRect(this.context, this.bgLeft, this.bgTop, this.bgWidth, this.bgHeight)
        }, widget.prototype.erase = function() {
            this.context.clearRect(0, 0, this.width, this.height)
        }, widget.prototype.hideCursor = function() {
            this.canvas.style.cursor = "none"
        }, widget.prototype.showCursor = function() {
            this.canvas.style.cursor = "auto"
        }, widget.prototype.getName = function() {
            return "deprecated -- use widget.type instead"
        }, widget.prototype.set = function(t, i) {
            if (this.actuated = !1, "object" == typeof this.val && "null" !== this.val) {
                if ("object" == typeof t && "null" !== t)
                    for (var e in t) this.val[e] = t[e]
            } else("string" == typeof this.val || "number" == typeof this.val) && ("object" == typeof t && "null" !== t ? (this.val = t.value, this.draw()) : ("string" == typeof t || "number" == typeof t) && (this.val = t));
            this.draw(), i && this.transmit(this.val, !0)
        }, widget.prototype.destroy = function() {
            var t = nx.elemTypeArr.indexOf(this.getName());
            nx.elemTypeArr.splice(t, 1), this.canvas.ontouchmove = null, this.canvas.ontouchend = null, this.canvas.onclick = null, this.canvas.onmousemove = null, this.canvas.onmouseoff = null, document.removeEventListener("mousemove", this.preMove, !1), document.removeEventListener("mouseup", this.preRelease, !1);
            var i = document.getElementById(this.canvasID);
            i && i.parentNode.removeChild(i), this.customDestroy();
            var e = this.canvasID;
            delete nx.widgets[e], delete window[e]
        }, widget.prototype.customDestroy = function() {}, widget.prototype.wrapText = function(t, i, e, s, h) {
            if (t) {
                for (var o = t.split(" "), n = "", r = 0; r < o.length; r++) {
                    var l = n + o[r] + " ",
                        a = this.context.measureText(l),
                        c = a.width;
                    c > s && r > 0 ? (this.context.fillText(n, i, e), n = o[r] + " ", e += h) : n = l
                }
                this.context.fillText(n, i, e)
            }
        }, widget.prototype.drawLabel = function() {
            if (this.label) with(this.context) fillStyle = this.colors.black, textAlign = "center", textBaseline = "middle", font = this.labelSize / 2.8 + "px " + this.labelFont + " normal", fillText(this.label, this.width / 2, this.labelY)
        }, widget.prototype.saveCanv = function() {
            var t = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            window.location.href = t
        }, widget.prototype.setFont = function() {
            with(this.context) textAlign = "center", font = this.fontWeight + " " + this.fontSize + "px " + this.font, fillStyle = this.colors.black, globalAlpha = 1
        }, widget.prototype.checkPercentage = function() {
            var t = this.canvas.style.width,
                i = this.canvas.style.height;
            (t.indexOf("%") >= 0 || i.indexOf("%") >= 0) && (this.percent = {
                w: t.indexOf("%") >= 0 ? t.replace("%", "") : !1,
                h: i.indexOf("%") >= 0 ? i.replace("%", "") : !1
            }, this.stretch())
        }, widget.prototype.stretch = function() {
            window.addEventListener("resize", function(t) {
                if (this.percent.w) {
                    var i = window.getComputedStyle(this.canvas.parentNode, null).getPropertyValue("width").replace("px", "");
                    i *= this.percent.w / 100
                } else var i = !1;
                if (this.percent.h) {
                    var e = window.getComputedStyle(this.canvas.parentNode, null).getPropertyValue("height").replace("px", "");
                    e *= this.percent.h / 100
                } else var e = !1;
                this.resize(i, e)
            }.bind(this))
        }, widget.prototype.resize = function(t, i) {
            this.canvas.width = t ? 2 * t : this.canvas.width, this.canvas.height = i ? 2 * i : this.canvas.height, this.width = t ? t : this.width, this.height = i ? i : this.height, this.canvas.style.width = this.width + "px", this.canvas.style.height = this.height + "px", this.context.scale(2, 2), this.center = {
                x: this.GUI.w / 2,
                y: this.GUI.h / 2
            }, this.makeRoomForLabel(), this.init(), this.draw()
        }, widget.prototype.normalize = function(t) {
            return nx.scale(t, this.min, this.max, 0, 1)
        }, widget.prototype.rangify = function(t) {
            return nx.scale(t, 0, 1, this.min, this.max)
        }, widget.prototype.makeRoomForLabel = function() {
            this.GUI = {
                w: this.width,
                h: this.label ? this.height - this.labelSize : this.height
            }, this.labelY = this.height - this.labelSize / 2
        }
    }, {
        "../utils/dom": 4,
        "../utils/drawing": 5,
        "../utils/timing": 7,
        "../utils/transmit": 8,
        events: 47,
        util: 52
    }],
    4: [function(t, i, e) {
        e.findPosition = function(t) {
            var i = document.body,
                e = document.defaultView,
                s = document.documentElement,
                h = document.createElement("div");
            h.style.paddingLeft = h.style.width = "1px", i.appendChild(h);
            var o = 2 == h.offsetWidth;
            i.removeChild(h), h = t.getBoundingClientRect();
            var n = s.clientTop || i.clientTop || 0,
                r = s.clientLeft || i.clientLeft || 0,
                l = e.pageYOffset || o && s.scrollTop || i.scrollTop,
                a = e.pageXOffset || o && s.scrollLeft || i.scrollLeft;
            return {
                top: h.top + l - n,
                left: h.left + a - r
            }
        }, e.getCursorPosition = function(t, i) {
            var e, s;
            void 0 != t.pageX && void 0 != t.pageY ? (e = t.pageX, s = t.pageY) : (e = t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, s = t.clientY + document.body.scrollTop + document.documentElement.scrollTop), e -= i.left, s -= i.top;
            var h = {
                x: e,
                y: s
            };
            return h.touches = [{
                x: e,
                y: s
            }], h
        }, e.getTouchPosition = function(t, i) {
            var e, s;
            e = t.targetTouches[0].pageX, s = t.targetTouches[0].pageY, e -= i.left, s -= i.top;
            var h = {
                x: e,
                y: s
            };
            h.touches = new Array;
            for (var o = 0; o < t.targetTouches.length; o++) h.touches.push({
                x: t.targetTouches[o].pageX - i.left,
                y: t.targetTouches[o].pageY - i.top
            });
            h.changed = new Array;
            for (var o = 0; o < t.changedTouches.length; o++) h.changed.push({
                x: t.changedTouches[o].pageX - i.left,
                y: t.changedTouches[o].pageY - i.top
            });
            return h
        }
    }, {}],
    5: [function(require, module, exports) {
        var math = require("./math");
        exports.randomColor = function() {
            return "rgb(" + math.random(250) + "," + math.random(250) + "," + math.random(250) + ")"
        }, exports.hexToRgb = function(t, i) {
            var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            t = t.replace(e, function(t, i, e, s) {
                return i + i + e + e + s + s
            });
            var s = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
            i || (i = .5);
            var h = parseInt(s[1], 16),
                o = parseInt(s[2], 16),
                n = parseInt(s[3], 16);
            return "rgba(" + h + "," + o + "," + n + "," + i + ")"
        }, exports.isInside = function(t, i) {
            return t.x > i.x && t.x < i.x + i.w && t.y > i.y && t.y < i.y + i.h ? !0 : !1
        }, exports.makeRoundRect = function(t, i, e, s, h, o) {
            var n = i,
                r = e,
                l = s + n,
                a = h + r;
            o || (o = 2), t.beginPath(), t.moveTo(n + o, r), t.lineTo(l - o, r), t.quadraticCurveTo(l, r, l, r + o), t.lineTo(l, a - o), t.quadraticCurveTo(l, a, l - o, a), t.lineTo(n + o, a), t.quadraticCurveTo(n, a, n, a - o), t.lineTo(n, r + o), t.quadraticCurveTo(n, r, n + o, r), t.closePath()
        }, exports.text = function(context, text, position) {
            with(position || (position = [10, 10]), context) beginPath(), font = "bold 12px sans-serif", fillText(text, position[0], position[1]), closePath()
        }, exports.shadeBlendConvert = function(t, i, e) {
            if ("number" != typeof t || -1 > t || t > 1 || "string" != typeof i || "r" != i[0] && "#" != i[0] || "string" != typeof e && "undefined" != typeof e) return null;
            this.sbcRip = function(t) {
                var i = t.length,
                    e = new Object;
                if (i > 9) {
                    if (t = t.split(","), t.length < 3 || t.length > 4) return null;
                    e[0] = s(t[0].slice(4)), e[1] = s(t[1]), e[2] = s(t[2]), e[3] = t[3] ? parseFloat(t[3]) : -1
                } else {
                    switch (i) {
                        case 8:
                        case 6:
                        case 3:
                        case 2:
                        case 1:
                            return null
                    }
                    6 > i && (t = "#" + t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + (i > 4 ? t[4] + "" + t[4] : "")), t = s(t.slice(1), 16), e[0] = t >> 16 & 255, e[1] = t >> 8 & 255, e[2] = 255 & t, e[3] = 9 == i || 5 == i ? h((t >> 24 & 255) / 255 * 1e4) / 1e4 : -1
                }
                return e
            };
            var s = parseInt,
                h = Math.round,
                o = i.length > 9,
                o = "string" == typeof e ? e.length > 9 ? !0 : "c" == e ? !o : !1 : o,
                n = 0 > t,
                t = n ? -1 * t : t,
                e = e && "c" != e ? e : n ? "#000000" : "#FFFFFF",
                r = this.sbcRip(i),
                l = this.sbcRip(e);
            return r && l ? o ? "rgb(" + h((l[0] - r[0]) * t + r[0]) + "," + h((l[1] - r[1]) * t + r[1]) + "," + h((l[2] - r[2]) * t + r[2]) + (r[3] < 0 && l[3] < 0 ? ")" : "," + (r[3] > -1 && l[3] > -1 ? h(1e4 * ((l[3] - r[3]) * t + r[3])) / 1e4 : l[3] < 0 ? r[3] : l[3]) + ")") : "#" + (4294967296 + 16777216 * (r[3] > -1 && l[3] > -1 ? h(255 * ((l[3] - r[3]) * t + r[3])) : l[3] > -1 ? h(255 * l[3]) : r[3] > -1 ? h(255 * r[3]) : 255) + 65536 * h((l[0] - r[0]) * t + r[0]) + 256 * h((l[1] - r[1]) * t + r[1]) + h((l[2] - r[2]) * t + r[2])).toString(16).slice(r[3] > -1 || l[3] > -1 ? 1 : 3) : null
        }
    }, {
        "./math": 6
    }],
    6: [function(t, i, e) {
        e.toPolar = function(t, i) {
            var e = Math.sqrt(t * t + i * i),
                s = Math.atan2(i, t);
            return 0 > s && (s += 2 * Math.PI), {
                radius: e,
                angle: s
            }
        }, e.toCartesian = function(t, i) {
            var e = Math.cos(i),
                s = Math.sin(i);
            return {
                x: t * e,
                y: t * s * -1
            }
        }, e.clip = function(t, i, e) {
            return Math.min(e, Math.max(i, t))
        }, e.prune = function(t, i) {
            if ("number" == typeof t) t = parseFloat(t.toFixed(i));
            else if (t instanceof Array)
                for (var e = 0; e < t.length; e++) "number" == typeof t[e] && (t[e] = parseFloat(t[e].toFixed(i)));
            return t
        }, e.scale = function(t, i, e, s, h) {
            return (t - i) * (h - s) / (e - i) + s
        }, e.invert = function(t) {
            return e.scale(t, 1, 0, 0, 1)
        }, e.bounce = function(t, i, e, s) {
            return t > i && e > t ? s : i >= t ? Math.abs(s) : t >= e ? -1 * Math.abs(s) : void 0
        }, e.mtof = function(t) {
            return 440 * Math.pow(2, (t - 69) / 12)
        }, e.random = function(t) {
            return Math.floor(Math.random() * t)
        }, e.interp = function(t, i, e) {
            return t * (e - i) + i
        }, e.lphistory = {}, e.lp = function(t, i, e) {
            this.lphistory[t] || (this.lphistory[t] = []);
            var s = 0;
            this.lphistory[t].push(i), this.lphistory[t].length > e && this.lphistory[t].splice(0, 1);
            for (var h = 0; h < this.lphistory[t].length; h++) s += this.lphistory[t][h];
            var o = s / this.lphistory[t].length;
            return o
        }, e.lp2 = function(t, i) {
            for (var e = 0, s = 0; s < this.lphistory.length; s++) e += this.lphistory[s];
            e += t;
            var h = e / (this.lphistory.length + 1);
            return this.lphistory.push(h), this.lphistory.length > i && this.lphistory.splice(0, 1), h
        }, e.lp3 = function(t, i, e) {
            var s = t + i * e;
            return newvalue = s / (e + 1), newvalue
        }
    }, {}],
    7: [function(t, i, e) {
        e.throttle = function(t, i) {
            var e;
            return function() {
                var s = this,
                    h = arguments;
                e || (e = setTimeout(function() {
                    e = null;
                    try {
                        t.apply(s, h)
                    } catch (i) {
                        console.log(i)
                    }
                }, i))
            }
        }
    }, {}],
    8: [function(t, i, e) {
        e.defineTransmit = function(t) {
            var i;
            if ("function" == typeof t) return t;
            switch (t) {
                case "js":
                    return i = function(t, i) {
                        this.makeOSC(this.emit, t, i), this.emit("*", t, i)
                    };
                case "ajax":
                    return i = function(t) {
                        this.makeOSC(e.ajaxTransmit, t)
                    };
                case "node":
                    return i = function(t) {
                        this.makeOSC(e.nodeTransmit, t)
                    };
                case "ios":
                    return i = function(t) {};
                case "max":
                    return i = function(t) {
                        this.makeOSC(e.maxTransmit, t)
                    };
                case "wc":
                    return i = function(t, i) {
                        this.emit("internal", t, i)
                    }
            }
        }, e.setGlobalTransmit = function(t) {
            var i = e.defineTransmit(t);
            this.transmit = i, this.destination = t;
            for (var s in nx.widgets) this.widgets[s].transmit = i, this.widgets[s].destination = t
        }, e.setWidgetTransmit = function(t) {
            var i = e.defineTransmit(t);
            this.transmit = i, this.destination = t
        }, e.ajaxTransmit = function(t, i) {
            var e = "value" == t ? this.oscPath : this.oscPath + "/" + t;
            xmlhttp = new XMLHttpRequest, xmlhttp.open("POST", nx.ajaxPath, !0), xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), xmlhttp.send("oscName=" + e + "&data=" + i)
        }, e.setAjaxPath = function(t) {
            this.ajaxPath = t
        }, e.nodeTransmit = function(t, i) {
            var e = {
                oscName: "value" == t ? this.oscPath : this.oscPath + "/" + t,
                value: i
            };
            socket.emit("nx", e)
        }, e.maxTransmit = function(t, i) {
            var e = "value" == t ? this.oscPath : this.oscPath + "/" + t;
            window.max.outlet(e + " " + i)
        }
    }, {}],
    9: [function(require, module, exports) {
        var util = require("util"),
            widget = require("../core/widget"),
            banner = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 40
                }, widget.call(this, t), this.message1 = "Powered By", this.message2 = "NexusUI", this.link = "http://www.nexusosc.com", this.isLink = !0
            };
        util.inherits(banner, widget), banner.prototype.init = function() {
            this.draw()
        }, banner.prototype.draw = function() {
            with(this.context) globalAlpha = .1, fillStyle = this.colors.accent, beginPath(), moveTo(0, 10), lineTo(10, this.GUI.h / 2 + 5), lineTo(0, this.GUI.h), lineTo(30, this.GUI.h), lineTo(30, 10), fill(), moveTo(this.GUI.w - 30, 10), lineTo(this.GUI.w - 30, this.GUI.h), lineTo(this.GUI.w, this.GUI.h), lineTo(this.GUI.w - 10, this.GUI.h / 2 + 5), lineTo(this.GUI.w, 10), fill(), closePath(), globalAlpha = 1, fillStyle = this.colors.accent, fillRect(15, 0, this.GUI.w - 30, this.GUI.h - 10), fillStyle = this.colors.white, font = this.fontWeight + " " + this.GUI.h / 5 + "px " + this.font, textAlign = "center", fillText(this.message1, this.GUI.w / 2, this.GUI.h / 3.3), fillText(this.message2, this.GUI.w / 2, this.GUI.h / 3.3 * 2), fillStyle = this.colors.black, beginPath(), moveTo(15, this.GUI.h - 10), lineTo(30, this.GUI.h), lineTo(30, this.GUI.h - 10), lineTo(15, this.GUI.h - 10), fill(), moveTo(this.GUI.w - 15, this.GUI.h - 10), lineTo(this.GUI.w - 30, this.GUI.h), lineTo(this.GUI.w - 30, this.GUI.h - 10), lineTo(this.GUI.w - 15, this.GUI.h - 10), fill(), closePath()
        }, banner.prototype.click = function() {
            this.isLink && (window.location = this.link)
        }
    }, {
        "../core/widget": 3,
        util: 52
    }],
    10: [function(require, module, exports) {
        var util = require("util"),
            widget = require("../core/widget"),
            drawing = require("../utils/drawing"),
            button = module.exports = function(t) {
                this.defaultSize = {
                    width: 50,
                    height: 50
                }, widget.call(this, t), this.val = {
                    press: 0
                }, this.mode = "aftertouch", this.lockResize = !0, this.image = null, this.imageHover = null, this.imageTouch = null, this.subval = new Object, this.init()
            };
        util.inherits(button, widget), button.prototype.init = function() {
            this.center = {
                x: this.GUI.w / 2,
                y: this.GUI.h / 2
            }, this.strokeWidth = this.GUI.w / 20, this.radius = Math.min(this.center.x, this.center.y), this.draw()
        }, button.prototype.draw = function() {
            with(this.erase(), this.context) {
                if (null !== this.image) this.val.press ? this.imageTouch ? drawImage(this.imageTouch, 0, 0) : (drawImage(this.image, 0, 0), globalAlpha = .5, fillStyle = this.colors.accent, fillRect(0, 0, this.GUI.w, this.GUI.h), globalAlpha = 1) : drawImage(this.image, 0, 0);
                else if (this.val.press ? this.val.press && (fillStyle = this.colors.accent, strokeStyle = this.colors.accenthl) : (fillStyle = this.colors.fill, strokeStyle = this.colors.border), lineWidth = this.strokeWidth, beginPath(), arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, !0), fill(), closePath(), beginPath(), arc(this.center.x, this.center.y, this.radius - lineWidth / 2, 0, 2 * Math.PI, !0), stroke(), globalAlpha = 1, closePath(), this.val.press && "aftertouch" == this.mode) {
                    var x = nx.clip(this.clickPos.x, .2 * this.GUI.w, this.GUI.w / 1.3),
                        y = nx.clip(this.clickPos.y, .2 * this.GUI.h, this.GUI.h / 1.3),
                        gradient = this.context.createRadialGradient(x, y, this.GUI.w / 6, this.center.x, this.center.y, 1.3 * this.radius);
                    gradient.addColorStop(0, this.colors.accent), gradient.addColorStop(1, "white"), strokeStyle = gradient, lineWidth = this.GUI.w / 20, beginPath(), arc(this.center.x, this.center.y, this.radius - this.GUI.w / 40, 0, 2 * Math.PI, !0), stroke(), closePath()
                }
                this.drawLabel()
            }
        }, button.prototype.click = function(t) {
            drawing.isInside(this.clickPos, {
                x: this.center.x - this.radius,
                y: this.center.y - this.radius,
                w: 2 * this.radius,
                h: 2 * this.radius
            }) && (this.val.press = 1, "aftertouch" == this.mode && (this.val.x = this.clickPos.x, this.val.y = this.clickPos.y), this.transmit(this.val), this.draw())
        }, button.prototype.move = function() {
            "aftertouch" == this.mode && (this.val.x = this.clickPos.x, this.val.y = this.clickPos.y, this.subval.x = this.clickPos.x, this.subval.y = this.clickPos.y, this.transmit(this.subval), this.draw())
        }, button.prototype.release = function() {
            this.val.press = 0, ("toggle" == this.mode || "aftertouch" == this.mode) && this.transmit(this.val), this.draw()
        }, button.prototype.setImage = function(t) {
            this.image = new Image, this.image.onload = this.draw.bind(this), this.image.src = t
        }, button.prototype.setHoverImage = function(t) {
            this.imageHover = new Image, this.imageHover.onload = this.draw.bind(this), this.imageHover.src = t
        }, button.prototype.setTouchImage = function(t) {
            this.imageTouch = new Image, this.imageTouch.onload = this.draw.bind(this), this.imageTouch.src = t
        }
    }, {
        "../core/widget": 3,
        "../utils/drawing": 5,
        util: 52
    }],
    11: [function(require, module, exports) {
        var util = require("util"),
            widget = require("../core/widget"),
            colors = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 100
                }, widget.call(this, t), this.init()
            };
        util.inherits(colors, widget), colors.prototype.init = function() {
            this.gradient1 = this.context.createLinearGradient(0, 0, this.GUI.w, 0), this.gradient1.addColorStop(0, "#F00"), this.gradient1.addColorStop(.17, "#FF0"), this.gradient1.addColorStop(.34, "#0F0"), this.gradient1.addColorStop(.51, "#0FF"), this.gradient1.addColorStop(.68, "#00F"), this.gradient1.addColorStop(.85, "#F0F"), this.gradient1.addColorStop(1, "#F00"), this.gradient2 = this.context.createLinearGradient(0, 0, 0, this.GUI.h), this.gradient2.addColorStop(0, "rgba(0,0,0,255)"), this.gradient2.addColorStop(.49, "rgba(0,0,0,0)"), this.gradient2.addColorStop(.51, "rgba(255,255,255,0)"), this.gradient2.addColorStop(.95, "rgba(255,255,255,255)"), this.draw()
        }, colors.prototype.draw = function() {
            with(this.erase(), this.context) fillStyle = this.gradient1, fillRect(0, 0, this.GUI.w, this.GUI.h), fillStyle = this.gradient2, fillRect(0, 0, this.GUI.w, this.GUI.h);
            this.drawLabel()
        }, colors.prototype.drawColor = function() {
            with(this.context) fillStyle = "rgb(" + this.val.r + "," + this.val.g + "," + this.val.b + ")", fillRect(0, .95 * this.GUI.h, this.GUI.w, .05 * this.GUI.h)
        }, colors.prototype.click = function(t) {
            if (this.clickPos.x > 0 && this.clickPos.y > 0 && this.clickPos.x < this.GUI.w && this.clickPos.y < this.GUI.h) {
                var i = this.context.getImageData(2 * this.clickPos.x, 2 * this.clickPos.y, 1, 1);
                this.val = {
                    r: i.data[0],
                    g: i.data[1],
                    b: i.data[2]
                }, this.transmit(this.val), this.drawColor()
            }
        }, colors.prototype.move = function(t) {
            this.click(t)
        }
    }, {
        "../core/widget": 3,
        util: 52
    }],
    12: [function(require, module, exports) {
        var util = require("util"),
            widget = require("../core/widget"),
            comment = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 20
                }, widget.call(this, t), this.val = {
                    text: "comment"
                }, this.sizeSet = !1, this.init()
            };
        util.inherits(comment, widget), comment.prototype.setSize = function(t) {
            this.size = t, this.sizeSet = !0, this.draw()
        }, comment.prototype.init = function() {
            this.draw()
        }, comment.prototype.draw = function() {
            with(this.sizeSet || (this.size = Math.sqrt(this.GUI.w * this.GUI.h / (2 * this.val.text.length))), this.erase(), this.context) fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), fillStyle = this.colors.black, textAlign = "left", font = this.size + "px 'Open Sans'";
            this.wrapText(this.val.text, 6, 3 + this.size, this.GUI.w - 6, this.size)
        }
    }, {
        "../core/widget": 3,
        util: 52
    }],
    13: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = require("util"),
            widget = require("../core/widget"),
            crossfade = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 30
                }, widget.call(this, t), this.val = {
                    R: .75,
                    L: .75
                }, this.location = .5, this.init()
            };
        util.inherits(crossfade, widget), crossfade.prototype.init = function() {
            this.draw()
        }, crossfade.prototype.draw = function() {
            with(this.erase(), this.location = Math.pow(this.val.R, 2), this.context) {
                fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h);
                var y1 = 0,
                    y2 = this.GUI.h,
                    x1 = this.location * this.GUI.w;
                fillStyle = this.colors.accent, fillRect(x1, y1, this.GUI.w - x1, y2), textBaseline = "middle", font = this.GUI.h / 3 + "px 'Open Sans'", fillStyle = this.colors.accent, textAlign = "right", fillText(this.val.R.toFixed(2), x1 - 2, this.GUI.h / 4), fillStyle = this.colors.fill, textAlign = "left", fillText(this.val.L.toFixed(2), x1 + 2, .75 * this.GUI.h)
            }
            this.drawLabel()
        }, crossfade.prototype.click = function() {
            this.move()
        }, crossfade.prototype.move = function() {
            var t = math.clip(this.clickPos.x / this.GUI.w, 0, 1),
                i = 1 - t;
            this.location = t, this.val.R = math.prune(Math.sqrt(t), 3), this.val.L = math.prune(Math.sqrt(i), 3), this.draw(), this.transmit(this.val)
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    14: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = require("util"),
            widget = require("../core/widget"),
            dial = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 100
                }, widget.call(this, t), this.circleSize, this.handleLength, this.val = {
                    value: 0
                }, this.responsivity = .004, this.aniStart = 0, this.aniStop = 1, this.aniMove = .01, this.lockResize = !0, null != this.canvas.getAttribute("min") ? this.min = parseFloat(this.canvas.getAttribute("min")) : this.min = 0, null != this.canvas.getAttribute("max") ? this.max = parseFloat(this.canvas.getAttribute("max")) : this.max = 1, null != this.canvas.getAttribute("step") ? this.step = parseFloat(this.canvas.getAttribute("step")) : this.step = .001, this.maxdigits = 3, this.calculateDigits = nx.calculateDigits, this.init()
            };
        util.inherits(dial, widget), dial.prototype.init = function() {
            this.circleSize = Math.min(this.center.x, this.center.y), this.handleLength = this.circleSize,
                this.mindim = Math.min(this.GUI.w, this.GUI.h), this.mindim < 101 || this.mindim < 101 ? this.accentWidth = 1 * this.lineWidth : this.accentWidth = 2 * this.lineWidth, this.draw()
        }, dial.prototype.draw = function() {
            var normalval = this.normalize(this.val.value),
                dial_position = 2 * (normalval + .25) * Math.PI;
            with(this.erase(), this.context) if (lineCap = "butt", beginPath(), lineWidth = this.circleSize / 2, arc(this.center.x, this.center.y, this.circleSize - lineWidth / 2, 0 * Math.PI, 2 * Math.PI, !1), strokeStyle = this.colors.fill, stroke(), closePath(), lineCap = "butt", beginPath(), lineWidth = this.circleSize / 2, arc(this.center.x, this.center.y, this.circleSize - lineWidth / 2, .5 * Math.PI, dial_position, !1), strokeStyle = this.colors.accent, stroke(), closePath(), clearRect(this.center.x - this.GUI.w / 40, this.center.y, this.GUI.w / 20, this.GUI.h / 2), normalval > 0 && (beginPath(), lineWidth = 1.5, moveTo(this.center.x - this.GUI.w / 40, this.center.y + this.circleSize / 2), lineTo(this.center.x - this.GUI.w / 40, this.center.y + this.circleSize), strokeStyle = this.colors.accent, stroke(), closePath()), this.val.value = math.prune(this.rangify(normalval), 3), this.digits = this.calculateDigits(), valtextsize = this.mindim / this.digits.total * .55, valtextsize > 7) {
                var valtext = this.val.value.toFixed(this.digits.decimals);
                fillStyle = this.colors.borderhl, textAlign = "center", textBaseline = "middle", font = valtextsize + "px 'Open Sans'", fillText(valtext, this.GUI.w / 2, this.GUI.h / 2)
            }
            this.drawLabel()
        }, dial.prototype.click = function(t) {
            this.val.value = math.prune(this.val.value, 4), this.transmit(this.val), this.draw(), this.aniStart = this.val.value
        }, dial.prototype.move = function() {
            var t = this.normalize(this.val.value);
            t = math.clip(t - this.deltaMove.y * this.responsivity, 0, 1), this.val.value = math.prune(this.rangify(t), 4), this.transmit(this.val), this.draw()
        }, dial.prototype.release = function() {
            this.aniStop = this.val.value
        }, dial.prototype.animate = function(t) {
            switch (t) {
                case "bounce":
                    nx.aniItems.push(this.aniBounce.bind(this));
                    break;
                case "none":
                    nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce))
            }
        }, dial.prototype.aniBounce = function() {
            this.clicked || (this.val.value += this.aniMove, this.aniStop < this.aniStart && (this.stopPlaceholder = this.aniStop, this.aniStop = this.aniStart, this.aniStart = this.stopPlaceholder), this.aniMove = math.bounce(this.val.value, this.aniStart, this.aniStop, this.aniMove), this.draw(), this.val.value = math.prune(this.val.value, 4), this.transmit(this.val))
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    15: [function(require, module, exports) {
        var startTime = 0,
            math = require("../utils/math"),
            util = require("util"),
            widget = require("../core/widget"),
            envelope = module.exports = function(t) {
                this.defaultSize = {
                    width: 200,
                    height: 100
                }, widget.call(this, t), this.nodeSize = 1, this.active = !1, this.duration = 1e3, this.looping = !1, this.scanIndex = 0, this.val = {
                    index: 0,
                    amp: 0,
                    points: [{
                        x: .1,
                        y: .4
                    }, {
                        x: .35,
                        y: .6
                    }, {
                        x: .65,
                        y: .2
                    }, {
                        x: .9,
                        y: .4
                    }]
                }, this.selectedNode = null, nx.aniItems.push(this.pulse.bind(this)), this.init()
            };
        util.inherits(envelope, widget), envelope.prototype.init = function() {
            this.mindim = this.GUI.w < this.GUI.h ? this.GUI.w : this.GUI.h, this.draw()
        }, envelope.prototype.draw = function() {
            with(this.erase(), this.context) {
                fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), fillStyle = this.colors.accent;
                var centerx = this.mindim / 10,
                    centery = this.GUI.h - this.mindim / 10;
                beginPath(), moveTo(centerx, centery), arc(centerx, centery, this.mindim / 10, 1.5 * Math.PI, 2 * Math.PI * this.val.index + 1.5 * Math.PI, !1), fill(), closePath();
                for (var drawingX = [], drawingY = [], i = 0; i < this.val.points.length; i++) drawingX[i] = this.val.points[i].x * this.GUI.w, drawingY[i] = (1 - this.val.points[i].y) * this.GUI.h, drawingX[i] < this.bgLeft + this.nodeSize ? drawingX[i] = this.bgLeft + this.nodeSize : drawingX[i] > this.bgRight - this.nodeSize && (drawingX[i] = this.bgRight - this.nodeSize), drawingY[i] < this.bgTop + this.nodeSize ? drawingY[i] = this.bgTop + this.nodeSize : drawingY[i] > this.bgBottom - this.nodeSize && (drawingY[i] = this.bgBottom - this.nodeSize);
                for (var j = 0; j < drawingX.length; j++) {
                    var size = this.mindim / 35 + 2;
                    beginPath(), arc(drawingX[j], drawingY[j], size, 0, 2 * Math.PI, !1), fillStyle = this.colors.accent, fill(), closePath()
                }
                beginPath(), strokeStyle = this.colors.accent, moveTo(-5, this.GUI.h), lineTo(-5, (1 - this.val.points[0].y) * this.GUI.h);
                for (var j = 0; j < drawingX.length; j++) lineTo(drawingX[j], drawingY[j]);
                lineTo(this.GUI.w + 5, (1 - this.val.points[this.val.points.length - 1].y) * this.GUI.h), lineTo(this.GUI.w + 5, this.GUI.h), stroke(), globalAlpha = .2, fillStyle = this.colors.accent, fill(), globalAlpha = 1, closePath()
            }
            this.drawLabel()
        }, envelope.prototype.scaleNode = function(t) {
            var i = t,
                e = 0,
                s = this.GUI.w,
                h = this.val.points[i].x,
                o = this.GUI.h - this.val.points[i].y,
                n = math.clip(h / this.GUI.w, 0, 1),
                r = math.clip(o / this.GUI.h, 0, 1);
            this.val.points[i].x = math.prune(n, 3), this.val.points[i].y = math.prune(r, 3), i > 0 && (e = this.val.points[i - 1].x), this.val.points.length > i + 1 && (s = this.val.points[i + 1].x), this.val.points[i].x < e && (this.val.points.splice(i - 1, 0, this.val.points.splice(i, 1)[0]), i -= 1, this.selectedNode = i), this.val.points[i].x > s && (this.val.points.splice(i + 1, 0, this.val.points.splice(i, 1)[0]), i += 1, this.selectedNode = i)
        }, envelope.prototype.click = function() {
            this.selectedNode = this.findNearestNode(this.clickPos.x / this.GUI.w, this.clickPos.y / this.GUI.h, this.val.points), this.transmit(this.val), this.draw()
        }, envelope.prototype.move = function() {
            this.clicked && (this.val.points[this.selectedNode].x = this.clickPos.x, this.val.points[this.selectedNode].y = this.clickPos.y, this.scaleNode(this.selectedNode), this.transmit(this.val), this.draw())
        }, envelope.prototype.release = function() {
            this.hasMoved || this.val.points.splice(this.selectedNode, 1), this.draw(), this.selectedNode = null
        }, envelope.prototype.pulse = function() {
            if (this.active) {
                var t = (nx.context.currentTime - startTime) / (this.duration / 1e3);
                if (t >= 1 && (this.looping ? (t -= 1, startTime += this.duration / 1e3, this.val.index = 0, this.scanIndex = 0) : this.stop()), this.val.index = t, this.val.index > this.val.points[this.val.points.length - 1].x) this.val.amp = this.val.points[this.val.points.length - 1].y;
                else if (this.val.index < this.val.points[0].x) this.val.amp = this.val.points[0].y;
                else {
                    for (this.scanIndex = 0; this.val.index > this.val.points[this.scanIndex].x;) this.scanIndex++;
                    var i = this.val.points[this.scanIndex].x,
                        e = this.val.points[this.scanIndex - 1].x,
                        s = this.val.points[this.scanIndex].y,
                        h = this.val.points[this.scanIndex - 1].y;
                    this.val.amp = math.interp((this.val.index - e) / (i - e), h, s)
                }
                this.transmit(this.val), this.draw()
            }
        }, envelope.prototype.start = function() {
            this.active = !0, this.val.index = 0, startTime = nx.context.currentTime
        }, envelope.prototype.stop = function() {
            this.active = !1, this.val.index = 0, this.draw()
        }, envelope.prototype.findNearestNode = function(t, i, e) {
            var s = null,
                h = 1e3,
                o = !1;
            i = 1 - i;
            for (var n = 0; n < e.length; n++) {
                var r = Math.sqrt(Math.pow(e[n].x - t, 2), Math.pow(e[n].y - -i, 2));
                h > r && (h = r, s = n, o = t > e[n].x)
            }
            return h > .1 && (o && s++, this.val.points.splice(s, 0, {
                x: this.clickPos.x / this.GUI.w,
                y: (this.GUI.h - this.clickPos.y) / this.GUI.h
            })), s
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    16: [function(require, module, exports) {
        var util = (require("../utils/math"), require("util")),
            widget = require("../core/widget"),
            ghost = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 50
                }, widget.call(this, t), this.recording = !1, this.playing = !1, this.maxLength = 2e3, this.components = new Array, this.buffer = new Array, this.moment = 0, this.needle = 0, this.val = new Object, this.rate = 1, this.start = 0, this.end = 1, this.size = 0, this.looping = !0, this.boundLog = this.log.bind(this), this.direction = 1, this.noise = 0, this.loopstart = 0, this.loopend = 0, this.mode = "linear", this.init(), this.boundAdv = this.advance.bind(this), nx.aniItems.push(this.boundAdv)
            };
        util.inherits(ghost, widget), ghost.prototype.init = function() {
            this.draw()
        }, ghost.prototype.watch = function() {}, ghost.prototype.connect = function(t) {
            var i = this.components.length;
            this.components.push(t), t.tapeNum = i, t.isRecording = !0, t.recorder = this, this.buffer[i] = new Object;
            for (var e in t.val) this.buffer[i][e] = new Array
        }, ghost.prototype.write = function(t, i) {
            this.moment >= this.maxLength && this.stop();
            for (var e in i)
                if (this.buffer[t][e])
                    if ("object" == typeof i[e])
                        if (Array.isArray(i[e])) this.buffer[t][e][this.moment] = JSON.parse(JSON.stringify(i[e]));
                        else {
                            this.buffer[t][e][this.moment] = {};
                            for (var s in i[e]) this.buffer[t][e][this.moment][s] = i[e][s]
                        }
            else this.buffer[t][e][this.moment] = i[e];
            this.draw()
        }, ghost.prototype.draw = function() {
            with(this.context) fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h);
            var quad = this.GUI.w / 4,
                quad2 = this.GUI.w - quad;
            if (this.recording) with(this.context) fillStyle = "#e33", fillRect(.4 * quad, .4 * quad, 1.2 * quad, 1.2 * quad);
            else with(this.context) fillStyle = "#e33", beginPath(), arc(quad, this.GUI.h / 2, .8 * quad, 0, 2 * Math.PI), fill(), closePath(), textAlign = "center", textBaseline = "middle", font = "normal " + this.GUI.h / 6 + "px courier", fillStyle = this.colors.fill, fillText("rec", quad, this.GUI.h / 2);
            if (this.playing) with(this.context) {
                strokeStyle = this.colors.border, lineWidth = this.GUI.w / 30, beginPath(), arc(quad2, this.GUI.h / 2, .8 * quad, 0, 2 * Math.PI), stroke(), closePath();
                var sec = ~~(this.needle / 30);
                textAlign = "center", textBaseline = "middle", font = "normal " + this.GUI.h / 3 + "px courier", fillStyle = this.colors.border, fillText(sec, quad2, this.GUI.h / 2 + 2)
            } else with(this.context) fillStyle = this.colors.border, beginPath(), arc(quad2, this.GUI.h / 2, .8 * quad, 0, 2 * Math.PI), fill(), closePath(), textAlign = "center", textBaseline = "middle", font = "normal " + this.GUI.h / 6 + "px courier", fillStyle = this.colors.fill, fillText("play", quad2, this.GUI.h / 2)
        }, ghost.prototype.record = function() {
            if (!this.playing) {
                this.components = new Array;
                for (var t in nx.widgets) this.connect(nx.widgets[t])
            }
            this.moment = 0, nx.aniItems.push(this.boundLog), this.recording = !0
        }, ghost.prototype.log = function() {
            for (var t = 0; t < this.components.length; t++) {
                this.components[t];
                this.write(this.components[t].tapeNum, this.components[t].val)
            }
            this.moment++
        }, ghost.prototype.stop = function() {
            nx.removeAni(this.boundLog), this.size = this.moment, this.recording = !1, this.draw()
        }, ghost.prototype.scan = function(t) {
            this.pneedle = this.needle - this.direction, this.pneedle <= 0 ? this.pneedle = this.size - 1 : this.pneedle >= this.size - 1 && (this.pneedle = 0);
            for (var i = 0; i < this.components.length; i++) {
                var e = this.components[i];
                for (var s in this.buffer[e.tapeNum])
                    if (this.buffer[e.tapeNum][s]) {
                        var h = new Object,
                            o = this.buffer[e.tapeNum][s][~~this.needle + 1] ? this.buffer[e.tapeNum][s][~~this.needle + 1] : this.buffer[e.tapeNum][s][~~this.needle];
                        this.buffer[e.tapeNum][s][~~this.needle] != this.buffer[e.tapeNum][s][~~this.pneedle] && ("number" == typeof this.buffer[e.tapeNum][s][~~this.needle] ? (h[s] = nx.interp(this.needle - ~~this.needle, this.buffer[e.tapeNum][s][~~this.needle], o), h[s] += Math.random() * this.noise - this.noise / 2, h[s] = nx.clip(h[s], 0, 1), e.set(h, !0)) : (h[s] = this.buffer[e.tapeNum][s][~~this.needle], e.set(h, !0)))
                    }
            }
        }, ghost.prototype.play = function(t, i, e) {
            t ? this.rate = t : !1, i || this.start ? (this.start = i ? i : this.start, this.needle = this.start) : (this.needle = this.moment - 1, this.start = 0), "linear" == this.mode && (this.direction = 1), e ? this.end = e : this.end = 1, this.playing = !0
        }, ghost.prototype.pause = function() {
            this.playing = !1
        }, ghost.prototype.loop = function() {}, ghost.prototype.advance = function() {
            if (this.playing) {
                if ("linear" == this.mode || "bounce" == this.mode) this.needle += this.rate * this.direction;
                else if ("random" == this.mode) this.needle = nx.random((this.end - this.start) * this.size) + this.start * this.size;
                else if ("wander" == this.mode) {
                    var t = 3;
                    this.needle > .75 * this.size ? t-- : null, this.needle < .25 * this.size ? t++ : null, this.needle += this.rate * this.direction * (nx.random(t) - 1)
                }
                this.needle / this.size < this.end && this.needle / this.size >= this.start ? this.scan() : this.looping ? "linear" == this.mode ? this.needle = this.start * this.size : this.direction = -1 * this.direction : this.playing = !1, this.draw()
            }
        }, ghost.prototype.click = function(t) {
            this.clickPos.x < this.GUI.w / 2 ? this.recording ? this.stop() : (this.pause(), this.record()) : (this.playing ? this.pause() : this.play(), this.draw())
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    17: [function(require, module, exports) {
        var util = (require("../utils/math"), require("util")),
            widget = require("../core/widget"),
            ghostlist = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 50
                }, widget.call(this, t), this.recording = !1, this.playing = !1, this.maxLength = 2e3, this.components = new Array, this.buffer = new Array, this.playbuffer = [], this.playIndex = 0, this.playbufferSize = 0, this.moment = 0, this.needle = 0, this.val = new Object, this.rate = 1, this.start = 0, this.end = 1, this.size = 0, this.looping = !0, this.boundLog = this.log.bind(this), this.direction = 1, this.noise = 0, this.loopstart = 0, this.loopend = 0, this.mode = "linear", this.init(), this.boundAdv = this.advance.bind(this), nx.aniItems.push(this.boundAdv)
            };
        util.inherits(ghostlist, widget), ghostlist.prototype.init = function() {
            this.draw()
        }, ghostlist.prototype.watch = function() {}, ghostlist.prototype.connect = function(t) {
            var i = this.components.length;
            this.components.push(t), t.tapeNum = i, t.isRecording = !0, t.recorder = this, this.buffer[i] = new Object;
            for (var e in t.val) this.buffer[i][e] = new Array
        }, ghostlist.prototype.write = function(t, i) {
            this.moment >= this.maxLength && this.stop();
            for (var e in i)
                if (this.buffer[t][e])
                    if ("object" == typeof i[e])
                        if (Array.isArray(i[e])) this.components[t].actuated ? this.buffer[t][e][this.moment] = JSON.parse(JSON.stringify(i[e])) : this.buffer[t][e][this.moment] = !1;
                        else {
                            this.buffer[t][e][this.moment] = {};
                            for (var s in i[e]) this.components[t].actuated ? this.buffer[t][e][this.moment][s] = i[e][s] : this.buffer[t][e][this.moment][s] = !1
                        }
            else this.components[t].actuated ? this.buffer[t][e][this.moment] = i[e] : this.buffer[t][e][this.moment] = !1;
            this.draw()
        }, ghostlist.prototype.draw = function() {
            with(this.context) fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h);
            var quad = this.GUI.w / 4,
                quad2 = this.GUI.w - quad;
            if (this.recording) with(this.context) fillStyle = "#e33", fillRect(.4 * quad, .4 * quad, 1.2 * quad, 1.2 * quad);
            else with(this.context) fillStyle = "#e33", beginPath(), arc(quad, this.GUI.h / 2, .8 * quad, 0, 2 * Math.PI), fill(), closePath(), textAlign = "center", textBaseline = "middle", font = "normal " + this.GUI.h / 6 + "px courier", fillStyle = this.colors.fill, fillText("rec", quad, this.GUI.h / 2);
            if (this.playing) with(this.context) {
                strokeStyle = this.colors.border, lineWidth = this.GUI.w / 30, beginPath(), arc(quad2, this.GUI.h / 2, .8 * quad, 0, 2 * Math.PI), stroke(), closePath();
                var sec = ~~(this.needle / 30);
                textAlign = "center", textBaseline = "middle", font = "normal " + this.GUI.h / 3 + "px courier", fillStyle = this.colors.border, fillText(sec, quad2, this.GUI.h / 2 + 2)
            } else with(this.context) fillStyle = this.colors.border, beginPath(), arc(quad2, this.GUI.h / 2, .8 * quad, 0, 2 * Math.PI), fill(), closePath(), textAlign = "center", textBaseline = "middle", font = "normal " + this.GUI.h / 6 + "px courier", fillStyle = this.colors.fill, fillText("play", quad2, this.GUI.h / 2)
        }, ghostlist.prototype.record = function() {
            this.components = new Array;
            for (var t in nx.widgets) this.connect(nx.widgets[t]);
            this.moment = 0, nx.aniItems.push(this.boundLog), this.recording = !0
        }, ghostlist.prototype.log = function() {
            for (var t = 0; t < this.components.length; t++) {
                var i = this.components[t],
                    e = {};
                if (i.clicked) e = i.val, jest.nexttitle || (jest.nexttitle = i.canvasID);
                else
                    for (var s in i.val) e[s] = !1;
                this.write(this.components[t].tapeNum, e)
            }
            this.moment++
        }, ghostlist.prototype.stop = function() {
            nx.removeAni(this.boundLog), this.size = this.moment, this.recording = !1, this.draw()
        }, ghostlist.prototype.scan = function(t) {
            for (var i = 0; i < this.components.length; i++) {
                var e = this.components[i];
                for (var s in this.playbuffer[e.tapeNum])
                    if (this.playbuffer[e.tapeNum][s]) {
                        var h = new Object,
                            o = this.playbuffer[e.tapeNum][s][~~this.needle + 1] ? this.playbuffer[e.tapeNum][s][~~this.needle + 1] : this.playbuffer[e.tapeNum][s][~~this.needle];
                        void 0 != this.playbuffer[e.tapeNum][s][~~this.needle - this.direction] && this.playbuffer[e.tapeNum][s][~~this.needle] !== this.playbuffer[e.tapeNum][s][~~this.needle - this.direction] && ("number" == typeof this.playbuffer[e.tapeNum][s][~~this.needle] ? (h[s] = nx.interp(this.needle - ~~this.needle, this.playbuffer[e.tapeNum][s][~~this.needle], o), h[s] += Math.random() * this.noise - this.noise / 2, h[s] = nx.clip(h[s], 0, 1), e.set(h, !0)) : (h[s] = this.playbuffer[e.tapeNum][s][~~this.needle], (h[s] || 0 === h[s]) && e.set(h, !0)))
                    }
            }
        }, ghostlist.prototype.play = function(t, i, e) {
            t ? this.rate = t : !1, i ? (this.needle = this.moment - 1, this.start = i) : (this.needle = this.moment - 1, this.start = 0), "linear" == this.mode && (this.direction = 1), e ? this.end = e : this.end = 1, this.playing = !0
        }, ghostlist.prototype.pause = function() {
            this.playing = !1
        }, ghostlist.prototype.loop = function() {}, ghostlist.prototype.advance = function() {
            if (this.playing) {
                if ("linear" == this.mode || "bounce" == this.mode) this.needle += this.rate * this.direction;
                else if ("random" == this.mode) this.needle = nx.random((this.end - this.start) * this.playbufferSize) + this.start * this.playbufferSize;
                else if ("wander" == this.mode) {
                    var t = 3;
                    this.needle > .75 * this.playbufferSize ? t-- : null, this.needle < .25 * this.playbufferSize ? t++ : null, this.needle += this.rate * this.direction * (nx.random(t) - 1)
                }
                this.needle / this.playbufferSize < this.end && this.needle / this.playbufferSize > this.start ? this.scan() : this.looping ? "linear" == this.mode ? (this.needle = 0, this.next = this.jest.next(), this.playbuffer = this.next.buffer, this.playbufferSize = this.next.len) : this.direction = -1 * this.direction : this.playing = !1, this.draw(), this.jest.drawvis(this.needle / this.playbufferSize)
            }
        }, ghostlist.prototype.click = function(t) {
            this.clickPos.x < this.GUI.w / 2 ? this.recording ? this.stop() : this.record() : (this.playing ? this.pause() : this.play(), this.draw())
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    18: [function(t, i, e) {
        i.exports = {
            banner: t("./banner"),
            button: t("./button"),
            colors: t("./colors"),
            comment: t("./comment"),
            crossfade: t("./crossfade"),
            dial: t("./dial"),
            envelope: t("./envelope"),
            ghost: t("./ghost"),
            ghostlist: t("./ghostlist"),
            joints: t("./joints"),
            keyboard: t("./keyboard"),
            matrix: t("./matrix"),
            message: t("./message"),
            meter: t("./meter"),
            metro: t("./metro"),
            metroball: t("./metroball"),
            motion: t("./motion"),
            mouse: t("./mouse"),
            multislider: t("./multislider"),
            multitouch: t("./multitouch"),
            number: t("./number"),
            panel: t("./panel"),
            position: t("./position"),
            range: t("./range"),
            select: t("./select"),
            slider: t("./slider"),
            string: t("./string"),
            tabs: t("./tabs"),
            text: t("./text"),
            tilt: t("./tilt"),
            toggle: t("./toggle"),
            trace: t("./trace"),
            typewriter: t("./typewriter"),
            vinyl: t("./vinyl"),
            waveform: t("./waveform"),
            wavegrain: t("./wavegrain"),
            windows: t("./windows")
        }
    }, {
        "./banner": 9,
        "./button": 10,
        "./colors": 11,
        "./comment": 12,
        "./crossfade": 13,
        "./dial": 14,
        "./envelope": 15,
        "./ghost": 16,
        "./ghostlist": 17,
        "./joints": 19,
        "./keyboard": 20,
        "./matrix": 21,
        "./message": 22,
        "./meter": 23,
        "./metro": 24,
        "./metroball": 25,
        "./motion": 26,
        "./mouse": 27,
        "./multislider": 28,
        "./multitouch": 29,
        "./number": 30,
        "./panel": 31,
        "./position": 32,
        "./range": 33,
        "./select": 34,
        "./slider": 35,
        "./string": 36,
        "./tabs": 37,
        "./text": 38,
        "./tilt": 39,
        "./toggle": 40,
        "./trace": 41,
        "./typewriter": 42,
        "./vinyl": 43,
        "./waveform": 44,
        "./wavegrain": 45,
        "./windows": 46
    }],
    19: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = require("util"),
            widget = require("../core/widget"),
            joints = module.exports = function(t) {
                this.defaultSize = {
                    width: 150,
                    height: 150
                }, widget.call(this, t), this.nodeSize = this.GUI.w / 14, this.values = [0, 0], this.val = {
                    x: .35,
                    y: .35,
                    node1: 0
                }, this.joints = [{
                    x: .1,
                    y: .2
                }, {
                    x: .2,
                    y: .1
                }, {
                    x: .3,
                    y: .7
                }, {
                    x: .4,
                    y: .4
                }, {
                    x: .5,
                    y: .9
                }, {
                    x: .6,
                    y: .15
                }, {
                    x: .7,
                    y: .3
                }, {
                    x: .8,
                    y: .8
                }], this.threshold = this.GUI.w / 3
            };
        util.inherits(joints, widget), joints.prototype.init = function() {
            this.nodeSize = this.GUI.w / 14, this.threshold = this.GUI.w / 3, this.draw()
        }, joints.prototype.draw = function() {
            with(this.erase(), this.drawingX = this.val.x * this.GUI.w, this.drawingY = this.val.y * this.GUI.h, this.context) {
                fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), null != this.val.x ? this.drawNode() : (fillStyle = this.colors.border, font = "14px courier", fillText(this.default_text, 10, 20)), fillStyle = this.colors.accent, strokeStyle = this.colors.border;
                for (var i in this.joints) {
                    beginPath(), arc(this.joints[i].x * this.GUI.w, this.joints[i].y * this.GUI.h, this.nodeSize / 2, 0, 2 * Math.PI, !0), fill(), closePath();
                    var cnctX = Math.abs(this.joints[i].x * this.GUI.w - this.drawingX),
                        cnctY = Math.abs(this.joints[i].y * this.GUI.h - this.drawingY),
                        strength = cnctX + cnctY;
                    if (strength < this.threshold) {
                        beginPath(), moveTo(this.joints[i].x * this.GUI.w, this.joints[i].y * this.GUI.h), lineTo(this.drawingX, this.drawingY), strokeStyle = this.colors.accent, lineWidth = math.scale(strength, 0, this.threshold, this.nodeSize / 2, 5), stroke(), closePath();
                        var scaledstrength = math.scale(strength, 0, this.threshold, 1, 0);
                        this.val["node" + i] = scaledstrength
                    }
                }
            }
            this.drawLabel()
        }, joints.prototype.drawNode = function() {
            with(this.drawingX < this.nodeSize ? this.drawingX = this.nodeSize : this.drawingX > this.GUI.w - this.nodeSize && (this.drawingX = this.GUI.w - this.nodeSize), this.drawingY < this.nodeSize ? this.drawingY = this.nodeSize : this.drawingY > this.GUI.h - this.nodeSize && (this.drawingY = this.GUI.h - this.nodeSize), this.context) globalAlpha = 1, beginPath(), fillStyle = this.colors.accent, strokeStyle = this.colors.border, lineWidth = this.lineWidth, arc(this.drawingX, this.drawingY, this.nodeSize, 0, 2 * Math.PI, !0), fill(), closePath()
        }, joints.prototype.click = function() {
            this.val = new Object, this.val.x = this.clickPos.x / this.GUI.w, this.val.y = this.clickPos.y / this.GUI.h, this.draw(), this.transmit(this.val), this.connections = new Array
        }, joints.prototype.move = function() {
            this.val = new Object, this.clicked && (this.val.x = this.clickPos.x / this.GUI.w, this.val.y = this.clickPos.y / this.GUI.h, this.draw(), this.transmit(this.val), this.connections = new Array)
        }, joints.prototype.release = function() {
            this.anix = this.deltaMove.x / this.GUI.w, this.aniy = this.deltaMove.y / this.GUI.h
        }, joints.prototype.animate = function(t) {
            switch (t) {
                case "bounce":
                    nx.aniItems.push(this.aniBounce.bind(this));
                    break;
                case "none":
                    nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce))
            }
        }, joints.prototype.anix = 0, joints.prototype.aniy = 0, joints.prototype.aniBounce = function() {
            !this.clicked && this.val.x && (this.val.x += this.anix, this.val.y += this.aniy, this.anix = math.bounce(this.val.x, .1, .9, this.anix), this.aniy = math.bounce(this.val.y, .1, .9, this.aniy), this.draw(), this.transmit(this.val))
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    20: [function(require, module, exports) {
        var util = require("util"),
            widget = require("../core/widget"),
            drawing = require("../utils/drawing"),
            math = require("../utils/math"),
            keyboard = module.exports = function(t) {
                this.defaultSize = {
                    width: 300,
                    height: 75
                }, widget.call(this, t), this.octaves = 3, this.white = {
                    width: 0,
                    height: 0
                }, this.black = {
                    width: 0,
                    height: 0
                }, this.wkeys = new Array, this.bkeys = new Array, this.keypattern = ["w", "b", "w", "b", "w", "w", "b", "w", "b", "w", "b", "w"], this.keys = new Array, this.midibase = 48, this.lineWidth = 1, this.fingers = [{
                    key: -1,
                    pkey: -1
                }], this.multitouch = !1, this.oneleft = !1, this.mode = "button", this.val = {
                    on: 0,
                    note: 0,
                    midi: "0 0"
                }, this.init()
            };
        util.inherits(keyboard, widget), keyboard.prototype.init = function() {
            this.white = {
                width: 0,
                height: 0
            }, this.black = {
                width: 0,
                height: 0
            }, this.wkeys = new Array, this.bkeys = new Array, this.keys = new Array, this.white.num = 0;
            for (var t = 0; t < this.keypattern.length; t++) "w" == this.keypattern[t] ? this.white.num++ : null;
            this.white.num *= this.octaves, this.white.width = this.GUI.w / this.white.num, this.white.height = this.GUI.h, this.black.width = .6 * this.white.width, this.black.height = .6 * this.GUI.h;
            for (var t = 0; t < this.keypattern.length * this.octaves; t++) switch (this.keys[t] = {
                note: t + this.midibase,
                on: !1
            }, this.keypattern[t % this.keypattern.length]) {
                case "w":
                    this.keys[t].x = this.wkeys.length * this.white.width, this.keys[t].y = 0, this.keys[t].w = this.white.width, this.keys[t].h = this.white.height, this.keys[t].type = "w", this.keys[t].index = t, this.wkeys.push(this.keys[t]);
                    break;
                case "b":
                    this.keys[t].x = this.wkeys.length * this.white.width - this.black.width / 2, this.keys[t].y = 0, this.keys[t].w = this.black.width, this.keys[t].h = this.black.height, this.keys[t].type = "b", this.keys[t].index = t, this.bkeys.push(this.keys[t])
            }
            this.draw()
        }, keyboard.prototype.draw = function() {
            with(this.context) {
                strokeStyle = this.colors.borderhl, lineWidth = 1;
                for (var i in this.wkeys) fillStyle = this.wkeys[i].on ? this.colors.borderhl : this.colors.fill, strokeRect(this.wkeys[i].x, 0, this.white.width, this.white.height), fillRect(this.wkeys[i].x, 0, this.white.width, this.white.height);
                for (var i in this.bkeys) fillStyle = this.bkeys[i].on ? this.colors.borderhl : this.colors.black, fillRect(this.bkeys[i].x, 0, this.black.width, this.black.height)
            }
            this.drawLabel()
        }, keyboard.prototype.toggle = function(t, i) {
            if ("button" == this.mode) {
                if (t) {
                    i || i === !1 ? t.on = i : t.on = !t.on;
                    var e = t.on ? 1 : 0,
                        s = 128 * math.invert(this.clickPos.y / this.GUI.h);
                    s = math.prune(math.clip(s, 5, 128), 0), this.val = {
                        on: e * s,
                        note: t.note,
                        midi: t.note + " " + e
                    }, this.transmit(this.val), this.draw()
                }
            } else if ("sustain" == this.mode && t) {
                i ? t.on = i : t.on = !t.on;
                var e = t.on ? 1 : 0,
                    s = 128 * math.invert(this.clickPos.y / this.GUI.h);
                s = math.prune(math.clip(s, 5, 128), 0), this.val = {
                    on: e * s,
                    note: t.note,
                    midi: t.note + " " + e
                }, this.transmit(this.val), this.draw()
            }
        }, keyboard.prototype.whichKey = function(t, i) {
            for (var e in this.bkeys)
                if (drawing.isInside({
                        x: t,
                        y: i
                    }, this.bkeys[e])) return this.bkeys[e];
            var s = ~~(t / this.white.width);
            return s >= this.wkeys.length && (s = this.wkeys.length - 1), 0 > s && (s = 0), this.wkeys[s]
        }, keyboard.prototype.click = function(t) {
            if (this.clickPos.touches.length > 1 || this.multitouch) {
                this.multitouch = !0, this.clickPos.touches.length >= 2 && this.oneleft && (this.oneleft = !1), this.keysinuse = new Array;
                for (var i = 0; i < this.clickPos.touches.length; i++) this.fingers[i] = {
                    key: this.whichKey(this.clickPos.touches[i].x, this.clickPos.touches[i].y)
                }, this.fingers[i].key.on || this.toggle(this.fingers[i].key, !0), this.keysinuse.push(this.fingers[i].key.index);
                for (var i = 0; i < this.keys.length; i++) this.keys[i].on && this.keysinuse.indexOf(this.keys[i].index) < 0 && this.toggle(this.keys[i], !1)
            } else this.fingers[0].pkey = this.fingers[0].key, this.fingers[0].key = this.whichKey(this.clickPos.x, this.clickPos.y), this.toggle(this.fingers[0].key)
        }, keyboard.prototype.move = function(t) {
            if (this.clickPos.touches.length > 1 || this.multitouch) {
                this.keysinuse = new Array;
                for (var i = 0; i < this.clickPos.touches.length; i++) this.fingers[i] = {
                    key: this.whichKey(this.clickPos.touches[i].x, this.clickPos.touches[i].y)
                }, this.fingers[i].key.on || this.toggle(this.fingers[i].key, !0), this.keysinuse.push(this.fingers[i].key.index);
                for (var i = 0; i < this.keys.length; i++) this.keys[i].on && this.keysinuse.indexOf(this.keys[i].index) < 0 && this.toggle(this.keys[i], !1)
            } else this.fingers[0].pkey = this.fingers[0].key, this.fingers[0].key = this.whichKey(this.clickPos.x, this.clickPos.y), this.fingers[0].key && this.fingers[0].key.index != this.fingers[0].pkey.index && (this.toggle(this.fingers[0].pkey, !1), this.toggle(this.fingers[0].key, !0))
        }, keyboard.prototype.release = function(t) {
            if (this.clickPos.touches.length > 1 || this.multitouch) {
                this.keysinuse = new Array;
                for (var i = 0; i < this.clickPos.touches.length && (!this.oneleft || 1 != this.clickPos.touches.length); i++) this.fingers[i] = {
                    key: this.whichKey(this.clickPos.touches[i].x, this.clickPos.touches[i].y)
                }, this.keysinuse.push(this.fingers[i].key.index);
                for (var i = 0; i < this.keys.length; i++) this.keys[i].on && this.keysinuse.indexOf(this.keys[i].index) < 0 && this.toggle(this.keys[i], !1);
                1 == this.clickPos.touches.length && (this.oneleft = !0)
            } else "button" == this.mode && this.toggle(this.fingers[0].key, !1)
        }
    }, {
        "../core/widget": 3,
        "../utils/drawing": 5,
        "../utils/math": 6,
        util: 52
    }],
    21: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = (require("../utils/drawing"), require("util")),
            widget = require("../core/widget"),
            matrix = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 100
                }, widget.call(this, t), this.row = 4, this.col = 4, this.cellHgt, this.cellWid, this.matrix, this.val = {
                    row: 0,
                    col: 0,
                    level: 0,
                    list: new Array
                }, this.cur, this.prev, this.erasing = !1, this.place = null, this.starttime, this.lastbeat, this.thisframe = 0, this.lastframe = 0, this.context.lineWidth = 1, this.sequencing = !1, this.cellBuffer = 4, this.sequenceMode = "linear", this.bpm = 120, this.pbpm = this.bpm, this.starttime = nx.starttime, this.init()
            };
        util.inherits(matrix, widget), matrix.prototype.init = function() {
            this.pmatrix = this.matrix ? this.matrix : !1, this.matrix = null, this.matrix = new Array(this.col);
            for (var t = 0; t < this.col; t++) {
                this.matrix[t] = new Array(this.row);
                for (var i = 0; i < this.row; i++) this.matrix[t][i] = this.pmatrix && this.pmatrix[t] ? this.pmatrix[t][i] : 0
            }
            this.draw(), this.life = this.unboundlife.bind(this)
        }, matrix.prototype.draw = function() {
            with(this.erase(), this.cellWid = this.GUI.w / this.col, this.cellHgt = this.GUI.h / this.row, this.context) strokeStyle = this.colors.fill;
            for (var i = 0; i < this.row; i++)
                for (var j = 0; j < this.col; j++) {
                    var st_x = j * this.cellWid;
                    0 == j ? st_x += 0 : null;
                    var st_y = i * this.cellHgt;
                    0 == i ? st_y += 0 : null;
                    var boxwid = this.cellWid,
                        boxhgt = this.cellHgt;
                    with(this.context) strokeStyle = this.colors.border, lineWidth = this.cellBuffer, this.matrix[j][i] > 0 ? fillStyle = this.colors.accent : fillStyle = this.colors.fill, fillRect(st_x + this.cellBuffer / 2, st_y + this.cellBuffer / 2, boxwid - this.cellBuffer, boxhgt - this.cellBuffer), this.place == j && (globalAlpha = .4, fillStyle = this.colors.border, fillRect(st_x, st_y, boxwid, boxhgt), globalAlpha = 1)
                }
            this.drawLabel()
        }, matrix.prototype.click = function(t) {
            this.cur = {
                col: ~~(this.clickPos.x / this.cellWid),
                row: ~~(this.clickPos.y / this.cellHgt)
            }, this.matrix[this.cur.col][this.cur.row] ? (this.matrix[this.cur.col][this.cur.row] = 0, this.erasing = !0) : (this.matrix[this.cur.col][this.cur.row] = 1, this.erasing = !1), this.cur.value = this.matrix[this.cur.col][this.cur.row], this.prev = this.cur, this.val = {
                row: this.cur.row,
                col: this.cur.col,
                level: this.cur.value
            }, this.transmit(this.val), this.draw()
        }, matrix.prototype.move = function(t) {
            this.clicked && (this.cur = {
                col: ~~(this.clickPos.x / this.cellWid),
                row: ~~(this.clickPos.y / this.cellHgt)
            }, this.cur.row < this.row && this.cur.col < this.col && this.cur.row >= 0 && this.cur.col >= 0 && (this.cur.col != this.prev.col || this.cur.row != this.prev.row) && (this.erasing ? this.matrix[this.cur.col][this.cur.row] = 0 : this.matrix[this.cur.col][this.cur.row] = 1, this.cur.value = this.matrix[this.cur.col][this.cur.row], this.prev = this.cur, this.val = {
                row: this.cur.row,
                col: this.cur.col,
                level: this.cur.value
            }, this.transmit(this.val), this.draw()))
        }, matrix.prototype.setCell = function(t, i, e) {
            var s = e ? 1 : 0;
            this.matrix[t][i] = s, this.val = {
                row: i,
                col: t,
                level: s
            }, this.transmit(this.val), this.draw()
        }, matrix.prototype.sequence = function(t) {
            t && (this.bpm = t), this.sequencing = !0, requestAnimationFrame(this.seqStep.bind(this))
        }, matrix.prototype.setBPM = function(t) {
            this.bpm = t
        }, matrix.prototype.stop = function() {
            this.sequencing = !1
        }, matrix.prototype.seqStep = function() {
            0 == this.bpm && (this.bpm = 1);
            var t = (new Date).getTime(),
                i = t - this.starttime;
            if (this.bpm != this.pbpm) {
                var e = i / (6e4 / this.pbpm);
                i = e * (6e4 / this.bpm), this.starttime = t - i, this.thisframe = ~~(i / (6e4 / this.bpm))
            } else this.thisframe = ~~(i / (6e4 / this.bpm));
            this.pbpm = this.bpm, this.thisframe != this.lastframe && (this.lastbeat = t, "linear" == this.sequenceMode ? this.place++ : "random" == this.sequenceMode && (this.place = math.random(this.col)), this.place >= this.col && (this.place = 0), null == this.place && (this.place = 0), this.jumpToCol(this.place)), this.lastframe = this.thisframe, this.sequencing && requestAnimationFrame(this.seqStep.bind(this))
        }, matrix.prototype.jumpToCol = function(t) {
            this.place = t, this.val = {
                list: this.matrix[this.place]
            }, this.transmit(this.val), this.draw()
        }, matrix.prototype.customDestroy = function() {
            this.stop()
        }, matrix.prototype.unboundlife = function() {
            if (!this.clicked) {
                this.newmatrix = [];
                for (var t = 0; t < this.col; t++) {
                    this.newmatrix[t] = [];
                    for (var i = 0; i < this.row; i++) {
                        var e = 0;
                        t - 1 >= 0 && (e += this.matrix[t - 1][i - 1] ? this.matrix[t - 1][i - 1] : 0, e += this.matrix[t - 1][i] ? this.matrix[t - 1][i] : 0, e += this.matrix[t - 1][i + 1] ? this.matrix[t - 1][i + 1] : 0), e += this.matrix[t][i - 1] ? this.matrix[t][i - 1] : 0, e += this.matrix[t][i + 1] ? this.matrix[t][i + 1] : 0, t + 1 < this.col && (e += this.matrix[t + 1][i - 1] ? this.matrix[t + 1][i - 1] : 0, e += this.matrix[t + 1][i] ? this.matrix[t + 1][i] : 0, e += this.matrix[t + 1][i + 1] ? this.matrix[t + 1][i + 1] : 0), this.matrix[t][i] ? 2 > e ? this.newmatrix[t][i] = 0 : 2 == e || 3 == e ? this.newmatrix[t][i] = 1 : e > 3 && (this.newmatrix[t][i] = 0) : this.matrix[t][i] || 3 != e ? this.newmatrix[t][i] = this.matrix[t][i] : this.newmatrix[t][i] = 1
                    }
                }
                this.matrix = this.newmatrix
            }
            this.transmit({
                grid: this.matrix
            }), this.draw()
        }, matrix.prototype.life = function() {
            return !1
        }
    }, {
        "../core/widget": 3,
        "../utils/drawing": 5,
        "../utils/math": 6,
        util: 52
    }],
    22: [function(require, module, exports) {
        var util = require("util"),
            widget = require("../core/widget"),
            message = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 30
                }, widget.call(this, t), this.val = {
                    value: "send a message"
                }, this.size = 14
            };
        util.inherits(message, widget), message.prototype.init = function() {
            this.canvas.getAttribute("label") && (this.val.value = this.canvas.getAttribute("label")), this.draw();
        }, message.prototype.draw = function() {
            with(this.erase(), this.context) this.clicked ? fillStyle = this.colors.border : fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), this.clicked ? fillStyle = this.colors.black : fillStyle = this.colors.black, textAlign = "left", font = this.size + "px " + nx.font;
            this.wrapText(this.val.value, 5, 1 + this.size, this.GUI.w - 6, this.size)
        }, message.prototype.click = function(t) {
            this.draw(), this.transmit(this.val)
        }, message.prototype.release = function(t) {
            this.draw()
        }
    }, {
        "../core/widget": 3,
        util: 52
    }],
    23: [function(require, module, exports) {
        var util = require("util"),
            widget = (require("../utils/drawing"), require("../core/widget")),
            meter = module.exports = function(t) {
                this.defaultSize = {
                    width: 20,
                    height: 50
                }, widget.call(this, t), this.val = {
                    level: 0
                }, this.dataArray, this.bars = 8, this.init()
            };
        util.inherits(meter, widget), meter.prototype.init = function() {
            with(this.bar = {
                x: 0,
                y: 0,
                w: this.GUI.w,
                h: this.GUI.h / this.bars
            }, this.context) fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h)
        }, meter.prototype.setup = function(t, i) {
            this.actx = t, this.source = i, this.analyser = this.actx.createAnalyser(), this.analyser.smoothingTimeConstant = .85, this.analyser.fftsize = 1024, this.bufferLength = this.analyser.frequencyBinCount, this.dataArray = new Uint8Array(this.bufferLength), this.source.connect(this.analyser), this.draw()
        }, meter.prototype.draw = function() {
            if (this.dataArray) {
                this.analyser.getByteTimeDomainData(this.dataArray);
                var max = Math.max.apply(null, this.dataArray),
                    min = Math.min.apply(null, this.dataArray),
                    amp = max - min;
                amp /= 240;
                var db = 20 * (Math.log(amp) / Math.log(10));
                with(this.context) {
                    fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h);
                    for (var dboffset = Math.floor((db + 40) / (50 / this.bars)), i = 0; i < this.bars; i++) i >= .8 * this.bars ? fillStyle = "rgb(255,0,0)" : i < .8 * this.bars && i >= .69 * this.bars ? fillStyle = "rgb(255,255,0)" : i < .69 * this.bars && (fillStyle = "rgb(0,255,0)"), dboffset > i && fillRect(1, this.GUI.h - this.bar.h * i, this.GUI.w - 2, this.bar.h - 2)
                }
            }
            setTimeout(function() {
                window.requestAnimationFrame(this.draw.bind(this))
            }.bind(this), 80)
        }
    }, {
        "../core/widget": 3,
        "../utils/drawing": 5,
        util: 52
    }],
    24: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = require("util"),
            widget = require("../core/widget"),
            metro = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 20
                }, widget.call(this, t), this.val = {
                    beat: 0
                }, this.x = 10, this.y = 10, this.loc = 10, this.nodeSize = 10, this.speed = 1, this.direction = 1, this.orientation = "horizontal", this.boundary = this.GUI.w, nx.aniItems.push(this.advance.bind(this)), this.active = !0, this.init()
            };
        util.inherits(metro, widget), metro.prototype.init = function() {
            this.nodeSize = Math.min(this.GUI.w, this.GUI.h) / 2, this.GUI.w < this.GUI.h ? (this.orientation = "vertical", this.boundary = this.GUI.h) : (this.orientation = "horizontal", this.boundary = this.GUI.w), this.x = this.nodeSize, this.y = this.nodeSize, this.loc = this.nodeSize, this.draw()
        }, metro.prototype.draw = function() {
            with(this.erase(), this.context) fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), beginPath(), fillStyle = this.colors.accent, arc(this.x, this.y, this.nodeSize, 0, 2 * Math.PI, !0), fill(), closePath();
            this.drawLabel()
        }, metro.prototype.click = function() {}, metro.prototype.move = function() {
            this.clicked && (this.speed -= this.deltaMove.y / 50)
        }, metro.prototype.release = function() {}, metro.prototype.advance = function() {
            this.speed >= 0 ? this.loc += this.speed * this.direction : this.loc += this.speed * this.direction, (this.loc - this.nodeSize < 0 || this.loc + this.nodeSize > this.boundary) && (this.val.beat = math.scale(this.direction, -1, 1, 0, 1), this.transmit(this.val), this.direction *= -1), "vertical" == this.orientation ? this.y = this.loc : this.x = this.loc, this.draw()
        }, metro.prototype.customDestroy = function() {
            nx.removeAni(this.advance.bind(this))
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    25: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = (require("../utils/drawing"), require("util")),
            widget = require("../core/widget"),
            metroball = module.exports = function(t) {
                this.defaultSize = {
                    width: 300,
                    height: 200
                }, widget.call(this, t), this.CurrentBalls = new Array, this.ballpos = new Object, this.clickField = null, this.globalMetro, this.tempo = 1, this.tempoMarker = 150, this.quantize = !1, this.tiltLR, this.tiltFB, this.z, this.val = {
                    x: !1,
                    side: !1,
                    ball: !1,
                    all: !1
                }, nx.aniItems.push(this.metro.bind(this)), this.init()
            };
        util.inherits(metroball, widget), metroball.prototype.init = function() {
            this.draw()
        }, metroball.prototype.metro = function() {
            with(this.context) clearRect(0, 0, this.GUI.w, this.GUI.h);
            this.drawSpaces(), this.drawBalls(), this.drawLabel()
        }, metroball.prototype.drawSpaces = function() {
            with(this.context) fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), fillStyle = this.colors.border, fillRect(0, 0, this.GUI.w, this.GUI.h / 4), font = "normal " + this.GUI.h / 8 + "px " + nx.font, textAlign = "center", textBaseline = "middle", fillText("add", this.GUI.w / 2, this.GUI.h / 1.66), fillStyle = this.colors.fill, fillText("delete", this.GUI.w / 2, this.GUI.h / 8)
        }, metroball.prototype.drawBalls = function() {
            with(this.context) for (var i = 0; i < this.CurrentBalls.length; i++) this.CurrentBalls[i].move(), this.CurrentBalls[i].draw()
        }, metroball.prototype.click = function(t) {
            this.ballpos = this.clickPos, this.clickPos.y < this.GUI.h / 4 ? this.deleteMB(this.ballpos) : this.addNewMB(this.ballpos)
        }, metroball.prototype.move = function(t) {
            this.ballpos = this.clickPos, this.clickPos.y < this.GUI.h / 4 ? this.deleteMB(this.ballpos) : this.addNewMB(this.ballpos)
        }, metroball.prototype.release = function(t) {
            this.clickField = null
        }, metroball.prototype.deleteMB = function(t) {
            for (var i = this.CurrentBalls.length - 1; i >= 0; i--) Math.abs(this.CurrentBalls[i].xpos - t.x) < 10 && this.CurrentBalls[i].kill();
            for (var i = 0; i < this.CurrentBalls.length; i++) this.CurrentBalls[i].thisIndex = i
        }, metroball.prototype.addNewMB = function(t) {
            var i = this.CurrentBalls.length;
            this.CurrentBalls[i] = new this.Ball(i, t.x, t.y, this)
        }, metroball.prototype.toggleQuantization = function() {
            this.quantize ? this.quantize = !1 : this.quantize = !0
        }, metroball.prototype.tilt = function(t) {
            var i = math.prune(this.tiltLR / 90, 3),
                e = math.prune(this.tiltFB / 90, 3);
            math.prune(this.z, 3);
            tilt = 10 * i, this.tempo = Math.pow(e + 1, 3)
        }, metroball.prototype.Ball = function(thisIndex, thisX, thisY, parent) {
            this.thisIndex = thisIndex, this.color = parent.colors.accent, this.space = {
                ypos1: 0,
                ypos2: parent.height,
                xpos1: 0,
                xpos2: parent.width,
                hgt: parent.height,
                wid: parent.width
            }, this.xpos = thisX, this.ypos = thisY, this.size = 10, this.direction = 1, this.speed = (parent.height - this.ypos) / 20, this.speedQ = 5, this.quantize && (this.ypos = parent.height - 13), this.move = function() {
                this.quantize ? this.ypos = this.ypos + this.speedQ * this.direction * parent.tempo : this.ypos = this.ypos + this.speed * this.direction * parent.tempo, (this.ypos > parent.height - this.size - 2 || this.ypos < this.size + 2) && this.bounce(), this.ypos < this.space.ypos + this.size ? this.ypos = this.space.ypos + this.size + 5 : this.ypos > this.space.ypos + this.space.hgt - this.size && (this.ypos = this.space.ypos + this.space.hgt - this.size - 5), this.xpos < this.space.xpos ? this.xpos = this.space.xpos2 : this.xpos > this.space.xpos2 && (this.xpos = this.space.xpos)
            }, this.bounce = function() {
                this.direction / 2 + 1;
                this.bounceside = (this.direction + 1) / 2, this.direction = -1 * this.direction;
                var t = math.prune(this.xpos / this.space.wid, 3);
                this.val = {
                    x: t,
                    side: this.bounceside,
                    ball: this.thisIndex,
                    all: t + " " + this.bounceside + " " + this.thisIndex
                }, parent.transmit(this.val)
            }, this.kill = function() {
                parent.CurrentBalls.splice(this.thisIndex, 1)
            }, this.draw = function() {
                with(parent.context) beginPath(), fillStyle = this.color, 1 == this.direction ? (this.radius = this.size * Math.abs((this.ypos - this.space.ypos - this.space.hgt / 2) / (this.space.hgt - this.space.ypos) * 2), this.radius = this.radius / 2 + this.size / 2, this.radius = this.size, this.radius = this.speed, this.radius = Math.abs(15 - this.speed)) : (this.radius = this.size * Math.abs(2 - Math.abs((this.ypos - this.space.ypos - this.space.hgt / 2) / (this.space.hgt - this.space.ypos) * 2)), this.radius = this.radius / 2 + this.size / 2, this.radius = this.size, this.radius = Math.abs(15 - this.speed)), arc(this.xpos, this.ypos, this.radius, 0, 2 * Math.PI, !0), fill()
            }
        }
    }, {
        "../core/widget": 3,
        "../utils/drawing": 5,
        "../utils/math": 6,
        util: 52
    }],
    26: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = require("util"),
            widget = require("../core/widget"),
            motion = module.exports = function(target) {
                if (this.defaultSize = {
                        width: 75,
                        height: 75
                    }, widget.call(this, target), this.motionLR, this.motionFB, this.z, this.active = !0, this.px = 0, this.py = 0, this.pz = 0, this.val = {
                        x: 0,
                        y: 0,
                        z: 0
                    }, this.text = "Motion", this.init(), this.boundMotion = this.motionlistener.bind(this), window.DeviceMotionEvent) window.addEventListener("devicemotion", this.boundMotion, !1);
                else with(this.context) fillText("incompatible", 0, 0), this.active = !1
            };
        util.inherits(motion, widget), motion.prototype.deviceMotionHandler = function() {
            this.val = {
                x: math.prune(this.motionLR / 10, 4),
                y: math.prune(this.motionFB / 10, 4),
                z: math.prune(this.z / 10, 4)
            }, this.transmit(this.val)
        }, motion.prototype.motionlistener = function(e) {
            var data = e.acceleration;
            if (this.active && (this.motionLR = nx.lp(this.canvasID + "motionx", data.x, 20), this.motionFB = nx.lp(this.canvasID + "motiony", data.y, 20), this.z = nx.lp(this.canvasID + "motionz", data.z, 20), this.deviceMotionHandler(), this.draw(), null === data.x || void 0 === data.x)) {
                with(this.erase(), this.context) fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), fillStyle = this.colors.black, font = "12px courier", textAlign = "center", fillText("no data", this.GUI.w / 2, this.GUI.h / 2);
                this.active = !1
            }
        }, motion.prototype.init = function() {
            this.draw()
        }, motion.prototype.draw = function() {
            with(this.erase(), this.context) {
                fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), fillStyle = this.colors.accent;
                var eighth = Math.PI / 4;
                this.motionFB < 0 ? (beginPath(), moveTo(this.GUI.w / 2, this.GUI.h / 2), arc(this.GUI.w / 2, this.GUI.h / 2, this.GUI.w / 2, 5 * eighth, 7 * eighth, !1), globalAlpha = Math.pow(this.motionFB, 2), fill(), closePath()) : (beginPath(), moveTo(this.GUI.w / 2, this.GUI.h / 2), arc(this.GUI.w / 2, this.GUI.h / 2, this.GUI.w / 2, 1 * eighth, 3 * eighth, !1), globalAlpha = Math.pow(this.motionFB, 2), fill(), closePath()), this.motionLR < 0 ? (beginPath(), moveTo(this.GUI.w / 2, this.GUI.h / 2), arc(this.GUI.w / 2, this.GUI.h / 2, this.GUI.w / 2, 7 * eighth, 1 * eighth, !1), globalAlpha = Math.pow(this.motionLR, 2), fill(), closePath()) : (beginPath(), moveTo(this.GUI.w / 2, this.GUI.h / 2), arc(this.GUI.w / 2, this.GUI.h / 2, this.GUI.w / 2, 3 * eighth, 5 * eighth, !1), globalAlpha = Math.pow(this.motionLR, 2), fill(), closePath()), beginPath(), moveTo(this.GUI.w / 2, this.GUI.h / 2), arc(this.GUI.w / 2, this.GUI.h / 2, this.GUI.w / 6, 0, 2 * Math.PI, !1), globalAlpha = Math.pow(this.z, 2), fill(), closePath(), globalAlpha = 1
            }
            this.drawLabel()
        }, motion.prototype.click = function() {
            this.active = !this.active, this.draw()
        }, motion.prototype.customDestroy = function() {
            this.active = !1, window.removeEventListener("devicemotion", this.motionlistener, !1)
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    27: [function(require, module, exports) {
        var util = require("util"),
            widget = require("../core/widget"),
            math = require("../utils/math"),
            mouse = module.exports = function(t) {
                this.defaultSize = {
                    width: 98,
                    height: 100
                }, widget.call(this, t), this.val = {
                    x: 0,
                    y: 0,
                    deltax: 0,
                    deltay: 0
                }, this.inside = new Object, this.boundmove = this.preMove.bind(this), this.mousing = window.addEventListener("mousemove", this.boundmove, !1), this.init()
            };
        util.inherits(mouse, widget), mouse.prototype.init = function() {
            this.inside.height = this.GUI.h, this.inside.width = this.GUI.w, this.inside.left = 0, this.inside.top = 0, this.inside.quarterwid = this.inside.width / 4, this.draw()
        }, mouse.prototype.draw = function() {
            with(this.erase(), this.context) {
                fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h);
                var scaledx = -this.val.x * this.GUI.h,
                    scaledy = -this.val.y * this.GUI.h,
                    scaleddx = -this.val.deltax * this.GUI.h - this.GUI.h / 2,
                    scaleddy = -this.val.deltay * this.GUI.h - this.GUI.h / 2;
                fillStyle = this.colors.accent, fillRect(this.inside.left, this.inside.height, this.inside.quarterwid, scaledx), fillRect(this.inside.quarterwid, this.inside.height, this.inside.quarterwid, scaledy), fillRect(2 * this.inside.quarterwid, this.inside.height, this.inside.quarterwid, scaleddx), fillRect(3 * this.inside.quarterwid, this.inside.height, this.inside.quarterwid, scaleddy), globalAlpha = 1, fillStyle = this.colors.fill, textAlign = "center", font = this.GUI.w / 7 + "px " + this.font, globalAlpha = 1
            }
            this.drawLabel()
        }, mouse.prototype.move = function(t) {
            this.val = {
                deltax: t.clientX / window.innerWidth - this.val.x,
                deltay: math.invert(t.clientY / window.innerHeight) - this.val.y,
                x: t.clientX / window.innerWidth,
                y: math.invert(t.clientY / window.innerHeight)
            }, this.draw(), this.transmit(this.val)
        }, mouse.prototype.customDestroy = function() {
            window.removeEventListener("mousemove", this.boundmove, !1)
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    28: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = require("util"),
            widget = require("../core/widget"),
            multislider = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 75
                }, widget.call(this, t), this.sliders = 15, this.sliderClicked = 0, this.oldSliderToMove, this.init()
            };
        util.inherits(multislider, widget), multislider.prototype.init = function() {
            this.val = new Array;
            for (var t = 0; t < this.sliders; t++) this.val[t] = .7;
            this.realSpace = {
                x: this.GUI.w,
                y: this.GUI.h
            }, this.sliderWidth = this.realSpace.x / this.sliders, this.draw()
        }, multislider.prototype.draw = function() {
            with(this.erase(), this.context) {
                fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), strokeStyle = this.colors.accent, fillStyle = this.colors.accent, lineWidth = 5;
                for (var i = 0; i < this.sliders; i++) beginPath(), moveTo(i * this.sliderWidth, this.GUI.h - this.val[i] * this.GUI.h), lineTo(i * this.sliderWidth + this.sliderWidth, this.GUI.h - this.val[i] * this.GUI.h), stroke(), lineTo(i * this.sliderWidth + this.sliderWidth, this.GUI.h), lineTo(i * this.sliderWidth, this.GUI.h), globalAlpha = .3 - i % 3 * .1, fill(), closePath(), globalAlpha = 1
            }
            this.drawLabel()
        }, multislider.prototype.click = function() {
            this.oldSliderToMove = !1, this.move(!0)
        }, multislider.prototype.move = function(t) {
            if (this.clicked) {
                if (this.clickPos.touches.length > 1)
                    for (var i = 0; i < this.clickPos.touches.length; i++) {
                        var e = Math.floor(this.clickPos.touches[i].x / this.sliderWidth);
                        e = math.clip(e, 0, this.sliders - 1), this.val[e] = math.clip(math.invert(this.clickPos.touches[i].y / this.GUI.h), 0, 1)
                    } else {
                        var e = Math.floor(this.clickPos.x / this.sliderWidth);
                        if (e = math.clip(e, 0, this.sliders - 1), this.val[e] = math.clip(math.invert(this.clickPos.y / this.GUI.h), 0, 1), this.oldSliderToMove && this.oldSliderToMove > e + 1)
                            for (var s = this.oldSliderToMove - e - 1, i = 1; s >= i; i++) this.val[e + i] = this.val[e] + (this.val[this.oldSliderToMove] - this.val[e]) * (i / (s + 1));
                        else if (this.oldSliderToMove && e > this.oldSliderToMove + 1)
                            for (var s = e - this.oldSliderToMove - 1, i = 1; s >= i; i++) this.val[this.oldSliderToMove + i] = this.val[this.oldSliderToMove] + (this.val[e] - this.val[this.oldSliderToMove]) * (i / (s + 1))
                    }
                this.draw()
            }
            var h = new Object;
            if (h[e] = this.val[e], "js" == this.destination || "node" == this.destination) h.list = this.val;
            else {
                h.list = new String;
                for (var o in this.val) h.list += this.val[o] + " "
            }
            this.transmit(h), this.oldSliderToMove = e
        }, multislider.prototype.setNumberOfSliders = function(t) {
            this.sliders = t, this.val = new Array;
            for (var i = 0; i < this.sliders; i++) this.val.push(.7);
            this.sliderWidth = this.realSpace.x / this.sliders, this.init()
        }, multislider.prototype.setSliderValue = function(t, i) {
            this.val[t] = i, this.draw();
            var e = new Object;
            if (e[t] = this.val[t], "js" == this.destination || "node" == this.destination) e.list = this.val;
            else {
                e.list = new String;
                for (var s in this.val) e.list += this.val[s] + " "
            }
            this.transmit(e)
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    29: [function(require, module, exports) {
        var math = require("../utils/math"),
            drawing = require("../utils/drawing"),
            util = require("util"),
            widget = require("../core/widget"),
            multitouch = module.exports = function(t) {
                this.defaultSize = {
                    width: 200,
                    height: 200
                }, widget.call(this, t), this.nodeSize = this.GUI.w / 10, this.val = {
                    touch1: {
                        x: 0,
                        y: 0
                    }
                }, this.nodes = new Array, this.text = "multitouch", this.rainbow = ["#00f", "#04f", "#08F", "0AF", "0FF"], this.mode = "normal", this.rows = 10, this.cols = 10, this.matrixLabels = !1, this.init()
            };
        util.inherits(multitouch, widget), multitouch.prototype.init = function() {
            this.nodeSize = this.GUI.w / 10, this.draw()
        }, multitouch.prototype.draw = function() {
            with(this.erase(), this.context) {
                fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h);
                var count = 0;
                if ("matrix" == this.mode)
                    for (var j = 0; j < this.rows; j++)
                        for (var i = 0; i < this.cols; i++) with(this.context) {
                            beginPath(), fillStyle = this.colors.accent, strokeStyle = this.colors.border, lineWidth = 1;
                            var circx = i * this.GUI.w / this.cols + this.GUI.w / this.cols / 2,
                                circy = j * this.GUI.h / this.rows + this.GUI.h / this.rows / 2;
                            arc(circx, circy, this.GUI.h / this.rows / 2, 0, 2 * Math.PI, !0), stroke(), fillStyle = this.colors.border, textAlign = "center", textBaseline = "middle", this.matrixLabels && (fillText(this.matrixLabels[count % this.matrixLabels.length], circx, circy), count++);
                            var thisarea = {
                                x: i * this.GUI.w / this.cols,
                                y: j * this.GUI.h / this.rows,
                                w: this.GUI.w / this.cols,
                                h: this.GUI.h / this.rows
                            };
                            if (this.clickPos.touches.length >= 1)
                                for (var k = 0; k < this.clickPos.touches.length; k++) drawing.isInside(this.clickPos.touches[k], thisarea) && (globalAlpha = .5, fillStyle = this.colors.accent, fill(), globalAlpha = .3, fillStyle = this.rainbow[k], fill(), globalAlpha = 1);
                            closePath()
                        } else if (this.clickPos.touches.length >= 1) {
                            for (var i = 0; i < this.clickPos.touches.length; i++) with(this.context) globalAlpha = .5, beginPath(), fillStyle = this.colors.accent, strokeStyle = this.colors.border, lineWidth = this.lineWidth, arc(this.clickPos.touches[i].x, this.clickPos.touches[i].y, this.nodeSize, 0, 2 * Math.PI, !0), fill(), closePath(), globalAlpha = .3, beginPath(), fillStyle = this.rainbow[i], strokeStyle = this.colors.border, lineWidth = this.lineWidth, arc(this.clickPos.touches[i].x, this.clickPos.touches[i].y, this.nodeSize, 0, 2 * Math.PI, !0), fill(), closePath(), globalAlpha = 1;
                            clearRect(0, this.GUI.h, this.GUI.w, this.height - this.GUI.h)
                        } else this.setFont(), fillStyle = this.colors.border, fillText(this.text, this.GUI.w / 2, this.GUI.h / 2), globalAlpha = 1
            }
            this.drawLabel()
        }, multitouch.prototype.click = function() {
            this.draw(), this.sendit()
        }, multitouch.prototype.move = function() {
            this.clicked && (this.draw(), this.sendit())
        }, multitouch.prototype.release = function() {
            if (!this.clicked) {
                this.clickPos.touches = new Array;
                for (var t = 0; 5 > t; t++) this.val["touch" + t] = {
                    x: 0,
                    y: 0
                };
                this.transmit(this.val)
            }
            this.draw(), this.sendit()
        }, multitouch.prototype.sendit = function() {
            this.val = new Object;
            for (var t = 0; t < this.clickPos.touches.length; t++) this.val["touch" + t] = {
                x: this.clickPos.touches[t].x / this.canvas.width,
                y: math.invert(this.clickPos.touches[t].y / this.canvas.height)
            };
            this.transmit(this.val)
        }
    }, {
        "../core/widget": 3,
        "../utils/drawing": 5,
        "../utils/math": 6,
        util: 52
    }],
    30: [function(t, i, e) {
        var s = t("../utils/math"),
            h = t("util"),
            o = t("../core/widget"),
            n = i.exports = function(t) {
                this.defaultSize = {
                    width: 50,
                    height: 20
                }, o.call(this, t), this.val = {
                    value: 0
                }, this.min = -2e4, this.max = 2e4, this.step = 1, this.rate = .25, this.decimalPlaces = 3, this.lostdata = 0, this.actual = 0, this.canvas.ontouchstart = null, this.canvas.ontouchmove = null, this.canvas.ontouchend = null;
                var i = '<input type="text" nx="number" id="' + this.canvasID + '" style="height:' + this.GUI.h + "px;width:" + this.GUI.w + "px;font-size:" + this.GUI.h / 2 + 'px;"></input><canvas height="1px" width="1px" style="display:none"></canvas>',
                    e = this.canvas,
                    h = this.canvas.style,
                    n = e.parentNode,
                    r = document.createElement("span");
                r.innerHTML = i, r.className = "nx", n.replaceChild(r, e), this.el = document.getElementById(this.canvasID);
                for (var l in h) "height" != l && "width" != l && (this.el.style[l] = h[l]);
                if (this.label) {
                    var a = document.createElement("div");
                    a.innerHTML = this.label, a.style.fontSize = this.labelSize / 2.8 + "px", a.style.fontFamily = this.labelFont, a.style.textAlign = this.labelAlign, a.style.lineHeight = this.labelSize + "px", a.style.width = this.GUI.w + "px", a.style.color = nx.colors.black, a.className = "nxlabel", r.appendChild(a)
                }
                this.canvas = document.getElementById(this.canvasID), this.canvas.style.height = this.GUI.h + "px", this.canvas.style.fontSize = .6 * this.GUI.h + "px", this.canvas.style.textAlign = "left", this.canvas.style.backgroundColor = this.colors.fill, this.canvas.style.highlight = this.colors.fill, this.canvas.style.border = "none", this.canvas.style.outline = "none", this.canvas.style.padding = "4px 10px", this.canvas.style.cursor = "pointer", this.canvas.style.display = "block", this.canvas.className = "", this.canvas.addEventListener("blur", function() {
                    this.canvas.style.backgroundColor = this.colors.fill, this.canvas.style.color = this.colors.black, this.canvas.value != this.val.value && (this.actual = parseFloat(this.canvas.value), this.actual = s.clip(this.actual, this.min, this.max), this.actual = s.prune(this.actual, this.decimalPlaces), this.set({
                        value: this.actual
                    }, !0))
                }.bind(this)), this.canvas.addEventListener("keydown", function(t) {
                    (t.which < 48 || t.which > 57) && 189 != t.which && 190 != t.which && 8 != t.which && t.preventDefault(), 13 == t.which && this.canvas.blur()
                }.bind(this)), nx.isTouchDevice ? (this.canvas.ontouchstart = this.preTouch, this.canvas.ontouchmove = this.preTouchMove, this.canvas.ontouchend = this.preTouchRelease) : this.canvas.addEventListener("mousedown", this.preClick, !1), this.canvas.style.userSelect = "none !important", this.canvas.style.mozUserSelect = "none !important", this.canvas.style.webkitUserSelect = "none !important", this.init()
            };
        h.inherits(n, o), n.prototype.init = function() {
            this.draw()
        }, n.prototype.draw = function() {
            this.canvas.value = this.val.value
        }, n.prototype.click = function(t) {
            this.canvas.readOnly = !0, this.actual = this.val.value
        }, n.prototype.move = function(t) {
            this.clicked && (this.canvas.style.border = "none", this.actual -= this.deltaMove.y * (this.rate * this.step), this.actual = s.clip(this.actual, this.min, this.max), this.val.value = Math.floor(this.actual / this.step) * this.step, this.val.value = s.prune(this.val.value, this.decimalPlaces), this.draw(), this.transmit(this.val))
        }, n.prototype.release = function(t) {
            !this.hasMoved && this.canvas.readOnly && (this.canvas.readOnly = !1, this.canvas.focus(), this.canvas.setSelectionRange(0, this.canvas.value.length), this.canvas.style.backgroundColor = this.colors.accent, this.canvas.style.color = this.colors.fill)
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    31: [function(require, module, exports) {
        var util = require("util"),
            widget = require("../core/widget"),
            panel = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 100
                }, widget.call(this, t)
            };
        util.inherits(panel, widget), panel.prototype.init = function() {
            this.draw()
        }, panel.prototype.draw = function() {
            with(this.erase(), this.makeRoundedBG(), this.context) fillStyle = this.colors.border, lineWidth = this.lineWidth, fill()
        }
    }, {
        "../core/widget": 3,
        util: 52
    }],
    32: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = require("util"),
            widget = require("../core/widget"),
            position = module.exports = function(t) {
                this.defaultSize = {
                    width: 150,
                    height: 100
                }, widget.call(this, t), this.nodeSize = 15, this.val = {
                    x: .5,
                    y: .5
                }, this.init()
            };
        util.inherits(position, widget), position.prototype.init = function() {
            this.nodeSize = Math.min(this.GUI.h, this.GUI.w) / 10, this.nodeSize = Math.max(this.nodeSize, 10), this.actualWid = this.GUI.w - 2 * this.nodeSize, this.actualHgt = this.GUI.h - 2 * this.nodeSize, this.draw()
        }, position.prototype.draw = function() {
            with(this.erase(), this.context) {
                fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h);
                var drawingX = this.val.x * this.actualWid + this.nodeSize,
                    drawingY = math.invert(this.val.y) * this.actualHgt + this.nodeSize;
                with(drawingX < this.nodeSize ? drawingX = this.nodeSize : drawingX > this.GUI.w - this.nodeSize && (drawingX = this.GUI.w - this.nodeSize), drawingY < this.nodeSize ? drawingY = this.nodeSize : drawingY > this.GUI.h - this.nodeSize && (drawingY = this.GUI.h - this.nodeSize), this.context) beginPath(), fillStyle = this.colors.accent, arc(drawingX, drawingY, this.nodeSize, 0, 2 * Math.PI, !0), fill(), closePath(), this.clicked && (beginPath(), fillStyle = this.colors.accent, arc(drawingX, drawingY, 2 * this.nodeSize, 0, 2 * Math.PI, !0), fill(), closePath(), clearRect(0, this.GUI.h, this.GUI.w, this.height - this.GUI.h))
            }
            this.drawLabel()
        }, position.prototype.click = function() {
            this.val.x = this.clickPos.x, this.val.y = this.clickPos.y, this.scaleNode(), this.val.state = "click", this.transmit(this.val), this.draw()
        }, position.prototype.move = function() {
            this.val.x = this.clickPos.x, this.val.y = this.clickPos.y, this.scaleNode(), this.val.state = "move", this.transmit(this.val), this.draw()
        }, position.prototype.release = function() {
            this.val.x = this.clickPos.x, this.val.y = this.clickPos.y, this.scaleNode(), this.val.state = "release", this.transmit(this.val), this.draw()
        }, position.prototype.scaleNode = function() {
            var t = this.val.x - this.nodeSize,
                i = this.val.y - this.nodeSize,
                e = math.clip(t / this.actualWid, 0, 1),
                s = math.clip(i / this.actualHgt, 0, 1);
            this.val.x = math.prune(e, 3), this.val.y = math.prune(s, 3), this.val.y = math.invert(this.val.y)
        }, position.prototype.animate = function(t) {
            switch (t) {
                case "bounce":
                    nx.aniItems.push(this.aniBounce.bind(this));
                    break;
                case "none":
                    nx.aniItems.splice(nx.aniItems.indexOf(this.aniBounce))
            }
        }, position.prototype.aniBounce = function() {
            !this.clicked && this.val.x && (this.val.x += this.deltaMove.x / 2 / this.GUI.w, this.val.y -= this.deltaMove.y / 2 / this.GUI.h, this.val.state = "animated", math.bounce(this.val.x, 0, 1, this.deltaMove.x) != this.deltaMove.x && (this.deltaMove.x = math.bounce(this.val.x, 0, 1, this.deltaMove.x), this.val.state = "bounce"), (this.val.y >= 1 || this.val.y <= 0) && (this.deltaMove.y = -1 * math.bounce(this.val.y, 0, 1, this.deltaMove.y), this.val.state = "bounce"), this.transmit(this.val), this.draw())
        }, position.prototype.customDestroy = function() {
            nx.removeAni(this.aniBounce)
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    33: [function(require, module, exports) {
        var util = require("util"),
            widget = require("../core/widget"),
            math = require("../utils/math"),
            range = module.exports = function(t) {
                this.defaultSize = {
                    width: 110,
                    height: 35
                }, widget.call(this, t), this.val = {
                    start: .3,
                    stop: .7,
                    size: .4
                }, this.hslider = !1, this.handle, this.relhandle, this.cap, this.firsttouch = "start", this.mode = "area", this.touchdown = new Object, this.init()
            };
        util.inherits(range, widget), range.prototype.init = function() {
            this.GUI.h >= this.GUI.w ? this.hslider = !1 : this.hslider = !0, null != this.canvas.getAttribute("label") && (this.label = this.canvas.getAttribute("label")), this.draw()
        }, range.prototype.draw = function() {
            with(this.erase(), this.context) if (fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), this.hslider) {
                var x1 = this.val.start * this.GUI.w,
                    y1 = 0,
                    x2 = this.val.stop * this.GUI.w,
                    y2 = this.GUI.h;
                fillStyle = this.colors.accent, fillRect(x1, y1, x2 - x1, y2 - y1)
            } else {
                var x1 = 0,
                    y1 = this.GUI.h - this.val.stop * this.GUI.h,
                    x2 = this.GUI.w,
                    y2 = this.GUI.h - this.val.start * this.GUI.h;
                fillStyle = this.colors.accent, fillRect(x1, y1, x2 - x1, y2 - y1)
            }
            this.drawLabel()
        }, range.prototype.click = function() {
            "edge" == this.mode ? this.hslider ? Math.abs(this.clickPos.x - this.val.start * this.GUI.w) < Math.abs(this.clickPos.x - this.val.stop * this.GUI.w) ? this.firsttouch = "start" : this.firsttouch = "stop" : Math.abs(Math.abs(this.clickPos.y - this.GUI.h) - this.val.start * this.GUI.h) < Math.abs(Math.abs(this.clickPos.y - this.GUI.h) - this.val.stop * this.GUI.h) ? this.firsttouch = "start" : this.firsttouch = "stop" : "area" == this.mode && (this.touchdown = {
                x: this.clickPos.x,
                y: this.clickPos.y
            }, this.startval = new Object, this.startval.size = this.val.stop - this.val.start, this.startval.loc = this.val.start + this.startval.size / 2), this.move()
        }, range.prototype.move = function() {
            if ("edge" == this.mode) this.hslider ? "start" == this.firsttouch ? (this.val.start = this.clickPos.x / this.GUI.w, this.clickPos.touches.length > 1 && (this.val.stop = this.clickPos.touches[1].x / this.GUI.w)) : (this.val.stop = this.clickPos.x / this.GUI.w, this.clickPos.touches.length > 1 && (this.val.start = this.clickPos.touches[1].x / this.GUI.w)) : "start" == this.firsttouch ? (this.val.start = math.invert(this.clickPos.y / this.GUI.h), this.clickPos.touches.length > 1 && (this.val.stop = math.invert(this.clickPos.touches[1].y / this.GUI.h))) : (this.val.stop = math.invert(this.clickPos.y / this.GUI.h), this.clickPos.touches.length > 1 && (this.val.start = math.invert(this.clickPos.touches[1].y / this.GUI.h))), this.val.stop < this.val.start && (this.tempstart = this.val.start, this.val.start = this.val.stop, this.val.stop = this.tempstart, "start" == this.firsttouch ? this.firsttouch = "stop" : this.firsttouch = "start"), this.val = {
                start: math.clip(this.val.start, 0, 1),
                stop: math.clip(this.val.stop, 0, 1)
            }, this.val.size = math.prune(math.clip(Math.abs(this.val.stop - this.val.start), 0, 1), 3), this.draw(), this.transmit(this.val);
            else if ("area" == this.mode) {
                if (this.hslider) var t = this.clickPos.x / this.GUI.w,
                    i = (this.touchdown.y - this.clickPos.y) / this.GUI.h;
                else {
                    var t = nx.invert(this.clickPos.y / this.GUI.h),
                        i = (this.touchdown.x - this.clickPos.x) / this.GUI.w;
                    i *= -1
                }
                i /= 3;
                var e = this.startval.size + i;
                e = math.clip(e, .001, 1), this.val = {
                    start: t - e / 2,
                    stop: t + e / 2
                }, this.val.start = math.clip(this.val.start, 0, 1), this.val.stop = math.clip(this.val.stop, 0, 1), this.draw(), this.transmit(this.val)
            }
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    34: [function(t, i, e) {
        var s = t("util"),
            h = t("../core/widget"),
            o = i.exports = function(t) {
                this.defaultSize = {
                    width: 200,
                    height: 30
                }, h.call(this, t), this.choices = [], this.val = new Object, this.canvas.ontouchstart = null, this.canvas.ontouchmove = null, this.canvas.ontouchend = null, this.canvas.getAttribute("choices") && (this.choices = this.canvas.getAttribute("choices"), this.choices = this.choices.split(","));
                var i = '<select id="' + this.canvasID + '" class="nx" nx="select" style="height:' + this.GUI.h + "px;width:" + this.GUI.w + 'px;" onchange="' + this.canvasID + '.change(this)"></select><canvas height="1px" width="1px" style="display:none"></canvas>',
                    e = this.canvas,
                    s = this.canvas.style,
                    o = e.parentNode,
                    n = document.createElement("span");
                n.innerHTML = i, n.className = "nx", o.replaceChild(n, e), this.sel = document.getElementById(this.canvasID);
                for (var r in s) this.sel.style[r] = s[r];
                this.canvas = document.getElementById(this.canvasID), this.canvas.style.backgroundColor = this.colors.fill, this.canvas.style.border = "solid 2px " + this.colors.border, this.canvas.style.color = this.colors.black, this.canvas.style.fontSize = Math.round(this.GUI.h / 2.3) + "px", this.canvas.className = ""
            };
        s.inherits(o, h), o.prototype.init = function() {
            this.canvas.style.backgroundColor = this.colors.fill, this.canvas.style.border = "solid 2px " + this.colors.border, this.canvas.style.color = this.colors.black;
            var t = this.canvas.options.length;
            for (i = 0; t > i; i++) this.canvas.options[i] = null;
            for (var i = 0; i < this.choices.length; i++) {
                var e = document.createElement("option");
                e.text = this.choices[i], e.value = this.choices[i], this.canvas.add(e, null)
            }
            this.val.text = this.choices[0]
        }, o.prototype.change = function(t) {
            this.val.text = t.value, this.transmit(this.val)
        }, o.prototype.draw = function() {
            this.canvas.value = this.val.text, this.canvas.style.backgroundColor = this.colors.fill, this.canvas.style.color = this.colors.black, this.canvas.style.border = "solid 2px " + this.colors.border
        }
    }, {
        "../core/widget": 3,
        util: 52
    }],
    35: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = require("util"),
            widget = require("../core/widget"),
            slider = module.exports = function(t) {
                this.defaultSize = {
                    width: 35,
                    height: 110
                }, widget.call(this, t), null != this.canvas.getAttribute("min") ? this.min = parseFloat(this.canvas.getAttribute("min")) : this.min = 0, null != this.canvas.getAttribute("max") ? this.max = parseFloat(this.canvas.getAttribute("max")) : this.max = 1, null != this.canvas.getAttribute("step") ? this.step = parseFloat(this.canvas.getAttribute("step")) : this.step = .001, this.val.value = nx.scale(.7, 0, 1, this.min, this.max), this.mode = "absolute", this.hslider = !1, this.handle, this.relhandle, this.cap, this.maxdigits = 3, this.calculateDigits = nx.calculateDigits, this.init()
            };
        util.inherits(slider, widget), slider.prototype.init = function() {
            this.GUI.h >= this.GUI.w ? this.hslider = !1 : this.hslider = !0, this.draw()
        }, slider.prototype.draw = function() {
            var normalval = this.normalize(this.val.value);
            with(this.digits = this.calculateDigits(), this.erase(), this.context) {
                if (fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), this.hslider) {
                    var x1 = 0,
                        y1 = 0,
                        x2 = normalval * this.GUI.w,
                        y2 = this.GUI.h;
                    fillStyle = this.colors.accent, fillRect(x1, y1, x2 - x1, y2 - y1);
                    var valtextsize = this.GUI.h / 2;
                    if (valtextsize > 6) {
                        if (x2 > this.digits.total * valtextsize / 2) {
                            fillStyle = this.colors.white;
                            var textx = 5
                        } else {
                            fillStyle = this.colors.accent;
                            var textx = x2 + 5
                        }
                        var texty = this.GUI.h / 2,
                            valtextAlign = "left",
                            valtextBaseline = "middle"
                    }
                } else {
                    var x1 = 0,
                        y1 = this.GUI.h - normalval * this.GUI.h,
                        x2 = this.GUI.w,
                        y2 = this.GUI.h;
                    fillStyle = this.colors.accent, fillRect(x1, y1, x2 - x1, y2 - y1);
                    var valtextsize = this.GUI.w / this.digits.total * 1.2;
                    if (valtextsize > 6) {
                        if (y1 < this.GUI.h - valtextsize / 2 - 5) {
                            fillStyle = this.colors.white;
                            var texty = this.GUI.h - valtextsize / 2 - 5
                        } else {
                            fillStyle = this.colors.accent;
                            var texty = y1 - valtextsize / 2 - 5
                        }
                        var textx = this.GUI.w / 2,
                            valtextAlign = "center",
                            valtextBaseline = "middle"
                    }
                }
                var valtext = this.val.value.toFixed(this.digits.decimals);
                textBaseline = valtextBaseline,
                    textAlign = valtextAlign, font = valtextsize + "px 'Open Sans'", fillText(valtext, textx, texty), this.label && this.drawLabel()
            }
        }, slider.prototype.click = function() {
            this.move()
        }, slider.prototype.move = function() {
            var t = this.normalize(this.val.value);
            this.hslider ? (this.handle = this.clickPos.x, this.relhandle = this.deltaMove.x, this.cap = this.GUI.w) : (this.handle = this.clickPos.y, this.relhandle = -1 * this.deltaMove.y, this.cap = this.GUI.h), "absolute" == this.mode ? this.clicked && (t = this.hslider ? math.clip(this.clickPos.x / this.GUI.w, 0, 1) : Math.abs(math.clip(this.clickPos.y / this.GUI.h, 0, 1) - 1), this.draw()) : "relative" == this.mode && this.clicked && (t = this.hslider ? math.clip(t + this.deltaMove.x / this.GUI.w, 0, 1) : math.clip(t + -1 * this.deltaMove.y / this.GUI.h, 0, 1), this.draw()), this.val.value = math.prune(this.rangify(t), 3), this.transmit(this.val)
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    36: [function(require, module, exports) {
        var util = require("util"),
            widget = require("../core/widget"),
            string = module.exports = function(t) {
                this.defaultSize = {
                    width: 150,
                    height: 75
                }, widget.call(this, t), this.val = {
                    string: 0,
                    x: 0
                }, this.numberOfStrings = 10, this.strings = new Array, this.abovestring = new Array, this.friction = 1;
                this.init(), nx.aniItems.push(this.draw.bind(this))
            };
        util.inherits(string, widget), string.prototype.init = function() {
            stringdiv = this.GUI.h / (this.numberOfStrings + 1);
            for (var t = 0; t < this.numberOfStrings; t++) this.strings[t] = {
                x1: this.lineWidth,
                y1: stringdiv * (1 + t),
                x2: this.GUI.w - this.lineWidth,
                y2: stringdiv * (t + 1),
                held: !1,
                vibrating: !1,
                force: 0,
                maxstretch: 0,
                stretch: 0,
                direction: 0,
                above: !1
            };
            this.draw()
        }, string.prototype.pulse = function() {
            this.draw()
        }, string.prototype.setStrings = function(t) {
            this.numberOfStrings = t, this.strings = new Array, this.init()
        }, string.prototype.draw = function() {
            with(this.erase(), this.context) {
                strokeStyle = this.colors.border, fillStyle = this.colors.fill, lineWidth = this.lineWidth, fillRect(0, 0, this.GUI.w, this.GUI.h), strokeStyle = this.colors.accent;
                for (var i = 0; i < this.strings.length; i++) {
                    var st = this.strings[i];
                    st.vibrating ? (st.maxstretch < 0 && (st.vibrating = !1, st.held = !1), st.stretch = st.stretch + st.direction, Math.abs(st.stretch) > st.maxstretch && (st.direction *= -1, st.stretch = st.stretch + st.direction, st.maxstretch = st.maxstretch - this.friction, st.direction = st.direction / Math.abs(st.direction) * (st.maxstretch / 1)), beginPath(), moveTo(st.x1, st.y1), quadraticCurveTo(this.GUI.w / 2, st.y1 + st.stretch, st.x2, st.y2), stroke(), closePath(), st.on = !0) : st.held ? (beginPath(), moveTo(st.x1, st.y1), quadraticCurveTo(this.clickPos.x, this.clickPos.y, st.x2, st.y2), stroke(), closePath(), st.on = !0) : (beginPath(), moveTo(st.x1, st.y1), lineTo(st.x2, st.y2), stroke(), closePath(), st.on && (st.on = !1))
                }
            }
            this.drawLabel()
        }, string.prototype.click = function() {
            for (var t = 0; t < this.numberOfStrings; t++) this.strings[t].above = this.clickPos.y < this.strings[t].y1;
            this.draw()
        }, string.prototype.move = function() {
            if (this.clicked)
                for (var t = 0; t < this.strings.length; t++) this.strings[t].above != this.clickPos.y < this.strings[t].y1 && (this.strings[t].held = !0, this.strings[t].above ^= !0), this.strings[t].held && Math.abs(this.clickPos.y - this.strings[t].y1) > this.GUI.h / (3 * this.strings.length) && this.pluck(t)
        }, string.prototype.release = function() {
            for (var t = 0; t < this.strings.length; t++) this.strings[t].held && this.pluck(t)
        }, string.prototype.pluck = function(t) {
            var i = t;
            this.val = {
                string: i,
                x: this.clickPos.x / this.GUI.w
            }, this.transmit(this.val), this.strings[i].held = !1, this.strings[i].force = this.clickPos.y - this.strings[i].y1, this.strings[i].maxstretch = Math.abs(this.clickPos.y - this.strings[i].y1), this.strings[i].stretch = this.clickPos.y - this.strings[i].y1, this.strings[i].vibrating = !0, this.strings[i].direction = (this.clickPos.y - this.strings[i].y1) / Math.abs(this.clickPos.y - this.strings[i].y1) * ((this.clickPos.y - this.strings[i].y1) / -1.2)
        }, string.prototype.customDestroy = function() {
            nx.removeAni(this.draw.bind(this))
        }
    }, {
        "../core/widget": 3,
        util: 52
    }],
    37: [function(require, module, exports) {
        var util = (require("../utils/math"), require("util")),
            widget = require("../core/widget"),
            tabs = module.exports = function(t) {
                this.defaultSize = {
                    width: 150,
                    height: 50
                }, widget.call(this, t), this.choice = 0, this.val = {
                    index: 0,
                    text: ""
                }, this.tabwid = 0, this.options = ["one", "two", "three"], this.init()
            };
        util.inherits(tabs, widget), tabs.prototype.init = function() {
            this.draw()
        }, tabs.prototype.draw = function() {
            with(this.context) fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), textAlign = "center", textBaseline = "middle", font = "normal " + this.GUI.h / 5 + "px courier";
            this.tabwid = this.GUI.w / this.options.length;
            for (var i = 0; i < this.options.length; i++) {
                if (i == this.choice) var tabcol = this.colors.accent,
                    textcol = this.colors.white;
                else {
                    var tabcol = this.colors.fill,
                        textcol = this.colors.black;
                    globalAlpha = .7
                }
                with(this.context) fillStyle = tabcol, fillRect(this.tabwid * i, 0, this.tabwid, this.GUI.h), i != this.options.length - 1 && (beginPath(), moveTo(this.tabwid * (i + 1), 0), lineTo(this.tabwid * (i + 1), this.GUI.h), lineWidth = 1, strokeStyle = this.colors.border, stroke(), closePath()), fillStyle = textcol, font = this.fontSize + "px " + this.font, fillText(this.options[i], this.tabwid * i + this.tabwid / 2, this.GUI.h / 2)
            }
        }, tabs.prototype.click = function() {
            this.choice = ~~(this.clickPos.x / this.tabwid), this.val = {
                index: this.choice,
                text: this.options[this.choice]
            }, this.transmit(this.val), this.draw()
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    38: [function(t, i, e) {
        var s = t("util"),
            h = t("../core/widget"),
            o = i.exports = function(t) {
                this.defaultSize = {
                    width: 200,
                    height: 100
                }, h.call(this, t), this.val = {
                    text: ""
                };
                var i = '<textarea id="' + this.canvasID + '" style="height:' + this.GUI.h + "px;width:" + this.GUI.w + 'px;" onkeydown="' + this.canvasID + '.change(event,this)"></textarea><canvas height="1px" width="1px" style="display:none"></canvas>',
                    e = this.canvas,
                    s = this.canvas.style,
                    o = e.parentNode,
                    n = document.createElement("span");
                n.innerHTML = i, n.className = "nx", o.replaceChild(n, e), this.el = document.getElementById(this.canvasID);
                for (var r in s) this.el.style[r] = s[r];
                this.el.style.display = "block", this.el.style.backgroundColor = this.colors.fill, this.el.style.border = "none", this.el.style.color = this.colors.black, this.el.style.outline = "none", this.el.style.resize = "none", this.el.style.boxSizing = "border-box", this.el.style.padding = "5px", this.el.style.fontFamily = nx.font, this.el.style.fontSize = "16px", this.el.className = "", this.canvas = document.getElementById(this.canvasID)
            };
        s.inherits(o, h), o.prototype.init = function() {
            this.canvas.ontouchstart = null, this.canvas.ontouchmove = null, this.canvas.ontouchend = null, this.canvas.style.backgroundColor = this.colors.fill, this.canvas.style.color = this.colors.black
        }, o.prototype.change = function(t, i) {
            this.val.text = i.value, "13" == t.which && (this.transmit(this.val), this.val.text = "", this.draw(), t.preventDefault())
        }, o.prototype.draw = function() {
            this.el.value = this.val.text, this.canvas.style.backgroundColor = this.colors.fill, this.canvas.style.color = this.colors.black
        }
    }, {
        "../core/widget": 3,
        util: 52
    }],
    39: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = require("util"),
            widget = require("../core/widget"),
            tilt = module.exports = function(t) {
                this.defaultSize = {
                    width: 50,
                    height: 50
                }, widget.call(this, t), this.tiltLR, this.tiltFB, this.z, this.active = !0, this.val = {
                    x: 0,
                    y: 0,
                    z: 0
                }, this.text = "TILT", this.init(), this.boundChromeTilt = this.chromeTilt.bind(this), this.boundMozTilt = this.mozTilt.bind(this), window.DeviceOrientationEvent ? window.addEventListener("deviceorientation", this.boundChromeTilt, !1) : window.OrientationEvent ? window.addEventListener("MozOrientation", this.boundMozTilt, !1) : console.log("Not supported on your device or browser.")
            };
        util.inherits(tilt, widget), tilt.prototype.deviceOrientationHandler = function() {
            this.val = {
                x: math.prune(this.tiltLR / 90, 3),
                y: math.prune(this.tiltFB / 90, 3),
                z: math.prune(this.z, 3)
            }, this.active && this.transmit(this.val)
        }, tilt.prototype.chromeTilt = function(t) {
            this.tiltLR = t.gamma, this.tiltFB = t.beta, this.z = t.alpha, this.deviceOrientationHandler(), this.draw()
        }, tilt.prototype.mozTilt = function(t) {
            this.tiltLR = 90 * t.x, this.tiltFB = -90 * t.y, this.z = t.z, this.deviceOrientationHandler(), this.draw()
        }, tilt.prototype.init = function() {
            this.draw()
        }, tilt.prototype.draw = function() {
            with(this.erase(), this.context) fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), save(), translate(this.GUI.w / 2, this.GUI.h / 2), rotate(-this.val.x * Math.PI / 2), translate(-this.GUI.w / 2, -this.GUI.h / 2), globalAlpha = .4, this.active ? fillStyle = this.colors.accent : fillStyle = this.colors.border, fillRect(-this.GUI.w, this.GUI.h * (this.val.y / 2) + this.GUI.h / 2, 3 * this.GUI.w, 2 * this.GUI.h), font = "bold " + this.GUI.h / 5 + "px " + this.font, textAlign = "center", textBaseline = "middle", fillText(this.text, this.GUI.w / 2, this.GUI.h * (this.val.y / 2) + this.GUI.h / 2 - this.GUI.h / 15), globalAlpha = 1, restore(), clearRect(0, this.GUI.h, this.GUI.w, this.height - this.GUI.h);
            this.drawLabel()
        }, tilt.prototype.click = function() {
            this.active = !this.active
        }, tilt.prototype.customDestroy = function() {
            this.active = !1, window.removeEventListener("deviceorientation", this.boundChromeTilt, !1), window.removeEventListener("mozOrientation", this.boundMozTilt, !1)
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    40: [function(require, module, exports) {
        var util = (require("../utils/drawing"), require("util")),
            widget = require("../core/widget"),
            toggle = module.exports = function(t) {
                this.defaultSize = {
                    width: 50,
                    height: 50
                }, widget.call(this, t), this.val = {
                    value: 0
                }, this.init()
            };
        util.inherits(toggle, widget), toggle.prototype.init = function() {
            this.draw()
        }, toggle.prototype.draw = function() {
            with(this.erase(), this.context) this.val.value ? (fillStyle = this.colors.accent, strokeStyle = this.colors.accenthl, strokeAlpha = 1) : (fillStyle = this.colors.fill, strokeStyle = this.colors.border, strokeAlpha = 1), lineWidth = Math.sqrt(this.GUI.w) / 2, fillRect(0, 0, this.GUI.w, this.GUI.h), globalAlpha = strokeAlpha, strokeRect(lineWidth / 2, lineWidth / 2, this.GUI.w - lineWidth, this.GUI.h - lineWidth), globalAlpha = 1;
            this.drawLabel()
        }, toggle.prototype.click = function() {
            this.val.value ? this.val.value = 0 : this.val.value = 1, this.draw(), this.transmit(this.val)
        }
    }, {
        "../core/widget": 3,
        "../utils/drawing": 5,
        util: 52
    }],
    41: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = require("util"),
            widget = require("../core/widget"),
            trace = module.exports = function(t) {
                this.defaultSize = {
                    width: 200,
                    height: 200
                }, widget.call(this, t), this.nodeSize = 8, this.val = {
                    path: []
                }, this.limit = 20, this.space = 0, this.init()
            };
        util.inherits(trace, widget), trace.prototype.init = function() {
            this.nodeSize = Math.min(this.GUI.h, this.GUI.w) / 10, this.nodeSize = Math.max(this.nodeSize, 10), this.draw()
        }, trace.prototype.draw = function() {
            with(this.erase(), this.context) {
                fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), fillStyle = this.colors.fill, globalAlpha = .7;
                for (var i = 0; i < this.val.path.length; i++) {
                    var drawingX = this.val.path[i].x * this.GUI.w,
                        drawingY = this.val.path[i].y * this.GUI.h;
                    beginPath(), fillStyle = this.colors.accent, arc(drawingX, drawingY, this.nodeSize, 0, 2 * Math.PI, !0), fill(), closePath()
                }
                globalAlpha = 1
            }
            this.drawLabel()
        }, trace.prototype.click = function() {
            this.val.path = [], this.space = 0, this.move(), this.draw()
        }, trace.prototype.move = function() {
            if (this.space++, this.space > 2 && this.val.path.length < this.limit) {
                this.space = 0;
                var t = math.clip(this.clickPos.x, 0, this.GUI.w) / this.GUI.w,
                    i = math.clip(this.clickPos.y, 0, this.GUI.h) / this.GUI.h;
                this.val.path.push({
                    x: t,
                    y: i
                })
            }
            this.draw()
        }, trace.prototype.release = function() {
            this.transmit(this.val)
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    42: [function(require, module, exports) {
        var drawing = require("../utils/drawing"),
            util = require("util"),
            widget = require("../core/widget"),
            typewriter = module.exports = function(t) {
                this.defaultSize = {
                    width: 300,
                    height: 100
                }, widget.call(this, t), this.letter = "", this.keywid = this.GUI.w / 14.5, this.keyhgt = this.GUI.h / 5, this.active = !0, this.val = {
                    key: "",
                    ascii: 0,
                    on: 0
                }, this.rows = [
                    [{
                        symbol: "`",
                        value: 192,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "1",
                        value: 49,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "2",
                        value: 50,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "3",
                        value: 51,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "4",
                        value: 52,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "5",
                        value: 53,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "6",
                        value: 54,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "7",
                        value: 55,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "8",
                        value: 56,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "9",
                        value: 57,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "0",
                        value: 48,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "-",
                        value: 189,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "=",
                        value: 187,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "delete",
                        value: 46,
                        width: 1.5,
                        on: !1
                    }],
                    [{
                        symbol: "tab",
                        value: 9,
                        width: 1.5,
                        on: !1
                    }, {
                        symbol: "q",
                        value: 81,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "w",
                        value: 87,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "e",
                        value: 69,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "r",
                        value: 82,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "t",
                        value: 84,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "y",
                        value: 89,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "u",
                        value: 85,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "i",
                        value: 73,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "o",
                        value: 79,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "p",
                        value: 80,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "[",
                        value: 219,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "]",
                        value: 221,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "\\",
                        value: 220,
                        width: 1,
                        on: !1
                    }],
                    [{
                        symbol: "caps",
                        value: 20,
                        width: 1.75,
                        on: !1
                    }, {
                        symbol: "a",
                        value: 65,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "s",
                        value: 83,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "d",
                        value: 68,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "f",
                        value: 70,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "g",
                        value: 71,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "h",
                        value: 72,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "j",
                        value: 74,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "k",
                        value: 75,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "l",
                        value: 76,
                        width: 1,
                        on: !1
                    }, {
                        symbol: ";",
                        value: 186,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "'",
                        value: 222,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "enter",
                        value: 13,
                        width: 1.75,
                        on: !1
                    }],
                    [{
                        symbol: "shift",
                        value: 16,
                        width: 2.25,
                        on: !1
                    }, {
                        symbol: "z",
                        value: 90,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "x",
                        value: 88,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "c",
                        value: 67,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "v",
                        value: 86,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "b",
                        value: 66,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "n",
                        value: 78,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "m",
                        value: 77,
                        width: 1,
                        on: !1
                    }, {
                        symbol: ",",
                        value: 188,
                        width: 1,
                        on: !1
                    }, {
                        symbol: ".",
                        value: 190,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "/",
                        value: 191,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "shift",
                        value: 16,
                        width: 2.25,
                        on: !1
                    }],
                    [{
                        symbol: "fn",
                        value: 10,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "ctrl",
                        value: 17,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "opt",
                        value: 10,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "cmd",
                        value: 10,
                        width: 1.25,
                        on: !1
                    }, {
                        symbol: "space",
                        value: 32,
                        width: 5,
                        on: !1
                    }, {
                        symbol: "cmd",
                        value: 10,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "opt",
                        value: 10,
                        width: 1,
                        on: !1
                    }, {
                        symbol: "left",
                        value: 37,
                        width: .81,
                        on: !1
                    }, {
                        symbol: "up",
                        value: 38,
                        width: .81,
                        on: !1
                    }, {
                        symbol: "down",
                        value: 40,
                        width: .81,
                        on: !1
                    }, {
                        symbol: "right",
                        value: 39,
                        width: .81,
                        on: !1
                    }]
                ], this.boundType = this.typekey.bind(this), this.boundUntype = this.untype.bind(this), window.addEventListener("keydown", this.boundType), window.addEventListener("keyup", this.boundUntype), this.init()
            };
        util.inherits(typewriter, widget), typewriter.prototype.init = function() {
            this.keywid = this.GUI.w / 14.5, this.keyhgt = this.GUI.h / 5, this.draw()
        }, typewriter.prototype.draw = function() {
            with(this.erase(), this.active ? this.context.globalAlpha = 1 : this.context.globalAlpha = .4, this.context) {
                strokeStyle = this.colors.borderhl, fillStyle = this.colors.accent, lineWidth = 1;
                for (var i = 0; i < this.rows.length; i++)
                    for (var currkeyL = 0, j = 0; j < this.rows[i].length; j++) this.val.key == this.rows[i][j].symbol && (this.val.on ? this.rows[i][j].on = !0 : this.rows[i][j].on = !1), drawing.makeRoundRect(this.context, currkeyL, i * this.keyhgt, this.keywid * this.rows[i][j].width, this.keyhgt, 4), this.rows[i][j].on ? (fillStyle = this.colors.accent, strokeStyle = this.colors.accent, fill(), stroke()) : (fillStyle = this.colors.fill, strokeStyle = this.colors.borderhl, fill(), stroke()), currkeyL += this.keywid * this.rows[i][j].width;
                this.val.on && (this.setFont(), fillStyle = this.colors.borderhl, font = this.GUI.h + "px " + this.font, fillText(this.val.key, this.GUI.w / 2, this.GUI.h / 2), globalAlpha = 1), this.active || (globalAlpha = .7, fillStyle = this.colors.borderhl, font = this.GUI.h / 2 + "px courier", textAlign = "center", textBaseline = "middle", fillText("inactive", this.GUI.w / 2, this.GUI.h / 2))
            }
            this.drawLabel()
        }, typewriter.prototype.click = function(t) {
            this.active = !this.active, this.draw()
        }, typewriter.prototype.typekey = function(t) {
            if (this.active) {
                for (var i = t.which, e = 0; e < this.rows.length; e++)
                    for (var s = 0; s < this.rows[e].length; s++)
                        if (i == this.rows[e][s].value) {
                            this.val.key = this.rows[e][s].symbol, this.val.on = 1, this.val.ascii = t.which, this.transmit(this.val);
                            break
                        }
                this.draw()
            }
        }, typewriter.prototype.untype = function(t) {
            if (this.active) {
                for (var i = t.which, e = 0; e < this.rows.length; e++)
                    for (var s = 0; s < this.rows[e].length; s++)
                        if (i == this.rows[e][s].value) {
                            this.val.key = this.rows[e][s].symbol, this.val.on = 0, this.val.ascii = t.which, this.transmit(this.val);
                            break
                        }
                this.draw()
            }
        }, typewriter.prototype.customDestroy = function() {
            window.removeEventListener("keydown", this.boundType), window.removeEventListener("keyup", this.boundUntype)
        }
    }, {
        "../core/widget": 3,
        "../utils/drawing": 5,
        util: 52
    }],
    43: [function(require, module, exports) {
        var math = require("../utils/math"),
            util = require("util"),
            widget = require("../core/widget"),
            vinyl = module.exports = function(t) {
                this.defaultSize = {
                    width: 100,
                    height: 100
                }, widget.call(this, t), this.circleSize, this.speed = .05, this.defaultspeed = .05, this.rotation = 0, this.hasMovedOnce = !1, this.lockResize = !0, this.val = {
                    speed: 0
                }, this.init(), nx.aniItems.push(this.spin.bind(this))
            };
        util.inherits(vinyl, widget), vinyl.prototype.init = function() {
            this.circleSize = Math.min(this.center.x, this.center.y) - this.lineWidth, this.draw()
        }, vinyl.prototype.draw = function() {
            with(this.erase(), this.context) strokeStyle = this.colors.border, fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), beginPath(), fillStyle = this.colors.black, arc(this.center.x, this.center.y, this.circleSize - 5, 0, 2 * Math.PI, !0), fill(), closePath(), beginPath(), fillStyle = this.colors.accent, arc(this.center.x, 1 * this.center.y, this.circleSize / 4, 0, 2 * Math.PI, !1), fill(), closePath(), beginPath(), globalAlpha = .5, fillStyle = this.colors.fill, arc(this.center.x, this.center.y, this.circleSize, this.rotation, this.rotation + .4, !1), lineTo(this.center.x, this.center.y), arc(this.center.x, this.center.y, this.circleSize, this.rotation + Math.PI, this.rotation + Math.PI + .4, !1), lineTo(this.center.x, this.center.y), fill(), globalAlpha = 1, closePath(), beginPath(), fillStyle = this.colors.white, arc(this.center.x, 1 * this.center.y, this.circleSize / 16, 0, 2 * Math.PI, !1), fill(), closePath();
            this.drawLabel()
        }, vinyl.prototype.click = function(t) {
            this.hasMovedOnce = !1, this.lastRotation = this.rotation, this.grabAngle = this.rotation % (2 * Math.PI), this.grabPos = math.toPolar(this.clickPos.x - this.center.x, this.clickPos.y - this.center.y).angle
        }, vinyl.prototype.move = function() {
            this.hasMovedOnce || (this.hasMovedOnce = !0, this.grabAngle = this.rotation % (2 * Math.PI), this.grabPos = math.toPolar(this.clickPos.x - this.center.x, this.clickPos.y - this.center.y).angle), this.rotation = math.toPolar(this.clickPos.x - this.center.x, this.clickPos.y - this.center.y).angle + this.grabAngle - this.grabPos
        }, vinyl.prototype.release = function() {
            this.speed = (this.rotation - this.lastRotation + (this.lastRotation - this.lastRotation2)) / 2
        }, vinyl.prototype.spin = function() {
            this.clicked ? this.speed /= 1.1 : this.speed = .9 * this.speed + .1 * this.defaultspeed, this.val.speed = 20 * (this.rotation - this.lastRotation), this.lastRotation2 = this.lastRotation, this.lastRotation = this.rotation, this.rotation += this.speed, this.draw(), this.transmit(this.val)
        }, vinyl.prototype.customDestroy = function() {
            nx.removeAni(this.spin.bind(this))
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    44: [function(require, module, exports) {
        var util = require("util"),
            widget = require("../core/widget"),
            math = require("../utils/math"),
            waveform = module.exports = function(t) {
                this.defaultSize = {
                    width: 400,
                    height: 125
                }, widget.call(this, t), this.val = {
                    start: 0,
                    stop: 0,
                    size: 0,
                    starttime: 0,
                    stoptime: 0,
                    looptime: 0
                }, this.handle, this.relhandle, this.cap, this.firsttouch = "start", this.buffer = [], nx.isMobile ? this.definition = 3 : this.definition = 1, this.pieces = !1, this.channels = 1, this.rawbuffer = [], this.times = [{
                    dur: 10,
                    format: 1
                }, {
                    dur: 50,
                    format: 1
                }, {
                    dur: 100,
                    format: 1
                }, {
                    dur: 200,
                    format: 1
                }, {
                    dur: 500,
                    format: 1
                }, {
                    dur: 1e3,
                    format: 1
                }, {
                    dur: 2e3,
                    format: 1
                }, {
                    dur: 5e3,
                    format: 1
                }, {
                    dur: 1e4,
                    format: 3
                }, {
                    dur: 15e3,
                    format: 3
                }, {
                    dur: 6e4,
                    format: 3
                }, {
                    dur: 12e4,
                    format: 3
                }, {
                    dur: 3e5,
                    format: 3
                }, {
                    dur: 6e5,
                    format: 3
                }], this.timescale = !1, this.mode = "area", this.touchdown = new Object, this.init()
            };
        util.inherits(waveform, widget), waveform.prototype.init = function() {
            this.pieces = ~~(this.GUI.w / this.definition), this.draw()
        }, waveform.prototype.setBuffer = function(t) {
            for (this.channels = t.numberOfChannels, this.duration = t.duration, this.sampleRate = t.sampleRate, this.waveHeight = this.GUI.h / this.channels, this.durationMS = 1e3 * this.duration, this.timescale = 0; ~~(this.durationMS / this.times[this.timescale].dur) > 7 && this.timescale < this.times.length;) this.timescale++;
            this.timescale = this.times[this.timescale], this.rawbuffer = [], this.buffer = [];
            for (var i = 0; i < this.channels; i++) {
                this.rawbuffer.push(t.getChannelData(0)), this.buffer.push([]);
                for (var e = ~~(this.rawbuffer[0].length / (5 * this.sampleRate)) + 1, s = ~~(this.rawbuffer[i].length / this.pieces), h = 0, o = 0, n = 0, r = 0; r < this.rawbuffer[i].length; r += e) this.rawbuffer[i][r] > 0 ? h = Math.max(h, this.rawbuffer[i][r]) : o = Math.min(o, this.rawbuffer[i][r]), r > n * s && (this.buffer[i].push([h, o]), n++, o = 0, h = 0)
            }
            this.val.start && this.val.stop, this.val.starttime = Math.round(this.val.start * this.durationMS), this.val.stoptime = Math.round(this.val.stop * this.durationMS), this.val.looptime = Math.round(this.val.size * this.durationMS), this.draw()
        }, waveform.prototype.select = function(t, i) {
            this.val.start = math.clip(t / this.durationMS, 0, 1), this.val.stop = math.clip(i / this.durationMS, 0, 1), this.val.size = this.val.stop - this.val.start, this.val.starttime = t, this.val.stoptime = i, this.val.looptime = t - i, this.transmit(this.val), this.draw()
        }, waveform.prototype.draw = function() {
            with(this.context) {
                fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h);
                for (var i = 0; i < this.buffer.length; i++) {
                    fillStyle = this.colors.black, this.waveTop = i * this.waveHeight, this.waveCenter = this.waveTop + this.waveHeight / 2;
                    for (var j = 0; j < this.buffer[i].length; j++) {
                        var ht1 = this.waveCenter - this.buffer[i][j][0] * this.waveHeight,
                            ht2 = this.waveCenter + Math.abs(this.buffer[i][j][1] * this.waveHeight);
                        ht2 -= ht1, fillRect(j * this.definition, ht1, this.definition, ht2)
                    }
                    this.buffer[i]
                }
                if (globalAlpha = .3, fillStyle = this.colors.border, fillRect(0, 0, this.GUI.w, 16), globalAlpha = 1, textBaseline = "middle", textAlign = "left", fontSize = "8px", this.timescale)
                    for (var i = 1; i < this.durationMS / this.timescale.dur; i++) {
                        var x = i * this.timescale.dur / this.durationMS;
                        x *= this.GUI.w, fillStyle = this.colors.border, fillRect(x, 0, 1, this.GUI.h), fillStyle = this.colors.black, globalAlpha = .6, fillText(this.msToTime(i * this.timescale.dur, this.timescale.format), x + 5, 8), globalAlpha = 1
                    }
                var x1 = this.val.start * this.GUI.w,
                    y1 = 0,
                    x2 = this.val.stop * this.GUI.w,
                    y2 = this.GUI.h;
                if (fillStyle = this.colors.accent, strokeStyle = this.colors.accent, lineWidth = 2, globalAlpha = .3, fillRect(x1, y1, x2 - x1, y2 - y1), globalAlpha = .7, strokeRect(x1, y1 - 2, x2 - x1, y2 - y1 + 4), this.durationMS && this.val.looptime) {
                    this.val.size = this.val.stop - this.val.start, textAlign = "center";
                    var dur = this.val.looptime;
                    dur > 1e3 ? (dur /= 1e3, math.prune(dur, 2), dur += " s") : (math.prune(dur, 0), dur += " ms"), fillText(dur, x1 + (x2 - x1) / 2, this.GUI.h / 2)
                }
                globalAlpha = 1
            }
        }, waveform.prototype.msToTime = function(t, i) {
            var i = i ? i : 2,
                e = ~~(t / 1e3),
                s = e % 60;
            e = (e - s) / 60;
            var h = e % 60,
                o = t % 1e3;
            return s = 10 > s && h ? s + "0" : s, 1 == i ? s + "." + o : 2 == i ? h + ":" + s + "." + o : 3 == i ? h + ":" + s : void 0
        }, waveform.prototype.click = function() {
            "edge" == this.mode ? Math.abs(this.clickPos.x - this.val.start * this.GUI.w) < Math.abs(this.clickPos.x - this.val.stop * this.GUI.w) ? this.firsttouch = "start" : this.firsttouch = "stop" : "area" == this.mode && (this.touchdown = {
                x: this.clickPos.x,
                y: this.clickPos.y
            }, this.startval = new Object, this.startval.size = this.val.stop - this.val.start, this.startval.loc = this.val.start + this.startval.size / 2), this.move()
        }, waveform.prototype.move = function() {
            if ("edge" == this.mode) "start" == this.firsttouch ? (this.val.start = this.clickPos.x / this.GUI.w, this.clickPos.touches.length > 1 && (this.val.stop = this.clickPos.touches[1].x / this.GUI.w)) : (this.val.stop = this.clickPos.x / this.GUI.w, this.clickPos.touches.length > 1 && (this.val.start = this.clickPos.touches[1].x / this.GUI.w)), this.val.stop < this.val.start && (this.tempstart = this.val.start, this.val.start = this.val.stop, this.val.stop = this.tempstart, "start" == this.firsttouch ? this.firsttouch = "stop" : this.firsttouch = "start");
            else if ("area" == this.mode) {
                var t = this.clickPos.x / this.GUI.w,
                    i = (this.touchdown.y - this.clickPos.y) / this.GUI.h;
                i /= 4;
                var e = this.startval.size + i;
                e = math.clip(e, .001, 1), this.val = {
                    start: t - e / 2,
                    stop: t + e / 2
                }
            }
            this.val.start = math.clip(this.val.start, 0, 1), this.val.stop = math.clip(this.val.stop, 0, 1), this.val.size = math.clip(Math.abs(this.val.stop - this.val.start), 0, 1), this.durationMS && (this.val.starttime = Math.round(this.val.start * this.durationMS), this.val.stoptime = Math.round(this.val.stop * this.durationMS), this.val.looptime = Math.round(this.val.size * this.durationMS)), this.transmit(this.val), this.draw()
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    45: [function(require, module, exports) {
        var util = require("util"),
            widget = require("../core/widget"),
            math = require("../utils/math"),
            wavegrain = module.exports = function(t) {
                this.defaultSize = {
                    width: 400,
                    height: 125
                }, widget.call(this, t), this.val = {
                    starttime: 0,
                    stoptime: 0,
                    looptime: 50,
                    start: 0,
                    stop: 0,
                    size: 0,
                    level: 0,
                    state: "off"
                }, this.handle, this.relhandle, this.cap, this.firsttouch = "start", this.buffer = [], nx.isMobile ? this.definition = 1 : this.definition = 1, this.pieces = !1, this.channels = 1, this.rawbuffer = [], this.times = [{
                    dur: 10,
                    format: 1
                }, {
                    dur: 50,
                    format: 1
                }, {
                    dur: 100,
                    format: 1
                }, {
                    dur: 200,
                    format: 1
                }, {
                    dur: 500,
                    format: 1
                }, {
                    dur: 1e3,
                    format: 1
                }, {
                    dur: 2e3,
                    format: 1
                }, {
                    dur: 5e3,
                    format: 1
                }, {
                    dur: 1e4,
                    format: 3
                }, {
                    dur: 15e3,
                    format: 3
                }, {
                    dur: 6e4,
                    format: 3
                }, {
                    dur: 12e4,
                    format: 3
                }, {
                    dur: 3e5,
                    format: 3
                }, {
                    dur: 6e5,
                    format: 3
                }], this.timescale = !1, this.mode = "area", this.touchdown = new Object, this.init()
            };
        util.inherits(wavegrain, widget), wavegrain.prototype.init = function() {
            this.pieces = ~~(this.GUI.w / this.definition), this.draw()
        }, wavegrain.prototype.setBuffer = function(t) {
            for (this.channels = t.numberOfChannels, this.duration = t.duration, this.sampleRate = t.sampleRate, this.waveHeight = this.GUI.h / this.channels, this.durationMS = 1e3 * this.duration, this.timescale = 0; ~~(this.durationMS / this.times[this.timescale].dur) > 7 && this.timescale < this.times.length;) this.timescale++;
            this.timescale = this.times[this.timescale], this.rawbuffer = [], this.buffer = [];
            for (var i = 0; i < this.channels; i++) {
                this.rawbuffer.push(t.getChannelData(0)), this.buffer.push([]);
                for (var e = ~~(this.rawbuffer[0].length / (5 * this.sampleRate)) + 1, s = ~~(this.rawbuffer[i].length / this.pieces), h = 0, o = 0, n = 0, r = 0; r < this.rawbuffer[i].length; r += e) this.rawbuffer[i][r] > 0 ? h = Math.max(h, this.rawbuffer[i][r]) : o = Math.min(o, this.rawbuffer[i][r]), r > n * s && (this.buffer[i].push([h, o]), n++, o = 0, h = 0)
            }
            this.val.start && this.val.stop, this.val.starttime = Math.round(this.val.start * this.durationMS), this.val.stoptime = Math.round(this.val.stop * this.durationMS), this.draw()
        }, wavegrain.prototype.select = function(t, i) {
            this.val.start = math.clip(t / this.durationMS, 0, 1), this.val.stop = math.clip(i / this.durationMS, 0, 1), this.val.size = this.val.stop - this.val.start, this.val.starttime = t, this.val.stoptime = i, this.val.looptime = t - i, this.transmit(this.val), this.draw()
        }, wavegrain.prototype.draw = function() {
            with(this.context) {
                fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h);
                for (var i = 0; i < this.buffer.length; i++) {
                    fillStyle = this.colors.black, this.waveTop = i * this.waveHeight, this.waveCenter = this.waveTop + this.waveHeight / 2;
                    for (var j = 0; j < this.buffer[i].length; j++) {
                        var ht1 = this.waveCenter - this.buffer[i][j][0] * this.waveHeight,
                            ht2 = this.waveCenter + Math.abs(this.buffer[i][j][1] * this.waveHeight);
                        ht2 -= ht1, fillRect(j * this.definition, ht1, this.definition, ht2)
                    }
                    this.buffer[i]
                }
                if (globalAlpha = .3, fillStyle = this.colors.border, fillRect(0, 0, this.GUI.w, 16), globalAlpha = 1, textBaseline = "middle", textAlign = "left", fontSize = "8px", this.timescale)
                    for (var i = 1; i < this.durationMS / this.timescale.dur; i++) {
                        var x = i * this.timescale.dur / this.durationMS;
                        x *= this.GUI.w, fillStyle = this.colors.border, fillRect(x, 0, 1, this.GUI.h), fillStyle = this.colors.black, globalAlpha = .6, fillText(this.msToTime(i * this.timescale.dur, this.timescale.format), x + 5, 8), globalAlpha = 1
                    }
                if ("on" == this.val.state) {
                    var x1 = this.val.start * this.GUI.w,
                        y1 = this.val.level * this.GUI.h;
                    this.val.stop * this.GUI.w, this.GUI.h;
                    fillStyle = this.colors.accent, strokeStyle = this.colors.accent, lineWidth = 2, globalAlpha = .3, beginPath(), arc(x1, y1, 30, 0, 2 * Math.PI, !1), fill(), globalAlpha = .7, stroke(), globalAlpha = 1
                }
            }
        }, wavegrain.prototype.msToTime = function(t, i) {
            var i = i ? i : 2,
                e = ~~(t / 1e3),
                s = e % 60;
            e = (e - s) / 60;
            var h = e % 60,
                o = t % 1e3;
            return s = 10 > s && h ? s + "0" : s, 1 == i ? s + "." + o : 2 == i ? h + ":" + s + "." + o : 3 == i ? h + ":" + s : void 0
        }, wavegrain.prototype.click = function() {
            this.durationMS && (this.val.state = "on", this.move())
        }, wavegrain.prototype.move = function() {
            this.clickPos.x < 0 && (this.clickPos.x = 0), this.clickPos.x > this.GUI.w && (this.clickPos.x = this.GUI.w), this.clickPos.y < 0 && (this.clickPos.y = 0), this.clickPos.y > this.GUI.h && (this.clickPos.y = this.GUI.h), this.val.state = "on", this.durationMS && (this.val.start = this.clickPos.x / this.GUI.w - this.val.looptime / this.durationMS / 2, this.val.size = this.val.looptime / this.durationMS, this.val.stop = this.val.start + this.val.size, this.val.starttime = Math.round(this.val.start * this.durationMS), this.val.looptime = Math.round(this.val.size * this.durationMS), this.val.stoptime = this.val.starttime + this.val.looptime, this.val.level = this.clickPos.y / this.GUI.h, this.transmit(this.val), this.draw())
        }, wavegrain.prototype.release = function() {
            this.val.state = "off", this.transmit(this.val), this.draw()
        }, wavegrain.prototype.tick = function() {
            this.val.state = "on", this.transmit(this.val)
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    46: [function(require, module, exports) {
        var util = (require("../utils/math"), require("util")),
            widget = require("../core/widget"),
            windows = module.exports = function(t) {
                this.defaultSize = {
                    width: 200,
                    height: 200
                }, widget.call(this, t), this.val = {
                    items: [],
                    add: !1,
                    remove: !1,
                    change: !1
                }, this.size = .25, this.meta = !1, this.resizing = !1, this.init(), document.addEventListener("keydown", function(t) {
                    t.shiftKey && !this.meta && (this.meta = !0, this.draw())
                }.bind(this)), document.addEventListener("keyup", function(t) {
                    !t.shiftKey && this.meta && (this.meta = !1, this.draw())
                }.bind(this))
            };
        util.inherits(windows, widget), windows.prototype.init = function() {
            this.draw()
        }, windows.prototype.add = function(t, i, e, s) {
            this.val.items.push({
                x: t,
                y: i,
                w: e,
                h: s
            }), this.draw()
        }, windows.prototype.setWindow = function(t, i) {
            this.val.items[t] = i, this.draw()
        }, windows.prototype.remove = function(t) {
            this.val.items.splice(t, 1), this.val.add = !1, this.val.remove = t, this.val.change = !1, this.transmit(this.val), this.draw()
        }, windows.prototype.draw = function() {
            with(this.context) {
                this.meta ? fillStyle = this.colors.border : fillStyle = this.colors.fill, fillRect(0, 0, this.GUI.w, this.GUI.h), globalAlpha = .8;
                for (var i = 0; i < this.val.items.length; i++) {
                    fillStyle = this.colors.accent;
                    var x = this.val.items[i].x * this.GUI.w,
                        y = this.val.items[i].y * this.GUI.h,
                        w = this.val.items[i].w * this.GUI.w,
                        h = this.val.items[i].h * this.GUI.h;
                    fillRect(x, y, w, h), strokeStyle = this.colors.fill, lineWidth = 1, strokeRect(x + w - 10, y + h - 10, 10, 10)
                }
                globalAlpha = 1
            }
            this.drawLabel()
        }, windows.prototype.click = function() {
            this.holds = !1;
            for (var t = this.clickPos.x / this.GUI.w, i = this.clickPos.y / this.GUI.h, e = 0; e < this.val.items.length; e++) nx.isInside({
                x: t,
                y: i
            }, this.val.items[e]) && (this.holds = e, this.clickPos.x > (this.val.items[e].x + this.val.items[e].w) * this.GUI.w - 10 && this.clickPos.x < (this.val.items[e].x + this.val.items[e].w) * this.GUI.w && this.clickPos.y > (this.val.items[e].y + this.val.items[e].h) * this.GUI.h - 10 && this.clickPos.y < (this.val.items[e].y + this.val.items[e].h) * this.GUI.h && (this.resizing = !0));
            if (this.holds === !1 && (this.val.items.push({
                    x: t,
                    y: i,
                    w: this.size,
                    h: this.size
                }), this.holds = this.val.items.length - 1, this.hasMoved = !0, this.val.add = this.val.items[this.holds], this.val.remove = !1, this.val.change = !1, this.transmit(this.val)), this.meta) {
                for (var e = 0; e < this.val.items.length; e++) this.val.items[e].tx = this.val.items[e].x, this.val.items[e].ty = this.val.items[e].y;
                this.tx = t, this.ty = i
            }
            this.draw()
        }, windows.prototype.move = function() {
            var t = this.clickPos.x / this.GUI.w,
                i = this.clickPos.y / this.GUI.h;
            if (this.resizing)
                if (this.meta)
                    for (var e = 0; e < this.val.items.length; e++) this.val.items[e].w = t - this.val.items[this.holds].x, this.val.items[e].h = i - this.val.items[this.holds].y, this.val.items[e] = this.restrict(this.val.items[e]);
                else this.val.items[this.holds].w = t - this.val.items[this.holds].x, this.val.items[this.holds].h = i - this.val.items[this.holds].y, this.val.items[this.holds] = this.restrict(this.val.items[this.holds]);
            else if (this.meta)
                for (var e = 0; e < this.val.items.length; e++) this.val.items[e].x = t - this.tx + this.val.items[e].tx, this.val.items[e].y = i - this.ty + this.val.items[e].ty, this.val.items[e] = this.restrict(this.val.items[e]);
            else this.val.items[this.holds].x = t, this.val.items[this.holds].y = i, this.val.items[this.holds] = this.restrict(this.val.items[this.holds]);
            this.val.change = !0, this.val.add = !1, this.val.remove = !1, this.transmit(this.val), this.draw()
        }, windows.prototype.release = function() {
            this.hasMoved || (this.meta ? (this.val.add = !1, this.val.remove = "all", this.val.change = !1, this.val.items = []) : (this.val.add = !1, this.val.remove = this.holds, this.val.change = !1, this.val.items.splice(this.holds, 1))), this.resizing = !1, this.transmit(this.val), this.draw()
        }, windows.prototype.restrict = function(t) {
            return t.x < 0 && (t.x = 0), t.y < 0 && (t.y = 0), t.x + t.w > 1 && (t.x = 1 - t.w), t.y + t.h > 1 && (t.y = 1 - t.h), t
        }
    }, {
        "../core/widget": 3,
        "../utils/math": 6,
        util: 52
    }],
    47: [function(t, i, e) {
        function s() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function h(t) {
            return "function" == typeof t
        }

        function o(t) {
            return "number" == typeof t
        }

        function n(t) {
            return "object" == typeof t && null !== t
        }

        function r(t) {
            return void 0 === t
        }
        i.exports = s, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._maxListeners = void 0, s.defaultMaxListeners = 10, s.prototype.setMaxListeners = function(t) {
            if (!o(t) || 0 > t || isNaN(t)) throw TypeError("n must be a positive number");
            return this._maxListeners = t, this
        }, s.prototype.emit = function(t) {
            var i, e, s, o, l, a;
            if (this._events || (this._events = {}), "error" === t && (!this._events.error || n(this._events.error) && !this._events.error.length)) {
                if (i = arguments[1], i instanceof Error) throw i;
                throw TypeError('Uncaught, unspecified "error" event.')
            }
            if (e = this._events[t], r(e)) return !1;
            if (h(e)) switch (arguments.length) {
                case 1:
                    e.call(this);
                    break;
                case 2:
                    e.call(this, arguments[1]);
                    break;
                case 3:
                    e.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    for (s = arguments.length, o = new Array(s - 1), l = 1; s > l; l++) o[l - 1] = arguments[l];
                    e.apply(this, o)
            } else if (n(e)) {
                for (s = arguments.length, o = new Array(s - 1), l = 1; s > l; l++) o[l - 1] = arguments[l];
                for (a = e.slice(), s = a.length, l = 0; s > l; l++) a[l].apply(this, o)
            }
            return !0
        }, s.prototype.addListener = function(t, i) {
            var e;
            if (!h(i)) throw TypeError("listener must be a function");
            if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, h(i.listener) ? i.listener : i), this._events[t] ? n(this._events[t]) ? this._events[t].push(i) : this._events[t] = [this._events[t], i] : this._events[t] = i, n(this._events[t]) && !this._events[t].warned) {
                var e;
                e = r(this._maxListeners) ? s.defaultMaxListeners : this._maxListeners, e && e > 0 && this._events[t].length > e && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace())
            }
            return this
        }, s.prototype.on = s.prototype.addListener, s.prototype.once = function(t, i) {
            function e() {
                this.removeListener(t, e), s || (s = !0, i.apply(this, arguments))
            }
            if (!h(i)) throw TypeError("listener must be a function");
            var s = !1;
            return e.listener = i, this.on(t, e), this
        }, s.prototype.removeListener = function(t, i) {
            var e, s, o, r;
            if (!h(i)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[t]) return this;
            if (e = this._events[t], o = e.length, s = -1, e === i || h(e.listener) && e.listener === i) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, i);
            else if (n(e)) {
                for (r = o; r-- > 0;)
                    if (e[r] === i || e[r].listener && e[r].listener === i) {
                        s = r;
                        break
                    }
                if (0 > s) return this;
                1 === e.length ? (e.length = 0, delete this._events[t]) : e.splice(s, 1), this._events.removeListener && this.emit("removeListener", t, i)
            }
            return this
        }, s.prototype.removeAllListeners = function(t) {
            var i, e;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
            if (0 === arguments.length) {
                for (i in this._events) "removeListener" !== i && this.removeAllListeners(i);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (e = this._events[t], h(e)) this.removeListener(t, e);
            else
                for (; e.length;) this.removeListener(t, e[e.length - 1]);
            return delete this._events[t], this
        }, s.prototype.listeners = function(t) {
            var i;
            return i = this._events && this._events[t] ? h(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
        }, s.listenerCount = function(t, i) {
            var e;
            return e = t._events && t._events[i] ? h(t._events[i]) ? 1 : t._events[i].length : 0
        }
    }, {}],
    48: [function(t, i, e) {
        var s, h = Object.prototype.hasOwnProperty,
            o = Object.prototype.toString,
            n = function(t) {
                return "function" == typeof Array.isArray ? Array.isArray(t) : "[object Array]" === o.call(t)
            },
            r = function(t) {
                "use strict";
                if (!t || "[object Object]" !== o.call(t)) return !1;
                var i = h.call(t, "constructor"),
                    e = t.constructor && t.constructor.prototype && h.call(t.constructor.prototype, "isPrototypeOf");
                if (t.constructor && !i && !e) return !1;
                var n;
                for (n in t);
                return n === s || h.call(t, n)
            };
        i.exports = function l() {
            "use strict";
            var t, i, e, h, o, a, c = arguments[0],
                u = 1,
                d = arguments.length,
                p = !1;
            for ("boolean" == typeof c ? (p = c, c = arguments[1] || {}, u = 2) : ("object" != typeof c && "function" != typeof c || null == c) && (c = {}); d > u; ++u)
                if (t = arguments[u], null != t)
                    for (i in t) e = c[i], h = t[i], c !== h && (p && h && (r(h) || (o = n(h))) ? (o ? (o = !1, a = e && n(e) ? e : []) : a = e && r(e) ? e : {}, c[i] = l(p, a, h)) : h !== s && (c[i] = h));
            return c
        }
    }, {}],
    49: [function(t, i, e) {
        function s() {}
        var h = i.exports = {};
        h.nextTick = function() {
            var t = "undefined" != typeof window && window.setImmediate,
                i = "undefined" != typeof window && window.postMessage && window.addEventListener;
            if (t) return function(t) {
                return window.setImmediate(t)
            };
            if (i) {
                var e = [];
                return window.addEventListener("message", function(t) {
                        var i = t.source;
                        if ((i === window || null === i) && "process-tick" === t.data && (t.stopPropagation(), e.length > 0)) {
                            var s = e.shift();
                            s()
                        }
                    }, !0),
                    function(t) {
                        e.push(t), window.postMessage("process-tick", "*")
                    }
            }
            return function(t) {
                setTimeout(t, 0)
            }
        }(), h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.on = s, h.addListener = s, h.once = s, h.off = s, h.removeListener = s, h.removeAllListeners = s, h.emit = s, h.binding = function(t) {
            throw new Error("process.binding is not supported")
        }, h.cwd = function() {
            return "/"
        }, h.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }
    }, {}],
    50: [function(t, i, e) {
        "function" == typeof Object.create ? i.exports = function(t, i) {
            t.super_ = i, t.prototype = Object.create(i.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : i.exports = function(t, i) {
            t.super_ = i;
            var e = function() {};
            e.prototype = i.prototype, t.prototype = new e, t.prototype.constructor = t
        }
    }, {}],
    51: [function(t, i, e) {
        i.exports = function(t) {
            return t && "object" == typeof t && "function" == typeof t.copy && "function" == typeof t.fill && "function" == typeof t.readUInt8
        }
    }, {}],
    52: [function(t, i, e) {
        (function(i, s) {
            function h(t, i) {
                var s = {
                    seen: [],
                    stylize: n
                };
                return arguments.length >= 3 && (s.depth = arguments[2]), arguments.length >= 4 && (s.colors = arguments[3]), v(i) ? s.showHidden = i : i && e._extend(s, i), b(s.showHidden) && (s.showHidden = !1), b(s.depth) && (s.depth = 2), b(s.colors) && (s.colors = !1), b(s.customInspect) && (s.customInspect = !0), s.colors && (s.stylize = o), l(s, t, s.depth)
            }

            function o(t, i) {
                var e = h.styles[i];
                return e ? "[" + h.colors[e][0] + "m" + t + "[" + h.colors[e][1] + "m" : t
            }

            function n(t, i) {
                return t
            }

            function r(t) {
                var i = {};
                return t.forEach(function(t, e) {
                    i[t] = !0
                }), i
            }

            function l(t, i, s) {
                if (t.customInspect && i && G(i.inspect) && i.inspect !== e.inspect && (!i.constructor || i.constructor.prototype !== i)) {
                    var h = i.inspect(s, t);
                    return y(h) || (h = l(t, h, s)), h
                }
                var o = a(t, i);
                if (o) return o;
                var n = Object.keys(i),
                    v = r(n);
                if (t.showHidden && (n = Object.getOwnPropertyNames(i)), S(i) && (n.indexOf("message") >= 0 || n.indexOf("description") >= 0)) return c(i);
                if (0 === n.length) {
                    if (G(i)) {
                        var m = i.name ? ": " + i.name : "";
                        return t.stylize("[Function" + m + "]", "special")
                    }
                    if (I(i)) return t.stylize(RegExp.prototype.toString.call(i), "regexp");
                    if (U(i)) return t.stylize(Date.prototype.toString.call(i), "date");
                    if (S(i)) return c(i)
                }
                var w = "",
                    g = !1,
                    x = ["{", "}"];
                if (f(i) && (g = !0, x = ["[", "]"]), G(i)) {
                    var b = i.name ? ": " + i.name : "";
                    w = " [Function" + b + "]"
                }
                if (I(i) && (w = " " + RegExp.prototype.toString.call(i)), U(i) && (w = " " + Date.prototype.toUTCString.call(i)), S(i) && (w = " " + c(i)), 0 === n.length && (!g || 0 == i.length)) return x[0] + w + x[1];
                if (0 > s) return I(i) ? t.stylize(RegExp.prototype.toString.call(i), "regexp") : t.stylize("[Object]", "special");
                t.seen.push(i);
                var k;
                return k = g ? u(t, i, s, v, n) : n.map(function(e) {
                    return d(t, i, s, v, e, g)
                }), t.seen.pop(), p(k, w, x)
            }

            function a(t, i) {
                if (b(i)) return t.stylize("undefined", "undefined");
                if (y(i)) {
                    var e = "'" + JSON.stringify(i).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return t.stylize(e, "string")
                }
                return g(i) ? t.stylize("" + i, "number") : v(i) ? t.stylize("" + i, "boolean") : m(i) ? t.stylize("null", "null") : void 0
            }

            function c(t) {
                return "[" + Error.prototype.toString.call(t) + "]"
            }

            function u(t, i, e, s, h) {
                for (var o = [], n = 0, r = i.length; r > n; ++n) A(i, String(n)) ? o.push(d(t, i, e, s, String(n), !0)) : o.push("");
                return h.forEach(function(h) {
                    h.match(/^\d+$/) || o.push(d(t, i, e, s, h, !0))
                }), o
            }

            function d(t, i, e, s, h, o) {
                var n, r, a;
                if (a = Object.getOwnPropertyDescriptor(i, h) || {
                        value: i[h]
                    }, a.get ? r = a.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : a.set && (r = t.stylize("[Setter]", "special")), A(s, h) || (n = "[" + h + "]"), r || (t.seen.indexOf(a.value) < 0 ? (r = m(e) ? l(t, a.value, null) : l(t, a.value, e - 1), r.indexOf("\n") > -1 && (r = o ? r.split("\n").map(function(t) {
                        return "  " + t
                    }).join("\n").substr(2) : "\n" + r.split("\n").map(function(t) {
                        return "   " + t
                    }).join("\n"))) : r = t.stylize("[Circular]", "special")), b(n)) {
                    if (o && h.match(/^\d+$/)) return r;
                    n = JSON.stringify("" + h), n.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (n = n.substr(1, n.length - 2), n = t.stylize(n, "name")) : (n = n.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), n = t.stylize(n, "string"))
                }
                return n + ": " + r
            }

            function p(t, i, e) {
                var s = 0,
                    h = t.reduce(function(t, i) {
                        return s++, i.indexOf("\n") >= 0 && s++, t + i.replace(/\u001b\[\d\d?m/g, "").length + 1
                    }, 0);
                return h > 60 ? e[0] + ("" === i ? "" : i + "\n ") + " " + t.join(",\n  ") + " " + e[1] : e[0] + i + " " + t.join(", ") + " " + e[1]
            }

            function f(t) {
                return Array.isArray(t)
            }

            function v(t) {
                return "boolean" == typeof t
            }

            function m(t) {
                return null === t
            }

            function w(t) {
                return null == t
            }

            function g(t) {
                return "number" == typeof t
            }

            function y(t) {
                return "string" == typeof t
            }

            function x(t) {
                return "symbol" == typeof t
            }

            function b(t) {
                return void 0 === t
            }

            function I(t) {
                return k(t) && "[object RegExp]" === z(t)
            }

            function k(t) {
                return "object" == typeof t && null !== t
            }

            function U(t) {
                return k(t) && "[object Date]" === z(t)
            }

            function S(t) {
                return k(t) && ("[object Error]" === z(t) || t instanceof Error)
            }

            function G(t) {
                return "function" == typeof t
            }

            function P(t) {
                return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || "undefined" == typeof t
            }

            function z(t) {
                return Object.prototype.toString.call(t)
            }

            function M(t) {
                return 10 > t ? "0" + t.toString(10) : t.toString(10)
            }

            function T() {
                var t = new Date,
                    i = [M(t.getHours()), M(t.getMinutes()), M(t.getSeconds())].join(":");
                return [t.getDate(), R[t.getMonth()], i].join(" ")
            }

            function A(t, i) {
                return Object.prototype.hasOwnProperty.call(t, i)
            }
            var q = /%[sdj%]/g;
            e.format = function(t) {
                if (!y(t)) {
                    for (var i = [], e = 0; e < arguments.length; e++) i.push(h(arguments[e]));
                    return i.join(" ")
                }
                for (var e = 1, s = arguments, o = s.length, n = String(t).replace(q, function(t) {
                        if ("%%" === t) return "%";
                        if (e >= o) return t;
                        switch (t) {
                            case "%s":
                                return String(s[e++]);
                            case "%d":
                                return Number(s[e++]);
                            case "%j":
                                try {
                                    return JSON.stringify(s[e++])
                                } catch (i) {
                                    return "[Circular]"
                                }
                            default:
                                return t
                        }
                    }), r = s[e]; o > e; r = s[++e]) n += m(r) || !k(r) ? " " + r : " " + h(r);
                return n
            }, e.deprecate = function(t, h) {
                function o() {
                    if (!n) {
                        if (i.throwDeprecation) throw new Error(h);
                        i.traceDeprecation ? console.trace(h) : console.error(h), n = !0
                    }
                    return t.apply(this, arguments)
                }
                if (b(s.process)) return function() {
                    return e.deprecate(t, h).apply(this, arguments)
                };
                if (i.noDeprecation === !0) return t;
                var n = !1;
                return o
            };
            var j, L = {};
            e.debuglog = function(t) {
                if (b(j) && (j = i.env.NODE_DEBUG || ""), t = t.toUpperCase(), !L[t])
                    if (new RegExp("\\b" + t + "\\b", "i").test(j)) {
                        var s = i.pid;
                        L[t] = function() {
                            var i = e.format.apply(e, arguments);
                            console.error("%s %d: %s", t, s, i)
                        }
                    } else L[t] = function() {};
                return L[t]
            }, e.inspect = h, h.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
            }, h.styles = {
                special: "cyan",
                number: "yellow",
                "boolean": "yellow",
                undefined: "grey",
                "null": "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            }, e.isArray = f, e.isBoolean = v, e.isNull = m, e.isNullOrUndefined = w, e.isNumber = g, e.isString = y, e.isSymbol = x, e.isUndefined = b, e.isRegExp = I, e.isObject = k, e.isDate = U, e.isError = S, e.isFunction = G, e.isPrimitive = P, e.isBuffer = t("./support/isBuffer");
            var R = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            e.log = function() {
                console.log("%s - %s", T(), e.format.apply(e, arguments))
            }, e.inherits = t("inherits"), e._extend = function(t, i) {
                if (!i || !k(i)) return t;
                for (var e = Object.keys(i), s = e.length; s--;) t[e[s]] = i[e[s]];
                return t
            }
        }).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./support/isBuffer": 51,
        _process: 49,
        inherits: 50
    }],
    53: [function(t, i, e) {
        ! function() {
            function t(t, i, e) {
                return t.call.apply(t.bind, arguments)
            }

            function e(t, i, e) {
                if (!t) throw Error();
                if (2 < arguments.length) {
                    var s = Array.prototype.slice.call(arguments, 2);
                    return function() {
                        var e = Array.prototype.slice.call(arguments);
                        return Array.prototype.unshift.apply(e, s), t.apply(i, e)
                    }
                }
                return function() {
                    return t.apply(i, arguments)
                }
            }

            function s(i, h, o) {
                return s = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? t : e, s.apply(null, arguments)
            }

            function h(t, i) {
                this.a = t, this.m = i || t, this.c = this.m.document
            }

            function o(t, i, e, s) {
                if (i = t.c.createElement(i), e)
                    for (var h in e) e.hasOwnProperty(h) && ("style" == h ? i.style.cssText = e[h] : i.setAttribute(h, e[h]));
                return s && i.appendChild(t.c.createTextNode(s)), i
            }

            function n(t, i, e) {
                t = t.c.getElementsByTagName(i)[0], t || (t = document.documentElement), t.insertBefore(e, t.lastChild)
            }

            function r(t) {
                t.parentNode && t.parentNode.removeChild(t)
            }

            function l(t, i, e) {
                i = i || [], e = e || [];
                for (var s = t.className.split(/\s+/), h = 0; h < i.length; h += 1) {
                    for (var o = !1, n = 0; n < s.length; n += 1)
                        if (i[h] === s[n]) {
                            o = !0;
                            break
                        }
                    o || s.push(i[h])
                }
                for (i = [], h = 0; h < s.length; h += 1) {
                    for (o = !1, n = 0; n < e.length; n += 1)
                        if (s[h] === e[n]) {
                            o = !0;
                            break
                        }
                    o || i.push(s[h])
                }
                t.className = i.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
            }

            function a(t, i) {
                for (var e = t.className.split(/\s+/), s = 0, h = e.length; h > s; s++)
                    if (e[s] == i) return !0;
                return !1
            }

            function c(t) {
                if ("string" == typeof t.f) return t.f;
                var i = t.m.location.protocol;
                return "about:" == i && (i = t.a.location.protocol), "https:" == i ? "https:" : "http:"
            }

            function u(t) {
                return t.m.location.hostname || t.a.location.hostname
            }

            function d(t, i, e) {
                function s() {
                    a && h && r && (a(l), a = null)
                }
                i = o(t, "link", {
                    rel: "stylesheet",
                    href: i,
                    media: "all"
                });
                var h = !1,
                    r = !0,
                    l = null,
                    a = e || null;
                ht ? (i.onload = function() {
                    h = !0, s()
                }, i.onerror = function() {
                    h = !0, l = Error("Stylesheet failed to load"), s()
                }) : setTimeout(function() {
                    h = !0, s()
                }, 0), n(t, "head", i)
            }

            function p(t, i, e, s) {
                var h = t.c.getElementsByTagName("head")[0];
                if (h) {
                    var n = o(t, "script", {
                            src: i
                        }),
                        r = !1;
                    return n.onload = n.onreadystatechange = function() {
                        r || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (r = !0, e && e(null), n.onload = n.onreadystatechange = null, "HEAD" == n.parentNode.tagName && h.removeChild(n))
                    }, h.appendChild(n), setTimeout(function() {
                        r || (r = !0, e && e(Error("Script load timeout")))
                    }, s || 5e3), n
                }
                return null
            }

            function f() {
                this.a = 0, this.c = null
            }

            function v(t) {
                return t.a++,
                    function() {
                        t.a--, w(t)
                    }
            }

            function m(t, i) {
                t.c = i, w(t)
            }

            function w(t) {
                0 == t.a && t.c && (t.c(), t.c = null)
            }

            function g(t) {
                this.a = t || "-"
            }

            function y(t, i) {
                this.c = t, this.f = 4, this.a = "n";
                var e = (i || "n4").match(/^([nio])([1-9])$/i);
                e && (this.a = e[1], this.f = parseInt(e[2], 10))
            }

            function x(t) {
                return k(t) + " " + (t.f + "00") + " 300px " + b(t.c)
            }

            function b(t) {
                var i = [];
                t = t.split(/,\s*/);
                for (var e = 0; e < t.length; e++) {
                    var s = t[e].replace(/['"]/g, ""); - 1 != s.indexOf(" ") || /^\d/.test(s) ? i.push("'" + s + "'") : i.push(s)
                }
                return i.join(",")
            }

            function I(t) {
                return t.a + t.f
            }

            function k(t) {
                var i = "normal";
                return "o" === t.a ? i = "oblique" : "i" === t.a && (i = "italic"), i
            }

            function U(t) {
                var i = 4,
                    e = "n",
                    s = null;
                return t && ((s = t.match(/(normal|oblique|italic)/i)) && s[1] && (e = s[1].substr(0, 1).toLowerCase()), (s = t.match(/([1-9]00|normal|bold)/i)) && s[1] && (/bold/i.test(s[1]) ? i = 7 : /[1-9]00/.test(s[1]) && (i = parseInt(s[1].substr(0, 1), 10)))), e + i
            }

            function S(t, i) {
                this.c = t, this.f = t.m.document.documentElement, this.h = i, this.a = new g("-"), this.j = !1 !== i.events, this.g = !1 !== i.classes
            }

            function G(t) {
                t.g && l(t.f, [t.a.c("wf", "loading")]), z(t, "loading")
            }

            function P(t) {
                if (t.g) {
                    var i = a(t.f, t.a.c("wf", "active")),
                        e = [],
                        s = [t.a.c("wf", "loading")];
                    i || e.push(t.a.c("wf", "inactive")), l(t.f, e, s)
                }
                z(t, "inactive")
            }

            function z(t, i, e) {
                t.j && t.h[i] && (e ? t.h[i](e.c, I(e)) : t.h[i]())
            }

            function M() {
                this.c = {}
            }

            function T(t, i, e) {
                var s, h = [];
                for (s in i)
                    if (i.hasOwnProperty(s)) {
                        var o = t.c[s];
                        o && h.push(o(i[s], e))
                    }
                return h
            }

            function A(t, i) {
                this.c = t, this.f = i, this.a = o(this.c, "span", {
                    "aria-hidden": "true"
                }, this.f)
            }

            function q(t) {
                n(t.c, "body", t.a)
            }

            function j(t) {
                return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + b(t.c) + ";" + ("font-style:" + k(t) + ";font-weight:" + (t.f + "00") + ";")
            }

            function L(t, i, e, s, h, o) {
                this.g = t, this.j = i, this.a = s, this.c = e, this.f = h || 3e3, this.h = o || void 0
            }

            function R(t, i, e, s, h, o, n) {
                this.v = t, this.B = i, this.c = e, this.a = s, this.s = n || "BESbswy", this.f = {}, this.w = h || 3e3, this.u = o || null, this.o = this.j = this.h = this.g = null, this.g = new A(this.c, this.s), this.h = new A(this.c, this.s), this.j = new A(this.c, this.s), this.o = new A(this.c, this.s), t = new y(this.a.c + ",serif", I(this.a)), t = j(t), this.g.a.style.cssText = t, t = new y(this.a.c + ",sans-serif", I(this.a)), t = j(t), this.h.a.style.cssText = t, t = new y("serif", I(this.a)), t = j(t), this.j.a.style.cssText = t, t = new y("sans-serif", I(this.a)), t = j(t), this.o.a.style.cssText = t, q(this.g), q(this.h), q(this.j), q(this.o)
            }

            function C() {
                if (null === nt) {
                    var t = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
                    nt = !!t && (536 > parseInt(t[1], 10) || 536 === parseInt(t[1], 10) && 11 >= parseInt(t[2], 10))
                }
                return nt
            }

            function O(t, i, e) {
                for (var s in ot)
                    if (ot.hasOwnProperty(s) && i === t.f[ot[s]] && e === t.f[ot[s]]) return !0;
                return !1
            }

            function B(t) {
                var i, e = t.g.a.offsetWidth,
                    s = t.h.a.offsetWidth;
                (i = e === t.f.serif && s === t.f["sans-serif"]) || (i = C() && O(t, e, s)), i ? st() - t.A >= t.w ? C() && O(t, e, s) && (null === t.u || t.u.hasOwnProperty(t.a.c)) ? N(t, t.v) : N(t, t.B) : E(t) : N(t, t.v)
            }

            function E(t) {
                setTimeout(s(function() {
                    B(this)
                }, t), 50)
            }

            function N(t, i) {
                setTimeout(s(function() {
                    r(this.g.a), r(this.h.a), r(this.j.a), r(this.o.a), i(this.a)
                }, t), 0)
            }

            function _(t, i, e) {
                this.c = t, this.a = i, this.f = 0, this.o = this.j = !1, this.s = e
            }

            function F(t) {
                0 == --t.f && t.j && (t.o ? (t = t.a, t.g && l(t.f, [t.a.c("wf", "active")], [t.a.c("wf", "loading"), t.a.c("wf", "inactive")]), z(t, "active")) : P(t.a))
            }

            function W(t) {
                this.j = t, this.a = new M, this.h = 0, this.f = this.g = !0
            }

            function D(t, i, e, h, o) {
                var n = 0 == --t.h;
                (t.f || t.g) && setTimeout(function() {
                    var t = o || null,
                        r = h || null || {};
                    if (0 === e.length && n) P(i.a);
                    else {
                        i.f += e.length, n && (i.j = n);
                        var a, c = [];
                        for (a = 0; a < e.length; a++) {
                            var u = e[a],
                                d = r[u.c],
                                p = i.a,
                                f = u;
                            if (p.g && l(p.f, [p.a.c("wf", f.c, I(f).toString(), "loading")]), z(p, "fontloading", f), p = null, null === rt)
                                if (window.FontFace) {
                                    var f = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),
                                        v = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                                    rt = f ? 42 < parseInt(f[1], 10) : v ? !1 : !0
                                } else rt = !1;
                            p = rt ? new L(s(i.g, i), s(i.h, i), i.c, u, i.s, d) : new R(s(i.g, i), s(i.h, i), i.c, u, i.s, t, d), c.push(p)
                        }
                        for (a = 0; a < c.length; a++) c[a].start()
                    }
                }, 0)
            }

            function H(t, i, e) {
                var s = [],
                    h = e.timeout;
                G(i);
                var s = T(t.a, e, t.c),
                    o = new _(t.c, i, h);
                for (t.h = s.length, i = 0, e = s.length; e > i; i++) s[i].load(function(i, e, s) {
                    D(t, o, i, e, s)
                })
            }

            function X(t, i) {
                this.c = t, this.a = i
            }

            function Y(t, i, e) {
                var s = c(t.c);
                return t = (t.a.api || "fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/, ""), s + "//" + t + "/" + i + ".js" + (e ? "?v=" + e : "")
            }

            function $(t, i) {
                this.c = t, this.a = i
            }

            function J(t, i, e) {
                t ? this.c = t : this.c = i + lt, this.a = [], this.f = [], this.g = e || ""
            }

            function V(t, i) {
                for (var e = i.length, s = 0; e > s; s++) {
                    var h = i[s].split(":");
                    3 == h.length && t.f.push(h.pop());
                    var o = "";
                    2 == h.length && "" != h[1] && (o = ":"), t.a.push(h.join(o))
                }
            }

            function K(t) {
                if (0 == t.a.length) throw Error("No fonts to load!");
                if (-1 != t.c.indexOf("kit=")) return t.c;
                for (var i = t.a.length, e = [], s = 0; i > s; s++) e.push(t.a[s].replace(/ /g, "+"));
                return i = t.c + "?family=" + e.join("%7C"), 0 < t.f.length && (i += "&subset=" + t.f.join(",")), 0 < t.g.length && (i += "&text=" + encodeURIComponent(t.g)), i
            }

            function Q(t) {
                this.f = t, this.a = [], this.c = {}
            }

            function Z(t) {
                for (var i = t.f.length, e = 0; i > e; e++) {
                    var s = t.f[e].split(":"),
                        h = s[0].replace(/\+/g, " "),
                        o = ["n4"];
                    if (2 <= s.length) {
                        var n, r = s[1];
                        if (n = [], r)
                            for (var r = r.split(","), l = r.length, a = 0; l > a; a++) {
                                var c;
                                if (c = r[a], c.match(/^[\w-]+$/)) {
                                    var u = dt.exec(c.toLowerCase());
                                    if (null == u) c = "";
                                    else {
                                        if (c = u[2], c = null == c || "" == c ? "n" : ut[c], u = u[1], null == u || "" == u) u = "4";
                                        else var d = ct[u],
                                            u = d ? d : isNaN(u) ? "4" : u.substr(0, 1);
                                        c = [c, u].join("")
                                    }
                                } else c = "";
                                c && n.push(c)
                            }
                        0 < n.length && (o = n), 3 == s.length && (s = s[2], n = [], s = s ? s.split(",") : n, 0 < s.length && (s = at[s[0]]) && (t.c[h] = s))
                    }
                    for (t.c[h] || (s = at[h]) && (t.c[h] = s), s = 0; s < o.length; s += 1) t.a.push(new y(h, o[s]))
                }
            }

            function tt(t, i) {
                this.c = t, this.a = i
            }

            function it(t, i) {
                this.c = t, this.a = i
            }

            function et(t, i) {
                this.c = t, this.f = i, this.a = []
            }
            var st = Date.now || function() {
                    return +new Date
                },
                ht = !!window.FontFace;
            g.prototype.c = function(t) {
                for (var i = [], e = 0; e < arguments.length; e++) i.push(arguments[e].replace(/[\W_]+/g, "").toLowerCase());
                return i.join(this.a)
            }, L.prototype.start = function() {
                var t = this.c.m.document,
                    i = this,
                    e = st(),
                    s = new Promise(function(s, h) {
                        function o() {
                            st() - e >= i.f ? h() : t.fonts.load(x(i.a), i.h).then(function(t) {
                                1 <= t.length ? s() : setTimeout(o, 25)
                            }, function() {
                                h()
                            })
                        }
                        o()
                    }),
                    h = new Promise(function(t, e) {
                        setTimeout(e, i.f)
                    });
                Promise.race([h, s]).then(function() {
                    i.g(i.a)
                }, function() {
                    i.j(i.a)
                })
            };
            var ot = {
                    D: "serif",
                    C: "sans-serif"
                },
                nt = null;
            R.prototype.start = function() {
                this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.o.a.offsetWidth, this.A = st(), B(this)
            };
            var rt = null;
            _.prototype.g = function(t) {
                var i = this.a;
                i.g && l(i.f, [i.a.c("wf", t.c, I(t).toString(), "active")], [i.a.c("wf", t.c, I(t).toString(), "loading"), i.a.c("wf", t.c, I(t).toString(), "inactive")]), z(i, "fontactive", t), this.o = !0, F(this)
            }, _.prototype.h = function(t) {
                var i = this.a;
                if (i.g) {
                    var e = a(i.f, i.a.c("wf", t.c, I(t).toString(), "active")),
                        s = [],
                        h = [i.a.c("wf", t.c, I(t).toString(), "loading")];
                    e || s.push(i.a.c("wf", t.c, I(t).toString(), "inactive")), l(i.f, s, h)
                }
                z(i, "fontinactive", t), F(this)
            }, W.prototype.load = function(t) {
                this.c = new h(this.j, t.context || this.j), this.g = !1 !== t.events, this.f = !1 !== t.classes, H(this, new S(this.c, t), t)
            }, X.prototype.load = function(t) {
                function i() {
                    if (o["__mti_fntLst" + s]) {
                        var e, h = o["__mti_fntLst" + s](),
                            n = [];
                        if (h)
                            for (var r = 0; r < h.length; r++) {
                                var l = h[r].fontfamily;
                                void 0 != h[r].fontStyle && void 0 != h[r].fontWeight ? (e = h[r].fontStyle + h[r].fontWeight, n.push(new y(l, e))) : n.push(new y(l))
                            }
                        t(n)
                    } else setTimeout(function() {
                        i()
                    }, 50)
                }
                var e = this,
                    s = e.a.projectId,
                    h = e.a.version;
                if (s) {
                    var o = e.c.m;
                    p(this.c, Y(e, s, h), function(h) {
                        h ? t([]) : (o["__MonotypeConfiguration__" + s] = function() {
                            return e.a
                        }, i())
                    }).id = "__MonotypeAPIScript__" + s
                } else t([])
            }, $.prototype.load = function(t) {
                var i, e, s = this.a.urls || [],
                    h = this.a.families || [],
                    o = this.a.testStrings || {},
                    n = new f;
                for (i = 0, e = s.length; e > i; i++) d(this.c, s[i], v(n));
                var r = [];
                for (i = 0, e = h.length; e > i; i++)
                    if (s = h[i].split(":"), s[1])
                        for (var l = s[1].split(","), a = 0; a < l.length; a += 1) r.push(new y(s[0], l[a]));
                    else r.push(new y(s[0]));
                m(n, function() {
                    t(r, o)
                })
            };
            var lt = "//fonts.googleapis.com/css",
                at = {
                    latin: "BESbswy",
                    "latin-ext": "çöüğş",
                    cyrillic: "йяЖ",
                    greek: "αβΣ",
                    khmer: "កខគ",
                    Hanuman: "កខគ"
                },
                ct = {
                    thin: "1",
                    extralight: "2",
                    "extra-light": "2",
                    ultralight: "2",
                    "ultra-light": "2",
                    light: "3",
                    regular: "4",
                    book: "4",
                    medium: "5",
                    "semi-bold": "6",
                    semibold: "6",
                    "demi-bold": "6",
                    demibold: "6",
                    bold: "7",
                    "extra-bold": "8",
                    extrabold: "8",
                    "ultra-bold": "8",
                    ultrabold: "8",
                    black: "9",
                    heavy: "9",
                    l: "3",
                    r: "4",
                    b: "7"
                },
                ut = {
                    i: "i",
                    italic: "i",
                    n: "n",
                    normal: "n"
                },
                dt = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/,
                pt = {
                    Arimo: !0,
                    Cousine: !0,
                    Tinos: !0
                };
            tt.prototype.load = function(t) {
                var i = new f,
                    e = this.c,
                    s = new J(this.a.api, c(e), this.a.text),
                    h = this.a.families;
                V(s, h);
                var o = new Q(h);
                Z(o), d(e, K(s), v(i)), m(i, function() {
                    t(o.a, o.c, pt)
                })
            }, it.prototype.load = function(t) {
                var i = this.a.id,
                    e = this.c.m;
                i ? p(this.c, (this.a.api || "https://use.typekit.net") + "/" + i + ".js", function(i) {
                    if (i) t([]);
                    else if (e.Typekit && e.Typekit.config && e.Typekit.config.fn) {
                        i = e.Typekit.config.fn;
                        for (var s = [], h = 0; h < i.length; h += 2)
                            for (var o = i[h], n = i[h + 1], r = 0; r < n.length; r++) s.push(new y(o, n[r]));
                        try {
                            e.Typekit.load({
                                events: !1,
                                classes: !1,
                                async: !0
                            })
                        } catch (l) {}
                        t(s)
                    }
                }, 2e3) : t([])
            }, et.prototype.load = function(t) {
                var i = this.f.id,
                    e = this.c.m,
                    s = this;
                i ? (e.__webfontfontdeckmodule__ || (e.__webfontfontdeckmodule__ = {}), e.__webfontfontdeckmodule__[i] = function(i, e) {
                    for (var h = 0, o = e.fonts.length; o > h; ++h) {
                        var n = e.fonts[h];
                        s.a.push(new y(n.name, U("font-weight:" + n.weight + ";font-style:" + n.style)))
                    }
                    t(s.a)
                }, p(this.c, c(this.c) + (this.f.api || "//f.fontdeck.com/s/css/js/") + u(this.c) + "/" + i + ".js", function(i) {
                    i && t([])
                })) : t([])
            };
            var ft = new W(window);
            ft.a.c.custom = function(t, i) {
                return new $(i, t)
            }, ft.a.c.fontdeck = function(t, i) {
                return new et(i, t)
            }, ft.a.c.monotype = function(t, i) {
                return new X(i, t)
            }, ft.a.c.typekit = function(t, i) {
                return new it(i, t)
            }, ft.a.c.google = function(t, i) {
                return new tt(i, t)
            };
            var vt = {
                load: s(ft.load, ft)
            };
            "function" == typeof define && define.amd ? define(function() {
                return vt
            }) : "undefined" != typeof i && i.exports ? i.exports = vt : (window.WebFont = vt, window.WebFontConfig && ft.load(window.WebFontConfig))
        }()
    }, {}]
}, {}, [1]);