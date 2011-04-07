// 合戦報告書のリンク等

$('div.common_box3bottom > table').find('strong').find('a:eq(0)').each(function() {
var $this = $(this);
var name = $this.parent().text();
$this.after('&nbsp;<span><a href="/war/list.php?m=&s=1&name=lord&word='+name+'&coord=map&x=&y=">[合戦報告書]</a> <a href="/war/war_ranking.php?m=&c=&find_rank=&find_name='+name+'">[格付]</a></span>');
});
$('div.common_box3bottom > table').find('div.pro4').find('a:eq(0)').each(function() {
var $this = $(this);
var name = $this.parent().text();
$this.after('&nbsp;<span><a href="/war/list.php?m=&s=1&name=alliance&word='+name+'&coord=map&x=&y=">[合戦報告書]</a></span>');
});
