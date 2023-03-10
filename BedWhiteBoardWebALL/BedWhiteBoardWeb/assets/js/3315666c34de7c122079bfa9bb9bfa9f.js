$(function () {
    function e() {
        for (c.length > 0 && (c = c.slice(1)); c.length < d;) {
            var e = c.length > 0 ? c[c.length - 1] : 50,
                t = a(1, 9),
                l = a(1, 9),
                n = e + t - l;
            0 > n ? n = 0 : n > 100 && (n = 100), c.push(n)
        }
        for (var r = [], o = 0; o < c.length; ++o) r.push([o, c[o]]);
        return [r, n]
    }

    function a(e, a) {
        return Math.floor(Math.random() * (a - e + 1) + e)
    }

    function t() {
        random_data = e(), g.setData([random_data][0]), $("#plot-chart-value").text(random_data[1]), g.draw(), setTimeout(t, h)
    }
    $(".dynamicsparkline").sparkline([10, 8, 5, 7, 5, 4, 1, 10, 8, 12, 7, 7, 4, 5, 8, 8, 7, 7, 11, 5, 9, 12, 7], {
        type: "line",
        lineColor: "#7BB4CE",
        fillColor: "#DEF0F9"
    }), $(".dynamicbars").sparkline([5, 6, 7, 2, 0, -4, -2, 4, 1, 10, 8, 12, 7, -2, 4, 8, 10, 8], {
        type: "bar",
        barColor: "#7BB4CE",
        negBarColor: "#c76868"
    }), $(".knob").knob({
        thickness: ".05",
        font: "Open Sans",
        bgColor: "#f4f4f4",
        readOnly: !0
    });
    var l = {
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
    Morris.Line(l);
    var l = {
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
        grid: !1,
        lineColors: ["#A8D2ED", "#607284", "#F39C12", "#2C3E50", "#1abc9c", "#34495e", "#9b59b6", "#e74c3c"]
    };
    Morris.Line(l), Morris.Donut({
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
        colors: ["#3498db", "#34495e", "#1abc9c", "#E74C3C", "#9b59b6", "#95a5a6"],
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
        hideHover: "auto",
        barColors: ["#61a9dc"]
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
    }), new JustGage({
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
    });
    var n, r, o, i, s;
    o = new Date, r = o.getDate(), i = o.getMonth(), s = o.getFullYear(), n = $("#calendar").fullCalendar({
        header: {
            left: "prev,next today",
            center: "title",
            right: "month,agendaWeek,agendaDay"
        },
        selectable: !0,
        selectHelper: !0,
        select: function (e, a, t) {
            var l;
            return l = prompt("Event Title:"), l && n.fullCalendar("renderEvent", {
                title: l,
                start: e,
                end: a,
                allDay: t
            }, !0), n.fullCalendar("unselect")
        },
        editable: !0,
        events: [{
            title: "Long Event",
            start: new Date(s, i, 3, 12, 0),
            end: new Date(s, i, 7, 14, 0)
        }, {
            title: "Lunch",
            start: new Date(s, i, r, 12, 0),
            end: new Date(s, i, r + 2, 14, 0),
            allDay: !1
        }, {
            title: "Click for Google",
            start: new Date(s, i, 28),
            end: new Date(s, i, 29),
            url: "http://google.com/"
        }]
    });
    var c = [],
        d = 50,
        h = 150;
    $("#updateInterval").val(h).change(function () {
        var e = $(this).val();
        e && !isNaN(+e) && (h = +e, 1 > h ? h = 1 : h > 2e3 && (h = 2e3), $(this).val("" + h))
    }), random_data = e();
    var g = $.plot("#placeholder", [random_data[0]], {
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
    t(), $(".visible-tooltip").tooltip("show"), $('.tasks-list input[type="checkbox"]').change(function () {
        $(this).closest("li").toggleClass("task-done")
    })
});;