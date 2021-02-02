/********** items **********/
var tourNow = 0, itemSize = 6; 
var tours = [], itemArr = [];
var tourLast;
var tourLeft;
var tourTar = 0;
var root = $(".item-wrap");
var tours = $(".items", root);

$.get("../json/items.json", onitemsLoad);

function onToursLoad(r) {
	tourLast = r.tours.length - 1;
	tourBars();
	var html = '';
	for (var i in r.items) {
		html  = '<li class="items">';
		html += '<div class="item-img">';
		html += '<img src="' + r.items[i].src + '" alt="" class="img">';
		html += '<div class="item-name">' + r.items[i].name + '</div>';
		html += '</div>';
		html += '</li>';
		tours.push($(html).appendTo(".item-slide-wrap", root));
	}
	tourInit();
}

function tourBars() {
	for (var i = 0; i <= tourLast; i++) {
		$('<span class="bar"></span>').appendTo(".tour-slide-bar", root)
	}
}

$(".bt-prev", root).click(onPrev);
$(".bt-next", root).click(onNext);


function tourInit() {
	var trans = tourNow%2;
	$(".tour-slide-wrap", root).css("left", "-20%");
	$(".tours", root).remove();
	tourArr = [];
	tourArr[1] = tourNow;
	tourArr[0] = (tourNow == 0) ? tourLast : tourNow - 1;
	for (var i = 2; i < tourSize; i++) {
		tourArr[i] = (tourArr[i - 1] == tourLast) ? 0 : tourArr[i - 1] + 1;
	} 
	for (var i in tourArr) {
		$(tours[tourArr[i]]).clone().appendTo(".tour-slide-wrap", root);
	}
	$(".tours").each(function(){
		if($(this).index()%2) $(this).css("transform", "translateY(50px)");
		else $(this).css("transform", "none");
	});
	$(".tour-slide-bar .bar", root).removeClass("active");
	$(".tour-slide-bar .bar", root).eq(tourNow).addClass("active");
}

function onPrev() {
	tourNow = (tourNow == 0) ? tourLast : tourNow - 1;
	tourTar = 0;
	tourAni();
}

function onNext() {
	tourNow = (tourNow == tourLast) ? 0 : tourNow + 1;
	tourTar = "-40%";
	tourAni();
}

console.log($(".tour-slide-bar .bar", root).click("hi"));
$(".tour-slide-bar .bar", root).click(onTourBarClick);
function onTourBarClick() {
	$(".tour-slide-bar .bar", root).removeClass("active");
	$(".tour-slide-bar .bar", root).eq(0).addClass("active");
	var tourTar = [];
	var old = tourNow;
	tourNow = $(this).index();
	tourTar = (tourNow > old) ? "-40%" : 0;
	$(".tour-slide-wrap", root).stop().animate({"left": tourTar}, 500, tourInit);
	tourAni();
}

function tourAni() {
	$(".tours").each(function(){
		if($(this).css("transform") == "none") {
			$(this).css("transform", "translateY(50px)")
		}
		else {
			$(this).css("transform", "none");
		}
	});
	$(".tour-slide-wrap", root).stop().animate({"left": tourTar}, 500, tourInit);
}


/********** 이벤트 등록 **********/
$(window).resize(onResize).trigger("resize");
$(window).scroll(onScroll).trigger("scroll");