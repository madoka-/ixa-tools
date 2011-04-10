// background page / contextmenu.js
// ポップアップメニューの生成と制御

// Create one test item for each context type.
var contexts = ['ここを地図の中心に', '全編成', '全部隊', '待機兵'];
var permission = ['image', 'all', 'all', 'all'];
var documentUrlPatterns = ['http://*.sengokuixa.jp/map.php*', 'http://*.sengokuixa.jp/*', 'http://*.sengokuixa.jp/*', 'http://*.sengokuixa.jp/*'];
for (var i = 0; i < contexts.length; i++) {
	var title = contexts[i];
	var per = [permission[i]];
	var doc = [documentUrlPatterns[i]];
	var id = chrome.contextMenus.create({"title": title, "contexts": per, 'documentUrlPatterns': doc,"onclick": genericOnClick});
	//console.log("'" + title + "' item:" + id);
}

// A generic onclick callback function.
function genericOnClick(info, tab) {
	//console.log("item " + info.menuItemId + " was clicked");
	//console.log("info: " + JSON.stringify(info));
	//console.log("tab: " + JSON.stringify(tab));
	if (info.menuItemId == 2) {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendRequest(tab.id, {name: "move", path: "/facility/set_unit_list.php?show_num=100"});
		});
	} else if (info.menuItemId == 3) {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendRequest(tab.id, {name: "move", path: "/facility/unit_status.php?dmo=all"});
		});
	} else if (info.menuItemId == 4) {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendRequest(tab.id, {name: "move", path: "/facility/unit_list.php"});
		});
	} else if (info.menuItemId == 1) {
		var search = info.linkUrl.split('?');
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendRequest(tab.id, {name: "move", path: "/map.php?" + search[1]});
		});
	}
}
