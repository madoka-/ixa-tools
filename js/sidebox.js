// conten scripts / sidebox.js
// 右カラムの編集や状態の保持をするクラス
//
// 読まなくていいpath
// user/farst_login.php
// http://sengokuixa.jp
// http://cache.sengokuixa.jp

if (location.hostname.match(/w\d+\.sengokuixa\.jp/)) {
	// ほぼ毎回読み込み
	if (location.pathname != '/user/farst_login.php') {
		// 状態と拠点と生産の並べ替え
		var $sidebottom = $('#sideboxBottom');
		var $seisan_div = $sidebottom.find('div.sideBox:eq(0)').addClass('last');
		var $kyoten_div = $sidebottom.find('div.sideBox:eq(1)');
		var $joutai_div = $sidebottom.find('div.sideBox:eq(2)').removeClass('last');
		$joutai_div.after($seisan_div).after($kyoten_div);
		// くじと金銅の並べ替え
		var $sidebox1 = $('#sideboxTop > div.sideBox:eq(0)');
		var $sidebox2 = $('#sideboxTop > div.sideBox:eq(1)');
		$sidebottom.after($sidebox1).after($sidebox2);
		// 取引のリンクをカードNo昇順に
		$('a[href="/card/trade.php"]').attr("href","/card/trade.php?t=name&k=&s=no&o=a");
		// <div id="soldier">があったら全部隊と全編成のリンクをはる
		if ($('#soldier')) {
			var $temp = $('dt:contains("自軍")').addClass("a_black").wrapInner('<strong><a href="/facility/set_unit_list.php?show_num=100"></a></strong>');
			$temp.next().addClass("a_black").wrapInner('<a href="/facility/unit_status.php?dmo=all"></a>');
		}
		// 合戦の画像を差し替え
		var img = chrome.extension.getURL('images/gnavi_blink_battle.png');
		$('img[src*="gnavi_blink_battle.gif"]').attr('src', img);
		// チャット履歴のリンクを本当に履歴へ結びつける
		$('div.commentbtn2 > a[href="/bbs/topic_view.php"]').attr('href', '/alliance/chat_view.php');
	}
}
