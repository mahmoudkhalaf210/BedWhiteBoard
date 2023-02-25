function TrnalationRuner(parent) {
    function GetQueryvar(VarName) {
        var pageQueryvar = (function (a) {
            if (a == '')
                return {};
            var b = {};
            for (var i = 0; i < a.length; ++i) {
                var p = a[i].split('=', 2);
                if (p.length == 1) {
                    b[p[0]] = '';
                }
                else {
                    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
                }
            }
            return b;
        })
       (window.location.search.substr(1).split('&')); var ID = pageQueryvar[VarName]; return ID && ID.trim() ? ID : '';
    }
    var associativeLangArray = {};
    if (GetQueryvar('lang') && GetQueryvar('lang') == '1') {
        //
	associativeLangArray["MedicaPLUS"]="ميديكا بلس ";
	associativeLangArray["Loading...."]="جار التحميل....";
	associativeLangArray["Find Patient Location"]="البحث عن موقع المريض";
	associativeLangArray["Location"]="موقع ";
	associativeLangArray["Detailed"]="مفصله";
	associativeLangArray["Monitor All"]="مراقبة الكل";
	associativeLangArray["All Current"]="كل الحالي";
	associativeLangArray["Pending Triage"]="في انتظار الفحص";
	associativeLangArray["Triaged"]="تم فحصه";
	associativeLangArray["In Treatment"]="تحت العلاج";
	associativeLangArray["Admitted"]="دخول المستشفى";
	associativeLangArray["Discharged"]="خروج";
	associativeLangArray["Emergency Area"]="منطقة الطوارئ";
	associativeLangArray["CHANDRASHKHER, Suberamanyan (Mr)"]="شاندراشخر، سوبيرامانيان (مر)";
	associativeLangArray["Born"]="مولود";
	associativeLangArray["14-Jul-1945 (61y)"]="تاريخ الميلاد";
	associativeLangArray["Gender"]="جنس";
	associativeLangArray["Male"]="ذكر";
	associativeLangArray["129 728 7652"]="j";
	associativeLangArray["Address"]="عنوان";
	associativeLangArray["340 Gloucestar R...."]="j";
	associativeLangArray["Phone and Email"]="الهاتف والبريد الإلكتروني";
	associativeLangArray["020 8123 4567"]="j";
	associativeLangArray["Usual address"]="عنوان معتاد";
	associativeLangArray["340 Gloucestar Road"]="j";
	associativeLangArray["Walton"]="والتون";
	associativeLangArray["Tewkesbury"]="توكسبوري";
	associativeLangArray["GL20 4RT"]="j";
	associativeLangArray["View all addresses"]="عرض جميع العناوين";
	associativeLangArray["Home"]="الصفحة الرئيسية";
	associativeLangArray["Work"]="عمل";
	associativeLangArray["0118 4960823"]="j";
	associativeLangArray["Mobile"]="التليفون المحمول";
	associativeLangArray["07700 900555"]="j";
	associativeLangArray["Email"]="البريد الالكترونى";
	associativeLangArray["rama@abc.xyz.com"]="j";
	associativeLangArray["Latex"]="اللاتكس";
	associativeLangArray["Peanuts"]="الفول السوداني";
	associativeLangArray["Penicillin"]="بنسلين";
	associativeLangArray["Area Name"]="إسم المنطقة";
	associativeLangArray["Waiting Patients"]="المرضي المنتظرين";
	associativeLangArray["Beds Occupied"]="الأسره المشغولة";
	associativeLangArray["Beds Available"]="الأسره المتاحة";
	associativeLangArray["Holding Bay"]="منطقة الانتظار";
	associativeLangArray["Pending Exam."]="إنتظار الفحص";
	associativeLangArray["Alerts"]="التنبيهات";
	associativeLangArray["Patient's Waiting List"]="قائمة إنتظار المرضي";
	associativeLangArray["Waiting Min"]="دقائق الانظار";
	associativeLangArray["Triage Min"]="دقائق الفحص";
	associativeLangArray["Triage"]="الفحص";
	associativeLangArray["Patient Name"]="اسم المريض";
	associativeLangArray["Age"]="عمر";
	associativeLangArray["Status"]="الحالة";
	associativeLangArray["Treatment Patients"]="المرضي المعالجين";
	associativeLangArray["Beds"]="الأسره";
	associativeLangArray["Female"]="انثى";
	associativeLangArray["Sex"]="جنس";
	associativeLangArray["Doctor Name"]="اسم الطبيب";
	associativeLangArray["Bed"]="سرير";
	associativeLangArray["Current Location"]="الموقع الحالي";
	associativeLangArray["Please select doctor"]="برجاء اختيار الطبيب";
	associativeLangArray["Close"]="إغلاق ";
	associativeLangArray["Please select discharge status"]="برجاء اختيار حالة الخروج";
	associativeLangArray["Please select an option from list below:"]="برجاء تحديد اختيار من القائمه";
	associativeLangArray["Please select triage priority"]="برجاء تحديد اولوية الفحص";
	associativeLangArray["Triage Patient Assessment"]="تقييم فحص المريض";
	associativeLangArray["Admission Request"]="طلب دخول المستشفى ";
	associativeLangArray["Cancel Registration"]="الغاء الحجز";
	associativeLangArray["normal"]="عادي";
	associativeLangArray["all"]="الكل";
	associativeLangArray["AllCurrent"]="كل الحالي";
	associativeLangArray["ToTriage"]="للفحص";
	associativeLangArray["Treatment"]="العلاج";
	associativeLangArray["DV_HI.............ER Female"]="طوارئ نساء";
	associativeLangArray["DV_HI.............ER Male"]="طوارئ رجال ";
	associativeLangArray["DV_ER TRAUMA"]="طوارئ حوادث";
    } else {
        //
    }
    if (parent != undefined && parent != null) {

        $(parent).contents().each(function () {
            if (this.nodeValue != null && this.nodeValue != undefined && this.nodeValue.trim() != '') {
                if (associativeLangArray[this.nodeValue] != null
                    && associativeLangArray[this.nodeValue] != undefined
                    && associativeLangArray[this.nodeValue].trim() != '')
                    this.nodeValue = associativeLangArray[this.nodeValue]
            }
        });

        $(parent).find('span').each(function () {
            if (associativeLangArray[$(this).text().trim()] != null
                && associativeLangArray[$(this).text().trim()] != undefined
                && associativeLangArray[$(this).text().trim()].trim() != '')
                $(this).text(associativeLangArray[$(this).text().trim()])
        });
        $(parent).find('strong').each(function () {
            if (associativeLangArray[$(this).text().trim()] != null
                && associativeLangArray[$(this).text().trim()] != undefined
                && associativeLangArray[$(this).text().trim()].trim() != '')
                $(this).text(associativeLangArray[$(this).text().trim()])
        });
        $(parent).find('table thead tr th').each(function () {
            if (associativeLangArray[$(this).html().trim()] != null
                && associativeLangArray[$(this).html().trim()] != undefined
                && associativeLangArray[$(this).html().trim()].trim() != '')
                $(this).html(associativeLangArray[$(this).html().trim()])
        });
        $(parent).find('h3').each(function () {
            if (associativeLangArray[$(this).html().trim()] != null
                && associativeLangArray[$(this).html().trim()] != undefined
                && associativeLangArray[$(this).html().trim()].trim() != '')
                $(this).html(associativeLangArray[$(this).html().trim()])
        });
        $(parent).find('h3').each(function () {
            if (associativeLangArray[$(this).text().trim()] != null
                && associativeLangArray[$(this).text().trim()] != undefined
                && associativeLangArray[$(this).text().trim()].trim() != '')
                $(this).text(associativeLangArray[$(this).text().trim()])
        });
        $(parent).find('label').each(function () {
            if (associativeLangArray[$(this).html().trim()] != null
                && associativeLangArray[$(this).html().trim()] != undefined
                && associativeLangArray[$(this).html().trim()].trim() != '')
                $(this).html(associativeLangArray[$(this).html().trim()])
        });
        $(parent).find('label').each(function () {
            if (associativeLangArray[$(this).val().trim()] != null
                && associativeLangArray[$(this).val().trim()] != undefined
                && associativeLangArray[$(this).val().trim()].trim() != '')
                $(this).val(associativeLangArray[$(this).val().trim()])
        });
        $(parent).find('input:button').each(function () {
            if (associativeLangArray[$(this).val().trim()] != null
                && associativeLangArray[$(this).val().trim()] != undefined
                && associativeLangArray[$(this).val().trim()].trim() != '')
                $(this).val(associativeLangArray[$(this).val().trim()])
        });


    } else {
        $('*').contents().each(function () {
            if (this.nodeValue != null && this.nodeValue != undefined && this.nodeValue.trim() != '') {
                if (associativeLangArray[this.nodeValue] != null
                    && associativeLangArray[this.nodeValue] != undefined
                    && associativeLangArray[this.nodeValue].trim() != '')
                    this.nodeValue = associativeLangArray[this.nodeValue]
            }
        });
        $('span').each(function () {
            if (associativeLangArray[$(this).text().trim()] != null
                && associativeLangArray[$(this).text().trim()] != undefined
                && associativeLangArray[$(this).text().trim()].trim() != '')
                $(this).text(associativeLangArray[$(this).text().trim()])
        });
        $('strong').each(function () {
            if (associativeLangArray[$(this).text().trim()] != null
                && associativeLangArray[$(this).text().trim()] != undefined
                && associativeLangArray[$(this).text().trim()].trim() != '')
                $(this).text(associativeLangArray[$(this).text().trim()])
        });
        $('table thead tr th').each(function () {
            if (associativeLangArray[$(this).html().trim()] != null
                && associativeLangArray[$(this).html().trim()] != undefined
                && associativeLangArray[$(this).html().trim()].trim() != '')
                $(this).html(associativeLangArray[$(this).html().trim()])
        });
        $('h3').each(function () {
            if (associativeLangArray[$(this).html().trim()] != null
                && associativeLangArray[$(this).html().trim()] != undefined
                && associativeLangArray[$(this).html().trim()].trim() != '')
                $(this).html(associativeLangArray[$(this).html().trim()])
        });
        $('h3').each(function () {
            if (associativeLangArray[$(this).text().trim()] != null
                && associativeLangArray[$(this).text().trim()] != undefined
                && associativeLangArray[$(this).text().trim()].trim() != '')
                $(this).text(associativeLangArray[$(this).text().trim()])
        });
        $('label').each(function () {
            if (associativeLangArray[$(this).html().trim()] != null
                && associativeLangArray[$(this).html().trim()] != undefined
                && associativeLangArray[$(this).html().trim()].trim() != '')
                $(this).html(associativeLangArray[$(this).html().trim()])
        });
        $('label').each(function () {
            if (associativeLangArray[$(this).val().trim()] != null
                && associativeLangArray[$(this).val().trim()] != undefined
                && associativeLangArray[$(this).val().trim()].trim() != '')
                $(this).val(associativeLangArray[$(this).val().trim()])
        });
        $('input:button').each(function () {
            if (associativeLangArray[$(this).val().trim()] != null
                && associativeLangArray[$(this).val().trim()] != undefined
                && associativeLangArray[$(this).val().trim()].trim() != '')
                $(this).val(associativeLangArray[$(this).val().trim()])
        });
    }

}
setTimeout(TrnalationRuner, 500);
var Alllength = $('*').length;
var count = 1;
$('*').bind('DOMNodeInserted DOMNodeRemoved', function () {
    if (count >= Alllength) {
        count = 0;
        TrnalationRuner();
    } else {
        count++;
    }
});
