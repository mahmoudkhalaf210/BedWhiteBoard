$(function () {
    $(".ui-slider-simple").slider({}), $(".ui-slider-range").slider({
        range: !0,
        min: 0,
        max: 500,
        values: [75, 300]
    }), $("#eq span").each(function () {
        var e = parseInt($(this).text(), 10);
        $(this).empty().slider({
            value: e,
            range: "min",
            animate: !0,
            orientation: "vertical"
        })
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
    }), new JustGage({
        id: "gauge-purple",
        value: 46,
        min: 0,
        max: 100,
        showInnerShadow: !1,
        showMinMax: !1,
        gaugeColor: "#EAEAEA",
        levelColors: ["#C952B7", "#C952B7", "#C952B7"],
        title: "Server Load"
    }), new JustGage({
        id: "gauge-orange",
        value: 67,
        min: 0,
        max: 100,
        showInnerShadow: !1,
        showMinMax: !1,
        gaugeColor: "#EAEAEA",
        levelColors: ["#BA871A", "#BA871A", "#BA871A"],
        title: "New Visits"
    }), new JustGage({
        id: "gauge-yellow",
        value: 25,
        min: 0,
        max: 100,
        showInnerShadow: !1,
        showMinMax: !1,
        gaugeColor: "#EAEAEA",
        levelColors: ["#EDD942", "#EDD942", "#EDD942"],
        title: "Sales"
    })
});;