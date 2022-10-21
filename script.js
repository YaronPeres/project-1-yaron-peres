const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = 1000;    // canvas limits
const canvasHeight = canvas.height = 700;
let gameSpeed = 1                                                                                                                                                                       ; // background speed 
let gameFrame = 0;
let score = 0;
gameOver = false;


const theme = new sound("./image/sound/theme.mp3")
const laser = new sound("./image/sound/laser1.mp3")
const wind = new sound("./image/sound/wind.mp3")
const firstbreak1 = new sound("./image/sound/firstbreak2.mp3")
const doyoubleed = new sound("./image/sound/doyoubleed.mp3")
const greensound = new sound("./image/sound/greensound.mp3")

function sound (src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
    this.sound.play();
    };
    this.stop = function(){
    this.sound.pause();
    };
    }

    window.onload = () => {
       theme.play();
      } 

const startButton = document.querySelector('.bouncy');
const  startPage = document.querySelector('.start-page');      
startButton.addEventListener('click', () => {
    animate()
    canvas.classList.remove('hidden')
    startButton.classList.add('hidden')
    score = 0
    kryiptoniteCon = []
    redkryiptoniteCon = []
    theme.stop()
    firstbreak1.play();
    
   

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
        this.width = 170,
        this.height = 80; 
        const supermanImg = new Image();
        supermanImg.src = './image/superman.png';
        this.supermanImg = supermanImg;
        this.speed = 40;

    }
    draw(){
        ctx.drawImage(this.supermanImg, this.position.x, this.position.y, this.width, this.height)      
    }



    moveUp(){
        if (this.position.y < 11) {
            return
        }
        this.position.y -= this.speed
    }
    moveDown(){
        if(this.position.y > 600){
            return
        }
        this.position.y += this.speed  
    }
    moveRight(){
        if (this.position.x > 820) {
            return
        }
        this.position.x += this.speed
    }
    moveLeft(){
        if(this.position.x < 5){
            return
        }
        this.position.x -= this.speed  
    }
    contains(b) {
        return (this.position.x < b.x + (b.width-15)) &&
        (this.position.x + (this.width - 25) > b.x) &&
        (this.position.y < b.y + (b.height - 30)) &&
        (this.position.y + (this.height - 25) > b.y)
    } 
}
const reaLsuperman = new Superman();
                                                            // End superman class 




                                                            //start projectiles
const projectileImg = new Image();
projectileImg.src = './image/lazer1.png'                              
class Projectiles {
    constructor({position, speed}){
        this.position = position
        this.height = 200;
        this.width = 500;
        this.speed = speed;
        this.image = projectileImg;

    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
    update(){ 
        this.draw();
        this.position.x += this.speed.x   // this speed is needed??? 
     
    }
    contains(b) {
        return (this.position.x < b.x + (b.width-25)) &&
        (this.position.x + (this.width - 260) > b.x) &&
        (this.position.y < b.y + (b.height - 100)) &&
        (this.position.y + (this.height - 100) > b.y)
    } 

}
let projectilesArray = [];
                                                    // finish projectiles



                                                     // Start Enemy class
const enemyImage = new Image();
enemyImage.src = './image/enemy2.png';
let enemyGameFrame = 0;

class Game {
    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.enemies = [];
        this.enemyInterval = 200;
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
function speedScore(){
    if(score > 10 && score < 20){
        game.enemyInterval = 100
        console.log("score is bigger then 10")
    }
    else if(score > 20 && score < 30){
        game.enemyInterval = 50
        console.log("score is bigger then 20")
    }
    else if(score > 30 && score < 40){
        game.enemyInterval = 20
       
    
    }
    else if(score > 40){
        game.enemyInterval = 1
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
        this.y = Math.random() * (canvasHeight - 200),
        this.x = canvasWidth;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0
        this.curve = Math.random() * 7
        
    }
    update(){
        this.x -= this.speed 
        if (this.x + this.width < 0) this.x = canvasWidth;
       
        if (enemyGameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
        this.y += Math.sin(this.angle) * this.curve   // radius value 
        this.angle += 0.1; //angle value
       
        game.enemies.forEach(enemy => {
            if (reaLsuperman.contains(enemy)){
                gameOver = true;
             }
            })
    }
    draw() { //
       
        ctx.drawImage(enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
                                                     
  
}                                        

                                                          //end of enemy creation
                                                            //kryptonite          
const green = new Image();
green.src = './image/green.png';
class Kryptonitecls  {
    constructor() {
        this.width = 100;
        this.x = 1000,
        this.y = (Math.random() * (canvas.height) - 80) ;                 // todo: this
        this.height = 90,
        this.speed = 1,
        this.image = green;
    }
    draw() {
        if(this.x > canvas.width){    // if(this.y > canvas.height / 2) controls the length it will go
            return
        }
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        this.handleMove()
    }                         
    handleMove() {
        this.x-= this.speed
    } 
    contains(b) {
        return (this.x < b.position.x + b.width) &&
        (this.x + this.width > b.position.x) &&
        (this.y < b.position.y + b.height) &&
        (this.y + this.height > b.position.y)
    } 
}
let kryiptoniteCon = []

setInterval(() => {
    const kriptonite =  new Kryptonitecls 
    kryiptoniteCon.push(kriptonite)
}, 3000)


const red = new Image();
red.src = './image/red.png';
class Redkryptonitecls  {
    constructor() {
        this.width = 60;
        this.x = (Math.random() * (canvas.width - 200)) +25;
        this.y =  0;                 // todo: this
        this.height = 60,
        this.speed = 0.5,
        this.image = red;
    }
    draw() {
        if(this.y > canvas.height){    // if(this.y > canvas.height / 2) controls the length it will go
            return
        }
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        this.handleMove()
    }                         
    handleMove() {
        this.y++
    } 
    contains(b) {
        return (this.x < b.position.x + b.width) &&
        (this.x + this.width > b.position.x) &&
        (this.y < b.position.y + b.height) &&
        (this.y + this.height > b.position.y)
    } 
}
let redkryiptoniteCon = []

setInterval(() => {
    const redkriptonite =  new Redkryptonitecls 
    redkryiptoniteCon.push(redkriptonite)
}, 20000)



                                                
                                                    //game functions
    
addEventListener('keydown', ({key}) => {
    switch (key) {
        case'w':
            reaLsuperman.moveUp()    
            break;   
            case's':
            reaLsuperman.moveDown()
            break; 
            case'd':
            reaLsuperman.moveRight()    
            break;   
            case'a':
            reaLsuperman.moveLeft()
            break; 
            case' ':
            laser.play()
            projectilesArray.push(new Projectiles({
                position: {
                    x: reaLsuperman.position.x + 130,
                    y: reaLsuperman.position.y -60
                },
               speed: {
                    x: 100,
                    y: 0
                }
            }))
    }  
})




const game = new Game();
let lastTime = 1;


   function gameState() {
    if (gameOver){
        doyoubleed.play();
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        loseScreen();
        youLost();
        endscore();
        projectilesArray = [];
        kryiptoniteCon= [];
        redkryiptoniteCon = [];
        wind.stop();
        firstbreak1.stop();
       
    }
   }

function playStatus() {
ctx.fillStyle = "black"
ctx.font = "30px Arial"
if (!gameOver){
    ctx.fillText(`Score:${score}`, 100,100) 
}
}



function animate(timeStamp) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    speedScore()
    wind.play();
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
        projectilesArray.forEach((projectile, index) => {
            if (projectile.position.x + projectile.width <= 0) {
                Projectiles.splice(index);
            } 
                else {
                    game.enemies.forEach((enemy, index) => {
                    if (projectile.contains(enemy)){
                        score++
                        game.enemies.splice(index, 1)
                    }
                    })
                    projectile.update();
                }
        });
        for (let i =  0; i < kryiptoniteCon.length; i++) { //green
            kryiptoniteCon[i].draw();
        }
        kryiptoniteCon.forEach((kryp, index) => {
            if(reaLsuperman.contains(kryp, index)){
                greensound.play();
                reaLsuperman.speed -= 10  
                console.log("this is speed",reaLsuperman.speed) //)
                if (reaLsuperman.speed < 10){
                    reaLsuperman.speed = 10
                }     // if speed under 10?
                kryiptoniteCon.splice(index, 1)
            }
        })
        for (let i =  0; i < redkryiptoniteCon.length; i++) { //red
            redkryiptoniteCon[i].draw();
        }
        redkryiptoniteCon.forEach((kryp, index) => {
            if(reaLsuperman.contains(kryp, index)){
                firstbreak1.play();
                reaLsuperman.speed += 10       // if speed under 10?
                redkryiptoniteCon.splice(index, 1)
            }
        })


       if (!gameOver) requestAnimationFrame(animate);

    
            
}


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
