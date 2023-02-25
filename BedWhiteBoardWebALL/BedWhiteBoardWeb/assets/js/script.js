// JavaScript Document

$(document).ready(function () {
							var check =0;
	$("#hideall_bt").on('click', function() {
										   	var docElement, request;
										   if (check==0)
										   {
	
	
		docElement = document.documentElement;
		request = docElement.requestFullScreen || docElement.webkitRequestFullScreen || docElement.mozRequestFullScreen || docElement.msRequestFullScreen;
	
		if(typeof request!="undefined" && request){
			request.call(docElement);
			
			check=1;
		}
										   }else {
											   		docElement = document;
		request = docElement.cancelFullScreen|| docElement.webkitCancelFullScreen || docElement.mozCancelFullScreen || docElement.msCancelFullScreen || docElement.exitFullscreen;
		if(typeof request!="undefined" && request){
			request.call(docElement);
		}
		
		check=0;
											   }
	});
	
	
	
	
});