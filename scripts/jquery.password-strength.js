﻿/*

Password Strength Indicator using jQuery and XML



By: Bryian Tan (bryian.tan at ysatech.com)

01/12/2011 - v01.01.00

01/17/2011 - v01.02.00

07/23/2012 - v01.03.00



Description:

Password Strength Indicator somewhat similar to ASP.NET AJAX PasswordStrength extender control behavior 

and implemented by using jQuery and XML. The password information is stored in an XML file. 

Sample XML file contents:

<PasswordPolicy>

<Password>

<duration>180</duration> //password age, expired in xxx days

<minLength>14</minLength> //password minimum length

<maxLength>25</maxLength> //password maximum length

<numsLength>2</numsLength> //number of required digits  

<upperLength>1</upperLength> //number of required upper case  

<specialLength>1</specialLength> //number of required special characters 

<barWidth>200</barWidth> //the bar indicator width

<barColor>Green</barColor> //the bar indicator colors

<specialChars>!@#\$%*()_+^&amp;}{:;?.</specialChars> //allowable special characters

</Password>

</PasswordPolicy>



Resources:

http://fyneworks.blogspot.com/2007/04/dynamic-regular-expressions-in.html

http://projects.sharkmediallc.com/pass/

http://docs.jquery.com/Plugins/Authoring

http://stackoverflow.com/questions/1034306/public-functions-from-within-a-jquery-plugin

*/



(function(e){var t=new function(){this.countRegExp=function(e,t){var n=e.match(t);return n?n.length:0};this.getStrengthInfo=function(e){var t=e.length;var r=0;var i="",s="";var o=new RegExp("["+n.specialChars+"]","g");var u=this.countRegExp(e,/\d/g),a=this.countRegExp(e,/[a-z]/g),f=this.countRegExp(e,/[A-Z]/g),l=this.countRegExp(e,o),c=this.countRegExp(e,/\s/g);s=e.replace(/[a-z]/gi,"")+s.replace(/\d/g,"");s=s.replace(/\d/g,"");s=s.replace(o,"");if(c>0){return"No spaces!"}if(s!==""){return"Invalid character: "+s}if(t>n.maxLength){return"Password too long!"}if(l+f+u+a<n.minLength){i+=n.minLength-(l+f+u+a)+" more characters, "}if(l==0||f==0||u==0||a==0){i+="At least "}if(u>=n.numberLength){u=n.numberLength}else{i+=n.numberLength-u+" more numbers, "}if(l>=n.specialLength){l=n.specialLength}else{i+=n.specialLength-l+" more symbol, "}if(f>=n.upperLength){f=n.upperLength}else{i+=n.upperLength-f+" Upper case characters, "}if(t-(f+l+u)>=n.minLength-n.numberLength-n.specialLength-n.upperLength){r+=n.minLength-n.numberLength-n.specialLength-n.upperLength}else{r+=t-(f+l+u)}r+=f+l+u;if(a===0){if(r>1){r-=1}i+="1 lower case character, "}if(r==n.minLength&&a>0){i="Strong password!"}return i+";"+r}};var n={minLength:12,maxLength:25,specialLength:1,upperLength:1,numberLength:1,barWidth:200,barColor:"Red",specialChars:"!@#$",metRequirement:false,useMultipleColors:0};e.fn.password_strength=function(r){this.metReq=function(){return n.metRequirement};e.ajax({type:"GET",url:"../wp-content/plugins/password-strength-indicator-using-jquery-and-xml/PasswordPolicy.xml",dataType:"xml",success:function(t){e(t).find("Password").each(function(){var t=e(this).find("minLength").text(),r=e(this).find("maxLength").text(),i=e(this).find("numsLength").text(),s=e(this).find("upperLength").text(),o=e(this).find("specialLength").text(),u=e(this).find("barWidth").text(),a=e(this).find("barColor").text(),f=e(this).find("specialChars").text(),l=e(this).find("useMultipleColors").text();n.minLength=parseInt(t);n.maxLength=parseInt(r);n.specialLength=parseInt(o);n.upperLength=parseInt(s);n.numberLength=parseInt(i);n.barWidth=parseInt(u);n.barColor=a;n.specialChars=f;n.useMultipleColors=l})}});return this.each(function(){var r=e("[id='"+this.id+"']").position().left+e("[id='"+this.id+"']").width();var i=e("[id='"+this.id+"']").position().top+e("[id='"+this.id+"']").height();var s=e("<span></span>").css({position:"absolute",top:i-6,left:r+18,"font-size":"80%",display:"inline-block",color:"#fff",opacity:"0.8","padding-left":"2px","padding-right":"2px",background:"#000"});e(this).after(s);var o=e('<div id="PasswordStrengthBorder"></div><div id="PasswordStrengthBar" class="BarIndicator"></div>').css({position:"absolute",display:"none"}).eq(0).css({height:3,top:i-16,left:r+15,"border-style":"solid","border-width":1,padding:2}).end().eq(1).css({height:5,top:i-14,left:r+17}).end();s.before(o);e(this).keyup(function(){var r=e(this).val();n.metRequirement=false;if(r.length>0){var i=t.getStrengthInfo(r);var o=i.split(";"),u=0,a=n.barWidth,f=n.barColor;if(o.length>1){u=o[1]/n.minLength*a}e("[id='PasswordStrengthBorder']").css({display:"inline",width:a});if(n.useMultipleColors==="1"){if(parseInt(u)>=0&&parseInt(u)<=a*.33){f="#FFEC8B"}else if(parseInt(u)>=a*.33&&parseInt(u)<=a*.67){f="#FFA0A0"}else{f=n.barColor}}e("[id='PasswordStrengthBar']").css({display:"inline",width:u,"background-color":f});if(o[0].lastIndexOf(",")!==-1){s.text(o[0].substring(0,o[0].length-2))}else{s.text(o[0])}if(u==a){n.metRequirement=true}}else{s.text("");e("[id='PasswordStrengthBorder']").css("display","none");e("[id='PasswordStrengthBar']").css("display","none")}})})}})(jQuery)

