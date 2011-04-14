// タイムアウトや敵襲の通知

// time out
if (localStorage.tools_starttime !== null) {
	if (location.hostname != 'world.sengokuixa.jp' && location.pathname != '') {
		if ((getUnixTime() - parseInt(localStorage.tools_sendtime)) > (10 * 60) || !localStorage.tools_sendtime) {
			var totime = (parseInt(localStorage.tools_starttime) +3 * 60 * 60);
			chrome.extension.sendRequest({name: "limit", time: totime});
			localStorage.tools_sendtime = getUnixTime();
		}
	}
}
