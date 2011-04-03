// content scripts / common.js
// 毎回読み込むスクリプトなので最小限にとどめる
//
// todo
//

// onload
$(document).ready(function() {
	// 全角数字→半角数字
	$('INPUT[type="text"]').change(function(e) {
		var $this = $(this);
		$this.val(function () {
			var str = $this.val();
			str = str.replace(/[０-９]/g, function(str){return String.fromCharCode(str.charCodeAt(0)-65248);});
			str = str.replace(/[ー|－](\d+)/g, '-$1');
			return str;
		});
	});
});
