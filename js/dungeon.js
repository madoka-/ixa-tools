// 秘境
// 丸パクリ

var squad = $('input[name="unit_select"]:first').attr('checked', true);
if (squad.get().length > 0) {
	var bottun = $('img[alt="出発"]').parent().clone().wrap($('<div class="center">')).parent();
	$('#dungeon_list_body').after(bottun);
	$('img[alt="出発"]:eq(1)').hide();
}

// 探索選択先の記録/復元
var index = localStorage.dungeon;

if (index != null) {
	$('input[name="dungeon_select"][value="'+index+'"]').attr('checked', true);
}
$('input[name="dungeon_select"]').change(function() {
	localStorage.dungeon = $('input[name="dungeon_select"]:checked').val();
}, false);
