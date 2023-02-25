var translationAssociativeLangArray = {}
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
function LoadTranslationFile(callback, url) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, false);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
function TranslateProcessStart() {
    var url = null;
    if (GetQueryvar('lang') && GetQueryvar('lang') == '1') {
        if (url != null && url != undefined) {
            url = url.replace('.html', '-ar-sa.json')
            url = url.replace('.htm', '-ar-sa.json')
        } else {
            url = window.location.pathname.replace('.html', '-ar-sa.json');
            url = url.replace('.htm', '-ar-sa.json');
        }
        LoadTranslationFile(function (response) {
            translationAssociativeLangArray = JSON.parse(response);
            setTimeout(function () {
                TrnalationRuner();
                setInterval(function () { TrnalationRuner(); }, 100);
            }, 500);

        }, url);
    }
}
if (GetQueryvar('lang') && GetQueryvar('lang') == '1') {
        $('link').each(function () {
            if ($(this).attr('href') != null
                && $(this).attr('href').toLowerCase().endsWith('assets/css/main_style.css')) {
					$(this).replaceWith('<link href="../../mplusReferences/assets/css/main_style_ar.css" type="text/css" rel="stylesheet">');
            }
        })
    }
function TrnalationRuner(parent) {
    
    if (parent != undefined && parent != null && translationAssociativeLangArray != null) {
        $(parent).contents().each(function () {
            if (this.nodeValue != null && this.nodeValue != undefined && this.nodeValue.trim() != '') {
                if (translationAssociativeLangArray[this.nodeValue.trim().replace(/^\s+|\s+$/g, '')] != null
                    && translationAssociativeLangArray[this.nodeValue.trim().replace(/^\s+|\s+$/g, '')] != undefined
                    && translationAssociativeLangArray[this.nodeValue.trim().replace(/^\s+|\s+$/g, '')].trim() != '')
                    this.nodeValue = translationAssociativeLangArray[this.nodeValue.trim().replace(/^\s+|\s+$/g, '')]
            }
        });
        $(parent).find('span').each(function () {
            if (translationAssociativeLangArray[$(this).text().trim()] != null
                && translationAssociativeLangArray[$(this).text().trim()] != undefined
                && translationAssociativeLangArray[$(this).text().trim()].trim() != '')
                $(this).text(translationAssociativeLangArray[$(this).text().trim()])
        });
        $(parent).find('strong').each(function () {
            if (translationAssociativeLangArray[$(this).text().trim()] != null
                && translationAssociativeLangArray[$(this).text().trim()] != undefined
                && translationAssociativeLangArray[$(this).text().trim()].trim() != '')
                $(this).text(translationAssociativeLangArray[$(this).text().trim()])
        });
        $(parent).find('table thead tr th').each(function () {
            if (translationAssociativeLangArray[$(this).html().trim()] != null
                && translationAssociativeLangArray[$(this).html().trim()] != undefined
                && translationAssociativeLangArray[$(this).html().trim()].trim() != '')
                $(this).html(translationAssociativeLangArray[$(this).html().trim()])
        });
        $(parent).find('h3').each(function () {
            if (translationAssociativeLangArray[$(this).html().trim()] != null
                && translationAssociativeLangArray[$(this).html().trim()] != undefined
                && translationAssociativeLangArray[$(this).html().trim()].trim() != '')
                $(this).html(translationAssociativeLangArray[$(this).html().trim()])
        });
        $(parent).find('h3').each(function () {
            if (translationAssociativeLangArray[$(this).text().trim()] != null
                && translationAssociativeLangArray[$(this).text().trim()] != undefined
                && translationAssociativeLangArray[$(this).text().trim()].trim() != '')
                $(this).text(translationAssociativeLangArray[$(this).text().trim()])
        });
        $(parent).find('label').each(function () {
            if (translationAssociativeLangArray[$(this).html().trim()] != null
                && translationAssociativeLangArray[$(this).html().trim()] != undefined
                && translationAssociativeLangArray[$(this).html().trim()].trim() != '')
                $(this).html(translationAssociativeLangArray[$(this).html().trim()])
        });
        $(parent).find('label').each(function () {
            if (translationAssociativeLangArray[$(this).val().trim()] != null
                && translationAssociativeLangArray[$(this).val().trim()] != undefined
                && translationAssociativeLangArray[$(this).val().trim()].trim() != '')
                $(this).val(translationAssociativeLangArray[$(this).val().trim()])
        });
        $(parent).find('input:button').each(function () {
            if (translationAssociativeLangArray[$(this).val().trim()] != null
                && translationAssociativeLangArray[$(this).val().trim()] != undefined
                && translationAssociativeLangArray[$(this).val().trim()].trim() != '')
                $(this).val(translationAssociativeLangArray[$(this).val().trim()])
        });


    } else if (translationAssociativeLangArray != null) {
        $('*').contents().each(function () {
            if (this.nodeValue != null && this.nodeValue != undefined && this.nodeValue.trim() != '') {
                if (translationAssociativeLangArray[this.nodeValue.trim().replace(/^\s+|\s+$/g, '')] != null
                    && translationAssociativeLangArray[this.nodeValue.trim().replace(/^\s+|\s+$/g, '')] != undefined
                    && translationAssociativeLangArray[this.nodeValue.trim().replace(/^\s+|\s+$/g, '')].trim() != '')
                    this.nodeValue = translationAssociativeLangArray[this.nodeValue.trim().replace(/^\s+|\s+$/g, '')]
            }
        });
        $('span').each(function () {
            if (translationAssociativeLangArray[$(this).text().trim()] != null
                && translationAssociativeLangArray[$(this).text().trim()] != undefined
                && translationAssociativeLangArray[$(this).text().trim()].trim() != '')
                $(this).text(translationAssociativeLangArray[$(this).text().trim()])
        });
        $('strong').each(function () {
            if (translationAssociativeLangArray[$(this).text().trim()] != null
                && translationAssociativeLangArray[$(this).text().trim()] != undefined
                && translationAssociativeLangArray[$(this).text().trim()].trim() != '')
                $(this).text(translationAssociativeLangArray[$(this).text().trim()])
        });
        $('table thead tr th').each(function () {
            if (translationAssociativeLangArray[$(this).html().trim()] != null
                && translationAssociativeLangArray[$(this).html().trim()] != undefined
                && translationAssociativeLangArray[$(this).html().trim()].trim() != '')
                $(this).html(translationAssociativeLangArray[$(this).html().trim()])
        });
        $('h3').each(function () {
            if (translationAssociativeLangArray[$(this).html().trim()] != null
                && translationAssociativeLangArray[$(this).html().trim()] != undefined
                && translationAssociativeLangArray[$(this).html().trim()].trim() != '')
                $(this).html(translationAssociativeLangArray[$(this).html().trim()])
        });
        $('h3').each(function () {
            if (translationAssociativeLangArray[$(this).text().trim()] != null
                && translationAssociativeLangArray[$(this).text().trim()] != undefined
                && translationAssociativeLangArray[$(this).text().trim()].trim() != '')
                $(this).text(translationAssociativeLangArray[$(this).text().trim()])
        });
        $('label').each(function () {
            if (translationAssociativeLangArray[$(this).html().trim()] != null
                && translationAssociativeLangArray[$(this).html().trim()] != undefined
                && translationAssociativeLangArray[$(this).html().trim()].trim() != '')
                $(this).html(translationAssociativeLangArray[$(this).html().trim()])
        });
        $('label').each(function () {
            if (translationAssociativeLangArray[$(this).val().trim()] != null
                && translationAssociativeLangArray[$(this).val().trim()] != undefined
                && translationAssociativeLangArray[$(this).val().trim()].trim() != '')
                $(this).val(translationAssociativeLangArray[$(this).val().trim()])
        });
        $('input:button').each(function () {
            if (translationAssociativeLangArray[$(this).val().trim()] != null
                && translationAssociativeLangArray[$(this).val().trim()] != undefined
                && translationAssociativeLangArray[$(this).val().trim()].trim() != '')
                $(this).val(translationAssociativeLangArray[$(this).val().trim()])
        });
    }

}
TranslateProcessStart()