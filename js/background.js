// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
	if (tab.url.match(/http\:\/\/.+\.sengokuixa\.jp\/.*/) || tab.url.match(/http\:\/\/sengokuixa\.jp\/?/)) {
		// pageActionの開始
		chrome.pageAction.show(tabId);
	}
}
// options要求メッセージを受け取り送り返す
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if (request.option) {
			var res = conf.option[request.option]['value'];
		}
		sendResponse({option: res});
	}
);
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
