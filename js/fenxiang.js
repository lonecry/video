var ua = { //3
	android       : false,
	android2      : false,
	iphone        : false,
	ipad          : false,
	pc            : false,
	wechat        : false,
	chinabluenews : false
};
(function(){
	var ua_str = window.navigator.userAgent.toLowerCase();
	if(/micromessenger/.test(ua_str)){
		ua.wechat = true;
		ua.chinabluenews = false;
	}
})();

function fenxiang(a,b,c,d,e){
	if(ua.wechat){
		function getNewsLink(){
			var link = location.search;
			link = link.substr(1);
			var link_arr = link.split('&');
			var link_arr_length = link_arr.length;
			var link_flag = false;
			for(var i = 0 ; i < link_arr_length ; i++){
				if(link_arr[i].split("=")[0] == "play"){
					link_flag = true;
				}
			}
			var url = location.href;
			if(!link_flag){
				return url + (url.indexOf('?') < 0 ? '?' : '&') + 'play=1';
			} else {
				return url;
			}
		}

		$.getJSON('http://socket.gstarcz.com/warmback2019/test.aspx?callback=?',{
			url : location.href.split('#')[0]
		},function(msg){
			console.log(msg);
			if(msg.success){
				wx.config({
					debug     : false,
					appId     : msg.appId,
					timestamp : msg.timestamp,
					nonceStr  : msg.nonceStr,
					signature : msg.signature,
					jsApiList : [
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						// 'startRecord',
						// 'stopRecord',
						// 'onVoiceRecordEnd',
						// 'playVoice',
						// 'stopVoice',
						// 'onVoicePlayEnd',
						// 'uploadVoice',
						// 'downloadVoice',
					]
				});
			}
			wx.ready(function(){
				console.log('ready')
				var news_title = a;
				var news_link = d;
				var news_image = e;
				var news_intro = b;
				var news_Timeline = c;
				wx.onMenuShareTimeline({
					title  : news_Timeline,
					link   : news_link,
					imgUrl : news_image
				});
				wx.onMenuShareAppMessage({
					title  : news_title,
					desc   : news_intro,
					link   : news_link,
					imgUrl : news_image
				});
				wx.onMenuShareQQ({
					title  : news_title,
					desc   : news_intro,
					link   : news_link,
					imgUrl : news_image
				});
				if(!window.wxIsReady){
					window.wxIsReady = true;
				}
			});
		});
	}
}
