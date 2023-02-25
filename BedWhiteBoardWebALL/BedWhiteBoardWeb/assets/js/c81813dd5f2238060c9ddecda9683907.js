function getRandomInt(t, e) {
    return Math.floor(Math.random() * (e - t + 1)) + t
}

function cutHex(t) {
    return "#" == t.charAt(0) ? t.substring(1, 7) : t
}

function getStyle(t, e) {
    var i = "";
    return document.defaultView && document.defaultView.getComputedStyle ? i = document.defaultView.getComputedStyle(t, "").getPropertyValue(e) : t.currentStyle && (e = e.replace(/\-(\w)/g, function (t, e) {
        return e.toUpperCase()
    }), i = t.currentStyle[e]), i
}

function onCreateElementNsReady(t) {
    void 0 != document.createElementNS ? t() : setTimeout(function () {
        onCreateElementNsReady(t)
    }, 100)
}

function toggle_loading(t, e) {
        t.closest(".widget").toggleClass("widget-loading"), 1 == e && ($icon = t.closest(".widget").find(".widget-control-refresh i"), $icon.attr("class", "icon-ok-sign"), setTimeout(function () {
            $icon.attr("class", "icon-refresh")
        }, 1e3))
    }! function (t, e, i) {
        ! function (t) {
            "function" == typeof define && define.amd ? define(["jquery"], t) : jQuery && !jQuery.fn.sparkline && t(jQuery)
        }(function (n) {
            "use strict";
            var a, r, s, o, l, h, c, u, d, f, p, g, m, v, b, y, x, w, _, C, k, S, D, T, F, M, A, I, E, L, R, P, H = {},
                N = 0;
            a = function () {
                return {
                    common: {
                        type: "line",
                        lineColor: "#00f",
                        fillColor: "#cdf",
                        defaultPixelsPerValue: 3,
                        width: "auto",
                        height: "auto",
                        composite: !1,
                        tagValuesAttribute: "values",
                        tagOptionsPrefix: "spark",
                        enableTagOptions: !1,
                        enableHighlight: !0,
                        highlightLighten: 1.4,
                        tooltipSkipNull: !0,
                        tooltipPrefix: "",
                        tooltipSuffix: "",
                        disableHiddenCheck: !1,
                        numberFormatter: !1,
                        numberDigitGroupCount: 3,
                        numberDigitGroupSep: ",",
                        numberDecimalMark: ".",
                        disableTooltips: !1,
                        disableInteraction: !1
                    },
                    line: {
                        spotColor: "#f80",
                        highlightSpotColor: "#5f5",
                        highlightLineColor: "#f22",
                        spotRadius: 1.5,
                        minSpotColor: "#f80",
                        maxSpotColor: "#f80",
                        lineWidth: 1,
                        normalRangeMin: i,
                        normalRangeMax: i,
                        normalRangeColor: "#ccc",
                        drawNormalOnTop: !1,
                        chartRangeMin: i,
                        chartRangeMax: i,
                        chartRangeMinX: i,
                        chartRangeMaxX: i,
                        tooltipFormat: new s('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')
                    },
                    bar: {
                        barColor: "#3366cc",
                        negBarColor: "#f44",
                        stackedBarColor: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
                        zeroColor: i,
                        nullColor: i,
                        zeroAxis: !0,
                        barWidth: 4,
                        barSpacing: 1,
                        chartRangeMax: i,
                        chartRangeMin: i,
                        chartRangeClip: !1,
                        colorMap: i,
                        tooltipFormat: new s('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
                    },
                    tristate: {
                        barWidth: 4,
                        barSpacing: 1,
                        posBarColor: "#6f6",
                        negBarColor: "#f44",
                        zeroBarColor: "#999",
                        colorMap: {},
                        tooltipFormat: new s('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),
                        tooltipValueLookups: {
                            map: {
                                "-1": "Loss",
                                0: "Draw",
                                1: "Win"
                            }
                        }
                    },
                    discrete: {
                        lineHeight: "auto",
                        thresholdColor: i,
                        thresholdValue: 0,
                        chartRangeMax: i,
                        chartRangeMin: i,
                        chartRangeClip: !1,
                        tooltipFormat: new s("{{prefix}}{{value}}{{suffix}}")
                    },
                    bullet: {
                        targetColor: "#f33",
                        targetWidth: 3,
                        performanceColor: "#33f",
                        rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"],
                        base: i,
                        tooltipFormat: new s("{{fieldkey:fields}} - {{value}}"),
                        tooltipValueLookups: {
                            fields: {
                                r: "Range",
                                p: "Performance",
                                t: "Target"
                            }
                        }
                    },
                    pie: {
                        offset: 0,
                        sliceColors: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
                        borderWidth: 0,
                        borderColor: "#000",
                        tooltipFormat: new s('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')
                    },
                    box: {
                        raw: !1,
                        boxLineColor: "#000",
                        boxFillColor: "#cdf",
                        whiskerColor: "#000",
                        outlierLineColor: "#333",
                        outlierFillColor: "#fff",
                        medianColor: "#f00",
                        showOutliers: !0,
                        outlierIQR: 1.5,
                        spotRadius: 1.5,
                        target: i,
                        targetColor: "#4a2",
                        chartRangeMax: i,
                        chartRangeMin: i,
                        tooltipFormat: new s("{{field:fields}}: {{value}}"),
                        tooltipFormatFieldlistKey: "field",
                        tooltipValueLookups: {
                            fields: {
                                lq: "Lower Quartile",
                                med: "Median",
                                uq: "Upper Quartile",
                                lo: "Left Outlier",
                                ro: "Right Outlier",
                                lw: "Left Whisker",
                                rw: "Right Whisker"
                            }
                        }
                    }
                }
            }, M = '.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}', r = function () {
                var t, e;
                return t = function () {
                    this.init.apply(this, arguments)
                }, arguments.length > 1 ? (arguments[0] ? (t.prototype = n.extend(new arguments[0], arguments[arguments.length - 1]), t._super = arguments[0].prototype) : t.prototype = arguments[arguments.length - 1], arguments.length > 2 && (e = Array.prototype.slice.call(arguments, 1, -1), e.unshift(t.prototype), n.extend.apply(n, e))) : t.prototype = arguments[0], t.prototype.cls = t, t
            }, n.SPFormatClass = s = r({
                fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
                precre: /(\w+)\.(\d+)/,
                init: function (t, e) {
                    this.format = t, this.fclass = e
                },
                render: function (t, e, n) {
                    var a, r, s, o, l, h = this,
                        c = t;
                    return this.format.replace(this.fre, function () {
                        var t;
                        return r = arguments[1], s = arguments[3], a = h.precre.exec(r), a ? (l = a[2], r = a[1]) : l = !1, o = c[r], o === i ? "" : s && e && e[s] ? (t = e[s], t.get ? e[s].get(o) || o : e[s][o] || o) : (d(o) && (o = n.get("numberFormatter") ? n.get("numberFormatter")(o) : v(o, l, n.get("numberDigitGroupCount"), n.get("numberDigitGroupSep"), n.get("numberDecimalMark"))), o)
                    })
                }
            }), n.spformat = function (t, e) {
                return new s(t, e)
            }, o = function (t, e, i) {
                return e > t ? e : t > i ? i : t
            }, l = function (t, i) {
                var n;
                return 2 === i ? (n = e.floor(t.length / 2), t.length % 2 ? t[n] : (t[n - 1] + t[n]) / 2) : t.length % 2 ? (n = (t.length * i + i) / 4, n % 1 ? (t[e.floor(n)] + t[e.floor(n) - 1]) / 2 : t[n - 1]) : (n = (t.length * i + 2) / 4, n % 1 ? (t[e.floor(n)] + t[e.floor(n) - 1]) / 2 : t[n - 1])
            }, h = function (t) {
                var e;
                switch (t) {
                case "undefined":
                    t = i;
                    break;
                case "null":
                    t = null;
                    break;
                case "true":
                    t = !0;
                    break;
                case "false":
                    t = !1;
                    break;
                default:
                    e = parseFloat(t), t == e && (t = e)
                }
                return t
            }, c = function (t) {
                var e, i = [];
                for (e = t.length; e--;) i[e] = h(t[e]);
                return i
            }, u = function (t, e) {
                var i, n, a = [];
                for (i = 0, n = t.length; n > i; i++) t[i] !== e && a.push(t[i]);
                return a
            }, d = function (t) {
                return !isNaN(parseFloat(t)) && isFinite(t)
            }, v = function (t, e, i, a, r) {
                var s, o;
                for (t = (e === !1 ? parseFloat(t).toString() : t.toFixed(e)).split(""), s = (s = n.inArray(".", t)) < 0 ? t.length : s, s < t.length && (t[s] = r), o = s - i; o > 0; o -= i) t.splice(o, 0, a);
                return t.join("")
            }, f = function (t, e, i) {
                var n;
                for (n = e.length; n--;)
                    if ((!i || null !== e[n]) && e[n] !== t) return !1;
                return !0
            }, p = function (t) {
                var e, i = 0;
                for (e = t.length; e--;) i += "number" == typeof t[e] ? t[e] : 0;
                return i
            }, m = function (t) {
                return n.isArray(t) ? t : [t]
            }, g = function (e) {
                var i;
                t.createStyleSheet ? t.createStyleSheet().cssText = e : (i = t.createElement("style"), i.type = "text/css", t.getElementsByTagName("head")[0].appendChild(i), i["string" == typeof t.body.style.WebkitAppearance ? "innerText" : "innerHTML"] = e)
            }, n.fn.simpledraw = function (e, a, r, s) {
                var o, l;
                if (r && (o = this.data("_jqs_vcanvas"))) return o;
                if (n.fn.sparkline.canvas === !1) return !1;
                if (n.fn.sparkline.canvas === i) {
                    var h = t.createElement("canvas");
                    if (h.getContext && h.getContext("2d")) n.fn.sparkline.canvas = function (t, e, i, n) {
                        return new L(t, e, i, n)
                    };
                    else {
                        if (!t.namespaces || t.namespaces.v) return n.fn.sparkline.canvas = !1, !1;
                        t.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML"), n.fn.sparkline.canvas = function (t, e, i) {
                            return new R(t, e, i)
                        }
                    }
                }
                return e === i && (e = n(this).innerWidth()), a === i && (a = n(this).innerHeight()), o = n.fn.sparkline.canvas(e, a, this, s), l = n(this).data("_jqs_mhandler"), l && l.registerCanvas(o), o
            }, n.fn.cleardraw = function () {
                var t = this.data("_jqs_vcanvas");
                t && t.reset()
            }, n.RangeMapClass = b = r({
                init: function (t) {
                    var e, i, n = [];
                    for (e in t) t.hasOwnProperty(e) && "string" == typeof e && e.indexOf(":") > -1 && (i = e.split(":"), i[0] = 0 === i[0].length ? -1 / 0 : parseFloat(i[0]), i[1] = 0 === i[1].length ? 1 / 0 : parseFloat(i[1]), i[2] = t[e], n.push(i));
                    this.map = t, this.rangelist = n || !1
                },
                get: function (t) {
                    var e, n, a, r = this.rangelist;
                    if ((a = this.map[t]) !== i) return a;
                    if (r)
                        for (e = r.length; e--;)
                            if (n = r[e], n[0] <= t && n[1] >= t) return n[2];
                    return i
                }
            }), n.range_map = function (t) {
                return new b(t)
            }, y = r({
                init: function (t, e) {
                    var i = n(t);
                    this.$el = i, this.options = e, this.currentPageX = 0, this.currentPageY = 0, this.el = t, this.splist = [], this.tooltip = null, this.over = !1, this.displayTooltips = !e.get("disableTooltips"), this.highlightEnabled = !e.get("disableHighlight")
                },
                registerSparkline: function (t) {
                    this.splist.push(t), this.over && this.updateDisplay()
                },
                registerCanvas: function (t) {
                    var e = n(t.canvas);
                    this.canvas = t, this.$canvas = e, e.mouseenter(n.proxy(this.mouseenter, this)), e.mouseleave(n.proxy(this.mouseleave, this)), e.click(n.proxy(this.mouseclick, this))
                },
                reset: function (t) {
                    this.splist = [], this.tooltip && t && (this.tooltip.remove(), this.tooltip = i)
                },
                mouseclick: function (t) {
                    var e = n.Event("sparklineClick");
                    e.originalEvent = t, e.sparklines = this.splist, this.$el.trigger(e)
                },
                mouseenter: function (e) {
                    n(t.body).unbind("mousemove.jqs"), n(t.body).bind("mousemove.jqs", n.proxy(this.mousemove, this)), this.over = !0, this.currentPageX = e.pageX, this.currentPageY = e.pageY, this.currentEl = e.target, !this.tooltip && this.displayTooltips && (this.tooltip = new x(this.options), this.tooltip.updatePosition(e.pageX, e.pageY)), this.updateDisplay()
                },
                mouseleave: function () {
                    n(t.body).unbind("mousemove.jqs");
                    var e, i, a = this.splist,
                        r = a.length,
                        s = !1;
                    for (this.over = !1, this.currentEl = null, this.tooltip && (this.tooltip.remove(), this.tooltip = null), i = 0; r > i; i++) e = a[i], e.clearRegionHighlight() && (s = !0);
                    s && this.canvas.render()
                },
                mousemove: function (t) {
                    this.currentPageX = t.pageX, this.currentPageY = t.pageY, this.currentEl = t.target, this.tooltip && this.tooltip.updatePosition(t.pageX, t.pageY), this.updateDisplay()
                },
                updateDisplay: function () {
                    var t, e, i, a, r, s = this.splist,
                        o = s.length,
                        l = !1,
                        h = this.$canvas.offset(),
                        c = this.currentPageX - h.left,
                        u = this.currentPageY - h.top;
                    if (this.over) {
                        for (i = 0; o > i; i++) e = s[i], a = e.setRegionHighlight(this.currentEl, c, u), a && (l = !0);
                        if (l) {
                            if (r = n.Event("sparklineRegionChange"), r.sparklines = this.splist, this.$el.trigger(r), this.tooltip) {
                                for (t = "", i = 0; o > i; i++) e = s[i], t += e.getCurrentRegionTooltip();
                                this.tooltip.setContent(t)
                            }
                            this.disableHighlight || this.canvas.render()
                        }
                        null === a && this.mouseleave()
                    }
                }
            }), x = r({
                sizeStyle: "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
                init: function (e) {
                    var i, a = e.get("tooltipClassname", "jqstooltip"),
                        r = this.sizeStyle;
                    this.container = e.get("tooltipContainer") || t.body, this.tooltipOffsetX = e.get("tooltipOffsetX", 10), this.tooltipOffsetY = e.get("tooltipOffsetY", 12), n("#jqssizetip").remove(), n("#jqstooltip").remove(), this.sizetip = n("<div/>", {
                        id: "jqssizetip",
                        style: r,
                        "class": a
                    }), this.tooltip = n("<div/>", {
                        id: "jqstooltip",
                        "class": a
                    }).appendTo(this.container), i = this.tooltip.offset(), this.offsetLeft = i.left, this.offsetTop = i.top, this.hidden = !0, n(window).unbind("resize.jqs scroll.jqs"), n(window).bind("resize.jqs scroll.jqs", n.proxy(this.updateWindowDims, this)), this.updateWindowDims()
                },
                updateWindowDims: function () {
                    this.scrollTop = n(window).scrollTop(), this.scrollLeft = n(window).scrollLeft(), this.scrollRight = this.scrollLeft + n(window).width(), this.updatePosition()
                },
                getSize: function (t) {
                    this.sizetip.html(t).appendTo(this.container), this.width = this.sizetip.width() + 1, this.height = this.sizetip.height(), this.sizetip.remove()
                },
                setContent: function (t) {
                    return t ? (this.getSize(t), this.tooltip.html(t).css({
                        width: this.width,
                        height: this.height,
                        visibility: "visible"
                    }), this.hidden && (this.hidden = !1, this.updatePosition()), void 0) : (this.tooltip.css("visibility", "hidden"), this.hidden = !0, void 0)
                },
                updatePosition: function (t, e) {
                    if (t === i) {
                        if (this.mousex === i) return;
                        t = this.mousex - this.offsetLeft, e = this.mousey - this.offsetTop
                    } else this.mousex = t -= this.offsetLeft, this.mousey = e -= this.offsetTop;
                    this.height && this.width && !this.hidden && (e -= this.height + this.tooltipOffsetY, t += this.tooltipOffsetX, e < this.scrollTop && (e = this.scrollTop), t < this.scrollLeft ? t = this.scrollLeft : t + this.width > this.scrollRight && (t = this.scrollRight - this.width), this.tooltip.css({
                        left: t,
                        top: e
                    }))
                },
                remove: function () {
                    this.tooltip.remove(), this.sizetip.remove(), this.sizetip = this.tooltip = i, n(window).unbind("resize.jqs scroll.jqs")
                }
            }), A = function () {
                g(M)
            }, n(A), P = [], n.fn.sparkline = function (e, a) {
                return this.each(function () {
                    var r, s, o = new n.fn.sparkline.options(this, a),
                        l = n(this);
                    if (r = function () {
                        var a, r, s, h, c, u, d;
                        return "html" === e || e === i ? (d = this.getAttribute(o.get("tagValuesAttribute")), (d === i || null === d) && (d = l.html()), a = d.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")) : a = e, r = "auto" === o.get("width") ? a.length * o.get("defaultPixelsPerValue") : o.get("width"), "auto" === o.get("height") ? o.get("composite") && n.data(this, "_jqs_vcanvas") || (h = t.createElement("span"), h.innerHTML = "a", l.html(h), s = n(h).innerHeight() || n(h).height(), n(h).remove(), h = null) : s = o.get("height"), o.get("disableInteraction") ? c = !1 : (c = n.data(this, "_jqs_mhandler"), c ? o.get("composite") || c.reset() : (c = new y(this, o), n.data(this, "_jqs_mhandler", c))), o.get("composite") && !n.data(this, "_jqs_vcanvas") ? (n.data(this, "_jqs_errnotify") || (alert("Attempted to attach a composite sparkline to an element with no existing sparkline"), n.data(this, "_jqs_errnotify", !0)), void 0) : (u = new(n.fn.sparkline[o.get("type")])(this, a, o, r, s), u.render(), c && c.registerSparkline(u), void 0)
                    }, n(this).html() && !o.get("disableHiddenCheck") && n(this).is(":hidden") || !n(this).parents("body").length) {
                        if (!o.get("composite") && n.data(this, "_jqs_pending"))
                            for (s = P.length; s; s--) P[s - 1][0] == this && P.splice(s - 1, 1);
                        P.push([this, r]), n.data(this, "_jqs_pending", !0)
                    } else r.call(this)
                })
            }, n.fn.sparkline.defaults = a(), n.sparkline_display_visible = function () {
                var t, e, i, a = [];
                for (e = 0, i = P.length; i > e; e++) t = P[e][0], n(t).is(":visible") && !n(t).parents().is(":hidden") ? (P[e][1].call(t), n.data(P[e][0], "_jqs_pending", !1), a.push(e)) : !n(t).closest("html").length && !n.data(t, "_jqs_pending") && (n.data(P[e][0], "_jqs_pending", !1), a.push(e));
                for (e = a.length; e; e--) P.splice(a[e - 1], 1)
            }, n.fn.sparkline.options = r({
                init: function (t, e) {
                    var i, a, r, s;
                    this.userOptions = e = e || {}, this.tag = t, this.tagValCache = {}, a = n.fn.sparkline.defaults, r = a.common, this.tagOptionsPrefix = e.enableTagOptions && (e.tagOptionsPrefix || r.tagOptionsPrefix), s = this.getTagSetting("type"), i = s === H ? a[e.type || r.type] : a[s], this.mergedOptions = n.extend({}, r, i, e)
                },
                getTagSetting: function (t) {
                    var e, n, a, r, s = this.tagOptionsPrefix;
                    if (s === !1 || s === i) return H;
                    if (this.tagValCache.hasOwnProperty(t)) e = this.tagValCache.key;
                    else {
                        if (e = this.tag.getAttribute(s + t), e === i || null === e) e = H;
                        else if ("[" === e.substr(0, 1))
                            for (e = e.substr(1, e.length - 2).split(","), n = e.length; n--;) e[n] = h(e[n].replace(/(^\s*)|(\s*$)/g, ""));
                        else if ("{" === e.substr(0, 1))
                            for (a = e.substr(1, e.length - 2).split(","), e = {}, n = a.length; n--;) r = a[n].split(":", 2), e[r[0].replace(/(^\s*)|(\s*$)/g, "")] = h(r[1].replace(/(^\s*)|(\s*$)/g, ""));
                        else e = h(e);
                        this.tagValCache.key = e
                    }
                    return e
                },
                get: function (t, e) {
                    var n, a = this.getTagSetting(t);
                    return a !== H ? a : (n = this.mergedOptions[t]) === i ? e : n
                }
            }), n.fn.sparkline._base = r({
                disabled: !1,
                init: function (t, e, a, r, s) {
                    this.el = t, this.$el = n(t), this.values = e, this.options = a, this.width = r, this.height = s, this.currentRegion = i
                },
                initTarget: function () {
                    var t = !this.options.get("disableInteraction");
                    (this.target = this.$el.simpledraw(this.width, this.height, this.options.get("composite"), t)) ? (this.canvasWidth = this.target.pixelWidth, this.canvasHeight = this.target.pixelHeight) : this.disabled = !0
                },
                render: function () {
                    return this.disabled ? (this.el.innerHTML = "", !1) : !0
                },
                getRegion: function () {},
                setRegionHighlight: function (t, e, n) {
                    var a, r = this.currentRegion,
                        s = !this.options.get("disableHighlight");
                    return e > this.canvasWidth || n > this.canvasHeight || 0 > e || 0 > n ? null : (a = this.getRegion(t, e, n), r !== a ? (r !== i && s && this.removeHighlight(), this.currentRegion = a, a !== i && s && this.renderHighlight(), !0) : !1)
                },
                clearRegionHighlight: function () {
                    return this.currentRegion !== i ? (this.removeHighlight(), this.currentRegion = i, !0) : !1
                },
                renderHighlight: function () {
                    this.changeHighlight(!0)
                },
                removeHighlight: function () {
                    this.changeHighlight(!1)
                },
                changeHighlight: function () {},
                getCurrentRegionTooltip: function () {
                    var t, e, a, r, o, l, h, c, u, d, f, p, g, m, v = this.options,
                        b = "",
                        y = [];
                    if (this.currentRegion === i) return "";
                    if (t = this.getCurrentRegionFields(), f = v.get("tooltipFormatter")) return f(this, v, t);
                    if (v.get("tooltipChartTitle") && (b += '<div class="jqs jqstitle">' + v.get("tooltipChartTitle") + "</div>\n"), e = this.options.get("tooltipFormat"), !e) return "";
                    if (n.isArray(e) || (e = [e]), n.isArray(t) || (t = [t]), h = this.options.get("tooltipFormatFieldlist"), c = this.options.get("tooltipFormatFieldlistKey"), h && c) {
                        for (u = [], l = t.length; l--;) d = t[l][c], -1 != (m = n.inArray(d, h)) && (u[m] = t[l]);
                        t = u
                    }
                    for (a = e.length, g = t.length, l = 0; a > l; l++)
                        for (p = e[l], "string" == typeof p && (p = new s(p)), r = p.fclass || "jqsfield", m = 0; g > m; m++) t[m].isNull && v.get("tooltipSkipNull") || (n.extend(t[m], {
                            prefix: v.get("tooltipPrefix"),
                            suffix: v.get("tooltipSuffix")
                        }), o = p.render(t[m], v.get("tooltipValueLookups"), v), y.push('<div class="' + r + '">' + o + "</div>"));
                    return y.length ? b + y.join("\n") : ""
                },
                getCurrentRegionFields: function () {},
                calcHighlightColor: function (t, i) {
                    var n, a, r, s, l = i.get("highlightColor"),
                        h = i.get("highlightLighten");
                    if (l) return l;
                    if (h && (n = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(t) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(t))) {
                        for (r = [], a = 4 === t.length ? 16 : 1, s = 0; 3 > s; s++) r[s] = o(e.round(parseInt(n[s + 1], 16) * a * h), 0, 255);
                        return "rgb(" + r.join(",") + ")"
                    }
                    return t
                }
            }), w = {
                changeHighlight: function (t) {
                    var e, i = this.currentRegion,
                        a = this.target,
                        r = this.regionShapes[i];
                    r && (e = this.renderRegion(i, t), n.isArray(e) || n.isArray(r) ? (a.replaceWithShapes(r, e), this.regionShapes[i] = n.map(e, function (t) {
                        return t.id
                    })) : (a.replaceWithShape(r, e), this.regionShapes[i] = e.id))
                },
                render: function () {
                    var t, e, i, a, r = this.values,
                        s = this.target,
                        o = this.regionShapes;
                    if (this.cls._super.render.call(this)) {
                        for (i = r.length; i--;)
                            if (t = this.renderRegion(i))
                                if (n.isArray(t)) {
                                    for (e = [], a = t.length; a--;) t[a].append(), e.push(t[a].id);
                                    o[i] = e
                                } else t.append(), o[i] = t.id;
                        else o[i] = null;
                        s.render()
                    }
                }
            }, n.fn.sparkline.line = _ = r(n.fn.sparkline._base, {
                type: "line",
                init: function (t, e, i, n, a) {
                    _._super.init.call(this, t, e, i, n, a), this.vertices = [], this.regionMap = [], this.xvalues = [], this.yvalues = [], this.yminmax = [], this.hightlightSpotId = null, this.lastShapeId = null, this.initTarget()
                },
                getRegion: function (t, e) {
                    var n, a = this.regionMap;
                    for (n = a.length; n--;)
                        if (null !== a[n] && e >= a[n][0] && e <= a[n][1]) return a[n][2];
                    return i
                },
                getCurrentRegionFields: function () {
                    var t = this.currentRegion;
                    return {
                        isNull: null === this.yvalues[t],
                        x: this.xvalues[t],
                        y: this.yvalues[t],
                        color: this.options.get("lineColor"),
                        fillColor: this.options.get("fillColor"),
                        offset: t
                    }
                },
                renderHighlight: function () {
                    var t, e, n = this.currentRegion,
                        a = this.target,
                        r = this.vertices[n],
                        s = this.options,
                        o = s.get("spotRadius"),
                        l = s.get("highlightSpotColor"),
                        h = s.get("highlightLineColor");
                    r && (o && l && (t = a.drawCircle(r[0], r[1], o, i, l), this.highlightSpotId = t.id, a.insertAfterShape(this.lastShapeId, t)), h && (e = a.drawLine(r[0], this.canvasTop, r[0], this.canvasTop + this.canvasHeight, h), this.highlightLineId = e.id, a.insertAfterShape(this.lastShapeId, e)))
                },
                removeHighlight: function () {
                    var t = this.target;
                    this.highlightSpotId && (t.removeShapeId(this.highlightSpotId), this.highlightSpotId = null), this.highlightLineId && (t.removeShapeId(this.highlightLineId), this.highlightLineId = null)
                },
                scanValues: function () {
                    var t, i, n, a, r, s = this.values,
                        o = s.length,
                        l = this.xvalues,
                        h = this.yvalues,
                        c = this.yminmax;
                    for (t = 0; o > t; t++) i = s[t], n = "string" == typeof s[t], a = "object" == typeof s[t] && s[t] instanceof Array, r = n && s[t].split(":"), n && 2 === r.length ? (l.push(Number(r[0])), h.push(Number(r[1])), c.push(Number(r[1]))) : a ? (l.push(i[0]), h.push(i[1]), c.push(i[1])) : (l.push(t), null === s[t] || "null" === s[t] ? h.push(null) : (h.push(Number(i)), c.push(Number(i))));
                    this.options.get("xvalues") && (l = this.options.get("xvalues")), this.maxy = this.maxyorg = e.max.apply(e, c), this.miny = this.minyorg = e.min.apply(e, c), this.maxx = e.max.apply(e, l), this.minx = e.min.apply(e, l), this.xvalues = l, this.yvalues = h, this.yminmax = c
                },
                processRangeOptions: function () {
                    var t = this.options,
                        e = t.get("normalRangeMin"),
                        n = t.get("normalRangeMax");
                    e !== i && (e < this.miny && (this.miny = e), n > this.maxy && (this.maxy = n)), t.get("chartRangeMin") !== i && (t.get("chartRangeClip") || t.get("chartRangeMin") < this.miny) && (this.miny = t.get("chartRangeMin")), t.get("chartRangeMax") !== i && (t.get("chartRangeClip") || t.get("chartRangeMax") > this.maxy) && (this.maxy = t.get("chartRangeMax")), t.get("chartRangeMinX") !== i && (t.get("chartRangeClipX") || t.get("chartRangeMinX") < this.minx) && (this.minx = t.get("chartRangeMinX")), t.get("chartRangeMaxX") !== i && (t.get("chartRangeClipX") || t.get("chartRangeMaxX") > this.maxx) && (this.maxx = t.get("chartRangeMaxX"))
                },
                drawNormalRange: function (t, n, a, r, s) {
                    var o = this.options.get("normalRangeMin"),
                        l = this.options.get("normalRangeMax"),
                        h = n + e.round(a - a * ((l - this.miny) / s)),
                        c = e.round(a * (l - o) / s);
                    this.target.drawRect(t, h, r, c, i, this.options.get("normalRangeColor")).append()
                },
                render: function () {
                    var t, a, r, s, o, l, h, c, u, d, f, p, g, m, v, y, x, w, C, k, S, D, T, F, M, A = this.options,
                        I = this.target,
                        E = this.canvasWidth,
                        L = this.canvasHeight,
                        R = this.vertices,
                        P = A.get("spotRadius"),
                        H = this.regionMap;
                    if (_._super.render.call(this) && (this.scanValues(), this.processRangeOptions(), T = this.xvalues, F = this.yvalues, this.yminmax.length && !(this.yvalues.length < 2))) {
                        for (s = o = 0, t = 0 === this.maxx - this.minx ? 1 : this.maxx - this.minx, a = 0 === this.maxy - this.miny ? 1 : this.maxy - this.miny, r = this.yvalues.length - 1, P && (4 * P > E || 4 * P > L) && (P = 0), P && (S = A.get("highlightSpotColor") && !A.get("disableInteraction"), (S || A.get("minSpotColor") || A.get("spotColor") && F[r] === this.miny) && (L -= e.ceil(P)), (S || A.get("maxSpotColor") || A.get("spotColor") && F[r] === this.maxy) && (L -= e.ceil(P), s += e.ceil(P)), (S || (A.get("minSpotColor") || A.get("maxSpotColor")) && (F[0] === this.miny || F[0] === this.maxy)) && (o += e.ceil(P), E -= e.ceil(P)), (S || A.get("spotColor") || A.get("minSpotColor") || A.get("maxSpotColor") && (F[r] === this.miny || F[r] === this.maxy)) && (E -= e.ceil(P))), L--, A.get("normalRangeMin") !== i && !A.get("drawNormalOnTop") && this.drawNormalRange(o, s, L, E, a), h = [], c = [h], m = v = null, y = F.length, M = 0; y > M; M++) u = T[M], f = T[M + 1], d = F[M], p = o + e.round((u - this.minx) * (E / t)), g = y - 1 > M ? o + e.round((f - this.minx) * (E / t)) : E, v = p + (g - p) / 2, H[M] = [m || 0, v, M], m = v, null === d ? M && (null !== F[M - 1] && (h = [], c.push(h)), R.push(null)) : (d < this.miny && (d = this.miny), d > this.maxy && (d = this.maxy), h.length || h.push([p, s + L]), l = [p, s + e.round(L - L * ((d - this.miny) / a))], h.push(l), R.push(l));
                        for (x = [], w = [], C = c.length, M = 0; C > M; M++) h = c[M], h.length && (A.get("fillColor") && (h.push([h[h.length - 1][0], s + L]), w.push(h.slice(0)), h.pop()), h.length > 2 && (h[0] = [h[0][0], h[1][1]]), x.push(h));
                        for (C = w.length, M = 0; C > M; M++) I.drawShape(w[M], A.get("fillColor"), A.get("fillColor")).append();
                        for (A.get("normalRangeMin") !== i && A.get("drawNormalOnTop") && this.drawNormalRange(o, s, L, E, a), C = x.length, M = 0; C > M; M++) I.drawShape(x[M], A.get("lineColor"), i, A.get("lineWidth")).append();
                        if (P && A.get("valueSpots"))
                            for (k = A.get("valueSpots"), k.get === i && (k = new b(k)), M = 0; y > M; M++) D = k.get(F[M]), D && I.drawCircle(o + e.round((T[M] - this.minx) * (E / t)), s + e.round(L - L * ((F[M] - this.miny) / a)), P, i, D).append();
                        P && A.get("spotColor") && null !== F[r] && I.drawCircle(o + e.round((T[T.length - 1] - this.minx) * (E / t)), s + e.round(L - L * ((F[r] - this.miny) / a)), P, i, A.get("spotColor")).append(), this.maxy !== this.minyorg && (P && A.get("minSpotColor") && (u = T[n.inArray(this.minyorg, F)], I.drawCircle(o + e.round((u - this.minx) * (E / t)), s + e.round(L - L * ((this.minyorg - this.miny) / a)), P, i, A.get("minSpotColor")).append()), P && A.get("maxSpotColor") && (u = T[n.inArray(this.maxyorg, F)], I.drawCircle(o + e.round((u - this.minx) * (E / t)), s + e.round(L - L * ((this.maxyorg - this.miny) / a)), P, i, A.get("maxSpotColor")).append())), this.lastShapeId = I.getLastShapeId(), this.canvasTop = s, I.render()
                    }
                }
            }), n.fn.sparkline.bar = C = r(n.fn.sparkline._base, w, {
                type: "bar",
                init: function (t, a, r, s, l) {
                    var d, f, p, g, m, v, y, x, w, _, k, S, D, T, F, M, A, I, E, L, R, P, H = parseInt(r.get("barWidth"), 10),
                        N = parseInt(r.get("barSpacing"), 10),
                        z = r.get("chartRangeMin"),
                        B = r.get("chartRangeMax"),
                        j = r.get("chartRangeClip"),
                        W = 1 / 0,
                        O = -1 / 0;
                    for (C._super.init.call(this, t, a, r, s, l), v = 0, y = a.length; y > v; v++) L = a[v], d = "string" == typeof L && L.indexOf(":") > -1, (d || n.isArray(L)) && (F = !0, d && (L = a[v] = c(L.split(":"))), L = u(L, null), f = e.min.apply(e, L), p = e.max.apply(e, L), W > f && (W = f), p > O && (O = p));
                    this.stacked = F, this.regionShapes = {}, this.barWidth = H, this.barSpacing = N, this.totalBarWidth = H + N, this.width = s = a.length * H + (a.length - 1) * N, this.initTarget(), j && (D = z === i ? -1 / 0 : z, T = B === i ? 1 / 0 : B), m = [], g = F ? [] : m;
                    var $ = [],
                        q = [];
                    for (v = 0, y = a.length; y > v; v++)
                        if (F)
                            for (M = a[v], a[v] = E = [], $[v] = 0, g[v] = q[v] = 0, A = 0, I = M.length; I > A; A++) L = E[A] = j ? o(M[A], D, T) : M[A], null !== L && (L > 0 && ($[v] += L), 0 > W && O > 0 ? 0 > L ? q[v] += e.abs(L) : g[v] += L : g[v] += e.abs(L - (0 > L ? O : W)), m.push(L));
                        else L = j ? o(a[v], D, T) : a[v], L = a[v] = h(L), null !== L && m.push(L);
                    this.max = S = e.max.apply(e, m), this.min = k = e.min.apply(e, m), this.stackMax = O = F ? e.max.apply(e, $) : S, this.stackMin = W = F ? e.min.apply(e, m) : k, r.get("chartRangeMin") !== i && (r.get("chartRangeClip") || r.get("chartRangeMin") < k) && (k = r.get("chartRangeMin")), r.get("chartRangeMax") !== i && (r.get("chartRangeClip") || r.get("chartRangeMax") > S) && (S = r.get("chartRangeMax")), this.zeroAxis = w = r.get("zeroAxis", !0), _ = 0 >= k && S >= 0 && w ? 0 : 0 == w ? k : k > 0 ? k : S, this.xaxisOffset = _, x = F ? e.max.apply(e, g) + e.max.apply(e, q) : S - k, this.canvasHeightEf = w && 0 > k ? this.canvasHeight - 2 : this.canvasHeight - 1, _ > k ? (P = F && S >= 0 ? O : S, R = (P - _) / x * this.canvasHeight, R !== e.ceil(R) && (this.canvasHeightEf -= 2, R = e.ceil(R))) : R = this.canvasHeight, this.yoffset = R, n.isArray(r.get("colorMap")) ? (this.colorMapByIndex = r.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = r.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === i && (this.colorMapByValue = new b(this.colorMapByValue))), this.range = x
                },
                getRegion: function (t, n) {
                    var a = e.floor(n / this.totalBarWidth);
                    return 0 > a || a >= this.values.length ? i : a
                },
                getCurrentRegionFields: function () {
                    var t, e, i = this.currentRegion,
                        n = m(this.values[i]),
                        a = [];
                    for (e = n.length; e--;) t = n[e], a.push({
                        isNull: null === t,
                        value: t,
                        color: this.calcColor(e, t, i),
                        offset: i
                    });
                    return a
                },
                calcColor: function (t, e, a) {
                    var r, s, o = this.colorMapByIndex,
                        l = this.colorMapByValue,
                        h = this.options;
                    return r = this.stacked ? h.get("stackedBarColor") : 0 > e ? h.get("negBarColor") : h.get("barColor"), 0 === e && h.get("zeroColor") !== i && (r = h.get("zeroColor")), l && (s = l.get(e)) ? r = s : o && o.length > a && (r = o[a]), n.isArray(r) ? r[t % r.length] : r
                },
                renderRegion: function (t, a) {
                    var r, s, o, l, h, c, u, d, p, g, m = this.values[t],
                        v = this.options,
                        b = this.xaxisOffset,
                        y = [],
                        x = this.range,
                        w = this.stacked,
                        _ = this.target,
                        C = t * this.totalBarWidth,
                        k = this.canvasHeightEf,
                        S = this.yoffset;
                    if (m = n.isArray(m) ? m : [m], u = m.length, d = m[0], l = f(null, m), g = f(b, m, !0), l) return v.get("nullColor") ? (o = a ? v.get("nullColor") : this.calcHighlightColor(v.get("nullColor"), v), r = S > 0 ? S - 1 : S, _.drawRect(C, r, this.barWidth - 1, 0, o, o)) : i;
                    for (h = S, c = 0; u > c; c++) {
                        if (d = m[c], w && d === b) {
                            if (!g || p) continue;
                            p = !0
                        }
                        s = x > 0 ? e.floor(k * (e.abs(d - b) / x)) + 1 : 1, b > d || d === b && 0 === S ? (r = h, h += s) : (r = S - s, S -= s), o = this.calcColor(c, d, t), a && (o = this.calcHighlightColor(o, v)), y.push(_.drawRect(C, r, this.barWidth - 1, s - 1, o, o))
                    }
                    return 1 === y.length ? y[0] : y
                }
            }), n.fn.sparkline.tristate = k = r(n.fn.sparkline._base, w, {
                type: "tristate",
                init: function (t, e, a, r, s) {
                    var o = parseInt(a.get("barWidth"), 10),
                        l = parseInt(a.get("barSpacing"), 10);
                    k._super.init.call(this, t, e, a, r, s), this.regionShapes = {}, this.barWidth = o, this.barSpacing = l, this.totalBarWidth = o + l, this.values = n.map(e, Number), this.width = r = e.length * o + (e.length - 1) * l, n.isArray(a.get("colorMap")) ? (this.colorMapByIndex = a.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = a.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === i && (this.colorMapByValue = new b(this.colorMapByValue))), this.initTarget()
                },
                getRegion: function (t, i) {
                    return e.floor(i / this.totalBarWidth)
                },
                getCurrentRegionFields: function () {
                    var t = this.currentRegion;
                    return {
                        isNull: this.values[t] === i,
                        value: this.values[t],
                        color: this.calcColor(this.values[t], t),
                        offset: t
                    }
                },
                calcColor: function (t, e) {
                    var i, n, a = this.values,
                        r = this.options,
                        s = this.colorMapByIndex,
                        o = this.colorMapByValue;
                    return i = o && (n = o.get(t)) ? n : s && s.length > e ? s[e] : a[e] < 0 ? r.get("negBarColor") : a[e] > 0 ? r.get("posBarColor") : r.get("zeroBarColor")
                },
                renderRegion: function (t, i) {
                    var n, a, r, s, o, l, h = this.values,
                        c = this.options,
                        u = this.target;
                    return n = u.pixelHeight, r = e.round(n / 2), s = t * this.totalBarWidth, h[t] < 0 ? (o = r, a = r - 1) : h[t] > 0 ? (o = 0, a = r - 1) : (o = r - 1, a = 2), l = this.calcColor(h[t], t), null !== l ? (i && (l = this.calcHighlightColor(l, c)), u.drawRect(s, o, this.barWidth - 1, a - 1, l, l)) : void 0
                }
            }), n.fn.sparkline.discrete = S = r(n.fn.sparkline._base, w, {
                type: "discrete",
                init: function (t, a, r, s, o) {
                    S._super.init.call(this, t, a, r, s, o), this.regionShapes = {}, this.values = a = n.map(a, Number), this.min = e.min.apply(e, a), this.max = e.max.apply(e, a), this.range = this.max - this.min, this.width = s = "auto" === r.get("width") ? 2 * a.length : this.width, this.interval = e.floor(s / a.length), this.itemWidth = s / a.length, r.get("chartRangeMin") !== i && (r.get("chartRangeClip") || r.get("chartRangeMin") < this.min) && (this.min = r.get("chartRangeMin")), r.get("chartRangeMax") !== i && (r.get("chartRangeClip") || r.get("chartRangeMax") > this.max) && (this.max = r.get("chartRangeMax")), this.initTarget(), this.target && (this.lineHeight = "auto" === r.get("lineHeight") ? e.round(.3 * this.canvasHeight) : r.get("lineHeight"))
                },
                getRegion: function (t, i) {
                    return e.floor(i / this.itemWidth)
                },
                getCurrentRegionFields: function () {
                    var t = this.currentRegion;
                    return {
                        isNull: this.values[t] === i,
                        value: this.values[t],
                        offset: t
                    }
                },
                renderRegion: function (t, i) {
                    var n, a, r, s, l = this.values,
                        h = this.options,
                        c = this.min,
                        u = this.max,
                        d = this.range,
                        f = this.interval,
                        p = this.target,
                        g = this.canvasHeight,
                        m = this.lineHeight,
                        v = g - m;
                    return a = o(l[t], c, u), s = t * f, n = e.round(v - v * ((a - c) / d)), r = h.get("thresholdColor") && a < h.get("thresholdValue") ? h.get("thresholdColor") : h.get("lineColor"), i && (r = this.calcHighlightColor(r, h)), p.drawLine(s, n, s, n + m, r)
                }
            }), n.fn.sparkline.bullet = D = r(n.fn.sparkline._base, {
                type: "bullet",
                init: function (t, n, a, r, s) {
                    var o, l, h;
                    D._super.init.call(this, t, n, a, r, s), this.values = n = c(n), h = n.slice(), h[0] = null === h[0] ? h[2] : h[0], h[1] = null === n[1] ? h[2] : h[1], o = e.min.apply(e, n), l = e.max.apply(e, n), o = a.get("base") === i ? 0 > o ? o : 0 : a.get("base"), this.min = o, this.max = l, this.range = l - o, this.shapes = {}, this.valueShapes = {}, this.regiondata = {}, this.width = r = "auto" === a.get("width") ? "4.0em" : r, this.target = this.$el.simpledraw(r, s, a.get("composite")), n.length || (this.disabled = !0), this.initTarget()
                },
                getRegion: function (t, e, n) {
                    var a = this.target.getShapeAt(t, e, n);
                    return a !== i && this.shapes[a] !== i ? this.shapes[a] : i
                },
                getCurrentRegionFields: function () {
                    var t = this.currentRegion;
                    return {
                        fieldkey: t.substr(0, 1),
                        value: this.values[t.substr(1)],
                        region: t
                    }
                },
                changeHighlight: function (t) {
                    var e, i = this.currentRegion,
                        n = this.valueShapes[i];
                    switch (delete this.shapes[n], i.substr(0, 1)) {
                    case "r":
                        e = this.renderRange(i.substr(1), t);
                        break;
                    case "p":
                        e = this.renderPerformance(t);
                        break;
                    case "t":
                        e = this.renderTarget(t)
                    }
                    this.valueShapes[i] = e.id, this.shapes[e.id] = i, this.target.replaceWithShape(n, e)
                },
                renderRange: function (t, i) {
                    var n = this.values[t],
                        a = e.round(this.canvasWidth * ((n - this.min) / this.range)),
                        r = this.options.get("rangeColors")[t - 2];
                    return i && (r = this.calcHighlightColor(r, this.options)), this.target.drawRect(0, 0, a - 1, this.canvasHeight - 1, r, r)
                },
                renderPerformance: function (t) {
                    var i = this.values[1],
                        n = e.round(this.canvasWidth * ((i - this.min) / this.range)),
                        a = this.options.get("performanceColor");
                    return t && (a = this.calcHighlightColor(a, this.options)), this.target.drawRect(0, e.round(.3 * this.canvasHeight), n - 1, e.round(.4 * this.canvasHeight) - 1, a, a)
                },
                renderTarget: function (t) {
                    var i = this.values[0],
                        n = e.round(this.canvasWidth * ((i - this.min) / this.range) - this.options.get("targetWidth") / 2),
                        a = e.round(.1 * this.canvasHeight),
                        r = this.canvasHeight - 2 * a,
                        s = this.options.get("targetColor");
                    return t && (s = this.calcHighlightColor(s, this.options)), this.target.drawRect(n, a, this.options.get("targetWidth") - 1, r - 1, s, s)
                },
                render: function () {
                    var t, e, i = this.values.length,
                        n = this.target;
                    if (D._super.render.call(this)) {
                        for (t = 2; i > t; t++) e = this.renderRange(t).append(), this.shapes[e.id] = "r" + t, this.valueShapes["r" + t] = e.id;
                        null !== this.values[1] && (e = this.renderPerformance().append(), this.shapes[e.id] = "p1", this.valueShapes.p1 = e.id), null !== this.values[0] && (e = this.renderTarget().append(), this.shapes[e.id] = "t0", this.valueShapes.t0 = e.id), n.render()
                    }
                }
            }), n.fn.sparkline.pie = T = r(n.fn.sparkline._base, {
                type: "pie",
                init: function (t, i, a, r, s) {
                    var o, l = 0;
                    if (T._super.init.call(this, t, i, a, r, s), this.shapes = {}, this.valueShapes = {}, this.values = i = n.map(i, Number), "auto" === a.get("width") && (this.width = this.height), i.length > 0)
                        for (o = i.length; o--;) l += i[o];
                    this.total = l, this.initTarget(), this.radius = e.floor(e.min(this.canvasWidth, this.canvasHeight) / 2)
                },
                getRegion: function (t, e, n) {
                    var a = this.target.getShapeAt(t, e, n);
                    return a !== i && this.shapes[a] !== i ? this.shapes[a] : i
                },
                getCurrentRegionFields: function () {
                    var t = this.currentRegion;
                    return {
                        isNull: this.values[t] === i,
                        value: this.values[t],
                        percent: 100 * (this.values[t] / this.total),
                        color: this.options.get("sliceColors")[t % this.options.get("sliceColors").length],
                        offset: t
                    }
                },
                changeHighlight: function (t) {
                    var e = this.currentRegion,
                        i = this.renderSlice(e, t),
                        n = this.valueShapes[e];
                    delete this.shapes[n], this.target.replaceWithShape(n, i), this.valueShapes[e] = i.id, this.shapes[i.id] = e
                },
                renderSlice: function (t, n) {
                    var a, r, s, o, l, h = this.target,
                        c = this.options,
                        u = this.radius,
                        d = c.get("borderWidth"),
                        f = c.get("offset"),
                        p = 2 * e.PI,
                        g = this.values,
                        m = this.total,
                        v = f ? 2 * e.PI * (f / 360) : 0;
                    for (o = g.length, s = 0; o > s; s++) {
                        if (a = v, r = v, m > 0 && (r = v + p * (g[s] / m)), t === s) return l = c.get("sliceColors")[s % c.get("sliceColors").length], n && (l = this.calcHighlightColor(l, c)), h.drawPieSlice(u, u, u - d, a, r, i, l);
                        v = r
                    }
                },
                render: function () {
                    var t, n, a = this.target,
                        r = this.values,
                        s = this.options,
                        o = this.radius,
                        l = s.get("borderWidth");
                    if (T._super.render.call(this)) {
                        for (l && a.drawCircle(o, o, e.floor(o - l / 2), s.get("borderColor"), i, l).append(), n = r.length; n--;) r[n] && (t = this.renderSlice(n).append(), this.valueShapes[n] = t.id, this.shapes[t.id] = n);
                        a.render()
                    }
                }
            }), n.fn.sparkline.box = F = r(n.fn.sparkline._base, {
                type: "box",
                init: function (t, e, i, a, r) {
                    F._super.init.call(this, t, e, i, a, r), this.values = n.map(e, Number), this.width = "auto" === i.get("width") ? "4.0em" : a, this.initTarget(), this.values.length || (this.disabled = 1)
                },
                getRegion: function () {
                    return 1
                },
                getCurrentRegionFields: function () {
                    var t = [{
                        field: "lq",
                        value: this.quartiles[0]
                    }, {
                        field: "med",
                        value: this.quartiles[1]
                    }, {
                        field: "uq",
                        value: this.quartiles[2]
                    }];
                    return this.loutlier !== i && t.push({
                        field: "lo",
                        value: this.loutlier
                    }), this.routlier !== i && t.push({
                        field: "ro",
                        value: this.routlier
                    }), this.lwhisker !== i && t.push({
                        field: "lw",
                        value: this.lwhisker
                    }), this.rwhisker !== i && t.push({
                        field: "rw",
                        value: this.rwhisker
                    }), t
                },
                render: function () {
                    var t, n, a, r, s, o, h, c, u, d, f, p = this.target,
                        g = this.values,
                        m = g.length,
                        v = this.options,
                        b = this.canvasWidth,
                        y = this.canvasHeight,
                        x = v.get("chartRangeMin") === i ? e.min.apply(e, g) : v.get("chartRangeMin"),
                        w = v.get("chartRangeMax") === i ? e.max.apply(e, g) : v.get("chartRangeMax"),
                        _ = 0;
                    if (F._super.render.call(this)) {
                        if (v.get("raw")) v.get("showOutliers") && g.length > 5 ? (n = g[0], t = g[1], r = g[2], s = g[3], o = g[4], h = g[5], c = g[6]) : (t = g[0], r = g[1], s = g[2], o = g[3], h = g[4]);
                        else if (g.sort(function (t, e) {
                            return t - e
                        }), r = l(g, 1), s = l(g, 2), o = l(g, 3), a = o - r, v.get("showOutliers")) {
                            for (t = h = i, u = 0; m > u; u++) t === i && g[u] > r - a * v.get("outlierIQR") && (t = g[u]), g[u] < o + a * v.get("outlierIQR") && (h = g[u]);
                            n = g[0], c = g[m - 1]
                        } else t = g[0], h = g[m - 1];
                        this.quartiles = [r, s, o], this.lwhisker = t, this.rwhisker = h, this.loutlier = n, this.routlier = c, f = b / (w - x + 1), v.get("showOutliers") && (_ = e.ceil(v.get("spotRadius")), b -= 2 * e.ceil(v.get("spotRadius")), f = b / (w - x + 1), t > n && p.drawCircle((n - x) * f + _, y / 2, v.get("spotRadius"), v.get("outlierLineColor"), v.get("outlierFillColor")).append(), c > h && p.drawCircle((c - x) * f + _, y / 2, v.get("spotRadius"), v.get("outlierLineColor"), v.get("outlierFillColor")).append()), p.drawRect(e.round((r - x) * f + _), e.round(.1 * y), e.round((o - r) * f), e.round(.8 * y), v.get("boxLineColor"), v.get("boxFillColor")).append(), p.drawLine(e.round((t - x) * f + _), e.round(y / 2), e.round((r - x) * f + _), e.round(y / 2), v.get("lineColor")).append(), p.drawLine(e.round((t - x) * f + _), e.round(y / 4), e.round((t - x) * f + _), e.round(y - y / 4), v.get("whiskerColor")).append(), p.drawLine(e.round((h - x) * f + _), e.round(y / 2), e.round((o - x) * f + _), e.round(y / 2), v.get("lineColor")).append(), p.drawLine(e.round((h - x) * f + _), e.round(y / 4), e.round((h - x) * f + _), e.round(y - y / 4), v.get("whiskerColor")).append(), p.drawLine(e.round((s - x) * f + _), e.round(.1 * y), e.round((s - x) * f + _), e.round(.9 * y), v.get("medianColor")).append(), v.get("target") && (d = e.ceil(v.get("spotRadius")), p.drawLine(e.round((v.get("target") - x) * f + _), e.round(y / 2 - d), e.round((v.get("target") - x) * f + _), e.round(y / 2 + d), v.get("targetColor")).append(), p.drawLine(e.round((v.get("target") - x) * f + _ - d), e.round(y / 2), e.round((v.get("target") - x) * f + _ + d), e.round(y / 2), v.get("targetColor")).append()), p.render()
                    }
                }
            }), I = r({
                init: function (t, e, i, n) {
                    this.target = t, this.id = e, this.type = i, this.args = n
                },
                append: function () {
                    return this.target.appendShape(this), this
                }
            }), E = r({
                _pxregex: /(\d+)(px)?\s*$/i,
                init: function (t, e, i) {
                    t && (this.width = t, this.height = e, this.target = i, this.lastShapeId = null, i[0] && (i = i[0]), n.data(i, "_jqs_vcanvas", this))
                },
                drawLine: function (t, e, i, n, a, r) {
                    return this.drawShape([
                        [t, e],
                        [i, n]
                    ], a, r)
                },
                drawShape: function (t, e, i, n) {
                    return this._genShape("Shape", [t, e, i, n])
                },
                drawCircle: function (t, e, i, n, a, r) {
                    return this._genShape("Circle", [t, e, i, n, a, r])
                },
                drawPieSlice: function (t, e, i, n, a, r, s) {
                    return this._genShape("PieSlice", [t, e, i, n, a, r, s])
                },
                drawRect: function (t, e, i, n, a, r) {
                    return this._genShape("Rect", [t, e, i, n, a, r])
                },
                getElement: function () {
                    return this.canvas
                },
                getLastShapeId: function () {
                    return this.lastShapeId
                },
                reset: function () {
                    alert("reset not implemented")
                },
                _insert: function (t, e) {
                    n(e).html(t)
                },
                _calculatePixelDims: function (t, e, i) {
                    var a;
                    a = this._pxregex.exec(e), this.pixelHeight = a ? a[1] : n(i).height(), a = this._pxregex.exec(t), this.pixelWidth = a ? a[1] : n(i).width()
                },
                _genShape: function (t, e) {
                    var i = N++;
                    return e.unshift(i), new I(this, i, t, e)
                },
                appendShape: function () {
                    alert("appendShape not implemented")
                },
                replaceWithShape: function () {
                    alert("replaceWithShape not implemented")
                },
                insertAfterShape: function () {
                    alert("insertAfterShape not implemented")
                },
                removeShapeId: function () {
                    alert("removeShapeId not implemented")
                },
                getShapeAt: function () {
                    alert("getShapeAt not implemented")
                },
                render: function () {
                    alert("render not implemented")
                }
            }), L = r(E, {
                init: function (e, a, r, s) {
                    L._super.init.call(this, e, a, r), this.canvas = t.createElement("canvas"), r[0] && (r = r[0]), n.data(r, "_jqs_vcanvas", this), n(this.canvas).css({
                        display: "inline-block",
                        width: e,
                        height: a,
                        verticalAlign: "top"
                    }), this._insert(this.canvas, r), this._calculatePixelDims(e, a, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, this.interact = s, this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = i, n(this.canvas).css({
                        width: this.pixelWidth,
                        height: this.pixelHeight
                    })
                },
                _getContext: function (t, e, n) {
                    var a = this.canvas.getContext("2d");
                    return t !== i && (a.strokeStyle = t), a.lineWidth = n === i ? 1 : n, e !== i && (a.fillStyle = e), a
                },
                reset: function () {
                    var t = this._getContext();
                    t.clearRect(0, 0, this.pixelWidth, this.pixelHeight), this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = i
                },
                _drawShape: function (t, e, n, a, r) {
                    var s, o, l = this._getContext(n, a, r);
                    for (l.beginPath(), l.moveTo(e[0][0] + .5, e[0][1] + .5), s = 1, o = e.length; o > s; s++) l.lineTo(e[s][0] + .5, e[s][1] + .5);
                    n !== i && l.stroke(), a !== i && l.fill(), this.targetX !== i && this.targetY !== i && l.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = t)
                },
                _drawCircle: function (t, n, a, r, s, o, l) {
                    var h = this._getContext(s, o, l);
                    h.beginPath(), h.arc(n, a, r, 0, 2 * e.PI, !1), this.targetX !== i && this.targetY !== i && h.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = t), s !== i && h.stroke(), o !== i && h.fill()
                },
                _drawPieSlice: function (t, e, n, a, r, s, o, l) {
                    var h = this._getContext(o, l);
                    h.beginPath(), h.moveTo(e, n), h.arc(e, n, a, r, s, !1), h.lineTo(e, n), h.closePath(), o !== i && h.stroke(), l && h.fill(), this.targetX !== i && this.targetY !== i && h.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = t)
                },
                _drawRect: function (t, e, i, n, a, r, s) {
                    return this._drawShape(t, [
                        [e, i],
                        [e + n, i],
                        [e + n, i + a],
                        [e, i + a],
                        [e, i]
                    ], r, s)
                },
                appendShape: function (t) {
                    return this.shapes[t.id] = t, this.shapeseq.push(t.id), this.lastShapeId = t.id, t.id
                },
                replaceWithShape: function (t, e) {
                    var i, n = this.shapeseq;
                    for (this.shapes[e.id] = e, i = n.length; i--;) n[i] == t && (n[i] = e.id);
                    delete this.shapes[t]
                },
                replaceWithShapes: function (t, e) {
                    var i, n, a, r = this.shapeseq,
                        s = {};
                    for (n = t.length; n--;) s[t[n]] = !0;
                    for (n = r.length; n--;) i = r[n], s[i] && (r.splice(n, 1), delete this.shapes[i], a = n);
                    for (n = e.length; n--;) r.splice(a, 0, e[n].id), this.shapes[e[n].id] = e[n]
                },
                insertAfterShape: function (t, e) {
                    var i, n = this.shapeseq;
                    for (i = n.length; i--;)
                        if (n[i] === t) return n.splice(i + 1, 0, e.id), this.shapes[e.id] = e, void 0
                },
                removeShapeId: function (t) {
                    var e, i = this.shapeseq;
                    for (e = i.length; e--;)
                        if (i[e] === t) {
                            i.splice(e, 1);
                            break
                        }
                    delete this.shapes[t]
                },
                getShapeAt: function (t, e, i) {
                    return this.targetX = e, this.targetY = i, this.render(), this.currentTargetShapeId
                },
                render: function () {
                    var t, e, i, n = this.shapeseq,
                        a = this.shapes,
                        r = n.length,
                        s = this._getContext();
                    for (s.clearRect(0, 0, this.pixelWidth, this.pixelHeight), i = 0; r > i; i++) t = n[i], e = a[t], this["_draw" + e.type].apply(this, e.args);
                    this.interact || (this.shapes = {}, this.shapeseq = [])
                }
            }), R = r(E, {
                init: function (e, i, a) {
                    var r;
                    R._super.init.call(this, e, i, a), a[0] && (a = a[0]), n.data(a, "_jqs_vcanvas", this), this.canvas = t.createElement("span"), n(this.canvas).css({
                        display: "inline-block",
                        position: "relative",
                        overflow: "hidden",
                        width: e,
                        height: i,
                        margin: "0px",
                        padding: "0px",
                        verticalAlign: "top"
                    }), this._insert(this.canvas, a), this._calculatePixelDims(e, i, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, r = '<v:group coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"' + ' style="position:absolute;top:0;left:0;width:' + this.pixelWidth + "px;height=" + this.pixelHeight + 'px;"></v:group>', this.canvas.insertAdjacentHTML("beforeEnd", r), this.group = n(this.canvas).children()[0], this.rendered = !1, this.prerender = ""
                },
                _drawShape: function (t, e, n, a, r) {
                    var s, o, l, h, c, u, d, f = [];
                    for (d = 0, u = e.length; u > d; d++) f[d] = "" + e[d][0] + "," + e[d][1];
                    return s = f.splice(0, 1), r = r === i ? 1 : r, o = n === i ? ' stroked="false" ' : ' strokeWeight="' + r + 'px" strokeColor="' + n + '" ', l = a === i ? ' filled="false"' : ' fillColor="' + a + '" filled="true" ', h = f[0] === f[f.length - 1] ? "x " : "", c = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" ' + ' id="jqsshape' + t + '" ' + o + l + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;" ' + ' path="m ' + s + " l " + f.join(", ") + " " + h + 'e">' + " </v:shape>"
                },
                _drawCircle: function (t, e, n, a, r, s, o) {
                    var l, h, c;
                    return e -= a, n -= a, l = r === i ? ' stroked="false" ' : ' strokeWeight="' + o + 'px" strokeColor="' + r + '" ', h = s === i ? ' filled="false"' : ' fillColor="' + s + '" filled="true" ', c = '<v:oval  id="jqsshape' + t + '" ' + l + h + ' style="position:absolute;top:' + n + "px; left:" + e + "px; width:" + 2 * a + "px; height:" + 2 * a + 'px"></v:oval>'
                },
                _drawPieSlice: function (t, n, a, r, s, o, l, h) {
                    var c, u, d, f, p, g, m, v;
                    if (s === o) return "";
                    if (o - s === 2 * e.PI && (s = 0, o = 2 * e.PI), u = n + e.round(e.cos(s) * r), d = a + e.round(e.sin(s) * r), f = n + e.round(e.cos(o) * r), p = a + e.round(e.sin(o) * r), u === f && d === p) {
                        if (o - s < e.PI) return "";
                        u = f = n + r, d = p = a
                    }
                    return u === f && d === p && o - s < e.PI ? "" : (c = [n - r, a - r, n + r, a + r, u, d, f, p], g = l === i ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + l + '" ', m = h === i ? ' filled="false"' : ' fillColor="' + h + '" filled="true" ', v = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" ' + ' id="jqsshape' + t + '" ' + g + m + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;" ' + ' path="m ' + n + "," + a + " wa " + c.join(", ") + ' x e">' + " </v:shape>")
                },
                _drawRect: function (t, e, i, n, a, r, s) {
                    return this._drawShape(t, [
                        [e, i],
                        [e, i + a],
                        [e + n, i + a],
                        [e + n, i],
                        [e, i]
                    ], r, s)
                },
                reset: function () {
                    this.group.innerHTML = ""
                },
                appendShape: function (t) {
                    var e = this["_draw" + t.type].apply(this, t.args);
                    return this.rendered ? this.group.insertAdjacentHTML("beforeEnd", e) : this.prerender += e, this.lastShapeId = t.id, t.id
                },
                replaceWithShape: function (t, e) {
                    var i = n("#jqsshape" + t),
                        a = this["_draw" + e.type].apply(this, e.args);
                    i[0].outerHTML = a
                },
                replaceWithShapes: function (t, e) {
                    var i, a = n("#jqsshape" + t[0]),
                        r = "",
                        s = e.length;
                    for (i = 0; s > i; i++) r += this["_draw" + e[i].type].apply(this, e[i].args);
                    for (a[0].outerHTML = r, i = 1; i < t.length; i++) n("#jqsshape" + t[i]).remove()
                },
                insertAfterShape: function (t, e) {
                    var i = n("#jqsshape" + t),
                        a = this["_draw" + e.type].apply(this, e.args);
                    i[0].insertAdjacentHTML("afterEnd", a)
                },
                removeShapeId: function (t) {
                    var e = n("#jqsshape" + t);
                    this.group.removeChild(e[0])
                },
                getShapeAt: function (t) {
                    var e = t.id.substr(8);
                    return e
                },
                render: function () {
                    this.rendered || (this.group.innerHTML = this.prerender, this.rendered = !0)
                }
            })
        })
    }(document, Math),
    /* ========================================================================
     * Bootstrap: tab.js v3.0.0
     * http://twbs.github.com/bootstrap/javascript.html#tabs
     * ========================================================================
     * Copyright 2012 Twitter, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * ======================================================================== */
    + function (t) {
        "use strict";
        var e = function (e) {
            this.element = t(e)
        };
        e.prototype.show = function () {
            var e = this.element,
                i = e.closest("ul:not(.dropdown-menu)"),
                n = e.attr("data-target");
            if (n || (n = e.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
                var a = i.find(".active:last a")[0],
                    r = t.Event("show.bs.tab", {
                        relatedTarget: a
                    });
                if (e.trigger(r), !r.isDefaultPrevented()) {
                    var s = t(n);
                    this.activate(e.parent("li"), i), this.activate(s, s.parent(), function () {
                        e.trigger({
                            type: "shown.bs.tab",
                            relatedTarget: a
                        })
                    })
                }
            }
        }, e.prototype.activate = function (e, i, n) {
            function a() {
                r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), s ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), n && n()
            }
            var r = i.find("> .active"),
                s = n && t.support.transition && r.hasClass("fade");
            s ? r.one(t.support.transition.end, a).emulateTransitionEnd(150) : a(), r.removeClass("in")
        };
        var i = t.fn.tab;
        t.fn.tab = function (i) {
            return this.each(function () {
                var n = t(this),
                    a = n.data("bs.tab");
                a || n.data("bs.tab", a = new e(this)), "string" == typeof i && a[i]()
            })
        }, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function () {
            return t.fn.tab = i, this
        }, t(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
            e.preventDefault(), t(this).tab("show")
        })
    }(window.jQuery),
    /* ========================================================================
     * Bootstrap: dropdown.js v3.0.0
     * http://twbs.github.com/bootstrap/javascript.html#dropdowns
     * ========================================================================
     * Copyright 2012 Twitter, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * ======================================================================== */
    + function (t) {
        "use strict";

        function e() {
            t(n).remove(), t(a).each(function (e) {
                var n = i(t(this));
                n.hasClass("open") && (n.trigger(e = t.Event("hide.bs.dropdown")), e.isDefaultPrevented() || n.removeClass("open").trigger("hidden.bs.dropdown"))
            })
        }

        function i(e) {
            var i = e.attr("data-target");
            i || (i = e.attr("href"), i = i && /#/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
            var n = i && t(i);
            return n && n.length ? n : e.parent()
        }
        var n = ".dropdown-backdrop",
            a = "[data-toggle=dropdown]",
            r = function (e) {
                t(e).on("click.bs.dropdown", this.toggle)
            };
        r.prototype.toggle = function (n) {
            var a = t(this);
            if (!a.is(".disabled, :disabled")) {
                var r = i(a),
                    s = r.hasClass("open");
                if (e(), !s) {
                    if ("ontouchstart" in document.documentElement && !r.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e), r.trigger(n = t.Event("show.bs.dropdown")), n.isDefaultPrevented()) return;
                    r.toggleClass("open").trigger("shown.bs.dropdown"), a.focus()
                }
                return !1
            }
        }, r.prototype.keydown = function (e) {
            if (/(38|40|27)/.test(e.keyCode)) {
                var n = t(this);
                if (e.preventDefault(), e.stopPropagation(), !n.is(".disabled, :disabled")) {
                    var r = i(n),
                        s = r.hasClass("open");
                    if (!s || s && 27 == e.keyCode) return 27 == e.which && r.find(a).focus(), n.click();
                    var o = t("[role=menu] li:not(.divider):visible a", r);
                    if (o.length) {
                        var l = o.index(o.filter(":focus"));
                        38 == e.keyCode && l > 0 && l--, 40 == e.keyCode && l < o.length - 1 && l++, ~l || (l = 0), o.eq(l).focus()
                    }
                }
            }
        };
        var s = t.fn.dropdown;
        t.fn.dropdown = function (e) {
            return this.each(function () {
                var i = t(this),
                    n = i.data("dropdown");
                n || i.data("dropdown", n = new r(this)), "string" == typeof e && n[e].call(i)
            })
        }, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function () {
            return t.fn.dropdown = s, this
        }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
            t.stopPropagation()
        }).on("click.bs.dropdown.data-api", a, r.prototype.toggle).on("keydown.bs.dropdown.data-api", a + ", [role=menu]", r.prototype.keydown)
    }(window.jQuery),
    /* ========================================================================
     * Bootstrap: tooltip.js v3.0.0
     * http://twbs.github.com/bootstrap/javascript.html#tooltip
     * Inspired by the original jQuery.tipsy by Jason Frame
     * ========================================================================
     * Copyright 2012 Twitter, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * ======================================================================== */
    + function (t) {
        "use strict";
        var e = function (t, e) {
            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
        };
        e.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1
        }, e.prototype.init = function (e, i, n) {
            this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(n);
            for (var a = this.options.trigger.split(" "), r = a.length; r--;) {
                var s = a[r];
                if ("click" == s) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
                else if ("manual" != s) {
                    var o = "hover" == s ? "mouseenter" : "focus",
                        l = "hover" == s ? "mouseleave" : "blur";
                    this.$element.on(o + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, e.prototype.getDefaults = function () {
            return e.DEFAULTS
        }, e.prototype.getOptions = function (e) {
            return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), e
        }, e.prototype.getDelegateOptions = function () {
            var e = {},
                i = this.getDefaults();
            return this._options && t.each(this._options, function (t, n) {
                i[t] != n && (e[t] = n)
            }), e
        }, e.prototype.enter = function (e) {
            var i = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
            return clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? (i.timeout = setTimeout(function () {
                "in" == i.hoverState && i.show()
            }, i.options.delay.show), void 0) : i.show()
        }, e.prototype.leave = function (e) {
            var i = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
            return clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? (i.timeout = setTimeout(function () {
                "out" == i.hoverState && i.hide()
            }, i.options.delay.hide), void 0) : i.hide()
        }, e.prototype.show = function () {
            var e = t.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                var i = this.tip();
                this.setContent(), this.options.animation && i.addClass("fade");
                var n = "function" == typeof this.options.placement ? this.options.placement.call(this, i[0], this.$element[0]) : this.options.placement,
                    a = /\s?auto?\s?/i,
                    r = a.test(n);
                r && (n = n.replace(a, "") || "top"), i.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(n), this.options.container ? i.appendTo(this.options.container) : i.insertAfter(this.$element);
                var s = this.getPosition(),
                    o = i[0].offsetWidth,
                    l = i[0].offsetHeight;
                if (r) {
                    var h = this.$element.parent(),
                        c = n,
                        u = document.documentElement.scrollTop || document.body.scrollTop,
                        d = "body" == this.options.container ? window.innerWidth : h.outerWidth(),
                        f = "body" == this.options.container ? window.innerHeight : h.outerHeight(),
                        p = "body" == this.options.container ? 0 : h.offset().left;
                    n = "bottom" == n && s.top + s.height + l - u > f ? "top" : "top" == n && s.top - u - l < 0 ? "bottom" : "right" == n && s.right + o > d ? "left" : "left" == n && s.left - o < p ? "right" : n, i.removeClass(c).addClass(n)
                }
                var g = this.getCalculatedOffset(n, s, o, l);
                this.applyPlacement(g, n), this.$element.trigger("shown.bs." + this.type)
            }
        }, e.prototype.applyPlacement = function (t, e) {
            var i, n = this.tip(),
                a = n[0].offsetWidth,
                r = n[0].offsetHeight,
                s = parseInt(n.css("margin-top"), 10),
                o = parseInt(n.css("margin-left"), 10);
            isNaN(s) && (s = 0), isNaN(o) && (o = 0), t.top = t.top + s, t.left = t.left + o, n.offset(t).addClass("in");
            var l = n[0].offsetWidth,
                h = n[0].offsetHeight;
            if ("top" == e && h != r && (i = !0, t.top = t.top + r - h), /bottom|top/.test(e)) {
                var c = 0;
                t.left < 0 && (c = -2 * t.left, t.left = 0, n.offset(t), l = n[0].offsetWidth, h = n[0].offsetHeight), this.replaceArrow(c - a + l, l, "left")
            } else this.replaceArrow(h - r, h, "top");
            i && n.offset(t)
        }, e.prototype.replaceArrow = function (t, e, i) {
            this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
        }, e.prototype.setContent = function () {
            var t = this.tip(),
                e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
        }, e.prototype.hide = function () {
            function e() {
                "in" != i.hoverState && n.detach()
            }
            var i = this,
                n = this.tip(),
                a = t.Event("hide.bs." + this.type);
            return this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? n.one(t.support.transition.end, e).emulateTransitionEnd(150) : e(), this.$element.trigger("hidden.bs." + this.type), this)
        }, e.prototype.fixTitle = function () {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        }, e.prototype.hasContent = function () {
            return this.getTitle()
        }, e.prototype.getPosition = function () {
            var e = this.$element[0];
            return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
                width: e.offsetWidth,
                height: e.offsetHeight
            }, this.$element.offset())
        }, e.prototype.getCalculatedOffset = function (t, e, i, n) {
            return "bottom" == t ? {
                top: e.top + e.height,
                left: e.left + e.width / 2 - i / 2
            } : "top" == t ? {
                top: e.top - n,
                left: e.left + e.width / 2 - i / 2
            } : "left" == t ? {
                top: e.top + e.height / 2 - n / 2,
                left: e.left - i
            } : {
                top: e.top + e.height / 2 - n / 2,
                left: e.left + e.width
            }
        }, e.prototype.getTitle = function () {
            var t, e = this.$element,
                i = this.options;
            return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
        }, e.prototype.tip = function () {
            return this.$tip = this.$tip || t(this.options.template)
        }, e.prototype.arrow = function () {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, e.prototype.validate = function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, e.prototype.enable = function () {
            this.enabled = !0
        }, e.prototype.disable = function () {
            this.enabled = !1
        }, e.prototype.toggleEnabled = function () {
            this.enabled = !this.enabled
        }, e.prototype.toggle = function (e) {
            var i = e ? t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
            i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
        }, e.prototype.destroy = function () {
            this.hide().$element.off("." + this.type).removeData("bs." + this.type)
        };
        var i = t.fn.tooltip;
        t.fn.tooltip = function (i) {
            return this.each(function () {
                var n = t(this),
                    a = n.data("bs.tooltip"),
                    r = "object" == typeof i && i;
                a || n.data("bs.tooltip", a = new e(this, r)), "string" == typeof i && a[i]()
            })
        }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function () {
            return t.fn.tooltip = i, this
        }
    }(window.jQuery),
    /* ========================================================================
     * Bootstrap: collapse.js v3.0.0
     * http://twbs.github.com/bootstrap/javascript.html#collapse
     * ========================================================================
     * Copyright 2012 Twitter, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * ======================================================================== */
    + function (t) {
        "use strict";
        var e = function (i, n) {
            this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, n), this.transitioning = null, this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
        };
        e.DEFAULTS = {
            toggle: !0
        }, e.prototype.dimension = function () {
            var t = this.$element.hasClass("width");
            return t ? "width" : "height"
        }, e.prototype.show = function () {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var e = t.Event("show.bs.collapse");
                if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                    var i = this.$parent && this.$parent.find("> .panel > .in");
                    if (i && i.length) {
                        var n = i.data("bs.collapse");
                        if (n && n.transitioning) return;
                        i.collapse("hide"), n || i.data("bs.collapse", null)
                    }
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0), this.transitioning = 1;
                    var r = function () {
                        this.$element.removeClass("collapsing").addClass("in")[a]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return r.call(this);
                    var s = t.camelCase(["scroll", a].join("-"));
                    this.$element.one(t.support.transition.end, t.proxy(r, this)).emulateTransitionEnd(350)[a](this.$element[0][s])
                }
            }
        }, e.prototype.hide = function () {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var e = t.Event("hide.bs.collapse");
                if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                    var i = this.dimension();
                    this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                    var n = function () {
                        this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                    };
                    return t.support.transition ? (this.$element[i](0).one(t.support.transition.end, t.proxy(n, this)).emulateTransitionEnd(350), void 0) : n.call(this)
                }
            }
        }, e.prototype.toggle = function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        };
        var i = t.fn.collapse;
        t.fn.collapse = function (i) {
            return this.each(function () {
                var n = t(this),
                    a = n.data("bs.collapse"),
                    r = t.extend({}, e.DEFAULTS, n.data(), "object" == typeof i && i);
                a || n.data("bs.collapse", a = new e(this, r)), "string" == typeof i && a[i]()
            })
        }, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function () {
            return t.fn.collapse = i, this
        }, t(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (e) {
            var i, n = t(this),
                a = n.attr("data-target") || e.preventDefault() || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""),
                r = t(a),
                s = r.data("bs.collapse"),
                o = s ? "toggle" : n.data(),
                l = n.attr("data-parent"),
                h = l && t(l);
            s && s.transitioning || (h && h.find('[data-toggle=collapse][data-parent="' + l + '"]').not(n).addClass("collapsed"), n[r.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), r.collapse(o)
        })
    }(window.jQuery),
    /* ========================================================================
     * Bootstrap: scrollspy.js v3.0.0
     * http://twbs.github.com/bootstrap/javascript.html#scrollspy
     * ========================================================================
     * Copyright 2012 Twitter, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * ======================================================================== */
    + function (t) {
        "use strict";

        function e(i, n) {
            var a, r = t.proxy(this.process, this);
            this.$element = t(i).is("body") ? t(window) : t(i), this.$body = t("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", r), this.options = t.extend({}, e.DEFAULTS, n), this.selector = (this.options.target || (a = t(i).attr("href")) && a.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = t([]), this.targets = t([]), this.activeTarget = null, this.refresh(), this.process()
        }
        e.DEFAULTS = {
            offset: 10
        }, e.prototype.refresh = function () {
            var e = this.$element[0] == window ? "offset" : "position";
            this.offsets = t([]), this.targets = t([]);
            var i = this;
            this.$body.find(this.selector).map(function () {
                var n = t(this),
                    a = n.data("target") || n.attr("href"),
                    r = /^#\w/.test(a) && t(a);
                return r && r.length && [
                    [r[e]().top + (!t.isWindow(i.$scrollElement.get(0)) && i.$scrollElement.scrollTop()), a]
                ] || null
            }).sort(function (t, e) {
                return t[0] - e[0]
            }).each(function () {
                i.offsets.push(this[0]), i.targets.push(this[1])
            })
        }, e.prototype.process = function () {
            var t, e = this.$scrollElement.scrollTop() + this.options.offset,
                i = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                n = i - this.$scrollElement.height(),
                a = this.offsets,
                r = this.targets,
                s = this.activeTarget;
            if (e >= n) return s != (t = r.last()[0]) && this.activate(t);
            for (t = a.length; t--;) s != r[t] && e >= a[t] && (!a[t + 1] || e <= a[t + 1]) && this.activate(r[t])
        }, e.prototype.activate = function (e) {
            this.activeTarget = e, t(this.selector).parents(".active").removeClass("active");
            var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
                n = t(i).parents("li").addClass("active");
            n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
        };
        var i = t.fn.scrollspy;
        t.fn.scrollspy = function (i) {
            return this.each(function () {
                var n = t(this),
                    a = n.data("bs.scrollspy"),
                    r = "object" == typeof i && i;
                a || n.data("bs.scrollspy", a = new e(this, r)), "string" == typeof i && a[i]()
            })
        }, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
            return t.fn.scrollspy = i, this
        }, t(window).on("load", function () {
            t('[data-spy="scroll"]').each(function () {
                var e = t(this);
                e.scrollspy(e.data())
            })
        })
    }(window.jQuery),
    /* =========================================================
     * bootstrap-datepicker.js
     * http://www.eyecon.ro/bootstrap-datepicker
     * =========================================================
     * Copyright 2012 Stefan Petre
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * ========================================================= */
    ! function (t) {
        var e = function (e, n) {
            if (this.element = t(e), this.format = i.parseFormat(n.format || this.element.data("date-format") || "mm/dd/yyyy"), this.picker = t(i.template).appendTo("body").on({
                click: t.proxy(this.click, this)
            }), this.isInput = this.element.is("input"), this.component = this.element.is(".date") ? this.element.find(".add-on") : !1, this.isInput ? this.element.on({
                focus: t.proxy(this.show, this),
                keyup: t.proxy(this.update, this)
            }) : this.component ? this.component.on("click", t.proxy(this.show, this)) : this.element.on("click", t.proxy(this.show, this)), this.minViewMode = n.minViewMode || this.element.data("date-minviewmode") || 0, "string" == typeof this.minViewMode) switch (this.minViewMode) {
            case "months":
                this.minViewMode = 1;
                break;
            case "years":
                this.minViewMode = 2;
                break;
            default:
                this.minViewMode = 0
            }
            if (this.viewMode = n.viewMode || this.element.data("date-viewmode") || 0, "string" == typeof this.viewMode) switch (this.viewMode) {
            case "months":
                this.viewMode = 1;
                break;
            case "years":
                this.viewMode = 2;
                break;
            default:
                this.viewMode = 0
            }
            this.startViewMode = this.viewMode, this.weekStart = n.weekStart || this.element.data("date-weekstart") || 0, this.weekEnd = 0 === this.weekStart ? 6 : this.weekStart - 1, this.onRender = n.onRender, this.fillDow(), this.fillMonths(), this.update(), this.showMode()
        };
        e.prototype = {
            constructor: e,
            show: function (e) {
                this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.place(), t(window).on("resize", t.proxy(this.place, this)), e && (e.stopPropagation(), e.preventDefault()), !this.isInput;
                var i = this;
                t(document).on("mousedown", function (e) {
                    0 == t(e.target).closest(".datepicker").length && i.hide()
                }), this.element.trigger({
                    type: "show",
                    date: this.date
                })
            },
            hide: function () {
                this.picker.hide(), t(window).off("resize", this.place), this.viewMode = this.startViewMode, this.showMode(), this.isInput || t(document).off("mousedown", this.hide), this.element.trigger({
                    type: "hide",
                    date: this.date
                })
            },
            set: function () {
                var t = i.formatDate(this.date, this.format);
                this.isInput ? this.element.prop("value", t) : (this.component && this.element.find("input").prop("value", t), this.element.data("date", t))
            },
            setValue: function (t) {
                this.date = "string" == typeof t ? i.parseDate(t, this.format) : new Date(t), this.set(), this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0), this.fill()
            },
            place: function () {
                var t = this.component ? this.component.offset() : this.element.offset();
                this.picker.css({
                    top: t.top + this.height,
                    left: t.left
                })
            },
            update: function (t) {
                this.date = i.parseDate("string" == typeof t ? t : this.isInput ? this.element.prop("value") : this.element.data("date"), this.format), this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0), this.fill()
            },
            fillDow: function () {
                for (var t = this.weekStart, e = "<tr>"; t < this.weekStart + 7;) e += '<th class="dow">' + i.dates.daysMin[t++ % 7] + "</th>";
                e += "</tr>", this.picker.find(".datepicker-days thead").append(e)
            },
            fillMonths: function () {
                for (var t = "", e = 0; 12 > e;) t += '<span class="month">' + i.dates.monthsShort[e++] + "</span>";
                this.picker.find(".datepicker-months td").append(t)
            },
            fill: function () {
                var t = new Date(this.viewDate),
                    e = t.getFullYear(),
                    n = t.getMonth(),
                    a = this.date.valueOf();
                this.picker.find(".datepicker-days th:eq(1)").text(i.dates.months[n] + " " + e);
                var r = new Date(e, n - 1, 28, 0, 0, 0, 0),
                    s = i.getDaysInMonth(r.getFullYear(), r.getMonth());
                r.setDate(s), r.setDate(s - (r.getDay() - this.weekStart + 7) % 7);
                var o = new Date(r);
                o.setDate(o.getDate() + 42), o = o.valueOf();
                for (var l, h, c, u = []; r.valueOf() < o;) r.getDay() === this.weekStart && u.push("<tr>"), l = this.onRender(r), h = r.getFullYear(), c = r.getMonth(), n > c && h === e || e > h ? l += " old" : (c > n && h === e || h > e) && (l += " new"), r.valueOf() === a && (l += " active"), u.push('<td class="day ' + l + '">' + r.getDate() + "</td>"), r.getDay() === this.weekEnd && u.push("</tr>"), r.setDate(r.getDate() + 1);
                this.picker.find(".datepicker-days tbody").empty().append(u.join(""));
                var d = this.date.getFullYear(),
                    f = this.picker.find(".datepicker-months").find("th:eq(1)").text(e).end().find("span").removeClass("active");
                d === e && f.eq(this.date.getMonth()).addClass("active"), u = "", e = 10 * parseInt(e / 10, 10);
                var p = this.picker.find(".datepicker-years").find("th:eq(1)").text(e + "-" + (e + 9)).end().find("td");
                e -= 1;
                for (var g = -1; 11 > g; g++) u += '<span class="year' + (-1 === g || 10 === g ? " old" : "") + (d === e ? " active" : "") + '">' + e + "</span>", e += 1;
                p.html(u)
            },
            click: function (e) {
                e.stopPropagation(), e.preventDefault();
                var n = t(e.target).closest("span, td, th");
                if (1 === n.length) switch (n[0].nodeName.toLowerCase()) {
                case "th":
                    switch (n[0].className) {
                    case "switch":
                        this.showMode(1);
                        break;
                    case "prev":
                    case "next":
                        this.viewDate["set" + i.modes[this.viewMode].navFnc].call(this.viewDate, this.viewDate["get" + i.modes[this.viewMode].navFnc].call(this.viewDate) + i.modes[this.viewMode].navStep * ("prev" === n[0].className ? -1 : 1)), this.fill(), this.set()
                    }
                    break;
                case "span":
                    if (n.is(".month")) {
                        var a = n.parent().find("span").index(n);
                        this.viewDate.setMonth(a)
                    } else {
                        var r = parseInt(n.text(), 10) || 0;
                        this.viewDate.setFullYear(r)
                    }
                    0 !== this.viewMode && (this.date = new Date(this.viewDate), this.element.trigger({
                        type: "changeDate",
                        date: this.date,
                        viewMode: i.modes[this.viewMode].clsName
                    })), this.showMode(-1), this.fill(), this.set();
                    break;
                case "td":
                    if (n.is(".day") && !n.is(".disabled")) {
                        var s = parseInt(n.text(), 10) || 1,
                            a = this.viewDate.getMonth();
                        n.is(".old") ? a -= 1 : n.is(".new") && (a += 1);
                        var r = this.viewDate.getFullYear();
                        this.date = new Date(r, a, s, 0, 0, 0, 0), this.viewDate = new Date(r, a, Math.min(28, s), 0, 0, 0, 0), this.fill(), this.set(), this.element.trigger({
                            type: "changeDate",
                            date: this.date,
                            viewMode: i.modes[this.viewMode].clsName
                        })
                    }
                }
            },
            mousedown: function (t) {
                t.stopPropagation(), t.preventDefault()
            },
            showMode: function (t) {
                t && (this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + t))), this.picker.find(">div").hide().filter(".datepicker-" + i.modes[this.viewMode].clsName).show()
            }
        }, t.fn.datepicker = function (i, n) {
            return this.each(function () {
                var a = t(this),
                    r = a.data("datepicker"),
                    s = "object" == typeof i && i;
                r || a.data("datepicker", r = new e(this, t.extend({}, t.fn.datepicker.defaults, s))), "string" == typeof i && r[i](n)
            })
        }, t.fn.datepicker.defaults = {
            onRender: function () {
                return ""
            }
        }, t.fn.datepicker.Constructor = e;
        var i = {
            modes: [{
                clsName: "days",
                navFnc: "Month",
                navStep: 1
            }, {
                clsName: "months",
                navFnc: "FullYear",
                navStep: 1
            }, {
                clsName: "years",
                navFnc: "FullYear",
                navStep: 10
            }],
            dates: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            isLeapYear: function (t) {
                return 0 === t % 4 && 0 !== t % 100 || 0 === t % 400
            },
            getDaysInMonth: function (t, e) {
                return [31, i.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
            },
            parseFormat: function (t) {
                var e = t.match(/[.\/\-\s].*?/),
                    i = t.split(/\W+/);
                if (!e || !i || 0 === i.length) throw new Error("Invalid date format.");
                return {
                    separator: e,
                    parts: i
                }
            },
            parseDate: function (t, e) {
                var i, n = t.split(e.separator),
                    t = new Date;
                if (t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), n.length === e.parts.length) {
                    for (var a = t.getFullYear(), r = t.getDate(), s = t.getMonth(), o = 0, l = e.parts.length; l > o; o++) switch (i = parseInt(n[o], 10) || 1, e.parts[o]) {
                    case "dd":
                    case "d":
                        r = i, t.setDate(i);
                        break;
                    case "mm":
                    case "m":
                        s = i - 1, t.setMonth(i - 1);
                        break;
                    case "yy":
                        a = 2e3 + i, t.setFullYear(2e3 + i);
                        break;
                    case "yyyy":
                        a = i, t.setFullYear(i)
                    }
                    t = new Date(a, s, r, 0, 0, 0)
                }
                return t
            },
            formatDate: function (t, e) {
                var i = {
                    d: t.getDate(),
                    m: t.getMonth() + 1,
                    yy: t.getFullYear().toString().substring(2),
                    yyyy: t.getFullYear()
                };
                i.dd = (i.d < 10 ? "0" : "") + i.d, i.mm = (i.m < 10 ? "0" : "") + i.m;
                for (var t = [], n = 0, a = e.parts.length; a > n; n++) t.push(i[e.parts[n]]);
                return t.join(e.separator)
            },
            headTemplate: '<thead><tr><th class="prev">&lsaquo;</th><th colspan="5" class="switch"></th><th class="next">&rsaquo;</th></tr></thead>',
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
        };
        i.template = '<div class="datepicker dropdown-menu"><div class="datepicker-days"><table class=" table-condensed">' + i.headTemplate + "<tbody></tbody>" + "</table>" + "</div>" + '<div class="datepicker-months">' + '<table class="table-condensed">' + i.headTemplate + i.contTemplate + "</table>" + "</div>" + '<div class="datepicker-years">' + '<table class="table-condensed">' + i.headTemplate + i.contTemplate + "</table>" + "</div>" + "</div>"
    }(window.jQuery),
    /* ========================================================================
     * Bootstrap: transition.js v3.0.0
     * http://twbs.github.com/bootstrap/javascript.html#transitions
     * ========================================================================
     * Copyright 2013 Twitter, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * ======================================================================== */
    + function (t) {
        "use strict";

        function e() {
            var t = document.createElement("bootstrap"),
                e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var i in e)
                if (void 0 !== t.style[i]) return {
                    end: e[i]
                }
        }
        t.fn.emulateTransitionEnd = function (e) {
            var i = !1,
                n = this;
            t(this).one(t.support.transition.end, function () {
                i = !0
            });
            var a = function () {
                i || t(n).trigger(t.support.transition.end)
            };
            return setTimeout(a, e), this
        }, t(function () {
            t.support.transition = e()
        })
    }(window.jQuery),
    /**
     * Downward compatible, touchable dial
     *
     * Version: 1.2.0 (15/07/2012)
     * Requires: jQuery v1.7+
     *
     * Copyright (c) 2012 Anthony Terrien
     * Under MIT and GPL licenses:
     *  http://www.opensource.org/licenses/mit-license.php
     *  http://www.gnu.org/licenses/gpl.html
     *
     * Thanks to vor, eskimoblood, spiffistan, FabrizioC
     */
    function (t) {
        "use strict";
        var e = {},
            i = Math.max,
            n = Math.min;
        e.c = {}, e.c.d = t(document), e.c.t = function (t) {
            return t.originalEvent.touches.length - 1
        }, e.o = function () {
            var i = this;
            this.o = null, this.$ = null, this.i = null, this.g = null, this.v = null, this.cv = null, this.x = 0, this.y = 0, this.$c = null, this.c = null, this.t = 0, this.isInit = !1, this.fgColor = null, this.pColor = null, this.dH = null, this.cH = null, this.eH = null, this.rH = null, this.scale = 1, this.run = function () {
                var e = function (t, e) {
                    var n;
                    for (n in e) i.o[n] = e[n];
                    i.init(), i._configure()._draw()
                };
                if (!this.$.data("kontroled")) return this.$.data("kontroled", !0), this.extend(), this.o = t.extend({
                    min: this.$.data("min") || 0,
                    max: this.$.data("max") || 100,
                    stopper: !0,
                    readOnly: this.$.data("readonly"),
                    cursor: this.$.data("cursor") === !0 && 30 || this.$.data("cursor") || 0,
                    thickness: this.$.data("thickness") || .35,
                    lineCap: this.$.data("linecap") || "butt",
                    width: this.$.data("width") || 200,
                    height: this.$.data("height") || 200,
                    displayInput: null == this.$.data("displayinput") || this.$.data("displayinput"),
                    displayPrevious: this.$.data("displayprevious"),
                    fgColor: this.$.data("fgcolor") || "#87CEEB",
                    inputColor: this.$.data("inputcolor") || this.$.data("fgcolor") || "#87CEEB",
                    font: this.$.data("font") || "Arial",
                    fontWeight: this.$.data("font-weight") || "bold",
                    inline: !1,
                    step: this.$.data("step") || 1,
                    draw: null,
                    change: null,
                    cancel: null,
                    release: null,
                    error: null
                }, this.o), this.$.is("fieldset") ? (this.v = {}, this.i = this.$.find("input"), this.i.each(function (e) {
                    var n = t(this);
                    i.i[e] = n, i.v[e] = n.val(), n.bind("change", function () {
                        var t = {};
                        t[e] = n.val(), i.val(t)
                    })
                }), this.$.find("legend").remove()) : (this.i = this.$, this.v = this.$.val(), "" == this.v && (this.v = this.o.min), this.$.bind("change", function () {
                    i.val(i._validate(i.$.val()))
                })), !this.o.displayInput && this.$.hide(), this.$c = t(document.createElement("canvas")).attr({
                    width: this.o.width,
                    height: this.o.height
                }), "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(this.$c[0]), this.c = this.$c[0].getContext ? this.$c[0].getContext("2d") : null, this.c ? (this.$.wrap(t('<div style="' + (this.o.inline ? "display:inline;" : "") + "width:" + this.o.width + "px;height:" + this.o.height + 'px;"></div>')).before(this.$c), this.scale = (window.devicePixelRatio || 1) / (this.c.webkitBackingStorePixelRatio || this.c.mozBackingStorePixelRatio || this.c.msBackingStorePixelRatio || this.c.oBackingStorePixelRatio || this.c.backingStorePixelRatio || 1), 1 !== this.scale && (this.$c[0].width = this.$c[0].width * this.scale, this.$c[0].height = this.$c[0].height * this.scale, this.$c.width(this.o.width), this.$c.height(this.o.height)), this.v instanceof Object ? (this.cv = {}, this.copy(this.v, this.cv)) : this.cv = this.v, this.$.bind("configure", e).parent().bind("configure", e), this._listen()._configure()._xy().init(), this.isInit = !0, this._draw(), this) : (this.o.error && this.o.error(), void 0)
            }, this._draw = function () {
                var t = !0;
                i.g = i.c, i.clear(), i.dH && (t = i.dH()), t !== !1 && i.draw()
            }, this._touch = function (t) {
                var n = function (t) {
                    var e = i.xy2val(t.originalEvent.touches[i.t].pageX, t.originalEvent.touches[i.t].pageY);
                    e != i.cv && (i.cH && i.cH(e) === !1 || (i.change(i._validate(e)), i._draw()))
                };
                return this.t = e.c.t(t), n(t), e.c.d.bind("touchmove.k", n).bind("touchend.k", function () {
                    e.c.d.unbind("touchmove.k touchend.k"), i.rH && i.rH(i.cv) === !1 || i.val(i.cv)
                }), this
            }, this._mouse = function (t) {
                var n = function (t) {
                    var e = i.xy2val(t.pageX, t.pageY);
                    e != i.cv && (i.cH && i.cH(e) === !1 || (i.change(i._validate(e)), i._draw()))
                };
                return n(t), e.c.d.bind("mousemove.k", n).bind("keyup.k", function (t) {
                    if (27 === t.keyCode) {
                        if (e.c.d.unbind("mouseup.k mousemove.k keyup.k"), i.eH && i.eH() === !1) return;
                        i.cancel()
                    }
                }).bind("mouseup.k", function () {
                    e.c.d.unbind("mousemove.k mouseup.k keyup.k"), i.rH && i.rH(i.cv) === !1 || i.val(i.cv)
                }), this
            }, this._xy = function () {
                var t = this.$c.offset();
                return this.x = t.left, this.y = t.top, this
            }, this._listen = function () {
                return this.o.readOnly ? this.$.attr("readonly", "readonly") : (this.$c.bind("mousedown", function (t) {
                    t.preventDefault(), i._xy()._mouse(t)
                }).bind("touchstart", function (t) {
                    t.preventDefault(), i._xy()._touch(t)
                }), this.listen()), this
            }, this._configure = function () {
                return this.o.draw && (this.dH = this.o.draw), this.o.change && (this.cH = this.o.change), this.o.cancel && (this.eH = this.o.cancel), this.o.release && (this.rH = this.o.release), this.o.displayPrevious ? (this.pColor = this.h2rgba(this.o.fgColor, "0.4"), this.fgColor = this.h2rgba(this.o.fgColor, "0.6")) : this.fgColor = this.o.fgColor, this
            }, this._clear = function () {
                this.$c[0].width = this.$c[0].width
            }, this._validate = function (t) {
                return ~~((0 > t ? -.5 : .5) + t / this.o.step) * this.o.step
            }, this.listen = function () {}, this.extend = function () {}, this.init = function () {}, this.change = function () {}, this.val = function () {}, this.xy2val = function () {}, this.draw = function () {}, this.clear = function () {
                this._clear()
            }, this.h2rgba = function (t, e) {
                var i;
                return t = t.substring(1, 7), i = [parseInt(t.substring(0, 2), 16), parseInt(t.substring(2, 4), 16), parseInt(t.substring(4, 6), 16)], "rgba(" + i[0] + "," + i[1] + "," + i[2] + "," + e + ")"
            }, this.copy = function (t, e) {
                for (var i in t) e[i] = t[i]
            }
        }, e.Dial = function () {
            e.o.call(this), this.startAngle = null, this.xy = null, this.radius = null, this.lineWidth = null, this.cursorExt = null, this.w2 = null, this.PI2 = 2 * Math.PI, this.extend = function () {
                this.o = t.extend({
                    bgColor: this.$.data("bgcolor") || "#EEEEEE",
                    angleOffset: this.$.data("angleoffset") || 0,
                    angleArc: this.$.data("anglearc") || 360,
                    inline: !0
                }, this.o)
            }, this.val = function (t) {
                return null == t ? this.v : (this.cv = this.o.stopper ? i(n(t, this.o.max), this.o.min) : t, this.v = this.cv, this.$.val(this.v), this._draw(), void 0)
            }, this.xy2val = function (t, e) {
                var a, r;
                return a = Math.atan2(t - (this.x + this.w2), -(e - this.y - this.w2)) - this.angleOffset, this.angleArc != this.PI2 && 0 > a && a > -.5 ? a = 0 : 0 > a && (a += this.PI2), r = ~~(.5 + a * (this.o.max - this.o.min) / this.angleArc) + this.o.min, this.o.stopper && (r = i(n(r, this.o.max), this.o.min)), r
            }, this.listen = function () {
                var e, a, r = this,
                    s = function (t) {
                        t.preventDefault();
                        var e = t.originalEvent,
                            i = e.detail || e.wheelDeltaX,
                            n = e.detail || e.wheelDeltaY,
                            a = parseInt(r.$.val()) + (i > 0 || n > 0 ? r.o.step : 0 > i || 0 > n ? -r.o.step : 0);
                        r.cH && r.cH(a) === !1 || r.val(a)
                    },
                    o = 1,
                    l = {
                        37: -r.o.step,
                        38: r.o.step,
                        39: r.o.step,
                        40: -r.o.step
                    };
                this.$.bind("keydown", function (s) {
                    var h = s.keyCode;
                    if (h >= 96 && 105 >= h && (h = s.keyCode = h - 48), e = parseInt(String.fromCharCode(h)), isNaN(e) && (13 !== h && 8 !== h && 9 !== h && 189 !== h && s.preventDefault(), t.inArray(h, [37, 38, 39, 40]) > -1)) {
                        s.preventDefault();
                        var c = parseInt(r.$.val()) + l[h] * o;
                        r.o.stopper && (c = i(n(c, r.o.max), r.o.min)), r.change(c), r._draw(), a = window.setTimeout(function () {
                            o *= 2
                        }, 30)
                    }
                }).bind("keyup", function () {
                    isNaN(e) ? a && (window.clearTimeout(a), a = null, o = 1, r.val(r.$.val())) : r.$.val() > r.o.max && r.$.val(r.o.max) || r.$.val() < r.o.min && r.$.val(r.o.min)
                }), this.$c.bind("mousewheel DOMMouseScroll", s), this.$.bind("mousewheel DOMMouseScroll", s)
            }, this.init = function () {
                (this.v < this.o.min || this.v > this.o.max) && (this.v = this.o.min), this.$.val(this.v), this.w2 = this.o.width / 2, this.cursorExt = this.o.cursor / 100, this.xy = this.w2 * this.scale, this.lineWidth = this.xy * this.o.thickness, this.lineCap = this.o.lineCap, this.radius = this.xy - this.lineWidth / 2, this.o.angleOffset && (this.o.angleOffset = isNaN(this.o.angleOffset) ? 0 : this.o.angleOffset), this.o.angleArc && (this.o.angleArc = isNaN(this.o.angleArc) ? this.PI2 : this.o.angleArc), this.angleOffset = this.o.angleOffset * Math.PI / 180, this.angleArc = this.o.angleArc * Math.PI / 180, this.startAngle = 1.5 * Math.PI + this.angleOffset, this.endAngle = 1.5 * Math.PI + this.angleOffset + this.angleArc;
                var t = i(String(Math.abs(this.o.max)).length, String(Math.abs(this.o.min)).length, 2) + 2;
                this.o.displayInput && this.i.css({
                    width: (this.o.width / 2 + 4 >> 0) + "px",
                    height: (this.o.width / 3 >> 0) + "px",
                    position: "absolute",
                    "vertical-align": "middle",
                    "margin-top": (this.o.width / 3 >> 0) + "px",
                    "margin-left": "-" + (3 * this.o.width / 4 + 2 >> 0) + "px",
                    border: 0,
                    background: "none",
                    font: this.o.fontWeight + " " + (this.o.width / t >> 0) + "px " + this.o.font,
                    "text-align": "center",
                    color: this.o.inputColor || this.o.fgColor,
                    padding: "0px",
                    "-webkit-appearance": "none"
                }) || this.i.css({
                    width: "0px",
                    visibility: "hidden"
                })
            }, this.change = function (t) {
                this.cv = t, this.$.val(t)
            }, this.angle = function (t) {
                return (t - this.o.min) * this.angleArc / (this.o.max - this.o.min)
            }, this.draw = function () {
                var t, e, i = this.g,
                    n = this.angle(this.cv),
                    a = this.startAngle,
                    r = a + n,
                    s = 1;
                i.lineWidth = this.lineWidth, i.lineCap = this.lineCap, this.o.cursor && (a = r - this.cursorExt) && (r += this.cursorExt), i.beginPath(), i.strokeStyle = this.o.bgColor, i.arc(this.xy, this.xy, this.radius, this.endAngle, this.startAngle, !0), i.stroke(), this.o.displayPrevious && (e = this.startAngle + this.angle(this.v), t = this.startAngle, this.o.cursor && (t = e - this.cursorExt) && (e += this.cursorExt), i.beginPath(), i.strokeStyle = this.pColor, i.arc(this.xy, this.xy, this.radius, t, e, !1), i.stroke(), s = this.cv == this.v), i.beginPath(), i.strokeStyle = s ? this.o.fgColor : this.fgColor, i.arc(this.xy, this.xy, this.radius, a, r, !1), i.stroke()
            }, this.cancel = function () {
                this.val(this.v)
            }
        }, t.fn.dial = t.fn.knob = function (i) {
            return this.each(function () {
                var n = new e.Dial;
                n.o = i, n.$ = t(this), n.run()
            }).parent()
        }
    }(jQuery),
    /* Javascript plotting library for jQuery, version 0.8.1.

    Copyright (c) 2007-2013 IOLA and Ole Laursen.
    Licensed under the MIT license.

    */
    function (t) {
        t.color = {}, t.color.make = function (e, i, n, a) {
            var r = {};
            return r.r = e || 0, r.g = i || 0, r.b = n || 0, r.a = null != a ? a : 1, r.add = function (t, e) {
                for (var i = 0; i < t.length; ++i) r[t.charAt(i)] += e;
                return r.normalize()
            }, r.scale = function (t, e) {
                for (var i = 0; i < t.length; ++i) r[t.charAt(i)] *= e;
                return r.normalize()
            }, r.toString = function () {
                return r.a >= 1 ? "rgb(" + [r.r, r.g, r.b].join(",") + ")" : "rgba(" + [r.r, r.g, r.b, r.a].join(",") + ")"
            }, r.normalize = function () {
                function t(t, e, i) {
                    return t > e ? t : e > i ? i : e
                }
                return r.r = t(0, parseInt(r.r), 255), r.g = t(0, parseInt(r.g), 255), r.b = t(0, parseInt(r.b), 255), r.a = t(0, r.a, 1), r
            }, r.clone = function () {
                return t.color.make(r.r, r.b, r.g, r.a)
            }, r.normalize()
        }, t.color.extract = function (e, i) {
            var n;
            do {
                if (n = e.css(i).toLowerCase(), "" != n && "transparent" != n) break;
                e = e.parent()
            } while (!t.nodeName(e.get(0), "body"));
            return "rgba(0, 0, 0, 0)" == n && (n = "transparent"), t.color.parse(n)
        }, t.color.parse = function (i) {
            var n, a = t.color.make;
            if (n = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(i)) return a(parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10));
            if (n = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(i)) return a(parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10), parseFloat(n[4]));
            if (n = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(i)) return a(2.55 * parseFloat(n[1]), 2.55 * parseFloat(n[2]), 2.55 * parseFloat(n[3]));
            if (n = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(i)) return a(2.55 * parseFloat(n[1]), 2.55 * parseFloat(n[2]), 2.55 * parseFloat(n[3]), parseFloat(n[4]));
            if (n = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(i)) return a(parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16));
            if (n = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(i)) return a(parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16));
            var r = t.trim(i).toLowerCase();
            return "transparent" == r ? a(255, 255, 255, 0) : (n = e[r] || [0, 0, 0], a(n[0], n[1], n[2]))
        };
        var e = {
            aqua: [0, 255, 255],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            black: [0, 0, 0],
            blue: [0, 0, 255],
            brown: [165, 42, 42],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgrey: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkviolet: [148, 0, 211],
            fuchsia: [255, 0, 255],
            gold: [255, 215, 0],
            green: [0, 128, 0],
            indigo: [75, 0, 130],
            khaki: [240, 230, 140],
            lightblue: [173, 216, 230],
            lightcyan: [224, 255, 255],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            navy: [0, 0, 128],
            olive: [128, 128, 0],
            orange: [255, 165, 0],
            pink: [255, 192, 203],
            purple: [128, 0, 128],
            violet: [128, 0, 128],
            red: [255, 0, 0],
            silver: [192, 192, 192],
            white: [255, 255, 255],
            yellow: [255, 255, 0]
        }
    }(jQuery),
    function (t) {
        function e(e, i) {
            var n = i.children("." + e)[0];
            if (null == n && (n = document.createElement("canvas"), n.className = e, t(n).css({
                direction: "ltr",
                position: "absolute",
                left: 0,
                top: 0
            }).appendTo(i), !n.getContext)) {
                if (!window.G_vmlCanvasManager) throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
                n = window.G_vmlCanvasManager.initElement(n)
            }
            this.element = n;
            var a = this.context = n.getContext("2d"),
                r = window.devicePixelRatio || 1,
                s = a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio || a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || a.backingStorePixelRatio || 1;
            this.pixelRatio = r / s, this.resize(i.width(), i.height()), this.textContainer = null, this.text = {}, this._textCache = {}
        }

        function i(i, a, r, s) {
            function o(t, e) {
                e = [me].concat(e);
                for (var i = 0; i < t.length; ++i) t[i].apply(this, e)
            }

            function l() {
                for (var i = {
                    Canvas: e
                }, n = 0; n < s.length; ++n) {
                    var a = s[n];
                    a.init(me, i), a.options && t.extend(!0, ae, a.options)
                }
            }

            function h(e) {
                t.extend(!0, ae, e), e && e.colors && (ae.colors = e.colors), null == ae.xaxis.color && (ae.xaxis.color = t.color.parse(ae.grid.color).scale("a", .22).toString()), null == ae.yaxis.color && (ae.yaxis.color = t.color.parse(ae.grid.color).scale("a", .22).toString()), null == ae.xaxis.tickColor && (ae.xaxis.tickColor = ae.grid.tickColor || ae.xaxis.color), null == ae.yaxis.tickColor && (ae.yaxis.tickColor = ae.grid.tickColor || ae.yaxis.color), null == ae.grid.borderColor && (ae.grid.borderColor = ae.grid.color), null == ae.grid.tickColor && (ae.grid.tickColor = t.color.parse(ae.grid.color).scale("a", .22).toString());
                var n, a, r, s = {
                    style: i.css("font-style"),
                    size: Math.round(.8 * (+i.css("font-size").replace("px", "") || 13)),
                    variant: i.css("font-variant"),
                    weight: i.css("font-weight"),
                    family: i.css("font-family")
                };
                for (s.lineHeight = 1.15 * s.size, r = ae.xaxes.length || 1, n = 0; r > n; ++n) a = ae.xaxes[n], a && !a.tickColor && (a.tickColor = a.color), a = t.extend(!0, {}, ae.xaxis, a), ae.xaxes[n] = a, a.font && (a.font = t.extend({}, s, a.font), a.font.color || (a.font.color = a.color));
                for (r = ae.yaxes.length || 1, n = 0; r > n; ++n) a = ae.yaxes[n], a && !a.tickColor && (a.tickColor = a.color), a = t.extend(!0, {}, ae.yaxis, a), ae.yaxes[n] = a, a.font && (a.font = t.extend({}, s, a.font), a.font.color || (a.font.color = a.color));
                for (ae.xaxis.noTicks && null == ae.xaxis.ticks && (ae.xaxis.ticks = ae.xaxis.noTicks), ae.yaxis.noTicks && null == ae.yaxis.ticks && (ae.yaxis.ticks = ae.yaxis.noTicks), ae.x2axis && (ae.xaxes[1] = t.extend(!0, {}, ae.xaxis, ae.x2axis), ae.xaxes[1].position = "top"), ae.y2axis && (ae.yaxes[1] = t.extend(!0, {}, ae.yaxis, ae.y2axis), ae.yaxes[1].position = "right"), ae.grid.coloredAreas && (ae.grid.markings = ae.grid.coloredAreas), ae.grid.coloredAreasColor && (ae.grid.markingsColor = ae.grid.coloredAreasColor), ae.lines && t.extend(!0, ae.series.lines, ae.lines), ae.points && t.extend(!0, ae.series.points, ae.points), ae.bars && t.extend(!0, ae.series.bars, ae.bars), null != ae.shadowSize && (ae.series.shadowSize = ae.shadowSize), null != ae.highlightColor && (ae.series.highlightColor = ae.highlightColor), n = 0; n < ae.xaxes.length; ++n) m(ce, n + 1).options = ae.xaxes[n];
                for (n = 0; n < ae.yaxes.length; ++n) m(ue, n + 1).options = ae.yaxes[n];
                for (var l in ge) ae.hooks[l] && ae.hooks[l].length && (ge[l] = ge[l].concat(ae.hooks[l]));
                o(ge.processOptions, [ae])
            }

            function c(t) {
                ne = u(t), v(), b()
            }

            function u(e) {
                for (var i = [], n = 0; n < e.length; ++n) {
                    var a = t.extend(!0, {}, ae.series);
                    null != e[n].data ? (a.data = e[n].data, delete e[n].data, t.extend(!0, a, e[n]), e[n].data = a.data) : a.data = e[n], i.push(a)
                }
                return i
            }

            function d(t, e) {
                var i = t[e + "axis"];
                return "object" == typeof i && (i = i.n), "number" != typeof i && (i = 1), i
            }

            function f() {
                return t.grep(ce.concat(ue), function (t) {
                    return t
                })
            }

            function p(t) {
                var e, i, n = {};
                for (e = 0; e < ce.length; ++e) i = ce[e], i && i.used && (n["x" + i.n] = i.c2p(t.left));
                for (e = 0; e < ue.length; ++e) i = ue[e], i && i.used && (n["y" + i.n] = i.c2p(t.top));
                return void 0 !== n.x1 && (n.x = n.x1), void 0 !== n.y1 && (n.y = n.y1), n
            }

            function g(t) {
                var e, i, n, a = {};
                for (e = 0; e < ce.length; ++e)
                    if (i = ce[e], i && i.used && (n = "x" + i.n, null == t[n] && 1 == i.n && (n = "x"), null != t[n])) {
                        a.left = i.p2c(t[n]);
                        break
                    }
                for (e = 0; e < ue.length; ++e)
                    if (i = ue[e], i && i.used && (n = "y" + i.n, null == t[n] && 1 == i.n && (n = "y"), null != t[n])) {
                        a.top = i.p2c(t[n]);
                        break
                    }
                return a
            }

            function m(e, i) {
                return e[i - 1] || (e[i - 1] = {
                    n: i,
                    direction: e == ce ? "x" : "y",
                    options: t.extend(!0, {}, e == ce ? ae.xaxis : ae.yaxis)
                }), e[i - 1]
            }

            function v() {
                var e, i = ne.length,
                    n = -1;
                for (e = 0; e < ne.length; ++e) {
                    var a = ne[e].color;
                    null != a && (i--, "number" == typeof a && a > n && (n = a))
                }
                n >= i && (i = n + 1);
                var r, s = [],
                    o = ae.colors,
                    l = o.length,
                    h = 0;
                for (e = 0; i > e; e++) r = t.color.parse(o[e % l] || "#666"), 0 == e % l && e && (h = h >= 0 ? .5 > h ? -h - .2 : 0 : -h), s[e] = r.scale("rgb", 1 + h);
                var c, u = 0;
                for (e = 0; e < ne.length; ++e) {
                    if (c = ne[e], null == c.color ? (c.color = s[u].toString(), ++u) : "number" == typeof c.color && (c.color = s[c.color].toString()), null == c.lines.show) {
                        var f, p = !0;
                        for (f in c)
                            if (c[f] && c[f].show) {
                                p = !1;
                                break
                            }
                        p && (c.lines.show = !0)
                    }
                    null == c.lines.zero && (c.lines.zero = !!c.lines.fill), c.xaxis = m(ce, d(c, "x")), c.yaxis = m(ue, d(c, "y"))
                }
            }

            function b() {
                function e(t, e, i) {
                    e < t.datamin && e != -b && (t.datamin = e), i > t.datamax && i != b && (t.datamax = i)
                }
                var i, n, a, r, s, l, h, c, u, d, p, g, m = Number.POSITIVE_INFINITY,
                    v = Number.NEGATIVE_INFINITY,
                    b = Number.MAX_VALUE;
                for (t.each(f(), function (t, e) {
                    e.datamin = m, e.datamax = v, e.used = !1
                }), i = 0; i < ne.length; ++i) s = ne[i], s.datapoints = {
                    points: []
                }, o(ge.processRawData, [s, s.data, s.datapoints]);
                for (i = 0; i < ne.length; ++i) {
                    if (s = ne[i], p = s.data, g = s.datapoints.format, !g) {
                        if (g = [], g.push({
                            x: !0,
                            number: !0,
                            required: !0
                        }), g.push({
                            y: !0,
                            number: !0,
                            required: !0
                        }), s.bars.show || s.lines.show && s.lines.fill) {
                            var y = !!(s.bars.show && s.bars.zero || s.lines.show && s.lines.zero);
                            g.push({
                                y: !0,
                                number: !0,
                                required: !1,
                                defaultValue: 0,
                                autoscale: y
                            }), s.bars.horizontal && (delete g[g.length - 1].y, g[g.length - 1].x = !0)
                        }
                        s.datapoints.format = g
                    }
                    if (null == s.datapoints.pointsize) {
                        s.datapoints.pointsize = g.length, h = s.datapoints.pointsize, l = s.datapoints.points;
                        var x = s.lines.show && s.lines.steps;
                        for (s.xaxis.used = s.yaxis.used = !0, n = a = 0; n < p.length; ++n, a += h) {
                            d = p[n];
                            var w = null == d;
                            if (!w)
                                for (r = 0; h > r; ++r) c = d[r], u = g[r], u && (u.number && null != c && (c = +c, isNaN(c) ? c = null : 1 / 0 == c ? c = b : c == -1 / 0 && (c = -b)), null == c && (u.required && (w = !0), null != u.defaultValue && (c = u.defaultValue))), l[a + r] = c;
                            if (w)
                                for (r = 0; h > r; ++r) c = l[a + r], null != c && (u = g[r], u.autoscale && (u.x && e(s.xaxis, c, c), u.y && e(s.yaxis, c, c))), l[a + r] = null;
                            else if (x && a > 0 && null != l[a - h] && l[a - h] != l[a] && l[a - h + 1] != l[a + 1]) {
                                for (r = 0; h > r; ++r) l[a + h + r] = l[a + r];
                                l[a + 1] = l[a - h + 1], a += h
                            }
                        }
                    }
                }
                for (i = 0; i < ne.length; ++i) s = ne[i], o(ge.processDatapoints, [s, s.datapoints]);
                for (i = 0; i < ne.length; ++i) {
                    s = ne[i], l = s.datapoints.points, h = s.datapoints.pointsize, g = s.datapoints.format;
                    var _ = m,
                        C = m,
                        k = v,
                        S = v;
                    for (n = 0; n < l.length; n += h)
                        if (null != l[n])
                            for (r = 0; h > r; ++r) c = l[n + r], u = g[r], u && u.autoscale !== !1 && c != b && c != -b && (u.x && (_ > c && (_ = c), c > k && (k = c)), u.y && (C > c && (C = c), c > S && (S = c)));
                    if (s.bars.show) {
                        var D;
                        switch (s.bars.align) {
                        case "left":
                            D = 0;
                            break;
                        case "right":
                            D = -s.bars.barWidth;
                            break;
                        case "center":
                            D = -s.bars.barWidth / 2;
                            break;
                        default:
                            throw new Error("Invalid bar alignment: " + s.bars.align)
                        }
                        s.bars.horizontal ? (C += D, S += D + s.bars.barWidth) : (_ += D, k += D + s.bars.barWidth)
                    }
                    e(s.xaxis, _, k), e(s.yaxis, C, S)
                }
                t.each(f(), function (t, e) {
                    e.datamin == m && (e.datamin = null), e.datamax == v && (e.datamax = null)
                })
            }

            function y() {
                i.css("padding", 0).children(":not(.flot-base,.flot-overlay)").remove(), "static" == i.css("position") && i.css("position", "relative"), re = new e("flot-base", i), se = new e("flot-overlay", i), le = re.context, he = se.context, oe = t(se.element).unbind();
                var n = i.data("plot");
                n && (n.shutdown(), se.clear()), i.data("plot", me)
            }

            function x() {
                ae.grid.hoverable && (oe.mousemove(Y), oe.bind("mouseleave", U)), ae.grid.clickable && oe.click(V), o(ge.bindEvents, [oe])
            }

            function w() {
                be && clearTimeout(be), oe.unbind("mousemove", Y), oe.unbind("mouseleave", U), oe.unbind("click", V), o(ge.shutdown, [oe])
            }

            function _(t) {
                function e(t) {
                    return t
                }
                var i, n, a = t.options.transform || e,
                    r = t.options.inverseTransform;
                "x" == t.direction ? (i = t.scale = fe / Math.abs(a(t.max) - a(t.min)), n = Math.min(a(t.max), a(t.min))) : (i = t.scale = pe / Math.abs(a(t.max) - a(t.min)), i = -i, n = Math.max(a(t.max), a(t.min))), t.p2c = a == e ? function (t) {
                    return (t - n) * i
                } : function (t) {
                    return (a(t) - n) * i
                }, t.c2p = r ? function (t) {
                    return r(n + t / i)
                } : function (t) {
                    return n + t / i
                }
            }

            function C(t) {
                var e = t.options,
                    i = t.ticks || [],
                    n = e.labelWidth || 0,
                    a = e.labelHeight || 0,
                    r = n || "x" == t.direction ? Math.floor(re.width / (i.length || 1)) : null;
                legacyStyles = t.direction + "Axis " + t.direction + t.n + "Axis", layer = "flot-" + t.direction + "-axis flot-" + t.direction + t.n + "-axis " + legacyStyles, font = e.font || "flot-tick-label tickLabel";
                for (var s = 0; s < i.length; ++s) {
                    var o = i[s];
                    if (o.label) {
                        var l = re.getTextInfo(layer, o.label, font, null, r);
                        n = Math.max(n, l.width), a = Math.max(a, l.height)
                    }
                }
                t.labelWidth = e.labelWidth || n, t.labelHeight = e.labelHeight || a
            }

            function k(e) {
                var i, n = e.labelWidth,
                    a = e.labelHeight,
                    r = e.options.position,
                    s = e.options.tickLength,
                    o = ae.grid.axisMargin,
                    l = ae.grid.labelMargin,
                    h = "x" == e.direction ? ce : ue,
                    c = t.grep(h, function (t) {
                        return t && t.options.position == r && t.reserveSpace
                    });
                if (t.inArray(e, c) == c.length - 1 && (o = 0), null == s) {
                    var u = t.grep(h, function (t) {
                        return t && t.reserveSpace
                    });
                    i = 0 == t.inArray(e, u), s = i ? "full" : 5
                }
                isNaN(+s) || (l += +s), "x" == e.direction ? (a += l, "bottom" == r ? (de.bottom += a + o, e.box = {
                    top: re.height - de.bottom,
                    height: a
                }) : (e.box = {
                    top: de.top + o,
                    height: a
                }, de.top += a + o)) : (n += l, "left" == r ? (e.box = {
                    left: de.left + o,
                    width: n
                }, de.left += n + o) : (de.right += n + o, e.box = {
                    left: re.width - de.right,
                    width: n
                })), e.position = r, e.tickLength = s, e.box.padding = l, e.innermost = i
            }

            function S(t) {
                "x" == t.direction ? (t.box.left = de.left - t.labelWidth / 2, t.box.width = re.width - de.left - de.right + t.labelWidth) : (t.box.top = de.top - t.labelHeight / 2, t.box.height = re.height - de.bottom - de.top + t.labelHeight)
            }

            function D() {
                var e, i = ae.grid.minBorderMargin,
                    n = {
                        x: 0,
                        y: 0
                    };
                if (null == i)
                    for (i = 0, e = 0; e < ne.length; ++e) i = Math.max(i, 2 * (ne[e].points.radius + ne[e].points.lineWidth / 2));
                n.x = n.y = Math.ceil(i), t.each(f(), function (t, e) {
                    var i = e.direction;
                    e.reserveSpace && (n[i] = Math.ceil(Math.max(n[i], ("x" == i ? e.labelWidth : e.labelHeight) / 2)))
                }), de.left = Math.max(n.x, de.left), de.right = Math.max(n.x, de.right), de.top = Math.max(n.y, de.top), de.bottom = Math.max(n.y, de.bottom)
            }

            function T() {
                var e, i = f(),
                    n = ae.grid.show;
                for (var a in de) {
                    var r = ae.grid.margin || 0;
                    de[a] = "number" == typeof r ? r : r[a] || 0
                }
                o(ge.processOffset, [de]);
                for (var a in de) de[a] += "object" == typeof ae.grid.borderWidth ? n ? ae.grid.borderWidth[a] : 0 : n ? ae.grid.borderWidth : 0;
                if (t.each(i, function (t, e) {
                    e.show = e.options.show, null == e.show && (e.show = e.used), e.reserveSpace = e.show || e.options.reserveSpace, F(e)
                }), n) {
                    var s = t.grep(i, function (t) {
                        return t.reserveSpace
                    });
                    for (t.each(s, function (t, e) {
                        M(e), A(e), I(e, e.ticks), C(e)
                    }), e = s.length - 1; e >= 0; --e) k(s[e]);
                    D(), t.each(s, function (t, e) {
                        S(e)
                    })
                }
                fe = re.width - de.left - de.right, pe = re.height - de.bottom - de.top, t.each(i, function (t, e) {
                    _(e)
                }), n && H(), $()
            }

            function F(t) {
                var e = t.options,
                    i = +(null != e.min ? e.min : t.datamin),
                    n = +(null != e.max ? e.max : t.datamax),
                    a = n - i;
                if (0 == a) {
                    var r = 0 == n ? 1 : .01;
                    null == e.min && (i -= r), (null == e.max || null != e.min) && (n += r)
                } else {
                    var s = e.autoscaleMargin;
                    null != s && (null == e.min && (i -= a * s, 0 > i && null != t.datamin && t.datamin >= 0 && (i = 0)), null == e.max && (n += a * s, n > 0 && null != t.datamax && t.datamax <= 0 && (n = 0)))
                }
                t.min = i, t.max = n
            }

            function M(e) {
                var i, a = e.options;
                i = "number" == typeof a.ticks && a.ticks > 0 ? a.ticks : .3 * Math.sqrt("x" == e.direction ? re.width : re.height);
                var r = (e.max - e.min) / i,
                    s = -Math.floor(Math.log(r) / Math.LN10),
                    o = a.tickDecimals;
                null != o && s > o && (s = o);
                var l, h = Math.pow(10, -s),
                    c = r / h;
                if (1.5 > c ? l = 1 : 3 > c ? (l = 2, c > 2.25 && (null == o || o >= s + 1) && (l = 2.5, ++s)) : l = 7.5 > c ? 5 : 10, l *= h, null != a.minTickSize && l < a.minTickSize && (l = a.minTickSize), e.delta = r, e.tickDecimals = Math.max(0, null != o ? o : s), e.tickSize = a.tickSize || l, "time" == a.mode && !e.tickGenerator) throw new Error("Time mode requires the flot.time plugin.");
                if (e.tickGenerator || (e.tickGenerator = function (t) {
                    var e, i = [],
                        a = n(t.min, t.tickSize),
                        r = 0,
                        s = Number.NaN;
                    do e = s, s = a + r * t.tickSize, i.push(s), ++r; while (s < t.max && s != e);
                    return i
                }, e.tickFormatter = function (t, e) {
                    var i = e.tickDecimals ? Math.pow(10, e.tickDecimals) : 1,
                        n = "" + Math.round(t * i) / i;
                    if (null != e.tickDecimals) {
                        var a = n.indexOf("."),
                            r = -1 == a ? 0 : n.length - a - 1;
                        if (r < e.tickDecimals) return (r ? n : n + ".") + ("" + i).substr(1, e.tickDecimals - r)
                    }
                    return n
                }), t.isFunction(a.tickFormatter) && (e.tickFormatter = function (t, e) {
                    return "" + a.tickFormatter(t, e)
                }), null != a.alignTicksWithAxis) {
                    var u = ("x" == e.direction ? ce : ue)[a.alignTicksWithAxis - 1];
                    if (u && u.used && u != e) {
                        var d = e.tickGenerator(e);
                        if (d.length > 0 && (null == a.min && (e.min = Math.min(e.min, d[0])), null == a.max && d.length > 1 && (e.max = Math.max(e.max, d[d.length - 1]))), e.tickGenerator = function (t) {
                            var e, i, n = [];
                            for (i = 0; i < u.ticks.length; ++i) e = (u.ticks[i].v - u.min) / (u.max - u.min), e = t.min + e * (t.max - t.min), n.push(e);
                            return n
                        }, !e.mode && null == a.tickDecimals) {
                            var f = Math.max(0, -Math.floor(Math.log(e.delta) / Math.LN10) + 1),
                                p = e.tickGenerator(e);
                            p.length > 1 && /\..*0$/.test((p[1] - p[0]).toFixed(f)) || (e.tickDecimals = f)
                        }
                    }
                }
            }

            function A(e) {
                var i = e.options.ticks,
                    n = [];
                null == i || "number" == typeof i && i > 0 ? n = e.tickGenerator(e) : i && (n = t.isFunction(i) ? i(e) : i);
                var a, r;
                for (e.ticks = [], a = 0; a < n.length; ++a) {
                    var s = null,
                        o = n[a];
                    "object" == typeof o ? (r = +o[0], o.length > 1 && (s = o[1])) : r = +o, null == s && (s = e.tickFormatter(r, e)), isNaN(r) || e.ticks.push({
                        v: r,
                        label: s
                    })
                }
            }

            function I(t, e) {
                t.options.autoscaleMargin && e.length > 0 && (null == t.options.min && (t.min = Math.min(t.min, e[0].v)), null == t.options.max && e.length > 1 && (t.max = Math.max(t.max, e[e.length - 1].v)))
            }

            function E() {
                re.clear(), o(ge.drawBackground, [le]);
                var t = ae.grid;
                t.show && t.backgroundColor && R(), t.show && !t.aboveData && P();
                for (var e = 0; e < ne.length; ++e) o(ge.drawSeries, [le, ne[e]]), N(ne[e]);
                o(ge.draw, [le]), t.show && t.aboveData && P(), re.render(), G()
            }

            function L(t, e) {
                for (var i, n, a, r, s = f(), o = 0; o < s.length; ++o)
                    if (i = s[o], i.direction == e && (r = e + i.n + "axis", !t[r] && 1 == i.n && (r = e + "axis"), t[r])) {
                        n = t[r].from, a = t[r].to;
                        break
                    }
                if (t[r] || (i = "x" == e ? ce[0] : ue[0], n = t[e + "1"], a = t[e + "2"]), null != n && null != a && n > a) {
                    var l = n;
                    n = a, a = l
                }
                return {
                    from: n,
                    to: a,
                    axis: i
                }
            }

            function R() {
                le.save(), le.translate(de.left, de.top), le.fillStyle = ie(ae.grid.backgroundColor, pe, 0, "rgba(255, 255, 255, 0)"), le.fillRect(0, 0, fe, pe), le.restore()
            }

            function P() {
                var e, i, n, a;
                le.save(), le.translate(de.left, de.top);
                var r = ae.grid.markings;
                if (r)
                    for (t.isFunction(r) && (i = me.getAxes(), i.xmin = i.xaxis.min, i.xmax = i.xaxis.max, i.ymin = i.yaxis.min, i.ymax = i.yaxis.max, r = r(i)), e = 0; e < r.length; ++e) {
                        var s = r[e],
                            o = L(s, "x"),
                            l = L(s, "y");
                        null == o.from && (o.from = o.axis.min), null == o.to && (o.to = o.axis.max), null == l.from && (l.from = l.axis.min), null == l.to && (l.to = l.axis.max), o.to < o.axis.min || o.from > o.axis.max || l.to < l.axis.min || l.from > l.axis.max || (o.from = Math.max(o.from, o.axis.min), o.to = Math.min(o.to, o.axis.max), l.from = Math.max(l.from, l.axis.min), l.to = Math.min(l.to, l.axis.max), (o.from != o.to || l.from != l.to) && (o.from = o.axis.p2c(o.from), o.to = o.axis.p2c(o.to), l.from = l.axis.p2c(l.from), l.to = l.axis.p2c(l.to), o.from == o.to || l.from == l.to ? (le.beginPath(), le.strokeStyle = s.color || ae.grid.markingsColor, le.lineWidth = s.lineWidth || ae.grid.markingsLineWidth, le.moveTo(o.from, l.from), le.lineTo(o.to, l.to), le.stroke()) : (le.fillStyle = s.color || ae.grid.markingsColor, le.fillRect(o.from, l.to, o.to - o.from, l.from - l.to))))
                    }
                i = f(), n = ae.grid.borderWidth;
                for (var h = 0; h < i.length; ++h) {
                    var c, u, d, p, g = i[h],
                        m = g.box,
                        v = g.tickLength;
                    if (g.show && 0 != g.ticks.length) {
                        for (le.lineWidth = 1, "x" == g.direction ? (c = 0, u = "full" == v ? "top" == g.position ? 0 : pe : m.top - de.top + ("top" == g.position ? m.height : 0)) : (u = 0, c = "full" == v ? "left" == g.position ? 0 : fe : m.left - de.left + ("left" == g.position ? m.width : 0)), g.innermost || (le.strokeStyle = g.options.color, le.beginPath(), d = p = 0, "x" == g.direction ? d = fe + 1 : p = pe + 1, 1 == le.lineWidth && ("x" == g.direction ? u = Math.floor(u) + .5 : c = Math.floor(c) + .5), le.moveTo(c, u), le.lineTo(c + d, u + p), le.stroke()), le.strokeStyle = g.options.tickColor, le.beginPath(), e = 0; e < g.ticks.length; ++e) {
                            var b = g.ticks[e].v;
                            d = p = 0, isNaN(b) || b < g.min || b > g.max || "full" == v && ("object" == typeof n && n[g.position] > 0 || n > 0) && (b == g.min || b == g.max) || ("x" == g.direction ? (c = g.p2c(b), p = "full" == v ? -pe : v, "top" == g.position && (p = -p)) : (u = g.p2c(b), d = "full" == v ? -fe : v, "left" == g.position && (d = -d)), 1 == le.lineWidth && ("x" == g.direction ? c = Math.floor(c) + .5 : u = Math.floor(u) + .5), le.moveTo(c, u), le.lineTo(c + d, u + p))
                        }
                        le.stroke()
                    }
                }
                n && (a = ae.grid.borderColor, "object" == typeof n || "object" == typeof a ? ("object" != typeof n && (n = {
                    top: n,
                    right: n,
                    bottom: n,
                    left: n
                }), "object" != typeof a && (a = {
                    top: a,
                    right: a,
                    bottom: a,
                    left: a
                }), n.top > 0 && (le.strokeStyle = a.top, le.lineWidth = n.top, le.beginPath(), le.moveTo(0 - n.left, 0 - n.top / 2), le.lineTo(fe, 0 - n.top / 2), le.stroke()), n.right > 0 && (le.strokeStyle = a.right, le.lineWidth = n.right, le.beginPath(), le.moveTo(fe + n.right / 2, 0 - n.top), le.lineTo(fe + n.right / 2, pe), le.stroke()), n.bottom > 0 && (le.strokeStyle = a.bottom, le.lineWidth = n.bottom, le.beginPath(), le.moveTo(fe + n.right, pe + n.bottom / 2), le.lineTo(0, pe + n.bottom / 2), le.stroke()), n.left > 0 && (le.strokeStyle = a.left, le.lineWidth = n.left, le.beginPath(), le.moveTo(0 - n.left / 2, pe + n.bottom), le.lineTo(0 - n.left / 2, 0), le.stroke())) : (le.lineWidth = n, le.strokeStyle = ae.grid.borderColor, le.strokeRect(-n / 2, -n / 2, fe + n, pe + n))), le.restore()
            }

            function H() {
                t.each(f(), function (t, e) {
                    if (e.show && 0 != e.ticks.length) {
                        var i, n, a, r, s, o = e.box,
                            l = e.direction + "Axis " + e.direction + e.n + "Axis",
                            h = "flot-" + e.direction + "-axis flot-" + e.direction + e.n + "-axis " + l,
                            c = e.options.font || "flot-tick-label tickLabel";
                        re.removeText(h);
                        for (var u = 0; u < e.ticks.length; ++u) i = e.ticks[u], !i.label || i.v < e.min || i.v > e.max || ("x" == e.direction ? (r = "center", n = de.left + e.p2c(i.v), "bottom" == e.position ? a = o.top + o.padding : (a = o.top + o.height - o.padding, s = "bottom")) : (s = "middle", a = de.top + e.p2c(i.v), "left" == e.position ? (n = o.left + o.width - o.padding, r = "right") : n = o.left + o.padding), re.addText(h, n, a, i.label, c, null, null, r, s))
                    }
                })
            }

            function N(t) {
                t.lines.show && z(t), t.bars.show && W(t), t.points.show && B(t)
            }

            function z(t) {
                function e(t, e, i, n, a) {
                    var r = t.points,
                        s = t.pointsize,
                        o = null,
                        l = null;
                    le.beginPath();
                    for (var h = s; h < r.length; h += s) {
                        var c = r[h - s],
                            u = r[h - s + 1],
                            d = r[h],
                            f = r[h + 1];
                        if (null != c && null != d) {
                            if (f >= u && u < a.min) {
                                if (f < a.min) continue;
                                c = (a.min - u) / (f - u) * (d - c) + c, u = a.min
                            } else if (u >= f && f < a.min) {
                                if (u < a.min) continue;
                                d = (a.min - u) / (f - u) * (d - c) + c, f = a.min
                            }
                            if (u >= f && u > a.max) {
                                if (f > a.max) continue;
                                c = (a.max - u) / (f - u) * (d - c) + c, u = a.max
                            } else if (f >= u && f > a.max) {
                                if (u > a.max) continue;
                                d = (a.max - u) / (f - u) * (d - c) + c, f = a.max
                            }
                            if (d >= c && c < n.min) {
                                if (d < n.min) continue;
                                u = (n.min - c) / (d - c) * (f - u) + u, c = n.min
                            } else if (c >= d && d < n.min) {
                                if (c < n.min) continue;
                                f = (n.min - c) / (d - c) * (f - u) + u, d = n.min
                            }
                            if (c >= d && c > n.max) {
                                if (d > n.max) continue;
                                u = (n.max - c) / (d - c) * (f - u) + u, c = n.max
                            } else if (d >= c && d > n.max) {
                                if (c > n.max) continue;
                                f = (n.max - c) / (d - c) * (f - u) + u, d = n.max
                            }(c != o || u != l) && le.moveTo(n.p2c(c) + e, a.p2c(u) + i), o = d, l = f, le.lineTo(n.p2c(d) + e, a.p2c(f) + i)
                        }
                    }
                    le.stroke()
                }

                function i(t, e, i) {
                    for (var n = t.points, a = t.pointsize, r = Math.min(Math.max(0, i.min), i.max), s = 0, o = !1, l = 1, h = 0, c = 0; !(a > 0 && s > n.length + a);) {
                        s += a;
                        var u = n[s - a],
                            d = n[s - a + l],
                            f = n[s],
                            p = n[s + l];
                        if (o) {
                            if (a > 0 && null != u && null == f) {
                                c = s, a = -a, l = 2;
                                continue
                            }
                            if (0 > a && s == h + a) {
                                le.fill(), o = !1, a = -a, l = 1, s = h = c + a;
                                continue
                            }
                        }
                        if (null != u && null != f) {
                            if (f >= u && u < e.min) {
                                if (f < e.min) continue;
                                d = (e.min - u) / (f - u) * (p - d) + d, u = e.min
                            } else if (u >= f && f < e.min) {
                                if (u < e.min) continue;
                                p = (e.min - u) / (f - u) * (p - d) + d, f = e.min
                            }
                            if (u >= f && u > e.max) {
                                if (f > e.max) continue;
                                d = (e.max - u) / (f - u) * (p - d) + d, u = e.max
                            } else if (f >= u && f > e.max) {
                                if (u > e.max) continue;
                                p = (e.max - u) / (f - u) * (p - d) + d, f = e.max
                            }
                            if (o || (le.beginPath(), le.moveTo(e.p2c(u), i.p2c(r)), o = !0), d >= i.max && p >= i.max) le.lineTo(e.p2c(u), i.p2c(i.max)), le.lineTo(e.p2c(f), i.p2c(i.max));
                            else if (d <= i.min && p <= i.min) le.lineTo(e.p2c(u), i.p2c(i.min)), le.lineTo(e.p2c(f), i.p2c(i.min));
                            else {
                                var g = u,
                                    m = f;
                                p >= d && d < i.min && p >= i.min ? (u = (i.min - d) / (p - d) * (f - u) + u, d = i.min) : d >= p && p < i.min && d >= i.min && (f = (i.min - d) / (p - d) * (f - u) + u, p = i.min), d >= p && d > i.max && p <= i.max ? (u = (i.max - d) / (p - d) * (f - u) + u, d = i.max) : p >= d && p > i.max && d <= i.max && (f = (i.max - d) / (p - d) * (f - u) + u, p = i.max), u != g && le.lineTo(e.p2c(g), i.p2c(d)), le.lineTo(e.p2c(u), i.p2c(d)), le.lineTo(e.p2c(f), i.p2c(p)), f != m && (le.lineTo(e.p2c(f), i.p2c(p)), le.lineTo(e.p2c(m), i.p2c(p)))
                            }
                        }
                    }
                }
                le.save(), le.translate(de.left, de.top), le.lineJoin = "round";
                var n = t.lines.lineWidth,
                    a = t.shadowSize;
                if (n > 0 && a > 0) {
                    le.lineWidth = a, le.strokeStyle = "rgba(0,0,0,0.1)";
                    var r = Math.PI / 18;
                    e(t.datapoints, Math.sin(r) * (n / 2 + a / 2), Math.cos(r) * (n / 2 + a / 2), t.xaxis, t.yaxis), le.lineWidth = a / 2, e(t.datapoints, Math.sin(r) * (n / 2 + a / 4), Math.cos(r) * (n / 2 + a / 4), t.xaxis, t.yaxis)
                }
                le.lineWidth = n, le.strokeStyle = t.color;
                var s = O(t.lines, t.color, 0, pe);
                s && (le.fillStyle = s, i(t.datapoints, t.xaxis, t.yaxis)), n > 0 && e(t.datapoints, 0, 0, t.xaxis, t.yaxis), le.restore()
            }

            function B(t) {
                function e(t, e, i, n, a, r, s, o) {
                    for (var l = t.points, h = t.pointsize, c = 0; c < l.length; c += h) {
                        var u = l[c],
                            d = l[c + 1];
                        null == u || u < r.min || u > r.max || d < s.min || d > s.max || (le.beginPath(), u = r.p2c(u), d = s.p2c(d) + n, "circle" == o ? le.arc(u, d, e, 0, a ? Math.PI : 2 * Math.PI, !1) : o(le, u, d, e, a), le.closePath(), i && (le.fillStyle = i, le.fill()), le.stroke())
                    }
                }
                le.save(), le.translate(de.left, de.top);
                var i = t.points.lineWidth,
                    n = t.shadowSize,
                    a = t.points.radius,
                    r = t.points.symbol;
                if (0 == i && (i = 1e-4), i > 0 && n > 0) {
                    var s = n / 2;
                    le.lineWidth = s, le.strokeStyle = "rgba(0,0,0,0.1)", e(t.datapoints, a, null, s + s / 2, !0, t.xaxis, t.yaxis, r), le.strokeStyle = "rgba(0,0,0,0.2)", e(t.datapoints, a, null, s / 2, !0, t.xaxis, t.yaxis, r)
                }
                le.lineWidth = i, le.strokeStyle = t.color, e(t.datapoints, a, O(t.points, t.color), 0, !1, t.xaxis, t.yaxis, r), le.restore()
            }

            function j(t, e, i, n, a, r, s, o, l, h, c, u) {
                var d, f, p, g, m, v, b, y, x;
                c ? (y = v = b = !0, m = !1, d = i, f = t, g = e + n, p = e + a, d > f && (x = f, f = d, d = x, m = !0, v = !1)) : (m = v = b = !0, y = !1, d = t + n, f = t + a, p = i, g = e, p > g && (x = g, g = p, p = x, y = !0, b = !1)), f < o.min || d > o.max || g < l.min || p > l.max || (d < o.min && (d = o.min, m = !1), f > o.max && (f = o.max, v = !1), p < l.min && (p = l.min, y = !1), g > l.max && (g = l.max, b = !1), d = o.p2c(d), p = l.p2c(p), f = o.p2c(f), g = l.p2c(g), s && (h.beginPath(), h.moveTo(d, p), h.lineTo(d, g), h.lineTo(f, g), h.lineTo(f, p), h.fillStyle = s(p, g), h.fill()), u > 0 && (m || v || b || y) && (h.beginPath(), h.moveTo(d, p + r), m ? h.lineTo(d, g + r) : h.moveTo(d, g + r), b ? h.lineTo(f, g + r) : h.moveTo(f, g + r), v ? h.lineTo(f, p + r) : h.moveTo(f, p + r), y ? h.lineTo(d, p + r) : h.moveTo(d, p + r), h.stroke()))
            }

            function W(t) {
                function e(e, i, n, a, r, s, o) {
                    for (var l = e.points, h = e.pointsize, c = 0; c < l.length; c += h) null != l[c] && j(l[c], l[c + 1], l[c + 2], i, n, a, r, s, o, le, t.bars.horizontal, t.bars.lineWidth)
                }
                le.save(), le.translate(de.left, de.top), le.lineWidth = t.bars.lineWidth, le.strokeStyle = t.color;
                var i;
                switch (t.bars.align) {
                case "left":
                    i = 0;
                    break;
                case "right":
                    i = -t.bars.barWidth;
                    break;
                case "center":
                    i = -t.bars.barWidth / 2;
                    break;
                default:
                    throw new Error("Invalid bar alignment: " + t.bars.align)
                }
                var n = t.bars.fill ? function (e, i) {
                    return O(t.bars, t.color, e, i)
                } : null;
                e(t.datapoints, i, i + t.bars.barWidth, 0, n, t.xaxis, t.yaxis), le.restore()
            }

            function O(e, i, n, a) {
                var r = e.fill;
                if (!r) return null;
                if (e.fillColor) return ie(e.fillColor, n, a, i);
                var s = t.color.parse(i);
                return s.a = "number" == typeof r ? r : .4, s.normalize(), s.toString()
            }

            function $() {
                if (i.find(".legend").remove(), ae.legend.show) {
                    for (var e, n, a = [], r = [], s = !1, o = ae.legend.labelFormatter, l = 0; l < ne.length; ++l) e = ne[l], e.label && (n = o ? o(e.label, e) : e.label, n && r.push({
                        label: n,
                        color: e.color
                    }));
                    if (ae.legend.sorted)
                        if (t.isFunction(ae.legend.sorted)) r.sort(ae.legend.sorted);
                        else if ("reverse" == ae.legend.sorted) r.reverse();
                    else {
                        var h = "descending" != ae.legend.sorted;
                        r.sort(function (t, e) {
                            return t.label == e.label ? 0 : t.label < e.label != h ? 1 : -1
                        })
                    }
                    for (var l = 0; l < r.length; ++l) {
                        var c = r[l];
                        0 == l % ae.legend.noColumns && (s && a.push("</tr>"), a.push("<tr>"), s = !0), a.push('<td class="legendColorBox"><div style="border:1px solid ' + ae.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + c.color + ';overflow:hidden"></div></div></td>' + '<td class="legendLabel">' + c.label + "</td>")
                    }
                    if (s && a.push("</tr>"), 0 != a.length) {
                        var u = '<table style="font-size:smaller;color:' + ae.grid.color + '">' + a.join("") + "</table>";
                        if (null != ae.legend.container) t(ae.legend.container).html(u);
                        else {
                            var d = "",
                                f = ae.legend.position,
                                p = ae.legend.margin;
                            null == p[0] && (p = [p, p]), "n" == f.charAt(0) ? d += "top:" + (p[1] + de.top) + "px;" : "s" == f.charAt(0) && (d += "bottom:" + (p[1] + de.bottom) + "px;"), "e" == f.charAt(1) ? d += "right:" + (p[0] + de.right) + "px;" : "w" == f.charAt(1) && (d += "left:" + (p[0] + de.left) + "px;");
                            var g = t('<div class="legend">' + u.replace('style="', 'style="position:absolute;' + d + ";") + "</div>").appendTo(i);
                            if (0 != ae.legend.backgroundOpacity) {
                                var m = ae.legend.backgroundColor;
                                null == m && (m = ae.grid.backgroundColor, m = m && "string" == typeof m ? t.color.parse(m) : t.color.extract(g, "background-color"), m.a = 1, m = m.toString());
                                var v = g.children();
                                t('<div style="position:absolute;width:' + v.width() + "px;height:" + v.height() + "px;" + d + "background-color:" + m + ';"> </div>').prependTo(g).css("opacity", ae.legend.backgroundOpacity)
                            }
                        }
                    }
                }
            }

            function q(t, e, i) {
                var n, a, r, s = ae.grid.mouseActiveRadius,
                    o = s * s + 1,
                    l = null;
                for (n = ne.length - 1; n >= 0; --n)
                    if (i(ne[n])) {
                        var h = ne[n],
                            c = h.xaxis,
                            u = h.yaxis,
                            d = h.datapoints.points,
                            f = c.c2p(t),
                            p = u.c2p(e),
                            g = s / c.scale,
                            m = s / u.scale;
                        if (r = h.datapoints.pointsize, c.options.inverseTransform && (g = Number.MAX_VALUE), u.options.inverseTransform && (m = Number.MAX_VALUE), h.lines.show || h.points.show)
                            for (a = 0; a < d.length; a += r) {
                                var v = d[a],
                                    b = d[a + 1];
                                if (null != v && !(v - f > g || -g > v - f || b - p > m || -m > b - p)) {
                                    var y = Math.abs(c.p2c(v) - t),
                                        x = Math.abs(u.p2c(b) - e),
                                        w = y * y + x * x;
                                    o > w && (o = w, l = [n, a / r])
                                }
                            }
                        if (h.bars.show && !l) {
                            var _ = "left" == h.bars.align ? 0 : -h.bars.barWidth / 2,
                                C = _ + h.bars.barWidth;
                            for (a = 0; a < d.length; a += r) {
                                var v = d[a],
                                    b = d[a + 1],
                                    k = d[a + 2];
                                null != v && (ne[n].bars.horizontal ? f <= Math.max(k, v) && f >= Math.min(k, v) && p >= b + _ && b + C >= p : f >= v + _ && v + C >= f && p >= Math.min(k, b) && p <= Math.max(k, b)) && (l = [n, a / r])
                            }
                        }
                    }
                return l ? (n = l[0], a = l[1], r = ne[n].datapoints.pointsize, {
                    datapoint: ne[n].datapoints.points.slice(a * r, (a + 1) * r),
                    dataIndex: a,
                    series: ne[n],
                    seriesIndex: n
                }) : null
            }

            function Y(t) {
                ae.grid.hoverable && X("plothover", t, function (t) {
                    return 0 != t.hoverable
                })
            }

            function U(t) {
                ae.grid.hoverable && X("plothover", t, function () {
                    return !1
                })
            }

            function V(t) {
                X("plotclick", t, function (t) {
                    return 0 != t.clickable
                })
            }

            function X(t, e, n) {
                var a = oe.offset(),
                    r = e.pageX - a.left - de.left,
                    s = e.pageY - a.top - de.top,
                    o = p({
                        left: r,
                        top: s
                    });
                o.pageX = e.pageX, o.pageY = e.pageY;
                var l = q(r, s, n);
                if (l && (l.pageX = parseInt(l.series.xaxis.p2c(l.datapoint[0]) + a.left + de.left, 10), l.pageY = parseInt(l.series.yaxis.p2c(l.datapoint[1]) + a.top + de.top, 10)), ae.grid.autoHighlight) {
                    for (var h = 0; h < ve.length; ++h) {
                        var c = ve[h];
                        c.auto == t && (!l || c.series != l.series || c.point[0] != l.datapoint[0] || c.point[1] != l.datapoint[1]) && Z(c.series, c.point)
                    }
                    l && Q(l.series, l.datapoint, t)
                }
                i.trigger(t, [o, l])
            }

            function G() {
                var t = ae.interaction.redrawOverlayInterval;
                return -1 == t ? (J(), void 0) : (be || (be = setTimeout(J, t)), void 0)
            }

            function J() {
                be = null, he.save(), se.clear(), he.translate(de.left, de.top);
                var t, e;
                for (t = 0; t < ve.length; ++t) e = ve[t], e.series.bars.show ? ee(e.series, e.point) : te(e.series, e.point);
                he.restore(), o(ge.drawOverlay, [he])
            }

            function Q(t, e, i) {
                if ("number" == typeof t && (t = ne[t]), "number" == typeof e) {
                    var n = t.datapoints.pointsize;
                    e = t.datapoints.points.slice(n * e, n * (e + 1))
                }
                var a = K(t, e); - 1 == a ? (ve.push({
                    series: t,
                    point: e,
                    auto: i
                }), G()) : i || (ve[a].auto = !1)
            }

            function Z(t, e) {
                if (null == t && null == e) return ve = [], G(), void 0;
                if ("number" == typeof t && (t = ne[t]), "number" == typeof e) {
                    var i = t.datapoints.pointsize;
                    e = t.datapoints.points.slice(i * e, i * (e + 1))
                }
                var n = K(t, e); - 1 != n && (ve.splice(n, 1), G())
            }

            function K(t, e) {
                for (var i = 0; i < ve.length; ++i) {
                    var n = ve[i];
                    if (n.series == t && n.point[0] == e[0] && n.point[1] == e[1]) return i
                }
                return -1
            }

            function te(e, i) {
                var n = i[0],
                    a = i[1],
                    r = e.xaxis,
                    s = e.yaxis,
                    o = "string" == typeof e.highlightColor ? e.highlightColor : t.color.parse(e.color).scale("a", .5).toString();
                if (!(n < r.min || n > r.max || a < s.min || a > s.max)) {
                    var l = e.points.radius + e.points.lineWidth / 2;
                    he.lineWidth = l, he.strokeStyle = o;
                    var h = 1.5 * l;
                    n = r.p2c(n), a = s.p2c(a), he.beginPath(), "circle" == e.points.symbol ? he.arc(n, a, h, 0, 2 * Math.PI, !1) : e.points.symbol(he, n, a, h, !1), he.closePath(), he.stroke()
                }
            }

            function ee(e, i) {
                var n = "string" == typeof e.highlightColor ? e.highlightColor : t.color.parse(e.color).scale("a", .5).toString(),
                    a = n,
                    r = "left" == e.bars.align ? 0 : -e.bars.barWidth / 2;
                he.lineWidth = e.bars.lineWidth, he.strokeStyle = n, j(i[0], i[1], i[2] || 0, r, r + e.bars.barWidth, 0, function () {
                    return a
                }, e.xaxis, e.yaxis, he, e.bars.horizontal, e.bars.lineWidth)
            }

            function ie(e, i, n, a) {
                if ("string" == typeof e) return e;
                for (var r = le.createLinearGradient(0, n, 0, i), s = 0, o = e.colors.length; o > s; ++s) {
                    var l = e.colors[s];
                    if ("string" != typeof l) {
                        var h = t.color.parse(a);
                        null != l.brightness && (h = h.scale("rgb", l.brightness)), null != l.opacity && (h.a *= l.opacity), l = h.toString()
                    }
                    r.addColorStop(s / (o - 1), l)
                }
                return r
            }
            var ne = [],
                ae = {
                    colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
                    legend: {
                        show: !0,
                        noColumns: 1,
                        labelFormatter: null,
                        labelBoxBorderColor: "#ccc",
                        container: null,
                        position: "ne",
                        margin: 5,
                        backgroundColor: null,
                        backgroundOpacity: .85,
                        sorted: null
                    },
                    xaxis: {
                        show: null,
                        position: "bottom",
                        mode: null,
                        font: null,
                        color: null,
                        tickColor: null,
                        transform: null,
                        inverseTransform: null,
                        min: null,
                        max: null,
                        autoscaleMargin: null,
                        ticks: null,
                        tickFormatter: null,
                        labelWidth: null,
                        labelHeight: null,
                        reserveSpace: null,
                        tickLength: null,
                        alignTicksWithAxis: null,
                        tickDecimals: null,
                        tickSize: null,
                        minTickSize: null
                    },
                    yaxis: {
                        autoscaleMargin: .02,
                        position: "left"
                    },
                    xaxes: [],
                    yaxes: [],
                    series: {
                        points: {
                            show: !1,
                            radius: 3,
                            lineWidth: 2,
                            fill: !0,
                            fillColor: "#ffffff",
                            symbol: "circle"
                        },
                        lines: {
                            lineWidth: 2,
                            fill: !1,
                            fillColor: null,
                            steps: !1
                        },
                        bars: {
                            show: !1,
                            lineWidth: 2,
                            barWidth: 1,
                            fill: !0,
                            fillColor: null,
                            align: "left",
                            horizontal: !1,
                            zero: !0
                        },
                        shadowSize: 3,
                        highlightColor: null
                    },
                    grid: {
                        show: !0,
                        aboveData: !1,
                        color: "#545454",
                        backgroundColor: null,
                        borderColor: null,
                        tickColor: null,
                        margin: 0,
                        labelMargin: 5,
                        axisMargin: 8,
                        borderWidth: 2,
                        minBorderMargin: null,
                        markings: null,
                        markingsColor: "#f4f4f4",
                        markingsLineWidth: 2,
                        clickable: !1,
                        hoverable: !1,
                        autoHighlight: !0,
                        mouseActiveRadius: 10
                    },
                    interaction: {
                        redrawOverlayInterval: 1e3 / 60
                    },
                    hooks: {}
                },
                re = null,
                se = null,
                oe = null,
                le = null,
                he = null,
                ce = [],
                ue = [],
                de = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                },
                fe = 0,
                pe = 0,
                ge = {
                    processOptions: [],
                    processRawData: [],
                    processDatapoints: [],
                    processOffset: [],
                    drawBackground: [],
                    drawSeries: [],
                    draw: [],
                    bindEvents: [],
                    drawOverlay: [],
                    shutdown: []
                },
                me = this;
            me.setData = c, me.setupGrid = T, me.draw = E, me.getPlaceholder = function () {
                return i
            }, me.getCanvas = function () {
                return re.element
            }, me.getPlotOffset = function () {
                return de
            }, me.width = function () {
                return fe
            }, me.height = function () {
                return pe
            }, me.offset = function () {
                var t = oe.offset();
                return t.left += de.left, t.top += de.top, t
            }, me.getData = function () {
                return ne
            }, me.getAxes = function () {
                var e = {};
                return t.each(ce.concat(ue), function (t, i) {
                    i && (e[i.direction + (1 != i.n ? i.n : "") + "axis"] = i)
                }), e
            }, me.getXAxes = function () {
                return ce
            }, me.getYAxes = function () {
                return ue
            }, me.c2p = p, me.p2c = g, me.getOptions = function () {
                return ae
            }, me.highlight = Q, me.unhighlight = Z, me.triggerRedrawOverlay = G, me.pointOffset = function (t) {
                return {
                    left: parseInt(ce[d(t, "x") - 1].p2c(+t.x) + de.left, 10),
                    top: parseInt(ue[d(t, "y") - 1].p2c(+t.y) + de.top, 10)
                }
            }, me.shutdown = w, me.resize = function () {
                var t = i.width(),
                    e = i.height();
                re.resize(t, e), se.resize(t, e)
            }, me.hooks = ge, l(me), h(r), y(), c(a), T(), E(), x();
            var ve = [],
                be = null
        }

        function n(t, e) {
            return e * Math.floor(t / e)
        }
        var a = Object.prototype.hasOwnProperty;
        e.prototype.resize = function (t, e) {
            if (0 >= t || 0 >= e) throw new Error("Invalid dimensions for plot, width = " + t + ", height = " + e);
            var i = this.element,
                n = this.context,
                a = this.pixelRatio;
            this.width != t && (i.width = t * a, i.style.width = t + "px", this.width = t), this.height != e && (i.height = e * a, i.style.height = e + "px", this.height = e), n.restore(), n.save(), n.scale(a, a)
        }, e.prototype.clear = function () {
            this.context.clearRect(0, 0, this.width, this.height)
        }, e.prototype.render = function () {
            var t = this._textCache;
            for (var e in t)
                if (a.call(t, e)) {
                    var i = this.getTextLayer(e),
                        n = t[e];
                    i.hide();
                    for (var r in n)
                        if (a.call(n, r)) {
                            var s = n[r];
                            for (var o in s)
                                if (a.call(s, o)) {
                                    for (var l, h = s[o].positions, c = 0; l = h[c]; c++) l.active ? l.rendered || (i.append(l.element), l.rendered = !0) : (h.splice(c--, 1), l.rendered && l.element.detach());
                                    0 == h.length && delete s[o]
                                }
                        }
                    i.show()
                }
        }, e.prototype.getTextLayer = function (e) {
            var i = this.text[e];
            return null == i && (null == this.textContainer && (this.textContainer = t("<div class='flot-text'></div>").css({
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                "font-size": "smaller",
                color: "#545454"
            }).insertAfter(this.element)), i = this.text[e] = t("<div></div>").addClass(e).css({
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }).appendTo(this.textContainer)), i
        }, e.prototype.getTextInfo = function (e, i, n, a, r) {
            var s, o, l, h;
            if (i = "" + i, s = "object" == typeof n ? n.style + " " + n.variant + " " + n.weight + " " + n.size + "px/" + n.lineHeight + "px " + n.family : n, o = this._textCache[e], null == o && (o = this._textCache[e] = {}), l = o[s], null == l && (l = o[s] = {}), h = l[i], null == h) {
                var c = t("<div></div>").html(i).css({
                    position: "absolute",
                    "max-width": r,
                    top: -9999
                }).appendTo(this.getTextLayer(e));
                "object" == typeof n ? c.css({
                    font: s,
                    color: n.color
                }) : "string" == typeof n && c.addClass(n), h = l[i] = {
                    width: c.outerWidth(!0),
                    height: c.outerHeight(!0),
                    element: c,
                    positions: []
                }, c.detach()
            }
            return h
        }, e.prototype.addText = function (t, e, i, n, a, r, s, o, l) {
            var h = this.getTextInfo(t, n, a, r, s),
                c = h.positions;
            "center" == o ? e -= h.width / 2 : "right" == o && (e -= h.width), "middle" == l ? i -= h.height / 2 : "bottom" == l && (i -= h.height);
            for (var u, d = 0; u = c[d]; d++)
                if (u.x == e && u.y == i) return u.active = !0, void 0;
            u = {
                active: !0,
                rendered: !1,
                element: c.length ? h.element.clone() : h.element,
                x: e,
                y: i
            }, c.push(u), u.element.css({
                top: Math.round(i),
                left: Math.round(e),
                "text-align": o
            })
        }, e.prototype.removeText = function (t, e, i, n, r, s) {
            if (null == n) {
                var o = this._textCache[t];
                if (null != o)
                    for (var l in o)
                        if (a.call(o, l)) {
                            var h = o[l];
                            for (var c in h)
                                if (a.call(h, c))
                                    for (var u, d = h[c].positions, f = 0; u = d[f]; f++) u.active = !1
                        }
            } else
                for (var u, d = this.getTextInfo(t, n, r, s).positions, f = 0; u = d[f]; f++) u.x == e && u.y == i && (u.active = !1)
        }, t.plot = function (e, n, a) {
            var r = new i(t(e), n, a, t.plot.plugins);
            return r
        }, t.plot.version = "0.8.1", t.plot.plugins = [], t.fn.plot = function (e, i) {
            return this.each(function () {
                t.plot(this, e, i)
            })
        }
    }(jQuery),
    function (t, e) {
        function i(e) {
            t.extend(!0, _e, e)
        }

        function n(i, n, h) {
            function c(t) {
                ae ? m() && (S(), C(t)) : u()
            }

            function u() {
                re = n.theme ? "ui" : "fc", i.addClass("fc"), n.isRTL ? i.addClass("fc-rtl") : i.addClass("fc-ltr"), n.theme && i.addClass("ui-widget"), ae = t("<div class='fc-content' style='position:relative'/>").prependTo(i), ie = new a(ee, n), ne = ie.render(), ne && i.prepend(ne), b(n.defaultView), n.handleWindowResize && t(window).resize(T), v() || f()
            }

            function f() {
                setTimeout(function () {
                    !se.start && v() && _()
                }, 0)
            }

            function p() {
                se && (te("viewDestroy", se, se, se.element), se.triggerEventDestroy()), t(window).unbind("resize", T), ie.destroy(), ae.remove(), i.removeClass("fc fc-rtl ui-widget")
            }

            function m() {
                return i.is(":visible")
            }

            function v() {
                return t("body").is(":visible")
            }

            function b(t) {
                se && t == se.name || w(t)
            }

            function w(e) {
                pe++, se && (te("viewDestroy", se, se, se.element), W(), se.triggerEventDestroy(), J(), se.element.remove(), ie.deactivateButton(se.name)), ie.activateButton(e), se = new Se[e](t("<div class='fc-view fc-view-" + e + "' style='position:relative'/>").appendTo(ae), ee), _(), Q(), pe--
            }

            function _(t) {
                (!se.start || t || ge < se.start || ge >= se.end) && m() && C(t)
            }

            function C(t) {
                pe++, se.start && (te("viewDestroy", se, se, se.element), W(), E()), J(), se.render(ge, t || 0), D(), Q(), (se.afterRender || P)(), z(), B(), te("viewRender", se, se, se.element), se.trigger("viewDisplay", de), pe--, L()
            }

            function k() {
                m() && (W(), E(), S(), D(), A())
            }

            function S() {
                le = n.contentHeight ? n.contentHeight : n.height ? n.height - (ne ? ne.height() : 0) - I(ae) : Math.round(ae.width() / Math.max(n.aspectRatio, .5))
            }

            function D() {
                le === e && S(), pe++, se.setHeight(le), se.setWidth(ae.width()), pe--, oe = i.outerWidth()
            }

            function T() {
                if (!pe)
                    if (se.start) {
                        var t = ++fe;
                        setTimeout(function () {
                            t == fe && !pe && m() && oe != (oe = i.outerWidth()) && (pe++, k(), se.trigger("windowResize", de), pe--)
                        }, 200)
                    } else f()
            }

            function F() {
                E(), R()
            }

            function M(t) {
                E(), A(t)
            }

            function A(t) {
                m() && (se.setEventData(me), se.renderEvents(me, t), se.trigger("eventAfterAllRender"))
            }

            function E() {
                se.triggerEventDestroy(), se.clearEvents(), se.clearEventData()
            }

            function L() {
                !n.lazyFetching || ce(se.visStart, se.visEnd) ? R() : A()
            }

            function R() {
                ue(se.visStart, se.visEnd)
            }

            function H(t) {
                me = t, A()
            }

            function N(t) {
                M(t)
            }

            function z() {
                ie.updateTitle(se.title)
            }

            function B() {
                var t = new Date;
                t >= se.start && t < se.end ? ie.disableButton("today") : ie.enableButton("today")
            }

            function j(t, i, n) {
                se.select(t, i, n === e ? !0 : n)
            }

            function W() {
                se && se.unselect()
            }

            function O() {
                _(-1)
            }

            function $() {
                _(1)
            }

            function q() {
                s(ge, -1), _()
            }

            function Y() {
                s(ge, 1), _()
            }

            function U() {
                ge = new Date, _()
            }

            function V(t, e, i) {
                t instanceof Date ? ge = d(t) : g(ge, t, e, i), _()
            }

            function X(t, i, n) {
                t !== e && s(ge, t), i !== e && o(ge, i), n !== e && l(ge, n), _()
            }

            function G() {
                return d(ge)
            }

            function J() {
                ae.css({
                    width: "100%",
                    height: ae.height(),
                    overflow: "hidden"
                })
            }

            function Q() {
                ae.css({
                    width: "",
                    height: "",
                    overflow: ""
                })
            }

            function Z() {
                return se
            }

            function K(t, i) {
                return i === e ? n[t] : (("height" == t || "contentHeight" == t || "aspectRatio" == t) && (n[t] = i, k()), void 0)
            }

            function te(t, e) {
                return n[t] ? n[t].apply(e || de, Array.prototype.slice.call(arguments, 2)) : void 0
            }
            var ee = this;
            ee.options = n, ee.render = c, ee.destroy = p, ee.refetchEvents = F, ee.reportEvents = H, ee.reportEventChange = N, ee.rerenderEvents = M, ee.changeView = b, ee.select = j, ee.unselect = W, ee.prev = O, ee.next = $, ee.prevYear = q, ee.nextYear = Y, ee.today = U, ee.gotoDate = V, ee.incrementDate = X, ee.formatDate = function (t, e) {
                return y(t, e, n)
            }, ee.formatDates = function (t, e, i) {
                return x(t, e, i, n)
            }, ee.getDate = G, ee.getView = Z, ee.option = K, ee.trigger = te, r.call(ee, n, h);
            var ie, ne, ae, re, se, oe, le, he, ce = ee.isFetchNeeded,
                ue = ee.fetchEvents,
                de = i[0],
                fe = 0,
                pe = 0,
                ge = new Date,
                me = [];
            g(ge, n.year, n.month, n.date), n.droppable && t(document).bind("dragstart", function (e, i) {
                var a = e.target,
                    r = t(a);
                if (!r.parents(".fc").length) {
                    var s = n.dropAccept;
                    (t.isFunction(s) ? s.call(a, r) : r.is(s)) && (he = a, se.dragStart(he, e, i))
                }
            }).bind("dragstop", function (t, e) {
                he && (se.dragStop(he, t, e), he = null)
            })
        }

        function a(e, i) {
            function n() {
                d = i.theme ? "ui" : "fc";
                var e = i.header;
                return e ? f = t("<table class='fc-header' style='width:100%'/>").append(t("<tr/>").append(r("left")).append(r("center")).append(r("right"))) : void 0
            }

            function a() {
                f.remove()
            }

            function r(n) {
                var a = t("<td class='fc-header-" + n + "'/>"),
                    r = i.header[n];
                return r && t.each(r.split(" "), function (n) {
                    n > 0 && a.append("<span class='fc-header-space'/>");
                    var r;
                    t.each(this.split(","), function (n, s) {
                        if ("title" == s) a.append("<span class='fc-header-title'><h2>&nbsp;</h2></span>"), r && r.addClass(d + "-corner-right"), r = null;
                        else {
                            var o;
                            if (e[s] ? o = e[s] : Se[s] && (o = function () {
                                c.removeClass(d + "-state-hover"), e.changeView(s)
                            }), o) {
                                var l = i.theme ? B(i.buttonIcons, s) : null,
                                    h = B(i.buttonText, s),
                                    c = t("<span class='fc-button fc-button-" + s + " " + d + "-state-default'>" + (l ? "<span class='fc-icon-wrap'><span class='ui-icon ui-icon-" + l + "'/>" + "</span>" : h) + "</span>").click(function () {
                                        c.hasClass(d + "-state-disabled") || o()
                                    }).mousedown(function () {
                                        c.not("." + d + "-state-active").not("." + d + "-state-disabled").addClass(d + "-state-down")
                                    }).mouseup(function () {
                                        c.removeClass(d + "-state-down")
                                    }).hover(function () {
                                        c.not("." + d + "-state-active").not("." + d + "-state-disabled").addClass(d + "-state-hover")
                                    }, function () {
                                        c.removeClass(d + "-state-hover").removeClass(d + "-state-down")
                                    }).appendTo(a);
                                W(c), r || c.addClass(d + "-corner-left"), r = c
                            }
                        }
                    }), r && r.addClass(d + "-corner-right")
                }), a
            }

            function s(t) {
                f.find("h2").html(t)
            }

            function o(t) {
                f.find("span.fc-button-" + t).addClass(d + "-state-active")
            }

            function l(t) {
                f.find("span.fc-button-" + t).removeClass(d + "-state-active")
            }

            function h(t) {
                f.find("span.fc-button-" + t).addClass(d + "-state-disabled")
            }

            function c(t) {
                f.find("span.fc-button-" + t).removeClass(d + "-state-disabled")
            }
            var u = this;
            u.render = n, u.destroy = a, u.updateTitle = s, u.activateButton = o, u.deactivateButton = l, u.disableButton = h, u.enableButton = c;
            var d, f = t([])
        }

        function r(i, n) {
            function a(t, e) {
                return !k || k > t || e > S
            }

            function r(t, e) {
                k = t, S = e, R = [];
                var i = ++I,
                    n = A.length;
                E = n;
                for (var a = 0; n > a; a++) s(A[a], i)
            }

            function s(e, n) {
                o(e, function (a) {
                    if (n == I) {
                        if (a) {
                            i.eventDataTransform && (a = t.map(a, i.eventDataTransform)), e.eventDataTransform && (a = t.map(a, e.eventDataTransform));
                            for (var r = 0; r < a.length; r++) a[r].source = e, y(a[r]);
                            R = R.concat(a)
                        }
                        E--, E || F(R)
                    }
                })
            }

            function o(e, n) {
                var a, r, s = ke.sourceFetchers;
                for (a = 0; a < s.length; a++) {
                    if (r = s[a](e, k, S, n), r === !0) return;
                    if ("object" == typeof r) return o(r, n), void 0
                }
                var l = e.events;
                if (l) t.isFunction(l) ? (v(), l(d(k), d(S), function (t) {
                    n(t), b()
                })) : t.isArray(l) ? n(l) : n();
                else {
                    var h = e.url;
                    if (h) {
                        var c, u = e.success,
                            f = e.error,
                            p = e.complete;
                        c = t.isFunction(e.data) ? e.data() : e.data;
                        var g = t.extend({}, c || {}),
                            m = Y(e.startParam, i.startParam),
                            y = Y(e.endParam, i.endParam);
                        m && (g[m] = Math.round(+k / 1e3)), y && (g[y] = Math.round(+S / 1e3)), v(), t.ajax(t.extend({}, De, e, {
                            data: g,
                            success: function (e) {
                                e = e || [];
                                var i = q(u, this, arguments);
                                t.isArray(i) && (e = i), n(e)
                            },
                            error: function () {
                                q(f, this, arguments), n()
                            },
                            complete: function () {
                                q(p, this, arguments), b()
                            }
                        }))
                    } else n()
                }
            }

            function l(t) {
                t = h(t), t && (E++, s(t, I))
            }

            function h(e) {
                return t.isFunction(e) || t.isArray(e) ? e = {
                    events: e
                } : "string" == typeof e && (e = {
                    url: e
                }), "object" == typeof e ? (x(e), A.push(e), e) : void 0
            }

            function c(e) {
                A = t.grep(A, function (t) {
                    return !w(t, e)
                }), R = t.grep(R, function (t) {
                    return !w(t.source, e)
                }), F(R)
            }

            function u(t) {
                var e, i, n = R.length,
                    a = T().defaultEventEnd,
                    r = t.start - t._start,
                    s = t.end ? t.end - (t._end || a(t)) : 0;
                for (e = 0; n > e; e++) i = R[e], i._id == t._id && i != t && (i.start = new Date(+i.start + r), i.end = t.end ? i.end ? new Date(+i.end + s) : new Date(+a(i) + s) : null, i.title = t.title, i.url = t.url, i.allDay = t.allDay, i.className = t.className, i.editable = t.editable, i.color = t.color, i.backgroundColor = t.backgroundColor, i.borderColor = t.borderColor, i.textColor = t.textColor, y(i));
                y(t), F(R)
            }

            function f(t, e) {
                y(t), t.source || (e && (M.events.push(t), t.source = M), R.push(t)), F(R)
            }

            function p(e) {
                if (e) {
                    if (!t.isFunction(e)) {
                        var i = e + "";
                        e = function (t) {
                            return t._id == i
                        }
                    }
                    R = t.grep(R, e, !0);
                    for (var n = 0; n < A.length; n++) t.isArray(A[n].events) && (A[n].events = t.grep(A[n].events, e, !0))
                } else {
                    R = [];
                    for (var n = 0; n < A.length; n++) t.isArray(A[n].events) && (A[n].events = [])
                }
                F(R)
            }

            function g(e) {
                return t.isFunction(e) ? t.grep(R, e) : e ? (e += "", t.grep(R, function (t) {
                    return t._id == e
                })) : R
            }

            function v() {
                L++ || D("loading", null, !0, T())
            }

            function b() {
                --L || D("loading", null, !1, T())
            }

            function y(t) {
                var n = t.source || {},
                    a = Y(n.ignoreTimezone, i.ignoreTimezone);
                t._id = t._id || (t.id === e ? "_fc" + Te++ : t.id + ""), t.date && (t.start || (t.start = t.date), delete t.date), t._start = d(t.start = m(t.start, a)), t.end = m(t.end, a), t.end && t.end <= t.start && (t.end = null), t._end = t.end ? d(t.end) : null, t.allDay === e && (t.allDay = Y(n.allDayDefault, i.allDayDefault)), t.className ? "string" == typeof t.className && (t.className = t.className.split(/\s+/)) : t.className = []
            }

            function x(t) {
                t.className ? "string" == typeof t.className && (t.className = t.className.split(/\s+/)) : t.className = [];
                for (var e = ke.sourceNormalizers, i = 0; i < e.length; i++) e[i](t)
            }

            function w(t, e) {
                return t && e && _(t) == _(e)
            }

            function _(t) {
                return ("object" == typeof t ? t.events || t.url : "") || t
            }
            var C = this;
            C.isFetchNeeded = a, C.fetchEvents = r, C.addEventSource = l, C.removeEventSource = c, C.updateEvent = u, C.renderEvent = f, C.removeEvents = p, C.clientEvents = g, C.normalizeEvent = y;
            for (var k, S, D = C.trigger, T = C.getView, F = C.reportEvents, M = {
                events: []
            }, A = [M], I = 0, E = 0, L = 0, R = [], P = 0; P < n.length; P++) h(n[P])
        }

        function s(t, e, i) {
            return t.setFullYear(t.getFullYear() + e), i || u(t), t
        }

        function o(t, e, i) {
            if (+t) {
                var n = t.getMonth() + e,
                    a = d(t);
                for (a.setDate(1), a.setMonth(n), t.setMonth(n), i || u(t); t.getMonth() != a.getMonth();) t.setDate(t.getDate() + (a > t ? 1 : -1))
            }
            return t
        }

        function l(t, e, i) {
            if (+t) {
                var n = t.getDate() + e,
                    a = d(t);
                a.setHours(9), a.setDate(n), t.setDate(n), i || u(t), h(t, a)
            }
            return t
        }

        function h(t, e) {
            if (+t)
                for (; t.getDate() != e.getDate();) t.setTime(+t + (e > t ? 1 : -1) * Ae)
        }

        function c(t, e) {
            return t.setMinutes(t.getMinutes() + e), t
        }

        function u(t) {
            return t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), t
        }

        function d(t, e) {
            return e ? u(new Date(+t)) : new Date(+t)
        }

        function f() {
            var t, e = 0;
            do t = new Date(1970, e++, 1); while (t.getHours());
            return t
        }

        function p(t, e) {
            return Math.round((d(t, !0) - d(e, !0)) / Me)
        }

        function g(t, i, n, a) {
            i !== e && i != t.getFullYear() && (t.setDate(1), t.setMonth(0), t.setFullYear(i)), n !== e && n != t.getMonth() && (t.setDate(1), t.setMonth(n)), a !== e && t.setDate(a)
        }

        function m(t, i) {
            return "object" == typeof t ? t : "number" == typeof t ? new Date(1e3 * t) : "string" == typeof t ? t.match(/^\d+(\.\d+)?$/) ? new Date(1e3 * parseFloat(t)) : (i === e && (i = !0), v(t, i) || (t ? new Date(t) : null)) : null
        }

        function v(t, e) {
            var i = t.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
            if (!i) return null;
            var n = new Date(i[1], 0, 1);
            if (e || !i[13]) {
                var a = new Date(i[1], 0, 1, 9, 0);
                i[3] && (n.setMonth(i[3] - 1), a.setMonth(i[3] - 1)), i[5] && (n.setDate(i[5]), a.setDate(i[5])), h(n, a), i[7] && n.setHours(i[7]), i[8] && n.setMinutes(i[8]), i[10] && n.setSeconds(i[10]), i[12] && n.setMilliseconds(1e3 * Number("0." + i[12])), h(n, a)
            } else if (n.setUTCFullYear(i[1], i[3] ? i[3] - 1 : 0, i[5] || 1), n.setUTCHours(i[7] || 0, i[8] || 0, i[10] || 0, i[12] ? 1e3 * Number("0." + i[12]) : 0), i[14]) {
                var r = 60 * Number(i[16]) + (i[18] ? Number(i[18]) : 0);
                r *= "-" == i[15] ? 1 : -1, n = new Date(+n + 1e3 * 60 * r)
            }
            return n
        }

        function b(t) {
            if ("number" == typeof t) return 60 * t;
            if ("object" == typeof t) return 60 * t.getHours() + t.getMinutes();
            var e = t.match(/(\d+)(?::(\d+))?\s*(\w+)?/);
            if (e) {
                var i = parseInt(e[1], 10);
                return e[3] && (i %= 12, "p" == e[3].toLowerCase().charAt(0) && (i += 12)), 60 * i + (e[2] ? parseInt(e[2], 10) : 0)
            }
        }

        function y(t, e, i) {
            return x(t, null, e, i)
        }

        function x(t, e, i, n) {
            n = n || _e;
            var a, r, s, o, l = t,
                h = e,
                c = i.length,
                u = "";
            for (a = 0; c > a; a++)
                if (r = i.charAt(a), "'" == r) {
                    for (s = a + 1; c > s; s++)
                        if ("'" == i.charAt(s)) {
                            l && (u += s == a + 1 ? "'" : i.substring(a + 1, s), a = s);
                            break
                        }
                } else if ("(" == r) {
                for (s = a + 1; c > s; s++)
                    if (")" == i.charAt(s)) {
                        var d = y(l, i.substring(a + 1, s), n);
                        parseInt(d.replace(/\D/, ""), 10) && (u += d), a = s;
                        break
                    }
            } else if ("[" == r) {
                for (s = a + 1; c > s; s++)
                    if ("]" == i.charAt(s)) {
                        var f = i.substring(a + 1, s),
                            d = y(l, f, n);
                        d != y(h, f, n) && (u += d), a = s;
                        break
                    }
            } else if ("{" == r) l = e, h = t;
            else if ("}" == r) l = t, h = e;
            else {
                for (s = c; s > a; s--)
                    if (o = Ee[i.substring(a, s)]) {
                        l && (u += o(l, n)), a = s - 1;
                        break
                    }
                s == a && l && (u += r)
            }
            return u
        }

        function w(t) {
            var e, i = new Date(t.getTime());
            return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
        }

        function _(t) {
            return t.end ? C(t.end, t.allDay) : l(d(t.start), 1)
        }

        function C(t, e) {
            return t = d(t), e || t.getHours() || t.getMinutes() ? l(t, 1) : u(t)
        }

        function k(i, n, a) {
            i.unbind("mouseover").mouseover(function (i) {
                for (var r, s, o, l = i.target; l != this;) r = l, l = l.parentNode;
                (s = r._fci) !== e && (r._fci = e, o = n[s], a(o.event, o.element, o), t(i.target).trigger(i)), i.stopPropagation()
            })
        }

        function S(e, i, n) {
            for (var a, r = 0; r < e.length; r++) a = t(e[r]), a.width(Math.max(0, i - T(a, n)))
        }

        function D(e, i, n) {
            for (var a, r = 0; r < e.length; r++) a = t(e[r]), a.height(Math.max(0, i - I(a, n)))
        }

        function T(t, e) {
            return F(t) + A(t) + (e ? M(t) : 0)
        }

        function F(e) {
            return (parseFloat(t.css(e[0], "paddingLeft", !0)) || 0) + (parseFloat(t.css(e[0], "paddingRight", !0)) || 0)
        }

        function M(e) {
            return (parseFloat(t.css(e[0], "marginLeft", !0)) || 0) + (parseFloat(t.css(e[0], "marginRight", !0)) || 0)
        }

        function A(e) {
            return (parseFloat(t.css(e[0], "borderLeftWidth", !0)) || 0) + (parseFloat(t.css(e[0], "borderRightWidth", !0)) || 0)
        }

        function I(t, e) {
            return E(t) + R(t) + (e ? L(t) : 0)
        }

        function E(e) {
            return (parseFloat(t.css(e[0], "paddingTop", !0)) || 0) + (parseFloat(t.css(e[0], "paddingBottom", !0)) || 0)
        }

        function L(e) {
            return (parseFloat(t.css(e[0], "marginTop", !0)) || 0) + (parseFloat(t.css(e[0], "marginBottom", !0)) || 0)
        }

        function R(e) {
            return (parseFloat(t.css(e[0], "borderTopWidth", !0)) || 0) + (parseFloat(t.css(e[0], "borderBottomWidth", !0)) || 0)
        }

        function P() {}

        function H(t, e) {
            return t - e
        }

        function N(t) {
            return Math.max.apply(Math, t)
        }

        function z(t) {
            return (10 > t ? "0" : "") + t
        }

        function B(t, i) {
            if (t[i] !== e) return t[i];
            for (var n, a = i.split(/(?=[A-Z])/), r = a.length - 1; r >= 0; r--)
                if (n = t[a[r].toLowerCase()], n !== e) return n;
            return t[""]
        }

        function j(t) {
            return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
        }

        function W(t) {
            t.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function () {
                return !1
            })
        }

        function O(t) {
            t.children().removeClass("fc-first fc-last").filter(":first-child").addClass("fc-first").end().filter(":last-child").addClass("fc-last")
        }

        function $(t, e) {
            var i = t.source || {},
                n = t.color,
                a = i.color,
                r = e("eventColor"),
                s = t.backgroundColor || n || i.backgroundColor || a || e("eventBackgroundColor") || r,
                o = t.borderColor || n || i.borderColor || a || e("eventBorderColor") || r,
                l = t.textColor || i.textColor || e("eventTextColor"),
                h = [];
            return s && h.push("background-color:" + s), o && h.push("border-color:" + o), l && h.push("color:" + l), h.join(";")
        }

        function q(e, i, n) {
            if (t.isFunction(e) && (e = [e]), e) {
                var a, r;
                for (a = 0; a < e.length; a++) r = e[a].apply(i, n) || r;
                return r
            }
        }

        function Y() {
            for (var t = 0; t < arguments.length; t++)
                if (arguments[t] !== e) return arguments[t]
        }

        function U(t, e) {
            function i(t, e) {
                e && (o(t, e), t.setDate(1));
                var i = a("firstDay"),
                    u = d(t, !0);
                u.setDate(1);
                var f = o(d(u), 1),
                    g = d(u);
                l(g, -((g.getDay() - i + 7) % 7)), s(g);
                var m = d(f);
                l(m, (7 - m.getDay() + i) % 7), s(m, -1, !0);
                var v = h(),
                    b = Math.round(p(m, g) / 7);
                "fixed" == a("weekMode") && (l(m, 7 * (6 - b)), b = 6), n.title = c(u, a("titleFormat")), n.start = u, n.end = f, n.visStart = g, n.visEnd = m, r(b, v, !0)
            }
            var n = this;
            n.render = i, G.call(n, t, e, "month");
            var a = n.opt,
                r = n.renderBasic,
                s = n.skipHiddenDays,
                h = n.getCellsPerWeek,
                c = e.formatDate
        }

        function V(t, e) {
            function i(t, e) {
                e && l(t, 7 * e);
                var i = l(d(t), -((t.getDay() - a("firstDay") + 7) % 7)),
                    c = l(d(i), 7),
                    u = d(i);
                s(u);
                var f = d(c);
                s(f, -1, !0);
                var p = o();
                n.start = i, n.end = c, n.visStart = u, n.visEnd = f, n.title = h(u, l(d(f), -1), a("titleFormat")), r(1, p, !1)
            }
            var n = this;
            n.render = i, G.call(n, t, e, "basicWeek");
            var a = n.opt,
                r = n.renderBasic,
                s = n.skipHiddenDays,
                o = n.getCellsPerWeek,
                h = e.formatDates
        }

        function X(t, e) {
            function i(t, e) {
                e && l(t, e), s(t, 0 > e ? -1 : 1);
                var i = d(t, !0),
                    h = l(d(i), 1);
                n.title = o(t, a("titleFormat")), n.start = n.visStart = i, n.end = n.visEnd = h, r(1, 1, !1)
            }
            var n = this;
            n.render = i, G.call(n, t, e, "basicDay");
            var a = n.opt,
                r = n.renderBasic,
                s = n.skipHiddenDays,
                o = e.formatDate
        }

        function G(e, i, n) {
            function a(t, e, i) {
                ee = t, ie = e, ne = i, r(), $ || s(), o()
            }

            function r() {
                le = pe("theme") ? "ui" : "fc", he = pe("columnFormat"), ce = pe("weekNumbers"), de = pe("weekNumberTitle"), fe = "iso" != pe("weekNumberCalculation") ? "w" : "W"
            }

            function s() {
                G = t("<div class='fc-event-container' style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(e)
            }

            function o() {
                var i = h();
                N && N.remove(), N = t(i).appendTo(e), z = N.find("thead"), B = z.find(".fc-day-header"), $ = N.find("tbody"), q = $.find("tr"), Y = $.find(".fc-day"), U = q.find("td:first-child"), V = q.eq(0).find(".fc-day > div"), X = q.eq(0).find(".fc-day-content > div"), O(z.add(z.find("tr"))), O(q), q.eq(0).addClass("fc-first"), q.filter(":last").addClass("fc-last"), Y.each(function (e, i) {
                    var n = ke(Math.floor(e / ie), e % ie);
                    ge("dayRender", H, n, t(i))
                }), b(Y)
            }

            function h() {
                var t = "<table class='fc-border-separate' style='width:100%' cellspacing='0'>" + c() + f() + "</table>";
                return t
            }

            function c() {
                var t, e, i = le + "-widget-header",
                    n = "";
                for (n += "<thead><tr>", ce && (n += "<th class='fc-week-number " + i + "'>" + j(de) + "</th>"), t = 0; ie > t; t++) e = ke(0, t), n += "<th class='fc-day-header fc-" + Fe[e.getDay()] + " " + i + "'>" + j(Te(e, he)) + "</th>";
                return n += "</tr></thead>"
            }

            function f() {
                var t, e, i, n = le + "-widget-content",
                    a = "";
                for (a += "<tbody>", t = 0; ee > t; t++) {
                    for (a += "<tr class='fc-week'>", ce && (i = ke(t, 0), a += "<td class='fc-week-number " + n + "'>" + "<div>" + j(Te(i, fe)) + "</div>" + "</td>"), e = 0; ie > e; e++) i = ke(t, e), a += p(i);
                    a += "</tr>"
                }
                return a += "</tbody>"
            }

            function p(t) {
                var e = le + "-widget-content",
                    i = H.start.getMonth(),
                    n = u(new Date),
                    a = "",
                    r = ["fc-day", "fc-" + Fe[t.getDay()], e];
                return t.getMonth() != i && r.push("fc-other-month"), +t == +n ? r.push("fc-today", le + "-state-highlight") : n > t ? r.push("fc-past") : r.push("fc-future"), a += "<td class='" + r.join(" ") + "'" + " data-date='" + Te(t, "yyyy-MM-dd") + "'" + ">" + "<div>", ne && (a += "<div class='fc-day-number'>" + t.getDate() + "</div>"), a += "<div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></div></td>"
            }

            function g(e) {
                Z = e;
                var i, n, a, r = Z - z.height();
                "variable" == pe("weekMode") ? i = n = Math.floor(r / (1 == ee ? 2 : 6)) : (i = Math.floor(r / ee), n = r - i * (ee - 1)), U.each(function (e, r) {
                    ee > e && (a = t(r), a.find("> div").css("min-height", (e == ee - 1 ? n : i) - I(a)))
                })
            }

            function m(t) {
                Q = t, se.clear(), oe.clear(), te = 0, ce && (te = z.find("th.fc-week-number").outerWidth()), K = Math.floor((Q - te) / ie), S(B.slice(0, -1), K)
            }

            function b(t) {
                t.click(y).mousedown(Ce)
            }

            function y(e) {
                if (!pe("selectable")) {
                    var i = v(t(this).data("date"));
                    ge("dayClick", this, i, !0, e)
                }
            }

            function x(t, e, i) {
                i && ae.build();
                for (var n = De(t, e), a = 0; a < n.length; a++) {
                    var r = n[a];
                    b(w(r.row, r.leftCol, r.row, r.rightCol))
                }
            }

            function w(t, i, n, a) {
                var r = ae.rect(t, i, n, a, e);
                return xe(r, e)
            }

            function _(t) {
                return d(t)
            }

            function C(t, e) {
                x(t, l(d(e), 1), !0)
            }

            function k() {
                _e()
            }

            function D(t, e, i) {
                var n = Se(t),
                    a = Y[n.row * ie + n.col];
                ge("dayClick", a, t, e, i)
            }

            function T(t, e) {
                re.start(function (t) {
                    _e(), t && w(t.row, t.col, t.row, t.col)
                }, e)
            }

            function F(t, e, i) {
                var n = re.stop();
                if (_e(), n) {
                    var a = ke(n);
                    ge("drop", t, a, !0, e, i)
                }
            }

            function M(t) {
                return d(t.start)
            }

            function A(t) {
                return se.left(t)
            }

            function E(t) {
                return se.right(t)
            }

            function L(t) {
                return oe.left(t)
            }

            function R(t) {
                return oe.right(t)
            }

            function P(t) {
                return q.eq(t)
            }
            var H = this;
            H.renderBasic = a, H.setHeight = g, H.setWidth = m, H.renderDayOverlay = x, H.defaultSelectionEnd = _, H.renderSelection = C, H.clearSelection = k, H.reportDayClick = D, H.dragStart = T, H.dragStop = F, H.defaultEventEnd = M, H.getHoverListener = function () {
                return re
            }, H.colLeft = A, H.colRight = E, H.colContentLeft = L, H.colContentRight = R, H.getIsCellAllDay = function () {
                return !0
            }, H.allDayRow = P, H.getRowCnt = function () {
                return ee
            }, H.getColCnt = function () {
                return ie
            }, H.getColWidth = function () {
                return K
            }, H.getDaySegmentContainer = function () {
                return G
            }, ue.call(H, e, i, n), ve.call(H), me.call(H), J.call(H);
            var N, z, B, $, q, Y, U, V, X, G, Q, Z, K, te, ee, ie, ne, ae, re, se, oe, le, he, ce, de, fe, pe = H.opt,
                ge = H.trigger,
                xe = H.renderOverlay,
                _e = H.clearOverlays,
                Ce = H.daySelectionMousedown,
                ke = H.cellToDate,
                Se = H.dateToCell,
                De = H.rangeToSegments,
                Te = i.formatDate;
            W(e.addClass("fc-grid")), ae = new be(function (e, i) {
                var n, a, r;
                B.each(function (e, s) {
                    n = t(s), a = n.offset().left, e && (r[1] = a), r = [a], i[e] = r
                }), r[1] = a + n.outerWidth(), q.each(function (i, s) {
                    ee > i && (n = t(s), a = n.offset().top, i && (r[1] = a), r = [a], e[i] = r)
                }), r[1] = a + n.outerHeight()
            }), re = new ye(ae), se = new we(function (t) {
                return V.eq(t)
            }), oe = new we(function (t) {
                return X.eq(t)
            })
        }

        function J() {
            function t(t, e) {
                i.renderDayEvents(t, e)
            }

            function e() {
                i.getDaySegmentContainer().empty()
            }
            var i = this;
            i.renderEvents = t, i.clearEvents = e, de.call(i)
        }

        function Q(t, e) {
            function i(t, e) {
                e && l(t, 7 * e);
                var i = l(d(t), -((t.getDay() - a("firstDay") + 7) % 7)),
                    c = l(d(i), 7),
                    u = d(i);
                s(u);
                var f = d(c);
                s(f, -1, !0);
                var p = o();
                n.title = h(u, l(d(f), -1), a("titleFormat")), n.start = i, n.end = c, n.visStart = u, n.visEnd = f, r(p)
            }
            var n = this;
            n.render = i, K.call(n, t, e, "agendaWeek");
            var a = n.opt,
                r = n.renderAgenda,
                s = n.skipHiddenDays,
                o = n.getCellsPerWeek,
                h = e.formatDates
        }

        function Z(t, e) {
            function i(t, e) {
                e && l(t, e), s(t, 0 > e ? -1 : 1);
                var i = d(t, !0),
                    h = l(d(i), 1);
                n.title = o(t, a("titleFormat")), n.start = n.visStart = i, n.end = n.visEnd = h, r(1)
            }
            var n = this;
            n.render = i, K.call(n, t, e, "agendaDay");
            var a = n.opt,
                r = n.renderAgenda,
                s = n.skipHiddenDays,
                o = e.formatDate
        }

        function K(i, n, a) {
            function r(t) {
                Re = t, s(), K ? h() : o()
            }

            function s() {
                je = Xe("theme") ? "ui" : "fc", We = Xe("isRTL"), Oe = b(Xe("minTime")), $e = b(Xe("maxTime")), qe = Xe("columnFormat"), Ye = Xe("weekNumbers"), Ue = Xe("weekNumberTitle"), Ve = "iso" != Xe("weekNumberCalculation") ? "w" : "W", Ie = Xe("snapMinutes") || Xe("slotMinutes")
            }

            function o() {
                var e, n, a, r, s, o = je + "-widget-header",
                    l = je + "-widget-content",
                    u = 0 == Xe("slotMinutes") % 15;
                for (h(), he = t("<div style='position:absolute;z-index:2;left:0;width:100%'/>").appendTo(i), Xe("allDaySlot") ? (ce = t("<div class='fc-event-container' style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(he), e = "<table style='width:100%' class='fc-agenda-allday' cellspacing='0'><tr><th class='" + o + " fc-agenda-axis'>" + Xe("allDayText") + "</th>" + "<td>" + "<div class='fc-day-content'><div style='position:relative'/></div>" + "</td>" + "<th class='" + o + " fc-agenda-gutter'>&nbsp;</th>" + "</tr>" + "</table>", de = t(e).appendTo(he), fe = de.find("tr"), _(fe.find("td")), he.append("<div class='fc-agenda-divider " + o + "'>" + "<div class='fc-agenda-divider-inner'/>" + "</div>")) : ce = t([]), pe = t("<div style='position:absolute;width:100%;overflow-x:hidden;overflow-y:auto'/>").appendTo(he), ge = t("<div style='position:relative;width:100%;overflow:hidden'/>").appendTo(pe), xe = t("<div class='fc-event-container' style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(ge), e = "<table class='fc-agenda-slots' style='width:100%' cellspacing='0'><tbody>", n = f(), r = c(d(n), $e), c(n, Oe), Pe = 0, a = 0; r > n; a++) s = n.getMinutes(), e += "<tr class='fc-slot" + a + " " + (s ? "fc-minor" : "") + "'>" + "<th class='fc-agenda-axis " + o + "'>" + (u && s ? "&nbsp;" : ri(n, Xe("axisFormat"))) + "</th>" + "<td class='" + l + "'>" + "<div style='position:relative'>&nbsp;</div>" + "</td>" + "</tr>", c(n, Xe("slotMinutes")), Pe++;
                e += "</tbody></table>", _e = t(e).appendTo(ge), C(_e.find("td"))
            }

            function h() {
                var e = p();
                K && K.remove(), K = t(e).appendTo(i), ee = K.find("thead"), ie = ee.find("th").slice(1, -1), ne = K.find("tbody"), ae = ne.find("td").slice(0, -1), re = ae.find("> div"), se = ae.find(".fc-day-content > div"), oe = ae.eq(0), le = re.eq(0), O(ee.add(ee.find("tr"))), O(ne.add(ne.find("tr")))
            }

            function p() {
                var t = "<table style='width:100%' class='fc-agenda-days fc-border-separate' cellspacing='0'>" + g() + m() + "</table>";
                return t
            }

            function g() {
                var t, e, i, n = je + "-widget-header",
                    a = "";
                for (a += "<thead><tr>", Ye ? (t = ii(0, 0), e = ri(t, Ve), We ? e += Ue : e = Ue + e, a += "<th class='fc-agenda-axis fc-week-number " + n + "'>" + j(e) + "</th>") : a += "<th class='fc-agenda-axis " + n + "'>&nbsp;</th>", i = 0; Re > i; i++) t = ii(0, i), a += "<th class='fc-" + Fe[t.getDay()] + " fc-col" + i + " " + n + "'>" + j(ri(t, qe)) + "</th>";
                return a += "<th class='fc-agenda-gutter " + n + "'>&nbsp;</th>" + "</tr>" + "</thead>"
            }

            function m() {
                var t, e, i, n, a, r = je + "-widget-header",
                    s = je + "-widget-content",
                    o = u(new Date),
                    l = "";
                for (l += "<tbody><tr><th class='fc-agenda-axis " + r + "'>&nbsp;</th>", i = "", e = 0; Re > e; e++) t = ii(0, e), a = ["fc-col" + e, "fc-" + Fe[t.getDay()], s], +t == +o ? a.push(je + "-state-highlight", "fc-today") : o > t ? a.push("fc-past") : a.push("fc-future"), n = "<td class='" + a.join(" ") + "'>" + "<div>" + "<div class='fc-day-content'>" + "<div style='position:relative'>&nbsp;</div>" + "</div>" + "</div>" + "</td>", i += n;
                return l += i, l += "<td class='fc-agenda-gutter " + s + "'>&nbsp;</td>" + "</tr>" + "</tbody>"
            }

            function v(t) {
                t === e && (t = Se), Se = t, si = {};
                var i = ne.position().top,
                    n = pe.position().top,
                    a = Math.min(t - i, _e.height() + n + 1);
                le.height(a - I(oe)), he.css("top", i), pe.height(a - n - 1), Ae = _e.find("tr:first").height() + 1, Ee = Xe("slotMinutes") / Ie, Le = Ae / Ee
            }

            function y(e) {
                ke = e, ze.clear(), Be.clear();
                var i = ee.find("th:first");
                de && (i = i.add(de.find("th:first"))), i = i.add(_e.find("th:first")), De = 0, S(i.width("").each(function (e, i) {
                    De = Math.max(De, t(i).outerWidth())
                }), De);
                var n = K.find(".fc-agenda-gutter");
                de && (n = n.add(de.find("th.fc-agenda-gutter")));
                var a = pe[0].clientWidth;
                Me = pe.width() - a, Me ? (S(n, Me), n.show().prev().removeClass("fc-last")) : n.hide().prev().addClass("fc-last"), Te = Math.floor((a - De) / Re), S(ie.slice(0, -1), Te)
            }

            function x() {
                function t() {
                    pe.scrollTop(n)
                }
                var e = f(),
                    i = d(e);
                i.setHours(Xe("firstHour"));
                var n = z(e, i) + 1;
                t(), setTimeout(t, 0)
            }

            function w() {
                x()
            }

            function _(t) {
                t.click(k).mousedown(ti)
            }

            function C(t) {
                t.click(k).mousedown(X)
            }

            function k(t) {
                if (!Xe("selectable")) {
                    var e = Math.min(Re - 1, Math.floor((t.pageX - K.offset().left - De) / Te)),
                        i = ii(0, e),
                        n = this.parentNode.className.match(/fc-slot(\d+)/);
                    if (n) {
                        var a = parseInt(n[1]) * Xe("slotMinutes"),
                            r = Math.floor(a / 60);
                        i.setHours(r), i.setMinutes(a % 60 + Oe), Ge("dayClick", ae[e], i, !1, t)
                    } else Ge("dayClick", ae[e], i, !0, t)
                }
            }

            function T(t, e, i) {
                i && He.build();
                for (var n = ai(t, e), a = 0; a < n.length; a++) {
                    var r = n[a];
                    _(F(r.row, r.leftCol, r.row, r.rightCol))
                }
            }

            function F(t, e, i, n) {
                var a = He.rect(t, e, i, n, he);
                return Je(a, he)
            }

            function M(t, e) {
                for (var i = 0; Re > i; i++) {
                    var n = ii(0, i),
                        a = l(d(n), 1),
                        r = new Date(Math.max(n, t)),
                        s = new Date(Math.min(a, e));
                    if (s > r) {
                        var o = He.rect(0, i, 0, i, ge),
                            h = z(n, r),
                            c = z(n, s);
                        o.top = h, o.height = c - h, C(Je(o, ge))
                    }
                }
            }

            function A(t) {
                return ze.left(t)
            }

            function E(t) {
                return Be.left(t)
            }

            function L(t) {
                return ze.right(t)
            }

            function R(t) {
                return Be.right(t)
            }

            function P(t) {
                return Xe("allDaySlot") && !t.row
            }

            function N(t) {
                var e = ii(0, t.col),
                    i = t.row;
                return Xe("allDaySlot") && i--, i >= 0 && c(e, Oe + i * Ie), e
            }

            function z(t, i) {
                if (t = d(t, !0), i < c(d(t), Oe)) return 0;
                if (i >= c(d(t), $e)) return _e.height();
                var n = Xe("slotMinutes"),
                    a = 60 * i.getHours() + i.getMinutes() - Oe,
                    r = Math.floor(a / n),
                    s = si[r];
                return s === e && (s = si[r] = _e.find("tr").eq(r).find("td div")[0].offsetTop), Math.max(0, Math.round(s - 1 + Ae * (a % n / n)))
            }

            function B() {
                return fe
            }

            function $(t) {
                var e = d(t.start);
                return t.allDay ? e : c(e, Xe("defaultEventMinutes"))
            }

            function q(t, e) {
                return e ? d(t) : c(d(t), Xe("slotMinutes"))
            }

            function Y(t, e, i) {
                i ? Xe("allDaySlot") && T(t, l(d(e), 1), !0) : U(t, e)
            }

            function U(e, i) {
                var n = Xe("selectHelper");
                if (He.build(), n) {
                    var a = ni(e).col;
                    if (a >= 0 && Re > a) {
                        var r = He.rect(0, a, 0, a, ge),
                            s = z(e, e),
                            o = z(e, i);
                        if (o > s) {
                            if (r.top = s, r.height = o - s, r.left += 2, r.width -= 5, t.isFunction(n)) {
                                var l = n(e, i);
                                l && (r.position = "absolute", Ce = t(l).css(r).appendTo(ge))
                            } else r.isStart = !0, r.isEnd = !0, Ce = t(ei({
                                title: "",
                                start: e,
                                end: i,
                                className: ["fc-select-helper"],
                                editable: !1
                            }, r)), Ce.css("opacity", Xe("dragOpacity"));
                            Ce && (C(Ce), ge.append(Ce), S(Ce, r.width, !0), D(Ce, r.height, !0))
                        }
                    }
                } else M(e, i)
            }

            function V() {
                Qe(), Ce && (Ce.remove(), Ce = null)
            }

            function X(e) {
                if (1 == e.which && Xe("selectable")) {
                    Ke(e);
                    var i;
                    Ne.start(function (t, e) {
                        if (V(), t && t.col == e.col && !P(t)) {
                            var n = N(e),
                                a = N(t);
                            i = [n, c(d(n), Ie), a, c(d(a), Ie)].sort(H), U(i[0], i[3])
                        } else i = null
                    }, e), t(document).one("mouseup", function (t) {
                        Ne.stop(), i && (+i[0] == +i[1] && G(i[0], !1, t), Ze(i[0], i[3], !1, t))
                    })
                }
            }

            function G(t, e, i) {
                Ge("dayClick", ae[ni(t).col], t, e, i)
            }

            function J(t, e) {
                Ne.start(function (t) {
                    if (Qe(), t)
                        if (P(t)) F(t.row, t.col, t.row, t.col);
                        else {
                            var e = N(t),
                                i = c(d(e), Xe("defaultEventMinutes"));
                            M(e, i)
                        }
                }, e)
            }

            function Q(t, e, i) {
                var n = Ne.stop();
                Qe(), n && Ge("drop", t, N(n), P(n), e, i)
            }
            var Z = this;
            Z.renderAgenda = r, Z.setWidth = y, Z.setHeight = v, Z.afterRender = w, Z.defaultEventEnd = $, Z.timePosition = z, Z.getIsCellAllDay = P, Z.allDayRow = B, Z.getCoordinateGrid = function () {
                return He
            }, Z.getHoverListener = function () {
                return Ne
            }, Z.colLeft = A, Z.colRight = L, Z.colContentLeft = E, Z.colContentRight = R, Z.getDaySegmentContainer = function () {
                return ce
            }, Z.getSlotSegmentContainer = function () {
                return xe
            }, Z.getMinMinute = function () {
                return Oe
            }, Z.getMaxMinute = function () {
                return $e
            }, Z.getSlotContainer = function () {
                return ge
            }, Z.getRowCnt = function () {
                return 1
            }, Z.getColCnt = function () {
                return Re
            }, Z.getColWidth = function () {
                return Te
            }, Z.getSnapHeight = function () {
                return Le
            }, Z.getSnapMinutes = function () {
                return Ie
            }, Z.defaultSelectionEnd = q, Z.renderDayOverlay = T, Z.renderSelection = Y, Z.clearSelection = V, Z.reportDayClick = G, Z.dragStart = J, Z.dragStop = Q, ue.call(Z, i, n, a), ve.call(Z), me.call(Z), te.call(Z);
            var K, ee, ie, ne, ae, re, se, oe, le, he, ce, de, fe, pe, ge, xe, _e, Ce, ke, Se, De, Te, Me, Ae, Ie, Ee, Le, Re, Pe, He, Ne, ze, Be, je, We, Oe, $e, qe, Ye, Ue, Ve, Xe = Z.opt,
                Ge = Z.trigger,
                Je = Z.renderOverlay,
                Qe = Z.clearOverlays,
                Ze = Z.reportSelection,
                Ke = Z.unselect,
                ti = Z.daySelectionMousedown,
                ei = Z.slotSegHtml,
                ii = Z.cellToDate,
                ni = Z.dateToCell,
                ai = Z.rangeToSegments,
                ri = n.formatDate,
                si = {};
            W(i.addClass("fc-agenda")), He = new be(function (e, i) {
                function n(t) {
                    return Math.max(l, Math.min(h, t))
                }
                var a, r, s;
                ie.each(function (e, n) {
                    a = t(n), r = a.offset().left, e && (s[1] = r), s = [r], i[e] = s
                }), s[1] = r + a.outerWidth(), Xe("allDaySlot") && (a = fe, r = a.offset().top, e[0] = [r, r + a.outerHeight()]);
                for (var o = ge.offset().top, l = pe.offset().top, h = l + pe.outerHeight(), c = 0; Pe * Ee > c; c++) e.push([n(o + Le * c), n(o + Le * (c + 1))])
            }), Ne = new ye(He), ze = new we(function (t) {
                return re.eq(t)
            }), Be = new we(function (t) {
                return se.eq(t)
            })
        }

        function te() {
            function i(t, e) {
                var i, n = t.length,
                    r = [],
                    s = [];
                for (i = 0; n > i; i++) t[i].allDay ? r.push(t[i]) : s.push(t[i]);
                b("allDaySlot") && (te(r, e), F()), o(a(s), e)
            }

            function n() {
                M().empty(), A().empty()
            }

            function a(e) {
                var i, n, a, o, l, h = W(),
                    u = R(),
                    f = L(),
                    p = t.map(e, s),
                    g = [];
                for (n = 0; h > n; n++)
                    for (i = B(0, n), c(i, u), l = r(e, p, i, c(d(i), f - u)), l = ee(l), a = 0; a < l.length; a++) o = l[a], o.col = n, g.push(o);
                return g
            }

            function r(t, e, i, n) {
                var a, r, s, o, l, h, c, u, f = [],
                    p = t.length;
                for (a = 0; p > a; a++) r = t[a], s = r.start, o = e[a], o > i && n > s && (i > s ? (l = d(i), c = !1) : (l = s, c = !0), o > n ? (h = d(n), u = !1) : (h = o, u = !0), f.push({
                    event: r,
                    start: l,
                    end: h,
                    isStart: c,
                    isEnd: u
                }));
                return f.sort(ce)
            }

            function s(t) {
                return t.end ? d(t.end) : c(d(t.start), b("defaultEventMinutes"))
            }

            function o(i, n) {
                var a, r, s, o, l, c, d, f, p, g, m, v, x, w, _, C, S = i.length,
                    D = "",
                    F = A(),
                    M = b("isRTL");
                for (a = 0; S > a; a++) r = i[a], s = r.event, o = P(r.start, r.start), l = P(r.start, r.end), c = N(r.col), d = z(r.col), f = d - c, d -= .025 * f, f = d - c, p = f * (r.forwardCoord - r.backwardCoord), b("slotEventOverlap") && (p = Math.max(2 * (p - 10), p)), M ? (m = d - r.backwardCoord * f, g = m - p) : (g = c + r.backwardCoord * f, m = g + p), g = Math.max(g, c), m = Math.min(m, d), p = m - g, r.top = o, r.left = g, r.outerWidth = p, r.outerHeight = l - o, D += h(s, r);
                for (F[0].innerHTML = D, v = F.children(), a = 0; S > a; a++) r = i[a], s = r.event, x = t(v[a]), w = y("eventRender", s, s, x), w === !1 ? x.remove() : (w && w !== !0 && (x.remove(), x = t(w).css({
                    position: "absolute",
                    top: r.top,
                    left: r.left
                }).appendTo(F)), r.element = x, s._id === n ? u(s, x, r) : x[0]._fci = a, V(s, x));
                for (k(F, i, u), a = 0; S > a; a++) r = i[a], (x = r.element) && (r.vsides = I(x, !0), r.hsides = T(x, !0), _ = x.find(".fc-event-title"), _.length && (r.contentTop = _[0].offsetTop));
                for (a = 0; S > a; a++) r = i[a], (x = r.element) && (x[0].style.width = Math.max(0, r.outerWidth - r.hsides) + "px", C = Math.max(0, r.outerHeight - r.vsides), x[0].style.height = C + "px", s = r.event, r.contentTop !== e && C - r.contentTop < 10 && (x.find("div.fc-event-time").text(ne(s.start, b("timeFormat")) + " - " + s.title), x.find("div.fc-event-title").remove()), y("eventAfterRender", s, s, x))
            }

            function h(t, e) {
                var i = "<",
                    n = t.url,
                    a = $(t, b),
                    r = ["fc-event", "fc-event-vert"];
                return x(t) && r.push("fc-event-draggable"), e.isStart && r.push("fc-event-start"), e.isEnd && r.push("fc-event-end"), r = r.concat(t.className), t.source && (r = r.concat(t.source.className || [])), i += n ? "a href='" + j(t.url) + "'" : "div", i += " class='" + r.join(" ") + "'" + " style=" + "'" + "position:absolute;" + "top:" + e.top + "px;" + "left:" + e.left + "px;" + a + "'" + ">" + "<div class='fc-event-inner'>" + "<div class='fc-event-time'>" + j(ae(t.start, t.end, b("timeFormat"))) + "</div>" + "<div class='fc-event-title'>" + j(t.title || "") + "</div>" + "</div>" + "<div class='fc-event-bg'></div>", e.isEnd && w(t) && (i += "<div class='ui-resizable-handle ui-resizable-s'>=</div>"), i += "</" + (n ? "a" : "div") + ">"
            }

            function u(t, e, i) {
                var n = e.find("div.fc-event-time");
                x(t) && g(t, e, n), i.isEnd && w(t) && m(t, e, n), S(t, e)
            }

            function f(t, e, i) {
                function n() {
                    h || (e.width(a).height("").draggable("option", "grid", null), h = !0)
                }
                var a, r, s, o = i.isStart,
                    h = !0,
                    c = E(),
                    u = O(),
                    f = q(),
                    g = Y(),
                    m = R();
                e.draggable({
                    opacity: b("dragOpacity", "month"),
                    revertDuration: b("dragRevertDuration"),
                    start: function (i, m) {
                        y("eventDragStart", e, t, i, m), G(t, e), a = e.width(), c.start(function (i, a) {
                            if (K(), i) {
                                r = !1;
                                var c = B(0, a.col),
                                    m = B(0, i.col);
                                s = p(m, c), i.row ? o ? h && (e.width(u - 10), D(e, f * Math.round((t.end ? (t.end - t.start) / Ie : b("defaultEventMinutes")) / g)), e.draggable("option", "grid", [u, 1]), h = !1) : r = !0 : (Z(l(d(t.start), s), l(_(t), s)), n()), r = r || h && !s
                            } else n(), r = !0;
                            e.draggable("option", "revert", r)
                        }, i, "drag")
                    },
                    stop: function (i, a) {
                        if (c.stop(), K(), y("eventDragStop", e, t, i, a), r) n(), e.css("filter", ""), X(t, e);
                        else {
                            var o = 0;
                            h || (o = Math.round((e.offset().top - U().offset().top) / f) * g + m - (60 * t.start.getHours() + t.start.getMinutes())), J(this, t, s, o, h, i, a)
                        }
                    }
                })
            }

            function g(t, e, i) {
                function n() {
                    K(), o && (u ? (i.hide(), e.draggable("option", "grid", null), Z(l(d(t.start), x), l(_(t), x))) : (a(w), i.css("display", ""), e.draggable("option", "grid", [D, T])))
                }

                function a(e) {
                    var n, a = c(d(t.start), e);
                    t.end && (n = c(d(t.end), e)), i.text(ae(a, n, b("timeFormat")))
                }
                var r, s, o, h, u, f, g, m, x, w, C, k = v.getCoordinateGrid(),
                    S = W(),
                    D = O(),
                    T = q(),
                    F = Y();
                e.draggable({
                    scroll: !1,
                    grid: [D, T],
                    axis: 1 == S ? "y" : !1,
                    opacity: b("dragOpacity"),
                    revertDuration: b("dragRevertDuration"),
                    start: function (i, n) {
                        y("eventDragStart", e, t, i, n), G(t, e), k.build(), r = e.position(), s = k.cell(i.pageX, i.pageY), o = h = !0, u = f = H(s), g = m = 0, x = 0, w = C = 0
                    },
                    drag: function (t, i) {
                        var a = k.cell(t.pageX, t.pageY);
                        if (o = !!a) {
                            if (u = H(a), g = Math.round((i.position.left - r.left) / D), g != m) {
                                var l = B(0, s.col),
                                    c = s.col + g;
                                c = Math.max(0, c), c = Math.min(S - 1, c);
                                var d = B(0, c);
                                x = p(d, l)
                            }
                            u || (w = Math.round((i.position.top - r.top) / T) * F)
                        }(o != h || u != f || g != m || w != C) && (n(), h = o, f = u, m = g, C = w), e.draggable("option", "revert", !o)
                    },
                    stop: function (i, a) {
                        K(), y("eventDragStop", e, t, i, a), o && (u || x || w) ? J(this, t, x, u ? 0 : w, u, i, a) : (o = !0, u = !1, g = 0, x = 0, w = 0, n(), e.css("filter", ""), e.css(r), X(t, e))
                    }
                })
            }

            function m(t, e, i) {
                var n, a, r = q(),
                    s = Y();
                e.resizable({
                    handles: {
                        s: ".ui-resizable-handle"
                    },
                    grid: r,
                    start: function (i, r) {
                        n = a = 0, G(t, e), y("eventResizeStart", this, t, i, r)
                    },
                    resize: function (o, l) {
                        n = Math.round((Math.max(r, e.height()) - l.originalSize.height) / r), n != a && (i.text(ae(t.start, n || t.end ? c(C(t), s * n) : null, b("timeFormat"))), a = n)
                    },
                    stop: function (i, a) {
                        y("eventResizeStop", this, t, i, a), n ? Q(this, t, 0, s * n, i, a) : X(t, e)
                    }
                })
            }
            var v = this;
            v.renderEvents = i, v.clearEvents = n, v.slotSegHtml = h, de.call(v);
            var b = v.opt,
                y = v.trigger,
                x = v.isEventDraggable,
                w = v.isEventResizable,
                C = v.eventEnd,
                S = v.eventElementHandlers,
                F = v.setHeight,
                M = v.getDaySegmentContainer,
                A = v.getSlotSegmentContainer,
                E = v.getHoverListener,
                L = v.getMaxMinute,
                R = v.getMinMinute,
                P = v.timePosition,
                H = v.getIsCellAllDay,
                N = v.colContentLeft,
                z = v.colContentRight,
                B = v.cellToDate,
                W = v.getColCnt,
                O = v.getColWidth,
                q = v.getSnapHeight,
                Y = v.getSnapMinutes,
                U = v.getSlotContainer,
                V = v.reportEventElement,
                X = v.showEvents,
                G = v.hideEvents,
                J = v.eventDrop,
                Q = v.eventResize,
                Z = v.renderDayOverlay,
                K = v.clearOverlays,
                te = v.renderDayEvents,
                ie = v.calendar,
                ne = ie.formatDate,
                ae = ie.formatDates;
            v.draggableDayEvent = f
        }

        function ee(t) {
            var e, i = ie(t),
                n = i[0];
            if (ne(i), n) {
                for (e = 0; e < n.length; e++) ae(n[e]);
                for (e = 0; e < n.length; e++) re(n[e], 0, 0)
            }
            return se(i)
        }

        function ie(t) {
            var e, i, n, a = [];
            for (e = 0; e < t.length; e++) {
                for (i = t[e], n = 0; n < a.length && oe(i, a[n]).length; n++);
                (a[n] || (a[n] = [])).push(i)
            }
            return a
        }

        function ne(t) {
            var e, i, n, a, r;
            for (e = 0; e < t.length; e++)
                for (i = t[e], n = 0; n < i.length; n++)
                    for (a = i[n], a.forwardSegs = [], r = e + 1; r < t.length; r++) oe(a, t[r], a.forwardSegs)
        }

        function ae(t) {
            var i, n, a = t.forwardSegs,
                r = 0;
            if (t.forwardPressure === e) {
                for (i = 0; i < a.length; i++) n = a[i], ae(n), r = Math.max(r, 1 + n.forwardPressure);
                t.forwardPressure = r
            }
        }

        function re(t, i, n) {
            var a, r = t.forwardSegs;
            if (t.forwardCoord === e)
                for (r.length ? (r.sort(he), re(r[0], i + 1, n), t.forwardCoord = r[0].backwardCoord) : t.forwardCoord = 1, t.backwardCoord = t.forwardCoord - (t.forwardCoord - n) / (i + 1), a = 0; a < r.length; a++) re(r[a], 0, t.forwardCoord)
        }

        function se(t) {
            var e, i, n, a = [];
            for (e = 0; e < t.length; e++)
                for (i = t[e], n = 0; n < i.length; n++) a.push(i[n]);
            return a
        }

        function oe(t, e, i) {
            i = i || [];
            for (var n = 0; n < e.length; n++) le(t, e[n]) && i.push(e[n]);
            return i
        }

        function le(t, e) {
            return t.end > e.start && t.start < e.end
        }

        function he(t, e) {
            return e.forwardPressure - t.forwardPressure || (t.backwardCoord || 0) - (e.backwardCoord || 0) || ce(t, e)
        }

        function ce(t, e) {
            return t.start - e.start || e.end - e.start - (t.end - t.start) || (t.event.title || "").localeCompare(e.event.title)
        }

        function ue(i, n, a) {
            function r(e, i) {
                var n = V[e];
                return t.isPlainObject(n) ? B(n, i || a) : n
            }

            function s(t, e) {
                return n.trigger.apply(n, [t, e || z].concat(Array.prototype.slice.call(arguments, 2), [z]))
            }

            function o(t) {
                var e = t.source || {};
                return Y(t.startEditable, e.startEditable, r("eventStartEditable"), t.editable, e.editable, r("editable")) && !r("disableDragging")
            }

            function h(t) {
                var e = t.source || {};
                return Y(t.durationEditable, e.durationEditable, r("eventDurationEditable"), t.editable, e.editable, r("editable")) && !r("disableResizing")
            }

            function u(t) {
                $ = {};
                var e, i, n = t.length;
                for (e = 0; n > e; e++) i = t[e], $[i._id] ? $[i._id].push(i) : $[i._id] = [i]
            }

            function f() {
                $ = {}, q = {}, U = []
            }

            function g(t) {
                return t.end ? d(t.end) : j(t)
            }

            function m(t, e) {
                U.push({
                    event: t,
                    element: e
                }), q[t._id] ? q[t._id].push(e) : q[t._id] = [e]
            }

            function v() {
                t.each(U, function (t, e) {
                    z.trigger("eventDestroy", e.event, e.event, e.element)
                })
            }

            function b(t, e) {
                e.click(function (i) {
                    return e.hasClass("ui-draggable-dragging") || e.hasClass("ui-resizable-resizing") ? void 0 : s("eventClick", this, t, i)
                }).hover(function (e) {
                    s("eventMouseover", this, t, e)
                }, function (e) {
                    s("eventMouseout", this, t, e)
                })
            }

            function y(t, e) {
                w(t, e, "show")
            }

            function x(t, e) {
                w(t, e, "hide")
            }

            function w(t, e, i) {
                var n, a = q[t._id],
                    r = a.length;
                for (n = 0; r > n; n++) e && a[n][0] == e[0] || a[n][i]()
            }

            function _(t, e, i, n, a, r, o) {
                var l = e.allDay,
                    h = e._id;
                k($[h], i, n, a), s("eventDrop", t, e, i, n, a, function () {
                    k($[h], -i, -n, l), O(h)
                }, r, o), O(h)
            }

            function C(t, e, i, n, a, r) {
                var o = e._id;
                S($[o], i, n), s("eventResize", t, e, i, n, function () {
                    S($[o], -i, -n), O(o)
                }, a, r), O(o)
            }

            function k(t, i, n, a) {
                n = n || 0;
                for (var r, s = t.length, o = 0; s > o; o++) r = t[o], a !== e && (r.allDay = a), c(l(r.start, i, !0), n), r.end && (r.end = c(l(r.end, i, !0), n)), W(r, V)
            }

            function S(t, e, i) {
                i = i || 0;
                for (var n, a = t.length, r = 0; a > r; r++) n = t[r], n.end = c(l(g(n), e, !0), i), W(n, V)
            }

            function D(t) {
                return "object" == typeof t && (t = t.getDay()), J[t]
            }

            function T() {
                return X
            }

            function F(t, e, i) {
                for (e = e || 1; J[(t.getDay() + (i ? e : 0) + 7) % 7];) l(t, e)
            }

            function M() {
                var t = A.apply(null, arguments),
                    e = I(t),
                    i = E(e);
                return i
            }

            function A(t, e) {
                var i = z.getColCnt(),
                    n = K ? -1 : 1,
                    a = K ? i - 1 : 0;
                "object" == typeof t && (e = t.col, t = t.row);
                var r = t * i + (e * n + a);
                return r
            }

            function I(t) {
                var e = z.visStart.getDay();
                return t += Q[e], 7 * Math.floor(t / X) + Z[(t % X + X) % X] - e
            }

            function E(t) {
                var e = d(z.visStart);
                return l(e, t), e
            }

            function L(t) {
                var e = R(t),
                    i = P(e),
                    n = H(i);
                return n
            }

            function R(t) {
                return p(t, z.visStart)
            }

            function P(t) {
                var e = z.visStart.getDay();
                return t += e, Math.floor(t / 7) * X + Q[(t % 7 + 7) % 7] - Q[e]
            }

            function H(t) {
                var e = z.getColCnt(),
                    i = K ? -1 : 1,
                    n = K ? e - 1 : 0,
                    a = Math.floor(t / e),
                    r = (t % e + e) % e * i + n;
                return {
                    row: a,
                    col: r
                }
            }

            function N(t, e) {
                for (var i = z.getRowCnt(), n = z.getColCnt(), a = [], r = R(t), s = R(e), o = P(r), l = P(s) - 1, h = 0; i > h; h++) {
                    var c = h * n,
                        u = c + n - 1,
                        d = Math.max(o, c),
                        f = Math.min(l, u);
                    if (f >= d) {
                        var p = H(d),
                            g = H(f),
                            m = [p.col, g.col].sort(),
                            v = I(d) == r,
                            b = I(f) + 1 == s;
                        a.push({
                            row: h,
                            leftCol: m[0],
                            rightCol: m[1],
                            isStart: v,
                            isEnd: b
                        })
                    }
                }
                return a
            }
            var z = this;
            z.element = i, z.calendar = n, z.name = a, z.opt = r, z.trigger = s, z.isEventDraggable = o, z.isEventResizable = h, z.setEventData = u, z.clearEventData = f, z.eventEnd = g, z.reportEventElement = m, z.triggerEventDestroy = v, z.eventElementHandlers = b, z.showEvents = y, z.hideEvents = x, z.eventDrop = _, z.eventResize = C;
            var j = z.defaultEventEnd,
                W = n.normalizeEvent,
                O = n.reportEventChange,
                $ = {},
                q = {},
                U = [],
                V = n.options;
            z.isHiddenDay = D, z.skipHiddenDays = F, z.getCellsPerWeek = T, z.dateToCell = L, z.dateToDayOffset = R, z.dayOffsetToCellOffset = P, z.cellOffsetToCell = H, z.cellToDate = M, z.cellToCellOffset = A, z.cellOffsetToDayOffset = I, z.dayOffsetToDate = E, z.rangeToSegments = N;
            var X, G = r("hiddenDays") || [],
                J = [],
                Q = [],
                Z = [],
                K = r("isRTL");
            ! function () {
                r("weekends") === !1 && G.push(0, 6);
                for (var e = 0, i = 0; 7 > e; e++) Q[e] = i, J[e] = -1 != t.inArray(e, G), J[e] || (Z[i] = e, i++);
                if (X = i, !X) throw "invalid hiddenDays"
            }()
        }

        function de() {
            function e(t, e) {
                var i = n(t, !1, !0);
                pe(i, function (t, e) {
                    E(t.event, e)
                }), y(i, e), pe(i, function (t, e) {
                    F("eventAfterRender", t.event, t.event, e)
                })
            }

            function i(t, e, i) {
                var a = n([t], !0, !1),
                    r = [];
                return pe(a, function (t, n) {
                    t.row === e && n.css("top", i), r.push(n[0])
                }), r
            }

            function n(e, i, n) {
                var r, l, h = G(),
                    d = i ? t("<div/>") : h,
                    f = a(e);
                return s(f), r = o(f), d[0].innerHTML = r, l = d.children(), i && h.append(l), c(f, l), pe(f, function (t, e) {
                    t.hsides = T(e, !0)
                }), pe(f, function (t, e) {
                    e.width(Math.max(0, t.outerWidth - t.hsides))
                }), pe(f, function (t, e) {
                    t.outerHeight = e.outerHeight(!0)
                }), u(f, n), f
            }

            function a(t) {
                for (var e = [], i = 0; i < t.length; i++) {
                    var n = r(t[i]);
                    e.push.apply(e, n)
                }
                return e
            }

            function r(t) {
                for (var e = t.start, i = _(t), n = ee(e, i), a = 0; a < n.length; a++) n[a].event = t;
                return n
            }

            function s(t) {
                for (var e = D("isRTL"), i = 0; i < t.length; i++) {
                    var n = t[i],
                        a = (e ? n.isEnd : n.isStart) ? V : Y,
                        r = (e ? n.isStart : n.isEnd) ? X : U,
                        s = a(n.leftCol),
                        o = r(n.rightCol);
                    n.left = s, n.outerWidth = o - s
                }
            }

            function o(t) {
                for (var e = "", i = 0; i < t.length; i++) e += h(t[i]);
                return e
            }

            function h(t) {
                var e = "",
                    i = D("isRTL"),
                    n = t.event,
                    a = n.url,
                    r = ["fc-event", "fc-event-hori"];
                M(n) && r.push("fc-event-draggable"), t.isStart && r.push("fc-event-start"), t.isEnd && r.push("fc-event-end"), r = r.concat(n.className), n.source && (r = r.concat(n.source.className || []));
                var s = $(n, D);
                return e += a ? "<a href='" + j(a) + "'" : "<div", e += " class='" + r.join(" ") + "'" + " style=" + "'" + "position:absolute;" + "left:" + t.left + "px;" + s + "'" + ">" + "<div class='fc-event-inner'>", !n.allDay && t.isStart && (e += "<span class='fc-event-time'>" + j(J(n.start, n.end, D("timeFormat"))) + "</span>"), e += "<span class='fc-event-title'>" + j(n.title || "") + "</span>" + "</div>", t.isEnd && A(n) && (e += "<div class='ui-resizable-handle ui-resizable-" + (i ? "w" : "e") + "'>" + "&nbsp;&nbsp;&nbsp;" + "</div>"), e += "</" + (a ? "a" : "div") + ">"
            }

            function c(e, i) {
                for (var n = 0; n < e.length; n++) {
                    var a = e[n],
                        r = a.event,
                        s = i.eq(n),
                        o = F("eventRender", r, r, s);
                    o === !1 ? s.remove() : (o && o !== !0 && (o = t(o).css({
                        position: "absolute",
                        left: a.left
                    }), s.replaceWith(o), s = o), a.element = s)
                }
            }

            function u(t, e) {
                var i = f(t),
                    n = b(),
                    a = [];
                if (e)
                    for (var r = 0; r < n.length; r++) n[r].height(i[r]);
                for (var r = 0; r < n.length; r++) a.push(n[r].position().top);
                pe(t, function (t, e) {
                    e.css("top", a[t.row] + t.top)
                })
            }

            function f(t) {
                for (var e = B(), i = O(), n = [], a = g(t), r = 0; e > r; r++) {
                    for (var s = a[r], o = [], l = 0; i > l; l++) o.push(0);
                    for (var h = 0; h < s.length; h++) {
                        var c = s[h];
                        c.top = N(o.slice(c.leftCol, c.rightCol + 1));
                        for (var l = c.leftCol; l <= c.rightCol; l++) o[l] = c.top + c.outerHeight
                    }
                    n.push(N(o))
                }
                return n
            }

            function g(t) {
                var e, i, n, a = B(),
                    r = [];
                for (e = 0; e < t.length; e++) i = t[e], n = i.row, i.element && (r[n] ? r[n].push(i) : r[n] = [i]);
                for (n = 0; a > n; n++) r[n] = m(r[n] || []);
                return r
            }

            function m(t) {
                for (var e = [], i = v(t), n = 0; n < i.length; n++) e.push.apply(e, i[n]);
                return e
            }

            function v(t) {
                t.sort(ge);
                for (var e = [], i = 0; i < t.length; i++) {
                    for (var n = t[i], a = 0; a < e.length && fe(n, e[a]); a++);
                    e[a] ? e[a].push(n) : e[a] = [n]
                }
                return e
            }

            function b() {
                var t, e = B(),
                    i = [];
                for (t = 0; e > t; t++) i[t] = q(t).find("div.fc-day-content > div");
                return i
            }

            function y(t, e) {
                var i = G();
                pe(t, function (t, i, n) {
                    var a = t.event;
                    a._id === e ? x(a, i, t) : i[0]._fci = n
                }), k(i, t, x)
            }

            function x(t, e, i) {
                M(t) && S.draggableDayEvent(t, e, i), i.isEnd && A(t) && S.resizableDayEvent(t, e, i), L(t, e)
            }

            function w(t, e) {
                var i, n = te();
                e.draggable({
                    delay: 50,
                    opacity: D("dragOpacity"),
                    revertDuration: D("dragRevertDuration"),
                    start: function (a, r) {
                        F("eventDragStart", e, t, a, r), P(t, e), n.start(function (n, a, r, s) {
                            if (e.draggable("option", "revert", !n || !r && !s), Z(), n) {
                                var o = ie(a),
                                    h = ie(n);
                                i = p(h, o), Q(l(d(t.start), i), l(_(t), i))
                            } else i = 0
                        }, a, "drag")
                    },
                    stop: function (a, r) {
                        n.stop(), Z(), F("eventDragStop", e, t, a, r), i ? H(this, t, i, 0, t.allDay, a, r) : (e.css("filter", ""), R(t, e))
                    }
                })
            }

            function C(e, n, a) {
                var r = D("isRTL"),
                    s = r ? "w" : "e",
                    o = n.find(".ui-resizable-" + s),
                    h = !1;
                W(n), n.mousedown(function (t) {
                    t.preventDefault()
                }).click(function (t) {
                    h && (t.preventDefault(), t.stopImmediatePropagation())
                }), o.mousedown(function (r) {
                    function o(i) {
                        F("eventResizeStop", this, e, i), t("body").css("cursor", ""), c.stop(), Z(), u && z(this, e, u, 0, i), setTimeout(function () {
                            h = !1
                        }, 0)
                    }
                    if (1 == r.which) {
                        h = !0;
                        var c = te();
                        B(), O();
                        var u, d, f = n.css("top"),
                            p = t.extend({}, e),
                            g = se(re(e.start));
                        K(), t("body").css("cursor", s + "-resize").one("mouseup", o), F("eventResizeStart", this, e, r), c.start(function (n, r) {
                            if (n) {
                                var o = ne(r),
                                    h = ne(n);
                                if (h = Math.max(h, g), u = ae(h) - ae(o)) {
                                    p.end = l(I(e), u, !0);
                                    var c = d;
                                    d = i(p, a.row, f), d = t(d), d.find("*").css("cursor", s + "-resize"), c && c.remove(), P(e)
                                } else d && (R(e), d.remove(), d = null);
                                Z(), Q(e.start, l(_(e), u))
                            }
                        }, r)
                    }
                })
            }
            var S = this;
            S.renderDayEvents = e, S.draggableDayEvent = w, S.resizableDayEvent = C;
            var D = S.opt,
                F = S.trigger,
                M = S.isEventDraggable,
                A = S.isEventResizable,
                I = S.eventEnd,
                E = S.reportEventElement,
                L = S.eventElementHandlers,
                R = S.showEvents,
                P = S.hideEvents,
                H = S.eventDrop,
                z = S.eventResize,
                B = S.getRowCnt,
                O = S.getColCnt;
            S.getColWidth;
            var q = S.allDayRow,
                Y = S.colLeft,
                U = S.colRight,
                V = S.colContentLeft,
                X = S.colContentRight;
            S.dateToCell;
            var G = S.getDaySegmentContainer,
                J = S.calendar.formatDates,
                Q = S.renderDayOverlay,
                Z = S.clearOverlays,
                K = S.clearSelection,
                te = S.getHoverListener,
                ee = S.rangeToSegments,
                ie = S.cellToDate,
                ne = S.cellToCellOffset,
                ae = S.cellOffsetToDayOffset,
                re = S.dateToDayOffset,
                se = S.dayOffsetToCellOffset
        }

        function fe(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                if (n.leftCol <= t.rightCol && n.rightCol >= t.leftCol) return !0
            }
            return !1
        }

        function pe(t, e) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i],
                    a = n.element;
                a && e(n, a, i)
            }
        }

        function ge(t, e) {
            return e.rightCol - e.leftCol - (t.rightCol - t.leftCol) || e.event.allDay - t.event.allDay || t.event.start - e.event.start || (t.event.title || "").localeCompare(e.event.title)
        }

        function me() {
            function e(t, e, a) {
                i(), e || (e = l(t, a)), h(t, e, a), n(t, e, a)
            }

            function i(t) {
                u && (u = !1, c(), o("unselect", null, t))
            }

            function n(t, e, i, n) {
                u = !0, o("select", null, t, e, i, n)
            }

            function a(e) {
                var a = r.cellToDate,
                    o = r.getIsCellAllDay,
                    l = r.getHoverListener(),
                    u = r.reportDayClick;
                if (1 == e.which && s("selectable")) {
                    i(e);
                    var d;
                    l.start(function (t, e) {
                        c(), t && o(t) ? (d = [a(e), a(t)].sort(H), h(d[0], d[1], !0)) : d = null
                    }, e), t(document).one("mouseup", function (t) {
                        l.stop(), d && (+d[0] == +d[1] && u(d[0], !0, t), n(d[0], d[1], !0, t))
                    })
                }
            }
            var r = this;
            r.select = e, r.unselect = i, r.reportSelection = n, r.daySelectionMousedown = a;
            var s = r.opt,
                o = r.trigger,
                l = r.defaultSelectionEnd,
                h = r.renderSelection,
                c = r.clearSelection,
                u = !1;
            s("selectable") && s("unselectAuto") && t(document).mousedown(function (e) {
                var n = s("unselectCancel");
                n && t(e.target).parents(n).length || i(e)
            })
        }

        function ve() {
            function e(e, i) {
                var n = r.shift();
                return n || (n = t("<div class='fc-cell-overlay' style='position:absolute;z-index:3'/>")), n[0].parentNode != i[0] && n.appendTo(i), a.push(n.css(e).show()), n
            }

            function i() {
                for (var t; t = a.shift();) r.push(t.hide().unbind())
            }
            var n = this;
            n.renderOverlay = e, n.clearOverlays = i;
            var a = [],
                r = []
        }

        function be(t) {
            var e, i, n = this;
            n.build = function () {
                e = [], i = [], t(e, i)
            }, n.cell = function (t, n) {
                var a, r = e.length,
                    s = i.length,
                    o = -1,
                    l = -1;
                for (a = 0; r > a; a++)
                    if (n >= e[a][0] && n < e[a][1]) {
                        o = a;
                        break
                    }
                for (a = 0; s > a; a++)
                    if (t >= i[a][0] && t < i[a][1]) {
                        l = a;
                        break
                    }
                return o >= 0 && l >= 0 ? {
                    row: o,
                    col: l
                } : null
            }, n.rect = function (t, n, a, r, s) {
                var o = s.offset();
                return {
                    top: e[t][0] - o.top,
                    left: i[n][0] - o.left,
                    width: i[r][1] - i[n][0],
                    height: e[a][1] - e[t][0]
                }
            }
        }

        function ye(e) {
            function i(t) {
                xe(t);
                var i = e.cell(t.pageX, t.pageY);
                (!i != !s || i && (i.row != s.row || i.col != s.col)) && (i ? (r || (r = i), a(i, r, i.row - r.row, i.col - r.col)) : a(i, r), s = i)
            }
            var n, a, r, s, o = this;
            o.start = function (o, l, h) {
                a = o, r = s = null, e.build(), i(l), n = h || "mousemove", t(document).bind(n, i)
            }, o.stop = function () {
                return t(document).unbind(n, i), s
            }
        }

        function xe(t) {
            t.pageX === e && (t.pageX = t.originalEvent.pageX, t.pageY = t.originalEvent.pageY)
        }

        function we(t) {
            function i(e) {
                return a[e] = a[e] || t(e)
            }
            var n = this,
                a = {},
                r = {},
                s = {};
            n.left = function (t) {
                return r[t] = r[t] === e ? i(t).position().left : r[t]
            }, n.right = function (t) {
                return s[t] = s[t] === e ? n.left(t) + i(t).width() : s[t]
            }, n.clear = function () {
                a = {}, r = {}, s = {}
            }
        }
        var _e = {
                defaultView: "month",
                aspectRatio: 1.35,
                header: {
                    left: "title",
                    center: "",
                    right: "today prev,next"
                },
                weekends: !0,
                weekNumbers: !1,
                weekNumberCalculation: "iso",
                weekNumberTitle: "W",
                allDayDefault: !0,
                ignoreTimezone: !0,
                lazyFetching: !0,
                startParam: "start",
                endParam: "end",
                titleFormat: {
                    month: "MMMM yyyy",
                    week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}",
                    day: "dddd, MMM d, yyyy"
                },
                columnFormat: {
                    month: "ddd",
                    week: "ddd M/d",
                    day: "dddd M/d"
                },
                timeFormat: {
                    "": "h(:mm)t"
                },
                isRTL: !1,
                firstDay: 0,
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                buttonText: {
                    prev: "<span class='fc-text-arrow icon-chevron-left'></span>",
                    next: "<span class='fc-text-arrow icon-chevron-right'></span>",
                    prevYear: "<span class='fc-text-arrow icon-chevron-left'></span>",
                    nextYear: "<span class='fc-text-arrow icon-chevron-right'></span>",
                    today: "today",
                    month: "month",
                    week: "week",
                    day: "day"
                },
                theme: !1,
                buttonIcons: {
                    prev: "circle-triangle-w",
                    next: "circle-triangle-e"
                },
                unselectAuto: !0,
                dropAccept: "*",
                handleWindowResize: !0
            },
            Ce = {
                header: {
                    left: "next,prev today",
                    center: "",
                    right: "title"
                },
                buttonText: {
                    prev: "<span class='fc-text-arrow icon-chevron-right'></span>",
                    next: "<span class='fc-text-arrow icon-chevron-left'></span>",
                    prevYear: "<span class='fc-text-arrow icon-chevron-right'></span>",
                    nextYear: "<span class='fc-text-arrow icon-chevron-left'></span>"
                },
                buttonIcons: {
                    prev: "circle-triangle-e",
                    next: "circle-triangle-w"
                }
            },
            ke = t.fullCalendar = {
                version: "1.6.4"
            },
            Se = ke.views = {};
        t.fn.fullCalendar = function (i) {
            if ("string" == typeof i) {
                var a, r = Array.prototype.slice.call(arguments, 1);
                return this.each(function () {
                    var n = t.data(this, "fullCalendar");
                    if (n && t.isFunction(n[i])) {
                        var s = n[i].apply(n, r);
                        a === e && (a = s), "destroy" == i && t.removeData(this, "fullCalendar")
                    }
                }), a !== e ? a : this
            }
            i = i || {};
            var s = i.eventSources || [];
            return delete i.eventSources, i.events && (s.push(i.events), delete i.events), i = t.extend(!0, {}, _e, i.isRTL || i.isRTL === e && _e.isRTL ? Ce : {}, i), this.each(function (e, a) {
                var r = t(a),
                    o = new n(r, i, s);
                r.data("fullCalendar", o), o.render()
            }), this
        }, ke.sourceNormalizers = [], ke.sourceFetchers = [];
        var De = {
                dataType: "json",
                cache: !1
            },
            Te = 1;
        ke.addDays = l, ke.cloneDate = d, ke.parseDate = m, ke.parseISO8601 = v, ke.parseTime = b, ke.formatDate = y, ke.formatDates = x;
        var Fe = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
            Me = 864e5,
            Ae = 36e5,
            Ie = 6e4,
            Ee = {
                s: function (t) {
                    return t.getSeconds()
                },
                ss: function (t) {
                    return z(t.getSeconds())
                },
                m: function (t) {
                    return t.getMinutes()
                },
                mm: function (t) {
                    return z(t.getMinutes())
                },
                h: function (t) {
                    return t.getHours() % 12 || 12
                },
                hh: function (t) {
                    return z(t.getHours() % 12 || 12)
                },
                H: function (t) {
                    return t.getHours()
                },
                HH: function (t) {
                    return z(t.getHours())
                },
                d: function (t) {
                    return t.getDate()
                },
                dd: function (t) {
                    return z(t.getDate())
                },
                ddd: function (t, e) {
                    return e.dayNamesShort[t.getDay()]
                },
                dddd: function (t, e) {
                    return e.dayNames[t.getDay()]
                },
                M: function (t) {
                    return t.getMonth() + 1
                },
                MM: function (t) {
                    return z(t.getMonth() + 1)
                },
                MMM: function (t, e) {
                    return e.monthNamesShort[t.getMonth()]
                },
                MMMM: function (t, e) {
                    return e.monthNames[t.getMonth()]
                },
                yy: function (t) {
                    return (t.getFullYear() + "").substring(2)
                },
                yyyy: function (t) {
                    return t.getFullYear()
                },
                t: function (t) {
                    return t.getHours() < 12 ? "a" : "p"
                },
                tt: function (t) {
                    return t.getHours() < 12 ? "am" : "pm"
                },
                T: function (t) {
                    return t.getHours() < 12 ? "A" : "P"
                },
                TT: function (t) {
                    return t.getHours() < 12 ? "AM" : "PM"
                },
                u: function (t) {
                    return y(t, "yyyy-MM-dd'T'HH:mm:ss'Z'")
                },
                S: function (t) {
                    var e = t.getDate();
                    return e > 10 && 20 > e ? "th" : ["st", "nd", "rd"][e % 10 - 1] || "th"
                },
                w: function (t, e) {
                    return e.weekNumberCalculation(t)
                },
                W: function (t) {
                    return w(t)
                }
            };
        ke.dateFormatters = Ee, ke.applyAll = q, Se.month = U, Se.basicWeek = V, Se.basicDay = X, i({
            weekMode: "fixed"
        }), Se.agendaWeek = Q, Se.agendaDay = Z, i({
            allDaySlot: !0,
            allDayText: "all-day",
            firstHour: 6,
            slotMinutes: 30,
            defaultEventMinutes: 120,
            axisFormat: "h(:mm)tt",
            timeFormat: {
                agenda: "h:mm{ - h:mm}"
            },
            dragOpacity: {
                agenda: .5
            },
            minTime: 0,
            maxTime: 24,
            slotEventOverlap: !0
        })
    }(jQuery),
    /*
     * File:        jquery.dataTables.min.js
     * Version:     1.9.4
     * Author:      Allan Jardine (www.sprymedia.co.uk)
     * Info:        www.datatables.net
     *
     * Copyright 2008-2012 Allan Jardine, all rights reserved.
     *
     * This source file is free software, under either the GPL v2 license or a
     * BSD style license, available at:
     *   http://datatables.net/license_gpl2
     *   http://datatables.net/license_bsd
     *
     * This source file is distributed in the hope that it will be useful, but
     * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
     * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
     */
    function (X, l, n) {
        var L = function (h) {
            var j = function (e) {
                function o(t, e) {
                    var i = j.defaults.columns,
                        a = t.aoColumns.length,
                        i = h.extend({}, j.models.oColumn, i, {
                            sSortingClass: t.oClasses.sSortable,
                            sSortingClassJUI: t.oClasses.sSortJUI,
                            nTh: e ? e : l.createElement("th"),
                            sTitle: i.sTitle ? i.sTitle : e ? e.innerHTML : "",
                            aDataSort: i.aDataSort ? i.aDataSort : [a],
                            mData: i.mData ? i.oDefaults : a
                        });
                    t.aoColumns.push(i), t.aoPreSearchCols[a] === n || null === t.aoPreSearchCols[a] ? t.aoPreSearchCols[a] = h.extend({}, j.models.oSearch) : (i = t.aoPreSearchCols[a], i.bRegex === n && (i.bRegex = !0), i.bSmart === n && (i.bSmart = !0), i.bCaseInsensitive === n && (i.bCaseInsensitive = !0)), m(t, a, null)
                }

                function m(t, e, i) {
                    var a = t.aoColumns[e];
                    i !== n && null !== i && (i.mDataProp && !i.mData && (i.mData = i.mDataProp), i.sType !== n && (a.sType = i.sType, a._bAutoType = !1), h.extend(a, i), p(a, i, "sWidth", "sWidthOrig"), i.iDataSort !== n && (a.aDataSort = [i.iDataSort]), p(a, i, "aDataSort"));
                    var r = a.mRender ? Q(a.mRender) : null,
                        s = Q(a.mData);
                    a.fnGetData = function (t, e) {
                        var i = s(t, e);
                        return a.mRender && e && "" !== e ? r(i, e, t) : i
                    }, a.fnSetData = L(a.mData), t.oFeatures.bSort || (a.bSortable = !1), !a.bSortable || -1 == h.inArray("asc", a.asSorting) && -1 == h.inArray("desc", a.asSorting) ? (a.sSortingClass = t.oClasses.sSortableNone, a.sSortingClassJUI = "") : -1 == h.inArray("asc", a.asSorting) && -1 == h.inArray("desc", a.asSorting) ? (a.sSortingClass = t.oClasses.sSortable, a.sSortingClassJUI = t.oClasses.sSortJUI) : -1 != h.inArray("asc", a.asSorting) && -1 == h.inArray("desc", a.asSorting) ? (a.sSortingClass = t.oClasses.sSortableAsc, a.sSortingClassJUI = t.oClasses.sSortJUIAscAllowed) : -1 == h.inArray("asc", a.asSorting) && -1 != h.inArray("desc", a.asSorting) && (a.sSortingClass = t.oClasses.sSortableDesc, a.sSortingClassJUI = t.oClasses.sSortJUIDescAllowed)
                }

                function k(t) {
                    if (!1 === t.oFeatures.bAutoWidth) return !1;
                    da(t);
                    for (var e = 0, i = t.aoColumns.length; i > e; e++) t.aoColumns[e].nTh.style.width = t.aoColumns[e].sWidth
                }

                function G(t, e) {
                    var i = r(t, "bVisible");
                    return "number" == typeof i[e] ? i[e] : null
                }

                function R(t, e) {
                    var i = r(t, "bVisible"),
                        i = h.inArray(e, i);
                    return -1 !== i ? i : null
                }

                function t(t) {
                    return r(t, "bVisible").length
                }

                function r(t, e) {
                    var i = [];
                    return h.map(t.aoColumns, function (t, n) {
                        t[e] && i.push(n)
                    }), i
                }

                function B(t) {
                    for (var e = j.ext.aTypes, i = e.length, n = 0; i > n; n++) {
                        var a = e[n](t);
                        if (null !== a) return a
                    }
                    return "string"
                }

                function u(t, e) {
                    for (var i = e.split(","), n = [], a = 0, r = t.aoColumns.length; r > a; a++)
                        for (var s = 0; r > s; s++)
                            if (t.aoColumns[a].sName == i[s]) {
                                n.push(s);
                                break
                            }
                    return n
                }

                function M(t) {
                    for (var e = "", i = 0, n = t.aoColumns.length; n > i; i++) e += t.aoColumns[i].sName + ",";
                    return e.length == n ? "" : e.slice(0, -1)
                }

                function ta(t, e, i, n) {
                    var a, r, s, l, c;
                    if (e)
                        for (a = e.length - 1; a >= 0; a--) {
                            var u = e[a].aTargets;
                            for (h.isArray(u) || D(t, 1, "aTargets must be an array of targets, not a " + typeof u), r = 0, s = u.length; s > r; r++)
                                if ("number" == typeof u[r] && 0 <= u[r]) {
                                    for (; t.aoColumns.length <= u[r];) o(t);
                                    n(u[r], e[a])
                                } else if ("number" == typeof u[r] && 0 > u[r]) n(t.aoColumns.length + u[r], e[a]);
                            else if ("string" == typeof u[r])
                                for (l = 0, c = t.aoColumns.length; c > l; l++)("_all" == u[r] || h(t.aoColumns[l].nTh).hasClass(u[r])) && n(l, e[a])
                        }
                    if (i)
                        for (a = 0, t = i.length; t > a; a++) n(a, i[a])
                }

                function H(t, e) {
                    var i;
                    i = h.isArray(e) ? e.slice() : h.extend(!0, {}, e);
                    var n = t.aoData.length,
                        a = h.extend(!0, {}, j.models.oRow);
                    a._aData = i, t.aoData.push(a);
                    for (var r, a = 0, s = t.aoColumns.length; s > a; a++) i = t.aoColumns[a], "function" == typeof i.fnRender && i.bUseRendered && null !== i.mData ? F(t, n, a, S(t, n, a)) : F(t, n, a, v(t, n, a)), i._bAutoType && "string" != i.sType && (r = v(t, n, a, "type"), null !== r && "" !== r && (r = B(r), null === i.sType ? i.sType = r : i.sType != r && "html" != i.sType && (i.sType = "string")));
                    return t.aiDisplayMaster.push(n), t.oFeatures.bDeferRender || ea(t, n), n
                }

                function ua(t) {
                    var e, i, n, a, r, s, o;
                    if (t.bDeferLoading || null === t.sAjaxSource)
                        for (e = t.nTBody.firstChild; e;) {
                            if ("TR" == e.nodeName.toUpperCase())
                                for (i = t.aoData.length, e._DT_RowIndex = i, t.aoData.push(h.extend(!0, {}, j.models.oRow, {
                                    nTr: e
                                })), t.aiDisplayMaster.push(i), r = e.firstChild, n = 0; r;) s = r.nodeName.toUpperCase(), ("TD" == s || "TH" == s) && (F(t, i, n, h.trim(r.innerHTML)), n++), r = r.nextSibling;
                            e = e.nextSibling
                        }
                    for (a = T(t), n = [], e = 0, i = a.length; i > e; e++)
                        for (r = a[e].firstChild; r;) s = r.nodeName.toUpperCase(), ("TD" == s || "TH" == s) && n.push(r), r = r.nextSibling;
                    for (i = 0, a = t.aoColumns.length; a > i; i++) {
                        o = t.aoColumns[i], null === o.sTitle && (o.sTitle = o.nTh.innerHTML);
                        var l, c, u = o._bAutoType,
                            d = "function" == typeof o.fnRender,
                            f = null !== o.sClass,
                            p = o.bVisible;
                        if (u || d || f || !p)
                            for (s = 0, e = t.aoData.length; e > s; s++) r = t.aoData[s], l = n[s * a + i], u && "string" != o.sType && (c = v(t, s, i, "type"), "" !== c && (c = B(c), null === o.sType ? o.sType = c : o.sType != c && "html" != o.sType && (o.sType = "string"))), o.mRender ? l.innerHTML = v(t, s, i, "display") : o.mData !== i && (l.innerHTML = v(t, s, i, "display")), d && (c = S(t, s, i), l.innerHTML = c, o.bUseRendered && F(t, s, i, c)), f && (l.className += " " + o.sClass), p ? r._anHidden[i] = null : (r._anHidden[i] = l, l.parentNode.removeChild(l)), o.fnCreatedCell && o.fnCreatedCell.call(t.oInstance, l, v(t, s, i, "display"), r._aData, s, i)
                    }
                    if (0 !== t.aoRowCreatedCallback.length)
                        for (e = 0, i = t.aoData.length; i > e; e++) r = t.aoData[e], A(t, "aoRowCreatedCallback", null, [r.nTr, r._aData, e])
                }

                function I(t, e) {
                    return e._DT_RowIndex !== n ? e._DT_RowIndex : null
                }

                function fa(t, e, i) {
                    for (var e = J(t, e), n = 0, t = t.aoColumns.length; t > n; n++)
                        if (e[n] === i) return n;
                    return -1
                }

                function Y(t, e, i, n) {
                    for (var a = [], r = 0, s = n.length; s > r; r++) a.push(v(t, e, n[r], i));
                    return a
                }

                function v(t, e, i, a) {
                    var r = t.aoColumns[i];
                    if ((i = r.fnGetData(t.aoData[e]._aData, a)) === n) return t.iDrawError != t.iDraw && null === r.sDefaultContent && (D(t, 0, "Requested unknown parameter " + ("function" == typeof r.mData ? "{mData function}" : "'" + r.mData + "'") + " from the data source for row " + e), t.iDrawError = t.iDraw), r.sDefaultContent;
                    if (null === i && null !== r.sDefaultContent) i = r.sDefaultContent;
                    else if ("function" == typeof i) return i();
                    return "display" == a && null === i ? "" : i
                }

                function F(t, e, i, n) {
                    t.aoColumns[i].fnSetData(t.aoData[e]._aData, n)
                }

                function Q(t) {
                    if (null === t) return function () {

                        return null
                    };
                    if ("function" == typeof t) return function (e, i, n) {
                        return t(e, i, n)
                    };
                    if ("string" == typeof t && (-1 !== t.indexOf(".") || -1 !== t.indexOf("["))) {
                        var e = function (t, i, a) {
                            var r, s = a.split(".");
                            if ("" !== a) {
                                var o = 0;
                                for (r = s.length; r > o; o++) {
                                    if (a = s[o].match(U)) {
                                        s[o] = s[o].replace(U, ""), "" !== s[o] && (t = t[s[o]]), r = [], s.splice(0, o + 1);
                                        for (var s = s.join("."), o = 0, l = t.length; l > o; o++) r.push(e(t[o], i, s));
                                        t = a[0].substring(1, a[0].length - 1), t = "" === t ? r : r.join(t);
                                        break
                                    }
                                    if (null === t || t[s[o]] === n) return n;
                                    t = t[s[o]]
                                }
                            }
                            return t
                        };
                        return function (i, n) {
                            return e(i, n, t)
                        }
                    }
                    return function (e) {
                        return e[t]
                    }
                }

                function L(t) {
                    if (null === t) return function () {};
                    if ("function" == typeof t) return function (e, i) {
                        t(e, "set", i)
                    };
                    if ("string" == typeof t && (-1 !== t.indexOf(".") || -1 !== t.indexOf("["))) {
                        var e = function (t, i, a) {
                            var r, s, a = a.split("."),
                                o = 0;
                            for (s = a.length - 1; s > o; o++) {
                                if (r = a[o].match(U)) {
                                    a[o] = a[o].replace(U, ""), t[a[o]] = [], r = a.slice(), r.splice(0, o + 1), s = r.join(".");
                                    for (var l = 0, h = i.length; h > l; l++) r = {}, e(r, i[l], s), t[a[o]].push(r);
                                    return
                                }(null === t[a[o]] || t[a[o]] === n) && (t[a[o]] = {}), t = t[a[o]]
                            }
                            t[a[a.length - 1].replace(U, "")] = i
                        };
                        return function (i, n) {
                            return e(i, n, t)
                        }
                    }
                    return function (e, i) {
                        e[t] = i
                    }
                }

                function Z(t) {
                    for (var e = [], i = t.aoData.length, n = 0; i > n; n++) e.push(t.aoData[n]._aData);
                    return e
                }

                function ga(t) {
                    t.aoData.splice(0, t.aoData.length), t.aiDisplayMaster.splice(0, t.aiDisplayMaster.length), t.aiDisplay.splice(0, t.aiDisplay.length), y(t)
                }

                function ha(t, e) {
                    for (var i = -1, n = 0, a = t.length; a > n; n++) t[n] == e ? i = n : t[n] > e && t[n]--; - 1 != i && t.splice(i, 1)
                }

                function S(t, e, i) {
                    var n = t.aoColumns[i];
                    return n.fnRender({
                        iDataRow: e,
                        iDataColumn: i,
                        oSettings: t,
                        aData: t.aoData[e]._aData,
                        mDataProp: n.mData
                    }, v(t, e, i, "display"))
                }

                function ea(t, e) {
                    var i, n = t.aoData[e];
                    if (null === n.nTr) {
                        n.nTr = l.createElement("tr"), n.nTr._DT_RowIndex = e, n._aData.DT_RowId && (n.nTr.id = n._aData.DT_RowId), n._aData.DT_RowClass && (n.nTr.className = n._aData.DT_RowClass);
                        for (var a = 0, r = t.aoColumns.length; r > a; a++) {
                            var s = t.aoColumns[a];
                            i = l.createElement(s.sCellType), i.innerHTML = "function" != typeof s.fnRender || s.bUseRendered && null !== s.mData ? v(t, e, a, "display") : S(t, e, a), null !== s.sClass && (i.className = s.sClass), s.bVisible ? (n.nTr.appendChild(i), n._anHidden[a] = null) : n._anHidden[a] = i, s.fnCreatedCell && s.fnCreatedCell.call(t.oInstance, i, v(t, e, a, "display"), n._aData, e, a)
                        }
                        A(t, "aoRowCreatedCallback", null, [n.nTr, n._aData, e])
                    }
                }

                function va(t) {
                    var e, i, n;
                    if (0 !== h("th, td", t.nTHead).length)
                        for (e = 0, n = t.aoColumns.length; n > e; e++) i = t.aoColumns[e].nTh, i.setAttribute("role", "columnheader"), t.aoColumns[e].bSortable && (i.setAttribute("tabindex", t.iTabIndex), i.setAttribute("aria-controls", t.sTableId)), null !== t.aoColumns[e].sClass && h(i).addClass(t.aoColumns[e].sClass), t.aoColumns[e].sTitle != i.innerHTML && (i.innerHTML = t.aoColumns[e].sTitle);
                    else {
                        var a = l.createElement("tr");
                        for (e = 0, n = t.aoColumns.length; n > e; e++) i = t.aoColumns[e].nTh, i.innerHTML = t.aoColumns[e].sTitle, i.setAttribute("tabindex", "0"), null !== t.aoColumns[e].sClass && h(i).addClass(t.aoColumns[e].sClass), a.appendChild(i);
                        h(t.nTHead).html("")[0].appendChild(a), V(t.aoHeader, t.nTHead)
                    } if (h(t.nTHead).children("tr").attr("role", "row"), t.bJUI)
                        for (e = 0, n = t.aoColumns.length; n > e; e++) {
                            i = t.aoColumns[e].nTh, a = l.createElement("div"), a.className = t.oClasses.sSortJUIWrapper, h(i).contents().appendTo(a);
                            var r = l.createElement("span");
                            r.className = t.oClasses.sSortIcon, a.appendChild(r), i.appendChild(a)
                        }
                    if (t.oFeatures.bSort)
                        for (e = 0; e < t.aoColumns.length; e++)!1 !== t.aoColumns[e].bSortable ? ia(t, t.aoColumns[e].nTh, e) : h(t.aoColumns[e].nTh).addClass(t.oClasses.sSortableNone);
                    if ("" !== t.oClasses.sFooterTH && h(t.nTFoot).children("tr").children("th").addClass(t.oClasses.sFooterTH), null !== t.nTFoot)
                        for (i = N(t, null, t.aoFooter), e = 0, n = t.aoColumns.length; n > e; e++) i[e] && (t.aoColumns[e].nTf = i[e], t.aoColumns[e].sClass && h(i[e]).addClass(t.aoColumns[e].sClass))
                }

                function W(t, e, i) {
                    var a, r, s, o, l = [],
                        h = [],
                        c = t.aoColumns.length;
                    for (i === n && (i = !1), a = 0, r = e.length; r > a; a++) {
                        for (l[a] = e[a].slice(), l[a].nTr = e[a].nTr, s = c - 1; s >= 0; s--)!t.aoColumns[s].bVisible && !i && l[a].splice(s, 1);
                        h.push([])
                    }
                    for (a = 0, r = l.length; r > a; a++) {
                        if (t = l[a].nTr)
                            for (; s = t.firstChild;) t.removeChild(s);
                        for (s = 0, e = l[a].length; e > s; s++)
                            if (o = c = 1, h[a][s] === n) {
                                for (t.appendChild(l[a][s].cell), h[a][s] = 1; l[a + c] !== n && l[a][s].cell == l[a + c][s].cell;) h[a + c][s] = 1, c++;
                                for (; l[a][s + o] !== n && l[a][s].cell == l[a][s + o].cell;) {
                                    for (i = 0; c > i; i++) h[a + i][s + o] = 1;
                                    o++
                                }
                                l[a][s].cell.rowSpan = c, l[a][s].cell.colSpan = o
                            }
                    }
                }

                function x(e) {
                    var i = A(e, "aoPreDrawCallback", "preDraw", [e]);
                    if (-1 !== h.inArray(!1, i)) E(e, !1);
                    else {
                        var a, r, i = [],
                            s = 0,
                            o = e.asStripeClasses.length;
                        if (a = e.aoOpenRows.length, e.bDrawing = !0, e.iInitDisplayStart !== n && -1 != e.iInitDisplayStart && (e._iDisplayStart = e.oFeatures.bServerSide ? e.iInitDisplayStart : e.iInitDisplayStart >= e.fnRecordsDisplay() ? 0 : e.iInitDisplayStart, e.iInitDisplayStart = -1, y(e)), e.bDeferLoading) e.bDeferLoading = !1, e.iDraw++;
                        else if (e.oFeatures.bServerSide) {
                            if (!e.bDestroying && !wa(e)) return
                        } else e.iDraw++; if (0 !== e.aiDisplay.length) {
                            var c = e._iDisplayStart;
                            for (r = e._iDisplayEnd, e.oFeatures.bServerSide && (c = 0, r = e.aoData.length); r > c; c++) {
                                var u = e.aoData[e.aiDisplay[c]];
                                null === u.nTr && ea(e, e.aiDisplay[c]);
                                var d = u.nTr;
                                if (0 !== o) {
                                    var f = e.asStripeClasses[s % o];
                                    u._sRowStripe != f && (h(d).removeClass(u._sRowStripe).addClass(f), u._sRowStripe = f)
                                }
                                if (A(e, "aoRowCallback", null, [d, e.aoData[e.aiDisplay[c]]._aData, s, c]), i.push(d), s++, 0 !== a)
                                    for (u = 0; a > u; u++)
                                        if (d == e.aoOpenRows[u].nParent) {
                                            i.push(e.aoOpenRows[u].nTr);
                                            break
                                        }
                            }
                        } else i[0] = l.createElement("tr"), e.asStripeClasses[0] && (i[0].className = e.asStripeClasses[0]), a = e.oLanguage, o = a.sZeroRecords, 1 != e.iDraw || null === e.sAjaxSource || e.oFeatures.bServerSide ? a.sEmptyTable && 0 === e.fnRecordsTotal() && (o = a.sEmptyTable) : o = a.sLoadingRecords, a = l.createElement("td"), a.setAttribute("valign", "top"), a.colSpan = t(e), a.className = e.oClasses.sRowEmpty, a.innerHTML = ja(e, o), i[s].appendChild(a); if (A(e, "aoHeaderCallback", "header", [h(e.nTHead).children("tr")[0], Z(e), e._iDisplayStart, e.fnDisplayEnd(), e.aiDisplay]), A(e, "aoFooterCallback", "footer", [h(e.nTFoot).children("tr")[0], Z(e), e._iDisplayStart, e.fnDisplayEnd(), e.aiDisplay]), s = l.createDocumentFragment(), a = l.createDocumentFragment(), e.nTBody) {
                            if (o = e.nTBody.parentNode, a.appendChild(e.nTBody), !e.oScroll.bInfinite || !e._bInitComplete || e.bSorted || e.bFiltered)
                                for (; a = e.nTBody.firstChild;) e.nTBody.removeChild(a);
                            for (a = 0, r = i.length; r > a; a++) s.appendChild(i[a]);
                            e.nTBody.appendChild(s), null !== o && o.appendChild(e.nTBody)
                        }
                        A(e, "aoDrawCallback", "draw", [e]), e.bSorted = !1, e.bFiltered = !1, e.bDrawing = !1, e.oFeatures.bServerSide && (E(e, !1), e._bInitComplete || $(e))
                    }
                }

                function aa(t) {
                    t.oFeatures.bSort ? O(t, t.oPreviousSearch) : t.oFeatures.bFilter ? K(t, t.oPreviousSearch) : (y(t), x(t))
                }

                function xa(t) {
                    var e = h("<div></div>")[0];
                    t.nTable.parentNode.insertBefore(e, t.nTable), t.nTableWrapper = h('<div id="' + t.sTableId + '_wrapper" class="' + t.oClasses.sWrapper + '" role="grid"></div>')[0], t.nTableReinsertBefore = t.nTable.nextSibling;
                    for (var i, n, a, r, s, o, l, c = t.nTableWrapper, u = t.sDom.split(""), d = 0; d < u.length; d++) {
                        if (n = 0, a = u[d], "<" == a) {
                            if (r = h("<div></div>")[0], s = u[d + 1], "'" == s || '"' == s) {
                                for (o = "", l = 2; u[d + l] != s;) o += u[d + l], l++;
                                "H" == o ? o = t.oClasses.sJUIHeader : "F" == o && (o = t.oClasses.sJUIFooter), -1 != o.indexOf(".") ? (s = o.split("."), r.id = s[0].substr(1, s[0].length - 1), r.className = s[1]) : "#" == o.charAt(0) ? r.id = o.substr(1, o.length - 1) : r.className = o, d += l
                            }
                            c.appendChild(r), c = r
                        } else if (">" == a) c = c.parentNode;
                        else if ("l" == a && t.oFeatures.bPaginate && t.oFeatures.bLengthChange) i = ya(t), n = 1;
                        else if ("f" == a && t.oFeatures.bFilter) i = za(t), n = 1;
                        else if ("r" == a && t.oFeatures.bProcessing) i = Aa(t), n = 1;
                        else if ("t" == a) i = Ba(t), n = 1;
                        else if ("i" == a && t.oFeatures.bInfo) i = Ca(t), n = 1;
                        else if ("p" == a && t.oFeatures.bPaginate) i = Da(t), n = 1;
                        else if (0 !== j.ext.aoFeatures.length)
                            for (r = j.ext.aoFeatures, l = 0, s = r.length; s > l; l++)
                                if (a == r[l].cFeature) {
                                    (i = r[l].fnInit(t)) && (n = 1);
                                    break
                                }
                        1 == n && null !== i && ("object" != typeof t.aanFeatures[a] && (t.aanFeatures[a] = []), t.aanFeatures[a].push(i), c.appendChild(i))
                    }
                    e.parentNode.replaceChild(t.nTableWrapper, e)
                }

                function V(t, e) {
                    var i, n, a, r, s, o, l, c, u, d, f = h(e).children("tr");
                    for (t.splice(0, t.length), a = 0, o = f.length; o > a; a++) t.push([]);
                    for (a = 0, o = f.length; o > a; a++)
                        for (i = f[a], n = i.firstChild; n;) {
                            if ("TD" == n.nodeName.toUpperCase() || "TH" == n.nodeName.toUpperCase()) {
                                for (c = 1 * n.getAttribute("colspan"), u = 1 * n.getAttribute("rowspan"), c = c && 0 !== c && 1 !== c ? c : 1, u = u && 0 !== u && 1 !== u ? u : 1, r = 0, s = t[a]; s[r];) r++;
                                for (l = r, d = 1 === c ? !0 : !1, s = 0; c > s; s++)
                                    for (r = 0; u > r; r++) t[a + r][l + s] = {
                                        cell: n,
                                        unique: d
                                    }, t[a + r].nTr = i
                            }
                            n = n.nextSibling
                        }
                }

                function N(t, e, i) {
                    var n = [];
                    i || (i = t.aoHeader, e && (i = [], V(i, e)));
                    for (var e = 0, a = i.length; a > e; e++)
                        for (var r = 0, s = i[e].length; s > r; r++)!i[e][r].unique || n[r] && t.bSortCellsTop || (n[r] = i[e][r].cell);
                    return n
                }

                function wa(t) {
                    if (t.bAjaxDataGet) {
                        t.iDraw++, E(t, !0);
                        var e = Ea(t);
                        return ka(t, e), t.fnServerData.call(t.oInstance, t.sAjaxSource, e, function (e) {
                            Fa(t, e)
                        }, t), !1
                    }
                    return !0
                }

                function Ea(t) {
                    var e, i, n, a, r = t.aoColumns.length,
                        s = [];
                    for (s.push({
                        name: "sEcho",
                        value: t.iDraw
                    }), s.push({
                        name: "iColumns",
                        value: r
                    }), s.push({
                        name: "sColumns",
                        value: M(t)
                    }), s.push({
                        name: "iDisplayStart",
                        value: t._iDisplayStart
                    }), s.push({
                        name: "iDisplayLength",
                        value: !1 !== t.oFeatures.bPaginate ? t._iDisplayLength : -1
                    }), n = 0; r > n; n++) e = t.aoColumns[n].mData, s.push({
                        name: "mDataProp_" + n,
                        value: "function" == typeof e ? "function" : e
                    });
                    if (!1 !== t.oFeatures.bFilter)
                        for (s.push({
                            name: "sSearch",
                            value: t.oPreviousSearch.sSearch
                        }), s.push({
                            name: "bRegex",
                            value: t.oPreviousSearch.bRegex
                        }), n = 0; r > n; n++) s.push({
                            name: "sSearch_" + n,
                            value: t.aoPreSearchCols[n].sSearch
                        }), s.push({
                            name: "bRegex_" + n,
                            value: t.aoPreSearchCols[n].bRegex
                        }), s.push({
                            name: "bSearchable_" + n,
                            value: t.aoColumns[n].bSearchable
                        });
                    if (!1 !== t.oFeatures.bSort) {
                        var o = 0;
                        for (e = null !== t.aaSortingFixed ? t.aaSortingFixed.concat(t.aaSorting) : t.aaSorting.slice(), n = 0; n < e.length; n++)
                            for (i = t.aoColumns[e[n][0]].aDataSort, a = 0; a < i.length; a++) s.push({
                                name: "iSortCol_" + o,
                                value: i[a]
                            }), s.push({
                                name: "sSortDir_" + o,
                                value: e[n][1]
                            }), o++;
                        for (s.push({
                            name: "iSortingCols",
                            value: o
                        }), n = 0; r > n; n++) s.push({
                            name: "bSortable_" + n,
                            value: t.aoColumns[n].bSortable
                        })
                    }
                    return s
                }

                function ka(t, e) {
                    A(t, "aoServerParams", "serverParams", [e])
                }

                function Fa(t, e) {
                    if (e.sEcho !== n) {
                        if (1 * e.sEcho < t.iDraw) return;
                        t.iDraw = 1 * e.sEcho
                    }(!t.oScroll.bInfinite || t.oScroll.bInfinite && (t.bSorted || t.bFiltered)) && ga(t), t._iRecordsTotal = parseInt(e.iTotalRecords, 10), t._iRecordsDisplay = parseInt(e.iTotalDisplayRecords, 10);
                    var i, a = M(t),
                        a = e.sColumns !== n && "" !== a && e.sColumns != a;
                    a && (i = u(t, e.sColumns));
                    for (var r = Q(t.sAjaxDataProp)(e), s = 0, o = r.length; o > s; s++)
                        if (a) {
                            for (var l = [], h = 0, c = t.aoColumns.length; c > h; h++) l.push(r[s][i[h]]);
                            H(t, l)
                        } else H(t, r[s]);
                    t.aiDisplay = t.aiDisplayMaster.slice(), t.bAjaxDataGet = !1, x(t), t.bAjaxDataGet = !0, E(t, !1)
                }

                function za(t) {
                    var e = t.oPreviousSearch,
                        i = t.oLanguage.sSearch,
                        i = -1 !== i.indexOf("_INPUT_") ? i.replace("_INPUT_", '<input type="text" />') : "" === i ? '<input type="text" />' : i + ' <input type="text" />',
                        n = l.createElement("div");
                    return n.className = t.oClasses.sFilter, n.innerHTML = "<label>" + i + "</label>", t.aanFeatures.f || (n.id = t.sTableId + "_filter"), i = h('input[type="text"]', n), n._DT_Input = i[0], i.val(e.sSearch.replace('"', "&quot;")), i.bind("keyup.DT", function () {
                        for (var i = t.aanFeatures.f, n = "" === this.value ? "" : this.value, a = 0, r = i.length; r > a; a++) i[a] != h(this).parents("div.dataTables_filter")[0] && h(i[a]._DT_Input).val(n);
                        n != e.sSearch && K(t, {
                            sSearch: n,
                            bRegex: e.bRegex,
                            bSmart: e.bSmart,
                            bCaseInsensitive: e.bCaseInsensitive
                        })
                    }), i.attr("aria-controls", t.sTableId).bind("keypress.DT", function (t) {
                        return 13 == t.keyCode ? !1 : void 0
                    }), n
                }

                function K(t, e, i) {
                    var n = t.oPreviousSearch,
                        a = t.aoPreSearchCols,
                        r = function (t) {
                            n.sSearch = t.sSearch, n.bRegex = t.bRegex, n.bSmart = t.bSmart, n.bCaseInsensitive = t.bCaseInsensitive
                        };
                    if (t.oFeatures.bServerSide) r(e);
                    else {
                        for (Ga(t, e.sSearch, i, e.bRegex, e.bSmart, e.bCaseInsensitive), r(e), e = 0; e < t.aoPreSearchCols.length; e++) Ha(t, a[e].sSearch, e, a[e].bRegex, a[e].bSmart, a[e].bCaseInsensitive);
                        Ia(t)
                    }
                    t.bFiltered = !0, h(t.oInstance).trigger("filter", t), t._iDisplayStart = 0, y(t), x(t), la(t, 0)
                }

                function Ia(t) {
                    for (var e = j.ext.afnFiltering, i = r(t, "bSearchable"), n = 0, a = e.length; a > n; n++)
                        for (var s = 0, o = 0, l = t.aiDisplay.length; l > o; o++) {
                            var h = t.aiDisplay[o - s];
                            e[n](t, Y(t, h, "filter", i), h) || (t.aiDisplay.splice(o - s, 1), s++)
                        }
                }

                function Ha(t, e, i, n, a, r) {
                    if ("" !== e)
                        for (var s = 0, e = ma(e, n, a, r), n = t.aiDisplay.length - 1; n >= 0; n--) a = Ja(v(t, t.aiDisplay[n], i, "filter"), t.aoColumns[i].sType), e.test(a) || (t.aiDisplay.splice(n, 1), s++)
                }

                function Ga(t, e, i, n, a, r) {
                    if (n = ma(e, n, a, r), a = t.oPreviousSearch, i || (i = 0), 0 !== j.ext.afnFiltering.length && (i = 1), 0 >= e.length) t.aiDisplay.splice(0, t.aiDisplay.length), t.aiDisplay = t.aiDisplayMaster.slice();
                    else if (t.aiDisplay.length == t.aiDisplayMaster.length || a.sSearch.length > e.length || 1 == i || 0 !== e.indexOf(a.sSearch))
                        for (t.aiDisplay.splice(0, t.aiDisplay.length), la(t, 1), e = 0; e < t.aiDisplayMaster.length; e++) n.test(t.asDataSearch[e]) && t.aiDisplay.push(t.aiDisplayMaster[e]);
                    else
                        for (e = i = 0; e < t.asDataSearch.length; e++) n.test(t.asDataSearch[e]) || (t.aiDisplay.splice(e - i, 1), i++)
                }

                function la(t, e) {
                    if (!t.oFeatures.bServerSide) {
                        t.asDataSearch = [];
                        for (var i = r(t, "bSearchable"), n = 1 === e ? t.aiDisplayMaster : t.aiDisplay, a = 0, s = n.length; s > a; a++) t.asDataSearch[a] = na(t, Y(t, n[a], "filter", i))
                    }
                }

                function na(t, e) {
                    var i = e.join("  ");
                    return -1 !== i.indexOf("&") && (i = h("<div>").html(i).text()), i.replace(/[\n\r]/g, " ")
                }

                function ma(t, e, i, n) {
                    return i ? (t = e ? t.split(" ") : oa(t).split(" "), t = "^(?=.*?" + t.join(")(?=.*?") + ").*$", RegExp(t, n ? "i" : "")) : (t = e ? t : oa(t), RegExp(t, n ? "i" : ""))
                }

                function Ja(t, e) {
                    return "function" == typeof j.ext.ofnSearch[e] ? j.ext.ofnSearch[e](t) : null === t ? "" : "html" == e ? t.replace(/[\r\n]/g, " ").replace(/<.*?>/g, "") : "string" == typeof t ? t.replace(/[\r\n]/g, " ") : t
                }

                function oa(t) {
                    return t.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"), "\\$1")
                }

                function Ca(t) {
                    var e = l.createElement("div");
                    return e.className = t.oClasses.sInfo, t.aanFeatures.i || (t.aoDrawCallback.push({
                        fn: Ka,
                        sName: "information"
                    }), e.id = t.sTableId + "_info"), t.nTable.setAttribute("aria-describedby", t.sTableId + "_info"), e
                }

                function Ka(t) {
                    if (t.oFeatures.bInfo && 0 !== t.aanFeatures.i.length) {
                        var e, i = t.oLanguage,
                            n = t._iDisplayStart + 1,
                            a = t.fnDisplayEnd(),
                            r = t.fnRecordsTotal(),
                            s = t.fnRecordsDisplay();
                        for (e = 0 === s ? i.sInfoEmpty : i.sInfo, s != r && (e += " " + i.sInfoFiltered), e += i.sInfoPostFix, e = ja(t, e), null !== i.fnInfoCallback && (e = i.fnInfoCallback.call(t.oInstance, t, n, a, r, s, e)), t = t.aanFeatures.i, i = 0, n = t.length; n > i; i++) h(t[i]).html(e)
                    }
                }

                function ja(t, e) {
                    var i = t.fnFormatNumber(t._iDisplayStart + 1),
                        n = t.fnDisplayEnd(),
                        n = t.fnFormatNumber(n),
                        a = t.fnRecordsDisplay(),
                        a = t.fnFormatNumber(a),
                        r = t.fnRecordsTotal(),
                        r = t.fnFormatNumber(r);
                    return t.oScroll.bInfinite && (i = t.fnFormatNumber(1)), e.replace(/_START_/g, i).replace(/_END_/g, n).replace(/_TOTAL_/g, a).replace(/_MAX_/g, r)
                }

                function ba(t) {
                    var e, i, n = t.iInitDisplayStart;
                    if (!1 === t.bInitialised) setTimeout(function () {
                        ba(t)
                    }, 200);
                    else {
                        for (xa(t), va(t), W(t, t.aoHeader), t.nTFoot && W(t, t.aoFooter), E(t, !0), t.oFeatures.bAutoWidth && da(t), e = 0, i = t.aoColumns.length; i > e; e++) null !== t.aoColumns[e].sWidth && (t.aoColumns[e].nTh.style.width = q(t.aoColumns[e].sWidth));
                        t.oFeatures.bSort ? O(t) : t.oFeatures.bFilter ? K(t, t.oPreviousSearch) : (t.aiDisplay = t.aiDisplayMaster.slice(), y(t), x(t)), null === t.sAjaxSource || t.oFeatures.bServerSide ? t.oFeatures.bServerSide || (E(t, !1), $(t)) : (i = [], ka(t, i), t.fnServerData.call(t.oInstance, t.sAjaxSource, i, function (i) {
                            var a = "" !== t.sAjaxDataProp ? Q(t.sAjaxDataProp)(i) : i;
                            for (e = 0; e < a.length; e++) H(t, a[e]);
                            t.iInitDisplayStart = n, t.oFeatures.bSort ? O(t) : (t.aiDisplay = t.aiDisplayMaster.slice(), y(t), x(t)), E(t, !1), $(t, i)
                        }, t))
                    }
                }

                function $(t, e) {
                    t._bInitComplete = !0, A(t, "aoInitComplete", "init", [t, e])
                }

                function pa(t) {
                    var e = j.defaults.oLanguage;
                    !t.sEmptyTable && t.sZeroRecords && "No data available in table" === e.sEmptyTable && p(t, t, "sZeroRecords", "sEmptyTable"), !t.sLoadingRecords && t.sZeroRecords && "Loading..." === e.sLoadingRecords && p(t, t, "sZeroRecords", "sLoadingRecords")
                }

                function ya(t) {
                    if (t.oScroll.bInfinite) return null;
                    var e, i, n = '<select size="1" ' + ('name="' + t.sTableId + '_length"') + ">",
                        a = t.aLengthMenu;
                    if (2 == a.length && "object" == typeof a[0] && "object" == typeof a[1])
                        for (e = 0, i = a[0].length; i > e; e++) n += '<option value="' + a[0][e] + '">' + a[1][e] + "</option>";
                    else
                        for (e = 0, i = a.length; i > e; e++) n += '<option value="' + a[e] + '">' + a[e] + "</option>";
                    return n += "</select>", a = l.createElement("div"), t.aanFeatures.l || (a.id = t.sTableId + "_length"), a.className = t.oClasses.sLength, a.innerHTML = "<label>" + t.oLanguage.sLengthMenu.replace("_MENU_", n) + "</label>", h('select option[value="' + t._iDisplayLength + '"]', a).attr("selected", !0), h("select", a).bind("change.DT", function () {
                        var n = h(this).val(),
                            a = t.aanFeatures.l;
                        for (e = 0, i = a.length; i > e; e++) a[e] != this.parentNode && h("select", a[e]).val(n);
                        t._iDisplayLength = parseInt(n, 10), y(t), t.fnDisplayEnd() == t.fnRecordsDisplay() && (t._iDisplayStart = t.fnDisplayEnd() - t._iDisplayLength, t._iDisplayStart < 0 && (t._iDisplayStart = 0)), -1 == t._iDisplayLength && (t._iDisplayStart = 0), x(t)
                    }), h("select", a).attr("aria-controls", t.sTableId), a
                }

                function y(t) {
                    t._iDisplayEnd = !1 === t.oFeatures.bPaginate ? t.aiDisplay.length : t._iDisplayStart + t._iDisplayLength > t.aiDisplay.length || -1 == t._iDisplayLength ? t.aiDisplay.length : t._iDisplayStart + t._iDisplayLength
                }

                function Da(t) {
                    if (t.oScroll.bInfinite) return null;
                    var e = l.createElement("div");
                    return e.className = t.oClasses.sPaging + t.sPaginationType, j.ext.oPagination[t.sPaginationType].fnInit(t, e, function (t) {
                        y(t), x(t)
                    }), t.aanFeatures.p || t.aoDrawCallback.push({
                        fn: function (t) {
                            j.ext.oPagination[t.sPaginationType].fnUpdate(t, function (t) {
                                y(t), x(t)
                            })
                        },
                        sName: "pagination"
                    }), e
                }

                function qa(t, e) {
                    var i = t._iDisplayStart;
                    if ("number" == typeof e) t._iDisplayStart = e * t._iDisplayLength, t._iDisplayStart > t.fnRecordsDisplay() && (t._iDisplayStart = 0);
                    else if ("first" == e) t._iDisplayStart = 0;
                    else if ("previous" == e) t._iDisplayStart = 0 <= t._iDisplayLength ? t._iDisplayStart - t._iDisplayLength : 0, 0 > t._iDisplayStart && (t._iDisplayStart = 0);
                    else if ("next" == e) 0 <= t._iDisplayLength ? t._iDisplayStart + t._iDisplayLength < t.fnRecordsDisplay() && (t._iDisplayStart += t._iDisplayLength) : t._iDisplayStart = 0;
                    else if ("last" == e)
                        if (0 <= t._iDisplayLength) {
                            var n = parseInt((t.fnRecordsDisplay() - 1) / t._iDisplayLength, 10) + 1;
                            t._iDisplayStart = (n - 1) * t._iDisplayLength
                        } else t._iDisplayStart = 0;
                    else D(t, 0, "Unknown paging action: " + e);
                    return h(t.oInstance).trigger("page", t), i != t._iDisplayStart
                }

                function Aa(t) {
                    var e = l.createElement("div");
                    return t.aanFeatures.r || (e.id = t.sTableId + "_processing"), e.innerHTML = t.oLanguage.sProcessing, e.className = t.oClasses.sProcessing, t.nTable.parentNode.insertBefore(e, t.nTable), e
                }

                function E(t, e) {
                    if (t.oFeatures.bProcessing)
                        for (var i = t.aanFeatures.r, n = 0, a = i.length; a > n; n++) i[n].style.visibility = e ? "visible" : "hidden";
                    h(t.oInstance).trigger("processing", [t, e])
                }

                function Ba(t) {
                    if ("" === t.oScroll.sX && "" === t.oScroll.sY) return t.nTable;
                    var e = l.createElement("div"),
                        i = l.createElement("div"),
                        n = l.createElement("div"),
                        a = l.createElement("div"),
                        r = l.createElement("div"),
                        s = l.createElement("div"),
                        o = t.nTable.cloneNode(!1),
                        c = t.nTable.cloneNode(!1),
                        u = t.nTable.getElementsByTagName("thead")[0],
                        d = 0 === t.nTable.getElementsByTagName("tfoot").length ? null : t.nTable.getElementsByTagName("tfoot")[0],
                        f = t.oClasses;
                    return i.appendChild(n), r.appendChild(s), a.appendChild(t.nTable), e.appendChild(i), e.appendChild(a), n.appendChild(o), o.appendChild(u), null !== d && (e.appendChild(r), s.appendChild(c), c.appendChild(d)), e.className = f.sScrollWrapper, i.className = f.sScrollHead, n.className = f.sScrollHeadInner, a.className = f.sScrollBody, r.className = f.sScrollFoot, s.className = f.sScrollFootInner, t.oScroll.bAutoCss && (i.style.overflow = "hidden", i.style.position = "relative", r.style.overflow = "hidden", a.style.overflow = "auto"), i.style.border = "0", i.style.width = "100%", r.style.border = "0", n.style.width = "" !== t.oScroll.sXInner ? t.oScroll.sXInner : "100%", o.removeAttribute("id"), o.style.marginLeft = "0", t.nTable.style.marginLeft = "0", null !== d && (c.removeAttribute("id"), c.style.marginLeft = "0"), n = h(t.nTable).children("caption"), 0 < n.length && (n = n[0], "top" === n._captionSide ? o.appendChild(n) : "bottom" === n._captionSide && d && c.appendChild(n)), "" !== t.oScroll.sX && (i.style.width = q(t.oScroll.sX), a.style.width = q(t.oScroll.sX), null !== d && (r.style.width = q(t.oScroll.sX)), h(a).scroll(function () {
                        i.scrollLeft = this.scrollLeft, null !== d && (r.scrollLeft = this.scrollLeft)
                    })), "" !== t.oScroll.sY && (a.style.height = q(t.oScroll.sY)), t.aoDrawCallback.push({
                        fn: La,
                        sName: "scrolling"
                    }), t.oScroll.bInfinite && h(a).scroll(function () {
                        !t.bDrawing && 0 !== h(this).scrollTop() && h(this).scrollTop() + h(this).height() > h(t.nTable).height() - t.oScroll.iLoadGap && t.fnDisplayEnd() < t.fnRecordsDisplay() && (qa(t, "next"), y(t), x(t))
                    }), t.nScrollHead = i, t.nScrollFoot = r, e
                }

                function La(t) {
                    var e, i, n, a, r, s, o, l, c = t.nScrollHead.getElementsByTagName("div")[0],
                        u = c.getElementsByTagName("table")[0],
                        d = t.nTable.parentNode,
                        f = [],
                        p = [],
                        g = null !== t.nTFoot ? t.nScrollFoot.getElementsByTagName("div")[0] : null,
                        m = null !== t.nTFoot ? g.getElementsByTagName("table")[0] : null,
                        v = t.oBrowser.bScrollOversize,
                        b = function (t) {
                            o = t.style, o.paddingTop = "0", o.paddingBottom = "0", o.borderTopWidth = "0", o.borderBottomWidth = "0", o.height = 0
                        };
                    h(t.nTable).children("thead, tfoot").remove(), e = h(t.nTHead).clone()[0], t.nTable.insertBefore(e, t.nTable.childNodes[0]), n = t.nTHead.getElementsByTagName("tr"), a = e.getElementsByTagName("tr"), null !== t.nTFoot && (r = h(t.nTFoot).clone()[0], t.nTable.insertBefore(r, t.nTable.childNodes[1]), s = t.nTFoot.getElementsByTagName("tr"), r = r.getElementsByTagName("tr")), "" === t.oScroll.sX && (d.style.width = "100%", c.parentNode.style.width = "100%");
                    var y = N(t, e);
                    for (e = 0, i = y.length; i > e; e++) l = G(t, e), y[e].style.width = t.aoColumns[l].sWidth;
                    null !== t.nTFoot && C(function (t) {
                        t.style.width = ""
                    }, r), t.oScroll.bCollapse && "" !== t.oScroll.sY && (d.style.height = d.offsetHeight + t.nTHead.offsetHeight + "px"), e = h(t.nTable).outerWidth(), "" === t.oScroll.sX ? (t.nTable.style.width = "100%", v && (h("tbody", d).height() > d.offsetHeight || "scroll" == h(d).css("overflow-y")) && (t.nTable.style.width = q(h(t.nTable).outerWidth() - t.oScroll.iBarWidth))) : "" !== t.oScroll.sXInner ? t.nTable.style.width = q(t.oScroll.sXInner) : e == h(d).width() && h(d).height() < h(t.nTable).height() ? (t.nTable.style.width = q(e - t.oScroll.iBarWidth), h(t.nTable).outerWidth() > e - t.oScroll.iBarWidth && (t.nTable.style.width = q(e))) : t.nTable.style.width = q(e), e = h(t.nTable).outerWidth(), C(b, a), C(function (t) {
                        f.push(q(h(t).width()))
                    }, a), C(function (t, e) {
                        t.style.width = f[e]
                    }, n), h(a).height(0), null !== t.nTFoot && (C(b, r), C(function (t) {
                        p.push(q(h(t).width()))
                    }, r), C(function (t, e) {
                        t.style.width = p[e]
                    }, s), h(r).height(0)), C(function (t, e) {
                        t.innerHTML = "", t.style.width = f[e]
                    }, a), null !== t.nTFoot && C(function (t, e) {
                        t.innerHTML = "", t.style.width = p[e]
                    }, r), h(t.nTable).outerWidth() < e ? (n = d.scrollHeight > d.offsetHeight || "scroll" == h(d).css("overflow-y") ? e + t.oScroll.iBarWidth : e, v && (d.scrollHeight > d.offsetHeight || "scroll" == h(d).css("overflow-y")) && (t.nTable.style.width = q(n - t.oScroll.iBarWidth)), d.style.width = q(n), t.nScrollHead.style.width = q(n), null !== t.nTFoot && (t.nScrollFoot.style.width = q(n)), "" === t.oScroll.sX ? D(t, 1, "The table cannot fit into the current element which will cause column misalignment. The table has been drawn at its minimum possible width.") : "" !== t.oScroll.sXInner && D(t, 1, "The table cannot fit into the current element which will cause column misalignment. Increase the sScrollXInner value or remove it to allow automatic calculation")) : (d.style.width = q("100%"), t.nScrollHead.style.width = q("100%"), null !== t.nTFoot && (t.nScrollFoot.style.width = q("100%"))), "" === t.oScroll.sY && v && (d.style.height = q(t.nTable.offsetHeight + t.oScroll.iBarWidth)), "" !== t.oScroll.sY && t.oScroll.bCollapse && (d.style.height = q(t.oScroll.sY), v = "" !== t.oScroll.sX && t.nTable.offsetWidth > d.offsetWidth ? t.oScroll.iBarWidth : 0, t.nTable.offsetHeight < d.offsetHeight && (d.style.height = q(t.nTable.offsetHeight + v))), v = h(t.nTable).outerWidth(), u.style.width = q(v), c.style.width = q(v), u = h(t.nTable).height() > d.clientHeight || "scroll" == h(d).css("overflow-y"), c.style.paddingRight = u ? t.oScroll.iBarWidth + "px" : "0px", null !== t.nTFoot && (m.style.width = q(v), g.style.width = q(v), g.style.paddingRight = u ? t.oScroll.iBarWidth + "px" : "0px"), h(d).scroll(), (t.bSorted || t.bFiltered) && (d.scrollTop = 0)
                }

                function C(t, e, i) {
                    for (var n, a, r = 0, s = 0, o = e.length; o > s;) {
                        for (n = e[s].firstChild, a = i ? i[s].firstChild : null; n;) 1 === n.nodeType && (i ? t(n, a, r) : t(n, r), r++), n = n.nextSibling, a = i ? a.nextSibling : null;
                        s++
                    }
                }

                function Ma(t, e) {
                    if (!t || null === t || "" === t) return 0;
                    e || (e = l.body);
                    var i, n = l.createElement("div");
                    return n.style.width = q(t), e.appendChild(n), i = n.offsetWidth, e.removeChild(n), i
                }

                function da(t) {
                    var e, i, n, a = 0,
                        r = 0,
                        s = t.aoColumns.length,
                        o = h("th", t.nTHead),
                        c = t.nTable.getAttribute("width");
                    for (n = t.nTable.parentNode, i = 0; s > i; i++) t.aoColumns[i].bVisible && (r++, null !== t.aoColumns[i].sWidth && (e = Ma(t.aoColumns[i].sWidthOrig, n), null !== e && (t.aoColumns[i].sWidth = q(e)), a++));
                    if (s == o.length && 0 === a && r == s && "" === t.oScroll.sX && "" === t.oScroll.sY)
                        for (i = 0; i < t.aoColumns.length; i++) e = h(o[i]).width(), null !== e && (t.aoColumns[i].sWidth = q(e));
                    else {
                        for (a = t.nTable.cloneNode(!1), i = t.nTHead.cloneNode(!0), r = l.createElement("tbody"), e = l.createElement("tr"), a.removeAttribute("id"), a.appendChild(i), null !== t.nTFoot && (a.appendChild(t.nTFoot.cloneNode(!0)), C(function (t) {
                            t.style.width = ""
                        }, a.getElementsByTagName("tr"))), a.appendChild(r), r.appendChild(e), r = h("thead th", a), 0 === r.length && (r = h("tbody tr:eq(0)>td", a)), o = N(t, i), i = r = 0; s > i; i++) {
                            var u = t.aoColumns[i];
                            u.bVisible && null !== u.sWidthOrig && "" !== u.sWidthOrig ? o[i - r].style.width = q(u.sWidthOrig) : u.bVisible ? o[i - r].style.width = "" : r++
                        }
                        for (i = 0; s > i; i++) t.aoColumns[i].bVisible && (r = Na(t, i), null !== r && (r = r.cloneNode(!0), "" !== t.aoColumns[i].sContentPadding && (r.innerHTML += t.aoColumns[i].sContentPadding), e.appendChild(r)));
                        if (n.appendChild(a), "" !== t.oScroll.sX && "" !== t.oScroll.sXInner ? a.style.width = q(t.oScroll.sXInner) : "" !== t.oScroll.sX ? (a.style.width = "", h(a).width() < n.offsetWidth && (a.style.width = q(n.offsetWidth))) : "" !== t.oScroll.sY ? a.style.width = q(n.offsetWidth) : c && (a.style.width = q(c)), a.style.visibility = "hidden", Oa(t, a), s = h("tbody tr:eq(0)", a).children(), 0 === s.length && (s = N(t, h("thead", a)[0])), "" !== t.oScroll.sX) {
                            for (i = r = n = 0; i < t.aoColumns.length; i++) t.aoColumns[i].bVisible && (n = null === t.aoColumns[i].sWidthOrig ? n + h(s[r]).outerWidth() : n + (parseInt(t.aoColumns[i].sWidth.replace("px", ""), 10) + (h(s[r]).outerWidth() - h(s[r]).width())), r++);
                            a.style.width = q(n), t.nTable.style.width = q(n)
                        }
                        for (i = r = 0; i < t.aoColumns.length; i++) t.aoColumns[i].bVisible && (n = h(s[r]).width(), null !== n && n > 0 && (t.aoColumns[i].sWidth = q(n)), r++);
                        s = h(a).css("width"), t.nTable.style.width = -1 !== s.indexOf("%") ? s : q(h(a).outerWidth()), a.parentNode.removeChild(a)
                    }
                    c && (t.nTable.style.width = q(c))
                }

                function Oa(t, e) {
                    "" === t.oScroll.sX && "" !== t.oScroll.sY ? (h(e).width(), e.style.width = q(h(e).outerWidth() - t.oScroll.iBarWidth)) : "" !== t.oScroll.sX && (e.style.width = q(h(e).outerWidth()))
                }

                function Na(t, e) {
                    var i = Pa(t, e);
                    if (0 > i) return null;
                    if (null === t.aoData[i].nTr) {
                        var n = l.createElement("td");
                        return n.innerHTML = v(t, i, e, ""), n
                    }
                    return J(t, i)[e]
                }

                function Pa(t, e) {
                    for (var i = -1, n = -1, a = 0; a < t.aoData.length; a++) {
                        var r = v(t, a, e, "display") + "",
                            r = r.replace(/<.*?>/g, "");
                        r.length > i && (i = r.length, n = a)
                    }
                    return n
                }

                function q(t) {
                    if (null === t) return "0px";
                    if ("number" == typeof t) return 0 > t ? "0px" : t + "px";
                    var e = t.charCodeAt(t.length - 1);
                    return 48 > e || e > 57 ? t : t + "px"
                }

                function Qa() {
                    var t = l.createElement("p"),
                        e = t.style;
                    e.width = "100%", e.height = "200px", e.padding = "0px";
                    var i = l.createElement("div"),
                        e = i.style;
                    return e.position = "absolute", e.top = "0px", e.left = "0px", e.visibility = "hidden", e.width = "200px", e.height = "150px", e.padding = "0px", e.overflow = "hidden", i.appendChild(t), l.body.appendChild(i), e = t.offsetWidth, i.style.overflow = "scroll", t = t.offsetWidth, e == t && (t = i.clientWidth), l.body.removeChild(i), e - t
                }

                function O(t, e) {
                    var i, a, r, s, o, l, c = [],
                        u = [],
                        d = j.ext.oSort,
                        f = t.aoData,
                        p = t.aoColumns,
                        g = t.oLanguage.oAria;
                    if (!t.oFeatures.bServerSide && (0 !== t.aaSorting.length || null !== t.aaSortingFixed)) {
                        for (c = null !== t.aaSortingFixed ? t.aaSortingFixed.concat(t.aaSorting) : t.aaSorting.slice(), i = 0; i < c.length; i++)
                            if (a = c[i][0], r = R(t, a), s = t.aoColumns[a].sSortDataType, j.ext.afnSortData[s])
                                if (o = j.ext.afnSortData[s].call(t.oInstance, t, a, r), o.length === f.length)
                                    for (r = 0, s = f.length; s > r; r++) F(t, r, a, o[r]);
                                else D(t, 0, "Returned data sort array (col " + a + ") is the wrong length");
                        for (i = 0, a = t.aiDisplayMaster.length; a > i; i++) u[t.aiDisplayMaster[i]] = i;
                        var m, b = c.length;
                        for (i = 0, a = f.length; a > i; i++)
                            for (r = 0; b > r; r++)
                                for (m = p[c[r][0]].aDataSort, o = 0, l = m.length; l > o; o++) s = p[m[o]].sType, s = d[(s ? s : "string") + "-pre"], f[i]._aSortData[m[o]] = s ? s(v(t, i, m[o], "sort")) : v(t, i, m[o], "sort");
                        t.aiDisplayMaster.sort(function (t, e) {
                            var i, n, a, r, s;
                            for (i = 0; b > i; i++)
                                for (s = p[c[i][0]].aDataSort, n = 0, a = s.length; a > n; n++)
                                    if (r = p[s[n]].sType, r = d[(r ? r : "string") + "-" + c[i][1]](f[t]._aSortData[s[n]], f[e]._aSortData[s[n]]), 0 !== r) return r;
                            return d["numeric-asc"](u[t], u[e])
                        })
                    }
                    for ((e === n || e) && !t.oFeatures.bDeferRender && P(t), i = 0, a = t.aoColumns.length; a > i; i++) s = p[i].sTitle.replace(/<.*?>/g, ""), r = p[i].nTh, r.removeAttribute("aria-sort"), r.removeAttribute("aria-label"), p[i].bSortable ? 0 < c.length && c[0][0] == i ? (r.setAttribute("aria-sort", "asc" == c[0][1] ? "ascending" : "descending"), r.setAttribute("aria-label", s + ("asc" == (p[i].asSorting[c[0][2] + 1] ? p[i].asSorting[c[0][2] + 1] : p[i].asSorting[0]) ? g.sSortAscending : g.sSortDescending))) : r.setAttribute("aria-label", s + ("asc" == p[i].asSorting[0] ? g.sSortAscending : g.sSortDescending)) : r.setAttribute("aria-label", s);
                    t.bSorted = !0, h(t.oInstance).trigger("sort", t), t.oFeatures.bFilter ? K(t, t.oPreviousSearch, 1) : (t.aiDisplay = t.aiDisplayMaster.slice(), t._iDisplayStart = 0, y(t), x(t))
                }

                function ia(t, e, i, n) {
                    Ra(e, {}, function (e) {
                        if (!1 !== t.aoColumns[i].bSortable) {
                            var a = function () {
                                var n, a;
                                if (e.shiftKey) {
                                    for (var r = !1, s = 0; s < t.aaSorting.length; s++)
                                        if (t.aaSorting[s][0] == i) {
                                            r = !0, n = t.aaSorting[s][0], a = t.aaSorting[s][2] + 1, t.aoColumns[n].asSorting[a] ? (t.aaSorting[s][1] = t.aoColumns[n].asSorting[a], t.aaSorting[s][2] = a) : t.aaSorting.splice(s, 1);
                                            break
                                        }!1 === r && t.aaSorting.push([i, t.aoColumns[i].asSorting[0], 0])
                                } else 1 == t.aaSorting.length && t.aaSorting[0][0] == i ? (n = t.aaSorting[0][0], a = t.aaSorting[0][2] + 1, t.aoColumns[n].asSorting[a] || (a = 0), t.aaSorting[0][1] = t.aoColumns[n].asSorting[a], t.aaSorting[0][2] = a) : (t.aaSorting.splice(0, t.aaSorting.length), t.aaSorting.push([i, t.aoColumns[i].asSorting[0], 0]));
                                O(t)
                            };
                            t.oFeatures.bProcessing ? (E(t, !0), setTimeout(function () {
                                a(), t.oFeatures.bServerSide || E(t, !1)
                            }, 0)) : a(), "function" == typeof n && n(t)
                        }
                    })
                }

                function P(t) {
                    var e, i, n, a, r, s = t.aoColumns.length,
                        o = t.oClasses;
                    for (e = 0; s > e; e++) t.aoColumns[e].bSortable && h(t.aoColumns[e].nTh).removeClass(o.sSortAsc + " " + o.sSortDesc + " " + t.aoColumns[e].sSortingClass);
                    for (i = null !== t.aaSortingFixed ? t.aaSortingFixed.concat(t.aaSorting) : t.aaSorting.slice(), e = 0; e < t.aoColumns.length; e++)
                        if (t.aoColumns[e].bSortable) {
                            for (r = t.aoColumns[e].sSortingClass, a = -1, n = 0; n < i.length; n++)
                                if (i[n][0] == e) {
                                    r = "asc" == i[n][1] ? o.sSortAsc : o.sSortDesc, a = n;
                                    break
                                }
                            h(t.aoColumns[e].nTh).addClass(r), t.bJUI && (r = h("span." + o.sSortIcon, t.aoColumns[e].nTh), r.removeClass(o.sSortJUIAsc + " " + o.sSortJUIDesc + " " + o.sSortJUI + " " + o.sSortJUIAscAllowed + " " + o.sSortJUIDescAllowed), r.addClass(-1 == a ? t.aoColumns[e].sSortingClassJUI : "asc" == i[a][1] ? o.sSortJUIAsc : o.sSortJUIDesc))
                        } else h(t.aoColumns[e].nTh).addClass(t.aoColumns[e].sSortingClass);
                    if (r = o.sSortColumn, t.oFeatures.bSort && t.oFeatures.bSortClasses) {
                        for (t = J(t), a = [], e = 0; s > e; e++) a.push("");
                        for (e = 0, n = 1; e < i.length; e++) o = parseInt(i[e][0], 10), a[o] = r + n, 3 > n && n++;
                        r = RegExp(r + "[123]");
                        var l;
                        for (e = 0, i = t.length; i > e; e++) o = e % s, n = t[e].className, l = a[o], o = n.replace(r, l), o != n ? t[e].className = h.trim(o) : 0 < l.length && -1 == n.indexOf(l) && (t[e].className = n + " " + l)
                    }
                }

                function ra(t) {
                    if (t.oFeatures.bStateSave && !t.bDestroying) {
                        var e, i;
                        e = t.oScroll.bInfinite;
                        var n = {
                            iCreate: (new Date).getTime(),
                            iStart: e ? 0 : t._iDisplayStart,
                            iEnd: e ? t._iDisplayLength : t._iDisplayEnd,
                            iLength: t._iDisplayLength,
                            aaSorting: h.extend(!0, [], t.aaSorting),
                            oSearch: h.extend(!0, {}, t.oPreviousSearch),
                            aoSearchCols: h.extend(!0, [], t.aoPreSearchCols),
                            abVisCols: []
                        };
                        for (e = 0, i = t.aoColumns.length; i > e; e++) n.abVisCols.push(t.aoColumns[e].bVisible);
                        A(t, "aoStateSaveParams", "stateSaveParams", [t, n]), t.fnStateSave.call(t.oInstance, t, n)
                    }
                }

                function Sa(t, e) {
                    if (t.oFeatures.bStateSave) {
                        var i = t.fnStateLoad.call(t.oInstance, t);
                        if (i) {
                            var n = A(t, "aoStateLoadParams", "stateLoadParams", [t, i]);
                            if (-1 === h.inArray(!1, n)) {
                                for (t.oLoadedState = h.extend(!0, {}, i), t._iDisplayStart = i.iStart, t.iInitDisplayStart = i.iStart, t._iDisplayEnd = i.iEnd, t._iDisplayLength = i.iLength, t.aaSorting = i.aaSorting.slice(), t.saved_aaSorting = i.aaSorting.slice(), h.extend(t.oPreviousSearch, i.oSearch), h.extend(!0, t.aoPreSearchCols, i.aoSearchCols), e.saved_aoColumns = [], n = 0; n < i.abVisCols.length; n++) e.saved_aoColumns[n] = {}, e.saved_aoColumns[n].bVisible = i.abVisCols[n];
                                A(t, "aoStateLoaded", "stateLoaded", [t, i])
                            }
                        }
                    }
                }

                function s(t) {
                    for (var e = 0; e < j.settings.length; e++)
                        if (j.settings[e].nTable === t) return j.settings[e];
                    return null
                }

                function T(t) {
                    for (var e = [], t = t.aoData, i = 0, n = t.length; n > i; i++) null !== t[i].nTr && e.push(t[i].nTr);
                    return e
                }

                function J(t, e) {
                    var i, a, r, s, o, l, h = [];
                    a = 0;
                    var c = t.aoData.length;
                    for (e !== n && (a = e, c = e + 1), r = a; c > r; r++)
                        if (l = t.aoData[r], null !== l.nTr) {
                            for (a = [], i = l.nTr.firstChild; i;) s = i.nodeName.toLowerCase(), ("td" == s || "th" == s) && a.push(i), i = i.nextSibling;
                            for (s = i = 0, o = t.aoColumns.length; o > s; s++) t.aoColumns[s].bVisible ? h.push(a[s - i]) : (h.push(l._anHidden[s]), i++)
                        }
                    return h
                }

                function D(t, e, i) {
                    if (t = null === t ? "DataTables warning: " + i : "DataTables warning (table id = '" + t.sTableId + "'): " + i, 0 === e) {
                        if ("alert" != j.ext.sErrMode) throw Error(t);
                        alert(t)
                    } else X.console && console.log && console.log(t)
                }

                function p(t, e, i, a) {
                    a === n && (a = i), e[i] !== n && (t[a] = e[i])
                }

                function Ta(t, i) {
                    var n, a;
                    for (a in i) i.hasOwnProperty(a) && (n = i[a], "object" == typeof e[a] && null !== n && !1 === h.isArray(n) ? h.extend(!0, t[a], n) : t[a] = n);
                    return t
                }

                function Ra(t, e, i) {
                    h(t).bind("click.DT", e, function (e) {
                        t.blur(), i(e)
                    }).bind("keypress.DT", e, function (t) {
                        13 === t.which && i(t)
                    }).bind("selectstart.DT", function () {
                        return !1
                    })
                }

                function z(t, e, i, n) {
                    i && t[e].push({
                        fn: i,
                        sName: n
                    })
                }

                function A(t, e, i, n) {
                    for (var e = t[e], a = [], r = e.length - 1; r >= 0; r--) a.push(e[r].fn.apply(t.oInstance, n));
                    return null !== i && h(t.oInstance).trigger(i, n), a
                }

                function Ua(t) {
                    var e = h('<div style="position:absolute; top:0; left:0; height:1px; width:1px; overflow:hidden"><div style="position:absolute; top:1px; left:1px; width:100px; overflow:scroll;"><div id="DT_BrowserTest" style="width:100%; height:10px;"></div></div></div>')[0];
                    l.body.appendChild(e), t.oBrowser.bScrollOversize = 100 === h("#DT_BrowserTest", e)[0].offsetWidth ? !0 : !1, l.body.removeChild(e)
                }

                function Va(t) {
                    return function () {
                        var e = [s(this[j.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                        return j.ext.oApi[t].apply(this, e)
                    }
                }
                var U = /\[.*?\]$/,
                    Wa = X.JSON ? JSON.stringify : function (t) {
                        var e = typeof t;
                        if ("object" !== e || null === t) return "string" === e && (t = '"' + t + '"'), t + "";
                        var i, n, a = [],
                            r = h.isArray(t);
                        for (i in t) n = t[i], e = typeof n, "string" === e ? n = '"' + n + '"' : "object" === e && null !== n && (n = Wa(n)), a.push((r ? "" : '"' + i + '":') + n);
                        return (r ? "[" : "{") + a + (r ? "]" : "}")
                    };
                this.$ = function (t, e) {
                    var i, n, a, r = [];
                    n = s(this[j.ext.iApiIndex]);
                    var o = n.aoData,
                        l = n.aiDisplay,
                        c = n.aiDisplayMaster;
                    if (e || (e = {}), e = h.extend({}, {
                        filter: "none",
                        order: "current",
                        page: "all"
                    }, e), "current" == e.page)
                        for (i = n._iDisplayStart, n = n.fnDisplayEnd(); n > i; i++)(a = o[l[i]].nTr) && r.push(a);
                    else if ("current" == e.order && "none" == e.filter)
                        for (i = 0, n = c.length; n > i; i++)(a = o[c[i]].nTr) && r.push(a);
                    else if ("current" == e.order && "applied" == e.filter)
                        for (i = 0, n = l.length; n > i; i++)(a = o[l[i]].nTr) && r.push(a);
                    else if ("original" == e.order && "none" == e.filter)
                        for (i = 0, n = o.length; n > i; i++)(a = o[i].nTr) && r.push(a);
                    else if ("original" == e.order && "applied" == e.filter)
                        for (i = 0, n = o.length; n > i; i++) a = o[i].nTr, -1 !== h.inArray(i, l) && a && r.push(a);
                    else D(n, 1, "Unknown selection options");
                    return r = h(r), i = r.filter(t), r = r.find(t), h([].concat(h.makeArray(i), h.makeArray(r)))
                }, this._ = function (t, e) {
                    var i, n, a = [],
                        r = this.$(t, e);
                    for (i = 0, n = r.length; n > i; i++) a.push(this.fnGetData(r[i]));
                    return a
                }, this.fnAddData = function (t, e) {
                    if (0 === t.length) return [];
                    var i, a = [],
                        r = s(this[j.ext.iApiIndex]);
                    if ("object" == typeof t[0] && null !== t[0])
                        for (var o = 0; o < t.length; o++) {
                            if (i = H(r, t[o]), -1 == i) return a;
                            a.push(i)
                        } else {
                            if (i = H(r, t), -1 == i) return a;
                            a.push(i)
                        }
                    return r.aiDisplay = r.aiDisplayMaster.slice(), (e === n || e) && aa(r), a
                }, this.fnAdjustColumnSizing = function (t) {
                    var e = s(this[j.ext.iApiIndex]);
                    k(e), t === n || t ? this.fnDraw(!1) : ("" !== e.oScroll.sX || "" !== e.oScroll.sY) && this.oApi._fnScrollDraw(e)
                }, this.fnClearTable = function (t) {
                    var e = s(this[j.ext.iApiIndex]);
                    ga(e), (t === n || t) && x(e)
                }, this.fnClose = function (t) {
                    for (var e = s(this[j.ext.iApiIndex]), i = 0; i < e.aoOpenRows.length; i++)
                        if (e.aoOpenRows[i].nParent == t) return (t = e.aoOpenRows[i].nTr.parentNode) && t.removeChild(e.aoOpenRows[i].nTr), e.aoOpenRows.splice(i, 1), 0;
                    return 1
                }, this.fnDeleteRow = function (t, e, i) {
                    var a, r, o = s(this[j.ext.iApiIndex]),
                        t = "object" == typeof t ? I(o, t) : t,
                        l = o.aoData.splice(t, 1);
                    for (a = 0, r = o.aoData.length; r > a; a++) null !== o.aoData[a].nTr && (o.aoData[a].nTr._DT_RowIndex = a);
                    return a = h.inArray(t, o.aiDisplay), o.asDataSearch.splice(a, 1), ha(o.aiDisplayMaster, t), ha(o.aiDisplay, t), "function" == typeof e && e.call(this, o, l), o._iDisplayStart >= o.fnRecordsDisplay() && (o._iDisplayStart -= o._iDisplayLength, 0 > o._iDisplayStart && (o._iDisplayStart = 0)), (i === n || i) && (y(o), x(o)), l
                }, this.fnDestroy = function (t) {
                    var i, a, r = s(this[j.ext.iApiIndex]),
                        o = r.nTableWrapper.parentNode,
                        l = r.nTBody,
                        t = t === n ? !1 : t;
                    if (r.bDestroying = !0, A(r, "aoDestroyCallback", "destroy", [r]), !t)
                        for (i = 0, a = r.aoColumns.length; a > i; i++)!1 === r.aoColumns[i].bVisible && this.fnSetColumnVis(i, !0);
                    for (h(r.nTableWrapper).find("*").andSelf().unbind(".DT"), h("tbody>tr>td." + r.oClasses.sRowEmpty, r.nTable).parent().remove(), r.nTable != r.nTHead.parentNode && (h(r.nTable).children("thead").remove(), r.nTable.appendChild(r.nTHead)), r.nTFoot && r.nTable != r.nTFoot.parentNode && (h(r.nTable).children("tfoot").remove(), r.nTable.appendChild(r.nTFoot)), r.nTable.parentNode.removeChild(r.nTable), h(r.nTableWrapper).remove(), r.aaSorting = [], r.aaSortingFixed = [], P(r), h(T(r)).removeClass(r.asStripeClasses.join(" ")), h("th, td", r.nTHead).removeClass([r.oClasses.sSortable, r.oClasses.sSortableAsc, r.oClasses.sSortableDesc, r.oClasses.sSortableNone].join(" ")), r.bJUI && (h("th span." + r.oClasses.sSortIcon + ", td span." + r.oClasses.sSortIcon, r.nTHead).remove(), h("th, td", r.nTHead).each(function () {
                        var t = h("div." + r.oClasses.sSortJUIWrapper, this),
                            e = t.contents();
                        h(this).append(e), t.remove()
                    })), !t && r.nTableReinsertBefore ? o.insertBefore(r.nTable, r.nTableReinsertBefore) : t || o.appendChild(r.nTable), i = 0, a = r.aoData.length; a > i; i++) null !== r.aoData[i].nTr && l.appendChild(r.aoData[i].nTr);
                    if (!0 === r.oFeatures.bAutoWidth && (r.nTable.style.width = q(r.sDestroyWidth)), a = r.asDestroyStripes.length)
                        for (t = h(l).children("tr"), i = 0; a > i; i++) t.filter(":nth-child(" + a + "n + " + i + ")").addClass(r.asDestroyStripes[i]);
                    for (i = 0, a = j.settings.length; a > i; i++) j.settings[i] == r && j.settings.splice(i, 1);
                    e = r = null
                }, this.fnDraw = function (t) {
                    var e = s(this[j.ext.iApiIndex]);
                    !1 === t ? (y(e), x(e)) : aa(e)
                }, this.fnFilter = function (t, e, i, a, r, o) {
                    var c = s(this[j.ext.iApiIndex]);
                    if (c.oFeatures.bFilter)
                        if ((i === n || null === i) && (i = !1), (a === n || null === a) && (a = !0), (r === n || null === r) && (r = !0), (o === n || null === o) && (o = !0), e === n || null === e) {
                            if (K(c, {
                                sSearch: t + "",
                                bRegex: i,
                                bSmart: a,
                                bCaseInsensitive: o
                            }, 1), r && c.aanFeatures.f)
                                for (e = c.aanFeatures.f, i = 0, a = e.length; a > i; i++) try {
                                    e[i]._DT_Input != l.activeElement && h(e[i]._DT_Input).val(t)
                                } catch (u) {
                                    h(e[i]._DT_Input).val(t)
                                }
                        } else h.extend(c.aoPreSearchCols[e], {
                            sSearch: t + "",
                            bRegex: i,
                            bSmart: a,
                            bCaseInsensitive: o
                        }), K(c, c.oPreviousSearch, 1)
                }, this.fnGetData = function (t, e) {
                    var i = s(this[j.ext.iApiIndex]);
                    if (t !== n) {
                        var a = t;
                        if ("object" == typeof t) {
                            var r = t.nodeName.toLowerCase();
                            "tr" === r ? a = I(i, t) : "td" === r && (a = I(i, t.parentNode), e = fa(i, a, t))
                        }
                        return e !== n ? v(i, a, e, "") : i.aoData[a] !== n ? i.aoData[a]._aData : null
                    }
                    return Z(i)
                }, this.fnGetNodes = function (t) {
                    var e = s(this[j.ext.iApiIndex]);
                    return t !== n ? e.aoData[t] !== n ? e.aoData[t].nTr : null : T(e)
                }, this.fnGetPosition = function (t) {
                    var e = s(this[j.ext.iApiIndex]),
                        i = t.nodeName.toUpperCase();
                    return "TR" == i ? I(e, t) : "TD" == i || "TH" == i ? (i = I(e, t.parentNode), t = fa(e, i, t), [i, R(e, t), t]) : null
                }, this.fnIsOpen = function (t) {
                    for (var e = s(this[j.ext.iApiIndex]), i = 0; i < e.aoOpenRows.length; i++)
                        if (e.aoOpenRows[i].nParent == t) return !0;
                    return !1
                }, this.fnOpen = function (e, i, n) {
                    var a = s(this[j.ext.iApiIndex]),
                        r = T(a);
                    if (-1 !== h.inArray(e, r)) {
                        this.fnClose(e);
                        var r = l.createElement("tr"),
                            o = l.createElement("td");
                        return r.appendChild(o), o.className = n, o.colSpan = t(a), "string" == typeof i ? o.innerHTML = i : h(o).html(i), i = h("tr", a.nTBody), -1 != h.inArray(e, i) && h(r).insertAfter(e), a.aoOpenRows.push({
                            nTr: r,
                            nParent: e
                        }), r
                    }
                }, this.fnPageChange = function (t, e) {
                    var i = s(this[j.ext.iApiIndex]);
                    qa(i, t), y(i), (e === n || e) && x(i)
                }, this.fnSetColumnVis = function (e, i, a) {
                    var r, o, l, h, c = s(this[j.ext.iApiIndex]),
                        u = c.aoColumns,
                        d = c.aoData;
                    if (u[e].bVisible != i) {
                        if (i) {
                            for (r = o = 0; e > r; r++) u[r].bVisible && o++;
                            if (h = o >= t(c), !h)
                                for (r = e; r < u.length; r++)
                                    if (u[r].bVisible) {
                                        l = r;
                                        break
                                    }
                            for (r = 0, o = d.length; o > r; r++) null !== d[r].nTr && (h ? d[r].nTr.appendChild(d[r]._anHidden[e]) : d[r].nTr.insertBefore(d[r]._anHidden[e], J(c, r)[l]))
                        } else
                            for (r = 0, o = d.length; o > r; r++) null !== d[r].nTr && (l = J(c, r)[e], d[r]._anHidden[e] = l, l.parentNode.removeChild(l));
                        for (u[e].bVisible = i, W(c, c.aoHeader), c.nTFoot && W(c, c.aoFooter), r = 0, o = c.aoOpenRows.length; o > r; r++) c.aoOpenRows[r].nTr.colSpan = t(c);
                        (a === n || a) && (k(c), x(c)), ra(c)
                    }
                }, this.fnSettings = function () {
                    return s(this[j.ext.iApiIndex])
                }, this.fnSort = function (t) {
                    var e = s(this[j.ext.iApiIndex]);
                    e.aaSorting = t, O(e)
                }, this.fnSortListener = function (t, e, i) {
                    ia(s(this[j.ext.iApiIndex]), t, e, i)
                }, this.fnUpdate = function (t, e, i, a, o) {
                    var l = s(this[j.ext.iApiIndex]),
                        e = "object" == typeof e ? I(l, e) : e;
                    if (h.isArray(t) && i === n)
                        for (l.aoData[e]._aData = t.slice(), i = 0; i < l.aoColumns.length; i++) this.fnUpdate(v(l, e, i), e, i, !1, !1);
                    else if (h.isPlainObject(t) && i === n)
                        for (l.aoData[e]._aData = h.extend(!0, {}, t), i = 0; i < l.aoColumns.length; i++) this.fnUpdate(v(l, e, i), e, i, !1, !1);
                    else {
                        F(l, e, i, t);
                        var t = v(l, e, i, "display"),
                            c = l.aoColumns[i];
                        null !== c.fnRender && (t = S(l, e, i), c.bUseRendered && F(l, e, i, t)), null !== l.aoData[e].nTr && (J(l, e)[i].innerHTML = t)
                    }
                    return i = h.inArray(e, l.aiDisplay), l.asDataSearch[i] = na(l, Y(l, e, "filter", r(l, "bSearchable"))), (o === n || o) && k(l), (a === n || a) && aa(l), 0
                }, this.fnVersionCheck = j.ext.fnVersionCheck, this.oApi = {
                    _fnExternApiFunc: Va,
                    _fnInitialise: ba,
                    _fnInitComplete: $,
                    _fnLanguageCompat: pa,
                    _fnAddColumn: o,
                    _fnColumnOptions: m,
                    _fnAddData: H,
                    _fnCreateTr: ea,
                    _fnGatherData: ua,
                    _fnBuildHead: va,
                    _fnDrawHead: W,
                    _fnDraw: x,
                    _fnReDraw: aa,
                    _fnAjaxUpdate: wa,
                    _fnAjaxParameters: Ea,
                    _fnAjaxUpdateDraw: Fa,
                    _fnServerParams: ka,
                    _fnAddOptionsHtml: xa,
                    _fnFeatureHtmlTable: Ba,
                    _fnScrollDraw: La,
                    _fnAdjustColumnSizing: k,
                    _fnFeatureHtmlFilter: za,
                    _fnFilterComplete: K,
                    _fnFilterCustom: Ia,
                    _fnFilterColumn: Ha,
                    _fnFilter: Ga,
                    _fnBuildSearchArray: la,
                    _fnBuildSearchRow: na,
                    _fnFilterCreateSearch: ma,
                    _fnDataToSearch: Ja,
                    _fnSort: O,
                    _fnSortAttachListener: ia,
                    _fnSortingClasses: P,
                    _fnFeatureHtmlPaginate: Da,
                    _fnPageChange: qa,
                    _fnFeatureHtmlInfo: Ca,
                    _fnUpdateInfo: Ka,
                    _fnFeatureHtmlLength: ya,
                    _fnFeatureHtmlProcessing: Aa,
                    _fnProcessingDisplay: E,
                    _fnVisibleToColumnIndex: G,
                    _fnColumnIndexToVisible: R,
                    _fnNodeToDataIndex: I,
                    _fnVisbleColumns: t,
                    _fnCalculateEnd: y,
                    _fnConvertToWidth: Ma,
                    _fnCalculateColumnWidths: da,
                    _fnScrollingWidthAdjust: Oa,
                    _fnGetWidestNode: Na,
                    _fnGetMaxLenString: Pa,
                    _fnStringToCss: q,
                    _fnDetectType: B,
                    _fnSettingsFromNode: s,
                    _fnGetDataMaster: Z,
                    _fnGetTrNodes: T,
                    _fnGetTdNodes: J,
                    _fnEscapeRegex: oa,
                    _fnDeleteIndex: ha,
                    _fnReOrderIndex: u,
                    _fnColumnOrdering: M,
                    _fnLog: D,
                    _fnClearTable: ga,
                    _fnSaveState: ra,
                    _fnLoadState: Sa,
                    _fnCreateCookie: function (a, b, c, d, e) {
                        var f = new Date;
                        f.setTime(f.getTime() + 1e3 * c);
                        var c = X.location.pathname.split("index-2.html"),
                            a = a + "_" + c.pop().replace(/[\/:]/g, "").toLowerCase(),
                            g;
                        if (null !== e ? (g = "function" == typeof h.parseJSON ? h.parseJSON(b) : eval("(" + b + ")"), b = e(a, g, f.toGMTString(), c.join("index-2.html") + "/")) : b = a + "=" + encodeURIComponent(b) + "; expires=" + f.toGMTString() + "; path=" + c.join("index-2.html") + "/", a = l.cookie.split(";"), e = b.split(";")[0].length, f = [], 4096 < e + l.cookie.length + 10) {
                            for (var j = 0, o = a.length; o > j; j++)
                                if (-1 != a[j].indexOf(d)) {
                                    var k = a[j].split("=");
                                    try {
                                        (g = eval("(" + decodeURIComponent(k[1]) + ")")) && g.iCreate && f.push({
                                            name: k[0],
                                            time: g.iCreate
                                        })
                                    } catch (m) {}
                                }
                            for (f.sort(function (t, e) {
                                return e.time - t.time
                            }); 4096 < e + l.cookie.length + 10;) {
                                if (0 === f.length) return;
                                d = f.pop(), l.cookie = d.name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" + c.join("index-2.html") + "/"
                            }
                        }
                        l.cookie = b
                    },
                    _fnReadCookie: function (t) {
                        for (var e = X.location.pathname.split("index-2.html"), t = t + "_" + e[e.length - 1].replace(/[\/:]/g, "").toLowerCase() + "=", e = l.cookie.split(";"), i = 0; i < e.length; i++) {
                            for (var n = e[i];
                                " " == n.charAt(0);) n = n.substring(1, n.length);
                            if (0 === n.indexOf(t)) return decodeURIComponent(n.substring(t.length, n.length))
                        }
                        return null
                    },
                    _fnDetectHeader: V,
                    _fnGetUniqueThs: N,
                    _fnScrollBarWidth: Qa,
                    _fnApplyToChildren: C,
                    _fnMap: p,
                    _fnGetRowData: Y,
                    _fnGetCellData: v,
                    _fnSetCellData: F,
                    _fnGetObjectDataFn: Q,
                    _fnSetObjectDataFn: L,
                    _fnApplyColumnDefs: ta,
                    _fnBindAction: Ra,
                    _fnExtend: Ta,
                    _fnCallbackReg: z,
                    _fnCallbackFire: A,
                    _fnJsonString: Wa,
                    _fnRender: S,
                    _fnNodeToColumnIndex: fa,
                    _fnInfoMacros: ja,
                    _fnBrowserDetect: Ua,
                    _fnGetColumns: r
                }, h.extend(j.ext.oApi, this.oApi);
                for (var sa in j.ext.oApi) sa && (this[sa] = Va(sa));
                var ca = this;
                return this.each(function () {
                    var t, i, a, r = 0;
                    i = this.getAttribute("id");
                    var s = !1,
                        c = !1;
                    if ("table" != this.nodeName.toLowerCase()) D(null, 0, "Attempted to initialise DataTables on a node which is not a table: " + this.nodeName);
                    else {
                        for (r = 0, t = j.settings.length; t > r; r++) {
                            if (j.settings[r].nTable == this) {
                                if (e === n || e.bRetrieve) return j.settings[r].oInstance;
                                if (e.bDestroy) {
                                    j.settings[r].oInstance.fnDestroy();
                                    break
                                }
                                return D(j.settings[r], 0, "Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, pass no arguments or see the docs for bRetrieve and bDestroy"), void 0
                            }
                            if (j.settings[r].sTableId == this.id) {
                                j.settings.splice(r, 1);
                                break
                            }
                        }(null === i || "" === i) && (this.id = i = "DataTables_Table_" + j.ext._oExternConfig.iNextUnique++);
                        var u = h.extend(!0, {}, j.models.oSettings, {
                            nTable: this,
                            oApi: ca.oApi,
                            oInit: e,
                            sDestroyWidth: h(this).width(),
                            sInstance: i,
                            sTableId: i
                        });
                        if (j.settings.push(u), u.oInstance = 1 === ca.length ? ca : h(this).dataTable(), e || (e = {}), e.oLanguage && pa(e.oLanguage), e = Ta(h.extend(!0, {}, j.defaults), e), p(u.oFeatures, e, "bPaginate"), p(u.oFeatures, e, "bLengthChange"), p(u.oFeatures, e, "bFilter"), p(u.oFeatures, e, "bSort"), p(u.oFeatures, e, "bInfo"), p(u.oFeatures, e, "bProcessing"), p(u.oFeatures, e, "bAutoWidth"), p(u.oFeatures, e, "bSortClasses"), p(u.oFeatures, e, "bServerSide"), p(u.oFeatures, e, "bDeferRender"), p(u.oScroll, e, "sScrollX", "sX"), p(u.oScroll, e, "sScrollXInner", "sXInner"), p(u.oScroll, e, "sScrollY", "sY"), p(u.oScroll, e, "bScrollCollapse", "bCollapse"), p(u.oScroll, e, "bScrollInfinite", "bInfinite"), p(u.oScroll, e, "iScrollLoadGap", "iLoadGap"), p(u.oScroll, e, "bScrollAutoCss", "bAutoCss"), p(u, e, "asStripeClasses"), p(u, e, "asStripClasses", "asStripeClasses"), p(u, e, "fnServerData"), p(u, e, "fnFormatNumber"), p(u, e, "sServerMethod"), p(u, e, "aaSorting"), p(u, e, "aaSortingFixed"), p(u, e, "aLengthMenu"), p(u, e, "sPaginationType"), p(u, e, "sAjaxSource"), p(u, e, "sAjaxDataProp"), p(u, e, "iCookieDuration"), p(u, e, "sCookiePrefix"), p(u, e, "sDom"), p(u, e, "bSortCellsTop"), p(u, e, "iTabIndex"), p(u, e, "oSearch", "oPreviousSearch"), p(u, e, "aoSearchCols", "aoPreSearchCols"), p(u, e, "iDisplayLength", "_iDisplayLength"), p(u, e, "bJQueryUI", "bJUI"), p(u, e, "fnCookieCallback"), p(u, e, "fnStateLoad"), p(u, e, "fnStateSave"), p(u.oLanguage, e, "fnInfoCallback"), z(u, "aoDrawCallback", e.fnDrawCallback, "user"), z(u, "aoServerParams", e.fnServerParams, "user"), z(u, "aoStateSaveParams", e.fnStateSaveParams, "user"), z(u, "aoStateLoadParams", e.fnStateLoadParams, "user"), z(u, "aoStateLoaded", e.fnStateLoaded, "user"), z(u, "aoRowCallback", e.fnRowCallback, "user"), z(u, "aoRowCreatedCallback", e.fnCreatedRow, "user"), z(u, "aoHeaderCallback", e.fnHeaderCallback, "user"), z(u, "aoFooterCallback", e.fnFooterCallback, "user"), z(u, "aoInitComplete", e.fnInitComplete, "user"), z(u, "aoPreDrawCallback", e.fnPreDrawCallback, "user"), u.oFeatures.bServerSide && u.oFeatures.bSort && u.oFeatures.bSortClasses ? z(u, "aoDrawCallback", P, "server_side_sort_classes") : u.oFeatures.bDeferRender && z(u, "aoDrawCallback", P, "defer_sort_classes"), e.bJQueryUI ? (h.extend(u.oClasses, j.ext.oJUIClasses), e.sDom === j.defaults.sDom && "lfrtip" === j.defaults.sDom && (u.sDom = '<"H"lfr>t<"F"ip>')) : h.extend(u.oClasses, j.ext.oStdClasses), h(this).addClass(u.oClasses.sTable), ("" !== u.oScroll.sX || "" !== u.oScroll.sY) && (u.oScroll.iBarWidth = Qa()), u.iInitDisplayStart === n && (u.iInitDisplayStart = e.iDisplayStart, u._iDisplayStart = e.iDisplayStart), e.bStateSave && (u.oFeatures.bStateSave = !0, Sa(u, e), z(u, "aoDrawCallback", ra, "state_save")), null !== e.iDeferLoading && (u.bDeferLoading = !0, r = h.isArray(e.iDeferLoading), u._iRecordsDisplay = r ? e.iDeferLoading[0] : e.iDeferLoading, u._iRecordsTotal = r ? e.iDeferLoading[1] : e.iDeferLoading), null !== e.aaData && (c = !0), "" !== e.oLanguage.sUrl ? (u.oLanguage.sUrl = e.oLanguage.sUrl, h.getJSON(u.oLanguage.sUrl, null, function (t) {
                            pa(t), h.extend(!0, u.oLanguage, e.oLanguage, t), ba(u)
                        }), s = !0) : h.extend(!0, u.oLanguage, e.oLanguage), null === e.asStripeClasses && (u.asStripeClasses = [u.oClasses.sStripeOdd, u.oClasses.sStripeEven]), t = u.asStripeClasses.length, u.asDestroyStripes = [], t) {
                            for (i = !1, a = h(this).children("tbody").children("tr:lt(" + t + ")"), r = 0; t > r; r++) a.hasClass(u.asStripeClasses[r]) && (i = !0, u.asDestroyStripes.push(u.asStripeClasses[r]));
                            i && a.removeClass(u.asStripeClasses.join(" "))
                        }
                        if (i = [], r = this.getElementsByTagName("thead"), 0 !== r.length && (V(u.aoHeader, r[0]), i = N(u)), null === e.aoColumns)
                            for (a = [], r = 0, t = i.length; t > r; r++) a.push(null);
                        else a = e.aoColumns;
                        for (r = 0, t = a.length; t > r; r++) e.saved_aoColumns !== n && e.saved_aoColumns.length == t && (null === a[r] && (a[r] = {}), a[r].bVisible = e.saved_aoColumns[r].bVisible), o(u, i ? i[r] : null);
                        for (ta(u, e.aoColumnDefs, a, function (t, e) {
                            m(u, t, e)
                        }), r = 0, t = u.aaSorting.length; t > r; r++) {
                            u.aaSorting[r][0] >= u.aoColumns.length && (u.aaSorting[r][0] = 0);
                            var d = u.aoColumns[u.aaSorting[r][0]];
                            for (u.aaSorting[r][2] === n && (u.aaSorting[r][2] = 0), e.aaSorting === n && u.saved_aaSorting === n && (u.aaSorting[r][1] = d.asSorting[0]), i = 0, a = d.asSorting.length; a > i; i++)
                                if (u.aaSorting[r][1] == d.asSorting[i]) {
                                    u.aaSorting[r][2] = i;
                                    break
                                }
                        }
                        if (P(u), Ua(u), r = h(this).children("caption").each(function () {
                            this._captionSide = h(this).css("caption-side")
                        }), t = h(this).children("thead"), 0 === t.length && (t = [l.createElement("thead")], this.appendChild(t[0])), u.nTHead = t[0], t = h(this).children("tbody"), 0 === t.length && (t = [l.createElement("tbody")], this.appendChild(t[0])), u.nTBody = t[0], u.nTBody.setAttribute("role", "alert"), u.nTBody.setAttribute("aria-live", "polite"), u.nTBody.setAttribute("aria-relevant", "all"), t = h(this).children("tfoot"), 0 === t.length && 0 < r.length && ("" !== u.oScroll.sX || "" !== u.oScroll.sY) && (t = [l.createElement("tfoot")], this.appendChild(t[0])), 0 < t.length && (u.nTFoot = t[0], V(u.aoFooter, u.nTFoot)), c)
                            for (r = 0; r < e.aaData.length; r++) H(u, e.aaData[r]);
                        else ua(u);
                        u.aiDisplay = u.aiDisplayMaster.slice(), u.bInitialised = !0, !1 === s && ba(u)
                    }
                }), ca = null, this
            };
            j.fnVersionCheck = function (t) {
                for (var e = function (t, e) {
                    for (; t.length < e;) t += "0";
                    return t
                }, i = j.ext.sVersion.split("."), t = t.split("."), n = "", a = "", r = 0, s = t.length; s > r; r++) n += e(i[r], 3), a += e(t[r], 3);
                return parseInt(n, 10) >= parseInt(a, 10)
            }, j.fnIsDataTable = function (t) {
                for (var e = j.settings, i = 0; i < e.length; i++)
                    if (e[i].nTable === t || e[i].nScrollHead === t || e[i].nScrollFoot === t) return !0;
                return !1
            }, j.fnTables = function (t) {
                var e = [];
                return jQuery.each(j.settings, function (i, n) {
                    (!t || !0 === t && h(n.nTable).is(":visible")) && e.push(n.nTable)
                }), e
            }, j.version = "1.9.4", j.settings = [], j.models = {}, j.models.ext = {
                afnFiltering: [],
                afnSortData: [],
                aoFeatures: [],
                aTypes: [],
                fnVersionCheck: j.fnVersionCheck,
                iApiIndex: 0,
                ofnSearch: {},
                oApi: {},
                oStdClasses: {},
                oJUIClasses: {},
                oPagination: {},
                oSort: {},
                sVersion: j.version,
                sErrMode: "alert",
                _oExternConfig: {
                    iNextUnique: 0
                }
            }, j.models.oSearch = {
                bCaseInsensitive: !0,
                sSearch: "",
                bRegex: !1,
                bSmart: !0
            }, j.models.oRow = {
                nTr: null,
                _aData: [],
                _aSortData: [],
                _anHidden: [],
                _sRowStripe: ""
            }, j.models.oColumn = {
                aDataSort: null,
                asSorting: null,
                bSearchable: null,
                bSortable: null,
                bUseRendered: null,
                bVisible: null,
                _bAutoType: !0,
                fnCreatedCell: null,
                fnGetData: null,
                fnRender: null,
                fnSetData: null,
                mData: null,
                mRender: null,
                nTh: null,
                nTf: null,
                sClass: null,
                sContentPadding: null,
                sDefaultContent: null,
                sName: null,
                sSortDataType: "std",
                sSortingClass: null,
                sSortingClassJUI: null,
                sTitle: null,
                sType: null,
                sWidth: null,
                sWidthOrig: null
            }, j.defaults = {
                aaData: null,
                aaSorting: [
                    [0, "asc"]
                ],
                aaSortingFixed: null,
                aLengthMenu: [10, 25, 50, 100],
                aoColumns: null,
                aoColumnDefs: null,
                aoSearchCols: [],
                asStripeClasses: null,
                bAutoWidth: !0,
                bDeferRender: !1,
                bDestroy: !1,
                bFilter: !0,
                bInfo: !0,
                bJQueryUI: !1,
                bLengthChange: !0,
                bPaginate: !0,
                bProcessing: !1,
                bRetrieve: !1,
                bScrollAutoCss: !0,
                bScrollCollapse: !1,
                bScrollInfinite: !1,
                bServerSide: !1,
                bSort: !0,
                bSortCellsTop: !1,
                bSortClasses: !0,
                bStateSave: !1,
                fnCookieCallback: null,
                fnCreatedRow: null,
                fnDrawCallback: null,
                fnFooterCallback: null,
                fnFormatNumber: function (t) {
                    if (1e3 > t) return t;
                    for (var e = t + "", t = e.split(""), i = "", e = e.length, n = 0; e > n; n++) 0 === n % 3 && 0 !== n && (i = this.oLanguage.sInfoThousands + i), i = t[e - n - 1] + i;
                    return i
                },
                fnHeaderCallback: null,
                fnInfoCallback: null,
                fnInitComplete: null,
                fnPreDrawCallback: null,
                fnRowCallback: null,
                fnServerData: function (t, e, i, n) {
                    n.jqXHR = h.ajax({
                        url: t,
                        data: e,
                        success: function (t) {
                            t.sError && n.oApi._fnLog(n, 0, t.sError), h(n.oInstance).trigger("xhr", [n, t]), i(t)
                        },
                        dataType: "json",
                        cache: !1,
                        type: n.sServerMethod,
                        error: function (t, e) {
                            "parsererror" == e && n.oApi._fnLog(n, 0, "DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error.")
                        }
                    })
                },
                fnServerParams: null,
                fnStateLoad: function (e) {
                    var e = this.oApi._fnReadCookie(e.sCookiePrefix + e.sInstance),
                        j;
                    try {
                        j = "function" == typeof h.parseJSON ? h.parseJSON(e) : eval("(" + e + ")")
                    } catch (m) {
                        j = null
                    }
                    return j
                },
                fnStateLoadParams: null,
                fnStateLoaded: null,
                fnStateSave: function (t, e) {
                    this.oApi._fnCreateCookie(t.sCookiePrefix + t.sInstance, this.oApi._fnJsonString(e), t.iCookieDuration, t.sCookiePrefix, t.fnCookieCallback)
                },
                fnStateSaveParams: null,
                iCookieDuration: 7200,
                iDeferLoading: null,
                iDisplayLength: 10,
                iDisplayStart: 0,
                iScrollLoadGap: 100,
                iTabIndex: 0,
                oLanguage: {
                    oAria: {
                        sSortAscending: ": activate to sort column ascending",
                        sSortDescending: ": activate to sort column descending"
                    },
                    oPaginate: {
                        sFirst: "First",
                        sLast: "Last",
                        sNext: "Next",
                        sPrevious: "Previous"
                    },
                    sEmptyTable: "No data available in table",
                    sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                    sInfoEmpty: "Showing 0 to 0 of 0 entries",
                    sInfoFiltered: "(filtered from _MAX_ total entries)",
                    sInfoPostFix: "",
                    sInfoThousands: ",",
                    sLengthMenu: "Show _MENU_ entries",
                    sLoadingRecords: "Loading...",
                    sProcessing: "Processing...",
                    sSearch: "Search:",
                    sUrl: "",
                    sZeroRecords: "No matching records found"
                },
                oSearch: h.extend({}, j.models.oSearch),
                sAjaxDataProp: "aaData",
                sAjaxSource: null,
                sCookiePrefix: "SpryMedia_DataTables_",
                sDom: "lfrtip",
                sPaginationType: "two_button",
                sScrollX: "",
                sScrollXInner: "",
                sScrollY: "",
                sServerMethod: "GET"
            }, j.defaults.columns = {
                aDataSort: null,
                asSorting: ["asc", "desc"],
                bSearchable: !0,
                bSortable: !0,
                bUseRendered: !0,
                bVisible: !0,
                fnCreatedCell: null,
                fnRender: null,
                iDataSort: -1,
                mData: null,
                mRender: null,
                sCellType: "td",
                sClass: "",
                sContentPadding: "",
                sDefaultContent: null,
                sName: "",
                sSortDataType: "std",
                sTitle: null,
                sType: null,
                sWidth: null
            }, j.models.oSettings = {
                oFeatures: {
                    bAutoWidth: null,
                    bDeferRender: null,
                    bFilter: null,
                    bInfo: null,
                    bLengthChange: null,
                    bPaginate: null,
                    bProcessing: null,
                    bServerSide: null,
                    bSort: null,
                    bSortClasses: null,
                    bStateSave: null
                },
                oScroll: {
                    bAutoCss: null,
                    bCollapse: null,
                    bInfinite: null,
                    iBarWidth: 0,
                    iLoadGap: null,
                    sX: null,
                    sXInner: null,
                    sY: null
                },
                oLanguage: {
                    fnInfoCallback: null
                },
                oBrowser: {
                    bScrollOversize: !1
                },
                aanFeatures: [],
                aoData: [],
                aiDisplay: [],
                aiDisplayMaster: [],
                aoColumns: [],
                aoHeader: [],
                aoFooter: [],
                asDataSearch: [],
                oPreviousSearch: {},
                aoPreSearchCols: [],
                aaSorting: null,
                aaSortingFixed: null,
                asStripeClasses: null,
                asDestroyStripes: [],
                sDestroyWidth: 0,
                aoRowCallback: [],
                aoHeaderCallback: [],
                aoFooterCallback: [],
                aoDrawCallback: [],
                aoRowCreatedCallback: [],
                aoPreDrawCallback: [],
                aoInitComplete: [],
                aoStateSaveParams: [],
                aoStateLoadParams: [],
                aoStateLoaded: [],
                sTableId: "",
                nTable: null,
                nTHead: null,
                nTFoot: null,
                nTBody: null,
                nTableWrapper: null,
                bDeferLoading: !1,
                bInitialised: !1,
                aoOpenRows: [],
                sDom: null,
                sPaginationType: "two_button",
                iCookieDuration: 0,
                sCookiePrefix: "",
                fnCookieCallback: null,
                aoStateSave: [],
                aoStateLoad: [],
                oLoadedState: null,
                sAjaxSource: null,
                sAjaxDataProp: null,
                bAjaxDataGet: !0,
                jqXHR: null,
                fnServerData: null,
                aoServerParams: [],
                sServerMethod: null,
                fnFormatNumber: null,
                aLengthMenu: null,
                iDraw: 0,
                bDrawing: !1,
                iDrawError: -1,
                _iDisplayLength: 10,
                _iDisplayStart: 0,
                _iDisplayEnd: 10,
                _iRecordsTotal: 0,
                _iRecordsDisplay: 0,
                bJUI: null,
                oClasses: {},
                bFiltered: !1,
                bSorted: !1,
                bSortCellsTop: null,
                oInit: null,
                aoDestroyCallback: [],
                fnRecordsTotal: function () {
                    return this.oFeatures.bServerSide ? parseInt(this._iRecordsTotal, 10) : this.aiDisplayMaster.length
                },
                fnRecordsDisplay: function () {
                    return this.oFeatures.bServerSide ? parseInt(this._iRecordsDisplay, 10) : this.aiDisplay.length
                },
                fnDisplayEnd: function () {
                    return this.oFeatures.bServerSide ? !1 === this.oFeatures.bPaginate || -1 == this._iDisplayLength ? this._iDisplayStart + this.aiDisplay.length : Math.min(this._iDisplayStart + this._iDisplayLength, this._iRecordsDisplay) : this._iDisplayEnd
                },
                oInstance: null,
                sInstance: null,
                iTabIndex: 0,
                nScrollHead: null,
                nScrollFoot: null
            }, j.ext = h.extend(!0, {}, j.models.ext), h.extend(j.ext.oStdClasses, {
                sTable: "dataTable",
                sPagePrevEnabled: "paginate_enabled_previous",
                sPagePrevDisabled: "paginate_disabled_previous",
                sPageNextEnabled: "paginate_enabled_next",
                sPageNextDisabled: "paginate_disabled_next",
                sPageJUINext: "",
                sPageJUIPrev: "",
                sPageButton: "paginate_button",
                sPageButtonActive: "paginate_active",
                sPageButtonStaticDisabled: "paginate_button paginate_button_disabled",
                sPageFirst: "first",
                sPagePrevious: "previous",
                sPageNext: "next",
                sPageLast: "last",
                sStripeOdd: "odd",
                sStripeEven: "even",
                sRowEmpty: "dataTables_empty",
                sWrapper: "dataTables_wrapper",
                sFilter: "dataTables_filter",
                sInfo: "dataTables_info",
                sPaging: "dataTables_paginate paging_",
                sLength: "dataTables_length",
                sProcessing: "dataTables_processing",
                sSortAsc: "sorting_asc",
                sSortDesc: "sorting_desc",
                sSortable: "sorting",
                sSortableAsc: "sorting_asc_disabled",
                sSortableDesc: "sorting_desc_disabled",
                sSortableNone: "sorting_disabled",
                sSortColumn: "sorting_",
                sSortJUIAsc: "",
                sSortJUIDesc: "",
                sSortJUI: "",
                sSortJUIAscAllowed: "",
                sSortJUIDescAllowed: "",
                sSortJUIWrapper: "",
                sSortIcon: "",
                sScrollWrapper: "dataTables_scroll",
                sScrollHead: "dataTables_scrollHead",
                sScrollHeadInner: "dataTables_scrollHeadInner",
                sScrollBody: "dataTables_scrollBody",
                sScrollFoot: "dataTables_scrollFoot",
                sScrollFootInner: "dataTables_scrollFootInner",
                sFooterTH: "",
                sJUIHeader: "",
                sJUIFooter: ""
            }), h.extend(j.ext.oJUIClasses, j.ext.oStdClasses, {
                sPagePrevEnabled: "fg-button ui-button ui-state-default ui-corner-left",
                sPagePrevDisabled: "fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",
                sPageNextEnabled: "fg-button ui-button ui-state-default ui-corner-right",
                sPageNextDisabled: "fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",
                sPageJUINext: "ui-icon ui-icon-circle-arrow-e",
                sPageJUIPrev: "ui-icon ui-icon-circle-arrow-w",
                sPageButton: "fg-button ui-button ui-state-default",
                sPageButtonActive: "fg-button ui-button ui-state-default ui-state-disabled",
                sPageButtonStaticDisabled: "fg-button ui-button ui-state-default ui-state-disabled",
                sPageFirst: "first ui-corner-tl ui-corner-bl",
                sPageLast: "last ui-corner-tr ui-corner-br",
                sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
                sSortAsc: "ui-state-default",
                sSortDesc: "ui-state-default",
                sSortable: "ui-state-default",
                sSortableAsc: "ui-state-default",
                sSortableDesc: "ui-state-default",
                sSortableNone: "ui-state-default",
                sSortJUIAsc: "css_right ui-icon ui-icon-triangle-1-n",
                sSortJUIDesc: "css_right ui-icon ui-icon-triangle-1-s",
                sSortJUI: "css_right ui-icon ui-icon-carat-2-n-s",
                sSortJUIAscAllowed: "css_right ui-icon ui-icon-carat-1-n",
                sSortJUIDescAllowed: "css_right ui-icon ui-icon-carat-1-s",
                sSortJUIWrapper: "DataTables_sort_wrapper",
                sSortIcon: "DataTables_sort_icon",
                sScrollHead: "dataTables_scrollHead ui-state-default",
                sScrollFoot: "dataTables_scrollFoot ui-state-default",
                sFooterTH: "ui-state-default",
                sJUIHeader: "fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix",
                sJUIFooter: "fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"
            }), h.extend(j.ext.oPagination, {
                two_button: {
                    fnInit: function (t, e, i) {
                        var n = t.oLanguage.oPaginate,
                            a = function (e) {
                                t.oApi._fnPageChange(t, e.data.action) && i(t)
                            },
                            n = t.bJUI ? '<a class="' + t.oClasses.sPagePrevDisabled + '" tabindex="' + t.iTabIndex + '" role="button"><span class="' + t.oClasses.sPageJUIPrev + '"></span></a><a class="' + t.oClasses.sPageNextDisabled + '" tabindex="' + t.iTabIndex + '" role="button"><span class="' + t.oClasses.sPageJUINext + '"></span></a>' : '<a class="' + t.oClasses.sPagePrevDisabled + '" tabindex="' + t.iTabIndex + '" role="button">' + n.sPrevious + '</a><a class="' + t.oClasses.sPageNextDisabled + '" tabindex="' + t.iTabIndex + '" role="button">' + n.sNext + "</a>";
                        h(e).append(n);
                        var r = h("a", e),
                            n = r[0],
                            r = r[1];
                        t.oApi._fnBindAction(n, {
                            action: "previous"
                        }, a), t.oApi._fnBindAction(r, {
                            action: "next"
                        }, a), t.aanFeatures.p || (e.id = t.sTableId + "_paginate", n.id = t.sTableId + "_previous", r.id = t.sTableId + "_next", n.setAttribute("aria-controls", t.sTableId), r.setAttribute("aria-controls", t.sTableId))
                    },
                    fnUpdate: function (t) {
                        if (t.aanFeatures.p)
                            for (var e, i = t.oClasses, n = t.aanFeatures.p, a = 0, r = n.length; r > a; a++)(e = n[a].firstChild) && (e.className = 0 === t._iDisplayStart ? i.sPagePrevDisabled : i.sPagePrevEnabled, e = e.nextSibling, e.className = t.fnDisplayEnd() == t.fnRecordsDisplay() ? i.sPageNextDisabled : i.sPageNextEnabled)
                    }
                },
                iFullNumbersShowPages: 5,
                full_numbers: {
                    fnInit: function (t, e, i) {
                        var n = t.oLanguage.oPaginate,
                            a = t.oClasses,
                            r = function (e) {
                                t.oApi._fnPageChange(t, e.data.action) && i(t)
                            };
                        h(e).append('<a  tabindex="' + t.iTabIndex + '" class="' + a.sPageButton + " " + a.sPageFirst + '">' + n.sFirst + '</a><a  tabindex="' + t.iTabIndex + '" class="' + a.sPageButton + " " + a.sPagePrevious + '">' + n.sPrevious + '</a><span></span><a tabindex="' + t.iTabIndex + '" class="' + a.sPageButton + " " + a.sPageNext + '">' + n.sNext + '</a><a tabindex="' + t.iTabIndex + '" class="' + a.sPageButton + " " + a.sPageLast + '">' + n.sLast + "</a>");
                        var s = h("a", e),
                            n = s[0],
                            a = s[1],
                            o = s[2],
                            s = s[3];
                        t.oApi._fnBindAction(n, {
                            action: "first"
                        }, r), t.oApi._fnBindAction(a, {
                            action: "previous"
                        }, r), t.oApi._fnBindAction(o, {
                            action: "next"
                        }, r), t.oApi._fnBindAction(s, {
                            action: "last"
                        }, r), t.aanFeatures.p || (e.id = t.sTableId + "_paginate", n.id = t.sTableId + "_first", a.id = t.sTableId + "_previous", o.id = t.sTableId + "_next", s.id = t.sTableId + "_last")
                    },
                    fnUpdate: function (t, e) {
                        if (t.aanFeatures.p) {
                            var i, n, a = j.ext.oPagination.iFullNumbersShowPages,
                                r = Math.floor(a / 2),
                                s = Math.ceil(t.fnRecordsDisplay() / t._iDisplayLength),
                                o = Math.ceil(t._iDisplayStart / t._iDisplayLength) + 1,
                                l = "",
                                c = t.oClasses,
                                u = t.aanFeatures.p,
                                d = function (n) {
                                    t.oApi._fnBindAction(this, {
                                        page: n + i - 1
                                    }, function (i) {
                                        t.oApi._fnPageChange(t, i.data.page), e(t), i.preventDefault()
                                    })
                                };
                            for (-1 === t._iDisplayLength ? o = r = i = 1 : a > s ? (i = 1, r = s) : r >= o ? (i = 1, r = a) : o >= s - r ? (i = s - a + 1, r = s) : (i = o - Math.ceil(a / 2) + 1, r = i + a - 1), a = i; r >= a; a++) l += o !== a ? '<a tabindex="' + t.iTabIndex + '" class="' + c.sPageButton + '">' + t.fnFormatNumber(a) + "</a>" : '<a tabindex="' + t.iTabIndex + '" class="' + c.sPageButtonActive + '">' + t.fnFormatNumber(a) + "</a>";
                            for (a = 0, r = u.length; r > a; a++) n = u[a], n.hasChildNodes() && (h("span:eq(0)", n).html(l).children("a").each(d), n = n.getElementsByTagName("a"), n = [n[0], n[1], n[n.length - 2], n[n.length - 1]], h(n).removeClass(c.sPageButton + " " + c.sPageButtonActive + " " + c.sPageButtonStaticDisabled), h([n[0], n[1]]).addClass(1 == o ? c.sPageButtonStaticDisabled : c.sPageButton), h([n[2], n[3]]).addClass(0 === s || o === s || -1 === t._iDisplayLength ? c.sPageButtonStaticDisabled : c.sPageButton))
                        }
                    }
                }
            }), h.extend(j.ext.oSort, {
                "string-pre": function (t) {
                    return "string" != typeof t && (t = null !== t && t.toString ? t.toString() : ""), t.toLowerCase()
                },
                "string-asc": function (t, e) {
                    return e > t ? -1 : t > e ? 1 : 0
                },
                "string-desc": function (t, e) {
                    return e > t ? 1 : t > e ? -1 : 0
                },
                "html-pre": function (t) {
                    return t.replace(/<.*?>/g, "").toLowerCase()
                },
                "html-asc": function (t, e) {
                    return e > t ? -1 : t > e ? 1 : 0
                },
                "html-desc": function (t, e) {
                    return e > t ? 1 : t > e ? -1 : 0
                },
                "date-pre": function (t) {
                    return t = Date.parse(t), (isNaN(t) || "" === t) && (t = Date.parse("01/01/1970 00:00:00")), t
                },
                "date-asc": function (t, e) {
                    return t - e
                },
                "date-desc": function (t, e) {
                    return e - t
                },
                "numeric-pre": function (t) {
                    return "-" == t || "" === t ? 0 : 1 * t
                },
                "numeric-asc": function (t, e) {
                    return t - e
                },
                "numeric-desc": function (t, e) {
                    return e - t
                }
            }), h.extend(j.ext.aTypes, [

                function (t) {
                    if ("number" == typeof t) return "numeric";
                    if ("string" != typeof t) return null;
                    var e, i = !1;
                    if (e = t.charAt(0), -1 == "0123456789-".indexOf(e)) return null;
                    for (var n = 1; n < t.length; n++) {
                        if (e = t.charAt(n), -1 == "0123456789.".indexOf(e)) return null;
                        if ("." == e) {
                            if (i) return null;
                            i = !0
                        }
                    }
                    return "numeric"
                },
                function (t) {
                    var e = Date.parse(t);
                    return null !== e && !isNaN(e) || "string" == typeof t && 0 === t.length ? "date" : null
                },
                function (t) {
                    return "string" == typeof t && -1 != t.indexOf("<") && -1 != t.indexOf(">") ? "html" : null
                }
            ]), h.fn.DataTable = j, h.fn.dataTable = j, h.fn.dataTableSettings = j.settings, h.fn.dataTableExt = j.ext
        };
        "function" == typeof define && define.amd ? define(["jquery"], L) : jQuery && !jQuery.fn.dataTable && L(jQuery)
    }(window, document), ! function () {
        var t, e, i, n, a, r = {}.hasOwnProperty,
            s = function (t, e) {
                function i() {
                    this.constructor = t
                }
                for (var n in e) r.call(e, n) && (t[n] = e[n]);
                return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
            };
        n = function () {
            function t() {
                this.options_index = 0, this.parsed = []
            }
            return t.prototype.add_node = function (t) {
                return "OPTGROUP" === t.nodeName.toUpperCase() ? this.add_group(t) : this.add_option(t)
            }, t.prototype.add_group = function (t) {
                var e, i, n, a, r, s;
                for (e = this.parsed.length, this.parsed.push({
                    array_index: e,
                    group: !0,
                    label: this.escapeExpression(t.label),
                    children: 0,
                    disabled: t.disabled
                }), r = t.childNodes, s = [], n = 0, a = r.length; a > n; n++) i = r[n], s.push(this.add_option(i, e, t.disabled));
                return s
            }, t.prototype.add_option = function (t, e, i) {
                return "OPTION" === t.nodeName.toUpperCase() ? ("" !== t.text ? (null != e && (this.parsed[e].children += 1), this.parsed.push({
                    array_index: this.parsed.length,
                    options_index: this.options_index,
                    value: t.value,
                    text: t.text,
                    html: t.innerHTML,
                    selected: t.selected,
                    disabled: i === !0 ? i : t.disabled,
                    group_array_index: e,
                    classes: t.className,
                    style: t.style.cssText
                })) : this.parsed.push({
                    array_index: this.parsed.length,
                    options_index: this.options_index,
                    empty: !0
                }), this.options_index += 1) : void 0
            }, t.prototype.escapeExpression = function (t) {
                var e, i;
                return null == t || t === !1 ? "" : /[\&\<\>\"\'\`]/.test(t) ? (e = {
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                }, i = /&(?!\w+;)|[\<\>\"\'\`]/g, t.replace(i, function (t) {
                    return e[t] || "&amp;"
                })) : t
            }, t
        }(), n.select_to_array = function (t) {
            var e, i, a, r, s;
            for (i = new n, s = t.childNodes, a = 0, r = s.length; r > a; a++) e = s[a], i.add_node(e);
            return i.parsed
        }, e = function () {
            function t(e, i) {
                this.form_field = e, this.options = null != i ? i : {}, t.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers())
            }
            return t.prototype.set_default_values = function () {
                var t = this;
                return this.click_test_action = function (e) {
                    return t.test_active_click(e)
                }, this.activate_action = function (e) {
                    return t.activate_field(e)
                }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.result_single_selected = null, this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search : !0, this.group_search = null != this.options.group_search ? this.options.group_search : !0, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null != this.options.single_backstroke_delete ? this.options.single_backstroke_delete : !0, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null != this.options.display_selected_options ? this.options.display_selected_options : !0, this.display_disabled_options = null != this.options.display_disabled_options ? this.options.display_disabled_options : !0
            }, t.prototype.set_default_text = function () {
                return this.default_text = this.form_field.getAttribute("data-placeholder") ? this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.options.placeholder_text_multiple || this.options.placeholder_text || t.default_multiple_text : this.options.placeholder_text_single || this.options.placeholder_text || t.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || t.default_no_result_text
            }, t.prototype.mouse_enter = function () {
                return this.mouse_on_container = !0
            }, t.prototype.mouse_leave = function () {
                return this.mouse_on_container = !1
            }, t.prototype.input_focus = function () {
                var t = this;
                if (this.is_multiple) {
                    if (!this.active_field) return setTimeout(function () {
                        return t.container_mousedown()
                    }, 50)
                } else if (!this.active_field) return this.activate_field()
            }, t.prototype.input_blur = function () {
                var t = this;
                return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function () {
                    return t.blur_test()
                }, 100))
            }, t.prototype.results_option_build = function (t) {
                var e, i, n, a, r;
                for (e = "", r = this.results_data, n = 0, a = r.length; a > n; n++) i = r[n], e += i.group ? this.result_add_group(i) : this.result_add_option(i), (null != t ? t.first : void 0) && (i.selected && this.is_multiple ? this.choice_build(i) : i.selected && !this.is_multiple && this.single_set_selected_text(i.text));
                return e
            }, t.prototype.result_add_option = function (t) {
                var e, i;
                return t.search_match ? this.include_option_in_results(t) ? (e = [], t.disabled || t.selected && this.is_multiple || e.push("active-result"), !t.disabled || t.selected && this.is_multiple || e.push("disabled-result"), t.selected && e.push("result-selected"), null != t.group_array_index && e.push("group-option"), "" !== t.classes && e.push(t.classes), i = "" !== t.style.cssText ? ' style="' + t.style + '"' : "", '<li class="' + e.join(" ") + '"' + i + ' data-option-array-index="' + t.array_index + '">' + t.search_text + "</li>") : "" : ""
            }, t.prototype.result_add_group = function (t) {
                return t.search_match || t.group_match ? t.active_options > 0 ? '<li class="group-result">' + t.search_text + "</li>" : "" : ""
            }, t.prototype.results_update_field = function () {
                return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.result_single_selected = null, this.results_build(), this.results_showing ? this.winnow_results() : void 0
            }, t.prototype.results_toggle = function () {
                return this.results_showing ? this.results_hide() : this.results_show()
            }, t.prototype.results_search = function () {
                return this.results_showing ? this.winnow_results() : this.results_show()
            }, t.prototype.winnow_results = function () {
                var t, e, i, n, a, r, s, o, l, h, c, u, d;
                for (this.no_results_clear(), a = 0, s = this.get_search_text(), t = s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), n = this.search_contains ? "" : "^", i = new RegExp(n + t, "i"), h = new RegExp(t, "i"), d = this.results_data, c = 0, u = d.length; u > c; c++) e = d[c], e.search_match = !1, r = null, this.include_option_in_results(e) && (e.group && (e.group_match = !1, e.active_options = 0), null != e.group_array_index && this.results_data[e.group_array_index] && (r = this.results_data[e.group_array_index], 0 === r.active_options && r.search_match && (a += 1), r.active_options += 1), (!e.group || this.group_search) && (e.search_text = e.group ? e.label : e.html, e.search_match = this.search_string_match(e.search_text, i), e.search_match && !e.group && (a += 1), e.search_match ? (s.length && (o = e.search_text.search(h), l = e.search_text.substr(0, o + s.length) + "</em>" + e.search_text.substr(o + s.length), e.search_text = l.substr(0, o) + "<em>" + l.substr(o)), null != r && (r.group_match = !0)) : null != e.group_array_index && this.results_data[e.group_array_index].search_match && (e.search_match = !0)));
                return this.result_clear_highlight(), 1 > a && s.length ? (this.update_results_content(""), this.no_results(s)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
            }, t.prototype.search_string_match = function (t, e) {
                var i, n, a, r;
                if (e.test(t)) return !0;
                if (this.enable_split_word_search && (t.indexOf(" ") >= 0 || 0 === t.indexOf("[")) && (n = t.replace(/\[|\]/g, "").split(" "), n.length))
                    for (a = 0, r = n.length; r > a; a++)
                        if (i = n[a], e.test(i)) return !0
            }, t.prototype.choices_count = function () {
                var t, e, i, n;
                if (null != this.selected_option_count) return this.selected_option_count;
                for (this.selected_option_count = 0, n = this.form_field.options, e = 0, i = n.length; i > e; e++) t = n[e], t.selected && (this.selected_option_count += 1);
                return this.selected_option_count
            }, t.prototype.choices_click = function (t) {
                return t.preventDefault(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
            }, t.prototype.keyup_checker = function (t) {
                var e, i;
                switch (e = null != (i = t.which) ? i : t.keyCode, this.search_field_scale(), e) {
                case 8:
                    if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) return this.keydown_backstroke();
                    if (!this.pending_backstroke) return this.result_clear_highlight(), this.results_search();
                    break;
                case 13:
                    if (t.preventDefault(), this.results_showing) return this.result_select(t);
                    break;
                case 27:
                    return this.results_showing && this.results_hide(), !0;
                case 9:
                case 38:
                case 40:
                case 16:
                case 91:
                case 17:
                    break;
                default:
                    return this.results_search()
                }
            }, t.prototype.container_width = function () {
                return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
            }, t.prototype.include_option_in_results = function (t) {
                return this.is_multiple && !this.display_selected_options && t.selected ? !1 : !this.display_disabled_options && t.disabled ? !1 : t.empty ? !1 : !0
            }, t.browser_is_supported = function () {
                return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : /iP(od|hone)/i.test(window.navigator.userAgent) ? !1 : /Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent) ? !1 : !0
            }, t.default_multiple_text = "Select Some Options", t.default_single_text = "Select an Option", t.default_no_result_text = "No results match", t
        }(), t = jQuery, t.fn.extend({
            chosen: function (n) {
                return e.browser_is_supported() ? this.each(function () {
                    var e, a;
                    e = t(this), a = e.data("chosen"), "destroy" === n && a ? a.destroy() : a || e.data("chosen", new i(this, n))
                }) : this
            }
        }), i = function (e) {
            function i() {
                return a = i.__super__.constructor.apply(this, arguments)
            }
            return s(i, e), i.prototype.setup = function () {
                return this.form_field_jq = t(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
            }, i.prototype.set_up_html = function () {
                var e, i;
                return e = ["chosen-container"], e.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && e.push(this.form_field.className), this.is_rtl && e.push("chosen-rtl"), i = {
                    "class": e.join(" "),
                    style: "width: " + this.container_width() + ";",
                    title: this.form_field.title
                }, this.form_field.id.length && (i.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = t("<div />", i), this.is_multiple ? this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>') : this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior(), this.form_field_jq.trigger("chosen:ready", {
                    chosen: this
                })
            }, i.prototype.register_observers = function () {
                var t = this;
                return this.container.bind("mousedown.chosen", function (e) {
                    t.container_mousedown(e)
                }), this.container.bind("mouseup.chosen", function (e) {
                    t.container_mouseup(e)
                }), this.container.bind("mouseenter.chosen", function (e) {
                    t.mouse_enter(e)
                }), this.container.bind("mouseleave.chosen", function (e) {
                    t.mouse_leave(e)
                }), this.search_results.bind("mouseup.chosen", function (e) {
                    t.search_results_mouseup(e)
                }), this.search_results.bind("mouseover.chosen", function (e) {
                    t.search_results_mouseover(e)
                }), this.search_results.bind("mouseout.chosen", function (e) {
                    t.search_results_mouseout(e)
                }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function (e) {
                    t.search_results_mousewheel(e)
                }), this.form_field_jq.bind("chosen:updated.chosen", function (e) {
                    t.results_update_field(e)
                }), this.form_field_jq.bind("chosen:activate.chosen", function (e) {
                    t.activate_field(e)
                }), this.form_field_jq.bind("chosen:open.chosen", function (e) {
                    t.container_mousedown(e)
                }), this.search_field.bind("blur.chosen", function (e) {
                    t.input_blur(e)
                }), this.search_field.bind("keyup.chosen", function (e) {
                    t.keyup_checker(e)
                }), this.search_field.bind("keydown.chosen", function (e) {
                    t.keydown_checker(e)
                }), this.search_field.bind("focus.chosen", function (e) {
                    t.input_focus(e)
                }), this.is_multiple ? this.search_choices.bind("click.chosen", function (e) {
                    t.choices_click(e)
                }) : this.container.bind("click.chosen", function (t) {
                    t.preventDefault()
                })
            }, i.prototype.destroy = function () {
                return t(document).unbind("click.chosen", this.click_test_action), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
            }, i.prototype.search_field_disabled = function () {
                return this.is_disabled = this.form_field_jq[0].disabled, this.is_disabled ? (this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field()) : (this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
            }, i.prototype.container_mousedown = function (e) {
                return this.is_disabled || (e && "mousedown" === e.type && !this.results_showing && e.preventDefault(), null != e && t(e.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !e || t(e.target)[0] !== this.selected_item[0] && !t(e.target).parents("a.chosen-single").length || (e.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), t(document).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
            }, i.prototype.container_mouseup = function (t) {
                return "ABBR" !== t.target.nodeName || this.is_disabled ? void 0 : this.results_reset(t)
            }, i.prototype.search_results_mousewheel = function (t) {
                var e, i, n;
                return e = -(null != (i = t.originalEvent) ? i.wheelDelta : void 0) || (null != (n = t.originialEvent) ? n.detail : void 0), null != e ? (t.preventDefault(), "DOMMouseScroll" === t.type && (e = 40 * e), this.search_results.scrollTop(e + this.search_results.scrollTop())) : void 0
            }, i.prototype.blur_test = function () {
                return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
            }, i.prototype.close_field = function () {
                return t(document).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
            }, i.prototype.activate_field = function () {
                return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
            }, i.prototype.test_active_click = function (e) {
                return this.container.is(t(e.target).closest(".chosen-container")) ? this.active_field = !0 : this.close_field()
            }, i.prototype.results_build = function () {
                return this.parsing = !0, this.selected_option_count = null, this.results_data = n.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({
                    first: !0
                })), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
            }, i.prototype.result_do_highlight = function (t) {
                var e, i, n, a, r;
                if (t.length) {
                    if (this.result_clear_highlight(), this.result_highlight = t, this.result_highlight.addClass("highlighted"), n = parseInt(this.search_results.css("maxHeight"), 10), r = this.search_results.scrollTop(), a = n + r, i = this.result_highlight.position().top + this.search_results.scrollTop(), e = i + this.result_highlight.outerHeight(), e >= a) return this.search_results.scrollTop(e - n > 0 ? e - n : 0);
                    if (r > i) return this.search_results.scrollTop(i)
                }
            }, i.prototype.result_clear_highlight = function () {
                return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
            }, i.prototype.results_show = function () {
                return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                    chosen: this
                }), !1) : (this.container.addClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:showing_dropdown", {
                    chosen: this
                }), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results())
            }, i.prototype.update_results_content = function (t) {
                return this.search_results.html(t)
            }, i.prototype.results_hide = function () {
                return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {
                    chosen: this
                })), this.results_showing = !1
            }, i.prototype.set_tab_index = function () {
                var t;
                return this.form_field.tabIndex ? (t = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = t) : void 0
            }, i.prototype.set_label_behavior = function () {
                var e = this;
                return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = t("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", function (t) {
                    return e.is_multiple ? e.container_mousedown(t) : e.activate_field()
                }) : void 0
            }, i.prototype.show_search_field_default = function () {
                return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
            }, i.prototype.search_results_mouseup = function (e) {
                var i;
                return i = t(e.target).hasClass("active-result") ? t(e.target) : t(e.target).parents(".active-result").first(), i.length ? (this.result_highlight = i, this.result_select(e), this.search_field.focus()) : void 0
            }, i.prototype.search_results_mouseover = function (e) {
                var i;
                return i = t(e.target).hasClass("active-result") ? t(e.target) : t(e.target).parents(".active-result").first(), i ? this.result_do_highlight(i) : void 0
            }, i.prototype.search_results_mouseout = function (e) {
                return t(e.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
            }, i.prototype.choice_build = function (e) {
                var i, n, a = this;
                return i = t("<li />", {
                    "class": "search-choice"
                }).html("<span>" + e.html + "</span>"), e.disabled ? i.addClass("search-choice-disabled") : (n = t("<a />", {
                    "class": "search-choice-close",
                    "data-option-array-index": e.array_index
                }), n.bind("click.chosen", function (t) {
                    return a.choice_destroy_link_click(t)
                }), i.append(n)), this.search_container.before(i)
            }, i.prototype.choice_destroy_link_click = function (e) {
                return e.preventDefault(), e.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(t(e.target))
            }, i.prototype.choice_destroy = function (t) {
                return this.result_deselect(t[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), t.parents("li").first().remove(), this.search_field_scale()) : void 0
            }, i.prototype.results_reset = function () {
                return this.form_field.options[0].selected = !0, this.selected_option_count = null, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change"), this.active_field ? this.results_hide() : void 0
            }, i.prototype.results_reset_cleanup = function () {
                return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
            }, i.prototype.result_select = function (t) {
                var e, i, n;
                return this.result_highlight ? (e = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                    chosen: this
                }), !1) : (this.is_multiple ? e.removeClass("active-result") : (this.result_single_selected && (this.result_single_selected.removeClass("result-selected"), n = this.result_single_selected[0].getAttribute("data-option-array-index"), this.results_data[n].selected = !1), this.result_single_selected = e), e.addClass("result-selected"), i = this.results_data[e[0].getAttribute("data-option-array-index")], i.selected = !0, this.form_field.options[i.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(i) : this.single_set_selected_text(i.text), (t.metaKey || t.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {
                    selected: this.form_field.options[i.options_index].value
                }), this.current_selectedIndex = this.form_field.selectedIndex, this.search_field_scale())) : void 0
            }, i.prototype.single_set_selected_text = function (t) {
                return null == t && (t = this.default_text), t === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").text(t)
            }, i.prototype.result_deselect = function (t) {
                var e;
                return e = this.results_data[t], this.form_field.options[e.options_index].disabled ? !1 : (e.selected = !1, this.form_field.options[e.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", {
                    deselected: this.form_field.options[e.options_index].value
                }), this.search_field_scale(), !0)
            }, i.prototype.single_deselect_control_build = function () {
                return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
            }, i.prototype.get_search_text = function () {
                return this.search_field.val() === this.default_text ? "" : t("<div/>").text(t.trim(this.search_field.val())).html()
            }, i.prototype.winnow_results_set_highlight = function () {
                var t, e;
                return e = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), t = e.length ? e.first() : this.search_results.find(".active-result").first(), null != t ? this.result_do_highlight(t) : void 0
            }, i.prototype.no_results = function (e) {
                var i;
                return i = t('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), i.find("span").first().html(e), this.search_results.append(i)
            }, i.prototype.no_results_clear = function () {
                return this.search_results.find(".no-results").remove()
            }, i.prototype.keydown_arrow = function () {
                var t;
                return this.results_showing && this.result_highlight ? (t = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(t) : void 0 : this.results_show()
            }, i.prototype.keyup_arrow = function () {
                var t;
                return this.results_showing || this.is_multiple ? this.result_highlight ? (t = this.result_highlight.prevAll("li.active-result"), t.length ? this.result_do_highlight(t.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
            }, i.prototype.keydown_backstroke = function () {
                var t;
                return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (t = this.search_container.siblings("li.search-choice").last(), t.length && !t.hasClass("search-choice-disabled") ? (this.pending_backstroke = t, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
            }, i.prototype.clear_backstroke = function () {
                return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
            }, i.prototype.keydown_checker = function (t) {
                var e, i;
                switch (e = null != (i = t.which) ? i : t.keyCode, this.search_field_scale(), 8 !== e && this.pending_backstroke && this.clear_backstroke(), e) {
                case 8:
                    this.backstroke_length = this.search_field.val().length;
                    break;
                case 9:
                    this.results_showing && !this.is_multiple && this.result_select(t), this.mouse_on_container = !1;
                    break;
                case 13:
                    t.preventDefault();
                    break;
                case 38:
                    t.preventDefault(), this.keyup_arrow();
                    break;
                case 40:
                    t.preventDefault(), this.keydown_arrow()
                }
            }, i.prototype.search_field_scale = function () {
                var e, i, n, a, r, s, o, l, h;
                if (this.is_multiple) {
                    for (n = 0, o = 0, r = "position:absolute; left: -1000px; top: -1000px; display:none;", s = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], l = 0, h = s.length; h > l; l++) a = s[l], r += a + ":" + this.search_field.css(a) + ";";
                    return e = t("<div />", {
                        style: r
                    }), e.text(this.search_field.val()), t("body").append(e), o = e.width() + 25, e.remove(), i = this.container.outerWidth(), o > i - 10 && (o = i - 10), this.search_field.css({
                        width: o + "px"
                    })
                }
            }, i
        }(e)
    }.call(this), ! function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
    }(function (t) {
        function e(t) {
            if (t.minTime && (t.minTime = v(t.minTime)), t.maxTime && (t.maxTime = v(t.maxTime)), t.durationTime && "function" != typeof t.durationTime && (t.durationTime = v(t.durationTime)), t.disableTimeRanges.length > 0) {
                for (var e in t.disableTimeRanges) t.disableTimeRanges[e] = [v(t.disableTimeRanges[e][0]), v(t.disableTimeRanges[e][1])];
                t.disableTimeRanges = t.disableTimeRanges.sort(function (t, e) {
                    return t[0] - e[0]
                })
            }
            return t
        }

        function i(e) {
            var i = e.data("timepicker-settings"),
                n = e.data("timepicker-list");
            n && n.length && (n.remove(), e.data("timepicker-list", !1)), n = t("<ul />", {
                "class": "ui-timepicker-list"
            });
            var a = t("<div />", {
                "class": "ui-timepicker-wrapper",
                tabindex: -1
            });
            a.css({
                display: "none",
                position: "absolute"
            }).append(n), i.className && a.addClass(i.className), null === i.minTime && null === i.durationTime || !i.showDuration || a.addClass("ui-timepicker-with-duration");
            var s = i.minTime;
            "function" == typeof i.durationTime ? s = v(i.durationTime()) : null !== i.durationTime && (s = i.durationTime);
            var l = null !== i.minTime ? i.minTime : 0,
                h = null !== i.maxTime ? i.maxTime : l + x - 1;
            l >= h && (h += x), h === x - 1 && -1 !== i.timeFormat.indexOf("H") && (h = x);
            for (var c = i.disableTimeRanges, u = 0, d = c.length, f = l; h >= f; f += 60 * i.step) {
                var b = f,
                    y = t("<li />");
                if (y.data("time", b), y.text(m(b, i.timeFormat)), (null !== i.minTime || null !== i.durationTime) && i.showDuration) {
                    var w = t("<span />");
                    w.addClass("ui-timepicker-duration"), w.text(" (" + g(f - s) + ")"), y.append(w)
                }
                d > u && (b >= c[u][1] && (u += 1), c[u] && b >= c[u][0] && b < c[u][1] && y.addClass("ui-timepicker-disabled")), n.append(y)
            }
            a.data("timepicker-input", e), e.data("timepicker-list", a);
            var _ = i.appendTo;
            "string" == typeof _ ? _ = t(_) : "function" == typeof _ && (_ = _(e)), _.append(a), o(e, n), n.on("click", "li", function () {
                e.off("focus.timepicker"), e.on("focus.timepicker-ie-hack", function () {
                    e.off("focus.timepicker-ie-hack"), e.on("focus.timepicker", C.show)
                }), r(e) || e[0].focus(), n.find("li").removeClass("ui-timepicker-selected"), t(this).addClass("ui-timepicker-selected"), p(e) && (e.trigger("hideTimepicker"), a.hide())
            })
        }

        function n() {
            return new Date(1970, 1, 1, 0, 0, 0)
        }

        function a(e) {
            var i = t(e.target),
                n = i.closest(".ui-timepicker-input");
            0 === n.length && 0 === i.closest(".ui-timepicker-wrapper").length && (C.hide(), t("body").unbind(".ui-timepicker"), t(window).unbind(".ui-timepicker"))
        }

        function r(t) {
            var e = t.data("timepicker-settings");
            return (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && e.disableTouchKeyboard
        }

        function s(e, i, n) {
            if (!n && 0 !== n) return !1;
            var a = e.data("timepicker-settings"),
                r = !1,
                s = 30 * a.step;
            return i.find("li").each(function (e, i) {
                var a = t(i),
                    o = a.data("time") - n;
                return Math.abs(o) < s || o == s ? (r = a, !1) : void 0
            }), r
        }

        function o(t, e) {
            e.find("li").removeClass("ui-timepicker-selected");
            var i = v(h(t));
            if (null !== i) {
                var n = s(t, e, i);
                if (n) {
                    var a = n.offset().top - e.offset().top;
                    (a + n.outerHeight() > e.outerHeight() || 0 > a) && e.scrollTop(e.scrollTop() + n.position().top - n.outerHeight()), n.addClass("ui-timepicker-selected")
                }
            }
        }

        function l() {
            if ("" !== this.value) {
                var e = t(this),
                    i = e.data("timepicker-list");
                if (!i || !i.is(":visible")) {
                    var n = v(this.value);
                    if (null === n) return e.trigger("timeFormatError"), void 0;
                    var a = e.data("timepicker-settings"),
                        r = !1;
                    if (null !== a.minTime && n < a.minTime ? r = !0 : null !== a.maxTime && n > a.maxTime && (r = !0), t.each(a.disableTimeRanges, function () {
                        return n >= this[0] && n < this[1] ? (r = !0, !1) : void 0
                    }), a.forceRoundTime) {
                        var s = n % (60 * a.step);
                        s >= 30 * a.step ? n += 60 * a.step - s : n -= s
                    }
                    var o = m(n, a.timeFormat);
                    r ? c(e, o, "error") && e.trigger("timeRangeError") : c(e, o)
                }
            }
        }

        function h(t) {
            return t.is("input") ? t.val() : t.data("ui-timepicker-value")
        }

        function c(t, e, i) {
            return t.is("input") && t.val(e), t.data("ui-timepicker-value") != e ? (t.data("ui-timepicker-value", e), "select" == i ? t.trigger("selectTime").trigger("changeTime").trigger("change") : "error" != i && t.trigger("changeTime"), !0) : (t.trigger("selectTime"), !1)
        }

        function u(e) {
            var i = t(this),
                n = i.data("timepicker-list");
            if (!n || !n.is(":visible")) {
                if (40 != e.keyCode) return d(e, i);
                r(i) || i.focus()
            }
            switch (e.keyCode) {
            case 13:
                return p(i) && C.hide.apply(this), e.preventDefault(), !1;
            case 38:
                var a = n.find(".ui-timepicker-selected");
                return a.length ? a.is(":first-child") || (a.removeClass("ui-timepicker-selected"), a.prev().addClass("ui-timepicker-selected"), a.prev().position().top < a.outerHeight() && n.scrollTop(n.scrollTop() - a.outerHeight())) : (n.find("li").each(function (e, i) {
                    return t(i).position().top > 0 ? (a = t(i), !1) : void 0
                }), a.addClass("ui-timepicker-selected")), !1;
            case 40:
                return a = n.find(".ui-timepicker-selected"), 0 === a.length ? (n.find("li").each(function (e, i) {
                    return t(i).position().top > 0 ? (a = t(i), !1) : void 0
                }), a.addClass("ui-timepicker-selected")) : a.is(":last-child") || (a.removeClass("ui-timepicker-selected"), a.next().addClass("ui-timepicker-selected"), a.next().position().top + 2 * a.outerHeight() > n.outerHeight() && n.scrollTop(n.scrollTop() + a.outerHeight())), !1;
            case 27:
                n.find("li").removeClass("ui-timepicker-selected"), C.hide();
                break;
            case 9:
                C.hide();
                break;
            default:
                return d(e, i)
            }
        }

        function d(t, e) {
            return !e.data("timepicker-settings").disableTextInput || t.ctrlKey || t.altKey || t.metaKey || 2 != t.keyCode && 8 != t.keyCode && t.keyCode < 46
        }

        function f(e) {
            var i = t(this),
                n = i.data("timepicker-list");
            if (!n || !n.is(":visible")) return !0;
            switch (e.keyCode) {
            case 96:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 65:
            case 77:
            case 80:
            case 186:
            case 8:
            case 46:
                o(i, n);
                break;
            default:
                return
            }
        }

        function p(t) {
            var e = t.data("timepicker-settings"),
                i = t.data("timepicker-list"),
                n = null,
                a = i.find(".ui-timepicker-selected");
            if (a.hasClass("ui-timepicker-disabled")) return !1;
            if (a.length ? n = a.data("time") : h(t) && (n = v(h(t)), o(t, i)), null !== n) {
                var r = m(n, e.timeFormat);
                c(t, r, "select")
            }
            return !0
        }

        function g(t) {
            var e, i = Math.round(t / 60);
            if (Math.abs(i) < 60) e = [i, _.mins];
            else if (60 == i) e = ["1", _.hr];
            else {
                var n = (i / 60).toFixed(1);
                "." != _.decimal && (n = n.replace(".", _.decimal)), e = [n, _.hrs]
            }
            return e.join(" ")
        }

        function m(t, e) {
            if (null !== t) {
                for (var i, n, a = new Date(y.valueOf() + 1e3 * t), r = "", s = 0; s < e.length; s++) switch (n = e.charAt(s)) {
                case "a":
                    r += a.getHours() > 11 ? "pm" : "am";
                    break;
                case "A":
                    r += a.getHours() > 11 ? "PM" : "AM";
                    break;
                case "g":
                    i = a.getHours() % 12, r += 0 === i ? "12" : i;
                    break;
                case "G":
                    r += a.getHours();
                    break;
                case "h":
                    i = a.getHours() % 12, 0 !== i && 10 > i && (i = "0" + i), r += 0 === i ? "12" : i;
                    break;
                case "H":
                    i = a.getHours(), t === x && (i = 24), r += i > 9 ? i : "0" + i;
                    break;
                case "i":
                    var o = a.getMinutes();
                    r += o > 9 ? o : "0" + o;
                    break;
                case "s":
                    t = a.getSeconds(), r += t > 9 ? t : "0" + t;
                    break;
                default:
                    r += n
                }
                return r
            }
        }

        function v(t) {
            if ("" === t) return null;
            if (!t || t + 0 == t) return t;
            "object" == typeof t && (t = t.getHours() + ":" + b(t.getMinutes()) + ":" + b(t.getSeconds())), t = t.toLowerCase(), new Date(0);
            var e;
            if (-1 === t.indexOf(":") ? (e = t.match(/^([0-9]):?([0-5][0-9])?:?([0-5][0-9])?\s*([pa]?)m?$/), e || (e = t.match(/^([0-2][0-9]):?([0-5][0-9])?:?([0-5][0-9])?\s*([pa]?)m?$/))) : e = t.match(/^(\d{1,2})(?::([0-5][0-9]))?(?::([0-5][0-9]))?\s*([pa]?)m?$/), !e) return null;
            var i, n = parseInt(1 * e[1], 10);
            i = e[4] ? 12 == n ? "p" == e[4] ? 12 : 0 : n + ("p" == e[4] ? 12 : 0) : n;
            var a = 1 * e[2] || 0,
                r = 1 * e[3] || 0;
            return 3600 * i + 60 * a + r
        }

        function b(t) {
            return ("0" + t).slice(-2)
        }
        var y = n(),
            x = 86400,
            w = {
                className: null,
                minTime: null,
                maxTime: null,
                durationTime: null,
                step: 30,
                showDuration: !1,
                timeFormat: "g:ia",
                scrollDefaultNow: !1,
                scrollDefaultTime: !1,
                selectOnBlur: !1,
                disableTouchKeyboard: !0,
                forceRoundTime: !1,
                appendTo: "body",
                disableTimeRanges: [],
                closeOnWindowScroll: !1,
                disableTextInput: !1
            },
            _ = {
                decimal: ".",
                mins: "mins",
                hr: "hr",
                hrs: "hrs"
            },
            C = {
                init: function (i) {
                    return this.each(function () {
                        var n = t(this);
                        if ("SELECT" == n[0].tagName) {
                            for (var a = {
                                type: "text",
                                value: n.val()
                            }, r = n[0].attributes, s = 0; s < r.length; s++) a[r[s].nodeName] = r[s].nodeValue;
                            var o = t("<input />", a);
                            n.replaceWith(o), n = o
                        }
                        var h = t.extend({}, w);
                        i && (h = t.extend(h, i)), h.lang && (_ = t.extend(_, h.lang)), h = e(h), n.data("timepicker-settings", h), n.prop("autocomplete", "off"), n.on("click.timepicker focus.timepicker", C.show), n.on("change.timepicker", l), n.on("keydown.timepicker", u), n.on("keyup.timepicker", f), n.addClass("ui-timepicker-input"), l.call(n.get(0))
                    })
                },
                show: function () {
                    var e = t(this),
                        n = e.data("timepicker-settings");
                    r(e) && e.blur();
                    var o = e.data("timepicker-list");
                    if (!e.prop("readonly") && (o && 0 !== o.length && "function" != typeof n.durationTime || (i(e), o = e.data("timepicker-list")), !o.is(":visible"))) {
                        C.hide(), o.show(), e.offset().top + e.outerHeight(!0) + o.outerHeight() > t(window).height() + t(window).scrollTop() ? o.offset({
                            left: e.offset().left + parseInt(o.css("marginLeft").replace("px", ""), 10),
                            top: e.offset().top - o.outerHeight() + parseInt(o.css("marginTop").replace("px", ""), 10)
                        }) : o.offset({
                            left: e.offset().left + parseInt(o.css("marginLeft").replace("px", ""), 10),
                            top: e.offset().top + e.outerHeight() + parseInt(o.css("marginTop").replace("px", ""), 10)
                        });
                        var l = o.find(".ui-timepicker-selected");
                        if (l.length || (h(e) ? l = s(e, o, v(h(e))) : n.scrollDefaultNow ? l = s(e, o, v(new Date)) : n.scrollDefaultTime !== !1 && (l = s(e, o, v(n.scrollDefaultTime)))), l && l.length) {
                            var c = o.scrollTop() + l.position().top - l.outerHeight();
                            o.scrollTop(c)
                        } else o.scrollTop(0);
                        t("body").on("touchstart.ui-timepicker mousedown.ui-timepicker", a), n.closeOnWindowScroll && t(window).on("scroll.ui-timepicker", a), e.trigger("showTimepicker")
                    }
                },
                hide: function () {
                    t(".ui-timepicker-wrapper:visible").each(function () {
                        var e = t(this),
                            i = e.data("timepicker-input"),
                            n = i.data("timepicker-settings");
                        n && n.selectOnBlur && p(i), e.hide(), i.trigger("hideTimepicker")
                    })
                },
                option: function (i, n) {
                    var a = this,
                        r = a.data("timepicker-settings"),
                        s = a.data("timepicker-list");
                    if ("object" == typeof i) r = t.extend(r, i);
                    else if ("string" == typeof i && "undefined" != typeof n) r[i] = n;
                    else if ("string" == typeof i) return r[i];
                    return r = e(r), a.data("timepicker-settings", r), s && (s.remove(), a.data("timepicker-list", !1)), a
                },
                getSecondsFromMidnight: function () {
                    return v(h(this))
                },
                getTime: function (t) {
                    var e = this;
                    return t || (t = new Date), t.setHours(0, 0, 0, 0), new Date(t.valueOf() + 1e3 * v(h(e)))
                },
                setTime: function (t) {
                    var e = this,
                        i = m(v(t), e.data("timepicker-settings").timeFormat);
                    c(e, i), e.data("timepicker-list") && o(e, e.data("timepicker-list"))
                },
                remove: function () {
                    var t = this;
                    t.hasClass("ui-timepicker-input") && (t.removeAttr("autocomplete", "off"), t.removeClass("ui-timepicker-input"), t.removeData("timepicker-settings"), t.off(".timepicker"), t.data("timepicker-list") && t.data("timepicker-list").remove(), t.removeData("timepicker-list"))
                }
            };
        t.fn.timepicker = function (e) {
            return C[e] ? C[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? (t.error("Method " + e + " does not exist on jQuery.timepicker"), void 0) : C.init.apply(this, arguments)
        }
    }),
    /**
     * @version: 1.2
     * @author: Dan Grossman http://www.dangrossman.info/
     * @date: 2013-07-25
     * @copyright: Copyright (c) 2012-2013 Dan Grossman. All rights reserved.
     * @license: Licensed under Apache License v2.0. See http://www.apache.org/licenses/LICENSE-2.0
     * @website: http://www.improvely.com/
     */
    ! function (t) {
        var e = function (e, i, n) {
            var a, r = "object" == typeof i;
            this.startDate = moment().startOf("day"), this.endDate = moment().startOf("day"), this.minDate = !1, this.maxDate = !1, this.dateLimit = !1, this.showDropdowns = !1, this.showWeekNumbers = !1, this.timePicker = !1, this.timePickerIncrement = 30, this.timePicker12Hour = !0, this.ranges = {}, this.opens = "right", this.buttonClasses = ["btn", "btn-small"], this.applyClass = "btn-success", this.cancelClass = "btn-default", this.format = "MM/DD/YYYY", this.separator = " - ", this.locale = {
                applyLabel: "Apply",
                cancelLabel: "Cancel",
                fromLabel: "From",
                toLabel: "To",
                weekLabel: "W",
                customRangeLabel: "Custom Range",
                daysOfWeek: moment()._lang._weekdaysMin.slice(),
                monthNames: moment()._lang._monthsShort.slice(),
                firstDay: 0
            }, this.cb = function () {}, this.parentEl = "body", this.element = t(e), this.element.hasClass("pull-right") && (this.opens = "left"), this.element.is("input") ? this.element.on({
                click: t.proxy(this.show, this),
                focus: t.proxy(this.show, this)
            }) : this.element.on("click", t.proxy(this.show, this)), a = this.locale, r && ("object" == typeof i.locale && t.each(a, function (t, e) {
                a[t] = i.locale[t] || e
            }), i.applyClass && (this.applyClass = i.applyClass), i.cancelClass && (this.cancelClass = i.cancelClass));
            var s = '<div class="daterangepicker dropdown-menu"><div class="calendar left"></div><div class="calendar right"></div><div class="ranges"><div class="range_inputs"><div class="daterangepicker_start_input" style="float: left"><label for="daterangepicker_start">' + this.locale.fromLabel + "</label>" + '<input class="input-mini" type="text" name="daterangepicker_start" value="" disabled="disabled" />' + "</div>" + '<div class="daterangepicker_end_input" style="float: left; padding-left: 11px">' + '<label for="daterangepicker_end">' + this.locale.toLabel + "</label>" + '<input class="input-mini" type="text" name="daterangepicker_end" value="" disabled="disabled" />' + "</div>" + '<button class="' + this.applyClass + ' applyBtn" disabled="disabled">' + this.locale.applyLabel + "</button>&nbsp;" + '<button class="' + this.cancelClass + ' cancelBtn">' + this.locale.cancelLabel + "</button>" + "</div>" + "</div>" + "</div>";
            if (this.parentEl = r && i.parentEl && t(i.parentEl) || t(this.parentEl), this.container = t(s).appendTo(this.parentEl), r) {
                if ("string" == typeof i.format && (this.format = i.format), "string" == typeof i.separator && (this.separator = i.separator), "string" == typeof i.startDate && (this.startDate = moment(i.startDate, this.format)), "string" == typeof i.endDate && (this.endDate = moment(i.endDate, this.format)), "string" == typeof i.minDate && (this.minDate = moment(i.minDate, this.format)), "string" == typeof i.maxDate && (this.maxDate = moment(i.maxDate, this.format)), "object" == typeof i.startDate && (this.startDate = moment(i.startDate)), "object" == typeof i.endDate && (this.endDate = moment(i.endDate)), "object" == typeof i.minDate && (this.minDate = moment(i.minDate)), "object" == typeof i.maxDate && (this.maxDate = moment(i.maxDate)), "object" == typeof i.ranges) {
                    for (var o in i.ranges) {
                        var l = moment(i.ranges[o][0]),
                            h = moment(i.ranges[o][1]);
                        this.minDate && l.isBefore(this.minDate) && (l = moment(this.minDate)), this.maxDate && h.isAfter(this.maxDate) && (h = moment(this.maxDate)), this.minDate && h.isBefore(this.minDate) || this.maxDate && l.isAfter(this.maxDate) || (this.ranges[o] = [l, h])
                    }
                    var c = "<ul>";
                    for (var o in this.ranges) c += "<li>" + o + "</li>";
                    c += "<li>" + this.locale.customRangeLabel + "</li>", c += "</ul>", this.container.find(".ranges").prepend(c)
                }
                if ("object" == typeof i.dateLimit && (this.dateLimit = i.dateLimit), "object" == typeof i.locale && "number" == typeof i.locale.firstDay) {
                    this.locale.firstDay = i.locale.firstDay;
                    for (var u = i.locale.firstDay; u > 0;) this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()), u--
                }
                "string" == typeof i.opens && (this.opens = i.opens), "boolean" == typeof i.showWeekNumbers && (this.showWeekNumbers = i.showWeekNumbers), "string" == typeof i.buttonClasses && (this.buttonClasses = [i.buttonClasses]), "object" == typeof i.buttonClasses && (this.buttonClasses = i.buttonClasses), "boolean" == typeof i.showDropdowns && (this.showDropdowns = i.showDropdowns), "boolean" == typeof i.timePicker && (this.timePicker = i.timePicker), "number" == typeof i.timePickerIncrement && (this.timePickerIncrement = i.timePickerIncrement), "boolean" == typeof i.timePicker12Hour && (this.timePicker12Hour = i.timePicker12Hour)
            }
            this.timePicker || (this.startDate = this.startDate.startOf("day"), this.endDate = this.endDate.startOf("day"));
            var d = this.container;
            if (t.each(this.buttonClasses, function (t, e) {
                d.find("button").addClass(e)
            }), "right" == this.opens) {
                var f = this.container.find(".calendar.left"),
                    p = this.container.find(".calendar.right");
                f.removeClass("left").addClass("right"), p.removeClass("right").addClass("left")
            }
            if (("undefined" == typeof i || "undefined" == typeof i.ranges) && (this.container.find(".calendar").show(), this.move()), "function" == typeof n && (this.cb = n), this.container.addClass("opens" + this.opens), (!r || "undefined" == typeof i.startDate && "undefined" == typeof i.endDate) && t(this.element).is("input[type=text]")) {
                var l, h, g = t(this.element).val(),
                    m = g.split(this.separator);
                2 == m.length && (l = moment(m[0], this.format), h = moment(m[1], this.format)), null != l && null != h && (this.startDate = l, this.endDate = h)
            }
            this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), this.leftCalendar = {
                month: moment([this.startDate.year(), this.startDate.month(), 1, this.startDate.hour(), this.startDate.minute()]),
                calendar: []
            }, this.rightCalendar = {
                month: moment([this.endDate.year(), this.endDate.month(), 1, this.endDate.hour(), this.endDate.minute()]),
                calendar: []
            }, this.container.on("mousedown", t.proxy(this.mousedown, this)), this.container.find(".calendar").on("click", ".prev", t.proxy(this.clickPrev, this)).on("click", ".next", t.proxy(this.clickNext, this)).on("click", "td.available", t.proxy(this.clickDate, this)).on("mouseenter", "td.available", t.proxy(this.enterDate, this)).on("mouseleave", "td.available", t.proxy(this.updateFormInputs, this)).on("change", "select.yearselect", t.proxy(this.updateMonthYear, this)).on("change", "select.monthselect", t.proxy(this.updateMonthYear, this)).on("change", "select.hourselect,select.minuteselect,select.ampmselect", t.proxy(this.updateTime, this)), this.container.find(".ranges").on("click", "button.applyBtn", t.proxy(this.clickApply, this)).on("click", "button.cancelBtn", t.proxy(this.clickCancel, this)).on("click", ".daterangepicker_start_input,.daterangepicker_end_input", t.proxy(this.showCalendars, this)).on("click", "li", t.proxy(this.clickRange, this)).on("mouseenter", "li", t.proxy(this.enterRange, this)).on("mouseleave", "li", t.proxy(this.updateFormInputs, this)), this.element.on("keyup", t.proxy(this.updateFromControl, this)), this.updateView(), this.updateCalendars()
        };
        e.prototype = {
            constructor: e,
            mousedown: function (t) {
                t.stopPropagation()
            },
            updateView: function () {
                this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()), this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()), this.updateFormInputs()
            },
            updateFormInputs: function () {
                this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.format)), this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.format)), this.startDate.isSame(this.endDate) || this.startDate.isBefore(this.endDate) ? this.container.find("button.applyBtn").removeAttr("disabled") : this.container.find("button.applyBtn").attr("disabled", "disabled")
            },
            updateFromControl: function () {
                if (this.element.is("input") && this.element.val().length) {
                    var t = this.element.val().split(this.separator),
                        e = moment(t[0], this.format),
                        i = moment(t[1], this.format);
                    null != e && null != i && (i.isBefore(e) || (this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), this.startDate = e, this.endDate = i, this.startDate.isSame(this.oldStartDate) && this.endDate.isSame(this.oldEndDate) || this.notify(), this.updateCalendars()))
                }
            },
            notify: function () {
                this.updateView(), this.cb(this.startDate, this.endDate)
            },
            move: function () {
                var e = {
                    top: this.parentEl.offset().top - (this.parentEl.is("body") ? 0 : this.parentEl.scrollTop()),
                    left: this.parentEl.offset().left - (this.parentEl.is("body") ? 0 : this.parentEl.scrollLeft())
                };
                "left" == this.opens ? (this.container.css({
                    top: this.element.offset().top + this.element.outerHeight() - e.top,
                    right: t(window).width() - this.element.offset().left - this.element.outerWidth() - e.left,
                    left: "auto"
                }), this.container.offset().left < 0 && this.container.css({
                    right: "auto",
                    left: 9
                })) : (this.container.css({
                    top: this.element.offset().top + this.element.outerHeight() - e.top,
                    left: this.element.offset().left - e.left,
                    right: "auto"
                }), this.container.offset().left + this.container.outerWidth() > t(window).width() && this.container.css({
                    left: "auto",
                    right: 0
                }))
            },
            show: function (e) {
                this.container.show(), this.move(), e && (e.stopPropagation(), e.preventDefault()), t(document).on("mousedown", t.proxy(this.hide, this)), this.element.trigger("shown", {
                    target: e.target,
                    picker: this
                })
            },
            hide: function () {
                this.container.hide(), this.startDate.isSame(this.oldStartDate) && this.endDate.isSame(this.oldEndDate) || this.notify(), this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), t(document).off("mousedown", this.hide), this.element.trigger("hidden", {
                    picker: this
                })
            },
            enterRange: function (t) {
                var e = t.target.innerHTML;
                if (e == this.locale.customRangeLabel) this.updateView();
                else {
                    var i = this.ranges[e];
                    this.container.find("input[name=daterangepicker_start]").val(i[0].format(this.format)), this.container.find("input[name=daterangepicker_end]").val(i[1].format(this.format))
                }
            },
            showCalendars: function () {
                this.container.find(".calendar").show(), this.move()
            },
            updateInputText: function () {
                this.element.is("input") && this.element.val(this.startDate.format(this.format) + this.separator + this.endDate.format(this.format))
            },
            clickRange: function (t) {
                var e = t.target.innerHTML;
                if (e == this.locale.customRangeLabel) this.showCalendars();
                else {
                    var i = this.ranges[e];
                    this.startDate = i[0], this.endDate = i[1], this.timePicker || (this.startDate.startOf("day"), this.endDate.startOf("day")), this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute()), this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute()), this.updateCalendars(), this.updateInputText(), this.container.find(".calendar").hide(), this.hide()
                }
            },
            clickPrev: function (e) {
                var i = t(e.target).parents(".calendar");
                i.hasClass("left") ? this.leftCalendar.month.subtract("month", 1) : this.rightCalendar.month.subtract("month", 1), this.updateCalendars()
            },
            clickNext: function (e) {
                var i = t(e.target).parents(".calendar");
                i.hasClass("left") ? this.leftCalendar.month.add("month", 1) : this.rightCalendar.month.add("month", 1), this.updateCalendars()
            },
            enterDate: function (e) {
                var i = t(e.target).attr("data-title"),
                    n = i.substr(1, 1),
                    a = i.substr(3, 1),
                    r = t(e.target).parents(".calendar");
                r.hasClass("left") ? this.container.find("input[name=daterangepicker_start]").val(this.leftCalendar.calendar[n][a].format(this.format)) : this.container.find("input[name=daterangepicker_end]").val(this.rightCalendar.calendar[n][a].format(this.format))
            },
            clickDate: function (e) {
                var i = t(e.target).attr("data-title"),
                    n = i.substr(1, 1),
                    a = i.substr(3, 1),
                    r = t(e.target).parents(".calendar");
                if (r.hasClass("left")) {
                    var s = this.leftCalendar.calendar[n][a],
                        o = this.endDate;
                    if ("object" == typeof this.dateLimit) {
                        var l = moment(s).add(this.dateLimit).startOf("day");
                        o.isAfter(l) && (o = l)
                    }
                } else {
                    var s = this.startDate,
                        o = this.rightCalendar.calendar[n][a];
                    if ("object" == typeof this.dateLimit) {
                        var h = moment(o).subtract(this.dateLimit).startOf("day");
                        s.isBefore(h) && (s = h)
                    }
                }
                r.find("td").removeClass("active"), s.isSame(o) || s.isBefore(o) ? (t(e.target).addClass("active"), this.startDate = s, this.endDate = o) : s.isAfter(o) && (t(e.target).addClass("active"), this.startDate = s, this.endDate = moment(s).add("day", 1).startOf("day")), this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()), this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()), this.updateCalendars()
            },
            clickApply: function () {
                this.updateInputText(), this.hide()
            },
            clickCancel: function () {
                this.startDate = this.oldStartDate, this.endDate = this.oldEndDate, this.updateView(), this.updateCalendars(), this.hide()
            },
            updateMonthYear: function (e) {
                var i = t(e.target).closest(".calendar").hasClass("left"),
                    n = this.container.find(".calendar.left");
                i || (n = this.container.find(".calendar.right"));
                var a = parseInt(n.find(".monthselect").val()),
                    r = n.find(".yearselect").val();
                i ? this.leftCalendar.month.month(a).year(r) : this.rightCalendar.month.month(a).year(r), this.updateCalendars()
            },
            updateTime: function (e) {
                var i = t(e.target).closest(".calendar").hasClass("left"),
                    n = this.container.find(".calendar.left");
                i || (n = this.container.find(".calendar.right"));
                var a = parseInt(n.find(".hourselect").val()),
                    r = parseInt(n.find(".minuteselect").val());
                if (this.timePicker12Hour) {
                    var s = n.find(".ampmselect").val();
                    "PM" == s && 12 > a && (a += 12), "AM" == s && 12 == a && (a = 0)
                }
                if (i) {
                    var o = this.startDate.clone();
                    o.hour(a), o.minute(r), this.startDate = o, this.leftCalendar.month.hour(a).minute(r)
                } else {
                    var l = this.endDate.clone();
                    l.hour(a), l.minute(r), this.endDate = l, this.rightCalendar.month.hour(a).minute(r)
                }
                this.updateCalendars()
            },
            updateCalendars: function () {
                this.leftCalendar.calendar = this.buildCalendar(this.leftCalendar.month.month(), this.leftCalendar.month.year(), this.leftCalendar.month.hour(), this.leftCalendar.month.minute(), "left"), this.rightCalendar.calendar = this.buildCalendar(this.rightCalendar.month.month(), this.rightCalendar.month.year(), this.rightCalendar.month.hour(), this.rightCalendar.month.minute(), "right"), this.container.find(".calendar.left").html(this.renderCalendar(this.leftCalendar.calendar, this.startDate, this.minDate, this.maxDate)), this.container.find(".calendar.right").html(this.renderCalendar(this.rightCalendar.calendar, this.endDate, this.startDate, this.maxDate)), this.container.find(".ranges li").removeClass("active");
                var t = !0,
                    e = 0;
                for (var i in this.ranges) this.timePicker ? this.startDate.isSame(this.ranges[i][0]) && this.endDate.isSame(this.ranges[i][1]) && (t = !1, this.container.find(".ranges li:eq(" + e + ")").addClass("active")) : this.startDate.format("YYYY-MM-DD") == this.ranges[i][0].format("YYYY-MM-DD") && this.endDate.format("YYYY-MM-DD") == this.ranges[i][1].format("YYYY-MM-DD") && (t = !1, this.container.find(".ranges li:eq(" + e + ")").addClass("active")), e++;
                t && this.container.find(".ranges li:last").addClass("active")
            },
            buildCalendar: function (t, e, i, n) {
                for (var a = moment([e, t, 1]), r = moment(a).subtract("month", 1).month(), s = moment(a).subtract("month", 1).year(), o = moment([s, r]).daysInMonth(), l = a.day(), h = [], c = 0; 6 > c; c++) h[c] = [];
                var u = o - l + this.locale.firstDay + 1;
                u > o && (u -= 7), l == this.locale.firstDay && (u = o - 6);
                for (var d = moment([s, r, u, 12, n]), c = 0, f = 0, p = 0; 42 > c; c++, f++, d = moment(d).add("hour", 24)) c > 0 && 0 == f % 7 && (f = 0, p++), h[p][f] = d.clone().hour(i), d.hour(12);
                return h
            },
            renderDropdowns: function (t, e, i) {
                for (var n = t.month(), a = '<select class="monthselect">', r = !1, s = !1, o = 0; 12 > o; o++)(!r || o >= e.month()) && (!s || o <= i.month()) && (a += "<option value='" + o + "'" + (o === n ? " selected='selected'" : "") + ">" + this.locale.monthNames[o] + "</option>");
                a += "</select>";
                for (var l = t.year(), h = i && i.year() || l + 5, c = e && e.year() || l - 50, u = '<select class="yearselect">', d = c; h >= d; d++) u += '<option value="' + d + '"' + (d === l ? ' selected="selected"' : "") + ">" + d + "</option>";
                return u += "</select>", a + u
            },
            renderCalendar: function (e, i, n, a) {
                var r = '<div class="calendar-date">';
                r += '<table class="table-condensed">', r += "<thead>", r += "<tr>", this.showWeekNumbers && (r += "<th></th>"), r += !n || n.isBefore(e[1][1]) ? '<th class="prev available"><i class="icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>' : "<th></th>";
                var s = this.locale.monthNames[e[1][1].month()] + e[1][1].format(" YYYY");
                this.showDropdowns && (s = this.renderDropdowns(e[1][1], n, a)), r += '<th colspan="5" style="width: auto">' + s + "</th>", r += !a || a.isAfter(e[1][1]) ? '<th class="next available"><i class="icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>' : "<th></th>", r += "</tr>", r += "<tr>", this.showWeekNumbers && (r += '<th class="week">' + this.locale.weekLabel + "</th>"), t.each(this.locale.daysOfWeek, function (t, e) {
                    r += "<th>" + e + "</th>"
                }), r += "</tr>", r += "</thead>", r += "<tbody>";
                for (var o = 0; 6 > o; o++) {
                    r += "<tr>", this.showWeekNumbers && (r += '<td class="week">' + e[o][0].week() + "</td>");
                    for (var l = 0; 7 > l; l++) {
                        var h = "available ";
                        h += e[o][l].month() == e[1][1].month() ? "" : "off", n && e[o][l].isBefore(n) || a && e[o][l].isAfter(a) ? h = " off disabled " : e[o][l].format("YYYY-MM-DD") == i.format("YYYY-MM-DD") ? (h += " active ", e[o][l].format("YYYY-MM-DD") == this.startDate.format("YYYY-MM-DD") && (h += " start-date "), e[o][l].format("YYYY-MM-DD") == this.endDate.format("YYYY-MM-DD") && (h += " end-date ")) : e[o][l] >= this.startDate && e[o][l] <= this.endDate && (h += " in-range ", e[o][l].isSame(this.startDate) && (h += " start-date "), e[o][l].isSame(this.endDate) && (h += " end-date "));
                        var c = "r" + o + "c" + l;
                        r += '<td class="' + h.replace(/\s+/g, " ").replace(/^\s?(.*?)\s?$/, "$1") + '" data-title="' + c + '">' + e[o][l].date() + "</td>"
                    }
                    r += "</tr>"
                }
                if (r += "</tbody>", r += "</table>", r += "</div>", this.timePicker) {
                    r += '<div class="calendar-time">', r += '<select class="hourselect">';
                    var u = 0,
                        d = 23,
                        f = i.hour();
                    this.timePicker12Hour && (u = 1, d = 12, f >= 12 && (f -= 12), 0 == f && (f = 12));
                    for (var p = u; d >= p; p++) r += p == f ? '<option value="' + p + '" selected="selected">' + p + "</option>" : '<option value="' + p + '">' + p + "</option>";
                    r += "</select> : ", r += '<select class="minuteselect">';
                    for (var p = 0; 60 > p; p += this.timePickerIncrement) {
                        var g = p;
                        10 > g && (g = "0" + g), r += p == i.minute() ? '<option value="' + p + '" selected="selected">' + g + "</option>" : '<option value="' + p + '">' + g + "</option>"
                    }
                    r += "</select> ", this.timePicker12Hour && (r += '<select class="ampmselect">', r += i.hour() >= 12 ? '<option value="AM">AM</option><option value="PM" selected="selected">PM</option>' : '<option value="AM" selected="selected">AM</option><option value="PM">PM</option>', r += "</select>"), r += "</div>"
                }
                return r
            }
        }, t.fn.daterangepicker = function (i, n) {
            return this.each(function () {
                var a = t(this);
                a.data("daterangepicker") || a.data("daterangepicker", new e(a, i, n))
            }), this
        }
    }(window.jQuery),
    /*
    colpick Color Picker
    Copyright 2013 Jose Vargas. Licensed under GPL license. Based on Stefan Petre's Color Picker www.eyecon.ro, dual licensed under the MIT and GPL licenses

    For usage and examples: colpick.com/plugin
     */
    function (t) {
        var e = function () {
                var e = '<div class="colpick"><div class="colpick_color"><div class="colpick_color_overlay1"><div class="colpick_color_overlay2"><div class="colpick_selector_outer"><div class="colpick_selector_inner"></div></div></div></div></div><div class="colpick_hue"><div class="colpick_hue_arrs"><div class="colpick_hue_larr"></div><div class="colpick_hue_rarr"></div></div></div><div class="colpick_new_color"></div><div class="colpick_current_color"></div><div class="colpick_hex_field"><div class="colpick_field_letter">#</div><input type="text" maxlength="6" size="6" /></div><div class="colpick_rgb_r colpick_field"><div class="colpick_field_letter">R</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_g colpick_field"><div class="colpick_field_letter">G</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_h colpick_field"><div class="colpick_field_letter">H</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_s colpick_field"><div class="colpick_field_letter">S</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_submit"></div></div>',
                    i = {
                        showEvent: "click",
                        onShow: function () {},
                        onBeforeShow: function () {},
                        onHide: function () {},
                        onChange: function () {},
                        onSubmit: function () {},
                        colorScheme: "light",
                        color: "3289c7",
                        livePreview: !0,
                        flat: !1,
                        layout: "full",
                        submit: 1,
                        submitText: "OK",
                        height: 156
                    },
                    s = function (e, i) {
                        var n = r(e);
                        t(i).data("colpick").fields.eq(1).val(n.r).end().eq(2).val(n.g).end().eq(3).val(n.b).end()
                    },
                    l = function (e, i) {
                        t(i).data("colpick").fields.eq(4).val(Math.round(e.h)).end().eq(5).val(Math.round(e.s)).end().eq(6).val(Math.round(e.b)).end()
                    },
                    h = function (e, i) {
                        t(i).data("colpick").fields.eq(0).val(o(e))
                    },
                    c = function (e, i) {
                        t(i).data("colpick").selector.css("backgroundColor", "#" + o({
                            h: e.h,
                            s: 100,
                            b: 100
                        })), t(i).data("colpick").selectorIndic.css({
                            left: parseInt(t(i).data("colpick").height * e.s / 100, 10),
                            top: parseInt(t(i).data("colpick").height * (100 - e.b) / 100, 10)
                        })
                    },
                    u = function (e, i) {
                        t(i).data("colpick").hue.css("top", parseInt(t(i).data("colpick").height - t(i).data("colpick").height * e.h / 360, 10))
                    },
                    d = function (e, i) {
                        t(i).data("colpick").currentColor.css("backgroundColor", "#" + o(e))
                    },
                    f = function (e, i) {
                        t(i).data("colpick").newColor.css("backgroundColor", "#" + o(e))
                    },
                    p = function () {
                        var e, i = t(this).parent().parent();
                        this.parentNode.className.indexOf("_hex") > 0 ? (i.data("colpick").color = e = n(E(this.value)), s(e, i.get(0)), l(e, i.get(0))) : this.parentNode.className.indexOf("_hsb") > 0 ? (i.data("colpick").color = e = A({
                            h: parseInt(i.data("colpick").fields.eq(4).val(), 10),
                            s: parseInt(i.data("colpick").fields.eq(5).val(), 10),
                            b: parseInt(i.data("colpick").fields.eq(6).val(), 10)
                        }), s(e, i.get(0)), h(e, i.get(0))) : (i.data("colpick").color = e = a(I({
                            r: parseInt(i.data("colpick").fields.eq(1).val(), 10),
                            g: parseInt(i.data("colpick").fields.eq(2).val(), 10),
                            b: parseInt(i.data("colpick").fields.eq(3).val(), 10)
                        })), h(e, i.get(0)), l(e, i.get(0))), c(e, i.get(0)), u(e, i.get(0)), f(e, i.get(0)), i.data("colpick").onChange.apply(i.parent(), [e, o(e), r(e)])
                    },
                    g = function () {
                        t(this).parent().removeClass("colpick_focus")
                    },
                    m = function () {
                        t(this).parent().parent().data("colpick").fields.parent().removeClass("colpick_focus"), t(this).parent().addClass("colpick_focus")
                    },
                    v = function (e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                        var i = t(this).parent().find("input").focus(),
                            n = {
                                el: t(this).parent().addClass("colpick_slider"),
                                max: this.parentNode.className.indexOf("_hsb_h") > 0 ? 360 : this.parentNode.className.indexOf("_hsb") > 0 ? 100 : 255,
                                y: e.pageY,
                                field: i,
                                val: parseInt(i.val(), 10),
                                preview: t(this).parent().parent().data("colpick").livePreview
                            };
                        t(document).mouseup(n, y), t(document).mousemove(n, b)
                    },
                    b = function (t) {
                        return t.data.field.val(Math.max(0, Math.min(t.data.max, parseInt(t.data.val - t.pageY + t.data.y, 10)))), t.data.preview && p.apply(t.data.field.get(0), [!0]), !1
                    },
                    y = function (e) {
                        return p.apply(e.data.field.get(0), [!0]), e.data.el.removeClass("colpick_slider").find("input").focus(), t(document).off("mouseup", y), t(document).off("mousemove", b), !1
                    },
                    x = function (e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                        var i = {
                            cal: t(this).parent(),
                            y: t(this).offset().top
                        };
                        i.preview = i.cal.data("colpick").livePreview, t(document).mouseup(i, _), t(document).mousemove(i, w), p.apply(i.cal.data("colpick").fields.eq(4).val(parseInt(360 * (i.cal.data("colpick").height - (e.pageY - i.y)) / i.cal.data("colpick").height, 10)).get(0), [i.preview])
                    },
                    w = function (t) {
                        return p.apply(t.data.cal.data("colpick").fields.eq(4).val(parseInt(360 * (t.data.cal.data("colpick").height - Math.max(0, Math.min(t.data.cal.data("colpick").height, t.pageY - t.data.y))) / t.data.cal.data("colpick").height, 10)).get(0), [t.data.preview]), !1
                    },
                    _ = function (e) {
                        return s(e.data.cal.data("colpick").color, e.data.cal.get(0)), h(e.data.cal.data("colpick").color, e.data.cal.get(0)), t(document).off("mouseup", _), t(document).off("mousemove", w), !1
                    },
                    C = function (e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                        var i = {
                            cal: t(this).parent(),
                            pos: t(this).offset()
                        };
                        i.preview = i.cal.data("colpick").livePreview, t(document).mouseup(i, S), t(document).mousemove(i, k), p.apply(i.cal.data("colpick").fields.eq(6).val(parseInt(100 * (i.cal.data("colpick").height - (e.pageY - i.pos.top)) / i.cal.data("colpick").height, 10)).end().eq(5).val(parseInt(100 * (e.pageX - i.pos.left) / i.cal.data("colpick").height, 10)).get(0), [i.preview])
                    },
                    k = function (t) {
                        return p.apply(t.data.cal.data("colpick").fields.eq(6).val(parseInt(100 * (t.data.cal.data("colpick").height - Math.max(0, Math.min(t.data.cal.data("colpick").height, t.pageY - t.data.pos.top))) / t.data.cal.data("colpick").height, 10)).end().eq(5).val(parseInt(100 * Math.max(0, Math.min(t.data.cal.data("colpick").height, t.pageX - t.data.pos.left)) / t.data.cal.data("colpick").height, 10)).get(0), [t.data.preview]), !1
                    },
                    S = function (e) {
                        return s(e.data.cal.data("colpick").color, e.data.cal.get(0)), h(e.data.cal.data("colpick").color, e.data.cal.get(0)), t(document).off("mouseup", S), t(document).off("mousemove", k), !1
                    },
                    D = function () {
                        var e = t(this).parent(),
                            i = e.data("colpick").color;
                        e.data("colpick").origColor = i, d(i, e.get(0)), e.data("colpick").onSubmit(i, o(i), r(i), e.data("colpick").el)
                    },
                    T = function () {
                        var e = t("#" + t(this).data("colpickId"));
                        e.data("colpick").onBeforeShow.apply(this, [e.get(0)]);
                        var i = t(this).offset(),
                            n = i.top + this.offsetHeight,
                            a = i.left,
                            r = M();
                        a + 346 > r.l + r.w && (a -= 346), e.css({
                            left: a + "px",
                            top: n + "px"
                        }), 0 != e.data("colpick").onShow.apply(this, [e.get(0)]) && e.show(), t("html").mousedown({
                            cal: e
                        }, F), e.mousedown(function (t) {
                            t.stopPropagation()
                        })
                    },
                    F = function (e) {
                        0 != e.data.cal.data("colpick").onHide.apply(this, [e.data.cal.get(0)]) && e.data.cal.hide(), t("html").off("mousedown", F)
                    },
                    M = function () {
                        var t = "CSS1Compat" == document.compatMode;
                        return {
                            l: window.pageXOffset || (t ? document.documentElement.scrollLeft : document.body.scrollLeft),
                            w: window.innerWidth || (t ? document.documentElement.clientWidth : document.body.clientWidth)
                        }
                    },
                    A = function (t) {
                        return {
                            h: Math.min(360, Math.max(0, t.h)),
                            s: Math.min(100, Math.max(0, t.s)),
                            b: Math.min(100, Math.max(0, t.b))
                        }
                    },
                    I = function (t) {
                        return {
                            r: Math.min(255, Math.max(0, t.r)),
                            g: Math.min(255, Math.max(0, t.g)),
                            b: Math.min(255, Math.max(0, t.b))
                        }
                    },
                    E = function (t) {
                        var e = 6 - t.length;
                        if (e > 0) {
                            for (var i = [], n = 0; e > n; n++) i.push("0");
                            i.push(t), t = i.join("")
                        }
                        return t
                    },
                    L = function () {
                        var e = t(this).parent(),
                            i = e.data("colpick").origColor;
                        e.data("colpick").color = i, s(i, e.get(0)), h(i, e.get(0)), l(i, e.get(0)), c(i, e.get(0)), u(i, e.get(0)), f(i, e.get(0))
                    };
                return {
                    init: function (r) {
                        if (r = t.extend({}, i, r || {}), "string" == typeof r.color) r.color = n(r.color);
                        else if (void 0 != r.color.r && void 0 != r.color.g && void 0 != r.color.b) r.color = a(r.color);
                        else {
                            if (void 0 == r.color.h || void 0 == r.color.s || void 0 == r.color.b) return this;
                            r.color = A(r.color)
                        }
                        return this.each(function () {
                            if (!t(this).data("colpickId")) {
                                var i = t.extend({}, r);
                                i.origColor = r.color;
                                var n = "collorpicker_" + parseInt(1e3 * Math.random());
                                t(this).data("colpickId", n);
                                var a = t(e).attr("id", n);
                                a.addClass("colpick_" + i.layout + (i.submit ? "" : " colpick_" + i.layout + "_ns")), "light" != i.colorScheme && a.addClass("colpick_" + i.colorScheme), a.find("div.colpick_submit").html(i.submitText).click(D), i.fields = a.find("input").change(p).blur(g).focus(m), a.find("div.colpick_field_arrs").mousedown(v).end().find("div.colpick_current_color").click(L), i.selector = a.find("div.colpick_color").mousedown(C), i.selectorIndic = i.selector.find("div.colpick_selector_outer"), i.el = this, i.hue = a.find("div.colpick_hue_arrs"), huebar = i.hue.parent();
                                var o = navigator.userAgent.toLowerCase(),
                                    b = "Microsoft Internet Explorer" === navigator.appName,
                                    y = b ? parseFloat(o.match(/msie ([0-9]{1,}[\.0-9]{0,})/)[1]) : 0,
                                    w = b && 10 > y,
                                    _ = ["#ff0000", "#ff0080", "#ff00ff", "#8000ff", "#0000ff", "#0080ff", "#00ffff", "#00ff80", "#00ff00", "#80ff00", "#ffff00", "#ff8000", "#ff0000"];
                                if (w) {
                                    var k, S;
                                    for (k = 0; 11 >= k; k++) S = t("<div></div>").attr("style", "height:8.333333%; filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=" + _[k] + ", endColorstr=" + _[k + 1] + '); -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=' + _[k] + ", endColorstr=" + _[k + 1] + ')";'), huebar.append(S)
                                } else stopList = _.join(","), huebar.attr("style", "background:-webkit-linear-gradient(top center," + stopList + "); background:-moz-linear-gradient(top center," + stopList + "); background:linear-gradient(to bottom," + stopList + "); "), huebar.css({
                                    background: "linear-gradient(to bottom," + stopList + ")"
                                }), huebar.css({
                                    background: "-moz-linear-gradient(top," + stopList + ")"
                                });
                                a.find("div.colpick_hue").mousedown(x), i.newColor = a.find("div.colpick_new_color"), i.currentColor = a.find("div.colpick_current_color"), a.data("colpick", i), s(i.color, a.get(0)), l(i.color, a.get(0)), h(i.color, a.get(0)), u(i.color, a.get(0)), c(i.color, a.get(0)), d(i.color, a.get(0)), f(i.color, a.get(0)), i.flat ? (a.appendTo(this).show(), a.css({
                                    position: "relative",
                                    display: "block"
                                })) : (a.appendTo(document.body), t(this).on(i.showEvent, T), a.css({
                                    position: "absolute"
                                }))
                            }
                        })
                    },
                    showPicker: function () {
                        return this.each(function () {
                            t(this).data("colpickId") && T.apply(this)
                        })
                    },
                    hidePicker: function () {
                        return this.each(function () {
                            t(this).data("colpickId") && t("#" + t(this).data("colpickId")).hide()
                        })
                    },
                    setColor: function (e, i) {
                        if (i = "undefined" == typeof i ? 1 : i, "string" == typeof e) e = n(e);
                        else if (void 0 != e.r && void 0 != e.g && void 0 != e.b) e = a(e);
                        else {
                            if (void 0 == e.h || void 0 == e.s || void 0 == e.b) return this;
                            e = A(e)
                        }
                        return this.each(function () {
                            if (t(this).data("colpickId")) {
                                var n = t("#" + t(this).data("colpickId"));
                                n.data("colpick").color = e, n.data("colpick").origColor = e, s(e, n.get(0)), l(e, n.get(0)), h(e, n.get(0)), u(e, n.get(0)), c(e, n.get(0)), f(e, n.get(0)), n.data("colpick").onChange.apply(n.parent(), [e, o(e), r(e), 1]), i && d(e, n.get(0))
                            }
                        })
                    }
                }
            }(),
            i = function (t) {
                var t = parseInt(t.indexOf("#") > -1 ? t.substring(1) : t, 16);
                return {
                    r: t >> 16,
                    g: (65280 & t) >> 8,
                    b: 255 & t
                }
            },
            n = function (t) {
                return a(i(t))
            },
            a = function (t) {
                var e = {
                        h: 0,
                        s: 0,
                        b: 0
                    },
                    i = Math.min(t.r, t.g, t.b),
                    n = Math.max(t.r, t.g, t.b),
                    a = n - i;
                return e.b = n, e.s = 0 != n ? 255 * a / n : 0, e.h = 0 != e.s ? t.r == n ? (t.g - t.b) / a : t.g == n ? 2 + (t.b - t.r) / a : 4 + (t.r - t.g) / a : -1, e.h *= 60, e.h < 0 && (e.h += 360), e.s *= 100 / 255, e.b *= 100 / 255, e
            },
            r = function (t) {
                var e = {},
                    i = Math.round(t.h),
                    n = Math.round(255 * t.s / 100),
                    a = Math.round(255 * t.b / 100);
                if (0 == n) e.r = e.g = e.b = a;
                else {
                    var r = a,
                        s = (255 - n) * a / 255,
                        o = (r - s) * (i % 60) / 60;
                    360 == i && (i = 0), 60 > i ? (e.r = r, e.b = s, e.g = s + o) : 120 > i ? (e.g = r, e.b = s, e.r = r - o) : 180 > i ? (e.g = r, e.r = s, e.b = s + o) : 240 > i ? (e.b = r, e.r = s, e.g = r - o) : 300 > i ? (e.b = r, e.g = s, e.r = s + o) : 360 > i ? (e.r = r, e.g = s, e.b = r - o) : (e.r = 0, e.g = 0, e.b = 0)
                }
                return {
                    r: Math.round(e.r),
                    g: Math.round(e.g),
                    b: Math.round(e.b)
                }
            },
            s = function (e) {
                var i = [e.r.toString(16), e.g.toString(16), e.b.toString(16)];
                return t.each(i, function (t, e) {
                    1 == e.length && (i[t] = "0" + e)
                }), i.join("")
            },
            o = function (t) {
                return s(r(t))
            };
        t.fn.extend({
            colpick: e.init,
            colpickHide: e.hidePicker,
            colpickShow: e.showPicker,
            colpickSetColor: e.setColor
        }), t.extend({
            colpickRgbToHex: s,
            colpickRgbToHsb: a,
            colpickHsbToHex: o,
            colpickHsbToRgb: r,
            colpickHexToHsb: n,
            colpickHexToRgb: i
        })
    }(jQuery), ! function (t) {
        function e(t, e) {
            return function (i) {
                return l(t.call(this, i), e)
            }
        }

        function i(t, e) {
            return function (i) {
                return this.lang().ordinal(t.call(this, i), e)
            }
        }

        function n() {}

        function a(t) {
            s(this, t)
        }

        function r(t) {
            var e = t.years || t.year || t.y || 0,
                i = t.months || t.month || t.M || 0,
                n = t.weeks || t.week || t.w || 0,
                a = t.days || t.day || t.d || 0,
                r = t.hours || t.hour || t.h || 0,
                s = t.minutes || t.minute || t.m || 0,
                o = t.seconds || t.second || t.s || 0,
                l = t.milliseconds || t.millisecond || t.ms || 0;
            this._input = t, this._milliseconds = l + 1e3 * o + 6e4 * s + 36e5 * r, this._days = a + 7 * n, this._months = i + 12 * e, this._data = {}, this._bubble()
        }

        function s(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            return t
        }

        function o(t) {
            return 0 > t ? Math.ceil(t) : Math.floor(t)
        }

        function l(t, e) {
            for (var i = t + ""; i.length < e;) i = "0" + i;
            return i
        }

        function h(t, e, i, n) {
            var a, r, s = e._milliseconds,
                o = e._days,
                l = e._months;
            s && t._d.setTime(+t._d + s * i), (o || l) && (a = t.minute(), r = t.hour()), o && t.date(t.date() + o * i), l && t.month(t.month() + l * i), s && !n && L.updateOffset(t), (o || l) && (t.minute(a), t.hour(r))
        }

        function c(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }

        function u(t, e) {
            var i, n = Math.min(t.length, e.length),
                a = Math.abs(t.length - e.length),
                r = 0;
            for (i = 0; n > i; i++)~~t[i] !== ~~e[i] && r++;
            return r + a
        }

        function d(t) {
            return t ? ae[t] || t.toLowerCase().replace(/(.)s$/, "$1") : t
        }

        function f(t, e) {
            return e.abbr = t, N[t] || (N[t] = new n), N[t].set(e), N[t]
        }

        function p(t) {
            if (!t) return L.fn._lang;
            if (!N[t] && z) try {
                require("./lang/" + t)
            } catch (e) {
                return L.fn._lang
            }
            return N[t]
        }

        function g(t) {
            return t.match(/\[.*\]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
        }

        function m(t) {
            var e, i, n = t.match(W);
            for (e = 0, i = n.length; i > e; e++) n[e] = le[n[e]] ? le[n[e]] : g(n[e]);
            return function (a) {
                var r = "";
                for (e = 0; i > e; e++) r += n[e] instanceof Function ? n[e].call(a, t) : n[e];
                return r
            }
        }

        function v(t, e) {
            function i(e) {
                return t.lang().longDateFormat(e) || e
            }
            for (var n = 5; n-- && O.test(e);) e = e.replace(O, i);
            return re[e] || (re[e] = m(e)), re[e](t)
        }

        function b(t, e) {
            switch (t) {
            case "DDDD":
                return Y;
            case "YYYY":
                return U;
            case "YYYYY":
                return V;
            case "S":
            case "SS":
            case "SSS":
            case "DDD":
                return q;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
                return X;
            case "a":
            case "A":
                return p(e._l)._meridiemParse;
            case "X":
                return Q;
            case "Z":
            case "ZZ":
                return G;
            case "T":
                return J;
            case "MM":
            case "DD":
            case "YY":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
                return $;
            default:
                return new RegExp(t.replace("\\", ""))
            }
        }

        function y(t) {
            var e = (G.exec(t) || [])[0],
                i = (e + "").match(ee) || ["-", 0, 0],
                n = +(60 * i[1]) + ~~i[2];
            return "+" === i[0] ? -n : n
        }

        function x(t, e, i) {
            var n, a = i._a;
            switch (t) {
            case "M":
            case "MM":
                a[1] = null == e ? 0 : ~~e - 1;
                break;
            case "MMM":
            case "MMMM":
                n = p(i._l).monthsParse(e), null != n ? a[1] = n : i._isValid = !1;
                break;
            case "D":
            case "DD":
            case "DDD":
            case "DDDD":
                null != e && (a[2] = ~~e);
                break;
            case "YY":
                a[0] = ~~e + (~~e > 68 ? 1900 : 2e3);
                break;
            case "YYYY":
            case "YYYYY":
                a[0] = ~~e;
                break;
            case "a":
            case "A":
                i._isPm = p(i._l).isPM(e);
                break;
            case "H":
            case "HH":
            case "h":
            case "hh":
                a[3] = ~~e;
                break;
            case "m":
            case "mm":
                a[4] = ~~e;
                break;
            case "s":
            case "ss":
                a[5] = ~~e;
                break;
            case "S":
            case "SS":
            case "SSS":
                a[6] = ~~(1e3 * ("0." + e));
                break;
            case "X":
                i._d = new Date(1e3 * parseFloat(e));
                break;
            case "Z":
            case "ZZ":
                i._useUTC = !0, i._tzm = y(e)
            }
            null == e && (i._isValid = !1)
        }

        function w(t) {
            var e, i, n = [];
            if (!t._d) {
                for (e = 0; 7 > e; e++) t._a[e] = n[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                n[3] += ~~((t._tzm || 0) / 60), n[4] += ~~((t._tzm || 0) % 60), i = new Date(0), t._useUTC ? (i.setUTCFullYear(n[0], n[1], n[2]), i.setUTCHours(n[3], n[4], n[5], n[6])) : (i.setFullYear(n[0], n[1], n[2]), i.setHours(n[3], n[4], n[5], n[6])), t._d = i
            }
        }

        function _(t) {
            var e, i, n = t._f.match(W),
                a = t._i;
            for (t._a = [], e = 0; e < n.length; e++) i = (b(n[e], t).exec(a) || [])[0], i && (a = a.slice(a.indexOf(i) + i.length)), le[n[e]] && x(n[e], i, t);
            a && (t._il = a), t._isPm && t._a[3] < 12 && (t._a[3] += 12), t._isPm === !1 && 12 === t._a[3] && (t._a[3] = 0), w(t)
        }

        function C(t) {
            var e, i, n, r, o, l = 99;
            for (r = 0; r < t._f.length; r++) e = s({}, t), e._f = t._f[r], _(e), i = new a(e), o = u(e._a, i.toArray()), i._il && (o += i._il.length), l > o && (l = o, n = i);
            s(t, n)
        }

        function k(t) {
            var e, i = t._i,
                n = Z.exec(i);
            if (n) {
                for (t._f = "YYYY-MM-DD" + (n[2] || " "), e = 0; 4 > e; e++)
                    if (te[e][1].exec(i)) {
                        t._f += te[e][0];
                        break
                    }
                G.exec(i) && (t._f += " Z"), _(t)
            } else t._d = new Date(i)
        }

        function S(e) {
            var i = e._i,
                n = B.exec(i);
            i === t ? e._d = new Date : n ? e._d = new Date(+n[1]) : "string" == typeof i ? k(e) : c(i) ? (e._a = i.slice(0), w(e)) : e._d = i instanceof Date ? new Date(+i) : new Date(i)
        }

        function D(t, e, i, n, a) {
            return a.relativeTime(e || 1, !!i, t, n)
        }

        function T(t, e, i) {
            var n = H(Math.abs(t) / 1e3),
                a = H(n / 60),
                r = H(a / 60),
                s = H(r / 24),
                o = H(s / 365),
                l = 45 > n && ["s", n] || 1 === a && ["m"] || 45 > a && ["mm", a] || 1 === r && ["h"] || 22 > r && ["hh", r] || 1 === s && ["d"] || 25 >= s && ["dd", s] || 45 >= s && ["M"] || 345 > s && ["MM", H(s / 30)] || 1 === o && ["y"] || ["yy", o];
            return l[2] = e, l[3] = t > 0, l[4] = i, D.apply({}, l)
        }

        function F(t, e, i) {
            var n, a = i - e,
                r = i - t.day();
            return r > a && (r -= 7), a - 7 > r && (r += 7), n = L(t).add("d", r), {
                week: Math.ceil(n.dayOfYear() / 7),
                year: n.year()
            }
        }

        function M(t) {
            var e = t._i,
                i = t._f;
            return null === e || "" === e ? null : ("string" == typeof e && (t._i = e = p().preparse(e)), L.isMoment(e) ? (t = s({}, e), t._d = new Date(+e._d)) : i ? c(i) ? C(t) : _(t) : S(t), new a(t))
        }

        function A(t, e) {
            L.fn[t] = L.fn[t + "s"] = function (t) {
                var i = this._isUTC ? "UTC" : "";
                return null != t ? (this._d["set" + i + e](t), L.updateOffset(this), this) : this._d["get" + i + e]()
            }
        }

        function I(t) {
            L.duration.fn[t] = function () {
                return this._data[t]
            }
        }

        function E(t, e) {
            L.duration.fn["as" + t] = function () {
                return +this / e
            }
        }
        for (var L, R, P = "2.1.0", H = Math.round, N = {}, z = "undefined" != typeof module && module.exports, B = /^\/?Date\((\-?\d+)/i, j = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, W = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, O = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, $ = /\d\d?/, q = /\d{1,3}/, Y = /\d{3}/, U = /\d{1,4}/, V = /[+\-]?\d{1,6}/, X = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, G = /Z|[\+\-]\d\d:?\d\d/i, J = /T/i, Q = /[\+\-]?\d+(\.\d{1,3})?/, Z = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, K = "YYYY-MM-DDTHH:mm:ssZ", te = [
            ["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
            ["HH:mm", /(T| )\d\d:\d\d/],
            ["HH", /(T| )\d\d/]
        ], ee = /([\+\-]|\d\d)/gi, ie = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), ne = {
            Milliseconds: 1,
            Seconds: 1e3,
            Minutes: 6e4,
            Hours: 36e5,
            Days: 864e5,
            Months: 2592e6,
            Years: 31536e6
        }, ae = {
            ms: "millisecond",
            s: "second",
            m: "minute",
            h: "hour",
            d: "day",
            w: "week",
            M: "month",
            y: "year"
        }, re = {}, se = "DDD w W M D d".split(" "), oe = "M D H h m s w W".split(" "), le = {
            M: function () {
                return this.month() + 1
            },
            MMM: function (t) {
                return this.lang().monthsShort(this, t)
            },
            MMMM: function (t) {
                return this.lang().months(this, t)
            },
            D: function () {
                return this.date()
            },
            DDD: function () {
                return this.dayOfYear()
            },
            d: function () {
                return this.day()
            },
            dd: function (t) {
                return this.lang().weekdaysMin(this, t)
            },
            ddd: function (t) {
                return this.lang().weekdaysShort(this, t)
            },
            dddd: function (t) {
                return this.lang().weekdays(this, t)
            },
            w: function () {
                return this.week()
            },
            W: function () {
                return this.isoWeek()
            },
            YY: function () {
                return l(this.year() % 100, 2)
            },
            YYYY: function () {
                return l(this.year(), 4)
            },
            YYYYY: function () {
                return l(this.year(), 5)
            },
            gg: function () {
                return l(this.weekYear() % 100, 2)
            },
            gggg: function () {
                return this.weekYear()
            },
            ggggg: function () {
                return l(this.weekYear(), 5)
            },
            GG: function () {
                return l(this.isoWeekYear() % 100, 2)
            },
            GGGG: function () {
                return this.isoWeekYear()
            },
            GGGGG: function () {
                return l(this.isoWeekYear(), 5)
            },
            e: function () {
                return this.weekday()
            },
            E: function () {
                return this.isoWeekday()
            },
            a: function () {
                return this.lang().meridiem(this.hours(), this.minutes(), !0)
            },
            A: function () {
                return this.lang().meridiem(this.hours(), this.minutes(), !1)
            },
            H: function () {
                return this.hours()
            },
            h: function () {
                return this.hours() % 12 || 12
            },
            m: function () {
                return this.minutes()
            },
            s: function () {
                return this.seconds()
            },
            S: function () {
                return ~~(this.milliseconds() / 100)
            },
            SS: function () {
                return l(~~(this.milliseconds() / 10), 2)
            },
            SSS: function () {
                return l(this.milliseconds(), 3)
            },
            Z: function () {
                var t = -this.zone(),
                    e = "+";
                return 0 > t && (t = -t, e = "-"), e + l(~~(t / 60), 2) + ":" + l(~~t % 60, 2)
            },
            ZZ: function () {
                var t = -this.zone(),
                    e = "+";
                return 0 > t && (t = -t, e = "-"), e + l(~~(10 * t / 6), 4)
            },
            z: function () {
                return this.zoneAbbr()
            },
            zz: function () {
                return this.zoneName()
            },
            X: function () {
                return this.unix()
            }
        }; se.length;) R = se.pop(), le[R + "o"] = i(le[R], R);
        for (; oe.length;) R = oe.pop(), le[R + R] = e(le[R], 2);
        for (le.DDDD = e(le.DDD, 3), n.prototype = {
            set: function (t) {
                var e, i;
                for (i in t) e = t[i], "function" == typeof e ? this[i] = e : this["_" + i] = e
            },
            _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            months: function (t) {
                return this._months[t.month()]
            },
            _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            monthsShort: function (t) {
                return this._monthsShort[t.month()]
            },
            monthsParse: function (t) {
                var e, i, n;
                for (this._monthsParse || (this._monthsParse = []), e = 0; 12 > e; e++)
                    if (this._monthsParse[e] || (i = L([2e3, e]), n = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[e] = new RegExp(n.replace(".", ""), "i")), this._monthsParse[e].test(t)) return e
            },
            _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdays: function (t) {
                return this._weekdays[t.day()]
            },
            _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysShort: function (t) {
                return this._weekdaysShort[t.day()]
            },
            _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            weekdaysMin: function (t) {
                return this._weekdaysMin[t.day()]
            },
            weekdaysParse: function (t) {
                var e, i, n;
                for (this._weekdaysParse || (this._weekdaysParse = []), e = 0; 7 > e; e++)
                    if (this._weekdaysParse[e] || (i = L([2e3, 1]).day(e), n = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[e] = new RegExp(n.replace(".", ""), "i")), this._weekdaysParse[e].test(t)) return e
            },
            _longDateFormat: {
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D YYYY",
                LLL: "MMMM D YYYY LT",
                LLLL: "dddd, MMMM D YYYY LT"
            },
            longDateFormat: function (t) {
                var e = this._longDateFormat[t];
                return !e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (t) {
                    return t.slice(1)
                }), this._longDateFormat[t] = e), e
            },
            isPM: function (t) {
                return "p" === (t + "").toLowerCase()[0]
            },
            _meridiemParse: /[ap]\.?m?\.?/i,
            meridiem: function (t, e, i) {
                return t > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
            },
            _calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            calendar: function (t, e) {
                var i = this._calendar[t];
                return "function" == typeof i ? i.apply(e) : i
            },
            _relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            relativeTime: function (t, e, i, n) {
                var a = this._relativeTime[i];
                return "function" == typeof a ? a(t, e, i, n) : a.replace(/%d/i, t)
            },
            pastFuture: function (t, e) {
                var i = this._relativeTime[t > 0 ? "future" : "past"];
                return "function" == typeof i ? i(e) : i.replace(/%s/i, e)
            },
            ordinal: function (t) {
                return this._ordinal.replace("%d", t)
            },
            _ordinal: "%d",
            preparse: function (t) {
                return t
            },
            postformat: function (t) {
                return t
            },
            week: function (t) {
                return F(t, this._week.dow, this._week.doy).week
            },
            _week: {
                dow: 0,
                doy: 6
            }
        }, L = function (t, e, i) {
            return M({
                _i: t,
                _f: e,
                _l: i,
                _isUTC: !1
            })
        }, L.utc = function (t, e, i) {
            return M({
                _useUTC: !0,
                _isUTC: !0,
                _l: i,
                _i: t,
                _f: e
            })
        }, L.unix = function (t) {
            return L(1e3 * t)
        }, L.duration = function (t, e) {
            var i, n, a = L.isDuration(t),
                s = "number" == typeof t,
                o = a ? t._input : s ? {} : t,
                l = j.exec(t);
            return s ? e ? o[e] = t : o.milliseconds = t : l && (i = "-" === l[1] ? -1 : 1, o = {
                y: 0,
                d: ~~l[2] * i,
                h: ~~l[3] * i,
                m: ~~l[4] * i,
                s: ~~l[5] * i,
                ms: ~~l[6] * i
            }), n = new r(o), a && t.hasOwnProperty("_lang") && (n._lang = t._lang), n
        }, L.version = P, L.defaultFormat = K, L.updateOffset = function () {}, L.lang = function (t, e) {
            return t ? (e ? f(t, e) : N[t] || p(t), L.duration.fn._lang = L.fn._lang = p(t), void 0) : L.fn._lang._abbr
        }, L.langData = function (t) {
            return t && t._lang && t._lang._abbr && (t = t._lang._abbr), p(t)
        }, L.isMoment = function (t) {
            return t instanceof a
        }, L.isDuration = function (t) {
            return t instanceof r
        }, L.fn = a.prototype = {
            clone: function () {
                return L(this)
            },
            valueOf: function () {
                return +this._d + 6e4 * (this._offset || 0)
            },
            unix: function () {
                return Math.floor(+this / 1e3)
            },
            toString: function () {
                return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
            },
            toDate: function () {
                return this._offset ? new Date(+this) : this._d
            },
            toISOString: function () {
                return v(L(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            },
            toArray: function () {
                var t = this;
                return [t.year(), t.month(), t.date(), t.hours(), t.minutes(), t.seconds(), t.milliseconds()]
            },
            isValid: function () {
                return null == this._isValid && (this._isValid = this._a ? !u(this._a, (this._isUTC ? L.utc(this._a) : L(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
            },
            utc: function () {
                return this.zone(0)
            },
            local: function () {
                return this.zone(0), this._isUTC = !1, this
            },
            format: function (t) {
                var e = v(this, t || L.defaultFormat);
                return this.lang().postformat(e)
            },
            add: function (t, e) {
                var i;
                return i = "string" == typeof t ? L.duration(+e, t) : L.duration(t, e), h(this, i, 1), this
            },
            subtract: function (t, e) {
                var i;
                return i = "string" == typeof t ? L.duration(+e, t) : L.duration(t, e), h(this, i, -1), this
            },
            diff: function (t, e, i) {
                var n, a, r = this._isUTC ? L(t).zone(this._offset || 0) : L(t).local(),
                    s = 6e4 * (this.zone() - r.zone());
                return e = d(e), "year" === e || "month" === e ? (n = 432e5 * (this.daysInMonth() + r.daysInMonth()), a = 12 * (this.year() - r.year()) + (this.month() - r.month()), a += (this - L(this).startOf("month") - (r - L(r).startOf("month"))) / n, a -= 6e4 * (this.zone() - L(this).startOf("month").zone() - (r.zone() - L(r).startOf("month").zone())) / n, "year" === e && (a /= 12)) : (n = this - r, a = "second" === e ? n / 1e3 : "minute" === e ? n / 6e4 : "hour" === e ? n / 36e5 : "day" === e ? (n - s) / 864e5 : "week" === e ? (n - s) / 6048e5 : n), i ? a : o(a)
            },
            from: function (t, e) {
                return L.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!e)
            },
            fromNow: function (t) {
                return this.from(L(), t)
            },
            calendar: function () {
                var t = this.diff(L().startOf("day"), "days", !0),
                    e = -6 > t ? "sameElse" : -1 > t ? "lastWeek" : 0 > t ? "lastDay" : 1 > t ? "sameDay" : 2 > t ? "nextDay" : 7 > t ? "nextWeek" : "sameElse";
                return this.format(this.lang().calendar(e, this))
            },
            isLeapYear: function () {
                var t = this.year();
                return 0 === t % 4 && 0 !== t % 100 || 0 === t % 400
            },
            isDST: function () {
                return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
            },
            day: function (t) {
                var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                return null != t ? "string" == typeof t && (t = this.lang().weekdaysParse(t), "number" != typeof t) ? this : this.add({
                    d: t - e
                }) : e
            },
            month: function (t) {
                var e, i = this._isUTC ? "UTC" : "";
                return null != t ? "string" == typeof t && (t = this.lang().monthsParse(t), "number" != typeof t) ? this : (e = this.date(), this.date(1), this._d["set" + i + "Month"](t), this.date(Math.min(e, this.daysInMonth())), L.updateOffset(this), this) : this._d["get" + i + "Month"]()
            },
            startOf: function (t) {
                switch (t = d(t)) {
                case "year":
                    this.month(0);
                case "month":
                    this.date(1);
                case "week":
                case "day":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
                }
                return "week" === t && this.weekday(0), this
            },
            endOf: function (t) {
                return this.startOf(t).add(t, 1).subtract("ms", 1)
            },
            isAfter: function (t, e) {
                return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) > +L(t).startOf(e)
            },
            isBefore: function (t, e) {
                return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) < +L(t).startOf(e)
            },
            isSame: function (t, e) {
                return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) === +L(t).startOf(e)
            },
            min: function (t) {
                return t = L.apply(null, arguments), this > t ? this : t
            },
            max: function (t) {
                return t = L.apply(null, arguments), t > this ? this : t
            },
            zone: function (t) {
                var e = this._offset || 0;
                return null == t ? this._isUTC ? e : this._d.getTimezoneOffset() : ("string" == typeof t && (t = y(t)), Math.abs(t) < 16 && (t = 60 * t), this._offset = t, this._isUTC = !0, e !== t && h(this, L.duration(e - t, "m"), 1, !0), this)
            },
            zoneAbbr: function () {
                return this._isUTC ? "UTC" : ""
            },
            zoneName: function () {
                return this._isUTC ? "Coordinated Universal Time" : ""
            },
            daysInMonth: function () {
                return L.utc([this.year(), this.month() + 1, 0]).date()
            },
            dayOfYear: function (t) {
                var e = H((L(this).startOf("day") - L(this).startOf("year")) / 864e5) + 1;
                return null == t ? e : this.add("d", t - e)
            },
            weekYear: function (t) {
                var e = F(this, this.lang()._week.dow, this.lang()._week.doy).year;
                return null == t ? e : this.add("y", t - e)
            },
            isoWeekYear: function (t) {
                var e = F(this, 1, 4).year;
                return null == t ? e : this.add("y", t - e)
            },
            week: function (t) {
                var e = this.lang().week(this);
                return null == t ? e : this.add("d", 7 * (t - e))
            },
            isoWeek: function (t) {
                var e = F(this, 1, 4).week;
                return null == t ? e : this.add("d", 7 * (t - e))
            },
            weekday: function (t) {
                var e = (this._d.getDay() + 7 - this.lang()._week.dow) % 7;
                return null == t ? e : this.add("d", t - e)
            },
            isoWeekday: function (t) {
                return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7)
            },
            lang: function (e) {
                return e === t ? this._lang : (this._lang = p(e), this)
            }
        }, R = 0; R < ie.length; R++) A(ie[R].toLowerCase().replace(/s$/, ""), ie[R]);
        A("year", "FullYear"), L.fn.days = L.fn.day, L.fn.months = L.fn.month, L.fn.weeks = L.fn.week, L.fn.isoWeeks = L.fn.isoWeek, L.fn.toJSON = L.fn.toISOString, L.duration.fn = r.prototype = {
            _bubble: function () {
                var t, e, i, n, a = this._milliseconds,
                    r = this._days,
                    s = this._months,
                    l = this._data;
                l.milliseconds = a % 1e3, t = o(a / 1e3), l.seconds = t % 60, e = o(t / 60), l.minutes = e % 60, i = o(e / 60), l.hours = i % 24, r += o(i / 24), l.days = r % 30, s += o(r / 30), l.months = s % 12, n = o(s / 12), l.years = n
            },
            weeks: function () {
                return o(this.days() / 7)
            },
            valueOf: function () {
                return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * ~~(this._months / 12)
            },
            humanize: function (t) {
                var e = +this,
                    i = T(e, !t, this.lang());
                return t && (i = this.lang().pastFuture(e, i)), this.lang().postformat(i)
            },
            add: function (t, e) {
                var i = L.duration(t, e);
                return this._milliseconds += i._milliseconds, this._days += i._days, this._months += i._months, this._bubble(), this
            },
            subtract: function (t, e) {
                var i = L.duration(t, e);
                return this._milliseconds -= i._milliseconds, this._days -= i._days, this._months -= i._months, this._bubble(), this
            },
            get: function (t) {
                return t = d(t), this[t.toLowerCase() + "s"]()
            },
            as: function (t) {
                return t = d(t), this["as" + t.charAt(0).toUpperCase() + t.slice(1) + "s"]()
            },
            lang: L.fn.lang
        };
        for (R in ne) ne.hasOwnProperty(R) && (E(R, ne[R]), I(R.toLowerCase()));
        E("Weeks", 6048e5), L.duration.fn.asMonths = function () {
            return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
        }, L.lang("en", {
            ordinal: function (t) {
                var e = t % 10,
                    i = 1 === ~~(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
                return t + i
            }
        }), z && (module.exports = L), "undefined" == typeof ender && (this.moment = L), "function" == typeof define && define.amd && define("moment", [], function () {
            return L
        })
    }.call(this), $.extend(!0, $.fn.dataTable.defaults, {
        sDom: "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
        sPaginationType: "bootstrap",
        oLanguage: {
            sLengthMenu: "Show _MENU_ Rows",
            sSearch: ""
        }
    }), $.extend($.fn.dataTableExt.oStdClasses, {
        sWrapper: "dataTables_wrapper form-inline"
    }), $.fn.dataTableExt.oApi.fnPagingInfo = function (t) {
        return {
            iStart: t._iDisplayStart,
            iEnd: t.fnDisplayEnd(),
            iLength: t._iDisplayLength,
            iTotal: t.fnRecordsTotal(),
            iFilteredTotal: t.fnRecordsDisplay(),
            iPage: -1 === t._iDisplayLength ? 0 : Math.ceil(t._iDisplayStart / t._iDisplayLength),
            iTotalPages: -1 === t._iDisplayLength ? 0 : Math.ceil(t.fnRecordsDisplay() / t._iDisplayLength)
        }
    }, $.extend($.fn.dataTableExt.oPagination, {
        bootstrap: {
            fnInit: function (t, e, i) {
                var n = t.oLanguage.oPaginate,
                    a = function (e) {
                        e.preventDefault(), t.oApi._fnPageChange(t, e.data.action) && i(t)
                    };
                $(e).append('<ul class="pagination pagination-sm"><li class="prev disabled"><a href="#"><i class="icon-double-angle-left"></i> ' + n.sPrevious + "</a></li>" + '<li class="next disabled"><a href="#">' + n.sNext + ' <i class="icon-double-angle-right"></i></a></li>' + "</ul>");
                var r = $("a", e);
                $(r[0]).bind("click.DT", {
                    action: "previous"
                }, a), $(r[1]).bind("click.DT", {
                    action: "next"
                }, a)
            },
            fnUpdate: function (t, e) {
                var i, n, a, r, s, o, l = 5,
                    h = t.oInstance.fnPagingInfo(),
                    c = t.aanFeatures.p,
                    u = Math.floor(l / 2);
                for (h.iTotalPages < l ? (s = 1, o = h.iTotalPages) : h.iPage <= u ? (s = 1, o = l) : h.iPage >= h.iTotalPages - u ? (s = h.iTotalPages - l + 1, o = h.iTotalPages) : (s = h.iPage - u + 1, o = s + l - 1), i = 0, n = c.length; n > i; i++) {
                    for ($("li:gt(0)", c[i]).filter(":not(:last)").remove(), a = s; o >= a; a++) r = a == h.iPage + 1 ? 'class="active"' : "", $("<li " + r + '><a href="#">' + a + "</a></li>").insertBefore($("li:last", c[i])[0]).bind("click", function (i) {
                        i.preventDefault(), t._iDisplayStart = (parseInt($("a", this).text(), 10) - 1) * h.iLength, e(t)
                    });
                    0 === h.iPage ? $("li:first", c[i]).addClass("disabled") : $("li:first", c[i]).removeClass("disabled"), h.iPage === h.iTotalPages - 1 || 0 === h.iTotalPages ? $("li:last", c[i]).addClass("disabled") : $("li:last", c[i]).removeClass("disabled")
                }
            }
        }
    }), $.fn.DataTable.TableTools && ($.extend(!0, $.fn.DataTable.TableTools.classes, {
        container: "DTTT btn-group",
        buttons: {
            normal: "btn",
            disabled: "disabled"
        },
        collection: {
            container: "DTTT_dropdown dropdown-menu",
            buttons: {
                normal: "",
                disabled: "disabled"
            }
        },
        print: {
            info: "DTTT_print_info modal"
        },
        select: {
            row: "active"
        }
    }), $.extend(!0, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
        collection: {
            container: "ul",
            button: "li",
            liner: "a"
        }
    })),
    /* ========================================================================
     * Bootstrap: modal.js v3.0.0
     * http://twbs.github.com/bootstrap/javascript.html#modals
     * ========================================================================
     * Copyright 2012 Twitter, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * ======================================================================== */
    + function (t) {
        "use strict";
        var e = function (e, i) {
            this.options = i, this.$element = t(e), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote)
        };
        e.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, e.prototype.toggle = function (t) {
            return this[this.isShown ? "hide" : "show"](t)
        }, e.prototype.show = function (e) {
            var i = this,
                n = t.Event("show.bs.modal", {
                    relatedTarget: e
                });
            this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function () {
                var n = t.support.transition && i.$element.hasClass("fade");
                i.$element.parent().length || i.$element.appendTo(document.body), i.$element.show(), n && i.$element[0].offsetWidth, i.$element.addClass("in").attr("aria-hidden", !1), i.enforceFocus();
                var a = t.Event("shown.bs.modal", {
                    relatedTarget: e
                });
                n ? i.$element.find(".modal-dialog").one(t.support.transition.end, function () {
                    i.$element.focus().trigger(a)
                }).emulateTransitionEnd(300) : i.$element.focus().trigger(a)
            }))
        }, e.prototype.hide = function (e) {
            e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one(t.support.transition.end, t.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
        }, e.prototype.enforceFocus = function () {
            t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
                this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.focus()
            }, this))
        }, e.prototype.escape = function () {
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", t.proxy(function (t) {
                27 == t.which && this.hide()
            }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
        }, e.prototype.hideModal = function () {
            var t = this;
            this.$element.hide(), this.backdrop(function () {
                t.removeBackdrop(), t.$element.trigger("hidden.bs.modal")
            })
        }, e.prototype.removeBackdrop = function () {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, e.prototype.backdrop = function (e) {
            var i = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var n = t.support.transition && i;
                if (this.$backdrop = t('<div class="modal-backdrop ' + i + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", t.proxy(function (t) {
                    t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
                n ? this.$backdrop.one(t.support.transition.end, e).emulateTransitionEnd(150) : e()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, e).emulateTransitionEnd(150) : e()) : e && e()
        };
        var i = t.fn.modal;
        t.fn.modal = function (i, n) {
            return this.each(function () {
                var a = t(this),
                    r = a.data("bs.modal"),
                    s = t.extend({}, e.DEFAULTS, a.data(), "object" == typeof i && i);
                r || a.data("bs.modal", r = new e(this, s)), "string" == typeof i ? r[i](n) : s.show && r.show(n)
            })
        }, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function () {
            return t.fn.modal = i, this
        }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (e) {
            var i = t(this),
                n = i.attr("href"),
                a = t(i.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
                r = a.data("modal") ? "toggle" : t.extend({
                    remote: !/#/.test(n) && n
                }, a.data(), i.data());
            e.preventDefault(), a.modal(r, this).one("hide", function () {
                i.is(":visible") && i.focus()
            })
        }), t(document).on("show.bs.modal", ".modal", function () {
            t(document.body).addClass("modal-open")
        }).on("hidden.bs.modal", ".modal", function () {
            t(document.body).removeClass("modal-open")
        })
    }(window.jQuery), // │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
    // │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
    function (t) {
        var e, i, n = "0.3.4",
            a = "hasOwnProperty",
            r = /[\.\/]/,
            s = "*",
            o = function () {},
            l = function (t, e) {
                return t - e
            },
            h = {
                n: {}
            },
            c = function (t, n) {
                var a, r = i,
                    s = Array.prototype.slice.call(arguments, 2),
                    o = c.listeners(t),
                    h = 0,
                    u = [],
                    d = {},
                    f = [],
                    p = e;
                e = t, i = 0;
                for (var g = 0, m = o.length; m > g; g++) "zIndex" in o[g] && (u.push(o[g].zIndex), o[g].zIndex < 0 && (d[o[g].zIndex] = o[g]));
                for (u.sort(l); u[h] < 0;)
                    if (a = d[u[h++]], f.push(a.apply(n, s)), i) return i = r, f;
                for (g = 0; m > g; g++)
                    if (a = o[g], "zIndex" in a)
                        if (a.zIndex == u[h]) {
                            if (f.push(a.apply(n, s)), i) break;
                            do
                                if (h++, a = d[u[h]], a && f.push(a.apply(n, s)), i) break;
                            while (a)
                        } else d[a.zIndex] = a;
                else if (f.push(a.apply(n, s)), i) break;
                return i = r, e = p, f.length ? f : null
            };
        c.listeners = function (t) {
            var e, i, n, a, o, l, c, u, d = t.split(r),
                f = h,
                p = [f],
                g = [];
            for (a = 0, o = d.length; o > a; a++) {
                for (u = [], l = 0, c = p.length; c > l; l++)
                    for (f = p[l].n, i = [f[d[a]], f[s]], n = 2; n--;) e = i[n], e && (u.push(e), g = g.concat(e.f || []));
                p = u
            }
            return g
        }, c.on = function (t, e) {
            for (var i = t.split(r), n = h, a = 0, s = i.length; s > a; a++) n = n.n, !n[i[a]] && (n[i[a]] = {
                n: {}
            }), n = n[i[a]];
            for (n.f = n.f || [], a = 0, s = n.f.length; s > a; a++)
                if (n.f[a] == e) return o;
            return n.f.push(e),
                function (t) {
                    +t == +t && (e.zIndex = +t)
                }
        }, c.stop = function () {
            i = 1
        }, c.nt = function (t) {
            return t ? new RegExp("(?:\\.|\\/|^)" + t + "(?:\\.|\\/|$)").test(e) : e
        }, c.off = c.unbind = function (t, e) {
            var i, n, o, l, c, u, d, f = t.split(r),
                p = [h];
            for (l = 0, c = f.length; c > l; l++)
                for (u = 0; u < p.length; u += o.length - 2) {
                    if (o = [u, 1], i = p[u].n, f[l] != s) i[f[l]] && o.push(i[f[l]]);
                    else
                        for (n in i) i[a](n) && o.push(i[n]);
                    p.splice.apply(p, o)
                }
            for (l = 0, c = p.length; c > l; l++)
                for (i = p[l]; i.n;) {
                    if (e) {
                        if (i.f) {
                            for (u = 0, d = i.f.length; d > u; u++)
                                if (i.f[u] == e) {
                                    i.f.splice(u, 1);
                                    break
                                }!i.f.length && delete i.f
                        }
                        for (n in i.n)
                            if (i.n[a](n) && i.n[n].f) {
                                var g = i.n[n].f;
                                for (u = 0, d = g.length; d > u; u++)
                                    if (g[u] == e) {
                                        g.splice(u, 1);
                                        break
                                    }!g.length && delete i.n[n].f
                            }
                    } else {
                        delete i.f;
                        for (n in i.n) i.n[a](n) && i.n[n].f && delete i.n[n].f
                    }
                    i = i.n
                }
        }, c.once = function (t, e) {
            var i = function () {
                var n = e.apply(this, arguments);
                return c.unbind(t, i), n
            };
            return c.on(t, i)
        }, c.version = n, c.toString = function () {
            return "You are running Eve " + n
        }, "undefined" != typeof module && module.exports ? module.exports = c : "undefined" != typeof define ? define("eve", [], function () {
            return c
        }) : t.eve = c
    }(this),
    function () {
        function t(t) {
            for (var e = 0; e < ri.length; e++) ri[e].el.paper == t && ri.splice(e--, 1)
        }

        function e(t, e, i, a, s, o) {
            i = Q(i);
            var l, h, c, u, d, f, p = t.ms,
                g = {},
                m = {},
                b = {};
            if (a)
                for (w = 0, _ = ri.length; _ > w; w++) {
                    var y = ri[w];
                    if (y.el.id == e.id && y.anim == t) {
                        y.percent != i ? (ri.splice(w, 1), c = 1) : h = y, e.attr(y.totalOrigin);
                        break
                    }
                } else a = +m;
            for (var w = 0, _ = t.percents.length; _ > w; w++) {
                if (t.percents[w] == i || t.percents[w] > a * t.top) {
                    i = t.percents[w], d = t.percents[w - 1] || 0, p = p / t.top * (i - d), u = t.percents[w + 1], l = t.anim[i];
                    break
                }
                a && e.attr(t.anim[t.percents[w]])
            }
            if (l) {
                if (h) h.initstatus = a, h.start = new Date - h.ms * a;
                else {
                    for (var k in l)
                        if (l[C](k) && (ee[C](k) || e.paper.customAttributes[C](k))) switch (g[k] = e.attr(k), null == g[k] && (g[k] = te[k]), m[k] = l[k], ee[k]) {
                        case $:
                            b[k] = (m[k] - g[k]) / p;
                            break;
                        case "colour":
                            g[k] = v.getRGB(g[k]);
                            var S = v.getRGB(m[k]);
                            b[k] = {
                                r: (S.r - g[k].r) / p,
                                g: (S.g - g[k].g) / p,
                                b: (S.b - g[k].b) / p
                            };
                            break;
                        case "path":
                            var D = Re(g[k], m[k]),
                                T = D[1];
                            for (g[k] = D[0], b[k] = [], w = 0, _ = g[k].length; _ > w; w++) {
                                b[k][w] = [0];
                                for (var M = 1, A = g[k][w].length; A > M; M++) b[k][w][M] = (T[w][M] - g[k][w][M]) / p
                            }
                            break;
                        case "transform":
                            var I = e._,
                                R = Be(I[k], m[k]);
                            if (R)
                                for (g[k] = R.from, m[k] = R.to, b[k] = [], b[k].real = !0, w = 0, _ = g[k].length; _ > w; w++)
                                    for (b[k][w] = [g[k][w][0]], M = 1, A = g[k][w].length; A > M; M++) b[k][w][M] = (m[k][w][M] - g[k][w][M]) / p;
                            else {
                                var P = e.matrix || new r,
                                    H = {
                                        _: {
                                            transform: I.transform
                                        },
                                        getBBox: function () {
                                            return e.getBBox(1)
                                        }
                                    };
                                g[k] = [P.a, P.b, P.c, P.d, P.e, P.f], Ne(H, m[k]), m[k] = H._.transform, b[k] = [(H.matrix.a - P.a) / p, (H.matrix.b - P.b) / p, (H.matrix.c - P.c) / p, (H.matrix.d - P.d) / p, (H.matrix.e - P.e) / p, (H.matrix.f - P.f) / p]
                            }
                            break;
                        case "csv":
                            var N = E(l[k])[L](x),
                                z = E(g[k])[L](x);
                            if ("clip-rect" == k)
                                for (g[k] = z, b[k] = [], w = z.length; w--;) b[k][w] = (N[w] - g[k][w]) / p;
                            m[k] = N;
                            break;
                        default:
                            for (N = [][F](l[k]), z = [][F](g[k]), b[k] = [], w = e.paper.customAttributes[k].length; w--;) b[k][w] = ((N[w] || 0) - (z[w] || 0)) / p
                        }
                    var B = l.easing,
                        j = v.easing_formulas[B];
                    if (!j)
                        if (j = E(B).match(G), j && 5 == j.length) {
                            var W = j;
                            j = function (t) {
                                return n(t, +W[1], +W[2], +W[3], +W[4], p)
                            }
                        } else j = ue;
                    if (f = l.start || t.start || +new Date, y = {
                        anim: t,
                        percent: i,
                        timestamp: f,
                        start: f + (t.del || 0),
                        status: 0,
                        initstatus: a || 0,
                        stop: !1,
                        ms: p,
                        easing: j,
                        from: g,
                        diff: b,
                        to: m,
                        el: e,
                        callback: l.callback,
                        prev: d,
                        next: u,
                        repeat: o || t.times,
                        origin: e.attr(),
                        totalOrigin: s
                    }, ri.push(y), a && !h && !c && (y.stop = !0, y.start = new Date - p * a, 1 == ri.length)) return oi();
                    c && (y.start = new Date - y.ms * a), 1 == ri.length && si(oi)
                }
                eve("raphael.anim.start." + e.id, e, t)
            }
        }

        function i(t, e) {
            var i = [],
                n = {};
            if (this.ms = e, this.times = 1, t) {
                for (var a in t) t[C](a) && (n[Q(a)] = t[a], i.push(Q(a)));
                i.sort(he)
            }
            this.anim = n, this.top = i[i.length - 1], this.percents = i
        }

        function n(t, e, i, n, a, r) {
            function s(t, e) {
                var i, n, a, r, s, o;
                for (a = t, o = 0; 8 > o; o++) {
                    if (r = l(a) - t, j(r) < e) return a;
                    if (s = (3 * u * a + 2 * c) * a + h, j(s) < 1e-6) break;
                    a -= r / s
                }
                if (i = 0, n = 1, a = t, i > a) return i;
                if (a > n) return n;
                for (; n > i;) {
                    if (r = l(a), j(r - t) < e) return a;
                    t > r ? i = a : n = a, a = (n - i) / 2 + i
                }
                return a
            }

            function o(t, e) {
                var i = s(t, e);
                return ((p * i + f) * i + d) * i
            }

            function l(t) {
                return ((u * t + c) * t + h) * t
            }
            var h = 3 * e,
                c = 3 * (n - e) - h,
                u = 1 - h - c,
                d = 3 * i,
                f = 3 * (a - i) - d,
                p = 1 - d - f;
            return o(t, 1 / (200 * r))
        }

        function a() {
            return this.x + I + this.y + I + this.width + " × " + this.height
        }

        function r(t, e, i, n, a, r) {
            null != t ? (this.a = +t, this.b = +e, this.c = +i, this.d = +n, this.e = +a, this.f = +r) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
        }

        function s(t, e, i) {
            t = v._path2curve(t), e = v._path2curve(e);
            for (var n, a, r, s, l, h, c, u, d, f, p = i ? 0 : [], g = 0, m = t.length; m > g; g++) {
                var b = t[g];
                if ("M" == b[0]) n = l = b[1], a = h = b[2];
                else {
                    "C" == b[0] ? (d = [n, a].concat(b.slice(1)), n = d[6], a = d[7]) : (d = [n, a, n, a, l, h, l, h], n = l, a = h);
                    for (var y = 0, x = e.length; x > y; y++) {
                        var w = e[y];
                        if ("M" == w[0]) r = c = w[1], s = u = w[2];
                        else {
                            "C" == w[0] ? (f = [r, s].concat(w.slice(1)), r = f[6], s = f[7]) : (f = [r, s, r, s, c, u, c, u], r = c, s = u);
                            var _ = o(d, f, i);
                            if (i) p += _;
                            else {
                                for (var C = 0, k = _.length; k > C; C++) _[C].segment1 = g, _[C].segment2 = y, _[C].bez1 = d, _[C].bez2 = f;
                                p = p.concat(_)
                            }
                        }
                    }
                }
            }
            return p
        }

        function o(t, e, i) {
            var n = v.bezierBBox(t),
                a = v.bezierBBox(e);
            if (!v.isBBoxIntersect(n, a)) return i ? 0 : [];
            for (var r = c.apply(0, t), s = c.apply(0, e), o = ~~(r / 5), h = ~~(s / 5), u = [], d = [], f = {}, p = i ? 0 : [], g = 0; o + 1 > g; g++) {
                var m = v.findDotsAtSegment.apply(v, t.concat(g / o));
                u.push({
                    x: m.x,
                    y: m.y,
                    t: g / o
                })
            }
            for (g = 0; h + 1 > g; g++) m = v.findDotsAtSegment.apply(v, e.concat(g / h)), d.push({
                x: m.x,
                y: m.y,
                t: g / h
            });
            for (g = 0; o > g; g++)
                for (var b = 0; h > b; b++) {
                    var y = u[g],
                        x = u[g + 1],
                        w = d[b],
                        _ = d[b + 1],
                        C = j(x.x - y.x) < .001 ? "y" : "x",
                        k = j(_.x - w.x) < .001 ? "y" : "x",
                        S = l(y.x, y.y, x.x, x.y, w.x, w.y, _.x, _.y);
                    if (S) {
                        if (f[S.x.toFixed(4)] == S.y.toFixed(4)) continue;
                        f[S.x.toFixed(4)] = S.y.toFixed(4);
                        var D = y.t + j((S[C] - y[C]) / (x[C] - y[C])) * (x.t - y.t),
                            T = w.t + j((S[k] - w[k]) / (_[k] - w[k])) * (_.t - w.t);
                        D >= 0 && 1 >= D && T >= 0 && 1 >= T && (i ? p++ : p.push({
                            x: S.x,
                            y: S.y,
                            t1: D,
                            t2: T
                        }))
                    }
                }
            return p
        }

        function l(t, e, i, n, a, r, s, o) {
            if (!(z(t, i) < B(a, s) || B(t, i) > z(a, s) || z(e, n) < B(r, o) || B(e, n) > z(r, o))) {
                var l = (t * n - e * i) * (a - s) - (t - i) * (a * o - r * s),
                    h = (t * n - e * i) * (r - o) - (e - n) * (a * o - r * s),
                    c = (t - i) * (r - o) - (e - n) * (a - s);
                if (!c) return;
                var u = l / c,
                    d = h / c,
                    f = +u.toFixed(2),
                    p = +d.toFixed(2);
                if (f < +B(t, i).toFixed(2) || f > +z(t, i).toFixed(2) || f < +B(a, s).toFixed(2) || f > +z(a, s).toFixed(2) || p < +B(e, n).toFixed(2) || p > +z(e, n).toFixed(2) || p < +B(r, o).toFixed(2) || p > +z(r, o).toFixed(2)) return;
                return {
                    x: u,
                    y: d
                }
            }
        }

        function h(t, e, i, n, a, r, s, o, l) {
            if (!(0 > l || c(t, e, i, n, a, r, s, o) < l)) {
                var h, u = 1,
                    d = u / 2,
                    f = u - d,
                    p = .01;
                for (h = c(t, e, i, n, a, r, s, o, f); j(h - l) > p;) d /= 2, f += (l > h ? 1 : -1) * d, h = c(t, e, i, n, a, r, s, o, f);
                return f
            }
        }

        function c(t, e, i, n, a, r, s, o, l) {
            null == l && (l = 1), l = l > 1 ? 1 : 0 > l ? 0 : l;
            for (var h = l / 2, c = 12, d = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], f = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], p = 0, g = 0; c > g; g++) {
                var m = h * d[g] + h,
                    v = u(m, t, i, a, s),
                    b = u(m, e, n, r, o),
                    y = v * v + b * b;
                p += f[g] * N.sqrt(y)
            }
            return h * p
        }

        function u(t, e, i, n, a) {
            var r = -3 * e + 9 * i - 9 * n + 3 * a,
                s = t * r + 6 * e - 12 * i + 6 * n;
            return t * s - 3 * e + 3 * i
        }

        function d(t, e) {
            for (var i = [], n = 0, a = t.length; a - 2 * !e > n; n += 2) {
                var r = [{
                    x: +t[n - 2],
                    y: +t[n - 1]
                }, {
                    x: +t[n],
                    y: +t[n + 1]
                }, {
                    x: +t[n + 2],
                    y: +t[n + 3]
                }, {
                    x: +t[n + 4],
                    y: +t[n + 5]
                }];
                e ? n ? a - 4 == n ? r[3] = {
                    x: +t[0],
                    y: +t[1]
                } : a - 2 == n && (r[2] = {
                    x: +t[0],
                    y: +t[1]
                }, r[3] = {
                    x: +t[2],
                    y: +t[3]
                }) : r[0] = {
                    x: +t[a - 2],
                    y: +t[a - 1]
                } : a - 4 == n ? r[3] = r[2] : n || (r[0] = {
                    x: +t[n],
                    y: +t[n + 1]
                }), i.push(["C", (-r[0].x + 6 * r[1].x + r[2].x) / 6, (-r[0].y + 6 * r[1].y + r[2].y) / 6, (r[1].x + 6 * r[2].x - r[3].x) / 6, (r[1].y + 6 * r[2].y - r[3].y) / 6, r[2].x, r[2].y])
            }
            return i
        }

        function f() {
            return this.hex
        }

        function p(t, e, i) {
            function n() {
                var a = Array.prototype.slice.call(arguments, 0),
                    r = a.join("␀"),
                    s = n.cache = n.cache || {},
                    o = n.count = n.count || [];
                return s[C](r) ? (g(o, r), i ? i(s[r]) : s[r]) : (o.length >= 1e3 && delete s[o.shift()], o.push(r), s[r] = t[T](e, a), i ? i(s[r]) : s[r])
            }
            return n
        }

        function g(t, e) {
            for (var i = 0, n = t.length; n > i; i++)
                if (t[i] === e) return t.push(t.splice(i, 1)[0])
        }

        function m(t) {
            if (Object(t) !== t) return t;
            var e = new t.constructor;
            for (var i in t) t[C](i) && (e[i] = m(t[i]));
            return e
        }

        function v(t) {
            if (v.is(t, "function")) return b ? t() : eve.on("raphael.DOMload", t);
            if (v.is(t, Y)) return v._engine.create[T](v, t.splice(0, 3 + v.is(t[0], $))).add(t);
            var e = Array.prototype.slice.call(arguments, 0);
            if (v.is(e[e.length - 1], "function")) {
                var i = e.pop();
                return b ? i.call(v._engine.create[T](v, e)) : eve.on("raphael.DOMload", function () {
                    i.call(v._engine.create[T](v, e))
                })
            }
            return v._engine.create[T](v, arguments)
        }
        v.version = "2.1.0", v.eve = eve;
        var b, y, x = /[, ]+/,
            w = {
                circle: 1,
                rect: 1,
                path: 1,
                ellipse: 1,
                text: 1,
                image: 1
            },
            _ = /\{(\d+)\}/g,
            C = "hasOwnProperty",
            k = {
                doc: document,
                win: window
            },
            S = {
                was: Object.prototype[C].call(k.win, "Raphael"),
                is: k.win.Raphael
            },
            D = function () {
                this.ca = this.customAttributes = {}
            },
            T = "apply",
            F = "concat",
            M = "createTouch" in k.doc,
            A = "",
            I = " ",
            E = String,
            L = "split",
            R = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [L](I),
            P = {
                mousedown: "touchstart",
                mousemove: "touchmove",
                mouseup: "touchend"
            },
            H = E.prototype.toLowerCase,
            N = Math,
            z = N.max,
            B = N.min,
            j = N.abs,
            W = N.pow,
            O = N.PI,
            $ = "number",
            q = "string",
            Y = "array",
            U = Object.prototype.toString,
            V = (v._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),
            X = {
                NaN: 1,
                Infinity: 1,
                "-Infinity": 1
            },
            G = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
            J = N.round,
            Q = parseFloat,
            Z = parseInt,
            K = E.prototype.toUpperCase,
            te = v._availableAttrs = {
                "arrow-end": "none",
                "arrow-start": "none",
                blur: 0,
                "clip-rect": "0 0 1e9 1e9",
                cursor: "default",
                cx: 0,
                cy: 0,
                fill: "#fff",
                "fill-opacity": 1,
                font: '10px "Arial"',
                "font-family": '"Arial"',
                "font-size": "10",
                "font-style": "normal",
                "font-weight": 400,
                gradient: 0,
                height: 0,
                href: "http://raphaeljs.com/",
                "letter-spacing": 0,
                opacity: 1,
                path: "M0,0",
                r: 0,
                rx: 0,
                ry: 0,
                src: "",
                stroke: "#000",
                "stroke-dasharray": "",
                "stroke-linecap": "butt",
                "stroke-linejoin": "butt",
                "stroke-miterlimit": 0,
                "stroke-opacity": 1,
                "stroke-width": 1,
                target: "_blank",
                "text-anchor": "middle",
                title: "Raphael",
                transform: "",
                width: 0,
                x: 0,
                y: 0
            },
            ee = v._availableAnimAttrs = {
                blur: $,
                "clip-rect": "csv",
                cx: $,
                cy: $,
                fill: "colour",
                "fill-opacity": $,
                "font-size": $,
                height: $,
                opacity: $,
                path: "path",
                r: $,
                rx: $,
                ry: $,
                stroke: "colour",
                "stroke-opacity": $,
                "stroke-width": $,
                transform: "transform",
                width: $,
                x: $,
                y: $
            },
            ie = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
            ne = {
                hs: 1,
                rg: 1
            },
            ae = /,?([achlmqrstvxz]),?/gi,
            re = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
            se = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
            oe = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
            le = (v._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}),
            he = function (t, e) {
                return Q(t) - Q(e)
            },
            ce = function () {},
            ue = function (t) {
                return t
            },
            de = v._rectPath = function (t, e, i, n, a) {
                return a ? [
                    ["M", t + a, e],
                    ["l", i - 2 * a, 0],
                    ["a", a, a, 0, 0, 1, a, a],
                    ["l", 0, n - 2 * a],
                    ["a", a, a, 0, 0, 1, -a, a],
                    ["l", 2 * a - i, 0],
                    ["a", a, a, 0, 0, 1, -a, -a],
                    ["l", 0, 2 * a - n],
                    ["a", a, a, 0, 0, 1, a, -a],
                    ["z"]
                ] : [
                    ["M", t, e],
                    ["l", i, 0],
                    ["l", 0, n],
                    ["l", -i, 0],
                    ["z"]
                ]
            },
            fe = function (t, e, i, n) {
                return null == n && (n = i), [
                    ["M", t, e],
                    ["m", 0, -n],
                    ["a", i, n, 0, 1, 1, 0, 2 * n],
                    ["a", i, n, 0, 1, 1, 0, -2 * n],
                    ["z"]
                ]
            },
            pe = v._getPath = {
                path: function (t) {
                    return t.attr("path")
                },
                circle: function (t) {
                    var e = t.attrs;
                    return fe(e.cx, e.cy, e.r)
                },
                ellipse: function (t) {
                    var e = t.attrs;
                    return fe(e.cx, e.cy, e.rx, e.ry)
                },
                rect: function (t) {
                    var e = t.attrs;
                    return de(e.x, e.y, e.width, e.height, e.r)
                },
                image: function (t) {
                    var e = t.attrs;
                    return de(e.x, e.y, e.width, e.height)
                },
                text: function (t) {
                    var e = t._getBBox();
                    return de(e.x, e.y, e.width, e.height)
                }
            },
            ge = v.mapPath = function (t, e) {
                if (!e) return t;
                var i, n, a, r, s, o, l;
                for (t = Re(t), a = 0, s = t.length; s > a; a++)
                    for (l = t[a], r = 1, o = l.length; o > r; r += 2) i = e.x(l[r], l[r + 1]), n = e.y(l[r], l[r + 1]), l[r] = i, l[r + 1] = n;
                return t
            };
        if (v._g = k, v.type = k.win.SVGAngle || k.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == v.type) {
            var me, ve = k.doc.createElement("div");
            if (ve.innerHTML = '<v:shape adj="1"/>', me = ve.firstChild, me.style.behavior = "url(#default#VML)", !me || "object" != typeof me.adj) return v.type = A;
            ve = null
        }
        v.svg = !(v.vml = "VML" == v.type), v._Paper = D, v.fn = y = D.prototype = v.prototype, v._id = 0, v._oid = 0, v.is = function (t, e) {
            return e = H.call(e), "finite" == e ? !X[C](+t) : "array" == e ? t instanceof Array : "null" == e && null === t || e == typeof t && null !== t || "object" == e && t === Object(t) || "array" == e && Array.isArray && Array.isArray(t) || U.call(t).slice(8, -1).toLowerCase() == e
        }, v.angle = function (t, e, i, n, a, r) {
            if (null == a) {
                var s = t - i,
                    o = e - n;
                return s || o ? (180 + 180 * N.atan2(-o, -s) / O + 360) % 360 : 0
            }
            return v.angle(t, e, a, r) - v.angle(i, n, a, r)
        }, v.rad = function (t) {
            return t % 360 * O / 180
        }, v.deg = function (t) {
            return 180 * t / O % 360
        }, v.snapTo = function (t, e, i) {
            if (i = v.is(i, "finite") ? i : 10, v.is(t, Y)) {
                for (var n = t.length; n--;)
                    if (j(t[n] - e) <= i) return t[n]
            } else {
                t = +t;
                var a = e % t;
                if (i > a) return e - a;
                if (a > t - i) return e - a + t
            }
            return e
        }, v.createUUID = function (t, e) {
            return function () {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t, e).toUpperCase()
            }
        }(/[xy]/g, function (t) {
            var e = 0 | 16 * N.random(),
                i = "x" == t ? e : 8 | 3 & e;
            return i.toString(16)
        }), v.setWindow = function (t) {
            eve("raphael.setWindow", v, k.win, t), k.win = t, k.doc = k.win.document, v._engine.initWin && v._engine.initWin(k.win)
        };
        var be = function (t) {
                if (v.vml) {
                    var e, i = /^\s+|\s+$/g;
                    try {
                        var n = new ActiveXObject("htmlfile");
                        n.write("<body>"), n.close(), e = n.body
                    } catch (a) {
                        e = createPopup().document.body
                    }
                    var r = e.createTextRange();
                    be = p(function (t) {
                        try {
                            e.style.color = E(t).replace(i, A);
                            var n = r.queryCommandValue("ForeColor");
                            return n = (255 & n) << 16 | 65280 & n | (16711680 & n) >>> 16, "#" + ("000000" + n.toString(16)).slice(-6)
                        } catch (a) {
                            return "none"
                        }
                    })
                } else {
                    var s = k.doc.createElement("i");
                    s.title = "Raphaël Colour Picker", s.style.display = "none", k.doc.body.appendChild(s), be = p(function (t) {
                        return s.style.color = t, k.doc.defaultView.getComputedStyle(s, A).getPropertyValue("color")
                    })
                }
                return be(t)
            },
            ye = function () {
                return "hsb(" + [this.h, this.s, this.b] + ")"
            },
            xe = function () {
                return "hsl(" + [this.h, this.s, this.l] + ")"
            },
            we = function () {
                return this.hex
            },
            _e = function (t, e, i) {
                if (null == e && v.is(t, "object") && "r" in t && "g" in t && "b" in t && (i = t.b, e = t.g, t = t.r), null == e && v.is(t, q)) {
                    var n = v.getRGB(t);
                    t = n.r, e = n.g, i = n.b
                }
                return (t > 1 || e > 1 || i > 1) && (t /= 255, e /= 255, i /= 255), [t, e, i]
            },
            Ce = function (t, e, i, n) {
                t *= 255, e *= 255, i *= 255;
                var a = {
                    r: t,
                    g: e,
                    b: i,
                    hex: v.rgb(t, e, i),
                    toString: we
                };
                return v.is(n, "finite") && (a.opacity = n), a
            };
        v.color = function (t) {
            var e;
            return v.is(t, "object") && "h" in t && "s" in t && "b" in t ? (e = v.hsb2rgb(t), t.r = e.r, t.g = e.g, t.b = e.b, t.hex = e.hex) : v.is(t, "object") && "h" in t && "s" in t && "l" in t ? (e = v.hsl2rgb(t), t.r = e.r, t.g = e.g, t.b = e.b, t.hex = e.hex) : (v.is(t, "string") && (t = v.getRGB(t)), v.is(t, "object") && "r" in t && "g" in t && "b" in t ? (e = v.rgb2hsl(t), t.h = e.h, t.s = e.s, t.l = e.l, e = v.rgb2hsb(t), t.v = e.b) : (t = {
                hex: "none"
            }, t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1)), t.toString = we, t
        }, v.hsb2rgb = function (t, e, i, n) {
            this.is(t, "object") && "h" in t && "s" in t && "b" in t && (i = t.b, e = t.s, t = t.h, n = t.o), t *= 360;
            var a, r, s, o, l;
            return t = t % 360 / 60, l = i * e, o = l * (1 - j(t % 2 - 1)), a = r = s = i - l, t = ~~t, a += [l, o, 0, 0, o, l][t], r += [o, l, l, o, 0, 0][t], s += [0, 0, o, l, l, o][t], Ce(a, r, s, n)
        }, v.hsl2rgb = function (t, e, i, n) {
            this.is(t, "object") && "h" in t && "s" in t && "l" in t && (i = t.l, e = t.s, t = t.h), (t > 1 || e > 1 || i > 1) && (t /= 360, e /= 100, i /= 100), t *= 360;
            var a, r, s, o, l;
            return t = t % 360 / 60, l = 2 * e * (.5 > i ? i : 1 - i), o = l * (1 - j(t % 2 - 1)), a = r = s = i - l / 2, t = ~~t, a += [l, o, 0, 0, o, l][t], r += [o, l, l, o, 0, 0][t], s += [0, 0, o, l, l, o][t], Ce(a, r, s, n)
        }, v.rgb2hsb = function (t, e, i) {
            i = _e(t, e, i), t = i[0], e = i[1], i = i[2];
            var n, a, r, s;
            return r = z(t, e, i), s = r - B(t, e, i), n = 0 == s ? null : r == t ? (e - i) / s : r == e ? (i - t) / s + 2 : (t - e) / s + 4, n = 60 * ((n + 360) % 6) / 360, a = 0 == s ? 0 : s / r, {
                h: n,
                s: a,
                b: r,
                toString: ye
            }
        }, v.rgb2hsl = function (t, e, i) {
            i = _e(t, e, i), t = i[0], e = i[1], i = i[2];
            var n, a, r, s, o, l;
            return s = z(t, e, i), o = B(t, e, i), l = s - o, n = 0 == l ? null : s == t ? (e - i) / l : s == e ? (i - t) / l + 2 : (t - e) / l + 4, n = 60 * ((n + 360) % 6) / 360, r = (s + o) / 2, a = 0 == l ? 0 : .5 > r ? l / (2 * r) : l / (2 - 2 * r), {
                h: n,
                s: a,
                l: r,
                toString: xe
            }
        }, v._path2string = function () {
            return this.join(",").replace(ae, "$1")
        }, v._preload = function (t, e) {
            var i = k.doc.createElement("img");
            i.style.cssText = "position:absolute;left:-9999em;top:-9999em", i.onload = function () {
                e.call(this), this.onload = null, k.doc.body.removeChild(this)
            }, i.onerror = function () {
                k.doc.body.removeChild(this)
            }, k.doc.body.appendChild(i), i.src = t
        }, v.getRGB = p(function (t) {
            if (!t || (t = E(t)).indexOf("-") + 1) return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: f
            };
            if ("none" == t) return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                toString: f
            };
            !ne[C](t.toLowerCase().substring(0, 2)) && "#" != t.charAt() && (t = be(t));
            var e, i, n, a, r, s, o = t.match(V);
            return o ? (o[2] && (n = Z(o[2].substring(5), 16), i = Z(o[2].substring(3, 5), 16), e = Z(o[2].substring(1, 3), 16)), o[3] && (n = Z((r = o[3].charAt(3)) + r, 16), i = Z((r = o[3].charAt(2)) + r, 16), e = Z((r = o[3].charAt(1)) + r, 16)), o[4] && (s = o[4][L](ie), e = Q(s[0]), "%" == s[0].slice(-1) && (e *= 2.55), i = Q(s[1]), "%" == s[1].slice(-1) && (i *= 2.55), n = Q(s[2]), "%" == s[2].slice(-1) && (n *= 2.55), "rgba" == o[1].toLowerCase().slice(0, 4) && (a = Q(s[3])), s[3] && "%" == s[3].slice(-1) && (a /= 100)), o[5] ? (s = o[5][L](ie), e = Q(s[0]), "%" == s[0].slice(-1) && (e *= 2.55), i = Q(s[1]), "%" == s[1].slice(-1) && (i *= 2.55), n = Q(s[2]), "%" == s[2].slice(-1) && (n *= 2.55), ("deg" == s[0].slice(-3) || "°" == s[0].slice(-1)) && (e /= 360), "hsba" == o[1].toLowerCase().slice(0, 4) && (a = Q(s[3])), s[3] && "%" == s[3].slice(-1) && (a /= 100), v.hsb2rgb(e, i, n, a)) : o[6] ? (s = o[6][L](ie), e = Q(s[0]), "%" == s[0].slice(-1) && (e *= 2.55), i = Q(s[1]), "%" == s[1].slice(-1) && (i *= 2.55), n = Q(s[2]), "%" == s[2].slice(-1) && (n *= 2.55), ("deg" == s[0].slice(-3) || "°" == s[0].slice(-1)) && (e /= 360), "hsla" == o[1].toLowerCase().slice(0, 4) && (a = Q(s[3])), s[3] && "%" == s[3].slice(-1) && (a /= 100), v.hsl2rgb(e, i, n, a)) : (o = {
                r: e,
                g: i,
                b: n,
                toString: f
            }, o.hex = "#" + (16777216 | n | i << 8 | e << 16).toString(16).slice(1), v.is(a, "finite") && (o.opacity = a), o)) : {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: f
            }
        }, v), v.hsb = p(function (t, e, i) {
            return v.hsb2rgb(t, e, i).hex
        }), v.hsl = p(function (t, e, i) {
            return v.hsl2rgb(t, e, i).hex
        }), v.rgb = p(function (t, e, i) {
            return "#" + (16777216 | i | e << 8 | t << 16).toString(16).slice(1)
        }), v.getColor = function (t) {
            var e = this.getColor.start = this.getColor.start || {
                    h: 0,
                    s: 1,
                    b: t || .75
                },
                i = this.hsb2rgb(e.h, e.s, e.b);
            return e.h += .075, e.h > 1 && (e.h = 0, e.s -= .2, e.s <= 0 && (this.getColor.start = {
                h: 0,
                s: 1,
                b: e.b
            })), i.hex
        }, v.getColor.reset = function () {
            delete this.start
        }, v.parsePathString = function (t) {
            if (!t) return null;
            var e = ke(t);
            if (e.arr) return De(e.arr);
            var i = {
                    a: 7,
                    c: 6,
                    h: 1,
                    l: 2,
                    m: 2,
                    r: 4,
                    q: 4,
                    s: 4,
                    t: 2,
                    v: 1,
                    z: 0
                },
                n = [];
            return v.is(t, Y) && v.is(t[0], Y) && (n = De(t)), n.length || E(t).replace(re, function (t, e, a) {
                var r = [],
                    s = e.toLowerCase();
                if (a.replace(oe, function (t, e) {
                    e && r.push(+e)
                }), "m" == s && r.length > 2 && (n.push([e][F](r.splice(0, 2))), s = "l", e = "m" == e ? "l" : "L"), "r" == s) n.push([e][F](r));
                else
                    for (; r.length >= i[s] && (n.push([e][F](r.splice(0, i[s]))), i[s]););
            }), n.toString = v._path2string, e.arr = De(n), n
        }, v.parseTransformString = p(function (t) {
            if (!t) return null;
            var e = [];
            return v.is(t, Y) && v.is(t[0], Y) && (e = De(t)), e.length || E(t).replace(se, function (t, i, n) {
                var a = [];
                H.call(i), n.replace(oe, function (t, e) {
                    e && a.push(+e)
                }), e.push([i][F](a))
            }), e.toString = v._path2string, e
        });
        var ke = function (t) {
            var e = ke.ps = ke.ps || {};
            return e[t] ? e[t].sleep = 100 : e[t] = {
                sleep: 100
            }, setTimeout(function () {
                for (var i in e) e[C](i) && i != t && (e[i].sleep--, !e[i].sleep && delete e[i])
            }), e[t]
        };
        v.findDotsAtSegment = function (t, e, i, n, a, r, s, o, l) {
            var h = 1 - l,
                c = W(h, 3),
                u = W(h, 2),
                d = l * l,
                f = d * l,
                p = c * t + 3 * u * l * i + 3 * h * l * l * a + f * s,
                g = c * e + 3 * u * l * n + 3 * h * l * l * r + f * o,
                m = t + 2 * l * (i - t) + d * (a - 2 * i + t),
                v = e + 2 * l * (n - e) + d * (r - 2 * n + e),
                b = i + 2 * l * (a - i) + d * (s - 2 * a + i),
                y = n + 2 * l * (r - n) + d * (o - 2 * r + n),
                x = h * t + l * i,
                w = h * e + l * n,
                _ = h * a + l * s,
                C = h * r + l * o,
                k = 90 - 180 * N.atan2(m - b, v - y) / O;
            return (m > b || y > v) && (k += 180), {
                x: p,
                y: g,
                m: {
                    x: m,
                    y: v
                },
                n: {
                    x: b,
                    y: y
                },
                start: {
                    x: x,
                    y: w
                },
                end: {
                    x: _,
                    y: C
                },
                alpha: k
            }
        }, v.bezierBBox = function (t, e, i, n, a, r, s, o) {
            v.is(t, "array") || (t = [t, e, i, n, a, r, s, o]);
            var l = Le.apply(null, t);
            return {
                x: l.min.x,
                y: l.min.y,
                x2: l.max.x,
                y2: l.max.y,
                width: l.max.x - l.min.x,
                height: l.max.y - l.min.y
            }
        }, v.isPointInsideBBox = function (t, e, i) {
            return e >= t.x && e <= t.x2 && i >= t.y && i <= t.y2
        }, v.isBBoxIntersect = function (t, e) {
            var i = v.isPointInsideBBox;
            return i(e, t.x, t.y) || i(e, t.x2, t.y) || i(e, t.x, t.y2) || i(e, t.x2, t.y2) || i(t, e.x, e.y) || i(t, e.x2, e.y) || i(t, e.x, e.y2) || i(t, e.x2, e.y2) || (t.x < e.x2 && t.x > e.x || e.x < t.x2 && e.x > t.x) && (t.y < e.y2 && t.y > e.y || e.y < t.y2 && e.y > t.y)
        }, v.pathIntersection = function (t, e) {
            return s(t, e)
        }, v.pathIntersectionNumber = function (t, e) {
            return s(t, e, 1)
        }, v.isPointInsidePath = function (t, e, i) {
            var n = v.pathBBox(t);
            return v.isPointInsideBBox(n, e, i) && 1 == s(t, [
                ["M", e, i],
                ["H", n.x2 + 10]
            ], 1) % 2
        }, v._removedFactory = function (t) {
            return function () {
                eve("raphael.log", null, "Raphaël: you are calling to method “" + t + "” of removed object", t)
            }
        };
        var Se = v.pathBBox = function (t) {
                var e = ke(t);
                if (e.bbox) return e.bbox;
                if (!t) return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    x2: 0,
                    y2: 0
                };
                t = Re(t);
                for (var i, n = 0, a = 0, r = [], s = [], o = 0, l = t.length; l > o; o++)
                    if (i = t[o], "M" == i[0]) n = i[1], a = i[2], r.push(n), s.push(a);
                    else {
                        var h = Le(n, a, i[1], i[2], i[3], i[4], i[5], i[6]);
                        r = r[F](h.min.x, h.max.x), s = s[F](h.min.y, h.max.y), n = i[5], a = i[6]
                    }
                var c = B[T](0, r),
                    u = B[T](0, s),
                    d = z[T](0, r),
                    f = z[T](0, s),
                    p = {
                        x: c,
                        y: u,
                        x2: d,
                        y2: f,
                        width: d - c,
                        height: f - u
                    };
                return e.bbox = m(p), p
            },
            De = function (t) {
                var e = m(t);
                return e.toString = v._path2string, e
            },
            Te = v._pathToRelative = function (t) {
                var e = ke(t);
                if (e.rel) return De(e.rel);
                v.is(t, Y) && v.is(t && t[0], Y) || (t = v.parsePathString(t));
                var i = [],
                    n = 0,
                    a = 0,
                    r = 0,
                    s = 0,
                    o = 0;
                "M" == t[0][0] && (n = t[0][1], a = t[0][2], r = n, s = a, o++, i.push(["M", n, a]));
                for (var l = o, h = t.length; h > l; l++) {
                    var c = i[l] = [],
                        u = t[l];
                    if (u[0] != H.call(u[0])) switch (c[0] = H.call(u[0]), c[0]) {
                    case "a":
                        c[1] = u[1], c[2] = u[2], c[3] = u[3], c[4] = u[4], c[5] = u[5], c[6] = +(u[6] - n).toFixed(3), c[7] = +(u[7] - a).toFixed(3);
                        break;
                    case "v":
                        c[1] = +(u[1] - a).toFixed(3);
                        break;
                    case "m":
                        r = u[1], s = u[2];
                    default:
                        for (var d = 1, f = u.length; f > d; d++) c[d] = +(u[d] - (d % 2 ? n : a)).toFixed(3)
                    } else {
                        c = i[l] = [], "m" == u[0] && (r = u[1] + n, s = u[2] + a);
                        for (var p = 0, g = u.length; g > p; p++) i[l][p] = u[p]
                    }
                    var m = i[l].length;
                    switch (i[l][0]) {
                    case "z":
                        n = r, a = s;
                        break;
                    case "h":
                        n += +i[l][m - 1];
                        break;
                    case "v":
                        a += +i[l][m - 1];
                        break;
                    default:
                        n += +i[l][m - 2], a += +i[l][m - 1]
                    }
                }
                return i.toString = v._path2string, e.rel = De(i), i
            },
            Fe = v._pathToAbsolute = function (t) {
                var e = ke(t);
                if (e.abs) return De(e.abs);
                if (v.is(t, Y) && v.is(t && t[0], Y) || (t = v.parsePathString(t)), !t || !t.length) return [
                    ["M", 0, 0]
                ];
                var i = [],
                    n = 0,
                    a = 0,
                    r = 0,
                    s = 0,
                    o = 0;
                "M" == t[0][0] && (n = +t[0][1], a = +t[0][2], r = n, s = a, o++, i[0] = ["M", n, a]);
                for (var l, h, c = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), u = o, f = t.length; f > u; u++) {
                    if (i.push(l = []), h = t[u], h[0] != K.call(h[0])) switch (l[0] = K.call(h[0]), l[0]) {
                        case "A":
                            l[1] = h[1], l[2] = h[2], l[3] = h[3], l[4] = h[4], l[5] = h[5], l[6] = +(h[6] + n), l[7] = +(h[7] + a);
                            break;
                        case "V":
                            l[1] = +h[1] + a;
                            break;
                        case "H":
                            l[1] = +h[1] + n;
                            break;
                        case "R":
                            for (var p = [n, a][F](h.slice(1)), g = 2, m = p.length; m > g; g++) p[g] = +p[g] + n, p[++g] = +p[g] + a;
                            i.pop(), i = i[F](d(p, c));
                            break;
                        case "M":
                            r = +h[1] + n, s = +h[2] + a;
                        default:
                            for (g = 1, m = h.length; m > g; g++) l[g] = +h[g] + (g % 2 ? n : a)
                        } else if ("R" == h[0]) p = [n, a][F](h.slice(1)), i.pop(), i = i[F](d(p, c)), l = ["R"][F](h.slice(-2));
                        else
                            for (var b = 0, y = h.length; y > b; b++) l[b] = h[b];
                    switch (l[0]) {
                    case "Z":
                        n = r, a = s;
                        break;
                    case "H":
                        n = l[1];
                        break;
                    case "V":
                        a = l[1];
                        break;
                    case "M":
                        r = l[l.length - 2], s = l[l.length - 1];
                    default:
                        n = l[l.length - 2], a = l[l.length - 1]
                    }
                }
                return i.toString = v._path2string, e.abs = De(i), i
            },
            Me = function (t, e, i, n) {
                return [t, e, i, n, i, n]
            },
            Ae = function (t, e, i, n, a, r) {
                var s = 1 / 3,
                    o = 2 / 3;
                return [s * t + o * i, s * e + o * n, s * a + o * i, s * r + o * n, a, r]
            },
            Ie = function (t, e, i, n, a, r, s, o, l, h) {
                var c, u = 120 * O / 180,
                    d = O / 180 * (+a || 0),
                    f = [],
                    g = p(function (t, e, i) {
                        var n = t * N.cos(i) - e * N.sin(i),
                            a = t * N.sin(i) + e * N.cos(i);
                        return {
                            x: n,
                            y: a
                        }
                    });
                if (h) k = h[0], S = h[1], _ = h[2], C = h[3];
                else {
                    c = g(t, e, -d), t = c.x, e = c.y, c = g(o, l, -d), o = c.x, l = c.y;
                    var m = (N.cos(O / 180 * a), N.sin(O / 180 * a), (t - o) / 2),
                        v = (e - l) / 2,
                        b = m * m / (i * i) + v * v / (n * n);
                    b > 1 && (b = N.sqrt(b), i = b * i, n = b * n);
                    var y = i * i,
                        x = n * n,
                        w = (r == s ? -1 : 1) * N.sqrt(j((y * x - y * v * v - x * m * m) / (y * v * v + x * m * m))),
                        _ = w * i * v / n + (t + o) / 2,
                        C = w * -n * m / i + (e + l) / 2,
                        k = N.asin(((e - C) / n).toFixed(9)),
                        S = N.asin(((l - C) / n).toFixed(9));
                    k = _ > t ? O - k : k, S = _ > o ? O - S : S, 0 > k && (k = 2 * O + k), 0 > S && (S = 2 * O + S), s && k > S && (k -= 2 * O), !s && S > k && (S -= 2 * O)
                }
                var D = S - k;
                if (j(D) > u) {
                    var T = S,
                        M = o,
                        A = l;
                    S = k + u * (s && S > k ? 1 : -1), o = _ + i * N.cos(S), l = C + n * N.sin(S), f = Ie(o, l, i, n, a, 0, s, M, A, [S, T, _, C])
                }
                D = S - k;
                var I = N.cos(k),
                    E = N.sin(k),
                    R = N.cos(S),
                    P = N.sin(S),
                    H = N.tan(D / 4),
                    z = 4 / 3 * i * H,
                    B = 4 / 3 * n * H,
                    W = [t, e],
                    $ = [t + z * E, e - B * I],
                    q = [o + z * P, l - B * R],
                    Y = [o, l];
                if ($[0] = 2 * W[0] - $[0], $[1] = 2 * W[1] - $[1], h) return [$, q, Y][F](f);
                f = [$, q, Y][F](f).join()[L](",");
                for (var U = [], V = 0, X = f.length; X > V; V++) U[V] = V % 2 ? g(f[V - 1], f[V], d).y : g(f[V], f[V + 1], d).x;
                return U
            },
            Ee = function (t, e, i, n, a, r, s, o, l) {
                var h = 1 - l;
                return {
                    x: W(h, 3) * t + 3 * W(h, 2) * l * i + 3 * h * l * l * a + W(l, 3) * s,
                    y: W(h, 3) * e + 3 * W(h, 2) * l * n + 3 * h * l * l * r + W(l, 3) * o
                }
            },
            Le = p(function (t, e, i, n, a, r, s, o) {
                var l, h = a - 2 * i + t - (s - 2 * a + i),
                    c = 2 * (i - t) - 2 * (a - i),
                    u = t - i,
                    d = (-c + N.sqrt(c * c - 4 * h * u)) / 2 / h,
                    f = (-c - N.sqrt(c * c - 4 * h * u)) / 2 / h,
                    p = [e, o],
                    g = [t, s];
                return j(d) > "1e12" && (d = .5), j(f) > "1e12" && (f = .5), d > 0 && 1 > d && (l = Ee(t, e, i, n, a, r, s, o, d), g.push(l.x), p.push(l.y)), f > 0 && 1 > f && (l = Ee(t, e, i, n, a, r, s, o, f), g.push(l.x), p.push(l.y)), h = r - 2 * n + e - (o - 2 * r + n), c = 2 * (n - e) - 2 * (r - n), u = e - n, d = (-c + N.sqrt(c * c - 4 * h * u)) / 2 / h, f = (-c - N.sqrt(c * c - 4 * h * u)) / 2 / h, j(d) > "1e12" && (d = .5), j(f) > "1e12" && (f = .5), d > 0 && 1 > d && (l = Ee(t, e, i, n, a, r, s, o, d), g.push(l.x), p.push(l.y)), f > 0 && 1 > f && (l = Ee(t, e, i, n, a, r, s, o, f), g.push(l.x), p.push(l.y)), {
                    min: {
                        x: B[T](0, g),
                        y: B[T](0, p)
                    },
                    max: {
                        x: z[T](0, g),
                        y: z[T](0, p)
                    }
                }
            }),
            Re = v._path2curve = p(function (t, e) {
                var i = !e && ke(t);
                if (!e && i.curve) return De(i.curve);
                for (var n = Fe(t), a = e && Fe(e), r = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                }, s = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                }, o = (function (t, e) {
                    var i, n;
                    if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y];
                    switch (!(t[0] in {
                        T: 1,
                        Q: 1
                    }) && (e.qx = e.qy = null), t[0]) {
                    case "M":
                        e.X = t[1], e.Y = t[2];
                        break;
                    case "A":
                        t = ["C"][F](Ie[T](0, [e.x, e.y][F](t.slice(1))));
                        break;
                    case "S":
                        i = e.x + (e.x - (e.bx || e.x)), n = e.y + (e.y - (e.by || e.y)), t = ["C", i, n][F](t.slice(1));
                        break;
                    case "T":
                        e.qx = e.x + (e.x - (e.qx || e.x)), e.qy = e.y + (e.y - (e.qy || e.y)), t = ["C"][F](Ae(e.x, e.y, e.qx, e.qy, t[1], t[2]));
                        break;
                    case "Q":
                        e.qx = t[1], e.qy = t[2], t = ["C"][F](Ae(e.x, e.y, t[1], t[2], t[3], t[4]));
                        break;
                    case "L":
                        t = ["C"][F](Me(e.x, e.y, t[1], t[2]));
                        break;
                    case "H":
                        t = ["C"][F](Me(e.x, e.y, t[1], e.y));
                        break;
                    case "V":
                        t = ["C"][F](Me(e.x, e.y, e.x, t[1]));
                        break;
                    case "Z":
                        t = ["C"][F](Me(e.x, e.y, e.X, e.Y))
                    }
                    return t
                }), l = function (t, e) {
                    if (t[e].length > 7) {
                        t[e].shift();
                        for (var i = t[e]; i.length;) t.splice(e++, 0, ["C"][F](i.splice(0, 6)));
                        t.splice(e, 1), u = z(n.length, a && a.length || 0)
                    }
                }, h = function (t, e, i, r, s) {
                    t && e && "M" == t[s][0] && "M" != e[s][0] && (e.splice(s, 0, ["M", r.x, r.y]), i.bx = 0, i.by = 0, i.x = t[s][1], i.y = t[s][2], u = z(n.length, a && a.length || 0))
                }, c = 0, u = z(n.length, a && a.length || 0); u > c; c++) {
                    n[c] = o(n[c], r), l(n, c), a && (a[c] = o(a[c], s)), a && l(a, c), h(n, a, r, s, c), h(a, n, s, r, c);
                    var d = n[c],
                        f = a && a[c],
                        p = d.length,
                        g = a && f.length;
                    r.x = d[p - 2], r.y = d[p - 1], r.bx = Q(d[p - 4]) || r.x, r.by = Q(d[p - 3]) || r.y, s.bx = a && (Q(f[g - 4]) || s.x), s.by = a && (Q(f[g - 3]) || s.y), s.x = a && f[g - 2], s.y = a && f[g - 1]
                }
                return a || (i.curve = De(n)), a ? [n, a] : n
            }, null, De),
            Pe = (v._parseDots = p(function (t) {
                for (var e = [], i = 0, n = t.length; n > i; i++) {
                    var a = {},
                        r = t[i].match(/^([^:]*):?([\d\.]*)/);
                    if (a.color = v.getRGB(r[1]), a.color.error) return null;
                    a.color = a.color.hex, r[2] && (a.offset = r[2] + "%"), e.push(a)
                }
                for (i = 1, n = e.length - 1; n > i; i++)
                    if (!e[i].offset) {
                        for (var s = Q(e[i - 1].offset || 0), o = 0, l = i + 1; n > l; l++)
                            if (e[l].offset) {
                                o = e[l].offset;
                                break
                            }
                        o || (o = 100, l = n), o = Q(o);
                        for (var h = (o - s) / (l - i + 1); l > i; i++) s += h, e[i].offset = s + "%"
                    }
                return e
            }), v._tear = function (t, e) {
                t == e.top && (e.top = t.prev), t == e.bottom && (e.bottom = t.next), t.next && (t.next.prev = t.prev), t.prev && (t.prev.next = t.next)
            }),
            He = (v._tofront = function (t, e) {
                e.top !== t && (Pe(t, e), t.next = null, t.prev = e.top, e.top.next = t, e.top = t)
            }, v._toback = function (t, e) {
                e.bottom !== t && (Pe(t, e), t.next = e.bottom, t.prev = null, e.bottom.prev = t, e.bottom = t)
            }, v._insertafter = function (t, e, i) {
                Pe(t, i), e == i.top && (i.top = t), e.next && (e.next.prev = t), t.next = e.next, t.prev = e, e.next = t
            }, v._insertbefore = function (t, e, i) {
                Pe(t, i), e == i.bottom && (i.bottom = t), e.prev && (e.prev.next = t), t.prev = e.prev, e.prev = t, t.next = e
            }, v.toMatrix = function (t, e) {
                var i = Se(t),
                    n = {
                        _: {
                            transform: A
                        },
                        getBBox: function () {
                            return i
                        }
                    };
                return Ne(n, e), n.matrix
            }),
            Ne = (v.transformPath = function (t, e) {
                return ge(t, He(t, e))
            }, v._extractTransform = function (t, e) {
                if (null == e) return t._.transform;
                e = E(e).replace(/\.{3}|\u2026/g, t._.transform || A);
                var i = v.parseTransformString(e),
                    n = 0,
                    a = 0,
                    s = 0,
                    o = 1,
                    l = 1,
                    h = t._,
                    c = new r;
                if (h.transform = i || [], i)
                    for (var u = 0, d = i.length; d > u; u++) {
                        var f, p, g, m, b, y = i[u],
                            x = y.length,
                            w = E(y[0]).toLowerCase(),
                            _ = y[0] != w,
                            C = _ ? c.invert() : 0;
                        "t" == w && 3 == x ? _ ? (f = C.x(0, 0), p = C.y(0, 0), g = C.x(y[1], y[2]), m = C.y(y[1], y[2]), c.translate(g - f, m - p)) : c.translate(y[1], y[2]) : "r" == w ? 2 == x ? (b = b || t.getBBox(1), c.rotate(y[1], b.x + b.width / 2, b.y + b.height / 2), n += y[1]) : 4 == x && (_ ? (g = C.x(y[2], y[3]), m = C.y(y[2], y[3]), c.rotate(y[1], g, m)) : c.rotate(y[1], y[2], y[3]), n += y[1]) : "s" == w ? 2 == x || 3 == x ? (b = b || t.getBBox(1), c.scale(y[1], y[x - 1], b.x + b.width / 2, b.y + b.height / 2), o *= y[1], l *= y[x - 1]) : 5 == x && (_ ? (g = C.x(y[3], y[4]), m = C.y(y[3], y[4]), c.scale(y[1], y[2], g, m)) : c.scale(y[1], y[2], y[3], y[4]), o *= y[1], l *= y[2]) : "m" == w && 7 == x && c.add(y[1], y[2], y[3], y[4], y[5], y[6]), h.dirtyT = 1, t.matrix = c
                    }
                t.matrix = c, h.sx = o, h.sy = l, h.deg = n, h.dx = a = c.e, h.dy = s = c.f, 1 == o && 1 == l && !n && h.bbox ? (h.bbox.x += +a, h.bbox.y += +s) : h.dirtyT = 1
            }),
            ze = function (t) {
                var e = t[0];
                switch (e.toLowerCase()) {
                case "t":
                    return [e, 0, 0];
                case "m":
                    return [e, 1, 0, 0, 1, 0, 0];
                case "r":
                    return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0];
                case "s":
                    return 5 == t.length ? [e, 1, 1, t[3], t[4]] : 3 == t.length ? [e, 1, 1] : [e, 1]
                }
            },
            Be = v._equaliseTransform = function (t, e) {
                e = E(e).replace(/\.{3}|\u2026/g, t), t = v.parseTransformString(t) || [], e = v.parseTransformString(e) || [];
                for (var i, n, a, r, s = z(t.length, e.length), o = [], l = [], h = 0; s > h; h++) {
                    if (a = t[h] || ze(e[h]), r = e[h] || ze(a), a[0] != r[0] || "r" == a[0].toLowerCase() && (a[2] != r[2] || a[3] != r[3]) || "s" == a[0].toLowerCase() && (a[3] != r[3] || a[4] != r[4])) return;
                    for (o[h] = [], l[h] = [], i = 0, n = z(a.length, r.length); n > i; i++) i in a && (o[h][i] = a[i]), i in r && (l[h][i] = r[i])
                }
                return {
                    from: o,
                    to: l
                }
            };
        v._getContainer = function (t, e, i, n) {
                var a;
                return a = null != n || v.is(t, "object") ? t : k.doc.getElementById(t), null != a ? a.tagName ? null == e ? {
                    container: a,
                    width: a.style.pixelWidth || a.offsetWidth,
                    height: a.style.pixelHeight || a.offsetHeight
                } : {
                    container: a,
                    width: e,
                    height: i
                } : {
                    container: 1,
                    x: t,
                    y: e,
                    width: i,
                    height: n
                } : void 0
            }, v.pathToRelative = Te, v._engine = {}, v.path2curve = Re, v.matrix = function (t, e, i, n, a, s) {
                return new r(t, e, i, n, a, s)
            },
            function (t) {
                function e(t) {
                    var e = N.sqrt(i(t));
                    t[0] && (t[0] /= e), t[1] && (t[1] /= e)
                }

                function i(t) {
                    return t[0] * t[0] + t[1] * t[1]
                }
                t.add = function (t, e, i, n, a, s) {
                    var o, l, h, c, u = [
                            [],
                            [],
                            []
                        ],
                        d = [
                            [this.a, this.c, this.e],
                            [this.b, this.d, this.f],
                            [0, 0, 1]
                        ],
                        f = [
                            [t, i, a],
                            [e, n, s],
                            [0, 0, 1]
                        ];
                    for (t && t instanceof r && (f = [
                        [t.a, t.c, t.e],
                        [t.b, t.d, t.f],
                        [0, 0, 1]
                    ]), o = 0; 3 > o; o++)
                        for (l = 0; 3 > l; l++) {
                            for (c = 0, h = 0; 3 > h; h++) c += d[o][h] * f[h][l];
                            u[o][l] = c
                        }
                    this.a = u[0][0], this.b = u[1][0], this.c = u[0][1], this.d = u[1][1], this.e = u[0][2], this.f = u[1][2]
                }, t.invert = function () {
                    var t = this,
                        e = t.a * t.d - t.b * t.c;
                    return new r(t.d / e, -t.b / e, -t.c / e, t.a / e, (t.c * t.f - t.d * t.e) / e, (t.b * t.e - t.a * t.f) / e)
                }, t.clone = function () {
                    return new r(this.a, this.b, this.c, this.d, this.e, this.f)
                }, t.translate = function (t, e) {
                    this.add(1, 0, 0, 1, t, e)
                }, t.scale = function (t, e, i, n) {
                    null == e && (e = t), (i || n) && this.add(1, 0, 0, 1, i, n), this.add(t, 0, 0, e, 0, 0), (i || n) && this.add(1, 0, 0, 1, -i, -n)
                }, t.rotate = function (t, e, i) {
                    t = v.rad(t), e = e || 0, i = i || 0;
                    var n = +N.cos(t).toFixed(9),
                        a = +N.sin(t).toFixed(9);
                    this.add(n, a, -a, n, e, i), this.add(1, 0, 0, 1, -e, -i)
                }, t.x = function (t, e) {
                    return t * this.a + e * this.c + this.e
                }, t.y = function (t, e) {
                    return t * this.b + e * this.d + this.f
                }, t.get = function (t) {
                    return +this[E.fromCharCode(97 + t)].toFixed(4)
                }, t.toString = function () {
                    return v.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
                }, t.toFilter = function () {
                    return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
                }, t.offset = function () {
                    return [this.e.toFixed(4), this.f.toFixed(4)]
                }, t.split = function () {
                    var t = {};
                    t.dx = this.e, t.dy = this.f;
                    var n = [
                        [this.a, this.c],
                        [this.b, this.d]
                    ];
                    t.scalex = N.sqrt(i(n[0])), e(n[0]), t.shear = n[0][0] * n[1][0] + n[0][1] * n[1][1], n[1] = [n[1][0] - n[0][0] * t.shear, n[1][1] - n[0][1] * t.shear], t.scaley = N.sqrt(i(n[1])), e(n[1]), t.shear /= t.scaley;
                    var a = -n[0][1],
                        r = n[1][1];
                    return 0 > r ? (t.rotate = v.deg(N.acos(r)), 0 > a && (t.rotate = 360 - t.rotate)) : t.rotate = v.deg(N.asin(a)), t.isSimple = !(+t.shear.toFixed(9) || t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate), t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate, t.noRotation = !+t.shear.toFixed(9) && !t.rotate, t
                }, t.toTransformString = function (t) {
                    var e = t || this[L]();
                    return e.isSimple ? (e.scalex = +e.scalex.toFixed(4), e.scaley = +e.scaley.toFixed(4), e.rotate = +e.rotate.toFixed(4), (e.dx || e.dy ? "t" + [e.dx, e.dy] : A) + (1 != e.scalex || 1 != e.scaley ? "s" + [e.scalex, e.scaley, 0, 0] : A) + (e.rotate ? "r" + [e.rotate, 0, 0] : A)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
                }
            }(r.prototype);
        var je = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
        y.safari = "Apple Computer, Inc." == navigator.vendor && (je && je[1] < 4 || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && je && je[1] < 8 ? function () {
            var t = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
                stroke: "none"
            });
            setTimeout(function () {
                t.remove()
            })
        } : ce;
        for (var We = function () {
            this.returnValue = !1
        }, Oe = function () {
            return this.originalEvent.preventDefault()
        }, $e = function () {
            this.cancelBubble = !0
        }, qe = function () {
            return this.originalEvent.stopPropagation()
        }, Ye = function () {
            return k.doc.addEventListener ? function (t, e, i, n) {
                var a = M && P[e] ? P[e] : e,
                    r = function (a) {
                        var r = k.doc.documentElement.scrollTop || k.doc.body.scrollTop,
                            s = k.doc.documentElement.scrollLeft || k.doc.body.scrollLeft,
                            o = a.clientX + s,
                            l = a.clientY + r;
                        if (M && P[C](e))
                            for (var h = 0, c = a.targetTouches && a.targetTouches.length; c > h; h++)
                                if (a.targetTouches[h].target == t) {
                                    var u = a;
                                    a = a.targetTouches[h], a.originalEvent = u, a.preventDefault = Oe, a.stopPropagation = qe;
                                    break
                                }
                        return i.call(n, a, o, l)
                    };
                return t.addEventListener(a, r, !1),
                    function () {
                        return t.removeEventListener(a, r, !1), !0
                    }
            } : k.doc.attachEvent ? function (t, e, i, n) {
                var a = function (t) {
                    t = t || k.win.event;
                    var e = k.doc.documentElement.scrollTop || k.doc.body.scrollTop,
                        a = k.doc.documentElement.scrollLeft || k.doc.body.scrollLeft,
                        r = t.clientX + a,
                        s = t.clientY + e;
                    return t.preventDefault = t.preventDefault || We, t.stopPropagation = t.stopPropagation || $e, i.call(n, t, r, s)
                };
                t.attachEvent("on" + e, a);
                var r = function () {
                    return t.detachEvent("on" + e, a), !0
                };
                return r
            } : void 0
        }(), Ue = [], Ve = function (t) {
            for (var e, i = t.clientX, n = t.clientY, a = k.doc.documentElement.scrollTop || k.doc.body.scrollTop, r = k.doc.documentElement.scrollLeft || k.doc.body.scrollLeft, s = Ue.length; s--;) {
                if (e = Ue[s], M) {
                    for (var o, l = t.touches.length; l--;)
                        if (o = t.touches[l], o.identifier == e.el._drag.id) {
                            i = o.clientX, n = o.clientY, (t.originalEvent ? t.originalEvent : t).preventDefault();
                            break
                        }
                } else t.preventDefault();
                var h, c = e.el.node,
                    u = c.nextSibling,
                    d = c.parentNode,
                    f = c.style.display;
                k.win.opera && d.removeChild(c), c.style.display = "none", h = e.el.paper.getElementByPoint(i, n), c.style.display = f, k.win.opera && (u ? d.insertBefore(c, u) : d.appendChild(c)), h && eve("raphael.drag.over." + e.el.id, e.el, h), i += r, n += a, eve("raphael.drag.move." + e.el.id, e.move_scope || e.el, i - e.el._drag.x, n - e.el._drag.y, i, n, t)
            }
        }, Xe = function (t) {
            v.unmousemove(Ve).unmouseup(Xe);
            for (var e, i = Ue.length; i--;) e = Ue[i], e.el._drag = {}, eve("raphael.drag.end." + e.el.id, e.end_scope || e.start_scope || e.move_scope || e.el, t);
            Ue = []
        }, Ge = v.el = {}, Je = R.length; Je--;)! function (t) {
            v[t] = Ge[t] = function (e, i) {
                return v.is(e, "function") && (this.events = this.events || [], this.events.push({
                    name: t,
                    f: e,
                    unbind: Ye(this.shape || this.node || k.doc, t, e, i || this)
                })), this
            }, v["un" + t] = Ge["un" + t] = function (e) {
                for (var i = this.events || [], n = i.length; n--;)
                    if (i[n].name == t && i[n].f == e) return i[n].unbind(), i.splice(n, 1), !i.length && delete this.events, this;
                return this
            }
        }(R[Je]);
        Ge.data = function (t, e) {
            var i = le[this.id] = le[this.id] || {};
            if (1 == arguments.length) {
                if (v.is(t, "object")) {
                    for (var n in t) t[C](n) && this.data(n, t[n]);
                    return this
                }
                return eve("raphael.data.get." + this.id, this, i[t], t), i[t]
            }
            return i[t] = e, eve("raphael.data.set." + this.id, this, e, t), this
        }, Ge.removeData = function (t) {
            return null == t ? le[this.id] = {} : le[this.id] && delete le[this.id][t], this
        }, Ge.hover = function (t, e, i, n) {
            return this.mouseover(t, i).mouseout(e, n || i)
        }, Ge.unhover = function (t, e) {
            return this.unmouseover(t).unmouseout(e)
        };
        var Qe = [];
        Ge.drag = function (t, e, i, n, a, r) {
            function s(s) {
                (s.originalEvent || s).preventDefault();
                var o = k.doc.documentElement.scrollTop || k.doc.body.scrollTop,
                    l = k.doc.documentElement.scrollLeft || k.doc.body.scrollLeft;
                this._drag.x = s.clientX + l, this._drag.y = s.clientY + o, this._drag.id = s.identifier, !Ue.length && v.mousemove(Ve).mouseup(Xe), Ue.push({
                    el: this,
                    move_scope: n,
                    start_scope: a,
                    end_scope: r
                }), e && eve.on("raphael.drag.start." + this.id, e), t && eve.on("raphael.drag.move." + this.id, t), i && eve.on("raphael.drag.end." + this.id, i), eve("raphael.drag.start." + this.id, a || n || this, s.clientX + l, s.clientY + o, s)
            }
            return this._drag = {}, Qe.push({
                el: this,
                start: s
            }), this.mousedown(s), this
        }, Ge.onDragOver = function (t) {
            t ? eve.on("raphael.drag.over." + this.id, t) : eve.unbind("raphael.drag.over." + this.id)
        }, Ge.undrag = function () {
            for (var t = Qe.length; t--;) Qe[t].el == this && (this.unmousedown(Qe[t].start), Qe.splice(t, 1), eve.unbind("raphael.drag.*." + this.id));
            !Qe.length && v.unmousemove(Ve).unmouseup(Xe)
        }, y.circle = function (t, e, i) {
            var n = v._engine.circle(this, t || 0, e || 0, i || 0);
            return this.__set__ && this.__set__.push(n), n
        }, y.rect = function (t, e, i, n, a) {
            var r = v._engine.rect(this, t || 0, e || 0, i || 0, n || 0, a || 0);
            return this.__set__ && this.__set__.push(r), r
        }, y.ellipse = function (t, e, i, n) {
            var a = v._engine.ellipse(this, t || 0, e || 0, i || 0, n || 0);
            return this.__set__ && this.__set__.push(a), a
        }, y.path = function (t) {
            t && !v.is(t, q) && !v.is(t[0], Y) && (t += A);
            var e = v._engine.path(v.format[T](v, arguments), this);
            return this.__set__ && this.__set__.push(e), e
        }, y.image = function (t, e, i, n, a) {
            var r = v._engine.image(this, t || "about:blank", e || 0, i || 0, n || 0, a || 0);
            return this.__set__ && this.__set__.push(r), r
        }, y.text = function (t, e, i) {
            var n = v._engine.text(this, t || 0, e || 0, E(i));
            return this.__set__ && this.__set__.push(n), n
        }, y.set = function (t) {
            !v.is(t, "array") && (t = Array.prototype.splice.call(arguments, 0, arguments.length));
            var e = new hi(t);
            return this.__set__ && this.__set__.push(e), e
        }, y.setStart = function (t) {
            this.__set__ = t || this.set()
        }, y.setFinish = function () {
            var t = this.__set__;
            return delete this.__set__, t
        }, y.setSize = function (t, e) {
            return v._engine.setSize.call(this, t, e)
        }, y.setViewBox = function (t, e, i, n, a) {
            return v._engine.setViewBox.call(this, t, e, i, n, a)
        }, y.top = y.bottom = null, y.raphael = v;
        var Ze = function (t) {
            var e = t.getBoundingClientRect(),
                i = t.ownerDocument,
                n = i.body,
                a = i.documentElement,
                r = a.clientTop || n.clientTop || 0,
                s = a.clientLeft || n.clientLeft || 0,
                o = e.top + (k.win.pageYOffset || a.scrollTop || n.scrollTop) - r,
                l = e.left + (k.win.pageXOffset || a.scrollLeft || n.scrollLeft) - s;
            return {
                y: o,
                x: l
            }
        };
        y.getElementByPoint = function (t, e) {
            var i = this,
                n = i.canvas,
                a = k.doc.elementFromPoint(t, e);
            if (k.win.opera && "svg" == a.tagName) {
                var r = Ze(n),
                    s = n.createSVGRect();
                s.x = t - r.x, s.y = e - r.y, s.width = s.height = 1;
                var o = n.getIntersectionList(s, null);
                o.length && (a = o[o.length - 1])
            }
            if (!a) return null;
            for (; a.parentNode && a != n.parentNode && !a.raphael;) a = a.parentNode;
            return a == i.canvas.parentNode && (a = n), a = a && a.raphael ? i.getById(a.raphaelid) : null
        }, y.getById = function (t) {
            for (var e = this.bottom; e;) {
                if (e.id == t) return e;
                e = e.next
            }
            return null
        }, y.forEach = function (t, e) {
            for (var i = this.bottom; i;) {
                if (t.call(e, i) === !1) return this;
                i = i.next
            }
            return this
        }, y.getElementsByPoint = function (t, e) {
            var i = this.set();
            return this.forEach(function (n) {
                n.isPointInside(t, e) && i.push(n)
            }), i
        }, Ge.isPointInside = function (t, e) {
            var i = this.realPath = this.realPath || pe[this.type](this);
            return v.isPointInsidePath(i, t, e)
        }, Ge.getBBox = function (t) {
            if (this.removed) return {};
            var e = this._;
            return t ? ((e.dirty || !e.bboxwt) && (this.realPath = pe[this.type](this), e.bboxwt = Se(this.realPath), e.bboxwt.toString = a, e.dirty = 0), e.bboxwt) : ((e.dirty || e.dirtyT || !e.bbox) && ((e.dirty || !this.realPath) && (e.bboxwt = 0, this.realPath = pe[this.type](this)), e.bbox = Se(ge(this.realPath, this.matrix)), e.bbox.toString = a, e.dirty = e.dirtyT = 0), e.bbox)
        }, Ge.clone = function () {
            if (this.removed) return null;
            var t = this.paper[this.type]().attr(this.attr());
            return this.__set__ && this.__set__.push(t), t
        }, Ge.glow = function (t) {
            if ("text" == this.type) return null;
            t = t || {};
            var e = {
                    width: (t.width || 10) + (+this.attr("stroke-width") || 1),
                    fill: t.fill || !1,
                    opacity: t.opacity || .5,
                    offsetx: t.offsetx || 0,
                    offsety: t.offsety || 0,
                    color: t.color || "#000"
                },
                i = e.width / 2,
                n = this.paper,
                a = n.set(),
                r = this.realPath || pe[this.type](this);
            r = this.matrix ? ge(r, this.matrix) : r;
            for (var s = 1; i + 1 > s; s++) a.push(n.path(r).attr({
                stroke: e.color,
                fill: e.fill ? e.color : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(e.width / i * s).toFixed(3),
                opacity: +(e.opacity / i).toFixed(3)
            }));
            return a.insertBefore(this).translate(e.offsetx, e.offsety)
        };
        var Ke = function (t, e, i, n, a, r, s, o, l) {
                return null == l ? c(t, e, i, n, a, r, s, o) : v.findDotsAtSegment(t, e, i, n, a, r, s, o, h(t, e, i, n, a, r, s, o, l))
            },
            ti = function (t, e) {
                return function (i, n, a) {
                    i = Re(i);
                    for (var r, s, o, l, h, c = "", u = {}, d = 0, f = 0, p = i.length; p > f; f++) {
                        if (o = i[f], "M" == o[0]) r = +o[1], s = +o[2];
                        else {
                            if (l = Ke(r, s, o[1], o[2], o[3], o[4], o[5], o[6]), d + l > n) {
                                if (e && !u.start) {
                                    if (h = Ke(r, s, o[1], o[2], o[3], o[4], o[5], o[6], n - d), c += ["C" + h.start.x, h.start.y, h.m.x, h.m.y, h.x, h.y], a) return c;
                                    u.start = c, c = ["M" + h.x, h.y + "C" + h.n.x, h.n.y, h.end.x, h.end.y, o[5], o[6]].join(), d += l, r = +o[5], s = +o[6];
                                    continue
                                }
                                if (!t && !e) return h = Ke(r, s, o[1], o[2], o[3], o[4], o[5], o[6], n - d), {
                                    x: h.x,
                                    y: h.y,
                                    alpha: h.alpha
                                }
                            }
                            d += l, r = +o[5], s = +o[6]
                        }
                        c += o.shift() + o
                    }
                    return u.end = c, h = t ? d : e ? u : v.findDotsAtSegment(r, s, o[0], o[1], o[2], o[3], o[4], o[5], 1), h.alpha && (h = {
                        x: h.x,
                        y: h.y,
                        alpha: h.alpha
                    }), h
                }
            },
            ei = ti(1),
            ii = ti(),
            ni = ti(0, 1);
        v.getTotalLength = ei, v.getPointAtLength = ii, v.getSubpath = function (t, e, i) {
            if (this.getTotalLength(t) - i < 1e-6) return ni(t, e).end;
            var n = ni(t, i, 1);
            return e ? ni(n, e).end : n
        }, Ge.getTotalLength = function () {
            return "path" == this.type ? this.node.getTotalLength ? this.node.getTotalLength() : ei(this.attrs.path) : void 0
        }, Ge.getPointAtLength = function (t) {
            return "path" == this.type ? ii(this.attrs.path, t) : void 0
        }, Ge.getSubpath = function (t, e) {
            return "path" == this.type ? v.getSubpath(this.attrs.path, t, e) : void 0
        };
        var ai = v.easing_formulas = {
            linear: function (t) {
                return t
            },
            "<": function (t) {
                return W(t, 1.7)
            },
            ">": function (t) {
                return W(t, .48)
            },
            "<>": function (t) {
                var e = .48 - t / 1.04,
                    i = N.sqrt(.1734 + e * e),
                    n = i - e,
                    a = W(j(n), 1 / 3) * (0 > n ? -1 : 1),
                    r = -i - e,
                    s = W(j(r), 1 / 3) * (0 > r ? -1 : 1),
                    o = a + s + .5;
                return 3 * (1 - o) * o * o + o * o * o
            },
            backIn: function (t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            },
            backOut: function (t) {
                t -= 1;
                var e = 1.70158;
                return t * t * ((e + 1) * t + e) + 1
            },
            elastic: function (t) {
                return t == !!t ? t : W(2, -10 * t) * N.sin(2 * (t - .075) * O / .3) + 1
            },
            bounce: function (t) {
                var e, i = 7.5625,
                    n = 2.75;
                return 1 / n > t ? e = i * t * t : 2 / n > t ? (t -= 1.5 / n, e = i * t * t + .75) : 2.5 / n > t ? (t -= 2.25 / n, e = i * t * t + .9375) : (t -= 2.625 / n, e = i * t * t + .984375), e
            }
        };
        ai.easeIn = ai["ease-in"] = ai["<"], ai.easeOut = ai["ease-out"] = ai[">"], ai.easeInOut = ai["ease-in-out"] = ai["<>"], ai["back-in"] = ai.backIn, ai["back-out"] = ai.backOut;
        var ri = [],
            si = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
                setTimeout(t, 16)
            },
            oi = function () {
                for (var t = +new Date, i = 0; i < ri.length; i++) {
                    var n = ri[i];
                    if (!n.el.removed && !n.paused) {
                        var a, r, s = t - n.start,
                            o = n.ms,
                            l = n.easing,
                            h = n.from,
                            c = n.diff,
                            u = n.to,
                            d = (n.t, n.el),
                            f = {},
                            p = {};
                        if (n.initstatus ? (s = (n.initstatus * n.anim.top - n.prev) / (n.percent - n.prev) * o, n.status = n.initstatus, delete n.initstatus, n.stop && ri.splice(i--, 1)) : n.status = (n.prev + (n.percent - n.prev) * (s / o)) / n.anim.top, !(0 > s))
                            if (o > s) {
                                var g = l(s / o);
                                for (var m in h)
                                    if (h[C](m)) {
                                        switch (ee[m]) {
                                        case $:
                                            a = +h[m] + g * o * c[m];
                                            break;
                                        case "colour":
                                            a = "rgb(" + [li(J(h[m].r + g * o * c[m].r)), li(J(h[m].g + g * o * c[m].g)), li(J(h[m].b + g * o * c[m].b))].join(",") + ")";
                                            break;
                                        case "path":
                                            a = [];
                                            for (var b = 0, y = h[m].length; y > b; b++) {
                                                a[b] = [h[m][b][0]];
                                                for (var x = 1, w = h[m][b].length; w > x; x++) a[b][x] = +h[m][b][x] + g * o * c[m][b][x];
                                                a[b] = a[b].join(I)
                                            }
                                            a = a.join(I);
                                            break;
                                        case "transform":
                                            if (c[m].real)
                                                for (a = [], b = 0, y = h[m].length; y > b; b++)
                                                    for (a[b] = [h[m][b][0]], x = 1, w = h[m][b].length; w > x; x++) a[b][x] = h[m][b][x] + g * o * c[m][b][x];
                                            else {
                                                var _ = function (t) {
                                                    return +h[m][t] + g * o * c[m][t]
                                                };
                                                a = [
                                                    ["m", _(0), _(1), _(2), _(3), _(4), _(5)]
                                                ]
                                            }
                                            break;
                                        case "csv":
                                            if ("clip-rect" == m)
                                                for (a = [], b = 4; b--;) a[b] = +h[m][b] + g * o * c[m][b];
                                            break;
                                        default:
                                            var k = [][F](h[m]);
                                            for (a = [], b = d.paper.customAttributes[m].length; b--;) a[b] = +k[b] + g * o * c[m][b]
                                        }
                                        f[m] = a
                                    }
                                d.attr(f),
                                    function (t, e, i) {
                                        setTimeout(function () {
                                            eve("raphael.anim.frame." + t, e, i)
                                        })
                                    }(d.id, d, n.anim)
                            } else {
                                if (function (t, e, i) {
                                    setTimeout(function () {
                                        eve("raphael.anim.frame." + e.id, e, i), eve("raphael.anim.finish." + e.id, e, i), v.is(t, "function") && t.call(e)
                                    })
                                }(n.callback, d, n.anim), d.attr(u), ri.splice(i--, 1), n.repeat > 1 && !n.next) {
                                    for (r in u) u[C](r) && (p[r] = n.totalOrigin[r]);
                                    n.el.attr(p), e(n.anim, n.el, n.anim.percents[0], null, n.totalOrigin, n.repeat - 1)
                                }
                                n.next && !n.stop && e(n.anim, n.el, n.next, null, n.totalOrigin, n.repeat)
                            }
                    }
                }
                v.svg && d && d.paper && d.paper.safari(), ri.length && si(oi)
            },
            li = function (t) {
                return t > 255 ? 255 : 0 > t ? 0 : t
            };
        Ge.animateWith = function (t, n, a, r, s, o) {
            var l = this;
            if (l.removed) return o && o.call(l), l;
            var h = a instanceof i ? a : v.animation(a, r, s, o);
            e(h, l, h.percents[0], null, l.attr());
            for (var c = 0, u = ri.length; u > c; c++)
                if (ri[c].anim == n && ri[c].el == t) {
                    ri[u - 1].start = ri[c].start;
                    break
                }
            return l
        }, Ge.onAnimation = function (t) {
            return t ? eve.on("raphael.anim.frame." + this.id, t) : eve.unbind("raphael.anim.frame." + this.id), this
        }, i.prototype.delay = function (t) {
            var e = new i(this.anim, this.ms);
            return e.times = this.times, e.del = +t || 0, e
        }, i.prototype.repeat = function (t) {
            var e = new i(this.anim, this.ms);
            return e.del = this.del, e.times = N.floor(z(t, 0)) || 1, e
        }, v.animation = function (t, e, n, a) {
            if (t instanceof i) return t;
            (v.is(n, "function") || !n) && (a = a || n || null, n = null), t = Object(t), e = +e || 0;
            var r, s, o = {};
            for (s in t) t[C](s) && Q(s) != s && Q(s) + "%" != s && (r = !0, o[s] = t[s]);
            return r ? (n && (o.easing = n), a && (o.callback = a), new i({
                100: o
            }, e)) : new i(t, e)
        }, Ge.animate = function (t, n, a, r) {
            var s = this;
            if (s.removed) return r && r.call(s), s;
            var o = t instanceof i ? t : v.animation(t, n, a, r);
            return e(o, s, o.percents[0], null, s.attr()), s
        }, Ge.setTime = function (t, e) {
            return t && null != e && this.status(t, B(e, t.ms) / t.ms), this
        }, Ge.status = function (t, i) {
            var n, a, r = [],
                s = 0;
            if (null != i) return e(t, this, -1, B(i, 1)), this;
            for (n = ri.length; n > s; s++)
                if (a = ri[s], a.el.id == this.id && (!t || a.anim == t)) {
                    if (t) return a.status;
                    r.push({
                        anim: a.anim,
                        status: a.status
                    })
                }
            return t ? 0 : r
        }, Ge.pause = function (t) {
            for (var e = 0; e < ri.length; e++) ri[e].el.id == this.id && (!t || ri[e].anim == t) && eve("raphael.anim.pause." + this.id, this, ri[e].anim) !== !1 && (ri[e].paused = !0);
            return this
        }, Ge.resume = function (t) {
            for (var e = 0; e < ri.length; e++)
                if (ri[e].el.id == this.id && (!t || ri[e].anim == t)) {
                    var i = ri[e];
                    eve("raphael.anim.resume." + this.id, this, i.anim) !== !1 && (delete i.paused, this.status(i.anim, i.status))
                }
            return this
        }, Ge.stop = function (t) {
            for (var e = 0; e < ri.length; e++) ri[e].el.id == this.id && (!t || ri[e].anim == t) && eve("raphael.anim.stop." + this.id, this, ri[e].anim) !== !1 && ri.splice(e--, 1);
            return this
        }, eve.on("raphael.remove", t), eve.on("raphael.clear", t), Ge.toString = function () {
            return "Raphaël’s object"
        };
        var hi = function (t) {
                if (this.items = [], this.length = 0, this.type = "set", t)
                    for (var e = 0, i = t.length; i > e; e++) t[e] && (t[e].constructor == Ge.constructor || t[e].constructor == hi) && (this[this.items.length] = this.items[this.items.length] = t[e], this.length++)
            },
            ci = hi.prototype;
        ci.push = function () {
            for (var t, e, i = 0, n = arguments.length; n > i; i++) t = arguments[i], t && (t.constructor == Ge.constructor || t.constructor == hi) && (e = this.items.length, this[e] = this.items[e] = t, this.length++);
            return this
        }, ci.pop = function () {
            return this.length && delete this[this.length--], this.items.pop()
        }, ci.forEach = function (t, e) {
            for (var i = 0, n = this.items.length; n > i; i++)
                if (t.call(e, this.items[i], i) === !1) return this;
            return this
        };
        for (var ui in Ge) Ge[C](ui) && (ci[ui] = function (t) {
            return function () {
                var e = arguments;
                return this.forEach(function (i) {
                    i[t][T](i, e)
                })
            }
        }(ui));
        ci.attr = function (t, e) {
                if (t && v.is(t, Y) && v.is(t[0], "object"))
                    for (var i = 0, n = t.length; n > i; i++) this.items[i].attr(t[i]);
                else
                    for (var a = 0, r = this.items.length; r > a; a++) this.items[a].attr(t, e);
                return this
            }, ci.clear = function () {
                for (; this.length;) this.pop()
            }, ci.splice = function (t, e) {
                t = 0 > t ? z(this.length + t, 0) : t, e = z(0, B(this.length - t, e));
                var i, n = [],
                    a = [],
                    r = [];
                for (i = 2; i < arguments.length; i++) r.push(arguments[i]);
                for (i = 0; e > i; i++) a.push(this[t + i]);
                for (; i < this.length - t; i++) n.push(this[t + i]);
                var s = r.length;
                for (i = 0; i < s + n.length; i++) this.items[t + i] = this[t + i] = s > i ? r[i] : n[i - s];
                for (i = this.items.length = this.length -= e - s; this[i];) delete this[i++];
                return new hi(a)
            }, ci.exclude = function (t) {
                for (var e = 0, i = this.length; i > e; e++)
                    if (this[e] == t) return this.splice(e, 1), !0
            }, ci.animate = function (t, e, i, n) {
                (v.is(i, "function") || !i) && (n = i || null);
                var a, r, s = this.items.length,
                    o = s,
                    l = this;
                if (!s) return this;
                n && (r = function () {
                    !--s && n.call(l)
                }), i = v.is(i, q) ? i : r;
                var h = v.animation(t, e, i, r);
                for (a = this.items[--o].animate(h); o--;) this.items[o] && !this.items[o].removed && this.items[o].animateWith(a, h, h);
                return this
            }, ci.insertAfter = function (t) {
                for (var e = this.items.length; e--;) this.items[e].insertAfter(t);
                return this
            }, ci.getBBox = function () {
                for (var t = [], e = [], i = [], n = [], a = this.items.length; a--;)
                    if (!this.items[a].removed) {
                        var r = this.items[a].getBBox();
                        t.push(r.x), e.push(r.y), i.push(r.x + r.width), n.push(r.y + r.height)
                    }
                return t = B[T](0, t), e = B[T](0, e), i = z[T](0, i), n = z[T](0, n), {
                    x: t,
                    y: e,
                    x2: i,
                    y2: n,
                    width: i - t,
                    height: n - e
                }
            }, ci.clone = function (t) {
                t = new hi;
                for (var e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].clone());
                return t
            }, ci.toString = function () {
                return "Raphaël‘s set"
            }, v.registerFont = function (t) {
                if (!t.face) return t;
                this.fonts = this.fonts || {};
                var e = {
                        w: t.w,
                        face: {},
                        glyphs: {}
                    },
                    i = t.face["font-family"];
                for (var n in t.face) t.face[C](n) && (e.face[n] = t.face[n]);
                if (this.fonts[i] ? this.fonts[i].push(e) : this.fonts[i] = [e], !t.svg) {
                    e.face["units-per-em"] = Z(t.face["units-per-em"], 10);
                    for (var a in t.glyphs)
                        if (t.glyphs[C](a)) {
                            var r = t.glyphs[a];
                            if (e.glyphs[a] = {
                                w: r.w,
                                k: {},
                                d: r.d && "M" + r.d.replace(/[mlcxtrv]/g, function (t) {
                                    return {
                                        l: "L",
                                        c: "C",
                                        x: "z",
                                        t: "m",
                                        r: "l",
                                        v: "c"
                                    }[t] || "M"
                                }) + "z"
                            }, r.k)
                                for (var s in r.k) r[C](s) && (e.glyphs[a].k[s] = r.k[s])
                        }
                }
                return t
            }, y.getFont = function (t, e, i, n) {
                if (n = n || "normal", i = i || "normal", e = +e || {
                    normal: 400,
                    bold: 700,
                    lighter: 300,
                    bolder: 800
                }[e] || 400, v.fonts) {
                    var a = v.fonts[t];
                    if (!a) {
                        var r = new RegExp("(^|\\s)" + t.replace(/[^\w\d\s+!~.:_-]/g, A) + "(\\s|$)", "i");
                        for (var s in v.fonts)
                            if (v.fonts[C](s) && r.test(s)) {
                                a = v.fonts[s];
                                break
                            }
                    }
                    var o;
                    if (a)
                        for (var l = 0, h = a.length; h > l && (o = a[l], o.face["font-weight"] != e || o.face["font-style"] != i && o.face["font-style"] || o.face["font-stretch"] != n); l++);
                    return o
                }
            }, y.print = function (t, e, i, n, a, r, s) {
                r = r || "middle", s = z(B(s || 0, 1), -1);
                var o, l = E(i)[L](A),
                    h = 0,
                    c = 0,
                    u = A;
                if (v.is(n, i) && (n = this.getFont(n)), n) {
                    o = (a || 16) / n.face["units-per-em"];
                    for (var d = n.face.bbox[L](x), f = +d[0], p = d[3] - d[1], g = 0, m = +d[1] + ("baseline" == r ? p + +n.face.descent : p / 2), b = 0, y = l.length; y > b; b++) {
                        if ("\n" == l[b]) h = 0, _ = 0, c = 0, g += p;
                        else {
                            var w = c && n.glyphs[l[b - 1]] || {},
                                _ = n.glyphs[l[b]];
                            h += c ? (w.w || n.w) + (w.k && w.k[l[b]] || 0) + n.w * s : 0, c = 1
                        }
                        _ && _.d && (u += v.transformPath(_.d, ["t", h * o, g * o, "s", o, o, f, m, "t", (t - f) / o, (e - m) / o]))
                    }
                }
                return this.path(u).attr({
                    fill: "#000",
                    stroke: "none"
                })
            }, y.add = function (t) {
                if (v.is(t, "array"))
                    for (var e, i = this.set(), n = 0, a = t.length; a > n; n++) e = t[n] || {}, w[C](e.type) && i.push(this[e.type]().attr(e));
                return i
            }, v.format = function (t, e) {
                var i = v.is(e, Y) ? [0][F](e) : arguments;
                return t && v.is(t, q) && i.length - 1 && (t = t.replace(_, function (t, e) {
                    return null == i[++e] ? A : i[e]
                })), t || A
            }, v.fullfill = function () {
                var t = /\{([^\}]+)\}/g,
                    e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                    i = function (t, i, n) {
                        var a = n;
                        return i.replace(e, function (t, e, i, n, r) {
                            e = e || n, a && (e in a && (a = a[e]), "function" == typeof a && r && (a = a()))
                        }), a = (null == a || a == n ? t : a) + ""
                    };
                return function (e, n) {
                    return String(e).replace(t, function (t, e) {
                        return i(t, e, n)
                    })
                }
            }(), v.ninja = function () {
                return S.was ? k.win.Raphael = S.is : delete Raphael, v
            }, v.st = ci,
            function (t, e, i) {
                function n() {
                    /in/.test(t.readyState) ? setTimeout(n, 9) : v.eve("raphael.DOMload")
                }
                null == t.readyState && t.addEventListener && (t.addEventListener(e, i = function () {
                    t.removeEventListener(e, i, !1), t.readyState = "complete"
                }, !1), t.readyState = "loading"), n()
            }(document, "DOMContentLoaded"), S.was ? k.win.Raphael = v : Raphael = v, eve.on("raphael.DOMload", function () {
                b = !0
            })
    }(), window.Raphael.svg && function (t) {
        var e = "hasOwnProperty",
            i = String,
            n = parseFloat,
            a = parseInt,
            r = Math,
            s = r.max,
            o = r.abs,
            l = r.pow,
            h = /[, ]+/,
            c = t.eve,
            u = "",
            d = " ",
            f = "http://www.w3.org/1999/xlink",
            p = {
                block: "M5,0 0,2.5 5,5z",
                classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                open: "M6,1 1,3.5 6,6",
                oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
            },
            g = {};
        t.toString = function () {
            return "Your browser supports SVG.\nYou are running Raphaël " + this.version
        };
        var m = function (n, a) {
                if (a) {
                    "string" == typeof n && (n = m(n));
                    for (var r in a) a[e](r) && ("xlink:" == r.substring(0, 6) ? n.setAttributeNS(f, r.substring(6), i(a[r])) : n.setAttribute(r, i(a[r])))
                } else n = t._g.doc.createElementNS("http://www.w3.org/2000/svg", n), n.style && (n.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                return n
            },
            v = function (e, a) {
                var h = "linear",
                    c = e.id + a,
                    d = .5,
                    f = .5,
                    p = e.node,
                    g = e.paper,
                    v = p.style,
                    b = t._g.doc.getElementById(c);
                if (!b) {
                    if (a = i(a).replace(t._radial_gradient, function (t, e, i) {
                        if (h = "radial", e && i) {
                            d = n(e), f = n(i);
                            var a = 2 * (f > .5) - 1;
                            l(d - .5, 2) + l(f - .5, 2) > .25 && (f = r.sqrt(.25 - l(d - .5, 2)) * a + .5) && .5 != f && (f = f.toFixed(5) - 1e-5 * a)
                        }
                        return u
                    }), a = a.split(/\s*\-\s*/), "linear" == h) {
                        var y = a.shift();
                        if (y = -n(y), isNaN(y)) return null;
                        var x = [0, 0, r.cos(t.rad(y)), r.sin(t.rad(y))],
                            w = 1 / (s(o(x[2]), o(x[3])) || 1);
                        x[2] *= w, x[3] *= w, x[2] < 0 && (x[0] = -x[2], x[2] = 0), x[3] < 0 && (x[1] = -x[3], x[3] = 0)
                    }
                    var _ = t._parseDots(a);
                    if (!_) return null;
                    if (c = c.replace(/[\(\)\s,\xb0#]/g, "_"), e.gradient && c != e.gradient.id && (g.defs.removeChild(e.gradient), delete e.gradient), !e.gradient) {
                        b = m(h + "Gradient", {
                            id: c
                        }), e.gradient = b, m(b, "radial" == h ? {
                            fx: d,
                            fy: f
                        } : {
                            x1: x[0],
                            y1: x[1],
                            x2: x[2],
                            y2: x[3],
                            gradientTransform: e.matrix.invert()
                        }), g.defs.appendChild(b);
                        for (var C = 0, k = _.length; k > C; C++) b.appendChild(m("stop", {
                            offset: _[C].offset ? _[C].offset : C ? "100%" : "0%",
                            "stop-color": _[C].color || "#fff"
                        }))
                    }
                }
                return m(p, {
                    fill: "url(#" + c + ")",
                    opacity: 1,
                    "fill-opacity": 1
                }), v.fill = u, v.opacity = 1, v.fillOpacity = 1, 1
            },
            b = function (t) {
                var e = t.getBBox(1);
                m(t.pattern, {
                    patternTransform: t.matrix.invert() + " translate(" + e.x + "," + e.y + ")"
                })
            },
            y = function (n, a, r) {
                if ("path" == n.type) {
                    for (var s, o, l, h, c, d = i(a).toLowerCase().split("-"), f = n.paper, v = r ? "end" : "start", b = n.node, y = n.attrs, x = y["stroke-width"], w = d.length, _ = "classic", C = 3, k = 3, S = 5; w--;) switch (d[w]) {
                    case "block":
                    case "classic":
                    case "oval":
                    case "diamond":
                    case "open":
                    case "none":
                        _ = d[w];
                        break;
                    case "wide":
                        k = 5;
                        break;
                    case "narrow":
                        k = 2;
                        break;
                    case "long":
                        C = 5;
                        break;
                    case "short":
                        C = 2
                    }
                    if ("open" == _ ? (C += 2, k += 2, S += 2, l = 1, h = r ? 4 : 1, c = {
                        fill: "none",
                        stroke: y.stroke
                    }) : (h = l = C / 2, c = {
                        fill: y.stroke,
                        stroke: "none"
                    }), n._.arrows ? r ? (n._.arrows.endPath && g[n._.arrows.endPath]--, n._.arrows.endMarker && g[n._.arrows.endMarker]--) : (n._.arrows.startPath && g[n._.arrows.startPath]--, n._.arrows.startMarker && g[n._.arrows.startMarker]--) : n._.arrows = {}, "none" != _) {
                        var D = "raphael-marker-" + _,
                            T = "raphael-marker-" + v + _ + C + k;
                        t._g.doc.getElementById(D) ? g[D]++ : (f.defs.appendChild(m(m("path"), {
                            "stroke-linecap": "round",
                            d: p[_],
                            id: D
                        })), g[D] = 1);
                        var F, M = t._g.doc.getElementById(T);
                        M ? (g[T]++, F = M.getElementsByTagName("use")[0]) : (M = m(m("marker"), {
                            id: T,
                            markerHeight: k,
                            markerWidth: C,
                            orient: "auto",
                            refX: h,
                            refY: k / 2
                        }), F = m(m("use"), {
                            "xlink:href": "#" + D,
                            transform: (r ? "rotate(180 " + C / 2 + " " + k / 2 + ") " : u) + "scale(" + C / S + "," + k / S + ")",
                            "stroke-width": (1 / ((C / S + k / S) / 2)).toFixed(4)
                        }), M.appendChild(F), f.defs.appendChild(M), g[T] = 1), m(F, c);
                        var A = l * ("diamond" != _ && "oval" != _);
                        r ? (s = n._.arrows.startdx * x || 0, o = t.getTotalLength(y.path) - A * x) : (s = A * x, o = t.getTotalLength(y.path) - (n._.arrows.enddx * x || 0)), c = {}, c["marker-" + v] = "url(#" + T + ")", (o || s) && (c.d = Raphael.getSubpath(y.path, s, o)), m(b, c), n._.arrows[v + "Path"] = D, n._.arrows[v + "Marker"] = T, n._.arrows[v + "dx"] = A, n._.arrows[v + "Type"] = _, n._.arrows[v + "String"] = a
                    } else r ? (s = n._.arrows.startdx * x || 0, o = t.getTotalLength(y.path) - s) : (s = 0, o = t.getTotalLength(y.path) - (n._.arrows.enddx * x || 0)), n._.arrows[v + "Path"] && m(b, {
                        d: Raphael.getSubpath(y.path, s, o)
                    }), delete n._.arrows[v + "Path"], delete n._.arrows[v + "Marker"], delete n._.arrows[v + "dx"], delete n._.arrows[v + "Type"], delete n._.arrows[v + "String"];
                    for (c in g)
                        if (g[e](c) && !g[c]) {
                            var I = t._g.doc.getElementById(c);
                            I && I.parentNode.removeChild(I)
                        }
                }
            },
            x = {
                "": [0],
                none: [0],
                "-": [3, 1],
                ".": [1, 1],
                "-.": [3, 1, 1, 1],
                "-..": [3, 1, 1, 1, 1, 1],
                ". ": [1, 3],
                "- ": [4, 3],
                "--": [8, 3],
                "- .": [4, 3, 1, 3],
                "--.": [8, 3, 1, 3],
                "--..": [8, 3, 1, 3, 1, 3]
            },
            w = function (t, e, n) {
                if (e = x[i(e).toLowerCase()]) {
                    for (var a = t.attrs["stroke-width"] || "1", r = {
                        round: a,
                        square: a,
                        butt: 0
                    }[t.attrs["stroke-linecap"] || n["stroke-linecap"]] || 0, s = [], o = e.length; o--;) s[o] = e[o] * a + (o % 2 ? 1 : -1) * r;
                    m(t.node, {
                        "stroke-dasharray": s.join(",")
                    })
                }
            },
            _ = function (n, r) {
                var l = n.node,
                    c = n.attrs,
                    d = l.style.visibility;
                l.style.visibility = "hidden";
                for (var p in r)
                    if (r[e](p)) {
                        if (!t._availableAttrs[e](p)) continue;
                        var g = r[p];
                        switch (c[p] = g, p) {
                        case "blur":
                            n.blur(g);
                            break;
                        case "href":
                        case "title":
                        case "target":
                            var x = l.parentNode;
                            if ("a" != x.tagName.toLowerCase()) {
                                var _ = m("a");
                                x.insertBefore(_, l), _.appendChild(l), x = _
                            }
                            "target" == p ? x.setAttributeNS(f, "show", "blank" == g ? "new" : g) : x.setAttributeNS(f, p, g);
                            break;
                        case "cursor":
                            l.style.cursor = g;
                            break;
                        case "transform":
                            n.transform(g);
                            break;
                        case "arrow-start":
                            y(n, g);
                            break;
                        case "arrow-end":
                            y(n, g, 1);
                            break;
                        case "clip-rect":
                            var C = i(g).split(h);
                            if (4 == C.length) {
                                n.clip && n.clip.parentNode.parentNode.removeChild(n.clip.parentNode);
                                var S = m("clipPath"),
                                    D = m("rect");
                                S.id = t.createUUID(), m(D, {
                                    x: C[0],
                                    y: C[1],
                                    width: C[2],
                                    height: C[3]
                                }), S.appendChild(D), n.paper.defs.appendChild(S), m(l, {
                                    "clip-path": "url(#" + S.id + ")"
                                }), n.clip = D
                            }
                            if (!g) {
                                var T = l.getAttribute("clip-path");
                                if (T) {
                                    var F = t._g.doc.getElementById(T.replace(/(^url\(#|\)$)/g, u));
                                    F && F.parentNode.removeChild(F), m(l, {
                                        "clip-path": u
                                    }), delete n.clip
                                }
                            }
                            break;
                        case "path":
                            "path" == n.type && (m(l, {
                                d: g ? c.path = t._pathToAbsolute(g) : "M0,0"
                            }), n._.dirty = 1, n._.arrows && ("startString" in n._.arrows && y(n, n._.arrows.startString), "endString" in n._.arrows && y(n, n._.arrows.endString, 1)));
                            break;
                        case "width":
                            if (l.setAttribute(p, g), n._.dirty = 1, !c.fx) break;
                            p = "x", g = c.x;
                        case "x":
                            c.fx && (g = -c.x - (c.width || 0));
                        case "rx":
                            if ("rx" == p && "rect" == n.type) break;
                        case "cx":
                            l.setAttribute(p, g), n.pattern && b(n), n._.dirty = 1;
                            break;
                        case "height":
                            if (l.setAttribute(p, g), n._.dirty = 1, !c.fy) break;
                            p = "y", g = c.y;
                        case "y":
                            c.fy && (g = -c.y - (c.height || 0));
                        case "ry":
                            if ("ry" == p && "rect" == n.type) break;
                        case "cy":
                            l.setAttribute(p, g), n.pattern && b(n), n._.dirty = 1;
                            break;
                        case "r":
                            "rect" == n.type ? m(l, {
                                rx: g,
                                ry: g
                            }) : l.setAttribute(p, g), n._.dirty = 1;
                            break;
                        case "src":
                            "image" == n.type && l.setAttributeNS(f, "href", g);
                            break;
                        case "stroke-width":
                            (1 != n._.sx || 1 != n._.sy) && (g /= s(o(n._.sx), o(n._.sy)) || 1), n.paper._vbSize && (g *= n.paper._vbSize), l.setAttribute(p, g), c["stroke-dasharray"] && w(n, c["stroke-dasharray"], r), n._.arrows && ("startString" in n._.arrows && y(n, n._.arrows.startString), "endString" in n._.arrows && y(n, n._.arrows.endString, 1));
                            break;
                        case "stroke-dasharray":
                            w(n, g, r);
                            break;
                        case "fill":
                            var M = i(g).match(t._ISURL);
                            if (M) {
                                S = m("pattern");
                                var A = m("image");
                                S.id = t.createUUID(), m(S, {
                                        x: 0,
                                        y: 0,
                                        patternUnits: "userSpaceOnUse",
                                        height: 1,
                                        width: 1
                                    }), m(A, {
                                        x: 0,
                                        y: 0,
                                        "xlink:href": M[1]
                                    }), S.appendChild(A),
                                    function (e) {
                                        t._preload(M[1], function () {
                                            var t = this.offsetWidth,
                                                i = this.offsetHeight;
                                            m(e, {
                                                width: t,
                                                height: i
                                            }), m(A, {
                                                width: t,
                                                height: i
                                            }), n.paper.safari()
                                        })
                                    }(S), n.paper.defs.appendChild(S), m(l, {
                                        fill: "url(#" + S.id + ")"
                                    }), n.pattern = S, n.pattern && b(n);
                                break
                            }
                            var I = t.getRGB(g);
                            if (I.error) {
                                if (("circle" == n.type || "ellipse" == n.type || "r" != i(g).charAt()) && v(n, g)) {
                                    if ("opacity" in c || "fill-opacity" in c) {
                                        var E = t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, u));
                                        if (E) {
                                            var L = E.getElementsByTagName("stop");
                                            m(L[L.length - 1], {
                                                "stop-opacity": ("opacity" in c ? c.opacity : 1) * ("fill-opacity" in c ? c["fill-opacity"] : 1)
                                            })
                                        }
                                    }
                                    c.gradient = g, c.fill = "none";
                                    break
                                }
                            } else delete r.gradient, delete c.gradient, !t.is(c.opacity, "undefined") && t.is(r.opacity, "undefined") && m(l, {
                                opacity: c.opacity
                            }), !t.is(c["fill-opacity"], "undefined") && t.is(r["fill-opacity"], "undefined") && m(l, {
                                "fill-opacity": c["fill-opacity"]
                            });
                            I[e]("opacity") && m(l, {
                                "fill-opacity": I.opacity > 1 ? I.opacity / 100 : I.opacity
                            });
                        case "stroke":
                            I = t.getRGB(g), l.setAttribute(p, I.hex), "stroke" == p && I[e]("opacity") && m(l, {
                                "stroke-opacity": I.opacity > 1 ? I.opacity / 100 : I.opacity
                            }), "stroke" == p && n._.arrows && ("startString" in n._.arrows && y(n, n._.arrows.startString), "endString" in n._.arrows && y(n, n._.arrows.endString, 1));
                            break;
                        case "gradient":
                            ("circle" == n.type || "ellipse" == n.type || "r" != i(g).charAt()) && v(n, g);
                            break;
                        case "opacity":
                            c.gradient && !c[e]("stroke-opacity") && m(l, {
                                "stroke-opacity": g > 1 ? g / 100 : g
                            });
                        case "fill-opacity":
                            if (c.gradient) {
                                E = t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, u)), E && (L = E.getElementsByTagName("stop"), m(L[L.length - 1], {
                                    "stop-opacity": g
                                }));
                                break
                            }
                        default:
                            "font-size" == p && (g = a(g, 10) + "px");
                            var R = p.replace(/(\-.)/g, function (t) {
                                return t.substring(1).toUpperCase()
                            });
                            l.style[R] = g, n._.dirty = 1, l.setAttribute(p, g)
                        }
                    }
                k(n, r), l.style.visibility = d
            },
            C = 1.2,
            k = function (n, r) {
                if ("text" == n.type && (r[e]("text") || r[e]("font") || r[e]("font-size") || r[e]("x") || r[e]("y"))) {
                    var s = n.attrs,
                        o = n.node,
                        l = o.firstChild ? a(t._g.doc.defaultView.getComputedStyle(o.firstChild, u).getPropertyValue("font-size"), 10) : 10;
                    if (r[e]("text")) {
                        for (s.text = r.text; o.firstChild;) o.removeChild(o.firstChild);
                        for (var h, c = i(r.text).split("\n"), d = [], f = 0, p = c.length; p > f; f++) h = m("tspan"), f && m(h, {
                            dy: l * C,
                            x: s.x
                        }), h.appendChild(t._g.doc.createTextNode(c[f])), o.appendChild(h), d[f] = h
                    } else
                        for (d = o.getElementsByTagName("tspan"), f = 0, p = d.length; p > f; f++) f ? m(d[f], {
                            dy: l * C,
                            x: s.x
                        }) : m(d[0], {
                            dy: 0
                        });
                    m(o, {
                        x: s.x,
                        y: s.y
                    }), n._.dirty = 1;
                    var g = n._getBBox(),
                        v = s.y - (g.y + g.height / 2);
                    v && t.is(v, "finite") && m(d[0], {
                        dy: v
                    })
                }
            },
            S = function (e, i) {
                this[0] = this.node = e, e.raphael = !0, this.id = t._oid++, e.raphaelid = this.id, this.matrix = t.matrix(), this.realPath = null, this.paper = i, this.attrs = this.attrs || {}, this._ = {
                    transform: [],
                    sx: 1,
                    sy: 1,
                    deg: 0,
                    dx: 0,
                    dy: 0,
                    dirty: 1
                }, !i.bottom && (i.bottom = this), this.prev = i.top, i.top && (i.top.next = this), i.top = this, this.next = null
            },
            D = t.el;
        S.prototype = D, D.constructor = S, t._engine.path = function (t, e) {
            var i = m("path");
            e.canvas && e.canvas.appendChild(i);
            var n = new S(i, e);
            return n.type = "path", _(n, {
                fill: "none",
                stroke: "#000",
                path: t
            }), n
        }, D.rotate = function (t, e, a) {
            if (this.removed) return this;
            if (t = i(t).split(h), t.length - 1 && (e = n(t[1]), a = n(t[2])), t = n(t[0]), null == a && (e = a), null == e || null == a) {
                var r = this.getBBox(1);
                e = r.x + r.width / 2, a = r.y + r.height / 2
            }
            return this.transform(this._.transform.concat([
                ["r", t, e, a]
            ])), this
        }, D.scale = function (t, e, a, r) {
            if (this.removed) return this;
            if (t = i(t).split(h), t.length - 1 && (e = n(t[1]), a = n(t[2]), r = n(t[3])), t = n(t[0]), null == e && (e = t), null == r && (a = r), null == a || null == r) var s = this.getBBox(1);
            return a = null == a ? s.x + s.width / 2 : a, r = null == r ? s.y + s.height / 2 : r, this.transform(this._.transform.concat([
                ["s", t, e, a, r]
            ])), this
        }, D.translate = function (t, e) {
            return this.removed ? this : (t = i(t).split(h), t.length - 1 && (e = n(t[1])), t = n(t[0]) || 0, e = +e || 0, this.transform(this._.transform.concat([
                ["t", t, e]
            ])), this)
        }, D.transform = function (i) {
            var n = this._;
            if (null == i) return n.transform;
            if (t._extractTransform(this, i), this.clip && m(this.clip, {
                transform: this.matrix.invert()
            }), this.pattern && b(this), this.node && m(this.node, {
                transform: this.matrix
            }), 1 != n.sx || 1 != n.sy) {
                var a = this.attrs[e]("stroke-width") ? this.attrs["stroke-width"] : 1;
                this.attr({
                    "stroke-width": a
                })
            }
            return this
        }, D.hide = function () {
            return !this.removed && this.paper.safari(this.node.style.display = "none"), this
        }, D.show = function () {
            return !this.removed && this.paper.safari(this.node.style.display = ""), this
        }, D.remove = function () {
            if (!this.removed && this.node.parentNode) {
                var e = this.paper;
                e.__set__ && e.__set__.exclude(this), c.unbind("raphael.*.*." + this.id), this.gradient && e.defs.removeChild(this.gradient), t._tear(this, e), "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
                for (var i in this) this[i] = "function" == typeof this[i] ? t._removedFactory(i) : null;
                this.removed = !0
            }
        }, D._getBBox = function () {
            if ("none" == this.node.style.display) {
                this.show();
                var t = !0
            }
            var e = {};
            try {
                e = this.node.getBBox()
            } catch (i) {} finally {
                e = e || {}
            }
            return t && this.hide(), e
        }, D.attr = function (i, n) {
            if (this.removed) return this;
            if (null == i) {
                var a = {};
                for (var r in this.attrs) this.attrs[e](r) && (a[r] = this.attrs[r]);
                return a.gradient && "none" == a.fill && (a.fill = a.gradient) && delete a.gradient, a.transform = this._.transform, a
            }
            if (null == n && t.is(i, "string")) {
                if ("fill" == i && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                if ("transform" == i) return this._.transform;
                for (var s = i.split(h), o = {}, l = 0, u = s.length; u > l; l++) i = s[l], o[i] = i in this.attrs ? this.attrs[i] : t.is(this.paper.customAttributes[i], "function") ? this.paper.customAttributes[i].def : t._availableAttrs[i];
                return u - 1 ? o : o[s[0]]
            }
            if (null == n && t.is(i, "array")) {
                for (o = {}, l = 0, u = i.length; u > l; l++) o[i[l]] = this.attr(i[l]);
                return o
            }
            if (null != n) {
                var d = {};
                d[i] = n
            } else null != i && t.is(i, "object") && (d = i);
            for (var f in d) c("raphael.attr." + f + "." + this.id, this, d[f]);
            for (f in this.paper.customAttributes)
                if (this.paper.customAttributes[e](f) && d[e](f) && t.is(this.paper.customAttributes[f], "function")) {
                    var p = this.paper.customAttributes[f].apply(this, [].concat(d[f]));
                    this.attrs[f] = d[f];
                    for (var g in p) p[e](g) && (d[g] = p[g])
                }
            return _(this, d), this
        }, D.toFront = function () {
            if (this.removed) return this;
            "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
            var e = this.paper;
            return e.top != this && t._tofront(this, e), this
        }, D.toBack = function () {
            if (this.removed) return this;
            var e = this.node.parentNode;
            return "a" == e.tagName.toLowerCase() ? e.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : e.firstChild != this.node && e.insertBefore(this.node, this.node.parentNode.firstChild), t._toback(this, this.paper), this.paper, this
        }, D.insertAfter = function (e) {
            if (this.removed) return this;
            var i = e.node || e[e.length - 1].node;
            return i.nextSibling ? i.parentNode.insertBefore(this.node, i.nextSibling) : i.parentNode.appendChild(this.node), t._insertafter(this, e, this.paper), this
        }, D.insertBefore = function (e) {
            if (this.removed) return this;
            var i = e.node || e[0].node;
            return i.parentNode.insertBefore(this.node, i), t._insertbefore(this, e, this.paper), this
        }, D.blur = function (e) {
            var i = this;
            if (0 !== +e) {
                var n = m("filter"),
                    a = m("feGaussianBlur");
                i.attrs.blur = e, n.id = t.createUUID(), m(a, {
                    stdDeviation: +e || 1.5
                }), n.appendChild(a), i.paper.defs.appendChild(n), i._blur = n, m(i.node, {
                    filter: "url(#" + n.id + ")"
                })
            } else i._blur && (i._blur.parentNode.removeChild(i._blur), delete i._blur, delete i.attrs.blur), i.node.removeAttribute("filter")
        }, t._engine.circle = function (t, e, i, n) {
            var a = m("circle");
            t.canvas && t.canvas.appendChild(a);
            var r = new S(a, t);
            return r.attrs = {
                cx: e,
                cy: i,
                r: n,
                fill: "none",
                stroke: "#000"
            }, r.type = "circle", m(a, r.attrs), r
        }, t._engine.rect = function (t, e, i, n, a, r) {
            var s = m("rect");
            t.canvas && t.canvas.appendChild(s);
            var o = new S(s, t);
            return o.attrs = {
                x: e,
                y: i,
                width: n,
                height: a,
                r: r || 0,
                rx: r || 0,
                ry: r || 0,
                fill: "none",
                stroke: "#000"
            }, o.type = "rect", m(s, o.attrs), o
        }, t._engine.ellipse = function (t, e, i, n, a) {
            var r = m("ellipse");
            t.canvas && t.canvas.appendChild(r);
            var s = new S(r, t);
            return s.attrs = {
                cx: e,
                cy: i,
                rx: n,
                ry: a,
                fill: "none",
                stroke: "#000"
            }, s.type = "ellipse", m(r, s.attrs), s
        }, t._engine.image = function (t, e, i, n, a, r) {
            var s = m("image");
            m(s, {
                x: i,
                y: n,
                width: a,
                height: r,
                preserveAspectRatio: "none"
            }), s.setAttributeNS(f, "href", e), t.canvas && t.canvas.appendChild(s);
            var o = new S(s, t);
            return o.attrs = {
                x: i,
                y: n,
                width: a,
                height: r,
                src: e
            }, o.type = "image", o
        }, t._engine.text = function (e, i, n, a) {
            var r = m("text");
            e.canvas && e.canvas.appendChild(r);
            var s = new S(r, e);
            return s.attrs = {
                x: i,
                y: n,
                "text-anchor": "middle",
                text: a,
                font: t._availableAttrs.font,
                stroke: "none",
                fill: "#000"
            }, s.type = "text", _(s, s.attrs), s
        }, t._engine.setSize = function (t, e) {
            return this.width = t || this.width, this.height = e || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this
        }, t._engine.create = function () {
            var e = t._getContainer.apply(0, arguments),
                i = e && e.container,
                n = e.x,
                a = e.y,
                r = e.width,
                s = e.height;
            if (!i) throw new Error("SVG container not found.");
            var o, l = m("svg"),
                h = "overflow:hidden;";
            return n = n || 0, a = a || 0, r = r || 512, s = s || 342, m(l, {
                height: s,
                version: 1.1,
                width: r,
                xmlns: "http://www.w3.org/2000/svg"
            }), 1 == i ? (l.style.cssText = h + "position:absolute;left:" + n + "px;top:" + a + "px", t._g.doc.body.appendChild(l), o = 1) : (l.style.cssText = h + "position:relative", i.firstChild ? i.insertBefore(l, i.firstChild) : i.appendChild(l)), i = new t._Paper, i.width = r, i.height = s, i.canvas = l, i.clear(), i._left = i._top = 0, o && (i.renderfix = function () {}), i.renderfix(), i
        }, t._engine.setViewBox = function (t, e, i, n, a) {
            c("raphael.setViewBox", this, this._viewBox, [t, e, i, n, a]);
            var r, o, l = s(i / this.width, n / this.height),
                h = this.top,
                u = a ? "meet" : "xMinYMin";
            for (null == t ? (this._vbSize && (l = 1), delete this._vbSize, r = "0 0 " + this.width + d + this.height) : (this._vbSize = l, r = t + d + e + d + i + d + n), m(this.canvas, {
                viewBox: r,
                preserveAspectRatio: u
            }); l && h;) o = "stroke-width" in h.attrs ? h.attrs["stroke-width"] : 1, h.attr({
                "stroke-width": o
            }), h._.dirty = 1, h._.dirtyT = 1, h = h.prev;
            return this._viewBox = [t, e, i, n, !!a], this
        }, t.prototype.renderfix = function () {
            var t, e = this.canvas,
                i = e.style;
            try {
                t = e.getScreenCTM() || e.createSVGMatrix()
            } catch (n) {
                t = e.createSVGMatrix()
            }
            var a = -t.e % 1,
                r = -t.f % 1;
            (a || r) && (a && (this._left = (this._left + a) % 1, i.left = this._left + "px"), r && (this._top = (this._top + r) % 1, i.top = this._top + "px"))
        }, t.prototype.clear = function () {
            t.eve("raphael.clear", this);
            for (var e = this.canvas; e.firstChild;) e.removeChild(e.firstChild);
            this.bottom = this.top = null, (this.desc = m("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël " + t.version)), e.appendChild(this.desc), e.appendChild(this.defs = m("defs"))
        }, t.prototype.remove = function () {
            c("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
            for (var e in this) this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null
        };
        var T = t.st;
        for (var F in D) D[e](F) && !T[e](F) && (T[F] = function (t) {
            return function () {
                var e = arguments;
                return this.forEach(function (i) {
                    i[t].apply(i, e)
                })
            }
        }(F))
    }(window.Raphael), window.Raphael.vml && function (t) {
        var e = "hasOwnProperty",
            i = String,
            n = parseFloat,
            a = Math,
            r = a.round,
            s = a.max,
            o = a.min,
            l = a.abs,
            h = "fill",
            c = /[, ]+/,
            u = t.eve,
            d = " progid:DXImageTransform.Microsoft",
            f = " ",
            p = "",
            g = {
                M: "m",
                L: "l",
                C: "c",
                Z: "x",
                m: "t",
                l: "r",
                c: "v",
                z: "x"
            },
            m = /([clmz]),?([^clmz]*)/gi,
            v = / progid:\S+Blur\([^\)]+\)/g,
            b = /-?[^,\s-]+/g,
            y = "position:absolute;left:0;top:0;width:1px;height:1px",
            x = 21600,
            w = {
                path: 1,
                rect: 1,
                image: 1
            },
            _ = {
                circle: 1,
                ellipse: 1
            },
            C = function (e) {
                var n = /[ahqstv]/gi,
                    a = t._pathToAbsolute;
                if (i(e).match(n) && (a = t._path2curve), n = /[clmz]/g, a == t._pathToAbsolute && !i(e).match(n)) {
                    var s = i(e).replace(m, function (t, e, i) {
                        var n = [],
                            a = "m" == e.toLowerCase(),
                            s = g[e];
                        return i.replace(b, function (t) {
                            a && 2 == n.length && (s += n + g["m" == e ? "l" : "L"], n = []), n.push(r(t * x))
                        }), s + n
                    });
                    return s
                }
                var o, l, h = a(e);
                s = [];
                for (var c = 0, u = h.length; u > c; c++) {
                    o = h[c], l = h[c][0].toLowerCase(), "z" == l && (l = "x");
                    for (var d = 1, v = o.length; v > d; d++) l += r(o[d] * x) + (d != v - 1 ? "," : p);
                    s.push(l)
                }
                return s.join(f)
            },
            k = function (e, i, n) {
                var a = t.matrix();
                return a.rotate(-e, .5, .5), {
                    dx: a.x(i, n),
                    dy: a.y(i, n)
                }
            },
            S = function (t, e, i, n, a, r) {
                var s = t._,
                    o = t.matrix,
                    c = s.fillpos,
                    u = t.node,
                    d = u.style,
                    p = 1,
                    g = "",
                    m = x / e,
                    v = x / i;
                if (d.visibility = "hidden", e && i) {
                    if (u.coordsize = l(m) + f + l(v), d.rotation = r * (0 > e * i ? -1 : 1), r) {
                        var b = k(r, n, a);
                        n = b.dx, a = b.dy
                    }
                    if (0 > e && (g += "x"), 0 > i && (g += " y") && (p = -1), d.flip = g, u.coordorigin = n * -m + f + a * -v, c || s.fillsize) {
                        var y = u.getElementsByTagName(h);
                        y = y && y[0], u.removeChild(y), c && (b = k(r, o.x(c[0], c[1]), o.y(c[0], c[1])), y.position = b.dx * p + f + b.dy * p), s.fillsize && (y.size = s.fillsize[0] * l(e) + f + s.fillsize[1] * l(i)), u.appendChild(y)
                    }
                    d.visibility = "visible"
                }
            };
        t.toString = function () {
            return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
        };
        var D = function (t, e, n) {
                for (var a = i(e).toLowerCase().split("-"), r = n ? "end" : "start", s = a.length, o = "classic", l = "medium", h = "medium"; s--;) switch (a[s]) {
                case "block":
                case "classic":
                case "oval":
                case "diamond":
                case "open":
                case "none":
                    o = a[s];
                    break;
                case "wide":
                case "narrow":
                    h = a[s];
                    break;
                case "long":
                case "short":
                    l = a[s]
                }
                var c = t.node.getElementsByTagName("stroke")[0];
                c[r + "arrow"] = o, c[r + "arrowlength"] = l, c[r + "arrowwidth"] = h
            },
            T = function (a, l) {
                a.attrs = a.attrs || {};
                var u = a.node,
                    d = a.attrs,
                    g = u.style,
                    m = w[a.type] && (l.x != d.x || l.y != d.y || l.width != d.width || l.height != d.height || l.cx != d.cx || l.cy != d.cy || l.rx != d.rx || l.ry != d.ry || l.r != d.r),
                    v = _[a.type] && (d.cx != l.cx || d.cy != l.cy || d.r != l.r || d.rx != l.rx || d.ry != l.ry),
                    b = a;
                for (var y in l) l[e](y) && (d[y] = l[y]);
                if (m && (d.path = t._getPath[a.type](a), a._.dirty = 1), l.href && (u.href = l.href), l.title && (u.title = l.title), l.target && (u.target = l.target), l.cursor && (g.cursor = l.cursor), "blur" in l && a.blur(l.blur), (l.path && "path" == a.type || m) && (u.path = C(~i(d.path).toLowerCase().indexOf("r") ? t._pathToAbsolute(d.path) : d.path), "image" == a.type && (a._.fillpos = [d.x, d.y], a._.fillsize = [d.width, d.height], S(a, 1, 1, 0, 0, 0))), "transform" in l && a.transform(l.transform), v) {
                    var k = +d.cx,
                        T = +d.cy,
                        M = +d.rx || +d.r || 0,
                        A = +d.ry || +d.r || 0;
                    u.path = t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", r((k - M) * x), r((T - A) * x), r((k + M) * x), r((T + A) * x), r(k * x))
                }
                if ("clip-rect" in l) {
                    var E = i(l["clip-rect"]).split(c);
                    if (4 == E.length) {
                        E[2] = +E[2] + +E[0], E[3] = +E[3] + +E[1];
                        var L = u.clipRect || t._g.doc.createElement("div"),
                            R = L.style;
                        R.clip = t.format("rect({1}px {2}px {3}px {0}px)", E), u.clipRect || (R.position = "absolute", R.top = 0, R.left = 0, R.width = a.paper.width + "px", R.height = a.paper.height + "px", u.parentNode.insertBefore(L, u), L.appendChild(u), u.clipRect = L)
                    }
                    l["clip-rect"] || u.clipRect && (u.clipRect.style.clip = "auto")
                }
                if (a.textpath) {
                    var P = a.textpath.style;
                    l.font && (P.font = l.font), l["font-family"] && (P.fontFamily = '"' + l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, p) + '"'), l["font-size"] && (P.fontSize = l["font-size"]), l["font-weight"] && (P.fontWeight = l["font-weight"]), l["font-style"] && (P.fontStyle = l["font-style"])
                }
                if ("arrow-start" in l && D(b, l["arrow-start"]), "arrow-end" in l && D(b, l["arrow-end"], 1), null != l.opacity || null != l["stroke-width"] || null != l.fill || null != l.src || null != l.stroke || null != l["stroke-width"] || null != l["stroke-opacity"] || null != l["fill-opacity"] || null != l["stroke-dasharray"] || null != l["stroke-miterlimit"] || null != l["stroke-linejoin"] || null != l["stroke-linecap"]) {
                    var H = u.getElementsByTagName(h),
                        N = !1;
                    if (H = H && H[0], !H && (N = H = I(h)), "image" == a.type && l.src && (H.src = l.src), l.fill && (H.on = !0), (null == H.on || "none" == l.fill || null === l.fill) && (H.on = !1), H.on && l.fill) {
                        var z = i(l.fill).match(t._ISURL);
                        if (z) {
                            H.parentNode == u && u.removeChild(H), H.rotate = !0, H.src = z[1], H.type = "tile";
                            var B = a.getBBox(1);
                            H.position = B.x + f + B.y, a._.fillpos = [B.x, B.y], t._preload(z[1], function () {
                                a._.fillsize = [this.offsetWidth, this.offsetHeight]
                            })
                        } else H.color = t.getRGB(l.fill).hex, H.src = p, H.type = "solid", t.getRGB(l.fill).error && (b.type in {
                            circle: 1,
                            ellipse: 1
                        } || "r" != i(l.fill).charAt()) && F(b, l.fill, H) && (d.fill = "none", d.gradient = l.fill, H.rotate = !1)
                    }
                    if ("fill-opacity" in l || "opacity" in l) {
                        var j = ((+d["fill-opacity"] + 1 || 2) - 1) * ((+d.opacity + 1 || 2) - 1) * ((+t.getRGB(l.fill).o + 1 || 2) - 1);
                        j = o(s(j, 0), 1), H.opacity = j, H.src && (H.color = "none")
                    }
                    u.appendChild(H);
                    var W = u.getElementsByTagName("stroke") && u.getElementsByTagName("stroke")[0],
                        O = !1;
                    !W && (O = W = I("stroke")), (l.stroke && "none" != l.stroke || l["stroke-width"] || null != l["stroke-opacity"] || l["stroke-dasharray"] || l["stroke-miterlimit"] || l["stroke-linejoin"] || l["stroke-linecap"]) && (W.on = !0), ("none" == l.stroke || null === l.stroke || null == W.on || 0 == l.stroke || 0 == l["stroke-width"]) && (W.on = !1);
                    var $ = t.getRGB(l.stroke);
                    W.on && l.stroke && (W.color = $.hex), j = ((+d["stroke-opacity"] + 1 || 2) - 1) * ((+d.opacity + 1 || 2) - 1) * ((+$.o + 1 || 2) - 1);
                    var q = .75 * (n(l["stroke-width"]) || 1);
                    if (j = o(s(j, 0), 1), null == l["stroke-width"] && (q = d["stroke-width"]), l["stroke-width"] && (W.weight = q), q && 1 > q && (j *= q) && (W.weight = 1), W.opacity = j, l["stroke-linejoin"] && (W.joinstyle = l["stroke-linejoin"] || "miter"), W.miterlimit = l["stroke-miterlimit"] || 8, l["stroke-linecap"] && (W.endcap = "butt" == l["stroke-linecap"] ? "flat" : "square" == l["stroke-linecap"] ? "square" : "round"), l["stroke-dasharray"]) {
                        var Y = {
                            "-": "shortdash",
                            ".": "shortdot",
                            "-.": "shortdashdot",
                            "-..": "shortdashdotdot",
                            ". ": "dot",
                            "- ": "dash",
                            "--": "longdash",
                            "- .": "dashdot",
                            "--.": "longdashdot",
                            "--..": "longdashdotdot"
                        };
                        W.dashstyle = Y[e](l["stroke-dasharray"]) ? Y[l["stroke-dasharray"]] : p
                    }
                    O && u.appendChild(W)
                }
                if ("text" == b.type) {
                    b.paper.canvas.style.display = p;
                    var U = b.paper.span,
                        V = 100,
                        X = d.font && d.font.match(/\d+(?:\.\d*)?(?=px)/);
                    g = U.style, d.font && (g.font = d.font), d["font-family"] && (g.fontFamily = d["font-family"]), d["font-weight"] && (g.fontWeight = d["font-weight"]), d["font-style"] && (g.fontStyle = d["font-style"]), X = n(d["font-size"] || X && X[0]) || 10, g.fontSize = X * V + "px", b.textpath.string && (U.innerHTML = i(b.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                    var G = U.getBoundingClientRect();
                    b.W = d.w = (G.right - G.left) / V, b.H = d.h = (G.bottom - G.top) / V, b.X = d.x, b.Y = d.y + b.H / 2, ("x" in l || "y" in l) && (b.path.v = t.format("m{0},{1}l{2},{1}", r(d.x * x), r(d.y * x), r(d.x * x) + 1));
                    for (var J = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], Q = 0, Z = J.length; Z > Q; Q++)
                        if (J[Q] in l) {
                            b._.dirty = 1;
                            break
                        }
                    switch (d["text-anchor"]) {
                    case "start":
                        b.textpath.style["v-text-align"] = "left", b.bbx = b.W / 2;
                        break;
                    case "end":
                        b.textpath.style["v-text-align"] = "right", b.bbx = -b.W / 2;
                        break;
                    default:
                        b.textpath.style["v-text-align"] = "center", b.bbx = 0
                    }
                    b.textpath.style["v-text-kern"] = !0
                }
            },
            F = function (e, r, s) {
                e.attrs = e.attrs || {};
                var o = (e.attrs, Math.pow),
                    l = "linear",
                    h = ".5 .5";
                if (e.attrs.gradient = r, r = i(r).replace(t._radial_gradient, function (t, e, i) {
                    return l = "radial", e && i && (e = n(e), i = n(i), o(e - .5, 2) + o(i - .5, 2) > .25 && (i = a.sqrt(.25 - o(e - .5, 2)) * (2 * (i > .5) - 1) + .5), h = e + f + i), p
                }), r = r.split(/\s*\-\s*/), "linear" == l) {
                    var c = r.shift();
                    if (c = -n(c), isNaN(c)) return null
                }
                var u = t._parseDots(r);
                if (!u) return null;
                if (e = e.shape || e.node, u.length) {
                    e.removeChild(s), s.on = !0, s.method = "none", s.color = u[0].color, s.color2 = u[u.length - 1].color;
                    for (var d = [], g = 0, m = u.length; m > g; g++) u[g].offset && d.push(u[g].offset + f + u[g].color);
                    s.colors = d.length ? d.join() : "0% " + s.color, "radial" == l ? (s.type = "gradientTitle", s.focus = "100%", s.focussize = "0 0", s.focusposition = h, s.angle = 0) : (s.type = "gradient", s.angle = (270 - c) % 360), e.appendChild(s)
                }
                return 1
            },
            M = function (e, i) {
                this[0] = this.node = e, e.raphael = !0, this.id = t._oid++, e.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = i, this.matrix = t.matrix(), this._ = {
                    transform: [],
                    sx: 1,
                    sy: 1,
                    dx: 0,
                    dy: 0,
                    deg: 0,
                    dirty: 1,
                    dirtyT: 1
                }, !i.bottom && (i.bottom = this), this.prev = i.top, i.top && (i.top.next = this), i.top = this, this.next = null
            },
            A = t.el;
        M.prototype = A, A.constructor = M, A.transform = function (e) {
            if (null == e) return this._.transform;
            var n, a = this.paper._viewBoxShift,
                r = a ? "s" + [a.scale, a.scale] + "-1-1t" + [a.dx, a.dy] : p;
            a && (n = e = i(e).replace(/\.{3}|\u2026/g, this._.transform || p)), t._extractTransform(this, r + e);
            var s, o = this.matrix.clone(),
                l = this.skew,
                h = this.node,
                c = ~i(this.attrs.fill).indexOf("-"),
                u = !i(this.attrs.fill).indexOf("url(");
            if (o.translate(-.5, -.5), u || c || "image" == this.type)
                if (l.matrix = "1 0 0 1", l.offset = "0 0", s = o.split(), c && s.noRotation || !s.isSimple) {
                    h.style.filter = o.toFilter();
                    var d = this.getBBox(),
                        g = this.getBBox(1),
                        m = d.x - g.x,
                        v = d.y - g.y;
                    h.coordorigin = m * -x + f + v * -x, S(this, 1, 1, m, v, 0)
                } else h.style.filter = p, S(this, s.scalex, s.scaley, s.dx, s.dy, s.rotate);
            else h.style.filter = p, l.matrix = i(o), l.offset = o.offset();
            return n && (this._.transform = n), this
        }, A.rotate = function (t, e, a) {
            if (this.removed) return this;
            if (null != t) {
                if (t = i(t).split(c), t.length - 1 && (e = n(t[1]), a = n(t[2])), t = n(t[0]), null == a && (e = a), null == e || null == a) {
                    var r = this.getBBox(1);
                    e = r.x + r.width / 2, a = r.y + r.height / 2
                }
                return this._.dirtyT = 1, this.transform(this._.transform.concat([
                    ["r", t, e, a]
                ])), this
            }
        }, A.translate = function (t, e) {
            return this.removed ? this : (t = i(t).split(c), t.length - 1 && (e = n(t[1])), t = n(t[0]) || 0, e = +e || 0, this._.bbox && (this._.bbox.x += t, this._.bbox.y += e), this.transform(this._.transform.concat([
                ["t", t, e]
            ])), this)
        }, A.scale = function (t, e, a, r) {
            if (this.removed) return this;
            if (t = i(t).split(c), t.length - 1 && (e = n(t[1]), a = n(t[2]), r = n(t[3]), isNaN(a) && (a = null), isNaN(r) && (r = null)), t = n(t[0]), null == e && (e = t), null == r && (a = r), null == a || null == r) var s = this.getBBox(1);
            return a = null == a ? s.x + s.width / 2 : a, r = null == r ? s.y + s.height / 2 : r, this.transform(this._.transform.concat([
                ["s", t, e, a, r]
            ])), this._.dirtyT = 1, this
        }, A.hide = function () {
            return !this.removed && (this.node.style.display = "none"), this
        }, A.show = function () {
            return !this.removed && (this.node.style.display = p), this
        }, A._getBBox = function () {
            return this.removed ? {} : {
                x: this.X + (this.bbx || 0) - this.W / 2,
                y: this.Y - this.H,
                width: this.W,
                height: this.H
            }
        }, A.remove = function () {
            if (!this.removed && this.node.parentNode) {
                this.paper.__set__ && this.paper.__set__.exclude(this), t.eve.unbind("raphael.*.*." + this.id), t._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);
                for (var e in this) this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;
                this.removed = !0
            }
        }, A.attr = function (i, n) {
            if (this.removed) return this;
            if (null == i) {
                var a = {};
                for (var r in this.attrs) this.attrs[e](r) && (a[r] = this.attrs[r]);
                return a.gradient && "none" == a.fill && (a.fill = a.gradient) && delete a.gradient, a.transform = this._.transform, a
            }
            if (null == n && t.is(i, "string")) {
                if (i == h && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                for (var s = i.split(c), o = {}, l = 0, d = s.length; d > l; l++) i = s[l], o[i] = i in this.attrs ? this.attrs[i] : t.is(this.paper.customAttributes[i], "function") ? this.paper.customAttributes[i].def : t._availableAttrs[i];
                return d - 1 ? o : o[s[0]]
            }
            if (this.attrs && null == n && t.is(i, "array")) {
                for (o = {}, l = 0, d = i.length; d > l; l++) o[i[l]] = this.attr(i[l]);
                return o
            }
            var f;
            null != n && (f = {}, f[i] = n), null == n && t.is(i, "object") && (f = i);
            for (var p in f) u("raphael.attr." + p + "." + this.id, this, f[p]);
            if (f) {
                for (p in this.paper.customAttributes)
                    if (this.paper.customAttributes[e](p) && f[e](p) && t.is(this.paper.customAttributes[p], "function")) {
                        var g = this.paper.customAttributes[p].apply(this, [].concat(f[p]));
                        this.attrs[p] = f[p];
                        for (var m in g) g[e](m) && (f[m] = g[m])
                    }
                f.text && "text" == this.type && (this.textpath.string = f.text), T(this, f)
            }
            return this
        }, A.toFront = function () {
            return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && t._tofront(this, this.paper), this
        }, A.toBack = function () {
            return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), t._toback(this, this.paper)), this)
        }, A.insertAfter = function (e) {
            return this.removed ? this : (e.constructor == t.st.constructor && (e = e[e.length - 1]), e.node.nextSibling ? e.node.parentNode.insertBefore(this.node, e.node.nextSibling) : e.node.parentNode.appendChild(this.node), t._insertafter(this, e, this.paper), this)
        }, A.insertBefore = function (e) {
            return this.removed ? this : (e.constructor == t.st.constructor && (e = e[0]), e.node.parentNode.insertBefore(this.node, e.node), t._insertbefore(this, e, this.paper), this)
        }, A.blur = function (e) {
            var i = this.node.runtimeStyle,
                n = i.filter;
            n = n.replace(v, p), 0 !== +e ? (this.attrs.blur = e, i.filter = n + f + d + ".Blur(pixelradius=" + (+e || 1.5) + ")", i.margin = t.format("-{0}px 0 0 -{0}px", r(+e || 1.5))) : (i.filter = n, i.margin = 0, delete this.attrs.blur)
        }, t._engine.path = function (t, e) {
            var i = I("shape");
            i.style.cssText = y, i.coordsize = x + f + x, i.coordorigin = e.coordorigin;
            var n = new M(i, e),
                a = {
                    fill: "none",
                    stroke: "#000"
                };
            t && (a.path = t), n.type = "path", n.path = [], n.Path = p, T(n, a), e.canvas.appendChild(i);
            var r = I("skew");
            return r.on = !0, i.appendChild(r), n.skew = r, n.transform(p), n
        }, t._engine.rect = function (e, i, n, a, r, s) {
            var o = t._rectPath(i, n, a, r, s),
                l = e.path(o),
                h = l.attrs;
            return l.X = h.x = i, l.Y = h.y = n, l.W = h.width = a, l.H = h.height = r, h.r = s, h.path = o, l.type = "rect", l
        }, t._engine.ellipse = function (t, e, i, n, a) {
            var r = t.path();
            return r.attrs, r.X = e - n, r.Y = i - a, r.W = 2 * n, r.H = 2 * a, r.type = "ellipse", T(r, {
                cx: e,
                cy: i,
                rx: n,
                ry: a
            }), r
        }, t._engine.circle = function (t, e, i, n) {
            var a = t.path();
            return a.attrs, a.X = e - n, a.Y = i - n, a.W = a.H = 2 * n, a.type = "circle", T(a, {
                cx: e,
                cy: i,
                r: n
            }), a
        }, t._engine.image = function (e, i, n, a, r, s) {
            var o = t._rectPath(n, a, r, s),
                l = e.path(o).attr({
                    stroke: "none"
                }),
                c = l.attrs,
                u = l.node,
                d = u.getElementsByTagName(h)[0];
            return c.src = i, l.X = c.x = n, l.Y = c.y = a, l.W = c.width = r, l.H = c.height = s, c.path = o, l.type = "image", d.parentNode == u && u.removeChild(d), d.rotate = !0, d.src = i, d.type = "tile", l._.fillpos = [n, a], l._.fillsize = [r, s], u.appendChild(d), S(l, 1, 1, 0, 0, 0), l
        }, t._engine.text = function (e, n, a, s) {
            var o = I("shape"),
                l = I("path"),
                h = I("textpath");
            n = n || 0, a = a || 0, s = s || "", l.v = t.format("m{0},{1}l{2},{1}", r(n * x), r(a * x), r(n * x) + 1), l.textpathok = !0, h.string = i(s), h.on = !0, o.style.cssText = y, o.coordsize = x + f + x, o.coordorigin = "0 0";
            var c = new M(o, e),
                u = {
                    fill: "#000",
                    stroke: "none",
                    font: t._availableAttrs.font,
                    text: s
                };
            c.shape = o, c.path = l, c.textpath = h, c.type = "text", c.attrs.text = i(s), c.attrs.x = n, c.attrs.y = a, c.attrs.w = 1, c.attrs.h = 1, T(c, u), o.appendChild(h), o.appendChild(l), e.canvas.appendChild(o);
            var d = I("skew");
            return d.on = !0, o.appendChild(d), c.skew = d, c.transform(p), c
        }, t._engine.setSize = function (e, i) {
            var n = this.canvas.style;
            return this.width = e, this.height = i, e == +e && (e += "px"), i == +i && (i += "px"), n.width = e, n.height = i, n.clip = "rect(0 " + e + " " + i + " 0)", this._viewBox && t._engine.setViewBox.apply(this, this._viewBox), this
        }, t._engine.setViewBox = function (e, i, n, a, r) {
            t.eve("raphael.setViewBox", this, this._viewBox, [e, i, n, a, r]);
            var o, l, h = this.width,
                c = this.height,
                u = 1 / s(n / h, a / c);
            return r && (o = c / a, l = h / n, h > n * o && (e -= (h - n * o) / 2 / o), c > a * l && (i -= (c - a * l) / 2 / l)), this._viewBox = [e, i, n, a, !!r], this._viewBoxShift = {
                dx: -e,
                dy: -i,
                scale: u
            }, this.forEach(function (t) {
                t.transform("...")
            }), this
        };
        var I;
        t._engine.initWin = function (t) {
            var e = t.document;
            e.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                !e.namespaces.rvml && e.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), I = function (t) {
                    return e.createElement("<rvml:" + t + ' class="rvml">')
                }
            } catch (i) {
                I = function (t) {
                    return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                }
            }
        }, t._engine.initWin(t._g.win), t._engine.create = function () {
            var e = t._getContainer.apply(0, arguments),
                i = e.container,
                n = e.height,
                a = e.width,
                r = e.x,
                s = e.y;
            if (!i) throw new Error("VML container not found.");
            var o = new t._Paper,
                l = o.canvas = t._g.doc.createElement("div"),
                h = l.style;
            return r = r || 0, s = s || 0, a = a || 512, n = n || 342, o.width = a, o.height = n, a == +a && (a += "px"), n == +n && (n += "px"), o.coordsize = 1e3 * x + f + 1e3 * x, o.coordorigin = "0 0", o.span = t._g.doc.createElement("span"), o.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", l.appendChild(o.span), h.cssText = t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", a, n), 1 == i ? (t._g.doc.body.appendChild(l), h.left = r + "px", h.top = s + "px", h.position = "absolute") : i.firstChild ? i.insertBefore(l, i.firstChild) : i.appendChild(l), o.renderfix = function () {}, o
        }, t.prototype.clear = function () {
            t.eve("raphael.clear", this), this.canvas.innerHTML = p, this.span = t._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null
        }, t.prototype.remove = function () {
            t.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);
            for (var e in this) this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;
            return !0
        };
        var E = t.st;
        for (var L in A) A[e](L) && !E[e](L) && (E[L] = function (t) {
            return function () {
                var e = arguments;
                return this.forEach(function (i) {
                    i[t].apply(i, e)
                })
            }
        }(L))
    }(window.Raphael),
    function () {
        var t, e, i, n, a = [].slice,
            r = {}.hasOwnProperty,

            s = function (t, e) {
                function i() {
                    this.constructor = t
                }
                for (var n in e) r.call(e, n) && (t[n] = e[n]);
                return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
            },
            o = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            },
            l = [].indexOf || function (t) {
                for (var e = 0, i = this.length; i > e; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            };
        e = window.Morris = {}, t = jQuery, e.EventEmitter = function () {
            function t() {}
            return t.prototype.on = function (t, e) {
                return null == this.handlers && (this.handlers = {}), null == this.handlers[t] && (this.handlers[t] = []), this.handlers[t].push(e), this
            }, t.prototype.fire = function () {
                var t, e, i, n, r, s, o;
                if (i = arguments[0], t = 2 <= arguments.length ? a.call(arguments, 1) : [], null != this.handlers && null != this.handlers[i]) {
                    for (s = this.handlers[i], o = [], n = 0, r = s.length; r > n; n++) e = s[n], o.push(e.apply(null, t));
                    return o
                }
            }, t
        }(), e.commas = function (t) {
            var e, i, n, a;
            return null != t ? (n = 0 > t ? "-" : "", e = Math.abs(t), i = Math.floor(e).toFixed(0), n += i.replace(/(?=(?:\d{3})+$)(?!^)/g, ","), a = e.toString(), a.length > i.length && (n += a.slice(i.length)), n) : "-"
        }, e.pad2 = function (t) {
            return (10 > t ? "0" : "") + t
        }, e.Grid = function (i) {
            function n(e) {
                var i = this;
                if (this.el = "string" == typeof e.element ? t(document.getElementById(e.element)) : t(e.element), null == this.el || 0 === this.el.length) throw new Error("Graph container element not found");
                "static" === this.el.css("position") && this.el.css("position", "relative"), this.options = t.extend({}, this.gridDefaults, this.defaults || {}, e), "string" == typeof this.options.units && (this.options.postUnits = e.units), this.raphael = new Raphael(this.el[0]), this.elementWidth = null, this.elementHeight = null, this.dirty = !1, this.init && this.init(), this.setData(this.options.data), this.el.bind("mousemove", function (t) {
                    var e;
                    return e = i.el.offset(), i.fire("hovermove", t.pageX - e.left, t.pageY - e.top)
                }), this.el.bind("mouseout", function () {
                    return i.fire("hoverout")
                }), this.el.bind("touchstart touchmove touchend", function (t) {
                    var e, n;
                    return n = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0], e = i.el.offset(), i.fire("hover", n.pageX - e.left, n.pageY - e.top), n
                }), this.el.bind("click", function (t) {
                    var e;
                    return e = i.el.offset(), i.fire("gridclick", t.pageX - e.left, t.pageY - e.top)
                }), this.postInit && this.postInit()
            }
            return s(n, i), n.prototype.gridDefaults = {
                dateFormat: null,
                axes: !0,
                grid: !0,
                gridLineColor: "#aaa",
                gridStrokeWidth: .5,
                gridTextColor: "#888",
                gridTextSize: 12,
                gridTextFamily: "sans-serif",
                gridTextWeight: "normal",
                hideHover: !1,
                yLabelFormat: null,
                xLabelAngle: 0,
                numLines: 5,
                padding: 25,
                parseTime: !0,
                postUnits: "",
                preUnits: "",
                ymax: "auto",
                ymin: "auto 0",
                goals: [],
                goalStrokeWidth: 1,
                goalLineColors: ["#666633", "#999966", "#cc6666", "#663333"],
                events: [],
                eventStrokeWidth: 1,
                eventLineColors: ["#005a04", "#ccffbb", "#3a5f0b", "#005502"]
            }, n.prototype.setData = function (t, i) {
                var n, a, r, s, o, l, h, c, u, d, f, p, g, m;
                return null == i && (i = !0), this.options.data = t, null == t || 0 === t.length ? (this.data = [], this.raphael.clear(), null != this.hover && this.hover.hide(), void 0) : (p = this.cumulative ? 0 : null, g = this.cumulative ? 0 : null, this.options.goals.length > 0 && (o = Math.min.apply(null, this.options.goals), s = Math.max.apply(null, this.options.goals), g = null != g ? Math.min(g, o) : o, p = null != p ? Math.max(p, s) : s), this.data = function () {
                    var i, n, s;
                    for (s = [], r = i = 0, n = t.length; n > i; r = ++i) h = t[r], l = {}, l.label = h[this.options.xkey], this.options.parseTime ? (l.x = e.parseDate(l.label), this.options.dateFormat ? l.label = this.options.dateFormat(l.x) : "number" == typeof l.label && (l.label = new Date(l.label).toString())) : (l.x = r, this.options.xLabelFormat && (l.label = this.options.xLabelFormat(l))), u = 0, l.y = function () {
                        var t, e, i, n;
                        for (i = this.options.ykeys, n = [], a = t = 0, e = i.length; e > t; a = ++t) f = i[a], m = h[f], "string" == typeof m && (m = parseFloat(m)), null != m && "number" != typeof m && (m = null), null != m && (this.cumulative ? u += m : null != p ? (p = Math.max(m, p), g = Math.min(m, g)) : p = g = m), this.cumulative && null != u && (p = Math.max(u, p), g = Math.min(u, g)), n.push(m);
                        return n
                    }.call(this), s.push(l);
                    return s
                }.call(this), this.options.parseTime && (this.data = this.data.sort(function (t, e) {
                    return (t.x > e.x) - (e.x > t.x)
                })), this.xmin = this.data[0].x, this.xmax = this.data[this.data.length - 1].x, this.events = [], this.options.parseTime && this.options.events.length > 0 && (this.events = function () {
                    var t, i, a, r;
                    for (a = this.options.events, r = [], t = 0, i = a.length; i > t; t++) n = a[t], r.push(e.parseDate(n));
                    return r
                }.call(this), this.xmax = Math.max(this.xmax, Math.max.apply(null, this.events)), this.xmin = Math.min(this.xmin, Math.min.apply(null, this.events))), this.xmin === this.xmax && (this.xmin -= 1, this.xmax += 1), this.ymin = this.yboundary("min", g), this.ymax = this.yboundary("max", p), this.ymin === this.ymax && (g && (this.ymin -= 1), this.ymax += 1), (this.options.axes === !0 || this.options.grid === !0) && (this.options.ymax === this.gridDefaults.ymax && this.options.ymin === this.gridDefaults.ymin ? (this.grid = this.autoGridLines(this.ymin, this.ymax, this.options.numLines), this.ymin = Math.min(this.ymin, this.grid[0]), this.ymax = Math.max(this.ymax, this.grid[this.grid.length - 1])) : (c = (this.ymax - this.ymin) / (this.options.numLines - 1), this.grid = function () {
                    var t, e, i, n;
                    for (n = [], d = t = e = this.ymin, i = this.ymax; i >= e ? i >= t : t >= i; d = t += c) n.push(d);
                    return n
                }.call(this))), this.dirty = !0, i ? this.redraw() : void 0)
            }, n.prototype.yboundary = function (t, e) {
                var i, n;
                return i = this.options["y" + t], "string" == typeof i ? "auto" === i.slice(0, 4) ? i.length > 5 ? (n = parseInt(i.slice(5), 10), null == e ? n : Math[t](e, n)) : null != e ? e : 0 : parseInt(i, 10) : i
            }, n.prototype.autoGridLines = function (t, e, i) {
                var n, a, r, s, o, l, h, c, u;
                return o = e - t, u = Math.floor(Math.log(o) / Math.log(10)), h = Math.pow(10, u), a = Math.floor(t / h) * h, n = Math.ceil(e / h) * h, l = (n - a) / (i - 1), 1 === h && l > 1 && Math.ceil(l) !== l && (l = Math.ceil(l), n = a + l * (i - 1)), 0 > a && n > 0 && (a = Math.floor(t / l) * l, n = Math.ceil(e / l) * l), 1 > l ? (s = Math.floor(Math.log(l) / Math.log(10)), r = function () {
                    var t, e;
                    for (e = [], c = t = a; n >= a ? n >= t : t >= n; c = t += l) e.push(parseFloat(c.toFixed(1 - s)));
                    return e
                }()) : r = function () {
                    var t, e;
                    for (e = [], c = t = a; n >= a ? n >= t : t >= n; c = t += l) e.push(c);
                    return e
                }(), r
            }, n.prototype._calc = function () {
                var t, e, i, n, a, r;
                return a = this.el.width(), i = this.el.height(), (this.elementWidth !== a || this.elementHeight !== i || this.dirty) && (this.elementWidth = a, this.elementHeight = i, this.dirty = !1, this.left = this.options.padding, this.right = this.elementWidth - this.options.padding, this.top = this.options.padding, this.bottom = this.elementHeight - this.options.padding, this.options.axes && (r = function () {
                    var t, i, n, a;
                    for (n = this.grid, a = [], t = 0, i = n.length; i > t; t++) e = n[t], a.push(this.measureText(this.yAxisFormat(e)).width);
                    return a
                }.call(this), this.left += Math.max.apply(Math, r), t = function () {
                    var t, e, i;
                    for (i = [], n = t = 0, e = this.data.length; e >= 0 ? e > t : t > e; n = e >= 0 ? ++t : --t) i.push(this.measureText(this.data[n].text, -this.options.xLabelAngle).height);
                    return i
                }.call(this), this.bottom -= Math.max.apply(Math, t)), this.width = Math.max(1, this.right - this.left), this.height = Math.max(1, this.bottom - this.top), this.dx = this.width / (this.xmax - this.xmin), this.dy = this.height / (this.ymax - this.ymin), this.calc) ? this.calc() : void 0
            }, n.prototype.transY = function (t) {
                return this.bottom - (t - this.ymin) * this.dy
            }, n.prototype.transX = function (t) {
                return 1 === this.data.length ? (this.left + this.right) / 2 : this.left + (t - this.xmin) * this.dx
            }, n.prototype.redraw = function () {
                return this.raphael.clear(), this._calc(), this.drawGrid(), this.drawGoals(), this.drawEvents(), this.draw ? this.draw() : void 0
            }, n.prototype.measureText = function (t, e) {
                var i, n;
                return null == e && (e = 0), n = this.raphael.text(100, 100, t).attr("font-size", this.options.gridTextSize).attr("font-family", this.options.gridTextFamily).attr("font-weight", this.options.gridTextWeight).rotate(e), i = n.getBBox(), n.remove(), i
            }, n.prototype.yAxisFormat = function (t) {
                return this.yLabelFormat(t)
            }, n.prototype.yLabelFormat = function (t) {
                return "function" == typeof this.options.yLabelFormat ? this.options.yLabelFormat(t) : "" + this.options.preUnits + e.commas(t) + this.options.postUnits
            }, n.prototype.updateHover = function (t, e) {
                var i, n;
                return i = this.hitTest(t, e), null != i ? (n = this.hover).update.apply(n, i) : void 0
            }, n.prototype.drawGrid = function () {
                var t, e, i, n, a, r;
                if (this.options.grid !== !1 || this.options.axes !== !1) {
                    for (a = this.grid, r = [], i = 0, n = a.length; n > i; i++) t = a[i], e = this.transY(t), this.options.axes && this.drawYAxisLabel(this.left - this.options.padding / 2, e, this.yAxisFormat(t)), this.options.grid ? r.push(this.drawGridLine("M" + this.left + "," + e + "H" + (this.left + this.width))) : r.push(void 0);
                    return r
                }
            }, n.prototype.drawGoals = function () {
                var t, e, i, n, a, r, s;
                for (r = this.options.goals, s = [], i = n = 0, a = r.length; a > n; i = ++n) e = r[i], t = this.options.goalLineColors[i % this.options.goalLineColors.length], s.push(this.drawGoal(e, t));
                return s
            }, n.prototype.drawEvents = function () {
                var t, e, i, n, a, r, s;
                for (r = this.events, s = [], i = n = 0, a = r.length; a > n; i = ++n) e = r[i], t = this.options.eventLineColors[i % this.options.eventLineColors.length], s.push(this.drawEvent(e, t));
                return s
            }, n.prototype.drawGoal = function (t, e) {
                return this.raphael.path("M" + this.left + "," + this.transY(t) + "H" + this.right).attr("stroke", e).attr("stroke-width", this.options.goalStrokeWidth)
            }, n.prototype.drawEvent = function (t, e) {
                return this.raphael.path("M" + this.transX(t) + "," + this.bottom + "V" + this.top).attr("stroke", e).attr("stroke-width", this.options.eventStrokeWidth)
            }, n.prototype.drawYAxisLabel = function (t, e, i) {
                return this.raphael.text(t, e, i).attr("font-size", this.options.gridTextSize).attr("font-family", this.options.gridTextFamily).attr("font-weight", this.options.gridTextWeight).attr("fill", this.options.gridTextColor).attr("text-anchor", "end")
            }, n.prototype.drawGridLine = function (t) {
                return this.raphael.path(t).attr("stroke", this.options.gridLineColor).attr("stroke-width", this.options.gridStrokeWidth)
            }, n
        }(e.EventEmitter), e.parseDate = function (t) {
            var e, i, n, a, r, s, o, l, h, c, u;
            return "number" == typeof t ? t : (i = t.match(/^(\d+) Q(\d)$/), a = t.match(/^(\d+)-(\d+)$/), r = t.match(/^(\d+)-(\d+)-(\d+)$/), o = t.match(/^(\d+) W(\d+)$/), l = t.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/), h = t.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/), i ? new Date(parseInt(i[1], 10), 3 * parseInt(i[2], 10) - 1, 1).getTime() : a ? new Date(parseInt(a[1], 10), parseInt(a[2], 10) - 1, 1).getTime() : r ? new Date(parseInt(r[1], 10), parseInt(r[2], 10) - 1, parseInt(r[3], 10)).getTime() : o ? (c = new Date(parseInt(o[1], 10), 0, 1), 4 !== c.getDay() && c.setMonth(0, 1 + (4 - c.getDay() + 7) % 7), c.getTime() + 6048e5 * parseInt(o[2], 10)) : l ? l[6] ? (s = 0, "Z" !== l[6] && (s = 60 * parseInt(l[8], 10) + parseInt(l[9], 10), "+" === l[7] && (s = 0 - s)), Date.UTC(parseInt(l[1], 10), parseInt(l[2], 10) - 1, parseInt(l[3], 10), parseInt(l[4], 10), parseInt(l[5], 10) + s)) : new Date(parseInt(l[1], 10), parseInt(l[2], 10) - 1, parseInt(l[3], 10), parseInt(l[4], 10), parseInt(l[5], 10)).getTime() : h ? (u = parseFloat(h[6]), e = Math.floor(u), n = Math.round(1e3 * (u - e)), h[8] ? (s = 0, "Z" !== h[8] && (s = 60 * parseInt(h[10], 10) + parseInt(h[11], 10), "+" === h[9] && (s = 0 - s)), Date.UTC(parseInt(h[1], 10), parseInt(h[2], 10) - 1, parseInt(h[3], 10), parseInt(h[4], 10), parseInt(h[5], 10) + s, e, n)) : new Date(parseInt(h[1], 10), parseInt(h[2], 10) - 1, parseInt(h[3], 10), parseInt(h[4], 10), parseInt(h[5], 10), e, n).getTime()) : new Date(parseInt(t, 10), 0, 1).getTime())
        }, e.Hover = function () {
            function i(i) {
                null == i && (i = {}), this.options = t.extend({}, e.Hover.defaults, i), this.el = t("<div class='" + this.options["class"] + "'></div>"), this.el.hide(), this.options.parent.append(this.el)
            }
            return i.defaults = {
                "class": "morris-hover morris-default-style"
            }, i.prototype.update = function (t, e, i) {
                return this.html(t), this.show(), this.moveTo(e, i)
            }, i.prototype.html = function (t) {
                return this.el.html(t)
            }, i.prototype.moveTo = function (t, e) {
                var i, n, a, r, s, o;
                return s = this.options.parent.innerWidth(), r = this.options.parent.innerHeight(), n = this.el.outerWidth(), i = this.el.outerHeight(), a = Math.min(Math.max(0, t - n / 2), s - n), null != e ? (o = e - i - 10, 0 > o && (o = e + 10, o + i > r && (o = r / 2 - i / 2))) : o = r / 2 - i / 2, this.el.css({
                    left: a + "px",
                    top: parseInt(o) + "px"
                })
            }, i.prototype.show = function () {
                return this.el.show()
            }, i.prototype.hide = function () {
                return this.el.hide()
            }, i
        }(), e.Line = function (t) {
            function i(t) {
                return this.hilight = o(this.hilight, this), this.onHoverOut = o(this.onHoverOut, this), this.onHoverMove = o(this.onHoverMove, this), this.onGridClick = o(this.onGridClick, this), this instanceof e.Line ? (i.__super__.constructor.call(this, t), void 0) : new e.Line(t)
            }
            return s(i, t), i.prototype.init = function () {
                return this.pointGrow = Raphael.animation({
                    r: this.options.pointSize + 3
                }, 25, "linear"), this.pointShrink = Raphael.animation({
                    r: this.options.pointSize
                }, 25, "linear"), "always" !== this.options.hideHover ? (this.hover = new e.Hover({
                    parent: this.el
                }), this.on("hovermove", this.onHoverMove), this.on("hoverout", this.onHoverOut), this.on("gridclick", this.onGridClick)) : void 0
            }, i.prototype.defaults = {
                lineWidth: 3,
                pointSize: 4,
                lineColors: ["#0b62a4", "#7A92A3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
                pointWidths: [1],
                pointStrokeColors: ["#ffffff"],
                pointFillColors: [],
                smooth: !0,
                xLabels: "auto",
                xLabelFormat: null,
                xLabelMargin: 24,
                continuousLine: !0,
                hideHover: !1
            }, i.prototype.calc = function () {
                return this.calcPoints(), this.generatePaths()
            }, i.prototype.calcPoints = function () {
                var t, e, i, n, a, r;
                for (a = this.data, r = [], i = 0, n = a.length; n > i; i++) t = a[i], t._x = this.transX(t.x), t._y = function () {
                    var i, n, a, r;
                    for (a = t.y, r = [], i = 0, n = a.length; n > i; i++) e = a[i], null != e ? r.push(this.transY(e)) : r.push(e);
                    return r
                }.call(this), r.push(t._ymax = Math.min.apply(null, [this.bottom].concat(function () {
                    var i, n, a, r;
                    for (a = t._y, r = [], i = 0, n = a.length; n > i; i++) e = a[i], null != e && r.push(e);
                    return r
                }())));
                return r
            }, i.prototype.hitTest = function (t) {
                var e, i, n, a, r;
                if (0 === this.data.length) return null;
                for (r = this.data.slice(1), e = n = 0, a = r.length; a > n && (i = r[e], !(t < (i._x + this.data[e]._x) / 2)); e = ++n);
                return e
            }, i.prototype.onGridClick = function (t, e) {
                var i;
                return i = this.hitTest(t, e), this.fire("click", i, this.options.data[i], t, e)
            }, i.prototype.onHoverMove = function (t, e) {
                var i;
                return i = this.hitTest(t, e), this.displayHoverForRow(i)
            }, i.prototype.onHoverOut = function () {
                return this.options.hideHover !== !1 ? this.displayHoverForRow(null) : void 0
            }, i.prototype.displayHoverForRow = function (t) {
                var e;
                return null != t ? ((e = this.hover).update.apply(e, this.hoverContentForRow(t)), this.hilight(t)) : (this.hover.hide(), this.hilight())
            }, i.prototype.hoverContentForRow = function (t) {
                var e, i, n, a, r, s, o;
                for (n = this.data[t], e = "<div class='morris-hover-row-label'>" + n.label + "</div>", o = n.y, i = r = 0, s = o.length; s > r; i = ++r) a = o[i], e += "<div class='morris-hover-point' style='color: " + this.colorFor(n, i, "label") + "'>\n  " + this.options.labels[i] + ":\n  " + this.yLabelFormat(a) + "\n</div>";
                return "function" == typeof this.options.hoverCallback && (e = this.options.hoverCallback(t, this.options, e)), [e, n._x, n._ymax]
            }, i.prototype.generatePaths = function () {
                var t, i, n, a, r;
                return this.paths = function () {
                    var s, o, h, c;
                    for (c = [], n = s = 0, o = this.options.ykeys.length; o >= 0 ? o > s : s > o; n = o >= 0 ? ++s : --s) r = this.options.smooth === !0 || (h = this.options.ykeys[n], l.call(this.options.smooth, h) >= 0), i = function () {
                        var t, e, i, r;
                        for (i = this.data, r = [], t = 0, e = i.length; e > t; t++) a = i[t], void 0 !== a._y[n] && r.push({
                            x: a._x,
                            y: a._y[n]
                        });
                        return r
                    }.call(this), this.options.continuousLine && (i = function () {
                        var e, n, a;
                        for (a = [], e = 0, n = i.length; n > e; e++) t = i[e], null !== t.y && a.push(t);
                        return a
                    }()), i.length > 1 ? c.push(e.Line.createPath(i, r, this.bottom)) : c.push(null);
                    return c
                }.call(this)
            }, i.prototype.draw = function () {
                return this.options.axes && this.drawXAxis(), this.drawSeries(), this.options.hideHover === !1 ? this.displayHoverForRow(this.data.length - 1) : void 0
            }, i.prototype.drawXAxis = function () {
                var t, i, n, a, r, s, o, l, h, c, u = this;
                for (o = this.bottom + this.options.padding / 2, r = null, a = null, t = function (t, e) {
                    var i, n, s, l, h;
                    return i = u.drawXAxisLabel(u.transX(e), o, t), h = i.getBBox(), i.transform("r" + -u.options.xLabelAngle), n = i.getBBox(), i.transform("t0," + n.height / 2 + "..."), 0 !== u.options.xLabelAngle && (l = -.5 * h.width * Math.cos(u.options.xLabelAngle * Math.PI / 180), i.transform("t" + l + ",0...")), n = i.getBBox(), (null == r || r >= n.x + n.width || null != a && a >= n.x) && n.x >= 0 && n.x + n.width < u.el.width() ? (0 !== u.options.xLabelAngle && (s = 1.25 * u.options.gridTextSize / Math.sin(u.options.xLabelAngle * Math.PI / 180), a = n.x - s), r = n.x - u.options.xLabelMargin) : i.remove()
                }, n = this.options.parseTime ? 1 === this.data.length && "auto" === this.options.xLabels ? [
                    [this.data[0].label, this.data[0].x]
                ] : e.labelSeries(this.xmin, this.xmax, this.width, this.options.xLabels, this.options.xLabelFormat) : function () {
                    var t, e, i, n;
                    for (i = this.data, n = [], t = 0, e = i.length; e > t; t++) s = i[t], n.push([s.label, s.x]);
                    return n
                }.call(this), n.reverse(), c = [], l = 0, h = n.length; h > l; l++) i = n[l], c.push(t(i[0], i[1]));
                return c
            }, i.prototype.drawSeries = function () {
                var t, e, i, n, a, r;
                for (this.seriesPoints = [], t = e = n = this.options.ykeys.length - 1; 0 >= n ? 0 >= e : e >= 0; t = 0 >= n ? ++e : --e) this._drawLineFor(t);
                for (r = [], t = i = a = this.options.ykeys.length - 1; 0 >= a ? 0 >= i : i >= 0; t = 0 >= a ? ++i : --i) r.push(this._drawPointFor(t));
                return r
            }, i.prototype._drawPointFor = function (t) {
                var e, i, n, a, r, s;
                for (this.seriesPoints[t] = [], r = this.data, s = [], n = 0, a = r.length; a > n; n++) i = r[n], e = null, null != i._y[t] && (e = this.drawLinePoint(i._x, i._y[t], this.options.pointSize, this.colorFor(i, t, "point"), t)), s.push(this.seriesPoints[t].push(e));
                return s
            }, i.prototype._drawLineFor = function (t) {
                var e;
                return e = this.paths[t], null !== e ? this.drawLinePath(e, this.colorFor(null, t, "line")) : void 0
            }, i.createPath = function (t, i, n) {
                var a, r, s, o, l, h, c, u, d, f, p, g, m, v;
                for (c = "", i && (s = e.Line.gradients(t)), u = {
                    y: null
                }, o = m = 0, v = t.length; v > m; o = ++m) a = t[o], null != a.y && (null != u.y ? i ? (r = s[o], h = s[o - 1], l = (a.x - u.x) / 4, d = u.x + l, p = Math.min(n, u.y + l * h), f = a.x - l, g = Math.min(n, a.y - l * r), c += "C" + d + "," + p + "," + f + "," + g + "," + a.x + "," + a.y) : c += "L" + a.x + "," + a.y : i && null == s[o] || (c += "M" + a.x + "," + a.y)), u = a;
                return c
            }, i.gradients = function (t) {
                var e, i, n, a, r, s, o, l;
                for (i = function (t, e) {
                    return (t.y - e.y) / (t.x - e.x)
                }, l = [], n = s = 0, o = t.length; o > s; n = ++s) e = t[n], null != e.y ? (a = t[n + 1] || {
                    y: null
                }, r = t[n - 1] || {
                    y: null
                }, null != r.y && null != a.y ? l.push(i(r, a)) : null != r.y ? l.push(i(r, e)) : null != a.y ? l.push(i(e, a)) : l.push(null)) : l.push(null);
                return l
            }, i.prototype.hilight = function (t) {
                var e, i, n, a, r;
                if (null !== this.prevHilight && this.prevHilight !== t)
                    for (e = i = 0, a = this.seriesPoints.length - 1; a >= 0 ? a >= i : i >= a; e = a >= 0 ? ++i : --i) this.seriesPoints[e][this.prevHilight] && this.seriesPoints[e][this.prevHilight].animate(this.pointShrink);
                if (null !== t && this.prevHilight !== t)
                    for (e = n = 0, r = this.seriesPoints.length - 1; r >= 0 ? r >= n : n >= r; e = r >= 0 ? ++n : --n) this.seriesPoints[e][t] && this.seriesPoints[e][t].animate(this.pointGrow);
                return this.prevHilight = t
            }, i.prototype.colorFor = function (t, e, i) {
                return "function" == typeof this.options.lineColors ? this.options.lineColors.call(this, t, e, i) : "point" === i ? this.options.pointFillColors[e % this.options.pointFillColors.length] || this.options.lineColors[e % this.options.lineColors.length] : this.options.lineColors[e % this.options.lineColors.length]
            }, i.prototype.drawXAxisLabel = function (t, e, i) {
                return this.raphael.text(t, e, i).attr("font-size", this.options.gridTextSize).attr("font-family", this.options.gridTextFamily).attr("font-weight", this.options.gridTextWeight).attr("fill", this.options.gridTextColor)
            }, i.prototype.drawLinePath = function (t, e) {
                return this.raphael.path(t).attr("stroke", e).attr("stroke-width", this.options.lineWidth)
            }, i.prototype.drawLinePoint = function (t, e, i, n, a) {
                return this.raphael.circle(t, e, i).attr("fill", n).attr("stroke-width", this.strokeWidthForSeries(a)).attr("stroke", this.strokeForSeries(a))
            }, i.prototype.strokeWidthForSeries = function (t) {
                return this.options.pointWidths[t % this.options.pointWidths.length]
            }, i.prototype.strokeForSeries = function (t) {
                return this.options.pointStrokeColors[t % this.options.pointStrokeColors.length]
            }, i
        }(e.Grid), e.labelSeries = function (i, n, a, r, s) {
            var o, l, h, c, u, d, f, p, g, m, v;
            if (h = 200 * (n - i) / a, l = new Date(i), f = e.LABEL_SPECS[r], void 0 === f)
                for (v = e.AUTO_LABEL_ORDER, g = 0, m = v.length; m > g; g++)
                    if (c = v[g], d = e.LABEL_SPECS[c], h >= d.span) {
                        f = d;
                        break
                    }
            for (void 0 === f && (f = e.LABEL_SPECS.second), s && (f = t.extend({}, f, {
                    fmt: s
                })), o = f.start(l), u = [];
                (p = o.getTime()) <= n;) p >= i && u.push([f.fmt(o), p]), f.incr(o);
            return u
        }, i = function (t) {
            return {
                span: 1e3 * 60 * t,
                start: function (t) {
                    return new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours())
                },
                fmt: function (t) {
                    return "" + e.pad2(t.getHours()) + ":" + e.pad2(t.getMinutes())
                },
                incr: function (e) {
                    return e.setUTCMinutes(e.getUTCMinutes() + t)
                }
            }
        }, n = function (t) {
            return {
                span: 1e3 * t,
                start: function (t) {
                    return new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes())
                },
                fmt: function (t) {
                    return "" + e.pad2(t.getHours()) + ":" + e.pad2(t.getMinutes()) + ":" + e.pad2(t.getSeconds())
                },
                incr: function (e) {
                    return e.setUTCSeconds(e.getUTCSeconds() + t)
                }
            }
        }, e.LABEL_SPECS = {
            decade: {
                span: 1728e8,
                start: function (t) {
                    return new Date(t.getFullYear() - t.getFullYear() % 10, 0, 1)
                },
                fmt: function (t) {
                    return "" + t.getFullYear()
                },
                incr: function (t) {
                    return t.setFullYear(t.getFullYear() + 10)
                }
            },
            year: {
                span: 1728e7,
                start: function (t) {
                    return new Date(t.getFullYear(), 0, 1)
                },
                fmt: function (t) {
                    return "" + t.getFullYear()
                },
                incr: function (t) {
                    return t.setFullYear(t.getFullYear() + 1)
                }
            },
            month: {
                span: 24192e5,
                start: function (t) {
                    return new Date(t.getFullYear(), t.getMonth(), 1)
                },
                fmt: function (t) {
                    return "" + t.getFullYear() + "-" + e.pad2(t.getMonth() + 1)
                },
                incr: function (t) {
                    return t.setMonth(t.getMonth() + 1)
                }
            },
            day: {
                span: 864e5,
                start: function (t) {
                    return new Date(t.getFullYear(), t.getMonth(), t.getDate())
                },
                fmt: function (t) {
                    return "" + t.getFullYear() + "-" + e.pad2(t.getMonth() + 1) + "-" + e.pad2(t.getDate())
                },
                incr: function (t) {
                    return t.setDate(t.getDate() + 1)
                }
            },
            hour: i(60),
            "30min": i(30),
            "15min": i(15),
            "10min": i(10),
            "5min": i(5),
            minute: i(1),
            "30sec": n(30),
            "15sec": n(15),
            "10sec": n(10),
            "5sec": n(5),
            second: n(1)
        }, e.AUTO_LABEL_ORDER = ["decade", "year", "month", "day", "hour", "30min", "15min", "10min", "5min", "minute", "30sec", "15sec", "10sec", "5sec", "second"], e.Area = function (i) {
            function n(i) {
                var r;
                return this instanceof e.Area ? (r = t.extend({}, a, i), this.cumulative = !r.behaveLikeLine, "auto" === r.fillOpacity && (r.fillOpacity = r.behaveLikeLine ? .8 : 1), n.__super__.constructor.call(this, r), void 0) : new e.Area(i)
            }
            var a;
            return s(n, i), a = {
                fillOpacity: "auto",
                behaveLikeLine: !1
            }, n.prototype.calcPoints = function () {
                var t, e, i, n, a, r, s;
                for (r = this.data, s = [], n = 0, a = r.length; a > n; n++) t = r[n], t._x = this.transX(t.x), e = 0, t._y = function () {
                    var n, a, r, s;
                    for (r = t.y, s = [], n = 0, a = r.length; a > n; n++) i = r[n], this.options.behaveLikeLine ? s.push(this.transY(i)) : (e += i || 0, s.push(this.transY(e)));
                    return s
                }.call(this), s.push(t._ymax = Math.max.apply(Math, t._y));
                return s
            }, n.prototype.drawSeries = function () {
                var t, e, i, n, a, r, s, o;
                for (this.seriesPoints = [], e = this.options.behaveLikeLine ? function () {
                    r = [];
                    for (var t = 0, e = this.options.ykeys.length - 1; e >= 0 ? e >= t : t >= e; e >= 0 ? t++ : t--) r.push(t);
                    return r
                }.apply(this) : function () {
                    s = [];
                    for (var t = a = this.options.ykeys.length - 1; 0 >= a ? 0 >= t : t >= 0; 0 >= a ? t++ : t--) s.push(t);
                    return s
                }.apply(this), o = [], i = 0, n = e.length; n > i; i++) t = e[i], this._drawFillFor(t), this._drawLineFor(t), o.push(this._drawPointFor(t));
                return o
            }, n.prototype._drawFillFor = function (t) {
                var e;
                return e = this.paths[t], null !== e ? (e += "L" + this.transX(this.xmax) + "," + this.bottom + "L" + this.transX(this.xmin) + "," + this.bottom + "Z", this.drawFilledPath(e, this.fillForSeries(t))) : void 0
            }, n.prototype.fillForSeries = function (t) {
                var e;
                return e = Raphael.rgb2hsl(this.colorFor(this.data[t], t, "line")), Raphael.hsl(e.h, this.options.behaveLikeLine ? .9 * e.s : .75 * e.s, Math.min(.98, this.options.behaveLikeLine ? 1.2 * e.l : 1.25 * e.l))
            }, n.prototype.drawFilledPath = function (t, e) {
                return this.raphael.path(t).attr("fill", e).attr("fill-opacity", this.options.fillOpacity).attr("stroke-width", 0)
            }, n
        }(e.Line), e.Bar = function (i) {
            function n(i) {
                return this.onHoverOut = o(this.onHoverOut, this), this.onHoverMove = o(this.onHoverMove, this), this.onGridClick = o(this.onGridClick, this), this instanceof e.Bar ? (n.__super__.constructor.call(this, t.extend({}, i, {
                    parseTime: !1
                })), void 0) : new e.Bar(i)
            }
            return s(n, i), n.prototype.init = function () {
                return this.cumulative = this.options.stacked, "always" !== this.options.hideHover ? (this.hover = new e.Hover({
                    parent: this.el
                }), this.on("hovermove", this.onHoverMove), this.on("hoverout", this.onHoverOut), this.on("gridclick", this.onGridClick)) : void 0
            }, n.prototype.defaults = {
                barSizeRatio: .75,
                barGap: 3,
                barColors: ["#0b62a4", "#7a92a3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
                xLabelMargin: 50
            }, n.prototype.calc = function () {
                var t;
                return this.calcBars(), this.options.hideHover === !1 ? (t = this.hover).update.apply(t, this.hoverContentForRow(this.data.length - 1)) : void 0
            }, n.prototype.calcBars = function () {
                var t, e, i, n, a, r, s;
                for (r = this.data, s = [], t = n = 0, a = r.length; a > n; t = ++n) e = r[t], e._x = this.left + this.width * (t + .5) / this.data.length, s.push(e._y = function () {
                    var t, n, a, r;
                    for (a = e.y, r = [], t = 0, n = a.length; n > t; t++) i = a[t], null != i ? r.push(this.transY(i)) : r.push(null);
                    return r
                }.call(this));
                return s
            }, n.prototype.draw = function () {
                return this.options.axes && this.drawXAxis(), this.drawSeries()
            }, n.prototype.drawXAxis = function () {
                var t, e, i, n, a, r, s, o, l, h, c, u, d;
                for (h = this.bottom + this.options.padding / 2, s = null, r = null, d = [], t = c = 0, u = this.data.length; u >= 0 ? u > c : c > u; t = u >= 0 ? ++c : --c) o = this.data[this.data.length - 1 - t], e = this.drawXAxisLabel(o._x, h, o.label), l = e.getBBox(), e.transform("r" + -this.options.xLabelAngle), i = e.getBBox(), e.transform("t0," + i.height / 2 + "..."), 0 !== this.options.xLabelAngle && (a = -.5 * l.width * Math.cos(this.options.xLabelAngle * Math.PI / 180), e.transform("t" + a + ",0...")), (null == s || s >= i.x + i.width || null != r && r >= i.x) && i.x >= 0 && i.x + i.width < this.el.width() ? (0 !== this.options.xLabelAngle && (n = 1.25 * this.options.gridTextSize / Math.sin(this.options.xLabelAngle * Math.PI / 180), r = i.x - n), d.push(s = i.x - this.options.xLabelMargin)) : d.push(e.remove());
                return d
            }, n.prototype.drawSeries = function () {
                var t, e, i, n, a, r, s, o, l, h, c, u, d, f;
                return i = this.width / this.options.data.length, o = null != this.options.stacked ? 1 : this.options.ykeys.length, t = (i * this.options.barSizeRatio - this.options.barGap * (o - 1)) / o, s = i * (1 - this.options.barSizeRatio) / 2, f = this.ymin <= 0 && this.ymax >= 0 ? this.transY(0) : null, this.bars = function () {
                    var o, p, g, m;
                    for (g = this.data, m = [], n = o = 0, p = g.length; p > o; n = ++o) l = g[n], a = 0, m.push(function () {
                        var o, p, g, m;
                        for (g = l._y, m = [], h = o = 0, p = g.length; p > o; h = ++o) d = g[h], null !== d ? (f ? (u = Math.min(d, f), e = Math.max(d, f)) : (u = d, e = this.bottom), r = this.left + n * i + s, this.options.stacked || (r += h * (t + this.options.barGap)), c = e - u, this.options.stacked && (u -= a), this.drawBar(r, u, t, c, this.colorFor(l, h, "bar")), m.push(a += c)) : m.push(null);
                        return m
                    }.call(this));
                    return m
                }.call(this)
            }, n.prototype.colorFor = function (t, e, i) {
                var n, a;
                return "function" == typeof this.options.barColors ? (n = {
                    x: t.x,
                    y: t.y[e],
                    label: t.label
                }, a = {
                    index: e,
                    key: this.options.ykeys[e],
                    label: this.options.labels[e]
                }, this.options.barColors.call(this, n, a, i)) : this.options.barColors[e % this.options.barColors.length]
            }, n.prototype.hitTest = function (t) {
                return 0 === this.data.length ? null : (t = Math.max(Math.min(t, this.right), this.left), Math.min(this.data.length - 1, Math.floor((t - this.left) / (this.width / this.data.length))))
            }, n.prototype.onGridClick = function (t, e) {
                var i;
                return i = this.hitTest(t, e), this.fire("click", i, this.options.data[i], t, e)
            }, n.prototype.onHoverMove = function (t, e) {
                var i, n;
                return i = this.hitTest(t, e), (n = this.hover).update.apply(n, this.hoverContentForRow(i))
            }, n.prototype.onHoverOut = function () {
                return this.options.hideHover !== !1 ? this.hover.hide() : void 0
            }, n.prototype.hoverContentForRow = function (t) {
                var e, i, n, a, r, s, o, l;
                for (n = this.data[t], e = "<div class='morris-hover-row-label'>" + n.label + "</div>", l = n.y, i = s = 0, o = l.length; o > s; i = ++s) r = l[i], e += "<div class='morris-hover-point' style='color: " + this.colorFor(n, i, "label") + "'>\n  " + this.options.labels[i] + ":\n  " + this.yLabelFormat(r) + "\n</div>";
                return "function" == typeof this.options.hoverCallback && (e = this.options.hoverCallback(t, this.options, e)), a = this.left + (t + .5) * this.width / this.data.length, [e, a]
            }, n.prototype.drawXAxisLabel = function (t, e, i) {
                var n;
                return n = this.raphael.text(t, e, i).attr("font-size", this.options.gridTextSize).attr("font-family", this.options.gridTextFamily).attr("font-weight", this.options.gridTextWeight).attr("fill", this.options.gridTextColor)
            }, n.prototype.drawBar = function (t, e, i, n, a) {
                return this.raphael.rect(t, e, i, n).attr("fill", a).attr("stroke-width", 0)
            }, n
        }(e.Grid), e.Donut = function (i) {
            function n(i) {
                this.select = o(this.select, this), this.click = o(this.click, this);
                var n;
                if (!(this instanceof e.Donut)) return new e.Donut(i);
                if (this.el = "string" == typeof i.element ? t(document.getElementById(i.element)) : t(i.element), this.options = t.extend({}, this.defaults, i), null === this.el || 0 === this.el.length) throw new Error("Graph placeholder not found.");
                void 0 !== i.data && 0 !== i.data.length && (this.data = i.data, this.values = function () {
                    var t, e, i, a;
                    for (i = this.data, a = [], t = 0, e = i.length; e > t; t++) n = i[t], a.push(parseFloat(n.value));
                    return a
                }.call(this), this.redraw())
            }
            return s(n, i), n.prototype.defaults = {
                colors: ["#0B62A4", "#3980B5", "#679DC6", "#95BBD7", "#B0CCE1", "#095791", "#095085", "#083E67", "#052C48", "#042135"],
                backgroundColor: "#FFFFFF",
                labelColor: "#000000",
                formatter: e.commas
            }, n.prototype.redraw = function () {
                var t, i, n, a, r, s, o, l, h, c, u, d, f, p, g, m, v, b, y, x, w, _, C;
                for (this.el.empty(), this.raphael = new Raphael(this.el[0]), i = this.el.width() / 2, n = this.el.height() / 2, f = (Math.min(i, n) - 10) / 3, u = 0, x = this.values, p = 0, v = x.length; v > p; p++) d = x[p], u += d;
                for (l = 5 / (2 * f), t = 1.9999 * Math.PI - l * this.data.length, s = 0, r = 0, this.segments = [], w = this.values, a = g = 0, b = w.length; b > g; a = ++g) d = w[a], h = s + l + t * (d / u), c = new e.DonutSegment(i, n, 2 * f, f, s, h, this.options.colors[r % this.options.colors.length], this.options.backgroundColor, r, this.raphael), c.render(), this.segments.push(c), c.on("hover", this.select), c.on("click", this.click), s = h, r += 1;
                for (this.text1 = this.drawEmptyDonutLabel(i, n - 10, this.options.labelColor, 15, 800), this.text2 = this.drawEmptyDonutLabel(i, n + 10, this.options.labelColor, 14), o = Math.max.apply(null, function () {
                    var t, e, i, n;
                    for (i = this.values, n = [], t = 0, e = i.length; e > t; t++) d = i[t], n.push(d);
                    return n
                }.call(this)), r = 0, _ = this.values, C = [], m = 0, y = _.length; y > m; m++) {
                    if (d = _[m], d === o) {
                        this.select(r);
                        break
                    }
                    C.push(r += 1)
                }
                return C
            }, n.prototype.click = function (t) {
                return this.fire("click", t, this.data[t])
            }, n.prototype.select = function (t) {
                var e, i, n, a, r, s;
                for (s = this.segments, a = 0, r = s.length; r > a; a++) i = s[a], i.deselect();
                return n = this.segments[t], n.select(), e = this.data[t], this.setLabels(e.label, this.options.formatter(e.value, e))
            }, n.prototype.setLabels = function (t, e) {
                var i, n, a, r, s, o, l, h;
                return i = 2 * (Math.min(this.el.width() / 2, this.el.height() / 2) - 10) / 3, r = 1.8 * i, a = i / 2, n = i / 3, this.text1.attr({
                    text: t,
                    transform: ""
                }), s = this.text1.getBBox(), o = Math.min(r / s.width, a / s.height), this.text1.attr({
                    transform: "S" + o + "," + o + "," + (s.x + s.width / 2) + "," + (s.y + s.height)
                }), this.text2.attr({
                    text: e,
                    transform: ""
                }), l = this.text2.getBBox(), h = Math.min(r / l.width, n / l.height), this.text2.attr({
                    transform: "S" + h + "," + h + "," + (l.x + l.width / 2) + "," + l.y
                })
            }, n.prototype.drawEmptyDonutLabel = function (t, e, i, n, a) {
                var r;
                return r = this.raphael.text(t, e, "").attr("font-size", n).attr("fill", i), null != a && r.attr("font-weight", a), r
            }, n
        }(e.EventEmitter), e.DonutSegment = function (t) {
            function e(t, e, i, n, a, r, s, l, h, c) {
                this.cx = t, this.cy = e, this.inner = i, this.outer = n, this.color = s, this.backgroundColor = l, this.index = h, this.raphael = c, this.deselect = o(this.deselect, this), this.select = o(this.select, this), this.sin_p0 = Math.sin(a), this.cos_p0 = Math.cos(a), this.sin_p1 = Math.sin(r), this.cos_p1 = Math.cos(r), this.is_long = r - a > Math.PI ? 1 : 0, this.path = this.calcSegment(this.inner + 3, this.inner + this.outer - 5), this.selectedPath = this.calcSegment(this.inner + 3, this.inner + this.outer), this.hilight = this.calcArc(this.inner)
            }
            return s(e, t), e.prototype.calcArcPoints = function (t) {
                return [this.cx + t * this.sin_p0, this.cy + t * this.cos_p0, this.cx + t * this.sin_p1, this.cy + t * this.cos_p1]
            }, e.prototype.calcSegment = function (t, e) {
                var i, n, a, r, s, o, l, h, c, u;
                return c = this.calcArcPoints(t), i = c[0], a = c[1], n = c[2], r = c[3], u = this.calcArcPoints(e), s = u[0], l = u[1], o = u[2], h = u[3], "M" + i + "," + a + ("A" + t + "," + t + ",0," + this.is_long + ",0," + n + "," + r) + ("L" + o + "," + h) + ("A" + e + "," + e + ",0," + this.is_long + ",1," + s + "," + l) + "Z"
            }, e.prototype.calcArc = function (t) {
                var e, i, n, a, r;
                return r = this.calcArcPoints(t), e = r[0], n = r[1], i = r[2], a = r[3], "M" + e + "," + n + ("A" + t + "," + t + ",0," + this.is_long + ",0," + i + "," + a)
            }, e.prototype.render = function () {
                var t = this;
                return this.arc = this.drawDonutArc(this.hilight, this.color), this.seg = this.drawDonutSegment(this.path, this.color, this.backgroundColor, function () {
                    return t.fire("hover", t.index)
                }, function () {
                    return t.fire("click", t.index)
                })
            }, e.prototype.drawDonutArc = function (t, e) {
                return this.raphael.path(t).attr({
                    stroke: e,
                    "stroke-width": 2,
                    opacity: 0
                })
            }, e.prototype.drawDonutSegment = function (t, e, i, n, a) {
                return this.raphael.path(t).attr({
                    fill: e,
                    stroke: i,
                    "stroke-width": 3
                }).hover(n).click(a)
            }, e.prototype.select = function () {
                return this.selected ? void 0 : (this.seg.animate({
                    path: this.selectedPath
                }, 150, "<>"), this.arc.animate({
                    opacity: 1
                }, 150, "<>"), this.selected = !0)
            }, e.prototype.deselect = function () {
                return this.selected ? (this.seg.animate({
                    path: this.path
                }, 150, "<>"), this.arc.animate({
                    opacity: 0
                }, 150, "<>"), this.selected = !1) : void 0
            }, e
        }(e.EventEmitter)
    }.call(this),
    /**
     * JustGage - a handy JavaScript plugin for generating and animating nice & clean dashboard gauges.
     * Copyright (c) 2012 Bojan Djuricic - pindjur(at)gmail(dot)com | http://www.madcog.com
     * Licensed under MIT.
     * Date: 31/07/2012
     * @author Bojan Djuricic  (@Toorshia)
     * @version 1.0
     *
     * http://www.justgage.com
     */
    JustGage = function (t) {
        if (!t.id) return alert("Missing id parameter for gauge!"), !1;
        if (!document.getElementById(t.id)) return alert('No element with id: "' + t.id + '" found!'), !1;
        this.config = {
            id: t.id,
            title: t.title ? t.title : "Title",
            titleFontColor: t.titleFontColor ? t.titleFontColor : "#999999",
            value: t.value ? t.value : 0,
            valueFontColor: t.valueFontColor ? t.valueFontColor : "#010101",
            min: t.min ? t.min : 0,
            max: t.max ? t.max : 100,
            showMinMax: null != t.showMinMax ? t.showMinMax : !0,
            gaugeWidthScale: t.gaugeWidthScale ? t.gaugeWidthScale : 1,
            gaugeColor: t.gaugeColor ? t.gaugeColor : "#edebeb",
            label: t.label ? t.label : "",
            showInnerShadow: null != t.showInnerShadow ? t.showInnerShadow : !0,
            shadowOpacity: t.shadowOpacity ? t.shadowOpacity : .2,
            shadowSize: t.shadowSize ? t.shadowSize : 5,
            shadowVerticalOffset: t.shadowVerticalOffset ? t.shadowVerticalOffset : 3,
            levelColors: t.levelColors ? t.levelColors : percentColors,
            levelColorsGradient: null != t.levelColorsGradient ? t.levelColorsGradient : !0,
            labelFontColor: t.labelFontColor ? t.labelFontColor : "#b3b3b3",
            startAnimationTime: t.startAnimationTime ? t.startAnimationTime : 700,
            startAnimationType: t.startAnimationType ? t.startAnimationType : ">",
            refreshAnimationTime: t.refreshAnimationTime ? t.refreshAnimationTime : 700,
            refreshAnimationType: t.refreshAnimationType ? t.refreshAnimationType : ">"
        }, t.value > this.config.max && (this.config.value = this.config.max), t.value < this.config.min && (this.config.value = this.config.min), this.originalValue = t.value, this.canvas = Raphael(this.config.id, "100%", "100%");
        var e, i, n = 1 * getStyle(document.getElementById(this.config.id), "width").slice(0, -2),
            a = 1 * getStyle(document.getElementById(this.config.id), "height").slice(0, -2);
        n / a > 1.25 ? (e = 1.25 * a, i = a) : (e = n, i = n / 1.25);
        var r = (n - e) / 2,
            s = (a - i) / 2,
            o = i / 8 > 10 ? i / 10 : 10,
            l = r + e / 2,
            h = s + i / 6.5,
            c = i / 6.4 > 16 ? i / 6.4 : 16,
            u = r + e / 2,
            d = s + i / 1.4,
            f = i / 16 > 10 ? i / 16 : 10,
            p = r + e / 2,
            g = d + c / 2 + 6,
            m = i / 16 > 10 ? i / 16 : 10,
            v = r + e / 10 + e / 6.666666666666667 * this.config.gaugeWidthScale / 2,
            b = s + i / 1.126760563380282,
            y = i / 16 > 10 ? i / 16 : 10,
            x = r + e - e / 10 - e / 6.666666666666667 * this.config.gaugeWidthScale / 2,
            w = s + i / 1.126760563380282;
        this.params = {
            canvasW: n,
            canvasH: a,
            widgetW: e,
            widgetH: i,
            dx: r,
            dy: s,
            titleFontSize: o,
            titleX: l,
            titleY: h,
            valueFontSize: c,
            valueX: u,
            valueY: d,
            labelFontSize: f,
            labelX: p,
            labelY: g,
            minFontSize: m,
            minX: v,
            minY: b,
            maxFontSize: y,
            maxX: x,
            maxY: w
        }, this.canvas.customAttributes.pki = function (t, e, i, n, a, r, s, o) {
            var l, h = (1 - (t - e) / (i - e)) * Math.PI,
                c = n / 2 - n / 10,
                u = c - n / 6.666666666666667 * o,
                d = n / 2 + r,
                f = a / 1.25 + s,
                p = n / 2 + r + c * Math.cos(h),
                g = a - (a - f) + s - c * Math.sin(h),
                m = n / 2 + r + u * Math.cos(h),
                v = a - (a - f) + s - u * Math.sin(h);
            return l += "M" + (d - u) + "," + f + " ", l += "L" + (d - c) + "," + f + " ", l += "A" + c + "," + c + " 0 0,1 " + p + "," + g + " ", l += "L" + m + "," + v + " ", l += "A" + u + "," + u + " 0 0,0 " + (d - u) + "," + f + " ", l += "z ", {
                path: l
            }
        }, this.gauge = this.canvas.path().attr({
            stroke: "none",
            fill: this.config.gaugeColor,
            pki: [this.config.max, this.config.min, this.config.max, this.params.widgetW, this.params.widgetH, this.params.dx, this.params.dy, this.config.gaugeWidthScale]
        }), this.gauge.id = this.config.id + "-gauge", this.level = this.canvas.path().attr({
            stroke: "none",
            fill: getColorForPercentage((this.config.value - this.config.min) / (this.config.max - this.config.min), this.config.levelColors, this.config.levelColorsGradient),
            pki: [this.config.min, this.config.min, this.config.max, this.params.widgetW, this.params.widgetH, this.params.dx, this.params.dy, this.config.gaugeWidthScale]
        }), this.level.id = this.config.id + "-level", this.txtTitle = this.canvas.text(this.params.titleX, this.params.titleY, this.config.title), this.txtTitle.attr({
            "font-size": this.params.titleFontSize,
            "font-weight": "300",
            "font-family": "Roboto",
            fill: this.config.titleFontColor,
            "fill-opacity": "1"
        }), this.txtTitle.id = this.config.id + "-txttitle", this.txtValue = this.canvas.text(this.params.valueX, this.params.valueY, this.originalValue), this.txtValue.attr({
            "font-size": this.params.valueFontSize,
            "font-weight": "300",
            "font-family": "Roboto",
            fill: this.config.valueFontColor,
            "fill-opacity": "0"
        }), this.txtValue.id = this.config.id + "-txtvalue", this.txtLabel = this.canvas.text(this.params.labelX, this.params.labelY, this.config.label), this.txtLabel.attr({
            "font-size": this.params.labelFontSize,
            "font-weight": "normal",
            "font-family": "Roboto",
            fill: this.config.labelFontColor,
            "fill-opacity": "0"
        }), this.txtLabel.id = this.config.id + "-txtlabel", this.txtMin = this.canvas.text(this.params.minX, this.params.minY, this.config.min), this.txtMin.attr({
            "font-size": this.params.minFontSize,
            "font-weight": "normal",
            "font-family": "Roboto",
            fill: this.config.labelFontColor,
            "fill-opacity": 1 == this.config.showMinMax ? "1" : "0"
        }), this.txtMin.id = this.config.id + "-txtmin", this.txtMax = this.canvas.text(this.params.maxX, this.params.maxY, this.config.max), this.txtMax.attr({
            "font-size": this.params.maxFontSize,
            "font-weight": "normal",
            "font-family": "Roboto",
            fill: this.config.labelFontColor,
            "fill-opacity": 1 == this.config.showMinMax ? "1" : "0"
        }), this.txtMax.id = this.config.id + "-txtmax";
        var _ = this.canvas.canvas.childNodes[1],
            C = "http://www.w3.org/2000/svg";
        9 > ie ? onCreateElementNsReady(function () {
            this.generateShadow()
        }) : this.generateShadow(C, _), this.level.animate({
            pki: [this.config.value, this.config.min, this.config.max, this.params.widgetW, this.params.widgetH, this.params.dx, this.params.dy, this.config.gaugeWidthScale]
        }, this.config.startAnimationTime, this.config.startAnimationType), this.txtValue.animate({
            "fill-opacity": "1"
        }, this.config.startAnimationTime, this.config.startAnimationType), this.txtLabel.animate({
            "fill-opacity": "1"
        }, this.config.startAnimationTime, this.config.startAnimationType)
    }, JustGage.prototype.refresh = function (t) {
        originalVal = t, t > this.config.max && (t = this.config.max), t < this.config.min && (t = this.config.min);
        var e = getColorForPercentage((t - this.config.min) / (this.config.max - this.config.min), this.config.levelColors, this.config.levelColorsGradient);
        this.canvas.getById(this.config.id + "-txtvalue").attr({
            text: originalVal
        }), this.canvas.getById(this.config.id + "-level").animate({
            pki: [t, this.config.min, this.config.max, this.params.widgetW, this.params.widgetH, this.params.dx, this.params.dy, this.config.gaugeWidthScale],
            fill: e
        }, this.config.refreshAnimationTime, this.config.refreshAnimationType)
    };
var percentColors = ["#a9d70b", "#f9c802", "#ff0000"];
JustGage.prototype.generateShadow = function (t, e) {
    var i = document.createElementNS(t, "filter");
    i.setAttribute("id", this.config.id + "-inner-shadow"), e.appendChild(i);
    var n = document.createElementNS(t, "feOffset");
    n.setAttribute("dx", 0), n.setAttribute("dy", this.config.shadowVerticalOffset), i.appendChild(n);
    var a = document.createElementNS(t, "feGaussianBlur");
    a.setAttribute("result", "offset-blur"), a.setAttribute("stdDeviation", this.config.shadowSize), i.appendChild(a);
    var r = document.createElementNS(t, "feComposite");
    r.setAttribute("operator", "out"), r.setAttribute("in", "SourceGraphic"), r.setAttribute("in2", "offset-blur"), r.setAttribute("result", "inverse"), i.appendChild(r);
    var s = document.createElementNS(t, "feFlood");
    s.setAttribute("flood-color", "black"), s.setAttribute("flood-opacity", this.config.shadowOpacity), s.setAttribute("result", "color"), i.appendChild(s);
    var o = document.createElementNS(t, "feComposite");
    o.setAttribute("operator", "in"), o.setAttribute("in", "color"), o.setAttribute("in2", "inverse"), o.setAttribute("result", "shadow"), i.appendChild(o);
    var l = document.createElementNS(t, "feComposite");
    l.setAttribute("operator", "over"), l.setAttribute("in", "shadow"), l.setAttribute("in2", "SourceGraphic"), i.appendChild(l), 1 == this.config.showInnerShadow && (this.canvas.canvas.childNodes[2].setAttribute("filter", "url(#" + this.config.id + "-inner-shadow)"), this.canvas.canvas.childNodes[3].setAttribute("filter", "url(#" + this.config.id + "-inner-shadow)"))
};
var getColorForPercentage = function (t, e, i) {
        var n = e.length;
        if (1 === n) return e[0];
        for (var a = i ? 1 / (n - 1) : 1 / n, r = new Array, s = 0; s < e.length; s++) {
            var o = i ? a * s : a * (s + 1),
                l = parseInt(cutHex(e[s]).substring(0, 2), 16),
                h = parseInt(cutHex(e[s]).substring(2, 4), 16),
                c = parseInt(cutHex(e[s]).substring(4, 6), 16);
            r[s] = {
                pct: o,
                color: {
                    r: l,
                    g: h,
                    b: c
                }
            }
        }
        if (0 == t) return "rgb(" + [r[0].color.r, r[0].color.g, r[0].color.b].join(",") + ")";
        for (var s = 0; s < r.length; s++)
            if (t <= r[s].pct) {
                if (1 == i) {
                    var u = r[s - 1],
                        d = r[s],
                        f = d.pct - u.pct,
                        p = (t - u.pct) / f,
                        g = 1 - p,
                        m = p,
                        v = {
                            r: Math.floor(u.color.r * g + d.color.r * m),
                            g: Math.floor(u.color.g * g + d.color.g * m),
                            b: Math.floor(u.color.b * g + d.color.b * m)
                        };
                    return "rgb(" + [v.r, v.g, v.b].join(",") + ")"
                }
                return "rgb(" + [r[s].color.r, r[s].color.g, r[s].color.b].join(",") + ")"
            }
    },
    ie = function () {
        for (var t, e = 3, i = document.createElement("div"), n = i.getElementsByTagName("i"); i.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->", n[0];);
        return e > 4 ? e : t
    }();
/*
  Masked Input plugin for jQuery
  Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
  Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
  Version: 1.3.1
*/
! function (t) {
    function e() {
        var t = document.createElement("input"),
            e = "onpaste";
        return t.setAttribute(e, ""), "function" == typeof t[e] ? "paste" : "input"
    }
    var i, n = e() + ".mask",
        a = navigator.userAgent,
        r = /iphone/i.test(a),
        s = /android/i.test(a);
    t.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        dataName: "rawMaskFn",
        placeholder: "_"
    }, t.fn.extend({
        caret: function (t, e) {
            var i;
            return 0 === this.length || this.is(":hidden") ? void 0 : "number" == typeof t ? (e = "number" == typeof e ? e : t, this.each(function () {
                this.setSelectionRange ? this.setSelectionRange(t, e) : this.createTextRange && (i = this.createTextRange(), i.collapse(!0), i.moveEnd("character", e), i.moveStart("character", t), i.select())
            })) : (this[0].setSelectionRange ? (t = this[0].selectionStart, e = this[0].selectionEnd) : document.selection && document.selection.createRange && (i = document.selection.createRange(), t = 0 - i.duplicate().moveStart("character", -1e5), e = t + i.text.length), {
                begin: t,
                end: e
            })
        },
        unmask: function () {
            return this.trigger("unmask")
        },
        mask: function (e, a) {
            var o, l, h, c, u, d;
            return !e && this.length > 0 ? (o = t(this[0]), o.data(t.mask.dataName)()) : (a = t.extend({
                placeholder: t.mask.placeholder,
                completed: null
            }, a), l = t.mask.definitions, h = [], c = d = e.length, u = null, t.each(e.split(""), function (t, e) {
                "?" == e ? (d--, c = t) : l[e] ? (h.push(RegExp(l[e])), null === u && (u = h.length - 1)) : h.push(null)
            }), this.trigger("unmask").each(function () {
                function o(t) {
                    for (; d > ++t && !h[t];);
                    return t
                }

                function f(t) {
                    for (; --t >= 0 && !h[t];);
                    return t
                }

                function p(t, e) {
                    var i, n;
                    if (!(0 > t)) {
                        for (i = t, n = o(e); d > i; i++)
                            if (h[i]) {
                                if (!(d > n && h[i].test(_[n]))) break;
                                _[i] = _[n], _[n] = a.placeholder, n = o(n)
                            }
                        y(), w.caret(Math.max(u, t))
                    }
                }

                function g(t) {
                    var e, i, n, r;
                    for (e = t, i = a.placeholder; d > e; e++)
                        if (h[e]) {
                            if (n = o(e), r = _[e], _[e] = i, !(d > n && h[n].test(r))) break;
                            i = r
                        }
                }

                function m(t) {
                    var e, i, n, a = t.which;
                    8 === a || 46 === a || r && 127 === a ? (e = w.caret(), i = e.begin, n = e.end, 0 === n - i && (i = 46 !== a ? f(i) : n = o(i - 1), n = 46 === a ? o(n) : n), b(i, n), p(i, n - 1), t.preventDefault()) : 27 == a && (w.val(C), w.caret(0, x()), t.preventDefault())
                }

                function v(e) {
                    var i, n, r, l = e.which,
                        c = w.caret();
                    e.ctrlKey || e.altKey || e.metaKey || 32 > l || l && (0 !== c.end - c.begin && (b(c.begin, c.end), p(c.begin, c.end - 1)), i = o(c.begin - 1), d > i && (n = String.fromCharCode(l), h[i].test(n) && (g(i), _[i] = n, y(), r = o(i), s ? setTimeout(t.proxy(t.fn.caret, w, r), 0) : w.caret(r), a.completed && r >= d && a.completed.call(w))), e.preventDefault())
                }

                function b(t, e) {
                    var i;
                    for (i = t; e > i && d > i; i++) h[i] && (_[i] = a.placeholder)
                }

                function y() {
                    w.val(_.join(""))
                }

                function x(t) {
                    var e, i, n = w.val(),
                        r = -1;
                    for (e = 0, pos = 0; d > e; e++)
                        if (h[e]) {
                            for (_[e] = a.placeholder; pos++ < n.length;)
                                if (i = n.charAt(pos - 1), h[e].test(i)) {
                                    _[e] = i, r = e;
                                    break
                                }
                            if (pos > n.length) break
                        } else _[e] === n.charAt(pos) && e !== c && (pos++, r = e);
                    return t ? y() : c > r + 1 ? (w.val(""), b(0, d)) : (y(), w.val(w.val().substring(0, r + 1))), c ? e : u
                }
                var w = t(this),
                    _ = t.map(e.split(""), function (t) {
                        return "?" != t ? l[t] ? a.placeholder : t : void 0
                    }),
                    C = w.val();
                w.data(t.mask.dataName, function () {
                    return t.map(_, function (t, e) {
                        return h[e] && t != a.placeholder ? t : null
                    }).join("")
                }), w.attr("readonly") || w.one("unmask", function () {
                    w.unbind(".mask").removeData(t.mask.dataName)
                }).bind("focus.mask", function () {
                    clearTimeout(i);
                    var t;
                    C = w.val(), t = x(), i = setTimeout(function () {
                        y(), t == e.length ? w.caret(0, t) : w.caret(t)
                    }, 10)
                }).bind("blur.mask", function () {
                    x(), w.val() != C && w.change()
                }).bind("keydown.mask", m).bind("keypress.mask", v).bind(n, function () {
                    setTimeout(function () {
                        var t = x(!0);
                        w.caret(t), a.completed && t == w.val().length && a.completed.call(w)
                    }, 0)
                }), x()
            }))
        }
    })
}(jQuery),
function (t) {
    t.browser || (t.browser = {}, t.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase()), t.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase()), t.browser.opera = /opera/.test(navigator.userAgent.toLowerCase()), t.browser.msie = /msie/.test(navigator.userAgent.toLowerCase()));
    var e = {
        destroy: function () {
            var e = t(this);
            return e.unbind(".maskMoney"), t.browser.msie && (this.onpaste = null), this
        },
        mask: function () {
            return this.trigger("mask")
        },
        init: function (e) {
            return e = t.extend({
                symbol: "",
                symbolStay: !1,
                thousands: ",",
                decimal: ".",
                precision: 2,
                defaultZero: !0,
                allowZero: !1,
                allowNegative: !1
            }, e), this.each(function () {
                function i() {
                    y = !0
                }

                function n() {
                    y = !1
                }

                function a(e) {
                    e = e || window.event;
                    var a = e.which || e.charCode || e.keyCode;
                    if (void 0 == a) return !1;
                    if (48 > a || a > 57) return 45 == a ? (i(), b.val(g(b)), !1) : 43 == a ? (i(), b.val(b.val().replace("-", "")), !1) : 13 == a || 9 == a ? (y && (n(), t(this).change()), !0) : !t.browser.mozilla || 37 != a && 39 != a || 0 != e.charCode ? (h(e), !0) : !0;
                    if (r(b)) return !1;
                    h(e);
                    var s = String.fromCharCode(a),
                        o = b.get(0),
                        l = v(o),
                        u = l.start,
                        d = l.end;
                    return o.value = o.value.substring(0, u) + s + o.value.substring(d, o.value.length), c(o, u + 1), i(), !1
                }

                function r(t) {
                    var e = t.val().length >= t.attr("maxlength") && t.attr("maxlength") >= 0,
                        i = v(t.get(0)),
                        n = i.start,
                        a = i.end,
                        r = i.start != i.end && t.val().substring(n, a).match(/\d/) ? !0 : !1;
                    return e && !r
                }

                function s(e) {
                    e = e || window.event;
                    var a = e.which || e.charCode || e.keyCode;
                    if (void 0 == a) return !1;
                    var r = b.get(0),
                        s = v(r),
                        o = s.start,
                        l = s.end;
                    return 8 == a ? (h(e), o == l ? (r.value = r.value.substring(0, o - 1) + r.value.substring(l, r.value.length), o -= 1) : r.value = r.value.substring(0, o) + r.value.substring(l, r.value.length), c(r, o), i(), !1) : 9 == a ? (y && (t(this).change(), n()), !0) : 46 == a || 63272 == a ? (h(e), r.value = r.selectionStart == r.selectionEnd ? r.value.substring(0, o) + r.value.substring(l + 1, r.value.length) : r.value.substring(0, o) + r.value.substring(l, r.value.length), c(r, o), i(), !1) : !0
                }

                function o() {
                    var t = f();
                    if (b.val() == t ? b.val("") : "" == b.val() && e.defaultZero ? b.val(p(t)) : b.val(p(b.val())), this.createTextRange) {
                        var i = this.createTextRange();
                        i.collapse(!1), i.select()
                    }
                }

                function l(i) {
                    t.browser.msie && a(i), "" == b.val() || b.val() == p(f()) || b.val() == e.symbol ? e.allowZero ? e.symbolStay ? b.val(p(f())) : b.val(f()) : b.val("") : e.symbolStay ? e.symbolStay && b.val() == e.symbol && b.val(p(f())) : b.val(b.val().replace(e.symbol, ""))
                }

                function h(t) {
                    t.preventDefault ? t.preventDefault() : t.returnValue = !1
                }

                function c(t, e) {
                    var i = b.val().length;
                    b.val(d(t.value));
                    var n = b.val().length;
                    e -= i - n, m(b, e)
                }

                function u() {
                    var t = b.val();
                    b.val(d(t))
                }

                function d(t) {
                    t = t.replace(e.symbol, "");
                    var i = "0123456789",
                        n = t.length,
                        a = "",
                        r = "",
                        s = "";
                    if (0 != n && "-" == t.charAt(0) && (t = t.replace("-", ""), e.allowNegative && (s = "-")), 0 == n) {
                        if (!e.defaultZero) return r;
                        r = "0.00"
                    }
                    for (var o = 0; n > o && ("0" == t.charAt(o) || t.charAt(o) == e.decimal); o++);
                    for (; n > o; o++) - 1 != i.indexOf(t.charAt(o)) && (a += t.charAt(o));
                    var l = parseFloat(a);
                    l = isNaN(l) ? 0 : l / Math.pow(10, e.precision), r = l.toFixed(e.precision), o = 0 == e.precision ? 0 : 1;
                    var h, c = (r = r.split("."))[o].substr(0, e.precision);
                    for (h = (r = r[0]).length;
                        (h -= 3) >= 1;) r = r.substr(0, h) + e.thousands + r.substr(h);
                    return e.precision > 0 ? p(s + r + e.decimal + c + Array(e.precision + 1 - c.length).join(0)) : p(s + r)
                }

                function f() {
                    var t = parseFloat("0") / Math.pow(10, e.precision);
                    return t.toFixed(e.precision).replace(new RegExp("\\.", "g"), e.decimal)
                }

                function p(t) {
                    if ("" != e.symbol) {
                        var i = "";
                        0 != t.length && "-" == t.charAt(0) && (t = t.replace("-", ""), i = "-"), t.substr(0, e.symbol.length) != e.symbol && (t = i + e.symbol + t)
                    }
                    return t
                }

                function g(t) {
                    var i = t.val();
                    return e.allowNegative ? "" != i && "-" == i.charAt(0) ? i.replace("-", "") : "-" + i : i
                }

                function m(e, i) {
                    return t(e).each(function (t, e) {
                        if (e.setSelectionRange) e.focus(), e.setSelectionRange(i, i);
                        else if (e.createTextRange) {
                            var n = e.createTextRange();
                            n.collapse(!0), n.moveEnd("character", i), n.moveStart("character", i), n.select()
                        }
                    }), this
                }

                function v(t) {
                    var e, i, n, a, r, s = 0,
                        o = 0;
                    return "number" == typeof t.selectionStart && "number" == typeof t.selectionEnd ? (s = t.selectionStart, o = t.selectionEnd) : (i = document.selection.createRange(), i && i.parentElement() == t && (a = t.value.length, e = t.value.replace(/\r\n/g, "\n"), n = t.createTextRange(), n.moveToBookmark(i.getBookmark()), r = t.createTextRange(), r.collapse(!1), n.compareEndPoints("StartToEnd", r) > -1 ? s = o = a : (s = -n.moveStart("character", -a), s += e.slice(0, s).split("\n").length - 1, n.compareEndPoints("EndToEnd", r) > -1 ? o = a : (o = -n.moveEnd("character", -a), o += e.slice(0, o).split("\n").length - 1)))), {
                        start: s,
                        end: o
                    }
                }
                var b = t(this),
                    y = !1;
                b.unbind(".maskMoney"), b.bind("keypress.maskMoney", a), b.bind("keydown.maskMoney", s), b.bind("blur.maskMoney", l), b.bind("focus.maskMoney", o), b.bind("mask.maskMoney", u)
            })
        }
    };
    t.fn.maskMoney = function (i) {
        return e[i] ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? (t.error("Method " + i + " does not exist on jQuery.maskMoney"), void 0) : e.init.apply(this, arguments)
    }
}(window.jQuery || window.Zepto),
function (t) {
    "use strict";
    var e = navigator.appVersion.indexOf("Mac") > -1,
        i = navigator.userAgent.indexOf("MSIE") > -1,
        n = navigator.userAgent.indexOf("Firefox") > -1,
        a = function () {
            var t = function (t) {
                    return function (e) {
                        return t === e
                    }
                },
                e = function (t, e) {
                    return t === e
                },
                i = function () {
                    return !1
                },
                n = function (t) {
                    return function () {
                        return !t.apply(t, arguments)
                    }
                },
                a = function (t) {
                    return t
                };
            return {
                eq: t,
                eq2: e,
                fail: i,
                not: n,
                self: a
            }
        }(),
        r = function () {
            var t = function (t) {
                    return t[0]
                },
                e = function (t) {
                    return t[t.length - 1]
                },
                i = function (t) {
                    return t.slice(0, t.length - 1)
                },
                n = function (t) {
                    return t.slice(1)
                },
                r = function (t, e) {
                    return e = e || a.self, t.reduce(function (t, i) {
                        return t + e(i)
                    }, 0)
                },
                s = function (t) {
                    for (var e = [], i = -1, n = t.length; ++i < n;) e[i] = t[i];
                    return e
                },
                o = function (i, a) {
                    if (0 === i.length) return [];
                    var r = n(i);
                    return r.reduce(function (t, i) {
                        var n = e(t);
                        return a(e(n), i) ? n[n.length] = i : t[t.length] = [i], t
                    }, [
                        [t(i)]
                    ])
                },
                l = function (t) {
                    for (var e = [], i = 0, n = t.length; n > i; i++) t[i] && e.push(t[i]);
                    return e
                };
            return {
                head: t,
                last: e,
                initial: i,
                tail: n,
                sum: r,
                from: s,
                compact: l,
                clusterBy: o
            }
        }(),
        s = function () {
            var e = function (t) {
                    return function (e) {
                        return e && e.nodeName === t
                    }
                },
                i = function (t) {
                    return t && /^P|^LI|^H[1-7]/.test(t.nodeName)
                },
                n = function (t) {
                    return t && /^UL|^OL/.test(t.nodeName)
                },
                o = function (e) {
                    return e && t(e).hasClass("note-editable")
                },
                l = function (e) {
                    return e && t(e).hasClass("note-control-sizing")
                },
                h = function (t, e) {
                    for (; t;) {
                        if (e(t)) return t;
                        t = t.parentNode
                    }
                    return null
                },
                c = function (t, e) {
                    e = e || a.fail;
                    var i = [];
                    return h(t, function (t) {
                        return i.push(t), e(t)
                    }), i
                },
                u = function (e, i) {
                    for (var n = c(e), a = i; a; a = a.parentNode)
                        if (t.inArray(a, n) > -1) return a;
                    return null
                },
                d = function (t, e) {
                    var i = [],
                        n = !1,
                        a = !1,
                        r = function (s) {
                            if (s) {
                                if (s === t && (n = !0), n && !a && i.push(s), s === e) return a = !0, void 0;
                                for (var o = 0, l = s.childNodes.length; l > o; o++) r(s.childNodes[o])
                            }
                        };
                    return r(u(t, e)), i
                },
                f = function (t, e) {
                    e = e || a.fail;
                    for (var i = []; t && (i.push(t), !e(t));) t = t.previousSibling;
                    return i
                },
                p = function (t, e) {
                    e = e || a.fail;
                    for (var i = []; t && (i.push(t), !e(t));) t = t.nextSibling;
                    return i
                },
                g = function (t, e) {
                    var i = e.nextSibling,
                        n = e.parentNode;
                    return i ? n.insertBefore(t, i) : n.appendChild(t), t
                },
                m = function (e, i) {
                    return t.each(i, function (t, i) {
                        e.appendChild(i)
                    }), e
                },
                v = e("#text"),
                b = function (t) {
                    return v(t) ? t.nodeValue.length : t.childNodes.length
                },
                y = function (t) {
                    for (var e = 0; t = t.previousSibling;) e += 1;
                    return e
                },
                x = function (e, i) {
                    var n = r.initial(c(i, a.eq(e)));
                    return t.map(n, y).reverse()
                },
                w = function (t, e) {
                    for (var i = t, n = 0, a = e.length; a > n; n++) i = i.childNodes[e[n]];
                    return i
                },
                _ = function (t, e) {
                    if (0 === e) return t;
                    if (e >= b(t)) return t.nextSibling;
                    if (v(t)) return t.splitText(e);
                    var i = t.childNodes[e];
                    return t = g(t.cloneNode(!1), t), m(t, p(i))
                },
                C = function (t, e, i) {
                    var n = c(e, a.eq(t));
                    return 1 === n.length ? _(e, i) : n.reduce(function (t, n) {
                        var a = n.cloneNode(!1);
                        return g(a, n), t === e && (t = _(t, i)), m(a, p(t)), a
                    })
                },
                k = function (t, e) {
                    if (t && t.parentNode) {
                        if (t.removeNode) return t.removeNode(e);
                        var i = t.parentNode;
                        if (!e) {
                            for (var n = [], a = 0, r = t.childNodes.length; r > a; a++) n.push(t.childNodes[a]);
                            for (var a = 0, r = n.length; r > a; a++) i.insertBefore(n[a], t)
                        }
                        i.removeChild(t)
                    }
                },
                S = function (e) {
                    return t("<div/>").html(e).text()
                },
                D = function (t) {
                    return s.isTextarea(t[0]) ? S(t.val()) : t.html()
                };
            return {
                isText: v,
                isPara: i,
                isList: n,
                isEditable: o,
                isControlSizing: l,
                isAnchor: e("A"),
                isDiv: e("DIV"),
                isSpan: e("SPAN"),
                isB: e("B"),
                isU: e("U"),
                isS: e("S"),
                isI: e("I"),
                isImg: e("IMG"),
                isTextarea: e("TEXTAREA"),
                ancestor: h,
                listAncestor: c,
                listNext: p,
                listPrev: f,
                commonAncestor: u,
                listBetween: d,
                insertAfter: g,
                position: y,
                makeOffsetPath: x,
                fromOffsetPath: w,
                split: C,
                remove: k,
                html: D
            }
        }(),
        o = function () {
            var e = !!document.createRange,
                i = function (t, e) {
                    var i, n, a = t.parentElement(),
                        o = document.body.createTextRange(),
                        l = r.from(a.childNodes);
                    for (i = 0; i < l.length; i++)
                        if (!s.isText(l[i])) {
                            if (o.moveToElementText(l[i]), o.compareEndPoints("StartToStart", t) >= 0) break;
                            n = l[i]
                        }
                    if (0 != i && s.isText(l[i - 1])) {
                        var h = document.body.createTextRange(),
                            c = null;
                        h.moveToElementText(n || a), h.collapse(!n), c = n ? n.nextSibling : a.firstChild;
                        var u = t.duplicate();
                        u.setEndPoint("StartToStart", h);
                        for (var d = u.text.replace(/[\r\n]/g, "").length; d > c.nodeValue.length && c.nextSibling;) d -= c.nodeValue.length, c = c.nextSibling;
                        c.nodeValue, e && c.nextSibling && s.isText(c.nextSibling) && d == c.nodeValue.length && (d -= c.nodeValue.length, c = c.nextSibling), a = c, i = d
                    }
                    return {
                        cont: a,
                        offset: i
                    }
                },
                n = function (t) {
                    var e = function (t, i) {
                            var n, o;
                            if (s.isText(t)) {
                                var l = s.listPrev(t, a.not(s.isText)),
                                    h = r.last(l).previousSibling;
                                n = h || t.parentNode, i += r.sum(r.tail(l), s.length), o = !h
                            } else {
                                if (n = t.childNodes[i] || t, s.isText(n)) return e(n, i);
                                i = 0, o = !1
                            }
                            return {
                                cont: n,
                                collapseToStart: o,
                                offset: i
                            }
                        },
                        i = document.body.createTextRange(),
                        n = e(t.cont, t.offset);
                    return i.moveToElementText(n.cont), i.collapse(n.collapseToStart), i.moveStart("character", n.offset), i
                },
                o = function (i, o, l, h) {
                    this.sc = i, this.so = o, this.ec = l, this.eo = h;
                    var c = function () {
                        if (e) {
                            var t = document.createRange();
                            return t.setStart(i, o), t.setEnd(l, h), t
                        }
                        var a = n({
                            cont: i,
                            offset: o
                        });
                        return a.setEndPoint("EndToEnd", n({
                            cont: l,
                            offset: h
                        })), a
                    };
                    this.select = function () {
                        var t = c();
                        if (e) {
                            var i = document.getSelection();
                            i.rangeCount > 0 && i.removeAllRanges(), i.addRange(t)
                        } else t.select()
                    }, this.listPara = function () {
                        var e = s.listBetween(i, l),
                            n = r.compact(t.map(e, function (t) {
                                return s.ancestor(t, s.isPara)
                            }));
                        return t.map(r.clusterBy(n, a.eq2), r.head)
                    };
                    var u = function (t) {
                        return function () {
                            var e = s.ancestor(i, t);
                            return e && e === s.ancestor(l, t)
                        }
                    };
                    this.isOnEditable = u(s.isEditable), this.isOnList = u(s.isList), this.isOnAnchor = u(s.isAnchor), this.isCollapsed = function () {
                        return i === l && o === h
                    }, this.insertNode = function (t) {
                        var i = c();
                        e ? i.insertNode(t) : i.pasteHTML(t.outerHTML)
                    }, this.toString = function () {
                        var t = c();
                        return e ? t.toString() : t.text
                    }, this.bookmark = function (t) {
                        return {
                            s: {
                                path: s.makeOffsetPath(t, i),
                                offset: o
                            },
                            e: {
                                path: s.makeOffsetPath(t, l),
                                offset: h
                            }
                        }
                    }
                };
            return {
                create: function (t, n, a, r) {
                    if (0 === arguments.length)
                        if (e) {
                            var s = document.getSelection().getRangeAt(0);
                            t = s.startContainer, n = s.startOffset, a = s.endContainer, r = s.endOffset
                        } else {
                            var l = document.selection.createRange(),
                                h = l.duplicate();
                            h.collapse(!1);
                            var c = l;
                            c.collapse(!0);
                            var u = i(c, !0),
                                d = i(h, !1);
                            t = u.cont, n = u.offset, a = d.cont, r = d.offset
                        } else 2 === arguments.length && (a = t, r = n);
                    return new o(t, n, a, r)
                },
                createFromBookmark: function (t, e) {
                    var i = s.fromOffsetPath(t, e.s.path),
                        n = e.s.offset,
                        a = s.fromOffsetPath(t, e.e.path),
                        r = e.e.offset;
                    return new o(i, n, a, r)
                }
            }
        }(),
        l = function () {
            this.stylePara = function (e, i) {
                var n = e.listPara();
                t.each(n, function (e, n) {
                    t.each(i, function (t, e) {
                        n.style[t] = e
                    })
                })
            }, this.current = function (e, i) {
                var n = t(s.isText(e.sc) ? e.sc.parentNode : e.sc),
                    a = n.css(["font-size", "text-align", "list-style-type", "line-height"]) || {};
                if (a["font-size"] = parseInt(a["font-size"]), a["font-bold"] = document.queryCommandState("bold") ? "bold" : "normal", a["font-italic"] = document.queryCommandState("italic") ? "italic" : "normal", a["font-underline"] = document.queryCommandState("underline") ? "underline" : "normal", e.isOnList()) {
                    var r = ["circle", "disc", "disc-leading-zero", "square"],
                        o = t.inArray(a["list-style-type"], r) > -1;
                    a["list-style"] = o ? "unordered" : "ordered"
                } else a["list-style"] = "none";
                var l = s.ancestor(e.sc, s.isPara);
                if (l && l.style["line-height"]) a["line-height"] = l.style.lineHeight;
                else {
                    var h = parseInt(a["line-height"]) / parseInt(a["font-size"]);
                    a["line-height"] = h.toFixed(1)
                }
                return a.image = s.isImg(i) && i, a.anchor = e.isOnAnchor() && s.ancestor(e.sc, s.isAnchor), a.aAncestor = s.listAncestor(e.sc, s.isEditable), a
            }
        },
        h = function () {
            var t = [],
                e = [],
                i = function (t) {
                    var e = t[0],
                        i = o.create();
                    return {
                        contents: t.html(),
                        bookmark: i.bookmark(e),
                        scrollTop: t.scrollTop()
                    }
                },
                n = function (t, e) {
                    t.html(e.contents).scrollTop(e.scrollTop), o.createFromBookmark(t[0], e.bookmark).select()
                };
            this.undo = function (a) {
                var r = i(a);
                0 !== t.length && (n(a, t.pop()), e.push(r))
            }, this.redo = function (a) {
                var r = i(a);
                0 !== e.length && (n(a, e.pop()), t.push(r))
            }, this.recordUndo = function (n) {
                e = [], t.push(i(n))
            }
        },
        c = function () {
            var e = new l;
            this.currentStyle = function (t) {
                var i = o.create();
                return i.isOnEditable() && e.current(i, t)
            }, this.tab = function (e) {
                a(e);
                var i = o.create(),
                    n = new Array(e.data("tabsize") + 1).join("&nbsp;");
                i.insertNode(t('<span id="noteTab">' + n + "</span>")[0]);
                var r = t("#noteTab").removeAttr("id");
                i = o.create(r[0], 1), i.select(), s.remove(r[0])
            }, this.undo = function (t) {
                t.data("NoteHistory").undo(t)
            }, this.redo = function (t) {
                t.data("NoteHistory").redo(t)
            };
            for (var a = this.recordUndo = function (t) {
                t.data("NoteHistory").recordUndo(t)
            }, r = ["bold", "italic", "underline", "strikethrough", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "insertOrderedList", "insertUnorderedList", "indent", "outdent", "formatBlock", "removeFormat", "backColor", "foreColor", "insertImage", "insertHorizontalRule"], h = 0, c = r.length; c > h; h++) this[r[h]] = function (t) {
                return function (e, i) {
                    a(e), document.execCommand(t, !1, i)
                }
            }(r[h]);
            this.formatBlock = function (t, e) {
                a(t), e = i ? "<" + e + ">" : e, document.execCommand("FormatBlock", !1, e)
            }, this.fontSize = function (t, e) {
                a(t), document.execCommand("fontSize", !1, 3), n ? t.find("font[size=3]").removeAttr("size").css("font-size", e + "px") : t.find("span").filter(function () {
                    return "medium" == this.style.fontSize
                }).css("font-size", e + "px")
            }, this.lineHeight = function (t, i) {
                a(t), e.stylePara(o.create(), {
                    lineHeight: i
                })
            }, this.unlink = function (t) {
                var e = o.create();
                if (e.isOnAnchor()) {
                    a(t);
                    var i = s.ancestor(e.sc, s.isAnchor);
                    e = o.create(i, 0, i, 1), e.select(), document.execCommand("unlink")
                }
            }, this.setLinkDialog = function (e, n) {
                var r = o.create();
                if (r.isOnAnchor()) {
                    var l = s.ancestor(r.sc, s.isAnchor);
                    r = o.create(l, 0, l, 1)
                }
                n({
                    range: r,
                    text: r.toString(),
                    url: r.isOnAnchor() ? s.ancestor(r.sc, s.isAnchor).href : ""
                }, function (n) {
                    r.select(), a(e);
                    var s = -1 !== n.toLowerCase().indexOf("://"),
                        l = s ? n : "http://" + n;
                    if (i && r.isCollapsed()) {
                        r.insertNode(t('<A id="linkAnchor">' + n + "</A>")[0]);
                        var h = t("#linkAnchor").removeAttr("id").attr("href", l);
                        r = o.create(h[0], 0, h[0], 1), r.select()
                    } else document.execCommand("createlink", !1, l)
                })
            }, this.setImageDialog = function (e, i) {
                var n = o.create();
                i(function (i) {
                    n.select(), a(e);
                    var r = -1 !== i.toLowerCase().indexOf("://"),
                        s = r ? i : "http://" + i,
                        o = '<img src="' + s + '"/>';
                    n.insertNode(t(o)[0])
                })
            }, this.color = function (t, e) {
                var i = JSON.parse(e),
                    n = i.foreColor,
                    r = i.backColor;
                a(t), n && document.execCommand("foreColor", !1, n), r && document.execCommand("backColor", !1, r)
            }, this.insertTable = function (e, n) {
                a(e);
                for (var r, s = n.split("x"), l = s[0], h = s[1], c = [], u = i ? "&nbsp;" : "<br/>", d = 0; l > d; d++) c.push("<td>" + u + "</td>");
                r = c.join("");
                for (var f, p = [], g = 0; h > g; g++) p.push("<tr>" + r + "</tr>");
                f = p.join("");
                var m = '<table class="table table-bordered">' + f + "</table>";
                o.create().insertNode(t(m)[0])
            }, this.float = function (t, e, i) {
                a(t), i.style.cssFloat = e
            }, this.resize = function (t, e, i) {
                a(t), i.style.width = t.width() * e + "px", i.style.height = ""
            }, this.resizeTo = function (t, e) {
                var i = t.y / t.x,
                    n = e.data("ratio");
                e.css({
                    width: n > i ? t.x : t.y / n,
                    height: n > i ? t.x * n : t.y
                })
            }
        },
        u = function () {
            this.update = function (e, i) {
                var n = function (e, i) {
                        e.find(".dropdown-menu li a").each(function () {
                            var e = t(this).attr("data-value") == i;
                            this.className = e ? "checked" : ""
                        })
                    },
                    a = e.find(".note-fontsize");
                a.find(".note-current-fontsize").html(i["font-size"]), n(a, parseFloat(i["font-size"]));
                var r = e.find(".note-height");
                n(r, parseFloat(i["line-height"]));
                var s = function (t, i) {
                    var n = e.find(t);
                    n[i() ? "addClass" : "removeClass"]("active")
                };
                s('button[data-event="bold"]', function () {
                    return "bold" === i["font-bold"]
                }), s('button[data-event="italic"]', function () {
                    return "italic" === i["font-italic"]
                }), s('button[data-event="underline"]', function () {
                    return "underline" === i["font-underline"]
                }), s('button[data-event="justifyLeft"]', function () {
                    return "left" === i["text-align"] || "start" === i["text-align"]
                }), s('button[data-event="justifyCenter"]', function () {
                    return "center" === i["text-align"]
                }), s('button[data-event="justifyRight"]', function () {
                    return "right" === i["text-align"]
                }), s('button[data-event="justifyFull"]', function () {
                    return "justify" === i["text-align"]
                }), s('button[data-event="insertUnorderedList"]', function () {
                    return "unordered" === i["list-style"]
                }), s('button[data-event="insertOrderedList"]', function () {
                    return "ordered" === i["list-style"]
                })
            }, this.updateRecentColor = function (e, i, n) {
                var a = t(e).closest(".note-color"),
                    r = a.find(".note-recent-color"),
                    s = JSON.parse(r.attr("data-value"));
                s[i] = n, r.attr("data-value", JSON.stringify(s));
                var o = "backColor" === i ? "background-color" : "color";
                r.find("i").css(o, n)
            }, this.updateFullscreen = function (t, e) {
                var i = t.find('button[data-event="fullscreen"]');
                i[e ? "addClass" : "removeClass"]("active")
            }, this.updateCodeview = function (t, e) {
                var i = t.find('button[data-event="codeview"]');
                i[e ? "addClass" : "removeClass"]("active")
            }, this.enable = function (t) {
                t.find("button").not('button[data-event="codeview"]').removeClass("disabled")
            }, this.disable = function (t) {
                t.find("button").not('button[data-event="codeview"]').addClass("disabled")
            }
        },
        d = function () {
            var e = function (e, i) {
                var n = t(i),
                    a = n.position(),
                    r = n.height();
                e.css({
                    display: "block",
                    left: a.left,
                    top: a.top + r
                })
            };
            this.update = function (t, i) {
                var n = t.find(".note-link-popover"),
                    a = t.find(".note-image-popover");
                if (i.anchor) {
                    var r = n.find("a");
                    r.attr("href", i.anchor.href).html(i.anchor.href), e(n, i.anchor)
                } else n.hide();
                i.image ? e(a, i.image) : a.hide()
            }, this.hide = function (t) {
                t.children().hide()
            }
        },
        f = function () {
            this.update = function (e, i) {
                var n = e.find(".note-control-selection");
                if (i.image) {
                    var a = t(i.image),
                        r = a.position(),
                        s = {
                            w: a.width(),
                            h: a.height()
                        };
                    n.css({
                        display: "block",
                        left: r.left,
                        top: r.top,
                        width: s.w,
                        height: s.h
                    }).data("target", i.image);
                    var o = s.w + "x" + s.h;
                    n.find(".note-control-selection-info").text(o)
                } else n.hide()
            }, this.hide = function (t) {
                t.children().hide()
            }
        },
        p = function () {
            this.showImageDialog = function (e, i, n, a) {
                var r = e.find(".note-image-dialog"),
                    s = e.find(".note-dropzone"),
                    o = e.find(".note-image-input"),
                    l = e.find(".note-image-url"),
                    h = e.find(".note-image-btn");
                r.on("shown.bs.modal", function () {
                    s.on("dragenter dragover dragleave", !1), s.on("drop", function (t) {
                        i(t), r.modal("hide")
                    }), o.on("change", function () {
                        n(this.files), t(this).val(""), r.modal("hide")
                    }), l.val("").keyup(function () {
                        l.val() ? h.removeClass("disabled").attr("disabled", !1) : h.addClass("disabled").attr("disabled", !0)
                    }).trigger("focus"), h.click(function (t) {
                        r.modal("hide"), a(l.val()), t.preventDefault()
                    })
                }).on("hidden.bs.modal", function () {
                    s.off("dragenter dragover dragleave drop"), o.off("change"), r.off("shown.bs.modal hidden.bs.modal"), l.off("keyup"), h.off("click")
                }).modal("show")
            }, this.showLinkDialog = function (t, e, i) {
                var n = t.find(".note-link-dialog"),
                    a = n.find(".note-link-text"),
                    r = n.find(".note-link-url"),
                    s = n.find(".note-link-btn");
                n.on("shown.bs.modal", function () {
                    a.html(e.text), r.val(e.url).keyup(function () {
                        r.val() ? s.removeClass("disabled").attr("disabled", !1) : s.addClass("disabled").attr("disabled", !0), e.text || a.html(r.val())
                    }).trigger("focus"), s.click(function (t) {
                        n.modal("hide"), i(r.val()), t.preventDefault()
                    })
                }).on("hidden.bs.modal", function () {
                    r.off("keyup"), s.off("click"), n.off("shown.bs.modal hidden.bs.modal")
                }).modal("show")
            }, this.showHelpDialog = function (t) {
                t.find(".note-help-dialog").modal("show")
            }
        },
        g = function () {
            var i = new c,
                n = new u,
                a = new d,
                r = new f,
                o = new p,
                l = {
                    BACKSPACE: 8,
                    TAB: 9,
                    ENTER: 13,
                    SPACE: 32,
                    NUM0: 48,
                    NUM1: 49,
                    NUM6: 54,
                    NUM7: 55,
                    NUM8: 56,
                    B: 66,
                    E: 69,
                    I: 73,
                    J: 74,
                    K: 75,
                    L: 76,
                    R: 82,
                    S: 83,
                    U: 85,
                    Y: 89,
                    Z: 90,
                    SLASH: 191,
                    LEFTBRACKET: 219,
                    BACKSLACH: 220,
                    RIGHTBRACKET: 221
                },
                h = {
                    onAutoSave: null,
                    onImageUpload: null,
                    onImageUploadError: null,
                    onFileUpload: null,
                    onFileUploadError: null
                },
                g = function (e) {
                    var i = t(e).closest(".note-editor");
                    return {
                        editor: function () {
                            return i
                        },
                        toolbar: function () {
                            return i.find(".note-toolbar")
                        },
                        editable: function () {
                            return i.find(".note-editable")
                        },
                        codeable: function () {
                            return i.find(".note-codeable")
                        },
                        statusbar: function () {
                            return i.find(".note-statusbar")
                        },
                        popover: function () {
                            return i.find(".note-popover")
                        },
                        handle: function () {
                            return i.find(".note-handle")
                        },
                        dialog: function () {
                            return i.find(".note-dialog")
                        }
                    }
                },
                m = function (t) {
                    var n = e ? t.metaKey : t.ctrlKey,
                        a = t.shiftKey,
                        r = t.keyCode,
                        s = n || a || r === l.TAB,
                        h = s ? g(t.target) : null;
                    if (r === l.TAB && h.editable().data("tabsize")) i.tab(h.editable());
                    else if (n && (a && r === l.Z || r === l.Y)) i.redo(h.editable());
                    else if (n && r === l.Z) i.undo(h.editable());
                    else if (n && r === l.B) i.bold(h.editable());
                    else if (n && r === l.I) i.italic(h.editable());
                    else if (n && r === l.U) i.underline(h.editable());
                    else if (n && a && r === l.S) i.strikethrough(h.editable());
                    else if (n && r === l.BACKSLACH) i.removeFormat(h.editable());
                    else if (n && r === l.K) i.setLinkDialog(h.editable(), function (t, e) {
                        o.showLinkDialog(h.dialog(), t, e)
                    });
                    else if (n && r === l.SLASH) o.showHelpDialog(h.dialog());
                    else if (n && a && r === l.L) i.justifyLeft(h.editable());
                    else if (n && a && r === l.E) i.justifyCenter(h.editable());
                    else if (n && a && r === l.R) i.justifyRight(h.editable());
                    else if (n && a && r === l.J) i.justifyFull(h.editable());
                    else if (n && a && r === l.NUM7) i.insertUnorderedList(h.editable());
                    else if (n && a && r === l.NUM8) i.insertOrderedList(h.editable());
                    else if (n && r === l.LEFTBRACKET) i.outdent(h.editable());
                    else if (n && r === l.RIGHTBRACKET) i.indent(h.editable());
                    else if (n && r === l.NUM0) i.formatBlock(h.editable(), "P");
                    else if (n && l.NUM1 <= r && r <= l.NUM6) {
                        var c = "H" + String.fromCharCode(r);
                        i.formatBlock(h.editable(), c)
                    } else {
                        if (!n || r !== l.ENTER) return (r === l.BACKSPACE || r === l.ENTER || r === l.SPACE) && i.recordUndo(g(t.target).editable()), void 0;
                        i.insertHorizontalRule(h.editable())
                    }
                    t.preventDefault()
                },
                v = function (e, n) {
                    e.trigger("focus"), h.onImageUpload ? h.onImageUpload(n, i, e) : t.each(n, function (t, n) {
                        var a = new FileReader;
                        a.onload = function (t) {
                            i.insertImage(e, t.target.result)
                        }, a.readAsDataURL(n)
                    })
                },
                b = function (t) {
                    var e = t.originalEvent.dataTransfer;
                    if (e && e.files) {
                        var i = g(t.currentTarget || t.target);
                        v(i.editable(), e.files)
                    }
                    t.stopPropagation(), t.preventDefault()
                },
                y = function (t) {
                    s.isImg(t.target) && t.preventDefault()
                },
                x = function (t) {
                    var e = g(t.currentTarget || t.target),
                        s = i.currentStyle(t.target);
                    s && (n.update(e.toolbar(), s), a.update(e.popover(), s), r.update(e.handle(), s))
                },
                w = function (t) {
                    var e = g(t.currentTarget || t.target);
                    a.hide(e.popover()), r.hide(e.handle())
                },
                _ = function (e) {
                    if (s.isControlSizing(e.target)) {
                        var n, o = g(e.target),
                            l = o.handle(),
                            h = o.popover(),
                            c = o.editable(),
                            u = o.editor(),
                            d = l.find(".note-control-selection").data("target"),
                            f = t(d),
                            p = f.offset(),
                            m = t(document).scrollTop();
                        u.on("mousemove", function (t) {
                            n = {
                                x: t.clientX - p.left,
                                y: t.clientY - (p.top - m)
                            }, i.resizeTo(n, f), r.update(l, {
                                image: d
                            }), a.update(h, {
                                image: d
                            })
                        }).on("mouseup", function () {
                            u.off("mousemove").off("mouseup")
                        }), f.data("ratio") || f.data("ratio", f.height() / f.width()), i.recordUndo(c), e.stopPropagation(), e.preventDefault()
                    }
                },
                C = function (e) {
                    var i = t(e.target).closest("[data-event]");
                    i.length > 0 && e.preventDefault()
                },
                k = function (e) {
                    var a = t(e.target).closest("[data-event]");
                    if (a.length > 0) {
                        var r, s = a.attr("data-event"),
                            l = a.attr("data-value"),
                            h = g(e.target),
                            c = h.dialog(),
                            u = h.editable(),
                            d = h.codeable();
                        if (-1 !== t.inArray(s, ["resize", "float"])) {
                            var f = h.handle(),
                                p = f.find(".note-control-selection");
                            r = p.data("target")
                        }
                        if (i[s] && (u.trigger("focus"), i[s](u, l, r)), -1 !== t.inArray(s, ["backColor", "foreColor"])) n.updateRecentColor(a[0], s, l);
                        else if ("showLinkDialog" === s) i.setLinkDialog(u, function (t, e) {
                            o.showLinkDialog(c, t, e)
                        });
                        else if ("showImageDialog" === s) i.setImageDialog(u, function (t) {
                            o.showImageDialog(c, b, function (t) {
                                v(u, t)
                            }, t)
                        });
                        else if ("showHelpDialog" === s) o.showHelpDialog(c);
                        else if ("fullscreen" === s) {
                            var m = h.editor();
                            m.toggleClass("fullscreen");
                            var y = h.toolbar(),
                                w = function () {
                                    var e = t(window).height() - y.outerHeight();
                                    u.css("height", e)
                                },
                                _ = m.hasClass("fullscreen");
                            _ ? (u.data("orgHeight", u.css("height")), t(window).resize(w).trigger("resize")) : (u.css("height", u.data("orgHeight")), t(window).off("resize")), n.updateFullscreen(y, _)
                        } else if ("codeview" === s) {
                            var m = h.editor(),
                                y = h.toolbar();
                            m.toggleClass("codeview");
                            var C = m.hasClass("codeview");
                            C ? (d.val(u.html()), d.height(u.height()), n.disable(y), d.focus()) : (u.html(d.val()), u.height(d.height()), n.enable(y), u.focus()), n.updateCodeview(h.toolbar(), C)
                        }
                        x(e)
                    }
                },
                S = 24,
                D = function (e) {
                    var i = t(document),
                        n = g(e.target),
                        a = n.editable();
                    n.codeable();
                    var r = a.offset().top - i.scrollTop(),
                        s = function (t) {
                            a.height(t.clientY - (r + S))
                        },
                        o = function () {
                            i.unbind("mousemove", s).unbind("mouseup", o)
                        };
                    i.mousemove(s).mouseup(o), e.stopPropagation(), e.preventDefault()
                },
                T = 18,
                F = function (e) {
                    var i, n = t(e.target.parentNode),
                        a = n.next(),
                        r = n.find(".note-dimension-picker-mousecatcher"),
                        s = n.find(".note-dimension-picker-highlighted"),
                        o = n.find(".note-dimension-picker-unhighlighted");
                    if (void 0 === e.offsetX) {
                        var l = t(e.target).offset();
                        i = {
                            x: e.pageX - l.left,
                            y: e.pageY - l.top
                        }
                    } else i = {
                        x: e.offsetX,
                        y: e.offsetY
                    };
                    var h = {
                        c: Math.ceil(i.x / T) || 1,
                        r: Math.ceil(i.y / T) || 1
                    };
                    s.css({
                        width: h.c + "em",
                        height: h.r + "em"
                    }), r.attr("data-value", h.c + "x" + h.r), 3 < h.c && h.c < 10 && o.css({
                        width: h.c + 1 + "em"
                    }), 3 < h.r && h.r < 10 && o.css({
                        height: h.r + 1 + "em"
                    }), a.html(h.c + " x " + h.r)
                };
            this.attach = function (t, e) {
                t.editable.on("keydown", m), t.editable.on("mousedown", y), t.editable.on("keyup mouseup", x), t.editable.on("scroll", w), t.editable.on("dragenter dragover dragleave", !1), t.editable.on("drop", b), t.handle.on("mousedown", _), t.toolbar.on("click", k), t.popover.on("click", k), t.toolbar.on("mousedown", C), t.popover.on("mousedown", C), t.statusbar.on("mousedown", D);
                var i = t.toolbar,
                    n = i.find(".note-dimension-picker-mousecatcher");
                n.on("mousemove", F), e.onenter && t.editable.keypress(function (t) {
                    t.keyCode === l.ENTER && e.onenter(t)
                }), e.onfocus && t.editable.focus(e.onfocus), e.onblur && t.editable.blur(e.onblur), e.onkeyup && t.editable.keyup(e.onkeyup), e.onkeydown && t.editable.keydown(e.onkeydown), e.onImageUpload && (h.onImageUpload = e.onImageUpload)
            }, this.dettach = function (t) {
                t.editable.off(), t.toolbar.off(), t.handle.off(), t.popover.off()
            }
        },
        m = function () {
            var i = {
                    picture: '<button type="button" class="btn btn-default btn-sm btn-sm" title="Picture" data-event="showImageDialog" tabindex="-1"><i class="fa fa-picture-o icon-picture"></i></button>',
                    link: '<button type="button" class="btn btn-default btn-sm btn-sm" title="Link" data-event="showLinkDialog" data-shortcut="Ctrl+K" data-mac-shortcut="⌘+K" tabindex="-1"><i class="fa fa-link icon-link"></i></button>',
                    table: '<button type="button" class="btn btn-default btn-sm btn-sm dropdown-toggle" title="Table" data-toggle="dropdown" tabindex="-1"><i class="fa fa-table icon-table"></i> <span class="caret"></span></button><ul class="dropdown-menu"><div class="note-dimension-picker"><div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"></div><div class="note-dimension-picker-highlighted"></div><div class="note-dimension-picker-unhighlighted"></div></div><div class="note-dimension-display"> 1 x 1 </div></ul>',
                    style: '<button type="button" class="btn btn-default btn-sm btn-sm dropdown-toggle" title="Style" data-toggle="dropdown" tabindex="-1"><i class="fa fa-magic icon-magic"></i> <span class="caret"></span></button><ul class="dropdown-menu"><li><a data-event="formatBlock" data-value="p">Normal</a></li><li><a data-event="formatBlock" data-value="blockquote"><blockquote>Quote</blockquote></a></li><li><a data-event="formatBlock" data-value="pre">Code</a></li><li><a data-event="formatBlock" data-value="h1"><h1>Header 1</h1></a></li><li><a data-event="formatBlock" data-value="h2"><h2>Header 2</h2></a></li><li><a data-event="formatBlock" data-value="h3"><h3>Header 3</h3></a></li><li><a data-event="formatBlock" data-value="h4"><h4>Header 4</h4></a></li><li><a data-event="formatBlock" data-value="h5"><h5>Header 5</h5></a></li><li><a data-event="formatBlock" data-value="h6"><h6>Header 6</h6></a></li></ul>',
                    fontsize: '<button type="button" class="btn btn-default btn-sm btn-sm dropdown-toggle" data-toggle="dropdown" title="Font Size" tabindex="-1"><span class="note-current-fontsize">11</span> <b class="caret"></b></button><ul class="dropdown-menu"><li><a data-event="fontSize" data-value="8"><i class="fa fa-check icon-ok"></i> 8</a></li><li><a data-event="fontSize" data-value="9"><i class="fa fa-check icon-ok"></i> 9</a></li><li><a data-event="fontSize" data-value="10"><i class="fa fa-check icon-ok"></i> 10</a></li><li><a data-event="fontSize" data-value="11"><i class="fa fa-check icon-ok"></i> 11</a></li><li><a data-event="fontSize" data-value="12"><i class="fa fa-check icon-ok"></i> 12</a></li><li><a data-event="fontSize" data-value="14"><i class="fa fa-check icon-ok"></i> 14</a></li><li><a data-event="fontSize" data-value="18"><i class="fa fa-check icon-ok"></i> 18</a></li><li><a data-event="fontSize" data-value="24"><i class="fa fa-check icon-ok"></i> 24</a></li><li><a data-event="fontSize" data-value="36"><i class="fa fa-check icon-ok"></i> 36</a></li></ul>',
                    color: '<button type="button" class="btn btn-default btn-sm btn-sm note-recent-color" title="Recent Color" data-event="color" data-value=\'{"backColor":"yellow"}\' tabindex="-1"><i class="fa fa-font icon-font" style="color:black;background-color:yellow;"></i></button><button type="button" class="btn btn-default btn-sm btn-sm dropdown-toggle" title="More Color" data-toggle="dropdown" tabindex="-1"><span class="caret"></span></button><ul class="dropdown-menu"><li><div class="btn-group"><div class="note-palette-title">BackColor</div><div class="note-color-reset" data-event="backColor" data-value="inherit" title="Transparent">Set transparent</div><div class="note-color-palette" data-target-event="backColor"></div></div><div class="btn-group"><div class="note-palette-title">FontColor</div><div class="note-color-reset" data-event="foreColor" data-value="inherit" title="Reset">Reset to default</div><div class="note-color-palette" data-target-event="foreColor"></div></div></li></ul>',
                    bold: '<button type="button" class="btn btn-default btn-sm btn-sm" title="Bold" data-shortcut="Ctrl+B" data-mac-shortcut="⌘+B" data-event="bold" tabindex="-1"><i class="fa fa-bold icon-bold"></i></button>',
                    italic: '<button type="button" class="btn btn-default btn-sm btn-sm" title="Italic" data-shortcut="Ctrl+I" data-mac-shortcut="⌘+I" data-event="italic" tabindex="-1"><i class="fa fa-italic icon-italic"></i></button>',
                    underline: '<button type="button" class="btn btn-default btn-sm btn-sm" title="Underline" data-shortcut="Ctrl+U" data-mac-shortcut="⌘+U" data-event="underline" tabindex="-1"><i class="fa fa-underline icon-underline"></i></button>',
                    clear: '<button type="button" class="btn btn-default btn-sm btn-sm" title="Remove Font Style" data-shortcut="Ctrl+\\" data-mac-shortcut="⌘+\\" data-event="removeFormat" tabindex="-1"><i class="fa fa-eraser icon-eraser"></i></button>',
                    ul: '<button type="button" class="btn btn-default btn-sm btn-sm" title="Unordered list" data-shortcut="Ctrl+Shift+8" data-mac-shortcut="⌘+⇧+7" data-event="insertUnorderedList" tabindex="-1"><i class="fa fa-list-ul icon-list-ul"></i></button>',
                    ol: '<button type="button" class="btn btn-default btn-sm btn-sm" title="Ordered list" data-shortcut="Ctrl+Shift+7" data-mac-shortcut="⌘+⇧+8" data-event="insertOrderedList" tabindex="-1"><i class="fa fa-list-ol icon-list-ol"></i></button>',
                    paragraph: '<button type="button" class="btn btn-default btn-sm btn-sm dropdown-toggle" title="Paragraph" data-toggle="dropdown" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i>  <span class="caret"></span></button><ul class="dropdown-menu"><li><div class="note-align btn-group"><button type="button" class="btn btn-default btn-sm btn-sm" title="Align left" data-shortcut="Ctrl+Shift+L" data-mac-shortcut="⌘+⇧+L" data-event="justifyLeft" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i></button><button type="button" class="btn btn-default btn-sm btn-sm" title="Align center" data-shortcut="Ctrl+Shift+E" data-mac-shortcut="⌘+⇧+E" data-event="justifyCenter" tabindex="-1"><i class="fa fa-align-center icon-align-center"></i></button><button type="button" class="btn btn-default btn-sm btn-sm" title="Align right" data-shortcut="Ctrl+Shift+R" data-mac-shortcut="⌘+⇧+R" data-event="justifyRight" tabindex="-1"><i class="fa fa-align-right icon-align-right"></i></button><button type="button" class="btn btn-default btn-sm btn-sm" title="Justify full" data-shortcut="Ctrl+Shift+J" data-mac-shortcut="⌘+⇧+J" data-event="justifyFull" tabindex="-1"><i class="fa fa-align-justify icon-align-justify"></i></button></div></li><li><div class="note-list btn-group"><button type="button" class="btn btn-default btn-sm btn-sm" title="Outdent" data-shortcut="Ctrl+[" data-mac-shortcut="⌘+[" data-event="outdent" tabindex="-1"><i class="fa fa-outdent icon-indent-left"></i></button><button type="button" class="btn btn-default btn-sm btn-sm" title="Indent" data-shortcut="Ctrl+]" data-mac-shortcut="⌘+]" data-event="indent" tabindex="-1"><i class="fa fa-indent icon-indent-right"></i></button></li></ul>',
                    height: '<button type="button" class="btn btn-default btn-sm btn-sm dropdown-toggle" data-toggle="dropdown" title="Line Height" tabindex="-1"><i class="fa fa-text-height icon-text-height"></i>&nbsp; <b class="caret"></b></button><ul class="dropdown-menu"><li><a data-event="lineHeight" data-value="1.0"><i class="fa fa-check icon-ok"></i> 1.0</a></li><li><a data-event="lineHeight" data-value="1.2"><i class="fa fa-check icon-ok"></i> 1.2</a></li><li><a data-event="lineHeight" data-value="1.4"><i class="fa fa-check icon-ok"></i> 1.4</a></li><li><a data-event="lineHeight" data-value="1.5"><i class="fa fa-check icon-ok"></i> 1.5</a></li><li><a data-event="lineHeight" data-value="1.6"><i class="fa fa-check icon-ok"></i> 1.6</a></li><li><a data-event="lineHeight" data-value="1.8"><i class="fa fa-check icon-ok"></i> 1.8</a></li><li><a data-event="lineHeight" data-value="2.0"><i class="fa fa-check icon-ok"></i> 2.0</a></li><li><a data-event="lineHeight" data-value="3.0"><i class="fa fa-check icon-ok"></i> 3.0</a></li></ul>',
                    help: '<button type="button" class="btn btn-default btn-sm btn-sm" title="Help" data-shortcut="Ctrl+/" data-mac-shortcut="⌘+/" data-event="showHelpDialog" tabindex="-1"><i class="fa fa-question icon-question"></i></button>',
                    fullscreen: '<button type="button" class="btn btn-default btn-sm btn-sm" title="Full Screen" data-event="fullscreen" tabindex="-1"><i class="fa fa-fullscreen icon-fullscreen"></i></button>',
                    codeview: '<button type="button" class="btn btn-default btn-sm btn-sm" title="Code View" data-event="codeview" tabindex="-1"><i class="fa fa-code icon-code"></i></button>'
                },
                n = '<div class="note-popover"><div class="note-link-popover popover bottom in" style="display: none;"><div class="arrow"></div><div class="popover-content note-link-content"><a href="http://www.google.com" target="_blank">www.google.com</a>&nbsp;&nbsp;<div class="note-insert btn-group"><button type="button" class="btn btn-default btn-sm btn-sm" title="Edit" data-event="showLinkDialog" tabindex="-1"><i class="fa fa-edit icon-edit"></i></button><button type="button" class="btn btn-default btn-sm btn-sm" title="Unlink" data-event="unlink" tabindex="-1"><i class="fa fa-unlink icon-unlink"></i></button></div></div></div><div class="note-image-popover popover bottom in" style="display: none;"><div class="arrow"></div><div class="popover-content note-image-content"><div class="btn-group"><button type="button" class="btn btn-default btn-sm btn-sm" title="Resize Full" data-event="resize" data-value="1" tabindex="-1"><i class="fa fa-resize-full icon-resize-full"></i></button><button type="button" class="btn btn-default btn-sm btn-sm" title="Resize Half" data-event="resize" data-value="0.5" tabindex="-1">½</button><button type="button" class="btn btn-default btn-sm btn-sm" title="Resize Thrid" data-event="resize" data-value="0.33" tabindex="-1">⅓</button><button type="button" class="btn btn-default btn-sm btn-sm" title="Resize Quarter" data-event="resize" data-value="0.25" tabindex="-1">¼</button></div><div class="btn-group"><button type="button" class="btn btn-default btn-sm btn-sm" title="Float Left" data-event="float" data-value="left" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i></button><button type="button" class="btn btn-default btn-sm btn-sm" title="Float Right" data-event="float" data-value="right" tabindex="-1"><i class="fa fa-align-right icon-align-right"></i></button><button type="button" class="btn btn-default btn-sm btn-sm" title="Float None" data-event="float" data-value="none" tabindex="-1"><i class="fa fa-reorder icon-reorder"></i></button></div></div></div></div>',
                a = '<div class="note-handle"><div class="note-control-selection"><div class="note-control-selection-bg"></div><div class="note-control-holder note-control-nw"></div><div class="note-control-holder note-control-ne"></div><div class="note-control-holder note-control-sw"></div><div class="note-control-sizing note-control-se"></div><div class="note-control-selection-info"></div></div></div>',
                r = '<table class="note-shortcut"><thead><tr><th></th><th>Text formatting</th></tr></thead><tbody><tr><td>⌘ + B</td><td>Toggle Bold</td></tr><tr><td>⌘ + I</td><td>Toggle Italic</td></tr><tr><td>⌘ + U</td><td>Toggle Underline</td></tr><tr><td>⌘ + ⇧ + S</td><td>Toggle Strike</td></tr><tr><td>⌘ + \\</td><td>Remove Font Style</td></tr></tr></tbody></table>',
                o = '<table class="note-shortcut"><thead><tr><th></th><th>Action</th></tr></thead><tbody><tr><td>⌘ + Z</td><td>Undo</td></tr><tr><td>⌘ + ⇧ + Z</td><td>Redo</td></tr><tr><td>⌘ + ]</td><td>Indent</td></tr><tr><td>⌘ + [</td><td>Outdent</td></tr><tr><td>⌘ + K</td><td>Insert Link</td></tr><tr><td>⌘ + ENTER</td><td>Insert Horizontal Rule</td></tr></tbody></table>',
                l = '<table class="note-shortcut"><thead><tr><th></th><th>Paragraph formatting</th></tr></thead><tbody><tr><td>⌘ + ⇧ + L</td><td>Align Left</td></tr><tr><td>⌘ + ⇧ + E</td><td>Align Center</td></tr><tr><td>⌘ + ⇧ + R</td><td>Align Right</td></tr><tr><td>⌘ + ⇧ + J</td><td>Justify Full</td></tr><tr><td>⌘ + ⇧ + NUM7</td><td>Ordered List</td></tr><tr><td>⌘ + ⇧ + NUM8</td><td>Unordered List</td></tr></tbody></table>',
                c = '<table class="note-shortcut"><thead><tr><th></th><th>Document Style</th></tr></thead><tbody><tr><td>⌘ + NUM0</td><td>Normal Text</td></tr><tr><td>⌘ + NUM1</td><td>Heading 1</td></tr><tr><td>⌘ + NUM2</td><td>Heading 2</td></tr><tr><td>⌘ + NUM3</td><td>Heading 3</td></tr><tr><td>⌘ + NUM4</td><td>Heading 4</td></tr><tr><td>⌘ + NUM5</td><td>Heading 5</td></tr><tr><td>⌘ + NUM6</td><td>Heading 6</td></tr></tbody></table>',
                u = '<table class="note-shortcut-layout"><tbody><tr><td>' + o + "</td><td>" + r + "</td></tr>" + "<tr><td>" + c + "</td><td>" + l + "</td></tr>" + "</tbody>" + "</table>";
            e || (u = u.replace(/⌘/g, "Ctrl").replace(/⇧/g, "Shift"));
            var d = '<div class="note-dialog"><div class="note-image-dialog modal" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" aria-hidden="true" tabindex="-1">×</button><h4>Insert Image</h4></div><div class="modal-body"><div class="row-fluid"><div class="note-dropzone span12">Drag an image here</div><h5>Select from files</h5><input class="note-image-input" type="file" name="files" accept="image/*" capture="camera" /><h5>Image URL</h5><input class="note-image-url form-control span12" type="text" /></div></div><div class="modal-footer"><button href="#" class="btn btn-primary note-image-btn disabled" disabled="disabled">Insert</button></div></div></div></div><div class="note-link-dialog modal" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" aria-hidden="true" tabindex="-1">×</button><h4>Edit Link</h4></div><div class="modal-body"><div class="row-fluid"><div class="form-group"><label>Text to display</label><span class="note-link-text form-control input-xlarge uneditable-input" /></div><div class="form-group"><label>To what URL should this link go?</label><input class="note-link-url form-control span12" type="text" /></div></div></div><div class="modal-footer"><button href="#" class="btn btn-primary note-link-btn disabled" disabled="disabled">Link</button></div></div></div></div><div class="note-help-dialog modal" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="modal-background"><a class="modal-close pull-right" aria-hidden="true" tabindex="-1">Close</a><div class="title">Keyboard shortcuts</div>' + u + '<p class="text-center"><a href="//hackerwins.github.io/summernote/" target="_blank">Summernote v0.4</a> · <a href="//github.com/HackerWins/summernote" target="_blank">Project</a> · <a href="//github.com/HackerWins/summernote/issues" target="_blank">Issues</a></p>' + "</div>" + "</div>" + "</div>" + "</div>" + "</div>",
                f = function (i, n) {
                    i.find("button").each(function (i, n) {
                        var a = t(n),
                            r = a.attr(e ? "data-mac-shortcut" : "data-shortcut");
                        r && a.attr("title", function (t, e) {
                            return e + " (" + r + ")"
                        })
                    }).tooltip({
                        container: "body",
                        placement: n || "top"
                    })
                },
                p = [
                    ["#000000", "#424242", "#636363", "#9C9C94", "#CEC6CE", "#EFEFEF", "#F7F7F7", "#FFFFFF"],
                    ["#FF0000", "#FF9C00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#9C00FF", "#FF00FF"],
                    ["#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE"],
                    ["#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD"],
                    ["#E76363", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5"],
                    ["#CE0000", "#E79439", "#EFC631", "#6BA54A", "#4A7B8C", "#3984C6", "#634AA5", "#A54A7B"],
                    ["#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842"],
                    ["#630000", "#7B3900", "#846300", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]
                ],
                g = function (e) {
                    e.find(".note-color-palette").each(function () {
                        for (var e = t(this), i = e.attr("data-target-event"), n = "", a = 0, r = p.length; r > a; a++) {
                            for (var s = p[a], o = "<div>", l = 0, h = s.length; h > l; l++) {
                                var c = s[l],
                                    u = ['<button type="button" class="note-color-btn" style="background-color:', c, ';" data-event="', i, '" data-value="', c, '" title="', c, '" data-toggle="button" tabindex="-1"></button>'].join("");
                                o += u
                            }
                            o += "</div>", n += o
                        }
                        e.html(n)
                    })
                };
            this.createLayout = function (e, r, o, l) {
                if (!e.next().hasClass("note-editor")) {
                    var c = t('<div class="note-editor"></div>');
                    r > 0 && t('<div class="note-statusbar"><div class="note-resizebar"><div class="note-icon-bar"></div><div class="note-icon-bar"></div><div class="note-icon-bar"></div></div></div>').prependTo(c);
                    var u = t('<div class="note-editable" contentEditable="true"></div>').prependTo(c);
                    r && u.height(r), o && u.data("tabsize", o), u.html(s.html(e)), u.data("NoteHistory", new h), t('<textarea class="note-codeable"></textarea>').prependTo(c), setTimeout(function () {
                        document.execCommand("styleWithCSS", 0, !0)
                    });
                    for (var p = "", m = 0, v = l.length; v > m; m++) {
                        var b = l[m];
                        p += '<div class="note-' + b[0] + ' btn-group">';
                        for (var y = 0, x = b[1].length; x > y; y++) p += i[b[1][y]];
                        p += "</div>"
                    }
                    p = '<div class="note-toolbar btn-toolbar">' + p + "</div>";
                    var w = t(p).prependTo(c);
                    g(w), f(w, "bottom");
                    var _ = t(n).prependTo(c);
                    f(_), t(a).prependTo(c);
                    var C = t(d).prependTo(c);
                    C.find("button.close, a.modal-close").click(function () {
                        t(this).closest(".modal").modal("hide")
                    }), c.insertAfter(e), e.hide()
                }
            };
            var m = this.layoutInfoFromHolder = function (t) {
                var e = t.next();
                if (e.hasClass("note-editor")) return {
                    editor: e,
                    toolbar: e.find(".note-toolbar"),
                    editable: e.find(".note-editable"),
                    statusbar: e.find(".note-statusbar"),
                    popover: e.find(".note-popover"),
                    handle: e.find(".note-handle"),
                    dialog: e.find(".note-dialog")
                }
            };
            this.removeLayout = function (t) {
                var e = m(t);
                e && (t.html(e.editable.html()), e.editor.remove(), t.show())
            }
        },
        v = new m,
        b = new g;
    t.fn.extend({
        summernote: function (e) {
            if (e = t.extend({
                toolbar: [
                    ["style", ["style"]],
                    ["font", ["bold", "italic", "underline", "clear"]],
                    ["fontsize", ["fontsize"]],
                    ["color", ["color"]],
                    ["para", ["ul", "ol", "paragraph"]],
                    ["height", ["height"]],
                    ["table", ["table"]],
                    ["insert", ["link", "picture"]],
                    ["view", ["fullscreen", "codeview"]],
                    ["help", ["help"]]
                ]
            }, e), this.each(function (i, n) {
                var a = t(n);
                v.createLayout(a, e.height, e.tabsize, e.toolbar);
                var r = v.layoutInfoFromHolder(a);
                b.attach(r, e)
            }), this.first() && e.focus) {
                var i = v.layoutInfoFromHolder(this.first());
                i.editable.focus()
            }
            this.length > 0 && e.oninit && e.oninit()
        },
        code: function (e) {
            if (void 0 === e) {
                var i = this.first();
                if (0 == i.length) return;
                var n = v.layoutInfoFromHolder(i),
                    a = !(!n || !n.editable);
                return a ? n.editable.html() : i.html()
            }
            this.each(function (i, n) {
                var a = v.layoutInfoFromHolder(t(n));
                a && a.editable && a.editable.html(e)
            })
        },
        destroy: function () {
            this.each(function (e, i) {
                var n = t(i),
                    a = v.layoutInfoFromHolder(n);
                a && a.editable && (b.dettach(a), v.removeLayout(n))
            })
        },
        summernoteInner: function () {
            return {
                dom: s,
                list: r,
                func: a,
                range: o
            }
        }
    })
}(window.jQuery), "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function (t, e) {
        "use strict";
        var i, n, a = this.length >>> 0,
            r = !1;
        for (1 < arguments.length && (n = e, r = !0), i = 0; a > i; ++i) this.hasOwnProperty(i) && (r ? n = t(n, this[i], i, this) : (n = this[i], r = !0));
        if (!r) throw new TypeError("Reduce of empty array with no initial value");
        return n
    }),
    function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
    }(function (t) {
        function e(t) {
            return t ? i(t) : void 0
        }

        function i(t) {
            for (var i in e.prototype) t[i] = e.prototype[i];
            return t
        }
        var n = {
            exports: {}
        };
        return n.exports = e, e.prototype.on = function (t, e) {
                return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this
            }, e.prototype.once = function (t, e) {
                function i() {
                    n.off(t, i), e.apply(this, arguments)
                }
                var n = this;
                return this._callbacks = this._callbacks || {}, e._off = i, this.on(t, i), this
            }, e.prototype.off = e.prototype.removeListener = e.prototype.removeAllListeners = function (t, e) {
                this._callbacks = this._callbacks || {};
                var i = this._callbacks[t];
                if (!i) return this;
                if (1 == arguments.length) return delete this._callbacks[t], this;
                var n = i.indexOf(e._off || e);
                return ~n && i.splice(n, 1), this
            }, e.prototype.emit = function (t) {
                this._callbacks = this._callbacks || {};
                var e = [].slice.call(arguments, 1),
                    i = this._callbacks[t];
                if (i) {
                    i = i.slice(0);
                    for (var n = 0, a = i.length; a > n; ++n) i[n].apply(this, e)
                }
                return this
            }, e.prototype.listeners = function (t) {
                return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
            }, e.prototype.hasListeners = function (t) {
                return !!this.listeners(t).length
            },
            /*
            #
            # More info at [www.dropzonejs.com](http://www.dropzonejs.com)
            # 
            # Copyright (c) 2012, Matias Meno  
            # 
            # Permission is hereby granted, free of charge, to any person obtaining a copy
            # of this software and associated documentation files (the "Software"), to deal
            # in the Software without restriction, including without limitation the rights
            # to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            # copies of the Software, and to permit persons to whom the Software is
            # furnished to do so, subject to the following conditions:
            # 
            # The above copyright notice and this permission notice shall be included in
            # all copies or substantial portions of the Software.
            # 
            # THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            # IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            # FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            # AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            # LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            # OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
            # THE SOFTWARE.
            #
            */
            function () {
                var i, a, r, s, o, l, h = {}.hasOwnProperty,
                    c = function (t, e) {
                        function i() {
                            this.constructor = t
                        }
                        for (var n in e) h.call(e, n) && (t[n] = e[n]);
                        return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
                    },
                    u = [].slice;
                a = "undefined" != typeof e && null !== e ? e : require("emitter"), o = function () {}, i = function (t) {
                    function e(t, n) {
                        var a, r, s;
                        if (this.element = t, this.version = e.version, this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, ""), this.clickableElements = [], this.listeners = [], this.files = [], "string" == typeof this.element && (this.element = document.querySelector(this.element)), !this.element || null == this.element.nodeType) throw new Error("Invalid dropzone element.");
                        if (this.element.dropzone) throw new Error("Dropzone already attached.");
                        if (e.instances.push(this), t.dropzone = this, a = null != (s = e.optionsForElement(this.element)) ? s : {}, this.options = i({}, this.defaultOptions, a, null != n ? n : {}), this.options.forceFallback || !e.isBrowserSupported()) return this.options.fallback.call(this);
                        if (null == this.options.url && (this.options.url = this.element.getAttribute("action")), !this.options.url) throw new Error("No URL provided.");
                        if (this.options.acceptedFiles && this.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
                        this.options.acceptedMimeTypes && (this.options.acceptedFiles = this.options.acceptedMimeTypes, delete this.options.acceptedMimeTypes), this.options.method = this.options.method.toUpperCase(), (r = this.getExistingFallback()) && r.parentNode && r.parentNode.removeChild(r), this.previewsContainer = this.options.previewsContainer ? e.getElement(this.options.previewsContainer, "previewsContainer") : this.element, this.options.clickable && (this.clickableElements = this.options.clickable === !0 ? [this.element] : e.getElements(this.options.clickable, "clickable")), this.init()
                    }
                    var i;
                    return c(e, t), e.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "selectedfiles", "addedfile", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded"], e.prototype.defaultOptions = {
                        url: null,
                        method: "post",
                        withCredentials: !1,
                        parallelUploads: 2,
                        uploadMultiple: !1,
                        maxFilesize: 256,
                        paramName: "file",
                        createImageThumbnails: !0,
                        maxThumbnailFilesize: 10,
                        thumbnailWidth: 100,
                        thumbnailHeight: 100,
                        maxFiles: null,
                        params: {},
                        clickable: !0,
                        ignoreHiddenFiles: !0,
                        acceptedFiles: null,
                        acceptedMimeTypes: null,
                        autoProcessQueue: !0,
                        addRemoveLinks: !1,
                        previewsContainer: null,
                        dictDefaultMessage: "Drop files here to upload",
                        dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
                        dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
                        dictFileTooBig: "File is too big ({{filesize}}MB). Max filesize: {{maxFilesize}}MB.",
                        dictInvalidFileType: "You can't upload files of this type.",
                        dictResponseError: "Server responded with {{statusCode}} code.",
                        dictCancelUpload: "Cancel upload",
                        dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
                        dictRemoveFile: "Remove file",
                        dictRemoveFileConfirmation: null,
                        dictMaxFilesExceeded: "You can only upload {{maxFiles}} files.",
                        accept: function (t, e) {
                            return e()
                        },
                        init: function () {
                            return o
                        },
                        forceFallback: !1,
                        fallback: function () {
                            var t, i, n, a, r, s;
                            for (this.element.className = "" + this.element.className + " dz-browser-not-supported", s = this.element.getElementsByTagName("div"), a = 0, r = s.length; r > a; a++) t = s[a], /(^| )dz-message($| )/.test(t.className) && (i = t, t.className = "dz-message");
                            return i || (i = e.createElement('<div class="dz-message"><span></span></div>'), this.element.appendChild(i)), n = i.getElementsByTagName("span")[0], n && (n.textContent = this.options.dictFallbackMessage), this.element.appendChild(this.getFallbackForm())
                        },
                        resize: function (t) {
                            var e, i, n;
                            return e = {
                                srcX: 0,
                                srcY: 0,
                                srcWidth: t.width,
                                srcHeight: t.height
                            }, i = t.width / t.height, n = this.options.thumbnailWidth / this.options.thumbnailHeight, t.height < this.options.thumbnailHeight || t.width < this.options.thumbnailWidth ? (e.trgHeight = e.srcHeight, e.trgWidth = e.srcWidth) : i > n ? (e.srcHeight = t.height, e.srcWidth = e.srcHeight * n) : (e.srcWidth = t.width, e.srcHeight = e.srcWidth / n), e.srcX = (t.width - e.srcWidth) / 2, e.srcY = (t.height - e.srcHeight) / 2, e
                        },
                        drop: function () {
                            return this.element.classList.remove("dz-drag-hover")
                        },
                        dragstart: o,
                        dragend: function () {
                            return this.element.classList.remove("dz-drag-hover")
                        },
                        dragenter: function () {
                            return this.element.classList.add("dz-drag-hover")
                        },
                        dragover: function () {
                            return this.element.classList.add("dz-drag-hover")
                        },
                        dragleave: function () {
                            return this.element.classList.remove("dz-drag-hover")
                        },
                        selectedfiles: function () {
                            return this.element === this.previewsContainer ? this.element.classList.add("dz-started") : void 0
                        },
                        reset: function () {
                            return this.element.classList.remove("dz-started")
                        },
                        addedfile: function (t) {
                            var i = this;
                            return t.previewElement = e.createElement(this.options.previewTemplate), t.previewTemplate = t.previewElement, this.previewsContainer.appendChild(t.previewElement), t.previewElement.querySelector("[data-dz-name]").textContent = t.name, t.previewElement.querySelector("[data-dz-size]").innerHTML = this.filesize(t.size), this.options.addRemoveLinks && (t._removeLink = e.createElement('<a class="dz-remove" href="javascript:undefined;">' + this.options.dictRemoveFile + "</a>"), t._removeLink.addEventListener("click", function (n) {
                                return n.preventDefault(), n.stopPropagation(), t.status === e.UPLOADING ? e.confirm(i.options.dictCancelUploadConfirmation, function () {
                                    return i.removeFile(t)
                                }) : i.options.dictRemoveFileConfirmation ? e.confirm(i.options.dictRemoveFileConfirmation, function () {
                                    return i.removeFile(t)
                                }) : i.removeFile(t)
                            }), t.previewElement.appendChild(t._removeLink)), this._updateMaxFilesReachedClass()
                        },
                        removedfile: function (t) {
                            var e;
                            return null != (e = t.previewElement) && e.parentNode.removeChild(t.previewElement), this._updateMaxFilesReachedClass()
                        },
                        thumbnail: function (t, e) {
                            var i;
                            return t.previewElement.classList.remove("dz-file-preview"), t.previewElement.classList.add("dz-image-preview"), i = t.previewElement.querySelector("[data-dz-thumbnail]"), i.alt = t.name, i.src = e
                        },
                        error: function (t, e) {
                            return t.previewElement.classList.add("dz-error"), t.previewElement.querySelector("[data-dz-errormessage]").textContent = e
                        },
                        errormultiple: o,
                        processing: function (t) {
                            return t.previewElement.classList.add("dz-processing"), t._removeLink ? t._removeLink.textContent = this.options.dictCancelUpload : void 0
                        },
                        processingmultiple: o,
                        uploadprogress: function (t, e) {
                            return t.previewElement.querySelector("[data-dz-uploadprogress]").style.width = "" + e + "%"
                        },
                        totaluploadprogress: o,
                        sending: o,
                        sendingmultiple: o,
                        success: function (t) {
                            return t.previewElement.classList.add("dz-success")
                        },
                        successmultiple: o,
                        canceled: function (t) {
                            return this.emit("error", t, "Upload canceled.")
                        },
                        canceledmultiple: o,
                        complete: function (t) {
                            return t._removeLink ? t._removeLink.textContent = this.options.dictRemoveFile : void 0
                        },
                        completemultiple: o,
                        maxfilesexceeded: o,
                        previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-details">\n    <div class="dz-filename"><span data-dz-name></span></div>\n    <div class="dz-size" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-success-mark"><span>✔</span></div>\n  <div class="dz-error-mark"><span>✘</span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n</div>'
                    }, i = function () {
                        var t, e, i, n, a, r, s;
                        for (n = arguments[0], i = 2 <= arguments.length ? u.call(arguments, 1) : [], r = 0, s = i.length; s > r; r++) {
                            e = i[r];
                            for (t in e) a = e[t], n[t] = a
                        }
                        return n
                    }, e.prototype.getAcceptedFiles = function () {
                        var t, e, i, n, a;
                        for (n = this.files, a = [], e = 0, i = n.length; i > e; e++) t = n[e], t.accepted && a.push(t);
                        return a
                    }, e.prototype.getRejectedFiles = function () {
                        var t, e, i, n, a;
                        for (n = this.files, a = [], e = 0, i = n.length; i > e; e++) t = n[e], t.accepted || a.push(t);
                        return a
                    }, e.prototype.getQueuedFiles = function () {
                        var t, i, n, a, r;
                        for (a = this.files, r = [], i = 0, n = a.length; n > i; i++) t = a[i], t.status === e.QUEUED && r.push(t);
                        return r
                    }, e.prototype.getUploadingFiles = function () {
                        var t, i, n, a, r;
                        for (a = this.files, r = [], i = 0, n = a.length; n > i; i++) t = a[i], t.status === e.UPLOADING && r.push(t);
                        return r
                    }, e.prototype.init = function () {
                        var t, i, n, a, r, s, o, l = this;
                        for ("form" === this.element.tagName && this.element.setAttribute("enctype", "multipart/form-data"), this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message") && this.element.appendChild(e.createElement('<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + "</span></div>")), this.clickableElements.length && (n = function () {
                            return l.hiddenFileInput && document.body.removeChild(l.hiddenFileInput), l.hiddenFileInput = document.createElement("input"), l.hiddenFileInput.setAttribute("type", "file"), l.hiddenFileInput.setAttribute("multiple", "multiple"), null != l.options.acceptedFiles && l.hiddenFileInput.setAttribute("accept", l.options.acceptedFiles), l.hiddenFileInput.style.visibility = "hidden", l.hiddenFileInput.style.position = "absolute", l.hiddenFileInput.style.top = "0", l.hiddenFileInput.style.left = "0", l.hiddenFileInput.style.height = "0", l.hiddenFileInput.style.width = "0", document.body.appendChild(l.hiddenFileInput), l.hiddenFileInput.addEventListener("change", function () {
                                var t;
                                return t = l.hiddenFileInput.files, t.length && (l.emit("selectedfiles", t), l.handleFiles(t)), n()
                            })
                        }, n()), this.URL = null != (s = window.URL) ? s : window.webkitURL, o = this.events, a = 0, r = o.length; r > a; a++) t = o[a], this.on(t, this.options[t]);
                        return this.on("uploadprogress", function () {
                            return l.updateTotalUploadProgress()
                        }), this.on("removedfile", function () {
                            return l.updateTotalUploadProgress()
                        }), this.on("canceled", function (t) {
                            return l.emit("complete", t)
                        }), i = function (t) {
                            return t.stopPropagation(), t.preventDefault ? t.preventDefault() : t.returnValue = !1
                        }, this.listeners = [{
                            element: this.element,
                            events: {
                                dragstart: function (t) {
                                    return l.emit("dragstart", t)
                                },
                                dragenter: function (t) {
                                    return i(t), l.emit("dragenter", t)
                                },
                                dragover: function (t) {
                                    return i(t), l.emit("dragover", t)
                                },
                                dragleave: function (t) {
                                    return l.emit("dragleave", t)
                                },
                                drop: function (t) {
                                    return i(t), l.drop(t)
                                },
                                dragend: function (t) {
                                    return l.emit("dragend", t)
                                }
                            }
                        }], this.clickableElements.forEach(function (t) {
                            return l.listeners.push({
                                element: t,
                                events: {
                                    click: function (i) {
                                        return t !== l.element || i.target === l.element || e.elementInside(i.target, l.element.querySelector(".dz-message")) ? l.hiddenFileInput.click() : void 0
                                    }
                                }
                            })
                        }), this.enable(), this.options.init.call(this)
                    }, e.prototype.destroy = function () {
                        var t;
                        return this.disable(), this.removeAllFiles(!0), (null != (t = this.hiddenFileInput) ? t.parentNode : void 0) && (this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput), this.hiddenFileInput = null), delete this.element.dropzone
                    }, e.prototype.updateTotalUploadProgress = function () {
                        var t, e, i, n, a, r, s, o;
                        if (n = 0, i = 0, t = this.getAcceptedFiles(), t.length) {
                            for (o = this.getAcceptedFiles(), r = 0, s = o.length; s > r; r++) e = o[r], n += e.upload.bytesSent, i += e.upload.total;
                            a = 100 * n / i
                        } else a = 100;
                        return this.emit("totaluploadprogress", a, i, n)
                    }, e.prototype.getFallbackForm = function () {
                        var t, i, n, a;
                        return (t = this.getExistingFallback()) ? t : (n = '<div class="dz-fallback">', this.options.dictFallbackText && (n += "<p>" + this.options.dictFallbackText + "</p>"), n += '<input type="file" name="' + this.options.paramName + (this.options.uploadMultiple ? "[]" : "") + '" ' + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + ' /><button type="submit">Upload!</button></div>', i = e.createElement(n), "FORM" !== this.element.tagName ? (a = e.createElement('<form action="' + this.options.url + '" enctype="multipart/form-data" method="' + this.options.method + '"></form>'), a.appendChild(i)) : (this.element.setAttribute("enctype", "multipart/form-data"), this.element.setAttribute("method", this.options.method)), null != a ? a : i)
                    }, e.prototype.getExistingFallback = function () {
                        var t, e, i, n, a, r;
                        for (e = function (t) {
                            var e, i, n;
                            for (i = 0, n = t.length; n > i; i++)
                                if (e = t[i], /(^| )fallback($| )/.test(e.className)) return e
                        }, r = ["div", "form"], n = 0, a = r.length; a > n; n++)
                            if (i = r[n], t = e(this.element.getElementsByTagName(i))) return t
                    }, e.prototype.setupEventListeners = function () {
                        var t, e, i, n, a, r, s;
                        for (r = this.listeners, s = [], n = 0, a = r.length; a > n; n++) t = r[n], s.push(function () {
                            var n, a;
                            n = t.events, a = [];
                            for (e in n) i = n[e], a.push(t.element.addEventListener(e, i, !1));
                            return a
                        }());
                        return s
                    }, e.prototype.removeEventListeners = function () {
                        var t, e, i, n, a, r, s;
                        for (r = this.listeners, s = [], n = 0, a = r.length; a > n; n++) t = r[n], s.push(function () {
                            var n, a;
                            n = t.events, a = [];
                            for (e in n) i = n[e], a.push(t.element.removeEventListener(e, i, !1));
                            return a
                        }());
                        return s
                    }, e.prototype.disable = function () {
                        var t, e, i, n, a;
                        for (this.clickableElements.forEach(function (t) {
                            return t.classList.remove("dz-clickable")
                        }), this.removeEventListeners(), n = this.files, a = [], e = 0, i = n.length; i > e; e++) t = n[e], a.push(this.cancelUpload(t));
                        return a
                    }, e.prototype.enable = function () {
                        return this.clickableElements.forEach(function (t) {
                            return t.classList.add("dz-clickable")
                        }), this.setupEventListeners()
                    }, e.prototype.filesize = function (t) {
                        var e;
                        return t >= 1e11 ? (t /= 1e11, e = "TB") : t >= 1e8 ? (t /= 1e8, e = "GB") : t >= 1e5 ? (t /= 1e5, e = "MB") : t >= 100 ? (t /= 100, e = "KB") : (t = 10 * t, e = "b"), "<strong>" + Math.round(t) / 10 + "</strong> " + e
                    }, e.prototype._updateMaxFilesReachedClass = function () {
                        return this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? this.element.classList.add("dz-max-files-reached") : this.element.classList.remove("dz-max-files-reached")
                    }, e.prototype.drop = function (t) {
                        var e, i;
                        t.dataTransfer && (this.emit("drop", t), e = t.dataTransfer.files, this.emit("selectedfiles", e), e.length && (i = t.dataTransfer.items, i && i.length && (null != i[0].webkitGetAsEntry || null != i[0].getAsEntry) ? this.handleItems(i) : this.handleFiles(e)))
                    }, e.prototype.handleFiles = function (t) {
                        var e, i, n, a;
                        for (a = [], i = 0, n = t.length; n > i; i++) e = t[i], a.push(this.addFile(e));
                        return a
                    }, e.prototype.handleItems = function (t) {
                        var e, i, n, a;
                        for (n = 0, a = t.length; a > n; n++) i = t[n], null != i.webkitGetAsEntry ? (e = i.webkitGetAsEntry(), e.isFile ? this.addFile(i.getAsFile()) : e.isDirectory && this.addDirectory(e, e.name)) : this.addFile(i.getAsFile())
                    }, e.prototype.accept = function (t, i) {
                        return t.size > 1024 * 1024 * this.options.maxFilesize ? i(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(t.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) : e.isValidFile(t, this.options.acceptedFiles) ? this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (i(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)), this.emit("maxfilesexceeded", t)) : this.options.accept.call(this, t, i) : i(this.options.dictInvalidFileType)
                    }, e.prototype.addFile = function (t) {
                        var i = this;
                        return t.upload = {
                            progress: 0,
                            total: t.size,
                            bytesSent: 0
                        }, this.files.push(t), t.status = e.ADDED, this.emit("addedfile", t), this.options.createImageThumbnails && t.type.match(/image.*/) && t.size <= 1024 * 1024 * this.options.maxThumbnailFilesize && this.createThumbnail(t), this.accept(t, function (e) {
                            return e ? (t.accepted = !1, i._errorProcessing([t], e)) : i.enqueueFile(t)
                        })
                    }, e.prototype.enqueueFiles = function (t) {
                        var e, i, n;
                        for (i = 0, n = t.length; n > i; i++) e = t[i], this.enqueueFile(e);
                        return null
                    }, e.prototype.enqueueFile = function (t) {
                        var i = this;
                        if (t.accepted = !0, t.status !== e.ADDED) throw new Error("This file can't be queued because it has already been processed or was rejected.");
                        return t.status = e.QUEUED, this.options.autoProcessQueue ? setTimeout(function () {
                            return i.processQueue()
                        }, 1) : void 0
                    }, e.prototype.addDirectory = function (t, e) {
                        var i, n, a = this;
                        return i = t.createReader(), n = function (i) {
                            var n, r;
                            for (n = 0, r = i.length; r > n; n++) t = i[n], t.isFile ? t.file(function (t) {
                                return a.options.ignoreHiddenFiles && "." === t.name.substring(0, 1) ? void 0 : (t.fullPath = "" + e + "/" + t.name, a.addFile(t))
                            }) : t.isDirectory && a.addDirectory(t, "" + e + "/" + t.name)
                        }, i.readEntries(n, function (t) {
                            return "undefined" != typeof console && null !== console ? "function" == typeof console.log ? console.log(t) : void 0 : void 0
                        })
                    }, e.prototype.removeFile = function (t) {
                        return t.status === e.UPLOADING && this.cancelUpload(t), this.files = l(this.files, t), this.emit("removedfile", t), 0 === this.files.length ? this.emit("reset") : void 0
                    }, e.prototype.removeAllFiles = function (t) {
                        var i, n, a, r;
                        for (null == t && (t = !1), r = this.files.slice(), n = 0, a = r.length; a > n; n++) i = r[n], (i.status !== e.UPLOADING || t) && this.removeFile(i);
                        return null
                    }, e.prototype.createThumbnail = function (t) {
                        var e, i = this;
                        return e = new FileReader, e.onload = function () {
                            var n;
                            return n = new Image, n.onload = function () {
                                var e, a, r, s, o, l, h, c;
                                return t.width = n.width, t.height = n.height, r = i.options.resize.call(i, t), null == r.trgWidth && (r.trgWidth = i.options.thumbnailWidth), null == r.trgHeight && (r.trgHeight = i.options.thumbnailHeight), e = document.createElement("canvas"), a = e.getContext("2d"), e.width = r.trgWidth, e.height = r.trgHeight, a.drawImage(n, null != (o = r.srcX) ? o : 0, null != (l = r.srcY) ? l : 0, r.srcWidth, r.srcHeight, null != (h = r.trgX) ? h : 0, null != (c = r.trgY) ? c : 0, r.trgWidth, r.trgHeight), s = e.toDataURL("image/png"), i.emit("thumbnail", t, s)
                            }, n.src = e.result
                        }, e.readAsDataURL(t)
                    }, e.prototype.processQueue = function () {
                        var t, e, i, n;
                        if (e = this.options.parallelUploads, i = this.getUploadingFiles().length, t = i, !(i >= e) && (n = this.getQueuedFiles(), n.length > 0)) {
                            if (this.options.uploadMultiple) return this.processFiles(n.slice(0, e - i));
                            for (; e > t;) {
                                if (!n.length) return;
                                this.processFile(n.shift()), t++
                            }
                        }
                    }, e.prototype.processFile = function (t) {
                        return this.processFiles([t])
                    }, e.prototype.processFiles = function (t) {
                        var i, n, a;
                        for (n = 0, a = t.length; a > n; n++) i = t[n], i.processing = !0, i.status = e.UPLOADING, this.emit("processing", i);
                        return this.options.uploadMultiple && this.emit("processingmultiple", t), this.uploadFiles(t)
                    }, e.prototype._getFilesWithXhr = function (t) {
                        var e, i;
                        return i = function () {
                            var i, n, a, r;
                            for (a = this.files, r = [], i = 0, n = a.length; n > i; i++) e = a[i], e.xhr === t && r.push(e);
                            return r
                        }.call(this)
                    }, e.prototype.cancelUpload = function (t) {
                        var i, n, a, r, s, o, l;
                        if (t.status === e.UPLOADING) {
                            for (n = this._getFilesWithXhr(t.xhr), a = 0, s = n.length; s > a; a++) i = n[a], i.status = e.CANCELED;
                            for (t.xhr.abort(), r = 0, o = n.length; o > r; r++) i = n[r], this.emit("canceled", i);
                            this.options.uploadMultiple && this.emit("canceledmultiple", n)
                        } else((l = t.status) === e.ADDED || l === e.QUEUED) && (t.status = e.CANCELED, this.emit("canceled", t), this.options.uploadMultiple && this.emit("canceledmultiple", [t]));
                        return this.options.autoProcessQueue ? this.processQueue() : void 0
                    }, e.prototype.uploadFile = function (t) {
                        return this.uploadFiles([t])
                    }, e.prototype.uploadFiles = function (t) {
                        var n, a, r, s, o, l, h, c, u, d, f, p, g, m, v, b, y, x, w, _, C, k, S, D, T, F, M, A = this;
                        for (v = new XMLHttpRequest, b = 0, _ = t.length; _ > b; b++) n = t[b], n.xhr = v;
                        v.open(this.options.method, this.options.url, !0), v.withCredentials = !!this.options.withCredentials, p = null, r = function () {
                            var e, i, a;
                            for (a = [], e = 0, i = t.length; i > e; e++) n = t[e], a.push(A._errorProcessing(t, p || A.options.dictResponseError.replace("{{statusCode}}", v.status), v));
                            return a
                        }, g = function (e) {
                            var i, a, r, s, o, l, h, c, u;
                            if (null != e)
                                for (a = 100 * e.loaded / e.total, r = 0, l = t.length; l > r; r++) n = t[r], n.upload = {
                                    progress: a,
                                    total: e.total,
                                    bytesSent: e.loaded
                                };
                            else {
                                for (i = !0, a = 100, s = 0, h = t.length; h > s; s++) n = t[s], (100 !== n.upload.progress || n.upload.bytesSent !== n.upload.total) && (i = !1), n.upload.progress = a, n.upload.bytesSent = n.upload.total;
                                if (i) return
                            }
                            for (u = [], o = 0, c = t.length; c > o; o++) n = t[o], u.push(A.emit("uploadprogress", n, a, n.upload.bytesSent));
                            return u
                        }, v.onload = function (i) {
                            var n;
                            if (t[0].status !== e.CANCELED && 4 === v.readyState) {
                                if (p = v.responseText, v.getResponseHeader("content-type") && ~v.getResponseHeader("content-type").indexOf("application/json")) try {
                                    p = JSON.parse(p)
                                } catch (a) {
                                    i = a, p = "Invalid JSON response from server."
                                }
                                return g(), 200 <= (n = v.status) && 300 > n ? A._finished(t, p, i) : r()
                            }
                        }, v.onerror = function () {
                            return t[0].status !== e.CANCELED ? r() : void 0
                        }, f = null != (D = v.upload) ? D : v, f.onprogress = g, l = {
                            Accept: "application/json",
                            "Cache-Control": "no-cache",
                            "X-Requested-With": "XMLHttpRequest"
                        }, this.options.headers && i(l, this.options.headers);
                        for (s in l) o = l[s], v.setRequestHeader(s, o);
                        if (a = new FormData, this.options.params) {
                            T = this.options.params;
                            for (d in T) m = T[d], a.append(d, m)
                        }
                        for (y = 0, C = t.length; C > y; y++) n = t[y], this.emit("sending", n, v, a);
                        if (this.options.uploadMultiple && this.emit("sendingmultiple", t, v, a), "FORM" === this.element.tagName)
                            for (F = this.element.querySelectorAll("input, textarea, select, button"), x = 0, k = F.length; k > x; x++) h = F[x], c = h.getAttribute("name"), u = h.getAttribute("type"), (!u || "checkbox" !== (M = u.toLowerCase()) && "radio" !== M || h.checked) && a.append(c, h.value);
                        for (w = 0, S = t.length; S > w; w++) n = t[w], a.append("" + this.options.paramName + (this.options.uploadMultiple ? "[]" : ""), n, n.name);
                        return v.send(a)
                    }, e.prototype._finished = function (t, i, n) {
                        var a, r, s;
                        for (r = 0, s = t.length; s > r; r++) a = t[r], a.status = e.SUCCESS, this.emit("success", a, i, n), this.emit("complete", a);
                        return this.options.uploadMultiple && (this.emit("successmultiple", t, i, n), this.emit("completemultiple", t)), this.options.autoProcessQueue ? this.processQueue() : void 0
                    }, e.prototype._errorProcessing = function (t, i, n) {
                        var a, r, s;
                        for (r = 0, s = t.length; s > r; r++) a = t[r], a.status = e.ERROR, this.emit("error", a, i, n), this.emit("complete", a);
                        return this.options.uploadMultiple && (this.emit("errormultiple", t, i, n), this.emit("completemultiple", t)), this.options.autoProcessQueue ? this.processQueue() : void 0
                    }, e
                }(a), i.version = "3.7.1", i.options = {}, i.optionsForElement = function (t) {
                    return t.id ? i.options[r(t.id)] : void 0
                }, i.instances = [], i.forElement = function (t) {
                    if ("string" == typeof t && (t = document.querySelector(t)), null == (null != t ? t.dropzone : void 0)) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
                    return t.dropzone
                }, i.autoDiscover = !0, i.discover = function () {
                    var t, e, n, a, r, s;
                    for (document.querySelectorAll ? n = document.querySelectorAll(".dropzone") : (n = [], t = function (t) {
                        var e, i, a, r;
                        for (r = [], i = 0, a = t.length; a > i; i++) e = t[i], /(^| )dropzone($| )/.test(e.className) ? r.push(n.push(e)) : r.push(void 0);
                        return r
                    }, t(document.getElementsByTagName("div")), t(document.getElementsByTagName("form"))), s = [], a = 0, r = n.length; r > a; a++) e = n[a], i.optionsForElement(e) !== !1 ? s.push(new i(e)) : s.push(void 0);
                    return s
                }, i.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i], i.isBrowserSupported = function () {
                    var t, e, n, a, r;
                    if (t = !0, window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector)
                        if ("classList" in document.createElement("a"))
                            for (r = i.blacklistedBrowsers, n = 0, a = r.length; a > n; n++) e = r[n], e.test(navigator.userAgent) && (t = !1);
                        else t = !1;
                    else t = !1;
                    return t
                }, l = function (t, e) {
                    var i, n, a, r;
                    for (r = [], n = 0, a = t.length; a > n; n++) i = t[n], i !== e && r.push(i);
                    return r
                }, r = function (t) {
                    return t.replace(/[\-_](\w)/g, function (t) {
                        return t[1].toUpperCase()
                    })
                }, i.createElement = function (t) {
                    var e;
                    return e = document.createElement("div"), e.innerHTML = t, e.childNodes[0]
                }, i.elementInside = function (t, e) {
                    if (t === e) return !0;
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                    return !1
                }, i.getElement = function (t, e) {
                    var i;
                    if ("string" == typeof t ? i = document.querySelector(t) : null != t.nodeType && (i = t), null == i) throw new Error("Invalid `" + e + "` option provided. Please provide a CSS selector or a plain HTML element.");
                    return i
                }, i.getElements = function (t, e) {
                    var i, n, a, r, s, o, l, h;
                    if (t instanceof Array) {
                        a = [];
                        try {
                            for (r = 0, o = t.length; o > r; r++) n = t[r], a.push(this.getElement(n, e))
                        } catch (c) {
                            i = c, a = null
                        }
                    } else if ("string" == typeof t)
                        for (a = [], h = document.querySelectorAll(t), s = 0, l = h.length; l > s; s++) n = h[s], a.push(n);
                    else null != t.nodeType && (a = [t]); if (null == a || !a.length) throw new Error("Invalid `" + e + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
                    return a
                }, i.confirm = function (t, e, i) {
                    return window.confirm(t) ? e() : null != i ? i() : void 0
                }, i.isValidFile = function (t, e) {
                    var i, n, a, r, s;
                    if (!e) return !0;
                    for (e = e.split(","), n = t.type, i = n.replace(/\/.*$/, ""), r = 0, s = e.length; s > r; r++)
                        if (a = e[r], a = a.trim(), "." === a.charAt(0)) {
                            if (-1 !== t.name.indexOf(a, t.name.length - a.length)) return !0
                        } else if (/\/\*$/.test(a)) {
                        if (i === a.replace(/\/.*$/, "")) return !0
                    } else if (n === a) return !0;
                    return !1
                }, "undefined" != typeof t && null !== t && (t.fn.dropzone = function (t) {
                    return this.each(function () {
                        return new i(this, t)
                    })
                }), "undefined" != typeof n && null !== n ? n.exports = i : window.Dropzone = i, i.ADDED = "added", i.QUEUED = "queued", i.ACCEPTED = i.QUEUED, i.UPLOADING = "uploading", i.PROCESSING = i.UPLOADING, i.CANCELED = "canceled", i.ERROR = "error", i.SUCCESS = "success", s = function (t, e) {
                    var i, n, a, r, s, o, l, h, c;
                    if (a = !1, c = !0, n = t.document, h = n.documentElement, i = n.addEventListener ? "addEventListener" : "attachEvent", l = n.addEventListener ? "removeEventListener" : "detachEvent", o = n.addEventListener ? "" : "on", r = function (i) {
                        return "readystatechange" !== i.type || "complete" === n.readyState ? (("load" === i.type ? t : n)[l](o + i.type, r, !1), !a && (a = !0) ? e.call(t, i.type || i) : void 0) : void 0
                    }, s = function () {
                        var t;
                        try {
                            h.doScroll("left")
                        } catch (e) {
                            return t = e, setTimeout(s, 50), void 0
                        }
                        return r("poll")
                    }, "complete" !== n.readyState) {
                        if (n.createEventObject && h.doScroll) {
                            try {
                                c = !t.frameElement
                            } catch (u) {}
                            c && s()
                        }
                        return n[i](o + "DOMContentLoaded", r, !1), n[i](o + "readystatechange", r, !1), t[i](o + "load", r, !1)
                    }
                }, i._autoDiscoverFunction = function () {
                    return i.autoDiscover ? i.discover() : void 0
                }, s(window, i._autoDiscoverFunction)
            }.call(this), n.exports
    }),
    /*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
     * Copyright (c) 2013 Jörn Zaefferer; Licensed MIT */
    function (t) {
        t.extend(t.fn, {
            validate: function (e) {
                if (!this.length) return e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."), void 0;
                var i = t.data(this[0], "validator");
                return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function (e) {
                    i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0)
                }), this.submit(function (e) {
                    function n() {
                        var n;
                        return i.settings.submitHandler ? (i.submitButton && (n = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && n.remove(), !1) : !0
                    }
                    return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, n()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : n() : (i.focusInvalid(), !1)
                })), i)
            },
            valid: function () {
                if (t(this[0]).is("form")) return this.validate().form();
                var e = !0,
                    i = t(this[0].form).validate();
                return this.each(function () {
                    e = e && i.element(this)
                }), e
            },
            removeAttrs: function (e) {
                var i = {},
                    n = this;
                return t.each(e.split(/\s/), function (t, e) {
                    i[e] = n.attr(e), n.removeAttr(e)
                }), i
            },
            rules: function (e, i) {
                var n = this[0];
                if (e) {
                    var a = t.data(n.form, "validator").settings,
                        r = a.rules,
                        s = t.validator.staticRules(n);
                    switch (e) {
                    case "add":
                        t.extend(s, t.validator.normalizeRule(i)), delete s.messages, r[n.name] = s, i.messages && (a.messages[n.name] = t.extend(a.messages[n.name], i.messages));
                        break;
                    case "remove":
                        if (!i) return delete r[n.name], s;
                        var o = {};
                        return t.each(i.split(/\s/), function (t, e) {
                            o[e] = s[e], delete s[e]
                        }), o
                    }
                }
                var l = t.validator.normalizeRules(t.extend({}, t.validator.classRules(n), t.validator.attributeRules(n), t.validator.dataRules(n), t.validator.staticRules(n)), n);
                if (l.required) {
                    var h = l.required;
                    delete l.required, l = t.extend({
                        required: h
                    }, l)
                }
                return l
            }
        }), t.extend(t.expr[":"], {
            blank: function (e) {
                return !t.trim("" + t(e).val())
            },
            filled: function (e) {
                return !!t.trim("" + t(e).val())
            },
            unchecked: function (e) {
                return !t(e).prop("checked")
            }
        }), t.validator = function (e, i) {
            this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
        }, t.validator.format = function (e, i) {
            return 1 === arguments.length ? function () {
                var i = t.makeArray(arguments);
                return i.unshift(e), t.validator.format.apply(this, i)
            } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function (t, i) {
                e = e.replace(RegExp("\\{" + t + "\\}", "g"), function () {
                    return i
                })
            }), e)
        }, t.extend(t.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                focusInvalid: !0,
                errorContainer: t([]),
                errorLabelContainer: t([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function (t) {
                    this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
                },
                onfocusout: function (t) {
                    this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
                },
                onkeyup: function (t, e) {
                    (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t)
                },
                onclick: function (t) {
                    t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
                },
                highlight: function (e, i, n) {
                    "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(n) : t(e).addClass(i).removeClass(n)
                },
                unhighlight: function (e, i, n) {
                    "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(n) : t(e).removeClass(i).addClass(n)
                }
            },
            setDefaults: function (e) {
                t.extend(t.validator.defaults, e)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: t.validator.format("Please enter no more than {0} characters."),
                minlength: t.validator.format("Please enter at least {0} characters."),
                rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
                range: t.validator.format("Please enter a value between {0} and {1}."),
                max: t.validator.format("Please enter a value less than or equal to {0}."),
                min: t.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function () {
                    function e(e) {
                        var i = t.data(this[0].form, "validator"),
                            n = "on" + e.type.replace(/^validate/, "");
                        i.settings[n] && i.settings[n].call(i, this[0], e)
                    }
                    this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var i = this.groups = {};
                    t.each(this.settings.groups, function (e, n) {
                        "string" == typeof n && (n = n.split(/\s/)), t.each(n, function (t, n) {
                            i[n] = e
                        })
                    });
                    var n = this.settings.rules;
                    t.each(n, function (e, i) {
                        n[e] = t.validator.normalizeRule(i)
                    }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                },
                form: function () {
                    return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function () {
                    this.prepareForm();
                    for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                    return this.valid()
                },
                element: function (e) {
                    e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
                    var i = this.check(e) !== !1;
                    return i ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i
                },
                showErrors: function (e) {
                    if (e) {
                        t.extend(this.errorMap, e), this.errorList = [];
                        for (var i in e) this.errorList.push({
                            message: e[i],
                            element: this.findByName(i)[0]
                        });
                        this.successList = t.grep(this.successList, function (t) {
                            return !(t.name in e)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function () {
                    t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
                },
                numberOfInvalids: function () {
                    return this.objectLength(this.invalid)
                },
                objectLength: function (t) {
                    var e = 0;
                    for (var i in t) e++;
                    return e
                },
                hideErrors: function () {
                    this.addWrapper(this.toHide).hide()
                },
                valid: function () {
                    return 0 === this.size()
                },
                size: function () {
                    return this.errorList.length
                },
                focusInvalid: function () {
                    if (this.settings.focusInvalid) try {
                        t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (e) {}
                },
                findLastActive: function () {
                    var e = this.lastActive;
                    return e && 1 === t.grep(this.errorList, function (t) {
                        return t.element.name === e.name
                    }).length && e
                },
                elements: function () {
                    var e = this,
                        i = {};
                    return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                        return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0)
                    })
                },
                clean: function (e) {
                    return t(e)[0]
                },
                errors: function () {
                    var e = this.settings.errorClass.replace(" ", ".");
                    return t(this.settings.errorElement + "." + e, this.errorContext)
                },
                reset: function () {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
                },
                prepareForm: function () {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function (t) {
                    this.reset(), this.toHide = this.errorsFor(t)
                },
                elementValue: function (e) {
                    var i = t(e).attr("type"),
                        n = t(e).val();
                    return "radio" === i || "checkbox" === i ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof n ? n.replace(/\r/g, "") : n
                },
                check: function (e) {
                    e = this.validationTargetFor(this.clean(e));
                    var i, n = t(e).rules(),
                        a = !1,
                        r = this.elementValue(e);
                    for (var s in n) {
                        var o = {
                            method: s,
                            parameters: n[s]
                        };
                        try {
                            if (i = t.validator.methods[s].call(this, r, e, o.parameters), "dependency-mismatch" === i) {
                                a = !0;
                                continue
                            }
                            if (a = !1, "pending" === i) return this.toHide = this.toHide.not(this.errorsFor(e)), void 0;
                            if (!i) return this.formatAndAdd(e, o), !1
                        } catch (l) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + o.method + "' method.", l), l
                        }
                    }
                    return a ? void 0 : (this.objectLength(n) && this.successList.push(e), !0)
                },
                customDataMessage: function (e, i) {
                    return t(e).data("msg-" + i.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + i.toLowerCase())
                },
                customMessage: function (t, e) {
                    var i = this.settings.messages[t];
                    return i && (i.constructor === String ? i : i[e])
                },
                findDefined: function () {
                    for (var t = 0; arguments.length > t; t++)
                        if (void 0 !== arguments[t]) return arguments[t];
                    return void 0
                },
                defaultMessage: function (e, i) {
                    return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
                },
                formatAndAdd: function (e, i) {
                    var n = this.defaultMessage(e, i.method),
                        a = /\$?\{(\d+)\}/g;
                    "function" == typeof n ? n = n.call(this, i.parameters, e) : a.test(n) && (n = t.validator.format(n.replace(a, "{$1}"), i.parameters)), this.errorList.push({
                        message: n,
                        element: e
                    }), this.errorMap[e.name] = n, this.submitted[e.name] = n
                },
                addWrapper: function (t) {
                    return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
                },
                defaultShowErrors: function () {
                    var t, e;
                    for (t = 0; this.errorList[t]; t++) {
                        var i = this.errorList[t];
                        this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message)
                    }
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                        for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                    if (this.settings.unhighlight)
                        for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function () {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function () {
                    return t(this.errorList).map(function () {
                        return this.element
                    })
                },
                showLabel: function (e, i) {
                    var n = this.errorsFor(e);
                    n.length ? (n.removeClass(this.settings.validClass).addClass(this.settings.errorClass), n.html(i)) : (n = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (n = n.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(n).length || (this.settings.errorPlacement ? this.settings.errorPlacement(n, t(e)) : n.insertAfter(e))), !i && this.settings.success && (n.text(""), "string" == typeof this.settings.success ? n.addClass(this.settings.success) : this.settings.success(n, e)), this.toShow = this.toShow.add(n)
                },
                errorsFor: function (e) {
                    var i = this.idOrName(e);
                    return this.errors().filter(function () {
                        return t(this).attr("for") === i
                    })
                },
                idOrName: function (t) {
                    return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
                },
                validationTargetFor: function (t) {
                    return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
                },
                checkable: function (t) {
                    return /radio|checkbox/i.test(t.type)
                },
                findByName: function (e) {
                    return t(this.currentForm).find("[name='" + e + "']")
                },
                getLength: function (e, i) {
                    switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return t("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                    }
                    return e.length
                },
                depend: function (t, e) {
                    return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
                },
                dependTypes: {
                    "boolean": function (t) {
                        return t
                    },
                    string: function (e, i) {
                        return !!t(e, i.form).length
                    },
                    "function": function (t, e) {
                        return t(e)
                    }
                },
                optional: function (e) {
                    var i = this.elementValue(e);
                    return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
                },
                startRequest: function (t) {
                    this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
                },
                stopRequest: function (e, i) {
                    this.pendingRequest--, 0 > this.pendingRequest && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                previousValue: function (e) {
                    return t.data(e, "previousValue") || t.data(e, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(e, "remote")
                    })
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function (e, i) {
                e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
            },
            classRules: function (e) {
                var i = {},
                    n = t(e).attr("class");
                return n && t.each(n.split(" "), function () {
                    this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
                }), i
            },
            attributeRules: function (e) {
                var i = {},
                    n = t(e),
                    a = n[0].getAttribute("type");
                for (var r in t.validator.methods) {
                    var s;
                    "required" === r ? (s = n.get(0).getAttribute(r), "" === s && (s = !0), s = !!s) : s = n.attr(r), /min|max/.test(r) && (null === a || /number|range|text/.test(a)) && (s = Number(s)), s ? i[r] = s : a === r && "range" !== a && (i[r] = !0)
                }
                return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i
            },
            dataRules: function (e) {
                var i, n, a = {},
                    r = t(e);
                for (i in t.validator.methods) n = r.data("rule-" + i.toLowerCase()), void 0 !== n && (a[i] = n);
                return a
            },
            staticRules: function (e) {
                var i = {},
                    n = t.data(e.form, "validator");
                return n.settings.rules && (i = t.validator.normalizeRule(n.settings.rules[e.name]) || {}), i
            },
            normalizeRules: function (e, i) {
                return t.each(e, function (n, a) {
                    if (a === !1) return delete e[n], void 0;
                    if (a.param || a.depends) {
                        var r = !0;
                        switch (typeof a.depends) {
                        case "string":
                            r = !!t(a.depends, i.form).length;
                            break;
                        case "function":
                            r = a.depends.call(i, i)
                        }
                        r ? e[n] = void 0 !== a.param ? a.param : !0 : delete e[n]
                    }
                }), t.each(e, function (n, a) {
                    e[n] = t.isFunction(a) ? a(i) : a
                }), t.each(["minlength", "maxlength"], function () {
                    e[this] && (e[this] = Number(e[this]))
                }), t.each(["rangelength", "range"], function () {
                    var i;
                    e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
                }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
            },
            normalizeRule: function (e) {
                if ("string" == typeof e) {
                    var i = {};
                    t.each(e.split(/\s/), function () {
                        i[this] = !0
                    }), e = i
                }
                return e
            },
            addMethod: function (e, i, n) {
                t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== n ? n : t.validator.messages[e], 3 > i.length && t.validator.addClassRules(e, t.validator.normalizeRule(e))
            },
            methods: {
                required: function (e, i, n) {
                    if (!this.depend(n, i)) return "dependency-mismatch";
                    if ("select" === i.nodeName.toLowerCase()) {
                        var a = t(i).val();
                        return a && a.length > 0
                    }
                    return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0
                },
                email: function (t, e) {
                    return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
                },
                url: function (t, e) {
                    return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
                },
                date: function (t, e) {
                    return this.optional(e) || !/Invalid|NaN/.test("" + new Date(t))
                },
                dateISO: function (t, e) {
                    return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
                },
                number: function (t, e) {
                    return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
                },
                digits: function (t, e) {
                    return this.optional(e) || /^\d+$/.test(t)
                },
                creditcard: function (t, e) {
                    if (this.optional(e)) return "dependency-mismatch";
                    if (/[^0-9 \-]+/.test(t)) return !1;
                    var i = 0,
                        n = 0,
                        a = !1;
                    t = t.replace(/\D/g, "");
                    for (var r = t.length - 1; r >= 0; r--) {
                        var s = t.charAt(r);
                        n = parseInt(s, 10), a && (n *= 2) > 9 && (n -= 9), i += n, a = !a
                    }
                    return 0 === i % 10
                },
                minlength: function (e, i, n) {
                    var a = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                    return this.optional(i) || a >= n
                },
                maxlength: function (e, i, n) {
                    var a = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                    return this.optional(i) || n >= a
                },
                rangelength: function (e, i, n) {
                    var a = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                    return this.optional(i) || a >= n[0] && n[1] >= a
                },
                min: function (t, e, i) {
                    return this.optional(e) || t >= i
                },
                max: function (t, e, i) {
                    return this.optional(e) || i >= t
                },
                range: function (t, e, i) {
                    return this.optional(e) || t >= i[0] && i[1] >= t
                },
                equalTo: function (e, i, n) {
                    var a = t(n);
                    return this.settings.onfocusout && a.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                        t(i).valid()
                    }), e === a.val()
                },
                remote: function (e, i, n) {
                    if (this.optional(i)) return "dependency-mismatch";
                    var a = this.previousValue(i);
                    if (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), a.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = a.message, n = "string" == typeof n && {
                        url: n
                    } || n, a.old === e) return a.valid;
                    a.old = e;
                    var r = this;
                    this.startRequest(i);
                    var s = {};
                    return s[i.name] = e, t.ajax(t.extend(!0, {
                        url: n,
                        mode: "abort",
                        port: "validate" + i.name,
                        dataType: "json",
                        data: s,
                        success: function (n) {
                            r.settings.messages[i.name].remote = a.originalMessage;
                            var s = n === !0 || "true" === n;
                            if (s) {
                                var o = r.formSubmitted;
                                r.prepareElement(i), r.formSubmitted = o, r.successList.push(i), delete r.invalid[i.name], r.showErrors()
                            } else {
                                var l = {},
                                    h = n || r.defaultMessage(i, "remote");
                                l[i.name] = a.message = t.isFunction(h) ? h(e) : h, r.invalid[i.name] = !0, r.showErrors(l)
                            }
                            a.valid = s, r.stopRequest(i, s)
                        }
                    }, n)), "pending"
                }
            }
        }), t.format = t.validator.format
    }(jQuery),
    function (t) {
        var e = {};
        if (t.ajaxPrefilter) t.ajaxPrefilter(function (t, i, n) {
            var a = t.port;
            "abort" === t.mode && (e[a] && e[a].abort(), e[a] = n)
        });
        else {
            var i = t.ajax;
            t.ajax = function (n) {
                var a = ("mode" in n ? n : t.ajaxSettings).mode,
                    r = ("port" in n ? n : t.ajaxSettings).port;
                return "abort" === a ? (e[r] && e[r].abort(), e[r] = i.apply(this, arguments), e[r]) : i.apply(this, arguments)
            }
        }
    }(jQuery),
    function (t) {
        t.extend(t.fn, {
            validateDelegate: function (e, i, n) {
                return this.bind(i, function (i) {
                    var a = t(i.target);
                    return a.is(e) ? n.apply(a, arguments) : void 0
                })
            }
        })
    }(jQuery),
    function (t) {
        var e = function (e, i) {
            e = t(e);
            var n = this,
                a = t.extend({}, t.fn.bootstrapWizard.defaults, i),
                r = null,
                s = null;
            this.rebindClick = function (t, e) {
                t.unbind("click", e).bind("click", e)
            }, this.fixNavigationButtons = function () {
                return r.length || (s.find("a:first").tab("show"), r = s.find("li:first")), t(a.previousSelector, e).toggleClass("disabled", n.firstIndex() >= n.currentIndex()), t(a.nextSelector, e).toggleClass("disabled", n.currentIndex() >= n.navigationLength()), n.rebindClick(t(a.nextSelector, e), n.next), n.rebindClick(t(a.previousSelector, e), n.previous), n.rebindClick(t(a.lastSelector, e), n.last), n.rebindClick(t(a.firstSelector, e), n.first), a.onTabShow && "function" == typeof a.onTabShow && !1 === a.onTabShow(r, s, n.currentIndex()) ? !1 : void 0
            }, this.next = function () {
                return e.hasClass("last") || a.onNext && "function" == typeof a.onNext && !1 === a.onNext(r, s, n.nextIndex()) ? !1 : ($index = n.nextIndex(), $index > n.navigationLength() || s.find("li:eq(" + $index + ") a").tab("show"), void 0)
            }, this.previous = function () {
                return e.hasClass("first") || a.onPrevious && "function" == typeof a.onPrevious && !1 === a.onPrevious(r, s, n.previousIndex()) ? !1 : ($index = n.previousIndex(), 0 > $index || s.find("li:eq(" + $index + ") a").tab("show"), void 0)
            }, this.first = function () {
                return a.onFirst && "function" == typeof a.onFirst && !1 === a.onFirst(r, s, n.firstIndex()) || e.hasClass("disabled") ? !1 : (s.find("li:eq(0) a").tab("show"), void 0)
            }, this.last = function () {
                return a.onLast && "function" == typeof a.onLast && !1 === a.onLast(r, s, n.lastIndex()) || e.hasClass("disabled") ? !1 : (s.find("li:eq(" + n.navigationLength() + ") a").tab("show"), void 0)
            }, this.currentIndex = function () {
                return s.find("li").index(r)
            }, this.firstIndex = function () {
                return 0
            }, this.lastIndex = function () {
                return n.navigationLength()
            }, this.getIndex = function (t) {
                return s.find("li").index(t)
            }, this.nextIndex = function () {
                return s.find("li").index(r) + 1
            }, this.previousIndex = function () {
                return s.find("li").index(r) - 1
            }, this.navigationLength = function () {
                return s.find("li").length - 1
            }, this.activeTab = function () {
                return r
            }, this.nextTab = function () {
                return s.find("li:eq(" + (n.currentIndex() + 1) + ")").length ? s.find("li:eq(" + (n.currentIndex() + 1) + ")") : null
            }, this.previousTab = function () {
                return 0 >= n.currentIndex() ? null : s.find("li:eq(" + parseInt(n.currentIndex() - 1) + ")")
            }, this.show = function (t) {
                return e.find("li:eq(" + t + ") a").tab("show")
            }, this.disable = function (t) {
                s.find("li:eq(" + t + ")").addClass("disabled")
            }, this.enable = function (t) {
                s.find("li:eq(" + t + ")").removeClass("disabled")
            }, this.hide = function (t) {
                s.find("li:eq(" + t + ")").hide()
            }, this.display = function (t) {
                s.find("li:eq(" + t + ")").show()
            }, this.remove = function (e) {
                var i = "undefined" != typeof e[1] ? e[1] : !1;
                e = s.find("li:eq(" + e[0] + ")"), i && (i = e.find("a").attr("href"), t(i).remove()), e.remove()
            }, s = e.find("ul:first", e), r = s.find("li.active", e), s.hasClass(a.tabClass) || s.addClass(a.tabClass), a.onInit && "function" == typeof a.onInit && a.onInit(r, s, 0), a.onShow && "function" == typeof a.onShow && a.onShow(r, s, n.nextIndex()), n.fixNavigationButtons(), t('a[data-toggle="tab"]', s).on("click", function (e) {
                return e = s.find("li").index(t(e.currentTarget).parent("li")), a.onTabClick && "function" == typeof a.onTabClick && !1 === a.onTabClick(r, s, n.currentIndex(), e) ? !1 : void 0
            }), t('a[data-toggle="tab"]', s).on("shown", function (e) {
                return $element = t(e.target).parent(), e = s.find("li").index($element), $element.hasClass("disabled") || a.onTabChange && "function" == typeof a.onTabChange && !1 === a.onTabChange(r, s, n.currentIndex(), e) ? !1 : (r = $element, n.fixNavigationButtons(), void 0)
            })
        };
        t.fn.bootstrapWizard = function (i) {
            if ("string" == typeof i) {
                var n = Array.prototype.slice.call(arguments, 1);
                return 1 === n.length && n.toString(), this.data("bootstrapWizard")[i](n)
            }
            return this.each(function (n) {
                if (n = t(this), !n.data("bootstrapWizard")) {
                    var a = new e(n, i);
                    n.data("bootstrapWizard", a)
                }
            })
        }, t.fn.bootstrapWizard.defaults = {
            tabClass: "nav nav-pills",
            nextSelector: ".wizard li.next",
            previousSelector: ".wizard li.previous",
            firstSelector: ".wizard li.first",
            lastSelector: ".wizard li.last",
            onShow: null,
            onInit: null,
            onNext: null,
            onPrevious: null,
            onLast: null,
            onFirst: null,
            onTabChange: null,
            onTabClick: null,
            onTabShow: null
        }
    }(jQuery), $(function () {
        $(".set-widget-color").on("click", function () {
            var t = $(this).data("widget-color");
            return $(this).closest(".widget").attr("class", "widget widget-" + t), !1
        }), $(".menu-toggler").on("click", function () {
            return $(".all-wrapper").toggleClass("hide-sub-menu"), !1
        }), $(".main-content").scrollspy({
            target: ".sub-sidebar-wrapper"
        }), $(".remove-tr").on("click", function () {
            return $row = $(this).closest("tr"), $row.addClass("danger"), setTimeout(function () {
                $row.remove()
            }, 300), !1
        }), $(".mask_date").mask("99/99/9999"), $(".mask_phone").mask("(999) 999-9999"), $(".mask_taxid").mask("99-9999999"), $(".mask_ssn").mask("999-99-9999"), $(".mask_money").maskMoney({
            symbol: "$ "
        }), $(".summernote").summernote({
            height: 150
        }), $(".input-datepicker").datepicker(), $(".input-timepicker").timepicker(), $(".input-daterangepicker").daterangepicker(), $(".input-colorpicker").colpick({
            onSubmit: function (t, e, i, n) {
                $(n).val("#" + e).prev(".input-group-addon").css("background-color", "#" + e).css("border-color", "#" + e), $(n).colpickHide()
            }
        }), $(".input-colorpicker-simple").colpick({
            layout: "hex",
            onSubmit: function (t, e, i, n) {
                $(n).val("#" + e).prev(".input-group-addon").css("background-color", "#" + e).css("border-color", "#" + e), $(n).colpickHide()
            }
        }), $(".input-colorpicker-dark").colpick({
            colorScheme: "dark",
            onSubmit: function (t, e, i, n) {
                $(n).val("#" + e).prev(".input-group-addon").css("background-color", "#" + e).css("border-color", "#" + e), $(n).colpickHide()
            }
        }), $(".input-colorpicker-dark-simple").colpick({
            colorScheme: "dark",
            layout: "hex",
            onSubmit: function (t, e, i, n) {
                $(n).val("#" + e).prev(".input-group-addon").css("background-color", "#" + e).css("border-color", "#" + e), $(n).colpickHide()
            }
        }), /*$("[data-toggle='tooltip']").tooltip(), $(".widget-control-remove").on("click", function () {
            return $(this).closest(".widget").slideUp("fast"), !1
        }),*/ $(".widget-control-minimize").on("click", function () {
            return $elem = $(this), $elem.closest(".widget").hasClass("widget-title-minimized") ? $elem.closest(".widget").removeClass("widget-minimized").removeClass("widget-title-minimized").find(".widget-content").slideDown("fast") : $elem.closest(".widget").addClass("widget-minimized").find(".widget-content").slideUp("fast", function () {
                $elem.closest(".widget").addClass("widget-title-minimized")
            }), !1
        }), $(".widget-control-refresh").on("click", function () {
            var t;
            return t = $(this), toggle_loading(t), setTimeout(function () {
                toggle_loading(t, !0)
            }, 1e3), !1
        }), $(".chosen-select").chosen()
    });;