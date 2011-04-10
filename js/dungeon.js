// 秘境

// 出発ボタンの移動
var squad = $('input[name="unit_select"]:first').attr('checked', true);
if (squad.get().length > 0) {
	var bottun = $('img[alt="出発"]').parent().clone().wrap($('<div class="center">')).parent();
	$('#dungeon_list_body').after(bottun);
	$('img[alt="出発"]:eq(1)').hide();
}

// 探索選択先の記録/復元
var index = localStorage.dungeon_index ? JSON.parse(localStorage.dungeon_index) : null;

if (index != null) {
	$('input[name="dungeon_select"][value="'+index+'"]').attr('checked', true);
}
$('input[name="dungeon_select"]').change(function() {
	localStorage.dungeon_index = JSON.stringify($('input[name="dungeon_select"]:checked').val());
}, false);

// 画像を消すボタン
$('div#ig_gofightboxtitle > p.lead').append(' <a href="#" id="img_switch">画像を消す</a>');
if (localStorage.dungeon_img) {
	var img = JSON.parse(localStorage.dungeon_img);
	if (img === true) {
		$('#dungeon_list_body  img').hide();
		$('#img_switch').text('画像を表示する');
	}
} else {
	localStorage.dungeon_img = JSON.stringify(false);
}

$('p.lead > a').click(function(){
	$('#dungeon_list_body  img').slideToggle();
	var t = $('#img_switch').text();
	if (t == '画像を表示する') {
		localStorage.dungeon_img = JSON.stringify(false);
		$('#img_switch').text('画像を消す');
	} else {
		localStorage.dungeon_img = JSON.stringify(true);
		$('#img_switch').text('画像を表示する');
	}
});
