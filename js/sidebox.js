// conten scripts / sidebox.js
// 右カラムの編集や状態の保持をするクラス
//
// 読まなくていいpath
// user/farst_login.php
// http://sengokuixa.jp
// http://cache.sengokuixa.jp

if (location.hostname.match(/w\d+\.sengokuixa\.jp/)) {
	if (location.pathname != '/user/farst_login.php') {
		// 状態と拠点と生産の並べ替え
		var $sidebottom = $('#sideboxBottom');
		var $seisan_div = $sidebottom.find('div.sideBox:eq(0)').addClass('last');
		var $kyoten_div = $sidebottom.find('div.sideBox:eq(1)');
		var $joutai_div = $sidebottom.find('div.sideBox:eq(2)').removeClass('last');
		$joutai_div.after($seisan_div).after($kyoten_div);
		// くじと金の並べ替え
		var $sidebox1 = $('#sideboxTop > div.sideBox:eq(0)');
		var $sidebox2 = $('#sideboxTop > div.sideBox:eq(1)');
		$sidebottom.after($sidebox1).after($sidebox2);
		// 合戦の画像を消す
	}
}
