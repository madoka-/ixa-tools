// options.htmlに読み込まれる
var bg = chrome.extension.getBackgroundPage();
var co = bg.conf;
// backgroundのDOMを読み込んで現在の設定を確認後、htmlを生成する
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
				if(i == 'def_num_soldier'){
					html += '';
				} else if(i == 'def_kind_soldier') {
					html += '';
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
	$("form").change(function(event){
		if(event.srcElement){
			co.setOption(event.srcElement.name, event.srcElement.value);
			chrome.extension.sendRequest({name: "set_end"});
		}
		//console.log(event);
	}).trigger("change");
});
//console.log(co.option);
