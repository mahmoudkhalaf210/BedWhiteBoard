<%@ Page Title="Login Page" Language="C#" ClientIDMode="Static" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Login.Login" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
      <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel='stylesheet' href='assets/css/main_style.css'>

    <link href="fonts/font-awesome/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href='http://fonts.googleapis.com/css?family=Oswald:300,400,700|Open+Sans:400,700,300|Roboto:100,300,400,700|Roboto+Condensed:300,400,700' rel='stylesheet' type='text/css'>

  <link href="assets/favicon.ico" rel="shortcut icon">
  <link href="assets/apple-touch-icon.png" rel="apple-touch-icon">
  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
    @javascript html5shiv respond.min
  <![endif]-->
<%--    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />--%>
    <title>Login to Our Website</title>
    <meta name="description" content="" />
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script type="text/javascript">

        jQuery(function ($) {

            // simple jQuery validation script
            $('#login').submit(function () {

                var valid = true;
                var errormsg = 'This field is required!';
                var errorcn = 'error';

                $('.' + errorcn, this).remove();

                $('.required', this).each(function () {
                    var parent = $(this).parent();
                    if ($(this).val() == '') {
                        var msg = $(this).attr('title');
                        msg = (msg != '') ? msg : errormsg;
                        $('<span class="' + errorcn + '">' + msg + '</span>')
					.appendTo(parent)
					.fadeIn('fast')
					.click(function () { $(this).remove(); })
                        valid = false;
                    };
                });
                return valid;
            });
        })	
</script>
    <style type="text/css">
        html{
            background-color:transparent;
            height:100%;
        }
		body
		{
			background-image:url(assets/images/shutterstock_92230237.jpg);
			background-size:cover;
			background-position:bottom;
		}
		.all-wrapper.light-bg {
			background-color: transparent;
			background-image:none;
		}
    	.row 
		{
			 margin-left: 0px; 
			 margin-right: 0px; 
		}
		.page-footer
		{
			position: absolute;
			bottom: 0;
			width: 100%;
			padding: 8px 0px;
			border-top:2px solid #217dbb;
		}
		.input-abs-icon
		{
			top: 7px;
			font-size: 16px;
		}
		@media (min-width: 1200px) {
		.col-md-offset-4
		{
			margin-left: 38%;	
		}
		}
        #ErrorMessage
        {
            color:red;
            font-size:10px;
        }
    </style>
</head>
<body>


<div class="all-wrapper no-menu-wrapper light-bg">

                <div class="row">
                    <div class="col-md-3 col-md-offset-4">
                    
                <div class="login1">
                    <div class="flip">
                        <div class="card">
                            <div class="face front">
                                <div class="login-logo-w">
                                    <a href="#" class="logo">
                                      <img id="moustafa" src="assets/images/logo_login.png" width="227" height="170">
                                    </a>
                                </div>
                            </div>
                            
                            <div class="face back">
                              <div class="widget widget-blue">
                                <div class="widget-title">
                                  <h3 class="text-center">Login </h3>
                                </div>
                                <div class="widget-content">

                                <!--Source------------------------------------------------------------------------------->

    


                                <!--Source------------------------------------------------------------------------------->


                                  <form id="login" runat="server" style="text-align:center">
                                    <div class="form-group relative-w">
                                      <input type="text" name="username" id="login_username" class="form-control input-sm" placeholder="Username" title="Please provide your username" />
                                      <i class="icon-user input-abs-icon"></i>
                                    </div>
                                    <div class="form-group relative-w">
                                      <input type="password" name="password" id="login_password" class="form-control input-sm" placeholder="Password" title="Password is required" />
                                      <i class="icon-lock input-abs-icon"></i>
                                    </div>
                                    <asp:Button Text="Login" runat="server" class="btn btn-primary btn-sm" style="padding: 5px 26px;" OnClick="LogIn_Clicked" />
                                    <div class="no-account-yet">
                                     <a href="Login.aspx?logoff=true">Logoff</a>
                                    </div>
                                      <asp:Literal Text="Log in unsuccessful" runat="server" Visible="false" ID="ErrorMessage" />
                                  </form>
                                </div>
                              </div>
                          </div>
                      </div>
                   </div> 
               </div>
                    </div>
                  </div>
                </div>






        <script src="assets/js/test/jquery.min.js"></script>
    <script src="assets/js/jquery-ui.js"></script>
    <script>
        $(document).ready(function () {
            $('.login1').mousemove(function () {
                //alert("Your book is overdue.");
                $(this).find('.card').addClass('flipped').mouseout(function () {
                    $(this).removeClass('flipped');
                });
                return false;
            });
        });
    </script>
<script src='assets/js/jquery.shiningImage.min.js'></script>
	<script>
	    $(window).load(function () {
	        $('#moustafa').shiningImage();
	    });
    </script>

</body>
</html>
