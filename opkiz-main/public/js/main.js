/******* 메인화면 *******/
$(".main-wrap").find("h1 > div").mouseenter(function(e){
	e.stopPropagation();
	$(".main-wrap").find("h1").removeClass("active").addClass("default");
	$(this).parent().addClass("active").removeClass("default");
});

$(".main-title").mouseleave(function(){
	$(".main-wrap").find("h1").removeClass("active default");
});

$(".navi-wrap").find(".goabout").click(function() {
	var scrollPosition = $($(this).attr("data-target")).offset().top;
  $("body").animate({
        scrollTop: scrollPosition
  }, 500);
});

/******* 스크롤반응 *******/
/* function onScroll() {
	this.scTop = $(this).scrollTop(); 
	var aboutStart = $(".about").offset().top;
	var aboutHei = $(".about").innerHeight();
	var aboutEnd = aboutStart + aboutHei ;
	if(scTop < aboutStart) {
		$(".navi-wrap").find(".logobl").css({"display": "block"});
		$(".navi-wrap").find(".logobe").css({"display": "none"});
		$(".navi-wrap").find("a").css("color", "#575757");
	}
	else {
		$(".navi-wrap").find(".logobl").css({"display": "none"});
		$(".navi-wrap").find(".logobe").css({"display": "block"});
		$(".navi-wrap").find("a").css("color", "#f8f8f8");
	}
	if(scTop > aboutEnd) {
		$(".navi-wrap").find(".logobl").css({"display": "block"});
		$(".navi-wrap").find(".logobe").css({"display": "none"});
		$(".navi-wrap").find("a").css("color", "#575757");
	}
}
 */
/* var copyLink = function(str) {
    if( is_ie() ) {
        window.clipboardData.setData("Text", str);
        alert("복사되었습니다.");
        return;
    }
    prompt("Ctrl+C를 눌러 복사하세요.", str);
};

$(window).scroll(onScroll).trigger("scroll");
$(".main-title").find(".am").click(goAboutme); */

/******* 페이지이동*******/
$(".main").find("h1:nth-child(2)").click(function() {
	location.href = "about.html";
});
$(".main").find("h1:nth-child(3)").click(function() {
	location.href = "front.html";
});
/* $(".main").find("h1:nth-child(4)").click(function() {
	location.href = "back.html";
}); */

