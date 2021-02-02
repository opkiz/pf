/******* 그래프바 *******/
$(".design-wrap .photoshop-wrap .graph").css({"width": "95%", "transition": "all 1.5s"});
$(".design-wrap .illustrator-wrap .graph").css({"width": "90%", "transition": "all 1.5s"});
$(".design-wrap .premiere-wrap .graph").css({"width": "80%", "transition": "all 1.5s"});
setTimeout(function(){
  $(".publishing-wrap .html-wrap .graph").css({"width": "95%", "transition": "all 1.5s"});
  $(".publishing-wrap .css-wrap .graph").css({"width": "95%", "transition": "all 1.5s"});
  $(".publishing-wrap .javascript-wrap .graph").css({"width": "75%", "transition": "all 1.5s"});
  $(".publishing-wrap .jquery-wrap .graph").css({"width": "85%", "transition": "all 1.5s"});
}, 700, setTimeout(function(){
  $(".development-wrap .node-wrap .graph").css({"width": "30%", "transition": "all 1.5s"});
  $(".development-wrap .vue-wrap .graph").css({"width": "50%", "transition": "all 1.5s"});
  $(".development-wrap .github-wrap .graph").css({"width": "85%", "transition": "all 1.5s"});
}, 1400));

$(".skill-wrapper .box").hover(function(){
  $(this).css({"transform": "scale(1.1)", "transition": "all 0.5s"});
}, function(){
  $(this).css({"transform": "scale(1)", "transition": "all 0.5s"});
});

$(".contact-wrapper > div").hover(function(){
  $(this).find("img").css({"transform": "scale(1.1) rotate(-15deg)", "transition": "all 0.5s"})
  $(this).find("p").css({"color": "#d7cbff", "transition": "all 0.5s", "text-shadow": "2px 2px 3px #7a69b3b7"});
}, function(){
  $(this).find("img").css({"transform": "scale(1) rotate(0)", "transition": "all 0.5s"})
  $(this).find("p").css({"color": "#fde7e9", "transition": "all 0.5s", "text-shadow": "none"});
});
