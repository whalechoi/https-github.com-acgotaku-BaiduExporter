!function(t){function e(n){if(a[n])return a[n].exports;var o=a[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var a={};return e.m=t,e.c=a,e.p="",e(0)}([function(t,e,a){!function(){function t(t){var e=window.location.hash;e=e.substr(1).split("&");for(var a=0;a<e.length;a++){var n=e[a],o=n.split("=");if(o[0]==t)return decodeURIComponent(decodeURIComponent(o[1]))}}function e(t){if("true"==localStorage.getItem("svip"))$.get(window.location.origin+"/api/download",{type:"dlink",bdstoken:yunData.MYBDSTOKEN,fidlist:JSON.stringify(Object.keys(t)),timestamp:yunData.timestamp,sign:s,channel:"chunlei",clienttype:0,web:1,app_id:250528},null,"json").done(function(e){var a=[];if(0!=e.errno)return c.showToast("未知错误","MODE_FAILURE"),void console.log(e);for(var n=0;n<e.dlink.length;n++){var d=e.dlink[n],s=t[d.fs_id].path,p=t[d.fs_id].md5;a.push({name:s.substr(l),link:d.dlink,md5:p})}if("TXT"==r)c.dataBox.show(),c.dataBox.fillData(a);else{var u=c.parseAuth(i),_=c.aria2Data(a,u[0],u[2]);o(_)}}).fail(function(t){c.showToast("网络请求失败","MODE_FAILURE"),console.log(JSON.stringify(t))});else{var e=[],a=location.protocol+"//pcs.baidu.com/rest/2.0/pcs/";for(var n in t){var d=t[n].path,p=t[n].md5,u=a+"file?method=download&app_id=250528&path="+encodeURIComponent(d);e.push({name:d.substr(l),link:u,md5:p})}if("TXT"==r)c.dataBox.show(),c.dataBox.fillData(e);else{var _=c.parseAuth(i),h=c.aria2Data(e,_[0],_[2]);o(h)}}}function n(){var e=t("path"),a=parseInt(localStorage.getItem("rpc_fold"))||0;void 0==e||"/"==e||-1==a?l=1:0==a&&(l=e.length+1),window.postMessage({type:"get_selected"},"*")}function o(t){for(var e=c.parseAuth(i),a=0;a<t.length;a++){var n={url:e[1],dataType:"json",type:"POST",data:JSON.stringify(t[a]),headers:{Authorization:e[0]}};c.sendToBackground("rpc_data",n,function(t){t?c.showToast("下载成功!赶紧去看看吧~","MODE_SUCCESS"):c.showToast("下载失败!是不是没有开启aria2?","MODE_FAILURE")})}}var r="RPC",i="http://localhost:6800/jsonrpc",d=function(){function t(s){if(s==n)if(0!=o.length){i++,c.showToast("正在获取文件列表... "+i+"/"+(i+o.length-1),"MODE_SUCCESS");var l=o.pop();$.getJSON(window.location.origin+"/api/list",{dir:l,bdstoken:yunData.MYBDSTOKEN,channel:"chunlei",clienttype:0,web:1}).done(function(e){if(setTimeout(function(){t(s)},a),0!=e.errno)return c.showToast("未知错误","MODE_FAILURE"),void console.log(e);for(var n=0;n<e.list.length;n++){var i=e.list[n];i.isdir?o.push(i.path):r[i.fs_id]=i}}).fail(function(e){c.showToast("网络请求失败","MODE_FAILURE"),console.log(e),setTimeout(function(){t(s)},a)})}else if(0!=r.length){c.showToast("正在获取下载地址... ","MODE_SUCCESS");var p=0,u={};for(var _ in r)u[_]=r[_],p++,100==p&&(e(u),u={},p=0);e(u),d.reset()}else c.showToast("一个文件都没有哦","MODE_CAUTION"),d.reset()}var a,n=0,o=[],r={},i=0,d={};return d.addFolder=function(t){o.push(t)},d.addFile=function(t){r[t.fs_id]=t},d.start=function(){a=parseInt(localStorage.getItem("rpc_delay"))||300,n=(new Date).getTime(),t(n)},d.reset=function(){n=0,o=[],r={},i=0},d}(),s=btoa(new Function("return "+yunData.sign2)()(yunData.sign3,yunData.sign1));window.addEventListener("message",function(t){if(t.source==window&&"selected"==t.data.type){d.reset();var e=t.data.data;if(0==e.length)return void c.showToast("请选择一下你要保存的文件哦","failure");for(var a=0;a<e.length;a++){var n=e[a];n.isdir?d.addFolder(n.path):d.addFile(n)}d.start()}});var l,c=a(1);c.init(),c.requestCookies([{url:"http://pan.baidu.com/",name:"BDUSS"},{url:"http://pcs.baidu.com/",name:"pcsett"}]);var p=c.addMenu.init("home");p.on("click",".rpc_export_list",function(){r="RPC",i=$(this).data("id"),n()}),p.on("click","#aria2_download",function(){r="TXT",c.dataBox.init("home"),c.dataBox.onClose(d.reset),n()}),c.showToast("初始化成功!","success")}()},function(t,e){var a=function(){const t="netdisk;5.3.4.5;PC;PC-Windows;5.1.2600;WindowsBaiduYunGuanJia",e="http://pan.baidu.com/disk/home";var n=null;return{init:function(){this.startListen(),"undefined"!=typeof browser&&(chrome=browser,chrome.storage.sync||(chrome.storage.sync=chrome.storage.local)),chrome.storage.sync.get(null,function(t){for(var e in t)localStorage.setItem(e,t[e])})},escapeString:function(t){if(-1!=navigator.platform.indexOf("Win"))return t;var e="'"+t.replace("'","'\\''")+"'";return e},setCenter:function(t){var e=$(window).width(),a=$(window).height(),n=$(document).scrollTop(),o=(e-t.width())/2,r=(a-t.height())/2+n;t.css({left:o+"px",top:r+"px"})},startListen:function(){function t(t,e){var a=new Object;a[t]=e,chrome.storage.sync.set(a,function(){})}window.addEventListener("message",function(e){if(e.source==window){if(e.data.type&&"config_data"==e.data.type)for(var a in e.data.data)localStorage.setItem(a,e.data.data[a]),e.data.data.rpc_sync===!0?t(a,e.data.data[a]):chrome.storage.sync.clear();e.data.type&&"clear_data"==e.data.type&&chrome.storage.sync.clear()}},!1)},sendToBackground:function(t,e,a){chrome.runtime.sendMessage({method:t,data:e},a)},showToast:function(t,e){window.postMessage({type:"show_toast",data:{message:t,type:e}},"*")},getVersion:function(){var t={jsonrpc:"2.0",method:"aria2.getVersion",id:1,params:[]},e=$("#rpc_url_1").val(),a=this.parseAuth(e);a[0]&&a[0].startsWith("token")&&t.params.unshift(a[0]);var n={url:a[1],dataType:"json",type:"POST",data:JSON.stringify(t)};a[0]&&a[0].startsWith("Basic")&&(n.headers={Authorization:a[0]}),this.sendToBackground("rpc_version",n,function(t){t?$("#send_test").html("ARIA2版本为： "+t.result.version):$("#send_test").html("错误,请查看是否开启Aria2")})},parseAuth:function(t){var e=new URL(t),a=""!=e.username?e.username+":"+decodeURI(e.password):null,n=[];a&&0!=a.indexOf("token:")&&(a="Basic "+btoa(a));var o=e.hash.substr(1);o&&o.split("&").forEach(function(t){t=t.split("="),t[0].length>1&&n.push([t[0],2==t.length?t[1]:"enabled"])});var r=e.origin+e.pathname;return[a,r,n]},addMenu:{init:function(t){if(0!=$("#export_menu").length)return $("#export_menu");var e=$("<span>").attr("id","export_menu"),n=$("<div>").addClass("menu").attr("id","aria2_list").hide().appendTo(e);$("<a>").text("导出下载").addClass("g-button-menu").attr("id","aria2_download").appendTo(n);var o=$("<a>").text("设置").addClass("g-button-menu").appendTo(n);return"home"==t?(e.addClass("g-dropdown-button").prepend($("<a>").addClass("g-button").append($("<span>").addClass("g-button-right").append($("<em>").addClass("icon icon-download"),$("<span>").addClass("text").text("导出下载")))),$(".g-dropdown-button").eq(3).after(e)):"share"==t?($(".bar").css("position","absolute"),e.addClass("g-dropdown-button").prepend($("<a>").addClass("g-button").append($("<span>").addClass("g-button-right").append($("<em>").addClass("icon icon-download"),$("<span>").addClass("text").text("导出下载")))),$('a[data-button-id="b3"]').parent().prepend(e)):"album"==t&&(e.addClass("save-button").append('<em class="global-icon-download"></em><b>导出下载</b>'),$("#albumFileSaveKey, #emphsizeButton").parent().prepend(e)),e.mouseenter(function(){e.toggleClass("button-open"),n.show()}),e.mouseleave(function(){e.toggleClass("button-open"),n.hide()}),o.click(function(){0==$("#setting_div").length&&a.setting.init(),$("#setting_divtopmsg").html(""),$("#setting_div").show()}),this.update(),e},update:function(){$(".rpc_export_list").remove();for(var t=JSON.parse(localStorage.getItem("rpc_list")||'[{"name":"ARIA2 RPC","url":"http://localhost:6800/jsonrpc"}]');t.length>0;){var e=t.pop();$("<a class='rpc_export_list'>").addClass("g-button-menu").attr("data-id",e.url).text(e.name).prependTo($("#aria2_list"))}}},setting:{init:function(){var t=this,e=document.createElement("div");if(e.id="setting_div",0!=$("#setting_div").length)return e.id;var n=['<div class="top"><div title="关闭" id="setting_div_close" class="close"></div><h3>导出设置</h3></div>','<div style=" margin: 20px 10px 10px 10px; ">','<div id="setting_divtopmsg" style="position:absolute; margin-top: -18px; margin-left: 10px; color: #E15F00;"></div>','<table id="setting_div_table" >',"<tbody>",'<tr><td><label>开启配置同步:</label></td><td><input id="rpc_sync" type="checkbox"></td></tr>','<tr><td><label>我是SVIP会员:</label></td><td><input id="svip" type="checkbox"></td></tr>','<tr><td><label>开启校验md5:</label></td><td><input id="md5_checksum" type="checkbox"></td></tr>','<tr><td><label>文件夹结构层数：</label></td><td><input type="text" id="rpc_fold" class="input-small">(默认0表示不保留,-1表示保留完整路径)</td></tr>','<tr><td><label>递归下载延迟：</label></td><td><input type="text" id="rpc_delay" class="input-small">(单位:毫秒)<div style="position:absolute; margin-top: -20px; right: 20px;"><a id="send_test" type="0" href="javascript:;" >测试连接，成功显示版本号。</a></div></td></tr>','<tr><td><label>下载路径:</label></td><td><input type="text" placeholder="只能设置为绝对路径" id="setting_aria2_dir" class="input-large"></td></tr>','<tr><td><label>User-Agent :</label></td><td><input type="text" id="setting_aria2_useragent_input" class="input-large"></td></tr>','<tr><td><label>Referer ：</label></td><td><input type="text" id="setting_aria2_referer_input" class="input-large"></td></tr>','<tr><td colspan="2"><div style="color: #656565;">Headers<label style="margin-left: 65px;">※使用回车分隔每个headers。</label></div><li class="b-list-item separator-1"></li></td></tr>','<tr><td><label>headers ：</label></td><td><textarea id="setting_aria2_headers" ></textarea></td></tr>',"</tbody>","</table>",'<div style="margin-top:10px;">','<div id="copyright">© Copyright <a href="https://github.com/acgotaku/BaiduExporter">雪月秋水 </a><br/> Version:0.9.7 更新日期: 2017/08/12 </div>','<div style="margin-left:50px; display:inline-block"><a href="javascript:;" id="apply" class="button button-blue">应用</a><a href="javascript:;" id="reset" class="button">重置</a></div>',"</div>","</div>"];return e.innerHTML=n.join(""),document.body.appendChild(e),$("#setting_divtopmsg").html(""),t.update(),$("#setting_div").on("click",function(e){switch(e.target.id){case"setting_div_close":$("#setting_div").hide();break;case"apply":t.save(),setTimeout(function(){a.addMenu.update()},60),$("#setting_divtopmsg").html("设置已保存.");break;case"reset":localStorage.clear(),window.postMessage({type:"clear_data"},"*"),$("#setting_divtopmsg").html("设置已重置."),t.update();break;case"send_test":a.getVersion();break;case"add_rpc":var n=$(".rpc_list").length+1,o='<tr class="rpc_list"><td><input id="rpc_name_'+n+'" type="text" value="ARIA2 RPC '+n+'" class="input-medium">：</td><td><input id="rpc_url_'+n+'" type="text" class="input-large"></td></tr>';$(o).insertAfter($(".rpc_list").eq(n-2))}}),a.setCenter($("#setting_div")),e.id},save:function(){var t={};t.UA=document.getElementById("setting_aria2_useragent_input").value,t.rpc_delay=$("#rpc_delay").val(),t.referer=$("#setting_aria2_referer_input").val(),t.rpc_dir=$("#setting_aria2_dir").val(),t.rpc_fold=$("#rpc_fold").val(),t.rpc_headers=$("#setting_aria2_headers").val(),t.rpc_sync=$("#rpc_sync").prop("checked"),t.svip=$("#svip").prop("checked"),t.md5_checksum=$("#md5_checksum").prop("checked");for(var e=[],n=0;n<$(".rpc_list").length;n++){var o=n+1;""!=$("#rpc_url_"+o).val()&&""!=$("#rpc_name_"+o).val()&&e.push({name:$("#rpc_name_"+o).val(),url:$("#rpc_url_"+o).val()})}t.rpc_list=JSON.stringify(e),a.sendToBackground("config_data",t),window.postMessage({type:"config_data",data:t},"*")},update:function(){$("#rpc_delay").val(localStorage.getItem("rpc_delay")||"300"),$("#rpc_fold").val(localStorage.getItem("rpc_fold")||"0");var a=localStorage.getItem("rpc_sync");"false"==a?$("#rpc_sync").prop("checked",!1):$("#rpc_sync").prop("checked",!0);var n=localStorage.getItem("svip");null==n&&(n=0==yunData.is_svip?"false":"true"),"true"==n?$("#svip").prop("checked",!0):$("#svip").prop("checked",!1);var o=localStorage.getItem("md5_checksum")||"false";"false"==o?$("#md5_checksum").prop("checked",!1):$("#md5_checksum").prop("checked",!0),$("#setting_aria2_dir").val(localStorage.getItem("rpc_dir")),$("#setting_aria2_useragent_input").val(localStorage.getItem("UA")||t),$("#setting_aria2_referer_input").val(localStorage.getItem("referer")||e),$("#setting_aria2_headers").val(localStorage.getItem("rpc_headers"));var r=JSON.parse(localStorage.getItem("rpc_list")||'[{"name":"ARIA2 RPC","url":"http://localhost:6800/jsonrpc"}]');$(".rpc_list").remove();for(var i in r){var d=+i+1,s=1==d?'<a id="add_rpc" href="javascript:;" >ADD RPC</a>':"",l='<tr class="rpc_list"><td><input id="rpc_name_'+d+'" type="text" value="'+r[i].name+'" class="input-medium">：</td><td><input id="rpc_url_'+d+'" type="text" class="input-large" value="'+r[i].url+'">'+s+"</td></tr>";$(".rpc_list").length>0?$(l).insertAfter($(".rpc_list").eq(d-2)):$(l).prependTo($("#setting_div_table>tbody"))}}},copyText:function(t){var e=document.createElement("textarea");document.body.appendChild(e),e.style.position="fixed",e.style.left="0",e.style.top="0",e.value=t,e.focus(),e.select();var a=document.execCommand("copy");e.remove(),console.log(a),a?this.showToast("拷贝成功~","MODE_SUCCESS"):this.showToast("拷贝失败 QAQ","MODE_FAILURE")},requestCookies:function(t){this.sendToBackground("get_cookies",t,function(t){n=t})},getHeader:function(a){var o=[],r=localStorage.getItem("UA")||t,i=localStorage.getItem("headers"),d=localStorage.getItem("referer")||e;if(o.push("User-Agent: "+r),o.push("Referer: "+d),i)for(var s=i.split("\n"),l=0;l<s.length;l++)o.push(s[l]);if(n){var c=[];for(var p in n)c.push(p+"="+n[p]);o.push("Cookie: "+c.join("; "))}var u="";if("aria2c_line"==a){for(l=0;l<o.length;l++)u+=" --header "+JSON.stringify(o[l]);return u}if("aria2c_txt"==a){for(l=0;l<o.length;l++)u+=" header="+o[l]+" \n";return u}if("idm_txt"==a){for(l=0;l<o.length;l++)0!=o[l].indexOf("Referer")&&(u+=o[l].split(": ")[0].toLowerCase()+": "+o[l].split(": ")[1]+"\n");return u.replace(/\n$/,"")}return o},aria2Data:function(t,e,a){var n=[],o=this;if(t.length>0)for(var r=t.length,i=0;r>i;i++){var d={jsonrpc:"2.0",method:"aria2.addUri",id:(new Date).getTime(),params:[[t[i].link],{out:t[i].name,dir:localStorage.getItem("rpc_dir")||null,header:o.getHeader()}]};if("true"==localStorage.getItem("md5_checksum")){var s=d.params[d.params.length-1];s.checksum="md5="+t[i].md5}if(a.length>0){var s=d.params[d.params.length-1];a.forEach(function(t){s[t[0]]=t[1]})}e&&0==e.indexOf("token:")&&d.params.unshift(e),n.push(d),console.log(d)}return n},dataBox:{init:function(t){if(0!=$("#download_ui").length)return this;var e=$("<div>").attr("id","download_ui").append('<div class="top"><a href="javascript:;" title="关闭" id="aria2_download_close" class="close"></a><h3><em></em>ARIA2导出</h3></div>'),n=$("<div>").addClass("content").attr("id","content_ui").appendTo(e);e.hide().appendTo($("body")),n.empty();var o=$("<div>").css({"margin-bottom":"10px"}).appendTo(n);$("<a>").attr("id","aria2c_btn").attr({download:"aria2c.down",target:"_blank"}).addClass("save-button ").html('<em class="global-icon-download"></em><b>存为aria2文件</b>').appendTo(o),$("<a>").attr("id","idm_btn").attr({download:"idm.ef2",target:"_blank"}).addClass("save-button ").html('<em class="global-icon-download"></em><b>存为IDM文件</b>').appendTo(o),$("<a>").attr("id","download_txt_btn").attr({download:"download_link.txt",target:"_blank"}).addClass("save-button ").html('<em class="global-icon-download"></em><b>保存下载链接</b>').appendTo(o),$("<a>").attr("id","copy_txt_btn").attr({href:"javascript:void(0);",data:""}).addClass("save-button ").html('<em class="global-icon-download"></em><b>拷贝下载链接</b>').appendTo(o),$("<textarea>").attr({id:"download_link",wrap:"off",spellcheck:!1}).css({width:"100%",overflow:"scroll",height:"180px",resize:"none"}).appendTo(n),a.setCenter($("#download_ui")),$("#download_ui").on("click","#aria2_download_close",function(){navigator.msSaveBlob?$("#aria2c_btn, #idm_btn, #download_txt_btn").data("href",""):$("#aria2c_btn, #idm_btn, #download_txt_btn").attr("href","data:text/plain;charset=utf-8,"),$("#copy_txt_btn").attr("data",""),$("#download_link").val(""),e.hide()}),$("#download_ui").on("click","#copy_txt_btn",function(){a.copyText($("#copy_txt_btn").attr("data"))}),navigator.msSaveBlob?$("#aria2c_btn, #idm_btn, #download_txt_btn").data("href","").click(function(t){var e=$(this),a=document.createElement("script");a.textContent='navigator.msSaveBlob(new Blob(["'+e.data("href").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+'"]), "'+e.attr("download")+'")',document.body.appendChild(a)}):$("#aria2c_btn, #idm_btn, #download_txt_btn").attr("href","data:text/plain;charset=utf-8,")},show:function(){$("#download_ui").show()},onClose:function(t){$("#download_ui").on("click","#aria2_download_close",t)},fillData:function(t){var e=[],n=[],o=[],r=[];if(t.length>0){for(var i=t.length,d=0;i>d;d++){var s=-1!=navigator.platform.indexOf("Win")?JSON.stringify(t[d].name):a.escapeString(t[d].name),l="aria2c -c -s10 -k1M -x16 --enable-rpc=false -o "+s+a.getHeader("aria2c_line")+" "+JSON.stringify(t[d].link);aria2c_txt_item=[t[d].link,a.getHeader("aria2c_txt")," out="+t[d].name," continue=true"," max-connection-per-server=10"," split=10"," min-split-size=1M"],"true"==localStorage.getItem("md5_checksum")&&(l+=" --checksum=md5="+t[d].md5,aria2c_txt_item.push(" checksum=md5="+t[d].md5)),l+="\n",aria2c_txt_item.push("\n"),e.push(l),n.push(aria2c_txt_item.join("\n")),o.push(["<",t[d].link,a.getHeader("idm_txt"),"out="+t[d].name,">\r\n"].join("\r\n")),r.push(t[d].link+"\n")}navigator.msSaveBlob?($("#aria2c_btn").data("href",$("#aria2c_btn").data("href")+n.join("")),$("#idm_btn").data("href",$("#idm_btn").data("href")+o.join("")),$("#download_txt_btn").data("href",$("#download_txt_btn").data("href")+r.join(""))):($("#aria2c_btn").attr("href",$("#aria2c_btn").attr("href")+encodeURIComponent(n.join(""))),$("#idm_btn").attr("href",$("#idm_btn").attr("href")+encodeURIComponent(o.join(""))),$("#download_txt_btn").attr("href",$("#download_txt_btn").attr("href")+encodeURIComponent(r.join("")))),$("#copy_txt_btn").attr("data",$("#copy_txt_btn").attr("data")+r.join("")),$("#download_link").val($("#download_link").val()+e.join(""))}}}}}();t.exports=a}]);