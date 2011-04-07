// 施設ごとの処理
// sendRequestに対するレスポンスが遅いので仕方なくsetTimeoutを使っている

// bgのオプション
var op;
chrome.extension.sendRequest({option: 'def_kind_soldier'}, function(response) {
	op = response.option;
});

$(document).ready(setTimeout( function(){
	// 施設名を調べる
	var name = $('div.ig_tilesection_detailarea > H3:eq(0) > A').text();
	// 訓練施設
	if (name == '厩舎' || name ==  '足軽兵舎' || name ==  '弓兵舎' || name ==  '兵器鍛冶') {
		var html;
		switch (name) {
			case '足軽兵舎':
				html = change_facility_html(op, 's');
			break;
			case '弓兵舎':
				html = change_facility_html(op, 'b');
			break;
			case '厩舎':
				html = change_facility_html(op, 'h');
			break;
			case '兵器鍛冶':
				html = change_facility_html(op, 'w');
			break;
		}
		$('div.ig_tilesection_mid:eq(1)').html(html);
	}
}, 1000));

function change_facility_html(op, type) {
	var html = {};
	var sol_name = $('font[color] > b').text();
	sol_name = sol_name.replace(/^\[/, '');
	sol_name = sol_name.replace(/\]$/, '');
	sol_name = sol_name.split('][');
	var i = 0;
	sol_name.forEach(function(element, index, array){
		html[element] = $('div.ig_tilesection_mid:eq(1) > div.ig_tilesection_innertop:eq('+i+')').outerHTML();
		html[element] += $('div.ig_tilesection_mid:eq(1) > div.ig_tilesection_innermid:eq('+i+')').outerHTML();
		html[element] += $('div.ig_tilesection_mid:eq(1) > div.ig_tilesection_innerbottom:eq('+i+')').outerHTML();
		i++
	});
	var content = '';
	switch (type) {
		case 's':
			sol_name.forEach(function(element, index, array){
				switch (element) {
					case '武士':
						if (op.s3 == 'true') {
							content += html[element];
						}
						break;
					case '長槍足軽':
						if (op.s2 == 'true') {
							content += html[element];
						}
						break;
					case '足軽':
						if (op.s1 == 'true') {
							content += html[element];
						}
						break;
				}
			});
			break;
		case 'b':
			sol_name.forEach(function(element, index, array){
				switch (element) {
					case '弓騎馬':
						if (op.b3 == 'true') {
							content += html[element];
						}
						break;
					case '長弓兵':
						if (op.b2 == 'true') {
							content += html[element];
						}
						break;
					case '弓足軽':
						if (op.b1 == 'true') {
							content += html[element];
						}
						break;
				}
			});
			break;
		case 'h':
			sol_name.forEach(function(element, index, array){
				switch (element) {
					case '赤備え':
						if (op.h3 == 'true') {
							content += html[element];
						}
						break;
					case '精鋭騎馬':
						if (op.h2 == 'true') {
							content += html[element];
						}
						break;
					case '騎馬兵':
						if (op.h1 == 'true') {
							content += html[element];
						}
						break;
				}
			});
			break;
		case 'w':
			sol_name.forEach(function(element, index, array){
				switch (element) {
					case '鉄砲足軽':
						if (op.g1 == 'true') {
							content += html[element];
						}
						break;
					case '	騎馬鉄砲':
						if (op.g2 == 'true') {
							content += html[element];
						}
						break;
					case '大筒兵':
						if (op.w3 == 'true') {
							content += html[element];
						}
						break;
					case '攻城櫓':
						if (op.w2 == 'true') {
							content += html[element];
						}
						break;
					case '破城鎚':
						if (op.w1 == 'true') {
							content += html[element];
						}
						break;
				}
			});
			break;
	}
	return content;
}

// outerHTML
jQuery.fn.outerHTML = function(s) {
	return (s)
	? this.before(s).remove()
	: jQuery("<p>").append(this.eq(0).clone()).html();
}
