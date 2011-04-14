// content scripts / common.js
// 毎回読み込むスクリプトなので最小限にとどめる
//
// todo
//

// onload
$(document).ready(function(){
	// 全角数字→半角数字
	$('input[type="text"]').change(function(e) {
		$(this).val(function() {
			var str = $(this).val();
			str = str.replace(/[０-９]/g, function(str){return String.fromCharCode(str.charCodeAt(0) - 65248);});
			str = str.replace(/[ー|－](\d+)/g, '-$1');
			return str;
		});
	});
	if (location.pathname == '/world/select_world.php') {
		document.cookie = 'tools_st=' + getUnixTime() + '; domain=.sengokuixa.jp; path=/;';
	} else if (getCookie('tools_st') !== null) {
		localStorage.tools_starttime = getCookie('tools_st');
		document.cookie = 'tools_st=0; expires=Fri, 31-Dec-1999 23:59:59 GMT; domain=.sengokuixa.jp; path=/;';
	}
});

// 受け取ったメッセージごとの処理
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if (request.name == 'move'){
			// リダイレクト
			location.href = request.path.replace('%3F', '?');
			sendResponse({});
		}
	}
);
// functions
function getUnixTime() {
	var a = new Date();
	var m = a.getMilliseconds();
	return (a.getTime() - m) / 1000;
}
function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = $.trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}
