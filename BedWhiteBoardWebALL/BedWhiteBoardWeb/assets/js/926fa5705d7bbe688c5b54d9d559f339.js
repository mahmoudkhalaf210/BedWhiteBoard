$(function () {
    $.validator.setDefaults({
        highlight: function (r) {
            $(r).closest(".form-group").addClass("has-error")
        },
        unhighlight: function (r) {
            $(r).closest(".form-group").removeClass("has-error")
        },
        errorElement: "span",
        errorClass: "help-block",
        errorPlacement: function (r, e) {
            e.parent(".input-group").length ? r.insertAfter(e.parent()) : r.insertAfter(e)
        }
    }), $("#validateForm").validate()
});;