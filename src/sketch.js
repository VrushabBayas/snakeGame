const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
const box = 20;

let d;
const groundImg = new Image();
groundImg.src = './snakebg.png';

const foodImg = new Image();
foodImg.src = './cherr1.jpeg';


let snake = [];

snake[0] = {
    x: 5 * box,
    y: 5 * box
}

function pickFoodPosition(status) {
    food = {};
    let x, y;
    do {
        x = Math.floor(Math.random() * canvas.width);
        y = Math.floor(Math.random() * canvas.height);
    } while (!(x % 20 === 0 && y % 20 === 0))
    return food = { x: x, y };
}
food = pickFoodPosition();


document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            d = "LEFT"
            // gotHit()
            break;
        case 38:
            d = "UP"
            // gotHit()
            break;
        case 39:
            d = "RIGHT"
            // gotHit()
            break;
        case 40:
            d = "DOWN"
            // gotHit()
            break;
    }
};


function dist(head, food) {

    let X = (food.x - head.x);
    let Y = (food.y - head.y);
    let xPow = Math.pow(X, 2);
    let yPow = Math.pow(Y, 2);
    let res = xPow + yPow;
    let sqrtRes = Math.floor(Math.sqrt(res))

    if (!sqrtRes) {
        return true;
    } else {
        return false
    }

}
function gotHit(head) {

  
    for (var i = 0; i < snake.length; i++) {
        if (dist(head, snake[i])) {
            // if(head.x===snake[i].x && head.y===snake[i].y){
            snake = [];
            snake[0] = {
                x: 5 * box,
                y: 5 * box
            }
            break;


            // }
        }

    }


}
function draw() {
    ctx.drawImage(groundImg, 0, 0);

    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "red" : "white"
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
     
    }
    ctx.drawImage(foodImg, food.x, food.y, foodImg.height = box, foodImg.width = box)

    //old position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //remove the tail
    snake.pop();

    //which direaction

    if (d == "LEFT") {
        snakeX -= box

        if (snakeX == 0) {
            console.log('snakeX: ', snakeX);
            snakeX += canvas.width-20
        }
    } else if (d == "UP") {
        snakeY -= box

        if (snakeY == 0) {
            console.log('snakeY: ', snakeY);
            snakeY += canvas.height+20
        }
    }

    else if (d == "RIGHT") {

        snakeX += box
        if (snakeX > canvas.width) {
            console.log('snakeX: ', snakeX);
            snakeX -= canvas.width+20
        }

    } else if (d == "DOWN") {
        snakeY += box
        if (snakeY > canvas.height) {
            console.log('snakeY: ', snakeY);
            snakeY -= canvas.height
        }
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    gotHit(newHead)
    snake.unshift(newHead);

    if (dist(newHead, food)) {
        snake.push({

            x: 10 * box,
            y: 10 * box
        })
        pickFoodPosition();
        console.log('snake: ', snake);

    }


}

let startSnake = setInterval(draw, 250);