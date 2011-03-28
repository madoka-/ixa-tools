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

// options class
function options(){
	// 現在の設定を保持するプロパティ
	this.option = {
		inside_attack_view: {tag: 'all', caption: '敵襲ランプを表示', default: 'true', value: null},
		tohankaku: {tag: 'all', caption: 'あらゆる入力欄で全角数字を半角に強制変換', default: 'true', value: null},
		//sidebox_change: {tag: 'all', caption: '合戦向けサイドメニュー表示'},  強制ONにする
		//timeout_countdown: {tag: 'all', caption: 'タイムアウト予想時間カウントダウン'}, 強制ONにする
		pulldown_menu: {tag: 'all', caption: 'メニューのプルダウン化', default: 'false', value: null},
		//いらねえnon_cardview: {tag: 'all', caption: 'サイドメニューのカードを非表示'},
		//chat_mikire: {tag: 'chat', caption: 'チャットの見切れを修正'}, 強制ONにする
		//chat_linkchg: {tag: 'chat', caption: '「チャット履歴」のリンク先修正'},強制ONにする
		toubatsu: {tag: 'deck', caption: '討伐ゲージ時間表示', default: 'true', value: null},
		refillhp: {tag: 'deck', caption: 'HP回復時間表示', default: 'true', value: null},
		pager_ajax: {tag: 'deck', caption: 'ページャーをAjaxに', default: 'true', value: null},
		def_honjou: {tag: 'deck', caption: '拠点選択のデフォを本城に', default: '1', value: null}, // 1平時ON合戦時にOFF 2常にON 3常にOFF
		rank_lock: {tag: 'deck', caption: '特以上のカードの一括削除を非活性化', default: 'true', value: null},
		hikyou:   {tag: 'dungeon', caption: '部隊の自動選択', default: 'true', value: null},
		hikyou_img_hide:   {tag: 'dungeon', caption: '秘境の画像を表示しない', default: 'false', value: null},
		map_reg: {tag: 'map', caption: '座標記録リスト表示', default: 'true', value: null},
		map_rightclick: {tag: 'map', caption: '右クリックで地図移動', default: 'true', value: null},// ajaxではなくリダイレクトにする
		map_squad_status: {tag: 'map', caption: '部隊行動状況を表示', default: 'true', value: null}, // allの方に移動 popupで表示
		map_rightdblclick: {tag: 'map', caption: 'ダブルクリックで対象の合戦報告書を表示', default: 'true', value: null},
		//unit_list_hp: {tag: 'unit', caption: '武将HP表示', default: true, value: null}, デフォON
		//unit_list_hp_bgc: {tag: 'unit', caption: '武将のHPが100でない場合は色づけ', default: true, value: null}, デフォON
		//unit_list_total: {tag: 'unit', caption: '総兵数表示', default: true, value: null}, デフォON
		//unit_list_group: {tag: 'unit', caption: 'グループ機能を使う'}, 強制ONにする
		//unit_list_icon: {tag: 'unit', caption: 'グループ機能使用時にアイコン表示'}, 強制ONにする
		//unit_list_sort_def_grp: {tag: 'unit', caption: '強制グループ単位ソート'}, 強制ONにする
		market_maxsoldier: {tag: 'faci', caption: '市での取引後最大作成兵数表示', default: 'true', value: null},
		market_hide: {tag: 'faci', caption: '市の施設情報を隠す', default: 'false', value: null},
		non_back: {tag: 'faci', caption: '所領の復活ボタンを非表示', default: 'true', value: null}, //適用を村のみ(耐久力2万未満とか)にする
		map_potential: {tag: 'faci', caption: '空地戦力を表示', default: 'true', value: null},
		facility_maxsoldier: {tag: 'sol', caption: '各兵生産施設で最大作成可能兵数リンク設置', default: 'true', value: null},
		def_show_soldier: {tag: 'sol', caption: 'デフォルト以外の兵種を表示', default: 'false', value: null},// デフォルトの兵種以外表示しない
		def_num_soldier: {tag: 'sol', caption: 'デフォルトの訓練数', default: 'true', value: null},
		def_kind_soldier: {tag: 'sol', caption: 'デフォルトの兵種', default: 'true', value: null}
	};
	// 現在合戦中か
	// 毎回確認してもいいかも
	this.war = 'false';
	// 自領のvillage_id及び名前を保管するオブジェクト
	// 鯖別に保存する
	this.vid = {};
	// メソッドの定義
	this.setOption = function(name, value){
		this['option'][name]['value'] = value;
	}
	// 設定値の読み込み
	if(localStorage.options){
		this.option = JSON.parse(localStorage.options);
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
