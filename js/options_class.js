// このファイルはbackguround.htmlから毎回読みこむ物なのでcontent_scriptで済む処理はそちらでやる
// optionsオブジェクトの定義と処理
//	ローカルストレージに保存する全ての値を保持し保守する
//
// 他に作るべきjs
// 関数の定義等
//	ポップアップへの情報の出力
//	コンテンツスクリプトやページアクションとの同期
//
// これからやること
// def_num_soldierをselectに
// 複数の鯖で同時にプレイする時に起こりうる不具合への対策
// バージョンアップした場合等、optionの内容が変わった際の対応をする(設定値のverの保管や変更マージ等)

// オプション項目のバージョン
var OPVERSION = "4";
// options class
function options(){
	// 現在の設定を保持するプロパティ
	this.option = {// JSONでやりとりするのでJSON表記 シングルクォートはNG
		// option_name: {tag: "type", caption: "text", default: "defaultvalue", value: "value"}
		version: {tag: "hidden", caption: "オプション項目のバージョン", default: OPVERSION, value: "1"},
		//timeout_countdown: {tag: 'all', caption: 'タイムアウト予想時間カウントダウン'}, 強制ON ポップアップ等に表示
		pulldown_menu: {tag: "all", caption: "メニューのプルダウン化", default: "false", value: null},
		//chat_mikire: {tag: 'chat', caption: 'チャットの見切れを修正'}, 強制ONにする
		//chat_linkchg: {tag: 'chat', caption: '「チャット履歴」のリンク先修正'},強制ONにする
		//toubatsu: {tag: "deck", caption: "討伐ゲージの残り時間表示", default: "true", value: null},
		//refillhp: {tag: "deck", caption: "HP回復時間表示", default: "true", value: null},
		pager_ajax: {tag: "deck", caption: "ページャーをAjaxに", default: "false", value: null},
		def_honjou: {tag: "deck", caption: "拠点選択のデフォを本城に", default: "1", value: null}, // 1平時ON合戦時にOFF 2常にON 3常にOFF
		map_rightclick: {tag: "map", caption: "右クリックで地図移動", default: "true", value: null},// ajaxではなくリダイレクトにする
		map_squad_status: {tag: "map", caption: "部隊行動状況を表示", default: "true", value: null},
		map_rightdblclick: {tag: "map", caption: "ダブルクリックで対象の合戦報告書を表示", default: "true", value: null},
		//unit_list_hp: {tag: 'unit', caption: '武将HP表示', default: true, value: null}, デフォON
		//unit_list_hp_bgc: {tag: 'unit', caption: '武将のHPが100でない場合は色づけ', default: true, value: null}, デフォON
		//unit_list_total: {tag: 'unit', caption: '総兵数表示', default: true, value: null}, デフォON
		//unit_list_group: {tag: 'unit', caption: 'グループ機能を使う'}, 強制ONにする
		//unit_list_icon: {tag: 'unit', caption: 'グループ機能使用時にアイコン表示'}, 強制ONにする
		//unit_list_sort_def_grp: {tag: 'unit', caption: '強制グループ単位ソート'}, 強制ONにする
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
			// オプションのバージョンが変わったら(いまのところは)初期化
			for(var i in this.option){
				this['option'][i]['value'] = this['option'][i]['default'];
			}
			localStorage.options = JSON.stringify(this.option);
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
