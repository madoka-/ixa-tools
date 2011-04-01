// content scripts / common.js
// 毎回読み込むスクリプトなので最小限にとどめる
//

// onload
$(document).ready(function(){
	// コンテキストのHTMLやCSSを操作
	// body{font-size:12px;margin:0;padding:0;line-height:1.5;font-family:"ＭＳ Ｐ明朝","細明朝体","ヒラギノ明朝 Pro W3";} textarea,input,select a p
	$('body, p, a, textarea, input, select').css('font-family', 'Meiryo, "メイリオ", "Hiragino Kaku Gothic Pro", "MS PGothic", "ＭＳ Ｐゴシック", "Osaka", helvetica, sans-serif');
});
