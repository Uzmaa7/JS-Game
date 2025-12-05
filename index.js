const board = document.querySelector('.board');
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const gameOvereModal = document.querySelector(".game-over");
const startGameModal = document.querySelector(".start-game");
const restartButton = document.querySelector(".btn-restart");
const highscoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");



const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth); 
const rows = Math.floor(board.clientHeight / blockHeight); 


// for(let i = 0; i < rows * cols; i++){
//     const block = document.createElement('div');
//     block.classList.add("block");
//     board.appendChild(block);
// }

const blocks = [];
let snake = [{x: 1, y: 3}];
let food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}

let direction = 'right';

let highScore = 0;
let score = 0;
let time = `00-00`;

for(let row = 0;  row < rows; row++){
    for(let col = 0;  col < cols; col++){

        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        block.innerText = `${row}-${col}`
        blocks[ `${row}-${col}` ] = block
    }
}



function render(){
    let head = null;

    blocks[ `${food.x}-${food.y}` ].classList.add("food");


    if(direction === "left"){
        head = { x: snake[0].x, y: snake[0].y - 1};
    }
    else if(direction === "right"){
        head = { x: snake[0].x, y: snake[0].y + 1};
    }
    else if(direction === "down"){
        head = { x: snake[0].x + 1, y: snake[0].y};
    }
    else if(direction === "up"){
        head = { x: snake[0].x - 1, y: snake[0].y};
    }

    if(head.x < 0 || head.x >= rows || head.y < 0|| head.y >= cols){
        // alert("Game OVer");
        clearInterval(intervalId);

        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOvereModal.style.display = "flex";

        return;
    }



    if(head.x == food.x && head.y == food.y){
        //food consume ho jay + snake length inc. ho jay
        blocks[ `${food.x}-${food.y}` ].classList.remove("food");

        food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)};
        blocks[ `${food.x}-${food.y}` ].classList.add("food");


        snake.unshift(head);

        score += 10;
        scoreElement.innerText = score;
    }




    snake.forEach(segment => {
        blocks[ `${segment.x}-${segment.y}` ].classList.remove("fill");
    })

    snake.unshift(head);
    snake.pop();

    snake.forEach(segment => {
        // console.log(segment)
        blocks[ `${segment.x}-${segment.y}` ].classList.add("fill");
    })
}





// let intervalId = null;
// intervalId = setInterval(() => {
//     render();
// },300);



startButton.addEventListener("click", ()=>{
    modal.style.display = "none";
    intervalId = setInterval(() => {
        render();
    },300);
})

restartButton.addEventListener("click", restartGame)

function restartGame(){
    blocks[ `${food.x}-${food.y}` ].classList.remove("food");
    snake.forEach(segment => {
        blocks[ `${segment.x}-${segment.y}` ].classList.remove("fill");
    })


    modal.style.display = "none";
    direction = "down";
    snake = [{x: 1, y: 3}];
    food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)};
    intervalId = setInterval(() => {
        render();
    },300);

}

addEventListener("keydown", (e) =>  {
    // console.log(e.key)
    if(e.key == "ArrowUp"){
        direction = "up";
    }
    else if(e.key == "ArrowRight"){
         direction = "right";
    }
    else if(e.key == "ArrowLeft"){
         direction = "left";
    }
    else if(e.key == "ArrowDown"){
         direction = "down";
    }

})

