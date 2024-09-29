function restartDevice(a){showLoading("restarting");a.restart({},function(b){if(b&&b.result=="success"){successOverlay()}else{errorOverlay()}},$.noop)}function signalFormat(a){if(a){if(a>0){return"-"+a+" dBm"}else{return a+" dBm"}}else{return"— —"}}function convertSignal(d){var c=["GSM","GPRS","EDGE","G","E"];var e=["UMTS","HSDPA","HSUPA","HSPA","HSPA+","DC-HSPA+","WCDMA","TD-SCDMA","TD","3G","TD_SCDMA"];var a=["LTE","4G","FDD","TDD","TDD-LTE","FDD-LTE","TDD_LTE","FDD_LTE"];var b=d.sub_network_type?d.sub_network_type:(d.network_type?d.network_type:"");if($.inArray(b,c)!=-1){return d.rssi}else{if($.inArray(b,e)!=-1){return d.rscp}else{if($.inArray(b,a)!=-1){return d.lte_rsrp}}}}function verifyDeviceInfo(a){if(a&&a!=""&&a!="0.0.0.0"){return a}else{return"— —"}}function verifyRsrqSign(a){if(a){if(a>0&&a!=255){return"-"+a+" dB"}else{if(a==255){return a}else{return a+" dB"}}}else{return"— —"}}$(document).ready(function(){$("body").click(function(b){var c=$(".popover");var a=$(b.target);if((b.target.id!=c.data("source")&&a.parents(".popover").length==0)||a.hasClass("popover-close")){popover.close()}})});var popover={popoverEle:null,_init:function(){if(this.popoverEle==null){$("body").append('<div class="popover"></div>');this.popoverEle=$(".popover")}},open:function(a){this._init();var c=a.target.offset();var b=c.top+a.target.outerHeight();this.popoverEle.html(a.html).css({width:a.width,left:c.left,top:b}).data({source:a.target[0].id}).translate();setTimeout(function(){popover.popoverEle.show()},100);this.popoverEle.translate();a.validation&&a.validation.apply()},close:function(){this.popoverEle&&this.popoverEle.fadeOut()},show:function(){this.popoverEle&&this.popoverEle.show()},hide:function(){this.popoverEle&&this.popoverEle.hide()}};function isWifiConnected(a,b){return !!_.find(b,function(c){return c.ip_addr==a})}function trim(a){return a.replace(/^\s+|\s+$/g,"")}function renderCustomElement(a){if(!a){a=$("#container")}var c=a.find("input[type='radio']");var b=a.find("input[type='checkbox']");$.each(c,function(f,h){var e=$(h),g="checked",d=e.prop("checked")?true:false;e.closest(".radio")[d?"addClass":"removeClass"](g)&&d?e.attr(g,true):e.removeAttr(g)});$.each(b,function(f,h){var e=$(h),g="checked",d=e.prop("checked")?true:false;e.closest(".checkbox")[d?"addClass":"removeClass"](g)&&d?e.attr(g,true):e.removeAttr(g)})}function getSelectValFromChosen(b){var a=[];$.each(b,function(d,e){var c=$(e).text().split("/");a.push(c[c.length-1])});return a}function syncSelectAndChosen(a,c){var b=getSelectValFromChosen(c);a.val(b);return b}function getPercent(a,c,b){if(b){b=b*10}else{b=100}return roundToTwoDecimalNumber(a/c*b)+"%"}function checkConnectedStatus(a,c,b){return a=="ppp_connected"||c=="connection"||b=="connect"}function enableBtn(a){a.removeAttr("disabled").removeClass("disabled")}function replaceSpaceWithNbsp(a){return a.replace(/ /g,"&nbsp;")}function URLEncodeComponent(a){return encodeURIComponent(a)}function URLEncode(a){return encodeURI(a)}function checkCableMode(a){return a=="PPPOE"||a=="AUTO_PPPOE"}function disableBtn(a){a.attr("disabled","disabled").removeClass("focusIn").addClass("disabled")}var Escape={html:function(a){return(a+"").replace(/[&<>"'\/`]/g,Escape._htmlReplacer)},regex:function(a){return(a+"").replace(/[\-$\^*()+\[\]{}|\\,.?\s]/g,"\\$&")},_htmlReplacer:function(a){return Escape.HTML_CHARS[a]},HTML_CHARS:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","`":"&#x60;"}};function roundToTwoDecimalNumber(a){return Math.round(a*100)/100}function HTMLEncode(a){return Escape.html(a)}function HTMLDecode(c){var b=document.createElement("div");b.innerHTML=c;var a=b.innerText||b.textContent;a=a.replace(new RegExp("&nbsp;","gm")," ");b=null;return a}function getDisplayVolume1(i,b){i=parseInt(i,10);if(i==""||i=="0"){return""}var l=false;if(i<0){l=true;i=0-i}var a=1;var o=a*1024;var e=o*1024;var g=e*1024;var m=g*1024;var c=b?"b":"B";var h=b?"Kb":"KB";var j=b?"Mb":"MB";var k=b?"Gb":"GB";var d=b?"Tb":"TB";if(b){i=i*8}var f=i/m;var n=roundToTwoDecimalNumber(f)+d;if(f<0.5){f=i/g;n=roundToTwoDecimalNumber(f)+k;if(f<0.5){f=i/e;n=roundToTwoDecimalNumber(f)+j;if(b){if(f<0.5){f=i/o;n=roundToTwoDecimalNumber(f)+h;if(f<0.5){f=i;n=roundToTwoDecimalNumber(f)+c}}}}}if(l){n="-"+n}return n}function getDisplayVolume(i,b){i=parseInt(i,10);if(i==""||i=="0"){return""}var l=false;if(i<0){l=true;i=0-i}var a=1;var o=a*1024;var e=o*1024;var g=e*1024;var m=g*1024;var c=b?"b":"B";var h=b?"Kb":"KB";var j=b?"Mb":"MB";var k=b?"Gb":"GB";var d=b?"Tb":"TB";if(b){i=i*8}var f=i/m;var n=roundToTwoDecimalNumber(f)+d;if(f<0.5){f=i/g;n=roundToTwoDecimalNumber(f)+k;if(f<0.5){f=i/e;n=roundToTwoDecimalNumber(f)+j;if(f<0.5){f=i/o;n=roundToTwoDecimalNumber(f)+h;if(f<0.5){f=i;n=roundToTwoDecimalNumber(f)+c}}}}if(l){n="-"+n}return n}function transUnit(b,c){var a=getDisplayVolume1(b,c);if(a==""){a=c?"0b":"0MB"}if(c){a+="/s"}return a}function transTimeUnit(d){d=parseFloat(d);if(d==""){return a="0hour"}var b=false;if(d<0){b=true;d=0-d}var e="minute";var f="hour";var c=d/3600;var a=roundToTwoDecimalNumber(c)+f;if(c<1){c=d/60;a=roundToTwoDecimalNumber(c)+e}if(b){a="-"+a}return a}function transSecond2Time(d){d=parseInt(d,10);var b=false;if(d<0){b=true;d=0-d}var a=Math.floor(d/3600);d=d%3600;var c=Math.floor(d/60);d=d%60;return(b?"-":"")+leftInsert(a,2,"0")+":"+leftInsert(c,2,"0")+":"+leftInsert(d,2,"0")}function leftInsert(c,b,d){var a=c.toString().length;for(;a<b;a++){c=d+c}return c}var _timeoutStack=[];var _intervalStack=[];function addTimeout(b,a){var c=window.setTimeout(b,a);_timeoutStack.push(c);return c}function addInterval(b,a){var c=window.setInterval(b,a);_intervalStack.push(c);return c}function clearTimer(){clearTimeoutTimer();clearIntervalTimer()}function clearTimeoutTimer(){for(var a=0;a<_timeoutStack.length;a++){window.clearTimeout(_timeoutStack[a])}_timeoutStack=[]}function clearIntervalTimer(){for(var a=0;a<_intervalStack.length;a++){window.clearInterval(_intervalStack[a])}_intervalStack=[]}$(document).ready(function(){$("[manualControl!=true].checkbox").live("click",function(a){var c=$(this);if(c.hasClass("disable")){return false}var b=c.find("input:checkbox");if(b.attr("checked")){b.removeAttr("checked")}else{b.attr("checked","checked")}checkCheckbox(b);a.stopPropagation();return true});$('input[type="text"][noAction!="true"],input[type="password"][noAction!="true"],select').live("focusin",function(a){$(this).addClass("focusIn")}).live("focusout",function(a){$(this).removeClass("focusIn")});$(".form-note .notes-title").live("click",function(){var a=$(this);a.siblings("ul.notes-content:first").slideToggle();a.toggleClass("notes-dot")})});var GSM7_Table=["000A","000C","000D","0020","0021","0022","0023","0024","0025","0026","0027","0028","0029","002A","002B","002C","002D","002E","002F","0030","0031","0032","0033","0034","0035","0036","0037","0038","0039","003A","003A","003B","003C","003D","003E","003F","0040","0041","0042","0043","0044","0045","0046","0047","0048","0049","004A","004B","004C","004D","004E","004F","0050","0051","0052","0053","0054","0055","0056","0057","0058","0059","005A","005B","005C","005D","005E","005F","0061","0062","0063","0064","0065","0066","0067","0068","0069","006A","006B","006C","006D","006E","006F","0070","0071","0072","0073","0074","0075","0076","0077","0078","0079","007A","007B","007C","007D","007E","00A0","00A1","00A3","00A4","00A5","00A7","00BF","00C4","00C5","00C6","00C7","00C9","00D1","00D6","00D8","00DC","00DF","00E0","00E4","00E5","00E6","00E8","00E9","00EC","00F1","00F2","00F6","00F8","00F9","00FC","0393","0394","0398","039B","039E","03A0","03A3","03A6","03A8","03A9","20AC"];var GSM7_Table_Extend=["007B","007D","005B","005D","007E","005C","005E","20AC","007C"];function getEncodeType(d){var b="GSM7_default";var e=0;if(!d){return{encodeType:b,extendLen:e}}for(var c=0;c<d.length;c++){var a=d.charCodeAt(c).toString(16).toUpperCase();while(a.length!=4){a="0"+a}if($.inArray(a,GSM7_Table_Extend)!=-1){e++}if($.inArray(a,GSM7_Table)==-1){b="UNICODE";e=0;break}}return{encodeType:b,extendLen:e}}function encodeMessage(e){var d=0;var c="";if(!e){return c}for(var f=0;f<e.length;f++){var a=e.charCodeAt(f);if(d!=0){if(56320<=a&&a<=57343){c+=dec2hex(65536+((d-55296)<<10)+(a-56320));d=0;continue}else{d=0}}if(55296<=a&&a<=56319){d=a}else{cp=dec2hex(a);while(cp.length<4){cp="0"+cp}c+=cp}}return c}var specialChars=["000D","000A","0009","0000"];var specialCharsIgnoreWrap=["0009","0000"];function decodeMessage(c,b){if(!c){return""}var a=specialCharsIgnoreWrap;return c.replace(/([A-Fa-f0-9]{1,4})/g,function(d,e){if($.inArray(e,a)==-1){return hex2char(e)}else{return""}})}function dec2hex(a){return(a+0).toString(16).toUpperCase()}function hex2char(b){var a="";var c=parseInt(b,16);if(c<=65535){a+=String.fromCharCode(c)}else{if(c<=1114111){c-=65536;a+=String.fromCharCode(55296|(c>>10))+String.fromCharCode(56320|(c&1023))}}return a}function renderCheckbox(){var b=$(".checkboxToggle");b.each(function(){checkBoxesSize($(this))});var a=$(".checkbox").not("[class*='checkboxToggle']").find("input:checkbox");if(a.length==0){disableCheckbox(b)}else{enableCheckbox(b)}a.each(function(){checkCheckbox($(this))})}function checkBoxesSize(b){var c=b.attr("target");var e=$("#"+c+" .checkbox input:checkbox").length;var d=$("#"+c+" .checkbox input:checkbox:checked").length;var a=b.find("input:checkbox");if(e!=0&&e==d){a.attr("checked","checked")}else{a.removeAttr("checked")}checkP(a)}function checkSelectAll(b,c){var a=$("#"+c+" .checkbox input:checkbox");if(b.attr("checked")){a.attr("checked","checked")}else{a.removeAttr("checked")}a.each(function(){checkCheckbox($(this))})}function checkCheckbox(a){if(a.closest("p.checkbox").hasClass("checkboxToggle")){checkSelectAll(a,a.closest("p.checkbox").attr("target"))}checkP(a);checkBoxesSize($("#"+a.attr("target")))}function checkP(a){if(a.attr("checked")){a.closest("p.checkbox").addClass("checkbox_selected")}else{a.closest("p.checkbox").removeClass("checkbox_selected")}}function removeChecked(a){$("#"+a).removeClass("checkbox_selected").find("input:checkbox").removeAttr("checked")}function disableCheckbox(b){var a=b.find("input:checkbox");if(a.attr("checked")){b.addClass("checked_disable")}else{b.addClass("disable")}}function enableCheckbox(a){a.removeClass("disable").removeClass("checked_disable")}function tryToDisableCheckAll(b,a){if(a==0){disableCheckbox(b)}else{enableCheckbox(b)}}function escapeMessage(a){return a}function parseTime(a){if(a.indexOf("+")>-1){a=a.substring(0,a.lastIndexOf("+"))}var b;if(a.indexOf(",")>-1){b=a.split(",")}else{b=a.split(";")}if(b.length==0){return""}else{var c=b[0]+"-"+b[1]+"-"+b[2]+" "+leftInsert(b[3],2,"0")+":"+leftInsert(b[4],2,"0")+":"+leftInsert(b[5],2,"0");return c}}function transTime(b){var a=b.split(",");if(a.length==0||(","+b+",").indexOf(",,")!=-1){return""}else{var c=a[0]+"/"+a[1]+"/"+a[2]+" "+leftInsert(a[3],2,"0")+":"+leftInsert(a[4],2,"0")+":"+leftInsert(a[5],2,"0");return c}}function getSmsCount(e){var b=getEncodeType(e);var a=e.length,d=b.encodeType!="UNICODE",c=false,f=0;if(d){c=(a+b.extendLen)>160;f=153}else{c=a>70;f=67}if(c){return Math.ceil((a+b.extendLen)/f)}else{return 1}}function getInsertPos(b){var d=0;if(b.selectionStart||b.selectionStart=="0"){d=b.selectionStart}else{if(document.selection){b.focus();var a=document.selection.createRange();var c=a.duplicate();c.moveToElementText(b);while(a.compareEndPoints("StartToStart",c)>0){a.moveStart("character",-1);d++}}}return d}function setInsertPos(b,c){b.focus();if(b.selectionStart||b.selectionStart=="0"){b.selectionStart=c;b.selectionEnd=c}else{if(document.selection){var a=b.createTextRange();a.moveStart("character",c);a.collapse(true);a.select()}}}function isIntNum(a,b){for(var c=1;c<6;c++){if(a==c*b){return true}}return false}function transUnixTime(e){var g=new Date(parseInt(e,10));var d=g.getFullYear();var f=leftPad(g.getMonth()+1,2,"0");var c=leftPad(g.getDate(),2,"0");var a=leftPad(g.getHours(),2,"0");var h=leftPad(g.getMinutes(),2,"0");var b=leftPad(g.getSeconds(),2,"0");return d+"-"+f+"-"+c+" "+a+":"+h+":"+b}function leftPad(c,b,d){var a=c.toString().length;for(;a<b;a++){c=d+c}return c}function convertNumberToId(a){return a.replace(/[\+\*#]/g,"_")}function getLastNumber(b,a){if(b.length>a){return convertNumberToId(b.substring(b.length-a,b.length))}return convertNumberToId(b)}function fixTableHeight(){if($.browser.msie){var a=setInterval(function(){var b=$(".fixTableScroll")[0];if(b){var c=b.scrollHeight;if(c!=0){b.style.height=c+20;window.clearInterval(a)}}else{window.clearInterval(a)}},300)}}function refreshTableHeight(){if($.browser.msie){$(".fixTableScroll")[0].style.height=$(".fixTableScroll .ko-grid-container")[0].scrollHeight+35}}function popup(b){$.modal.close();var d=b.minHeight||140;$("#confirm").modal({zIndex:3000,position:["30%"],overlayId:"confirm-overlay",containerId:"confirm-container",escClose:false,minHeight:d});var a=$("div#confirm");$("#confirmImg",a).attr("src",b.img);$("#popTitle",a).html($.i18n.prop(b.title));if(typeof b.msg!="string"){var e=[b.msg.msg];e.push(b.msg.params);$(".message",a).html($.i18n.prop.apply(null,_.flatten(e)))}else{$(".message",a).html($.i18n.prop(b.msg))}var c=$("div.promptDiv",a);if(b.showInput===true){c.show();$("input#promptInput",c).val(b.defaultValue?b.defaultValue:"");$(".promptErrorLabel",c).empty()}else{c.hide()}window.setTimeout(function(){$(":input:enabled:visible:first","#confirm-container").focus()},0)}function showSettingWindow(e,d,f,b,h,g){var c={title:e,htmlPath:d,jsPath:f,minHeight:h,minWidth:b};var i=$.isFunction(g);var a=$.isPlainObject(g);popupSettingWindow(c)}function popupSettingWindow(c){$.modal.close();var d=c.minHeight||140;var b=c.minWidth||400;var e=$("#htmlContainer");var a="text!tmpl/"+c.htmlPath+".html";require([a,c.jsPath],function(f,g){e.stop(true,true);e.hide();e.html(f);g.init();$("#htmlContainer").translate();e.show();$("#htmlContainer").css("opacity",50)});$("#popupSettingWindow").modal({zIndex:3000,position:["30%"],escClose:false,minWidth:b,minHeight:d,maxWidth:400,opacity:50})}function hidePopupSettingWindow(){$("#popupSettingWindow").remove();$.modal.close()}function showInfo(a,c){var b={title:"info",img:"pic/res_info.png",msg:a,minHeight:c};popup(b);$("#yesbtn, #nobtn").hide();$("#okbtn").unbind("click").click(function(){$.modal.close()}).show()}function showPrompt(c,g,e,a,b,f){var d={title:"prompt",img:"pic/res_confirm.png",msg:c,minHeight:e,showInput:true,defaultValue:a};popup(d);$("#yesbtn, #nobtn").unbind("click").show();$("#okbtn").hide();$("#yesbtn").click(function(){if($.isFunction(b)){if(!b()){return false}}if($.isFunction(g)){if(g()){$.modal.close()}}});$("#nobtn").click(function(){if($.isFunction(f)){f()}$.modal.close()});if($.isFunction(b)){$("#promptInput","#confirm").unbind("input propertychange").bind("input propertychange",function(){if($.isFunction(b)){b()}})}$("#promptInput","#confirm").unbind("keypress").bind("keypress",function(h){if(h.keyCode==13){$("#yesbtn").trigger("click")}})}function showConfirm(b,h,g,e,a){if(e){$("#yesbtn").attr("data-trans",e)}else{$("#yesbtn").attr("data-trans","yes")}if(a){$("#nobtn").attr("data-trans",a)}else{$("#nobtn").attr("data-trans","no")}$("#yesbtn, #nobtn").translate();var d={title:"confirm",img:"pic/res_confirm.png",msg:b,minHeight:g};popup(d);$("#yesbtn, #nobtn").show();$("#okbtn").hide();var c=$.isFunction(h);var f=$.isPlainObject(h);$("#yesbtn").unbind("click").click(function(){$.modal.close();if(c){h()}else{if(f&&$.isFunction(h.ok)){h.ok()}}});$("#nobtn").unbind("click").click(function(){$.modal.close();if(f&&$.isFunction(h.no)){h.no()}})}function showAlert(a,d,c){var b={title:"alert",img:"pic/res_alert.png",msg:a,minHeight:c};popup(b);$("#yesbtn, #nobtn").hide();$("#okbtn").unbind("click").click(function(){$.modal.close();if($.isFunction(d)){d()}}).show()}function loadingMsgChange(a){$("#loadMsg").html($.i18n.prop(a))}function hideLoading(){$("#confirm-overlay").css("cursor","default");$.modal.close();$("#loadMsg").html("")}function getRandomInt(a){return Math.round(Math.random()*a)}function getCurrentDatetime(){var a=new Date();return a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()+" "+a.getHours()+":"+a.getMinutes()+":"+a.getSeconds()}function getRandomDatetime(){var a=new Date();return a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()+" "+getRandomInt(24)+":"+getRandomInt(60)+":"+getRandomInt(60)}function getRandomDatetimeSep(){var a=new Date();return a.getFullYear()+","+(a.getMonth()+1)+","+a.getDate()+","+getRandomInt(24)+","+getRandomInt(60)+","+getRandomInt(60)}function getCurrentTimeString(a){var b="";var c=a?a:new Date();b+=(c.getFullYear()+"").substring(2)+";";b+=getTwoDigit((c.getMonth()+1))+";"+getTwoDigit(c.getDate())+";"+getTwoDigit(c.getHours())+";"+getTwoDigit(c.getMinutes())+";"+getTwoDigit(c.getSeconds())+";";if(c.getTimezoneOffset()<0){b+="+"+(0-c.getTimezoneOffset()/60)}else{b+=(0-c.getTimezoneOffset()/60)}return b}function getTwoDigit(a){a+="";while(a.length<2){a="0"+a}return a}function showLoading(e,d,c){if(e){$("#loadMsg").html($.i18n.prop(e))}else{$("#loadMsg").html("")}$("#loading").modal({zIndex:3000,position:["30%"],overlayId:"confirm-overlay",containerId:"confirm-container",minHeight:140,persist:true,focus:false,escClose:false});var f=$("#loading #loading_container");var b="<a href='javascript:void(0)'>&nbsp;</a>";if(d){f.html(d+b)}else{f.html(b)}if(c){$("#loading #loading_wording").html($.i18n.prop(c))}else{$("#loading #loading_wording").html("")}$("a:last",f).focus().hide()}function hideProgressBar(){$.modal.close();setProgressBar(0);$("#barMsg").html("")}function setProgressBar(a){jQuery("#bar").width(400*a/100);jQuery("#barValue").text(a+"%")}function showProgressBar(b,a){if(b){$("#barMsg").html($.i18n.prop(b))}$("#progress").modal({zIndex:3000,position:["30%"],overlayId:"confirm-overlay",containerId:"confirm-container",minHeight:140,persist:true,focus:false,escClose:false});if(a){$("#progress #progress_container").html(a)}else{$("#progress #progress_container").html("")}}function showInfoMsg(e,a,b){$.modal.close();if(e){$("#result-image","#result-overlay").removeClass().addClass(a);$("#result_wording").html("<h2>"+$.i18n.prop(e)+"</h2>")}$("#result-overlay").modal({zIndex:3000,position:["30%"],overlayId:"confirm-overlay",containerId:"confirm-container",minHeight:140,persist:true,focus:false,escClose:false});var c=3;var d=setInterval(function(){c--;if(c==0){clearInterval(d);if($("#result-overlay:visible").length>0){$.modal.close()}}},1000)}function errorOverlay(a,b){showInfoMsg(a?a:"error_info","overlay-error",!b)}function successOverlay(a,b){showInfoMsg(a?a:"success_info","overlay-success",!b)}function transOption(a,b){if(b){return function(c){if(c.value!=0){var d=c.value.split("_");return d[1]+"MHz "+$.i18n.prop(a+"_"+d[0])}else{return $.i18n.prop(a+"_0")}}}return function(c){return $.i18n.prop(a+"_"+c.value)}}function getFileType(b){var a=b.split(".").pop().toLowerCase();for(type in extMap){if($.inArray(a,extMap[type])!=-1){return type}}return"file"}var extMap={mp3:["mp3","wma","wav"],film:["mp4","avi","rm","rmvb","3gp","mpeg"],picture:["jpeg","jpg","gif","bmp","png"],pdf:["pdf"],rar:["rar","7z","zip","gzip","gz","tar"],doc:["doc","docx"],ppt:["ppt","pptx"],xls:["xls","xlsx"],xml:["xml"]};function checkRange(d,b,a){var c=parseInt(d,10);return !(c>a||c<b)}function transProtocolValue(a){switch(a){case"TCP":case"UDP":case"ICMP":return a;case"TCP&UDP":return"TCP+UDP";case"None":default:return"ALL"}}function transProtocol(b){var a="ALL";if("1"==b){a="TCP"}else{if("2"==b){a="UDP"}else{if("3"==b){a="TCP+UDP"}else{if("4"==b){a="ICMP"}else{if("5"==b){a="ALL"}}}}}return a}function updateLength(b){var e=0;var a;var c=0;for(var d=0;d<b.length;d++){a=b.charAt(d);e=e+1;if((a=="[")||(a=="]")||(a=="{")||(a=="}")||(a=="|")||(a=="\\")||(a=="^")||(a=="~")||(a=="€")){e=e+1}c=d;if(e==765){break}if(e>765){c=d-1;e=e-2;break}}return{index:c,length:e}}function clearValidateMsg(a){a=a||"*";$(a+" label.error").remove()}function isErrorObject(a){return typeof a.errorType==="string"}var manualLogout=false;