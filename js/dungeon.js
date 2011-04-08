// 秘境

// bgのオプションの取得
var op;
chrome.extension.sendRequest({option: 'hikyou_img_hide'}, function(response) {
	op = JSON.parse(response.option);
});

var squad = $('input[name="unit_select"]:first').attr('checked', true);
if (squad.get().length > 0) {
	var bottun = $('img[alt="出発"]').parent().clone().wrap($('<div class="center">')).parent();
	$('#dungeon_list_body').after(bottun);
	$('img[alt="出発"]:eq(1)').hide();
}

// 探索選択先の記録/復元
var index = JSON.parse(localStorage.dungeon);

if (index != null) {
	$('input[name="dungeon_select"][value="'+index+'"]').attr('checked', true);
}
$('input[name="dungeon_select"]').change(function() {
	localStorage.dungeon = JSON.stringify($('input[name="dungeon_select"]:checked').val());
}, false);

// 画像を消す(オプション)
$(document).ready(setTimeout( function(){
	if (op == true) {
		$('#dungeon_list_body  img').hide();
	}
}, 1000));
