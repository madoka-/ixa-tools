// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
	if (tab.url.match(/http\:\/\/.+\.sengokuixa\.jp\/.*/) || tab.url.match(/http\:\/\/sengokuixa\.jp\/?/)) {
		// pageActionの開始
		chrome.pageAction.show(tabId);
	}
}
// optionsからメッセージを受け取る
function chenge_option(){
	var state;
}
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
