// このファイルはbackguround.htmlから毎回読みこむ物なのでcontent_scriptで済む処理はそちらでやる
// optionsオブジェクトの定義と処理
//	ローカルストレージに保存する全ての値を保持し保守する
//
// 他に作るべきjs
// 関数の定義等
//	ポップアップへの情報の出力
//
//
// これからやること
//
// 複数の鯖で同時にプレイする時に起こりうる不具合への対策

// オプション項目のバージョン
var OPVERSION = "5";
// options class
function options(){
	// 現在の設定を保持するプロパティ
	this.option = {// JSONでやりとりするのでJSON表記 シングルクォートはNG
		// option_name: {tag: "type", caption: "text", default: "defaultvalue", value: "value"}
		version: {tag: "hidden", caption: "オプション項目のバージョン", default: OPVERSION, value: "1"},
		//chat_mikire: {tag: 'chat', caption: 'チャットの見切れを修正'}, 強制ONにする
		//toubatsu: {tag: "deck", caption: "討伐ゲージの残り時間表示", default: "true", value: null},
		//refillhp: {tag: "deck", caption: "HP回復時間表示", default: "true", value: null},
		def_honjou: {tag: "deck", caption: "拠点選択のデフォを本城に", default: "1", value: null}, // 1平時ON合戦時にOFF 2常にON 3常にOFF
		//map_squad_status: {tag: "map", caption: "部隊行動状況を表示", default: "true", value: null},
		//unit_list_hp: {tag: 'unit', caption: '武将HP表示', default: true, value: null}, デフォON
		//unit_list_hp_bgc: {tag: 'unit', caption: '武将のHPが100でない場合は色づけ', default: true, value: null}, デフォON
		//unit_list_total: {tag: 'unit', caption: '総兵数表示', default: true, value: null}, デフォON
		//unit_list_group: {tag: 'unit', caption: 'グループ機能を使う'}, 強制ONにする
		map_potential: {tag: "faci", caption: "空地戦力を表示", default: "true", value: null},
		//facility_maxsoldier: {tag: "sol", caption: "各兵生産施設で最大作成可能兵数リンク設置", default: "true", value: null}, デフォ
		def_kind_soldier: {tag: "sol", caption: "デフォルトの兵種", default: {"s1":"false","s2":"true","s3":"false","b1":"false","b2":"true","b3":"false","h1":"false","h2":"true","h3":"false","g1":"true","g2":"false","w1":"false","w2":"true","w3":"false"}, value: null}
	};
	// 現在合戦中か
	// 毎回確認してもいいかも
	this.war = 'false';
	// 自領のvillage_id及び名前を保管するオブジェクト
	this.vid = {};
	// メソッドの定義
	this.setOption = function(name, value){
		this['option'][name]['value'] = value;
	}
	// 設定値の読み込み
	if(localStorage.options){
		this.option = JSON.parse(localStorage.options);
		if (this['option']['version']['value'] != OPVERSION) {
			localStorage.options = '';
			var op_temp = new Array();
			var k = 0;
			var o = new options();
			var op_current = o.option;
			// オプションのバージョンが変わったら存在する項目だけ保存
			for(var i in op_current){
				if (this['option'][i]) {
					op_temp[k] = i;
					k++;
				}
			}
			op_temp.forEach(function(element){
				op_current[element] = this['option'][element];
			});
			localStorage.options = JSON.stringify(op_current);
		}
	} else {
		// 設定が保存されていない場合はデフォルト値を保存する
		for(var i in this.option){
			this['option'][i]['value'] = this['option'][i]['default'];
		}
		localStorage.options = JSON.stringify(this.option);
	}
}
// オブジェクトconfの作成
var conf = new options();
// 受け取ったメッセージごとの処理
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if (request.name == "set_end"){
			// オプションの保存
			localStorage.options = JSON.stringify(conf.option);
			sendResponse({});
		}else if(request.name == "set_init"){
			// リセット
			localStorage.options = '';
			conf = new options();
			sendResponse({});
		}
	}
);
//console.log(conf);
