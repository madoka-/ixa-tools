// タイムアウトや敵襲の通知

// time out
if (localStorage.tools_starttime !== null) {
	if ((getUnixTime() - parseInt(localStorage.tools_sendtime)) > (10 * 60)) {
		var totime = (parseInt(localStorage.tools_starttime) +3 * 60 * 60);
		var sec = totime - getUnixTime();
		if (sec < 0) sec = 0;
		chrome.extension.sendRequest({name: "limit", time: sec});
		localStorage.tools_sendtime = getUnixTime();
	}
}
