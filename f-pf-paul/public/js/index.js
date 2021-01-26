
var KAKAO_KEY = 'fd1a148a4042d63f1da1845465af3d1f';

/******************* 슬라이드 직접 코딩 ********************/
var mainNow = 0;
var mainSlide = $(".main-wrap > .banner");
var mainLast = mainSlide.length - 1;
var mainTitles = [
	"Paul's Autumn with Milk Tea",
	"Ice Flakes",
	"Spanish cream coldbrew"
];
var mainWriters = ["청명한 가을 날씨에 잘 어울리는 밀크티 음료","폴 바셋이 선보이는 시원한 여름 디저트 빙수 3종","깔끔한 콜드브루에 부드럽고 달콤한 연유 크림을 얹은 커피"];

mainInit(); 

function mainInit() {
	$(".main-wrap > .banner").remove();
	$(mainSlide[mainNow]).appendTo(".main-wrap");
	$(".main-wrap").find(".slogan").html(mainTitles[mainNow]);
	$(".main-wrap").find(".writer").html(mainWriters[mainNow]);
}

function mainAni() {
	var slide = $(mainSlide[mainNow]).appendTo(".main-wrap").css({"transform": "scale(1.3)", "opacity": 0});
	setTimeout(function() {
		slide.css({"transform": "scale(1)", "opacity": 1});
	}, 0);
	setTimeout(mainInit, 500);
	$(".main-wrap").find(".slogan").css({"transform": "scale(0.8)", "opacity": 0});
	$(".main-wrap").find(".writer").css({"transform": "translateY(50px)", "opacity": 0});
	setTimeout(function(){
	$(".main-wrap").find(".slogan").html(mainTitles[mainNow]);
	$(".main-wrap").find(".writer > span").html(mainWriters[mainNow]);
	$(".main-wrap").find(".slogan").css({"transform": "scale(1)", "opacity": 1});
	$(".main-wrap").find(".writer").css({"transform": "translate(0)", "opacity": 1});
	},1000);

}

function onMainPrev() {
	mainNow = (mainNow == 0) ? mainLast : mainNow - 1;
	mainAni();
}

function onMainNext() {
	mainNow = (mainNow == mainLast) ? 0 : mainNow + 1;  
	mainAni();
}


$(".main-wrap > .bt-prev").click(onMainPrev);
$(".main-wrap > .bt-next").click(onMainNext);


/******************* 슬라이드 직접 코딩2 ********************/
var prdNow = 0,  prdSize = 6, prdLast, prdLeft, prdTar;
var prds = [], prdArr = [];
$(".prd-wrapper > .bt-left").click(onPrdLeft);
$(".prd-wrapper > .bt-right").click(onPrdRight);

$.get("../json/prds.json", onPrdLoad);
function onPrdLoad(r) {
	prdLast = r.prds.length - 1;
	var html = '';
	for(var i in r.prds) {
		html  = '<li class="prd">';
		html += '	<div class="prd-img"><img src="'+r.prds[i].src+'" class="img"></div>';
		html += '	<div class="prd-title">'+r.prds[i].title+'</div>';
		html += '</li>';
		prds.push($(html));		
	}
	prdInit();
}

function prdInit() {
	prdArr = [];
	prdArr[1] = prdNow;
	prdArr[0] = (prdNow == 0) ? prdLast : prdNow - 1;
	for(var i=2; i<prdSize; i++) prdArr[i] = (prdArr[i-1] == prdLast) ? 0 : prdArr[i-1] + 1;
	for(var i=0; i<prdArr.length; i++) $(prds[prdArr[i]]).clone().appendTo(".prd-wrap");
}

function onPrdLeft() {
	prdTar = 0;
	prdNow = (prdNow == 0) ? prdLast : prdNow - 1;
	prdAni();
}

function onPrdRight() {
	prdTar = prdLeft * 2 + "%";
	prdNow = (prdNow == prdLast) ? 0 : prdNow + 1;
	prdAni();
}

function prdAni() {
	$(".prd-wrap").stop().animate({"left": prdTar}, 500, function(){
		$(this).empty().css({"left": prdLeft+"%"});
		prdInit();
	});
}


/******************* loc 동적 생성 ********************/
$.get("../json/location.json", onLocationLoad);
function onLocationLoad(r){
	var html = '';
	for(i in r.locs){
		html = '<li class="store">';
		html += '<div class="photo"><img src="'+r.locs[i].src+'" class="img"></div>';
		html += '<p class="cont">'+r.locs[i].cont+'</p>';
		html += '<div class="addr">';
		html += '<i class="fa fa-map-marker-alt"></i>';
		html += '<span> Address <br> </span>';
		html += '<span class="rc">'+r.locs[i].adress+'</span>';
		html += '</div>';
		html +='<div class="time">';
		html += '<i class="fa fa-clock"></i>';
		html += '<span> Open <br> </span>';
		html += '<span class="rc">'+r.locs[i].time+'<br></span>';
		html += '<span class="rc">'+r.locs[i].time2+'<br></span>';
		html += '<span class="rc">'+r.locs[i].time3+'<br></span>';
		html += '</div>';
		html += '<div class="number">';
		html += '<i class="fa fa-phone"></i>';
		html += '<span> Phone <br> </span>';
		html += '<span class="rc">'+r.locs[i].tel+'</span>';
		html += '</div>';
		html += '<button class="bt-map bt-yellow" data-lat="'+r.locs[i].lat+'" data-lon="'+r.locs[i].lon+'">See on Map</button>';
		html += '</li>';
	$(".store-wrap").append(html);
	}
	$(".store-wrap").find(".bt-map").click(onMapOpen);
	$(".modal-map").find(".bt-close").click(onMapClose);
	$(".modal-map").click(onMapClose);
	$(".modal-map .modal-wrap").click(onModalWrap).on("mousewheel", onModalWheel);
	$(".modal-map").on("mousewheel", onModalWheel);
	$(".modal-map").on("DOMMmouseScroll", onModalWheel);
}

function onModalWheel(e) {
	e.stopPropagation();
	e.preventDefault();
}

function onModalWrap(e) {
	e.stopPropagation();
}

function onMapOpen() {
	$(".modal-map").css({"display": "flex", "opacity": 0}).stop().animate({"opacity":1},500);
	var lat = $(this).data("lat")
	var lon = $(this).data("lon")
	var container = document.getElementById('map');
	var options = { center: new kakao.maps.LatLng(lat, lon), level: 2};
	var map = new kakao.maps.Map(container, options);
	var markerPosition  = new kakao.maps.LatLng(lat, lon); 
	var marker = new kakao.maps.Marker({position: markerPosition});
	marker.setMap(map);
}

function onMapClose() {
$(".modal-map").stop().animate({"opacity": 0},500, function(){
$(this).css("display", "none")
});
}

/******************* menu 동적 생성 ********************/
$.get("../json/menus.json", onMenuLoad);
function onMenuLoad(r) {
	var html = '';
	for(var i in r.menus){
 html = '<li class="menu clear">';
 html += '<div class="menu-img"><img src="'+r.menus[i].src+'" alt="photo" class="img"></div>';
 html += '<h3 class="menu-title rc">'+r.menus[i].title+'</h3>';
 html += '</li>';
 $(".menus").append(html);
	}
}

/******************* News 동적생성 ********************/
var newsNow = 0,  newsSize = 5, newsLast, newsLeft, newsTar;
var newss = [], newsArr = [];
$(".news-wrapper > .bt-left").click(onNewsLeft);
$(".news-wrapper > .bt-right").click(onNewsRight);

$.get("../json/news.json", onnewsLoad);
function onnewsLoad(r) {
	console.log(r.news);
	newsLast = r.news.length - 1;
	var html = '';
	for(var i in r.news) {
		html  = '<li class="news">';
		html += '<div class="news-img">';
		html += '<img src="'+r.news[i].src+'" class="img">';
		html += '<div class="badge-tag">';
		for(var j in r.news[i].badge) {
			html += '<div class="badge">'+r.news[i].badge[j]+'</div>';
		}
		html += '</div>';
		html += '<div class="badge-date">';
		html += '<div class="month">'+moment(r.news[i].date).format('MMM')+'</div>';
		html += '<div class="day">'+moment(r.news[i].date).format('DD')+'</div>';
		html += '</div>';
		html += '</div>';
		html += '<div class="news-title">'+r.news[i].title+'</div>';
		html += '<div class="news-tag">';
		for(var j in r.news[i].tag) {
			html += '<span class="tag">'+r.news[i].tag[j]+'</span>';
		}
		html += '</div>';
		html += '<div class="news-cont">'+r.news[i].cont+'</div>';
		html += '<button class="bt-ghost bt-more">Read more <span>▶</span></button>';
		html += '</li>';
		newss.push($(html));		
	}
	newsInit();
}

function newsInit() {
	newsArr = [];
	newsArr[1] = newsNow;
	newsArr[0] = (newsNow == 0) ? newsLast : newsNow - 1;
	for(var i=2; i<newsSize; i++) newsArr[i] = (newsArr[i-1] == newsLast) ? 0 : newsArr[i-1] + 1;
	for(var i=0; i<newsArr.length; i++) $(newss[newsArr[i]]).clone().appendTo(".news-wrap");
}

function onNewsLeft() {
	newsTar = 0;
	newsNow = (newsNow == 0) ? newsLast : newsNow - 1;
	newsAni();
}

function onNewsRight() {
	newsTar = newsLeft * 2 + "%";
	newsNow = (newsNow == newsLast) ? 0 : newsNow + 1;
	newsAni();
}

function newsAni() {
	$(".news-wrap").stop().animate({"left": newsTar}, 500, function(){
		$(this).empty().css({"left": newsLeft+"%"});
		newsInit();
	});
}



/******************* 이벤트 함수 ********************/
function onResize() {
	this.wid = $(this).innerWidth();
	this.hei = $(this).innerHeight();

	if(wid > 991) {
		onNaviHide();
		prdLeft = -25;
		newsLeft = -33.3333;
		}	
	else if(wid > 767) {
		prdLeft = -33.3333;
		newsLeft = -50;
		}	
	else if(wid > 479) {
		prdLeft = -50;
		newsLeft = -100;
		}	
	else if(wid <= 479) {
		prdLeft = -100;
		newsLeft = -100;
		}	
	$(".prd-wrap").css("left", prdLeft+"%");
	$(".news-wrap").css("left", newsLeft+"%");
}

function onScroll() {

	// header 위치
	this.scTop = $(this).scrollTop();
	if(scTop > hei) {
		$(".header").css({"top": 0, "bottom": "auto", "position": "fixed"});
	}
	else {
		$(".header").css({"top": "auto", "bottom": 0, "position": "absolute"});
	}

	// .page의 현재 페이지 찾기 - 원하는 페이지 찾아주는 알고리즘
	for(var i = $(".page").length - 1; i>=0; i--) {
		var nowPage = -10;
		if($(".page").eq(i).offset().top <= scTop) {
			nowPage = i;
			break;
		} 
	}
	$(".navi-mo").find(".navi").css("color", "#333");
	$(".navi-mo").find(".navi").eq(nowPage).css("color", "#e0004d");
	

	// .loc-wrap의 background-position-y 변화
	var locStart = $(".loc-wrap").offset().top;
	var locHei = $(".loc-wrap").innerHeight();
	var locEnd = locStart + locHei + hei;
	var locGap = 0;
	var locspeed = 400;
	if(scTop + hei > locStart && scTop + hei < locEnd) {
		locGap = (locspeed/2) - Math.round((scTop + hei - locStart) / (locEnd - locStart) * locspeed);
		$(".loc-wrap").css("background-position-y", locGap + "%");
	}

	// .press-wrap의 background-position-y 변화
	var pressStart = $(".press-wrap").offset().top;
	var pressHei = $(".press-wrap").innerHeight();
	var pressEnd = pressStart + pressHei + hei;
	var pressGap = 0;
	var pressspeed = 200;
	if(scTop + hei > pressStart && scTop + hei < pressEnd) {
		pressGap = (pressspeed/2) - Math.round((scTop + hei - pressStart) / (pressEnd - pressStart) * pressspeed);
		$(".press-wrap").css("background-position-y", pressGap + "%");
	}

	//bt-top show/hide
	(scTop > hei) ? $(".bt-top").show() :$("bt-top").hide();

}

function onTop(){
	$("html, body").stop().animate({"scrollTop": 0},500);
}

function onNaviShow() {
	$(".navi-mo").css("display", "block");
	setTimeout(function(){
		$(".header .bt-close").css("opacity", 1);
		$(".navi-mo").css("background-color", "rgba(0, 0, 0, 0.6)");
		$(".navi-mo").find(".navi-wing").css("right", 0);
	}, 0);
}

function onNaviHide() {
	$(".navi-mo").css("background-color", "transparent");
	$(this).stop().animate({"opacity": 0}, 500, function(){
		$(".navi-mo").find(".navi-wing").css("right", "-320px");
		setTimeout(function(){
			$(".navi-mo").css("display", "none");
		}, 500);
	});
}

function onNaviClick() {
	var tar = $(".page").eq($(this).index()).offset().top + 1;
	$("html, body").stop().animate({"scrollTop": tar},500);
}

function onLogoClick() {
	$("html, body").stop().animate({"scrollTop": 0},500);
}

/******************* 이벤트 설정 ********************/
$(window).resize(onResize).trigger("resize");
$(window).scroll(onScroll).trigger("scroll");
$(".bt-top").click(onTop);
$(".header .navi-bars").click(onNaviShow);
$(".header .bt-close").click(onNaviHide);
$(".header > .navi").click(onNaviClick);
$(".header > .navi-mo .navi").click(onNaviClick);
$(".header > .logo").click(onLogoClick);


