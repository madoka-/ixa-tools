// options.htmlに読み込まれる
// backgroundのDOMを読み込んで現在の設定を確認後、htmlを生成する
//
// todo
// def_kind_soldier当たりのhtmlやcssのブラッシュアップ
// できればただのオプションの羅列では無くタブメニューっぽい構成に
var bg = chrome.extension.getBackgroundPage();
var co = bg.conf;

function restore_options() {
	var html = '<form id="op">';
	var flag = 'all';
	var sl1;
	var sl2;
	var sl3;

	for(var i in co.option){
		sl1 = '';
		sl2 = '';
		sl3 = '';
		switch(co['option'][i]['tag']){
			case 'hidden': break;
			case 'deck':
				if(flag != 'deck'){
					flag = 'deck';
					html += '<hr />';
				}
				if(i == 'def_honjou'){
					switch(co['option'][i]['value']){
						case '1':
							sl1 = ' checked="checked"';
							break;
						case '2':
							sl2 = ' checked="checked"';
							break;
						case '3':
							sl3 = ' checked="checked"';
							break;
					}
					html += '<div class="op_caption">'+co['option'][i]['caption']+'</div><div class="op_input">非合戦時だけON<input type="radio" name="'+i+'" value="1"'+sl1+' />常にON<input type="radio" name="'+i+'" value="2"'+sl2+' />常にOFF<input type="radio" name="'+i+'" value="3"'+sl3+' /><br />';
				} else {
					switch(co['option'][i]['value'].toString()){
						case 'true':
							sl1 = ' checked="checked"';
						break;
						case 'false':
							sl2 = ' checked="checked"';
						break;
					}
					html += '<div class="op_caption">'+co['option'][i]['caption']+'</div><div class="op_input">ON<input type="radio" name="'+i+'" value="true"'+sl1+' />OFF<input type="radio" name="'+i+'" value="false"'+sl2+' /><br />';
				}
			break;
			case 'sol':
				if (i == 'def_num_soldier') {
					html += '<div class="op_caption">'+co['option'][i]['caption']+'</div><div class="op_input">';
					html += '<select name="def_num_soldier" size="1">';
					html += (co['option'][i]['value'] == '100') ? '<option value="100" selected="selected">100</option>' : '<option value="100">100</option>';
					html += (co['option'][i]['value'] == '200') ? '<option value="200" selected="selected">200</option>' : '<option value="200">200</option>';
					html += (co['option'][i]['value'] == '300') ? '<option value="300" selected="selected">300</option>' : '<option value="300">300</option>';
					html += (co['option'][i]['value'] == '500') ? '<option value="500" selected="selected">500</option>' : '<option value="500">500</option>';
					html += (co['option'][i]['value'] == '1000') ? '<option value="1000" selected="selected">1000</option>' : '<option value="1000">1000</option>';
					html += '</select></div>';
				} else if (i == 'def_kind_soldier') {
					var sol_list = {
						s1: '足軽',
						s2: '長槍足軽',
						s3: '武士',
						b1: '弓足軽',
						b2: '長弓兵',
						b3: '弓騎馬',
						h1: '騎馬兵',
						h2: '精鋭騎馬',
						h3: '赤備え',
						g1: '鉄砲足軽',
						g2: '鉄砲騎馬',
						w1: '破城鎚',
						w2: '攻城櫓',
						w3: '大筒兵'
					};
					// {"s1":false,"s2":true,"s3":false,"b1":false,"b2":true,"b3":false,"h1":false,"h2":true,"h3":false,"g1":true,"g2":false,"w1":false,"w2":true,"w3":false}
					html += '<div class="op_caption">'+co['option'][i]['caption']+'<br />&nbsp;<br />&nbsp;<br />&nbsp;<br />&nbsp;</div><div class="op_input">';
					var s = co['option']['def_kind_soldier']['value'];
					for (var k in sol_list)  {
						if (k == 's1' || k == 'b1' || k == 'h1' || k == 'g1' || k == 'w1') {
							html += '<div>';
						}
						for (var j in s) {
							if (k == j) {
								if (s[j] == 'true') {
									html += sol_list[k]+'<input type="checkbox" name="def_kind_soldier" value="'+j+'" checked="checked" />';
								} else {
									html += sol_list[k]+'<input type="checkbox" name="def_kind_soldier" value="'+j+'" />';
								}
								if (j == 's3' || j == 'b3' || j == 'h3' || j == 'g2') {
									html += '<br />';
								}
							}
						}
						if (k == 's3' || k == 'b3' || k == 'h3' || k == 'g2' || k == 'w3') {
							html += '</div>';
						}
					}
					html += '</div>';
				} else {
					switch(co['option'][i]['value'].toString()){
						case 'true':
							sl1 = ' checked="checked"';
						break;
						case 'false':
							sl2 = ' checked="checked"';
						break;
					}
					html += '<div class="op_caption">'+co['option'][i]['caption']+'</div><div class="op_input">ON<input type="radio" name="'+i+'" value="true"'+sl1+' />OFF<input type="radio" name="'+i+'" value="false"'+sl2+' /><br />';
				}
			break;
			default:
				if(flag != co['option'][i]['tag']){
					flag = co['option'][i]['tag'];
					if(flag != 'all') {
						html += '<hr />';
					}
				}
				switch(co['option'][i]['value'].toString()){
					case 'true':
						sl1 = ' checked="checked"';
					break;
					case 'false':
						sl2 = ' checked="checked"';
					break;
				}
				html += '<div class="op_caption">'+co['option'][i]['caption']+'</div><div class="op_input">ON<input type="radio" name="'+i+'" value="true"'+sl1+' />OFF<input type="radio" name="'+i+'" value="false"'+sl2+' /><br />';
			break;
		}
		html += '</div>';
	}
	html += '</form>';
	var div = document.getElementById('form');
	div.innerHTML = html;
	document.body.innerHTML += '<hr /><div id="foot"><a class="fancy_button" href="#" onclick="init_option()"><span style="background-color: #06f;">設定の初期化</span></a></div>';
	//console.log(html);
	//console.log(div);
}
// 設定の初期化ボタンを押した時
function init_option(){
	chrome.extension.sendRequest({name: "set_init"});
	location.reload();
}
// onload
$(document).ready(function(){
	restore_options();
	// 設定が変わるたびに保存する
	$('form').change(function(e){
		if(e.target && e.target.value){
			if (e.target.name == 'def_kind_soldier') {
				// {"s1":false,"s2":true,"s3":false,"b1":false,"b2":true,"b3":false,"h1":false,"h2":true,"h3":false,"g1":true,"g2":false,"w1":false,"w2":true,"w3":false}
				// チェックの有無を確認後co['option']['def_kind_soldier']['value']の項目を変更
				// e.target.value; e.target.checked;
				var s = co.option.def_kind_soldier.value;
				var n = {};
				for (var i in s) {
					if (e.target.value == i) {
						if (e.target.checked == true) {
							n[i] = "true";
						} else {
							n[i] = "false";
						}
					} else {
						n[i] = s[i];
					}
				}
				co.setOption("def_kind_soldier", n);
			} else {
				co.setOption(e.target.name, e.target.value);
			}
			chrome.extension.sendRequest({name: "set_end"});
		}
	}).trigger("change");
});
//console.log(co);
