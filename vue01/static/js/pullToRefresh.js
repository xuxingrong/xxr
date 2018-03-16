/*!
 * pull to refresh v2.0
 *author:wallace
 *2015-7-22
 */
var refresher = {
	info: {
		"pullDownLable": "下拉刷新...",
		"pullingDownLable": "松开刷新...",
		"pullUpLable": "上拉加载更多...",
		"pullingUpLable": "松开加载更多...",
		"loadingLable": "加载中..."
	},
	init: function(parameter) {
		var wrapper = document.getElementById(parameter.id);
		var div = document.createElement("div");
		div.className = "iscroll-scroller";
		wrapper.appendChild(div);
		var scroller = wrapper.querySelector(".iscroll-scroller");
		var list = wrapper.querySelector("#" + parameter.id + " ul");
		scroller.insertBefore(list, scroller.childNodes[0]);
		var pullDown = document.createElement("div");
		pullDown.className = "iscroll-pullDown";
		var loader = document.createElement("div");
		loader.className = "iscroll-loader";
		for (var i = 0; i < 4; i++) {
			var span = document.createElement("span");
			loader.appendChild(span);
		}
		pullDown.appendChild(loader);
		var pullDownLabel = document.createElement("div");
		pullDownLabel.className = "iscroll-pullDownLabel";
		pullDown.appendChild(pullDownLabel);
		scroller.insertBefore(pullDown, scroller.childNodes[0]);
		var pullUp = document.createElement("div");
		pullUp.className = "iscroll-pullUp";
		var loader = document.createElement("div");
		loader.className = "iscroll-loader";
		for (var i = 0; i < 4; i++) {
			var span = document.createElement("span");
			loader.appendChild(span);
		}
		pullUp.appendChild(loader);
		var pullUpLabel = document.createElement("div");
		pullUpLabel.className = "iscroll-pullUpLabel";
		var content = document.createTextNode(refresher.info.pullUpLable);
		pullUpLabel.appendChild(content);
		pullUp.appendChild(pullUpLabel);
		scroller.appendChild(pullUp);
		var pullDownEl = wrapper.querySelector(".iscroll-pullDown");
		var pullDownOffset = pullDownEl.offsetHeight;
		var pullUpEl = wrapper.querySelector(".iscroll-pullUp");
		var pullUpOffset = pullUpEl.offsetHeight;
		this.scrollIt(parameter, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset);
	},
	scrollIt: function(parameter, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset) {
		iScrollYOBJ = new iScroll(parameter.id, {useTransition: true,vScrollbar: false,topOffset: pullDownOffset,onRefresh: function () {refresher.onRelease(pullDownEl,pullUpEl);},onScrollMove: function () {refresher.onScrolling(this,pullDownEl,pullUpEl,pullUpOffset);},onScrollEnd: function () {refresher.onPulling(pullDownEl,parameter.pullDownAction,pullUpEl,parameter.pullUpAction);},});
     console.log('parameter.id');
		pullDownEl.querySelector('.iscroll-pullDownLabel').innerHTML = refresher.info.pullDownLable;
		document.addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, false);
	},
	onScrolling: function(e, pullDownEl, pullUpEl, pullUpOffset) {
		if (e.y > -(pullUpOffset)) {
			pullDownEl.id = '';
			pullDownEl.querySelector('.iscroll-pullDownLabel').innerHTML = refresher.info.pullDownLable;
			e.minScrollY = -pullUpOffset;
		}
		if (e.y > 0) {
			pullDownEl.classList.add("flip");
			pullDownEl.querySelector('.iscroll-pullDownLabel').innerHTML = refresher.info.pullingDownLable;
			e.minScrollY = 0;
		}
		if (e.scrollerH < e.wrapperH && e.y < (e.minScrollY - pullUpOffset) || e.scrollerH > e.wrapperH && e.y < (e.maxScrollY - pullUpOffset)) {
			pullUpEl.style.display = "block";
			pullUpEl.classList.add("flip");
			pullUpEl.querySelector('.iscroll-pullUpLabel').innerHTML = refresher.info.pullingUpLable;
		}
		if (e.scrollerH < e.wrapperH && e.y > (e.minScrollY - pullUpOffset) && pullUpEl.id.match('flip') || e.scrollerH > e.wrapperH && e.y > (e.maxScrollY - pullUpOffset) && pullUpEl.id.match('flip')) {
			pullDownEl.classList.remove("flip");
			pullUpEl.querySelector('.iscroll-pullUpLabel').innerHTML = refresher.info.pullUpLable;
		}
	},
	onRelease: function(pullDownEl, pullUpEl) {
		if (pullDownEl.className.match('iscroll-loading')) {
			pullDownEl.classList.toggle("iscroll-loading");
			pullDownEl.querySelector('.iscroll-pullDownLabel').innerHTML = refresher.info.pullDownLable;
			pullDownEl.querySelector('.iscroll-loader').style.display = "none"
			pullDownEl.style.lineHeight = pullDownEl.offsetHeight + "px";
		}
		if (pullUpEl.className.match('iscroll-loading')) {
			pullUpEl.classList.toggle("iscroll-loading");
			pullUpEl.querySelector('.iscroll-pullUpLabel').innerHTML = refresher.info.pullUpLable;
			pullUpEl.querySelector('.iscroll-loader').style.display = "none"
			pullUpEl.style.lineHeight = pullUpEl.offsetHeight + "px";
		}
	},
	onPulling: function(pullDownEl, pullDownAction, pullUpEl, pullUpAction) {
		if (pullDownEl.className.match('flip') /*&&!pullUpEl.className.match('loading')*/ ) {
			pullDownEl.classList.add("iscroll-loading");
			pullDownEl.classList.remove("flip");
			pullDownEl.querySelector('.iscroll-pullDownLabel').innerHTML = refresher.info.loadingLable;
			pullDownEl.querySelector('.iscroll-loader').style.display = "block"
			pullDownEl.style.lineHeight = "20px";
			if (pullDownAction) pullDownAction();
		}
		if (pullUpEl.className.match('flip') /*&&!pullDownEl.className.match('loading')*/ ) {
			pullUpEl.classList.add("iscroll-loading");
			pullUpEl.classList.remove("flip");
			pullUpEl.querySelector('.iscroll-pullUpLabel').innerHTML = refresher.info.loadingLable;
			pullUpEl.querySelector('.iscroll-loader').style.display = "block"
			pullUpEl.style.lineHeight = "20px";
			if (pullUpAction) pullUpAction();
		}
	}
}