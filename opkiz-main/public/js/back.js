let distX;
let distY;
let posX;
let posY;

function dragstart(event) {
    posX = event.pageX;
    posY = event.pageY;
    distX = event.srcElement.offsetLeft - posX;
    distY = event.srcElement.offsetTop - posY;
}

function dragover(evnet) {
    event.stopPropagation();
    event.preventDefault();
}

function drop(event) {
    event.stopPropagation();
    event.preventDefault();
    posX = event.pageX;
    posY = event.pageY;
    console.log(posX, posY, distX, distY);
    $('.circle').css('margin-left', posX + distX + 'px')
        .css('margin-top', posY + distY + 'px');
}