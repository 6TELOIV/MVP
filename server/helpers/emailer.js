/* 
to use, use this import statement:
    import message from '.helpers/emailer.js'

then call message(user, horoscope) to email them the horoscope
*/

import nodemailer from 'nodemailer';
import { numberToSign, numberToPhase } from "../helpers/helpers.js"
import config from '../config/config.js';

//emails a user a horoscope
async function message(user, horoscope, date) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'heavenlywritingllc@gmail.com',
      pass: config.emailPass
    }
  });

  //replace all = regex g flag
  let htmlSummary = horoscope.summary.replace(/\n/g,'<br />'); 
  let htmlBestActivities = horoscope.bestActivities.replace(/\n/g,'<br />');
  let htmlMoonThemes = horoscope.moonThemes.replace(/\n/g,'<br />');
  let htmlSignThemes = horoscope.signThemes.replace(/\n/g,'<br />');
  let htmlHouseThemes = horoscope.houseThemes.replace(/\n/g,'<br />');
  let msg = {
    from: 'heavenlywritingllc@gmail.com',
    to: user.username,
    subject: `MoonFlow: Your ${date.getUTCMonth() + 1}/${date.getUTCDate()} ${numberToPhase(horoscope.moonPhase)} Moon Report`,
    html:
      `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta name="format-detection" content="telephone=no"> 
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;">
<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />

    <title>Page title</title>

    <style>


         @import url(http://fonts.googleapis.com/css?family=Roboto:300); /*Calling our web font*/

        /* Some resets and issue fixes */
        #outlook a { padding:0; }
        body{ width:100% !important; -webkit-text; size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; }     
        .ReadMsgBody { width: 100%; }
        .ExternalClass {width:100%;} 
        .backgroundTable {margin:0 auto; padding:0; width:100%;!important;} 
        table td {border-collapse: collapse;}
        .ExternalClass * {line-height: 115%;}           
        /* End reset */


        /* These are our tablet/medium screen media queries */
        @media screen and (max-width: 630px){


            /* Display block allows us to stack elements */                      
            *[class="mobile-column"] {display: block;} 

            /* Some more stacking elements */
            *[class="mob-column"] {float: none !important;width: 100% !important;}     

            /* Hide stuff */
            *[class="hide"] {display:none !important;}          

            /* This sets elements to 100% width and fixes the height issues too, a god send */
            *[class="100p"] {width:100% !important; height:auto !important;}                    

            /* For the 2x2 stack */         
            *[class="condensed"] {padding-bottom:40px !important; display: block;}

            /* Centers content on mobile */
            *[class="center"] {text-align:center !important; width:100% !important; height:auto !important;}            

            /* 100percent width section with 20px padding */
            *[class="100pad"] {width:100% !important; padding:20px;} 

            /* 100percent width section with 20px padding left & right */
            *[class="100padleftright"] {width:100% !important; padding:0 20px 0 20px;} 

            /* 100percent width section with 20px padding top & bottom */
            *[class="100padtopbottom"] {width:100% !important; padding:20px 0px 20px 0px;} 


        }


    </style>



</head>

<body style="padding:0; margin:0">

<table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0" width="100%">
    <tr>
        <td align="center" valign="top">
			<table width="640" cellspacing="0" cellpadding="0" bgcolor="#" class="100p">
                <tr>
                    <td background="https://i.imgur.com/O2yiKx2.jpg" bgcolor="#396384" width="640" valign="top" class="100p" style="background-size: 640px">
                        <!--[if gte mso 9]>
                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:640px;">
                            <v:fill type="tile" src="https://i.imgur.com/O2yiKx2.jpg" color="#3b464e" />
                            <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                                <![endif]-->
                                <div>
                                    <table width="640" border="0" cellspacing="0" cellpadding="20" class="100p">
                                        <tr>
                                            <td valign="top">
                                                <table border="0" cellspacing="0" cellpadding="0" width="600" class="100p">
                                                    <tr>
                                                        <td align="left" width="50%" class="100p"><img width ="50px" src="https://i.imgur.com/oEb4ZcG.png" alt="Logo" border="0" style="display:block" /></td>
                                                        <td width="50%" align="right" style="font-size:16px; color:#FFFFFF;"><font face="'Roboto', Arial, sans-serif"><a href="#" style="color:#FFFFFF; text-decoration:none;"><a href="https://mvp-heaven.herokuapp.com/UserDashboard" style="color:#FFFFFF; text-decoration:none;">Dashboard</a></font></td>
                                                    </tr>
                                                </table>
                                                <table border="0" cellspacing="0" cellpadding="0" width="600" class="100p">
                                                    <tr>
                                                        <td height="35"></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center" style="color:#FFFFFF; font-size:24px;">
                                                            <font face="'Roboto', Arial, sans-serif">
                                                                <span style="font-size:44px;">Heavenly Writing Astrology</span><br />
                                                                <br />
                                                                <Span style="font-size:24px;">Your ${numberToPhase(horoscope.moonPhase)} Moon Report</Span>
                                                                <br /><br />


                                                                <table border="0" cellspacing="0" cellpadding="10" style="border:2px solid #FFFFFF;">
                                                                    <tr>
                                                                        <td align="center" style="color:#FFFFFF; font-size:16px;"><font face="'Roboto', Arial, sans-serif"><a href="https://heavenlywriting.com/services-2/" target="_blank" style="color:#FFFFFF; text-decoration:none;">Book a session</a></font></td>
                                                                    </tr>
                                                                </table>

                                                            </font>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td height="35"></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <!--[if gte mso 9]>
                            </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
            </table>
			<table width="640" border="0" cellspacing="0" cellpadding="15" bgcolor="#396384" class="100p">
                <tr>
                    <td align="center" style="font-size:18px; color:#FFFFFF;"><font face="'Roboto', Arial, sans-serif">${horoscope.quote} —<a style="color: white" href='${horoscope.quoteSrc}'>${horoscope.quoteAuthor}</a></font></td>
                </tr>
            </table>
			<table width="640" border="0" cellspacing="0" cellpadding="15" bgcolor="#ebecf0" class="100p">
                <tr>
                    <td align="justify" style="font-size:16px; color:#000000;"><font face="'Roboto', Arial, sans-serif">
                    ${htmlSummary}
					</font></td>
                </tr>
            </table>
			
			<table width="640" border="0" cellspacing="0" cellpadding="15" bgcolor="#d74c3d" class="100p">
                <tr>
                    <td align="center" style="font-size:24px; color:#FFFFFF;"><font face="'Roboto', Arial, sans-serif">Best Activities</font></td>
                </tr>
            </table>
			<table width="640" border="0" cellspacing="0" cellpadding="15" bgcolor="#ebecf0" class="100p">
                <tr>
                    <td align="justify" style="font-size:16px; color:#000000;"><font face="'Roboto', Arial, sans-serif">
                    ${htmlBestActivities}
					</font></td>
                </tr>
            </table>
			<table width="640" border="0" cellspacing="0" cellpadding="8" bgcolor="#f49653" class="100p">
                <tr>
                    <td align="center" style="font-size:18px; color:#FFFFFF;"><font face="'Roboto', Arial, sans-serif"><i>${numberToPhase(horoscope.moonPhase)} Moon Themes</i></font></td>
                </tr>
            </table>
			<table width="640" border="0" cellspacing="0" cellpadding="15" bgcolor="#ebecf0" class="100p">
                <tr>
                    <td align="justify" style="font-size:16px; color:#000000;"><font face="'Roboto', Arial, sans-serif">
                    ${htmlMoonThemes}
					</font></td>
                </tr>
            </table>
			<table width="640" border="0" cellspacing="0" cellpadding="8" bgcolor="#f49653" class="100p">
                <tr>
                    <td align="center" style="font-size:18px; color:#FFFFFF;"><font face="'Roboto', Arial, sans-serif"><i>${numberToSign(horoscope.sign)} Themes</i></font></td>
                </tr>
            </table>
			<table width="640" border="0" cellspacing="0" cellpadding="15" bgcolor="#ebecf0" class="100p">
                <tr>
                    <td align="justify" style="font-size:16px; color:#000000;"><font face="'Roboto', Arial, sans-serif">
                    ${htmlSignThemes}
					</font></td>
                </tr>
            </table>
			<table width="640" border="0" cellspacing="0" cellpadding="8" bgcolor="#f49653" class="100p">
                <tr>
                    <td align="center" style="font-size:18px; color:#FFFFFF;"><font face="'Roboto', Arial, sans-serif"><i>House ${horoscope.house} Themes</i></font></td>
                </tr>
            </table>
			<table width="640" border="0" cellspacing="0" cellpadding="15" bgcolor="#ebecf0" class="100p">
                <tr>
                    <td align="justify" style="font-size:16px; color:#000000;"><font face="'Roboto', Arial, sans-serif">
                    ${htmlHouseThemes}
					</font></td>
                </tr>
            </table>
			<table width="640" border="0" cellspacing="0" cellpadding="20" bgcolor="#396384" class="100p">
                <tr>
                    <td align="center" style="font-size:16px; color:#c0c0c0;"><font face="'Roboto', Arial, sans-serif"><span style="color:#ffffff; font-size:24px;">Heavenly Writing Astrology</span><br /></td>
                </tr>
            </table>		
        </td>
    </tr>
</table>

</body>
</html>
        `
  }

  transporter.sendMail(msg, function (error, info) {
    if (error) {
      console.error(error);
    }
  });
}

export default message;