const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = 1000;    // canvas limits
const canvasHeight = canvas.height = 700;
let gameSpeed = 1                                                                                                                                                                       ; // background speed 
let gameFrame = 0;
let score = 0;
gameOver = false;


const startButton = document.querySelector('.bouncy');
const  startPage = document.querySelector('.start-page');      
startButton.addEventListener('click', () => {
    animate()
    canvas.classList.remove('hidden')
    startButton.classList.add('hidden')
    score = 0
})


const backgroundlayer1 = new Image(); // downloading backgrounds 
backgroundlayer1.src = "./image/layer1.png";
const backgroundlayer2 = new Image()
backgroundlayer2.src = "./image/layer2.png";
const backgroundlayer3 = new Image()
backgroundlayer3.src = "./image/layer3.png";
const backgroundlayer4 = new Image()
backgroundlayer4.src = "./image/layer4.png";
const backgroundlayer5 = new Image()
backgroundlayer5.src = "./image/layer5.png";
const backgroundlayer6 = new Image()
backgroundlayer6.src = "./image/layer6.png";
const backgroundlayer7 = new Image()
backgroundlayer7.src = "./image/layer7.png";
const backgroundlayer8 = new Image()
backgroundlayer8.src = "./image/layer8.png";

// end game image
const crushgif = new Image();
crushgif.src = './image/finish.jpg';


class BackGround {       // making background class to be able to make many background images together with different speed and height to run together 
    constructor(image, SpeedModifier, y, height){
        this.x = 0;  // all will start from the same position
        this.y = y;   // to be controlled later per image
        this.width = 2048, // size of the images
        this.height = height, // to be controlled later per image
        this.image = image;   // will be making each time other image.
        this.SpeedModifier = SpeedModifier;       // this will offer the ability to change the speed per image of the background
        this.speed = gameSpeed * this.SpeedModifier; // this is where the speed per layer takes affect and will be tight to the global speed. 
    } 
        update(){
            this.speed = gameSpeed * this.SpeedModifier;
            this.x = Math.floor(gameFrame * this.speed % this.width); // mathfloor helps to solve the gaps.
        }      
        draw(){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
}

const layer1 = new BackGround(backgroundlayer1, 1, 0, 700);
const layer2 = new BackGround(backgroundlayer2, 0.5, 50, 70)
const layer3 = new BackGround(backgroundlayer3, 1, 50, 120)
const layer4 = new BackGround(backgroundlayer4, 0.3, 100, 700)
const layer5 = new BackGround(backgroundlayer5, 0.6, 350, 447)
const layer6 = new BackGround(backgroundlayer6, 0.5, 500, 200)
const layer7 = new BackGround(backgroundlayer7, 0.7, 600, 90)
const layer8 = new BackGround(backgroundlayer8, 1, 650, 70)


const arrBackGround = [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8]  // array to cycle in for each loop instead of drawing one by one


/////////////////////////////////////////// end of background animation loop 

class Superman {                        // Superman Class
    constructor(){
        this.position = {
            x: 0,
            y: canvasHeight / 2 -90
        }
        this.width = 190,
        this.height = 90; 
        const supermanImg = new Image();
        supermanImg.src = './image/superman.png';

        this.supermanImg = supermanImg;
        this.speed = 30;
        

    }
    draw(){
        ctx.drawImage(this.supermanImg, this.position.x, this.position.y, this.width, this.height)

      
    }
    moveUp(){
        if (this.position.y < 0) {
            return
        }
        this.position.y -= this.speed
    }
    moveDown(){
        if(this.position.y > canvasHeight - (this.height + 20)){
            return
        }
        this.position.y += this.speed  
    }
    contains(b) {
        return (this.position.x < b.x + b.width) &&
        (this.position.x + this.width > b.x) &&
        (this.position.y < b.y + b.height) &&
        (this.position.y + this.height > b.y)
    } 
}
const reaLsuperman = new Superman();

                               // End superman class 

                                // Start Enemy class
const enemyImage = new Image();
enemyImage.src = './image/enemy2.png';
let enemyGameFrame = 0;

///// start
class Game {
    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.enemies = [];
        this.enemyInterval = 300;
        this.enemyTimer = 0;
        
    }
    update(){

        if (this.enemyTimer > this.enemyInterval){
            this.#addNewEnemy();
            this.enemyTimer = 0;
        } 
            else {
                this.enemyTimer++
            }

        this.enemies.forEach(object => object.update());
    }
    draw(){
        this.enemies.forEach(object => object.draw());
    }
    #addNewEnemy() {
        this.enemies.push(new Enemy(this));
    }
}

class Enemy {
    constructor(game) {
        this.game = game;
        this.speed = 1;
        this.spriteWidth = 266,
        this.spriteHeight = 188,
        this.width = this.spriteWidth / 3,
        this.height = this.spriteHeight / 3,
        this.y = Math.random() * (canvasHeight - this.height),
        this.x = canvasWidth;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        
    }
    update(){
        this.x -= this.speed 
        if (this.x + this.width < 0) this.x = canvasWidth;
       
        if (enemyGameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }

        game.enemies.forEach(enemy => {
            if (reaLsuperman.contains(enemy)){
                gameOver = true;
             }
            })
    }
    draw() { //
       
        ctx.drawImage(enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
                                              //end of enemy creation
}
    
addEventListener('keydown', ({key}) => {
    switch (key) {
        case'w':
            reaLsuperman.moveUp()    
        break;   
        case's':
            reaLsuperman.moveDown()
            break; 
    }  
})




const game = new Game();
let lastTime = 1;


   function gameState() {
    if (gameOver){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        loseScreen();
        youLost();
        endscore();
    }
   }

function playStatus() {
ctx.fillStyle = "black"
ctx.font = "30px Arial"

if (!gameOver){
    ctx.fillText(`Score:${score}`, 100,100) 
}
}

setInterval(() => {
    score++;
  }, "1000")

function animate(timeStamp) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    arrBackGround.forEach(item => {
        item.update()
        item.draw()
    })
        gameFrame--
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();
        reaLsuperman.draw();
        gameState();
        playStatus();

       if (!gameOver) requestAnimationFrame(animate);

    
            
}



// const drawScore = () => {
//     ctx.fillStyle = "black"
//     ctx.font = "30px Arial"
//     ctx.fillText(`Score:${score}`, 100,100)
// } 
const loseScreen = () => {
    ctx.drawImage(crushgif, 0, 0, 1000, 700)
}
const youLost = () => {
    ctx.fillStyle = "red";
    ctx.font = "70px arial"; 
    ctx.fillText("Game Over!", 400, 400)
    ctx.fillText("You Lost...", 400, 500)
}
const endscore = () => {
    ctx.fillStyle = "white"
    ctx.font = "50px arial"
    ctx.fillText(`your score is: ${score}`, 400, 600) 
}
