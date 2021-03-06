/********** item-wrap 직접 코딩 **********/
var itemNow = 0, itemSize = 7; 
var items = [], itemArr = [];
var itemLast;
var itemLeft;
var itemTar = 0;
var root = $(".items-wrap");
var items = $(".items", root);

$(".bt-prev", root).click(onPrev);
$(".bt-next", root).click(onNext);


$.get("../json/item.json", onItemsLoad);

function onItemsLoad(r) {
	itemLast = r.items.length - 1;
	itemBars();
	var html = '';
	for (var i in r.items) {
		html  = '<li class="items">';
		html += '<div class="item-img">';
		html += '<img src="' + r.items[i].src + '" alt="item" class="img">';
    html += '<div class="item-desc">';
    html += '<div class="item-name">' + r.items[i].name + '</div>';
    html += '<div class="item-used">' + r.items[i].used + '</div>';
    html += '<div class="item-more">' + r.items[i].mobile + ' 제작기간 ' + r.items[i].howlong + ' 100% 개인작업</div>';
    html += '<div class="item-see"><a href="'+r.items[i].href+'">see more</a></div>';
    html += '</div>'; 
    html += '</div>';
		html += '</li>';
		items.push($(html).appendTo(".item-slide-wrap", root));
	}
	itemInit();
}

function itemBars() {
	for (var i = 0; i <= itemLast; i++) {
		$('<span class="bar"></span>').appendTo(".item-slide-bar", root)
	}
}


function itemInit() {
	var trans = itemNow%2;
	$(".item-slide-wrap", root).css("left", "-20%");
	$(".items", root).remove();
	itemArr = [];
	itemArr[1] = itemNow;
	itemArr[0] = (itemNow == 0) ? itemLast : itemNow - 1;
	for (var i = 2; i < itemSize; i++) {
		itemArr[i] = (itemArr[i - 1] == itemLast) ? 0 : itemArr[i - 1] + 1;
	} 
	for (var i in itemArr) {
		$(items[itemArr[i]]).clone().appendTo(".item-slide-wrap", root);
	}
	$(".items").each(function(){
		if($(this).index()%2) $(this).css("transform", "translateY(50px)");
		else $(this).css("transform", "none");
	});
	$(".item-slide-bar .bar", root).removeClass("active");
	$(".item-slide-bar .bar", root).eq(itemNow).addClass("active");
}

function onPrev() {
	itemNow = (itemNow == 0) ? itemLast : itemNow - 1;
	itemTar = "15%";
	itemAni();
}

function onNext() {
	itemNow = (itemNow == itemLast) ? 0 : itemNow + 1;
	itemTar = "-55%";
	itemAni();
}

console.log($(".item-slide-bar .bar", root).click("hi"));
$(".item-slide-bar .bar", root).click(onitemBarClick);
function onitemBarClick() {
	$(".item-slide-bar .bar", root).removeClass("active");
	$(".item-slide-bar .bar", root).eq(0).addClass("active");
	var itemTar = [];
	var old = itemNow;
	itemNow = $(this).index();
	itemTar = (itemNow > old) ? "-40%" : 0;
	$(".item-slide-wrap", root).stop().animate({"left": itemTar}, 500, itemInit);
	itemAni();
}

function itemAni() {
	$(".items").each(function(){
		if($(this).css("transform") == "none") {
			$(this).css("transform", "translateY(50px)")
		}
		else {
			$(this).css("transform", "none");
		}
	});
	$(".item-slide-wrap", root).stop().animate({"left": itemTar}, 500, itemInit);
}

/********** 이벤트 등록 **********/


/******* 페이지이동*******/
/* $(".items-wrap").find(".item-see").eq(1).click(function() {
	location.href = "https://opkiz-bagel.web.app/html/index.html";
});
$(".items-wrap").find("p:nth-child(2)").click(function() {
	location.href = "https://opkiz-kbp.web.app/html/index.html";
});
$(".items-wrap").find("p:nth-child(3)").click(function() {
	location.href = "https://opkiz-shop.web.app/html/index.html";
});
 */