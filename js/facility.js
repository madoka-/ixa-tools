// 施設ごとの処理
// sendRequestに対するレスポンスが遅いので仕方なくsetTimeoutを使っている

// bgのオプション
var op = null;
chrome.extension.sendRequest({option: 'def_kind_soldier'}, function(response) {
	op = response.option;
});

$(document).ready(function() {
	// 施設名を調べる
	var name = $('div.ig_tilesection_detailarea > H3:eq(0) > a').text();
	// 訓練施設
	if (name == '厩舎' || name ==  '足軽兵舎' || name ==  '弓兵舎' || name ==  '兵器鍛冶') {
		var html;
		var lop = null;
		if (localStorage.def_kind_soldier) {
			lop = JSON.parse(localStorage.def_kind_soldier);
			switch (name) {
				case '足軽兵舎':
					html = change_facility_html(lop, 's');
				break;
				case '弓兵舎':
					html = change_facility_html(lop, 'b');
				break;
				case '厩舎':
					html = change_facility_html(lop, 'h');
				break;
				case '兵器鍛冶':
					html = change_facility_html(lop, 'w');
				break;
			}
			$('div.ig_tilesection_mid:eq(1)').html(html);
			if (op != lop && op != null) {
				localStorage.def_kind_soldier = JSON.stringify(op)
			}
		} else {
			setTimeout(function(){
				if (op) {
					localStorage.def_kind_soldier = JSON.stringify(op);
				}
			}, 2000);
		}
	} else if (name == '市') {
		var wood = parseInt($('#wood').text());
		var stone = parseInt($('#stone').text());
		var iron = parseInt($('#iron').text());
		var rice = parseInt($('#rice').text());
		var rate = parseInt($('div.ig_tilesection_detailarea img[alt="取引相場"]').parent().next().find('span').text().substring(0, 2))/100;
		var tmp = '<table style="background-color:#f3f2de;" class="common_table1 center"><tr><th>兵士</th><th>不足</th><th>過剰</th><th>作成可能</th></tr>';
		var op = JSON.parse(localStorage.def_kind_soldier);
/*		if (op) {
			var obj = maxsoldier(wood, stone, iron, rice,  rate, op);
			if (obj.maxsoldier < 100) {
				tmp += '<tr><td>'+key+'</td><td>-</td><td>-</td><td>100未満</td></tr>';
			} else {
				tmp += '<tr><td>'+key+'</td><td>'+obj.shortage+'</td><td>'+obj.excess+'</td><td>'+obj.maxsoldier+'</td></tr>';
			}
		}
*/		tmp += '</table>';
		$('img[alt="市での取引"]').after(tmp);
		$('span.sol_short').hover(function() {
			$(this).css({backgroundColor:'#afa', textDecoration:'underline'});
		}, function() {
			$(this).css({backgroundColor:'', textDecoration:''});
		}).click(function(e) {
			var $this = $(this);
			$('#select2').val($this.attr('type'));
			if ($('#tc').val() == '') {$('#tc').val($this.attr('value'));}
		});
		$('span.sol_excess').hover(function() {
			$(this).css({backgroundColor:'#afa', textDecoration:'underline'});
		}, function() {
			$(this).css({backgroundColor:'', textDecoration:''});
		}).click(function(e) {
			var $this = $(this);
			$('#select').val($this.attr('type'));
			if ($('#tc').val() == '') {$('#tc').val($this.attr('value'));}
		});
	}
	// send_troop 表示のfix<span id="area_up_timer0">2011-04-19 07:20:14</span>
	if ($('span#area_up_timer0')) {
		$('span#area_up_timer0').css('font-size', '80%');
	}
	//console.log(lop);
});

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
					case '騎馬鉄砲':
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
// maxsoldier(wood, stone, iron, rice,  rate, op)
function maxsoldier(wood, stone, iron, rice, rate, op) {
	var sol = {
		s1: { name: '足軽', cost: [9, 14, 5, 5]},
		s2: { name: '長槍足軽', cost: [14, 20, 7, 8]},
		s3: { name: '武士', cost: [18, 27, 9, 11]},
		b1: { name: '弓足軽', cost: [14, 9, 5, 5]},
		b2: { name: '長弓兵', cost: [20, 14, 8, 7]},
		b3: { name: '弓騎馬', cost: [27, 18, 11, 9]},
		h1: { name: '騎馬兵', cost: [5, 5, 9, 14]},
		h2: { name: '精鋭騎馬', cost: [7, 8, 14, 20]},
		h3: { name: '赤備え', cost: [9, 11, 18, 27]},
		g1: { name: '鉄砲足軽', cost: [72, 67, 90, 75]},
		g2: { name: '鉄砲騎馬', cost: [67, 90, 72, 75]},
		w1: { name: '破城鎚', cost: [14, 7, 11, 9]},
		w2: { name: '攻城櫓', cost: [22, 16, 11, 14]},
		w3: { name: '大筒兵', cost: [69, 81, 108, 45]}
	};
	// 表示する兵種を選択
	var a = new Array();
	var b = 0;
	for (var c in sol) {
		if (op[c] == true) {
			a[b] = c;
			b++;
		}
	}
	// htmlの生成
	a.forEach(function(item){
		var c = sol[item]['cost'];
		var cmax = 1500000;
		var i = 0;
		if ((wood / c[0]) < cmax) cmax = Math.floor(wood / c[0]);
		if ((stone / c[1]) < cmax) cmax = Math.floor(stone / c[1]);
		if ((iron / c[2]) < cmax) cmax = Math.floor(iron / c[2]);
		if ((rice / c[3]) < cmax) cmax = Math.floor(rice / c[3]);
		for (i = (cmax + 1); i < 15000; i++) {
			var shortage = 0;
			var excess = 0;
			if ((i * c[0]) > wood) {
				shortage += i * c[0] - wood;
			} else {
				excess += wood - i * c[0];
			}
			if ((i * c[1]) > stone) {
				shortage += i * c[1] - stone;
			} else {
				excess += stone - i * c[1];
			}
			if ((i * c[2]) > iron) {
				shortage += i * c[2] - iron;
			} else {
				excess += iron - i * c[2];
			}
			if ((i * c[3]) > rice) {
				shortage += i * c[3] - rice;
			} else {
				excess += rice - i * c[3];
			}
			if (excess * rate < shortage) break;
		}
		i--;
		var tmp1 = '[必要 ';
		var tmp1c = 0;
		var tmp1t = null;
		var tmp2 = '[余剰 ';
		if ((i * c[0]) < wood) {
			var tmpx = (wood - i * c[0]);
			tmp2 += ' <span class="ixamoko_excess" type="101" value="'+tmpx+'">木: '+tmpx+'</span>';
		} else {
			var tmpx = Math.ceil((i * c[0] - wood) / rate);
			tmp1 += ' <span class="ixamoko_short" type="101" value="'+tmpx+'">木: '+tmpx+'</span>'
			tmp1c++;
			tmp1t = 101;
		}
		if ((i * c[1]) < b) {
			var tmpx = (stone - i * c[1]);
			tmp2 += ' <span class="ixamoko_excess" type="102" value="'+tmpx+'">綿: '+tmpx+'</span>';
		} else {
			var tmpx = Math.ceil((i * c[1] - stone) / rate);
			tmp1 += ' <span class="ixamoko_short" type="102" value="'+tmpx+'">綿: '+tmpx+'</span>';
			tmp1c++;
			tmp1t = 102;
		}
		if ((i * c[2]) < iron) {
			var tmpx = (iron - i * c[2]);
			tmp2 += ' <span class="ixamoko_excess" type="103" value="'+tmpx+'">鉄: '+tmpx+'</span>';
		} else {
			var tmpx = Math.ceil((i * c[2] - iron) / rate);
			tmp1 += ' <span class="ixamoko_short" type="103" value="'+tmpx+'">鉄: '+tmpx+'</span>';
			tmp1c++;
			tmp1t = 103;
		}
		if ((i * dd) < rice) {
			var tmpx = (rice - i * dd);
			tmp2 += ' <span class="ixamoko_excess" type="104" value="'+tmpx+'">糧: '+tmpx+'</span>';
		} else {
			var tmpx = Math.ceil((i * dd - rice) / rate);
			tmp1 += ' <span class="ixamoko_short" type="104" value="'+tmpx+'">糧: '+tmpx+'</span>';
			tmp1c++;
			tmp1t = 104;
		}
		tmp1 += ']';
		tmp2 += ']';
		var moko = {
			shortage: tmp1,
			excess: tmp2,
			maxsoldier: i,
			shortc: tmp1c,
			shortt: tmp1t
		}
	});
	return moko;
}

// outerHTML
jQuery.fn.outerHTML = function(s) {
	return (s)
	? this.before(s).remove()
	: jQuery("<p>").append(this.eq(0).clone()).html();
}
