const canvas = document.querySelector('#mycanvas');
//canvas.focus();
const context = canvas.getContext('2d');

let pugsize = 80;
let pug_x = 0;
let pug_y = canvas.height - pugsize;
let pug = new Image();
pug.src = 'pugsprite.png';

let wafflesize = 40;
let waffle_x = Math.random() * (canvas.width - wafflesize);
let waffle_y = 0;
let waffle = new Image();
waffle.src = 'wafflesprite.png';

let score = 0;

function handleKeys(event) {
    if (event.keyCode == 37 && pug_x > 0) {
        event.preventDefault();
        pug_x -= 10;
    }
    if (event.keyCode == 39 && pug_x + pugsize < canvas.width) {
        event.preventDefault();
        pug_x += 10;
    }
}

function ImagesTouching(x1, y1, img1size, x2, y2, img2size) {
    if (x1 >= x2 + img2size || x1 + img1size <= x2) return false;
    if (y1 >= y2 + img2size || y1 + img1size <= y2) return false;
    return true;
}

function drawFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'maroon'
    context.font = '20px Arial'
    context.fillText("Score: "+ score, 0, 20)

    waffle_y += 3;
    if (waffle_y > canvas.height) {
        waffle_y = 0
        waffle_x = Math.random() * (canvas.width - wafflesize);
    }
    context.drawImage(waffle, waffle_x, waffle_y, wafflesize, wafflesize);
    context.drawImage(pug, pug_x, pug_y, pugsize, pugsize);

    if (ImagesTouching(pug_x, pug_y, pugsize, waffle_x, waffle_y, wafflesize)) {
        score = score +1;
        waffle_x = -waffle.width
    }
}

setInterval(drawFrame, 25);
addEventListener('keydown', handleKeys);