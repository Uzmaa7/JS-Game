const board = document.querySelector('.board');

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
const snake = [{x: 1, y: 3}];
let food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}

let direction = 'right';


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
        alert("Game OVer");
        clearInterval(intervalId);
    }



    if(head.x == food.x && head.y == food.y){
        //food consume ho jay + snake length inc ho jay
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

let intervalId = null;
intervalId = setInterval(() => {
    render();
},300);


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

