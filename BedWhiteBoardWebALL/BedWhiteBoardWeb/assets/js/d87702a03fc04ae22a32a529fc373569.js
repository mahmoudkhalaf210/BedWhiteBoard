$(function () {
    var e, t, a, l, n;
    a = new Date, t = a.getDate(), l = a.getMonth(), n = a.getFullYear(), e = $("#calendar").fullCalendar({
        header: {
            left: "prev,next today",
            center: "title",
            right: "month,agendaWeek,agendaDay"
        },
        selectable: !0,
        selectHelper: !0,
        select: function (t, a, l) {
            var n;
            return n = prompt("Event Title:"), n && e.fullCalendar("renderEvent", {
                title: n,
                start: t,
                end: a,
                allDay: l
            }, !0), e.fullCalendar("unselect")
        },
        editable: !0,
        events: [{
            title: "Long Event",
            start: new Date(n, l, 3, 12, 0),
            end: new Date(n, l, 7, 14, 0)
        }, {
            title: "Lunch",
            start: new Date(n, l, t, 12, 0),
            end: new Date(n, l, t + 2, 14, 0),
            allDay: !1
        }, {
            title: "Click for Google",
            start: new Date(n, l, 28),
            end: new Date(n, l, 29),
            url: "http://google.com/"
        }]
    })
});;