// background page / bg_notify.js
// content scriptから受け取ったメッセージを元にDesktop Notificationを作成する

// 受け取ったメッセージごとの処理
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if (request.name == 'limit'){
			sendResponse({});
			// タイムアウト時間の予想と通知
			var limit = parseInt(limit.time);
			localStorage.tools_limittime = limit;
			if (limit < (30 * 60)) {
				var time = new Date(limit);
				$.jwNotify({
					image : chrome.extension.getURL('images/favicon128.png'),
					title: 'タイムアウト予想時間',
					body: time.toLocalString(),
					timeout: 20000
				});
			}
		}
	}
);
