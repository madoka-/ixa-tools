// 施設ごとの処理
// sendRequestに対するレスポンスが遅いので仕方なくsetTimeoutを使っている

// bgのオプション
var op = null;
chrome.extension.sendRequest({option: 'def_kind_soldier'}, function(response) {
	op = response.option;
});

$(document).ready(function() {
	// 施設名を調べる
	var name = $('div.ig_tilesection_detailarea > H3:eq(0) > A').text();
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
	}/* else if (name == '市') {
		var wood = parseInt($('#wood').text());
		var stone = parseInt($('#stone').text());
		var iron = parseInt($('#iron').text());
		var rice = parseInt($('#rice').text());
		var rate = parseInt($('DIV.ig_tilesection_detailarea IMG[alt="取引相場"]').parent().next().find('SPAN').text().substring(0, 2))/100;

		var tmp = '<TABLE style="background-color:#F3F2DE;" class="common_table1 center"><TR><TH>兵士</TH><TH>不足</TH><TH>過剰</TH><TH>作成可能</TH></TR>';
		for(var key in soldiertype) {
			var moko = maxsoldier(wood, stone, iron, rice, soldiertype[key][0], soldiertype[key][1], soldiertype[key][2], soldiertype[key][3], rate);
			if (moko.maxsoldier<100) {
				tmp += '<TR><TD>'+key+'</TD><TD>-</TD><TD>-</TD><TD>100未満</TD></TR>';
			} else {
				tmp += '<TR><TD>'+key+'</TD><TD>'+moko.shortage+'</TD><TD>'+moko.excess+'</TD><TD>'+moko.maxsoldier+'</TD></TR>';
			}
		}
		tmp += '</TABLE>';
		$('IMG[alt="市での取引"]').after(tmp);
		$('SPAN.ixamoko_short').hover(function() {
			$(this).css({backgroundColor:'#afa', textDecoration:'underline'});
		}, function() {
			$(this).css({backgroundColor:'', textDecoration:''});
		}).click(function(e) {
			var $this = $(this);
			$('#select2').val($this.attr('type'));
			if ($('#tc').val()=='') $('#tc').val($this.attr('value'));
		});
		$('SPAN.ixamoko_excess').hover(function() {
			$(this).css({backgroundColor:'#afa', textDecoration:'underline'});
		}, function() {
			$(this).css({backgroundColor:'', textDecoration:''});
		}).click(function(e) {
			var $this = $(this);
			$('#select').val($this.attr('type'));
			if ($('#tc').val()=='') $('#tc').val($this.attr('value'));
		});
	}*/
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

function maxsoldier(a, b, c, d, aa, bb, cc, dd, rate) {
	var cmax = 1500000;
	if ((a/aa)<cmax) cmax = Math.floor(a/aa);
	if ((b/bb)<cmax) cmax = Math.floor(b/bb);
	if ((c/cc)<cmax) cmax = Math.floor(c/cc);
	if ((d/dd)<cmax) cmax = Math.floor(d/dd);
	var i;
	for(i=(cmax+1);i<15000;++i) {
		var shortage = 0;
		var excess = 0;
		if ((i*aa)>a) {
			shortage += i*aa-a;
		} else {
			excess += a-i*aa;
		}
		if ((i*bb)>b) {
			shortage += i*bb-b;
		} else {
			excess += b-i*bb;
		}
		if ((i*cc)>c) {
			shortage += i*cc-c;
		} else {
			excess += c-i*cc;
		}
		if ((i*dd)>d) {
			shortage += i*dd-d;
		} else {
			excess += d-i*dd;
		}
		if (excess*rate<shortage) break;
	}
	--i;
	var tmp1 = '[必要 ';
	var tmp1c = 0;
	var tmp1t = null;
	var tmp2 = '[余剰 ';
	if ((i*aa)<a) {
		var tmpx = (a-i*aa);
		tmp2 += ' <SPAN class="ixamoko_excess" type="101" value="'+tmpx+'">木: '+tmpx+'</SPAN>';
	} else {
	var tmpx = Math.ceil((i*aa-a)/rate);
		tmp1 += ' <SPAN class="ixamoko_short" type="101" value="'+tmpx+'">木: '+tmpx+'</SPAN>'
		++tmp1c;
		tmp1t = 101;
	}
	if ((i*bb)<b) {
		var tmpx = (b-i*bb);
		tmp2 += ' <SPAN class="ixamoko_excess" type="102" value="'+tmpx+'">綿: '+tmpx+'</SPAN>';
	} else {
	var tmpx = Math.ceil((i*bb-b)/rate);
		tmp1 += ' <SPAN class="ixamoko_short" type="102" value="'+tmpx+'">綿: '+tmpx+'</SPAN>';
		++tmp1c;
		tmp1t = 102;
	}
	if ((i*cc)<c) {
		var tmpx = (c-i*cc);
		tmp2 += ' <SPAN class="ixamoko_excess" type="103" value="'+tmpx+'">鉄: '+tmpx+'</SPAN>';
	} else {
	var tmpx = Math.ceil((i*cc-c)/rate);
		tmp1 += ' <SPAN class="ixamoko_short" type="103" value="'+tmpx+'">鉄: '+tmpx+'</SPAN>';
		++tmp1c;
		tmp1t = 103;
	}
	if ((i*dd)<d) {
		var tmpx = (d-i*dd);
		tmp2 += ' <SPAN class="ixamoko_excess" type="104" value="'+tmpx+'">糧: '+tmpx+'</SPAN>';
	} else {
		var tmpx = Math.ceil((i*dd-d)/rate);
		tmp1 += ' <SPAN class="ixamoko_short" type="104" value="'+tmpx+'">糧: '+tmpx+'</SPAN>';
		++tmp1c;
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
	return moko;
}

// outerHTML
jQuery.fn.outerHTML = function(s) {
	return (s)
	? this.before(s).remove()
	: jQuery("<p>").append(this.eq(0).clone()).html();
}
