// JavaScript Document


//accordion
$(document).ready(
	//accordion
	function () {
	    $("#accordion").accordion({
	        header: "h3",
	        autoheight: false,
	        active: false,
	        alwaysOpen: false,
	        fillspace: false,
	        collapsible: true,
	        heightStyle: 'content',   //auto, fill, content
	        beforeActivate: function (event, ui) {
	            // The accordion believes a panel is being opened
	            if (ui.newHeader[0]) {
	                var currHeader = ui.newHeader;
	                var currContent = currHeader.next('.ui-accordion-content');
	                // The accordion believes a panel is being closed
	            } else {
	                var currHeader = ui.oldHeader;
	                var currContent = currHeader.next('.ui-accordion-content');
	            }
	            // Since we've changed the default behavior, this detects the actual status
	            var isPanelSelected = currHeader.attr('aria-selected') == 'true';

	            // Toggle the panel's header
	            currHeader.toggleClass('ui-corner-all', isPanelSelected, 500).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected, 500).attr('aria-selected', ((!isPanelSelected).toString()));

	            // Toggle the panel's icon
	            currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e', isPanelSelected, 500).toggleClass('ui-icon-triangle-1-s', !isPanelSelected, 500);

	            // Toggle the panel's content
	            currContent.toggleClass('accordion-content-active', !isPanelSelected, 500)
	            if (isPanelSelected) { currContent.slideUp(); } else { currContent.slideDown(); }

	            return false; // Cancels the default action
	        }
	    });
	});

	    //tooltip stopPropagation
	    $('.tooltip').click(function (event) { event.stopPropagation()}); 
																	 
		  
	//Hide all
		 //   $('#hideall_bt').click(function () {
		 //       alert("teet");
		 //     $("#hideall_bt").toggleClass("click_over");
		 //     $(".page-header").toggleClass("headerhide");
		 //     $(".main-content").toggleClass("contenthide");
		 //     $("ul.nav.nav-tabs").toggleClass("tabshide");
		 //     $(".side").toggleClass("mainmenuhide");
		 //   });
		 //});
		 //});
		
		
		
		
		
		
		
////////////////////////////////////////////////////////////////////////////////////////////////1
	//Table Row Extend
		$(function() {
		  $(".tr_click").click(function(){
			$(".hide_tr").slideToggle("fast");
		  });
		});
			
	//Slider Range
	  $('.ui-slider-range').slider({
		range: true,
		min: 0,
		max: 1000,
		values: [ 90, 290 ],
		slide: function( event, ui ) {
		  $('#rangeval').html(ui.values[0]+" - "+ui.values[1]);
		}
	  });
	  
	//Full Screen Overlay
		//$(function() {
		//	Boxgrid.init();
		//});

	//Full Screen Overlay
		function test(){
				  }
    $(document).ready(function(){
							  
 /* $('body').on("click", ".ui-accordion-content-active .widget .widget-controls a.widget-control.widget-control-resize, .tr_click", function () {	
	  $(this).closest(".col-xs-4").toggleClass("col-md-8", 800).fadeIn();
  });*/
  /*
		$('body').on("click", ".ui-accordion-content-active .widget .widget-controls a.widget-control.widget-control-resize, .tr_click", function () {	
		 if ( 
			 $("#row1 div").hasClass("col-xs-4")
			 )
		 {
			 alert("if");
			 $("#row1 div").removeClass("col-xs-4");
			 //$(this).closest(".col-xs-4").toggleClass("col-md-8", 800).fadeIn();
			 $(this).closest("#row1 div").addClass("col-xs-8", 800).fadeIn();
			 $("#row1 div").addClass("col-xs-2");
			 $(this).closest(".col-xs-8").removeClass("col-xs-2", 800).fadeIn();
		 }
		 else  if ( 
			 $("#row1 div").hasClass("col-xs-2")
			 ) {
			 alert("else");
			 $("#row1 .col-xs-8").removeClass("col-xs-2");
			 $("#row1 div").addClass("col-xs-4");
		  }
    });
  */
  
  $('body').on("click", ".ui-accordion-content-active #col_1 .widget .widget-controls a.widget-control.widget-control-resize, .tr_click", function () {	
	  $("#col_2, #col_3").removeClass("col-xs-8", 800).fadeIn();
	  $("#col_1").toggleClass("col-xs-8", 800).fadeIn();
	  $("#col_2").toggleClass("col-md-2", 800).fadeIn();
	  $("#col_3").toggleClass("col-md-2", 800).fadeIn();
  });
  
  $('body').on("click", ".ui-accordion-content-active #col_2 .widget .widget-controls a.widget-control.widget-control-resize", function () {	
	  $("#col_1, #col_3").removeClass("col-md-8", 800).fadeIn();
	  $("#col_2").toggleClass("col-xs-8", 800).fadeIn();
	  $("#col_1").toggleClass("col-md-2", 800).fadeIn();
	  $("#col_3").toggleClass("col-md-2", 800).fadeIn();
  });
  
  $('body').on("click", ".ui-accordion-content-active #col_3 .widget .widget-controls a.widget-control.widget-control-resize", function () {	
	  $("#col_1, #col_2").removeClass("col-xs-8", 800).fadeIn();
	  $("#col_3").toggleClass("col-xs-8", 800).fadeIn();
	  $("#col_2").toggleClass("col-md-2", 800).fadeIn();
	  $("#col_1").toggleClass("col-md-2", 800).fadeIn();
  });
  
	//Orange
        $("#mainmenu, #orange_bt").on("click", function () {
  
														 
		  $("#orange_bt").toggleClass("left");
		  
            return $(".all-wrapper").toggleClass("hide-sub-menu"), !1
        }), $(".main-content").scrollspy({
            target: ".sub-sidebar-wrapper"});
		
		
    });
		$(window).resize(function(){
		 if ( $(".all-wrapper").hasClass("hide-sub-menu") ) {
			// alert("if");
		$("#orange_bt").addClass("left");
		 }
		 else {
			// alert("else");
			$("#orange_bt").removeClass("left");
		  }
    });
	/*
*/
	
	
	
	//Drag&drop
 $(function() {
    $( "#main_doc" ).sortable({
      connectWith: "#main_doc",
      handle: ".widget-title",
      cancel: ".widget-controls",
    });
	 $("#main_doc.ui-sortable").disableSelection();
  });
 $ ("a").tooltip('hide');
 
////////////////////////////////////////////////////////////////////////////////////////////////1
////////////////////////////////////////////////////////////////////////////////////////////////1
////////////////////////////////////////////////////////////////////////////////////////////////1
////////////////////////////////////////////////////////////////////////////////////////////////1
////////////////////////////////////////////////////////////////////////////////////////////////1
////////////////////////////////////////////////////////////////////////////////////////////////1






 $('.rb-week:first').scroll(function () {
     //alert("scroll");
     var windscroll = $('.rb-week:first').scrollTop();
     if (windscroll >= 100) {
         // alert("IF");
         $('#accordion .ui-accordion-content').each(function (i) {
             if ($(this).position().top <= windscroll - 20) {
                 $('.sticky-element.s-e-fixed').removeClass('s-e-fixed');
                 $('.sticky-element').eq(i).addClass('s-e-fixed');

             }
         });

     }
     else {
         // alert("ELSE");
         $('.sticky-element.s-e-fixed').removeClass('s-e-fixed');

     }

 }).scroll();


//////////////////////////////////////////////////********************************************************////////////////////////////////////////////
//////////////////////////////////////////////////********************************************************////////////////////////////////////////////
//////////////////////////////////////////////////********************************************************////////////////////////////////////////////

/*
 $('#accordion h3').click(function () {

     if ($('#accordion h3').hasClass('.accordion-header-active')) {
         $(this).clone().appendTo(".tabs-holder-pationt").addClass("try_clone");
     }
     else {

     }
 });
 */
 //h3.try_clone a.scroll_down

 $("#accordion h3").click(function (i) {
    // alert(i.target.parentNode.parentNode.parentNode.parentNode.id);
     if ($(this).attr("aria-selected") == "false") {
         //alert("if");
         var x = $(this).clone();
         x.attr('id', x.attr('id') + '_tab');
         x.appendTo(".tabs-holder-pationt").animate(500).addClass("try_clone").prepend('<a class="scroll_down" href="#' + i.target.parentNode.parentNode.parentNode.parentNode.id + '" />').prepend('<div class="a7" />');

     }

     else if ($(this).attr("aria-selected") == "true") {
         //alert("else");

         $("#" + i.target.parentNode.parentNode.parentNode.parentNode.id + '_tab').remove();
         //$(".try_clone").remove()
         //$(this).remove();
            
     }



     /*

     $('h3.try_clone a.scroll_down').click(function () {
         if ($('h3.try_clone a.scroll_down').parent().attr('id'))
             $('h3.try_clone a.scroll_down').parent().removeAttr('id');
         else $('h3.try_clone a.scroll_down').parent().attr('id');
     });


     */


     
     $('h3.try_clone a.scroll_down').click(function (event) {
         event.stopImmediatePropagation();
        // alert(i.target.parentNode.parentNode.parentNode.parentNode.id);
         var target = $(this).attr('href');
         $(this).parents('.rb-week:first').animate({
             scrollTop: $(target).position().top

         }, 1000);
         //return false;
     });
     
     ///////////////////////////////////////TEST////////////////////////////////////

     /*

         $('h3.try_clone a.scroll_down').click(function (event) {
             event.stopImmediatePropagation();
             alert(i.target.parentNode.parentNode.parentNode.parentNode.id);
             if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                 var target = $(this.hash);
                 target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                 if (target.length) {
                     $(this).parents('.rb-week:first').animate({
                         scrollTop: target.offset().top
                     }, 1000);
                     return false;
                 }
             }
         });
         */
     ///////////////////////////////////////END////////////////////////////////////
     ///////////////////////////////////////Try Change iD////////////////////////////////////



     ///////////////////////////////////////END Change iD////////////////////////////////////



 });

/*
 $('h3.try_clone a.scroll_down').click(function () {
     alert("teet");
     target = $(this).attr('href');
     $(this).parents('.rb-week:first').animate({
         scrollTop: $(target).position().top

     }, 1000);
 });
 */

/*
$('#accordion h3').one("click", function () {

    $(this).clone().appendTo(".tabs-holder-pationt").addClass("try_clone");
    
});
*/
/*
 $("h3#ui-id-13.try_clone table tbody tr td").click(function () {
     alert("clicked");
     $(this).parents('.rb-week:first').animate({
         scrollTop: $("h3#ui-id-13").offset().top
     }, 2000);
 });*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

