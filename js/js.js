$(function () {

	setTimeout(function () {
		$('.loading').hide()

	}, 1000)
	$(window).resize(() => {
		init();
	})
	$(window).bind('orientationchange', function (e) { //用户变化屏幕方向时调用
		orient();
		init();
	});
	init();
	fenxiang("安卓video", "Here is a test!", "Here is a test!", '', "https://o.cztvcloud.com/181/5843861/images/fenxiang.jpg")
	//必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
	document.addEventListener("WeixinJSBridgeReady", function () {
		document.getElementById('video1').load()
		var s = false
		document.getElementById('video1').oncanplaythrough = function () {
			if (!s) {
				$('.start,.enter').hide()
				document.getElementById('video1').play();
				s = true
			}

		}
	}, false);
	var s = false
	document.getElementById('video1').oncanplaythrough = function () {
		if (!s) {

			document.getElementById('video1').play();
			s = true
		}

	}
	var playnow = false, first = true
	$('.start,.enter').click(function () {
		$('.start,.enter').hide()
		document.getElementById('video1').play()
		playnow = true
		// checkVideoText(playnow)

	})
	$('.closevideo').click(function () {
		if (playnow) {
			console.log('22')
			playnow = false
			$('.video').attr('src', 'http://cdn.xmountguan.com/wushui_h5/test_gongchengjuan.mp4') //poster="https://lonecry-1251414825.cos.ap-shanghai.myqcloud.com/video/1-min.jpg"
			$('.video').attr('poster', 'https://lonecry-1251414825.cos.ap-shanghai.myqcloud.com/video/originvideo2poster.png')

		} else {
			console.log('33')
			$('.video').attr('src', 'http://cdn.xmountguan.com/wushui_h5/test_zhishuitu.mp4')
			$('.video').attr('poster', 'https://lonecry-1251414825.cos.ap-shanghai.myqcloud.com/video/originvideo1poster.png')
			playnow = true
		}

		document.getElementById('video1').play()
		// playInMid()
		// checkVideoText(playnow)
	})

	//从中间开始播放
	function playInMid() {
		//获取视频DOM元素
		var myVideo = document.getElementById('video1');
		console.log(myVideo);
		//得到视频的总时长
		var played = false
		myVideo.oncanplaythrough = function () {
			if (!played) {
				var duration = myVideo.duration;
				//得到当前的进度
				var currentTime = myVideo.currentTime;
				console.log(duration, currentTime);

				//判断是否暂停中
				if (!myVideo.paused)
					myVideo.pause();
				//从总时长的一半的位置开始播放
				myVideo.currentTime = duration / 2;
				//继续播放视频
				myVideo.play();
				played = true
			}

		}

	}

	function checkVideoText(playnow) {
		if (playnow) {
			$('.closevideo').html('切换视频')
		} else {
			$('.closevideo').html('切换视频')
		}
	}
})

function init() {
	if (IsPC()) {
		var height = window.innerHeight
		var width = height * 414 / 799
		console.log(width, height);
		w = height * 9 / 16 * 0.9;
		h = 666;
		// w = width;
		// h = height;
		var pcw = 750 * (w / 750); //rem
		var pch = 1334 * (w / 750); //
		$("html").css({
			'width'     : w,
			'margin'    : "0 auto",
			'marginTop' : '0',
			"height"    : "90vh",
			"background": "#fff",
			"marginTop" : "5vh", // "border"    : '1px solid grey',
			"boxShadow" : "0 0 16px 1px #00000057"
		});
		$('.main').css({
			'top': '1rem'
		})
		$("html").css({
			fontSize: w / 750 * 100 + "px"
		});
		var beishu = w / 414 * 62.5 / 48.3;
		$("html").css({
			minHeight: h
		});
	}
}

function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

var myVideo = document.getElementById('video1');
myVideo.addEventListener('play', function () {
	$('video').attr('x5-video-player-fullscreen', true)
	$('video').attr('x5-video-player-type', 'h5')
	$('video').attr('controls', false)
	$('.start,.enter').hide()

})
myVideo.addEventListener('pause', function () {
	init();
	// myVideo.play()
})
myVideo.addEventListener("x5videoenterfullscreen", function () {

	init();
	myVideo.play()

})

function playInMid2() {
	//获取视频DOM元素
	var myVideo = document.getElementById('video1');
	console.log(myVideo);
	//得到视频的总时长
	var played = false
	myVideo.oncanplaythrough = function () {
		if (!played) {
			var duration = myVideo.duration;
			//得到当前的进度
			var currentTime = myVideo.currentTime;
			console.log(duration, currentTime);

			//判断是否暂停中
			if (!myVideo.paused)
				myVideo.pause();
			//从总时长的一半的位置开始播放
			myVideo.currentTime = myVideo.currentTime;
			//继续播放视频
			myVideo.play();
			played = true
		}

	}

}

function orient() {
	if (window.orientation == 0 || window.orientation == 180) {//竖屏;//ipad、iphone竖屏；Andriod横屏
		playInMid2()
		console.log('竖屏模式')
		$('video').attr('x5-video-player-fullscreen', true)
		$('video').attr('x5-video-player-type', 'h5')
		myVideo.play()
		return false;
	} else if (window.orientation == 90 || window.orientation == -90) {//横屏;//ipad、iphone横屏；Andriod竖屏
		//从中间开始播放
		playInMid2()


		console.log('横屏模式')
		$('video').attr('x5-video-player-fullscreen', true)
		$('video').attr('x5-video-player-type', 'h5')
		myVideo.play()
		return false;
	} else {
		$(".loading").fadeOut();
	}
}

function isAndroid() {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
	return isAndroid
}
