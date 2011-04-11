// conten scripts / sidebox.js
// 右カラムの編集や状態の保持をするクラス
//
// 読まなくていいpath
// user/farst_login.php
// http://sengokuixa.jp
// http://cache.sengokuixa.jp

if (location.hostname.match(/w\d+\.sengokuixa\.jp/)) {
	// ほぼ毎回読み込み
	if (location.pathname != '/user/farst_login.php' || location.pathname.match(/\/tutorial.*$/)) {
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
		$('img[src*="gnavi_blink_battle.gif"]').css('display', 'none');
		// 合戦時は生産を砦へのリンクに置き換える
		if ($('img[alt="合戦中"]') && location.pathname == '/map.php') {
			$('div.sideBox.last').html('<form id="fort"><div class="sideform"><select name="country" size="1"><option value="0">自国</option><option value="1">織田</option><option value="2">足利</option><option value="3">武田</option><option value="4">上杉</option><option value="5">徳川</option><option value="6">毛利</option><option value="7">浅井</option><option value="8">北条</option><option value="9">長宗我部</option><option value="10">島津</option><option value="11">大友</option><option value="12">最上</option></select><select name="locate"><option value="0">北東</option><option value="1">北西</option><option value="2">南東</option><option value="3">南西</option></select><select name="no"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option></select></div><div class="sideform"><button name="fort_submit" type="submit">移動する</button></div></form>');
			if (localStorage.map_select_country) {
				var a = localStorage.map_select_country;
				$('select[name="country"]').find('option[value='+a+']').attr('selected', 'selected');
			}
			if (localStorage.map_select_locate) {
				var a = localStorage.map_select_locate;
				$('select[name="locate"]').find('option[value='+a+']').attr('selected', 'selected');
			}
			var fort = ['12,28', '28,12', '12,52', '36,36', '52,12', '12,76', '36,60', '60,36', '76,12', '12,100', '36,84', '60,60', '84,36', '100,12', '12,124', '36,108', '60,84', '84,60', '108,36', '124,12', '12,148']
			$('form#fort').submit(function(){
				var x;
				var y;
				var c = '';
				var a = $('select[name="no"]').val() - 1;
				var b = fort[a].split(',');
				switch ($('select[name="locate"]').val()) {
					case '0':
						x = b[0];
						y = b[1];
					break;
					case '1':
						x = '-' + b[0];
						y = b[1];
					break;
					case '2':
						x = b[0];
						y = '-' + b[1];
					break;
					case '3':
						x = '-' + b[0];
						y = '-' + b[1];
					break;
				}
				if ($('select[name="country"]').val() != '0') {
					c = '&c=' + $('select[name="country"]').val();
				}
				localStorage.map_select_country = JSON.stringify($('select[name="country"]').val());
				localStorage.map_select_locate = JSON.stringify($('select[name="locate"]').val());
				location.href = '/map.php?' + 'x=' + x + '&' + 'y=' + y + c
				return false;
			});
		}
		// チャット履歴のリンクを本当に履歴へ結びつける
		$('div.commentbtn2 > a[href="/bbs/topic_view.php"]').attr('href', '/alliance/chat_view.php');
	}
}
