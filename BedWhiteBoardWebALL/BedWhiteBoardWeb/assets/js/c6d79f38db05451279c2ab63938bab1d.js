$(function () {
    function e() {
        for (l.length > 0 && (l = l.slice(1)); l.length < i;) {
            var e = l.length > 0 ? l[l.length - 1] : 50,
                r = a(1, 9),
                o = a(1, 9),
                n = e + r - o;
            0 > n ? n = 0 : n > 100 && (n = 100), l.push(n)
        }
        for (var s = [], t = 0; t < l.length; ++t) s.push([t, l[t]]);
        return [s, n]
    }

    function a(e, a) {
        return Math.floor(Math.random() * (a - e + 1) + e)
    }

    function r() {
        random_data = e(), t.setData([random_data][0]), $("#plot-chart-value").text(random_data[1]), t.draw(), setTimeout(r, s)
    }
    $(".dynamicsparkline").sparkline([10, 8, 5, 7, 5, 4, 1, 10, 8, 12, 7, 7, 4, 5, 8, 8, 7, 7, 11, 5, 9, 12, 7, 7, 4, 5, 8, 8], {
        type: "line",
        lineColor: "#89b1e4",
        fillColor: "#d7e8fc"
    }), $(".dynamicbars").sparkline([5, 6, 7, 2, 0, -4, -2, 4, 1, 10, 8, 12, 7, -2, 4, 8], {
        type: "bar",
        barColor: "#89b1e4",
        negBarColor: "#c76868"
    }), $(".knob").knob({
        thickness: ".05",
        font: "Open Sans",
        bgColor: "#f3eee7",
        readOnly: !0
    });
    var o = {
        element: "areachart",
        behaveLikeLine: !0,
        data: [{
            x: "2011-01",
            y: 15,
            z: 7
        }, {
            x: "2011-02",
            y: 26,
            z: 4
        }, {
            x: "2011-03",
            y: 21,
            z: 18
        }, {
            x: "2011-04",
            y: 32,
            z: 18
        }, {
            x: "2011-05",
            y: 15,
            z: 7
        }, {
            x: "2011-06",
            y: 26,
            z: 4
        }, {
            x: "2011-07",
            y: 18,
            z: 14
        }, {
            x: "2011-08",
            y: 36,
            z: 11
        }, {
            x: "2011-09",
            y: 15,
            z: 12
        }, {
            x: "2011-10",
            y: 26,
            z: 4
        }, {
            x: "2011-11",
            y: 28,
            z: 11
        }, {
            x: "2011-12",
            y: 36,
            z: 14
        }],
        xkey: "x",
        ykeys: ["y", "z"],
        labels: ["Y", "Z"],
        lineColors: ["#E8BEBE", "#BCCBDD", "#3498db", "#2c3e50", "#1abc9c", "#34495e", "#9b59b6", "#e74c3c"]
    };
    Morris.Area(o), Morris.Donut({
        element: "piechart",
        data: [{
            label: "Jam",
            value: 25
        }, {
            label: "Frosted",
            value: 40
        }, {
            label: "Custard",
            value: 25
        }, {
            label: "Sugar",
            value: 10
        }],
        colors: ["#3498db", "#34495e", "#1abc9c", "#34495e", "#9b59b6", "#95a5a6"],
        formatter: function (e) {
            return e + "%"
        }
    }), Morris.Bar({
        element: "topsellers_barchart",
        data: [{
            device: "3G",
            geekbench: 137
        }, {
            device: "3GS",
            geekbench: 275
        }, {
            device: "4",
            geekbench: 380
        }, {
            device: "4S",
            geekbench: 655
        }, {
            device: "5",
            geekbench: 1571
        }],
        xkey: "device",
        ykeys: ["geekbench"],
        labels: ["Geekbench"],
        barRatio: .4,
        xLabelAngle: 35,
        hideHover: "auto"
    });
    var o = {
        element: "areachart-small",
        behaveLikeLine: !0,
        data: [{
            x: "2011-01",
            y: 15,
            z: 7
        }, {
            x: "2011-02",
            y: 26,
            z: 4
        }, {
            x: "2011-03",
            y: 21,
            z: 18
        }, {
            x: "2011-04",
            y: 32,
            z: 18
        }, {
            x: "2011-05",
            y: 15,
            z: 7
        }, {
            x: "2011-06",
            y: 26,
            z: 4
        }, {
            x: "2011-07",
            y: 18,
            z: 14
        }],
        xkey: "x",
        ykeys: ["y", "z"],
        labels: ["Y", "Z"],
        grid: !1,
        lineColors: ["#3498DB", "#E74C3C", "#F39C12", "#2C3E50", "#1abc9c", "#34495e", "#9b59b6", "#e74c3c"]
    };
    Morris.Line(o), new JustGage({
        id: "gauge-red",
        value: 46,
        min: 0,
        max: 100,
        showInnerShadow: !1,
        showMinMax: !1,
        gaugeColor: "#EAEAEA",
        levelColors: ["#E74C3C", "#E74C3C", "#E74C3C"],
        title: "Server Load"
    }), new JustGage({
        id: "gauge-green",
        value: 67,
        min: 0,
        max: 100,
        showInnerShadow: !1,
        showMinMax: !1,
        gaugeColor: "#EAEAEA",
        levelColors: ["#1ABC9C", "#1ABC9C", "#1ABC9C"],
        title: "New Visits"
    }), new JustGage({
        id: "gauge-blue",
        value: 25,
        min: 0,
        max: 100,
        showInnerShadow: !1,
        showMinMax: !1,
        gaugeColor: "#EAEAEA",
        levelColors: ["#3498DB", "#3498DB", "#3498DB"],
        title: "Sales"
    }), Morris.Bar({
        element: "users_barchart",
        data: [{
            device: "Ned",
            geekbench: 5
        }, {
            device: "Aus",
            geekbench: 3
        }, {
            device: "Fra",
            geekbench: 7
        }, {
            device: "Rus",
            geekbench: 6
        }, {
            device: "Nor",
            geekbench: 2
        }],
        xkey: "device",
        ykeys: ["geekbench"],
        labels: ["Geekbench"],
        barRatio: .2,
        xLabelAngle: 90,
        hideHover: "auto",
        barColors: ["#61a9dc"]
    });
    var n = [{
        period: "2012 Q3",
        licensed: 3407,
        sorned: 660
    }, {
        period: "2012 Q1",
        licensed: 2800,
        sorned: 629
    }, {
        period: "2011 Q2",
        licensed: 2700,
        sorned: 618
    }, {
        period: "2010 Q4",
        licensed: 3100,
        sorned: 650
    }, {
        period: "2009 Q4",
        licensed: 3600,
        sorned: 900
    }, {
        period: "2008 Q4",
        licensed: 2200,
        sorned: 681
    }, {
        period: "2007 Q4",
        licensed: 1800,
        sorned: 620
    }];
    Morris.Line({
        element: "linechart",
        data: n,
        xkey: "period",
        ykeys: ["licensed", "sorned"],
        labels: ["Licensed", "Off the road"]
    }), $(".advanced-pie").each(function () {
        var e = $(this).data("barColor"),
            a = $(this).data("size");
        $(this).easyPieChart({
            barColor: e,
            scaleColor: "#BFBDB7",
            trackColor: !1,
            size: a
        })
    });
    var l = [],
        i = 50,
        s = 150;
    $("#updateInterval").val(s).change(function () {
        var e = $(this).val();
        e && !isNaN(+e) && (s = +e, 1 > s ? s = 1 : s > 2e3 && (s = 2e3), $(this).val("" + s))
    }), random_data = e();
    var t = $.plot("#placeholder", [random_data[0]], {
        grid: {
            borderWidth: 0
        },
        series: {
            color: "#3498DB",
            lines: {
                lineWidth: 4,
                fill: .1
            },
            shadowSize: 0,
            points: {
                radius: 5
            }
        },
        yaxis: {
            min: 0,
            max: 100,
            color: "#e5e5e5",
            ticks: 4,
            font: {
                color: "#aaa"
            }
        },
        xaxis: {
            color: "#eee",
            ticks: 10,
            font: {
                color: "#aaa"
            }
        }
    });
    r()
});;