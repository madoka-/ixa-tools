// background page / bg_notify.js
// content scriptから受け取ったメッセージを元にDesktop Notificationを作成する

// 受け取ったメッセージごとの処理
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if (request.name == 'limit'){
			// タイムアウト時間の予想と通知
			//console.log(request);
			var limit = parseInt(request.time);
			localStorage.tools_limittime = limit;
			var time = new Date();
			if ((limit - time.getTime()) < (30 * 60)) {
				var limit_unixtime = time.getTime() + limit;
				var a = new Date(limit_unixtime);
				$.jwNotify({
					image : chrome.extension.getURL('images/favicon128.png'),
					title: 'タイムアウト予想時間',
					body: a.toLocaleString(),
					timeout: 20000
				});
			}
			sendResponse({});
		}
	}
);
