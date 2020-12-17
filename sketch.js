
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var SurvivalTime = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
function preload(){
  
  //loading images
  monkey_running = loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")  
  monkey_stop = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  bg = loadImage("bg.png");
  redo = loadImage("redo.png");
   over = loadImage("gamOver.png");
}

function setup() {
 
 createCanvas(400,300);

  //making a background 
 back = createSprite(270,150,1,1);
 back.addImage(bg); 
 back.scale=1;
 
  //making a monkey
 monkey=createSprite(75,260,20,20);
 monkey.addAnimation("moving",monkey_running);
 monkey.addAnimation("collided",monkey_stop)
 monkey.scale=0.1;
 
  //making a ground which is invisible
 invisibleGround =  createSprite(200,300,400,10);
 invisibleGround.visible = false;
  
  //making groups : obstacles Group, banana Group 
  obstaclesGroup = new Group();
  bananaGroup = new Group();


  //gameOver
  gameOver=createSprite(200,165,10,10);
  gameOver.addImage(over);
  gameOver.scale = 0.60;
  
  //making to reset
  restart=createSprite(270,250,10,10);
  restart.addImage(redo);
  restart.scale = 0.5;
 
  
}

function draw() {
background("white");
 
  if(gameState === PLAY){
  
    gameOver.visible=false;
    
    //giving command so that the monkey jumps with a gravity
  if (keyDown("space") && monkey.y>=200) {
    monkey.velocityY = -12;
  }  
 monkey.velocityY = monkey.velocityY + 0.8
 SurvivalTime = SurvivalTime +  Math.round(getFrameRate()/60);
 
  //giving velocity to background
 back.velocityX=-4.5;
 if(back.x<0){
  back.x=back.width/2;  
 }
   restart.visible = false;
    
  //making the invisible ground so as to make it move
 if (invisibleGround.x < 0) {
    invisibleGround.x = invisibleGround.width / 2;
  }
    //calling different functions in the draw function
 spawnObstacles();
    
 spawnBanana();
    
 if(obstaclesGroup.isTouching(monkey)){
   gameState = END; 
     }
  }

   else if(gameState === END) {      
    gameOver.visible=true;
    monkey.changeAnimation("collided",monkey_stop);
    invisibleGround.velocityX=0;
    obstaclesGroup.setVelocityXEach(0)
    bananaGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach=(-1);
    bananaGroup.setLifetimeEach=(-1);
    back.velocityX=0;
    monkey.setVelocityY = 0;    
    restart.visible = true;
    if(mousePressedOver(restart))  {
      reset();
    }  
    }
 
  
 //making the monkey to collide with the invisible ground
  monkey.collide(invisibleGround); 

 drawSprites();
 
  //making the survival time
 fill("black");
 textSize(20);
 textFont("Algerian");
 stroke("blue");
 text("Survival Time : " +SurvivalTime  ,180,30)
 }

function spawnObstacles(){
 if (frameCount % 100 === 0) {
   var obstacle = createSprite(400,265,10,40);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -6;
    obstacle.scale =0.2 ;
    obstacle.setlifetime = 300;
    obstacle.debug=false;
    obstacle.setCollider("circle",0,0,150);   
    obstaclesGroup.add(obstacle);   
 } 
}
function spawnBanana() {
  if (frameCount % 60 === 0) {
     banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(150,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.setlifetime = 300;
    bananaGroup.add(banana);
  } 
}
function reset(){
 //function to reset
  gameState = PLAY;
  restart.visible=false;
  SurvivalTime=0;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.changeAnimation("moving", monkey_running);
  monkey.y=260;
}